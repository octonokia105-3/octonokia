"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "كيف يتم الدفع عند الاستلام؟",
    a: "عند وصول المنتج إلى بابك، يسلمك عامل التوصيل المنتج أولاً، وبعد التحقق منه تدفع المبلغ نقداً. لا حاجة لأي دفع مسبق عبر الإنترنت أو بطاقة بنكية."
  },
  {
    q: "متى سيصلني الطلب؟",
    a: "نقوم بتوصيل الطلبات خلال 24 إلى 48 ساعة كحد أقصى لجميع مدن المغرب. سيتصل بك المندوب لتحديد الوقت المناسب لك."
  },
  {
    q: "هل المنتجات أصلية؟",
    a: "نعم، هاتف نوكيا 105 أصلي 100% ويأتي مع ضمان لمدة سنة كاملة. سماعات M10 Pro أصلية ومختبرة لضمان أفضل جودة صوت وعزل."
  },
  {
    q: "ما هي الهدية المجانية؟",
    a: "مع كل طلب، نرسل لك عطر فاخر للرجال أو النساء، أو حقيبة يدوية أنيقة (حسب المخزون المتوفر). وهي هدية مجانية بالكامل كعربون شكر."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-surface-2 relative z-10" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-light leading-tight mb-4 flex items-center justify-center gap-4">
            <HelpCircle className="w-10 h-10 text-gold" />
            كل ما تريد معرفته
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`bg-surface border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-gold/40' : 'border-border hover:border-gold/20'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right outline-none"
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-gold' : 'text-light'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : 'text-muted'}`} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-muted leading-relaxed border-t border-border mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
