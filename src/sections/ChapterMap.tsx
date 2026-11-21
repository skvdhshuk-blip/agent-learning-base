import { CheckCircle2, Clock } from 'lucide-react';
import { lessons } from '../data/lessons';
import { accentInkColor, chapterMeta } from '../data/chapters';
import type { CourseProgress } from '../lib/progress';

const STAGE_STYLE: Record<string, { bg: string; fg: string }> = {
  入门主线: { bg: '#e8f0f6', fg: 'var(--c-blue)' },
  工程进阶: { bg: '#f6ebd2', fg: '#8a6500' },
  生产协同: { bg: '#e7f2ed', fg: 'var(--c-green)' },
};

export default function ChapterMap({
  onOpen,
  progress,
}: {
  onOpen: (id: number) => void;
  progress: CourseProgress;
}) {
  const visitedCount = progress.visited.length;

  return (
    <section
      id="chapters"
      className="py-20 border-t-2"
      style={{ borderColor: 'var(--ink)', background: '#efe9d8' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="chapter-stamp text-sm" style={{ color: 'var(--c-purple)' }}>
              LEARNING MAP
            </p>
            <h2 className="font-serif-sc font-black text-4xl md:text-5xl mt-2">十章学习地图</h2>
          </div>
          {visitedCount > 0 && (
            <div className="ink-card px-4 py-2 text-xs md:text-sm font-bold inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--c-green)' }} />
              <span>
                学习进度：已读 {visitedCount} / {lessons.length} 章
                {progress.quizPassed.length > 0 && ` · 测验通过 ${progress.quizPassed.length} 题`}
              </span>
            </div>
          )}
        </div>
        <p className="mt-4 max-w-2xl opacity-75 leading-relaxed">
          每章节奏一致：先看小问犯个错，猜一道题热身，再顺着图解读懂核心主线；想了解线上兜底细节时，展开每章里的「工程深潜」卡即可。做完章末自测，这章就算吃透了。
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {lessons.map((ch, i) => {
            const meta = chapterMeta[ch.id];
            const stageStyle = STAGE_STYLE[meta.stage];
            const inkAccent = accentInkColor(ch.color);
            const visited = progress.visited.includes(ch.id);
            const quizOk = progress.quizPassed.includes(ch.id);
            const exDoneCount = (progress.exercises[ch.id] ?? []).filter(Boolean).length;
            const exTotal = ch.exercise?.steps.length ?? 0;

            return (
              <button
                key={ch.id}
                onClick={() => onOpen(ch.id)}
                className="ink-card ink-card-hover text-left p-5 relative overflow-hidden flex flex-col"
                style={{ transform: `rotate(${((i % 3) - 1) * 0.45}deg)` }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-2"
                  style={{ background: ch.color }}
                />
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="chapter-stamp text-xs font-bold" style={{ color: inkAccent }}>
                    CH {String(ch.id).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: stageStyle.bg, color: stageStyle.fg }}
                    >
                      {meta.stage}
                    </span>
                    <span className="text-[11px] opacity-55 inline-flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {meta.readMinutes}m
                    </span>
                  </div>
                </div>

                <h3 className="font-serif-sc font-black text-xl mt-2 leading-snug">{ch.title}</h3>
                <p className="text-xs mt-1 opacity-65 chapter-stamp">{meta.tag}</p>
                <p className="text-sm mt-3 opacity-80 leading-relaxed line-clamp-2 flex-1">
                  <span className="font-bold" style={{ color: 'var(--c-purple)' }}>
                    犯错：
                  </span>
                  {ch.mistakeTitle}
                </p>

                <div className="mt-4 pt-3 border-t dashed-ink flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold inline-flex items-center gap-1 hl-link text-sm" style={{ color: inkAccent }}>
                    {visited ? '继续重温 →' : '开始这一章 →'}
                  </span>
                  <div className="flex items-center gap-2 opacity-75">
                    {quizOk && (
                      <span className="inline-flex items-center gap-0.5 font-bold" style={{ color: 'var(--c-green)' }}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> 测验
                      </span>
                    )}
                    {exTotal > 0 && exDoneCount > 0 && (
                      <span className="chapter-stamp">
                        练习 {exDoneCount}/{exTotal}
                      </span>
                    )}
                    {visited && !quizOk && exDoneCount === 0 && (
                      <span className="chapter-stamp opacity-70">已读</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}

          <div className="p-5 rounded-none border-2 dashed-ink flex flex-col justify-center items-center text-center gap-3">
            <p className="font-serif-sc font-bold text-lg leading-relaxed">
              十章读完，
              <br />
              你就能自己搭一个
              <br />
              靠得住的 Agent
            </p>
            <p className="chapter-stamp text-xs opacity-60">从一次调用 · 到一支小队</p>
          </div>
        </div>
      </div>
    </section>
  );
}
