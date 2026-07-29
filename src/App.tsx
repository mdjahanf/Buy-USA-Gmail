/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OrderModal } from './components/order/OrderModal';
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

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [orderServiceId, setOrderServiceId] = useState<string | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(20);

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

  // Handle navigation
  const handleNavigate = (route: PageRoute, slug?: string) => {
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

