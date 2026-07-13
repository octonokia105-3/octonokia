"use client";

import { MessageCircle, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function StickyActionButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the order button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCheckout = () => {
    document.getElementById("checkout-bottom")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 inset-x-0 z-[150] pointer-events-none px-4 flex justify-between items-end max-w-7xl mx-auto gap-2">
      
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/212600000000?text=مرحباً، أود الاستفسار عن باك نوكيا 105" 
        target="_blank" 
        rel="noopener noreferrer"
        className="pointer-events-auto bg-[#25D366] text-white rounded-full flex items-center justify-center gap-2 px-4 py-3 sm:px-5 shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-300 animate-[pulse_3s_infinite] group"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="font-bold text-xs sm:text-sm tracking-wide hidden min-[360px]:inline">للطلب عبر الواتساب</span>
      </a>

      {/* Floating Order Button (Visible only after scroll) */}
      <div className={`pointer-events-auto transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <button 
          onClick={scrollToCheckout}
          className="bg-gradient-to-r from-gold via-[#fff5cc] to-gold bg-[length:200%_auto] animate-bounce text-void font-black px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-[0_10px_40px_rgba(232,184,58,0.5)] hover:shadow-[0_15px_50px_rgba(232,184,58,0.7)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 border-2 border-[#fff5cc]/50"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-base sm:text-lg whitespace-nowrap">اطلب الآن</span>
        </button>
      </div>

    </div>
  );
}
