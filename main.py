from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tensorflow as tf
import numpy as np
from PIL import Image
import io


from tensorflow.keras.applications import EfficientNetB6
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, BatchNormalization, Dropout


app = FastAPI(title="Brain Tumor Detection API")

# 2. CORS Ayarları (React ile iletişim için ÇOK ÖNEMLİ)
# React genelde localhost:3000'de çalışır, FastAPI ise 8000'de.
# Bu ayar olmadan tarayıcı güvenlik nedeniyle isteği engeller.
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Sadece bu adreslerden gelen isteklere izin ver
    allow_credentials=True,
    allow_methods=["*"],    # GET, POST, PUT vb. hepsine izin ver
    allow_headers=["*"],
)


def create_model():
    
    base_model = EfficientNetB6(
        weights=None,  
        include_top=False,
        input_shape=(224, 224, 3)
    )
    base_model.trainable = False

    # Sequential Model Yapısı
    model = Sequential([
        base_model,
        GlobalAveragePooling2D(),
        Dense(128, activation='relu'),
        BatchNormalization(),
        Dropout(0.2),
        Dense(4, activation='softmax')
    ])
    
    
    model.build((None, 224, 224, 3))
    return model


MODEL_PATH = "Models\EfficientNetB6_best_model.keras" 
print(f"Model yükleniyor: {MODEL_PATH}...")

try:
    model = create_model()
    model.load_weights(MODEL_PATH)
    print("✅ Model başarıyla yüklendi!")
except Exception as e:
    print(f"❌ Model yüklenirken hata oluştu: {e}")
    model = None



CLASS_NAMES = ["glioma", "meningioma", "notumor", "pituitary"]

def read_file_as_image(data) -> np.ndarray:
    """
    Gelen byte verisini modele uygun numpy array'e çevirir.
    """
    try:
        image = Image.open(io.BytesIO(data))
        
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        # Modeli eğittiğin boyut (EfficientNet genelde 224x224 ister)
        image = image.resize((224, 224))
        
        
        image = np.array(image)
        
        return image
    except Exception as e:
        print(f"Resim işleme hatası: {e}")
        return None

@app.get("/")
async def root():
    return {"message": "Brain Tumor Detection API Çalışıyor!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    React tarafından gönderilen resmi alır ve tahmin sonucunu döner.
    """
    if model is None:
        raise HTTPException(status_code=500, detail="Model yüklenemediği için tahmin yapılamıyor.")

    image_data = await file.read()
    image = read_file_as_image(image_data)

    if image is None:
        raise HTTPException(status_code=400, detail="Dosya geçerli bir resim değil.")

    # Batch boyutu ekle (Model (1, 224, 224, 3) şeklinde veri bekler)
    img_batch = np.expand_dims(image, 0)

    predictions = model.predict(img_batch)
    
    # En yüksek olasılıklı sınıfı bul
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = CLASS_NAMES[predicted_class_index]
    confidence = float(np.max(predictions[0]))

    return {
        "class": predicted_class,
        "confidence": confidence,
        "predictions": {
            class_name: float(conf) 
            for class_name, conf in zip(CLASS_NAMES, predictions[0])
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)