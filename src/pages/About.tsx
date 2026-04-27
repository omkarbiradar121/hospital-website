import { motion } from 'motion/react';
import { cn } from '../lib/utils.ts';
import { Award, Target, Users, HeartHandshake, Quote, ChevronRight, Activity, ShieldAlert } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-hospital-primary text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
           <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
              <motion.span 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-hospital-secondary text-[10px] font-bold tracking-[0.3em] uppercase backdrop-blur-sm"
              >
                 Established 2011
              </motion.span>
              <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-8xl font-bold font-serif tracking-tight leading-[1.1]"
              >
                 Dedicated to the <br /> <span className="italic text-hospital-secondary">Spirit</span> of Healing.
              </motion.h1>
              <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="text-xl text-hospital-bg/60 leading-relaxed max-w-2xl mx-auto"
              >
                 Kazi Hospital was founded with a single mission: to bridge the gap between world-class medical innovation and compassionate patient care.
              </motion.p>
           </div>
        </div>
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-hospital-secondary/10 blur-[100px]" />
      </section>

      {/* Founder's Story */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div className="relative group">
                 <div className="absolute inset-0 bg-hospital-secondary/20 translate-x-4 translate-y-4 rounded-hospital -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                 <img 
                    src="https://picsum.photos/seed/about-madiha/800/1000" 
                    alt="Madiha Kazi" 
                    className="w-full rounded-hospital shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" 
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute bottom-8 right-8 p-6 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-hospital-slate/5">
                    <div className="flex flex-col gap-1">
                       <h4 className="font-bold text-hospital-primary leading-none">Madiha Kazi</h4>
                       <p className="text-[10px] uppercase font-bold tracking-widest text-hospital-muted">Proprietor & Managing Director</p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-10">
                 <div className="flex flex-col gap-4">
                    <span className="text-hospital-secondary font-bold tracking-widest text-xs uppercase">Founder's Vision</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-hospital-primary leading-tight lowercase">Humanity, transparency, and clinical excellence.</h2>
                 </div>
                 <div className="flex flex-col gap-6 text-lg text-hospital-muted leading-relaxed font-normal">
                    <p>
                       After witnessing the challenges in traditional healthcare systems, Madiha Kazi envisioned a sanctuary of healing that prioritized the patient above all else. What started as a small clinic in 2011 has blossomed into a multi-speciality medical hub.
                    </p>
                    <p>
                       "My Goal was never to build just another hospital. I wanted to create a culture of care where the doctors listen, where technology simplifies life, and where every discharge is a celebration of life."
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-8 pt-8 border-t border-hospital-slate/5">
                    <div className="flex flex-col gap-2">
                       <Award className="text-hospital-secondary mb-2" size={32} />
                       <h5 className="font-bold text-hospital-primary">Global Award</h5>
                       <p className="text-xs text-hospital-muted">Healthcare Excellence 2024</p>
                    </div>
                    <div className="flex flex-col gap-2">
                       <Users className="text-hospital-secondary mb-2" size={32} />
                       <h5 className="font-bold text-hospital-primary">500+ Staff</h5>
                       <p className="text-xs text-hospital-muted">Dedicated Clinical Team</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-hospital-bg">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col items-center text-center gap-4 mb-20">
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-hospital-primary capitalize">Our core values</h2>
              <div className="h-1 w-20 bg-hospital-secondary rounded-full" />
           </div>
           
           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <ValueCard icon={<HeartHandshake size={32} />} title="Compassion" body="Treating every patient with dignity and deep human empathy." />
              <ValueCard icon={<Target size={32} />} title="Precision" body="Leveraging AI and robotic tech for exact diagnostics and surgery." />
              <ValueCard icon={<ShieldAlert size={32} />} title="Integrity" body="Maintaining total transparency in billing and medical ethics." />
              <ValueCard icon={<Activity size={32} />} title="Innovation" body="Constantly evolving our protocols for better health outcomes." />
           </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col items-center text-center gap-4 mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-hospital-primary tracking-tight capitalize">Leadership team</h2>
              <p className="text-lg text-hospital-muted">A synergy of experienced administrators and clinical experts dedicated to operational excellence.</p>
           </div>
           
           <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <LeadershipMember name="Dr. Amanullah Kazi" role="Director of Surgery" image="https://picsum.photos/seed/admin1/400/400" />
              <LeadershipMember name="Sarah Kazi" role="Head of Operations" image="https://picsum.photos/seed/admin2/400/400" />
              <LeadershipMember name="Capt. David Miller" role="Security & Logistics" image="https://picsum.photos/seed/admin3/400/400" />
           </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, body }: any) {
  return (
    <div className="group p-10 bg-white rounded-hospital shadow-hospital-sm hover:shadow-hospital-lg transition-all border border-hospital-slate/5 cursor-default">
       <div className="h-16 w-16 rounded-2xl bg-hospital-bg text-hospital-primary flex items-center justify-center mb-8 group-hover:bg-hospital-secondary group-hover:text-white transition-all duration-500 shadow-inner">
          {icon}
       </div>
       <h4 className="text-2xl font-bold font-serif text-hospital-primary mb-4">{title}</h4>
       <p className="text-sm text-hospital-muted leading-relaxed font-medium">{body}</p>
    </div>
  );
}

function LeadershipMember({ name, role, image }: any) {
  return (
    <div className="flex flex-col items-center text-center gap-6 group">
       <div className="relative h-64 w-64 rounded-full overflow-hidden border-4 border-hospital-bg p-2 group-hover:border-hospital-secondary transition-all duration-700">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-110" 
            referrerPolicy="no-referrer"
          />
       </div>
       <div className="flex flex-col gap-1">
          <h4 className="text-2xl font-bold font-serif text-hospital-primary">{name}</h4>
          <p className="text-[10px] uppercase font-bold tracking-widest text-hospital-secondary">{role}</p>
       </div>
    </div>
  );
}
