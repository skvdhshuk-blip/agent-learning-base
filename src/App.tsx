import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router';
import Home from './pages/Home';
import LessonPage from './components/LessonPage';
import { getLesson, lessons } from './data/lessons';
import { loadProgress, saveProgress, type CourseProgress } from './lib/progress';

function parseLessonId(raw: string | null): number | null {
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1 || n > lessons.length) return null;
  return n;
}

function withVisited(prev: CourseProgress, id: number): CourseProgress {
  if (prev.visited.includes(id)) return prev;
  return { ...prev, visited: [...prev.visited, id] };
}

function CourseShell() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lessonId = parseLessonId(searchParams.get('ch'));
  const lesson = lessonId !== null ? getLesson(lessonId) : undefined;

  const [progress, setProgress] = useState<CourseProgress>(() => {
    const initial = loadProgress();
    return lessonId !== null ? withVisited(initial, lessonId) : initial;
  });

  // 派生视图：即使通过浏览器前进/后退直达新章节，也无需在 effect 中调用 setState
  const effectiveProgress: CourseProgress =
    lessonId !== null ? withVisited(progress, lessonId) : progress;

  useEffect(() => {
    saveProgress(effectiveProgress);
  }, [effectiveProgress]);

  useEffect(() => {
    document.title = lesson
      ? `CH ${String(lesson.id).padStart(2, '0')} · ${lesson.title} — Agent 原来这么简单`
      : 'Agent 原来这么简单 · 图解入门';
  }, [lesson]);

  const openLesson = useCallback(
    (id: number) => {
      setProgress((prev) => withVisited(prev, id));
      setSearchParams({ ch: String(id) });
    },
    [setSearchParams],
  );

  const goHome = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const markQuizPassed = useCallback((id: number) => {
    setProgress((prev) => {
      const next = withVisited(prev, id);
      if (next.quizPassed.includes(id)) return next;
      return { ...next, quizPassed: [...next.quizPassed, id] };
    });
  }, []);

  const toggleExerciseStep = useCallback((id: number, stepIndex: number, stepCount: number) => {
    setProgress((prev) => {
      const next = withVisited(prev, id);
      const current = next.exercises[id] ?? Array.from({ length: stepCount }, () => false);
      const normalized = Array.from({ length: stepCount }, (_, i) => Boolean(current[i]));
      normalized[stepIndex] = !normalized[stepIndex];
      return {
        ...next,
        exercises: { ...next.exercises, [id]: normalized },
      };
    });
  }, []);

  if (lesson) {
    const prevLesson = lesson.id > 1 ? getLesson(lesson.id - 1) : undefined;
    const nextLesson = lesson.id < lessons.length ? getLesson(lesson.id + 1) : undefined;
    return (
      <LessonPage
        key={lesson.id}
        lesson={lesson}
        total={lessons.length}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        quizPassed={effectiveProgress.quizPassed.includes(lesson.id)}
        exerciseDone={effectiveProgress.exercises[lesson.id]}
        onMarkQuizPassed={() => markQuizPassed(lesson.id)}
        onToggleExerciseStep={(stepIdx, count) => toggleExerciseStep(lesson.id, stepIdx, count)}
        onBack={goHome}
        onNav={openLesson}
      />
    );
  }

  return <Home onOpenLesson={openLesson} progress={effectiveProgress} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<CourseShell />} />
    </Routes>
  );
}
