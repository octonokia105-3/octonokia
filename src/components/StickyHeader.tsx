"use client";

import { Phone, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function StickyHeader() {
  return (
    <header className="sticky top-0 z-[100] bg-void/90 backdrop-blur-xl border-b border-border py-3 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-6 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="ArwaShop Logo" width={36} height={36} className="rounded-lg object-contain" />
          <span className="text-xl font-black tracking-tighter bg-gradient-to-br from-gold to-[#fff5cc] bg-clip-text text-transparent">
            ArwaShop
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted font-bold">
            <Phone className="w-4 h-4 text-gold" />
            <span dir="ltr">+212 600-000000</span>
          </div>
          <a 
            href="#checkout"
            className="bg-gold text-void font-bold text-sm px-5 py-2 rounded-full hover:bg-gold-hover hover:shadow-[0_0_20px_rgba(232,184,58,0.25)] hover:-translate-y-[1px] transition-all whitespace-nowrap flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            اطلب الآن
          </a>
        </div>

      </div>
    </header>
  );
}
