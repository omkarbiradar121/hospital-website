import { DEPARTMENTS } from '../constants.ts';
import { motion } from 'motion/react';
import { HeartPulse, Brain, Baby, Bone, Stethoscope, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ICON_MAP: any = {
  HeartPulse: <HeartPulse />,
  Brain: <Brain />,
  Bone: <Bone />,
  Baby: <Baby />,
  Stethoscope: <Stethoscope />,
};

export default function Departments() {
  return (
    <div className="min-h-screen bg-hospital-bg py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-6 mb-20 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-hospital-secondary/10 text-hospital-secondary text-xs font-bold tracking-[0.2em] uppercase">Clinical Excellence</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-hospital-primary leading-[1.1] tracking-tight">Specialized Departments</h1>
          <p className="text-lg text-hospital-muted leading-relaxed">Each of our departments is led by world-class specialists and equipped with dedicated infrastructure for comprehensive care.</p>
        </div>

        <div className="grid gap-1 bg-hospital-slate/5 rounded-hospital overflow-hidden shadow-2xl">
           {DEPARTMENTS.map((dept, index) => (
             <motion.div
               key={dept.id}
               initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="group flex flex-col md:flex-row items-center bg-white p-8 md:p-12 gap-12 hover:bg-hospital-primary hover:text-white transition-all duration-500 cursor-pointer"
             >
                <div className="h-20 w-20 flex-shrink-0 flex items-center justify-center rounded-hospital bg-hospital-bg text-hospital-secondary group-hover:bg-hospital-secondary group-hover:text-white transition-all duration-700 shadow-xl border border-hospital-slate/5">
                   <div className="scale-150">{ICON_MAP[dept.icon]}</div>
                </div>
                <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                   <h3 className="text-3xl md:text-4xl font-bold font-serif">{dept.name}</h3>
                   <p className="text-lg text-hospital-muted group-hover:text-hospital-bg/70 transition-colors leading-relaxed max-w-2xl">{dept.description}</p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
                   <Link to={`/doctors?spec=${dept.name}`} className="flex items-center gap-2 px-8 py-3 rounded-hospital bg-hospital-bg text-hospital-primary group-hover:bg-white group-hover:text-hospital-primary text-sm font-bold shadow-sm">
                      View Specialists <ArrowRight size={18} />
                   </Link>
                </div>
             </motion.div>
           ))}
        </div>
        
        {/* Support Section */}
        <div className="mt-24 grid gap-12 lg:grid-cols-3">
           <SupportBlock title="24/7 Diagnostics" body="Full laboratory and imaging support for all departments, day and night." />
           <SupportBlock title="Intensive Care" body="High-dependency units and ICUs with 1:1 patient-to-nurse ratios." />
           <SupportBlock title="Surgical Suites" body="State-of-the-art modular operation theaters for complex interventions." />
        </div>
      </div>
    </div>
  );
}

function SupportBlock({ title, body }: { title: string, body: string }) {
  return (
    <div className="p-10 bg-white rounded-hospital border border-hospital-slate/5 shadow-hospital-sm">
       <h4 className="text-xl font-bold font-serif text-hospital-primary mb-4">{title}</h4>
       <p className="text-sm text-hospital-muted leading-relaxed">{body}</p>
    </div>
  );
}
