import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { ServiceItem } from '../../types';

interface PricingPreviewProps {
  services: ServiceItem[];
  onOpenOrder: (serviceId: string, quantity: number) => void;
}

export const PricingPreview: React.FC<PricingPreviewProps> = ({ services, onOpenOrder }) => {
  const [selectedServiceId, setSelectedServiceId] = useState((services || [])[0]?.id || '');
  const currentService = (services || []).find(s => s.id === selectedServiceId) || (services || [])[0] || { id: '', name: 'Service', badge: '', subtitle: '', pricing: [] };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/60 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            Wholesale Pricing & Calculator
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Transparent Tiered Agency Rates
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            The more you order, the lower your unit cost. Select your service category below to view our wholesale tiered discounts. Pay via Crypto (USDT, BTC, SOL) for an instant 10% discount.
          </p>
        </div>

        {/* Service Category Selector Tabs */}
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

        {/* Selected Service Info Banner */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-gray-900 dark:text-white">{currentService.name}</h3>
              <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-bold">{currentService.badge}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{currentService.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-500 font-bold bg-green-500/10 px-3 py-1.5 rounded-xl border border-green-500/20">
              ⚡ Instant Recovery File Delivery
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {(currentService.pricing || []).map((tier, idx) => {
            const unitPrice = (tier.price / tier.quantity).toFixed(2);
            return (
              <div
                key={tier.quantity}
                onClick={() => onOpenOrder(currentService.id, tier.quantity)}
                className={`rounded-3xl p-6 border-2 cursor-pointer transition-all flex flex-col justify-between relative group ${
                  tier.popular
                    ? 'bg-gradient-to-b from-white via-red-50/20 to-white dark:from-gray-900 dark:via-red-950/20 dark:to-gray-900 border-red-500 shadow-xl shadow-red-500/15 transform scale-105 z-10'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-red-500/50 hover:shadow-lg'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                    Tier #{idx + 1}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-gray-900 dark:text-white">{tier.quantity}</span>
                    <span className="text-sm font-bold text-gray-500">Accounts</span>
                  </div>

                  <div className="my-6 py-4 border-y border-gray-100 dark:border-gray-800 text-center">
                    <span className="text-4xl font-black text-red-500 block">${tier.price}</span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mt-0.5">
                      Only <strong>${unitPrice}</strong> / account
                    </span>
                    {tier.save && (
                      <span className="inline-block mt-2 text-[11px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">
                        {tier.save}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400 mb-6">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <span>100% Verified Credentials</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <span>72h Replacement Guarantee</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <span>CSV / Excel Download</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md shadow-red-500/25'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy {tier.quantity}x Pack</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
