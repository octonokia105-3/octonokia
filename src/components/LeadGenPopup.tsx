"use client";

import { useState, useEffect } from "react";
import { X, Gift, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadGenPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  
  // Show popup only on exit intent (when mouse leaves top of screen) instead of immediately
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };
    
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, save lead to DB here
    setIsSuccess(true);
    
    // Close popup after showing success for 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      // Optional: scroll to checkout automatically
      document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => !isSuccess && setIsOpen(false)}
          />
          
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-md bg-surface-2 border border-gold/30 rounded-[2rem] shadow-[0_0_80px_rgba(232,184,58,0.2)] overflow-hidden"
          >
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 left-4 w-10 h-10 bg-void/80 hover:bg-urgent/80 rounded-full flex items-center justify-center text-white transition-all z-50 shadow-xl border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing background effect */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/20 blur-[80px] rounded-full pointer-events-none" />

            {!isSuccess ? (
              <div className="p-8 relative z-20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gold/10 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
                    <Gift className="w-8 h-8 text-gold" />
                  </div>
                  <h2 className="text-2xl font-black text-light mb-2">🎁 اربح هديتك الآن!</h2>
                  <p className="text-sm text-muted">ادخل في السحب للحصول على العطر الفاخر مجاناً مع التخفيض الحصري 50 درهم!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="الاسم الكامل" 
                    className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-gold transition-colors text-sm" 
                    required 
                  />
                  <input 
                    type="tel" 
                    placeholder="رقم الهاتف" 
                    className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-gold transition-colors text-sm text-right" 
                    dir="ltr"
                    required 
                  />
                  <select 
                    className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-gold transition-colors text-sm appearance-none" 
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

                  <button 
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-gold to-[#f0c84a] text-void font-black py-4 rounded-xl shadow-lg hover:shadow-[0_10px_30px_rgba(232,184,58,0.4)] transition-all flex items-center justify-center gap-2 animate-pulse"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>اشترك الآن واربح!</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-10 text-center relative z-10 flex flex-col items-center justify-center min-h-[350px]">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 bg-success/20 border-2 border-success rounded-full flex items-center justify-center mb-6"
                >
                  <Sparkles className="w-10 h-10 text-success" />
                </motion.div>
                <h2 className="text-3xl font-black text-gold mb-4">مبروك! 🎉</h2>
                <p className="text-lg text-light mb-2">لقد ربحت التخفيض والهدية الفاخرة.</p>
                <p className="text-sm text-muted">سيتم تحويلك لإكمال الطلب الآن...</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
