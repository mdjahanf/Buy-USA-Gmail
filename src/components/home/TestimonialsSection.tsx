import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/initialData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/80 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Verified Agency Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Trusted by Leaders in Digital Growth
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            From 7-figure cold email agencies in New York to local SEO reputation firms in London and Toronto, here is what our verified buyers say about our aged inventory.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(TESTIMONIALS || []).map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all space-y-6 relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-red-500/15 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 0)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span>{item.author}</span>
                      <span title="Verified Crypto Buyer"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /></span>
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.role}, <strong className="text-gray-700 dark:text-gray-300">{item.company}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-full border border-red-500/20">
                    {item.service.replace('Aged Gmail Accounts For', '').trim()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
