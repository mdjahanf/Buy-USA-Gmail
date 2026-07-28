import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Send, CheckCircle2, ShieldCheck, Clock, MapPin, Globe } from 'lucide-react';
import { SEOMeta } from '../components/common/SEOMeta';

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    subject: 'Wholesale Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSent(true);
    }
  };

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans text-[#202124] animate-in fade-in duration-300">
      <SEOMeta
        title="Contact Us & 24/7 Live Support Desk | buyusagmail.com"
        description="Connect with buyusagmail.com senior infrastructure engineers on Telegram (@EgSupport24) and WhatsApp for custom proxy setups, bulk order pricing, and instant replacements."
        canonicalUrl="https://buyusagmail.com/contact"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#EA4335] bg-[#FCE8E6] px-3 py-1 rounded-full border border-[#EA4335]/20">
          24/7 DevOps Support
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#202124] dark:text-white">
          Direct Engineering Support Desk
        </h1>
        <p className="text-base sm:text-lg text-[#5F6368] dark:text-gray-300">
          No automated bots or 3-day ticket queues. Our founding engineers answer directly via Telegram and WhatsApp within 3 minutes.
        </p>
      </div>

      {/* Contact Cards Grid: High Density Google Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Telegram Card */}
        <a
          href="https://t.me/EgSupport24"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 hover:border-[#0088CC] transition-all shadow-sm group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#0088CC]/10 flex items-center justify-center text-[#0088CC] group-hover:bg-[#0088CC] group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#202124] dark:text-white">Telegram Live Chat</h3>
            <p className="text-xs text-[#5F6368] dark:text-gray-400 leading-relaxed">
              Fastest response channel for order spreadsheets, OTP verification codes, and 72-hour warranty claims.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between font-bold text-xs">
            <span className="text-[#0088CC]">@EgSupport24</span>
            <span className="bg-[#0088CC] text-white px-2 py-0.5 rounded">&lt; 3 min reply</span>
          </div>
        </a>

        {/* WhatsApp Card */}
        <a
          href="https://wa.me/13073939979"
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 hover:border-[#25D366] transition-all shadow-sm group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#202124] dark:text-white">WhatsApp Support Line</h3>
            <p className="text-xs text-[#5F6368] dark:text-gray-400 leading-relaxed">
              Available for wholesale agency buyers, custom invoicing requests, and spreadsheet recovery support.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between font-bold text-xs">
            <span className="text-[#25D366]">+1 (307) 393-9979</span>
            <span className="bg-[#25D366] text-white px-2 py-0.5 rounded">24/7 Available</span>
          </div>
        </a>

        {/* Direct Email Card */}
        <a
          href="mailto:smmbuy2022@gmail.com"
          className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 hover:border-[#EA4335] transition-all shadow-sm group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FCE8E6] flex items-center justify-center text-[#EA4335] group-hover:bg-[#EA4335] group-hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#202124] dark:text-white">Direct Email Desk</h3>
            <p className="text-xs text-[#5F6368] dark:text-gray-400 leading-relaxed">
              Send us RFP spreadsheets, custom API integration requests, or formal corporate partnership inquiries.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between font-bold text-xs">
            <span className="text-[#EA4335] truncate max-w-[150px]">smmbuy2022@gmail.com</span>
            <span className="bg-[#EA4335] text-white px-2 py-0.5 rounded">1-2h reply</span>
          </div>
        </a>

      </div>

      {/* Form & Office Info Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#EA4335] via-[#FBBC05] to-[#4285F4]"></div>
          
          <h3 className="text-xl font-bold text-[#202124] dark:text-white mb-2">Send Us a Direct Message</h3>
          <p className="text-xs text-[#5F6368] dark:text-gray-400 mb-6">Fill out this form and our support desk will respond directly to your email or Telegram.</p>

          {sent ? (
            <div className="p-6 rounded-2xl bg-[#E6F4EA] dark:bg-green-900/30 border border-[#34A853]/40 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#34A853] mx-auto" />
              <h4 className="text-lg font-bold text-[#202124] dark:text-white">Message Dispatched Successfully!</h4>
              <p className="text-xs text-[#5F6368] dark:text-gray-300">
                A senior infrastructure engineer has been pinged. We will reach out to your provided Telegram/Email within 15 minutes.
              </p>
              <button
                onClick={() => setSent(false)}
                className="px-6 py-2 rounded-xl bg-[#34A853] text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#5F6368] uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full p-3 bg-[#F8F9FA] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285F4] text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-[#5F6368] uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@agency.com"
                    className="w-full p-3 bg-[#F8F9FA] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285F4] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#5F6368] uppercase">Telegram Handle (Optional)</label>
                  <input
                    type="text"
                    value={formData.telegram}
                    onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                    placeholder="@johndoe"
                    className="w-full p-3 bg-[#F8F9FA] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285F4] text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-[#5F6368] uppercase">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full p-3 bg-[#F8F9FA] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285F4] text-sm font-semibold"
                  >
                    <option value="Wholesale Inquiry">Wholesale Bulk Inquiry (50+ pcs)</option>
                    <option value="Order Support">Order Spreadsheet & Delivery Support</option>
                    <option value="Replacement Warranty">72-Hour Warranty Replacement</option>
                    <option value="Custom Setup">Custom Geo IP & Proxy Integration</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#5F6368] uppercase">Your Message / Requirements *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Specify which account type (USA Aged / PVA / Ads) and quantity you need..."
                  className="w-full p-3 bg-[#F8F9FA] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285F4] text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white p-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Dispatch Message to Engineering Team</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Operations Center Specs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#F8F9FA] dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 space-y-4 text-xs">
            <h4 className="font-bold text-sm text-[#202124] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#4285F4]" />
              <span>Global Operations Infrastructure</span>
            </h4>
            <p className="text-[#5F6368] dark:text-gray-400 leading-relaxed">
              Our engineering infrastructure operates distributed SIM farms and residential proxy gateways across three primary data regions:
            </p>

            <div className="space-y-2 pt-2 border-t border-[#E5E7EB] dark:border-gray-800 font-medium">
              <div className="flex justify-between">
                <span className="text-[#5F6368]">USA Hub (Primary):</span>
                <span className="text-[#202124] dark:text-white font-bold">New York & Cheyenne, WY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6368]">EU Telecom Node:</span>
                <span className="text-[#202124] dark:text-white font-bold">Frankfurt, Germany</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6368]">APAC Proxy Gate:</span>
                <span className="text-[#202124] dark:text-white font-bold">Singapore</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#34A853] flex-shrink-0" />
              <div>
                <span className="font-bold block text-[#202124] dark:text-white">24/7 Automated Dispatch</span>
                <span className="text-[11px] text-[#5F6368]">Cryptocurrency orders dispatch spreadsheets in under 180 seconds.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
