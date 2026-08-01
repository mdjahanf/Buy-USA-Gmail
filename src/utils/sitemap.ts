import { SERVICES_DATA } from '../data/initialData';
import { BLOG_POSTS } from '../data/blogData';

export function generateSitemapXml(baseUrl: string = 'https://buyusagmail.com'): string {
  const currentDate = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/services', priority: '0.9', changefreq: 'daily' },
    { url: '/pricing', priority: '0.9', changefreq: 'daily' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'weekly' },
    { url: '/faq', priority: '0.8', changefreq: 'weekly' },
    { url: '/payment-methods', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.8', changefreq: 'weekly' },
    { url: '/terms', priority: '0.5', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'monthly' },
    { url: '/refund', priority: '0.5', changefreq: 'monthly' },
    { url: '/dmca', priority: '0.5', changefreq: 'monthly' },
    { url: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
    { url: '/sitemap', priority: '0.6', changefreq: 'weekly' },
  ];

  const serviceRoutes = (SERVICES_DATA || []).map(s => ({
    url: `/services/${s.slug}`,
    priority: '0.9',
    changefreq: 'weekly'
  }));

  const blogRoutes = (BLOG_POSTS || []).map(b => ({
    url: `/blog/${b.slug}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const allUrls = [...staticRoutes, ...serviceRoutes, ...blogRoutes];

  const xmlEntries = allUrls.map(item => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}
