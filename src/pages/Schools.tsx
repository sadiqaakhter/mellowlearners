import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Calendar, CheckCircle2, GraduationCap, School, Users } from 'lucide-react';
import SafeImage from '../components/SafeImage';

const offers = [
  {
    icon: BookOpen,
    title: 'Story-based STEM modules',
    text: 'Reusable booklets with story, inquiry, challenge pathways, design thinking, and reflection.',
  },
  {
    icon: Brain,
    title: 'Technology playground',
    text: 'Guided links and tutorials for AI, Micro:bit, Scratch, Tinkercad, Canva, data, and media tasks.',
  },
  {
    icon: GraduationCap,
    title: 'Teacher-ready support',
    text: 'Teacher notes, materials lists, facilitation prompts, inclusion notes, and extension options.',
  },
  {
    icon: Calendar,
    title: 'Workshops and pilots',
    text: 'Virtual or school-based STEM days, capstone challenges, moon missions, and creative technology sessions.',
  },
];

export default function Schools() {
  return (
    <div className="pt-20">
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-widest text-brand-green">For schools and partners</p>
            <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl">
              A practical STEM program children can read, build, and present.
            </h1>
            <p className="max-w-2xl text-lg font-semibold leading-relaxed text-slate-300">
              Mellow Learners helps schools run story-led STEM lessons without starting from a blank page.
              Each module gives teachers a narrative hook, real-world problem, hands-on options, and digital tool pathways.
            </p>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-3">
            <SafeImage src="assets/book1/page-01.jpg" alt="Teacher guide from Giffy's Moon Adventure" className="rounded-[24px] object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-purple">What schools get</p>
            <h2 className="section-title">Flexible STEM missions for classrooms, clubs, and capstone projects</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {offers.map((item) => (
              <article key={item.title} className="card">
                <item.icon className="mb-6 text-brand-green" size={32} />
                <h3 className="mb-3 text-xl font-black text-slate-950">{item.title}</h3>
                <p className="text-sm font-semibold leading-relaxed text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8e8] py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-6 text-4xl font-black tracking-tight text-slate-950">Pilot format</h2>
            <p className="mb-8 text-lg font-medium leading-relaxed text-slate-700">
              A school can start with one 50–90 minute Moon Mission session, then expand into clubs,
              multi-week capstones, or a full story-based STEM series.
            </p>
            <div className="space-y-4">
              {[
                'Read the story hook and identify the problem.',
                'Choose a mission pathway: AI, code, 3D design, build, data, or media.',
                'Use real tools with step-by-step guidance.',
                'Share a mission debrief and improvement plan.',
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 font-bold text-slate-700">
                  <CheckCircle2 className="shrink-0 text-brand-green" size={22} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <School className="mb-6 text-brand-green" size={44} />
            <h3 className="mb-4 text-3xl font-black text-slate-950">Good for</h3>
            <div className="grid gap-3">
              {['STEM clubs', 'Primary and middle school classes', 'Innovation labs', 'AI literacy weeks', 'Space science events', 'Teacher professional development'].map((item) => (
                <span key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-700">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Users className="mx-auto mb-6 text-brand-green" size={44} />
          <h2 className="mb-5 text-4xl font-black tracking-tight text-slate-950">Interested in a school pilot or collaboration?</h2>
          <p className="mb-8 text-lg font-medium leading-relaxed text-slate-600">
            We are currently shaping the first free-first learning platform and looking for educators, schools,
            STEM communities, and conference partners who want to test story-led technology missions.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
              Start a Conversation <ArrowRight size={20} />
            </Link>
            <Link to="/events" className="btn-secondary inline-flex items-center justify-center gap-2 bg-white">
              View Event Proof
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
