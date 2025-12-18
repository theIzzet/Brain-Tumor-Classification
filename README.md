# 🧠 Beyin Tümörü Tespiti ve Sınıflandırma Sistemi

Bu proje, Manyetik Rezonans (MR) görüntülerinden beyin tümörlerini otomatik olarak tespit eden ve sınıflandıran yapay zeka destekli bir web uygulamasıdır. Proje kapsamında dört farklı sınıf (`glioma`, `meningioma`, `pituitary`, `notumor`) için yüksek doğruluklu bir derin öğrenme modeli geliştirilmiş ve bu model FastAPI ile React kullanılarak modern bir web arayüzüne entegre edilmiştir.

## 📌 Proje Amacı

Beyin tümörlerinin erken ve doğru teşhisi, tedavi süreci ve hasta yaşam kalitesi için kritik öneme sahiptir. Bu proje, radyologlara yardımcı olmak amacıyla MR görüntülerini hızlı ve yüksek doğrulukla analiz eden bir yapay zeka asistanı sunar.

## ✨ Özellikler

- **Yüksek Doğruluk:** EfficientNetB6 tabanlı transfer öğrenme modeli ile %92.22 test doğruluğu
- **Dört Sınıflı Sınıflandırma:** Glioma, Meningioma, Hipofiz tümörü ve tümörsüz görüntüler
- **Modern Web Arayüzü:** React ile geliştirilmiş kullanıcı dostu arayüz
- **RESTful API:** FastAPI ile geliştirilmiş hızlı ve ölçeklenebilir backend
- **Docker Desteği:** Kolay dağıtım ve kurulum için Docker container desteği
- **Model Açıklanabilirliği:** Grad-CAM ile model kararlarının görselleştirilmesi

## 📊 Performans Sonuçları

| Model | Test Doğruluğu | Test Kaybı | Ortalama F1-Skoru |
|-------|----------------|------------|-------------------|
| Klasik CNN | %86.12 | 0.3599 | 0.86 |
| Keras Tuner Optimize CNN | %92.14 | 0.1320 | 0.92 |
| **EfficientNetB6 (Transfer Learning)** | **%92.22** | **0.1918** | **0.92** |

## 🏗️ Proje Mimarisi

### Backend (FastAPI)
- **Framework:** FastAPI (Python 3.10+)
- **Model:** EfficientNetB6 (TensorFlow/Keras)
- **API Endpoint:** `/predict` - MR görüntüsü yükleyip tahmin almak için
- **Port:** 8000

### Frontend (React)
- **Framework:** React + Vite
- **UI Özellikleri:** Görüntü yükleme, gerçek zamanlı analiz, sonuç görselleştirme
- **Port:** 3000

### Veritabanı
- Veritabanı kullanılmamaktadır. Model dosyası doğrudan yüklenir.

## 📁 Dosya Yapısı

```
brain-tumor-detection/
├── main.py                    # FastAPI backend uygulaması
├── requirements.txt           # Python bağımlılıkları
├── Dockerfile.backend         # Backend Dockerfile
├── Dockerfile.frontend        # Frontend Dockerfile
├── docker-compose.yml         # Docker Compose yapılandırması
├── Models/
│   └── EfficientNetB6_best_model.keras  # Eğitilmiş model
├── notebooks/                 # Model geliştirme notebook'ları
└── UI/BrainTumorDetectionUI/  # React frontend uygulaması
    ├── src/
    ├── package.json
    ├── vite.config.js
    └── Dockerfile.frontend
```

## 🚀 Kurulum ve Çalıştırma

### Yöntem 1: Docker ile Çalıştırma (Önerilen)

1. **Repository'yi klonlayın:**
   ```bash
   git clone <repository-url>
   cd brain-tumor-detection
   ```

2. **Docker Compose ile servisleri başlatın:**
   ```bash
   docker-compose up --build
   ```

3. **Uygulamalara erişim:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Dökümantasyonu: http://localhost:8000/docs

### Yöntem 2: Manuel Kurulum

#### Backend Kurulumu:
```bash
cd brain-tumor-detection
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Frontend Kurulumu:
```bash
cd UI/BrainTumorDetectionUI
npm install
npm run dev
```

## 🖥️ Kullanım

1. **Web arayüzünü açın:** http://localhost:3000
2. **Bir beyin MR görüntüsü yükleyin:** JPG veya PNG formatında
3. **"Görüntüyü Analiz Et" butonuna tıklayın**
4. **Sonuçları görüntüleyin:**
   - Tümör tipi ve güven skoru
   - Detaylı olasılık dağılımı
   - Tıbbi açıklama

## 🔧 API Kullanımı

### POST /predict
MR görüntüsünü analiz eder ve tahmin sonuçlarını döner.

**Request:**
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@brain_mri.jpg"
```

**Response:**
```json
{
  "class": "glioma",
  "confidence": 0.956,
  "predictions": {
    "glioma": 0.956,
    "meningioma": 0.032,
    "notumor": 0.009,
    "pituitary": 0.003
  }
}
```

## 🧪 Model Geliştirme

Projede üç farklı model yaklaşımı karşılaştırılmıştır:

1. **Klasik CNN:** Sıfırdan tasarlanmış evrişimli sinir ağı
2. **Keras Tuner ile Optimize Edilmiş CNN:** Otomatik hiperparametre optimizasyonu
3. **Transfer Learning (EfficientNetB6):** ImageNet üzerinde önceden eğitilmiş model

En iyi performans EfficientNetB6 modeli ile elde edilmiştir.

## 📈 Performans Metrikleri

- **Accuracy:** %92.22
- **F1-Score:** 0.92
- **NoTumor Specificity:** %98
- **Pituitary Recall:** %98

## 🐛 Sorun Giderme

### Model yüklenemiyor:
- Model dosyasının `Models/` klasöründe olduğundan emin olun
- TensorFlow versiyonunun uyumlu olduğunu kontrol edin (2.20.0)

### CORS hatası:
- Frontend ve backend portlarının doğru yapılandırıldığından emin olun
- `origins` ayarını kontrol edin

### Docker bağlantı sorunları:
- Docker servislerinin çalıştığından emin olun
- `docker-compose logs` ile logları kontrol edin

## 📝 Lisans

Bu proje eğitim ve araştırma amaçlı geliştirilmiştir. Ticari kullanım için lisans gereklidir.

## 👨‍💻 Geliştirici

- **İsim:** İzzet Esener
- **Öğrenci No:** 210229048
- **Bölüm:** Yazılım Mühendisliği
- **Üniversite:** Kocaeli Üniversitesi

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📚 Referanslar

- **Dataset:** [Brain Tumor MRI Dataset - Kaggle](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset)
- **TensorFlow/Keras:** https://keras.io/
- **FastAPI:** https://fastapi.tiangolo.com/
- **React:** https://reactjs.org/

---

*Bu proje, yapay zeka destekli tıbbi görüntü analizi alanında öğrenci projesi olarak geliştirilmiştir. Teşhis amaçlı kullanılmamalıdır. Kesin teşhis için uzman doktorlara başvurunuz.*