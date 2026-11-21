import type { ReactNode } from 'react';

const INLINE_RE = /(\*\*[^*]+\*\*|`[^`]+`)/g;

/**
 * 轻量行内富文本渲染器：仅支持 **加粗** 与 `行内代码`，零外部依赖且默认转义安全。
 */
export default function RichText({
  text,
  tone = 'light',
}: {
  text: string;
  tone?: 'light' | 'dark';
}) {
  const parts: ReactNode[] = [];
  let last = 0;

  for (const m of text.matchAll(INLINE_RE)) {
    const idx = m.index!;
    if (idx > last) {
      parts.push(text.slice(last, idx));
    }
    const token = m[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong
          key={idx}
          className="font-bold"
          style={tone === 'dark' ? { color: '#fffdf6' } : { color: 'var(--ink)' }}
        >
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={idx}
          className="font-mono-code text-[0.86em] px-1.5 py-[1px] rounded mx-0.5 align-baseline"
          style={
            tone === 'dark'
              ? {
                  background: 'rgba(246,242,229,0.14)',
                  color: '#fff4cf',
                  border: '1px solid rgba(246,242,229,0.22)',
                }
              : {
                  background: '#efe8d4',
                  color: 'var(--ink)',
                  border: '1px solid rgba(62,56,50,0.22)',
                }
          }
        >
          {token.slice(1, -1)}
        </code>,
      );
    }
    last = idx + token.length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return <>{parts}</>;
}
