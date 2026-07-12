"use client";

import { useState, useEffect } from "react";
import { Timer, MessageSquareHeart } from "lucide-react";

export default function UrgencyBar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return prev; // Stop at 0
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-gradient-to-r from-urgent/10 to-transparent border border-urgent/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_30px_rgba(255,71,87,0.15)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-urgent/20 blur-[50px]" />

          <div className="space-y-3 text-center md:text-right relative z-10">
            <div className="inline-flex items-center gap-2 text-urgent font-bold text-sm tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-urgent animate-pulse" />
              هذا العرض خاص سينتهي قريبا
            </div>
            <h3 className="text-3xl font-black text-light">لا تفوت العرض!</h3>
            <p className="text-muted">اطلب الآن قبل ما يخلص المخزون (آخر 30 وحدة متبقية)</p>
          </div>

          <div className="flex items-center gap-4 text-center relative z-10" dir="ltr">
            <div className="flex flex-col gap-1">
              <div className="w-16 h-16 rounded-2xl bg-void border-2 border-urgent/40 flex items-center justify-center text-3xl font-black text-urgent shadow-[0_0_20px_rgba(255,71,87,0.2)]">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-xs font-bold text-muted uppercase">ساعة</span>
            </div>
            <span className="text-2xl font-black text-urgent/60 -mt-6 animate-pulse">:</span>
            <div className="flex flex-col gap-1">
              <div className="w-16 h-16 rounded-2xl bg-void border-2 border-urgent/40 flex items-center justify-center text-3xl font-black text-urgent shadow-[0_0_20px_rgba(255,71,87,0.2)]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-xs font-bold text-muted uppercase">دقيقة</span>
            </div>
            <span className="text-2xl font-black text-urgent/60 -mt-6 animate-pulse">:</span>
            <div className="flex flex-col gap-1">
              <div className="w-16 h-16 rounded-2xl bg-void border-2 border-urgent/40 flex items-center justify-center text-3xl font-black text-urgent shadow-[0_0_20px_rgba(255,71,87,0.2)]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="text-xs font-bold text-muted uppercase">ثانية</span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 space-y-6">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-light inline-flex items-center gap-3">
              <MessageSquareHeart className="w-6 h-6 text-gold" />
              أراء الزبناء
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "وصال مجاهد", text: "الباك واعر بزاف! تليفون خدام مزيان، والسماعات كيعجبوني. شكراً بزاف 💙" },
              { name: "خديجة أبو النور", text: "شريتو لماما، وبقات فرحانة به، تقدر تهدر وتسمع بلا مشاكل. منتوجات تستاهل!" },
              { name: "محمد بليج", text: "sara7a pack zwin kanchkrkom 3la lqualite" }
            ].map((review, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-gold mb-3">
                  {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="font-bold text-light text-sm">{review.name}</div>
                <div className="text-success text-xs flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                  مشتري مؤكد
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
