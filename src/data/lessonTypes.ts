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

export type DiagramId =
  | 'context'
  | 'tsm'
  | 'memory'
  | 'async'
  | 'loop-guard'
  | 'compact-tiers'
  | 'subagent-flow';

export interface Section {
  heading?: string;
  /** 标记为进阶生产深潜，默认以可折叠卡片呈现，保持入门主线清爽 */
  advanced?: boolean;
  /** 折叠态的一句话预览说明 */
  advancedSummary?: string;
  /** 在该小节内嵌入的手绘风速查图 */
  diagram?: DiagramId;
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
