export type EventCategory =
  | 'All'
  | 'News Coverage'
  | 'Moon Observation'
  | 'Competitions'
  | 'STEM Activities'
  | 'School Workshops'
  | 'Student Ebooks'
  | 'Other';

export type EventGalleryItem = {
  file: string;
  title: string;
  year: string;
  category: Exclude<EventCategory, 'All'>;
  featured?: boolean;
  hidden?: boolean;
};

export const eventGallery: EventGalleryItem[] = [
  { file: 'ai-2024.jpg', title: 'AI Learning Activity', year: '2024', category: 'STEM Activities' },
  { file: 'coding-2024.jpg', title: 'Coding Activity', year: '2024', category: 'STEM Activities' },
  { file: 'comp-1.jpg', title: 'STEM Competition', year: '2024', category: 'Competitions' },
  { file: 'comp-2.jpg', title: 'STEM Competition', year: '2024', category: 'Competitions' },
  { file: 'comp-3.jpg', title: 'STEM Competition', year: '2024', category: 'Competitions' },
  { file: 'comp-4.jpg', title: 'STEM Competition', year: '2024', category: 'Competitions' },
  { file: 'comp-5.jpg', title: 'STEM Competition', year: '2024', category: 'Competitions' },
  { file: 'design-2025.jpg', title: 'Design Thinking Activity', year: '2025', category: 'STEM Activities' },
  { file: 'ebook-1.png', title: 'Student Ebook Published', year: '2023', category: 'Student Ebooks' },
  { file: 'ebook-2.png', title: 'Student Ebook Published', year: '2023', category: 'Student Ebooks' },
  { file: 'ebook-3.png', title: 'Student Ebook Published', year: '2023', category: 'Student Ebooks' },
  { file: 'ebook-4.png', title: 'Student Ebook Published', year: '2023', category: 'Student Ebooks' },
  { file: 'ebook-5.png', title: 'Student Ebook Published', year: '2023', category: 'Student Ebooks' },
  { file: 'ebook-6.png', title: 'Student Ebook Published', year: '2023', category: 'Student Ebooks' },
  { file: 'ebook-7.png', title: 'Student Ebook Published', year: '2023', category: 'Student Ebooks' },
  { file: 'ebook-8.png', title: 'Student Ebook Published', year: '2023', category: 'Student Ebooks' },
  { file: 'expo-2024.jpeg', title: 'Education Expo', year: '2024', category: 'News Coverage' },
  { file: 'lunar-2025.png', title: 'Lunar Event Media Coverage', year: '2025', category: 'News Coverage', featured: true },
  { file: 'mars-day-2024.jpg', title: 'Mars Day Activity', year: '2024', category: 'STEM Activities' },
  { file: 'MO22-1.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-10.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-11.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-12.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-13.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-15.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-2.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-3.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-5.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-6.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-7.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-8.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO22-9.jpg', title: 'Moon Observation 2022', year: '2022', category: 'Moon Observation' },
  { file: 'MO23-1.jpg', title: 'Moon Observation 2023', year: '2023', category: 'Moon Observation' },
  { file: 'MO23-2.jpg', title: 'Moon Observation 2023', year: '2023', category: 'Moon Observation' },
  { file: 'MO23-3.jpg', title: 'Moon Observation 2023', year: '2023', category: 'Moon Observation' },
  { file: 'MO23-4.jpg', title: 'Moon Observation 2023', year: '2023', category: 'Moon Observation' },
  { file: 'MO23-5.jpg', title: 'Moon Observation 2023', year: '2023', category: 'Moon Observation' },
  { file: 'MO24-1.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation', featured: true },
  { file: 'MO24-10.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-11.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-12.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-13.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-14.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-15.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-16.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-17.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-18.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-19.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-2.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-20.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-3.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-4.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-5.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-6.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-7.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-8.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'MO24-9.jpg', title: 'Moon Observation 2024', year: '2024', category: 'Moon Observation' },
  { file: 'stem-01..jpg', title: 'STEM Activity', year: '2024', category: 'STEM Activities' },
  { file: 'stem-012.jpg', title: 'STEM Activity', year: '2024', category: 'STEM Activities' },
  { file: 'stem-013.jpg', title: 'STEM Activity', year: '2024', category: 'STEM Activities' },
  { file: 'stem-04.jpg', title: 'STEM Activity', year: '2024', category: 'STEM Activities' },
  { file: 'stem-14.png', title: 'STEM Activity', year: '2024', category: 'STEM Activities' },
  { file: 'stem-15.png', title: 'STEM Activity', year: '2024', category: 'STEM Activities' },
  { file: 'stem-16.png', title: 'STEM Activity', year: '2024', category: 'STEM Activities' },
  { file: 'stem-18.png', title: 'STEM Activity', year: '2024', category: 'STEM Activities' },
  { file: 'stem-19.png', title: 'STEM Activity', year: '2024', category: 'STEM Activities' },
  { file: 'summit-2025.jpg', title: 'STEM Summit', year: '2025', category: 'News Coverage' },
  { file: 'workshop-1.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops', featured: true },
  { file: 'workshop-10.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-11.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-12.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-2.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-3.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-4.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-5.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-6.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-7.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-8.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
  { file: 'workshop-9.jpg', title: 'School STEM Workshop', year: '2024', category: 'School Workshops' },
];
