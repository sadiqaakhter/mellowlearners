import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Trophy, 
  Star, 
  Clock, 
  Rocket, 
  Sparkles,
  Search,
  LayoutGrid
} from 'lucide-react';
import { characters, missions } from '../data/melluna';
import MissionCard from '../components/MissionCard';
import MellunaAI from '../components/MellunaAI';

export default function CharacterHub() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const character = characters.find(c => c.id === characterId);
  const characterMissions = missions.filter(m => m.characterId === characterId);

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Character Not Found</h1>
          <Link to="/lms/curriculum" className="text-brand-blue font-bold hover:underline">Back to Explorer</Link>
        </div>
      </div>
    );
  }

  const CharacterIcon = character.icon;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 lg:pb-12">
      {/* Dynamic Header based on character color */}
      <header className={`${character.color} text-white py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 font-black mb-12 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} /> Back
          </button>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-48 h-48 lg:w-64 lg:h-64 rounded-full border-8 border-white/20 shadow-2xl overflow-hidden"
            >
              <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                  <CharacterIcon size={32} />
                </div>
                <span className="text-xl font-black uppercase tracking-[0.2em] opacity-80">{character.title}</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-none">
                Meet {character.name}
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 font-medium max-w-2xl leading-relaxed">
                {character.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Domain Stats & Focus */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Domain Focus</h3>
            <p className="text-xl font-black text-slate-900 leading-tight">{character.focus}</p>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Core Topics</h3>
            <div className="flex flex-wrap gap-2">
              {character.topics.map((topic, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-600 uppercase tracking-wider">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Missions Available</h3>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-slate-900">{characterMissions.length}</span>
              <div className="flex flex-col">
                <span className="text-xs font-black text-brand-green uppercase">Ready to Start</span>
                <span className="text-xs font-medium text-slate-400">Updated weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Character Missions */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">{character.name}'s Missions</h2>
            <p className="text-slate-500 font-medium mt-1">Explore the {character.title.toLowerCase()} domain through hands-on tasks.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search missions..." 
                className="pl-12 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
            <Link to="/lms/curriculum" className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-brand-blue transition-colors">
              <LayoutGrid size={20} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characterMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>

        {characterMissions.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            <h3 className="text-2xl font-black text-slate-900 mb-2">More missions coming soon!</h3>
            <p className="text-slate-500 font-medium">Giffy is currently preparing new challenges for you.</p>
          </div>
        )}
      </main>

      {/* AI Assistant */}
      <MellunaAI />
    </div>
  );
}
