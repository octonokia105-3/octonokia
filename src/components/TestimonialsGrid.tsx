"use client";

import { motion } from "framer-motion";
import { MapPin, BadgeCheck } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "فاطمة الزهراء",
    city: "الدار البيضاء",
    image: "/assets/moroccan_reviewer_1_1783724611417.png",
    text: "صراحة الباك رائع جداً! التليفون صحيح مكيتهرسش والبطارية كدوم ليا سيمانة. السماعات صوتهم نقي بزاف وعجبوني. شكراً."
  },
  {
    name: "محمد أمين",
    city: "الرباط",
    image: "/assets/moroccan_reviewer_2_1783724625614.png",
    text: "أفضل شراء فعلته هاد العام! كنت محتاج تليفون للخدمة مكيخسرش، وهاد النوكيا دارلي الحل. السماعات M10 تاهوما جودة ديالهم واعرة والهدية لي صيفطتو عجبتني."
  },
  {
    name: "نادية بنعلي",
    city: "مراكش",
    image: "/assets/moroccan_reviewer_3_1783724640066.png",
    text: "التوصيل وصلني في اليوم الثاني من الطلب! الخدمة ممتازة والباك تجاوز توقعاتي. عجبني بزاف الدفع عند الاستلام مخلانيش نتردد."
  }
];

export default function TestimonialsGrid() {
  return (
    <section className="py-24 relative z-10 bg-surface-2/50" id="reviews">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            آراء العملاء
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-light leading-tight mb-4">
            ماذا يقول عملاؤنا؟
          </h2>
          <p className="text-muted text-lg">أكثر من 5,000 عميل راضٍ من جميع أنحاء المغرب</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-surface border border-border rounded-3xl p-8 hover:border-gold/30 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(232,184,58,0.1)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-4 left-6 text-7xl text-gold/10 font-serif leading-none select-none">"</div>
              
              <div className="flex gap-1 text-gold mb-6 relative z-10">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              
              <p className="text-muted text-sm leading-[1.8] min-h-[100px] relative z-10">
                "{rev.text}"
              </p>
              
              <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold shadow-lg shrink-0">
                    <Image src={rev.image} alt={rev.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-light">{rev.name}</span>
                    <span className="text-[10px] text-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {rev.city}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded-full">
                  <BadgeCheck className="w-3 h-3" /> موثق
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
