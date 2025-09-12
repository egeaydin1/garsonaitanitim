'use client';
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Sparkles, Bot, QrCode, ChartBar, ShieldCheck, Users, Clock, DollarSign, Phone } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// ---------- helpers ----------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Section = ({ id, title, eyebrow, children, description }: any) => (
  <section id={id} className="py-20 lg:py-28">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
        {eyebrow && <p className="text-sm tracking-widest text-primary mb-3 uppercase">{eyebrow}</p>}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
        {description && (
          <p className="mt-3 text-muted-foreground text-lg max-w-3xl">{description}</p>
        )}
      </motion.div>
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

// ---------- data ----------
const competitorRows = [
  { name: "Competitor A", qrMenu: true, voiceAI: false, analytics: "Basic", price: "$$", region: "EU/US" },
  { name: "Competitor B", qrMenu: true, voiceAI: true, analytics: "Limited", price: "$$$", region: "US" },
  { name: "Competitor C", qrMenu: false, voiceAI: true, analytics: "None", price: "$$", region: "APAC" },
  { name: "We (NovaDine.AI)", qrMenu: true, voiceAI: true, analytics: "Advanced+", price: "Custom", region: "Global" },
];

const kpiChartData = [
  { metric: "Order Time", Legacy: 7.8, NovaAI: 3.1 },
  { metric: "Avg Ticket $", Legacy: 17.5, NovaAI: 20.9 },
  { metric: "Table Turnover", Legacy: 1.0, NovaAI: 1.35 },
  { metric: "CSAT", Legacy: 78, NovaAI: 92 },
];

const monthlyCostChart = [
  { label: "1 Store", Human: 5200, AI: 1400 },
  { label: "5 Stores", Human: 26000, AI: 5300 },
  { label: "10 Stores", Human: 52000, AI: 9800 },
];

const features = [
  { icon: ShieldCheck, title: "Enterprise-Grade Security", desc: "ISO-ready processes, field‑tested edge devices, end‑to‑end encryption, SSO, audit logs." },
  { icon: Sparkles, title: "Production AI", desc: "On‑device wake‑word, multi‑turn dialog, multilingual STT/TTS, robust fallback flows." },
  { icon: ChartBar, title: "Full‑Stack Analytics", desc: "Menu performance, allergen safety, upsell efficiency, cohort & heatmap reports." },
  { icon: Clock, title: "Fast Rollout", desc: "Pilot in 2 weeks, chain‑wide deployment in 30–60 days with playbooks and L3 support." },
];

// ---------- main component ----------
export default function Site() {
  const [roi, setRoi] = useState({
    monthlyCovers: 15000, // per location
    avgWage: 14, // $/hr
    waiterPerShift: 3,
    shiftsPerDay: 2,
    days: 30,
    aiLic: 799, // $/mo/location
    upsellLift: 0.12, // 12%
    avgTicket: 18,
  });

  const { humanCost, aiCost, upsellGain, netSavings, paybackDays } = useMemo(() => {
    const humanMonthly = roi.avgWage * (roi.waiterPerShift * 8) * roi.shiftsPerDay * roi.days; // 8h shifts
    const aiMonthly = roi.aiLic; // simplified
    const upsell = roi.monthlyCovers * roi.avgTicket * roi.upsellLift; // extra revenue
    const savings = humanMonthly - aiMonthly + upsell; // ignoring COGS for simplicity
    const payback = savings > 0 ? Math.max(7, Math.round((aiMonthly / savings) * 30)) : 0; // days
    return {
      humanCost: humanMonthly,
      aiCost: aiMonthly,
      upsellGain: upsell,
      netSavings: savings,
      paybackDays: payback,
    };
  }, [roi]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur border-b bg-background/70">
        <div className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary/10 grid place-items-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold tracking-tight">NovaDine.AI</span>
            <Badge className="ml-2" variant="secondary">B2B</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-primary">Hizmetler</a>
            <a href="#qr" className="hover:text-primary">QR Menü</a>
            <a href="#waiter" className="hover:text-primary">Yapay Zeka Garson</a>
            <a href="#analysis" className="hover:text-primary">Analizler</a>
            <a href="#contact" className="hover:text-primary">Teklif Al</a>
          </nav>
          <Button asChild>
            <a href="#contact">Demo Talep Et</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge variant="outline" className="mb-4">Restoran Zincirleri için Üretken Yapay Zeka</Badge>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Daha Hızlı Servis, Daha Yüksek Sepet: <span className="text-primary">Garsonsuz</span> Gelecek
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              NovaDine.AI; zincir restoranlar için QR menü, konuşan sipariş asistanı ve ileri analitik sunar. 2 haftada pilot, 30–60 günde ölçekli kurulum.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg"><a href="#contact">Fiyat & Demo</a></Button>
              <Button asChild variant="secondary" size="lg"><a href="#services">Tüm Hizmetler</a></Button>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" /> ISO/SSO hazır
              <CheckCircle2 className="h-4 w-4" /> Çok dilli STT/TTS
              <CheckCircle2 className="h-4 w-4" /> API & entegrasyonlar
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="grid gap-4">
            <Card className="shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5 text-primary"/> QR Menü Canlı Örnek</CardTitle>
                <CardDescription>Allerjen güvenliği, öneriler ve anlık satış içgörüleri.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">En Çok Satanlar</p>
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      <li>Smash Burger</li>
                      <li>Trüflü Parmesan Patates</li>
                      <li>Çilekli Limonata</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Alerjen Uyarıları</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center justify-between"><span>Yer fıstığı</span> <Badge variant="destructive">Risk</Badge></li>
                      <li className="flex items-center justify-between"><span>Gluten</span> <Badge>İçerebilir</Badge></li>
                      <li className="flex items-center justify-between"><span>Süt</span> <Badge>Alternatif Var</Badge></li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary"/> Konuşan Garson</CardTitle>
                <CardDescription>Masada, kioskta veya web tabanlı dinleme modu ile.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <Badge variant="outline">Wake‑word: "Merhaba Nova"</Badge>
                  <Badge variant="outline">Çok dilli (TR/EN/AR)</Badge>
                  <Badge variant="outline">POS/ERP Entegrasyonu</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <Section id="services" eyebrow="Hizmet Kataloğu" title="Zinciriniz için Uçtan Uca Çözüm" description="Her temas noktasında daha hızlı, daha tutarlı ve daha kârlı operasyonlar.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center mb-2">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5 text-primary"/> QR Menü Platformu</CardTitle>
              <CardDescription>Allerjen güvenliği, dinamik fiyatlama ve öneri motoru.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="allergen">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="allergen">Alerjen</TabsTrigger>
                  <TabsTrigger value="bestsellers">En Çok Satan</TabsTrigger>
                  <TabsTrigger value="menu">Menü</TabsTrigger>
                </TabsList>
                <TabsContent value="allergen" className="mt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 mt-0.5 text-emerald-500"/> Misafirin profilinde kayıtlı alerjenlere göre otomatik filtreleme.</li>
                    <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 mt-0.5 text-primary"/> Alternatif malzemeli öneriler (laktozsuz, glutensiz, fıstıksız).</li>
                    <li className="flex items-start gap-2"><Users className="h-4 w-4 mt-0.5"/> Yönetim paneli: malzeme/etiket/uyarı yönetimi.</li>
                  </ul>
                </TabsContent>
                <TabsContent value="bestsellers" className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">En Çok Satılan 5 Ürün</p>
                      <ol className="mt-2 space-y-1 list-decimal list-inside text-sm">
                        <li>Smash Burger</li>
                        <li>BBQ Tavuk Wrap</li>
                        <li>Trüflü Parmesan Patates</li>
                        <li>Cold Brew</li>
                        <li>Gurme San Sebastian</li>
                      </ol>
                    </div>
                    <div className="rounded-2xl border p-3">
                      <p className="text-sm mb-2">Sipariş Süresi (dakika)</p>
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={kpiChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="metric" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Legacy" fill="#8884d8" />
                          <Bar dataKey="NovaAI" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="menu" className="mt-4">
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    {[
                      { name: "Smash Burger", price: 285, tags: ["gluten", "süt"] },
                      { name: "Vegan Bowl", price: 245, tags: ["vegan", "glutensiz"] },
                      { name: "BBQ Tavuk Wrap", price: 215, tags: ["gluten"] },
                      { name: "Cold Brew", price: 95, tags: [] },
                    ].map((m, i) => (
                      <div key={i} className="rounded-2xl border p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{m.name}</p>
                          <p className="text-muted-foreground">{m.tags.join(", ") || "etiket yok"}</p>
                        </div>
                        <Badge>{m.price}₺</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary"/> Yapay Zeka Garson</CardTitle>
              <CardDescription>Fiziksel cihaz + web tabanlı dinleme. Sohbet, öneri ve sipariş.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  <p className="font-medium">Öne Çıkanlar</p>
                  <ul className="space-y-2">
                    <li className="flex gap-2"><Sparkles className="h-4 w-4 mt-0.5 text-primary"/> Wake‑word ile eller serbest sipariş.</li>
                    <li className="flex gap-2"><Sparkles className="h-4 w-4 mt-0.5 text-primary"/> Menüden çapraz satış/upsell.
                    </li>
                    <li className="flex gap-2"><ShieldCheck className="h-4 w-4 mt-0.5 text-emerald-500"/> Alerjen/etik uyumluluk bilgilendirmeleri.</li>
                    <li className="flex gap-2"><Users className="h-4 w-4 mt-0.5"/> POS, mutfak ekranı (KDS), stok entegrasyonları.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border p-4">
                  <p className="text-sm mb-2">İş Gücü Maliyeti Karşılaştırması</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={monthlyCostChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Human" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="AI" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* DETAILED PAGES */}
      <Section id="qr" eyebrow="Detay Sayfası" title="QR Menü: Güvenli, Akıllı, Kârlı" description="Misafir deneyimini kişiselleştirirken alerjen risklerini azaltın ve satışları artırın.">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Özellik Seti</CardTitle>
              <CardDescription>Ölçekli işletmeler için tasarlanmış ileri fonksiyonlar.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                "Alerjen filtreleme ve malzeme etiketleme",
                "Gerçek zamanlı menü güncelleme & dinamik fiyat",
                "Çok dilli içerik, görsel menü ve diyet tercihi",
                "Upsell/Çapraz satış öneri motoru",
                "POS ve stok senkronizasyonu",
                "Analitik panolar: satış, saat, ürün, şube",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-primary"/> {t}</div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Uyumluluk</CardTitle>
              <CardDescription>KVKK/GDPR ve PCI pratikleri.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>Yetki matrisi, şifreli aktarım, anonimleştirme, erişim logları.</p>
              <p>Rol tabanlı panel ve on‑premise/edge seçenekleri.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="waiter" eyebrow="Detay Sayfası" title="AI Garson: Donanım + Web Dinleme" description="Masada fiziksel cihazla veya sadece QR üzerinden web tabanlı dinleme ile çalışan hibrit model.">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Çalışma Prensibi</CardTitle>
              <CardDescription>STT → NLU → Öneri Motoru → POS/Sipariş → TTS.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl border p-4">
                  <p className="font-medium mb-1">Fiziksel Ürün</p>
                  <p className="text-muted-foreground">Mikrofon dizisi, hoparlör, düşük gecikmeli işlemci. Tek tuş kurulum.</p>
                </div>
                <div className="rounded-2xl border p-4">
                  <p className="font-medium mb-1">Web Dinleme</p>
                  <p className="text-muted-foreground">Masadaki QR ile açılır. Tarayıcıda dinler, konuşur, sipariş tamamlar.</p>
                </div>
                <div className="rounded-2xl border p-4">
                  <p className="font-medium mb-1">Mutfağa Akış</p>
                  <p className="text-muted-foreground">KDS entegrasyonu; iptal/düzeltme, menü tükenme uyarıları.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>SLAs & Destek</CardTitle>
              <CardDescription>7/24 izleme, L3 mühendislik destek hattı.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>Uptime hedefi %99.9 • Otomatik güncelleme kanalları</p>
              <p>Rollout: Pilot (2 hafta) → Eğitim → Zincir yayılımı</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ANALYSIS */}
      <Section id="analysis" eyebrow="Raporlama" title="Rakip Analizi, İhtiyaç Matrisi ve ROI" description="Yatırım kararınızı rasyonel verilerle destekleyin.">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Rakip Karşılaştırma Tablosu</CardTitle>
              <CardDescription>Öne çıkan özelliklerin hızlı kıyaslaması.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-2xl border">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3">Şirket</th>
                      <th className="text-left p-3">QR Menü</th>
                      <th className="text-left p-3">Sesli AI</th>
                      <th className="text-left p-3">Analitik</th>
                      <th className="text-left p-3">Fiyat</th>
                      <th className="text-left p-3">Bölge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorRows.map((r, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3 font-medium">{r.name}</td>
                        <td className="p-3">{r.qrMenu ? "✓" : "—"}</td>
                        <td className="p-3">{r.voiceAI ? "✓" : "—"}</td>
                        <td className="p-3">{r.analytics}</td>
                        <td className="p-3">{r.price}</td>
                        <td className="p-3">{r.region}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İhtiyaç Analizi</CardTitle>
              <CardDescription>Hedef, kısıt, başarı metriği.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="flex items-start gap-3"><Users className="h-4 w-4 mt-0.5"/> <div>
                <p className="font-medium">Operasyon</p>
                <p className="text-muted-foreground">Yoğun saatlerde bekleme süresi & hatalı siparişler.</p>
              </div></div>
              <div className="flex items-start gap-3"><DollarSign className="h-4 w-4 mt-0.5"/> <div>
                <p className="font-medium">Finans</p>
                <p className="text-muted-foreground">İş gücü maliyeti, personel devir hızı, upsell fırsatları.</p>
              </div></div>
              <div className="flex items-start gap-3"><ShieldCheck className="h-4 w-4 mt-0.5 text-emerald-500"/> <div>
                <p className="font-medium">Uyumluluk</p>
                <p className="text-muted-foreground">Alerjen bilgilendirmeleri, KVKK/GDPR.</p>
              </div></div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>ROI Hesaplayıcı</CardTitle>
              <CardDescription>Zincir özelinde hızlı tahmin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label>Aylık Kişi (covers)</Label>
                    <Input type="number" value={roi.monthlyCovers} onChange={(e)=>setRoi({ ...roi, monthlyCovers: Number(e.target.value) })} />
                  </div>
                  <div>
                    <Label>Garson Saat Ücreti ($)</Label>
                    <Input type="number" value={roi.avgWage} onChange={(e)=>setRoi({ ...roi, avgWage: Number(e.target.value) })} />
                  </div>
                  <div>
                    <Label>Vardiya Başına Garson</Label>
                    <Input type="number" value={roi.waiterPerShift} onChange={(e)=>setRoi({ ...roi, waiterPerShift: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label>Günlük Vardiya</Label>
                    <Input type="number" value={roi.shiftsPerDay} onChange={(e)=>setRoi({ ...roi, shiftsPerDay: Number(e.target.value) })} />
                  </div>
                  <div>
                    <Label>Gün / Ay</Label>
                    <Input type="number" value={roi.days} onChange={(e)=>setRoi({ ...roi, days: Number(e.target.value) })} />
                  </div>
                  <div>
                    <Label>AI Lisans ($/ay)</Label>
                    <Input type="number" value={roi.aiLic} onChange={(e)=>setRoi({ ...roi, aiLic: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label>Ortalama Sepet ($)</Label>
                    <Input type="number" value={roi.avgTicket} onChange={(e)=>setRoi({ ...roi, avgTicket: Number(e.target.value) })} />
                  </div>
                  <div>
                    <Label>Upsell Artışı (%)</Label>
                    <Input type="number" value={roi.upsellLift*100} onChange={(e)=>setRoi({ ...roi, upsellLift: Number(e.target.value)/100 })} />
                  </div>
                  <div>
                    <Label>Segment</Label>
                    <Select defaultValue="casual">
                      <SelectTrigger><SelectValue placeholder="Seçin"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quick">Quick Service</SelectItem>
                        <SelectItem value="casual">Casual Dining</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator className="my-6"/>

              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-primary/5">
                  <CardHeader className="pb-1"><CardTitle className="text-base">İnsan Maliyeti</CardTitle></CardHeader>
                  <CardContent className="text-2xl font-semibold">${humanCost.toLocaleString()}</CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-1"><CardTitle className="text-base">AI Lisans</CardTitle></CardHeader>
                  <CardContent className="text-2xl font-semibold">${aiCost.toLocaleString()}</CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-1"><CardTitle className="text-base">Upsell Geliri</CardTitle></CardHeader>
                  <CardContent className="text-2xl font-semibold">${upsellGain.toLocaleString()}</CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-1"><CardTitle className="text-base">Net Etki</CardTitle></CardHeader>
                  <CardContent className={`text-2xl font-semibold ${netSavings>=0?"text-emerald-600":"text-destructive"}`}>${netSavings.toLocaleString()}</CardContent>
                </Card>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">Tahmini geri dönüş süresi: <span className="font-medium text-foreground">{paybackDays} gün</span></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Psikoloji & İkna</CardTitle>
              <CardDescription>Karar vericiler için fayda çerçevesi.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <p><strong>Risk azaltma:</strong> SLA, destek ve deneme garantisi.</p>
              <p><strong>Gelir artışı:</strong> Tutarlı upsell ve sepet büyütme.</p>
              <p><strong>Çalışan memnuniyeti:</strong> Yoğun saatlerde yük paylaşımı.</p>
              <p><strong>Marka algısı:</strong> Modern, erişilebilir ve kişisel deneyim.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="İletişim" title="Fiyat & Demo Talebi" description="Kısa formu doldurun, 24 saat içinde dönüş yapalım.">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Teklif Formu</CardTitle>
              <CardDescription>Gerekli minimum alanlar ile.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Şirket Adı</Label>
                  <Input placeholder="Örn. Lezzetler A.Ş." />
                </div>
                <div className="space-y-2">
                  <Label>İletişim E‑posta</Label>
                  <Input type="email" placeholder="sizin@firma.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>İhtiyaçlar</Label>
                  <Textarea placeholder="QR menü + AI garson, POS entegrasyonu, pilot 3 şube…" rows={5} />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4"/> +90 (212) 000 00 00</div>
                  <Button type="button" size="lg">Teklif Al</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SSS (Kısa)</CardTitle>
              <CardDescription>Satın alma sürecinde sık sorulanlar.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="font-medium">Kurulum süresi?</p>
                <p className="text-muted-foreground">2 haftada pilot, 30–60 gün içinde zincir yayılımı.</p>
              </div>
              <div>
                <p className="font-medium">Mevcut POS ile uyum?</p>
                <p className="text-muted-foreground">Çoğu popüler POS ile entegrasyon kütüphanelerimiz mevcut.</p>
              </div>
              <div>
                <p className="font-medium">Gizlilik ve güvenlik?</p>
                <p className="text-muted-foreground">Veriler şifreli, erişimler loglu, KVKK/GDPR uyumlu.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t py-10">
        <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} NovaDine.AI — Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#services" className="hover:text-primary">Hizmetler</a>
            <a href="#analysis" className="hover:text-primary">Analizler</a>
            <a href="#contact" className="hover:text-primary">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
