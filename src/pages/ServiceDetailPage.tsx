import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  Star, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ArrowLeft, 
  ShoppingBag, 
  HelpCircle, 
  ChevronDown, 
  Award, 
  Lock, 
  Clock, 
  Share2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ServiceItem, PageRoute } from '../types';
import { SEOMeta } from '../components/common/SEOMeta';
import { cleanContentForDisplay } from '../utils/contentSanitizer';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ServiceDetailPageProps {
  service: ServiceItem;
  allServices: ServiceItem[];
  onBack: () => void;
  onSelectService: (slug: string) => void;
  onOpenOrder: (serviceId: string, quantity?: number) => void;
  darkMode: boolean;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  allServices,
  onBack,
  onSelectService,
  onOpenOrder,
  darkMode
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedQty, setSelectedQty] = useState<number>(service.pricing[0]?.quantity || 1);

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-[#EA4335]" />;
      case 'Smartphone': return <Smartphone className="w-8 h-8 text-[#4285F4]" />;
      case 'Globe': return <Globe className="w-8 h-8 text-[#34A853]" />;
      case 'Star': return <Star className="w-8 h-8 text-[#FBBC05]" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-purple-600" />;
      default: return <Zap className="w-8 h-8 text-[#EA4335]" />;
    }
  };

  const relatedServices = (allServices || [])
    .filter(s => (service.relatedSlugs || []).includes(s.slug) || s.id !== service.id)
    .slice(0, 3);

  const currentTier = (service.pricing || []).find(p => p.quantity === selectedQty) || (service.pricing || [])[0];
  const unitPrice = currentTier ? (currentTier.price / currentTier.quantity).toFixed(2) : '0.00';

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans text-[#202124] animate-in fade-in duration-300">
      <SEOMeta
        title={service.seoTitle || `${service.name} for Sale | buyusagmail.com`}
        description={service.metaDescription}
        canonicalUrl={`https://buyusagmail.com/services/${service.slug}`}
        type="product"
        service={service}
        breadcrumbs={[
          { name: 'Home', url: 'https://buyusagmail.com' },
          { name: 'Services', url: 'https://buyusagmail.com/services' },
          { name: service.name, url: `https://buyusagmail.com/services/${service.slug}` }
        ]}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#5F6368]">
        <button onClick={onBack} className="hover:text-[#EA4335] transition-colors flex items-center gap-1.5 font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </button>
        <span>/</span>
        <span className="text-[#202124] dark:text-white font-bold">{service.name}</span>
      </nav>

      {/* Top Hero Layout: High Density Google Style */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Col: Description & Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-full text-xs font-bold text-[#5F6368] dark:text-gray-300">
            <span className="w-2 h-2 bg-[#34A853] rounded-full animate-pulse"></span>
            <span>{service.badge}</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-4 rounded-2xl bg-[#FCE8E6] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 shadow-sm flex-shrink-0">
              {getIcon(service.iconName)}
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202124] dark:text-white tracking-tight leading-[1.1]">
                {service.title}
              </h1>
              <p className="text-sm font-bold text-[#374151] dark:text-gray-300 mt-2">
                {service.subtitle}
              </p>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-3 py-2 border-y border-[#E5E7EB] dark:border-gray-800 text-xs font-bold">
            <div className="flex items-center text-[#FBBC05]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-[#202124] dark:text-white">{service.rating} / 5.0 Trust Score</span>
            <span className="text-[#4B5563] dark:text-gray-400">({service.reviewsCount} verified agency buyers)</span>
          </div>

          {/* Overview */}
          <div className="space-y-4 text-sm sm:text-base text-[#374151] dark:text-gray-200 leading-relaxed">
            <p className="font-normal">{service.overview}</p>
          </div>

          {/* Key Benefits Grid */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold text-[#202124] dark:text-white uppercase tracking-wider text-xs">
              ⚡ What is Included in Your Package:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(service.benefits || []).map((benefit, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 flex items-start gap-2.5 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                  <span className="text-[#202124] dark:text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Features */}
          <div className="space-y-3 pt-4 border-t border-[#E5E7EB] dark:border-gray-800">
            <h3 className="text-base font-bold text-[#202124] dark:text-white uppercase tracking-wider text-xs">
              🔒 Technical Specifications:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(service.features || []).map((feat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 space-y-1 shadow-sm">
                  <h4 className="text-xs font-bold text-[#202124] dark:text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]"></span>
                    <span>{feat.title}</span>
                  </h4>
                  <p className="text-xs text-[#5F6368] dark:text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Checkout High Density Box */}
        <div className="lg:col-span-5 relative sticky top-24">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden space-y-6">
            
            {/* Top Google color gradient */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#EA4335] via-[#FBBC05] to-[#4285F4]"></div>

            <div className="flex justify-between items-center pt-2">
              <h3 className="font-bold text-lg text-[#202124] dark:text-white">Quick Instant Checkout</h3>
              <div className="text-xs bg-[#E8F0FE] text-[#4285F4] dark:bg-blue-900/30 dark:text-blue-300 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>256-Bit SSL</span>
              </div>
            </div>

            {/* Quantity Selector Tiers */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#5F6368] dark:text-gray-400 uppercase tracking-wider block">
                Select Package Quantity:
              </label>
              <div className="grid grid-cols-1 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {(service.pricing || []).map((tier, idx) => {
                  const isSelected = selectedQty === tier.quantity;
                  const perUnit = (tier.price / tier.quantity).toFixed(2);
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedQty(tier.quantity)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#E8F0FE] dark:bg-blue-900/20 border-[#4285F4] shadow-md'
                          : 'bg-[#F8F9FA] dark:bg-gray-800 border-[#E5E7EB] dark:border-gray-700 hover:border-[#4285F4]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#4285F4] bg-[#4285F4]' : 'border-gray-400'
                        }`}>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-[#202124] dark:text-white">
                            {tier.quantity} Accounts Package
                          </span>
                          <span className="block text-[11px] text-[#5F6368] font-semibold">
                            ${perUnit} per account
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#4285F4]">${tier.price}.00</span>
                        {tier.save && (
                          <span className="block text-[10px] font-bold text-[#34A853] bg-[#E6F4EA] dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                            {tier.save}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-[#5F6368]">
                <span>Selected Tier:</span>
                <span className="text-[#202124] dark:text-white font-bold">{selectedQty} x {service.name}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#5F6368]">
                <span>Automated Dispatch:</span>
                <span className="text-[#34A853] font-bold">⚡ Instant (&lt; 3 minutes)</span>
              </div>
              <div className="flex justify-between font-semibold text-[#5F6368]">
                <span>Replacement Warranty:</span>
                <span className="text-[#202124] dark:text-white font-bold">72 Hours Guaranteed</span>
              </div>
              <div className="pt-2 border-t border-[#E5E7EB] dark:border-gray-700 flex justify-between items-center text-sm font-black text-[#202124] dark:text-white">
                <span>Total Amount:</span>
                <span className="text-lg text-[#4285F4]">${currentTier?.price}.00 USD</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onOpenOrder(service.id, selectedQty)}
              className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white p-4 rounded-xl font-bold text-base shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Proceed to Payment ($ {currentTier?.price}.00)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Footer */}
            <div className="text-center space-y-2 pt-2">
              <p className="text-[11px] text-[#5F6368] font-medium">
                🔒 Instant delivery via CSV spreadsheet upon cryptocurrency confirmation.
              </p>
              <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-[#5F6368] bg-[#F8F9FA] dark:bg-gray-800 py-1.5 rounded-lg border border-[#E5E7EB] dark:border-gray-700">
                <span>Accepted Crypto:</span>
                <span className="text-[#EA4335]">BTC</span>
                <span>•</span>
                <span className="text-[#4285F4]">ETH</span>
                <span>•</span>
                <span className="text-[#34A853]">USDT</span>
                <span>•</span>
                <span className="text-[#FBBC05]">SOL</span>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FBBC05]/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>

      {/* Comprehensive SEO Content Section */}
      {service.seoContent && (
        <div className="pt-12 border-t border-[#E5E7EB] dark:border-gray-800 max-w-4xl space-y-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#EA4335] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 px-3.5 py-1.5 rounded-full w-fit uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#EA4335] animate-pulse" />
            <span>In-Depth Service Guide & SEO Overview</span>
          </div>
          <div className="prose dark:prose-invert max-w-none text-base sm:text-lg text-[#334155] dark:text-gray-300 leading-relaxed font-normal space-y-6 bg-[#F8FAFC] dark:bg-gray-900/80 p-6 sm:p-10 rounded-3xl border border-[#E2E8F0] dark:border-gray-800 shadow-sm">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white mt-10 mb-4 tracking-tight leading-snug" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white mt-10 mb-4 tracking-tight leading-snug" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3 text-[#1e293b] dark:text-gray-100 tracking-tight" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2" {...props} />,
                p: ({node, ...props}: any) => {
                  const isOnlyAnchor = Array.isArray(props.children) 
                    ? props.children.every((c: any) => !c || (typeof c === 'object' && !c.props?.href && (c.props?.name || c.props?.id)))
                    : typeof props.children === 'object' && !props.children?.props?.href && (props.children?.props?.name || props.children?.props?.id);
                  if (isOnlyAnchor) return <>{props.children}</>;
                  return <p className="leading-relaxed text-[#475569] dark:text-gray-300 mb-6 text-base sm:text-lg" {...props} />;
                },
                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2.5 mb-6 ml-2 text-[#475569] dark:text-gray-300 text-base sm:text-lg" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2.5 mb-6 ml-2 text-[#475569] dark:text-gray-300 text-base sm:text-lg" {...props} />,
                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                strong: ({node, ...props}) => <strong className="font-extrabold text-gray-900 dark:text-white" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-[#4285F4] pl-5 py-4 my-8 bg-blue-50/70 dark:bg-blue-950/30 rounded-r-2xl italic text-[#334155] dark:text-gray-200 shadow-sm leading-relaxed" {...props} />
                ),
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-8 border border-gray-200 dark:border-gray-800 rounded-2xl">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-sm sm:text-base" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-white font-bold" {...props} />,
                tbody: ({node, ...props}) => <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900" {...props} />,
                tr: ({node, ...props}) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" {...props} />,
                th: ({node, ...props}) => <th className="py-3.5 px-4 font-extrabold text-gray-900 dark:text-white" {...props} />,
                td: ({node, ...props}) => <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium" {...props} />,
                a: ({node, ...props}: any) => {
                  if (!props.href && (props.name || props.id)) {
                    return <span id={props.name || props.id} className="scroll-mt-28 block -mt-4" />;
                  }
                  const isExternal = props.href?.startsWith('http');
                  return (
                    <a 
                      className="text-[#4285F4] hover:text-[#3367D6] dark:text-blue-400 font-semibold underline decoration-blue-300 hover:decoration-blue-500 transition-all" 
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      {...props} 
                    />
                  );
                },
                hr: () => <div className="my-6" />,
              }}
            >
              {cleanContentForDisplay(service.seoContent || '')}
            </Markdown>
          </div>
        </div>
      )}

      {/* Service FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <div className="pt-12 border-t border-[#E5E7EB] dark:border-gray-800 space-y-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#202124] dark:text-white">
            Frequently Asked Questions for {service.name}
          </h2>
          <div className="space-y-3">
            {(service.faqs || []).map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-[#E5E7EB] dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full text-left p-5 font-bold text-sm sm:text-base text-[#202124] dark:text-white flex justify-between items-center gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#5F6368] transition-transform ${isOpen ? 'rotate-180 text-[#EA4335]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5F6368] dark:text-gray-300 leading-relaxed border-t border-[#E5E7EB] dark:border-gray-800 mt-1">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="pt-12 border-t border-[#E5E7EB] dark:border-gray-800 space-y-6">
          <h2 className="text-2xl font-bold text-[#202124] dark:text-white">Related Infrastructure Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(relatedServices || []).map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectService(rel.slug)}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 hover:border-[#4285F4] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] dark:bg-blue-900/30 flex items-center justify-center text-[#4285F4] group-hover:bg-[#4285F4] group-hover:text-white transition-colors">
                    {getIcon(rel.iconName)}
                  </div>
                  <h4 className="text-base font-bold text-[#202124] dark:text-white group-hover:text-[#4285F4] transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-[#5F6368] dark:text-gray-400 line-clamp-2">
                    {rel.subtitle}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#202124] dark:text-white">From ${(rel.pricing || [])[0]?.price || 0}</span>
                  <span className="text-xs font-bold text-[#4285F4]">View Details &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
