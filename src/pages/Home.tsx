import Hero from '../sections/Hero';
import AgentLoop from '../sections/AgentLoop';
import ChapterMap from '../sections/ChapterMap';
import Diagrams from '../sections/Diagrams';
import Principles from '../sections/Principles';
import Footer from '../sections/Footer';
import type { CourseProgress } from '../lib/progress';

export default function Home({
  onOpenLesson,
  progress,
}: {
  onOpenLesson: (id: number) => void;
  progress: CourseProgress;
}) {
  return (
    <div className="min-h-screen">
      <Hero />
      <AgentLoop />
      <ChapterMap onOpen={onOpenLesson} progress={progress} />
      <Diagrams />
      <Principles />
      <Footer />
    </div>
  );
}
