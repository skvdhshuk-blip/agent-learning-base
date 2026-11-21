export interface CourseProgress {
  visited: number[];
  quizPassed: number[];
  exercises: Record<number, boolean[]>;
}

const STORAGE_KEY = 'agent-learning-base:progress:v1';

const EMPTY: CourseProgress = {
  visited: [],
  quizPassed: [],
  exercises: {},
};

export function loadProgress(): CourseProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    return {
      visited: Array.isArray(parsed.visited) ? parsed.visited : [],
      quizPassed: Array.isArray(parsed.quizPassed) ? parsed.quizPassed : [],
      exercises:
        parsed.exercises && typeof parsed.exercises === 'object' ? parsed.exercises : {},
    };
  } catch {
    return EMPTY;
  }
}

export function saveProgress(next: CourseProgress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // 忽略无痕模式或存储受限环境下的写入失败
  }
}
