import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle2, Lock, Play, Sparkles } from 'lucide-react';
import { books, characters } from '../data/melluna';
import MellunaAI from '../components/MellunaAI';
import SafeImage from '../components/SafeImage';

const progressByBook: Record<string, number> = {
  b1: 18,
  b2: 0,
  b3: 0,
};

export default function LearnerDashboard() {
  return (
    <div className="min-h-screen bg-[#f7fbff] pb-20">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <SafeImage src="assets/brand/mellow-learners-logo.png" alt="Mellow Learners" className="h-11 w-auto object-contain" />
            <div className="hidden sm:block">
              <p className="text-sm font-black uppercase tracking-widest text-slate-400">Learn Platform</p>
              <p className="text-xl font-black tracking-tight text-slate-900">Melluna Universe</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/lms" className="hidden rounded-full border border-slate-200 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 sm:block">
              Home
            </Link>
            <div className="rounded-full bg-brand-blue px-5 py-3 text-xs font-black uppercase tracking-widest text-white">
              Free Preview
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-widest text-brand-green">Choose a story mission</p>
            <h1 className="mb-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Pick a book, then enter its technology playground.
            </h1>
            <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
              Each book opens into a simple workspace: watch or listen to the story, move through the book stages, choose a tool path, and submit a reflection.
            </p>
          </div>

          <div className="rounded-[32px] border border-brand-blue/10 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Today with Melluna</h2>
                <p className="text-sm font-medium text-slate-500">Start with Book 1, then unlock more worlds.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {['Story', 'Challenge', 'Task'].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-4">
                  <CheckCircle2 className="mx-auto mb-2 text-brand-green" size={22} />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => {
            const character = characters.find((item) => item.id === book.characterId);
            const progress = progressByBook[book.id] || 0;
            const isReady = book.id === 'b1';

            return (
              <motion.article
                key={book.id}
                whileHover={{ y: isReady ? -6 : 0 }}
                className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <SafeImage src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/5 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-700">
                    Book {index + 1}
                  </div>
                  {!isReady && (
                    <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-slate-500">
                      <Lock size={20} />
                    </div>
                  )}
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="mb-2 text-sm font-black uppercase tracking-widest text-white/70">{character?.name}</p>
                    <h2 className="text-3xl font-black leading-tight text-white">{book.title}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="mb-6 min-h-20 text-sm font-medium leading-relaxed text-slate-600">{book.description}</p>
                  <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-green" style={{ width: `${progress}%` }} />
                  </div>
                  {isReady ? (
                    <Link
                      to={`/lms/book/${book.id}/story`}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition-transform hover:scale-[1.02]"
                    >
                      <Play size={18} /> Enter Book
                    </Link>
                  ) : (
                    <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-400">
                      <BookOpen size={18} /> Coming Next
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </section>

      </main>

      <MellunaAI />
    </div>
  );
}
