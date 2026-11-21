import { ShieldAlert, Lock, ArrowDown, Layers, GitBranch, ShieldCheck } from 'lucide-react';
import type { DiagramId } from '../data/lessonTypes';

/* ---------- 1. 上下文五层 ---------- */
export function ContextDiagram() {
  const layers = [
    { name: '规则层', desc: '固定前缀、权限边界与停止条件', no: '每秒跳动的时间戳（保前缀缓存）', color: 'var(--c-purple)' },
    { name: '请求层', desc: '用户目标、偏好与转义 @引用', no: '服务端密钥与未鉴权信任', color: 'var(--c-blue)' },
    { name: '能力层', desc: '工具说明、并发档与参数规范', no: '工具内部实现全文', color: 'var(--c-orange)' },
    { name: '观察层', desc: '限流/落盘后的精简结果、状态与来源', no: 'UI 富卡片、及误把 Read 自己落盘', color: 'var(--c-green)' },
    { name: '历史层', desc: '成对对话、快照与末尾增量提醒', no: '无关旧聊天或破坏前缀的回改', color: '#8a6d00' },
  ];
  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
      <div className="space-y-3.5">
        {layers.map((l) => (
          <div key={l.name} className="ink-card p-3 flex items-center gap-3">
            <span
              className="chapter-stamp shrink-0 w-16 text-center text-xs font-bold py-2 rounded border-2"
              style={{ borderColor: 'var(--ink)', background: l.color, color: '#fffdf6' }}
            >
              {l.name}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-snug">{l.desc}</p>
              <p className="text-xs opacity-60 mt-0.5">别放：{l.no}</p>
            </div>
          </div>
        ))}
      </div>
      <svg width="52" height="96" viewBox="0 0 60 120" className="mx-auto rotate-90 md:rotate-0">
        <path
          d="M8 60 H44 M36 48 L50 60 L36 72"
          stroke="var(--ink)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="ink-card p-5 text-center" style={{ background: '#efe8d4' }}>
        <p className="chapter-stamp text-xs opacity-60">前缀冻结 · 增量后置</p>
        <p className="font-serif-sc font-black text-2xl mt-2">
          据此选择
          <br />
          下一步
        </p>
        <p className="text-sm mt-3 opacity-75 leading-relaxed">
          动态变化走末尾提醒块
          <br />
          UI 卡片与秘密留模型外
        </p>
        <div
          className="mt-4 pt-4 border-t-2 dashed-ink text-xs leading-relaxed"
          style={{ color: 'var(--c-purple)' }}
        >
          <ShieldAlert className="w-4 h-4 inline mr-1" />
          观察与展示标签不可信：服务端永远按真实 ID 重新鉴权
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Tool / Skill / MCP ---------- */
export function TSMDiagram() {
  const cols = [
    {
      name: 'Tool 工具',
      key: '能执行什么动作',
      ex: 'get_order(order_id)',
      color: 'var(--c-orange)',
      inkColor: 'var(--c-orange)',
      note: '坏 JSON 直报、按入参分并发档',
    },
    {
      name: 'Skill 技能',
      key: '这类任务该怎么做',
      ex: '订单客服处理手册',
      color: 'var(--c-yellow)',
      inkColor: '#8a6500',
      note: '目录限预算；压缩/过期需重读 Ready',
    },
    {
      name: 'MCP 协议',
      key: '外部能力怎样标准接入',
      ex: '订单系统 MCP server',
      color: 'var(--c-green)',
      inkColor: 'var(--c-green)',
      note: '后台预热 + 按需拉取；连接 ≠ 授权',
    },
  ];
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5">
        {cols.map((c) => (
          <div key={c.name} className="ink-card p-5 text-center relative overflow-hidden">
            <div className="w-full h-2 absolute top-0 left-0" style={{ background: c.color }} />
            <p className="font-serif-sc font-black text-xl mt-2">{c.name}</p>
            <p className="text-sm mt-1 font-bold" style={{ color: c.inkColor }}>
              {c.key}
            </p>
            <p className="font-mono-code text-xs mt-3 px-3 py-2 rounded" style={{ background: '#efe8d4' }}>
              {c.ex}
            </p>
            <p className="text-xs mt-3 opacity-75 leading-relaxed">{c.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-3 flex-wrap text-sm">
        <span
          className="px-4 py-2 rounded-full border-2 font-bold"
          style={{ borderColor: 'var(--ink)', background: '#fffdf6' }}
        >
          Agent：此刻下一步选什么
        </span>
        <span className="opacity-70">→ 先核新鲜度与权限，再分叉防嵌套或执行调用</span>
      </div>
    </div>
  );
}

/* ---------- 3. 记忆三层 ---------- */
export function MemoryDiagram() {
  const tiers = [
    {
      name: '会话状态与笔记',
      own: '属于这次任务',
      life: '分清 revision / versionId / 草稿',
      ex: '订单进度、工作笔记、未保存提醒',
      color: 'var(--c-blue)',
    },
    {
      name: '长期记忆库',
      own: '属于某个主体',
      life: '跨会话可撤回 · 同库写入上锁',
      ex: '语言偏好、先读后并日期日志',
      color: 'var(--c-orange)',
    },
    {
      name: '只读知识库',
      own: '属于组织或产品',
      life: '入库封装版本 · 对外检索只读',
      ex: '手册、制度、代码文档',
      color: 'var(--c-green)',
    },
  ];
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5">
        {tiers.map((t) => (
          <div key={t.name} className="ink-card p-5">
            <p className="font-serif-sc font-black text-xl" style={{ color: t.color }}>
              {t.name}
            </p>
            <p className="text-sm font-bold mt-1">{t.own}</p>
            <p className="text-xs opacity-70 mt-0.5">{t.life}</p>
            <p className="text-sm mt-3 pt-3 border-t-2 dashed-ink opacity-85">例：{t.ex}</p>
          </div>
        ))}
      </div>
      <p className="text-center mt-5 text-sm opacity-75 leading-relaxed">
        三者都能「查回来」，但<strong>归谁管、怎么加锁与防覆盖、历史图怎样控上限</strong>完全不同。先分家，再谈检索。
        <span className="inline-flex items-center gap-1 ml-2" style={{ color: 'var(--c-purple)' }}>
          <Lock className="w-4 h-4" /> 权限与未保存草稿门禁在服务端把守
        </span>
      </p>
    </div>
  );
}

/* ---------- 4. 慢任务状态机 ---------- */
export function AsyncDiagram() {
  const states = [
    { name: 'queued', cn: '已受理', color: 'var(--c-blue)' },
    { name: 'running', cn: '执行/停泊', color: 'var(--c-orange)' },
    { name: 'succeeded', cn: '成功', color: 'var(--c-green)' },
    { name: 'failed', cn: '失败', color: 'var(--c-purple)' },
    { name: 'outcome_unknown', cn: '结果未知', color: '#a04b2a' },
    { name: 'cancelled', cn: '已取消', color: '#8a6500' },
  ];
  return (
    <div>
      <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
        {states.map((s, i) => (
          <div key={s.name} className="flex items-center gap-2 md:gap-3">
            <div className="ink-card px-3.5 py-2.5 text-center">
              <p className="font-mono-code font-bold text-xs md:text-sm" style={{ color: s.color }}>
                {s.name}
              </p>
              <p className="text-xs opacity-70 mt-0.5">{s.cn}</p>
            </div>
            {i < 1 && (
              <svg width="26" height="16" viewBox="0 0 30 16">
                <path d="M2 8 H24 M18 2 L26 8 L18 14" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            )}
            {i === 1 && <span className="text-xs opacity-55 mx-0.5">终态分支 ↓</span>}
          </div>
        ))}
      </div>
      <div className="mt-5 grid md:grid-cols-3 gap-3.5 text-sm">
        {[
          ['短等停泊，通知唤醒', '长任务短等即停泊让出 Worker，凭幂等 JobNotice 唤醒续跑，不占线程死等。'],
          ['安全检查点插队', '立即插队只断模型流、不杀在跑生成任务，严禁拆散 tool_use 与 tool_result 配对。'],
          ['确定幂等与租约栅栏', '按 (轮次ID, 调用ID, 序号) 生成键，写库前复核租约未取消，未知结果先查再重投。'],
        ].map(([t, d]) => (
          <div key={t} className="px-4 py-3 rounded-lg border-2 dashed-ink bg-[#fffdf6]">
            <p className="font-bold">{t}</p>
            <p className="opacity-75 mt-1 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 5. 第 1 章：循环四道护栏 ---------- */
export function LoopGuardDiagram() {
  const guards = [
    {
      no: '01',
      title: '仅在流开启前重试',
      desc: '吐出首个分片前可退避重连；一旦流出正文或调用就只结算状态，绝不悄悄重放拼出双份回答。',
      color: 'var(--c-blue)',
    },
    {
      no: '02',
      title: '严格配对与全局 ID',
      desc: '厂商 call_0 只保本包不重名；存库与幂等绑定全局 UUID，中断或跳过也补齐 tool_result。',
      color: 'var(--c-green)',
    },
    {
      no: '03',
      title: '多步周期防转圈 + 熔断',
      desc: '扫描「报错 → 读一眼 → 同参数重撞」周期循环：3/5/8 次梯度提醒换路，连续 10 轮全错熔断。',
      color: 'var(--c-purple)',
    },
    {
      no: '04',
      title: '收尾缓冲与派发前拦截',
      desc: '临近轮数上限先注入收尾提示（保留工具列表保缓存）；若仍请求调用，派发前整批拦下。',
      color: 'var(--c-orange)',
    },
  ];
  return (
    <div className="rounded-xl border-2 p-5 bg-[#f3ecdb]" style={{ borderColor: 'var(--ink)' }}>
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5" style={{ color: 'var(--c-orange)' }} />
        <p className="chapter-stamp text-xs font-bold opacity-75">PRODUCTION GUARDRAILS · 循环四道护栏</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {guards.map((g) => (
          <div key={g.no} className="ink-card p-4">
            <div className="flex items-center gap-2">
              <span
                className="chapter-stamp text-xs font-bold px-2 py-0.5 rounded"
                style={{ background: g.color, color: '#fffdf6' }}
              >
                {g.no}
              </span>
              <p className="font-serif-sc font-bold text-base">{g.title}</p>
            </div>
            <p className="text-xs md:text-sm opacity-80 mt-2 leading-relaxed">{g.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 6. 第 8 章：三阶省钱压缩漏斗 ---------- */
export function CompactTiersDiagram() {
  const tiers = [
    {
      step: '第一阶 · 零模型费用',
      title: '会话工作笔记直通（Session Memory）',
      desc: '若后台已维护有效工作笔记且足够短，保留近期几组交互、其余直接替换，省掉整次摘要模型调用。',
      color: 'var(--c-green)',
    },
    {
      step: '第二阶 · 轻量减负',
      title: '微压缩旧工具大输出（Microcompact）',
      desc: '把几轮以前几万字的命令日志折成短占位符，不动系统前缀，往往就能重新稳住预算。',
      color: 'var(--c-blue)',
    },
    {
      step: '第三阶 · 完整总结与按轮回退',
      title: 'user 角色触发纯文本摘要 + 超长按轮淘汰',
      desc: '用 user 角色发总结指令、禁调工具、只认完整非空纯文本；仍遇超长 413 时按「完整 API 交互轮次组」从头裁剪，不拆调用对。',
      color: 'var(--c-purple)',
    },
  ];
  return (
    <div className="rounded-xl border-2 p-5 bg-[#f3ecdb]" style={{ borderColor: 'var(--ink)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-5 h-5" style={{ color: 'var(--c-purple)' }} />
        <p className="chapter-stamp text-xs font-bold opacity-75">COMPACTION FUNNEL · 成本由低到高三阶压缩</p>
      </div>
      <div className="space-y-3">
        {tiers.map((t, i) => (
          <div key={t.step}>
            <div className="ink-card p-4 flex flex-col sm:flex-row sm:items-start gap-3">
              <span
                className="chapter-stamp shrink-0 text-xs font-bold px-2.5 py-1 rounded self-start"
                style={{ background: t.color, color: '#fffdf6' }}
              >
                {t.step}
              </span>
              <div className="min-w-0">
                <p className="font-serif-sc font-bold text-base">{t.title}</p>
                <p className="text-xs md:text-sm opacity-80 mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </div>
            {i < tiers.length - 1 && (
              <div className="flex justify-center pt-3 pb-1 opacity-55">
                <ArrowDown className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 px-4 py-3 rounded-lg border-2 dashed-ink bg-[#fffdf6] text-xs md:text-sm leading-relaxed">
        <strong>压缩落地四重置：</strong>
        清零旧 token 用量锚点 · 失效旧提取游标 · 过期 Skill 标为需重读 · 锁定硬约束留在结构化字段
      </div>
    </div>
  );
}

/* ---------- 7. 第 10 章：5 秒转后台与按 run_id 协作 ---------- */
export function SubagentFlowDiagram() {
  return (
    <div className="rounded-xl border-2 p-5 bg-[#f3ecdb]" style={{ borderColor: 'var(--ink)' }}>
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="w-5 h-5" style={{ color: '#8a6500' }} />
        <p className="chapter-stamp text-xs font-bold opacity-75">SUB-AGENT LIFECYCLE · 短等转后台与轮次隔离</p>
      </div>

      <div className="ink-card p-4 text-center">
        <p className="font-serif-sc font-black text-base">主对话派发隔离子会话（独立上下文与轮数预算）</p>
        <p className="text-xs opacity-75 mt-1">
          工具表强制剔除：<strong>「再派子 Agent」</strong>（防无限裂变）与 <strong>「弹窗问用户」</strong>（防后台死等）
        </p>
      </div>

      <div className="flex justify-center pt-3 pb-2 opacity-60">
        <ArrowDown className="w-4 h-4" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="ink-card p-4" style={{ borderTopWidth: 5, borderTopColor: 'var(--c-green)' }}>
          <p className="chapter-stamp text-xs font-bold" style={{ color: 'var(--c-green)' }}>
            ≤ 5 秒完成 · 快路径
          </p>
          <p className="font-serif-sc font-bold text-base mt-1">内联直接交卷</p>
          <p className="text-xs md:text-sm opacity-80 mt-1.5 leading-relaxed">
            主对话当轮拿到结构化结果继续推理，几乎零额外等待。
          </p>
        </div>
        <div className="ink-card p-4" style={{ borderTopWidth: 5, borderTopColor: 'var(--c-orange)' }}>
          <p className="chapter-stamp text-xs font-bold" style={{ color: 'var(--c-orange)' }}>
            超时未完 · 慢路径
          </p>
          <p className="font-serif-sc font-bold text-base mt-1">原子升级后台 + 通知唤醒</p>
          <p className="text-xs md:text-sm opacity-80 mt-1.5 leading-relaxed">
            仅将当前 run_id 切换为后台托管；完成后发任务通知唤醒，绝不写 sleep 轮询。
          </p>
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-3 gap-2.5 text-xs leading-relaxed">
        {[
          ['按 run_id 隔离子轮次', '连续追派 send 互不覆盖前轮结果与失败信息'],
          ['UUID 字典序加锁', '父子同锁统一按小到大排序，根治交叉死锁'],
          ['父退回级联清场', '主会话停止、删除或退回重来时联动叫停子分支'],
        ].map(([t, d]) => (
          <div key={t} className="px-3.5 py-2.5 rounded-lg border-2 dashed-ink bg-[#fffdf6]">
            <p className="font-bold">{t}</p>
            <p className="opacity-75 mt-0.5">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChapterDiagram({ id }: { id: DiagramId }) {
  switch (id) {
    case 'context':
      return <ContextDiagram />;
    case 'tsm':
      return <TSMDiagram />;
    case 'memory':
      return <MemoryDiagram />;
    case 'async':
      return <AsyncDiagram />;
    case 'loop-guard':
      return <LoopGuardDiagram />;
    case 'compact-tiers':
      return <CompactTiersDiagram />;
    case 'subagent-flow':
      return <SubagentFlowDiagram />;
  }
}
