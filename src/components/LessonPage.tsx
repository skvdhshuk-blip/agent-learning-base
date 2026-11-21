import { useEffect, useState } from 'react';
import type { Lesson, Section, DialogueLine } from '../data/lessonTypes';
import { accentInkColor, accentTextColor, chapterMeta } from '../data/chapters';
import CodeBlock from './CodeBlock';
import RichText from './RichText';
import ChapterDiagram from './ChapterDiagrams';
import {
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  Bug,
  Quote,
  CheckCircle2,
  HelpCircle,
  MessageSquareQuote,
  Scissors,
  FlaskConical,
  ListChecks,
  BookOpenCheck,
  Bird,
  GraduationCap,
  MessageCircleQuestion,
  Wrench,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';

const whoStyle: Record<string, { color: string; icon: typeof Bird; side: 'left' | 'right' }> = {
  小问: { color: 'var(--c-blue)', icon: MessageCircleQuestion, side: 'left' },
  阿简: { color: 'var(--c-orange)', icon: GraduationCap, side: 'right' },
  验真鸟: { color: 'var(--c-green)', icon: Bird, side: 'left' },
};

function Dialogue({ lines, color }: { lines: DialogueLine[]; color: string }) {
  return (
    <div className="space-y-5">
      {lines.map((l, i) => {
        if (l.who === 'narrator') {
          return (
            <p
              key={i}
              className="text-sm md:text-base leading-loose opacity-85 pl-4 border-l-4"
              style={{ borderColor: color }}
            >
              <RichText text={l.text} />
            </p>
          );
        }
        const s = whoStyle[l.who];
        const Icon = s.icon;
        return (
          <div key={i} className={`flex gap-3 items-start ${s.side === 'right' ? 'flex-row-reverse' : ''}`}>
            <div
              className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: 'var(--ink)', background: s.color, color: '#fffdf6' }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className={`max-w-[85%] ${s.side === 'right' ? 'text-right' : ''}`}>
              <p className="chapter-stamp text-xs font-bold mb-1" style={{ color: s.color }}>
                {l.who}
              </p>
              <div className="ink-card px-4 py-3 text-sm md:text-base leading-relaxed inline-block text-left">
                <RichText text={l.text} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuizBlock({
  lesson,
  passed,
  onPassed,
}: {
  lesson: Lesson;
  passed: boolean;
  onPassed: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const q = lesson.quiz;
  const inkAccent = accentInkColor(lesson.color);
  const isWrong = picked !== null && picked !== q.answer;

  const handlePick = (i: number) => {
    setPicked(i);
    if (i === q.answer) {
      onPassed();
    }
  };

  return (
    <div className="ink-card p-6 md:p-8" style={{ background: '#fffdf6' }}>
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <HelpCircle className="w-5 h-5" style={{ color: inkAccent }} />
        <h3 className="font-serif-sc font-black text-xl">先猜后讲</h3>
        {passed && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1"
            style={{ background: '#e7f2ed', color: 'var(--c-green)' }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> 已答对
          </span>
        )}
        <span className="chapter-stamp text-xs opacity-50 ml-auto">先选一个，再继续读</span>
      </div>
      <p className="font-bold mt-3 mb-4 leading-relaxed">
        <RichText text={q.question} />
      </p>
      <div className="space-y-2.5">
        {q.options.map((opt, i) => {
          let cls = 'quiz-opt';
          if (picked !== null) {
            if (i === q.answer) cls += ' correct';
            else if (i === picked) cls += ' wrong';
          }
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => handlePick(i)}
              className={`${cls} w-full text-left px-4 py-3 rounded-lg text-sm md:text-base leading-relaxed flex gap-3`}
            >
              <span className="chapter-stamp font-bold shrink-0" style={{ color: inkAccent }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span>
                <RichText text={opt} />
              </span>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div
          className="mt-4 px-4 py-3 rounded-lg border-2 text-sm md:text-base leading-relaxed"
          style={{
            borderColor: isWrong ? 'var(--c-purple)' : 'var(--c-green)',
            background: isWrong ? '#f7e9ef' : '#eef4ec',
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
            <div
              className="flex items-center gap-2 font-bold"
              style={{ color: isWrong ? 'var(--c-purple)' : 'var(--c-green)' }}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isWrong
                ? `这次选偏了，正确答案是 ${String.fromCharCode(65 + q.answer)}`
                : `答对了！答案是 ${String.fromCharCode(65 + q.answer)}`}
            </div>
            {isWrong && (
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="text-xs font-bold inline-flex items-center gap-1 underline opacity-80 hover:opacity-100"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 重新作答
              </button>
            )}
          </div>
          <RichText text={q.explanation} />
        </div>
      )}
    </div>
  );
}

function SectionBody({ s, color }: { s: Section; color: string }) {
  const headerFg = accentTextColor(color);
  return (
    <div className="space-y-5">
      {s.paragraphs?.map((p, i) => (
        <p key={i} className="leading-loose text-[15px] md:text-base opacity-90">
          <RichText text={p} />
        </p>
      ))}
      {s.bullets && (
        <ul className="space-y-3">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-[15px] md:text-base">
              <span
                className="shrink-0 mt-2.5 w-2.5 h-2.5 rounded-full border-2"
                style={{ borderColor: accentInkColor(color) }}
              />
              <span>
                <RichText text={b} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {s.diagram && (
        <div className="py-2">
          <ChapterDiagram id={s.diagram} />
        </div>
      )}
      {s.code && (
        <div className="pt-1 pb-2">
          <CodeBlock code={s.code} />
        </div>
      )}
      {s.table && (
        <div className="overflow-x-auto py-1">
          <table className="w-full text-sm md:text-base border-2" style={{ borderColor: 'var(--ink)' }}>
            <thead>
              <tr style={{ background: color, color: headerFg }}>
                {s.table.head.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left font-bold border border-[rgba(62,56,50,0.3)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 ? '#efe8d4' : '#fffdf6' }}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-2.5 border border-[rgba(62,56,50,0.25)] leading-relaxed"
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.callout && (
        <div
          className="flex gap-4 px-5 py-4 rounded-xl border-2"
          style={{ borderColor: 'var(--c-purple)', background: '#f7e9ef' }}
        >
          <Bird className="w-6 h-6 shrink-0 mt-0.5" style={{ color: 'var(--c-purple)' }} />
          <div>
            <p className="font-bold" style={{ color: 'var(--c-purple)' }}>
              验真鸟举牌：{s.callout.title}
            </p>
            <p className="text-sm md:text-base mt-1 leading-relaxed">
              <RichText text={s.callout.text} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionBlock({
  s,
  color,
  isFirst,
  open,
  onToggle,
}: {
  s: Section;
  color: string;
  isFirst: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  if (s.advanced) {
    return (
      <div
        className="pt-2"
      >
        <div
          className="rounded-2xl border-2 dashed-ink overflow-hidden"
          style={{ background: '#f3ecdb' }}
        >
          <button
            type="button"
            onClick={onToggle}
            className="w-full text-left px-5 py-4 flex items-start gap-3 transition-colors hover:bg-black/[0.03]"
            aria-expanded={open}
          >
            <div
              className="shrink-0 w-9 h-9 rounded-lg border-2 flex items-center justify-center mt-0.5"
              style={{ borderColor: 'var(--ink)', background: '#fffdf6', color: 'var(--c-purple)' }}
            >
              <Wrench className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="chapter-stamp text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#f7e9ef', color: 'var(--c-purple)' }}
                >
                  工程深潜 · 上线再看
                </span>
                <span className="chapter-stamp text-xs opacity-55">
                  {open ? '点击收起' : '选读 · 点击展开'}
                </span>
              </div>
              {s.heading && (
                <h3 className="font-serif-sc font-black text-lg md:text-xl mt-1.5 leading-snug">
                  {s.heading}
                </h3>
              )}
              {s.advancedSummary && !open && (
                <p className="text-xs md:text-sm opacity-75 mt-1 leading-relaxed">
                  <RichText text={s.advancedSummary} />
                </p>
              )}
            </div>
            <span className="shrink-0 mt-2 opacity-70">
              {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </span>
          </button>
          {open && (
            <div className="px-5 pb-6 pt-5 border-t-2 dashed-ink bg-[#fffdf6]/85">
              <SectionBody s={s} color={color} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-5 ${s.heading && !isFirst ? 'pt-6' : ''}`}>
      {s.heading && (
        <h3 className="font-serif-sc font-black text-2xl flex items-center gap-3">
          <span className="inline-block w-8 h-1.5 rounded-full shrink-0" style={{ background: color }} />
          <span>{s.heading}</span>
        </h3>
      )}
      <SectionBody s={s} color={color} />
    </div>
  );
}

function ExerciseBlock({
  lesson,
  done,
  onToggle,
}: {
  lesson: Lesson;
  done: boolean[];
  onToggle: (idx: number) => void;
}) {
  const ex = lesson.exercise!;
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
      <p className="text-sm md:text-base mt-3 leading-relaxed opacity-85">
        <RichText text={ex.intro} />
      </p>
      <div className="mt-5 space-y-3">
        {ex.steps.map((s, i) => (
          <label
            key={i}
            className="quiz-opt flex gap-3 px-4 py-3 rounded-lg text-sm md:text-base leading-relaxed cursor-pointer"
            style={done[i] ? { background: '#dcead9', borderColor: 'var(--c-green)' } : undefined}
          >
            <input
              type="checkbox"
              checked={Boolean(done[i])}
              className="mt-1.5 w-4 h-4 shrink-0 accent-[#2c6469]"
              onChange={() => onToggle(i)}
            />
            <span style={done[i] ? { textDecoration: 'line-through', opacity: 0.6 } : undefined}>
              <RichText text={s} />
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function QABlock({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState<number | null>(null);
  const inkAccent = accentInkColor(lesson.color);
  const qa = lesson.qa!;
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BookOpenCheck className="w-5 h-5" style={{ color: inkAccent }} />
        <h3 className="font-serif-sc font-black text-xl">章末自测 · {qa.length} 问</h3>
        <span className="chapter-stamp text-xs opacity-50 ml-auto">先自己想，再点开</span>
      </div>
      <div className="space-y-4">
        {qa.map((item, i) => (
          <div key={i} className="ink-card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-5 py-4 font-bold flex gap-3 items-start text-sm md:text-base"
            >
              <span className="chapter-stamp shrink-0" style={{ color: inkAccent }}>
                Q{i + 1}
              </span>
              <span className="flex-1 leading-relaxed">
                <RichText text={item.q} />
              </span>
              <span className="chapter-stamp text-xs opacity-50 mt-1 shrink-0">
                {open === i ? '收起' : '看答案'}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 pt-2 text-sm md:text-base leading-relaxed opacity-90 border-t-2 dashed-ink">
                <span className="chapter-stamp font-bold mr-2" style={{ color: 'var(--c-green)' }}>
                  A
                </span>
                <RichText text={item.a} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LessonPage({
  lesson,
  total,
  prevLesson,
  nextLesson,
  quizPassed,
  exerciseDone,
  onMarkQuizPassed,
  onToggleExerciseStep,
  onBack,
  onNav,
}: {
  lesson: Lesson;
  total: number;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
  quizPassed: boolean;
  exerciseDone?: boolean[];
  onMarkQuizPassed: () => void;
  onToggleExerciseStep: (stepIdx: number, count: number) => void;
  onBack: () => void;
  onNav: (id: number) => void;
}) {
  const [scrollPct, setScrollPct] = useState(0);
  const [openAdvanced, setOpenAdvanced] = useState<Record<number, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lesson.id]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) {
        setScrollPct(0);
        return;
      }
      setScrollPct(Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lesson.id]);

  const headerFg = accentTextColor(lesson.color);
  const inkAccent = accentInkColor(lesson.color);
  const meta = chapterMeta[lesson.id];
  const advancedIndices = lesson.core
    .map((s, idx) => (s.advanced ? idx : -1))
    .filter((idx) => idx >= 0);
  const allAdvancedOpen =
    advancedIndices.length > 0 && advancedIndices.every((idx) => Boolean(openAdvanced[idx]));

  const toggleAllAdvanced = () => {
    const nextState = !allAdvancedOpen;
    const map: Record<number, boolean> = {};
    for (const idx of advancedIndices) map[idx] = nextState;
    setOpenAdvanced(map);
  };

  const normalizedExerciseDone = lesson.exercise
    ? lesson.exercise.steps.map((_, i) => Boolean(exerciseDone?.[i]))
    : [];

  return (
    <div className="min-h-screen pb-24">
      {/* top nav */}
      <div
        className="sticky top-0 z-20 border-b-2"
        style={{ background: 'var(--paper)', borderColor: 'var(--ink)' }}
      >
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <button onClick={onBack} className="inline-flex items-center gap-2 font-bold text-sm hl-link shrink-0">
            <ArrowLeft className="w-4 h-4" /> 学习地图
          </button>

          <nav className="hidden md:flex items-center gap-3 text-xs opacity-75">
            <a href="#sec-core" className="hover:opacity-100 hover:underline">
              核心
            </a>
            <a href="#sec-bug" className="hover:opacity-100 hover:underline">
              Bug 剧场
            </a>
            {lesson.code && (
              <a href="#sec-code" className="hover:opacity-100 hover:underline">
                伪代码
              </a>
            )}
            {lesson.qa && (
              <a href="#sec-qa" className="hover:opacity-100 hover:underline">
                自测
              </a>
            )}
            <a href="#sec-card" className="hover:opacity-100 hover:underline">
              随身卡
            </a>
          </nav>

          <span className="chapter-stamp text-xs opacity-65 shrink-0">
            CH {String(lesson.id).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        {/* real scroll progress */}
        <div className="h-1.5 w-full" style={{ background: 'rgba(62,56,50,0.1)' }}>
          <div
            className="h-full transition-[width] duration-150"
            style={{ width: `${Math.max(4, scrollPct)}%`, background: lesson.color }}
          />
        </div>
      </div>

      {/* chapter header */}
      <div className="border-b-2" style={{ background: lesson.color, borderColor: 'var(--ink)' }}>
        <div className="max-w-3xl mx-auto px-6 py-12" style={{ color: headerFg }}>
          <div className="flex items-center gap-3 flex-wrap">
            <p className="chapter-stamp text-sm opacity-85">
              CHAPTER {String(lesson.id).padStart(2, '0')}
            </p>
            {meta && (
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
                style={{
                  borderColor: headerFg === '#fffdf6' ? 'rgba(255,253,246,0.45)' : 'rgba(62,56,50,0.4)',
                  background: headerFg === '#fffdf6' ? 'rgba(0,0,0,0.14)' : 'rgba(255,253,246,0.45)',
                }}
              >
                {meta.stage} · 约 {meta.readMinutes} 分钟
              </span>
            )}
          </div>
          <h1 className="font-serif-sc font-black text-4xl md:text-5xl mt-3 leading-tight">
            {lesson.title}
          </h1>
          <p className="mt-4 text-base md:text-lg opacity-90 leading-relaxed">{lesson.subtitle}</p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6">
        {/* intro */}
        <p className="font-serif-sc text-lg md:text-xl leading-loose mt-10 pb-8 border-b-2 dashed-ink font-bold">
          <RichText text={lesson.intro} />
        </p>

        {/* mistake / dialogue */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6" style={{ color: 'var(--c-purple)' }} />
            <h2 className="font-serif-sc font-black text-2xl md:text-3xl">
              情境犯错：{lesson.mistakeTitle}
            </h2>
          </div>
          <Dialogue lines={lesson.dialogue} color={lesson.color} />
        </section>

        {/* quiz */}
        <section className="mt-12">
          <QuizBlock lesson={lesson} passed={quizPassed} onPassed={onMarkQuizPassed} />
        </section>

        {/* core */}
        <section id="sec-core" className="mt-12 scroll-mt-20">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6" style={{ color: inkAccent }} />
              <h2 className="font-serif-sc font-black text-2xl md:text-3xl">核心解释</h2>
            </div>
            {advancedIndices.length > 0 && (
              <button
                type="button"
                onClick={toggleAllAdvanced}
                className="text-xs font-bold px-3 py-1.5 rounded-full border-2 inline-flex items-center gap-1.5 transition-colors hover:bg-black/5"
                style={{ borderColor: 'var(--ink)', background: '#fffdf6' }}
              >
                <Wrench className="w-3.5 h-3.5" style={{ color: 'var(--c-purple)' }} />
                {allAdvancedOpen ? '收起全部工程深潜' : '展开全部工程深潜'}
              </button>
            )}
          </div>
          <div className="mt-6 space-y-6">
            {lesson.core.map((s, i) => (
              <SectionBlock
                key={i}
                s={s}
                color={lesson.color}
                isFirst={i === 0}
                open={Boolean(openAdvanced[i])}
                onToggle={() => setOpenAdvanced((prev) => ({ ...prev, [i]: !prev[i] }))}
              />
            ))}
          </div>
        </section>

        {/* quote */}
        <div
          className="mt-12 flex gap-4 px-6 py-6 rounded-2xl border-2"
          style={{ borderColor: 'var(--ink)', background: lesson.color }}
        >
          <Quote className="w-6 h-6 shrink-0 mt-1" style={{ color: headerFg }} />
          <p className="font-serif-sc font-black text-lg md:text-xl leading-relaxed" style={{ color: headerFg }}>
            {lesson.quote}
          </p>
        </div>

        {/* analogy */}
        {lesson.analogy && (
          <section className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-6 h-6" style={{ color: 'var(--c-orange)' }} />
              <h2 className="font-serif-sc font-black text-2xl md:text-3xl">
                {lesson.analogy.heading}
              </h2>
            </div>
            <div className="pl-4 md:pl-6 border-l-4 space-y-4" style={{ borderColor: 'var(--c-orange)' }}>
              {lesson.analogy.paragraphs?.map((p, i) => (
                <p key={i} className="leading-loose text-[15px] md:text-base opacity-90">
                  <RichText text={p} />
                </p>
              ))}
            </div>
          </section>
        )}

        {/* bug theater */}
        <section id="sec-bug" className="mt-12 scroll-mt-20">
          <div className="ticket border-2 p-6 md:p-8" style={{ borderColor: 'var(--ink)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Bug className="w-6 h-6" style={{ color: 'var(--c-purple)' }} />
              <h2 className="font-serif-sc font-black text-2xl">Bug 剧场：{lesson.bug.title}</h2>
            </div>
            <div className="space-y-4">
              {lesson.bug.paragraphs.map((p, i) => (
                <p key={i} className="leading-loose text-[15px] md:text-base opacity-90">
                  <RichText text={p} />
                </p>
              ))}
            </div>
            {lesson.bug.fixes && (
              <div className="mt-6 pt-5 border-t-2 dashed-ink">
                <p className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--c-green)' }}>
                  <CheckCircle2 className="w-5 h-5" /> 修复与防线
                </p>
                <ul className="space-y-2.5">
                  {lesson.bug.fixes.map((f, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="chapter-stamp shrink-0 font-bold" style={{ color: 'var(--c-green)' }}>
                        {i + 1}.
                      </span>
                      <span>
                        <RichText text={f} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* pseudocode */}
        {lesson.code && (
          <section id="sec-code" className="mt-12 scroll-mt-20">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquareQuote className="w-6 h-6" style={{ color: inkAccent }} />
              <h2 className="font-serif-sc font-black text-2xl">{lesson.code.title}</h2>
            </div>
            <CodeBlock code={lesson.code.code} className="md:px-6 md:py-5" />
            {lesson.code.note && (
              <p
                className="mt-5 text-sm leading-relaxed opacity-75 pl-4 border-l-4"
                style={{ borderColor: lesson.color }}
              >
                <RichText text={lesson.code.note} />
              </p>
            )}
          </section>
        )}

        {/* exercise */}
        {lesson.exercise && (
          <section className="mt-12">
            <ExerciseBlock
              lesson={lesson}
              done={normalizedExerciseDone}
              onToggle={(idx) => onToggleExerciseStep(idx, lesson.exercise!.steps.length)}
            />
          </section>
        )}

        {/* qa */}
        {lesson.qa && (
          <section id="sec-qa" className="mt-12 scroll-mt-20">
            <QABlock lesson={lesson} />
          </section>
        )}

        {/* pocket card */}
        <section id="sec-card" className="mt-12 scroll-mt-20">
          <div
            className="rounded-2xl border-2 p-6 md:p-8"
            style={{ borderColor: 'var(--ink)', background: 'var(--ink)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="w-6 h-6" style={{ color: 'var(--c-yellow)' }} />
              <h2 className="font-serif-sc font-black text-2xl" style={{ color: 'var(--paper)' }}>
                随身卡
              </h2>
            </div>
            <ul className="space-y-3">
              {lesson.card.map((c, i) => (
                <li key={i} className="flex gap-3 leading-relaxed" style={{ color: 'var(--paper)' }}>
                  <span
                    className="chapter-stamp shrink-0 font-bold"
                    style={{ color: lesson.color === '#ebb137' ? 'var(--c-yellow)' : lesson.color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <RichText text={c} tone="dark" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* prev / next */}
        <nav className="mt-14 flex items-stretch gap-4">
          {prevLesson ? (
            <button
              onClick={() => onNav(prevLesson.id)}
              className="ink-card ink-card-hover flex-1 px-5 py-4 text-left"
            >
              <span className="chapter-stamp text-xs opacity-60">← 上一章</span>
              <p className="font-serif-sc font-bold mt-1 leading-snug">
                CH {String(prevLesson.id).padStart(2, '0')} · {prevLesson.title}
              </p>
            </button>
          ) : (
            <div className="flex-1" />
          )}
          {nextLesson ? (
            <button
              onClick={() => onNav(nextLesson.id)}
              className="ink-card ink-card-hover flex-1 px-5 py-4 text-right"
              style={{ background: lesson.color, color: headerFg }}
            >
              <span className="chapter-stamp text-xs opacity-85">下一章 →</span>
              <p className="font-serif-sc font-bold mt-1 leading-snug">
                CH {String(nextLesson.id).padStart(2, '0')} · {nextLesson.title}
              </p>
            </button>
          ) : (
            <button
              onClick={onBack}
              className="ink-card ink-card-hover flex-1 px-5 py-4 text-right"
              style={{ background: 'var(--ink)', color: 'var(--paper)' }}
            >
              <span className="chapter-stamp text-xs opacity-70">完结撒花 ✦</span>
              <p className="font-serif-sc font-bold mt-1">回到学习地图</p>
            </button>
          )}
        </nav>
      </article>
    </div>
  );
}
