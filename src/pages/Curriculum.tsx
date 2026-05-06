import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Users, 
  Zap, 
  BookOpen, 
  LayoutGrid,
  X,
  Sparkles
} from 'lucide-react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { characters, missions, books, Skill, Difficulty, AgeBand, CharacterId } from '../data/melluna';
import MissionCard from '../components/MissionCard';
import MellunaAI from '../components/MellunaAI';

type Tab = 'characters' | 'skills' | 'books' | 'missions';

export default function MissionExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isPublic = !location.pathname.startsWith('/lms');
  const initialTab = (searchParams.get('tab') as Tab) || 'missions';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters
  const [selectedAge, setSelectedAge] = useState<AgeBand | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab') as Tab;
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const filteredMissions = useMemo(() => {
    return missions.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           m.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAge = !selectedAge || m.ageBand === selectedAge;
      const matchesDifficulty = !selectedDifficulty || m.difficulty === selectedDifficulty;
      const matchesSkill = !selectedSkill || m.skill === selectedSkill;
      const matchesCharacter = !selectedCharacter || m.characterId === selectedCharacter;
      
      return matchesSearch && matchesAge && matchesDifficulty && matchesSkill && matchesCharacter;
    });
  }, [searchQuery, selectedAge, selectedDifficulty, selectedSkill, selectedCharacter]);

  const tabs = [
    { id: 'characters', label: 'By Character', icon: Users },
    { id: 'skills', label: 'By Skill', icon: Zap },
    { id: 'books', label: 'By Book', icon: BookOpen },
    { id: 'missions', label: 'All Missions', icon: LayoutGrid },
  ];

  const ageBands: AgeBand[] = ['Explorer (8-10)', 'Builder (10-13)', 'Innovator (13+)'];
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
  const skills: Skill[] = ['AI', 'Build', 'Code', 'Science', 'Design', 'Communication'];

  return (
    <div className={`min-h-screen bg-slate-50/50 pb-24 lg:pb-12 ${isPublic ? 'pt-24' : ''}`}>
      {/* Header - Only show in LMS context */}
      {!isPublic && (
        <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/lms/learner" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
                  <Sparkles size={24} />
                </div>
                <span className="text-xl font-black tracking-tighter text-slate-900">Mission Explorer</span>
              </Link>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text"
                  placeholder="Search missions, topics, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/lms/learner" className="text-sm font-bold text-brand-blue hover:underline">Back to Dashboard</Link>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Public Header Title */}
        {isPublic && (
          <div className="mb-12">
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-4">
              Our <span className="text-gradient">Curriculum</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-2xl">
              Explore our story-driven STEM journey. From AI and coding to space exploration and digital art, discover the missions that shape future innovators.
            </p>
          </div>
        )}
        {/* Primary Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Tab);
                  setSearchParams({ tab: tab.id });
                }}
                className={`flex items-center gap-3 px-6 py-4 rounded-[24px] font-black transition-all ${
                  isActive 
                    ? 'bg-brand-blue text-white shadow-xl shadow-brand-blue/20 scale-105' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters (Only for Missions tab) */}
        {activeTab === 'missions' && (
          <div className="mb-12 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-slate-400 mr-2">
                <Filter size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Filters:</span>
              </div>
              
              {/* Age Filters */}
              <div className="flex flex-wrap gap-2">
                {ageBands.map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(selectedAge === age ? null : age)}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                      selectedAge === age 
                        ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' 
                        : 'bg-white text-slate-600 border border-slate-100 hover:border-brand-green'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>

              <div className="w-px h-6 bg-slate-200 hidden sm:block" />

              {/* Difficulty Filters */}
              <div className="flex flex-wrap gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                      selectedDifficulty === diff 
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                        : 'bg-white text-slate-600 border border-slate-100 hover:border-brand-orange'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              <div className="w-px h-6 bg-slate-200 hidden sm:block" />

              {/* Skill Filters */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                      selectedSkill === skill 
                        ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' 
                        : 'bg-white text-slate-600 border border-slate-100 hover:border-brand-purple'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {(selectedAge || selectedDifficulty || selectedSkill || selectedCharacter) && (
                <button 
                  onClick={() => {
                    setSelectedAge(null);
                    setSelectedDifficulty(null);
                    setSelectedSkill(null);
                    setSelectedCharacter(null);
                  }}
                  className="flex items-center gap-1 text-xs font-black text-rose-500 hover:underline ml-auto"
                >
                  <X size={14} /> Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'characters' && (
              <motion.div
                key="characters"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {characters.map((char) => {
                  const Icon = char.icon;
                  return (
                    <Link 
                      key={char.id}
                      to={`/lms/character/${char.id}`}
                      className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 group hover:scale-[1.02] transition-all"
                    >
                      <div className={`w-20 h-20 ${char.color} rounded-3xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                        <Icon size={40} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">{char.name}</h3>
                      <p className="text-sm font-black text-brand-blue uppercase tracking-widest mb-4">{char.title}</p>
                      <p className="text-slate-500 font-medium mb-6 line-clamp-2">{char.description}</p>
                      <div className="flex items-center gap-2 text-brand-blue font-black">
                        Enter Domain <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      setSelectedSkill(skill);
                      setActiveTab('missions');
                    }}
                    className="bg-white rounded-[40px] p-10 shadow-xl border border-slate-100 group text-left hover:scale-[1.02] transition-all"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <Zap size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">{skill}</h3>
                    <p className="text-slate-500 font-medium mb-8">Explore all missions focused on {skill.toLowerCase()} skills and tools.</p>
                    <div className="flex items-center gap-2 text-brand-blue font-black">
                      View Missions <ChevronRight size={20} />
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {activeTab === 'books' && (
              <motion.div
                key="books"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {books.map((book) => (
                  <div key={book.id} className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-slate-100 group flex flex-col">
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-black text-white mb-2">{book.title}</h3>
                        <p className="text-white/70 text-sm font-medium line-clamp-2">{book.description}</p>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{book.missions.length} Missions</span>
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-blue" />
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-green" />
                        </div>
                      </div>
                      <button className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black hover:scale-105 transition-transform">
                        Read & Start
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'missions' && (
              <motion.div
                key="missions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {filteredMissions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMissions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                      <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No missions found</h3>
                    <p className="text-slate-500 font-medium mb-8">Try adjusting your filters or search query.</p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedAge(null);
                        setSelectedDifficulty(null);
                        setSelectedSkill(null);
                        setSelectedCharacter(null);
                      }}
                      className="bg-brand-blue text-white px-8 py-3 rounded-2xl font-black hover:scale-105 transition-transform"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* AI Assistant */}
      <MellunaAI />
    </div>
  );
}
