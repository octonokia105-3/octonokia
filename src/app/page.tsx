import AnnouncementBar from "@/components/AnnouncementBar";
import StickyHeader from "@/components/StickyHeader";
import HeroSlideshow from "@/components/HeroSlideshow";
import SocialProofMarquee from "@/components/SocialProofMarquee";
import UrgencySection from "@/components/UrgencySection";
import DetailedFeatures from "@/components/DetailedFeatures";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import TrustGuarantees from "@/components/TrustGuarantees";
import FAQAccordion from "@/components/FAQAccordion";
import CheckoutForm from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import LeadGenPopup from "@/components/LeadGenPopup";
import StickyActionButtons from "@/components/StickyActionButtons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden font-cairo">
      {/* Background Texture - applied globally but scoped here for visual depth */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,184,58,0.03)_0%,transparent_100%)]" />
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />

      <LeadGenPopup />
      <StickyActionButtons />

      <AnnouncementBar />
      <StickyHeader />
      
      <main>
        <HeroSlideshow />
        <SocialProofMarquee />
        
        {/* Top Checkout Section */}
        <div id="checkout-top" className="scroll-mt-24">
          <CheckoutForm />
        </div>

        <UrgencySection />
        <DetailedFeatures />
        <TechnicalSpecs />
        <HowItWorks />
        <TestimonialsGrid />
        <TrustGuarantees />
        <FAQAccordion />
        
        {/* Bottom Checkout Section with extra Marquee */}
        <div className="pt-10 bg-void">
          <SocialProofMarquee />
        </div>
        <div id="checkout-bottom">
          <CheckoutForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
