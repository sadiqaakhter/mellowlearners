import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import SafeImage from './SafeImage';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Books', path: '/book-series' },
  { name: 'Schools', path: '/schools' },
  { name: 'Events', path: '/events' },
  { name: 'Founder', path: '/founder' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled ? "bg-white/90 backdrop-blur-md py-3 border-slate-200 shadow-sm" : "bg-white py-5 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <SafeImage 
              src="assets/brand/mellow-learners-logo.png" 
              alt="Mellow Learners Logo" 
              className="h-12 lg:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                  <Link
                    to={item.path}
                    className={cn(
                      "px-3 py-2 text-[11px] lg:text-xs font-black uppercase tracking-widest transition-colors hover:text-brand-green",
                      location.pathname === item.path ? "text-brand-green" : "text-slate-600"
                    )}
                  >
                    {item.name}
                  </Link>
              </div>
            ))}
            <div className="ml-4">
              <Link to="/lms" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                Learn Platform
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-8 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-4 text-sm font-bold text-slate-600 rounded-xl hover:bg-slate-50",
                    location.pathname === item.path && "text-brand-green bg-brand-green/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6">
                <Link 
                  to="/lms" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-slate-900 text-white px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest"
                >
                  Learn Platform
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
