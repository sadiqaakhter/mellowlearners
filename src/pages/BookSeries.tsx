import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Code, Cuboid, Hammer, NotebookPen, Sparkles } from 'lucide-react';
import SafeImage from '../components/SafeImage';

const spreads = [
  { src: 'assets/book1/page-02.jpg', label: 'Story: Giffy sees the Artemis news' },
  { src: 'assets/book1/page-03.jpg', label: 'Inquiry: no air means no parachutes' },
  { src: 'assets/book1/page-04.jpg', label: 'Melluna: AI moon guide appears' },
  { src: 'assets/book1/page-05.jpg', label: 'Engineering: build, test, fail, adjust' },
  { src: 'assets/book1/page-08.jpg', label: 'Data: real lander evidence' },
  { src: 'assets/book1/page-13.jpg', label: 'Mission tasks: AI, design, code, build' },
];

const collection = [
  {
    src: 'assets/book1/giffy-cover.jpg',
    title: "Giffy's Moon Adventure",
    focus: 'Space exploration, Moon landers, AI, data, 3D design, Micro:bit, engineering',
  },
  {
    src: 'assets/books/foxi-clean-city.jpg',
    title: "Foxi's Clean City Mission",
    focus: 'Sustainability, clean cities, waste, climate, systems, media and community action',
  },
  {
    src: 'assets/books/volti-power-mission.png',
    title: "Volti's Power Mission",
    focus: 'Electricity, renewable energy, circuits, power grids, smart machines and innovation',
  },
];

const tasks = [
  ['AI', Brain, 'Gesture Control AI', 'Train a model to recognize STOP, SAFE, and FORWARD hand signals.'],
  ['Design', Cuboid, '3D Lunar Lander', 'Use Tinkercad to build a stable digital lander with a wide base.'],
  ['Code', Code, 'Micro:bit Speed Alert', 'Program a Micro:bit warning system using gestures or acceleration.'],
  ['Build', Hammer, 'Cushion the Crash', 'Construct and test a physical lander from simple classroom materials.'],
];

export default function BookSeries() {
  return (
    <div className="pt-20">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-[28px] border-8 border-white/10 shadow-2xl">
            <SafeImage src="assets/book1/giffy-cover.jpg" alt="Giffy's Moon Adventure cover" className="w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-green">
              <Sparkles size={16} /> Book 1 · Melluna Universe
            </p>
            <h1 className="mb-6 text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl">
              Giffy&apos;s Moon Adventure
            </h1>
            <p className="mb-8 max-w-2xl text-lg font-semibold leading-relaxed text-slate-300">
              A STEM story + challenge booklet where children help Giffy learn how Moon landers slow down,
              stay balanced, and land safely. The book bridges illustrated storytelling with AI, coding,
              3D design, data, engineering, and reflection.
            </p>
            <div className="grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
              {['Ages 10–13', '50 min lesson', '4 tech pathways', 'QR-linked LMS'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-black">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-green">Book-to-learning flow</p>
            <h2 className="section-title">A reusable STEM lesson system, not just a reading book</h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600">
              Book 1 follows a five-part cycle: story, inquiry, math/science challenge, mission tasks, and reflection.
              The website will turn each part into guided tutorials, quizzes, journals, and tool-based activities.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {spreads.map((spread) => (
              <article key={spread.src} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                <SafeImage src={spread.src} alt={spread.label} className="aspect-[16/10] w-full object-cover" />
                <div className="p-5">
                  <p className="text-sm font-black text-slate-900">{spread.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-green">Book collection</p>
            <h2 className="section-title">Melluna Universe starts with character-led STEM worlds</h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600">
              Each character opens a different technology theme, but the structure stays familiar for learners:
              think, design, build, test, improve, and share.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {collection.map((book) => (
              <article key={book.title} className="overflow-hidden rounded-[28px] bg-white shadow-sm">
                <SafeImage src={book.src} alt={book.title} className="aspect-[3/4] w-full object-cover" />
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-black text-slate-950">{book.title}</h3>
                  <p className="text-sm font-semibold leading-relaxed text-slate-600">{book.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8e8] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-purple">Student choice</p>
              <h2 className="section-title">Four mission tasks from one Moon problem</h2>
            </div>
            <p className="max-w-xl text-base font-semibold leading-relaxed text-slate-600">
              Each pathway teaches a different technology skill while keeping the core story problem the same:
              can Giffy land safely on the Moon?
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {tasks.map(([tag, Icon, title, text]) => {
              const TaskIcon = Icon as typeof Brain;
              return (
                <article key={title as string} className="rounded-[28px] border border-slate-100 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-brand-green">
                      {tag as string}
                    </span>
                    <TaskIcon className="text-brand-purple" size={28} />
                  </div>
                  <h3 className="mb-3 text-xl font-black text-slate-950">{title as string}</h3>
                  <p className="text-sm font-semibold leading-relaxed text-slate-600">{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-[#513b78] p-8 text-white lg:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-widest text-[#8bd1cf]">Next web layer</p>
                <h2 className="mb-5 text-4xl font-black tracking-tight lg:text-5xl">
                  Book pages become interactive modules on learn.mellowlearners.net
                </h2>
                <p className="max-w-2xl text-lg font-semibold leading-relaxed text-white/80">
                  Learners scan from the book, open the mission, follow tutorials, complete activity-based quizzes,
                  and write a mission debrief. Teacher accounts and school dashboards can come after the free-first version.
                </p>
              </div>
              <div className="space-y-3">
                {['Story reader', 'Mission tutorials', 'Quizzes', 'Digital journal', 'Melluna AI guide'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-black">
                    <NotebookPen size={22} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Discuss School or Conference Collaboration <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
