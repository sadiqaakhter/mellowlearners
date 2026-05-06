import { 
  Rocket, 
  Globe, 
  Waves, 
  Zap, 
  Cpu, 
  MessageSquare, 
  Beaker, 
  Lightbulb, 
  ShieldCheck,
  Brain,
  Box,
  Code,
  Hammer,
  Search,
  Eye
} from 'lucide-react';

export type CharacterId = 'giffy' | 'terra' | 'neru' | 'volt' | 'byte' | 'lexi' | 'nova' | 'ora' | 'senti';

export interface Character {
  id: CharacterId;
  name: string;
  title: string;
  description: string;
  focus: string;
  topics: string[];
  color: string;
  icon: any;
  avatar: string;
}

export const characters: Character[] = [
  {
    id: 'giffy',
    name: 'Giffy',
    title: 'Space & Exploration',
    description: 'Curious and imaginative, Giffy turns moon questions into engineering missions.',
    focus: 'Physics, Space Engineering, Robotics',
    topics: ['Moon Landing', 'Lunar Rover', 'Mars Colony', 'Space Farming'],
    color: 'bg-blue-600',
    icon: Rocket,
    avatar: 'assets/book1/page-16.jpg'
  },
  {
    id: 'terra',
    name: 'Foxi',
    title: 'Earth & Sustainability',
    description: 'An observant problem-solver who helps cities become cleaner and smarter.',
    focus: 'Environment, Smart Systems',
    topics: ['Pollution', 'Smart Cities', 'Climate Change', 'Energy Efficiency'],
    color: 'bg-green-600',
    icon: Globe,
    avatar: 'assets/books/foxi-clean-city.jpg'
  },
  {
    id: 'neru',
    name: 'Neru',
    title: 'Oceans & Water Systems',
    description: 'Playful and exploratory, Neru dives deep into the mysteries of the blue.',
    focus: 'Marine Biology, Underwater Tech',
    topics: ['Deep Sea', 'Coral Reefs', 'Ocean Pollution', 'Submersibles'],
    color: 'bg-cyan-500',
    icon: Waves,
    avatar: 'https://picsum.photos/seed/neru/200/200'
  },
  {
    id: 'volt',
    name: 'Volti',
    title: 'Energy & Engineering',
    description: 'Inventive and hands-on, Volt is always looking for better ways to power the world.',
    focus: 'Electricity, Systems, Renewable Energy',
    topics: ['Solar Power', 'Wind Energy', 'Circuits', 'Power Grids'],
    color: 'bg-amber-500',
    icon: Zap,
    avatar: 'assets/books/volti-power-mission.png'
  },
  {
    id: 'byte',
    name: 'Byte',
    title: 'AI & Coding',
    description: 'Logical and structured, Byte speaks the language of machines.',
    focus: 'Coding, AI, Data Science',
    topics: ['Machine Learning', 'Automation', 'Logic Gates', 'Algorithms'],
    color: 'bg-indigo-600',
    icon: Cpu,
    avatar: 'https://picsum.photos/seed/byte/200/200'
  },
  {
    id: 'lexi',
    name: 'Lexi',
    title: 'Language & Communication',
    description: 'Expressive and social, Lexi builds bridges through words and tech.',
    focus: 'Communication, AI Translation',
    topics: ['Storytelling', 'Global Language', 'Translation AI', 'Digital Media'],
    color: 'bg-rose-500',
    icon: MessageSquare,
    avatar: 'https://picsum.photos/seed/lexi/200/200'
  },
  {
    id: 'nova',
    name: 'Nova',
    title: 'Science & Experiments',
    description: 'Analytical and curious, Nova loves testing how the world works.',
    focus: 'Chemistry, Scientific Method',
    topics: ['Experiments', 'Chemical Reactions', 'Materials Science', 'Lab Safety'],
    color: 'bg-emerald-500',
    icon: Beaker,
    avatar: 'https://picsum.photos/seed/nova/200/200'
  },
  {
    id: 'ora',
    name: 'Ora',
    title: 'Design & Innovation',
    description: 'Creative and visionary, Ora turns big ideas into real inventions.',
    focus: 'Design Thinking, Product Creation',
    topics: ['Invention', 'Entrepreneurship', 'Prototyping', 'User Experience'],
    color: 'bg-orange-500',
    icon: Lightbulb,
    avatar: 'https://picsum.photos/seed/ora/200/200'
  },
  {
    id: 'senti',
    name: 'Senti',
    title: 'Digital Safety & Awareness',
    description: 'Calm and wise, Senti guides us through the digital landscape safely.',
    focus: 'Online Safety, AI Awareness, Digital Behavior',
    topics: ['Cyber Safety', 'Fake Content', 'Screen Balance', 'Digital Ethics'],
    color: 'bg-slate-600',
    icon: ShieldCheck,
    avatar: 'https://picsum.photos/seed/senti/200/200'
  }
];

export type Skill = 'AI' | 'Build' | 'Code' | 'Science' | 'Design' | 'Communication';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type AgeBand = 'Explorer (8-10)' | 'Builder (10-13)' | 'Innovator (13+)';
export type MissionType = 'Build' | 'Explore' | 'Think' | 'Create';

export interface Mission {
  id: string;
  title: string;
  description: string;
  characterId: CharacterId;
  skill: Skill;
  difficulty: Difficulty;
  ageBand: AgeBand;
  type: MissionType;
  thumbnail: string;
  duration: string;
  xp: number;
  bookId?: string;
}

export const missions: Mission[] = [
  {
    id: 'm1',
    title: "Land Safely on the Moon",
    description: "Help Giffy understand deceleration, stability, and safe lunar landing design.",
    characterId: 'giffy',
    skill: 'Design',
    difficulty: 'Medium',
    ageBand: 'Explorer (8-10)',
    type: 'Build',
    thumbnail: 'assets/book1/page-08.jpg',
    duration: '45 mins',
    xp: 500,
    bookId: 'b1'
  },
  {
    id: 'm2',
    title: "Micro:bit Speed Alert",
    description: "Code a simple warning system that reacts when a lander is falling too fast.",
    characterId: 'giffy',
    skill: 'Code',
    difficulty: 'Medium',
    ageBand: 'Builder (10-13)',
    type: 'Create',
    thumbnail: 'assets/book1/page-15.jpg',
    duration: '60 mins',
    xp: 750,
    bookId: 'b1'
  },
  {
    id: 'm3',
    title: "Smart City Traffic",
    description: "Help Terra design an AI system to reduce traffic pollution in a growing city.",
    characterId: 'terra',
    skill: 'AI',
    difficulty: 'Medium',
    ageBand: 'Builder (10-13)',
    type: 'Think',
    thumbnail: 'https://picsum.photos/seed/smartcity/800/600',
    duration: '40 mins',
    xp: 600
  },
  {
    id: 'm4',
    title: "Deep Sea Explorer",
    description: "Design a submersible that can withstand the pressure of the Mariana Trench.",
    characterId: 'neru',
    skill: 'Build',
    difficulty: 'Hard',
    ageBand: 'Innovator (13+)',
    type: 'Build',
    thumbnail: 'https://picsum.photos/seed/deepsea/800/600',
    duration: '90 mins',
    xp: 1000
  },
  {
    id: 'm5',
    title: "Solar Circuit Challenge",
    description: "Build a simple circuit powered by a solar cell to light up Giffy's base.",
    characterId: 'volt',
    skill: 'Code',
    difficulty: 'Easy',
    ageBand: 'Explorer (8-10)',
    type: 'Build',
    thumbnail: 'https://picsum.photos/seed/solar/800/600',
    duration: '30 mins',
    xp: 400
  },
  {
    id: 'm6',
    title: "AI Language Translator",
    description: "Train a simple machine learning model to translate basic STEM terms.",
    characterId: 'byte',
    skill: 'AI',
    difficulty: 'Medium',
    ageBand: 'Builder (10-13)',
    type: 'Think',
    thumbnail: 'https://picsum.photos/seed/aitranslate/800/600',
    duration: '50 mins',
    xp: 650
  },
  {
    id: 'm7',
    title: "Coral Reef Rescue",
    description: "Identify different species of coral and create a plan to protect them.",
    characterId: 'neru',
    skill: 'Science',
    difficulty: 'Easy',
    ageBand: 'Explorer (8-10)',
    type: 'Explore',
    thumbnail: 'https://picsum.photos/seed/coral/800/600',
    duration: '25 mins',
    xp: 350
  },
  {
    id: 'm8',
    title: "Fake News Detective",
    description: "Learn how to spot AI-generated images and misinformation online.",
    characterId: 'senti',
    skill: 'Communication',
    difficulty: 'Medium',
    ageBand: 'Builder (10-13)',
    type: 'Think',
    thumbnail: 'https://picsum.photos/seed/fakenews/800/600',
    duration: '35 mins',
    xp: 550
  }
];

export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  characterId: CharacterId;
  missions: string[];
}

export const books: Book[] = [
  {
    id: 'b1',
    title: "Giffy's Moon Adventure",
    description: "A space story that becomes a moon landing challenge with AI, code, 3D design, data, and hands-on building.",
    coverImage: 'assets/book1/giffy-cover.jpg',
    characterId: 'giffy',
    missions: ['m1', 'm2']
  },
  {
    id: 'b2',
    title: "Foxi's Clean City Mission",
    description: "Explore waste, reuse, recycling, city systems, and digital problem-solving for a cleaner future.",
    coverImage: 'assets/books/foxi-clean-city.jpg',
    characterId: 'terra',
    missions: []
  },
  {
    id: 'b3',
    title: "Volti's Power Mission",
    description: "Build, test, and innovate with electricity, renewable energy, circuits, and smart machines.",
    coverImage: 'assets/books/volti-power-mission.png',
    characterId: 'volt',
    missions: []
  }
];
