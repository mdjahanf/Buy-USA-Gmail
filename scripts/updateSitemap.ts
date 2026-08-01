import fs from 'fs';
import path from 'path';
import { SERVICES_DATA } from '../src/data/initialData';
import { BLOG_POSTS } from '../src/data/blogData';

function buildSitemap() {
  const baseUrl = 'https://buyusagmail.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/services', priority: '0.9', changefreq: 'daily' },
    { url: '/pricing', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/faq', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/payment-methods', priority: '0.6', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/terms', priority: '0.4', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.4', changefreq: 'yearly' },
    { url: '/refund', priority: '0.5', changefreq: 'yearly' },
    { url: '/dmca', priority: '0.3', changefreq: 'yearly' },
    { url: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
    { url: '/sitemap', priority: '0.5', changefreq: 'weekly' },
  ];

  const servicePages = SERVICES_DATA.map(s => ({
    url: `/services/${s.slug}`,
    priority: '0.95',
    changefreq: 'weekly'
  }));

  const blogPages = BLOG_POSTS.map(b => ({
    url: `/blog/${b.slug}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const allEntries = [...staticPages, ...servicePages, ...blogPages];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(e => `  <url>
    <loc>${baseUrl}${e.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, xmlContent, 'utf-8');
  console.log(`[Sitemap Updated] Generated ${allEntries.length} URLs in ${publicPath}`);
}

buildSitemap();
