import React from 'react';
import { ShieldCheck, Zap, Star, ArrowRight, CheckCircle2, ShoppingBag, TrendingUp, Users } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenOrder: (serviceId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onOpenOrder }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/40 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800/80">
      
      {/* Background Decorative Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 dark:bg-red-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-red-500/5 to-blue-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold shadow-sm animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>🏆 #1 USA Aged & PVA Gmail Marketplace • 100% Phone Verified</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.08]">
            Best USA Aged <span className="bg-gradient-to-r from-red-500 via-red-600 to-blue-600 bg-clip-text text-transparent">Gmail Accounts</span> for Sale
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Enterprise-grade aged Gmails (2 to 8+ years old) warmed up on clean USA residential IPs. Engineered for high-stick GMB reviews, Google Ads MCC billing trust, and high-velocity B2B cold outreach without login checkpoints.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onOpenOrder('usa-gmail')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-black text-base shadow-xl shadow-red-500/25 hover:shadow-red-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Explore Accounts & Order Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 text-gray-800 dark:text-gray-200 font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>View Inventory & Pricing</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Real Physical SIM Verified (Non-VoIP)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>72-Hour Instant Replacement Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>POP3 / IMAP & App Passwords Ready</span>
            </div>
          </div>

          {/* Animated Statistics Banner */}
          <div className="pt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <span>3,400+</span>
                <span className="text-red-500 text-sm">▲</span>
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mt-1">Agencies & Buyers Served</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <span>98.6%</span>
                <span className="text-green-500 text-sm">★</span>
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mt-1">Review & Billing Stick Rate</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <span>2 - 8 Yrs</span>
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mt-1">Authentic Domain Aging</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <span>&lt; 3 Min</span>
                <span className="text-blue-500 text-sm">⚡</span>
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mt-1">Automated Crypto Delivery</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
