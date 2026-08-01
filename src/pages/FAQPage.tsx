import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, MessageCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { FAQ_GENERAL } from '../data/initialData';
import { SEOMeta } from '../components/common/SEOMeta';

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = [
    'All', 
    'Ordering & Delivery', 
    'Account Quality & Security', 
    'Proxies & Anti-Detect Browsers', 
    'Google Ads & Review Warmup', 
    'Payment Methods', 
    'Support & Replacement'
  ];

  const filteredFaqs = (FAQ_GENERAL || []).filter(f => {
    const matchesCat = selectedCat === 'All' || f.category === selectedCat;
    const matchesSearch = f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      <SEOMeta
        title="Frequently Asked Questions | buyusagmail.com Support Center"
        description="Find comprehensive answers about account aging, physical SIM verification, residential proxy setup, cryptocurrency discounts, and our 72h replacement warranty."
        canonicalUrl="https://buyusagmail.com/faqs"
        type="faq"
        faqs={FAQ_GENERAL}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          Knowledge Base & Support
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Everything you need to know about our institutional aged Gmail inventory, proxy warm-up protocols, and automated cryptocurrency delivery.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-6">
        <div className="relative max-w-lg mx-auto">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. proxy, warranty, delivery, crypto)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {(categories || []).map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCat === cat
                  ? 'bg-red-500 text-white shadow-md scale-105'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          (filteredFaqs || []).map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-gray-50 dark:bg-gray-900/80 border-red-500/40 shadow-sm'
                    : 'bg-white dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 hover:border-gray-300'
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
          })
        ) : (
          <div className="text-center py-12 p-6 rounded-2xl border border-dashed text-gray-500">
            No questions found matching "{searchQuery}".
          </div>
        )}
      </div>

      {/* Support CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white text-center space-y-4 border border-gray-800 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-black">Need Direct Assistance With Your Setup?</h3>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Our senior DevOps support team is available 24/7 on Telegram and WhatsApp to answer custom queries or provide spreadsheet recovery advice.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://t.me/EgSupport24"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 text-white font-black text-sm shadow-lg shadow-red-500/20 inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Live on Telegram (@EgSupport24)</span>
          </a>

          <a
            href="https://wa.me/13073939979"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-sm shadow-lg shadow-green-500/20 inline-flex items-center gap-2"
          >
            <span>WhatsApp (+1 307-393-9979)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
