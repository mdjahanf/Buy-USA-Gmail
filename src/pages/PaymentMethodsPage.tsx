import React, { useState } from 'react';
import { Copy, Check, QrCode, ShieldCheck, AlertTriangle, Zap, ArrowRight, ShoppingBag } from 'lucide-react';
import { CryptoWallet } from '../types';
import { SEOMeta } from '../components/common/SEOMeta';

interface PaymentMethodsPageProps {
  wallets: CryptoWallet[];
  onOpenOrder: () => void;
  darkMode: boolean;
}

export const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ wallets, onOpenOrder, darkMode }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      <SEOMeta
        title="Verified Crypto Payment Protocols | buyusagmail.com Blockchain Gateway"
        description="Pay securely with USDT TRC20, Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Binance Coin (BNB). Enjoy an automatic 10% discount and instant spreadsheet dispatch."
        canonicalUrl="https://buyusagmail.com/payment"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Secure Blockchain Gateway
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Accepted Cryptocurrency Protocols
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Enjoy zero chargeback disputes, total anonymity, and an <strong className="text-green-500 font-bold">automatic 10% crypto discount</strong> on every order. Our automated node verifies transactions within 180 seconds.
        </p>
      </div>

      {/* Security Banner */}
      <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 flex items-start gap-4">
        <AlertTriangle className="w-8 h-8 flex-shrink-0 text-amber-500 mt-1" />
        <div className="space-y-1 text-xs sm:text-sm">
          <h4 className="font-bold text-base text-gray-900 dark:text-white">CRITICAL BLOCKCHAIN SAFETY RULE:</h4>
          <p>
            Always verify that the receiving network exactly matches the network specified on your exchange withdrawal screen (e.g. sending USDT via the <strong>TRC20</strong> network). Sending tokens to mismatched chains cannot be recovered by our team.
          </p>
        </div>
      </div>

      {/* 12 Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(wallets || []).map(w => {
          const isCopied = copiedId === w.id;
          return (
            <div
              key={w.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                w.id === 'usdt-trc20'
                  ? 'border-red-500 bg-red-500/5 dark:bg-red-500/10 shadow-xl relative'
                  : darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              {w.id === 'usdt-trc20' && (
                <span className="absolute -top-3 right-6 bg-red-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  ★ Most Popular & Lowest Gas
                </span>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-black text-lg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                      {w.symbol}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight">
                        {w.name}
                      </h3>
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        Network: <strong className="text-red-500">{w.network}</strong>
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded border border-green-500/20">
                    {w.badge}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      Deposit Address ({w.network})
                    </span>
                    <code className="text-xs font-mono break-all font-bold text-gray-800 dark:text-gray-200 block select-all">
                      {w.address}
                    </code>
                  </div>
                  <div className="w-16 h-16 bg-white p-1 rounded-xl border flex-shrink-0 flex items-center justify-center shadow-sm" title="Scan with Crypto Wallet App">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(w.address)}`} 
                      alt={`${w.symbol} QR Scanner`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <QrCode className="w-4 h-4 text-red-500" />
                  <span>Live QR Scanner Active</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(w.id, w.address)}
                  className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied Address!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Crypto Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center font-bold mb-3">⚡</div>
          <h4 className="text-base font-bold text-gray-900 dark:text-white">Instant Automated Dispatch</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
            Our automated webhook listener detects 1 block confirmation on TRC20 and BEP20 networks, dispatching your account CSV within 180 seconds.
          </p>
        </div>

        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold mb-3">🔒</div>
          <h4 className="text-base font-bold text-gray-900 dark:text-white">Zero Chargeback Locks</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
            Unlike credit card sellers who freeze accounts upon merchant chargeback inquiries, cryptocurrency payments ensure 100% permanent administrative ownership.
          </p>
        </div>

        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold mb-3">💬</div>
          <h4 className="text-base font-bold text-gray-900 dark:text-white">Need Wire Transfer or Escrow?</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
            For institutional orders exceeding $2,500, we accept escrow payments and custom USDT invoicing via our dedicated Telegram support desk.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onOpenOrder}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black text-base shadow-xl shadow-red-500/25 inline-flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Launch Order Portal & Select Crypto Protocol</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
