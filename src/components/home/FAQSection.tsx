import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_GENERAL } from '../../data/initialData';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Ordering & Delivery', 'Account Quality & Security', 'Payment Methods', 'Support & Replacement'];

  const filteredFaqs = selectedCat === 'All'
    ? (FAQ_GENERAL || [])
    : (FAQ_GENERAL || []).filter(f => f.category === selectedCat);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Knowledge & Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Have questions about account aging, proxies, or cryptocurrency checkout? Find instant answers below or reach out to our 24/7 engineering support.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(categories || []).map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCat === cat
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md scale-105'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {(filteredFaqs || []).map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-gray-50/80 dark:bg-gray-900/80 border-red-500/40 shadow-sm'
                    : 'bg-white dark:bg-gray-900/30 border-gray-200/80 dark:border-gray-800 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-red-500' : 'text-gray-400'}`} />
                    <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-red-500' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/60 mt-1 animate-in fade-in duration-200">
                    <p className="pl-8">{faq.a}</p>
                    <div className="mt-3 pl-8 flex items-center gap-2 text-[11px] font-bold text-gray-400">
                      <span>Category:</span>
                      <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">{faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-blue-600 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black">Still Have Questions About Your Custom Use Case?</h3>
          <p className="text-sm text-white/90 max-w-xl mx-auto">
            Our senior infrastructure consultants are on standby via Telegram to help you configure your proxy setup and match you with the exact account tier for your business.
          </p>
          <div className="pt-2">
            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-gray-900 font-extrabold text-sm shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span>Chat Live on Telegram (@EgSupport24)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
