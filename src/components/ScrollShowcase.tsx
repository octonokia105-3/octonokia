"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ScrollShowcase() {
  const container = useRef<HTMLElement>(null);
  const nokiaRef = useRef<HTMLDivElement>(null);
  const earbudsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pinning the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=1500", // Scroll for 1500px
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Initial State is set via CSS, but we animate them in
    tl.to(nokiaRef.current, {
      y: -100,
      scale: 1.2,
      rotationY: 15,
      rotationX: 10,
      opacity: 1,
      duration: 1
    }, 0);

    tl.to(earbudsRef.current, {
      y: 50,
      x: -150,
      scale: 1.1,
      rotationZ: -10,
      opacity: 1,
      duration: 1
    }, 0);

    tl.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.5
    }, 0.5);

    // Second phase: swap positions
    tl.to(nokiaRef.current, {
      x: 200,
      y: 0,
      scale: 0.9,
      opacity: 0.5,
      filter: "blur(5px)",
      duration: 1
    }, 1.5);

    tl.to(earbudsRef.current, {
      x: 0,
      y: 0,
      scale: 1.3,
      rotationZ: 0,
      opacity: 1,
      duration: 1
    }, 1.5);

    tl.to(textRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5
    }, 1.5);

  }, { scope: container });

  return (
    <section ref={container} className="h-screen w-full relative bg-void overflow-hidden flex items-center justify-center">
      {/* Background Lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto h-full flex items-center justify-center pointer-events-none">
        
        {/* Text Reveal Area */}
        <div ref={textRef} className="absolute top-[20%] text-center w-full z-20">
          <h2 className="text-4xl md:text-6xl font-black text-light drop-shadow-2xl">
            تصميم متين من البولي كربونات
          </h2>
          <p className="text-xl text-gold mt-4 font-bold">
            مقاوم للخدوش والصدمات، مثالي للزنقة
          </p>
        </div>

        {/* 3D Product Layers */}
        <div ref={nokiaRef} className="absolute z-10 w-[300px] md:w-[400px] aspect-square">
          <Image 
            src="/assets/nokia_105_premium_1783722634966.png"
            alt="Nokia 105 Reveal"
            fill
            className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
          />
        </div>

        <div ref={earbudsRef} className="absolute z-20 w-[200px] md:w-[300px] aspect-square opacity-0">
          <Image 
            src="/assets/m10_earbuds_premium_1783722648341.png"
            alt="M10 Earbuds Reveal"
            fill
            className="object-contain drop-shadow-[0_20px_50px_rgba(232,184,58,0.2)]"
          />
        </div>
      </div>
    </section>
  );
}
