const principles = [
  ['模型负责提出下一步，不负责偷偷执行', 'var(--c-orange)'],
  ['程序先按 Schema 校验参数，再按当前用户鉴权', 'var(--c-blue)'],
  ['上下文是临时工作集，不是档案库', 'var(--c-purple)'],
  ['搜索结果只是路标，原始资料才是证据', 'var(--c-green)'],
  ['写操作用稳定幂等键，数据库约束兜底', 'var(--c-orange)'],
  ['连接成功不等于授权成功', 'var(--c-yellow)'],
  ['把愿望改成判定题，完成状态要能复现', 'var(--c-blue)'],
  ['摘要一定有损：硬约束留在结构化字段', 'var(--c-purple)'],
  ['慢任务先给号码牌，再执行', 'var(--c-green)'],
  ['先把一个 Agent 做可靠，再谈一支小队', '#8a6d00'],
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
