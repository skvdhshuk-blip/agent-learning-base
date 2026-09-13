import Hero from '../sections/Hero';
import AgentLoop from '../sections/AgentLoop';
import ChapterMap from '../sections/ChapterMap';
import Diagrams from '../sections/Diagrams';
import Principles from '../sections/Principles';
import Footer from '../sections/Footer';

export default function Home({ onOpenLesson }: { onOpenLesson: (id: number) => void }) {
  return (
    <div className="min-h-screen">
      <Hero />
      <AgentLoop />
      <ChapterMap onOpen={onOpenLesson} />
      <Diagrams />
      <Principles />
      <Footer />
    </div>
  );
}
