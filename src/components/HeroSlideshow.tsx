"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/nokia/ChatGPT%20Image%2011%20juil.%202026%2C%2020_05_52.png",
    title: "الهاتف الأسطوري عاد بقوة!",
    subtitle: "نوكيا الأصلي + سماعات M10 اللاسلكية في باقة واحدة لا تعوض. التوصيل مجاني والدفع عند الاستلام!",
    cta: "أطلب الآن قبل نفاذ الكمية",
  }
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-void border-b border-gold/30">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Background Image with Ken Burns effect */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 8, ease: "linear" }}
          >
            <Image 
              src={slides[current].image}
              alt={slides[current].title || "Arwa Store Slide"}
              fill
              className="object-cover"
              priority
            />
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="max-w-4xl w-full flex flex-col items-center">
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-4xl md:text-6xl lg:text-[5rem] font-black leading-tight text-light drop-shadow-2xl mb-6 text-gold-shine"
              >
                {slides[current].title}
              </motion.h1>
              
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="text-lg md:text-2xl text-muted/90 font-medium max-w-2xl mb-10 drop-shadow-md bg-void/50 px-4 py-2 rounded-xl backdrop-blur-sm"
              >
                {slides[current].subtitle}
              </motion.p>
              
              <motion.button 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('checkout-top')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gold hover:bg-gold-hover text-void font-black py-4 px-10 md:px-16 rounded-full text-xl md:text-2xl shadow-[0_0_40px_rgba(232,184,58,0.5)] transition-all flex items-center gap-3 group border-gold-glow"
              >
                {slides[current].cta}
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Hidden on very small screens, visible on md+) */}
      <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-6 z-20 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-void/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-void hover:border-gold transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-void/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-void hover:border-gold transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              current === idx 
                ? "w-10 h-2.5 bg-gold shadow-[0_0_10px_rgba(232,184,58,0.5)]" 
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom fade to blend with page */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-void to-transparent z-10 pointer-events-none" />
    </section>
  );
}
