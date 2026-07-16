import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تم استلام طلبك بنجاح | ArwaShop",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.orderId as string || "N/A";
  const total = resolvedSearchParams.total as string || "0";
  const packageName = resolvedSearchParams.package as string || "المنتج";
  const bump = resolvedSearchParams.bump === "true";

  const whatsappMessage = encodeURIComponent(`مرحباً، لقد قمت بطلب العرض (${packageName}) وأريد تأكيد طلبي. رقم الطلب: #${orderId.substring(0,8)}`);
  const whatsappLink = `https://wa.me/212600000000?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6">
      <div className="bg-surface-2 border-2 border-green-500/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(34,197,94,0.1)] max-w-xl w-full text-center relative overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600" />
        
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          <CheckCircle2 className="w-12 h-12 text-green-500 relative z-10" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-black text-light mb-4">تم استلام طلبك بنجاح!</h2>
        <p className="text-muted text-lg mb-8 leading-relaxed">
          شكراً لثقتك بنا. سيقوم فريقنا بالاتصال بك في أقرب وقت لتأكيد الطلب قبل الشحن.
        </p>

        <div className="bg-void border border-border rounded-2xl p-6 text-right mb-8 shadow-inner">
          <div className="flex justify-between items-center border-b border-border/50 pb-3 mb-3">
            <span className="text-gold font-black text-xl">#{orderId.substring(0,8)}</span>
            <span className="text-muted font-bold text-sm">رقم الطلب</span>
          </div>
          <div className="flex justify-between items-center border-b border-border/50 pb-3 mb-3">
            <span className="text-light font-bold text-sm sm:text-base">{packageName} {bump ? '+ غلاف سيليكون' : ''}</span>
            <span className="text-muted font-bold text-sm">المنتج</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gold font-black text-2xl">{total} درهم</span>
            <span className="text-muted font-bold text-sm">المجموع</span>
          </div>
        </div>

        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mb-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xl py-5 rounded-2xl shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
        >
          <span>تأكيد سريع عبر الواتساب</span>
        </a>

        <Link 
          href="/"
          className="inline-block text-muted text-sm font-bold hover:text-light transition-colors mt-4"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
