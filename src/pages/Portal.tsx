import { motion } from 'motion/react';
import { User, Calendar, FileText, CreditCard, Bell, LogOut, ChevronRight, Download, Clock, Activity, Settings, ShoppingCart, FlaskConical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils.ts';
import { supabase } from '../lib/supabase.ts';
import { useNavigate } from 'react-router-dom';

export default function Portal() {
  const [activeTab, setActiveTab] = useState('overview');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [labOrders, setLabOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      } else {
        setSession(session);
        fetchUserData(session.user.email);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        setSession(session);
        fetchUserData(session?.user?.email);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (email: string | undefined) => {
    if (!email) return;

    try {
      // Fetch Appointments
      const { data: appData, error: appError } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: false });

      if (!appError && appData) {
        // Filter in JS as a fallback if no email column exists
        const filteredApps = appData.filter((app: any) => 
          app.patient_name?.toLowerCase().includes(email.split('@')[0].toLowerCase()) ||
          app.email === email ||
          app.patient_email === email
        );
        setAppointments(filteredApps);
      } else if (appError && appError.code !== '42P01') {
        console.error('Error fetching appointments:', appError.message);
      }

      // Fetch Lab Orders
      const { data: labData, error: labError } = await supabase
        .from('lab_orders')
        .select('*')
        .order('collection_date', { ascending: false });

      if (!labError && labData) {
        const filteredLabs = labData.filter((lab: any) => 
          lab.patient_name?.toLowerCase().includes(email.split('@')[0].toLowerCase()) ||
          lab.email === email ||
          lab.patient_email === email
        );
        setLabOrders(filteredLabs);
      } else if (labError && labError.code !== '42P01') {
        console.error('Error fetching lab orders:', labError.message);
      }
    } catch (err: any) {
      if (err.code !== '42P01') {
        console.error('Error fetching portal data:', err);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hospital-bg flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-hospital-secondary/30 border-t-hospital-secondary rounded-full animate-spin" />
      </div>
    );
  }

  const reports = [
    { id: '1', name: 'Blood Test Report (CBC)', date: '2026-04-18', size: '1.2 MB' },
    { id: '2', name: 'Chest X-Ray Imaging', date: '2026-04-15', size: '15.4 MB' },
    { id: '3', name: 'Full Body Health Summary', date: '2026-01-10', size: '2.8 MB' },
  ];

  return (
    <div className="min-h-screen bg-hospital-bg pt-20 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar */}
           <aside className="w-full lg:w-80 flex flex-col gap-4">
              <div className="p-8 bg-hospital-primary rounded-hospital text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <div className="h-16 w-16 rounded-full bg-hospital-secondary text-white flex items-center justify-center mb-4 text-2xl font-bold border-2 border-white/20">
                       {session?.user?.email?.[0].toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold font-serif mb-1 uppercase tracking-tight">
                        {session?.user?.email?.split('@')[0]}
                    </h3>
                    <p className="text-xs text-hospital-bg/50 font-bold tracking-widest uppercase">Patient ID: KH-{Math.floor(Math.random() * 90000) + 10000}</p>
                 </div>
                 <Activity className="absolute -bottom-4 -right-4 text-white/5" size={140} />
              </div>

              <nav className="p-4 bg-white rounded-hospital shadow-hospital-sm border border-hospital-slate/5 flex flex-col gap-2">
                 <SidebarItem active={activeTab === 'overview'} icon={<Activity size={20} />} label="Overview" onClick={() => setActiveTab('overview')} />
                 <SidebarItem active={activeTab === 'appointments'} icon={<Calendar size={20} />} label="Appointments" onClick={() => setActiveTab('appointments')} />
                 <SidebarItem active={activeTab === 'lab-orders'} icon={<ShoppingCart size={20} />} label="Lab Orders" onClick={() => setActiveTab('lab-orders')} />
                 <SidebarItem active={activeTab === 'reports'} icon={<FileText size={20} />} label="Medical Reports" onClick={() => setActiveTab('reports')} />
                 <SidebarItem active={activeTab === 'billing'} icon={<CreditCard size={20} />} label="Billing History" onClick={() => setActiveTab('billing')} />
                 <div className="my-2 border-t border-hospital-slate/5" />
                 <SidebarItem active={false} icon={<Settings size={20} />} label="Settings" onClick={() => {}} />
                 <SidebarItem active={false} icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} className="text-red-500 hover:bg-red-50" />
              </nav>

              <div className="p-6 bg-hospital-secondary text-white rounded-hospital">
                 <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                    <Bell size={16} /> Hospital Alert
                 </h4>
                 <p className="text-xs leading-relaxed opacity-90">Your medical summary for the month of March is now available for download.</p>
              </div>
           </aside>

           {/* Main Content */}
           <main className="flex-1 flex flex-col gap-8">
              {activeTab === 'overview' && (
                 <div className="grid gap-8 animate-in fade-in duration-500">
                    {/* Welcome */}
                    <div className="flex flex-col gap-2">
                       <h2 className="text-3xl font-bold font-serif text-hospital-primary">Welcome back, {session?.user?.email?.split('@')[0]}</h2>
                       <p className="text-hospital-muted">Here's a quick look at your recent health activities and upcoming visits.</p>
                    </div>

                    {/* Stats */}
                    <div className="grid gap-4 sm:grid-cols-3">
                       <StatCard value={appointments.length.toString()} label="Total" subtext="Appointments" icon={<Calendar className="text-hospital-secondary" />} />
                       <StatCard value={labOrders.length.toString()} label="Active" subtext="Lab Orders" icon={<ShoppingCart className="text-hospital-accent" />} />
                       <StatCard value="$0.00" label="Total" subtext="Paid Billing" icon={<CreditCard className="text-hospital-primary" />} />
                    </div>

                    {/* Latest Appointments */}
                    <div className="bg-white rounded-2xl shadow-sm border border-hospital-border overflow-hidden">
                       <div className="p-6 border-b border-hospital-border flex items-center justify-between">
                          <h4 className="font-bold text-slate-800 uppercase tracking-widest text-[10px]">Recent Appointments</h4>
                          <button onClick={() => setActiveTab('appointments')} className="text-[10px] font-bold text-hospital-secondary flex items-center gap-1 hover:underline">
                             VIEW ALL <ChevronRight size={12} />
                          </button>
                       </div>
                       <div className="p-4 flex flex-col gap-3">
                          {appointments.length > 0 ? appointments.slice(0, 3).map(app => (
                             <div key={app.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between hover:border-hospital-secondary/30 transition-all">
                                <div>
                                   <p className="text-[10px] text-slate-500 font-semibold mb-1 uppercase">Consultation</p>
                                   <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-slate-900">{app.doctor_name || 'General Physician'}</span>
                                      <span className="text-[10px] text-teal-600 bg-white px-2 py-0.5 rounded border border-teal-100 font-bold">{app.status}</span>
                                   </div>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                   <span className="text-xs font-bold text-slate-900">{app.appointment_date}</span>
                                   <span className="text-[10px] text-slate-500 font-medium">{app.appointment_time}</span>
                                </div>
                             </div>
                          )) : (
                            <p className="text-center py-6 text-sm text-hospital-muted italic uppercase tracking-widest font-bold">No recent appointments found</p>
                          )}
                       </div>
                    </div>
                 </div>
              )}

              {activeTab === 'appointments' && (
                <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex flex-col gap-2">
                       <h2 className="text-3xl font-bold font-serif text-hospital-primary">Your Appointments</h2>
                       <p className="text-hospital-muted">Manage and track your upcoming and past doctor visits.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {appointments.length > 0 ? appointments.map(app => (
                            <div key={app.id} className="p-6 bg-white rounded-2xl border border-hospital-border shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 rounded-full bg-hospital-bg flex items-center justify-center text-hospital-accent">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-hospital-primary">{app.doctor_name || 'Specialist'}</h4>
                                        <div className="flex items-center gap-4 text-xs text-hospital-muted font-bold uppercase tracking-widest mt-1">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {app.appointment_date}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {app.appointment_time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className="px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-widest border border-teal-100">{app.status}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-hospital-border">
                                <Calendar size={48} className="mx-auto mb-4 text-hospital-muted opacity-20" />
                                <h3 className="text-xl font-bold font-serif text-hospital-primary">No Appointments Yet</h3>
                                <p className="text-hospital-muted">You haven't booked any medical consultations yet.</p>
                            </div>
                        )}
                    </div>
                </div>
              )}

              {activeTab === 'lab-orders' && (
                <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex flex-col gap-2">
                       <h2 className="text-3xl font-bold font-serif text-hospital-primary">Lab Orders</h2>
                       <p className="text-hospital-muted">Track your diagnostic test bookings and sample collections.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {labOrders.length > 0 ? labOrders.map(order => (
                            <div key={order.id} className="p-6 bg-white rounded-2xl border border-hospital-border shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 rounded-full bg-hospital-accent/5 flex items-center justify-center text-hospital-accent">
                                        <FlaskConical size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-hospital-primary">{order.test_name}</h4>
                                        <div className="flex items-center gap-4 text-xs text-hospital-muted font-bold uppercase tracking-widest mt-1">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {order.collection_date}</span>
                                            <span className="font-bold text-hospital-accent font-serif tracking-normal lowercase italic">{order.test_price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">{order.status}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-hospital-border">
                                <FlaskConical size={48} className="mx-auto mb-4 text-hospital-muted opacity-20" />
                                <h3 className="text-xl font-bold font-serif text-hospital-primary">No Lab Orders</h3>
                                <p className="text-hospital-muted">You haven't booked any diagnostic tests yet.</p>
                            </div>
                        )}
                    </div>
                </div>
              )}

              {activeTab === 'reports' && (
                 <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex flex-col gap-2">
                       <h2 className="text-3xl font-bold font-serif text-hospital-primary">Medical Reports</h2>
                       <p className="text-hospital-muted">Access your diagnostic results, lab tests, and clinical imaging anytime.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                       {reports.map(report => (
                          <div key={report.id} className="group p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between hover:border-hospital-accent transition-all duration-300">
                             <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center text-hospital-muted group-hover:text-hospital-secondary transition-colors shadow-sm">
                                   <FileText size={24} />
                                </div>
                                <div>
                                   <p className="text-[10px] text-slate-500 font-semibold mb-1 uppercase tracking-wider">Lab Reports</p>
                                   <h4 className="font-bold text-slate-900 text-sm leading-none">{report.name}</h4>
                                </div>
                             </div>
                             <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] text-slate-500 font-bold">{report.date}</span>
                                <button className="text-[10px] text-teal-600 font-bold hover:underline uppercase tracking-tight">
                                   Download PDF
                                </button>
                             </div>
                          </div>
                        ))}
                    </div>
                 </div>
              )}

              {activeTab === 'billing' && (
                 <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500 font-serif items-center justify-center text-center py-20 grayscale opacity-50">
                    <CreditCard size={64} className="mb-4 text-hospital-muted" strokeWidth={1} />
                    <h2 className="text-2xl font-bold">Billing Gateway Under Maintenance</h2>
                    <p className="text-sm font-sans max-w-xs text-hospital-muted">Your billing history is currently being synced. Please check back in a few moments.</p>
                 </div>
              )}
           </main>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, className }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-hospital text-sm font-bold transition-all w-full",
        active 
          ? "bg-hospital-secondary/10 text-hospital-secondary shadow-sm" 
          : "text-hospital-slate/60 hover:bg-hospital-bg hover:text-hospital-primary",
        className
      )}
    >
      {icon}
      <span>{label}</span>
      {active && <motion.div layoutId="pill" className="ml-auto w-1 h-4 bg-hospital-secondary rounded-full" />}
    </button>
  );
}

function StatCard({ value, label, subtext, icon }: any) {
  return (
    <div className="p-6 bg-white rounded-hospital shadow-hospital-sm border border-hospital-slate/5 flex flex-col gap-4">
       <div className="h-12 w-12 rounded-2xl bg-hospital-bg flex items-center justify-center text-xl">
          {icon}
       </div>
       <div>
          <h5 className="text-3xl font-bold font-serif text-hospital-primary">{value}</h5>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-hospital-muted">{label} {subtext}</p>
       </div>
    </div>
  );
}
