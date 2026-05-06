import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Linkedin, Instagram, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-6 leading-none">Get in <br/><span className="text-gradient">Touch</span></h1>
                <p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium">
                  Have questions about our book series or want to partner with us? We'd love to hear from you.
                </p>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                      <p className="text-slate-500">hello@mellowlearners.net</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">WhatsApp Us</h4>
                      <p className="text-slate-500">+92 318 1231323</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Location</h4>
                      <p className="text-slate-500">Global STEM Education System</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Follow Our Journey</h4>
                  <div className="flex gap-4">
                    <a 
                      href="https://linkedin.com/company/mellowlearnersclub" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a 
                      href="https://www.instagram.com/mellowlearnersclub" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-brand-green hover:text-white transition-all"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="bg-slate-50 p-8 lg:p-12 rounded-[40px] border border-slate-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-brand-green font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Your Name"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="your@email.com"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">I am a...</label>
                    <select className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all appearance-none">
                      <option>Parent</option>
                      <option>Teacher</option>
                      <option>School Administrator</option>
                      <option>Partner</option>
                      <option>Subscriber</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4">
                    Send Message <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
