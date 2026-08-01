import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const ComparisonTableSection: React.FC = () => {
  const comparisonData = [
    {
      feature: 'Account Verification Protocol',
      buyusagmail: 'Real Physical Mobile SIMs (Tier-1)',
      competitor: 'Temporary 10-Minute VoIP Lines',
      workspace: 'Requires Domain DNS & TXT Proof'
    },
    {
      feature: 'Account Age & History',
      buyusagmail: '2 to 8+ Years Old (Varying Tiers)',
      competitor: 'Freshly Created (0 to 3 Days Old)',
      workspace: 'Brand New (0 Domain Trust)'
    },
    {
      feature: 'USA Residential Proxy Warm-up',
      buyusagmail: 'Yes! Pre-warmed on clean residential IPs',
      competitor: 'No (Farmed on flagged datacenter IPs)',
      workspace: 'No (Requires manual team warmup)'
    },
    {
      feature: 'Google Ads & GMB Review Trust',
      buyusagmail: '98%+ Stick Rate & Billing Whitelisted',
      competitor: '<15% Stick Rate (Instant suspensions)',
      workspace: 'Requires 6 months of active spend'
    },
    {
      feature: 'Cost Per Inbox / Account',
      buyusagmail: '$0.80 to $4.00 One-Time Purchase',
      competitor: '$0.50 One-Time (But locked instantly)',
      workspace: '$6.00 / Month Recurring per Inbox'
    },
    {
      feature: 'Replacement Warranty',
      buyusagmail: '72-Hour Instant Warranty via Telegram',
      competitor: 'No warranty or 1-hour limit',
      workspace: 'N/A (Self managed)'
    },
    {
      feature: 'Delivery Velocity',
      buyusagmail: 'Instant Automated Crypto Delivery (<3 min)',
      competitor: 'Manual email delivery (12 to 24 hrs)',
      workspace: 'Manual DNS setup (2 to 4 hrs)'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Market Matrix Analysis
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            How buyusa<span className="text-red-500">gmail.com</span> Compares
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            A transparent breakdown of why leading growth marketing agencies and media buyers choose our inventory over competitors and custom workspace setups.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl bg-white dark:bg-gray-900">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-950/80">
                <th className="p-5 text-sm font-black text-gray-500 uppercase tracking-wider w-1/4">
                  Feature / Benchmark
                </th>
                <th className="p-5 text-base font-black text-white bg-gradient-to-r from-red-600 to-red-500 w-1/4 rounded-t-xl shadow-inner">
                  🏆 buyusagmail.com Accounts
                </th>
                <th className="p-5 text-sm font-extrabold text-gray-700 dark:text-gray-300 w-1/4">
                  Cheap VoIP Sellers
                </th>
                <th className="p-5 text-sm font-extrabold text-gray-700 dark:text-gray-300 w-1/4">
                  Google Workspace Custom
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80 text-xs sm:text-sm">
              {(comparisonData || []).map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="p-5 font-bold text-gray-900 dark:text-white">
                    {row.feature}
                  </td>
                  <td className="p-5 font-extrabold text-gray-900 dark:text-white bg-red-500/5 dark:bg-red-500/10 border-x border-red-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{row.buyusagmail}</span>
                    </div>
                  </td>
                  <td className="p-5 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>{row.competitor}</span>
                    </div>
                  </td>
                  <td className="p-5 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>{row.workspace}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
