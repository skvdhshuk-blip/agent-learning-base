export default function Footer() {
  return (
    <footer className="py-10 text-center" style={{ background: 'var(--ink)' }}>
      <div className="border-t pt-8" style={{ borderColor: 'rgba(246,242,229,0.15)' }}>
        <p className="font-serif-sc font-bold text-lg" style={{ color: 'var(--paper)' }}>
          Agent 原来这么简单 · 图解入门
        </p>
        <p className="chapter-stamp text-xs mt-2 opacity-50" style={{ color: 'var(--paper)' }}>
          LEARNING AGENT BASE · 内容整理自同名图解教程 · 2026-09
        </p>
      </div>
    </footer>
  );
}
