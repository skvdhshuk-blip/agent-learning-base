import RichText from '../components/RichText';

const principles: [string, string, string][] = [
  [
    '模型只提议，程序来执行并配对',
    '每条 `tool_use` 必闭合，逼近上限先收尾再派发前拦截，防多步周期死循环。',
    'var(--c-orange)',
  ],
  [
    '先严查语法，再规整参数与鉴权',
    '坏 JSON 直报错不兜底成 `{}`；CLI 走 `args[]` 无 Shell 直调并剥除 `--yes`。',
    'var(--c-blue)',
  ],
  [
    '上下文是稳缓存的临时工作台',
    '静态前缀冻结、动态提醒后置，大输出三层限流且豁免 `Read` 防套娃。',
    'var(--c-purple)',
  ],
  [
    '搜索摘要是路标，原文与实测才算数',
    '打不开网页回退摘要标 `[snippet]`；静态卡片不替代播放或交互验真。',
    'var(--c-green)',
  ],
  [
    '写操作带全局幂等键，写库前复核租约',
    '按 `(轮次, 调用, 序号)` 建键，效果存疑标 `outcome_unknown` 先查不盲重发。',
    'var(--c-orange)',
  ],
  [
    '连接成功不等于授权，手册过期必重读',
    'Skill 目录控预算、压缩失忆须重载；MCP 后台预热延迟发现。',
    'var(--c-yellow)',
  ],
  [
    '把愿望写成判定题，交付前必须回读',
    '分清「已受理 / 候选完成 / 已交付」，看 `pulse` 脉搏不拿 `0%` 误判重投。',
    'var(--c-blue)',
  ],
  [
    '摘要一定有损：三阶压缩保成对轮次',
    '工作笔记直通 → 微压缩 → `user` 角色总结；硬约束留在结构化字段。',
    'var(--c-purple)',
  ],
  [
    '慢任务先领号码牌，停泊唤醒不死等',
    '排队冻结配置，立即插队只断模型流、严守安全检查点不拆调用对。',
    'var(--c-green)',
  ],
  [
    '先做稳单 Agent，再谈隔离子小队',
    '子分支禁嵌套与阻塞问人，按 `run_id` 隔离轮次且退回时级联清场。',
    'var(--c-yellow)',
  ],
];

export default function Principles() {
  return (
    <section
      className="border-t-2 py-20"
      style={{ borderColor: 'var(--ink)', background: 'var(--ink)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <p className="chapter-stamp text-sm" style={{ color: 'var(--c-yellow)' }}>
          TAKE IT WITH YOU
        </p>
        <h2
          className="font-serif-sc font-black text-4xl md:text-5xl mt-2"
          style={{ color: 'var(--paper)' }}
        >
          十句随身卡
        </h2>
        <p
          className="mt-4 opacity-75 max-w-2xl leading-relaxed"
          style={{ color: 'var(--paper)' }}
        >
          一章一句短口诀，下面附一行实战落地要点。贴在工位上，够用很久。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          {principles.map(([headline, detail, color], i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-5 py-4 rounded-xl border-2 transition-transform hover:-translate-y-1"
              style={{ borderColor: color, background: 'rgba(246,242,229,0.06)' }}
            >
              <span className="chapter-stamp text-lg font-bold shrink-0 mt-0.5" style={{ color }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p
                  className="font-serif-sc font-bold text-base md:text-lg leading-snug"
                  style={{ color: 'var(--paper)' }}
                >
                  {headline}
                </p>
                <p
                  className="text-xs md:text-sm mt-1.5 leading-relaxed opacity-75"
                  style={{ color: 'var(--paper)' }}
                >
                  <RichText text={detail} tone="dark" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
