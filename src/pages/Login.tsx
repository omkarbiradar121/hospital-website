import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, Hospital, ShieldCheck, Mail, LogIn, Stethoscope, Activity, Pill, Microscope, Thermometer } from 'lucide-react';
import { supabase } from '../lib/supabase.ts';
import { cn } from '../lib/utils.ts';
import { useNavigate } from 'react-router-dom';

const FloatingIcon = ({ children, delay = 0, x = 0, y = 0, duration = 10 }: any) => (
  <motion.div
    initial={{ x, y, opacity: 0 }}
    animate={{ 
      x: [x, x + 20, x - 20, x],
      y: [y, y - 30, y + 10, y],
      opacity: [0.1, 0.4, 0.2, 0.1]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="absolute text-white pointer-events-none"
  >
    {children}
  </motion.div>
);

export default function Login() {
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        navigate('/portal');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white overflow-hidden font-sans">
      {/* Left Side: Visual & Quote */}
      <div className={cn(
        "hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden transition-all duration-1000",
        role === 'patient' 
          ? "bg-gradient-to-br from-[#0f172a] via-[#115e59] to-[#0d9488]" 
          : "bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1e40af]"
      )}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingIcon x={100} y={150} delay={0} duration={12}><Stethoscope size={40} strokeWidth={1} /></FloatingIcon>
          <FloatingIcon x={400} y={200} delay={2} duration={15}><Pill size={32} strokeWidth={1} /></FloatingIcon>
          <FloatingIcon x={200} y={500} delay={1} duration={18}><Microscope size={48} strokeWidth={1} /></FloatingIcon>
          <FloatingIcon x={500} y={600} delay={4} duration={14}><Thermometer size={36} strokeWidth={1} /></FloatingIcon>
          <FloatingIcon x={50} y={700} delay={3} duration={16}><Activity size={44} strokeWidth={1} /></FloatingIcon>
          <FloatingIcon x={450} y={50} delay={5} duration={13}><Activity size={28} strokeWidth={1} /></FloatingIcon>
        </div>

        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[120px]" 
        />
        
        {/* Logo and Brand */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate('/home')}
        >
          <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-2xl flex items-center justify-center border border-white/20 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/20">
            <Hospital className="text-white" size={32} />
          </div>
          <div>
            <span className="text-4xl font-bold bg-gradient-to-r from-white via-white to-teal-200 bg-clip-text text-transparent font-serif tracking-tighter">KAZI HOSPITAL</span>
            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-teal-400 to-transparent rounded-full transition-all duration-700 mt-1" />
          </div>
        </motion.div>

        {/* Central Visual */}
        <div className="relative z-20 flex flex-col items-center justify-center flex-1 py-12">
           <AnimatePresence mode="wait">
             <motion.div
               key={role}
               initial={{ opacity: 0, scale: 0.5, rotate: -20, filter: 'blur(10px)' }}
               animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, scale: 1.5, rotate: 20, filter: 'blur(10px)' }}
               transition={{ type: "spring", stiffness: 80, damping: 20 }}
               className="relative"
             >
                <div className="w-64 h-64 bg-white/5 backdrop-blur-lg rounded-[3rem] flex items-center justify-center border border-white/10 shadow-[0_0_80px_rgba(20,184,166,0.15)] relative overflow-hidden group">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent opacity-20" 
                  />
                  {role === 'patient' ? (
                    <User size={120} className="text-teal-400 opacity-90 drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]" strokeWidth={0.5} />
                  ) : (
                    <ShieldCheck size={120} className="text-blue-400 opacity-90 drop-shadow-[0_0_20px_rgba(96,165,250,0.5)]" strokeWidth={0.5} />
                  )}
                </div>
                {/* Orbital elements */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border border-white/5 rounded-full pointer-events-none"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-16 border border-white/5 rounded-full pointer-events-none"
                />
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Quote Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-xl"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-10 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full" 
          />
          <h2 className="text-6xl font-serif text-white leading-[1.1] font-medium mb-8 tracking-tight drop-shadow-lg">
            Dedicated to the <br />
            <span className="text-teal-400 italic font-normal">Spirit of Healing</span>
          </h2>
          <div className="flex items-center gap-6">
            <div className="h-px w-12 bg-white/30" />
            <p className="text-teal-100 font-medium tracking-[0.4em] text-sm uppercase opacity-70">
              Madiha Kazi
            </p>
          </div>
        </motion.div>

        {/* Quality Badges */}
        <div className="relative z-20 flex gap-8 text-white/20 text-[10px] font-black tracking-[0.3em] uppercase mt-12 mb-4">
          <span className="hover:text-teal-400 transition-colors cursor-default duration-300">ISO 9001:2015</span>
          <span className="opacity-30">/</span>
          <span className="hover:text-teal-400 transition-colors cursor-default duration-300">NABL Accredited</span>
          <span className="opacity-30">/</span>
          <span className="hover:text-teal-400 transition-colors cursor-default duration-300">JCI Verified</span>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 bg-[#f8fafc] relative">
        <div className="w-full max-w-md relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h1 className="text-5xl font-serif font-bold text-hospital-primary mb-5 tracking-tight">Kazi Portal</h1>
            <p className="text-hospital-muted leading-relaxed text-base font-medium">Please enter your credentials to access the secure hospital network.</p>
          </motion.div>

          {/* Role Selection Switch */}
          <div className="bg-slate-200/50 p-1.5 rounded-2xl flex relative mb-12 border border-slate-200/80 shadow-inner group">
            <motion.div
              className={cn(
                "absolute h-[calc(100%-12px)] rounded-xl shadow-xl shadow-slate-900/5 top-1.5 z-0 transition-colors duration-500",
                role === 'patient' ? "bg-teal-600" : "bg-blue-700"
              )}
              initial={false}
              animate={{ 
                width: 'calc(50% - 6px)',
                x: role === 'patient' ? 6 : 'calc(100% + 0px)'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
            <button 
              type="button"
              onClick={() => setRole('patient')}
              className={cn(
                "flex-1 py-4 px-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 relative z-10 transition-all duration-300",
                role === 'patient' ? "text-white" : "text-hospital-muted/60 hover:text-hospital-primary"
              )}
            >
              <User size={16} className={role === 'patient' ? "animate-pulse" : ""} />
              Patient
            </button>
            <button 
              type="button"
              onClick={() => setRole('doctor')}
              className={cn(
                "flex-1 py-4 px-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 relative z-10 transition-all duration-300",
                role === 'doctor' ? "text-white" : "text-hospital-muted/60 hover:text-hospital-primary"
              )}
            >
              <ShieldCheck size={16} className={role === 'doctor' ? "animate-pulse" : ""} />
              Doctor
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <label className="text-[10px] font-black text-hospital-muted uppercase tracking-[0.2em] ml-2">Medical ID / Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-hospital-muted/30 group-focus-within:text-teal-600 transition-colors duration-500">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hospital-id@kazi.org"
                  className="w-full bg-white border-2 border-slate-100 rounded-[1.25rem] py-5 pl-14 pr-6 text-sm font-semibold outline-none shadow-sm focus:shadow-xl focus:shadow-teal-900/5 focus:border-teal-600/30 transition-all duration-500 placeholder:text-slate-300"
                  required
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between ml-2">
                <label className="text-[10px] font-black text-hospital-muted uppercase tracking-[0.2em]">Password</label>
                <button type="button" className="text-[10px] font-black text-teal-600 hover:text-teal-800 underline-offset-8 hover:underline transition-all tracking-widest">Forgot Password?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-hospital-muted/30 group-focus-within:text-teal-600 transition-colors duration-500">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border-2 border-slate-100 rounded-[1.25rem] py-5 pl-14 pr-6 text-sm font-semibold outline-none shadow-sm focus:shadow-xl focus:shadow-teal-900/5 focus:border-teal-600/30 transition-all duration-500 placeholder:text-slate-300"
                  required
                />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-4 shadow-sm"
                >
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <Activity size={16} />
                  </div>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <button 
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full rounded-[1.25rem] py-6 font-black text-[12px] uppercase tracking-[0.25em] shadow-2xl transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50 group overflow-hidden relative",
                  role === 'patient' 
                    ? "bg-teal-600 text-white hover:bg-teal-700 shadow-teal-900/20" 
                    : "bg-blue-700 text-white hover:bg-blue-800 shadow-blue-900/20"
                )}
              >
                {loading ? (
                  <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
                    Secure Login to Portal
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
              </button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-20 pt-10 border-t border-slate-200 text-center"
          >
            <p className="text-[10px] text-hospital-muted/60 font-bold uppercase tracking-[0.25em] leading-loose">
              Enterprise Grade Security 256-AES <br />
              <button className="text-teal-600 font-black hover:text-teal-800 mt-3 hover:underline underline-offset-4 transition-all duration-300">Kazi IT Registration Control</button>
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
          <Hospital size={400} strokeWidth={0.5} />
        </div>
      </div>
    </div>
  );
}
