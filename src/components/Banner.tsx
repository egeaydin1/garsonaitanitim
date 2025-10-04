'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, LineChart } from "lucide-react";

type CounterSpec = { label: string; target: number; suffix?: string };
const COUNTERS: CounterSpec[] = [
  { label: "Aktif Restoran", target: 500 },
  { label: "% Maliyet Azalması", target: 65, suffix: "%" },
  { label: "Ay Geri Ödeme", target: 8 },
  { label: "% Müşteri Memnuniyeti", target: 98, suffix: "%" },
];

export default function Banner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const headlineTop = "Restoranınızı";
  const headlineHi = "Geleceğe";
  const headlineBottom = "Taşıyan AI Teknolojisi";

  // Particles (canvas) — only on client
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let raf = 0;

    function setSize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = Math.max(540, window.innerHeight * 0.9);
    }
    setSize();

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    const particles: P[] = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      a: 0.2 + Math.random() * 0.6,
    }));

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => setSize();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Parallax on scroll (subtle)
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const rate = window.scrollY * -0.2;
      el.style.transform = `translateY(${rate}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Counters when in view
  useEffect(() => {
    const container = statsRef.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>('[data-counter]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        if (el.dataset.animated === 'true') return;
        el.dataset.animated = 'true';
        const target = Number(el.dataset.target || '0');
        let value = 0;
        const step = Math.max(1, target / 120);
        const tick = () => {
          value += step;
          if (value >= target) {
            el.innerText = (Math.round(target)).toString();
          } else {
            el.innerText = Math.floor(value).toString();
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.2 });
    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Util to split text into spans with stagger
  const split = (text: string, startDelay = 0.1) =>
  text.split("").map((ch, i) => (
    <span
      key={i}
      className="letter bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow"
      style={{ animationDelay: `${startDelay + i * 0.06}s` }}
    >
      {ch}
    </span>
  ));

  const badge = useMemo(() => (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-white/90 backdrop-blur-md text-[13px] font-medium animate-fadeUp">
      <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-90"><path fill="currentColor" d="m12 17.27l6.18 3.73l-1.64-7.03L21 9.24l-7.19-.61L12 2L10.19 8.63L3 9.24l4.46 4.73L5.82 21z"/></svg>
      Restoran Zincirleri için Üretken Yapay Zeka
    </div>
  ), []);

  return (
    <section className="relative min-h-[80vh] md:min-h-[92vh] overflow-hidden bg-gradient-to-br from-primary to-primary/80" aria-label="Hero">
      {/* background decorative blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-10%] top-[20%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[5%] h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute left-[30%] bottom-[10%] h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />
      </div>

      {/* particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-0 pointer-events-none" />

      <div ref={heroRef} className="relative z-10 container mx-auto max-w-7xl px-6 pt-20 md:pt-28 pb-16 md:pb-24 text-center">
        <div className="mb-6">{badge}</div>

        <h1 className="text-white font-extrabold tracking-tight leading-[0.95]">
          <span className="block text-[clamp(2.8rem,7.2vw,5.8rem)]">
            {split(headlineTop, 0.10)}
          </span>

          <span className="block mx-2">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow
                            block text-[clamp(2.8rem,7.2vw,5.8rem)]">
              {split(" " + headlineHi + " ", 1.2)}
            </span>
          </span>

          <span className="block text-[clamp(2.8rem,7.2vw,5.8rem)]">
            {split(headlineBottom, 2.2)}
          </span>
        </h1>

        <p className="hero-subtitle mx-auto mt-4 max-w-3xl text-white/90 text-[clamp(1rem,2.2vw,1.25rem)]">
          Yapay zekâ destekli QR menü ve konuşan sipariş asistanıyla operasyon hızını artırın, maliyeti düşürün, misafir deneyimini uçurun.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-fadeUp [animation-delay:.8s]">
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <a href="#services"><Play className="mr-2 h-4 w-4" /> Demo İzle</a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="#analysis"><LineChart className="mr-2 h-4 w-4" /> Analiz Sonuçları</a>
          </Button>
        </div>

        <div ref={statsRef} className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 text-white animate-fadeUp [animation-delay:1s]">
          {COUNTERS.map((c, i) => (
            <div key={i} className="rounded-2xl/rounded-3xl text-center">
              <span
                data-counter
                data-target={c.target}
                className="block text-4xl md:text-5xl font-extrabold tabular-nums"
              >
                0
              </span>
              <span className="text-sm md:text-base opacity-90">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
