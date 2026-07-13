"use client";

import { Smartphone, BatteryCharging, Headphones, ShieldCheck, Gift, Ear } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DetailedFeatures() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
          المميزات
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-light leading-tight mb-4">
          تقنية المستقبل في<br />يديك اليوم
        </h2>
        <p className="text-muted max-w-xl mx-auto">
          صُمم هذا الباك ليمنحك تجربة متكاملة — هاتف قوي يصمد لأسابيع، وسماعات تعزلك عن ضجيج العالم
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Large Feature Card: Nokia */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="md:col-span-2 bg-gradient-to-br from-gold/10 to-surface border border-gold/25 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 hover:border-gold/40 transition-colors group"
        >
          <div className="flex-1 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-black text-light text-gold-shine">الهاتف الذي لا ينكسر ببطارية أسطورية</h3>
            <p className="text-muted leading-relaxed text-lg">
              وداعاً لشواحن الهواتف الذكية كل بضع ساعات! مع تصميم متين مقاوم للصدمات والخدوش، يدعم شريحتين SIM لتبقى على اتصال دائم. جودة مكالمات صافية وكشاف مدمج للطوارئ. 
            </p>
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-4xl font-black text-gold">100%</span>
              <span className="text-sm font-bold text-muted">أصلي ومضمون</span>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[400px]">
            <Image 
              src="/images/nokia/nokia-105-user.png" 
              alt="Nokia Phone Premium"
              fill
              className="object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_40px_rgba(232,184,58,0.2)]"
            />
          </div>
        </motion.div>

        {/* Feature 2: Earbuds (Promoted to large card) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="md:col-span-2 bg-gradient-to-br from-surface to-gold/5 border border-border rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row-reverse items-center gap-10 hover:border-gold/30 transition-all shadow-xl group"
        >
          <div className="flex-1 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
              <Headphones className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-black text-light text-gold-shine">سماعات M10 Pro اللاسلكية</h3>
            <p className="text-muted leading-relaxed text-lg">
              بلوتوث 5.1 لاتصال سريع وثابت. مقاومة للماء والعرق، مثالية للرياضة والتنقل. ميكروفون عازل للضوضاء لمكالمات صافية تجعلك تستمع بكل وضوح دون انقطاع.
            </p>
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-4xl font-black text-gold">5.1</span>
              <span className="text-sm font-bold text-muted uppercase">Bluetooth</span>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[400px]">
            <Image 
              src="/images/nokia/m10-earbuds-user.png" 
              alt="M10 Wireless Earbuds"
              fill
              className="object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_40px_rgba(232,184,58,0.2)]"
            />
          </div>
        </motion.div>

        {/* Feature 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="bg-surface border border-border rounded-[32px] p-8 hover:border-gold/30 hover:-translate-y-1 transition-all shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
            <BatteryCharging className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-light mb-3">بطارية جبارة</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            هاتف نوكيا يعمل حتى 25 يوماً في وضع الاستعداد و14 ساعة مكالمات. علبة السماعات تشحنها 3 مرات إضافية.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gold">25</span>
            <span className="text-xs font-bold text-muted">يوم انتظار</span>
          </div>
        </motion.div>

        {/* Feature 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="bg-surface border border-border rounded-[32px] p-8 hover:border-gold/30 hover:-translate-y-1 transition-all shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-light mb-3">هدية مجانية مفاجئة</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            مع كل طلب، نرسل لك عطر فاخر أو حقيبة أنيقة كعربون شكر على ثقتك بنا. 
          </p>
        </motion.div>

        {/* Feature 5 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="bg-surface border border-border rounded-[32px] p-8 hover:border-gold/30 hover:-translate-y-1 transition-all shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
            <Ear className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-light mb-3">عزل صوتي فائق</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            تقنية العزل الصوتي الذكي في السماعات تضمن لك الاستماع إلى موسيقاك أو مكالماتك بوضوح تام حتى في الأماكن المزدحمة.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
