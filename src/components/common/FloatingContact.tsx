import React from 'react';

export const FloatingContact: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Telegram Floating Button */}
      <a
        href="https://t.me/EgSupport24"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with 24/7 Support on Telegram"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#229ED9] hover:bg-[#1d82b3] text-white rounded-full shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white dark:border-gray-900"
      >
        {/* Active Online Indicator Pulse */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-400 border-2 border-white dark:border-gray-900"></span>
        </span>

        {/* Telegram SVG Paper Plane Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-[-1px] translate-y-[1px] transition-transform group-hover:rotate-12"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.98-1.66 4.81-1.95 5.35-1.96.12 0 .38.03.55.17.14.12.18.28.2.43-.02.07-.02.21-.03.35z" />
        </svg>

        {/* Floating Tooltip Label */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-gray-800">
          Telegram Support (@EgSupport24)
        </span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/13073939979"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with 24/7 Support on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white dark:border-gray-900"
      >
        {/* Active Online Indicator Pulse */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-white dark:border-gray-900"></span>
        </span>

        {/* WhatsApp SVG Phone/Chat Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current transition-transform group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 4.992l-1.417 5.176 5.297-1.389c1.458.796 3.099 1.214 4.773 1.215h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.037-5.176-2.922-7.062a9.922 9.922 0 0 0-7.059-2.931zm5.834 14.162c-.247.692-1.222 1.267-1.688 1.348-.465.082-1.074.116-3.468-.838-3.058-1.219-5.021-4.329-5.173-4.531-.152-.203-1.236-1.648-1.236-3.143 0-1.496.782-2.233 1.06-2.532.277-.298.604-.373.805-.373.201 0 .403.002.58.01.188.008.438-.071.686.524.256.615.875 2.133.952 2.288.077.155.128.337.025.542-.102.205-.153.333-.304.512-.152.179-.319.398-.456.535-.152.152-.311.317-.134.62.177.303.787 1.298 1.687 2.101 1.157 1.031 2.132 1.35 2.434 1.503.303.153.48.128.657-.076.177-.204.758-.883.96-1.186.202-.303.404-.253.682-.152.278.101 1.764.832 2.067.984.303.152.505.228.58.354.075.126.075.731-.172 1.423z" />
        </svg>

        {/* Floating Tooltip Label */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-gray-800">
          WhatsApp Line (+1 307 393 9979)
        </span>
      </a>
    </div>
  );
};

