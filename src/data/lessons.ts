import { lessons1 } from './lessons1';
import { lessons2 } from './lessons2';
import { lessons3 } from './lessons3';
import type { Lesson } from './lessonTypes';

export const lessons: Lesson[] = [...lessons1, ...lessons2, ...lessons3];

export function getLesson(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
