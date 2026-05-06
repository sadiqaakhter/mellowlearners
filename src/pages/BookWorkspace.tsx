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
  Code2,
  Cuboid,
  ExternalLink,
  Hammer,
  Lightbulb,
  NotebookPen,
  Play,
  Rocket,
  Sparkles,
  Video,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { books, characters } from '../data/melluna';
import MellunaAI from '../components/MellunaAI';
import SafeImage from '../components/SafeImage';

type StageId = 'story' | 'wonder' | 'challenge' | 'tutorial' | 'tasks' | 'reflection';

type Stage = {
  id: StageId;
  label: string;
  shortLabel: string;
  helper: string;
  objective: string;
  icon: typeof BookOpen;
  pages: string[];
  prompts: string[];
};

const stages: Stage[] = [
  {
    id: 'story',
    label: 'Story',
    shortLabel: 'Read',
    helper: 'Meet Giffy and discover why landing on the Moon is not as easy as buying a rocket ticket.',
    objective: 'Understand the story problem: the Moon has no air, so parachutes will not work.',
    icon: BookOpen,
    pages: ['assets/book1/page-02.jpg', 'assets/book1/page-03.jpg', 'assets/book1/page-04.jpg', 'assets/book1/page-05.jpg', 'assets/book1/page-06.jpg'],
    prompts: ['What problem does Giffy notice?', 'Why is the Moon different from Earth?', 'What does Melluna help Giffy understand?'],
  },
  {
    id: 'wonder',
    label: 'Think & Wonder',
    shortLabel: 'Wonder',
    helper: 'Collect questions before choosing a solution.',
    objective: 'Ask useful science and engineering questions before building.',
    icon: Lightbulb,
    pages: ['assets/book1/page-07.jpg'],
    prompts: ['What do you already know about rockets?', 'What do you need to find out?', 'What would you test first?'],
  },
  {
    id: 'challenge',
    label: 'Challenge',
    shortLabel: 'Data',
    helper: 'Study real landing examples and decide how a new lander can survive.',
    objective: 'Use mission data to predict safe landing, crash risk, and design needs.',
    icon: Brain,
    pages: ['assets/book1/page-08.jpg'],
    prompts: ['Which landers landed safely?', 'What speed is safe?', 'What pattern do you notice in the table?'],
  },
  {
    id: 'tutorial',
    label: 'Design Thinking',
    shortLabel: 'Plan',
    helper: 'Move through empathy, problem definition, ideas, prototype, test, and self-check.',
    objective: 'Turn a story problem into a clear design process.',
    icon: ClipboardCheck,
    pages: ['assets/book1/page-09.jpg', 'assets/book1/page-10.jpg', 'assets/book1/page-11.jpg', 'assets/book1/page-12.jpg'],
    prompts: ['Who needs help?', 'What is the real problem?', 'Which idea is strongest and why?'],
  },
  {
    id: 'tasks',
    label: 'Mission Tasks',
    shortLabel: 'Make',
    helper: 'Choose one pathway or combine more than one.',
    objective: 'Create evidence: a model, code, AI training result, design, or experiment data.',
    icon: Hammer,
    pages: ['assets/book1/page-13.jpg', 'assets/book1/page-14.jpg', 'assets/book1/page-15.jpg'],
    prompts: ['Which pathway will you choose?', 'What tool or material will you use?', 'How will you know if your idea worked?'],
  },
  {
    id: 'reflection',
    label: 'Reflection',
    shortLabel: 'Debrief',
    helper: 'Finish the mission with evidence, learning, and next-step ideas.',
    objective: 'Explain what worked, what failed, and what you would improve.',
    icon: NotebookPen,
    pages: ['assets/book1/page-16.jpg'],
    prompts: ['What did you build or test?', 'What worked best?', 'What would you improve next?'],
  },
];

const pathwayCards = [
  {
    title: 'Gesture Control AI',
    path: 'AI Path',
    tool: 'Teachable Machine',
    icon: Brain,
    color: 'text-brand-purple',
    url: 'https://teachablemachine.withgoogle.com/',
    steps: ['Create an image project', 'Train STOP, SAFE, and FORWARD gestures', 'Test whether the model recognizes each signal'],
    evidence: 'Screenshot or share link of your trained model',
  },
  {
    title: '3D Lunar Lander',
    path: 'Design Path',
    tool: 'Tinkercad',
    icon: Cuboid,
    color: 'text-brand-blue',
    url: 'https://www.tinkercad.com/',
    steps: ['Make a short wide body', 'Add four outward legs and footpads', 'Check if the base is wider than half the body height'],
    evidence: 'Screenshot or public share link of your 3D lander',
  },
  {
    title: 'Micro:bit Speed Alert',
    path: 'Code Path',
    tool: 'MakeCode',
    icon: Code2,
    color: 'text-brand-green',
    url: 'https://makecode.microbit.org/',
    steps: ['Create a new Micro:bit project', 'Use gesture or acceleration blocks', 'Show an alert when falling too fast'],
    evidence: 'Screenshot of blocks or a short test video',
  },
  {
    title: 'Cushion the Crash',
    path: 'Build Path',
    tool: 'Hands-on materials',
    icon: Hammer,
    color: 'text-brand-orange',
    url: 'https://www.youtube.com/results?search_query=paper+cup+lunar+lander+stem+challenge',
    steps: ['Build a cup lander with legs', 'Drop from 30 cm, 60 cm, and 1 m', 'Change one variable and test again'],
    evidence: 'Photo of lander plus test table',
  },
  {
    title: 'Mission Timeline',
    path: 'Media Path',
    tool: 'Canva or Slides',
    icon: Video,
    color: 'text-pink-500',
    url: 'https://www.canva.com/education/',
    steps: ["Research Apollo, Chandrayaan, Chang'e, and Artemis", 'Create a timeline', 'Add one fact for each mission'],
    evidence: 'Timeline image or presentation link',
  },
  {
    title: 'Flight Controller Report',
    path: 'Notebook Path',
    tool: 'Journal / worksheet',
    icon: NotebookPen,
    color: 'text-slate-700',
    url: 'https://docs.google.com/document/u/0/',
    steps: ['Write your prediction', 'Explain the data pattern', 'Describe your next improvement'],
    evidence: 'Short written report',
  },
];

const stageIndex: Record<StageId, number> = stages.reduce((acc, stage, index) => {
  acc[stage.id] = index;
  return acc;
}, {} as Record<StageId, number>);

export default function BookWorkspace() {
  const { bookId = 'b1', stage = 'story' } = useParams<{ bookId: string; stage: StageId }>();
  const book = books.find((item) => item.id === bookId) || books[0];
  const character = characters.find((item) => item.id === book.characterId);
  const activeStage = stages.find((item) => item.id === stage) || stages[0];
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(0);
  }, [activeStage.id]);

  const activePage = activeStage.pages[Math.min(pageIndex, activeStage.pages.length - 1)];
  const currentStageNumber = stageIndex[activeStage.id] + 1;
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
              <p className="text-xs font-black uppercase tracking-widest text-brand-green">Book 1 Workspace</p>
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-blue text-white">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">{character?.name} mission control</p>
                    <h2 className="text-2xl font-black text-slate-950">{activeStage.label}</h2>
                  </div>
                </div>
                <p className="mb-5 text-sm font-semibold leading-relaxed text-slate-600">{activeStage.helper}</p>

                <div className="mb-5 rounded-2xl border border-brand-blue/15 bg-brand-blue/5 p-4">
                  <p className="mb-1 text-xs font-black uppercase tracking-widest text-brand-blue">Mission objective</p>
                  <p className="text-sm font-bold leading-relaxed text-slate-800">{activeStage.objective}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {stages.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = item.id === activeStage.id;
                    const isComplete = completedStages.some((done) => done.id === item.id);
                    return (
                      <Link
                        key={item.id}
                        to={`/lms/book/${book.id}/${item.id}`}
                        onClick={() => setPageIndex(0)}
                        className={`min-h-20 rounded-2xl border p-3 transition-all ${
                          isActive
                            ? 'border-brand-blue bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                            : isComplete
                              ? 'border-brand-green/25 bg-brand-green/5 text-slate-800 hover:bg-white'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-green hover:bg-white'
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
                <p className="text-xs font-black uppercase tracking-widest text-brand-green">Book viewer</p>
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
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-green text-white">
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
                    <CheckCircle2 className="mt-0.5 shrink-0 text-brand-green" size={20} />
                    <p className="text-sm font-bold leading-relaxed text-slate-700">{prompt}</p>
                  </div>
                ))}
              </div>
            </div>

            {activeStage.id === 'tasks' ? (
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-7">
                <h2 className="mb-5 text-2xl font-black text-slate-950">Choose a pathway</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {pathwayCards.map((task) => {
                    const Icon = task.icon;
                    return (
                      <article key={task.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <p className="mb-1 text-xs font-black uppercase tracking-widest text-brand-green">{task.path}</p>
                            <h3 className="text-xl font-black text-slate-950">{task.title}</h3>
                          </div>
                          <Icon className={task.color} size={28} />
                        </div>
                        <p className="mb-4 rounded-full bg-white px-3 py-2 text-xs font-black text-slate-500">{task.tool}</p>
                        <div className="mb-4 space-y-2">
                          {task.steps.map((step) => (
                            <p key={step} className="text-sm font-semibold leading-relaxed text-slate-600">- {step}</p>
                          ))}
                        </div>
                        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3">
                          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Evidence</p>
                          <p className="text-sm font-bold text-slate-700">{task.evidence}</p>
                        </div>
                        <a href={task.url} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-slate-800">
                          Open Tool <ExternalLink size={16} />
                        </a>
                      </article>
                    );
                  })}
                </div>
              </div>
            ) : activeStage.id === 'reflection' ? (
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-7">
                <h2 className="mb-4 text-2xl font-black text-slate-950">Mission report preview</h2>
                <label className="mb-2 block text-sm font-black text-slate-700" htmlFor="mission-reflection">
                  What did you learn from your mission?
                </label>
                <textarea
                  id="mission-reflection"
                  className="min-h-44 w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-700 outline-none focus:border-brand-blue focus:bg-white"
                  placeholder="Example: I tested a wider base and found that it helped the lander stay upright..."
                />
                <div className="mt-4 rounded-2xl bg-brand-green/10 p-4 text-sm font-bold leading-relaxed text-slate-700">
                  Full student saving, uploads, and teacher review can be added after login is connected.
                </div>
              </div>
            ) : (
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-7">
                <h2 className="mb-5 text-2xl font-black text-slate-950">Mission rhythm</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Notice the problem', 'Break it into questions', 'Build or model a solution', 'Reflect with evidence'].map((step, index) => (
                    <div key={step} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="mb-3 text-3xl font-black text-brand-blue">0{index + 1}</p>
                      <h3 className="text-base font-black text-slate-950">{step}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to={`/lms/book/${book.id}/${previousStage.id}`} onClick={() => setPageIndex(0)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">
                <ArrowLeft size={18} /> {previousStage.label}
              </Link>
              <Link to={`/lms/book/${book.id}/${nextStage.id}`} onClick={() => setPageIndex(0)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-green px-6 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-brand-green-dark">
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
