import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  ShieldAlert, 
  CheckCircle2, 
  ShoppingBag, 
  ChevronRight, 
  ArrowUp, 
  Check, 
  Sparkles,
  BookOpen,
  Award,
  Zap
} from 'lucide-react';
import { BlogPost } from '../types';
import { SEOMeta } from '../components/common/SEOMeta';
import { cleanContentForDisplay } from '../utils/contentSanitizer';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface BlogPostPageProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onBack: () => void;
  onSelectPost: (slug: string) => void;
  onOpenOrder: () => void;
  darkMode: boolean;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  allPosts,
  onBack,
  onSelectPost,
  onOpenOrder,
  darkMode
}) => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedPosts = (allPosts || [])
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 3);

  const cleanedContent = cleanContentForDisplay(post?.content || '');

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-300 relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-blue-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <SEOMeta
        title={`${post.title} | buyusagmail.com Growth Hub`}
        description={post.metaDescription}
        canonicalUrl={`https://buyusagmail.com/blog/${post.slug}`}
        type="article"
        article={post}
        breadcrumbs={[
          { name: 'Home', url: 'https://buyusagmail.com' },
          { name: 'Blog', url: 'https://buyusagmail.com/blog' },
          { name: post.title, url: `https://buyusagmail.com/blog/${post.slug}` }
        ]}
      />

      {/* Top Navigation Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center justify-between text-xs sm:text-sm font-medium">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Blog Hub</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <BookOpen className="w-3.5 h-3.5 text-red-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">{post.category}</span>
          </div>
        </nav>
      </div>

      {/* Article Header Card */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className={`p-6 sm:p-10 rounded-3xl border shadow-xl relative overflow-hidden ${
          darkMode 
            ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border-gray-800' 
            : 'bg-gradient-to-b from-white via-red-50/20 to-white border-gray-200/80'
        }`}>
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative space-y-6">
            {/* Meta Pill Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider bg-red-500 text-white px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                {post.category}
              </span>

              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-500" />
                <span>{post.date}</span>
              </span>

              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>{post.readTime}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            {/* Subtitle / Excerpt */}
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed border-l-4 border-red-500 pl-4 py-1">
              {post.excerpt}
            </p>

            {/* Author Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200/60 dark:border-gray-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center font-black text-base shadow-lg ring-2 ring-red-500/20">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">{post.author}</h4>
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Senior Deliverability Architect • buyusagmail.com</p>
                </div>
              </div>

              {/* Share / Copy Button */}
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-sm ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
                }`}
                title="Share Article Link"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Article Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        {/* Actionable Engineering Takeaway Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-red-500/5 to-blue-500/10 border-2 border-amber-500/30 shadow-lg flex flex-col sm:flex-row items-start gap-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Zap className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full">
                Engineering Rule
              </span>
              <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">
                Actionable Deliverability Takeaway
              </h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
              To guarantee <strong>99.4%+ primary inbox placement</strong> when implementing this guide, pair your accounts with dedicated USA residential proxies and observe a minimum <strong>14-day progressive warmup curve</strong> before sending commercial volume.
            </p>
          </div>
        </div>

        {/* Markdown Rendered Content */}
        <div className="prose dark:prose-invert max-w-none text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({node, ...props}) => (
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white mt-12 mb-6 tracking-tight leading-snug border-b pb-3 border-gray-200 dark:border-gray-800" {...props} />
              ),
              h2: ({node, ...props}) => (
                <h2 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white mt-12 mb-6 tracking-tight leading-snug flex items-center gap-3" {...props}>
                  <span className="w-2 h-7 bg-red-500 rounded-full inline-block flex-shrink-0" />
                  <span>{props.children}</span>
                </h2>
              ),
              h3: ({node, ...props}) => (
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 text-red-500 dark:text-red-400 tracking-tight" {...props} />
              ),
              h4: ({node, ...props}) => (
                <h4 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3" {...props} />
              ),
              p: ({node, ...props}: any) => {
                const isOnlyAnchor = Array.isArray(props.children) 
                  ? props.children.every((c: any) => !c || (typeof c === 'object' && !c.props?.href && (c.props?.name || c.props?.id)))
                  : typeof props.children === 'object' && !props.children?.props?.href && (props.children?.props?.name || props.children?.props?.id);
                if (isOnlyAnchor) return <>{props.children}</>;
                return <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-6 text-base sm:text-lg" {...props} />;
              },
              ul: ({node, ...props}) => (
                <ul className="list-disc list-inside space-y-3 mb-8 ml-2 text-gray-700 dark:text-gray-300 text-base sm:text-lg font-normal" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="list-decimal list-inside space-y-3 mb-8 ml-2 text-gray-700 dark:text-gray-300 text-base sm:text-lg font-normal" {...props} />
              ),
              li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
              strong: ({node, ...props}) => <strong className="font-extrabold text-gray-900 dark:text-white" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="p-6 sm:p-8 my-8 rounded-3xl bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent border-l-4 border-red-500 text-gray-900 dark:text-gray-100 italic font-medium shadow-md leading-relaxed" {...props} />
              ),
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-10 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-lg">
                  <table className="w-full text-left text-sm sm:text-base border-collapse" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase text-xs tracking-wider border-b border-gray-200 dark:border-gray-700" {...props} />,
              tbody: ({node, ...props}) => <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900/50" {...props} />,
              tr: ({node, ...props}) => <tr className="hover:bg-red-500/5 transition-colors" {...props} />,
              th: ({node, ...props}) => <th className="py-4 px-5 font-extrabold text-gray-900 dark:text-white" {...props} />,
              td: ({node, ...props}) => <td className="py-4 px-5 text-gray-700 dark:text-gray-300" {...props} />,
              a: ({node, ...props}: any) => {
                if (!props.href && (props.name || props.id)) {
                  return <span id={props.name || props.id} className="scroll-mt-28 block -mt-4" />;
                }
                const isExternal = props.href?.startsWith('http');
                return (
                  <a 
                    className="text-red-500 hover:text-red-600 dark:text-red-400 font-bold underline decoration-red-300 hover:decoration-red-500 transition-all inline-items-center gap-1" 
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    {...props} 
                  />
                );
              },
              code: ({node, inline, ...props}: any) => 
                inline ? (
                  <code className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-lg font-mono text-xs font-bold border border-red-200 dark:border-red-900/50" {...props} />
                ) : (
                  <code className="block bg-gray-900 text-gray-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto my-6 border border-gray-800 shadow-xl" {...props} />
                ),
              hr: () => <div className="my-8 border-t border-gray-200 dark:border-gray-800" />,
            }}
          >
            {cleanedContent}
          </Markdown>
        </div>

        {/* Author Bio Footer */}
        <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center sm:items-start gap-6 my-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-xl flex-shrink-0">
            {post.author.charAt(0)}
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">{post.author}</h3>
              <span className="text-xs font-bold bg-red-500/10 text-red-500 px-2.5 py-0.5 rounded-full border border-red-500/20">
                Verified Author
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Alexander Vance is a Senior Deliverability Engineer and Lead Infrastructure Architect at buyusagmail.com. Specializing in high-volume cold email sequence optimization, proxy subnet isolation, and automated Google Workspace warmups.
            </p>
          </div>
        </div>

        {/* Keyword Tags */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">Topic Keywords:</span>
          <div className="flex flex-wrap gap-2">
            {(post?.keywords || []).map((kw, i) => (
              <span key={i} className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-xl hover:bg-red-500 hover:text-white transition-colors cursor-default">
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* MID-ARTICLE ORDER CALLOUT BANNER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

          <div className="space-y-3 text-center sm:text-left relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 inline-block">
              Instant Delivery 24/7
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Need Aged Accounts for This Strategy?</h3>
            <p className="text-sm text-white/90 max-w-md leading-relaxed font-medium">
              Our 2 to 8-year-old USA residential accounts come pre-configured with recovery credentials, non-VoIP SIM verification, and a 72-hour warranty.
            </p>
          </div>

          <button
            onClick={onOpenOrder}
            className="px-8 py-4 rounded-2xl bg-white text-gray-900 font-black text-sm shadow-xl hover:bg-amber-400 hover:text-gray-900 transition-all transform hover:-translate-y-1 whitespace-nowrap flex items-center gap-2 relative z-10"
          >
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <span>Order Accounts Now</span>
          </button>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-20 pt-10 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Related Growth Guides</h3>
            <button 
              onClick={onBack}
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <span>View All Guides</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(relatedPosts || []).map(rel => (
              <a
                key={rel.id}
                href={`/blog/${rel.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onSelectPost(rel.slug);
                }}
                className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between group transform hover:-translate-y-1.5 shadow-sm hover:shadow-xl ${
                  darkMode ? 'bg-gray-900 border-gray-800 hover:border-red-500/50' : 'bg-white border-gray-200/80 hover:border-red-500/40'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2.5 py-1 rounded-md">{rel.category}</span>
                  <h4 className="text-base font-extrabold text-gray-900 dark:text-white mt-3 group-hover:text-red-500 transition-colors leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-500">
                  <span>{rel.readTime}</span>
                  <span className="text-red-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Floating Back-To-Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-20 sm:right-24 p-3.5 rounded-full bg-red-500 text-white shadow-2xl hover:bg-red-600 transition-all transform hover:scale-110 z-40"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
