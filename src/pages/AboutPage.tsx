import React from 'react';
import { ShieldCheck, Users, Globe, Award, Lock, TrendingUp, CheckCircle2 } from 'lucide-react';
import { SEOMeta } from '../components/common/SEOMeta';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      <SEOMeta
        title="About buyusagmail.com | Institutional Aged Account Infrastructure"
        description="Learn about buyusagmail.com's rigorous verification standards, physical SIM farms, residential proxy warm-up protocols, and 72-hour replacement warranty."
        canonicalUrl="https://buyusagmail.com/about"
      />

      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          Who We Are
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Engineering High-Trust <br />
          <span className="bg-gradient-to-r from-red-500 via-red-600 to-blue-600 bg-clip-text text-transparent">Digital Infrastructure</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
          buyusagmail.com was founded in 2019 to solve a critical bottleneck in digital growth: the instability of modern email and review accounts. We replace flimsy VoIP accounts with permanent, physical SIM verified residential infrastructure.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">100% Real Physical SIMs</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            We partner directly with tier-1 telecom carriers in the US, UK, and EU. Every PVA account is verified with dedicated physical SIM cards.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">USA Residential Warmed</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Accounts are aged on dedicated residential proxy subnets (NY, TX, CA) with automated human browsing and Google Drive activity.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Exclusive 100% Ownership</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            We never resell or reuse accounts. Once dispatched, you receive full administrative recovery credentials and 2FA secrets.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">72h Replacement Warranty</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            If an account encounters any initial verification hurdle upon first login, our support team replaces it within 3 minutes via Telegram.
          </p>
        </div>
      </div>

      {/* The Story Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white">
            Why We Are Different From Common Marketplaces
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Most online account sellers rely on automated scripts that generate thousands of accounts per hour using cheap datacenter proxies and virtual phone numbers (VoIP). Google’s AI detection systems flag these subnets immediately, causing account suspensions the moment you attempt to connect your cold email tool or Google Ads MCC.
          </p>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            At buyusagmail.com, we operate like an institutional DevOps provider. Our inventory consists of authentic aged accounts (registered between 2018 and 2022) that have accumulated years of domain reputation, natural cookie histories, and high Google algorithm trust scores.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <div>
            <span className="text-3xl font-black text-red-500 block">3,400+</span>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mt-1">Agencies Served Worldwide</span>
          </div>
          <div>
            <span className="text-3xl font-black text-blue-500 block">99.4%</span>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mt-1">Cold Outreach Deliverability</span>
          </div>
          <div>
            <span className="text-3xl font-black text-green-500 block">&lt; 180s</span>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mt-1">Crypto Order Dispatch Speed</span>
          </div>
        </div>
      </div>

      {/* Contact Support CTA */}
      <div className="text-center p-10 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-blue-600 text-white space-y-4 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-black">Want to Partner For Wholesale Agency Volumes?</h3>
        <p className="text-sm max-w-xl mx-auto text-white/90">
          Contact our founding engineering team on Telegram for custom invoicing, dedicated state proxies, and bulk discounting.
        </p>
        <div className="pt-2">
          <a
            href="https://t.me/EgSupport24"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-gray-900 font-extrabold text-sm shadow-xl hover:bg-gray-100 transition-all transform hover:-translate-y-0.5"
          >
            <span>Message Telegram Support (@EgSupport24)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
