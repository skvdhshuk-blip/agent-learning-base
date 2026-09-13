import { characters } from '../data/chapters';
import { ArrowDown, CloudRain, Wrench, Bird, MessageCircleQuestion, GraduationCap } from 'lucide-react';

const charIcons = [MessageCircleQuestion, GraduationCap, Bird];

const marqueeWords = [
  '工具调用', '上下文分层', '工具定义', '证据链', 'Skill', 'MCP', '记忆', '知识库',
  '验收条件', '任务快照', '异步状态机', '多 Agent 协作', '停止条件', '幂等', '提示注入',
];

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* top bar */}
      <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between text-sm">
        <span className="chapter-stamp font-semibold">LEARNING AGENT BASE</span>
        <span className="chapter-stamp opacity-60">图解入门 · 2026-09</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center relative">
        {/* floating deco */}
        <CloudRain className="absolute left-[6%] top-10 w-10 h-10 opacity-70 animate-bob" style={{ color: 'var(--c-blue)', ['--tilt' as string]: '-8deg' }} strokeWidth={1.75} />
        <Wrench className="absolute right-[8%] top-24 w-9 h-9 opacity-70 animate-bob" style={{ color: 'var(--c-orange)', ['--tilt' as string]: '10deg', animationDelay: '0.8s' }} strokeWidth={1.75} />

        <p className="chapter-stamp text-sm mb-5" style={{ color: 'var(--c-purple)' }}>
          从一次工具调用，到多 Agent 协作
        </p>
        <h1 className="font-serif-sc font-black leading-tight text-5xl md:text-7xl tracking-tight">
          <span style={{ color: 'var(--c-orange)' }}>Agent</span> 原来
          <br className="md:hidden" />
          这么<span className="relative inline-block">
            简单
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
              <path d="M2 9 C 30 2, 60 11, 118 4" stroke="var(--c-yellow)" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="mt-8 text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
          会聊天不等于会办事。这里有 10 篇图解教程，从一次工具调用讲到多 Agent 协作。
          每章用故事开场，配小测验、Bug 复盘和动手练习，读完就能上手，不需要编程基础。
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <a href="#loop" className="ink-card ink-card-hover px-7 py-3 font-bold text-base inline-flex items-center gap-2"
             style={{ background: 'var(--c-orange)', color: '#fffdf6' }}>
            先看一遍动画 <ArrowDown className="w-4 h-4" />
          </a>
          <a href="#chapters" className="ink-card ink-card-hover px-7 py-3 font-bold text-base">
            直接翻到学习地图
          </a>
        </div>
      </div>

      {/* three characters */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-3 gap-5">
          {characters.map((c, i) => {
            const Icon = charIcons[i];
            return (
              <div key={c.name} className="ink-card ink-card-hover p-5 flex gap-4 items-start"
                   style={{ transform: `rotate(${(i - 1) * 0.8}deg)` }}>
                <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2"
                     style={{ borderColor: 'var(--ink)', background: c.color, color: '#fffdf6' }}>
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif-sc font-bold text-xl whitespace-nowrap">{c.name}</span>
                    <span className="text-xs chapter-stamp" style={{ color: c.color }}>{c.role}</span>
                  </div>
                  <p className="text-sm mt-1 opacity-75 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* marquee band */}
      <div className="border-y-2 overflow-hidden py-3" style={{ borderColor: 'var(--ink)', background: 'var(--c-yellow)' }}>
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {marqueeWords.map((w, i) => (
                <span key={`${dup}-${i}`} className="chapter-stamp mx-6 text-sm font-semibold flex items-center gap-6">
                  {w} <span className="opacity-50">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
