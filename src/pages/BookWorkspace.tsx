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
  RotateCcw,
  Rocket,
  Sparkles,
  Telescope,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { books, characters } from '../data/melluna';
import { getBookModule, type BookStageId } from '../data/bookModules';
import SafeImage from '../components/SafeImage';
import PlaygroundStage from '../components/lms/PlaygroundStage';

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
  const [doneStages, setDoneStages] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(`mellow-${bookId}-progress`) || '[]'); } catch { return []; }
  });

  useEffect(() => {
    setPageIndex(0);
  }, [activeStage.id]);

  useEffect(() => {
    const handleProgress = (event: Event) => {
      const detail = (event as CustomEvent<{ bookId: string; stage: string }>).detail;
      if (detail?.bookId === bookId) setDoneStages((items) => items.includes(detail.stage) ? items : [...items, detail.stage]);
    };
    window.addEventListener('mellow-progress', handleProgress);
    return () => window.removeEventListener('mellow-progress', handleProgress);
  }, [bookId]);

  const activePage = activeStage.pages[Math.min(pageIndex, activeStage.pages.length - 1)];
  const currentStageNumber = stages.findIndex((item) => item.id === activeStage.id) + 1;
  const nextStage = stages[currentStageNumber] || stages[0];
  const previousStage = stages[currentStageNumber - 2] || stages[stages.length - 1];

  const isStageDone = doneStages.includes(activeStage.id);

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
            {isStageDone ? <Link to={`/lms/book/${book.id}/${nextStage.id}`} onClick={() => setPageIndex(0)} className="rounded-full bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-slate-800">Next Stage</Link> : <span className="rounded-full bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400">Submit to unlock</span>}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-[28px] border border-[#e6dfed] bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7651a9] text-white"><Rocket size={24} /></div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Step {currentStageNumber} of {stages.length}</p>
                  <h2 className="text-2xl font-black text-slate-950">{activeStage.label}</h2>
                  <p className="mt-1 max-w-2xl text-sm font-semibold leading-relaxed text-slate-600">{activeStage.helper}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-[#d7c7e6] bg-[#f5f1f9] px-4 py-3 sm:max-w-xs">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#7651a9]">Your goal</p>
                <p className="mt-1 text-sm font-bold leading-relaxed text-slate-800">{activeStage.objective}</p>
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#eee8f3]" aria-label={`Step ${currentStageNumber} of ${stages.length}`}>
              <div className="h-full rounded-full bg-[#7651a9] transition-all" style={{ width: `${(currentStageNumber / stages.length) * 100}%` }} />
            </div>

            <nav className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-8" aria-label="Book 1 mission stages">
              {stages.map((item, index) => {
                const Icon = stageIcons[item.id];
                const isActive = item.id === activeStage.id;
                const isComplete = doneStages.includes(item.id);
                return (
                  <Link key={item.id} to={`/lms/book/${book.id}/${item.id}`} onClick={() => setPageIndex(0)} aria-current={isActive ? 'step' : undefined} className={`rounded-2xl border px-2 py-3 text-center transition-all ${isActive ? 'border-[#7651a9] bg-[#7651a9] text-white shadow-md' : isComplete ? 'border-emerald-200 bg-emerald-50 text-slate-800' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#bba4d2]'}`}>
                    <Icon className="mx-auto" size={18} />
                    <span className="mt-1 block text-[10px] font-black sm:text-xs">{item.shortLabel}</span>
                    <span className="sr-only">Step {index + 1}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <aside className="flex items-center gap-4 rounded-[28px] border border-[#e6dfed] bg-[#f5f1f9] p-4 lg:block">
            <SafeImage src={book.coverImage} alt={book.title} className="h-28 w-24 shrink-0 rounded-[18px] object-cover lg:mx-auto lg:h-44 lg:w-36" />
            <div className="lg:mt-4 lg:text-center">
              <p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">{character?.name} + Melluna</p>
              <p className="mt-2 text-sm font-bold leading-relaxed text-slate-700">Read less. Try more. Melluna will help when you get stuck.</p>
            </div>
          </aside>
        </section>

        <motion.section
          key={activeStage.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
        >
          <section className="order-2 overflow-hidden rounded-[28px] border border-slate-200 bg-white lg:order-1">
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

          <section className="order-1 space-y-6 lg:order-2">
            <PlaygroundStage book={bookModule} stage={activeStage.id} />

            <details className="rounded-[24px] border border-slate-200 bg-white p-5">
              <summary className="flex cursor-pointer list-none items-center gap-3 text-sm font-black text-slate-700">
                <Sparkles className="text-[#7651a9]" size={20} /> See the thinking prompts
              </summary>
              <div className="mt-4 space-y-3">
                {activeStage.prompts.map((prompt) => (
                  <div key={prompt} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#7651a9]" size={20} />
                    <p className="text-sm font-bold leading-relaxed text-slate-700">{prompt}</p>
                  </div>
                ))}
              </div>
            </details>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to={`/lms/book/${book.id}/${previousStage.id}`} onClick={() => setPageIndex(0)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">
                <ArrowLeft size={18} /> {previousStage.label}
              </Link>
              {isStageDone ? <Link to={`/lms/book/${book.id}/${nextStage.id}`} onClick={() => setPageIndex(0)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#7651a9] px-6 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-[#60418a]">{nextStage.label} <ArrowRight size={18} /></Link> : <span className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-100 px-6 py-4 text-center text-sm font-black uppercase tracking-widest text-slate-400">Submit this activity to continue</span>}
            </div>
          </section>
        </motion.section>
      </main>

    </div>
  );
}
