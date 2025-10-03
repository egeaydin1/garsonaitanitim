'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bot, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WaitlistPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    contactPerson: '',
    businessName: '',
    phone: '',
    businessType: '',
    capacity: '',
    techBudget: '',
    expectations: [] as string[],
    aiFeatures: [] as string[],
    thoughts: ''
  });

  const businessTypes = [
    "Restoran",
    "Fine Dining",
    "Cafe",
    "Bar / Pub",
    "Pastane / Tatlı dükkanı"
  ];

  const capacities = ["1-20", "21-50", "51-100", "100+"];
  const budgets = ["0-1500", "1500-3000", "3000+"];

  const expectationOptions = [
    "Personel maliyetlerinde tasarruf",
    "Müşteri deneyiminin iyileşmesi",
    "Daha hızlı servis",
    "Uluslararası müşterilerle iletişim"
  ];

  const aiFeatureOptions = [
    "Sesli sipariş alma (\"Bir cappuccino ve cheesecake istiyorum\")",
    "Menü önerileri (\"Bugün hangi tatlıyı önerirsiniz?\")",
    "Çoklu dil desteği",
    "Alerji/diyet uyarıları",
    "Otomatik hesap hesaplama",
    "Müşteri geri bildirim toplama"
  ];

  const handleCheckboxChange = (field: 'expectations' | 'aiFeatures', value: string) => {
    setFormData(prev => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      // Expectations için max 2 seçim
      if (field === 'expectations' && newArray.length > 2) {
        return prev;
      }
      
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // n8n webhook'una POST isteği
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "İletişim kişisi": formData.contactPerson,
          "İşletme adı": formData.businessName,
          "Telefon Numaranız": formData.phone,
          "İşletme türünüz nedir?": formData.businessType,
          "Kaç masa/müşteri kapasitesine sahipsiniz?": formData.capacity,
          "Ayda ortalama ne kadar teknoloji/yazılım harcaması yapıyorsunuz?": formData.techBudget,
          "Bu sistemden beklediğiniz fayda nedir? (2 tane seçin)": formData.expectations.join(", "),
          " Hangi yapay zeka özellikleri size en çekici geliyor?": formData.aiFeatures.join(", "),
          "Düşünceleriniz": formData.thoughts,
          "submittedAt": new Date().toISOString(),
          "formMode": "production"
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu. Lütfen internet bağlantınızı kontrol edin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-12">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Başarıyla Kaydedildi!</h2>
            <p className="text-muted-foreground mb-6">
              Bekleme listemize kaydınız alındı. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <p className="text-sm text-muted-foreground">Ana sayfaya yönlendiriliyorsunuz...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur border-b bg-background/70">
        <div className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center shadow-lg">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight text-lg">NovaDine.AI</span>
            <Badge className="ml-2" variant="secondary">Bekleme Listesi</Badge>
          </div>
          <Button asChild variant="outline">
            <a href="/">Ana Sayfa</a>
          </Button>
        </div>
      </header>

      {/* Form */}
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <div className="text-center mb-10">
          <Badge className="mb-4" variant="outline">Erken Erişim</Badge>
          <h1 className="text-4xl font-bold mb-3">Garson AI Bekleme Listesi</h1>
          <p className="text-lg text-muted-foreground">
            Erken erişim ve beta testi için kayıt olun. Öncelikli kullanıcılar özel fiyatlardan yararlanacak.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kayıt Formu</CardTitle>
            <CardDescription>Lütfen tüm bilgileri eksiksiz doldurun</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* İletişim Bilgileri */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">İletişim Kişisi *</Label>
                  <Input
                    id="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessName">İşletme Adı *</Label>
                  <Input
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="İşletmenizin adı"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon Numaranız *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+90 5XX XXX XX XX"
                />
              </div>

              {/* İşletme Bilgileri */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType">İşletme Türünüz *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}
                    required
                  >
                    <SelectTrigger id="businessType">
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Kapasite (masa/müşteri) *</Label>
                  <Select
                    value={formData.capacity}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, capacity: value }))}
                    required
                  >
                    <SelectTrigger id="capacity">
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {capacities.map(cap => (
                        <SelectItem key={cap} value={cap}>{cap}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="techBudget">Aylık Teknoloji/Yazılım Bütçesi *</Label>
                <Select
                  value={formData.techBudget}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, techBudget: value }))}
                  required
                >
                  <SelectTrigger id="techBudget">
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgets.map(budget => (
                      <SelectItem key={budget} value={budget}>{budget} TL</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Beklentiler */}
              <div className="space-y-3">
                <Label>Bu sistemden beklediğiniz fayda nedir? * (En fazla 2 seçin)</Label>
                <div className="space-y-2">
                  {expectationOptions.map(option => (
                    <label key={option} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                      <input
                        type="checkbox"
                        checked={formData.expectations.includes(option)}
                        onChange={() => handleCheckboxChange('expectations', option)}
                        className="h-4 w-4"
                        disabled={formData.expectations.length >= 2 && !formData.expectations.includes(option)}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Seçilen: {formData.expectations.length}/2</p>
              </div>

              {/* AI Özellikleri */}
              <div className="space-y-3">
                <Label>Hangi yapay zeka özellikleri size en çekici geliyor? *</Label>
                <div className="space-y-2">
                  {aiFeatureOptions.map(option => (
                    <label key={option} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                      <input
                        type="checkbox"
                        checked={formData.aiFeatures.includes(option)}
                        onChange={() => handleCheckboxChange('aiFeatures', option)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Düşünceler */}
              <div className="space-y-2">
                <Label htmlFor="thoughts">Düşünceleriniz (Opsiyonel)</Label>
                <Textarea
                  id="thoughts"
                  value={formData.thoughts}
                  onChange={(e) => setFormData(prev => ({ ...prev, thoughts: e.target.value }))}
                  placeholder="Ek görüş ve önerilerinizi buraya yazabilirsiniz..."
                  rows={4}
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || formData.expectations.length === 0 || formData.aiFeatures.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    'Bekleme Listesine Katıl'
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Formu göndererek, bilgilerinizin işlenmesini kabul etmiş olursunuz.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Faydalar */}
        <Card className="mt-8 bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Erken Erişim Avantajları:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Özel beta kullanıcısı fiyatlandırması
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Öncelikli teknik destek
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Ürün geliştirmede söz hakkı
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Ücretsiz eğitim ve onboarding
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
