"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA when scrolling past the first 500px (e.g., past the main hero)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-void/80 backdrop-blur-md border-t border-border z-50 md:hidden animate-in slide-in-from-bottom-full duration-300">
      <button 
        onClick={() => {
          document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="w-full bg-gradient-to-r from-gold to-[#f0c84a] text-void font-black text-xl py-4 rounded-xl shadow-[0_5px_20px_rgba(232,184,58,0.4)] flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5 -scale-x-100" />
        <span>اطلب الآن</span>
      </button>
    </div>
  );
}
