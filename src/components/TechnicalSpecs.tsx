"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Smartphone, Battery, Signal, Zap, Headphones, Droplets, Mic, Weight } from "lucide-react";

export default function TechnicalSpecs() {
  const nokiaSpecs = [
    { label: "نوع الشاشة", val: "1.8 بوصة QQVGA", icon: Smartphone },
    { label: "البطارية", val: "800 مللي أمبير", icon: Battery },
    { label: "وقت الانتظار", val: "حتى 25 يوماً", icon: Zap },
    { label: "وقت التحدث", val: "حتى 14 ساعة", icon: Zap },
    { label: "الشبكة", val: "2G Dual SIM", icon: Signal },
    { label: "الوزن", val: "73 جرام", icon: Weight }
  ];

  const m10Specs = [
    { label: "إصدار البلوتوث", val: "V5.1", icon: Signal },
    { label: "مسافة الاتصال", val: "10 أمتار", icon: Zap },
    { label: "وقت التشغيل", val: "4-5 ساعات للمرة", icon: Headphones },
    { label: "بطارية العلبة", val: "2000 مللي أمبير (باوربانك)", icon: Battery },
    { label: "مقاومة الماء", val: "IPX7", icon: Droplets },
    { label: "الميكروفون", val: "مدمج مع عزل CVC 8.0", icon: Mic }
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
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[2rem] bg-void border border-border flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gold/5 blur-[50px] rounded-full" />
            <div className="w-[85%] h-[85%] relative">
              <Image 
                src="/images/nokia/nokia-105-user.png" 
                alt="Nokia Specs"
                fill
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-2xl"
              />
            </div>
          </motion.div>

          <div className="space-y-8">
            <h3 className="text-3xl font-black text-light text-gold-shine border-b border-border pb-4">
              نوكيا 105 الأصلي
            </h3>
            
            <div className="flex flex-col gap-3">
              {nokiaSpecs.map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex justify-between items-center p-3 bg-void border border-border rounded-lg"
                >
                  <span className="text-muted text-sm font-bold flex items-center gap-2"><s.icon className="w-4 h-4 text-gold" /> {s.label}</span>
                  <span className="text-light text-sm font-black">{s.val}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* M10 Earbuds Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <h3 className="text-3xl font-black text-light text-gold-shine border-b border-border pb-4">
              سماعات M10 Pro اللاسلكية
            </h3>
            
            <div className="flex flex-col gap-3">
              {m10Specs.map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex justify-between items-center p-3 bg-void border border-border rounded-lg"
                >
                  <span className="text-muted text-sm font-bold flex items-center gap-2"><s.icon className="w-4 h-4 text-gold" /> {s.label}</span>
                  <span className="text-light text-sm font-black">{s.val}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[2rem] bg-void border border-border flex items-center justify-center overflow-hidden order-1 md:order-2"
          >
            <div className="absolute inset-0 bg-gold/5 blur-[50px] rounded-full" />
            <div className="w-[85%] h-[85%] relative">
              <Image 
                src="/images/nokia/m10-earbuds-user.png" 
                alt="M10 Earbuds Specs"
                fill
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
