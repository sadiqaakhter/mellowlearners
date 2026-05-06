import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Trophy, Star, ChevronRight } from 'lucide-react';
import { Mission, characters } from '../data/melluna';

interface MissionCardProps {
  mission: Mission;
  key?: string;
}

export default function MissionCard({ mission }: MissionCardProps) {
  const character = characters.find(c => c.id === mission.characterId);
  const CharacterIcon = character?.icon;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={mission.thumbnail} 
          alt={mission.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Character Badge */}
        <div className={`absolute top-4 left-4 ${character?.color} text-white p-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md bg-opacity-90`}>
          {CharacterIcon && <CharacterIcon size={16} />}
          <span className="text-xs font-black uppercase tracking-wider">{character?.name}</span>
        </div>

        {/* Skill Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
          <Star size={12} className="text-brand-orange fill-brand-orange" />
          <span className="text-[10px] font-black uppercase tracking-widest">{mission.skill}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
            mission.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            mission.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
            'bg-rose-100 text-rose-700'
          }`}>
            {mission.difficulty}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {mission.ageBand}
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-brand-blue transition-colors">
          {mission.title}
        </h3>
        <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2">
          {mission.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock size={14} />
              <span className="text-xs font-bold">{mission.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-brand-green">
              <Trophy size={14} />
              <span className="text-xs font-bold">{mission.xp} XP</span>
            </div>
          </div>
          
          <Link 
            to={`/lms/mission/${mission.id}`}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-brand-blue group-hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
