export const PALETTE = {
  bg: '#f6f2e5',
  ink: '#3e3832',
  green: '#2c6469',
  purple: '#b20155',
  orange: '#df6536',
  blue: '#3469a1',
  yellow: '#ebb137',
};

/** 亮色主色（如明黄）在文字/徽章上需要深墨色前景以保证对比度 */
export function isLightAccent(color: string): boolean {
  return color.toLowerCase() === PALETTE.yellow.toLowerCase();
}

export function accentTextColor(color: string): string {
  return isLightAccent(color) ? PALETTE.ink : '#fffdf6';
}

export function accentInkColor(color: string): string {
  return isLightAccent(color) ? '#8a6500' : color;
}

export interface ChapterMeta {
  tag: string;
  stage: '入门主线' | '工程进阶' | '生产协同';
  readMinutes: number;
}

export const chapterMeta: Record<number, ChapterMeta> = {
  1: { tag: '最小 Agent 循环', stage: '入门主线', readMinutes: 6 },
  2: { tag: '上下文分层与缓存', stage: '入门主线', readMinutes: 6 },
  3: { tag: '工具定义与并行', stage: '入门主线', readMinutes: 7 },
  4: { tag: '可信联网证据链', stage: '入门主线', readMinutes: 6 },
  5: { tag: 'Skill · Tool · MCP', stage: '工程进阶', readMinutes: 8 },
  6: { tag: '状态、记忆与知识库', stage: '工程进阶', readMinutes: 7 },
  7: { tag: '计划、目标与验收', stage: '工程进阶', readMinutes: 7 },
  8: { tag: '长任务快照与三阶压缩', stage: '生产协同', readMinutes: 8 },
  9: { tag: '停泊、插队与幂等状态机', stage: '生产协同', readMinutes: 8 },
  10: { tag: '单 Agent 与多 Agent 协作', stage: '生产协同', readMinutes: 8 },
};

export const characters = [
  {
    name: '小问',
    role: '第一次接触 Agent 的读者',
    desc: '热情、敢想，也就是刚入门的你',
    color: PALETTE.blue,
  },
  {
    name: '阿简',
    role: '会犯错、也会学习的 Agent 学徒',
    desc: '踩过不少坑，负责把概念讲明白',
    color: PALETTE.orange,
  },
  {
    name: '验真鸟',
    role: '专门检查来源、权限和停止条件',
    desc: '他俩一争起来，先猜验真鸟会啄哪里',
    color: PALETTE.green,
  },
];
