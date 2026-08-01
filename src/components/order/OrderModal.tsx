import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  QrCode, 
  Upload, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Mail, 
  Smartphone, 
  Globe, 
  Sparkles,
  AlertTriangle,
  Download,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ServiceItem, CryptoWallet, Order } from '../../types';
import { sendClientSideOrderEmails } from '../../utils/emailService';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  wallets: CryptoWallet[];
  initialServiceId?: string;
  initialQuantity?: number;
  darkMode: boolean;
  onOrderCompleted?: (order: Order) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  services,
  wallets,
  initialServiceId,
  initialQuantity,
  darkMode,
  onOrderCompleted
}) => {
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || services[0].id);
  const [selectedQty, setSelectedQty] = useState(initialQuantity || services[0].pricing[2]?.quantity || 20);
  
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('United States');
  const [notes, setNotes] = useState('');
  
  // Payment fields
  const [selectedWalletId, setSelectedWalletId] = useState('usdt-trc20');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      const s = (services || []).find(srv => srv.id === initialServiceId);
      if (s && initialQuantity) {
        setSelectedQty(initialQuantity);
      } else if (s && (s.pricing || []).length > 0) {
        setSelectedQty(s.pricing[Math.min(2, s.pricing.length - 1)].quantity);
      }
    }
  }, [initialServiceId, initialQuantity, services]);

  if (!isOpen) return null;

  const currentService = (services || []).find(s => s.id === selectedServiceId) || (services || [])[0] || { id: 'default', name: 'Service', slug: '', title: 'Service', subtitle: 'Service', seoTitle: '', metaDescription: '', badge: '', iconName: 'ShieldCheck', overview: '', description: '', shortDesc: '', features: [], benefits: [], faqs: [], relatedSlugs: [], pricing: [{ quantity: 20, price: 55 }], rating: 5, reviewsCount: 100 } as any;
  const currentTier = (currentService.pricing || []).find(p => p.quantity === selectedQty) || (currentService.pricing || [])[0] || { quantity: 20, price: 55 };
  const currentWallet = (wallets || []).find(w => w.id === selectedWalletId) || (wallets || [])[0] || { id: 'btc', name: 'Bitcoin', symbol: 'BTC', network: 'Bitcoin Native Network', address: '', iconColor: '#F7931A', badge: 'Popular' };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fakeUrl = URL.createObjectURL(file);
      setScreenshotUrl(fakeUrl);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      alert('Please enter your crypto Transaction ID / Hash');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        customerName: customerName || 'Valued Customer',
        email: email || 'customer@example.com',
        telegram: telegram || 'Not Provided',
        whatsapp: whatsapp || 'Not Provided',
        country: country || 'United States',
        serviceId: currentService.id,
        serviceName: currentService.name,
        packageQuantity: currentTier.quantity,
        packagePrice: currentTier.price,
        totalAmount: currentTier.price,
        paymentMethod: currentWallet.name,
        transactionId: transactionId,
        customerNotes: notes || 'No special notes',
        screenshotUrl: screenshotUrl || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80'
      };

      let orderToComplete = null;
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.order) {
            orderToComplete = data.order;
          }
        }
      } catch (e) {
        console.log('Backend API unreachable (static hosting mode). Executing in standalone client mode.');
      }

      // Standalone fallback for static SPA hosting if backend API is unavailable
      if (!orderToComplete) {
        orderToComplete = {
          id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'pending' as any,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19),
          createdAt: new Date().toISOString(),
          ...payload
        };
        // Trigger client-side email dispatch for static GitHub Pages hosting
        await sendClientSideOrderEmails(orderToComplete);
      } else {
        // Also fire client-side notification for redundancy
        sendClientSideOrderEmails(orderToComplete).catch(console.error);
      }

      setCompletedOrder(orderToComplete);
      setStep(5);
      if (onOrderCompleted) onOrderCompleted(orderToComplete);
      
      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EA4335', '#4285F4', '#34A853', '#FBBC05']
        });
      } catch (e) {
        console.log('Confetti error:', e);
      }
    } catch (err) {
      console.error('Order submission failed:', err);
      alert('Order submission failed. Please check your network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`relative w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border max-h-[92vh] flex flex-col ${
        darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-100 text-gray-900'
      }`}>
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-5 sm:p-6 text-white flex items-center justify-between border-b border-gray-800 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center font-black text-lg shadow-md shadow-red-500/30">
              BG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight">buyusagmail.com Order Portal</h3>
                <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full border border-green-500/30">
                  🔒 SSL Verified
                </span>
              </div>
              <p className="text-gray-400 text-xs">Automated verification & instant recovery file delivery</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="bg-gray-100 dark:bg-gray-950 px-6 py-3 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              {[
                { s: 1, label: '1. Package' },
                { s: 2, label: '2. Contact' },
                { s: 3, label: '3. Payment' },
                { s: 4, label: '4. Verify' }
              ].map(st => (
                <div key={st.s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === st.s
                      ? 'bg-red-500 text-white shadow-md shadow-red-500/30 scale-110'
                      : step > st.s
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>
                    {step > st.s ? <Check className="w-3.5 h-3.5" /> : st.s}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:inline ${
                    step === st.s ? 'text-red-500 font-bold' : step > st.s ? 'text-green-500' : 'text-gray-400'
                  }`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: SELECT SERVICE & TIER */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Select Verified Service Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(services || []).map(srv => (
                    <div
                      key={srv.id}
                      onClick={() => {
                        setSelectedServiceId(srv.id);
                        setSelectedQty((srv.pricing || [])[Math.min(2, (srv.pricing || []).length - 1)]?.quantity || 20);
                      }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        selectedServiceId === srv.id
                          ? 'border-red-500 bg-red-500/5 dark:bg-red-500/10 shadow-md'
                          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold truncate">{srv.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{srv.badge}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-black text-red-500">From ${srv.pricing[0]?.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                    Select Quantity Tier ({currentService.name})
                  </label>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                    ⚡ 10% Crypto Discount Included
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {(currentService.pricing || []).map(tier => (
                    <div
                      key={tier.quantity}
                      onClick={() => setSelectedQty(tier.quantity)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer text-center relative transition-all ${
                        selectedQty === tier.quantity
                          ? 'border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/30 transform scale-105'
                          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                          Popular
                        </span>
                      )}
                      <span className="block text-base font-black mt-1">{tier.quantity}x</span>
                      <span className={`block text-xs font-extrabold ${selectedQty === tier.quantity ? 'text-white' : 'text-red-500'}`}>
                        ${tier.price}
                      </span>
                      {tier.save && (
                        <span className={`block text-[10px] mt-0.5 ${selectedQty === tier.quantity ? 'text-red-100' : 'text-gray-400'}`}>
                          {tier.save}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Selected Package:</span>
                  <span className="text-sm font-bold">{currentService.name} ({currentTier.quantity} Accounts)</span>
                  <span className="text-xs text-gray-400 block mt-0.5">Estimated Unit Cost: ${(currentTier.price / currentTier.quantity).toFixed(2)}/account</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Total Due:</span>
                  <span className="text-2xl font-black text-red-500">${currentTier.price} USD</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center gap-2 text-sm transition-all transform hover:-translate-y-0.5"
                >
                  <span>Continue to Contact Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CUSTOMER DETAILS */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Your contact details are strictly used for instant recovery spreadsheet delivery and order notifications.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="order-customer-name" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Full Name *</label>
                  <input
                    id="order-customer-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Alexander Vance"
                    className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="order-customer-email" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Email Address * (For Delivery)</label>
                  <input
                    id="order-customer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@scaleagency.io"
                    className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="order-telegram" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Telegram Username (Optional)</label>
                  <input
                    id="order-telegram"
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="e.g. @vance_scale (Optional)"
                    className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="order-whatsapp" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">WhatsApp Number (Optional)</label>
                  <input
                    id="order-whatsapp"
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. +1 (415) 892-3341 (Optional)"
                    className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="order-country" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Country / Jurisdiction</label>
                  <select
                    id="order-country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                    <option value="France">France</option>
                    <option value="Australia">Australia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="Other / Global">Other / Global</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="order-notes" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Order Notes / Custom Requests (Optional)</label>
                  <input
                    id="order-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Need NY or TX state IP profiles only"
                    className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!customerName || !email) {
                      alert('Please fill in your Name and Email address.');
                      return;
                    }
                    setStep(3);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center gap-2 text-sm"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SELECT PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Select Crypto Wallet Protocol
                </span>
                <span className="text-xs text-red-500 font-bold">
                  Total Due: ${currentTier.price} USD
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(wallets || []).map(w => (
                  <div
                    key={w.id}
                    onClick={() => setSelectedWalletId(w.id)}
                    className={`p-3 rounded-xl border-2 cursor-pointer text-center transition-all ${
                      selectedWalletId === w.id
                        ? 'border-red-500 bg-red-500/10 shadow-md font-bold'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <span className="block text-sm font-black">{w.symbol}</span>
                    <span className="block text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{w.name.split('(')[0]}</span>
                  </div>
                ))}
              </div>

              {/* Selected Wallet Details Box */}
              <div className="p-5 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/5 via-blue-500/5 to-transparent space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-black flex items-center gap-2">
                      <span>{currentWallet.name}</span>
                      <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                        {currentWallet.badge}
                      </span>
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Network: <strong className="text-gray-800 dark:text-gray-200">{currentWallet.network}</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Amount to Send:</span>
                    <span className="text-xl font-black text-red-500">
                      ${currentTier.price} USD equivalent
                    </span>
                  </div>
                </div>

                {/* Address Box */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Official buyusagmail.com {currentWallet.symbol} Deposit Address:
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-3 rounded-xl bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 text-xs sm:text-sm font-mono break-all text-gray-900 dark:text-white font-bold select-all">
                      {currentWallet.address}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopy(currentWallet.address)}
                      className={`p-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all flex-shrink-0 ${
                        copied 
                          ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
                          : 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/25'
                      }`}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Live QR Code Scanner & Warning */}
                <div className="flex flex-col sm:flex-row items-center gap-5 pt-3 border-t border-gray-200/50 dark:border-gray-800/50">
                  <div className="w-36 h-36 bg-white p-3 rounded-2xl border-2 border-gray-200 shadow-md flex flex-col items-center justify-center text-center flex-shrink-0">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentWallet.address)}`} 
                      alt={`${currentWallet.symbol} Payment QR Code`}
                      className="w-28 h-28 object-contain"
                    />
                    <span className="text-[9px] font-black mt-1 uppercase tracking-tight text-gray-900">Scan to Deposit</span>
                  </div>
                  <div className="flex-1 text-xs text-gray-600 dark:text-gray-400 space-y-2">
                    <p className="flex items-center gap-1.5 font-bold text-amber-500 text-sm">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>LIVE SCANNER READY:</span>
                    </p>
                    <p className="leading-relaxed">
                      Point your crypto wallet app camera (Binance, Trust Wallet, MetaMask, Coinbase) at this QR code to automatically scan and deposit <strong className="text-gray-900 dark:text-white">{currentWallet.symbol}</strong> via <strong className="text-gray-900 dark:text-white">{currentWallet.network}</strong>.
                    </p>
                    <p className="text-[11px] text-red-500 font-semibold">
                      ⚠ Always verify the first 4 and last 4 characters of the scanned address before sending funds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/25 flex items-center gap-2 text-sm"
                >
                  <span>I Have Sent Payment &rarr; Upload Hash</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: TRANSACTION VERIFICATION & SCREENSHOT */}
          {step === 4 && (
            <form onSubmit={handleSubmitOrder} className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Almost done! Submit your Transaction ID / Hash for automated verification.</p>
                  <p className="mt-0.5 text-gray-500 dark:text-gray-400">Our blockchain gateway checks incoming hashes every 60 seconds. Once confirmed, your spreadsheet will be emailed automatically.</p>
                </div>
              </div>

              <div>
                <label htmlFor="order-txid" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Crypto Transaction Hash / TxID * (Required)
                </label>
                <input
                  id="order-txid"
                  type="text"
                  required
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g. 0x89f4b32a9c118e27a6d8924b1088c4b11f32a79c or TFshfiXsqxNxeTa..."
                  className={`w-full p-3.5 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Upload Payment Screenshot (Optional for Faster Verification)
                </label>
                <div className={`p-6 rounded-2xl border-2 border-dashed text-center transition-all ${
                  screenshotUrl ? 'border-green-500 bg-green-500/5' : 'border-gray-300 dark:border-gray-700 hover:border-red-500'
                }`}>
                  {screenshotUrl ? (
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                      <span className="text-xs font-bold text-green-500">Screenshot Attached Successfully!</span>
                      <img src={screenshotUrl} alt="Payment Proof" className="max-h-24 rounded-lg shadow mt-1" />
                      <button
                        type="button"
                        onClick={() => setScreenshotUrl('')}
                        className="text-[11px] text-red-500 hover:underline font-bold mt-1"
                      >
                        Remove & Upload Different
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-red-500 hover:underline">Click to upload image</span>
                        <span className="text-xs text-gray-500 block mt-0.5">PNG, JPG, or GIF up to 5MB</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSimulatedUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Order Summary:</span>
                  <span>{currentTier.quantity}x {currentService.name}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Payment Protocol:</span>
                  <span>{currentWallet.name} ({currentWallet.network})</span>
                </div>
                <div className="flex justify-between font-black text-red-500 text-sm pt-1 border-t border-gray-200 dark:border-gray-800">
                  <span>Total Paid:</span>
                  <span>${currentTier.price} USD</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-black rounded-xl shadow-lg shadow-green-500/30 flex items-center gap-2 text-sm transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Verifying On-Chain...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Submit Order & Get Accounts</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: INSTANT SUCCESS & INVOICE PAGE */}
          {step === 5 && completedOrder && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300 py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 text-green-500 flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                  ⚡ Order Submitted Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
                  Thank You, {completedOrder.customerName}!
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Your Unique Order ID is: <strong className="text-red-500 font-mono text-base">{completedOrder.id}</strong>
                </p>
              </div>

              {/* Email Notification feedback badge */}
              <div className="max-w-md mx-auto p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>Confirmation sent to <strong>{completedOrder.email}</strong> and admin desk (<strong>smmbuy2022@gmail.com</strong>).</span>
              </div>

              {/* Printable Invoice Summary */}
              <div className={`text-left p-6 rounded-2xl border max-w-lg mx-auto space-y-3 text-xs ${
                darkMode ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                  <span className="font-bold text-sm">buyusagmail.com Official Invoice</span>
                  <span className="text-gray-400">{completedOrder.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-400 block">Service Item:</span>
                    <strong className="text-sm">{completedOrder.serviceName}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block">Quantity:</span>
                    <strong className="text-sm">{completedOrder.packageQuantity} Accounts</strong>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-400 block">Payment Protocol:</span>
                    <span>{completedOrder.paymentMethod}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block">Transaction ID:</span>
                    <span className="font-mono text-[10px] truncate max-w-[150px] inline-block">{completedOrder.transactionId}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-400 block">Telegram Support:</span>
                    <span>{completedOrder.telegram}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block">Order Status:</span>
                    <span className="text-yellow-500 font-bold bg-yellow-500/10 px-1.5 py-0.5 rounded">{completedOrder.status} (Verifying Hash)</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-sm font-black">
                  <span>Total Amount Paid:</span>
                  <span className="text-red-500 text-lg">${completedOrder.totalAmount} USD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintInvoice}
                  className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all w-full sm:w-auto"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice / Save PDF</span>
                </button>

                <a
                  href="https://t.me/EgSupport24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all w-full sm:w-auto"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Expedite via Telegram (@EgSupport24)</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-xs shadow-lg shadow-red-500/25 transition-all w-full sm:w-auto"
                >
                  Return to Store &rarr;
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
