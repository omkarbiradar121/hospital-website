import { motion } from 'motion/react';
import { Phone, MapPin, Ambulance, Zap, Clock, ShieldAlert, HeartPulse, ChevronRight } from 'lucide-react';

export default function Emergency() {
  return (
    <div className="min-h-screen bg-white">
      {/* High Visibility Header */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="bg-red-50 rounded-2xl p-8 md:p-12 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="relative z-10 max-w-xl">
             <div className="flex items-center gap-2 mb-4">
               <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
               <span className="text-red-700 text-xs font-bold uppercase tracking-widest">Live: 24/7 Response Active</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-bold text-red-950 mb-4 tracking-tight">Rapid Response Unit</h1>
             <p className="text-red-800/70 text-sm md:text-base leading-relaxed mb-8">
               Our elite medical strike team reaches your location within 10-15 minutes. Equipped with ICU-grade equipment and trauma specialists.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-red-100 shadow-sm">
                 <div className="h-10 w-10 bg-red-600 text-white rounded-lg flex items-center justify-center">
                   <Phone size={20} />
                 </div>
                 <div>
                   <p className="text-[10px] text-red-600 font-bold uppercase tracking-tight">Direct Helpline</p>
                   <p className="text-lg font-black text-red-950 leading-none tracking-tighter">+1 (234) 567-890</p>
                 </div>
               </div>
               <button className="bg-red-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 self-start md:self-auto">
                 Launch Ambulance
               </button>
             </div>
          </div>
          <div className="relative z-10 h-64 w-64 md:h-80 md:w-80 opacity-20 md:opacity-100">
             <ShieldAlert size={320} className="text-red-600/10 absolute -right-20 -bottom-20 rotate-12" />
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="h-48 w-48 rounded-full border-[16px] border-red-200/50 flex flex-col items-center justify-center text-center p-6 grayscale opacity-50">
                  <Ambulance size={40} className="text-red-600 mb-2" />
                  <span className="text-[8px] font-black uppercase tracking-tighter">EMS Certified Platinum</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-hospital-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-1.5 h-7 bg-red-600 rounded-full"></span>
            <h2 className="text-xl font-bold text-slate-800">Critical Units</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
             <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-xl border border-hospital-border shadow-sm hover:border-red-500 transition-all duration-300"
             >
                <div className="h-12 w-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-6">
                   <Ambulance size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-tight">Mobile ICU</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">Equipped with Advanced Life Support (ALS) systems and paramedics on board, reaching you within 15 minutes.</p>
                <div className="flex flex-col gap-2">
                   <div className="h-1 w-10 bg-red-600 rounded-full"></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Code Red Ready</span>
                </div>
             </motion.div>

             <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-xl border border-hospital-border shadow-sm hover:border-red-500 transition-all duration-300"
             >
                <div className="h-12 w-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-6">
                   <HeartPulse size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-tight">Cardiac Unit</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">Our dedicated Cardiac Unit handles heart attacks and strokes with specialized interventional teams on 24/7 standby.</p>
                <div className="flex flex-col gap-2">
                   <div className="h-1 w-10 bg-red-600 rounded-full"></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stroke Protocol Active</span>
                </div>
             </motion.div>

             <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-xl border border-hospital-border shadow-sm hover:border-red-500 transition-all duration-300"
             >
                <div className="h-12 w-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-6">
                   <Clock size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-tight">Zero Wait ER</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">Our emergency room operates on a triage-first basis, ensuring that critical patients are seen immediately without delay.</p>
                <div className="flex flex-col gap-2">
                   <div className="h-1 w-10 bg-red-600 rounded-full"></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Triage Support 24/7</span>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Map Implementation Placeholder */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div className="flex flex-col gap-6">
                 <h2 className="text-4xl font-bold font-serif text-hospital-primary">Vandal-Proof Location Access</h2>
                 <p className="text-lg text-hospital-muted leading-relaxed">Located at the heart of the city, we are accessible from all major highways within 10-20 minutes.</p>
                 <div className="grid gap-6">
                    <div className="flex items-start gap-4">
                       <MapPin className="text-red-600 mt-1 flex-shrink-0" size={24} />
                       <div>
                          <h4 className="font-bold text-hospital-primary">Hospital Address</h4>
                          <p className="text-sm text-hospital-muted">123 Medical Plaza, Green Heights, Healthcare City, HC 54023</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <Phone className="text-red-600 mt-1 flex-shrink-0" size={24} />
                       <div>
                          <h4 className="font-bold text-hospital-primary">Helpdesk (Non-Emergency)</h4>
                          <p className="text-sm text-hospital-muted">+1 (234) 999-0000</p>
                       </div>
                    </div>
                 </div>
                 <button className="w-fit rounded-hospital bg-hospital-primary px-8 py-4 text-sm font-bold text-white hover:bg-hospital-secondary transition-all shadow-lg">
                    Get Direction on Mobile
                 </button>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-[500px] w-full bg-hospital-bg rounded-hospital overflow-hidden border border-hospital-slate/10 group">
                 <div className="absolute inset-0 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000">
                    <img 
                       src="https://picsum.photos/seed/map-hospital/1000/1000" 
                       className="w-full h-full object-cover" 
                       alt="Hospital Location Map" 
                       referrerPolicy="no-referrer"
                    />
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                       <div className="absolute -top-12 -left-3 px-4 py-2 bg-red-600 text-white text-[10px] font-bold rounded-full shadow-2xl whitespace-nowrap">
                          KAZI HOSPITAL (YOU ARE HERE)
                       </div>
                       <MapPin size={48} className="text-red-600 fill-red-600/20 animate-bounce" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
