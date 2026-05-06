import { Link } from 'react-router-dom';
import { Linkedin, Mail, MapPin, Phone, Instagram } from 'lucide-react';
import SafeImage from './SafeImage';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-8 group">
              <SafeImage 
                src="assets/brand/mellow-learners-logo.png" 
                alt="Mellow Learners Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Story-driven STEM learning powered by books, missions, and AI-supported exploration. Transforming how children learn through stories and hands-on challenges.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/company/mellowlearnersclub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-green hover:text-white transition-all">
                <Linkedin size={16} />
              </a>
              <a href="https://www.instagram.com/mellowlearnersclub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-green hover:text-white transition-all">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/book-series" className="text-slate-500 hover:text-brand-green text-sm transition-colors">Books</Link></li>
              <li><Link to="/schools" className="text-slate-500 hover:text-brand-green text-sm transition-colors">Schools</Link></li>
              <li><Link to="/founder" className="text-slate-500 hover:text-brand-green text-sm transition-colors">Founder</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-brand-green text-sm transition-colors">Contact</Link></li>
              <li><Link to="/lms" className="text-slate-500 hover:text-brand-green text-sm transition-colors">Learn Platform</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-500 text-sm">
                <MapPin size={18} className="text-brand-green shrink-0" />
                <span>Global STEM Education System</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500 text-sm">
                <Mail size={18} className="text-brand-green shrink-0" />
                <span>hello@mellowlearners.net</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500 text-sm">
                <Phone size={18} className="text-brand-green shrink-0" />
                <span>Connect with us online</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} Mellow Learners Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-slate-400 hover:text-slate-600 text-xs">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-400 hover:text-slate-600 text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

