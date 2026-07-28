import React, { useEffect } from 'react';
import { ServiceItem, BlogPost, ServiceFAQ } from '../../types';

interface SEOMetaProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  type?: 'website' | 'product' | 'article' | 'faq';
  service?: ServiceItem;
  article?: BlogPost;
  faqs?: ServiceFAQ[];
  breadcrumbs?: { name: string; url: string }[];
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title,
  description,
  canonicalUrl = 'https://buyusagmail.com',
  type = 'website',
  service,
  article,
  faqs,
  breadcrumbs
}) => {
  useEffect(() => {
    // Set document title
    document.title = title || 'buyusagmail.com - Best USA Aged Gmail Accounts for Sale';

    // Helper to update or create meta tag
    const updateMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    updateMeta('description', description);
    updateMeta('keywords', 'buy usa aged gmail accounts, pva gmail accounts, buy gmail accounts in bulk, aged gmail for google ads, aged gmail for google reviews, buyusagmail');
    updateMeta('robots', 'index, follow');

    // OpenGraph & Twitter
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:type', type === 'article' ? 'article' : 'website', true);
    updateMeta('og:site_name', 'buyusagmail.com Marketplace', true);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Build JSON-LD Schema
    const schemas: any[] = [];

    // 1. Organization / Website Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'buyusagmail.com',
      'url': 'https://buyusagmail.com',
      'logo': 'https://buyusagmail.com/logo.png',
      'description': 'Best USA Aged Gmail Accounts for Sale. Verified residential IPs, phone verified (PVA) accounts for automation and marketing.',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-307-393-9979',
        'contactType': 'customer service',
        'availableLanguage': ['English', 'Spanish', 'German', 'Russian']
      }
    });

    // 2. Product Schema (if Service landing page)
    if (service) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': service.name,
        'description': service.metaDescription,
        'brand': { '@type': 'Brand', 'name': 'buyusagmail.com' },
        'sku': `BG-SKU-${service.slug.toUpperCase()}`,
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'USD',
          'lowPrice': service.pricing[0]?.price || 5,
          'highPrice': service.pricing[service.pricing.length - 1]?.price || 220,
          'offerCount': service.pricing.length,
          'availability': 'https://schema.org/InStock',
          'seller': { '@type': 'Organization', 'name': 'buyusagmail.com' }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': service.rating || 4.98,
          'reviewCount': service.reviewsCount || 1420
        }
      });
    }

    // 3. Article Schema (if Blog post)
    if (article) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': article.title,
        'description': article.metaDescription,
        'author': { '@type': 'Person', 'name': article.author },
        'datePublished': article.date,
        'dateModified': article.date,
        'publisher': { '@type': 'Organization', 'name': 'buyusagmail.com' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': canonicalUrl }
      });
    }

    // 4. FAQ Schema
    const faqList = faqs || (service ? service?.faqs : article ? article?.faqs : null);
    if (Array.isArray(faqList) && faqList.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': (faqList || []).map(f => ({
          '@type': 'Question',
          'name': f?.q || '',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f?.a || ''
          }
        }))
      });
    }

    // 5. Breadcrumb Schema
    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': (breadcrumbs || []).map((b, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': b?.name || '',
          'item': b?.url || ''
        }))
      });
    }

    // Remove existing script tags with class seo-json-ld
    document.querySelectorAll('script.seo-json-ld').forEach(s => s.remove());

    // Inject new scripts
    schemas.forEach(schemaObj => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.className = 'seo-json-ld';
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

  }, [title, description, canonicalUrl, type, service, article, faqs, breadcrumbs]);

  return null;
};
