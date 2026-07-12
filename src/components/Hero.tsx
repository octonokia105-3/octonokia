"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Star, ShieldCheck, ShoppingCart, BatteryFull, Headphones } from "lucide-react";

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const productImg = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // 3D Cinematic text reveal
    gsap.from(".hero-text", {
      y: 80,
      opacity: 0,
      rotationX: -45,
      transformPerspective: 1000,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Dramatic Product Entrance
    gsap.from(productImg.current, {
      scale: 0.7,
      y: 120,
      opacity: 0,
      rotationY: 20,
      duration: 1.5,
      delay: 0.4,
      ease: "expo.out",
    });

    // Floating badges staggered entrance
    gsap.from(".hero-badge-float", {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 1.2,
      ease: "back.out(1.7)",
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[90vh] flex items-center pt-16 pb-12 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-[#5e9fff]/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMCAwdjYwaDYwVjBIMHptNTkgNTlIMVYxZDU4IDB2NTh6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDE1Ii8+Cjwvc3ZnPg==')] opacity-50" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="space-y-6">
          <div className="hero-text inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 text-gold text-xs font-bold uppercase tracking-wider">
            <Star className="w-4 h-4" />
            <span>الأكثر مبيعاً في المغرب 2026</span>
          </div>

          <h1 ref={headline} className="hero-text text-5xl md:text-[5.5rem] font-black leading-[1.05] text-light drop-shadow-2xl">
            باك 4 في 1 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#fff5cc] to-gold bg-[length:200%_auto] animate-[shine-text_4s_linear_infinite]">قيمة استثنائية</span>
          </h1>

          <p className="hero-text text-lg md:text-xl text-muted max-w-lg leading-relaxed font-medium">
            هاتف نوكيا 105 الأصلي + سماعات بلوتوث M10 Pro + بطاقتين SIM + عطر فاخر مجاناً. 
            قوة، صلابة، وصوت نقي في باك واحد.
          </p>

          {/* Micro Stats */}
          <div className="hero-text flex gap-6 flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-gold leading-none">25 يوم</span>
              <span className="text-xs text-muted font-bold uppercase">عمر البطارية</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-gold leading-none">5.1</span>
              <span className="text-xs text-muted font-bold uppercase">بلوتوث سريع</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-gold leading-none">+5000</span>
              <span className="text-xs text-muted font-bold uppercase">عميل راضٍ</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="hero-text bg-surface border border-border rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-5xl font-black text-gold">249</span>
              <span className="text-xl font-bold text-gold">د.م.</span>
              <span className="text-lg text-muted line-through">299 درهم</span>
              <span className="bg-urgent text-white text-xs font-bold px-3 py-1 rounded-full">-50 درهم</span>
            </div>
            <div className="flex items-center gap-2 text-success font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>التوصيل مجاني — الدفع فقط عند الاستلام</span>
            </div>
          </div>

          <div className="hero-text pt-2 flex flex-col gap-4">
            <a 
              href="#checkout" 
              className="flex items-center justify-center gap-3 w-full md:w-[80%] bg-gradient-to-br from-gold to-gold-hover text-void font-black text-xl py-5 rounded-xl shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-gold-lg)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden animate-glow-pulse"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>اطلب الآن — COD</span>
            </a>
            
            <div className="flex gap-4 justify-start text-xs font-bold text-muted">
              <span className="flex gap-1 items-center"><ShieldCheck className="w-4 h-4 text-success" /> ضمان سنة</span>
              <span className="flex gap-1 items-center"><Star className="w-4 h-4 text-gold" /> استرجاع 30 يوم</span>
            </div>
          </div>
        </div>

        {/* Cinematic Image Showcase with Badges */}
        <div className="relative flex justify-center items-center h-full min-h-[400px]">
          <div className="absolute inset-0 bg-gold/20 blur-[80px] rounded-full animate-glow-pulse opacity-50" />
          
          <div ref={productImg} className="relative z-10 w-full max-w-[450px] aspect-square animate-float">
            <Image 
              src="/assets/nokia_105_premium_1783722634966.png" 
              alt="Nokia 105 Premium"
              fill
              className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
              priority
            />
            
            {/* Floating Badge 1 - Battery */}
            <div className="hero-badge-float absolute top-[15%] -right-4 md:-right-10 glass-panel rounded-xl p-3 flex items-center gap-3 shadow-2xl animate-float-delayed">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <BatteryFull className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-light">25 يوم</span>
                <span className="text-xs text-muted">عمر البطارية</span>
              </div>
            </div>

            {/* Floating Badge 2 - Earbuds */}
            <div className="hero-badge-float absolute bottom-[20%] -left-4 md:-left-10 glass-panel rounded-xl p-3 flex items-center gap-3 shadow-2xl animate-float" style={{ animationDirection: 'reverse' }}>
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-light">M10 Pro</span>
                <span className="text-xs text-muted">صوت نقي</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
