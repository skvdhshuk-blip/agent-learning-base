import { useState } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

const tabs = [
  { id: 'context', label: '上下文工作台', color: 'var(--c-blue)' },
  { id: 'tsm', label: 'Tool · Skill · MCP', color: 'var(--c-yellow)' },
  { id: 'memory', label: '记忆三层', color: 'var(--c-orange)' },
  { id: 'async', label: '慢任务状态机', color: 'var(--c-green)' },
];

/* ---------- 1. 上下文五层 ---------- */
function ContextDiagram() {
  const layers = [
    { name: '规则层', desc: '固定前缀、权限边界与停止条件', no: '每秒跳动的时间戳（保前缀缓存）', color: 'var(--c-purple)' },
    { name: '请求层', desc: '用户目标、偏好与转义 @引用', no: '服务端密钥与未鉴权信任', color: 'var(--c-blue)' },
    { name: '能力层', desc: '工具说明、并发档与参数规范', no: '工具内部实现全文', color: 'var(--c-orange)' },
    { name: '观察层', desc: '限流/落盘后的精简结果、状态与来源', no: 'UI 富卡片、及误把 Read 自己落盘', color: 'var(--c-green)' },
    { name: '历史层', desc: '成对对话、快照与末尾增量提醒', no: '无关旧聊天或破坏前缀的回改', color: '#8a6d00' },
  ];
  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
      <div className="space-y-3">
        {layers.map((l) => (
          <div key={l.name} className="ink-card p-3 flex items-center gap-3">
            <span className="chapter-stamp shrink-0 w-16 text-center text-xs font-bold py-2 rounded border-2"
                  style={{ borderColor: 'var(--ink)', background: l.color, color: '#fffdf6' }}>
              {l.name}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-snug">{l.desc}</p>
              <p className="text-xs opacity-60 mt-0.5">别放：{l.no}</p>
            </div>
          </div>
        ))}
      </div>
      <svg width="60" height="120" viewBox="0 0 60 120" className="mx-auto rotate-90 md:rotate-0">
        <path d="M8 60 H44 M36 48 L50 60 L36 72" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="ink-card p-6 text-center" style={{ background: '#efe8d4' }}>
        <p className="chapter-stamp text-xs opacity-60">前缀冻结 · 增量后置</p>
        <p className="font-serif-sc font-black text-2xl mt-2">据此选择<br />下一步</p>
        <p className="text-sm mt-3 opacity-75 leading-relaxed">动态变化走末尾提醒块<br />UI 卡片与秘密留模型外</p>
        <div className="mt-4 pt-4 border-t-2 dashed-ink text-xs leading-relaxed" style={{ color: 'var(--c-purple)' }}>
          <ShieldAlert className="w-4 h-4 inline mr-1" />
          观察与展示标签不可信：服务端永远按真实 ID 重新鉴权
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Tool / Skill / MCP ---------- */
function TSMDiagram() {
  const cols = [
    { name: 'Tool 工具', key: '能执行什么动作', ex: 'get_order(order_id)', color: 'var(--c-orange)', note: '坏 JSON 直报、按入参分并发档' },
    { name: 'Skill 技能', key: '这类任务该怎么做', ex: '订单客服处理手册', color: 'var(--c-yellow)', note: '目录限预算；压缩/过期需重读 Ready' },
    { name: 'MCP 协议', key: '外部能力怎样标准接入', ex: '订单系统 MCP server', color: 'var(--c-green)', note: '后台预热 + 按需拉取；连接 ≠ 授权' },
  ];
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5">
        {cols.map((c) => (
          <div key={c.name} className="ink-card p-5 text-center relative">
            <div className="w-full h-2 absolute top-0 left-0" style={{ background: c.color }} />
            <p className="font-serif-sc font-black text-xl mt-2">{c.name}</p>
            <p className="text-sm mt-1 font-bold" style={{ color: c.color }}>{c.key}</p>
            <p className="font-mono-code text-xs mt-3 px-3 py-2 rounded" style={{ background: '#efe8d4' }}>{c.ex}</p>
            <p className="text-xs mt-3 opacity-70">{c.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-3 flex-wrap text-sm">
        <span className="px-4 py-2 rounded-full border-2 font-bold" style={{ borderColor: 'var(--ink)', background: '#fffdf6' }}>
          Agent：此刻下一步选什么
        </span>
        <span className="opacity-60">→ 先核新鲜度与权限，再分叉防嵌套或执行调用</span>
      </div>
    </div>
  );
}

/* ---------- 3. 记忆三层 ---------- */
function MemoryDiagram() {
  const tiers = [
    { name: '会话状态与笔记', own: '属于这次任务', life: '分清 revision / versionId / 草稿', ex: '订单进度、工作笔记、未保存提醒', color: 'var(--c-blue)' },
    { name: '长期记忆库', own: '属于某个主体', life: '跨会话可撤回 · 同库写入上锁', ex: '语言偏好、先读后并日期日志', color: 'var(--c-orange)' },
    { name: '只读知识库', own: '属于组织或产品', life: '入库封装版本 · 对外检索只读', ex: '手册、制度、代码文档', color: 'var(--c-green)' },
  ];
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5">
        {tiers.map((t) => (
          <div key={t.name} className="ink-card p-5">
            <p className="font-serif-sc font-black text-xl" style={{ color: t.color }}>{t.name}</p>
            <p className="text-sm font-bold mt-1">{t.own}</p>
            <p className="text-xs opacity-70 mt-0.5">{t.life}</p>
            <p className="text-sm mt-3 pt-3 border-t-2 dashed-ink opacity-80">例：{t.ex}</p>
          </div>
        ))}
      </div>
      <p className="text-center mt-6 text-sm opacity-75 leading-relaxed">
        三者都能「查回来」，但<strong>归谁管、怎么加锁与防覆盖、历史图怎样控上限</strong>完全不同。先分家，再谈检索。
        <span className="inline-flex items-center gap-1 ml-2" style={{ color: 'var(--c-purple)' }}>
          <Lock className="w-4 h-4" /> 权限与未保存草稿门禁在服务端把守，指望不上向量库自觉
        </span>
      </p>
    </div>
  );
}

/* ---------- 4. 慢任务状态机 ---------- */
function AsyncDiagram() {
  const states = [
    { name: 'queued', cn: '已受理', color: 'var(--c-blue)' },
    { name: 'running', cn: '执行/停泊', color: 'var(--c-orange)' },
    { name: 'succeeded', cn: '成功', color: 'var(--c-green)' },
    { name: 'failed', cn: '失败', color: 'var(--c-purple)' },
    { name: 'outcome_unknown', cn: '结果未知', color: '#a04b2a' },
    { name: 'cancelled', cn: '已取消', color: '#8a6d00' },
  ];
  return (
    <div>
      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        {states.map((s, i) => (
          <div key={s.name} className="flex items-center gap-2 md:gap-4">
            <div className="ink-card px-4 py-3 text-center">
              <p className="font-mono-code font-bold text-sm" style={{ color: s.color }}>{s.name}</p>
              <p className="text-xs opacity-70 mt-0.5">{s.cn}</p>
            </div>
            {i < states.length - 1 && i < 1 && (
              <svg width="30" height="16" viewBox="0 0 30 16"><path d="M2 8 H24 M18 2 L26 8 L18 14" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>
            )}
            {i === 1 && <span className="text-xs opacity-50 mx-1">终态分支 ↓</span>}
          </div>
        ))}
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
        {[
          ['短等停泊，通知唤醒', '长任务短等即停泊让出 Worker，凭幂等 JobNotice 唤醒续跑，不占用进程死等或轮询。'],
          ['安全检查点插队', '立即插队只断模型流、不停掉在跑生成任务，严禁拆散 tool_use 与 tool_result 配对。'],
          ['确定幂等与租约栅栏', '按 (轮次ID, 调用ID, 序号) 生成键，写库前事务复核租约未取消，未知结果先查再重投。'],
        ].map(([t, d]) => (
          <div key={t} className="px-4 py-3 rounded-lg border-2 dashed-ink">
            <p className="font-bold">{t}</p>
            <p className="opacity-75 mt-1 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Diagrams() {
  const [tab, setTab] = useState('context');
  const active = tabs.find((t) => t.id === tab)!;

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <p className="chapter-stamp text-sm" style={{ color: 'var(--c-green)' }}>CHEAT SHEETS</p>
      <h2 className="font-serif-sc font-black text-4xl md:text-5xl mt-2">四张必会图解</h2>
      <p className="mt-4 max-w-2xl opacity-75 leading-relaxed">
        书里有四张图最常被翻回去看，这里做成了随身版，点开就能用。
      </p>

      <div className="flex gap-3 mt-8 flex-wrap">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
                  className="px-5 py-2.5 rounded-full border-2 font-bold text-sm transition-all"
                  style={{
                    borderColor: 'var(--ink)',
                    background: tab === t.id ? t.color : '#fffdf6',
                    color: tab === t.id ? '#fffdf6' : 'var(--ink)',
                    transform: tab === t.id ? 'translate(-1px,-1px)' : undefined,
                    boxShadow: tab === t.id ? '3px 3px 0 rgba(62,56,50,0.9)' : 'none',
                  }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="ink-card p-6 md:p-10 mt-6" style={{ borderTopWidth: 6, borderTopColor: active.color }}>
        {tab === 'context' && <ContextDiagram />}
        {tab === 'tsm' && <TSMDiagram />}
        {tab === 'memory' && <MemoryDiagram />}
        {tab === 'async' && <AsyncDiagram />}
      </div>
    </section>
  );
}
