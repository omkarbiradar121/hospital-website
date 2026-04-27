import { Link, useLocation } from 'react-router-dom';
import { Phone, HeartPulse, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils.ts';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { name: 'Home', href: '/home' },
  { name: 'About', href: '/about' },
  { name: 'Departments', href: '/departments' },
  { name: 'Doctors', href: '/doctors' },
  { name: 'Emergency', href: '/emergency' },
  { name: 'Lab Services', href: '/lab-services' },
  { name: 'Blog', href: '/blog' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hospital-border bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link to="/home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hospital-secondary text-white font-bold text-xl">
              K
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-hospital-primary leading-none uppercase">Kazi Hospital</span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-hospital-secondary">Excellence in Care</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-hospital-secondary",
                  location.pathname === link.href ? "text-hospital-secondary" : "text-hospital-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/login" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-hospital-secondary",
                location.pathname === "/login" ? "text-hospital-secondary" : "text-hospital-muted"
              )}
            >
              Portal
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/emergency" className="flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors mr-4 animate-pulse text-xs">
              <Phone size={14} />
              <span>EMERGENCY</span>
            </Link>
            <Link to="/doctors" className="rounded-full bg-hospital-secondary px-6 py-2.5 text-sm font-semibold text-white hover:bg-hospital-secondary/90 transition-all shadow-sm">
              Book Appointment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-hospital-bg border-b border-hospital-slate/10 px-4 py-8 flex flex-col gap-6"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors",
                  location.pathname === link.href ? "text-hospital-secondary" : "text-hospital-slate/70"
                )}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-hospital-slate/10" />
            <Link to="/portal" onClick={() => setIsOpen(false)} className="text-lg font-medium text-hospital-primary">Patient Portal</Link>
            <Link to="/doctors" onClick={() => setIsOpen(false)} className="w-full text-center rounded-hospital bg-hospital-primary px-6 py-4 text-white font-bold">
              Book Appointment
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
