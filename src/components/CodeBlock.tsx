import { useMemo, useState, type ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';

type Lang = 'json' | 'yaml' | 'pseudo';

const LANG_LABEL: Record<Lang, string> = {
  json: 'JSON',
  yaml: 'YAML',
  pseudo: '伪代码',
};

function detectLang(code: string): Lang {
  const t = code.trimStart();
  if (t.startsWith('{') || t.startsWith('[')) return 'json';
  if (/^---\s*$/m.test(code) || /^[A-Za-z_-]+\s*:/m.test(code)) return 'yaml';
  return 'pseudo';
}

interface Tok {
  text: string;
  cls?: string;
}

const JSON_RE =
  /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?)\b|\b(true|false|null)\b/g;

function tokenizeJson(code: string): Tok[] {
  const out: Tok[] = [];
  let last = 0;
  for (const m of code.matchAll(JSON_RE)) {
    const i = m.index!;
    if (i > last) out.push({ text: code.slice(last, i) });
    if (m[1] !== undefined) {
      out.push({ text: m[1], cls: m[2] ? 'tok-key' : 'tok-str' });
      if (m[2]) out.push({ text: m[2] });
    } else if (m[3] !== undefined) {
      out.push({ text: m[3], cls: 'tok-num' });
    } else {
      out.push({ text: m[4], cls: 'tok-lit' });
    }
    last = i + m[0].length;
  }
  if (last < code.length) out.push({ text: code.slice(last) });
  return out;
}

function tokenizeYaml(code: string): Tok[] {
  const out: Tok[] = [];
  code.split('\n').forEach((line, li) => {
    if (li > 0) out.push({ text: '\n' });
    let body = line;
    let tail = '';
    const m0 = line.match(/\s+#.*$|^#.*$/);
    if (m0) {
      body = line.slice(0, m0.index);
      tail = line.slice(m0.index!);
    }
    const keyM = body.match(/^(\s*-?\s*)([A-Za-z_-]+)(:)/);
    let rest = body;
    if (keyM) {
      out.push({ text: keyM[1] });
      out.push({ text: keyM[2], cls: 'tok-key' });
      out.push({ text: keyM[3] });
      rest = body.slice(keyM[0].length);
    }
    let last = 0;
    for (const m of rest.matchAll(/\d+(?:\.\d+)?/g)) {
      const i = m.index!;
      if (i > last) out.push({ text: rest.slice(last, i) });
      out.push({ text: m[0], cls: 'tok-num' });
      last = i + m[0].length;
    }
    if (last < rest.length) out.push({ text: rest.slice(last) });
    if (tail) out.push({ text: tail, cls: 'tok-com' });
  });
  return out;
}

const PSEUDO_RE =
  /(\/\/[^\n]*)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(\$[A-Za-z_]\w*)|(\b\d+(?:\.\d+)?\b)|\b(for|foreach|if|elif|else|return|function|fn|def|while|in|as|use|and|or|not|is|none|None|null|true|false|new|continue|break|assert)\b|([A-Za-z_]\w*)(?=\s*(?:\(|::))/g;

function tokenizePseudo(code: string): Tok[] {
  const out: Tok[] = [];
  let last = 0;
  for (const m of code.matchAll(PSEUDO_RE)) {
    const i = m.index!;
    if (i > last) out.push({ text: code.slice(last, i) });
    if (m[1] !== undefined) out.push({ text: m[1], cls: 'tok-com' });
    else if (m[2] !== undefined) out.push({ text: m[2], cls: 'tok-str' });
    else if (m[3] !== undefined) out.push({ text: m[3], cls: 'tok-var' });
    else if (m[4] !== undefined) out.push({ text: m[4], cls: 'tok-num' });
    else if (m[5] !== undefined) out.push({ text: m[5], cls: 'tok-kw' });
    else out.push({ text: m[6], cls: 'tok-fn' });
    last = i + m[0].length;
  }
  if (last < code.length) out.push({ text: code.slice(last) });
  return out;
}

export default function CodeBlock({ code, className = '' }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const cleanCode = useMemo(() => code.replace(/^\n+|\n+$/g, ''), [code]);

  const { lang, nodes } = useMemo<{ lang: Lang; nodes: ReactNode[] }>(() => {
    const detected = detectLang(cleanCode);
    const toks =
      detected === 'json'
        ? tokenizeJson(cleanCode)
        : detected === 'yaml'
          ? tokenizeYaml(cleanCode)
          : tokenizePseudo(cleanCode);
    return {
      lang: detected,
      nodes: toks.map((t, i) =>
        t.cls ? (
          <span key={i} className={t.cls}>
            {t.text}
          </span>
        ) : (
          <span key={i}>{t.text}</span>
        ),
      ),
    };
  }, [cleanCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // 忽略受限环境下的剪贴板错误
    }
  };

  return (
    <div className="code-block rounded-xl overflow-hidden mb-2">
      <div
        className="flex items-center justify-between px-4 py-2 text-[11px] font-mono-code border-b"
        style={{
          borderColor: 'rgba(246,242,229,0.12)',
          background: 'rgba(255,255,255,0.04)',
          color: 'rgba(246,242,229,0.72)',
        }}
      >
        <span className="chapter-stamp tracking-wider">{LANG_LABEL[lang]}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors hover:bg-white/10"
          aria-label="复制代码"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" style={{ color: 'var(--c-yellow)' }} />
              <span style={{ color: 'var(--c-yellow)' }}>已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>
      <pre
        className={`px-4 py-3.5 md:px-5 md:py-4 font-mono-code text-xs md:text-sm overflow-x-auto leading-relaxed ${className}`}
      >
        {nodes}
      </pre>
    </div>
  );
}
