import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, BrainCircuit, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils.ts';

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', text: 'Hello! I am the Kazi Hospital AI Assistant. How can I help you today?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now().toString(), role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI Response
    setTimeout(() => {
      const responses = [
        "I can help you book an appointment. Would you like to see our specialist list?",
        "Our emergency services are available 24/7. You can call +1 (234) 567-890 right now.",
        "Madiha Kazi founded this hospital in 2011 with a vision of compassionate care.",
        "We have specialized departments for Cardiology, Neurology, and Pediatrics.",
        "You can find our lab reports in the Patient Portal after logging in."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: randomResponse }]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-10 right-10 z-[100] group">
         {!isOpen && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="h-16 w-16 rounded-full bg-hospital-secondary text-white shadow-2xl flex items-center justify-center relative overflow-hidden"
            >
               <MessageSquare size={30} />
               <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-500" />
               <div className="absolute -top-1 -right-1 h-5 w-5 bg-hospital-accent rounded-full border-4 border-white animate-pulse" />
            </motion.button>
         )}
         
         <AnimatePresence>
            {isOpen && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  className="absolute bottom-0 right-0 w-[400px] max-w-[90vw] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-[0_32px_128px_rgba(0,0,0,0.18)] border border-hospital-slate/10 overflow-hidden flex flex-col"
               >
                  {/* Header */}
                  <div className="bg-hospital-primary p-6 text-white flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-hospital-secondary flex items-center justify-center text-white">
                           <BrainCircuit size={24} />
                        </div>
                        <div>
                           <h4 className="font-bold text-sm tracking-tight leading-none mb-1">Kazi AI Assistant</h4>
                           <p className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-hospital-secondary">
                              <span className="relative flex h-2 w-2">
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hospital-secondary opacity-75"></span>
                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-hospital-secondary"></span>
                              </span>
                              Online & Active
                           </p>
                        </div>
                     </div>
                     <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <X size={20} />
                     </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide">
                     <div className="flex flex-col items-center text-center gap-2 mb-4">
                        <Sparkles className="text-hospital-secondary" size={24} />
                        <p className="text-[10px] text-hospital-muted font-bold uppercase tracking-widest">End-to-End Encrypted Health Consultation</p>
                     </div>
                     
                     {messages.map((msg) => (
                        <motion.div
                           initial={{ opacity: 0, x: msg.role === 'assistant' ? -10 : 10 }}
                           animate={{ opacity: 1, x: 0 }}
                           key={msg.id}
                           className={cn(
                              "flex gap-3 max-w-[85%]",
                              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                           )}
                        >
                           <div className={cn(
                              "h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center text-white",
                              msg.role === 'assistant' ? "bg-hospital-secondary" : "bg-hospital-primary"
                           )}>
                              {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                           </div>
                           <div className={cn(
                              "p-4 rounded-2xl text-sm leading-relaxed",
                              msg.role === 'assistant' 
                                 ? "bg-hospital-bg text-hospital-primary rounded-tl-none border border-hospital-slate/5" 
                                 : "bg-hospital-primary text-white rounded-tr-none shadow-lg shadow-hospital-primary/10"
                           )}>
                              {msg.text}
                           </div>
                        </motion.div>
                     ))}
                     <div ref={chatEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-6 border-t border-hospital-slate/10 bg-hospital-bg/30">
                     <div className="relative group">
                        <input 
                           type="text" 
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                           placeholder="Ask me anything..."
                           className="w-full h-14 pl-12 pr-12 bg-white rounded-2xl border-2 border-transparent focus:border-hospital-secondary outline-none transition-all shadow-inner text-sm font-medium"
                        />
                        <BrainCircuit className="absolute left-4 top-1/2 -translate-y-1/2 text-hospital-muted group-focus-within:text-hospital-secondary transition-colors" size={20} />
                        <button 
                           onClick={handleSend}
                           className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center rounded-xl bg-hospital-primary text-white hover:bg-hospital-secondary transition-all shadow-lg active:scale-95"
                        >
                           <Send size={18} />
                        </button>
                     </div>
                     <p className="text-[10px] text-center mt-4 text-hospital-muted font-medium italic">
                        Responses are AI-generated & illustrative. In case of emergency, call 24/7 helpline immediately.
                     </p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </>
  );
}
