"use client";

import { Star, Users, Truck, ShieldCheck, RefreshCw, Phone, Award, Zap } from "lucide-react";

const marqueeItems = [
  { icon: Star, text: "4.9/5 تقييم العملاء" },
  { icon: Users, text: "+5,000 عميل راضٍ" },
  { icon: Truck, text: "توصيل مجاني لجميع المدن" },
  { icon: ShieldCheck, text: "ضمان سنة كاملة" },
  { icon: RefreshCw, text: "استرجاع مجاني خلال 30 يوم" },
  { icon: Phone, text: "دعم عملاء 24/7" },
  { icon: Award, text: "جودة مُعتمدة" },
  { icon: Zap, text: "شحن خلال 24-48 ساعة" },
];

export default function SocialProofMarquee() {
  return (
    <div className="bg-surface border-y border-border py-4 overflow-hidden relative flex">
      {/* Gradient Fades for Shrine Theme look */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex w-max animate-[scroll-left_30s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Double the items for seamless infinite scroll */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-12 whitespace-nowrap">
            <div className="w-10 h-10 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center shrink-0 drop-shadow-[0_0_15px_rgba(232,184,58,0.5)]">
              <item.icon className="w-5 h-5 text-gold" />
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#fff5cc] via-gold to-[#a87b1c] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-wide">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
