import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Hammer,
  Lightbulb,
  NotebookPen,
  Play,
  RotateCcw,
  Rocket,
  Sparkles,
  Telescope,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { books, characters } from '../data/melluna';
import { getBookModule, type BookStageId } from '../data/bookModules';
import MellunaAI from '../components/MellunaAI';
import SafeImage from '../components/SafeImage';
import BookActivityPanel from '../components/lms/BookActivityPanel';

const stageIcons = {
  story: BookOpen,
  wonder: Lightbulb,
  explore: Telescope,
  challenge: Brain,
  design: ClipboardCheck,
  missions: Hammer,
  test: RotateCcw,
  reflection: NotebookPen,
};

export default function BookWorkspace() {
  const { bookId = 'b1', stage = 'story' } = useParams<{ bookId: string; stage: BookStageId }>();
  const book = books.find((item) => item.id === bookId) || books[0];
  const bookModule = getBookModule(bookId);
  const stages = bookModule.stages;
  const character = characters.find((item) => item.id === book.characterId);
  const activeStage = stages.find((item) => item.id === stage) || stages[0];
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(0);
  }, [activeStage.id]);

  const activePage = activeStage.pages[Math.min(pageIndex, activeStage.pages.length - 1)];
  const currentStageNumber = stages.findIndex((item) => item.id === activeStage.id) + 1;
  const nextStage = stages[currentStageNumber] || stages[0];
  const previousStage = stages[currentStageNumber - 2] || stages[stages.length - 1];

  const completedStages = useMemo(() => stages.slice(0, currentStageNumber - 1), [currentStageNumber]);

  const goToPage = (direction: 'previous' | 'next') => {
    setPageIndex((current) => {
      if (direction === 'previous') return Math.max(0, current - 1);
      return Math.min(activeStage.pages.length - 1, current + 1);
    });
  };

  return (
    <div className="min-h-screen bg-[#f7fbff] pb-16">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/lms/learner" className="rounded-full p-3 text-slate-500 hover:bg-slate-100" aria-label="Back to learner dashboard">
              <ArrowLeft size={20} />
            </Link>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Book {bookModule.number} Workspace</p>
              <h1 className="truncate text-lg font-black tracking-tight text-slate-950 sm:text-2xl">{book.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/lms/book/${book.id}/${previousStage.id}`} onClick={() => setPageIndex(0)} className="rounded-full border border-slate-200 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">
              Prev
            </Link>
            <Link to={`/lms/book/${book.id}/${nextStage.id}`} onClick={() => setPageIndex(0)} className="rounded-full bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-slate-800">
              Next Stage
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <div className="grid gap-0 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="bg-slate-950 p-4">
                <div className="relative overflow-hidden rounded-[20px] bg-slate-900">
                  <div className="aspect-video">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,#38bdf8_0%,transparent_28%),radial-gradient(circle_at_80%_80%,#84cc16_0%,transparent_25%)] opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white">
                      <div>
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                          <Play size={26} fill="currentColor" />
                        </div>
                        <h2 className="text-2xl font-black sm:text-3xl">Story read-aloud video</h2>
                        <p className="mx-auto mt-2 max-w-sm text-sm font-medium text-white/70">
                          Add the YouTube narration here when the animated story is ready.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="mb-5 flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7651a9] text-white">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">{character?.name} mission control</p>
                    <h2 className="text-2xl font-black text-slate-950">{activeStage.label}</h2>
                  </div>
                </div>
                <p className="mb-5 text-sm font-semibold leading-relaxed text-slate-600">{activeStage.helper}</p>

                <div className="mb-5 rounded-2xl border border-[#d7c7e6] bg-[#f5f1f9] p-4">
                  <p className="mb-1 text-xs font-black uppercase tracking-widest text-[#7651a9]">Mission objective</p>
                  <p className="text-sm font-bold leading-relaxed text-slate-800">{activeStage.objective}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {stages.map((item, index) => {
                    const Icon = stageIcons[item.id];
                    const isActive = item.id === activeStage.id;
                    const isComplete = completedStages.some((done) => done.id === item.id);
                    return (
                      <Link
                        key={item.id}
                        to={`/lms/book/${book.id}/${item.id}`}
                        onClick={() => setPageIndex(0)}
                        className={`min-h-20 rounded-2xl border p-3 transition-all ${
                          isActive
                            ? 'border-[#7651a9] bg-[#7651a9] text-white shadow-lg shadow-[#7651a9]/20'
                            : isComplete
                              ? 'border-brand-green/25 bg-brand-green/5 text-slate-800 hover:bg-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-[#bba4d2] hover:bg-white'
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <Icon size={20} />
                          <span className="text-[10px] font-black opacity-70">0{index + 1}</span>
                        </div>
                        <p className="text-sm font-black">{item.shortLabel}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <SafeImage src={book.coverImage} alt={book.title} className="mb-5 aspect-[4/5] w-full rounded-[20px] object-cover" />
            <h2 className="mb-2 text-2xl font-black text-slate-950">{book.title}</h2>
            <p className="mb-5 text-sm font-semibold leading-relaxed text-slate-600">{book.description}</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {['Age 10-13', '50 mins', 'Free'].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-3 py-4 text-xs font-black text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </section>

        <motion.section
          key={activeStage.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
        >
          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Book viewer</p>
                <h2 className="text-xl font-black text-slate-950">
                  Page {pageIndex + 1} of {activeStage.pages.length}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage('previous')}
                  disabled={pageIndex === 0}
                  className="rounded-full border border-slate-200 p-3 text-slate-600 disabled:opacity-30"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => goToPage('next')}
                  disabled={pageIndex === activeStage.pages.length - 1}
                  className="rounded-full border border-slate-200 p-3 text-slate-600 disabled:opacity-30"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="bg-[#fff8df] p-3 sm:p-5">
              <SafeImage src={activePage} alt={`${activeStage.label} page`} className="mx-auto max-h-[760px] w-full rounded-[18px] object-contain shadow-sm" />
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7651a9] text-white">
                  <Sparkles size={22} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Stage prompts</p>
                  <h2 className="text-2xl font-black text-slate-950">{activeStage.label}</h2>
                </div>
              </div>
              <div className="space-y-3">
                {activeStage.prompts.map((prompt) => (
                  <div key={prompt} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#7651a9]" size={20} />
                    <p className="text-sm font-bold leading-relaxed text-slate-700">{prompt}</p>
                  </div>
                ))}
              </div>
            </div>

            <BookActivityPanel book={bookModule} stage={activeStage.id} />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to={`/lms/book/${book.id}/${previousStage.id}`} onClick={() => setPageIndex(0)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">
                <ArrowLeft size={18} /> {previousStage.label}
              </Link>
              <Link to={`/lms/book/${book.id}/${nextStage.id}`} onClick={() => setPageIndex(0)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#7651a9] px-6 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-[#60418a]">
                {nextStage.label} <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </motion.section>
      </main>

      <MellunaAI />
    </div>
  );
}
