"use client";

import { motion } from "framer-motion";
import { BatteryCharging, Smartphone, Headphones, Gift } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "تلفون قوي يصبر معاك",
    desc: "نوكيا 105 الأصلي – قوي، عملي، ويدوم. بطارية كتدوم حتى 25 يوم فالانتظار، وتصميم متين مقاوم للخدوش والصدمات.",
    icon: Smartphone,
    colSpan: "col-span-1 md:col-span-2",
    img: "/assets/nokia_105_premium_1783722634966.png"
  },
  {
    id: 2,
    title: "صوت نقي وحرية تامة",
    desc: "سماعات M10 Pro باتصال سريع، مقاومة للماء والعرق، وميكروفون عازل للضوضاء.",
    icon: Headphones,
    colSpan: "col-span-1",
    img: "/assets/m10_earbuds_premium_1783722648341.png"
  },
  {
    id: 3,
    title: "بطارية تدوم طويلاً",
    desc: "14 ساعة مكالمات للنوكيا، وعلبة سماعات تشحن 3 مرات إضافية.",
    icon: BatteryCharging,
    colSpan: "col-span-1",
    img: null
  },
  {
    id: 4,
    title: "هدية مجانية مفاجئة",
    desc: "عطر فاخر أو حقيبة مع كل طلب! قيمة استثنائية لباك 4 في 1.",
    icon: Gift,
    colSpan: "col-span-1 md:col-span-2",
    img: "/assets/premium_gift_perfume_1783722676914.png"
  }
];

export default function BentoFeatures() {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            لماذا يختار 95% من عملائنا هذا العرض؟
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-light mb-4 leading-tight">
            4 منتجات في باك واحد <br /> قيمة استثنائية
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, borderColor: "rgba(232,184,58,0.4)" }}
              className={`glass-panel rounded-3xl p-8 relative overflow-hidden group transition-colors duration-500 ${item.colSpan}`}
            >
              {/* Background Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center text-gold mb-6 shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-2xl font-bold text-light mb-3">{item.title}</h3>
                <p className="text-muted leading-relaxed max-w-md">{item.desc}</p>
                
                {item.img && (
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none mix-blend-screen">
                    <Image 
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
