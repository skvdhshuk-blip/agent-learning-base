import { chapters } from '../data/chapters';

export default function ChapterMap({ onOpen }: { onOpen: (id: number) => void }) {
  return (
    <section id="chapters" className="py-20 border-t-2" style={{ borderColor: 'var(--ink)', background: '#efe9d8' }}>
      <div className="max-w-6xl mx-auto px-6">
        <p className="chapter-stamp text-sm" style={{ color: 'var(--c-purple)' }}>LEARNING MAP</p>
        <h2 className="font-serif-sc font-black text-4xl md:text-5xl mt-2">十章学习地图</h2>
        <p className="mt-4 max-w-2xl opacity-75 leading-relaxed">
          每章的读法都一样：先看小问犯个错，猜一道题热身，再读正文。
          后半程有 Bug 复盘、伪代码和一份动手练习，读完章末三问，这章就算吃透了。
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {chapters.map((ch, i) => (
            <button key={ch.id} onClick={() => onOpen(ch.id)}
                    className="ink-card ink-card-hover text-left p-5 relative overflow-hidden"
                    style={{ transform: `rotate(${((i % 3) - 1) * 0.5}deg)` }}>
              <div className="absolute top-0 left-0 w-full h-2" style={{ background: ch.color }} />
              <p className="chapter-stamp text-xs mt-1" style={{ color: ch.color }}>
                CH {String(ch.id).padStart(2, '0')}
              </p>
              <h3 className="font-serif-sc font-black text-xl mt-2 leading-snug">{ch.title}</h3>
              <p className="text-xs mt-1 opacity-60 chapter-stamp">{ch.subtitle}</p>
              <p className="text-sm mt-3 opacity-75 leading-relaxed line-clamp-2">
                <span style={{ color: 'var(--c-purple)' }}>犯错：</span>{ch.mistakeTitle}
              </p>
              <p className="text-sm mt-2 font-bold inline-flex items-center gap-1 hl-link" style={{ color: ch.color }}>
                开始这一章 →
              </p>
            </button>
          ))}

          <div className="p-5 rounded-none border-2 dashed-ink flex flex-col justify-center items-center text-center gap-3">
            <p className="font-serif-sc font-bold text-lg leading-relaxed">
              十章读完，<br />你就能自己搭一个<br />靠得住的 Agent
            </p>
            <p className="chapter-stamp text-xs opacity-60">从一次调用 · 到一支小队</p>
          </div>
        </div>
      </div>
    </section>
  );
}
