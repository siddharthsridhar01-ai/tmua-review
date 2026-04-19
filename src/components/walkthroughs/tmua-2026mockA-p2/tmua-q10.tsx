"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 10, paper: "Set A Paper 2", year: "2026 Mock", topicTag: "Quantifiers / Logic" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\text{none of them}", expl: "Statement I is true: for any integer m, choosing n = -m gives m + n = 0. So at least one statement holds." },
  { letter: "B", ok: true, tex: "\\text{I only}", expl: "I is true: for every m, set n = -m. II is false: no fixed n works for ALL m (if m+n=0 forced n=-m for every m, but then n depends on m). III is false: take m=n=1, m+n=2. So only I holds." },
  { letter: "C", ok: false, tex: "\\text{II only}", expl: "II is actually false. If there were a fixed n making m + n = 0 for every m, try m = 0 (forces n = 0) and m = 1 (forces n = -1). Contradiction." },
  { letter: "D", ok: false, tex: "\\text{III only}", expl: "III says m + n = 0 for every pair of integers, which is obviously false: take m = n = 1, then m + n = 2 ≠ 0." },
  { letter: "E", ok: false, tex: "\\text{I and II only}", expl: "I is true but II is false (no fixed n satisfies m + n = 0 for all m). The order of quantifiers matters: for every m there exists n is very different from there exists n such that for every m." },
  { letter: "F", ok: false, tex: "\\text{I and III only}", expl: "I is true but III is false: m = n = 1 gives m + n = 2, not 0. So III fails." },
  { letter: "G", ok: false, tex: "\\text{II and III only}", expl: "Both II and III are false; only I is true." },
  { letter: "H", ok: false, tex: "\\text{I, II and III}", expl: "II and III are both false. II fails because no fixed n works for all m (swapping the order of for every and there exists changes meaning). III fails because m + n = 0 is not automatic for arbitrary integer pairs." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

// Consistent per-statement colours, used everywhere I, II, III are referenced.
const STMT_COLORS = { I: C.ps, II: C.accentLight, III: C.assum };


const ITEMS_Q10 = [
  { label: 'I', content: (<>For every integer <Tex>{"m"}</Tex>, there exists an integer <Tex>{"n"}</Tex> such that <Tex>{"m + n = 0"}</Tex>.</>) },
  { label: 'II', content: (<>There exists an integer <Tex>{"n"}</Tex> such that for every integer <Tex>{"m"}</Tex>, we have <Tex>{"m + n = 0"}</Tex>.</>) },
  { label: 'III', content: (<>For every integer <Tex>{"m"}</Tex> and every integer <Tex>{"n"}</Tex>, we have <Tex>{"m + n = 0"}</Tex>.</>) }
];
const OPTIONS_Q10 = [
  ["A", '\\text{none of them}'],
  ["B", '\\text{I only}'],
  ["C", '\\text{II only}'],
  ["D", '\\text{III only}'],
  ["E", '\\text{I and II only}'],
  ["F", '\\text{I and III only}'],
  ["G", '\\text{II and III only}'],
  ["H", '\\text{I, II and III}']
];
const SECTIONS_Q10 = [
  { type: 'prose', text: (<>Which of the following statements is/are true?</>) },
  { type: "items", items: [
    { label: 'I', content: (<>For every integer <Tex>{"m"}</Tex>, there exists an integer <Tex>{"n"}</Tex> such that <Tex>{"m + n = 0"}</Tex>.</>) },
    { label: 'II', content: (<>There exists an integer <Tex>{"n"}</Tex> such that for every integer <Tex>{"m"}</Tex>, we have <Tex>{"m + n = 0"}</Tex>.</>) },
    { label: 'III', content: (<>For every integer <Tex>{"m"}</Tex> and every integer <Tex>{"n"}</Tex>, we have <Tex>{"m + n = 0"}</Tex>.</>) }
  ] }
];

function QuestionSummary() {
  const sections = SECTIONS_Q10;
  const options = OPTIONS_Q10;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q10</span>
        {sections.map((s, i) => {
          if (s.type === "prose" || s.type === "prose-tight") return <span key={i}>{s.text} </span>;
          if (s.type === "mathbox") return (
            <div key={i} style={{ display: "block", margin: "6px auto", color: C.text, fontSize: 14, fontWeight: 700, textAlign: "center", maxWidth: 560 }}>
              <Tex display>{s.tex}</Tex>
            </div>
          );
          if (s.type === "items") return (
            <div key={i} style={{ display: "flex", justifyContent: "center", margin: "6px 0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 10, rowGap: 2, fontSize: 12, color: C.text, lineHeight: 1.5, maxWidth: 560 }}>
                {s.items.map((it, j) => (
                  <Fragment key={j}>
                    <div style={{ fontWeight: 700, color: C.muted, borderRight: `1px solid ${C.border}`, paddingRight: 8, textAlign: "right" }}>{it.label}</div>
                    <div style={{ paddingLeft: 4, textAlign: "left" }}>{it.content}</div>
                  </Fragment>
                ))}
              </div>
            </div>
          );
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, fontSize: 12, fontWeight: 600, color: C.text, borderTop: hasItems ? `1px solid ${C.border}` : "none", paddingTop: hasItems ? 6 : 0 }}>
        {options.map(([l, v]) => (<span key={l}>{l}: <Tex>{v}</Tex></span>))}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function ProgressCheck({ done }) { const size = 16; const color = done ? C.accentLight : C.muted; return (<svg width={size} height={size} viewBox="0 0 16 16" style={{ flexShrink: 0 }}><rect x={1.5} y={1.5} width={13} height={13} rx={2.5} fill="none" stroke={color} strokeWidth={1.5} />{done && (<><line x1={4.5} y1={4.5} x2={11.5} y2={11.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" /><line x1={11.5} y1={4.5} x2={4.5} y2={11.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" /></>)}</svg>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }


function ReadStep() {
  const sections = SECTIONS_Q10;
  const options = OPTIONS_Q10;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 10</span>
        </div>
        {sections.map((s, i) => {
          if (s.type === "prose") return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>{s.text}</p>;
          if (s.type === "prose-tight") return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 0" }}>{s.text}</p>;
          if (s.type === "mathbox") return <MathBox key={i} style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{s.tex}</Tex></MathBox>;
          if (s.type === "items") return (
            <div key={i} style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", margin: "4px 0 8px", display: "flex", justifyContent: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 10, rowGap: 2, fontSize: 14, color: C.text, lineHeight: 1.6, maxWidth: 560 }}>
                {s.items.map((it, j) => (
                  <Fragment key={j}>
                    <div style={{ fontWeight: 700, color: C.muted, borderRight: `1px solid ${C.border}`, paddingRight: 8, textAlign: "right" }}>{it.label}</div>
                    <div style={{ paddingLeft: 4 }}>{it.content}</div>
                  </Fragment>
                ))}
              </div>
            </div>
          );
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {options.map(([l, v]) => (
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 140px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>These three statements use the same components (<Tex>{"m + n = 0"}</Tex>, integers) but in different quantifier orders. Read each one carefully and test it against the rules for <Tex>{"\\text{for every}"}</Tex> (for every) and <Tex>{"\\text{there exists}"}</Tex> (there exists).</p><p style={{ margin: 0 }}>To show a statement is TRUE, give a construction or proof that works in general. To show FALSE, find a single counterexample.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}><b>Order matters.</b> In "<Tex>{"\\text{for every } m \\text{ there exists } n"}</Tex>", the <Tex>{"n"}</Tex> is chosen AFTER seeing <Tex>{"m"}</Tex>, so it can depend on <Tex>{"m"}</Tex>. In "<Tex>{"\\text{there exists } n \\text{ such that for every } m"}</Tex>", a SINGLE <Tex>{"n"}</Tex> must work for every <Tex>{"m"}</Tex>.</p><p style={{ margin: 0 }}>Swapping the order can change a true statement into a false one. Sometimes dramatically.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const FO = ({ x, y, w, hh, color, children }) => (<foreignObject x={x} y={y} width={w || 40} height={hh || 16}><div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div></foreignObject>);

  // STEP 1 DIAGRAM: statement I: a tailored n for each m.
  const iDiagram = (() => {
    const pW = 300, pH = 194;
    const pairs = [[-3, 3], [-2, 2], [-1, 1], [0, 0], [1, -1], [2, -2], [3, -3]];
    const titleY = 8;      // title band [8, 24]
    const headerY = 34;    // column headers [34, 50]
    const firstRow = 58;   // first data row
    const rowH = 18;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={titleY} w={pW - 20} hh={16} color={STMT_COLORS.I}><span style={{ fontSize: 11, fontWeight: 700 }}>Statement I: a tailored <Tex>{"n"}</Tex> for each <Tex>{"m"}</Tex></span></FO>
        <FO x={14} y={headerY} w={80} hh={14} color={C.muted}><Tex>{"m"}</Tex></FO>
        <FO x={100} y={headerY} w={80} hh={14} color={C.muted}><Tex>{"n = -m"}</Tex></FO>
        <FO x={200} y={headerY} w={80} hh={14} color={C.muted}><Tex>{"m + n"}</Tex></FO>
        {pairs.map(([m, n], i) => (
          <g key={i}>
            <FO x={14} y={firstRow + i * rowH} w={80} hh={14} color={C.text}><Tex>{String(m)}</Tex></FO>
            <FO x={100} y={firstRow + i * rowH} w={80} hh={14} color={C.calc}><Tex>{String(n)}</Tex></FO>
            <FO x={200} y={firstRow + i * rowH} w={80} hh={14} color={C.ok}><Tex>{"0 \\;\\checkmark"}</Tex></FO>
          </g>
        ))}
      </svg>
    );
  })();

  // STEP 2 DIAGRAM: statement II: one n must work for ALL m. Every candidate breaks.
  const iiDiagram = (() => {
    const pW = 300, pH = 214;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={STMT_COLORS.II}><span style={{ fontSize: 11, fontWeight: 700 }}>Statement II: one <Tex>{"n"}</Tex> must work for every <Tex>{"m"}</Tex></span></FO>
        <FO x={10} y={34} w={pW - 20} hh={14} color={C.text}><span style={{ fontSize: 11 }}>Try candidate <Tex>{"n = 0"}</Tex>:</span></FO>
        <g>
          <rect x={15} y={54} width={pW - 30} height={20} rx={4} fill={C.ok + "15"} stroke={C.ok + "55"} strokeWidth={0.6} />
          <FO x={22} y={57} w={pW - 44} hh={18} color={C.ok}><span style={{ fontSize: 11 }}><Tex>{"m = 0: \\;\\; m + n = 0 \\;\\checkmark"}</Tex></span></FO>
        </g>
        <g>
          <rect x={15} y={80} width={pW - 30} height={20} rx={4} fill={C.fail + "15"} stroke={C.fail + "55"} strokeWidth={0.6} />
          <FO x={22} y={83} w={pW - 44} hh={18} color={C.fail}><span style={{ fontSize: 11 }}><Tex>{"m = 1: \\;\\; m + n = 1 \\ne 0 \\;\\text{✗}"}</Tex></span></FO>
        </g>
        <FO x={10} y={112} w={pW - 20} hh={14} color={C.text}><span style={{ fontSize: 11 }}>Try candidate <Tex>{"n = -5"}</Tex>:</span></FO>
        <g>
          <rect x={15} y={132} width={pW - 30} height={20} rx={4} fill={C.ok + "15"} stroke={C.ok + "55"} strokeWidth={0.6} />
          <FO x={22} y={135} w={pW - 44} hh={18} color={C.ok}><span style={{ fontSize: 11 }}><Tex>{"m = 5: \\;\\; m + n = 0 \\;\\checkmark"}</Tex></span></FO>
        </g>
        <g>
          <rect x={15} y={158} width={pW - 30} height={20} rx={4} fill={C.fail + "15"} stroke={C.fail + "55"} strokeWidth={0.6} />
          <FO x={22} y={161} w={pW - 44} hh={18} color={C.fail}><span style={{ fontSize: 11 }}><Tex>{"m = 0: \\;\\; m + n = -5 \\ne 0 \\;\\text{✗}"}</Tex></span></FO>
        </g>
        <FO x={10} y={186} w={pW - 20} hh={20} color={C.muted}><span style={{ fontSize: 11 }}>Every candidate fails at some <Tex>{"m"}</Tex>.</span></FO>
      </svg>
    );
  })();

  // STEP 3 DIAGRAM: statement III: one counterexample suffices.
  const iiiDiagram = (() => {
    const pW = 300, pH = 140;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={STMT_COLORS.III}><span style={{ fontSize: 11, fontWeight: 700 }}>Statement III: all pairs must give 0</span></FO>
        <g>
          <rect x={15} y={36} width={pW - 30} height={22} rx={4} fill={C.ok + "15"} stroke={C.ok + "55"} strokeWidth={0.6} />
          <FO x={22} y={40} w={pW - 44} hh={18} color={C.ok}><span style={{ fontSize: 11 }}><Tex>{"m = 3, \\; n = -3: \\;\\; m + n = 0 \\;\\checkmark"}</Tex></span></FO>
        </g>
        <g>
          <rect x={15} y={64} width={pW - 30} height={22} rx={4} fill={C.fail + "15"} stroke={C.fail + "55"} strokeWidth={0.6} />
          <FO x={22} y={68} w={pW - 44} hh={18} color={C.fail}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"m = 1, \\; n = 1: \\;\\; m + n = 2 \\ne 0 \\;\\text{✗}"}</Tex></span></FO>
        </g>
        <FO x={10} y={100} w={pW - 20} hh={30} color={C.fail}><span style={{ fontSize: 11 }}>One bad pair is enough: statement III is false.</span></FO>
      </svg>
    );
  })();

  // STEP 4 DIAGRAM: summary. Each row uses its statement's consistent colour.
  const summaryDiagram = (() => {
    const pW = 300, pH = 170;
    const rows = [
      { label: "I", text: "For every m there exists n with m+n=0", holds: true, note: "n = -m works" },
      { label: "II", text: "There is one n with m+n=0 for every m", holds: false, note: "no single n can" },
      { label: "III", text: "For every m and every n, m+n=0", holds: false, note: "m=n=1 breaks it" },
    ];
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Summary</span></FO>
        {rows.map((r, i) => {
          const y = 32 + i * 42;
          const verdictCol = r.holds ? C.ok : C.fail;
          return (
            <g key={i}>
              <rect x={10} y={y} width={pW - 20} height={36} rx={4} fill={verdictCol + "10"} stroke={verdictCol + "55"} strokeWidth={0.7} />
              <FO x={20} y={y + 4} w={24} hh={18} color={STMT_COLORS[r.label]}><span style={{ fontSize: 13, fontWeight: 700 }}>{r.label}</span></FO>
              <FO x={48} y={y + 4} w={180} hh={18} color={C.text}><span style={{ fontSize: 11 }}>{r.text}</span></FO>
              <FO x={pW - 60} y={y + 4} w={50} hh={18} color={verdictCol}><span style={{ fontSize: 11, fontWeight: 700 }}>{r.holds ? "TRUE" : "FALSE"}</span></FO>
              <FO x={48} y={y + 20} w={pW - 60} hh={14} color={C.muted}><span style={{ fontSize: 11 }}>{r.note}</span></FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  const solveSteps = [
    { label: "ANALYSE STATEMENT I", color: STMT_COLORS.I, text: <span>Given any integer <Tex>{"m"}</Tex>, we must produce SOME integer <Tex>{"n"}</Tex> with <Tex>{"m + n = 0"}</Tex>. The choice <Tex>{"n = -m"}</Tex> always works (and <Tex>{"-m"}</Tex> is itself an integer). So I is true.</span>, math: (<><div><Tex>{"\\text{Given } m, \\text{ choose } n = -m"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"m + n = m + (-m) = 0 \\;\\checkmark"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\text{I is TRUE}}"}</Tex></div></>), diagram: iDiagram },
    { label: "ANALYSE STATEMENT II", color: STMT_COLORS.II, text: <span>A single fixed <Tex>{"n"}</Tex> must satisfy <Tex>{"m + n = 0"}</Tex> for every integer <Tex>{"m"}</Tex>. But if we fix <Tex>{"n"}</Tex> and let <Tex>{"m"}</Tex> vary, <Tex>{"m + n"}</Tex> also varies: it cannot equal 0 for more than one <Tex>{"m"}</Tex>. Any candidate <Tex>{"n"}</Tex> breaks as soon as we pick the wrong <Tex>{"m"}</Tex>.</span>, math: (<><div><Tex>{"\\text{Suppose such } n \\text{ exists.}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"m = 0 \\Rightarrow n = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"m = 1 \\Rightarrow n = -1"}</Tex></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{n \\text{ can't be both}}"}</Tex></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{\\text{II is FALSE}}"}</Tex></div></>), diagram: iiDiagram },
    { label: "ANALYSE STATEMENT III", color: STMT_COLORS.III, text: <span>This asks <Tex>{"m + n = 0"}</Tex> to hold for every pair of integers, not just carefully chosen pairs. One counterexample kills it.</span>, math: (<><div><Tex>{"\\text{Counterexample:}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"m = 1, \\; n = 1 \\Rightarrow m + n = 2 \\ne 0"}</Tex></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{\\text{III is FALSE}}"}</Tex></div></>), diagram: iiiDiagram },
    { label: "COLLECT RESULTS", color: C.ok, text: <span>Only statement I is true. II and III both fail.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{Only I is true}}"}</Tex></div>), diagram: summaryDiagram, conclusion: <span>The answer is B: I only.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 300px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Interactive: student picks m and n from integers, watches I/II/III outcomes.
  // For I, pick any m; the system shows "use n = -m" works.
  // For II, pick a candidate n; the system tests m = 0 and m = 1 against it.
  // For III, pick m and n; check m + n = 0.
  const [m, setM] = useState(3);
  const [n, setN] = useState(-3);
  const [candidateN, setCandidateN] = useState(0); // for statement II test
  const [sawIConstruct, setSawIConstruct] = useState(false);
  const [sawIIFail, setSawIIFail] = useState(false);
  const [sawIIIFail, setSawIIIFail] = useState(false);

  // Statement I check: does n = -m? If so, student has used the "tailored n" construction.
  const iConstructed = (n === -m);
  // Statement II check: for this candidate n, does it fail at some m? We show automatically for m ≠ -candidateN.
  const iiFailingM = -candidateN + 1; // any m that doesn't match -candidateN
  const iiBreaks = true; // always breaks, as reasoning goes
  // Statement III check: m + n == 0? We want student to find a case where sum ≠ 0.
  const iiiSum = m + n;
  const iiiSumIsZero = (iiiSum === 0);

  useEffect(() => {
    if (iConstructed) setSawIConstruct(true);
    if (!iiiSumIsZero) setSawIIIFail(true);
  }, [iConstructed, iiiSumIsZero]);
  useEffect(() => { setSawIIFail(true); }, [candidateN]); // exploring any candidate n counts as engagement with II

  const allDemonstrated = sawIConstruct && sawIIFail && sawIIIFail;

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 5 }}>
        <p style={{ margin: 0, fontSize: 13, color: C.text, lineHeight: 1.5 }}>Three mini-experiments, one per statement. Test your understanding of how <Tex>{"\\text{for every}"}</Tex> and <Tex>{"\\text{there exists}"}</Tex> interact.</p>
      </div>

      {/* Panel I */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", marginBottom: 5 }}>
        <div style={{ fontSize: 12, color: STMT_COLORS.I, fontWeight: 700, marginBottom: 6 }}>Statement I: for every integer <Tex>{"m"}</Tex>, there exists an integer <Tex>{"n"}</Tex> with <Tex>{"m + n = 0"}</Tex></div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Pick any <Tex>{"m"}</Tex>, then set <Tex>{"n"}</Tex> (ideally <Tex>{"n = -m"}</Tex>):</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}><Tex>{"m"}</Tex></div>
            <input type="number" value={m} onChange={e => setM(parseInt(e.target.value) || 0)} style={{ width: "100%", padding: "6px 8px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, color: C.calc, fontSize: 14, fontWeight: 700 }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}><Tex>{"n"}</Tex></div>
            <input type="number" value={n} onChange={e => setN(parseInt(e.target.value) || 0)} style={{ width: "100%", padding: "6px 8px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, color: C.calc, fontSize: 14, fontWeight: 700 }} />
          </div>
          <div style={{ background: iConstructed ? C.conclBg : C.failBg, border: `1px solid ${(iConstructed ? C.ok : C.fail) + "55"}`, borderRadius: 6, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: iConstructed ? C.ok : C.fail, fontWeight: 700 }}><Tex>{`m + n = ${m + n}`}</Tex></div>
            <div style={{ fontSize: 11, color: iConstructed ? C.ok : C.fail, marginTop: 2 }}>{iConstructed ? "=0 ✓" : "≠0"}</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>I says we can ALWAYS find <Tex>{"n"}</Tex> after seeing <Tex>{"m"}</Tex>: the choice <Tex>{"n = -m"}</Tex> works.</div>
      </div>

      {/* Panel II */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", marginBottom: 5 }}>
        <div style={{ fontSize: 12, color: STMT_COLORS.II, fontWeight: 700, marginBottom: 6 }}>Statement II: there exists an integer <Tex>{"n"}</Tex> such that for every integer <Tex>{"m"}</Tex>, <Tex>{"m + n = 0"}</Tex></div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Pick a candidate <Tex>{"n"}</Tex>. We'll check whether it works for ALL <Tex>{"m"}</Tex>:</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>candidate <Tex>{"n"}</Tex></div>
            <input type="number" value={candidateN} onChange={e => setCandidateN(parseInt(e.target.value) || 0)} style={{ width: "100%", padding: "6px 8px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, color: C.calc, fontSize: 14, fontWeight: 700 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ background: candidateN + 0 === 0 ? C.conclBg : C.failBg, border: `1px solid ${(candidateN + 0 === 0 ? C.ok : C.fail) + "55"}`, borderRadius: 6, padding: "3px 6px", fontSize: 11, color: candidateN + 0 === 0 ? C.ok : C.fail }}>
              <Tex>{`m = 0: \\; 0 + ${candidateN} = ${candidateN}`}</Tex> {candidateN === 0 ? "✓" : "✗"}
            </div>
            <div style={{ background: 1 + candidateN === 0 ? C.conclBg : C.failBg, border: `1px solid ${(1 + candidateN === 0 ? C.ok : C.fail) + "55"}`, borderRadius: 6, padding: "3px 6px", fontSize: 11, color: 1 + candidateN === 0 ? C.ok : C.fail }}>
              <Tex>{`m = 1: \\; 1 + ${candidateN} = ${1 + candidateN}`}</Tex> {1 + candidateN === 0 ? "✓" : "✗"}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: C.fail, marginTop: 6, fontWeight: 600 }}>No matter which <Tex>{"n"}</Tex> you pick, one of <Tex>{"m = 0"}</Tex> or <Tex>{"m = 1"}</Tex> breaks it. II is FALSE.</div>
      </div>

      {/* Panel III: uses same m, n above */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", marginBottom: 5 }}>
        <div style={{ fontSize: 12, color: STMT_COLORS.III, fontWeight: 700, marginBottom: 6 }}>Statement III: for every integer <Tex>{"m"}</Tex> and every integer <Tex>{"n"}</Tex>, <Tex>{"m + n = 0"}</Tex></div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>For EVERY pair, <Tex>{"m + n = 0"}</Tex> must hold. One failure is enough to break it. Use the <Tex>{"m, n"}</Tex> from panel I above: if <Tex>{`m + n \\ne 0`}</Tex> for any pair, III is false.</div>
        <div style={{ background: iiiSumIsZero ? C.conclBg : C.failBg, border: `1px solid ${(iiiSumIsZero ? C.ok : C.fail) + "55"}`, borderRadius: 6, padding: "4px 6px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: iiiSumIsZero ? C.ok : C.fail, fontWeight: 700 }}><Tex>{`m = ${m}, \\; n = ${n}: \\; m + n = ${iiiSum}`}</Tex> {iiiSumIsZero ? "(=0)" : "(≠0, breaks III)"}</span>
        </div>
      </div>

      {/* Progress tracker */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawIConstruct ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawIConstruct} />
            <span style={{ fontWeight: sawIConstruct ? 700 : 500 }}>Used <Tex>{"n = -m"}</Tex> in panel I. <span style={{ color: C.muted, fontWeight: 500 }}>(I has a construction.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawIIFail ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawIIFail} />
            <span style={{ fontWeight: sawIIFail ? 700 : 500 }}>Tested a candidate <Tex>{"n"}</Tex> in panel II. <span style={{ color: C.muted, fontWeight: 500 }}>(II always breaks.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawIIIFail ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawIIIFail} />
            <span style={{ fontWeight: sawIIIFail ? 700 : 500 }}>Found a pair where <Tex>{"m + n \\ne 0"}</Tex> in panel III. <span style={{ color: C.muted, fontWeight: 500 }}>(III has a counterexample.)</span></span>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>Statement I works because we choose <Tex>{"n"}</Tex> AFTER seeing <Tex>{"m"}</Tex>. Swapping to "<Tex>{"\\text{there exists } n \\text{ such that for every } m"}</Tex>" (II) forces one fixed <Tex>{"n"}</Tex> for all <Tex>{"m"}</Tex>, which is impossible. Statement III asks it of every pair, which any <Tex>{"m + n \\ne 0"}</Tex> destroys.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is B: I only.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Complete all three panels to conclude the answer.
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [optAnim, setOptAnim] = useState(opts.map(() => false));
  const [revealed, setRevealed] = useState(0);
  useEffect(() => { if (step === 4) { opts.forEach((_, i) => { setTimeout(() => setOptAnim(p => { const n = [...p]; n[i] = true; return n; }), i * 100); }); } else { setOptAnim(opts.map(() => false)); setExpanded(null); } }, [step]);
  useEffect(() => { if (step !== 2) setRevealed(0); }, [step]);
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: bodyFont, letterSpacing: 0.2, padding: "20px 14px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: 1 }}>TMUA</span><span style={{ fontSize: 12, color: C.muted }}>{META.paper}</span><span style={{ fontSize: 12, color: C.muted }}>{"·"}</span><span style={{ fontSize: 12, color: C.ps }}>{META.topicTag}</span></div><h1 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: titleFont, fontStyle: "italic", letterSpacing: 0.5 }}>Interactive Walkthrough</h1><p style={{ fontSize: 12, color: C.muted, margin: 0 }}>TMUA {META.year} {"·"} {META.paper} {"·"} Question {META.questionNumber}</p></div>
        <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>{stepsMeta.map(s => (<button key={s.id} onClick={() => setStep(s.id)} style={{ flex: 1, minWidth: 0, background: step === s.id ? C.accent : step > s.id ? "rgba(108,92,231,0.15)" : "#1e2030", border: `1px solid ${step === s.id ? C.accent : step > s.id ? C.accent + "44" : C.border}`, borderRadius: 9, padding: "8px 3px", cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}><span style={{ fontSize: 13, fontWeight: 700, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted }}>{s.id + 1}</span><span style={{ fontSize: 11, fontWeight: step === s.id ? 700 : 500, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted, whiteSpace: "nowrap" }}>{s.label}</span></button>))}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><span style={{ background: C.accent, borderRadius: 6, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.white }}>{step + 1}</span><h2 style={{ fontSize: 16, fontWeight: 700, color: C.white, margin: 0 }}>{stepsMeta[step].title}</h2></div>
        {step === 0 && <ReadStep />}
        {step === 1 && <SetupStep />}
        {step === 2 && <SolveStepContent revealed={revealed} setRevealed={setRevealed} />}
        {step === 3 && <VerifyStepContent />}
        {step === 4 && (<div><QuestionSummary /><div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>{opts.map((o, i) => (<OptionCard key={o.letter} o={o} expanded={expanded === i} animate={optAnim[i]} onClick={() => setExpanded(expanded === i ? null : i)} />))}</div></div>)}
        <div style={{ display: "flex", gap: 10, marginTop: 20, paddingBottom: 28 }}><button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: `1px solid ${C.border}`, background: step === 0 ? C.card : "#1e2030", color: step === 0 ? C.muted : C.text, fontSize: 14, fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer", opacity: step === 0 ? 0.4 : 1 }}>{"←"} Previous</button>{step < 4 ? (<button onClick={() => setStep(step + 1)} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Next {"→"}</button>) : (<button style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.ok},#2ecc71)`, color: C.white, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Complete</button>)}</div>
      </div>
    </div>
  );
}
