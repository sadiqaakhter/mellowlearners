import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Code, Hammer, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react';
import SafeImage from '../components/SafeImage';

const values = [
  {
    icon: Lightbulb,
    title: 'Curiosity first',
    text: 'Children begin with a story question before they meet formulas, tools, or technical vocabulary.',
  },
  {
    icon: Hammer,
    title: 'Build to understand',
    text: 'Every module leads to a project, test, model, data table, design, or reflection.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe technology use',
    text: 'AI and digital tools are introduced with child-friendly guidance, clear purpose, and teacher/parent awareness.',
  },
];

const stack = [
  ['Books', BookOpen, 'Illustrated STEM stories that introduce a problem children want to solve.'],
  ['Missions', Sparkles, 'Character-led challenges that guide students through inquiry and design thinking.'],
  ['Tools', Code, 'Scratch, Micro:bit, Teachable Machine, Tinkercad, Canva, data activities, and more.'],
  ['AI Guide', Brain, 'Melluna helps students ask better questions, check facts, and reflect on their work.'],
];

export default function About() {
  return (
    <div className="pt-20">
      <section className="bg-[#fff8e8] py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-widest text-brand-green">About Mellow Learners Ltd</p>
            <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-tight text-slate-950 lg:text-7xl">
              A STEM EdTech startup building a technology playground for kids.
            </h1>
            <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-700">
              Mellow Learners creates story-driven STEM books and digital missions for children ages 8–14+.
              Our goal is to make future-ready learning accessible, creative, and practical: children read,
              wonder, build, test, use real digital tools, and explain what they discovered.
            </p>
          </div>
          <div className="overflow-hidden rounded-[32px] border-8 border-white bg-white shadow-2xl">
            <SafeImage src="assets/book1/page-04.jpg" alt="Giffy meets Melluna, the AI Moon Guide" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-purple">What we are building</p>
            <h2 className="section-title">Books are the doorway. Technology is the playground.</h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600">
              The platform does not replace creative tools. It guides children into them, shows what to do,
              and brings them back to reflect, submit, or continue the mission.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {stack.map(([title, Icon, text]) => {
              const StackIcon = Icon as typeof BookOpen;
              return (
                <article key={title as string} className="card">
                  <StackIcon className="mb-6 text-brand-green" size={32} />
                  <h3 className="mb-3 text-xl font-black text-slate-950">{title as string}</h3>
                  <p className="text-sm font-semibold leading-relaxed text-slate-600">{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-8">
                <item.icon className="mb-6 text-brand-green" size={34} />
                <h3 className="mb-3 text-2xl font-black">{item.title}</h3>
                <p className="font-semibold leading-relaxed text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-black tracking-tight text-slate-950">Our long-term vision is free-first STEM learning.</h2>
          <p className="mb-8 text-lg font-medium leading-relaxed text-slate-600">
            We want Mellow Learners to grow into an accessible learning ecosystem like a creative STEM lab online:
            open learning for children, school pilots for deeper implementation, and teacher dashboards when the product is ready.
          </p>
          <Link to="/book-series" className="btn-primary inline-flex items-center gap-2">
            See Book 1 in Action <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
