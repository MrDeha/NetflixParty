# 🎬 Netflix Party (Sync & Chat)

Arkadaşlarınızla uzaktan senkronize bir şekilde Netflix izlemenizi sağlayan, gerçek zamanlı sohbet özelliğine sahip bir Chrome Eklentisi ve Socket.io sunucusu.

Bu proje; video oynatma durumlarını (Play/Pause/Seek) anlık olarak eşler ve Netflix'in "Yayın Kesildi" hatalarını önlemek için özel bir **"Anti-Crash & Safe Seek"** algoritması kullanır.

## ✨ Özellikler

* **⚡ Gerçek Zamanlı Senkronizasyon:** Bir kişi videoyu durdurduğunda, başlattığında veya ileri sardığında herkes için aynı işlem uygulanır.
* **💬 Entegre Sohbet Sistemi:**
    * Video üzerinde şeffaf, açılıp kapanabilen sohbet penceresi.
    * "Kullanıcı odaya katıldı/ayrıldı" bildirimleri.
    * "Ahmet yazıyor..." göstergesi (Typing Indicator).
* **🛡️ Güvenli Sarma (Jump & Freeze):** İleri/Geri sarma işlemlerinde Netflix'in çökmesini engellemek için videoyu yeni sürede dondurur ve herkes hazır olana kadar bekletir.
* **🖱️ Hayalet Tıklama Modu:** Tarayıcıların "Otomatik Oynatma" engellerini aşmak için kullanıcı etkileşimini simüle eder.

## 📂 Proje Yapısı

Proje iki ana klasörden oluşur:

1.  **Extension:** Chrome tarayıcısına yüklenecek istemci (Client) dosyaları.
2.  **Server:** Bağlantıları yöneten Node.js ve Socket.io sunucusu.

## 🚀 Kurulum ve Kullanım

### 1. Sunucu (Backend) Kurulumu

Bu proje iletişim için bir Socket.io sunucusuna ihtiyaç duyar.

**Yerel (Local) Çalıştırma:**
```bash
cd Server
npm install
node server.js
