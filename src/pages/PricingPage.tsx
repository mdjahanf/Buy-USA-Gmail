import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Zap, Calculator, HelpCircle } from 'lucide-react';
import { ServiceItem } from '../types';
import { SEOMeta } from '../components/common/SEOMeta';

interface PricingPageProps {
  services: ServiceItem[];
  onOpenOrder: (serviceId?: string, quantity?: number) => void;
  darkMode: boolean;
}

export const PricingPage: React.FC<PricingPageProps> = ({ services, onOpenOrder, darkMode }) => {
  const [selectedServiceId, setSelectedServiceId] = useState((services || [])[0]?.id || '');
  const [customAccounts, setCustomAccounts] = useState<number>(100);

  const currentService = (services || []).find(s => s.id === selectedServiceId) || (services || [])[0] || { id: '', name: 'Service', badge: '', subtitle: '', pricing: [{ quantity: 20, price: 55, popular: false, save: '' }] } as any;

  // Dynamic estimate calculator based on closest pricing tier
  const calculateEstimate = (qty: number) => {
    const tiers = currentService.pricing || [{ quantity: 20, price: 55 }];
    let unitRate = tiers[0].price / tiers[0].quantity;
    for (const t of tiers) {
      if (qty >= t.quantity) {
        unitRate = t.price / t.quantity;
      }
    }
    return (qty * unitRate).toFixed(2);
  };

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      <SEOMeta
        title="Wholesale Pricing & Bulk Agency Discounts | buyusagmail.com"
        description="Transparent wholesale pricing tiers for USA aged Gmail accounts, phone verified PVA profiles, and Google Ads MCC billing accounts. Save up to 60% with crypto checkout."
        canonicalUrl="https://buyusagmail.com/pricing"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
          Agency Bulk Rates
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Wholesale Pricing Tiers & Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Scale your email outreach without breaking the bank. All tiers include 100% exclusive ownership, physical SIM verification, and our 72-hour replacement guarantee.
        </p>
      </div>

      {/* Service Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto p-2 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        {(services || []).map(srv => (
          <button
            key={srv.id}
            onClick={() => setSelectedServiceId(srv.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              selectedServiceId === srv.id
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md shadow-red-500/20 scale-105'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {srv.name.replace('Gmail Accounts', '').trim()}
          </button>
        ))}
      </div>

      {/* INTERACTIVE CALCULATOR BANNER */}
      <div className={`p-8 rounded-3xl border shadow-xl ${
        darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border-gray-800' : 'bg-gradient-to-br from-red-50 via-white to-blue-50 border-gray-200'
      }`}>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
              <Calculator className="w-4 h-4" />
              <span>Instant Wholesale Estimator</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              How many {currentService.name} do you need?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Slide to adjust volume or enter custom agency quantity. Automatic tiered unit discounting applied.
            </p>

            <div className="pt-2">
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={customAccounts}
                onChange={(e) => setCustomAccounts(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs font-bold text-gray-400 mt-2">
                <span>10 accounts</span>
                <span>500 accounts</span>
                <span>1,000 accounts</span>
                <span>2,000+ accounts</span>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border text-center min-w-[240px] space-y-3 shadow-sm ${
            darkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <span className="text-xs font-bold text-gray-400 uppercase block">Estimated Wholesale Total</span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-black text-red-500">${calculateEstimate(customAccounts)}</span>
              <span className="text-xs font-bold text-gray-500">USD</span>
            </div>
            <span className="text-xs font-semibold text-green-500 block">
              ⚡ ~${(parseFloat(calculateEstimate(customAccounts)) / customAccounts).toFixed(2)} per account
            </span>
            <button
              onClick={() => onOpenOrder(currentService.id, customAccounts)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black text-xs shadow-md shadow-red-500/20 flex items-center justify-center gap-1.5 transition-all transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order {customAccounts} Accounts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tiered Pricing Cards */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-center text-gray-900 dark:text-white">
          Standard Packages for {currentService.name}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {(currentService.pricing || []).map((tier, idx) => (
            <div
              key={tier.quantity}
              onClick={() => onOpenOrder(currentService.id, tier.quantity)}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                tier.popular
                  ? 'border-red-500 bg-red-500/5 dark:bg-red-500/10 shadow-xl scale-105 z-10'
                  : 'border-gray-200 dark:border-gray-800 hover:border-red-500/40 bg-white dark:bg-gray-900'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Best Value
                </span>
              )}

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase block">Tier #{idx + 1}</span>
                <span className="text-3xl font-black text-gray-900 dark:text-white block mt-1">{tier.quantity}x</span>
                <span className="text-xs font-bold text-gray-500 block">Accounts Pack</span>

                <div className="my-5 py-4 border-y border-gray-100 dark:border-gray-800 text-center">
                  <span className="text-3xl font-black text-red-500">${tier.price}</span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">(${(tier.price / tier.quantity).toFixed(2)}/account)</span>
                  {tier.save && (
                    <span className="inline-block mt-1 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                      {tier.save}
                    </span>
                  )}
                </div>

                <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400 mb-6">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span>Real SIM Authenticated</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span>72h Replacement Warranty</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span>Instant CSV Download</span>
                  </li>
                </ul>
              </div>

              <button className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white transition-colors">
                Order Pack &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Custom Quote Banner */}
      <div className="p-8 rounded-3xl bg-gray-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Enterprise Orders (5,000+ Accounts)</span>
          <h3 className="text-2xl font-black mt-1">Need custom billing, escrow, or dedicated state IPs?</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            We provide custom account batching, escrow payments, and customized 16-character Google App Passwords for institutional media buying agencies.
          </p>
        </div>
        <a
          href="https://t.me/EgSupport24"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-extrabold text-sm whitespace-nowrap shadow-lg shadow-red-500/20"
        >
          Chat with Enterprise Desk (@EgSupport24)
        </a>
      </div>
    </div>
  );
};
