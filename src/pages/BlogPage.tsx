import React, { useState } from 'react';
import { Search, BookOpen, Clock, User, ArrowRight, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { BlogPost, PageRoute } from '../types';
import { SEOMeta } from '../components/common/SEOMeta';

interface BlogPageProps {
  posts: BlogPost[];
  onSelectPost: (slug: string) => void;
  onNavigate: (route: PageRoute) => void;
  darkMode: boolean;
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectPost, onNavigate, darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const categories = [
    'All',
    'Email Marketing & Cold Outreach',
    'Google Ads & MCC Billing',
    'Local SEO & Google Maps Reviews',
    'Account Security & Proxies',
    'Automation & Web Scraping'
  ];

  const filteredPosts = (posts || []).filter(post => {
    const matchesCat = selectedCat === 'All' || post.category === selectedCat;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.keywords || []).some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const featuredPost = (posts || [])[0];

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      <SEOMeta
        title="SEO Knowledge Hub & Growth Marketing Blog | buyusagmail.com"
        description="Master cold email deliverability, Google Ads MCC billing strategies, residential proxy setups, and GMB review algorithms with our data-driven growth guides."
        canonicalUrl="https://buyusagmail.com/blog"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          50+ SEO Growth Articles
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          buyusagmail.com Growth Marketing Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          In-depth technical tutorials, deliverability benchmarks, proxy configurations, and account aging case studies for high-volume media buyers and cold outreach agencies.
        </p>
      </div>

      {/* FEATURED POST BANNER (Only on page 1 and when search is empty) */}
      {currentPage === 1 && !searchQuery && selectedCat === 'All' && featuredPost && (
        <div 
          onClick={() => onSelectPost(featuredPost.slug)}
          className={`rounded-3xl border overflow-hidden cursor-pointer transition-all hover:shadow-2xl group ${
            darkMode ? 'bg-gradient-to-r from-gray-900 via-gray-900 to-gray-950 border-gray-800' : 'bg-gradient-to-r from-red-50/50 via-white to-blue-50/50 border-gray-200'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-white bg-red-500 px-3 py-1 rounded-full shadow-sm">
                  ★ Featured Research
                </span>
                <span className="text-xs font-bold text-gray-500">{featuredPost.date}</span>
                <span className="text-xs font-bold text-blue-500">• {featuredPost.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white group-hover:text-red-500 transition-colors leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 font-normal">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4 text-red-500" />
                  <span>By {featuredPost.author}</span>
                </div>
                <span className="text-xs font-black text-red-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Complete Study &rarr;
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative hidden sm:block">
              <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-red-500/20 to-blue-500/20 border border-gray-200 dark:border-gray-800 flex items-center justify-center p-6 text-center">
                <BookOpen className="w-20 h-20 text-red-500/40" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH AND FILTER BAR */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search 50+ articles, proxies, GMB..."
              className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
            />
          </div>

          {/* Result Counter */}
          <span className="text-xs font-bold text-gray-500">
            Showing <strong className="text-gray-900 dark:text-white">{filteredPosts.length}</strong> growth guides
          </span>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          {(categories || []).map((cat, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedCat(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCat === cat
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/20 scale-105'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* POSTS GRID (9 Per Page) */}
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(currentPosts || []).map(post => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post.slug)}
              className={`rounded-3xl p-7 border transition-all flex flex-col justify-between cursor-pointer group ${
                darkMode ? 'bg-gray-900 border-gray-800 hover:border-red-500/40' : 'bg-white border-gray-200 hover:shadow-xl'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors tracking-tight leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold">
                <span className="text-gray-500">{post.date}</span>
                <span className="text-red-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Article &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 p-8 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No articles match your search criteria</h3>
          <p className="text-xs text-gray-500 mt-1">Try resetting your filter keywords or select "All" categories.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCat('All'); }}
            className="mt-4 px-5 py-2.5 rounded-xl bg-red-500 text-white font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {[...Array(Math.max(0, totalPages || 0))].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className={`w-10 h-10 rounded-xl font-extrabold text-xs transition-all ${
                currentPage === i + 1
                  ? 'bg-red-500 text-white shadow-md scale-110'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* CTA Banner */}
      <div className="p-10 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center space-y-4 shadow-xl border border-gray-800">
        <h3 className="text-2xl sm:text-3xl font-black">Need High-Stick Accounts for Your Email Campaigns?</h3>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Explore our inventory of 2 to 8-year-old USA aged Gmails pre-warmed on residential IPs.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('services')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 text-white font-black text-sm shadow-lg shadow-red-500/25 inline-flex items-center gap-2"
          >
            <span>Explore Accounts Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
