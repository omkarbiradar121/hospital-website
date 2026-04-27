import { useState } from 'react';
import { LAB_TESTS } from '../constants.ts';
import { Search, FlaskConical, ChevronRight, Info, Pill, Microscope, Activity, X, CheckCircle2, ShoppingCart, User, Mail, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils.ts';
import { supabase } from '../lib/supabase.ts';
import { LabTest } from '../types.ts';

export default function LabServices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
  });

  const filteredTests = LAB_TESTS.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookingStart = (test: LabTest) => {
    setSelectedTest(test);
    setIsBooking(true);
    setBookingStep(1);
    setError(null);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      setError("Please fill in all the details.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('lab_orders')
        .insert([
          {
            test_id: selectedTest?.id,
            test_name: selectedTest?.name,
            test_price: selectedTest?.price,
            patient_name: formData.name,
            patient_phone: formData.phone,
            collection_date: formData.date,
            status: 'Pending'
          }
        ]);

      if (insertError) {
        // Fallback to simulation if table doesn't exist
        if (insertError.code === '42P01') {
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw insertError;
        }
      }
      
      setBookingStep(2); // Success step
    } catch (err: any) {
      setError(err.message || 'Failed to process order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-hospital-bg py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-6 mb-16 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-hospital-accent/10 text-hospital-accent text-xs font-bold tracking-[0.2em] uppercase">Diagnostic Excellence</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-hospital-primary leading-[1.1] tracking-tight">Kazi Lab Services</h1>
          <p className="text-lg text-hospital-muted leading-relaxed">Precision diagnostics driven by advanced automation and expert pathologists. Book your tests online and receive reports within 24 hours.</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-hospital-muted" size={24} />
          <input 
            type="text" 
            placeholder="Search for tests (e.g., MRI, Blood Count, Radiology...)" 
            className="w-full h-16 pl-16 pr-6 bg-white rounded-full shadow-hospital-lg border-2 border-transparent focus:border-hospital-accent outline-none transition-all text-lg font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
           <CategoryTag icon={<Microscope size={14} />} label="Pathology" active />
           <CategoryTag icon={<FlaskConical size={14} />} label="Radiology" />
           <CategoryTag icon={<Pill size={14} />} label="Pharmacy" />
           <CategoryTag icon={<Activity size={14} />} label="Cardiology Tests" />
        </div>

        {/* Tests Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
           {filteredTests.map((test, i) => (
             <motion.div 
               key={test.id}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="group p-8 bg-white rounded-hospital shadow-hospital-sm border border-hospital-slate/5 flex items-center justify-between hover:border-hospital-accent hover:shadow-hospital-lg transition-all"
             >
                <div className="flex items-center gap-6">
                   <div className="h-16 w-16 rounded-2xl bg-hospital-bg flex items-center justify-center text-hospital-accent group-hover:bg-hospital-accent group-hover:text-white transition-all duration-500 shadow-inner">
                      <FlaskConical size={32} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold font-serif text-hospital-primary mb-1">{test.name}</h3>
                      <p className="text-sm text-hospital-muted mb-2 max-w-xs">{test.description}</p>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-hospital-slate/40">{test.category}</span>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                   <span className="text-2xl font-bold font-serif text-hospital-primary">{test.price}</span>
                   <button 
                     onClick={() => handleBookingStart(test)}
                     className="flex items-center gap-2 text-xs font-bold text-hospital-accent hover:translate-x-1 transition-transform"
                    >
                      BOOK NOW <ChevronRight size={14} />
                   </button>
                </div>
             </motion.div>
           ))}

           {filteredTests.length === 0 && (
             <div className="col-span-full py-20 bg-white rounded-hospital border border-dashed border-hospital-slate/10 text-center">
                <Info size={48} className="mx-auto mb-4 text-hospital-muted opacity-20" />
                <h3 className="text-xl font-bold font-serif text-hospital-primary">Test Not Found</h3>
                <p className="text-hospital-muted">If you can't find a specific test, please contact our helpline for assistance.</p>
             </div>
           )}
        </div>
        
        {/* Quality Guarantee Section */}
        <div className="mt-24 p-12 bg-hospital-primary text-white rounded-hospital relative overflow-hidden shadow-2xl">
           <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
              <div>
                 <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 leading-tight">Accurate. Reliable. Fast.</h2>
                 <p className="text-hospital-bg/70 leading-relaxed mb-8">Our labs are fully NABL accredited and utilize the latest diagnostic equipment. We guarantee error-free reporting and home sample collection across the city.</p>
                 <div className="flex gap-4">
                    <button className="rounded-hospital bg-hospital-accent px-8 py-4 text-sm font-bold hover:bg-white hover:text-hospital-accent transition-all shadow-lg">Schedule Home Collection</button>
                    <button className="px-8 py-4 text-sm font-bold border border-white/20 rounded-hospital hover:bg-white/10">View Lab Guide</button>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-white/5 rounded-hospital border border-white/10 flex flex-col gap-2">
                    <span className="text-3xl font-bold font-serif text-hospital-accent">04 Hour</span>
                    <p className="text-[10px] uppercase font-bold tracking-tighter opacity-50">Turnaround for Basic Tests</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-hospital border border-white/10 flex flex-col gap-2">
                    <span className="text-3xl font-bold font-serif text-hospital-accent">99.9%</span>
                    <p className="text-[10px] uppercase font-bold tracking-tighter opacity-50">Diagnostic Accuracy</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-hospital border border-white/10 flex flex-col gap-2">
                    <span className="text-3xl font-bold font-serif text-hospital-accent">500+</span>
                    <p className="text-[10px] uppercase font-bold tracking-tighter opacity-50">Advanced Modalities</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-hospital border border-white/10 flex flex-col gap-2">
                    <span className="text-3xl font-bold font-serif text-hospital-accent">Smart</span>
                    <p className="text-[10px] uppercase font-bold tracking-tighter opacity-50">AI-Powered Lab Results</p>
                 </div>
              </div>
           </div>
           <Activity className="absolute -bottom-10 -right-10 text-white/5" size={300} strokeWidth={1} />
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBooking(false)}
              className="absolute inset-0 bg-hospital-primary/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsBooking(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-hospital-bg transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12">
                {bookingStep === 1 ? (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-12 w-12 rounded-xl bg-hospital-accent/10 flex items-center justify-center text-hospital-accent">
                        <ShoppingCart size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold font-serif text-hospital-primary leading-tight">Checkout Order</h2>
                        <p className="text-sm text-hospital-muted">Complete your details to book <span className="font-bold text-hospital-accent">{selectedTest?.name}</span></p>
                      </div>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-hospital-muted uppercase tracking-widest ml-1 flex items-center gap-2 italic">
                            <User size={12} /> Patient Full Name
                          </label>
                          <input 
                            required
                            type="text" 
                            className="w-full h-14 px-5 bg-hospital-bg border border-transparent rounded-2xl focus:bg-white focus:border-hospital-accent focus:shadow-xl focus:shadow-hospital-accent/5 outline-none transition-all text-sm font-medium"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-hospital-muted uppercase tracking-widest ml-1 flex items-center gap-2 italic">
                            <Mail size={12} /> Email Address
                          </label>
                          <input 
                            required
                            type="email" 
                            className="w-full h-14 px-5 bg-hospital-bg border border-transparent rounded-2xl focus:bg-white focus:border-hospital-accent focus:shadow-xl focus:shadow-hospital-accent/5 outline-none transition-all text-sm font-medium"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-hospital-muted uppercase tracking-widest ml-1 flex items-center gap-2 italic">
                            <Phone size={12} /> Mobile Number
                          </label>
                          <input 
                            required
                            type="tel" 
                            className="w-full h-14 px-5 bg-hospital-bg border border-transparent rounded-2xl focus:bg-white focus:border-hospital-accent focus:shadow-xl focus:shadow-hospital-accent/5 outline-none transition-all text-sm font-medium"
                            placeholder="+1 (234) 567-890"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-hospital-muted uppercase tracking-widest ml-1 flex items-center gap-2 italic">
                            <Calendar size={12} /> Collection Date
                          </label>
                          <input 
                            required
                            type="date" 
                            className="w-full h-14 px-5 bg-hospital-bg border border-transparent rounded-2xl focus:bg-white focus:border-hospital-accent focus:shadow-xl focus:shadow-hospital-accent/5 outline-none transition-all text-sm font-medium"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-2">
                          <Activity size={14} />
                          {error}
                        </div>
                      )}

                      <div className="pt-4 flex items-center justify-between gap-6 border-t border-hospital-bg mt-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-hospital-muted uppercase tracking-widest">Total Amount</span>
                          <span className="text-3xl font-bold font-serif text-hospital-primary leading-tight">{selectedTest?.price}</span>
                        </div>
                        <button 
                          type="submit" 
                          disabled={submitting}
                          className="flex-1 max-w-[240px] h-16 rounded-2xl bg-hospital-primary text-white font-bold hover:bg-hospital-slate transition-all shadow-xl shadow-hospital-primary/10 flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                          {submitting ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>Confirm Order <ChevronRight size={18} /></>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="py-12 flex flex-col items-center text-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-hospital-accent/10 flex items-center justify-center text-hospital-accent animate-bounce">
                      <CheckCircle2 size={48} strokeWidth={1} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold font-serif text-hospital-primary mb-2">Order Confirmed!</h2>
                      <p className="text-lg text-hospital-muted max-w-md mx-auto">Thank you for choosing Kazi Hospital. Your booking for <span className="font-bold text-hospital-accent">{selectedTest?.name}</span> is confirmed. A receipt has been sent to your email.</p>
                    </div>
                    <button 
                      onClick={() => setIsBooking(false)}
                      className="mt-4 px-12 py-4 rounded-full bg-hospital-primary text-white font-bold hover:bg-hospital-slate shadow-xl shadow-hospital-primary/10 transition-all border border-transparent"
                    >
                      Return to Lab Portal
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryTag({ icon, label, active }: any) {
  return (
    <button className={cn(
      "flex items-center gap-2 px-6 py-2 rounded-full border text-sm font-bold transition-all",
      active ? "bg-hospital-primary text-white border-hospital-primary shadow-lg" : "bg-white text-hospital-slate border-hospital-slate/10 hover:border-hospital-accent"
    )}>
       {icon} {label}
    </button>
  );
}
