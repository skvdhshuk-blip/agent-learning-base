const principles = [
  ['模型只提议下一步；调用成对闭合、到点前收尾，周期死循环拦截在派发前', 'var(--c-orange)'],
  ['程序先严查语法再规整 Schema 并鉴权；CLI 无 Shell 直调且剥除自批参数', 'var(--c-blue)'],
  ['上下文是稳缓存的工作台：静态前缀冻结，增量后置，Read 输出豁免落盘', 'var(--c-purple)'],
  ['搜索摘要只是路标，回退标作 [snippet]；卡片或缩略图不替代实态验真', 'var(--c-green)'],
  ['写操作凭全局幂等键，写库事务复核租约；效果存疑标「结果未知」先查不盲重发', 'var(--c-orange)'],
  ['Skill 目录控预算且压缩失忆须重载；MCP 后台预热延迟发现，连接不等于授权', 'var(--c-yellow)'],
  ['把愿望改成判定题：受理 ≠ 候选成功 ≠ 回读交付，看脉搏不拿 0% 误判重投', 'var(--c-blue)'],
  ['三阶压缩保成对轮次：硬约束留结构化字段，压缩后重置锚点并失效旧游标', 'var(--c-purple)'],
  ['慢任务先给号码牌再停泊唤醒；排队与插队只准停在安全检查点，不拆调用对', 'var(--c-green)'],
  ['先把单 Agent 做扎实：子分支禁嵌套与阻塞问人，按 run_id 跟踪且退回时级联清场', '#8a6d00'],
];

export default function Principles() {
  return (
    <section className="border-t-2 py-20" style={{ borderColor: 'var(--ink)', background: 'var(--ink)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <p className="chapter-stamp text-sm" style={{ color: 'var(--c-yellow)' }}>TAKE IT WITH YOU</p>
        <h2 className="font-serif-sc font-black text-4xl md:text-5xl mt-2" style={{ color: 'var(--paper)' }}>
          十句随身卡
        </h2>
        <p className="mt-4 opacity-70 max-w-2xl leading-relaxed" style={{ color: 'var(--paper)' }}>
          一章一句，都是踩过坑之后留下的。贴在工位上，够用很久。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          {principles.map(([text, color], i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-transform hover:-translate-y-1"
                 style={{ borderColor: color, background: 'rgba(246,242,229,0.06)' }}>
              <span className="chapter-stamp text-lg font-bold shrink-0" style={{ color }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-serif-sc font-bold leading-relaxed" style={{ color: 'var(--paper)' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
