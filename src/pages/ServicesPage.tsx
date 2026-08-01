import React from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  Star, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  ShoppingBag
} from 'lucide-react';
import { ServiceItem, PageRoute } from '../types';
import { SEOMeta } from '../components/common/SEOMeta';

interface ServicesPageProps {
  services: ServiceItem[];
  selectedSlug?: string;
  onNavigate: (route: PageRoute, slug?: string) => void;
  onOpenOrder: (serviceId?: string, quantity?: number) => void;
  darkMode: boolean;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  selectedSlug,
  onNavigate,
  onOpenOrder,
  darkMode
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-red-500" />;
      case 'Smartphone': return <Smartphone className="w-8 h-8 text-blue-500" />;
      case 'Globe': return <Globe className="w-8 h-8 text-green-500" />;
      case 'Star': return <Star className="w-8 h-8 text-yellow-500" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-purple-500" />;
      default: return <Zap className="w-8 h-8 text-amber-500" />;
    }
  };

  // DEFAULT CATALOG VIEW
  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      <SEOMeta
        title="Verified Services Catalog - USA Aged & PVA Gmail Accounts | buyusagmail.com"
        description="Browse our complete catalog of aged USA residential Gmail accounts, physical SIM verified PVA accounts, and local GMB review profiles."
        canonicalUrl="https://buyusagmail.com/services"
      />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          Full Catalog & Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Verified Gmail Accounts Marketplace
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Select any service category below to view technical specifications, SEO landing documentation, or trigger instant automated ordering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(services || []).map(service => (
          <div
            key={service.id}
            className={`rounded-3xl p-7 border transition-all flex flex-col justify-between group ${
              darkMode ? 'bg-gray-900 border-gray-800 hover:border-red-500/40' : 'bg-white border-gray-200 hover:shadow-xl'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 border flex items-center justify-center">
                  {getIcon(service.iconName)}
                </div>
                <span className="text-[11px] font-bold bg-red-500/10 text-red-500 px-2.5 py-1 rounded-full border border-red-500/20">
                  {service.badge}
                </span>
              </div>

              <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                <a
                  href={`/services/${service.slug}`}
                  onClick={(e) => { e.preventDefault(); onNavigate('service-detail', service.slug); }}
                  className="hover:text-red-500 transition-colors"
                >
                  {service.name}
                </a>
              </h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                {service.subtitle}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3 leading-relaxed">
                {service.overview}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Starting From</span>
                  <span className="text-2xl font-black text-gray-900 dark:text-white">${service.pricing[0]?.price}</span>
                  <span className="text-xs text-gray-500"> ({service.pricing[0]?.quantity} pcs)</span>
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
                  Up to 60% Off
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`/services/${service.slug}`}
                  onClick={(e) => { e.preventDefault(); onNavigate('service-detail', service.slug); }}
                  className="py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-400 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <span>SEO Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => onOpenOrder(service.id)}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
