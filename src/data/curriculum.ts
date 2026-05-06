import { CurriculumData } from '../types/curriculum';

export const curriculumData: CurriculumData = {
  books: [
    {
      id: 'book-1',
      title: "Giffy's Moon Mission",
      description: "Join Giffy on an epic journey to the moon! Learn about space travel, lunar landers, and survival in space.",
      topics: ['Space Exploration', 'Engineering', 'Physics'],
      missions: ['m1', 'm2', 'm3'],
      coverImage: 'https://picsum.photos/seed/moonbook/800/1000'
    },
    {
      id: 'book-2',
      title: "Mars Colony Builders",
      description: "The next frontier! Help Giffy and the team build the first sustainable colony on the Red Planet.",
      topics: ['Sustainability', 'Architecture', 'Robotics'],
      missions: ['m4', 'm5'],
      coverImage: 'https://picsum.photos/seed/marsbook/800/1000'
    }
  ],
  missions: [
    {
      id: 'm1',
      bookId: 'book-1',
      title: "The Perfect Lander",
      topic: 'Engineering',
      difficulty: 'Beginner',
      duration: '45 mins',
      description: "Design and build a lunar lander that can land safely on the moon's surface without crashing!",
      helpingGuide: "Think about the center of gravity. A wider base helps with stability during landing.",
      funFacts: [
        "The Apollo Lunar Module was the first crewed vehicle to land on the moon.",
        "Moon gravity is only 1/6th of Earth's gravity!"
      ],
      thumbnail: 'https://picsum.photos/seed/lander/400/300',
      steps: [
        {
          title: "Gather Your Materials",
          description: "You'll need a paper cup, some cardboard, marshmallows (for shock absorbers), and tape.",
          image: 'https://picsum.photos/seed/step1/600/400'
        },
        {
          title: "Design the Base",
          description: "Cut a square piece of cardboard. This will be the main platform for your lander.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
        },
        {
          title: "Add Shock Absorbers",
          description: "Tape the marshmallows to the bottom of your cardboard base. These will absorb the impact!",
          image: 'https://picsum.photos/seed/step3/600/400'
        }
      ]
    },
    {
      id: 'm2',
      bookId: 'book-1',
      title: "Lunar Oxygen Filter",
      topic: 'Science',
      difficulty: 'Intermediate',
      duration: '60 mins',
      description: "Create a system to filter oxygen from lunar regolith (moon soil).",
      helpingGuide: "Chemical reactions often need heat. How can we use solar energy on the moon?",
      funFacts: [
        "Moon soil contains about 40% oxygen by weight!",
        "NASA is currently testing technologies to extract oxygen on the moon."
      ],
      thumbnail: 'https://picsum.photos/seed/oxygen/400/300',
      steps: [
        {
          title: "Understand the Chemistry",
          description: "Learn how electrolysis can separate oxygen from minerals.",
          image: 'https://picsum.photos/seed/chem/600/400'
        }
      ]
    },
    {
      id: 'm3',
      bookId: 'book-1',
      title: "Rover Navigation AI",
      topic: 'Coding',
      difficulty: 'Advanced',
      duration: '90 mins',
      description: "Program an AI to help a lunar rover navigate craters autonomously.",
      helpingGuide: "Use sensors to detect obstacles. If a crater is detected, turn 90 degrees.",
      funFacts: [
        "The first lunar rover was used during the Apollo 15 mission.",
        "Modern rovers use LIDAR to 'see' their surroundings."
      ],
      thumbnail: 'https://picsum.photos/seed/rover/400/300',
      steps: [
        {
          title: "Setup the Logic",
          description: "Create a flowchart for the rover's decision-making process.",
          image: 'https://picsum.photos/seed/logic/600/400'
        }
      ]
    }
  ]
};
