import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, Brain, Linkedin, Mail, Rocket, ShieldCheck, Star, Users } from 'lucide-react';
import SafeImage from '../components/SafeImage';

const stats = [
  { label: 'Experience', value: '11+ years', sub: 'STEM education, EdTech, and creative learning media', icon: Star },
  { label: 'Learner reach', value: '500+', sub: 'Children reached through workshops and programs', icon: Rocket },
  { label: 'Creative output', value: '500+', sub: 'Children’s books and educational media projects', icon: BookOpen },
  { label: 'Focus', value: 'AI + STEM', sub: 'Robotics, coding, design thinking, and digital literacy', icon: Brain },
];

const team = [
  {
    name: 'Sadiqa Akhter',
    role: 'STEM Certified Curriculum Designer',
    description:
      'Founder, STEM educator, children’s learning media creator, and designer of the Mellow Learners story-to-mission curriculum model.',
    image: 'assets/team/sadiqa.jpg',
  },
  {
    name: 'Samad Ullah Khan',
    role: 'Director',
    description:
      'Supports company direction, operational structure, partnerships, and long-term growth planning for Mellow Learners Ltd.',
    image: 'assets/team/samad-ullah-khan.jpg',
  },
  {
    name: 'Saima Shumail',
    role: 'HR',
    description:
      'Supports people operations, coordination, team readiness, and organizational support as the platform grows.',
    image: 'assets/team/saima-shumail.jpg',
  },
];

export default function Founder() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-widest text-brand-green">Founder and curriculum lead</p>
            <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-tight text-slate-950 lg:text-7xl">
              Sadiqa Akhter
            </h1>
            <p className="mb-8 max-w-2xl text-lg font-medium leading-relaxed text-slate-700">
              Sadiqa Akhter is a STEM certified curriculum designer, EdTech founder, digital artist, and children’s learning media creator. She founded Mellow Learners Ltd to turn illustrated STEM books into hands-on technology missions for children.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="https://www.linkedin.com/in/sadiqa-akhter/" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2">
                <Linkedin size={20} /> Connect on LinkedIn
              </a>
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center gap-2 bg-white">
                <Mail size={20} /> Contact
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px] border-8 border-white bg-white shadow-2xl">
            <SafeImage src="assets/team/sadiqa.jpg" alt="Sadiqa Akhter" className="aspect-[4/5] h-full w-full object-cover object-top" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-[28px] border border-slate-100 bg-white p-7 text-center shadow-sm">
              <stat.icon className="mx-auto mb-5 text-brand-green" size={32} />
              <h3 className="mb-2 text-3xl font-black text-slate-950">{stat.value}</h3>
              <p className="mb-3 text-xs font-black uppercase tracking-widest text-brand-green">{stat.label}</p>
              <p className="text-sm font-semibold leading-relaxed text-slate-500">{stat.sub}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fff8e8] py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <h2 className="section-title">Why Mellow Learners exists</h2>
            <div className="space-y-5 text-lg font-medium leading-relaxed text-slate-700">
              <p>
                Many children meet STEM as disconnected facts or worksheets. Mellow Learners begins with characters, questions, and emotional curiosity, then moves learners into real tools and practical challenges.
              </p>
              <p>
                The model connects STEM workshops, Micro:bit, Scratch, AI tools, design thinking, illustration, and children’s publishing into one learning ecosystem.
              </p>
              <p>
                The long-term goal is a global, low-cost learning platform where children can read STEM stories, enter character-led missions, use technology safely, and build projects they are proud to share.
              </p>
            </div>
          </div>
          <div className="rounded-[32px] bg-slate-950 p-8 text-white">
            <ShieldCheck className="mb-6 text-brand-green" size={42} />
            <h3 className="mb-5 text-3xl font-black">Credibility areas</h3>
            <div className="space-y-3">
              {[
                'Google Certified Educator Level 2',
                'STEM.org and NASA Open Science learning credentials',
                'K-8 STEM workshops and space learning events',
                'Top Rated Upwork freelancer with international clients',
                'Founder of Source II Studio and Mellow Learners Ltd',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-green">Mellow Learners Ltd team</p>
            <h2 className="section-title">Small founding team, clear roles</h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600">
              This team section adds trust for parents, schools, partners, and proposal reviewers by showing the people behind the platform.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {team.map((person) => (
              <article key={person.name} className="overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm">
                <SafeImage src={person.image} alt={person.name} className="aspect-[4/5] w-full object-cover object-top" />
                <div className="p-6">
                  <p className="mb-2 text-xs font-black uppercase tracking-widest text-brand-green">{person.role}</p>
                  <h3 className="mb-3 text-2xl font-black text-slate-950">{person.name}</h3>
                  <p className="text-sm font-semibold leading-relaxed text-slate-600">{person.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Award className="mx-auto mb-6 text-brand-green" size={42} />
          <h2 className="mb-6 text-4xl font-black tracking-tight text-slate-950">
            “We don’t just teach STEM. We help children imagine, build, test, and explain solutions.”
          </h2>
          <p className="mb-8 text-lg font-medium leading-relaxed text-slate-600">
            Mellow Learners is being built as a practical bridge between illustrated books and real technology tasks.
          </p>
          <Link to="/book-series" className="btn-primary inline-flex items-center gap-2">
            Explore the First Book <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
