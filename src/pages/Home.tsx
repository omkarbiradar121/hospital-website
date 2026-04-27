import { motion } from 'motion/react';
import { ArrowRight, Phone, Stethoscope, ChevronRight, Activity, Award, ShieldCheck, HeartPulse } from 'lucide-react';
import { DEPARTMENTS } from '../constants.ts';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden min-h-[320px] flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-2xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">Advanced Healthcare by Dr. Madiha Kazi</h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed italic">
              "Our vision is to provide 24/7 compassionate, technology-driven care to every patient who walks through our doors."
            </p>
            <div className="flex gap-4 mt-8">
              <Link to="/doctors" className="bg-hospital-secondary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/20">
                Book Appointment
              </Link>
              <Link to="/emergency" className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/20 transition-all backdrop-blur-sm">
                Emergency 24/7
              </Link>
            </div>
          </motion.div>
          <div className="absolute right-[-40px] top-[-40px] w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute left-[-20px] bottom-[-20px] w-64 h-64 bg-teal-500/5 rounded-full blur-[80px]"></div>
        </div>
      </section>

      {/* Stats/Logo Cloud */}
      <section className="py-12 bg-white border-b border-hospital-slate/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 md:justify-around text-hospital-muted font-bold tracking-widest text-xs grayscale opacity-50">
            <span className="flex items-center gap-1"><ShieldCheck size={16} /> ISO 9001:2015</span>
            <span className="flex items-center gap-1"><ShieldCheck size={16} /> JCI ACCREDITED</span>
            <span className="flex items-center gap-1"><ShieldCheck size={16} /> WHO PARTNER</span>
            <span className="flex items-center gap-1"><ShieldCheck size={16} /> NABH ACCREDITED</span>
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-16 bg-hospital-bg relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <span className="w-1.5 h-7 bg-hospital-secondary rounded-full"></span> 
              Specialized Departments
            </h2>
            <Link to="/departments" className="text-xs text-hospital-secondary font-bold uppercase tracking-wider hover:underline">
              Explore All
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-6 rounded-xl border border-hospital-border shadow-sm hover:border-hospital-accent transition-all duration-300"
              >
                 <div className="text-3xl mb-4 p-3 bg-hospital-bg w-fit rounded-lg group-hover:bg-hospital-secondary/10 transition-colors">
                   <HeartPulse className="text-hospital-secondary" size={24} />
                 </div>
                 <h3 className="text-base font-bold text-slate-900 mb-2">{dept.name}</h3>
                 <p className="text-slate-500 text-xs leading-relaxed mb-6 h-12 overflow-hidden">{dept.description}</p>
                 <Link to={`/departments`} className="text-[10px] font-bold text-hospital-secondary uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                   View Details <ArrowRight size={12} />
                 </Link>
              </motion.div>
            ))}
            {/* Quick Help Card */}
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 flex flex-col items-center justify-center text-center">
              <span className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-2 font-sans">Need Help?</span>
              <p className="text-[11px] text-slate-600 mb-4 max-w-[180px]">Contact our global helpdesk for specialized medical inquiries.</p>
              <button className="bg-white px-5 py-2 rounded-lg text-xs font-bold text-teal-700 shadow-sm border border-teal-100 hover:shadow-md transition-shadow">
                Contact Helpdesk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Madiha Kazi's Vision Section - Recipe 11 style */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
             <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-hospital-secondary/10 rounded-full blur-3xl z-0" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative z-10 rounded-hospital overflow-hidden shadow-2xl"
                >
                  <img 
                    src="https://picsum.photos/seed/madiha-kazi/800/1000" 
                    alt="Madiha Kazi" 
                    className="w-full h-auto"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-hospital-primary/80 to-transparent p-10 flex flex-col justify-end">
                     <h3 className="text-white text-3xl font-serif font-bold">Madiha Kazi</h3>
                     <p className="text-hospital-bg/70 text-sm font-medium tracking-widest uppercase">Founder & Medical Director</p>
                  </div>
                </motion.div>
             </div>
             <div className="flex flex-col gap-8">
                <span className="text-hospital-secondary font-bold tracking-[0.2em] text-xs uppercase">The Visionary Mind</span>
                <h2 className="text-4xl md:text-5xl font-bold font-serif text-hospital-primary tracking-tight leading-[1.1]">Empathy is the core of Our medical ethos.</h2>
                <div className="h-1 w-24 bg-hospital-secondary" />
                <p className="text-lg text-hospital-muted italic font-serif leading-relaxed">
                  "At Kazi Hospital, we don't just treat illnesses; we care for human beings. My vision was to build an institution where world-class technology meets deep humanitarian empathy. Every patient walking through our doors is family."
                </p>
                <div className="grid grid-cols-2 gap-8 text-hospital-primary">
                   <div className="flex flex-col gap-2">
                      <span className="text-3xl font-bold font-serif">15+</span>
                      <p className="text-xs text-hospital-muted font-bold tracking-widest uppercase">Years of excellence</p>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-3xl font-bold font-serif">24/7</span>
                      <p className="text-xs text-hospital-muted font-bold tracking-widest uppercase">Critical Patient Support</p>
                   </div>
                </div>
                <Link to="/about" className="flex items-center gap-2 font-bold text-hospital-primary hover:text-hospital-secondary transition-colors group">
                   Meet the leadership team <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
