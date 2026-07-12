"use client";

import { ShieldCheck, RefreshCw, Truck, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustGuarantees() {
  const guarantees = [
    { icon: ShieldCheck, title: "ضمان سنة كاملة", desc: "كل قطعة مضمونة لمدة 12 شهراً — أي عطب نتكفل به مجاناً" },
    { icon: RefreshCw, title: "استرجاع مجاني 30 يوم", desc: "غير مرتاح؟ أعدنا لنا المنتج خلال 30 يوم واسترجع ثمنه" },
    { icon: Truck, title: "توصيل مجاني", desc: "نوصل لجميع المدن والمناطق في المغرب في 24-48 ساعة" },
    { icon: Headphones, title: "دعم عملاء 7/7", desc: "فريقنا جاهز كل يوم للإجابة على استفساراتك وحل أي مشكل" },
  ];

  return (
    <section className="py-20 bg-void relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface border border-border rounded-3xl p-8 text-center hover:border-gold/30 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(232,184,58,0.1)] group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mx-auto mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-void transition-all duration-500">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-light mb-3">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
