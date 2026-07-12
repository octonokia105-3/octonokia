"use client";

import { ShoppingBag, ChevronLeft } from "lucide-react";

export default function CheckoutCTA() {
  return (
    <section id="checkout" className="py-24 relative z-10 bg-surface-2/50 border-t border-border">
      <div className="container mx-auto px-6 max-w-xl">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-light mb-2">للطلب، المرجو إدخال معلوماتك</h2>
          <p className="text-muted">في الخانات أسفله</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Price Header */}
          <div className="bg-gradient-to-r from-gold/20 to-gold/5 -mx-8 -mt-8 p-8 border-b border-gold/20 mb-8 flex flex-col items-center justify-center">
            <span className="text-gold font-bold text-sm mb-1 uppercase tracking-widest">فقط بـ</span>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black text-gold leading-none">239</span>
              <span className="text-2xl font-bold text-gold mb-1">د.م.</span>
            </div>
            <div className="mt-2 text-muted line-through font-bold">299 د.م.</div>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-sm font-bold text-light px-1">الاسم الكامل</label>
              <input 
                type="text" 
                placeholder="أدخل اسمك هنا"
                className="w-full bg-void border border-border rounded-xl px-5 py-4 text-light focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-bold text-light px-1">رقم الهاتف</label>
              <input 
                type="tel" 
                placeholder="أدخل رقمك هنا"
                className="w-full bg-void border border-border rounded-xl px-5 py-4 text-light focus:outline-none focus:border-gold transition-colors text-right"
                dir="ltr"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-light px-1">المدينة</label>
              <input 
                type="text" 
                placeholder="أدخل مدينتك هنا"
                className="w-full bg-void border border-border rounded-xl px-5 py-4 text-light focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-4 bg-gradient-to-br from-gold to-gold-hover text-void font-black text-xl py-5 px-6 rounded-xl shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-gold-lg)] transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <ShoppingBag className="w-6 h-6" />
              <span>إضغط هنا لطلب المنتج</span>
              <ChevronLeft className="w-5 h-5 absolute left-6 group-hover:-translate-x-2 transition-transform" />
            </button>

            <div className="text-center mt-4 text-xs font-bold text-muted flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success inline-block" />
              الدفع بعد الاستلام (COD)
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
