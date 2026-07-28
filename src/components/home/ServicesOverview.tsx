import React from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  Star, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  Check, 
  ShoppingBag 
} from 'lucide-react';
import { ServiceItem, PageRoute } from '../../types';

interface ServicesOverviewProps {
  services: ServiceItem[];
  onNavigate: (route: PageRoute, slug?: string) => void;
  onOpenOrder: (serviceId: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ services, onNavigate, onOpenOrder }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-red-500" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-blue-500" />;
      case 'Globe': return <Globe className="w-6 h-6 text-green-500" />;
      case 'Star': return <Star className="w-6 h-6 text-yellow-500" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-purple-500" />;
      default: return <Zap className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/70 dark:bg-gray-900/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Enterprise Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Our Verified Aged Account Inventory
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Every account in our inventory is backed by our 72-hour instant replacement warranty and delivered as formatted spreadsheets with complete recovery credentials.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(services || []).map(service => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-7 shadow-sm hover:shadow-xl hover:border-red-500/40 dark:hover:border-red-500/40 transition-all flex flex-col justify-between group relative"
            >
              <div>
                {/* Badge & Icon Header */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full border border-red-500/20">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 
                  onClick={() => onNavigate('service-detail', service.slug)}
                  className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight cursor-pointer hover:text-red-500 transition-colors"
                >
                  {service.name}
                </h3>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {service.subtitle}
                </p>

                {/* Overview Snippet */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3.5 line-clamp-3 leading-relaxed">
                  {service.overview}
                </p>

                {/* Top 3 Benefits */}
                <ul className="mt-5 space-y-2.5 pt-5 border-t border-gray-100 dark:border-gray-800/80">
                  {(service.benefits || []).slice(0, 3).map((benefit, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Actions */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Starter Tier</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">
                      ${service.pricing[0]?.price} <span className="text-xs font-normal text-gray-500">for {service.pricing[0]?.quantity} pcs</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded block">
                      Up to 60% Bulk Off
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onNavigate('service-detail', service.slug)}
                    className="py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-400 text-gray-700 dark:text-gray-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>SEO Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenOrder(service.id)}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20 transition-all transform hover:-translate-y-0.5"
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
    </section>
  );
};
