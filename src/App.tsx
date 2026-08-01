/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OrderModal } from './components/order/OrderModal';
import { FloatingContact } from './components/common/FloatingContact';
import { HomePage } from './pages/HomePage';
import { SERVICES_DATA, CRYPTO_WALLETS } from './data/initialData';
import { BLOG_POSTS } from './data/blogData';
import { PageRoute, ServiceItem, BlogPost } from './types';

// Code Split non-home pages for ultra-fast initial page loads (< 120KB chunk)
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const PaymentMethodsPage = lazy(() => import('./pages/PaymentMethodsPage').then(m => ({ default: m.PaymentMethodsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const TermsPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.PrivacyPage })));
const RefundPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.RefundPage })));
const DMCAPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.DMCAPage })));
const DisclaimerPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.DisclaimerPage })));
const SitemapPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.SitemapPage })));
const NotFoundPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.NotFoundPage })));

// Lightweight page loading fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
    <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Loading buyusagmail.com Verified Content...</p>
  </div>
);

function parseUrlPath(pathname: string): { route: PageRoute; slug: string | null } {
  const cleanPath = (pathname || '/').split('?')[0].split('#')[0].replace(/\/$/, '') || '/';

  if (cleanPath === '/' || cleanPath === '') {
    return { route: 'home', slug: null };
  }
  if (cleanPath === '/services') {
    return { route: 'services', slug: null };
  }
  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    return { route: 'service-detail', slug };
  }
  if (cleanPath === '/pricing' || cleanPath === '/order') {
    return { route: 'pricing', slug: null };
  }
  if (cleanPath === '/about') {
    return { route: 'about', slug: null };
  }
  if (cleanPath === '/faq' || cleanPath === '/faqs') {
    return { route: 'faq', slug: null };
  }
  if (cleanPath === '/blog') {
    return { route: 'blog', slug: null };
  }
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    return { route: 'blog-post', slug };
  }
  if (cleanPath === '/payment-methods') {
    return { route: 'payment-methods', slug: null };
  }
  if (cleanPath === '/contact') {
    return { route: 'contact', slug: null };
  }
  if (cleanPath === '/terms') {
    return { route: 'terms', slug: null };
  }
  if (cleanPath === '/privacy') {
    return { route: 'privacy', slug: null };
  }
  if (cleanPath === '/refund' || cleanPath === '/refund-policy') {
    return { route: 'refund', slug: null };
  }
  if (cleanPath === '/dmca') {
    return { route: 'dmca', slug: null };
  }
  if (cleanPath === '/disclaimer') {
    return { route: 'disclaimer', slug: null };
  }
  if (cleanPath === '/sitemap' || cleanPath === '/sitemap.html') {
    return { route: 'sitemap', slug: null };
  }

  // Direct slug matches
  const rawSlug = cleanPath.replace(/^\//, '');
  const foundService = SERVICES_DATA.find(s => s.slug === rawSlug);
  if (foundService) return { route: 'service-detail', slug: foundService.slug };

  const foundBlog = BLOG_POSTS.find(b => b.slug === rawSlug);
  if (foundBlog) return { route: 'blog-post', slug: foundBlog.slug };

  return { route: '404' as PageRoute, slug: null };
}

function routeToUrlPath(route: PageRoute, slug?: string | null): string {
  switch (route) {
    case 'home':
      return '/';
    case 'services':
      return '/services';
    case 'service-detail':
      return slug ? `/services/${slug}` : '/services';
    case 'pricing':
    case 'order':
      return '/pricing';
    case 'about':
      return '/about';
    case 'faq':
    case 'faqs':
      return '/faq';
    case 'blog':
      return '/blog';
    case 'blog-post':
    case 'blog-detail':
      return slug ? `/blog/${slug}` : '/blog';
    case 'payment-methods':
      return '/payment-methods';
    case 'contact':
      return '/contact';
    case 'terms':
      return '/terms';
    case 'privacy':
      return '/privacy';
    case 'refund':
      return '/refund';
    case 'dmca':
      return '/dmca';
    case 'disclaimer':
      return '/disclaimer';
    case 'sitemap':
      return '/sitemap';
    default:
      return '/404';
  }
}

export default function App() {
  const initialRouteInfo = parseUrlPath(window.location.pathname);
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(initialRouteInfo.route);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(
    initialRouteInfo.route === 'service-detail' ? initialRouteInfo.slug : null
  );
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(
    initialRouteInfo.route === 'blog-post' ? initialRouteInfo.slug : null
  );
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [orderServiceId, setOrderServiceId] = useState<string | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(20);

  // Sync state on browser back/forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const routeInfo = parseUrlPath(window.location.pathname);
      setCurrentRoute(routeInfo.route);
      if (routeInfo.route === 'service-detail') {
        setSelectedServiceSlug(routeInfo.slug);
      } else {
        setSelectedServiceSlug(null);
      }
      if (routeInfo.route === 'blog-post') {
        setSelectedBlogSlug(routeInfo.slug);
      } else {
        setSelectedBlogSlug(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, selectedServiceSlug, selectedBlogSlug]);

  // Sync dark mode class on html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle navigation with real URL path updates
  const handleNavigate = (route: PageRoute, slug?: string) => {
    const targetPath = routeToUrlPath(route, slug);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }

    setCurrentRoute(route);
    if (route === 'services') setSelectedServiceSlug(null);
    if (route === 'blog') setSelectedBlogSlug(null);
    if (slug) {
      if (route === 'service-detail') setSelectedServiceSlug(slug);
      if (route === 'blog-post' || route === 'blog-detail') setSelectedBlogSlug(slug);
    }
  };

  // Open order modal
  const handleOpenOrderModal = (serviceId: string | null = null, qty: number = 20) => {
    setOrderServiceId(serviceId || SERVICES_DATA[0].id);
    setOrderQuantity(qty);
    setOrderModalOpen(true);
  };

  // Find active items for detail views
  const activeService = SERVICES_DATA.find(s => s.slug === selectedServiceSlug) || SERVICES_DATA[0];
  const activeBlogPost = BLOG_POSTS.find(b => b.slug === selectedBlogSlug) || BLOG_POSTS[0];

  const renderPageContent = () => {
    switch (currentRoute) {
      case 'home':
        return (
          <HomePage
            services={SERVICES_DATA}
            onNavigate={handleNavigate}
            onOpenOrder={handleOpenOrderModal}
          />
        );
      case 'services':
        return (
          <ServicesPage
            services={SERVICES_DATA}
            onNavigate={handleNavigate}
            onOpenOrder={handleOpenOrderModal}
            darkMode={darkMode}
          />
        );
      case 'service-detail':
        return (
          <ServiceDetailPage
            service={activeService}
            allServices={SERVICES_DATA}
            onBack={() => handleNavigate('services')}
            onSelectService={(slug) => handleNavigate('service-detail', slug)}
            onOpenOrder={handleOpenOrderModal}
            darkMode={darkMode}
          />
        );
      case 'pricing':
      case 'order':
        return (
          <PricingPage
            services={SERVICES_DATA}
            onOpenOrder={handleOpenOrderModal}
            darkMode={darkMode}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'faq':
      case 'faqs':
        return <FAQPage />;
      case 'blog':
        return (
          <BlogPage
            posts={BLOG_POSTS}
            onSelectPost={(slug) => handleNavigate('blog-post', slug)}
            onNavigate={handleNavigate}
            darkMode={darkMode}
          />
        );
      case 'blog-post':
      case 'blog-detail':
        return (
          <BlogPostPage
            post={activeBlogPost}
            allPosts={BLOG_POSTS}
            onBack={() => handleNavigate('blog')}
            onSelectPost={(slug) => handleNavigate('blog-post', slug)}
            onOpenOrder={() => handleOpenOrderModal(null, 20)}
            darkMode={darkMode}
          />
        );
      case 'payment-methods':
        return (
          <PaymentMethodsPage
            wallets={CRYPTO_WALLETS}
            onOpenOrder={() => handleOpenOrderModal(null, 20)}
            darkMode={darkMode}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'terms':
        return <TermsPage onBack={() => handleNavigate('home')} />;
      case 'privacy':
        return <PrivacyPage onBack={() => handleNavigate('home')} />;
      case 'refund':
        return <RefundPage onBack={() => handleNavigate('home')} />;
      case 'dmca':
        return <DMCAPage onBack={() => handleNavigate('home')} />;
      case 'disclaimer':
        return <DisclaimerPage onBack={() => handleNavigate('home')} />;
      case 'sitemap':
        return <SitemapPage onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
      default:
        return <NotFoundPage onBack={() => handleNavigate('home')} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#FFFFFF] font-sans text-[#202124] ${darkMode ? 'dark bg-gray-950 text-white' : ''}`}>
      {/* High Density Layout Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        services={SERVICES_DATA}
        onOpenOrder={(id) => handleOpenOrderModal(id, 20)}
        darkMode={darkMode}
      />

      {/* Main Container */}
      <main className="flex-grow w-full">
        <Suspense fallback={<PageLoader />}>
          {renderPageContent()}
        </Suspense>
      </main>

      {/* High Density Layout Footer */}
      <Footer
        onNavigate={handleNavigate}
        services={SERVICES_DATA}
        darkMode={darkMode}
      />

      {/* Floating Chat Buttons (Telegram & WhatsApp bottom right) */}
      <FloatingContact />

      {/* Order Modal */}
      {orderModalOpen && (
        <OrderModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          services={SERVICES_DATA}
          wallets={CRYPTO_WALLETS}
          initialServiceId={orderServiceId}
          initialQuantity={orderQuantity}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

