import type {Metadata} from 'next';
import '../src/styles.css';

export const metadata: Metadata = {
  title: "Mellow Learners Playground | Giffy's Moon Adventure",
  description: 'Interactive, story-led Moon missions for curious young learners.',
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}

