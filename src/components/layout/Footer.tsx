import React, { useState } from 'react';
import { 
  Send, 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  Star, 
  TrendingUp, 
  Zap, 
  MessageCircle, 
  Mail, 
  Phone, 
  Lock, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { PageRoute, ServiceItem } from '../../types';

interface FooterProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
  services: ServiceItem[];
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, services, darkMode }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={`border-t transition-colors ${
      darkMode ? 'bg-gray-950 border-gray-800 text-gray-300' : 'bg-gray-900 border-gray-800 text-gray-300'
    }`}>
      
      {/* Top Banner / Newsletter CTA */}
      <div className="border-b border-gray-800/80 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mb-3 inline-block">
              🔥 Exclusive Automation Perks
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Join the buyusa<span className="text-red-500">gmail.com</span> Insider VIP List
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Subscribe to get instant stock alerts for fresh USA aged batches, exclusive crypto discount coupons, and our weekly deliverability growth hacks.
            </p>
          </div>

          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3 text-green-400">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold">You're on the VIP list!</p>
                  <p className="text-xs text-gray-300">Use promo code <strong className="text-white bg-green-900/60 px-1.5 py-0.5 rounded">CRYPTO10</strong> at checkout for 10% off your next bulk order!</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-gray-500 mt-2 text-center lg:text-left">
              🔒 We respect your privacy. No spam, one-click unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Column 1: Brand & Contact */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-md shadow-red-500/20">
              BG
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              buyusa<span className="text-red-500">gmail.com</span>
            </span>
          </div>
          
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            The premier global marketplace for verified USA aged, phone-verified (PVA), and review-ready Gmail accounts. Engineered for digital agencies, high-budget media buyers, and automated growth teams.
          </p>

          <div className="pt-2 space-y-2 text-sm">
            <a 
              href="https://t.me/EgSupport24" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </span>
              <span>Telegram Support: <strong className="text-white">@EgSupport24</strong></span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>

            <a 
              href="https://wa.me/13073939979" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </span>
              <span>WhatsApp: <strong className="text-white">+1 (307) 393-9979</strong></span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>

            <a 
              href="mailto:smmbuy2022@gmail.com" 
              className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </span>
              <span>Direct Email: <strong className="text-white">smmbuy2022@gmail.com</strong></span>
            </a>
          </div>
        </div>

        {/* Column 2: SEO Service Landing Pages */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Verified Services
          </h4>
          <ul className="space-y-2.5 text-sm">
            {(services || []).map(s => (
              <li key={s.id}>
                <button
                  onClick={() => onNavigate('service-detail', s.slug)}
                  className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span>{s.name}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onNavigate('services')}
                className="text-xs font-bold text-red-400 hover:text-red-300 pt-1 block"
              >
                View Full Catalog &rarr;
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Company & Resources */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Resources & Tools
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white transition-colors">
                About buyusagmail.com
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('pricing')} className="text-gray-400 hover:text-white transition-colors">
                Wholesale Pricing Calculator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('payment-methods')} className="text-gray-400 hover:text-white transition-colors">
                Crypto Wallet Addresses
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('blog')} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                <span>SEO Blog Center</span>
                <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold">50 Guides</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('faqs')} className="text-gray-400 hover:text-white transition-colors">
                Frequently Asked Questions
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('sitemap')} className="text-gray-400 hover:text-white transition-colors">
                HTML & XML Sitemap
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Legal & Policies */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Legal & Compliance
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => onNavigate('terms')} className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('privacy')} className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('refund')} className="text-gray-400 hover:text-white transition-colors">
                Refund & Warranty Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('dmca')} className="text-gray-400 hover:text-white transition-colors">
                DMCA Copyright Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('disclaimer')} className="text-gray-400 hover:text-white transition-colors">
                Legal Disclaimer
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('404')} className="text-gray-500 hover:text-gray-400 transition-colors text-xs">
                Custom 404 Preview
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Crypto Badges & Copyright */}
      <div className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          <div>
            <p>&copy; {new Date().getFullYear()} buyusagmail.com Marketplace. All rights reserved. Not officially affiliated with Google LLC.</p>
            <p className="mt-1">Built with custom React 19, Tailwind CSS, and Google Gemini AI for high-velocity agency scaling.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-semibold text-gray-400">Accepted Crypto:</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-orange-400 font-bold border border-gray-700">BTC</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-blue-400 font-bold border border-gray-700">ETH</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-green-400 font-bold border border-gray-700">SOL</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-yellow-400 font-bold border border-gray-700">BNB</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-emerald-400 font-bold border border-gray-700">USDT TRC20</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
