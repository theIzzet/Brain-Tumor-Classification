import { useState } from "react";


const TUMOR_INFO = {
    glioma: {
        title: "Glioma Tümörü",
        desc: "Gliomalar, beyin ve omuriliği çevreleyen glial hücrelerden kaynaklanan bir tümör türüdür. Genellikle beyin dokusu içinde büyür.",
        severity: "danger"
    },
    meningioma: {
        title: "Meningioma Tümörü",
        desc: "Meningiomalar, beyni ve omuriliği çevreleyen zarlardan (meninksler) kaynaklanır. Genellikle yavaş büyürler.",
        severity: "warning"
    },
    pituitary: {
        title: "Hipofiz (Pituitary) Tümörü",
        desc: "Hipofiz bezi tümörleri, beynin tabanındaki hormon kontrol merkezinde oluşur. Hormon seviyelerini etkileyebilir.",
        severity: "warning"
    },
    notumor: {
        title: "Tümör Tespit Edilmedi",
        desc: "Yapılan analiz sonucunda görüntülerde herhangi bir tümör yapısına rastlanmamıştır. Sağlıklı doku görünümü.",
        severity: "success"
    }
};

const BrainTumorDetector = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {

            const response = await fetch("/api/predict", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Analiz servisine erişilemedi.");

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError("Sunucu bağlantısı kurulamadı. Lütfen backend'in çalıştığından emin olun.");
        } finally {
            setLoading(false);
        }
    };

    const resetAnalysis = () => {
        setSelectedFile(null);
        setPreview(null);
        setResult(null);
        setError(null);
    };


    const getColor = (className) => {
        if (className === 'notumor') return '#10b981';
        if (className === 'glioma') return '#ef4444';
        return '#f59e0b';
    };

    return (
        <div className="container">
            {/* HEADER */}
            <header className="app-header">
                <h1>Beyin MR Görüntü Analizi</h1>
                <p className="subtitle">Yapay Zeka Destekli Erken Teşhis Asistanı</p>
            </header>

            <div className="main-grid">

                {/* SOL PANEL: RESİM YÜKLEME */}
                <div className="panel upload-panel">
                    {!preview ? (
                        <div className="upload-area">
                            <label htmlFor="file-upload" style={{ width: '100%', height: '100%', display: 'block', cursor: 'pointer' }}>
                                <div className="upload-placeholder">
                                    <span className="icon">📂</span>
                                    <span className="upload-text">Görüntüyü Sürükleyin veya Seçin</span>
                                    <span className="upload-hint">Sadece .jpg, .png formatları</span>
                                </div>
                            </label>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                        </div>
                    ) : (
                        <div className="preview-container">
                            <img src={preview} alt="MR" className="preview-image" />
                            <button className="change-photo-btn" onClick={resetAnalysis}>Fotoğrafı Değiştir</button>
                        </div>
                    )}

                    {error && <div style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>{error}</div>}

                    <button
                        className="action-btn"
                        onClick={handleAnalyze}
                        disabled={!selectedFile || loading || result}
                    >
                        {loading ? <div className="spinner"></div> : "Görüntüyü Analiz Et"}
                    </button>
                </div>

                {/* SAĞ PANEL: SONUÇLAR */}
                <div className="panel result-panel">
                    <div className="result-header">
                        <h2>Analiz Raporu</h2>
                        <span className={`status-badge ${result ? 'completed' : ''}`}>
                            {result ? 'Analiz Tamamlandı' : 'Veri Bekleniyor'}
                        </span>
                    </div>

                    {!result ? (
                        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📊</span>
                            <p>Analiz sonuçları burada detaylı olarak görüntülenecektir.</p>
                        </div>
                    ) : (
                        <div className="result-content">

                            <div className={`main-diagnosis ${TUMOR_INFO[result.class].severity}`}>
                                <span className="diagnosis-label">En Yüksek Olasılıklı Tanı</span>
                                <div className="diagnosis-value">{TUMOR_INFO[result.class].title}</div>
                                <div className="diagnosis-confidence">
                                    Model Güveni: <strong>%{(result.confidence * 100).toFixed(2)}</strong>
                                </div>
                            </div>


                            <div className="stats-container">
                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Detaylı Olasılık Dağılımı</h3>

                                {Object.entries(result.predictions).map(([className, score]) => (
                                    <div key={className} className="stat-row">
                                        <div className="stat-info">
                                            <span>{TUMOR_INFO[className] ? TUMOR_INFO[className].title : className}</span>
                                            <span>%{(score * 100).toFixed(1)}</span>
                                        </div>
                                        <div className="progress-bg">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width: `${score * 100}%`,
                                                    backgroundColor: getColor(className)
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            <div className="info-box">
                                <span className="info-title">ℹ️ Bu ne anlama geliyor?</span>
                                {TUMOR_INFO[result.class].desc}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrainTumorDetector;