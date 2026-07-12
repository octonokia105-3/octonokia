"use client";

import { CreditCard, Truck, ShieldCheck, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-void border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/logo.png" alt="ArwaShop Logo" className="w-10 h-10 rounded-lg object-contain" />
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-br from-gold to-[#fff5cc] bg-clip-text text-transparent">
                ArwaShop
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              المتجر الرائد في تقديم أقوى الباقات والعروض الاستثنائية لعملائنا في جميع أنحاء المغرب. جودة مضمونة وتوصيل سريع.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-light font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-gold transition-colors">الرئيسية</a></li>
              <li><a href="#specs" className="hover:text-gold transition-colors">المواصفات التقنية</a></li>
              <li><a href="#reviews" className="hover:text-gold transition-colors">آراء العملاء</a></li>
              <li><a href="#faq" className="hover:text-gold transition-colors">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-light font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gold" /> الدار البيضاء، المغرب</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold" /> <span dir="ltr">+212 600-000000</span></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-gold" /> support@arwashop.ma</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-light font-bold mb-4">الدفع والأمان</h4>
            <p className="text-muted text-sm mb-4">
              نحن نضمن لك تجربة تسوق آمنة 100% مع الدفع عند الاستلام.
            </p>
            <div className="flex gap-2">
              <div className="bg-surface border border-border p-2 rounded-lg flex items-center gap-2 text-xs text-muted font-bold">
                <Truck className="w-4 h-4 text-gold" /> الدفع عند الاستلام
              </div>
              <div className="bg-surface border border-border p-2 rounded-lg flex items-center gap-2 text-xs text-muted font-bold">
                <ShieldCheck className="w-4 h-4 text-success" /> تسوق آمن
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-xs text-muted flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 ArwaShop. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-light transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-light transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-light transition-colors">سياسة الاسترجاع</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
