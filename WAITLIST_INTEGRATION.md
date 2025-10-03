# 🚀 NovaDine.AI - Waitlist Integration Kurulum Rehberi

## 📋 Yapılan Değişiklikler

### ✅ Web Sitesi Güncellemeleri

1. **Ana Sayfa (`/src/app/page.tsx`)**
   - TypeScript hataları düzeltildi
   - Kullanılmayan import'lar kaldırıldı
   - Bekleme listesi linki eklendi
   - Type-safe hale getirildi

2. **Waitlist Sayfası (`/src/app/waitlist/page.tsx`)**
   - Tam fonksiyonel anket formu oluşturuldu
   - n8n webhook entegrasyonu eklendi
   - Form validasyonu implementasyonu
   - Başarı/hata mesajları
   - Responsive tasarım

3. **Environment Variables**
   - `.env.example` güncellendi
   - n8n webhook URL placeholder eklendi

### ✅ n8n Workflow Güncellemesi

**Yeni workflow özellikleri:**
- ✅ Webhook trigger (POST method)
- ✅ Form validation node
- ✅ Google Sheets entegrasyonu
- ✅ Success/Error response handling
- ✅ CORS headers

## 🔧 Kurulum Adımları

### 1️⃣ Railway Environment Variables

Railway Dashboard → Variables bölümüne git ve ekle:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.app/webhook/garsonai-waitlist
```

### 2️⃣ n8n Workflow Kurulumu

1. **n8n'i aç** ve yeni workflow oluştur
2. **Import et:** `n8n-workflow-updated.json` dosyasını içe aktar
3. **Credentials ayarla:**
   - Google Sheets OAuth2 credentials
   - Aynı Google Sheet ID'yi kullan: `14VMIreLdxIIH3rK4FX93HYQbvcH48I6Z5vCicwoKieA`

4. **Webhook URL'i kopyala:**
   - "Webhook - Waitlist Form" node'una tıkla
   - "Test URL" veya "Production URL" kopyala
   - Örnek: `https://your-n8n.app/webhook/garsonai-waitlist`

5. **Workflow'u Aktif Et:**
   - Sağ üstten "Active" toggle'ını aç

### 3️⃣ Railway'de Webhook URL Güncelle

Railway Dashboard'da:

```bash
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-actual-n8n-url.app/webhook/garsonai-waitlist
```

### 4️⃣ Deploy

```bash
git add .
git commit -m "Waitlist integration tamamlandı"
git push origin main
```

## 📊 Google Sheets Yapısı

Tablonuzda şu sütunlar olmalı:

| Sütun Adı | Açıklama |
|-----------|----------|
| İletişim kişisi | Kullanıcı adı |
| İşletme adı | İşletme/restoran adı |
| Telefon Numaranız | İletişim telefonu |
| İşletme türünüz nedir? | Restoran/Cafe/Bar vb. |
| Kaç masa/müşteri kapasitesine sahipsiniz? | Kapasite aralığı |
| Ayda ortalama ne kadar teknoloji/yazılım harcaması yapıyorsunuz? | Bütçe |
| Bu sistemden beklediğiniz fayda nedir? | Seçilen faydalar (max 2) |
| Hangi yapay zeka özellikleri size en çekici geliyor? | Seçilen AI özellikleri |
| Düşünceleriniz | Ek notlar |
| Gönderim Zamanı | ISO timestamp |
| Form Modu | production/test |

## 🧪 Test Etme

### Lokal Test:
```bash
npm run dev
```

http://localhost:3000/waitlist adresine git ve formu doldur.

### Production Test:
Deploy sonrası:
```
https://your-app.railway.app/waitlist
```

## 🔍 Troubleshooting

### Form gönderilemiyorsa:

1. **n8n workflow aktif mi?**
   - n8n dashboard'unda "Active" olmalı

2. **Webhook URL doğru mu?**
   - Railway Variables'da `NEXT_PUBLIC_N8N_WEBHOOK_URL` kontrol et

3. **CORS hatası varsa:**
   - n8n workflow'daki response node'larda CORS headers var mı kontrol et

4. **Google Sheets bağlantısı:**
   - n8n'de Google credentials geçerli mi?
   - Sheet ID doğru mu?

### Build hatası alıyorsan:

```bash
# Lokal build test
npm run build

# Eğer hata varsa loglara bak
```

## 📱 Form Özellikleri

- ✅ Responsive tasarım (mobil uyumlu)
- ✅ Form validation
- ✅ Checkbox limitleri (beklentiler: max 2)
- ✅ Loading states
- ✅ Success/error mesajları
- ✅ Otomatik ana sayfaya yönlendirme
- ✅ Modern UI/UX

## 🎯 Kullanım Akışı

1. Kullanıcı `/waitlist` sayfasına gider
2. Formu doldurur
3. "Bekleme Listesine Katıl" tıklar
4. Webhook n8n'e POST request gönderir
5. n8n validasyon yapar
6. Google Sheets'e yeni satır ekler
7. Başarı mesajı gösterilir
8. 3 saniye sonra ana sayfaya yönlendirilir

## 🚀 Sonraki Adımlar

- [ ] Email notification ekleme (n8n'de)
- [ ] CRM entegrasyonu
- [ ] Analytics tracking
- [ ] A/B testing

## 💡 Notlar

- Webhook URL'i `.env` dosyasına **asla** eklemeyin (gitignore'da)
- Sadece Railway Variables'da saklayın
- Production ve Test için farklı webhook URL'leri kullanabilirsiniz

## 📞 Destek

Herhangi bir sorun için:
- Railway logs kontrol edin
- n8n execution history bakın
- Browser console'da hata var mı kontrol edin
