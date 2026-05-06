export interface MissionStep {
  title: string;
  description: string;
  image?: string;
  videoUrl?: string;
}

export interface Mission {
  id: string;
  title: string;
  topic: string;
  bookId: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  helpingGuide: string;
  funFacts: string[];
  steps: MissionStep[];
  thumbnail: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  topics: string[];
  missions: string[]; // Mission IDs
  coverImage: string;
}

export interface CurriculumData {
  books: Book[];
  missions: Mission[];
}
