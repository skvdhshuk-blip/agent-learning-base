import { useEffect, useState } from 'react';
import type { Lesson, Section, DialogueLine } from '../data/lessonTypes';
import CodeBlock from './CodeBlock';
import {
  ArrowLeft, AlertTriangle, Lightbulb, Bug, Quote, CheckCircle2,
  HelpCircle, MessageSquareQuote, Scissors, FlaskConical, ListChecks, BookOpenCheck, Bird, GraduationCap, MessageCircleQuestion,
} from 'lucide-react';

const whoStyle: Record<string, { color: string; icon: typeof Bird; side: 'left' | 'right' }> = {
  小问: { color: 'var(--c-blue)', icon: MessageCircleQuestion, side: 'left' },
  阿简: { color: 'var(--c-orange)', icon: GraduationCap, side: 'right' },
  验真鸟: { color: 'var(--c-green)', icon: Bird, side: 'left' },
};

function Dialogue({ lines, color }: { lines: DialogueLine[]; color: string }) {
  return (
    <div className="space-y-4">
      {lines.map((l, i) => {
        if (l.who === 'narrator') {
          return (
            <p key={i} className="text-sm md:text-base leading-loose opacity-85 pl-4 border-l-4" style={{ borderColor: color }}>
              {l.text}
            </p>
          );
        }
        const s = whoStyle[l.who];
        const Icon = s.icon;
        return (
          <div key={i} className={`flex gap-3 items-start ${s.side === 'right' ? 'flex-row-reverse' : ''}`}>
            <div className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center"
                 style={{ borderColor: 'var(--ink)', background: s.color, color: '#fffdf6' }}>
              <Icon className="w-5 h-5" />
            </div>
            <div className={`max-w-[85%] ${s.side === 'right' ? 'text-right' : ''}`}>
              <p className="chapter-stamp text-xs font-bold mb-1" style={{ color: s.color }}>{l.who}</p>
              <div className="ink-card px-4 py-3 text-sm md:text-base leading-relaxed inline-block text-left">
                {l.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuizBlock({ lesson }: { lesson: Lesson }) {
  const [picked, setPicked] = useState<number | null>(null);
  const q = lesson.quiz;
  return (
    <div className="ink-card p-6 md:p-8" style={{ background: '#fffdf6' }}>
      <div className="flex items-center gap-2 mb-1">
        <HelpCircle className="w-5 h-5" style={{ color: lesson.color }} />
        <h3 className="font-serif-sc font-black text-xl">先猜后讲</h3>
        <span className="chapter-stamp text-xs opacity-50 ml-auto">先选一个，再继续读</span>
      </div>
      <p className="font-bold mt-3 mb-4 leading-relaxed">{q.question}</p>
      <div className="space-y-2.5">
        {q.options.map((opt, i) => {
          let cls = 'quiz-opt';
          if (picked !== null) {
            if (i === q.answer) cls += ' correct';
            else if (i === picked) cls += ' wrong';
          }
          return (
            <button key={i} disabled={picked !== null} onClick={() => setPicked(i)}
                    className={`${cls} w-full text-left px-4 py-3 rounded-lg text-sm md:text-base leading-relaxed flex gap-3`}>
              <span className="chapter-stamp font-bold shrink-0" style={{ color: lesson.color }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-4 px-4 py-3 rounded-lg border-2 text-sm md:text-base leading-relaxed"
             style={{ borderColor: 'var(--c-green)', background: '#eef4ec' }}>
          <div className="flex items-center gap-2 font-bold mb-1" style={{ color: 'var(--c-green)' }}>
            <CheckCircle2 className="w-4 h-4" /> 答案是 {String.fromCharCode(65 + q.answer)}
          </div>
          {q.explanation}
        </div>
      )}
    </div>
  );
}

function SectionBlock({ s, color }: { s: Section; color: string }) {
  return (
    <div className="space-y-4">
      {s.heading && (
        <h3 className="font-serif-sc font-black text-2xl mt-10 flex items-center gap-3">
          <span className="inline-block w-8 h-1.5 rounded-full" style={{ background: color }} />
          {s.heading}
        </h3>
      )}
      {s.paragraphs?.map((p, i) => (
        <p key={i} className="leading-loose text-[15px] md:text-base opacity-90">{p}</p>
      ))}
      {s.bullets && (
        <ul className="space-y-2">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-[15px] md:text-base">
              <span className="shrink-0 mt-2.5 w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: color }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {s.code && <CodeBlock code={s.code} />}
      {s.table && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base border-2" style={{ borderColor: 'var(--ink)' }}>
            <thead>
              <tr style={{ background: color, color: '#fffdf6' }}>
                {s.table.head.map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-bold border border-[rgba(62,56,50,0.3)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 ? '#efe8d4' : '#fffdf6' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 border border-[rgba(62,56,50,0.25)] leading-relaxed">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.callout && (
        <div className="flex gap-4 px-5 py-4 rounded-xl border-2" style={{ borderColor: 'var(--c-purple)', background: '#f7e9ef' }}>
          <Bird className="w-6 h-6 shrink-0 mt-0.5" style={{ color: 'var(--c-purple)' }} />
          <div>
            <p className="font-bold" style={{ color: 'var(--c-purple)' }}>验真鸟举牌：{s.callout.title}</p>
            <p className="text-sm md:text-base mt-1 leading-relaxed">{s.callout.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ExerciseBlock({ lesson }: { lesson: Lesson }) {
  const ex = lesson.exercise!;
  const [done, setDone] = useState<boolean[]>(() => ex.steps.map(() => false));
  const doneCount = done.filter(Boolean).length;
  return (
    <div className="ink-card p-6 md:p-8" style={{ background: '#eef4ec' }}>
      <div className="flex items-center gap-2">
        <FlaskConical className="w-5 h-5" style={{ color: 'var(--c-green)' }} />
        <h3 className="font-serif-sc font-black text-xl">{ex.title}</h3>
        <span className="chapter-stamp text-xs ml-auto font-bold" style={{ color: 'var(--c-green)' }}>
          {doneCount}/{ex.steps.length}
        </span>
      </div>
      <p className="text-sm md:text-base mt-3 leading-relaxed opacity-80">{ex.intro}</p>
      <div className="mt-4 space-y-2">
        {ex.steps.map((s, i) => (
          <label key={i} className="quiz-opt flex gap-3 px-4 py-3 rounded-lg text-sm md:text-base leading-relaxed cursor-pointer"
                 style={done[i] ? { background: '#dcead9', borderColor: 'var(--c-green)' } : undefined}>
            <input type="checkbox" checked={done[i]} className="mt-1.5 w-4 h-4 shrink-0 accent-[#2c6469]"
                   onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))} />
            <span style={done[i] ? { textDecoration: 'line-through', opacity: 0.6 } : undefined}>{s}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function QABlock({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BookOpenCheck className="w-5 h-5" style={{ color: lesson.color }} />
        <h3 className="font-serif-sc font-black text-xl">章末三问</h3>
        <span className="chapter-stamp text-xs opacity-50 ml-auto">先自己想，再点开</span>
      </div>
      <div className="space-y-3">
        {lesson.qa!.map((item, i) => (
          <div key={i} className="ink-card overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full text-left px-5 py-4 font-bold flex gap-3 items-start text-sm md:text-base">
              <span className="chapter-stamp shrink-0" style={{ color: lesson.color }}>Q{i + 1}</span>
              <span className="flex-1 leading-relaxed">{item.q}</span>
              <span className="chapter-stamp text-xs opacity-50 mt-1">{open === i ? '收起' : '看答案'}</span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 pt-1 text-sm md:text-base leading-relaxed opacity-85 border-t-2 dashed-ink">
                <span className="chapter-stamp font-bold mr-2" style={{ color: 'var(--c-green)' }}>A</span>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LessonPage({ lesson, total, onBack, onNav }: {
  lesson: Lesson; total: number; onBack: () => void; onNav: (id: number) => void;
}) {
  useEffect(() => { window.scrollTo(0, 0); }, [lesson.id]);

  return (
    <div className="min-h-screen pb-24">
      {/* top nav */}
      <div className="sticky top-0 z-20 border-b-2" style={{ background: 'var(--paper)', borderColor: 'var(--ink)' }}>
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <button onClick={onBack} className="inline-flex items-center gap-2 font-bold text-sm hl-link">
            <ArrowLeft className="w-4 h-4" /> 学习地图
          </button>
          <span className="chapter-stamp text-xs opacity-60">
            CH {String(lesson.id).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        {/* progress */}
        <div className="h-1.5 w-full" style={{ background: 'rgba(62,56,50,0.1)' }}>
          <div className="h-full transition-all" style={{ width: `${(lesson.id / total) * 100}%`, background: lesson.color }} />
        </div>
      </div>

      {/* chapter header */}
      <div className="border-b-2" style={{ background: lesson.color, borderColor: 'var(--ink)' }}>
        <div className="max-w-3xl mx-auto px-6 py-12" style={{ color: '#fffdf6' }}>
          <p className="chapter-stamp text-sm opacity-80">CHAPTER {String(lesson.id).padStart(2, '0')}</p>
          <h1 className="font-serif-sc font-black text-4xl md:text-5xl mt-3 leading-tight">{lesson.title}</h1>
          <p className="mt-4 text-base md:text-lg opacity-90 leading-relaxed">{lesson.subtitle}</p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6">
        {/* intro */}
        <p className="font-serif-sc text-lg md:text-xl leading-loose mt-10 pb-8 border-b-2 dashed-ink font-bold">
          {lesson.intro}
        </p>

        {/* mistake / dialogue */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6" style={{ color: 'var(--c-purple)' }} />
            <h2 className="font-serif-sc font-black text-2xl md:text-3xl">情境犯错：{lesson.mistakeTitle}</h2>
          </div>
          <Dialogue lines={lesson.dialogue} color={lesson.color} />
        </section>

        {/* quiz */}
        <section className="mt-12">
          <QuizBlock lesson={lesson} />
        </section>

        {/* core */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-6 h-6" style={{ color: lesson.color }} />
            <h2 className="font-serif-sc font-black text-2xl md:text-3xl">核心解释</h2>
          </div>
          {lesson.core.map((s, i) => <SectionBlock key={i} s={s} color={lesson.color} />)}
        </section>

        {/* quote */}
        <div className="mt-12 flex gap-4 px-6 py-6 rounded-2xl border-2" style={{ borderColor: 'var(--ink)', background: lesson.color }}>
          <Quote className="w-6 h-6 shrink-0 mt-1" style={{ color: '#fffdf6' }} />
          <p className="font-serif-sc font-black text-lg md:text-xl leading-relaxed" style={{ color: '#fffdf6' }}>
            {lesson.quote}
          </p>
        </div>

        {/* analogy */}
        {lesson.analogy && (
          <section className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-6 h-6" style={{ color: 'var(--c-orange)' }} />
              <h2 className="font-serif-sc font-black text-2xl md:text-3xl">{lesson.analogy.heading}</h2>
            </div>
            <div className="pl-4 md:pl-6 border-l-4 space-y-4" style={{ borderColor: 'var(--c-orange)' }}>
              {lesson.analogy.paragraphs?.map((p, i) => (
                <p key={i} className="leading-loose text-[15px] md:text-base opacity-90">{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* bug theater */}
        <section className="mt-12">
          <div className="ticket border-2 p-6 md:p-8" style={{ borderColor: 'var(--ink)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Bug className="w-6 h-6" style={{ color: 'var(--c-purple)' }} />
              <h2 className="font-serif-sc font-black text-2xl">Bug 剧场：{lesson.bug.title}</h2>
            </div>
            <div className="space-y-4">
              {lesson.bug.paragraphs.map((p, i) => (
                <p key={i} className="leading-loose text-[15px] md:text-base opacity-90">{p}</p>
              ))}
            </div>
            {lesson.bug.fixes && (
              <div className="mt-6 pt-5 border-t-2 dashed-ink">
                <p className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--c-green)' }}>
                  <CheckCircle2 className="w-5 h-5" /> 修复与防线
                </p>
                <ul className="space-y-2">
                  {lesson.bug.fixes.map((f, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="chapter-stamp shrink-0 font-bold" style={{ color: 'var(--c-green)' }}>{i + 1}.</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* pseudocode */}
        {lesson.code && (
          <section className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquareQuote className="w-6 h-6" style={{ color: lesson.color }} />
              <h2 className="font-serif-sc font-black text-2xl">{lesson.code.title}</h2>
            </div>
            <CodeBlock code={lesson.code.code} className="md:p-6" />
            {lesson.code.note && (
              <p className="mt-3 text-sm leading-relaxed opacity-70 pl-4 border-l-4" style={{ borderColor: lesson.color }}>
                {lesson.code.note}
              </p>
            )}
          </section>
        )}

        {/* exercise */}
        {lesson.exercise && (
          <section className="mt-12">
            <ExerciseBlock lesson={lesson} />
          </section>
        )}

        {/* qa */}
        {lesson.qa && (
          <section className="mt-12">
            <QABlock lesson={lesson} />
          </section>
        )}

        {/* pocket card */}
        <section className="mt-12">
          <div className="rounded-2xl border-2 p-6 md:p-8" style={{ borderColor: 'var(--ink)', background: 'var(--ink)' }}>
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="w-6 h-6" style={{ color: 'var(--c-yellow)' }} />
              <h2 className="font-serif-sc font-black text-2xl" style={{ color: 'var(--paper)' }}>随身卡</h2>
            </div>
            <ul className="space-y-3">
              {lesson.card.map((c, i) => (
                <li key={i} className="flex gap-3 leading-relaxed" style={{ color: 'var(--paper)' }}>
                  <span className="chapter-stamp shrink-0 font-bold" style={{ color: lesson.color }}>{String(i + 1).padStart(2, '0')}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* prev / next */}
        <nav className="mt-14 flex items-stretch gap-4">
          {lesson.id > 1 ? (
            <button onClick={() => onNav(lesson.id - 1)} className="ink-card ink-card-hover flex-1 px-5 py-4 text-left">
              <span className="chapter-stamp text-xs opacity-60">← 上一章</span>
              <p className="font-serif-sc font-bold mt-1">CH {String(lesson.id - 1).padStart(2, '0')}</p>
            </button>
          ) : <div className="flex-1" />}
          {lesson.id < total ? (
            <button onClick={() => onNav(lesson.id + 1)} className="ink-card ink-card-hover flex-1 px-5 py-4 text-right"
                    style={{ background: lesson.color, color: '#fffdf6' }}>
              <span className="chapter-stamp text-xs opacity-80">下一章 →</span>
              <p className="font-serif-sc font-bold mt-1">CH {String(lesson.id + 1).padStart(2, '0')}</p>
            </button>
          ) : (
            <button onClick={onBack} className="ink-card ink-card-hover flex-1 px-5 py-4 text-right"
                    style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
              <span className="chapter-stamp text-xs opacity-70">完结撒花 ✦</span>
              <p className="font-serif-sc font-bold mt-1">回到学习地图</p>
            </button>
          )}
        </nav>
      </article>
    </div>
  );
}
