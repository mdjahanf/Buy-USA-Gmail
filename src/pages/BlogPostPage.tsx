import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  Bookmark, 
  ShieldAlert, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { BlogPost, PageRoute } from '../types';
import { SEOMeta } from '../components/common/SEOMeta';
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
  const relatedPosts = (allPosts || [])
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 3);

  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-300">
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

      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <button onClick={onBack} className="hover:text-red-500 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Blog Hub</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-gray-200 font-bold truncate max-w-xs">{post.title}</span>
        </nav>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="text-xs font-black uppercase tracking-wider bg-red-500/10 text-red-500 px-3 py-1 rounded-full border border-red-500/20">
              {post.category}
            </span>
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span className="text-xs font-bold text-blue-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-black text-sm shadow">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">{post.author}</h4>
                <p className="text-[11px] text-gray-500">Senior Deliverability Architect</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
                title="Share Article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Actionable Proxy Tip Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-red-500/5 to-transparent border border-amber-500/30 flex items-start gap-4">
          <ShieldAlert className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h4 className="font-extrabold text-gray-900 dark:text-white uppercase tracking-wider text-xs text-amber-600 dark:text-amber-400">
              ⚡ Actionable Engineering Takeaway:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To achieve 99.4%+ inbox placement when applying this strategy, ensure your accounts are at least <strong>2 years old</strong> and warmed up on dedicated USA residential proxies before launching automated sequence loops.
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div className="prose dark:prose-invert max-w-none text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-normal space-y-6">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-800" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-800" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3 text-red-500" {...props} />,
              h4: ({node, ...props}) => <h4 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2" {...props} />,
              p: ({node, ...props}: any) => {
                const isOnlyAnchor = Array.isArray(props.children) 
                  ? props.children.every((c: any) => !c || (typeof c === 'object' && !c.props?.href && (c.props?.name || c.props?.id)))
                  : typeof props.children === 'object' && !props.children?.props?.href && (props.children?.props?.name || props.children?.props?.id);
                if (isOnlyAnchor) return <>{props.children}</>;
                return <p className="leading-8 text-gray-700 dark:text-gray-300 mb-5" {...props} />;
              },
              ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-gray-700 dark:text-gray-300" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-6 ml-4 text-gray-700 dark:text-gray-300" {...props} />,
              li: ({node, ...props}) => <li className="leading-7" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="p-5 my-6 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200 italic font-medium shadow-sm" {...props} />
              ),
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-8 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
                  <table className="w-full text-left text-sm" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase text-xs tracking-wider" {...props} />,
              tbody: ({node, ...props}) => <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900/50" {...props} />,
              tr: ({node, ...props}) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" {...props} />,
              th: ({node, ...props}) => <th className="py-3.5 px-4 font-bold" {...props} />,
              td: ({node, ...props}) => <td className="py-3 px-4 text-gray-700 dark:text-gray-300" {...props} />,
              a: ({node, ...props}: any) => {
                if (!props.href && (props.name || props.id)) {
                  return <span id={props.name || props.id} className="scroll-mt-28 block -mt-4" />;
                }
                return <a className="text-red-500 hover:text-red-600 underline font-semibold transition-colors" {...props} />;
              },
              code: ({node, inline, ...props}: any) => 
                inline ? (
                  <code className="bg-gray-100 dark:bg-gray-800 text-red-500 px-1.5 py-0.5 rounded font-mono text-xs font-bold" {...props} />
                ) : (
                  <code className="block bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-4" {...props} />
                ),
              hr: ({node, ...props}) => <hr className="my-8 border-gray-200 dark:border-gray-800" {...props} />,
            }}
          >
            {post?.content || ''}
          </Markdown>
        </div>

        {/* Keyword Tags */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">Target SEO Keywords:</span>
          <div className="flex flex-wrap gap-2">
            {(post?.keywords || []).map((kw, i) => (
              <span key={i} className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg">
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* MID-ARTICLE ORDER CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
              Verified Inventory
            </span>
            <h3 className="text-2xl font-black">Need Aged Accounts to Test This Strategy?</h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-md">
              Our 2 to 8-year-old USA residential accounts come pre-configured with recovery credentials and 72-hour warranty.
            </p>
          </div>
          <button
            onClick={onOpenOrder}
            className="px-8 py-4 rounded-2xl bg-white text-gray-900 font-black text-sm shadow-xl hover:bg-gray-100 transition-all transform hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-red-500" />
            <span>Order Accounts Now</span>
          </button>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-8 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">Related Growth Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(relatedPosts || []).map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectPost(rel.slug)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between group ${
                  darkMode ? 'bg-gray-900 border-gray-800 hover:border-red-500/40' : 'bg-white border-gray-200 hover:shadow-lg'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded">{rel.category}</span>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mt-2 group-hover:text-red-500 transition-colors leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{rel.excerpt}</p>
                </div>
                <span className="text-xs font-bold text-red-500 mt-4 block">Read Study &rarr;</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
