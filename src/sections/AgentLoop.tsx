import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, StepForward, User, Brain, Cog, PackageCheck, Flag } from 'lucide-react';

interface LoopStep {
  icon: typeof User;
  label: string;
  color: string;
  log: string;
  logType: 'user' | 'model' | 'app' | 'tool' | 'final';
  detail: string;
}

const steps: LoopStep[] = [
  {
    icon: User,
    label: '用户任务',
    color: 'var(--c-blue)',
    log: '杭州今天会下雨吗？如果会，提醒我带伞。',
    logType: 'user',
    detail: '任务进入上下文。注意：此刻模型还不能「查」天气，它只能组织语言。',
  },
  {
    icon: Brain,
    label: '模型提出调用',
    color: 'var(--c-purple)',
    log: '{"name":"get_weather","arguments":{"city":"杭州","date":"2026-09-02"}}',
    logType: 'model',
    detail: '模型看过工具定义后，输出一个结构化的调用请求。它只是请求，不等于已经执行。',
  },
  {
    icon: Cog,
    label: '程序执行',
    color: 'var(--c-orange)',
    log: '✓ 校验参数 ✓ 鉴权 → 调用真实天气 API（密钥留在服务端）',
    logType: 'app',
    detail: '应用程序负责校验、权限、网络、超时与日志。模型永远不直接碰 API。',
  },
  {
    icon: PackageCheck,
    label: '结果回注',
    color: 'var(--c-green)',
    log: '{"city":"杭州","condition":"中雨","high_c":28,"low_c":26}',
    logType: 'tool',
    detail: '短而清楚的结构化结果，用 call_id 绑定回原请求，作为新观察回到消息历史。',
  },
  {
    icon: Flag,
    label: '模型再判断',
    color: 'var(--c-yellow)',
    log: '杭州今天有中雨，26–28℃，出门请带伞。要现在创建提醒吗？',
    logType: 'final',
    detail: '模型看到结果后决定：直接回答、继续调用别的工具，或命中停止条件结束循环。',
  },
];

const logStyle: Record<string, { label: string; color: string }> = {
  user: { label: '用户', color: 'var(--c-blue)' },
  model: { label: '模型 → 工具调用', color: 'var(--c-purple)' },
  app: { label: '程序执行', color: 'var(--c-orange)' },
  tool: { label: '工具结果', color: 'var(--c-green)' },
  final: { label: '最终回答', color: '#8a6d00' },
};

export default function AgentLoop() {
  const [step, setStep] = useState(0); // how many steps revealed
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setStep((s) => {
          if (s >= steps.length) {
            setPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 1600);
    }
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [playing]);

  const reset = () => { setPlaying(false); setStep(0); };

  return (
    <section id="loop" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
        <div>
          <p className="chapter-stamp text-sm" style={{ color: 'var(--c-orange)' }}>第 1 章 · 先睹为快</p>
          <h2 className="font-serif-sc font-black text-4xl md:text-5xl mt-2">最小 Agent 循环</h2>
        </div>
        <p className="max-w-md opacity-75 leading-relaxed">
          Agent 干活其实就四个动作：<strong>模型提出调用 → 程序执行 → 结果回注 → 模型再判断</strong>。
          看懂了它，后面九章都好懂。
        </p>
      </div>

      <div className="ink-card p-6 md:p-8 mt-6">
        {/* step nodes */}
        <div className="flex items-stretch justify-between gap-2 md:gap-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const revealed = i < step;
            const active = i === step - 1;
            return (
              <div key={s.label} className="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
                <div
                  className={`flex-1 text-center rounded-xl border-2 px-1 py-4 md:py-5 transition-all duration-300 ${active ? 'loop-active' : ''}`}
                  style={{
                    borderColor: 'var(--ink)',
                    background: revealed ? s.color : '#f3ecdb',
                    color: revealed ? '#fffdf6' : 'rgba(62,56,50,0.4)',
                    transform: active ? 'translateY(-4px)' : undefined,
                  }}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7 mx-auto" strokeWidth={2} />
                  <div className="text-xs md:text-sm font-bold mt-2 leading-tight">{s.label}</div>
                </div>
                {i < steps.length - 1 && (
                  <svg width="26" height="20" viewBox="0 0 26 20" className="shrink-0 hidden sm:block"
                       style={{ opacity: i < step - 1 ? 1 : 0.25, transition: 'opacity .3s' }}>
                    <path d="M2 10 H20 M14 3 L22 10 L14 17" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* loop-back arrow */}
        <div className="hidden md:flex justify-center mt-2" style={{ opacity: step >= 4 && step < 5 ? 1 : step >= 5 ? 1 : 0.2 }}>
          <svg width="70%" height="34" viewBox="0 0 700 34" fill="none">
            <path d="M640 4 V22 H60 V10" stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 5" />
            <path d="M52 16 L60 6 L68 16" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="350" y="16" textAnchor="middle" fontSize="12" fill="var(--ink)" opacity="0.7">没答完？带着结果重新进入循环</text>
          </svg>
        </div>

        {/* detail line */}
        <div className="mt-4 min-h-[3.5rem] text-center">
          {step > 0 ? (
            <p className="inline-block text-left md:text-center text-sm md:text-base leading-relaxed px-4 py-2 rounded-lg border-2 dashed-ink max-w-2xl">
              {steps[step - 1].detail}
            </p>
          ) : (
            <p className="opacity-50 text-sm pt-2">点「播放」，跟着一次真实的天气查询走一遍；想看清细节就用「单步」↓</p>
          )}
        </div>

        {/* controls */}
        <div className="flex justify-center gap-3 mt-4">
          <button onClick={() => setPlaying((p) => !p)}
                  className="ink-card ink-card-hover px-5 py-2 font-bold text-sm inline-flex items-center gap-2"
                  style={{ background: playing ? '#fffdf6' : 'var(--c-orange)', color: playing ? 'var(--ink)' : '#fffdf6' }}>
            {playing ? <><Pause className="w-4 h-4" /> 暂停</> : <><Play className="w-4 h-4" /> 播放</>}
          </button>
          <button onClick={() => { setPlaying(false); setStep((s) => Math.min(s + 1, steps.length)); }}
                  className="ink-card ink-card-hover px-5 py-2 font-bold text-sm inline-flex items-center gap-2">
            <StepForward className="w-4 h-4" /> 单步
          </button>
          <button onClick={reset} className="ink-card ink-card-hover px-5 py-2 font-bold text-sm inline-flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> 重来
          </button>
        </div>

        {/* message log */}
        <div className="code-block rounded-xl mt-6 p-4 md:p-5 font-mono-code text-xs md:text-sm space-y-3 min-h-[7rem]">
          {step === 0 && <p className="opacity-40">// 调用日志会出现在这里……</p>}
          {steps.slice(0, step).map((s, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="shrink-0 px-2 py-0.5 rounded text-[10px] md:text-xs font-sans font-bold"
                    style={{ background: logStyle[s.logType].color, color: '#fffdf6' }}>
                {logStyle[s.logType].label}
              </span>
              <span className="break-all leading-relaxed">{s.log}</span>
            </div>
          ))}
          {step >= steps.length && (
            <p className="pt-1" style={{ color: 'var(--c-yellow)' }}>
              // 命中停止条件：模型给出最终回答 → 循环结束 ✔
            </p>
          )}
        </div>
      </div>

      <p className="text-center mt-6 opacity-70 text-sm">
        记住这一句就够了：<strong>模型负责想下一步，程序负责干活和检查。</strong>
      </p>
    </section>
  );
}
