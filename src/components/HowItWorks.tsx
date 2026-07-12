"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "1", title: "أملأ النموذج", desc: "أدخل اسمك ورقم هاتفك وعنوانك — يستغرق أقل من دقيقة" },
  { num: "2", title: "تأكيد الطلب", desc: "سيتصل بك فريقنا خلال ساعات لتأكيد طلبك وتحديد موعد التوصيل" },
  { num: "3", title: "التوصيل السريع", desc: "يصلك المنتج خلال 24-48 ساعة بطريقة آمنة ومضمونة لبابك" },
  { num: "4", title: "الدفع عند الاستلام", desc: "تدفع فقط عند استلام المنتج — لا مخاطرة، لا دفع مسبق" },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-void relative z-10 border-y border-border overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            طريقة الطلب
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-light leading-tight">
            4 خطوات بسيطة<br />للحصول على منتجك
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 pt-6">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-gradient-to-l from-transparent via-gold to-transparent opacity-50 z-0" />

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-gold text-void font-black text-2xl flex items-center justify-center mb-6 shadow-[0_0_0_6px_rgba(232,184,58,0.15)] group-hover:shadow-[0_0_0_10px_rgba(232,184,58,0.25)] transition-all drop-shadow-[0_0_15px_rgba(232,184,58,0.5)]">
                {step.num}
              </div>
              <h3 className="text-lg font-black text-light mb-2">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed max-w-[250px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
