Haklısın, önceki mesajda açıklamalarla karıştığı için kopyalaması zor olmuş olabilir. İşte sadece **`README.md`** dosyana yapıştırabileceğin, raporundaki teknik detayları (metrikler, sınıflar, başarı oranları) ve Docker kurulumunu içeren profesyonel format:

```markdown
# 🧠 Beyin Tümörü Tespiti ve Sınıflandırma Sistemi (Brain Tumor Detection)

Bu proje, Manyetik Rezonans (MR) görüntülerini analiz ederek beyin tümörlerini otomatik olarak tespit eden ve dört farklı kategoriye sınıflandıran uçtan uca (end-to-end) bir derin öğrenme uygulamasıdır. 



## 📋 Proje Özeti
Proje, radyologlara teşhis sürecinde yardımcı olacak bir karar destek sistemi olarak geliştirilmiştir. Toplam **7.037 görüntü** içeren geniş ve güncel bir veri seti kullanılarak eğitilen model, tümörün varlığını tespit etmenin yanı sıra tümörün tipini de belirleyebilmektedir.

### Sınıflandırılan Kategoriler:
* **Glioma:** Beyin dokusunda başlayan tümör tipi.
* **Meningioma:** Beyni çevreleyen zarlardan kaynaklanan tümör tipi.
* **Pituitary (Hipofiz):** Hipofiz bezinde oluşan tümör tipi.
* **No Tumor:** Sağlıklı beyin dokusu.

## 🚀 Başarı Metrikleri
Yapılan karşılaştırmalı testler sonucunda en yüksek performans **EfficientNetB6 (Transfer Learning)** mimarisi ile elde edilmiştir.

* **Genel Test Doğruluğu:** %92.22
* **Sağlıklı Doku (No Tumor) Özgüllüğü:** %98 (Yanlış pozitif oranı oldukça düşüktür)

| Sınıf | Precision | Recall | F1-Score |
| :--- | :---: | :---: | :---: |
| Glioma | 0.91 | 0.86 | 0.88 |
| Meningioma | 0.83 | 0.88 | 0.85 |
| No Tumor | 0.98 | 0.96 | 0.97 |
| Pituitary | 0.95 | 0.97 | 0.96 |

## 🛠️ Teknoloji Yığını
* **Backend:** FastAPI (Python 3.10)
* **Frontend:** React.js + Vite
* **Derin Öğrenme:** TensorFlow 2.17, Keras
* **Konteynerizasyon:** Docker & Docker Compose
* **Görüntü İşleme:** Pillow, NumPy



## 📦 Docker ile Kurulum ve Çalıştırma

Sistem iki ayrı mikroservis (Frontend ve Backend) olarak Docker üzerinde çalışmaktadır. Kurulum için bilgisayarınızda Docker Desktop yüklü olması yeterlidir.

### 1. Projeyi İndirin
```bash
git clone [https://github.com/kullanici_adin/BrainTumorDetection.git](https://github.com/kullanici_adin/BrainTumorDetection.git)
cd BrainTumorDetection

```

### 2. Model Dosyasını Kontrol Edin

Eğitilmiş model dosyanızın şu yolda olduğundan emin olun:
`Models/EfficientNetB6_best_model.keras`

### 3. Uygulamayı Başlatın

Aşağıdaki komut her iki servisi de (Vite ve FastAPI) otomatik olarak ayağa kaldıracaktır:

```bash
docker-compose up --build

```

### 4. Erişim

* **Web Arayüzü:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
* **API Dökümantasyonu:** [http://localhost:8000/docs](https://www.google.com/search?q=http://localhost:8000/docs)

## 🔍 Model Mimarisi ve Eğitim

Eğitim sürecinde **Adam optimizer** kullanılmış, öğrenme oranı **0.0001** olarak belirlenmiştir. Veri setindeki dengesizliği gidermek için veri artırma (data augmentation) teknikleri uygulanmıştır. Modelin "kara kutu" yapısını şeffaflaştırmak için analizlerde **Grad-CAM** görselleştirme tekniklerinden faydalanılmıştır.

## 🎓 Akademik Bilgi

Bu çalışma **Kocaeli Üniversitesi Yazılım Mühendisliği** bölümü kapsamında bir bitirme/proje raporu olarak hazırlanmıştır. Detaylı teknik bilgi için proje dizinindeki rapor dosyasını inceleyebilirsiniz.

```

---

### Nasıl Kullanılır?
1.  Projenin ana dizininde `README.md` adında yeni bir dosya oluştur (varsa içini boşalt).
2.  Yukarıdaki kod bloğunu (gri kutu içindeki metni) tamamen kopyala ve dosyaya yapıştır.
3.  Kaydet ve GitHub'a gönder. GitHub bu dosyayı otomatik olarak algılayıp profilinde görseldeki gibi şık bir şekilde sunacaktır.

```