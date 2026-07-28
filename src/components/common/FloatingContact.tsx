import React, { useState } from 'react';
import { MessageCircle, Phone, X, Sparkles } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-500 to-blue-500 text-white p-3 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center justify-center"
        title="Open Support Channels"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick chat popup guidance */}
      {!open && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 shadow-2xl max-w-xs animate-bounce cursor-pointer flex items-center justify-between gap-3" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></div>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-100">
              Need instant account replacement or bulk rates?
            </p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setMinimized(true); }} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Expanded Actions */}
      {open && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-2xl w-72 space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                24/7 Live Support Desk
              </span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Our senior engineers respond within 3 minutes for order verification, custom geo IPs, and warranty replacements.
          </p>

          <div className="space-y-2">
            <a
              href="https://t.me/EgSupport24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-all font-bold text-xs"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <span>Telegram Support</span>
              </div>
              <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">@EgSupport24</span>
            </a>

            <a
              href="https://wa.me/13073939979"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-all font-bold text-xs"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span>WhatsApp Line</span>
              </div>
              <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">+1 (307) 393-9979</span>
            </a>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-500 via-red-600 to-blue-600 text-white shadow-2xl hover:shadow-red-500/50 flex items-center justify-center transform hover:scale-105 transition-all group relative"
        title="Live Support Chat"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse"></span>
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />}
      </button>
    </div>
  );
};
