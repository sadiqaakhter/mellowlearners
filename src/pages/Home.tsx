import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Code,
  Cuboid,
  GraduationCap,
  Hammer,
  NotebookPen,
  School,
  ShieldCheck,
  Sparkles,
  Calendar,
} from 'lucide-react';
import SafeImage from '../components/SafeImage';

const proofPoints = [
  '11+ years in STEM, digital arts, and education',
  'Book 1 learning prototype ready',
  'AI, code, 3D, data, design, and build paths',
];

const modelSteps = [
  ['Read', 'Children enter a character-led STEM story.'],
  ['Notice', 'They collect questions, clues, data, and constraints.'],
  ['Build', 'They choose AI, code, 3D, design, data, or hands-on tasks.'],
  ['Reflect', 'They explain what worked, what changed, and what to improve.'],
];

const pathways = [
  {
    icon: Brain,
    title: 'AI Path',
    text: 'Train a simple gesture model using Teachable Machine-style activities.',
  },
  {
    icon: Code,
    title: 'Code Path',
    text: 'Use MakeCode, Micro:bit, Scratch, and later Python for mission logic.',
  },
  {
    icon: Cuboid,
    title: 'Design Path',
    text: 'Build 3D landers, city systems, prototypes, and visual explainers.',
  },
  {
    icon: Hammer,
    title: 'Build Path',
    text: 'Use low-cost materials to test, fail, improve, and record evidence.',
  },
];

const bookCovers = [
  {
    src: 'assets/book1/giffy-cover.jpg',
    title: "Giffy's Moon Adventure",
    theme: 'Space, lunar landing, AI, data, engineering',
    status: 'Book 1 preview live',
  },
  {
    src: 'assets/books/foxi-clean-city.jpg',
    title: "Foxi's Clean City Mission",
    theme: 'Sustainability, waste, smart cities, systems thinking',
    status: 'Coming next',
  },
  {
    src: 'assets/books/volti-power-mission.png',
    title: "Volti's Power Mission",
    theme: 'Energy, circuits, renewables, smart machines',
    status: 'Coming next',
  },
];

const socialProofImages = [
  {
    src: 'events/social-proof/moon observation 2022.jpg',
    title: 'Moon Observation 2022',
  },
  {
    src: 'events/social-proof/coding competition.jpg',
    title: 'Coding Competition',
  },
  {
    src: 'events/social-proof/youngest Coder Award Cermony.jpg',
    title: 'Youngest Coder Award Ceremony',
  },
  {
    src: 'events/social-proof/Moon Observation 2024.jpg',
    title: 'Moon Observation 2024',
  },
  {
    src: 'events/social-proof/06.jpg',
    title: 'STEM Learning Event',
  },
  {
    src: 'events/social-proof/Digital Leaders Award 2022.jpg',
    title: 'Digital Leaders Award 2022',
  },
  {
    src: 'events/social-proof/Moon Observation actiity.jpg',
    title: 'Moon Observation Activity',
  },
  {
    src: 'events/social-proof/Mars Day Workshop at School.jpg',
    title: 'Mars Day Workshop at School',
  },
  {
    src: 'events/social-proof/Wearable Electronics workshop with School.jpg',
    title: 'Wearable Electronics Workshop',
  },
  {
    src: 'events/social-proof/3D model building Workshop.jpg',
    title: '3D Model Building Workshop',
  },
];

const objections = [
  ['Is it just a book?', 'No. Each book becomes a guided technology mission with tool pathways and reflection.'],
  ['Do kids need paid software?', 'The first version can use free or classroom-friendly tools like Scratch, MakeCode, Tinkercad, Canva, and Teachable Machine.'],
  ['Is it safe for children?', 'The public preview avoids child accounts and data collection. Full accounts can be added later with parent and teacher controls.'],
];

export default function Home() {
  return (
    <div className="bg-white pt-20">
      <section className="relative overflow-hidden border-b border-slate-100 bg-[#fff8e8]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-green">
              <Sparkles size={16} />
              Free-first STEM technology playground
            </div>
            <h1 className="mb-6 max-w-4xl text-5xl font-black leading-[0.94] tracking-tight text-slate-950 lg:text-7xl">
              Story-based STEM missions for kids ages 8-14.
            </h1>
            <p className="mb-8 max-w-2xl text-lg font-medium leading-relaxed text-slate-700">
              Mellow Learners turns illustrated books into hands-on AI, coding, 3D design, data, and engineering challenges that children can actually build.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/lms/learner" className="btn-primary inline-flex items-center justify-center gap-2">
                Try Book 1 Free <ArrowRight size={20} />
              </Link>
              <Link to="/schools" className="btn-secondary inline-flex items-center justify-center gap-2 bg-white">
                For Schools & Partners
              </Link>
            </div>

            <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
              {proofPoints.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-black leading-snug text-slate-800 shadow-sm">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand-green" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-[0.78fr_1fr] sm:items-end">
              <div className="overflow-hidden rounded-[24px] border-8 border-white bg-white shadow-xl">
                <SafeImage src="assets/book1/giffy-cover.jpg" alt="Giffy's Moon Adventure cover" className="aspect-[3/4] w-full object-cover" />
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-[24px] border-8 border-white bg-white shadow-xl">
                  <SafeImage src="assets/book1/page-08.jpg" alt="Moon landing challenge page" className="aspect-[4/3] w-full object-cover" />
                </div>
                <div className="rounded-[24px] bg-slate-950 p-5 text-white shadow-xl">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-green">Inside Book 1</p>
                  <p className="mt-2 text-2xl font-black">Read story. Choose a path. Build the mission.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-purple">How it works</p>
            <h2 className="section-title">One clear flow for every book</h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600">
              The platform keeps the interface simple for children: start with the story, move through the mission stages, then choose a technology path.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {modelSteps.map(([title, text], index) => (
              <article key={title} className="rounded-[24px] border border-slate-100 bg-slate-50 p-6">
                <p className="mb-5 text-4xl font-black text-brand-blue">0{index + 1}</p>
                <h3 className="mb-3 text-2xl font-black text-slate-950">{title}</h3>
                <p className="text-sm font-semibold leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-green">Real product preview</p>
            <h2 className="mb-5 text-4xl font-black tracking-tight lg:text-5xl">Book 1 already proves the model.</h2>
            <p className="mb-8 text-lg font-semibold leading-relaxed text-slate-300">
              Giffy's Moon Adventure moves from story to inquiry, real lunar landing data, design thinking, tool-based tasks, and reflection.
            </p>
            <Link to="/lms/book/b1/story" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-widest text-slate-950 transition-transform hover:scale-[1.02]">
              Open the learner experience <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ['assets/book1/page-02.jpg', 'Story'],
              ['assets/book1/page-07.jpg', 'Think & Wonder'],
              ['assets/book1/page-13.jpg', 'Mission Tasks'],
              ['assets/book1/page-16.jpg', 'Reflection'],
            ].map(([src, label]) => (
              <div key={src} className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
                <SafeImage src={src} alt={label} className="aspect-[4/3] w-full object-cover" />
                <p className="p-4 text-sm font-black uppercase tracking-widest text-brand-green">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-green">Technology pathways</p>
            <h2 className="section-title">Kids use real tools, not pretend buttons</h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600">
              The website guides learners step by step, then links them to trusted creation tools and brings them back to reflect.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pathways.map((path) => {
              const Icon = path.icon;
              return (
                <article key={path.title} className="card">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
                    <Icon size={28} />
                  </div>
                  <h3 className="mb-3 text-xl font-black text-slate-950">{path.title}</h3>
                  <p className="text-sm font-semibold leading-relaxed text-slate-600">{path.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              icon: GraduationCap,
              title: 'For parents and learners',
              text: 'A guided, free-first place where kids can read, build, create, and learn technology safely.',
            },
            {
              icon: School,
              title: 'For schools',
              text: 'Story-led STEM modules for workshops, clubs, innovation labs, and classroom challenges.',
            },
            {
              icon: ShieldCheck,
              title: 'For partners',
              text: 'A scalable EdTech concept with books, LMS modules, teacher guides, and future AI support.',
            },
          ].map((item) => (
            <article key={item.title} className="rounded-[24px] bg-white p-7 shadow-sm">
              <item.icon className="mb-5 text-brand-green" size={34} />
              <h3 className="mb-3 text-2xl font-black text-slate-950">{item.title}</h3>
              <p className="font-medium leading-relaxed text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-green">Events and workshop proof</p>
              <h2 className="section-title">This work already exists in real classrooms and events</h2>
            </div>
            <div>
              <p className="mb-5 text-lg font-medium leading-relaxed text-slate-600">
                Mellow Learners has run STEM workshops, moon observation activities, competitions, and teacher-facing sessions. This is important social proof for schools and partners.
              </p>
              <Link to="/events" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-green hover:text-slate-950">
                View full event gallery <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-white py-4 shadow-sm">
            <div className="social-proof-marquee flex gap-4 px-4">
              {[...socialProofImages, ...socialProofImages].map((event, index) => (
                <article key={`${event.title}-${index}`} className="w-[280px] shrink-0 overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-sm sm:w-[340px]">
                  <SafeImage src={event.src} alt={event.title} className="aspect-[4/3] w-full object-cover object-center" />
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2 text-brand-green">
                      <Calendar size={16} />
                      <span className="text-[11px] font-black uppercase tracking-widest">Past activity</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-950">{event.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-purple">Mellow Learners universe</p>
              <h2 className="section-title">Three books, one learning system</h2>
            </div>
            <p className="max-w-lg text-base font-semibold leading-relaxed text-slate-600">
              Keep the main website light. Let the learning platform carry the deeper stages, tutorials, and student work.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {bookCovers.map((book) => (
              <article key={book.title} className="overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm">
                <SafeImage src={book.src} alt={book.title} className="aspect-[3/4] w-full object-cover" />
                <div className="p-6">
                  <p className="mb-3 text-xs font-black uppercase tracking-widest text-brand-green">{book.status}</p>
                  <h3 className="mb-2 text-2xl font-black text-slate-950">{book.title}</h3>
                  <p className="text-sm font-semibold leading-relaxed text-slate-600">{book.theme}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#513b78] py-16 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-[#8bd1cf]">Risk reducers</p>
            <h2 className="mb-5 text-4xl font-black tracking-tight lg:text-5xl">Built to start small and grow properly.</h2>
            <p className="text-lg font-semibold leading-relaxed text-white/80">
              The first version can launch as a free public preview with no child login. Paid school access, teacher dashboards, submissions, and AI accounts can come later.
            </p>
          </div>
          <div className="space-y-4">
            {objections.map(([question, answer]) => (
              <div key={question} className="rounded-2xl bg-white/10 p-5">
                <h3 className="mb-2 text-lg font-black">{question}</h3>
                <p className="text-sm font-semibold leading-relaxed text-white/75">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <NotebookPen className="mx-auto mb-5 text-brand-green" size={40} />
          <h2 className="mb-5 text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">Start with the free moon mission.</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
            See the complete idea in action: book, stage navigation, challenge pathways, and the first version of the learner workspace.
          </p>
          <Link to="/lms/learner" className="btn-primary inline-flex items-center justify-center gap-2">
            Try Book 1 Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
