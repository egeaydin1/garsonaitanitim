# NovaDine.AI - Railway Deployment Rehberi

## 🚀 Hızlı Başlangıç

Projeniz Railway'e deploy edilmeye hazır! Tüm gerekli dosyalar oluşturuldu.

## 📋 Oluşturulan Dosyalar

✅ `package.json` - Güncellendi (engines ve scripts eklendi)
✅ `next.config.ts` - Production için optimize edildi
✅ `railway.toml` - Railway konfigürasyonu
✅ `.env.example` - Environment variables şablonu
✅ `Dockerfile` - Docker container yapılandırması

## 🔥 Railway'e Deploy Adımları

### 1. GitHub'a Push
```bash
git add .
git commit -m "Railway deployment hazırlığı tamamlandı"
git push origin main
```

### 2. Railway'de Proje Oluştur

1. [railway.app](https://railway.app) 'e git
2. GitHub ile giriş yap
3. "New Project" → "Deploy from GitHub repo"
4. `novadine-site` repository'sini seç
5. Otomatik deploy başlayacak! ⚡

### 3. Domain Ayarla (Opsiyonel)

Railway Dashboard'da:
- Settings → Domains
- "Generate Domain" veya kendi domain'ini ekle

## 🎯 Deploy Sonrası Kontrol

Deploy tamamlandıktan sonra:

✅ Build logs'u kontrol et
✅ Railway'in verdiği URL'i ziyaret et
✅ Tüm sayfaların çalıştığını doğrula

## 🔧 Environment Variables (Gerekirse)

Railway Dashboard → Variables sekmesinde:
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 📊 Önemli Notlar

- **Build Süresi:** ~2-3 dakika
- **Otomatik Deploy:** Her git push'ta otomatik deploy
- **Free Tier:** $5 kredi/ay (yaklaşık 500 saat çalışma)

## 🆘 Sorun mu Var?

**Build hatası alırsan:**
```bash
# Lokal test
npm run build
```

**Port sorunu varsa:**
Railway otomatik PORT atar, kod hazır.

## 🎉 Başarılı!

Artık projen Railway'de çalışıyor! 🚀

Domain: `https://your-project.railway.app`
