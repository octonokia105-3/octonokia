"use client";

import { useState, useActionState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck, Send, Lock, Flame, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { submitOrder } from "@/app/actions/order";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const [selectedOffer, setSelectedOffer] = useState<1 | 2 | 3>(2);
  const [addBump, setAddBump] = useState(false);
  const [state, formAction, isPending] = useActionState(submitOrder, null);

  const offers = [
    { id: 1, title: "باك واحد (1)", price: 249, originalPrice: null, popular: false, desc: "هاتف نوكيا + سماعات M10" },
    { id: 2, title: "باكين (2)", price: 399, originalPrice: 498, popular: true, desc: "توفير 99 درهم" },
    { id: 3, title: "باقة العائلة (3 باكات)", price: 549, originalPrice: 747, popular: false, desc: "أحسن ثمن!" },
  ];

  const orderBumpPrice = 49;
  const currentOffer = offers.find(o => o.id === selectedOffer)!;
  const total = currentOffer.price + (addBump ? orderBumpPrice : 0);

  const router = useRouter();

  // Trigger browser tracking pixels exactly once upon successful submission
  useEffect(() => {
    if (state?.success && typeof window !== 'undefined') {
      try {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Purchase', { value: total, currency: 'MAD' });
        }
        if ((window as any).ttq) {
          (window as any).ttq.track('CompletePayment', { value: total, currency: 'MAD' });
        }
        if ((window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
              'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // User will need to configure this specifically later if they use labels
              'value': total,
              'currency': 'MAD'
          });
        }
      } catch (e) {
        console.error("Tracking Error:", e)
      }
      
      // Redirect to dedicated Thank You page
      router.push(`/thank-you?orderId=${state.orderId}&total=${total}&package=${encodeURIComponent(currentOffer.title)}&bump=${addBump}`);
    }
  }, [state?.success, total, router, state?.orderId, currentOffer.title, addBump]);

  return (
    <section id="checkout" className="py-24 relative z-10 bg-void overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Urgency Badge above the form */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-urgent/10 border border-urgent/20 rounded-full py-3 px-6 flex items-center justify-center gap-3 text-urgent font-bold">
            <Flame className="w-5 h-5 animate-pulse" />
            <span>سارع بالطلب! الكمية المتبقية: <span className="font-black text-lg">4</span> قطع فقط</span>
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Tombola Motivation Banner */}
        <div className="max-w-2xl mx-auto mb-8 text-center bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-2 border-gold rounded-2xl p-6 shadow-[0_0_30px_rgba(232,184,58,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-[50px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/20 blur-[50px] rounded-full pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-black text-gold mb-3 flex items-center justify-center gap-2">
            🎁 طومبولا الهدايا الكبرى!
          </h3>
          <p className="text-light text-lg font-medium leading-relaxed">
            كل من يكمل طلبه اليوم يدخل تلقائياً في السحب على <span className="font-bold text-gold">عطر فاخر مجاناً</span>! 
            <br className="hidden md:block" />
            لا تضيع هذه الفرصة الذهبية، قم بتعبئة الاستمارة الآن واضمن فرصتك في الفوز بالإضافة لتخفيض 50 درهم حصري!
          </p>
        </div>

        <form action={formAction} className="bg-surface-2 border border-border rounded-[2rem] p-6 md:p-10 shadow-2xl relative border-gold-glow">
          {/* Hidden inputs to pass state to server action */}
          <input type="hidden" name="package" value={currentOffer.title} />
          <input type="hidden" name="orderBump" value={addBump.toString()} />

          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Left Column: Offers */}
            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-light mb-6">🔥 خطوة واحدة لتأكيد طلبك، اختر العرض الأنسب لك:</h3>
                <div className="space-y-4">
                  {offers.map((offer) => {
                    const isSelected = selectedOffer === offer.id;
                    return (
                      <label 
                        key={offer.id}
                        className={`relative flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                          isSelected 
                            ? 'border-gold bg-gold/5 shadow-[0_0_20px_rgba(232,184,58,0.15)]' 
                            : 'border-border bg-void hover:border-gold/30'
                        }`}
                        onClick={() => setSelectedOffer(offer.id as 1|2|3)}
                      >
                        {offer.popular && (
                          <div className="absolute -top-3 left-4 bg-urgent text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                            <Flame className="w-3 h-3" /> الأكثر مبيعاً
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-gold' : 'border-muted'}`}>
                            {isSelected && <div className="w-3 h-3 bg-gold rounded-full" />}
                          </div>
                          <div>
                            <div className="font-black text-light text-lg">{offer.title}</div>
                            <div className="text-sm text-gold font-bold">{offer.desc}</div>
                          </div>
                        </div>
                        
                        <div className="text-left">
                          <div className="font-black text-light text-xl">{offer.price} د.م</div>
                          {offer.originalPrice && (
                            <div className="text-sm text-muted line-through">{offer.originalPrice} د.م</div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Order Bump Upsell */}
                <div className="mt-6 border-2 border-dashed border-gold/60 bg-gold/5 rounded-2xl p-4 transition-all hover:border-gold shadow-[0_0_15px_rgba(232,184,58,0.1)] relative overflow-hidden">
                  <div className="absolute -right-10 top-2 bg-urgent text-white text-[10px] font-black px-10 py-1 rotate-45 z-10">حصري</div>
                  <label className="flex items-start gap-4 cursor-pointer relative z-20">
                    <div className="shrink-0 w-16 h-16 relative rounded-xl overflow-hidden border border-gold/30 bg-white flex items-center justify-center">
                       <Image src="/images/nokia/EEALero4pRbTFPKoq3ZXwpz6sctaxY8KGxsklYTw.webp" alt="Nokia Case" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-light text-gold-shine text-sm md:text-base">تأمين شامل لهاتفك!</span>
                      </div>
                      <p className="text-xs text-muted leading-tight mb-2">
                        أضف غلاف حماية سيليكون أصلي مع واقي شاشة زجاجي مضاد للكسر لحماية هاتفك الجديد بنسبة 100%. فقط بـ <span className="font-bold text-gold text-sm">49 درهم</span> بدلاً من 150 درهم!
                      </p>
                    </div>
                    <div className="shrink-0 mt-1">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-gold cursor-pointer"
                        checked={addBump}
                        onChange={(e) => setAddBump(e.target.checked)}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Cost Transparency Breakdown */}
              <div className="mt-8 pt-6 border-t border-border space-y-3">
                <div className="flex items-center justify-between text-muted text-sm">
                  <span>ثمن المنتج {addBump ? '+ غلاف الحماية' : ''}:</span>
                  <span className="font-bold">{total} درهم</span>
                </div>
                <div className="flex items-center justify-between text-success text-sm font-bold">
                  <span>تكلفة التوصيل:</span>
                  <span>مجاناً 🎁</span>
                </div>
                <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-lg font-bold text-light">المجموع الدفع:</span>
                  <span className="text-3xl font-black text-gold">{total} درهم</span>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="space-y-5 flex flex-col justify-center">
              
              {state?.success === false && (
                <div className="bg-urgent/10 border border-urgent/30 text-urgent p-4 rounded-xl text-sm font-bold text-center">
                  {state.message}
                </div>
              )}

              <div className="space-y-4">
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="الاسم الكامل" 
                  className="w-full bg-void border border-border rounded-xl px-5 py-4 text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" 
                  required 
                  minLength={3}
                  pattern="^(?!.*(.)\1{3})[a-zA-Z\u0600-\u06FF\s]{3,}$"
                  title="المرجوا إدخال اسم حقيقي (على الأقل 3 أحرف)"
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="رقم الهاتف (..06)" 
                  className="w-full bg-void border border-border rounded-xl px-5 py-4 text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-right" 
                  dir="ltr"
                  required 
                  pattern="^(06|07)\d{8}$"
                  title="رقم الهاتف يجب أن يبدأ بـ 06 أو 07 ويتكون من 10 أرقام"
                />
                <select 
                  name="city"
                  className="w-full bg-void border border-border rounded-xl px-5 py-4 text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all appearance-none" 
                  required
                  defaultValue=""
                >
                  <option value="" disabled>المدينة</option>
                  <option>الدار البيضاء</option>
                  <option>الرباط</option>
                  <option>مراكش</option>
                  <option>فاس</option>
                  <option>طنجة</option>
                  <option>أكادير</option>
                  <option>مدينة أخرى</option>
                </select>
                <input 
                  type="text" 
                  name="address"
                  placeholder="العنوان بالتفصيل" 
                  className="w-full bg-void border border-border rounded-xl px-5 py-4 text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" 
                  required 
                />
              </div>

              <button 
                type="submit"
                disabled={isPending}
                className={`w-full mt-6 text-void font-black text-xl py-5 rounded-2xl shadow-[0_10px_40px_rgba(232,184,58,0.3)] transition-all duration-300 flex items-center justify-center gap-3 ${
                  isPending 
                    ? 'bg-muted cursor-not-allowed opacity-70' 
                    : 'bg-gradient-to-r from-gold to-[#f0c84a] hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(232,184,58,0.4)]'
                }`}
              >
                {isPending ? (
                  <span className="animate-pulse">جاري تأكيد الطلب...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 -scale-x-100" />
                    <span>تأكيد الطلب</span>
                  </>
                )}
              </button>

              <div className="text-center pt-3 text-xs font-bold text-success flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                معلوماتك آمنة ولن يتم مشاركتها.
              </div>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
}
