import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, BookOpen, Brain, Check, ClipboardCheck, Hammer, Lightbulb, NotebookPen, RotateCcw, Telescope } from 'lucide-react';
import { useEffect } from 'react';
import { books } from '../data/melluna';
import { getBookModule, type BookStageId } from '../data/bookModules';
import PlaygroundStage from '../components/lms/PlaygroundStage';
import { ProfileMenu, useProfileSavedState } from '../components/lms/LearnerProfiles';
import MellunaGuide from '../components/lms/MellunaGuide';

const stageIcons = { story: BookOpen, wonder: Lightbulb, explore: Telescope, challenge: Brain, design: ClipboardCheck, missions: Hammer, test: RotateCcw, reflection: NotebookPen };

export default function BookWorkspace() {
  const { bookId = 'b1', stage = 'story' } = useParams<{ bookId: string; stage: BookStageId }>();
  const book = books.find((item) => item.id === bookId) || books[0];
  const bookModule = getBookModule(bookId);
  const stages = bookModule.stages;
  const activeStage = stages.find((item) => item.id === stage) || stages[0];
  const [doneStages, setDoneStages] = useProfileSavedState<string[]>(`mellow-${bookId}-progress`, []);

  useEffect(() => {
    const handleProgress = (event: Event) => {
      const detail = (event as CustomEvent<{ bookId: string; stage: string }>).detail;
      if (detail?.bookId === bookId) setDoneStages((items) => items.includes(detail.stage) ? items : [...items, detail.stage]);
    };
    window.addEventListener('mellow-progress', handleProgress);
    return () => window.removeEventListener('mellow-progress', handleProgress);
  }, [bookId]);

  const currentStageIndex = stages.findIndex((item) => item.id === activeStage.id);
  const nextStage = stages[currentStageIndex + 1];
  const previousStage = stages[currentStageIndex - 1];
  const isStageDone = doneStages.includes(activeStage.id);

  return (
    <div className="min-h-screen bg-[#fbfaff] pb-32">
      <header className="sticky top-0 z-40 border-b border-[#e8e0ef] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link to="/lms/learner" className="rounded-full p-2.5 text-slate-500 hover:bg-slate-100" aria-label="Back to mission hub"><ArrowLeft size={20} /></Link>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7651a9]">Book {bookModule.number} playground</p>
              <h1 className="truncate text-base font-black text-slate-950 sm:text-xl">{book.title}</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2"><span className="text-xs font-bold text-[#60418a]">{doneStages.length}/{stages.length} complete</span><ProfileMenu/></div>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6" aria-label="Book 1 mission stages">
          {stages.map((item, index) => {
            const Icon = stageIcons[item.id];
            const isActive = item.id === activeStage.id;
            const isComplete = doneStages.includes(item.id);
            return (
              <Link key={item.id} to={`/lms/book/${book.id}/${item.id}`} aria-current={isActive ? 'step' : undefined} className={`flex min-w-max items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition ${isActive ? 'border-[#7651a9] bg-[#7651a9] text-white shadow-sm' : isComplete ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-600 hover:border-[#bba4d2]'}`}>
                {isComplete && !isActive ? <Check size={15} /> : <Icon size={15} />}
                <span>{index + 1}. {item.shortLabel}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-9 lg:px-8">
        <section className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7651a9]">Stage {currentStageIndex + 1} · {activeStage.label}</p>
            <h2 className="mt-1 max-w-3xl text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">{activeStage.objective}</h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-relaxed text-slate-600">{activeStage.helper}</p>
        </section>

        <motion.section key={activeStage.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <PlaygroundStage book={bookModule} stage={activeStage.id} />
        </motion.section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          {previousStage ? <Link to={`/lms/book/${book.id}/${previousStage.id}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-600 hover:bg-slate-50"><ArrowLeft size={18} /> {previousStage.label}</Link> : <span />}
          {nextStage && (isStageDone ? <Link to={`/lms/book/${book.id}/${nextStage.id}`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7651a9] px-6 py-4 text-sm font-black text-white hover:bg-[#60418a]">Next: {nextStage.label} <ArrowRight size={18} /></Link> : <span className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-6 py-4 text-center text-sm font-black text-slate-400">Finish this activity to continue</span>)}
        </div>
      </main>
      <div key={`${bookId}-${activeStage.id}`}><MellunaGuide stage={activeStage.id}/></div>
    </div>
  );
}
