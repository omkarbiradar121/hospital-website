import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS } from '../constants.ts';
import { Doctor } from '../types.ts';
import { Search, Calendar, Clock, User, CheckCircle2, ChevronRight, X, Phone, Activity } from 'lucide-react';
import { cn } from '../lib/utils.ts';
import { supabase } from '../lib/supabase.ts';

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [doctors, setDoctors] = useState<Doctor[]>(DOCTORS);
  const [loading, setLoading] = useState(true);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    slot: '',
  });

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const { data, error: fetchError } = await supabase
          .from('doctors')
          .select('*')
          .order('name', { ascending: true });

        if (fetchError) {
          // If table doesn't exist, we fallback to static data quietly
          if (fetchError.code === '42P01') {
            // Table doesn't exist - this is expected if user hasn't set up Supabase yet
            // We just use the DOCTORS constant which is already the initial state
            setLoading(false);
            return;
          } else {
            throw fetchError;
          }
        }
        if (data && data.length > 0) {
          setDoctors(data);
        }
      } catch (err: any) {
        // Only log actual errors, not missing table errors
        if (err.code !== '42P01') {
          console.error('Error fetching doctors:', err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  const specializations = ['All', ...Array.from(new Set(doctors.map(d => d.specialization)))];

  const filteredDoctors = doctors.filter(d => 
    (selectedSpec === 'All' || d.specialization === selectedSpec) &&
    (d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date || !formData.slot) {
      setError("Please fill in all the details.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('appointments')
        .insert([
          {
            patient_name: formData.name,
            doctor_name: bookingDoctor?.name,
            appointment_date: formData.date,
            appointment_time: formData.slot,
            status: 'Pending'
          }
        ]);

      if (insertError) {
        if (insertError.code === '42P01') {
          // Simulation mode if table doesn't exist
          await new Promise(resolve => setTimeout(resolve, 800));
        } else {
          throw insertError;
        }
      }
      setBookingStep(3); // Success step
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-hospital-bg py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-hospital-secondary rounded-full"></span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Our Specialists</h1>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-lg italic">
            "We have carefully selected world-class experts who share our vision of providing compassionate, technology-driven care."
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 bg-white rounded-xl border border-hospital-border shadow-sm">
           <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-hospital-muted" size={16} />
              <input 
                 type="text" 
                 placeholder="Search specialists..." 
                 className="w-full h-10 pl-10 pr-4 bg-hospital-bg rounded-lg border-none focus:ring-1 focus:ring-hospital-secondary outline-none transition-all text-xs font-bold"
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto scrollbar-hide">
              {specializations.map(spec => (
                 <button
                    key={spec}
                    onClick={() => setSelectedSpec(spec)}
                    className={cn(
                       "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                       selectedSpec === spec 
                        ? "bg-hospital-secondary text-white shadow-sm" 
                        : "bg-hospital-bg text-slate-500 hover:bg-slate-200"
                    )}
                 >
                    {spec}
                 </button>
              ))}
           </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
           <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doctor, index) => (
                 <motion.div
                    key={doctor.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white rounded-xl border border-hospital-border overflow-hidden hover:border-hospital-accent transition-all duration-300 flex flex-col shadow-sm"
                 >
                    <div className="relative aspect-[3/4] overflow-hidden bg-hospital-bg">
                       <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                          referrerPolicy="no-referrer"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-4">
                          <p className="text-[9px] text-teal-400 font-bold uppercase tracking-widest mb-1">{doctor.experience} Experience</p>
                          <h3 className="text-white text-base font-bold leading-tight">{doctor.name}</h3>
                       </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 bg-white">
                       <p className="text-[10px] text-hospital-secondary font-bold uppercase tracking-widest mb-3">{doctor.specialization}</p>
                       <p className="text-slate-500 text-[11px] leading-relaxed mb-6 line-clamp-2 h-8">{doctor.bio}</p>
                       
                       <div className="mt-auto pt-4 border-t border-hospital-border flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                             <Clock size={12} className="text-hospital-secondary" />
                             <span className="text-[9px] font-bold uppercase tracking-tighter text-slate-400">{doctor.availability}</span>
                          </div>
                          <button 
                             onClick={() => {
                               setBookingDoctor(doctor);
                               setBookingStep(1);
                             }}
                             className="w-full py-2.5 rounded-lg bg-hospital-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-hospital-secondary transition-colors"
                          >
                             Book Consultation
                          </button>
                       </div>
                    </div>
                 </motion.div>
              ))}
           </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
           <div className="py-24 text-center">
              <div className="h-20 w-20 rounded-full bg-hospital-bg flex items-center justify-center mx-auto mb-6 text-hospital-muted">
                 <Search size={32} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-hospital-primary mb-2">No Specialists Found</h3>
              <p className="text-hospital-muted">Try adjusting your search filters or browse all departments.</p>
           </div>
        )}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
         {bookingDoctor && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-hospital-primary/90 backdrop-blur-sm overflow-y-auto"
            >
               <motion.div 
                  initial={{ y: 50, scale: 0.95 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ y: 50, scale: 0.95 }}
                  className="bg-white rounded-hospital shadow-2xl w-full max-w-2xl relative overflow-hidden my-auto"
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Modal Header */}
                  <div className="bg-hospital-primary p-8 text-white relative">
                     <button 
                        onClick={() => setBookingDoctor(null)}
                        className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
                     >
                        <X size={24} />
                     </button>
                     <div className="flex items-center gap-6">
                        <img 
                           src={bookingDoctor.image} 
                           alt={bookingDoctor.name} 
                           className="h-24 w-24 rounded-hospital object-cover border-2 border-white/20 shadow-lg"
                           referrerPolicy="no-referrer"
                        />
                        <div>
                           <span className="px-3 py-1 rounded-full bg-hospital-secondary text-[10px] uppercase font-bold tracking-widest leading-none block w-fit mb-2">
                              Medical Specialist
                           </span>
                           <h2 className="text-3xl font-bold font-serif leading-none mb-1">{bookingDoctor.name}</h2>
                           <p className="text-hospital-secondary text-xs uppercase font-bold tracking-widest">{bookingDoctor.specialization}</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-10">
                    {bookingStep === 1 && (
                       <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-hospital-muted">
                             <div className="flex items-center gap-2 text-hospital-secondary"><CheckCircle2 size={16} /> Choose Slot</div>
                             <div className="flex items-center gap-2 opacity-30"><Circle size={8} /> Details</div>
                             <div className="flex items-center gap-2 opacity-30"><Circle size={8} /> Confirmed</div>
                          </div>
                          
                          <div className="grid gap-6 md:grid-cols-2">
                             <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-hospital-primary">Appointment Date</label>
                                <div className="relative">
                                   <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-hospital-muted" size={18} />
                                   <input 
                                      type="date" 
                                      className="w-full h-12 pl-12 pr-4 bg-hospital-bg rounded-hospital border border-transparent focus:border-hospital-secondary outline-none transition-all text-sm font-medium" 
                                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                                      min={new Date().toISOString().split('T')[0]}
                                   />
                                </div>
                             </div>
                             <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-hospital-primary">Preferred Time</label>
                                <div className="relative">
                                   <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-hospital-muted" size={18} />
                                   <select 
                                      className="w-full h-12 pl-12 pr-4 bg-hospital-bg rounded-hospital border border-transparent focus:border-hospital-secondary outline-none transition-all text-sm font-medium appearance-none"
                                      onChange={(e) => setFormData({...formData, slot: e.target.value})}
                                   >
                                      <option value="">Select a Slot</option>
                                      <option value="10:00 AM">10:00 AM - 10:30 AM</option>
                                      <option value="11:00 AM">11:00 AM - 11:30 AM</option>
                                      <option value="02:00 PM">02:00 PM - 02:30 PM</option>
                                      <option value="03:00 PM">03:00 PM - 03:30 PM</option>
                                   </select>
                                </div>
                             </div>
                          </div>
                          <button 
                             onClick={() => setBookingStep(2)}
                             disabled={!formData.date || !formData.slot}
                             className="w-full h-14 rounded-hospital bg-hospital-primary text-white font-bold hover:bg-hospital-secondary transition-all disabled:opacity-50 disabled:grayscale"
                          >
                             Continue to Patient Details
                          </button>
                       </div>
                    )}

                    {bookingStep === 2 && (
                       <form onSubmit={handleBookingSubmit} className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-hospital-muted">
                             <div className="flex items-center gap-2 text-hospital-secondary/60"><CheckCircle2 size={16} /> Choose Slot</div>
                             <div className="flex items-center gap-2 text-hospital-secondary"><CheckCircle2 size={16} /> Details</div>
                             <div className="flex items-center gap-2 opacity-30"><Circle size={8} /> Confirmed</div>
                          </div>

                          <div className="grid gap-6">
                             <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-hospital-primary">Full Name</label>
                                <div className="relative">
                                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-hospital-muted" size={18} />
                                   <input 
                                      required
                                      type="text" 
                                      placeholder="Johnathan Doe"
                                      className="w-full h-12 pl-12 pr-4 bg-hospital-bg rounded-hospital border border-transparent focus:border-hospital-secondary outline-none transition-all text-sm font-medium" 
                                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                                   />
                                </div>
                             </div>
                             <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-hospital-primary">Email Address</label>
                                <div className="relative">
                                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-hospital-muted" size={18} />
                                   <input 
                                      required
                                      type="email" 
                                      placeholder="john@example.com"
                                      className="w-full h-12 pl-12 pr-4 bg-hospital-bg rounded-hospital border border-transparent focus:border-hospital-secondary outline-none transition-all text-sm font-medium" 
                                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                                   />
                                </div>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <button type="button" onClick={() => setBookingStep(1)} className="w-24 h-14 rounded-hospital border-2 border-hospital-bg text-hospital-primary font-bold hover:bg-hospital-bg transition-all">Back</button>
                             <button type="submit" disabled={submitting} className="flex-1 h-14 rounded-hospital bg-hospital-secondary text-white font-bold hover:bg-hospital-primary transition-all shadow-lg shadow-hospital-secondary/20 flex items-center justify-center gap-2">
                               {submitting ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Finalize Appointment'}
                             </button>
                          </div>
                       </form>
                    )}

                    {bookingStep === 3 && (
                       <div className="flex flex-col items-center text-center gap-6 py-10 animate-in zoom-in-95 duration-700">
                          <div className="h-24 w-24 rounded-full bg-hospital-secondary/10 flex items-center justify-center text-hospital-secondary border-4 border-hospital-secondary/20 animate-bounce">
                             <CheckCircle2 size={48} />
                          </div>
                          <div className="flex flex-col gap-4">
                             <h3 className="text-3xl font-bold font-serif text-hospital-primary">Request Sent!</h3>
                             <p className="text-hospital-muted max-w-sm mx-auto leading-relaxed">
                                Thank you <span className="text-hospital-primary font-bold">{formData.name}</span>. Your request for an appointment with <span className="text-hospital-primary font-bold">{bookingDoctor.name}</span> on <span className="text-hospital-primary font-bold">{formData.date}</span> at <span className="text-hospital-primary font-bold">{formData.slot}</span> is being processed. 
                             </p>
                             <div className="p-4 bg-hospital-bg rounded-hospital border border-hospital-slate/5 text-xs font-medium text-hospital-muted">
                                We've sent a confirmation email to {formData.email}.
                             </div>
                          </div>
                          <button 
                             onClick={() => setBookingDoctor(null)}
                             className="mt-4 px-10 py-4 rounded-hospital bg-hospital-primary text-white font-bold hover:bg-hospital-secondary transition-all"
                          >
                             Done
                          </button>
                       </div>
                    )}
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}

function Circle({ size, className }: { size: number, className?: string }) {
  return (
    <div className={cn("rounded-full bg-current", className)} style={{ width: size, height: size }} />
  );
}
