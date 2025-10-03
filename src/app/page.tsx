'use client';

import Banner from "@/components/Banner";
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
  <section id={id} className="py-14 lg:py-20">
    <div className="container mx-auto max-w-7xl px-6">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
        {eyebrow && <p className="text-sm tracking-widest text-primary mb-2 uppercase">{eyebrow}</p>}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
        {description && (
          <p className="mt-2 text-muted-foreground text-lg max-w-3xl">{description}</p>
        )}
      </motion.div>
      <div className="mt-8">{children}</div>
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

  // Fixed-locale number formatter to avoid SSR/CSR mismatch (e.g., 20,160 vs 20.160)
  const nf = useMemo(() => new Intl.NumberFormat('en-US'), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur border-b bg-background/70">
        <div className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center shadow-lg">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight text-lg">NovaDine.AI</span>
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

      <Banner />
      {/* HERO
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-background to-background">
        <div className="container mx-auto max-w-7xl px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge variant="outline" className="mb-3">Restoran Zincirleri için Üretken Yapay Zeka</Badge>
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              Daha Hızlı Servis, Daha Yüksek Sepet: <span className="text-primary">Garsonsuz</span> Gelecek
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              NovaDine.AI; zincir restoranlar için QR menü, konuşan sipariş asistanı ve ileri analitik sunar.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg"><a href="#contact">Fiyat & Demo</a></Button>
              <Button asChild variant="secondary" size="lg"><a href="#services">Tüm Hizmetler</a></Button>
            </div>
          </motion.div>
        </div>
      </section> */}


      {/* FEATURES */}
      <Section id="services" eyebrow="Hizmet Kataloğu" title="Ayrı Projelerimiz" description="Her modül bağımsız olarak alınabilir; birlikte kullanıldığında zincir gücünü artırır.">
        <div className="grid lg:grid-cols-2 gap-10">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5 text-primary"/> QR Menü Platformu</CardTitle>
              <CardDescription>Alerjen güvenliği, dinamik fiyatlama ve öneri motoru.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Misafir deneyimini kişiselleştirin ve satışları artırın.</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary"/> Yapay Zeka Garson</CardTitle>
              <CardDescription>Fiziksel cihaz + web tabanlı dinleme. Sohbet, öneri ve sipariş.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Masada veya QR üzerinden web ile çalışan hibrit çözüm.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ANALYSIS */}
      <Section id="analysis" eyebrow="Raporlama" title="Rakip Analizi ve ROI" description="Yatırım kararınızı rasyonel verilerle destekleyin.">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>ROI Hesaplayıcı</CardTitle>
              <CardDescription>Zincir özelinde hızlı tahmin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-primary/5">
                  <CardHeader className="pb-1"><CardTitle className="text-base">İnsan Maliyeti</CardTitle></CardHeader>
                  <CardContent className="text-2xl font-semibold">${nf.format(humanCost)}</CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-1"><CardTitle className="text-base">AI Lisans</CardTitle></CardHeader>
                  <CardContent className="text-2xl font-semibold">${nf.format(aiCost)}</CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-1"><CardTitle className="text-base">Upsell Geliri</CardTitle></CardHeader>
                  <CardContent className="text-2xl font-semibold">${nf.format(upsellGain)}</CardContent>
                </Card>
                <Card className="bg-primary/5">
                  <CardHeader className="pb-1"><CardTitle className="text-base">Net Etki</CardTitle></CardHeader>
                  <CardContent className={`text-2xl font-semibold ${netSavings>=0?"text-emerald-600":"text-destructive"}`}>${nf.format(netSavings)}</CardContent>
                </Card>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Tahmini geri dönüş süresi: <span className="font-medium text-foreground">{paybackDays} gün</span></p>
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
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t py-10">
        <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© <span suppressHydrationWarning>{new Date().getFullYear()}</span> NovaDine.AI — Tüm hakları saklıdır.</p>
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
