import { HashRouter as Router, Navigate, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookSeries from './pages/BookSeries';
import Schools from './pages/Schools';
import Events from './pages/Events';
import Contact from './pages/Contact';
import LMSLogin from './pages/LMSLogin';
import LearnerDashboard from './pages/LearnerDashboard';
import BookWorkspace from './pages/BookWorkspace';
import Founder from './pages/Founder';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function BookRedirect() {
  const { bookId = 'b1' } = useParams();
  return <Navigate to={`/lms/book/${bookId}/story`} replace />;
}

function AppContent() {
  const location = useLocation();
  const isLMS = location.pathname.startsWith('/lms');

  return (
    <div className="flex flex-col min-h-screen">
      {!isLMS && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/book-series" element={<BookSeries />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lms" element={<LMSLogin />} />
          <Route path="/lms/learner" element={<LearnerDashboard />} />
          <Route path="/lms/book/:bookId" element={<BookRedirect />} />
          <Route path="/lms/book/:bookId/:stage" element={<BookWorkspace />} />
          <Route path="/lms/teacher" element={<div className="p-20 text-center">Teacher Dashboard (Coming Soon)</div>} />
          <Route path="/lms/parent" element={<div className="p-20 text-center">Parent Dashboard (Coming Soon)</div>} />
        </Routes>
      </main>
      {!isLMS && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
