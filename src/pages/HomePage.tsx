import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { PricingPreview } from '../components/home/PricingPreview';
import { ComparisonTableSection } from '../components/home/ComparisonTableSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FAQSection } from '../components/home/FAQSection';
import { SEOMeta } from '../components/common/SEOMeta';
import { PageRoute, ServiceItem } from '../types';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  services: ServiceItem[];
  onNavigate: (route: PageRoute, slug?: string) => void;
  onOpenOrder: (serviceId?: string, quantity?: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  services,
  onNavigate,
  onOpenOrder
}) => {
  return (
    <div className="space-y-0">
      <SEOMeta
        title="buyusagmail.com - Best USA Aged Gmail Accounts for Sale | Verified PVA"
        description="Buy premium USA aged Gmail accounts created with residential IPs. 100% phone verified (PVA) accounts for Google Ads, local SEO reviews, and B2B cold outreach."
        canonicalUrl="https://buyusagmail.com"
        type="website"
      />

      {/* Hero */}
      <HeroSection
        onExplore={() => {
          const el = document.getElementById('inventory-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenOrder={(id) => onOpenOrder(id)}
      />

      {/* Services Grid */}
      <div id="inventory-section">
        <ServicesOverview
          services={services}
          onNavigate={onNavigate}
          onOpenOrder={(id) => onOpenOrder(id)}
        />
      </div>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Pricing Preview */}
      <PricingPreview
        services={services}
        onOpenOrder={(id, qty) => onOpenOrder(id, qty)}
      />

      {/* Comparison Table */}
      <ComparisonTableSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Bottom CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white border-t border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>Ready to Scale Your Digital Operations?</span>
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Deploy High-Trust Aged Accounts <br className="hidden sm:inline" />
            <span className="text-red-500">Without Login Checkpoints</span>
          </h2>

          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-normal">
            Order now to receive instant spreadsheet delivery with 100% ownership, recovery emails, and our 72-hour replacement warranty.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenOrder('usa-gmail')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-black text-base shadow-xl shadow-red-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Order USA Aged Pack ($55 for 20 pcs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-base border border-gray-700 transition-all flex items-center justify-center gap-2"
            >
              <span>Wholesale Calculator</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
