import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Code, Cuboid, Hammer, NotebookPen, ShieldCheck, Sparkles } from 'lucide-react';
import SafeImage from '../components/SafeImage';

const stages = ['Story', 'Wonder', 'Challenge', 'Tutorials', 'Tasks', 'Reflection'];

const zones = [
  {
    icon: BookOpen,
    title: 'Story screen',
    text: 'Watch the story video or read the book page before the mission starts.',
  },
  {
    icon: Brain,
    title: 'AI lab',
    text: 'Train simple models and talk about what AI can and cannot do.',
  },
  {
    icon: Code,
    title: 'Code lab',
    text: 'Use Scratch, MakeCode, Micro:bit, and later Python notebooks.',
  },
  {
    icon: Cuboid,
    title: '3D and design lab',
    text: 'Create landers, city ideas, diagrams, posters, and prototypes.',
  },
  {
    icon: Hammer,
    title: 'Build lab',
    text: 'Test physical models using low-cost classroom materials.',
  },
  {
    icon: NotebookPen,
    title: 'Mission journal',
    text: 'Answer reflection prompts and explain the evidence from testing.',
  },
];

export default function LMSLogin() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 bg-white py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <SafeImage src="assets/brand/mellow-learners-logo.png" alt="Mellow Learners" className="h-12 w-auto object-contain" />
          </Link>
          <Link to="/" className="text-sm font-black text-slate-600 hover:text-brand-green">Back to main site</Link>
        </div>
      </header>

      <main>
        <section className="bg-[#f7fbff] py-14">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-blue">
                <Sparkles size={16} />
                learn.mellowlearners.net
              </div>
              <h1 className="mb-6 text-5xl font-black leading-[0.95] tracking-tight text-slate-950 lg:text-7xl">
                A mission control board for young STEM builders.
              </h1>
              <p className="mb-8 max-w-2xl text-lg font-medium leading-relaxed text-slate-700">
                Kids choose a book, watch or read the story, then move through clear stages: challenge, tutorials, task paths, and reflection.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/lms/learner" className="btn-primary inline-flex items-center justify-center gap-2">
                  Start Free Preview <ArrowRight size={20} />
                </Link>
                <Link to="/lms/book/b1/story" className="btn-secondary inline-flex items-center justify-center gap-2 bg-white">
                  Open Book 1 Workspace
                </Link>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-green/20 bg-white p-4 text-sm font-bold text-slate-700">
                <ShieldCheck className="shrink-0 text-brand-green" size={22} />
                No student login is needed for this public preview. Full accounts, submissions, and teacher tools can be added after the concept is validated.
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200">
              <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
                <div className="overflow-hidden rounded-[24px] bg-slate-950">
                  <div className="flex aspect-video items-center justify-center bg-slate-900 p-8 text-center text-white">
                    <div>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
                        <BookOpen size={30} />
                      </div>
                      <p className="text-2xl font-black">Story video area</p>
                      <p className="mt-2 text-sm font-medium text-white/65">YouTube animation or narration goes here.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {stages.map((stage) => (
                    <div key={stage} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-700">
                      {stage}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-purple">Platform zones</p>
              <h2 className="section-title">Simple for kids, credible for adults</h2>
              <p className="text-lg font-medium leading-relaxed text-slate-600">
                The interface should feel like a calm technology playground: big choices, clear stages, real creation tools, and no confusing dashboard clutter.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {zones.map((zone) => (
                <article key={zone.title} className="card">
                  <zone.icon className="mb-6 text-brand-green" size={32} />
                  <h3 className="mb-3 text-xl font-black text-slate-950">{zone.title}</h3>
                  <p className="text-sm font-semibold leading-relaxed text-slate-600">{zone.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-8 text-center">
        <p className="text-sm font-medium text-slate-400">&copy; 2026 Mellow Learners Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
