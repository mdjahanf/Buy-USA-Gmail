import fs from 'fs';
import path from 'path';
import { SERVICES_DATA } from '../src/data/initialData';
import { BLOG_POSTS } from '../src/data/blogData';

function generateStaticPages() {
  const distDir = path.join(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('[Static Generator Error] dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Helper to generate SEO-enhanced HTML
  function renderSeoHtml(reqPath: string, title: string, description: string, jsonLd?: any): string {
    const cleanPath = reqPath.split('?')[0].replace(/\/+$/, '') || '/';
    const canonicalUrl = `https://buyusagmail.com${cleanPath === '/' ? '' : cleanPath}`;

    const headInject = `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonicalUrl}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="msvalidate.01" content="12CD4E71991D6737FC5A31B61D6CAC25">
    <meta name="yandex-verification" content="a2e6664195d235d8">
    <meta name="google-site-verification" content="bnbb5nSxA7NOkbzAi4kgIRInJJuA_Tuw6DWEPHXCYx8">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
    `;

    let html = baseTemplate;
    if (html.includes('<title>')) {
      html = html.replace(/<title>.*?<\/title>/s, headInject);
    } else {
      html = html.replace('</head>', `${headInject}\n</head>`);
    }
    return html;
  }

  // Helper to write file safely
  function writeHtmlFile(targetPath: string, htmlContent: string) {
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetPath, htmlContent, 'utf-8');
  }

  let generatedCount = 0;

  // 1. Static Core Pages
  const staticRoutes = [
    {
      path: '/services',
      title: 'Verified Services Catalog - USA Aged & PVA Gmail Accounts | buyusagmail.com',
      desc: 'Browse our complete catalog of aged USA residential Gmail accounts, physical SIM verified PVA accounts, and local GMB review profiles.'
    },
    {
      path: '/pricing',
      title: 'Wholesale Pricing & Bulk Discount Calculator | buyusagmail.com',
      desc: 'Calculate wholesale discounts up to 60% off for USA Aged Gmail, PVA accounts, and aged Google Ads profiles.'
    },
    {
      path: '/about',
      title: 'About Us - Enterprise Email Infrastructure | buyusagmail.com',
      desc: 'Learn about buyusagmail.com, the premier wholesale marketplace for aged USA residential Gmail accounts and non-VoIP PVA profiles.'
    },
    {
      path: '/faq',
      title: 'Frequently Asked Questions (FAQ) | buyusagmail.com',
      desc: 'Find instant answers regarding proxy setup, 72-hour replacement warranty, crypto payment verification, and bulk email limits.'
    },
    {
      path: '/blog',
      title: 'SEO Blog & Growth Knowledge Hub (50+ Guides) | buyusagmail.com',
      desc: 'Explore 50+ deep-dive research studies on cold email deliverability, anti-detect browsers, residential proxies, and GMB review stickiness.'
    },
    {
      path: '/payment-methods',
      title: 'Accepted Crypto Payment Methods | buyusagmail.com',
      desc: 'Pay securely using Bitcoin (BTC), Ethereum (ETH), USDT, Solana (SOL), BNB, and Litecoin with an automatic 10% crypto checkout discount.'
    },
    {
      path: '/contact',
      title: '24/7 Support Desk & Direct Contact | buyusagmail.com',
      desc: 'Get instant 24/7 technical support via Telegram (@EgSupport24) or WhatsApp (+1 307 393 9979) for your bulk Gmail orders.'
    },
    {
      path: '/terms',
      title: 'Terms of Service & Wholesale Agreement | buyusagmail.com',
      desc: 'Review official wholesale terms of service and usage policies for buyusagmail.com aged USA and PVA accounts.'
    },
    {
      path: '/privacy',
      title: 'Privacy Policy & Data Protection | buyusagmail.com',
      desc: 'Learn how buyusagmail.com encrypts order data and maintains zero-log anonymity for cryptocurrency purchasers.'
    },
    {
      path: '/refund',
      title: '72-Hour Replacement Warranty & Refund Policy | buyusagmail.com',
      desc: 'Examine our industry-leading 72-hour replacement guarantee against initial login checkpoints and password mismatches.'
    },
    {
      path: '/dmca',
      title: 'DMCA & Copyright Compliance Policy | buyusagmail.com',
      desc: 'DMCA copyright compliance policy and notice procedures for buyusagmail.com.'
    },
    {
      path: '/disclaimer',
      title: 'Legal Disclaimer & Acceptable Usage | buyusagmail.com',
      desc: 'Legal disclaimer and terms of appropriate use for digital accounts acquired through buyusagmail.com.'
    },
    {
      path: '/sitemap',
      title: 'HTML Sitemap & Complete Directory | buyusagmail.com',
      desc: 'Complete index directory of all services, 50 SEO guides, legal policies, and tools on buyusagmail.com.'
    }
  ];

  for (const route of staticRoutes) {
    const html = renderSeoHtml(route.path, route.title, route.desc);
    writeHtmlFile(path.join(distDir, route.path.slice(1), 'index.html'), html);
    generatedCount++;
  }

  // 2. Service Pages (/services/[slug] AND /[slug])
  for (const service of SERVICES_DATA) {
    const title = service.seoTitle || `${service.name} for Sale | buyusagmail.com`;
    const desc = service.metaDescription || service.overview.slice(0, 155);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": service.name,
      "description": service.overview,
      "brand": { "@type": "Brand", "name": "buyusagmail.com" },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": service.pricing[0]?.price || 1.2,
        "highPrice": service.pricing[service.pricing.length - 1]?.price || 150,
        "offerCount": service.pricing.length,
        "availability": "https://schema.org/InStock"
      }
    };

    const html = renderSeoHtml(`/services/${service.slug}`, title, desc, jsonLd);

    // Write to /services/[slug]/index.html
    writeHtmlFile(path.join(distDir, 'services', service.slug, 'index.html'), html);
    generatedCount++;

    // Also write to /[slug]/index.html for root slug access
    writeHtmlFile(path.join(distDir, service.slug, 'index.html'), html);
    generatedCount++;
  }

  // 3. Blog Pages (/blog/[slug] AND /[slug])
  for (const post of BLOG_POSTS) {
    const title = `${post.title} | buyusagmail.com Growth Hub`;
    const desc = post.metaDescription || post.excerpt.slice(0, 160);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": { "@type": "Person", "name": post.author },
      "publisher": { "@type": "Organization", "name": "buyusagmail.com" },
      "datePublished": post.date
    };

    const html = renderSeoHtml(`/blog/${post.slug}`, title, desc, jsonLd);

    // Write to /blog/[slug]/index.html
    writeHtmlFile(path.join(distDir, 'blog', post.slug, 'index.html'), html);
    generatedCount++;
  }

  // 4. Create 404.html at root of dist/ for fallbacks
  const fallback404Html = renderSeoHtml('/404', '404 - Page Not Found | buyusagmail.com', 'The requested page could not be found.');
  fs.writeFileSync(path.join(distDir, '404.html'), fallback404Html, 'utf-8');
  generatedCount++;

  console.log(`[Static Generator Success] Pre-rendered ${generatedCount} static HTML pages in /dist`);
}

generateStaticPages();
