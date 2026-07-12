import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import TrackingScripts from "@/components/TrackingScripts";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ArwaShop | حصرية",
  description: "المتجر الرسمي للحصول على أفضل العروض والمنتجات الأصلية في المغرب",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased scroll-smooth`}>
      <head>
        <TrackingScripts />
      </head>
      <body className="min-h-full flex flex-col font-cairo bg-void text-light overflow-x-hidden">{children}</body>
    </html>
  );
}
