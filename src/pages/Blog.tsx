import { BLOG_POSTS } from '../constants.ts';
import { Calendar, User, Search, ChevronRight, Share2, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Blog() {
  return (
    <div className="min-h-screen bg-hospital-bg py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-6 mb-20 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-hospital-secondary/10 text-hospital-secondary text-xs font-bold tracking-[0.2em] uppercase">Health Insights</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-hospital-primary leading-[1.1] tracking-tight">Kazi Health Journal</h1>
          <p className="text-lg text-hospital-muted leading-relaxed">Expert medical advice, hospital news, and wellbeing tips curated by our professional clinical team.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-12">
             {BLOG_POSTS.map((post, i) => (
               <motion.article 
                 key={post.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="group bg-white rounded-hospital shadow-hospital-sm border border-hospital-slate/5 overflow-hidden hover:shadow-hospital-lg transition-all"
               >
                  <div className="relative aspect-[2/1] overflow-hidden">
                     <img 
                       src={post.image} 
                       alt={post.title} 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                       referrerPolicy="no-referrer"
                     />
                     <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 rounded-full bg-hospital-secondary text-white text-[10px] uppercase font-bold tracking-widest leading-none shadow-xl">
                           {post.category}
                        </span>
                     </div>
                  </div>
                  <div className="p-10">
                     <div className="flex items-center gap-6 text-xs text-hospital-muted font-bold uppercase tracking-widest mb-6">
                        <div className="flex items-center gap-2"><Calendar size={14} /> {post.date}</div>
                        <div className="flex items-center gap-2"><User size={14} /> Kazi Editorial</div>
                     </div>
                     <h2 className="text-3xl font-bold font-serif text-hospital-primary mb-6 group-hover:text-hospital-secondary transition-colors leading-tight">{post.title}</h2>
                     <p className="text-hospital-muted text-lg leading-relaxed mb-8">{post.excerpt}</p>
                     
                     <div className="flex items-center justify-between pt-8 border-t border-hospital-slate/5">
                        <button className="flex items-center gap-2 font-bold text-hospital-primary hover:text-hospital-secondary transition-colors group/btn">
                           READ FULL ARTICLE <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-hospital-bg text-hospital-muted hover:bg-hospital-primary hover:text-white transition-all">
                           <Share2 size={16} />
                        </button>
                     </div>
                  </div>
               </motion.article>
             ))}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-10">
             {/* Search */}
             <div className="p-8 bg-white rounded-hospital shadow-hospital-sm border border-hospital-slate/5">
                <h4 className="text-sm font-bold uppercase tracking-widest text-hospital-primary mb-6">Search Journal</h4>
                <div className="relative">
                   <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-hospital-muted" size={18} />
                   <input 
                     type="text" 
                     placeholder="Type keywords..." 
                     className="w-full h-12 px-4 pr-12 bg-hospital-bg rounded-hospital border border-transparent focus:border-hospital-secondary outline-none transition-all text-sm font-bold" 
                   />
                </div>
             </div>

             {/* Latest News */}
             <div className="p-8 bg-hospital-primary text-white rounded-hospital shadow-2xl relative overflow-hidden">
                <h4 className="text-sm font-bold uppercase tracking-widest text-hospital-secondary mb-8 block relative z-10">Latest News</h4>
                <div className="flex flex-col gap-8 relative z-10">
                   <NewsItem 
                     title="National Dental Week starts at Kazi Hospital" 
                     date="Today"
                   />
                   <NewsItem 
                     title="Dr. Madiha Kazi honored at Global Health Summit" 
                     date="Yesterday"
                   />
                   <NewsItem 
                     title="New Neurology wing opens with 200+ beds" 
                     date="3 Days Ago"
                   />
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                   <button className="text-xs font-bold text-hospital-secondary flex items-center gap-2 hover:translate-x-1 transition-transform">
                      VIEW ALL PRESS RELEASES <ChevronRight size={14} />
                   </button>
                </div>
                <div className="absolute top-0 right-0 h-40 w-40 bg-hospital-secondary opacity-10 blur-[60px]" />
             </div>

             {/* Popular Tags */}
             <div className="p-8 bg-white rounded-hospital shadow-hospital-sm border border-hospital-slate/5">
                <h4 className="text-sm font-bold uppercase tracking-widest text-hospital-primary mb-6">Popular Tags</h4>
                <div className="flex flex-wrap gap-2 text-hospital-muted">
                   {['Heart Health', 'Diet', 'Brain', 'COVID-19', 'Wellness', 'Vaccination', 'Safety'].map(tag => (
                      <button key={tag} className="px-4 py-2 rounded-lg bg-hospital-bg border border-transparent text-xs font-bold hover:border-hospital-secondary hover:text-hospital-secondary transition-all">
                         #{tag}
                      </button>
                   ))}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function NewsItem({ title, date }: { title: string, date: string }) {
  return (
    <div className="group cursor-pointer">
       <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2 block">{date}</span>
       <h5 className="font-bold text-lg font-serif leading-tight group-hover:text-hospital-secondary transition-colors underline decoration-white/0 group-hover:decoration-hospital-secondary decoration-2 underline-offset-4">{title}</h5>
    </div>
  );
}
