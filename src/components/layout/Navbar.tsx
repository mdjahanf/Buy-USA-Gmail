import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  Star, 
  TrendingUp, 
  Zap, 
  ChevronDown, 
  Menu, 
  X, 
  ShoppingBag,
  MessageCircle,
  Send
} from 'lucide-react';
import { PageRoute, ServiceItem } from '../../types';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, slug?: string) => void;
  services: ServiceItem[];
  onOpenOrder: (serviceId?: string) => void;
  darkMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  services,
  onOpenOrder,
  darkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-red-500" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-blue-500" />;
      case 'Globe': return <Globe className="w-5 h-5 text-green-500" />;
      case 'Star': return <Star className="w-5 h-5 text-yellow-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-purple-500" />;
      default: return <Zap className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? darkMode
            ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-lg'
            : 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : darkMode
            ? 'bg-gray-900 border-b border-gray-800/50'
            : 'bg-white border-b border-gray-100'
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-blue-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span>⚡ Instant Automated Delivery Available 24/7 • <strong>10% Crypto Discount</strong> Applied Automatically!</span>
        <button 
          onClick={() => onOpenOrder('usa-gmail')} 
          className="ml-2 underline font-bold hover:text-yellow-200 transition-colors hidden sm:inline"
        >
          Order Now &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 cursor-pointer" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md shadow-red-500/20 text-white font-black text-xl tracking-tighter">
              BG
            </div>
            <div>
              <span className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                buyusa<span className="text-red-500">gmail.com</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-wider uppercase text-gray-400 -mt-1">
                Aged USA Accounts
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'home' 
                  ? darkMode ? 'text-red-400 bg-gray-800' : 'text-red-600 bg-red-50' 
                  : darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <a
                href="/services"
                onClick={(e) => { e.preventDefault(); onNavigate('services'); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  currentRoute === 'services' || currentRoute === 'service-detail'
                    ? darkMode ? 'text-red-400 bg-gray-800' : 'text-red-600 bg-red-50'
                    : darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </a>

              {/* Mega Dropdown */}
              {servicesDropdownOpen && (
                <div className={`absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}>
                  <div className={`p-3 rounded-2xl shadow-2xl border ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-100 text-gray-900'} space-y-1`}>
                    <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      SEO Verified Landing Pages
                    </div>
                    {(services || []).map(service => (
                      <a
                        key={service.id}
                        href={`/services/${service.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('service-detail', service.slug);
                          setServicesDropdownOpen(false);
                        }}
                        className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                          darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-red-50'}`}>
                          {getServiceIcon(service.iconName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold truncate">{service.name}</h4>
                            <span className="text-[10px] bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 font-bold px-1.5 py-0.5 rounded">
                              ${service.pricing[0]?.price}
                            </span>
                          </div>
                          <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {service.badge}
                          </p>
                        </div>
                      </a>
                    ))}
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-800 mt-2">
                      <a
                        href="/services"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('services');
                          setServicesDropdownOpen(false);
                        }}
                        className="block w-full text-center text-xs font-bold text-red-500 hover:text-red-600 py-1"
                      >
                        View All Services Catalog &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/pricing"
              onClick={(e) => { e.preventDefault(); onNavigate('pricing'); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'pricing'
                  ? darkMode ? 'text-red-400 bg-gray-800' : 'text-red-600 bg-red-50'
                  : darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Pricing
            </a>

            <a
              href="/about"
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'about'
                  ? darkMode ? 'text-red-400 bg-gray-800' : 'text-red-600 bg-red-50'
                  : darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              About Us
            </a>

            <a
              href="/blog"
              onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'blog' || currentRoute === 'blog-detail'
                  ? darkMode ? 'text-red-400 bg-gray-800' : 'text-red-600 bg-red-50'
                  : darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Blog (50+ Guides)
            </a>

            <a
              href="/faq"
              onClick={(e) => { e.preventDefault(); onNavigate('faqs'); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'faqs'
                  ? darkMode ? 'text-red-400 bg-gray-800' : 'text-red-600 bg-red-50'
                  : darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              FAQ
            </a>

            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'contact'
                  ? darkMode ? 'text-red-400 bg-gray-800' : 'text-red-600 bg-red-50'
                  : darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Contact
            </a>
          </nav>

            {/* Right actions: Order Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Order Now Button */}
              <button
                onClick={() => onOpenOrder()}
                aria-label="Order Aged USA Gmail Accounts Now"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-4 py-2 rounded-xl shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/35 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm min-h-[44px]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Order Accounts</span>
                <span className="sm:hidden">Order</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
                className={`p-2.5 rounded-xl md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-2 pb-6 space-y-2 ${darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate('home'); setMobileMenuOpen(false); }}
            className={`block w-full text-left px-3 py-2 rounded-lg font-medium text-sm ${currentRoute === 'home' ? 'bg-red-500/10 text-red-500 font-bold' : ''}`}
          >
            Home
          </a>
          
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Services</div>
            {(services || []).map(s => (
              <a
                key={s.id}
                href={`/services/${s.slug}`}
                onClick={(e) => { e.preventDefault(); onNavigate('service-detail', s.slug); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-1.5 rounded-lg text-sm flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>{s.name}</span>
                <span className="text-xs text-red-500 font-semibold">${s?.pricing?.[0]?.price || 0}</span>
              </a>
            ))}
          </div>

          <a
            href="/pricing"
            onClick={(e) => { e.preventDefault(); onNavigate('pricing'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg font-medium text-sm"
          >
            Pricing Calculator
          </a>
          <a
            href="/about"
            onClick={(e) => { e.preventDefault(); onNavigate('about'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg font-medium text-sm"
          >
            About Us
          </a>
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); onNavigate('blog'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg font-medium text-sm"
          >
            SEO Blog (50+ Guides)
          </a>
          <a
            href="/faq"
            onClick={(e) => { e.preventDefault(); onNavigate('faqs'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg font-medium text-sm"
          >
            Frequently Asked Questions
          </a>
          <a
            href="/payment-methods"
            onClick={(e) => { e.preventDefault(); onNavigate('payment-methods'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg font-medium text-sm"
          >
            Crypto Payment Wallets
          </a>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); onNavigate('contact'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg font-medium text-sm"
          >
            Contact & Support
          </a>
        </div>
      )}
    </header>
  );
};
