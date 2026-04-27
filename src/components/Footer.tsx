import { Link } from 'react-router-dom';
import { HeartPulse, Linkedin, Twitter, Facebook, Instagram, Send, Mail, MapPin, PhoneCall } from 'lucide-react';
import { cn } from '../lib/utils.ts';

export function Footer() {
  return (
    <footer className="bg-white border-t border-hospital-border px-8 py-10 text-hospital-muted">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest leading-none">
            <span className="text-hospital-slate">© 2026 Kazi Hospital</span>
            <Link to="#" className="hover:text-hospital-secondary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-hospital-secondary transition-colors">Medical Ethics</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <input 
                type="email" 
                placeholder="Hospital Newsletter" 
                className="bg-hospital-bg border-none text-[10px] py-2 px-4 rounded-full w-40 font-bold focus:ring-1 focus:ring-hospital-secondary outline-none"
              />
              <button className="bg-hospital-primary text-white text-[10px] px-4 py-2 rounded-full font-bold hover:bg-hospital-secondary transition-colors">
                JOIN
              </button>
            </div>
            <div className="hidden md:block h-4 w-[1px] bg-hospital-border"></div>
            <span className="hidden md:block text-[10px] font-black text-hospital-border tracking-tighter uppercase italic">Secure Payment Hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
