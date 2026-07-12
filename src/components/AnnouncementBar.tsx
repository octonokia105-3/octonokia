"use client";

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#1a0a00] via-[#3d1a00] to-[#1a0a00] border-b border-gold/30 px-4 py-2 text-center flex items-center justify-center gap-3 w-full z-50 relative">
      <span className="w-2 h-2 rounded-full bg-urgent animate-glow-pulse shrink-0" />
      <span className="text-xs font-bold text-gold tracking-wider">
        🔥 عرض محدود — توصيل مجاني لجميع مدن المغرب + ضمان استرجاع 30 يوم
      </span>
      <span className="w-2 h-2 rounded-full bg-urgent animate-glow-pulse shrink-0" />
    </div>
  );
}
