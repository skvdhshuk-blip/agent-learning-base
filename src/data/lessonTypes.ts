export interface DialogueLine {
  who: '小问' | '阿简' | '验真鸟' | 'narrator';
  text: string;
}

export interface Quiz {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Section {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
  table?: { head: string[]; rows: string[][] };
  callout?: { title: string; text: string };
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  intro: string;
  mistakeTitle: string;
  dialogue: DialogueLine[];
  quiz: Quiz;
  core: Section[];
  analogy?: Section;
  bug: { title: string; paragraphs: string[]; fixes?: string[] };
  code?: { title: string; code: string; note?: string };
  exercise?: { title: string; intro: string; steps: string[] };
  qa?: { q: string; a: string }[];
  quote: string;
  card: string[];
}
