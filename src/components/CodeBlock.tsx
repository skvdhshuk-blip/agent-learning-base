import { useMemo, type ReactNode } from 'react';

type Lang = 'json' | 'yaml' | 'pseudo';

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
    if (m[1] !== undefined) out.push({ text: m[1], cls: m[2] ? 'tok-key' : 'tok-str' });
    else if (m[3] !== undefined) out.push({ text: m[3], cls: 'tok-num' });
    else out.push({ text: m[4], cls: 'tok-lit' });
    last = i + m[0].length;
  }
  if (last < code.length) out.push({ text: code.slice(last) });
  return out;
}

function tokenizeYaml(code: string): Tok[] {
  const out: Tok[] = [];
  code.split('\n').forEach((line, li) => {
    if (li > 0) out.push({ text: '\n' });
    // split off trailing comment (keep original spacing before it)
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
    // numbers inside the remaining part
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
  /(\/\/[^\n]*)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(\$[A-Za-z_]\w*)|(\b\d+(?:\.\d+)?\b)|\b(for|foreach|if|elif|else|return|function|fn|while|in|as|use|and|or|not|is|none|None|null|true|false|new|continue|break)\b|([A-Za-z_]\w*)(?=\s*(?:\(|::))/g;

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
  const nodes = useMemo<ReactNode[]>(() => {
    const lang = detectLang(code);
    const toks =
      lang === 'json' ? tokenizeJson(code) : lang === 'yaml' ? tokenizeYaml(code) : tokenizePseudo(code);
    return toks.map((t, i) =>
      t.cls ? (
        <span key={i} className={t.cls}>
          {t.text}
        </span>
      ) : (
        <span key={i}>{t.text}</span>
      ),
    );
  }, [code]);

  return (
    <pre
      className={`code-block rounded-xl p-4 md:p-5 font-mono-code text-xs md:text-sm overflow-x-auto leading-relaxed ${className}`}
    >
      {nodes}
    </pre>
  );
}
