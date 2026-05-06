import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Calendar, Filter, Rocket, School, Tv, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SafeImage from '../components/SafeImage';
import { EventCategory, eventGallery } from '../data/eventGallery';

const categories: EventCategory[] = [
  'All',
  'News Coverage',
  'Moon Observation',
  'Competitions',
  'STEM Activities',
  'School Workshops',
  'Student Ebooks',
  'Other',
];

const years = ['All', '2025', '2024', '2023', '2022'];

function titleCase(text: string) {
  return text
    .replace(/\.[^.]+$/, '')
    .replace(/\.+/g, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const eventItems = eventGallery.filter((event) => !event.hidden);
const newsVideoSrc = 'events/video/news-coverage-2025.mp4';

const stats = [
  { label: 'Event photos visible', value: eventItems.length.toString(), icon: Calendar },
  { label: 'Moon observation years', value: '3', icon: Rocket },
  { label: 'Student ebook examples', value: '8', icon: BookOpen },
  { label: 'Workshop proof set', value: '12', icon: School },
];

export default function Events() {
  const [activeYear, setActiveYear] = useState('All');
  const [activeCategory, setActiveCategory] = useState<EventCategory>('All');

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredEvents = useMemo(() => {
    return eventItems.filter((event) => {
      const yearMatch = activeYear === 'All' || event.year === activeYear;
      const categoryMatch = activeCategory === 'All' || event.category === activeCategory;
      return yearMatch && categoryMatch;
    });
  }, [activeCategory, activeYear]);

  return (
    <div className="bg-white pt-20">
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-widest text-brand-green">Events, workshops, and media proof</p>
            <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl">
              Social proof from real STEM learning moments.
            </h1>
            <p className="mb-8 max-w-2xl text-lg font-semibold leading-relaxed text-slate-300">
              Mellow Learners has run moon observation events, competitions, school STEM workshops, student ebook activities, and media-covered learning moments.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={scrollToGallery} className="btn-primary inline-flex items-center justify-center gap-2">
                View Gallery <ArrowRight size={20} />
              </button>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-white/10">
                Host an Event
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['lunar-2025.png', 'MO24-1.jpg', 'workshop-1.jpg', 'ebook-1.png'].map((file) => (
              <div key={file} className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
                <SafeImage src={`events/${file}`} alt={titleCase(file)} className="aspect-[4/3] h-full w-full object-contain bg-slate-900" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-[24px] bg-white p-6 text-center shadow-sm">
              <stat.icon className="mx-auto mb-4 text-brand-green" size={30} />
              <h2 className="text-3xl font-black text-slate-950">{stat.value}</h2>
              <p className="mt-2 text-xs font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fff8e8] py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-green">
              <Tv size={16} />
              National television coverage
            </div>
            <h2 className="mb-5 text-4xl font-black tracking-tight text-slate-950 lg:text-5xl">National TV coverage strengthens trust fast.</h2>
            <p className="mb-6 text-lg font-medium leading-relaxed text-slate-700">
              This coverage shows Mellow Learners activity beyond the website: real events, real students, and public recognition. Add more event videos later and this area can become a complete media proof library.
            </p>
          </div>
          <div className="overflow-hidden rounded-[32px] border-8 border-white bg-slate-950 shadow-xl">
            <video className="aspect-video w-full bg-slate-950 object-contain" controls preload="metadata" poster="events/lunar-2025.png">
              <source src={newsVideoSrc} type="video/mp4" />
              Your browser does not support embedded video playback.
            </video>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-green">Gallery of learning</p>
              <h2 className="section-title">Browse the uploaded event proof</h2>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Filter size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Filter proof</span>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                  activeYear === year ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === category ? 'bg-brand-green text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredEvents.map((event) => (
              <motion.article
                layout
                key={event.file}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-sm"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100">
                  <SafeImage src={`events/${event.file}`} alt={event.title} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-700">
                    {event.year}
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-brand-green">{event.category}</p>
                  <h3 className="text-lg font-black leading-tight text-slate-950">{event.title}</h3>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (
            <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
              <p className="font-bold text-slate-500">No event proof found for this filter.</p>
              <button
                onClick={() => {
                  setActiveYear('All');
                  setActiveCategory('All');
                }}
                className="mt-4 text-sm font-black uppercase tracking-widest text-brand-green"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Users className="mx-auto mb-6 text-brand-green" size={44} />
          <h2 className="mb-5 text-4xl font-black tracking-tight lg:text-5xl">Want to host a Mellow Learners STEM event?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg font-semibold leading-relaxed text-slate-300">
            Bring story-led STEM missions, moon observation activities, coding, robotics, AI literacy, or student publishing workshops to your school or community.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Start a Conversation <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
