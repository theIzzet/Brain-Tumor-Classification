Haklısın, önceki mesajda karışık göründü. Profesyonel bir GitHub reposu için standartlara uygun, kopyalayıp doğrudan kullanabileceğin temiz **Markdown** formatı aşağıdadır.

Bu dosya; projenin akademik raporu, modern teknoloji yığını ve Docker kurulum adımlarını profesyonel bir dille harmanlar.

---

```markdown
# 🧠 Beyin Tümörü Tespiti ve Sınıflandırma Sistemi (Brain Tumor Detection)

Bu proje, Manyetik Rezonans (MR) görüntülerini analiz ederek beyin tümörlerini otomatik olarak tespit eden ve sınıflandıran uçtan uca (end-to-end) bir derin öğrenme uygulamasıdır. 

Kocaeli Üniversitesi Yazılım Mühendisliği bölümü bünyesinde geliştirilen bu çalışma, radyologlara teşhis sürecinde yardımcı olacak bir karar destek mekanizması sunmayı amaçlar.



## 📋 Proje Özeti
Proje kapsamında 7.037 görüntüden oluşan geniş bir veri seti kullanılarak; **Glioma**, **Meningioma**, **Hipofiz (Pituitary)** tümörleri ve **Sağlıklı (No Tumor)** dokular sınıflandırılmaktadır. 

### 🏆 Model Başarımı
Yapılan testler sonucunda en yüksek performansı **EfficientNetB6 (Transfer Learning)** modeli göstermiştir.
- **Test Doğruluğu:** %92.22
- **Hata Payı (Loss):** 0.1918
- **Sağlıklı Doku Ayırt Etme (Specificity):** %98

## 🚀 Kullanılan Teknolojiler

### 🤖 Yapay Zeka & Veri Bilimi
- **Python / TensorFlow / Keras:** Model geliştirme ve eğitim.
- **EfficientNetB6:** Transfer Learning mimarisi.
- **Grad-CAM:** Modelin karar verme sürecini görselleştiren açıklanabilir yapay zeka (XAI) tekniği.

### 🌐 Web & API
- **FastAPI:** Yüksek performanslı asenkron Python API.
- **React.js & Vite:** Modern ve hızlı kullanıcı arayüzü.
- **Docker & Docker Compose:** Konteynerizasyon ve kolay kurulum.



## 📂 Proje Yapısı
```text
BrainTumorDetection/
├── Models/              # Eğitilmiş .keras modelleri
├── main.py              # FastAPI Backend kodu
├── Dockerfile.backend   # Backend Docker konfigürasyonu
├── UI/
│   └── BrainTumorDetectionUI/
│       ├── src/         # React bileşenleri
│       ├── vite.config.js
│       └── Dockerfile.frontend
└── docker-compose.yml   # Tüm sistemi ayağa kaldıran yapılandırma

```

## 📦 Kurulum ve Çalıştırma

Sistem Dockerize edildiği için herhangi bir kütüphane kurulumu yapmanıza gerek yoktur.

### 1. Projeyi Klonlayın

```bash
git clone [https://github.com/kullanici_adiniz/BrainTumorDetection.git](https://github.com/kullanici_adiniz/BrainTumorDetection.git)
cd BrainTumorDetection

```

### 2. Docker Compose ile Başlatın

```bash
docker-compose up --build

```

### 3. Uygulamaya Erişin

Konteynerlar ayağa kalktıktan sonra tarayıcınızdan şu adresleri kullanabilirsiniz:

* **Kullanıcı Arayüzü:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
* **API (Backend):** [http://localhost:8000](https://www.google.com/search?q=http://localhost:8000)
* **API Dokümantasyonu (Swagger):** [http://localhost:8000/docs](https://www.google.com/search?q=http://localhost:8000/docs)

## 📊 Sınıf Bazlı Performans Metrikleri

Modelin test veri seti üzerindeki başarımı:

| Sınıf | Precision | Recall | F1-Score |
| --- | --- | --- | --- |
| **Glioma** | 0.91 | 0.86 | 0.88 |
| **Meningioma** | 0.83 | 0.88 | 0.85 |
| **No Tumor** | 0.98 | 0.96 | 0.97 |
| **Pituitary** | 0.95 | 0.97 | 0.96 |

## 💡 Neden EfficientNetB6?

Raporumuzda detaylandırıldığı üzere; EfficientNetB6, diğer CNN mimarilerine ve Keras Tuner ile optimize edilmiş modellere göre tıbbi görüntülerdeki ince detayları daha iyi yakalamış ve "No Tumor" sınıfında %98 özgüllük başarısına ulaşmıştır.

## 🤝 Katkıda Bulunma

1. Bu depoyu çatallayın (Fork).
2. Yeni bir özellik dalı oluşturun (`git checkout -b ozellik/yeniOzellik`).
3. Değişikliklerinizi kaydedin (`git commit -m 'Yeni özellik eklendi'`).
4. Dalınıza gönderin (`git push origin ozellik/yeniOzellik`).
5. Bir Çekme İsteği (Pull Request) açın.

## 📜 Lisans

Bu proje [MIT Lisansı](https://www.google.com/search?q=LICENSE) altında lisanslanmıştır.

```

---

### 💡 Ekstra Tavsiyeler:
1.  **Görseller:** Reponun içine bir `assets/` klasörü açıp uygulamanın ekran görüntülerini koyabilirsin. `README` dosyasındaki görsel etiketlerini bunlarla güncellersen (Örn: `![Arayüz](assets/ui_screenshot.png)`) repoyu inceleyenler için çok daha etkileyici olur.
2.  **Model Linki:** Eğer `.keras` dosyan çok büyükse, GitHub'a yüklemene izin vermeyebilir. Bu durumda README'ye "Modeli şu linkten indirip `Models/` klasörüne atın" şeklinde bir not ekleyebilirsin.

```
