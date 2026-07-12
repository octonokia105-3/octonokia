"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 33 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-urgent/10 to-transparent border border-urgent/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 text-urgent font-bold text-xs uppercase tracking-widest">
            <Flame className="w-4 h-4" />
            عرض محدود المدة
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-light leading-tight">
            تبقى فقط <span className="text-urgent">7</span> قطع بالسعر المخفض!
          </h2>
          <p className="text-muted text-sm font-medium">لا تفوّت هذه الفرصة — ينتهي العرض قريباً</p>
        </div>

        <div className="flex items-center gap-3 shrink-0" dir="ltr">
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-void border-2 border-urgent/40 flex items-center justify-center text-2xl md:text-3xl font-black text-urgent shadow-[0_0_15px_rgba(255,71,87,0.2)] transition-all">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className="text-[10px] md:text-xs font-bold text-muted uppercase">ساعات</span>
          </div>
          <div className="text-xl md:text-2xl font-black text-urgent/60 -mt-5 animate-pulse">:</div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-void border-2 border-urgent/40 flex items-center justify-center text-2xl md:text-3xl font-black text-urgent shadow-[0_0_15px_rgba(255,71,87,0.2)] transition-all">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className="text-[10px] md:text-xs font-bold text-muted uppercase">دقائق</span>
          </div>
          <div className="text-xl md:text-2xl font-black text-urgent/60 -mt-5 animate-pulse">:</div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-void border-2 border-urgent/40 flex items-center justify-center text-2xl md:text-3xl font-black text-urgent shadow-[0_0_15px_rgba(255,71,87,0.2)] transition-all">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <span className="text-[10px] md:text-xs font-bold text-muted uppercase">ثواني</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
