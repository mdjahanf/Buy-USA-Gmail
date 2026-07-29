import React from 'react';
import { ShieldCheck, FileText, Lock, AlertTriangle, RefreshCw, MapPin, ArrowLeft } from 'lucide-react';
import { SEOMeta } from '../components/common/SEOMeta';
import { SERVICES_DATA } from '../data/initialData';
import { BLOG_POSTS } from '../data/blogData';

interface LegalPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<LegalPageProps> = ({ onBack }) => (
  <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans text-[#202124] animate-in fade-in duration-300 text-xs sm:text-sm leading-relaxed">
    <SEOMeta title="Terms of Service & Wholesale Agreement | buyusagmail.com" description="Review the official wholesale terms of service and usage policies for buyusagmail.com aged USA and PVA accounts." canonicalUrl="https://buyusagmail.com/terms" />
    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-[#4285F4] hover:underline"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
    <div className="p-8 rounded-[32px] bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#202124] dark:text-white border-b pb-4">Terms of Service & Wholesale Agreement</h1>
      <p className="font-semibold text-[#5F6368]">Last Updated: July 2026</p>
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#202124] dark:text-white">1. Account Ownership & Delivery</h3>
        <p>All Google accounts delivered by buyusagmail.com are transferred with full administrative credentials, including primary password, backup recovery email, recovery password, and 2FA secret keys. Once downloaded by the buyer, complete ownership and responsibility for account security are transferred to the client.</p>
        <h3 className="text-base font-bold text-[#202124] dark:text-white">2. Acceptable Use Policy</h3>
        <p>Clients agree to utilize accounts strictly in compliance with applicable local and international laws. Accounts must not be used for unsolicited malicious activities or unauthorized network intrusion.</p>
        <h3 className="text-base font-bold text-[#202124] dark:text-white">3. Proxy Hygiene & IP Requirements</h3>
        <p>To preserve historical trust authority, clients are required to access accounts using high-quality USA residential, ISP, or 4G/5G mobile proxies matching the designated timezone of the account.</p>
      </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC<LegalPageProps> = ({ onBack }) => (
  <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans text-[#202124] animate-in fade-in duration-300 text-xs sm:text-sm leading-relaxed">
    <SEOMeta title="Privacy Policy & Data Protection | buyusagmail.com" description="Learn how buyusagmail.com encrypts order data and maintains zero-log anonymity for cryptocurrency purchasers." canonicalUrl="https://buyusagmail.com/privacy" />
    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-[#4285F4] hover:underline"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
    <div className="p-8 rounded-[32px] bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#202124] dark:text-white border-b pb-4">Privacy Policy & Anonymity Guarantee</h1>
      <p className="font-semibold text-[#5F6368]">Last Updated: July 2026</p>
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#202124] dark:text-white">1. Zero Data Retention Policy</h3>
        <p>buyusagmail.com operates under a strict data minimization principle. We do not store financial records or KYC data. Cryptocurrency transactions are verified automatically via blockchain explorers without requiring personal identification.</p>
        <h3 className="text-base font-bold text-[#202124] dark:text-white">2. SSL Encryption & Delivery Safety</h3>
        <p>All order spreadsheets are transmitted over 256-bit TLS encrypted tunnels. We advise clients to download their delivery spreadsheets immediately upon receipt and store them in secure local vaults.</p>
      </div>
    </div>
  </div>
);

export const RefundPage: React.FC<LegalPageProps> = ({ onBack }) => (
  <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans text-[#202124] animate-in fade-in duration-300 text-xs sm:text-sm leading-relaxed">
    <SEOMeta title="72-Hour Replacement Warranty & Refund Policy | buyusagmail.com" description="Examine our industry-leading 72-hour replacement guarantee against initial login checkpoints and password mismatches." canonicalUrl="https://buyusagmail.com/refund" />
    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-[#4285F4] hover:underline"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
    <div className="p-8 rounded-[32px] bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#202124] dark:text-white border-b pb-4">72-Hour Replacement Warranty Policy</h1>
      <p className="font-semibold text-[#5F6368]">Last Updated: July 2026</p>
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#202124] dark:text-white">1. Initial Login Guarantee</h3>
        <p>We provide a comprehensive 72-hour replacement warranty covering any account that fails initial authentication due to password mismatch or pre-existing Google security checkpoints upon first access.</p>
        <h3 className="text-base font-bold text-[#202124] dark:text-white">2. How to Claim Instant Replacements</h3>
        <p>To request a replacement, simply contact our 24/7 Telegram support (@EgSupport24) or WhatsApp desk with your Order ID (MG-XXXXX) and a screenshot of the login prompt. Our engineers will dispatch replacement profiles within 15 minutes.</p>
      </div>
    </div>
  </div>
);

export const DMCAPage: React.FC<LegalPageProps> = ({ onBack }) => (
  <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans text-[#202124] animate-in fade-in duration-300 text-xs sm:text-sm leading-relaxed">
    <SEOMeta title="DMCA & Copyright Compliance | buyusagmail.com" description="DMCA notice and intellectual property compliance protocols for buyusagmail.com digital infrastructure services." canonicalUrl="https://buyusagmail.com/dmca" />
    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-[#4285F4] hover:underline"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
    <div className="p-8 rounded-[32px] bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#202124] dark:text-white border-b pb-4">DMCA Copyright Policy</h1>
      <p>buyusagmail.com respects intellectual property rights. If you believe any content on our platform infringes upon verified copyrights, submit a formal DMCA takedown notice to smmbuy2022@gmail.com with exact URL references.</p>
    </div>
  </div>
);

export const DisclaimerPage: React.FC<LegalPageProps> = ({ onBack }) => (
  <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans text-[#202124] animate-in fade-in duration-300 text-xs sm:text-sm leading-relaxed">
    <SEOMeta title="Legal Disclaimer | buyusagmail.com" description="Legal disclaimer regarding third-party trademarks and platform independence." canonicalUrl="https://buyusagmail.com/disclaimer" />
    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-[#4285F4] hover:underline"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
    <div className="p-8 rounded-[32px] bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#202124] dark:text-white border-b pb-4">Independent Legal Disclaimer</h1>
      <p>buyusagmail.com is an independent digital infrastructure consultancy and wholesale supplier. We are not officially affiliated with, endorsed by, or sponsored by Google LLC, Alphabet Inc., or any of their subsidiary entities. "Google", "Gmail", and "Google Ads" are registered trademarks of their respective holders.</p>
    </div>
  </div>
);

export const SitemapPage: React.FC<{ onNavigate: (r: any, s?: any) => void; onBack: () => void }> = ({ onNavigate, onBack }) => (
  <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans text-[#202124] animate-in fade-in duration-300 text-xs sm:text-sm leading-relaxed">
    <SEOMeta title="HTML Sitemap & Directory | buyusagmail.com" description="Complete HTML sitemap directory of all buyusagmail.com pages, service tiers, and 50 SEO guides." canonicalUrl="https://buyusagmail.com/sitemap" />
    <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-[#4285F4] hover:underline"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
    <div className="p-8 rounded-[32px] bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 space-y-6 shadow-sm">
      <h1 className="text-3xl font-black text-[#202124] dark:text-white border-b pb-4">buyusagmail.com Directory Sitemap</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-bold">
        <div className="space-y-2">
          <h3 className="text-sm uppercase text-[#EA4335]">Core Navigation</h3>
          <ul className="space-y-1.5 font-medium text-[#4285F4]">
            <li><button onClick={() => onNavigate('home')}>&rarr; Home</button></li>
            <li><button onClick={() => onNavigate('services')}>&rarr; All Services</button></li>
            <li><button onClick={() => onNavigate('pricing')}>&rarr; Wholesale Pricing</button></li>
            <li><button onClick={() => onNavigate('about')}>&rarr; About buyusagmail.com</button></li>
            <li><button onClick={() => onNavigate('faq')}>&rarr; FAQ Hub</button></li>
            <li><button onClick={() => onNavigate('blog')}>&rarr; SEO Knowledge Hub</button></li>
            <li><button onClick={() => onNavigate('payment-methods')}>&rarr; Crypto Payment Guide</button></li>
            <li><button onClick={() => onNavigate('contact')}>&rarr; Direct Contact Desk</button></li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm uppercase text-[#4285F4]">Verified Service Pages</h3>
          <ul className="space-y-1.5 font-medium text-[#4285F4]">
            {(SERVICES_DATA || []).map((s) => (
              <li key={s.id}>
                <button onClick={() => onNavigate('service-detail', s.slug)} className="text-left hover:underline">
                  &rarr; {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 col-span-1 sm:col-span-2 lg:col-span-2">
          <h3 className="text-sm uppercase text-[#FBBC05]">All 50+ SEO Knowledge & Growth Guides</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 font-medium text-[#4285F4]">
            {(BLOG_POSTS || []).map((b) => (
              <li key={b.id}>
                <button onClick={() => onNavigate('blog-post', b.slug)} className="text-left hover:underline line-clamp-1">
                  &rarr; {b.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm uppercase text-[#34A853]">Legal & Compliance</h3>
          <ul className="space-y-1.5 font-medium text-[#4285F4]">
            <li><button onClick={() => onNavigate('terms')}>&rarr; Terms of Service</button></li>
            <li><button onClick={() => onNavigate('privacy')}>&rarr; Privacy Policy</button></li>
            <li><button onClick={() => onNavigate('refund')}>&rarr; 72-Hour Refund Policy</button></li>
            <li><button onClick={() => onNavigate('dmca')}>&rarr; DMCA Copyright</button></li>
            <li><button onClick={() => onNavigate('disclaimer')}>&rarr; Legal Disclaimer</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export const NotFoundPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="text-center py-24 px-4 space-y-6 max-w-md mx-auto font-sans text-[#202124] animate-in fade-in duration-300">
    <div className="w-20 h-20 rounded-full bg-[#FCE8E6] text-[#EA4335] flex items-center justify-center mx-auto">
      <AlertTriangle className="w-10 h-10" />
    </div>
    <h1 className="text-4xl font-black text-[#202124] dark:text-white">404 - Page Not Found</h1>
    <p className="text-xs text-[#5F6368] leading-relaxed">The endpoint or infrastructure route you requested does not exist on this server.</p>
    <button onClick={onBack} className="px-6 py-3 rounded-xl bg-[#4285F4] text-white font-bold text-xs shadow-lg shadow-blue-500/25">Return to buyusagmail.com Home</button>
  </div>
);
