"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Smartphone, Battery, Signal, Zap, Headphones, Droplets, Mic, Weight } from "lucide-react";

export default function TechnicalSpecs() {
  const nokiaSpecs = [
    { label: "نوع الشاشة", val: "1.8 بوصة QQVGA", icon: Smartphone },
    { label: "البطارية", val: "800 مللي أمبير", icon: Battery },
    { label: "الانتظار", val: "حتى 25 يوماً", icon: Zap },
    { label: "التحدث", val: "حتى 14 ساعة", icon: Zap },
    { label: "الشبكة", val: "2G Dual SIM", icon: Signal },
    { label: "الوزن", val: "73 جرام", icon: Weight }
  ];

  const m10Specs = [
    { label: "البلوتوث", val: "V5.1", icon: Signal },
    { label: "المسافة", val: "10 أمتار", icon: Zap },
    { label: "التشغيل", val: "4-5 ساعات", icon: Headphones },
    { label: "العلبة", val: "2000 مللي أمبير", icon: Battery },
    { label: "الماء", val: "IPX7", icon: Droplets },
    { label: "المايك", val: "عزل CVC 8.0", icon: Mic }
  ];

  return (
    <section className="py-24 bg-surface-2 relative overflow-hidden" id="specs">
      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            المواصفات التقنية
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-light leading-tight">
            مصنوع بدقة استثنائية
          </h2>
        </div>

        {/* Nokia Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            className="relative aspect-square rounded-[2rem] bg-gradient-to-tr from-void to-surface border border-border flex items-center justify-center overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gold/5 blur-[50px] rounded-full" />
            <div className="w-[85%] h-[85%] relative">
              <Image 
                src="/images/nokia/nokia-105-user.png" 
                alt="Nokia Specs"
                fill
                className="object-contain drop-shadow-[0_20px_40px_rgba(232,184,58,0.15)] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <div className="space-y-8">
            <h3 className="text-3xl md:text-4xl font-black text-light text-gold-shine border-b border-border pb-4">
              نوكيا 105 الأصلي
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {nokiaSpecs.map((s, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center justify-center text-center p-4 bg-void/50 border border-border rounded-2xl hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="text-muted text-xs font-bold mb-1">{s.label}</span>
                  <span className="text-light text-sm font-black">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* M10 Earbuds Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <h3 className="text-3xl md:text-4xl font-black text-light text-gold-shine border-b border-border pb-4">
              سماعات M10 Pro اللاسلكية
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {m10Specs.map((s, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center justify-center text-center p-4 bg-void/50 border border-border rounded-2xl hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className="text-muted text-xs font-bold mb-1">{s.label}</span>
                  <span className="text-light text-sm font-black">{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            className="relative aspect-square rounded-[2rem] bg-gradient-to-tr from-void to-surface border border-border flex items-center justify-center overflow-hidden order-1 lg:order-2 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gold/5 blur-[50px] rounded-full" />
            <div className="w-[85%] h-[85%] relative">
              <Image 
                src="/images/nokia/m10-earbuds-user.png" 
                alt="M10 Earbuds Specs"
                fill
                className="object-contain drop-shadow-[0_20px_40px_rgba(232,184,58,0.15)] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
