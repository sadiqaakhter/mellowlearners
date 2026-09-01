export type BookStageId =
  | 'story'
  | 'wonder'
  | 'explore'
  | 'challenge'
  | 'design'
  | 'missions'
  | 'test'
  | 'reflection';

export type BookStage = {
  id: BookStageId;
  label: string;
  shortLabel: string;
  helper: string;
  objective: string;
  pages: string[];
  prompts: string[];
};

export type BookMission = {
  id: string;
  title: string;
  path: string;
  tool: string;
  summary: string;
  steps: string[];
  evidence: string;
  toolUrl?: string;
};

export type BookModule = {
  id: string;
  number: number;
  characterId: string;
  title: string;
  theme: {
    accent: string;
    soft: string;
  };
  stages: BookStage[];
  missions: BookMission[];
};

export const bookModules: Record<string, BookModule> = {
  b1: {
    id: 'b1',
    number: 1,
    characterId: 'giffy',
    title: "Giffy's Moon Adventure",
    theme: { accent: '#7651a9', soft: '#f3eef8' },
    stages: [
      {
        id: 'story',
        label: 'Story',
        shortLabel: 'Story',
        helper: 'Meet Giffy and discover why landing on the Moon is not as easy as buying a rocket ticket.',
        objective: 'Understand the story problem: the Moon has no air, so parachutes will not work.',
        pages: ['assets/book1/page-02.jpg', 'assets/book1/page-03.jpg', 'assets/book1/page-04.jpg', 'assets/book1/page-05.jpg', 'assets/book1/page-06.jpg'],
        prompts: ['What problem does Giffy notice?', 'Why is the Moon different from Earth?', 'What does Melluna help Giffy understand?'],
      },
      {
        id: 'wonder',
        label: 'Think & Wonder',
        shortLabel: 'Wonder',
        helper: 'Collect questions before choosing a solution.',
        objective: 'Ask useful science and engineering questions before building.',
        pages: ['assets/book1/page-07.jpg'],
        prompts: ['What do you already know about rockets?', 'What do you need to find out?', 'What would you test first?'],
      },
      {
        id: 'explore',
        label: 'Explore',
        shortLabel: 'Explore',
        helper: 'Travel through key Moon missions and notice how landing technology improved.',
        objective: 'Connect mission history to the engineering choices used today.',
        pages: ['assets/book1/page-08.jpg'],
        prompts: ['Which mission changed Moon exploration?', 'What improved over time?', 'What should the next mission learn from the past?'],
      },
      {
        id: 'challenge',
        label: 'GO / NO-GO Challenge',
        shortLabel: 'Challenge',
        helper: 'Read landing data and make a flight-controller decision.',
        objective: 'Use evidence—not guessing—to predict safe landing or crash risk.',
        pages: ['assets/book1/page-08.jpg'],
        prompts: ['Which readings show danger?', 'What makes a landing stable?', 'Which evidence supports your call?'],
      },
      {
        id: 'design',
        label: 'Design',
        shortLabel: 'Design',
        helper: 'Balance mass, science, power, and safety in a lunar lander.',
        objective: 'Make trade-offs and explain which features matter most.',
        pages: ['assets/book1/page-09.jpg', 'assets/book1/page-10.jpg', 'assets/book1/page-11.jpg', 'assets/book1/page-12.jpg'],
        prompts: ['Who needs help?', 'What is the real problem?', 'Which feature must your design protect?'],
      },
      {
        id: 'missions',
        label: 'Choose a Mission',
        shortLabel: 'Mission',
        helper: 'Choose one Book 1 pathway and create evidence of your work.',
        objective: 'Turn the Moon problem into a model, code project, AI experiment, or physical test.',
        pages: ['assets/book1/page-13.jpg', 'assets/book1/page-14.jpg', 'assets/book1/page-15.jpg'],
        prompts: ['Which pathway fits your strengths?', 'What will you make?', 'What evidence will show that it worked?'],
      },
      {
        id: 'test',
        label: 'Test & Improve',
        shortLabel: 'Improve',
        helper: 'Record a test, change one variable, and compare the result.',
        objective: 'Use fair testing to improve your chosen solution.',
        pages: ['assets/book1/page-15.jpg'],
        prompts: ['What did you test?', 'What one thing did you change?', 'Did the result improve?'],
      },
      {
        id: 'reflection',
        label: 'Reflect',
        shortLabel: 'Reflect',
        helper: 'Finish the mission with evidence, learning, and a next-step idea.',
        objective: 'Explain what worked, what failed, and what you would improve next.',
        pages: ['assets/book1/page-16.jpg'],
        prompts: ['What did you build or test?', 'What worked best?', 'What would you improve next?'],
      },
    ],
    missions: [
      {
        id: 'gesture-ai',
        title: 'Gesture Control AI',
        path: 'AI Path',
        tool: 'Teachable Machine',
        summary: 'Train a model to recognize STOP, SAFE, and FORWARD mission signals.',
        steps: ['Create an image project', 'Train three gesture classes', 'Test each signal in different lighting'],
        evidence: 'Record which gesture the model confuses most.',
        toolUrl: 'https://teachablemachine.withgoogle.com/',
      },
      {
        id: 'lunar-lander',
        title: '3D Lunar Lander',
        path: 'Design Path',
        tool: 'Tinkercad',
        summary: 'Design a stable lander with a wide base, strong legs, and useful science tools.',
        steps: ['Make a short, wide body', 'Add four outward legs and footpads', 'Check the centre of mass'],
        evidence: 'Capture a front and side view of the lander.',
        toolUrl: 'https://www.tinkercad.com/',
      },
      {
        id: 'speed-alert',
        title: 'Micro:bit Speed Alert',
        path: 'Code Path',
        tool: 'MakeCode',
        summary: 'Create a warning signal for a lander that is falling too fast.',
        steps: ['Start a Micro:bit project', 'Read movement or acceleration', 'Show a warning icon above the limit'],
        evidence: 'Save a screenshot of the blocks and your chosen limit.',
        toolUrl: 'https://makecode.microbit.org/',
      },
      {
        id: 'cushion-crash',
        title: 'Cushion the Crash',
        path: 'Build Path',
        tool: 'Household materials',
        summary: 'Build and test a cup lander that protects its passenger during impact.',
        steps: ['Build a lander with legs', 'Drop it from three heights', 'Change one variable and test again'],
        evidence: 'Keep a test table showing height, change, and result.',
      },
    ],
  },
};

export function getBookModule(bookId: string) {
  return bookModules[bookId] || bookModules.b1;
}
