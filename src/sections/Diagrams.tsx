import { useState } from 'react';
import {
  ContextDiagram,
  TSMDiagram,
  MemoryDiagram,
  AsyncDiagram,
} from '../components/ChapterDiagrams';
import { accentTextColor, PALETTE } from '../data/chapters';

const tabs = [
  { id: 'context', label: '上下文工作台', color: PALETTE.blue },
  { id: 'tsm', label: 'Tool · Skill · MCP', color: PALETTE.yellow },
  { id: 'memory', label: '记忆三层', color: PALETTE.orange },
  { id: 'async', label: '慢任务状态机', color: PALETTE.green },
];

export default function Diagrams() {
  const [tab, setTab] = useState('context');
  const active = tabs.find((t) => t.id === tab)!;

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <p className="chapter-stamp text-sm" style={{ color: 'var(--c-green)' }}>
        CHEAT SHEETS
      </p>
      <h2 className="font-serif-sc font-black text-4xl md:text-5xl mt-2">四张必会图解</h2>
      <p className="mt-4 max-w-2xl opacity-75 leading-relaxed">
        书里最常被翻回去看的四张结构图，这里做成了随身版，对应的章节正文里也能随时对照。
      </p>

      <div className="flex gap-3 mt-8 flex-wrap">
        {tabs.map((t) => {
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-5 py-2.5 rounded-full border-2 font-bold text-sm transition-all"
              style={{
                borderColor: 'var(--ink)',
                background: isActive ? t.color : '#fffdf6',
                color: isActive ? accentTextColor(t.color) : 'var(--ink)',
                transform: isActive ? 'translate(-1px,-1px)' : undefined,
                boxShadow: isActive ? '3px 3px 0 rgba(62,56,50,0.9)' : 'none',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        className="ink-card p-6 md:p-10 mt-6"
        style={{ borderTopWidth: 6, borderTopColor: active.color }}
      >
        {tab === 'context' && <ContextDiagram />}
        {tab === 'tsm' && <TSMDiagram />}
        {tab === 'memory' && <MemoryDiagram />}
        {tab === 'async' && <AsyncDiagram />}
      </div>
    </section>
  );
}
