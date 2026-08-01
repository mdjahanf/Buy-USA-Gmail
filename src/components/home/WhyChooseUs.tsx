import React from 'react';
import { ShieldCheck, Smartphone, Zap, Clock, Lock, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const advantages = [
    {
      icon: <Smartphone className="w-6 h-6 text-blue-500" />,
      title: 'Real Physical SIM Verification',
      desc: 'We never use temporary 10-minute VoIP numbers. Every PVA and aged account is authenticated with physical tier-1 mobile carrier SIM cards (USA, UK, EU) to prevent secondary SMS checkpoints.'
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      title: '2 to 8+ Years of Authentic Aging',
      desc: 'Our accounts were registered during early Google epochs (2018–2022). They hold immense domain trust and high sender scores, effortlessly bypassing modern Google anti-spam sandboxing.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'USA Residential Proxy Warm-up',
      desc: 'Accounts are warmed up on clean USA residential IPs (NY, TX, CA, IL) with simulated human browsing, YouTube streaming, and Google Drive activity before being listed for sale.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-green-500" />,
      title: '72-Hour Instant Replacement Warranty',
      desc: 'Our ironclad warranty guarantees 100% replacement within 3 minutes via Telegram support (@EgSupport24) if any account encounters initial login verification issues.'
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-500" />,
      title: 'Full Recovery & 2FA Credentials',
      desc: 'Delivered as Email:Password:RecoveryEmail:RecoveryPassword:YearCreated:State. You gain 100% exclusive administrative ownership with instant capability to generate App Passwords.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-500" />,
      title: 'Automated 24/7 Crypto Dispatch',
      desc: 'No waiting for manual business hours. Our blockchain payment verification gateway confirms USDT, BTC, and SOL deposits automatically and dispatches your spreadsheet instantly.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Why We Are The Benchmark
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Why 3,400+ Agencies Choose buyusa<span className="text-red-500">gmail.com</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            In an industry crowded with low-quality VoIP sellers, we built an institutional-grade infrastructure engineered specifically for high-budget media buyers and cold email operations.
          </p>
        </div>

        {/* Advantage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(advantages || []).map((adv, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-gray-50/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 hover:border-red-500/30 transition-all space-y-3 shadow-sm group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                {adv.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                {adv.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Side by Side Comparison Box */}
        <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black">
                buyusa<span className="text-red-500">gmail.com</span> vs Cheap VoIP Suppliers
              </h3>
              <p className="text-sm text-gray-400">
                See why buying cheap $0.50 VoIP accounts actually costs your business 10x more in wasted proxies and lost campaign time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* buyusagmail.com Column */}
              <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
                  <span className="font-extrabold text-red-400 text-base">✓ buyusagmail.com Accounts</span>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Recommended</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>100% Real Physical SIMs:</strong> Permanent carrier authentication, zero secondary SMS blocks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Aged 2 to 8+ Years:</strong> Built-in Google algorithm trust for immediate high-spend ads.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>USA Residential Geolocation:</strong> Match your proxy state to prevent login anomalies.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>72-Hour Instant Replacement:</strong> Direct Telegram support with no hassle.</span>
                  </li>
                </ul>
              </div>

              {/* Competitors Column */}
              <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/80 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="font-extrabold text-gray-400 text-base">✗ Cheap VoIP Sellers</span>
                  <span className="bg-gray-700 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">High Risk</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>10-Minute VoIP Numbers:</strong> Expired phone lines cause permanent lockouts upon first API login.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Freshly Farmed Bots:</strong> Accounts get disabled within 24 hours of initiating cold outreach.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Datacenter IP Footprint:</strong> Flagged subnets immediately trigger Google reCAPTCHA loops.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Zero Warranty Support:</strong> Sellers disappear after payment or blame your proxy setup.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
