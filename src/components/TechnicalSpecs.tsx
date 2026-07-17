"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Smartphone, Battery, Signal, Zap, Headphones, Droplets, Mic, Weight } from "lucide-react";

export default function TechnicalSpecs() {
  const nokiaSpecs = [
    { label: "شاشة", val: "1.8 بوصة QQVGA", icon: Smartphone },
    { label: "بطارية", val: "800 مللي أمبير", icon: Battery },
    { label: "انتظار", val: "حتى 25 يوماً", icon: Zap },
    { label: "شبكة", val: "2G Dual SIM", icon: Signal },
  ];

  const m10Specs = [
    { label: "بلوتوث", val: "V5.1", icon: Signal },
    { label: "تشغيل", val: "4-5 ساعات", icon: Headphones },
    { label: "علبة شحن", val: "2000 مللي أمبير", icon: Battery },
    { label: "عزل", val: "CVC 8.0", icon: Mic },
  ];

  return (
    <section className="py-24 bg-void relative overflow-hidden" id="specs">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,184,58,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            الخصائص التقنية
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-light leading-tight text-gold-shine">
            مواصفات لا تقبل المساومة
          </h2>
          <p className="text-muted mt-4 text-lg">كل ما تحتاجه من قوة التحمل والصوت النقي في باقة واحدة</p>
        </div>

        {/* Desktop: 3 Columns. Mobile: Stacked */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          {/* Left: Nokia Specs */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <h3 className="text-2xl font-black text-gold border-b border-border/50 pb-3 text-right">نوكيا 105</h3>
            {nokiaSpecs.map((s, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i} 
                className="flex items-center justify-end gap-4 p-4 bg-surface-2/50 backdrop-blur-sm border border-border rounded-2xl hover:border-gold/50 transition-colors"
              >
                <div className="text-right">
                  <div className="text-muted text-xs font-bold">{s.label}</div>
                  <div className="text-light text-lg font-black">{s.val}</div>
                </div>
                <div className="w-12 h-12 shrink-0 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <s.icon className="w-6 h-6" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center: Massive Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative w-full aspect-square lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(232,184,58,0.2)] border border-gold/20"
          >
            <Image 
              src="/images/nokia/cinematic_bundle.png" 
              alt="Nokia and M10 Bundle"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[2s]"
            />
            {/* Inner shadow for blending */}
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(10,10,10,0.8)] pointer-events-none" />
          </motion.div>

          {/* Right: M10 Specs */}
          <div className="order-3 lg:order-3 flex flex-col gap-6">
            <h3 className="text-2xl font-black text-gold border-b border-border/50 pb-3 text-left">سماعات M10</h3>
            {m10Specs.map((s, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i} 
                className="flex items-center justify-start gap-4 p-4 bg-surface-2/50 backdrop-blur-sm border border-border rounded-2xl hover:border-gold/50 transition-colors"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-muted text-xs font-bold">{s.label}</div>
                  <div className="text-light text-lg font-black">{s.val}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
