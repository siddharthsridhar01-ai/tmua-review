"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 19, set: "A", paperNumber: "Paper 2", topicTag: "Polynomials / Calculus" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\text{none of them}", expl: "Both I and II are achievable. I: take f(x) = x² + 1: then f has no real roots (M = 0), and g = f·f' = (x²+1)(2x) has one real root at x = 0 (N = 1), so M < N. II: take f(x) = x: f has one real root (M = 1), and g = x·1 = x has one real root (N = 1), so M = N. At least I and II hold." },
  { letter: "B", ok: false, tex: "\\text{I only}", expl: "M = N is also achievable, so II is not impossible. For example, f(x) = x gives f' = 1, g = x, both with a single real root at x = 0. Even simpler: any polynomial whose real roots happen to coincide with real roots of f' (this always happens when f has a repeated real root) gives M = N." },
  { letter: "C", ok: false, tex: "\\text{II only}", expl: "I is also achievable. Example: f(x) = x² + 1 has no real roots (M = 0), but g = (x² + 1)·(2x) = 2x³ + 2x has one real root at x = 0 (N = 1). So M < N is possible." },
  { letter: "D", ok: false, tex: "\\text{III only}", expl: "III (M > N) is actually IMPOSSIBLE. Every real root of f is automatically a real root of g, since g(x) = f(x) · f'(x) contains the factor f(x). So the real roots of f are always contained in the real roots of g, forcing M ≤ N (counting distinct roots). M > N can never occur." },
  { letter: "E", ok: true, tex: "\\text{I and II only}", expl: "Both are realisable, and III is ruled out. I: f(x) = x² + 1 gives M = 0, g has one root at x = 0, so N = 1 and M < N. II: f(x) = x gives M = N = 1. III is impossible because every root of f is a root of g (since g contains f as a factor), forcing M ≤ N always." },
  { letter: "F", ok: false, tex: "\\text{I and III only}", expl: "III (M > N) is impossible: every real root of f is also a real root of g, so the set of distinct real roots of f is contained in the set of distinct real roots of g. This forces M ≤ N, ruling out M > N. II is achievable (f(x) = x gives M = N = 1)." },
  { letter: "G", ok: false, tex: "\\text{II and III only}", expl: "III is impossible: g(x) = f(x) · f'(x) contains every real root of f, so M ≤ N always. I is achievable (f(x) = x² + 1: M = 0, N = 1), so I must be included." },
  { letter: "H", ok: false, tex: "\\text{I, II and III}", expl: "III (M > N) cannot occur. Every real root of f is a real root of g, so M ≤ N counting distinct real roots. I and II are both realisable (M < N via f(x) = x² + 1; M = N via f(x) = x) but III is impossible." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const ITEMS_Q19 = [
  { label: 'I', content: (<>It is possible that <Tex>{"M < N"}</Tex></>) },
  { label: 'II', content: (<>It is possible that <Tex>{"M = N"}</Tex></>) },
  { label: 'III', content: (<>It is possible that <Tex>{"M > N"}</Tex></>) }
];
const OPTIONS_Q19 = [
  ["A", '\\text{none of them}'],
  ["B", '\\text{I only}'],
  ["C", '\\text{II only}'],
  ["D", '\\text{III only}'],
  ["E", '\\text{I and II only}'],
  ["F", '\\text{I and III only}'],
  ["G", '\\text{II and III only}'],
  ["H", '\\text{I, II and III}']
];
const SECTIONS_Q19 = [
  { type: 'prose', text: (<>In this question, <Tex>{"f(x)"}</Tex> is a non-constant polynomial, and</>) },
  { type: "mathbox", tex: "g(x) = f(x) \\cdot f'(x)" },
  { type: 'prose', text: (<><Tex>{"f(x) = 0"}</Tex> for exactly <Tex>{"M"}</Tex> real values of <Tex>{"x"}</Tex>.</>) },
  { type: 'prose', text: (<><Tex>{"g(x) = 0"}</Tex> for exactly <Tex>{"N"}</Tex> real values of <Tex>{"x"}</Tex>.</>) },
  { type: 'prose', text: (<>Which of the following statements is/are true?</>) },
  { type: "items", items: [
    { label: 'I', content: (<>It is possible that <Tex>{"M < N"}</Tex></>) },
    { label: 'II', content: (<>It is possible that <Tex>{"M = N"}</Tex></>) },
    { label: 'III', content: (<>It is possible that <Tex>{"M > N"}</Tex></>) }
  ] }
];

function QuestionSummary() {
  const sections = SECTIONS_Q19;
  const options = OPTIONS_Q19;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q19</span>
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
  const sections = SECTIONS_Q19;
  const options = OPTIONS_Q19;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 19</span>
        </div>
        {sections.map((s, i) => {
          if (s.type === "prose") return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>{s.text}</p>;
          if (s.type === "prose-tight") return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 0" }}>{s.text}</p>;
          if (s.type === "mathbox") return <MathBox key={i} style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{s.tex}</Tex></MathBox>;
          if (s.type === "items") return (
            <div key={i} style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", margin: "4px 0 8px", display: "flex", justifyContent: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 10, rowGap: 2, fontSize: 14, color: C.text, lineHeight: 1.6, maxWidth: 560 }}>
                {s.items.map((it, j) => (<Fragment key={j}><div style={{ fontWeight: 700, color: C.muted, borderRight: `1px solid ${C.border}`, paddingRight: 8, textAlign: "right" }}>{it.label}</div><div style={{ paddingLeft: 4 }}>{it.content}</div></Fragment>))}
              </div>
            </div>
          );
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {options.map(([l, v]) => (<div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 140px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>"Is it possible" means we need a single concrete polynomial for each case, OR a proof that no such polynomial exists. So every statement demands EITHER an example OR an impossibility argument.</p><p style={{ margin: 0 }}>The key structural fact: <Tex>{"g(x) = f(x) \\cdot f'(x)"}</Tex>. A real root of <Tex>{"g"}</Tex> is a value of <Tex>{"x"}</Tex> where either factor vanishes, so <Tex>{"\\{\\text{real roots of } g\\} = \\{\\text{real roots of } f\\} \\cup \\{\\text{real roots of } f'\\}"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Since <Tex>{"\\{\\text{real roots of } f\\} \\subseteq \\{\\text{real roots of } g\\}"}</Tex>, we always have <Tex>{"M \\le N"}</Tex>. That rules out III straight away.</p><p style={{ margin: "0 0 4px" }}>To achieve I (<Tex>{"M < N"}</Tex>), pick an <Tex>{"f"}</Tex> whose derivative has extra real roots not shared by <Tex>{"f"}</Tex>. For instance <Tex>{"f(x) = x^2 + 1"}</Tex>: <Tex>{"M = 0"}</Tex>, but <Tex>{"f'(x) = 2x"}</Tex> vanishes at <Tex>{"x = 0"}</Tex>, giving <Tex>{"N = 1"}</Tex>.</p><p style={{ margin: 0 }}>To achieve II (<Tex>{"M = N"}</Tex>), pick an <Tex>{"f"}</Tex> whose derivative has no real roots that aren't already roots of <Tex>{"f"}</Tex>. The simplest is <Tex>{"f(x) = x"}</Tex>: <Tex>{"f'(x) = 1"}</Tex> has no roots at all, so <Tex>{"N = M = 1"}</Tex>.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram: two overlapping sets showing roots of f vs roots of f', with roots of g = union
  const venn = (() => {
    const pW = 300, pH = 190;
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.3 }}>{children}</div>
      </foreignObject>
    );
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {/* Two source boxes: roots of f, roots of f' */}
        <rect x={12} y={18} width={120} height={54} rx={8} fill={C.ps + "22"} stroke={C.ps} strokeWidth={1.3} />
        <FO x={14} y={24} w={116} hh={16} color={C.ps}><span style={{ fontWeight: 700, fontSize: 12 }}>roots of <Tex>{"f"}</Tex></span></FO>
        <FO x={14} y={46} w={116} hh={20} color={C.ps}><span style={{ fontSize: 11 }}>count = <Tex>{"M"}</Tex></span></FO>
        <rect x={168} y={18} width={120} height={54} rx={8} fill={C.calc + "22"} stroke={C.calc} strokeWidth={1.3} />
        <FO x={170} y={24} w={116} hh={16} color={C.calc}><span style={{ fontWeight: 700, fontSize: 12 }}>roots of <Tex>{"f'"}</Tex></span></FO>
        <FO x={170} y={46} w={116} hh={20} color={C.calc}><span style={{ fontSize: 11 }}>count <Tex>{"\\le \\deg f - 1"}</Tex></span></FO>
        {/* Arrows down to union */}
        <line x1={72} y1={76} x2={110} y2={108} stroke={C.muted} strokeWidth={1.2} markerEnd="url(#q19arr)" />
        <line x1={228} y1={76} x2={190} y2={108} stroke={C.muted} strokeWidth={1.2} markerEnd="url(#q19arr)" />
        {/* Union box for roots of g */}
        <rect x={58} y={112} width={184} height={60} rx={8} fill={C.ok + "22"} stroke={C.ok} strokeWidth={1.5} />
        <FO x={60} y={118} w={180} hh={16} color={C.ok}><span style={{ fontWeight: 700, fontSize: 12 }}>roots of <Tex>{"g"}</Tex> = the union</span></FO>
        <FO x={60} y={140} w={180} hh={30} color={C.ok}><span style={{ fontSize: 11 }}>count = <Tex>{"N"}</Tex> (distinct)</span></FO>
        <defs>
          <marker id="q19arr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill={C.muted} />
          </marker>
        </defs>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "KEY FACT ABOUT g", color: C.ps, text: <span>A real <Tex>{"x"}</Tex> is a root of <Tex>{"g(x) = f(x) \\cdot f'(x)"}</Tex> exactly when at least one factor vanishes there. So the real roots of <Tex>{"g"}</Tex> are the real roots of <Tex>{"f"}</Tex> union the real roots of <Tex>{"f'"}</Tex>, counted once each.</span>, math: (<><div><Tex>{"g(x) = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Leftrightarrow f(x) = 0 \\text{ or } f'(x) = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow N = \\#\\big(\\text{roots of } f \\;\\cup\\; \\text{roots of } f'\\big)"}</Tex></div></>), diagram: venn },
    { label: "III IS IMPOSSIBLE: M > N CAN'T HAPPEN", color: C.fail, text: <span>Every real root of <Tex>{"f"}</Tex> is automatically a real root of <Tex>{"g"}</Tex>. So the distinct real roots of <Tex>{"f"}</Tex> are a subset of the distinct real roots of <Tex>{"g"}</Tex>. Hence <Tex>{"M \\le N"}</Tex> always.</span>, math: (<><div><Tex>{"\\{\\text{roots of } f\\} \\subseteq \\{\\text{roots of } g\\}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow M \\le N"}</Tex></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{\\Rightarrow \\text{III is IMPOSSIBLE}}"}</Tex></div></>) },
    { label: "I IS POSSIBLE: M < N EXAMPLE", color: C.ok, text: <span>Take <Tex>{"f(x) = x^2 + 1"}</Tex>. Then <Tex>{"f"}</Tex> has no real roots, so <Tex>{"M = 0"}</Tex>. The derivative <Tex>{"f'(x) = 2x"}</Tex> has one real root at <Tex>{"x = 0"}</Tex>, and <Tex>{"f(0) = 1 \\ne 0"}</Tex>, so <Tex>{"g(x) = (x^2+1)(2x)"}</Tex> has the single real root <Tex>{"x = 0"}</Tex>. Thus <Tex>{"N = 1"}</Tex>, giving <Tex>{"M = 0 < 1 = N"}</Tex>.</span>, math: (<><div><Tex>{"f(x) = x^2 + 1, \\quad M = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"f'(x) = 2x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"g(x) = (x^2+1)(2x), \\quad N = 1"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\Rightarrow \\text{I holds: } M < N}"}</Tex></div></>) },
    { label: "II IS POSSIBLE: M = N EXAMPLE", color: C.ok, text: <span>Take <Tex>{"f(x) = x"}</Tex>. Then <Tex>{"f"}</Tex> has one real root at <Tex>{"x = 0"}</Tex>, so <Tex>{"M = 1"}</Tex>. The derivative <Tex>{"f'(x) = 1"}</Tex> has no roots at all, so <Tex>{"g(x) = x \\cdot 1 = x"}</Tex> also has a single real root at <Tex>{"x = 0"}</Tex>. Thus <Tex>{"N = 1"}</Tex>, and <Tex>{"M = N"}</Tex>.</span>, math: (<><div><Tex>{"f(x) = x, \\quad M = 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"f'(x) = 1, \\text{ no roots}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"g(x) = x, \\quad N = 1"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\Rightarrow \\text{II holds: } M = N}"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>I is achievable, II is achievable, III is impossible. Answer: I and II only.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{I} \\;\\checkmark \\;\\; \\text{II} \\;\\checkmark \\;\\; \\text{III} \\;\\times}"}</Tex></div>), conclusion: <span>The answer is E: I and II only.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 300px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Preset polynomials
  const presets = [
    { label: "f = x", tex: "f(x) = x", f: (x) => x, fp: (x) => 1, fStr: "x", fpStr: "1", rootsF: [0], rootsFp: [], M: 1, N: 1 },
    { label: "f = x^2+1", tex: "f(x) = x^2 + 1", f: (x) => x * x + 1, fp: (x) => 2 * x, fStr: "x^2 + 1", fpStr: "2x", rootsF: [], rootsFp: [0], M: 0, N: 1 },
    { label: "f = x^2", tex: "f(x) = x^2", f: (x) => x * x, fp: (x) => 2 * x, fStr: "x^2", fpStr: "2x", rootsF: [0], rootsFp: [0], M: 1, N: 1 },
    { label: "f = x^2-1", tex: "f(x) = x^2 - 1", f: (x) => x * x - 1, fp: (x) => 2 * x, fStr: "x^2 - 1", fpStr: "2x", rootsF: [-1, 1], rootsFp: [0], M: 2, N: 3 },
    { label: "f = x^3-x", tex: "f(x) = x^3 - x", f: (x) => x * x * x - x, fp: (x) => 3 * x * x - 1, fStr: "x^3 - x", fpStr: "3x^2 - 1", rootsF: [-1, 0, 1], rootsFp: [-1/Math.sqrt(3), 1/Math.sqrt(3)], M: 3, N: 5 },
  ];
  const [idx, setIdx] = useState(0);
  const p = presets[idx];
  // All distinct roots of g:
  const allRoots = [...p.rootsF];
  for (const r of p.rootsFp) { if (!allRoots.some(x => Math.abs(x - r) < 1e-6)) allRoots.push(r); }
  allRoots.sort((a, b) => a - b);

  const [sawMLessN, setSawMLessN] = useState(false);
  const [sawMEqN, setSawMEqN] = useState(false);
  const [notedImpossible, setNotedImpossible] = useState(false);
  useEffect(() => {
    if (p.M < p.N) setSawMLessN(true);
    if (p.M === p.N) setSawMEqN(true);
  }, [idx]);
  const allDemonstrated = sawMLessN && sawMEqN && notedImpossible;

  // Number line showing roots of f (blue) and roots of f' (yellow) with their union
  const rootsPlot = (() => {
    const pW = 380, pH = 246;
    const pad = { l: 28, r: 20, t: 32, b: 22 };
    const xMin = -2.2, xMax = 2.2;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const rowF = pad.t + 48;
    const rowFp = pad.t + 92;
    const rowG = pad.t + 142;
    // Draw number lines
    const axisLine = (y) => <line x1={sx(xMin)} y1={y} x2={sx(xMax)} y2={y} stroke={C.muted} strokeWidth={1} />;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={4} y={6} w={pW - 8} hh={16} color={C.ps}><span style={{ fontWeight: 700, fontSize: 12 }}><Tex>{p.tex}</Tex></span></FO>
        <FO x={4} y={26} w={pW - 8} hh={16} color={C.calc}><span style={{ fontWeight: 700, fontSize: 11 }}><Tex>{`f'(x) = ${p.fpStr}`}</Tex></span></FO>
        {/* Row 1: roots of f */}
        <FO x={4} y={rowF - 16} w={pad.l - 4} hh={14} color={C.ps}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"f"}</Tex></span></FO>
        {axisLine(rowF)}
        {p.rootsF.map((r, i) => (<g key={`rf${i}`}><circle cx={sx(r)} cy={rowF} r={5} fill={C.ps} stroke={C.white} strokeWidth={1.5} /><FO x={sx(r) - 16} y={rowF - 22} w={32} hh={14} color={C.ps}><Tex>{fmt(r, 2)}</Tex></FO></g>))}
        {p.rootsF.length === 0 && <FO x={sx(xMax) - 54} y={rowF - 14} w={50} hh={14} color={C.muted}><span style={{ fontSize: 11, fontStyle: "italic" }}>no roots</span></FO>}
        {/* Row 2: roots of f' */}
        <FO x={4} y={rowFp - 16} w={pad.l - 4} hh={14} color={C.calc}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"f'"}</Tex></span></FO>
        {axisLine(rowFp)}
        {p.rootsFp.map((r, i) => (<g key={`rfp${i}`}><circle cx={sx(r)} cy={rowFp} r={5} fill={C.calc} stroke={C.white} strokeWidth={1.5} /><FO x={sx(r) - 20} y={rowFp - 22} w={40} hh={14} color={C.calc}><Tex>{fmt(r, 2)}</Tex></FO></g>))}
        {p.rootsFp.length === 0 && <FO x={sx(xMax) - 54} y={rowFp - 14} w={50} hh={14} color={C.muted}><span style={{ fontSize: 11, fontStyle: "italic" }}>no roots</span></FO>}
        {/* Row 3: roots of g (union) */}
        <FO x={4} y={rowG - 16} w={pad.l - 4} hh={14} color={C.ok}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"g"}</Tex></span></FO>
        {axisLine(rowG)}
        {allRoots.map((r, i) => { const inF = p.rootsF.some(x => Math.abs(x - r) < 1e-6); const inFp = p.rootsFp.some(x => Math.abs(x - r) < 1e-6); const col = inF && inFp ? C.accentLight : inF ? C.ps : C.calc; return (<g key={`rg${i}`}><circle cx={sx(r)} cy={rowG} r={5} fill={col} stroke={C.white} strokeWidth={1.5} /><FO x={sx(r) - 20} y={rowG + 6} w={40} hh={14} color={col}><Tex>{fmt(r, 2)}</Tex></FO></g>); })}
        {allRoots.length === 0 && <FO x={sx(xMax) - 54} y={rowG - 14} w={50} hh={14} color={C.muted}><span style={{ fontSize: 11, fontStyle: "italic" }}>no roots</span></FO>}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.psBg, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "6px 12px", marginBottom: 5, textAlign: "center" }}>
        <span style={{ fontSize: 13, color: C.ps, fontWeight: 700 }}>Choose an <Tex>{"f"}</Tex> and compare roots of <Tex>{"f"}</Tex> vs roots of <Tex>{"g = f \\cdot f'"}</Tex></span>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {presets.map((pr, i) => { const active = i === idx; return (<button key={i} onClick={() => setIdx(i)} style={{ flex: 1, padding: "6px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 11, cursor: "pointer", fontWeight: active ? 700 : 500 }}><Tex>{pr.tex.replace('f(x) = ', '')}</Tex></button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{rootsPlot}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.ps, fontWeight: 700 }}><Tex>{"M"}</Tex> (roots of <Tex>{"f"}</Tex>)</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{String(p.M)}</Tex></div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.ok, fontWeight: 700 }}><Tex>{"N"}</Tex> (roots of <Tex>{"g"}</Tex>)</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.ok }}><Tex>{String(p.N)}</Tex></div>
          </div>
          <div style={{ background: p.M < p.N ? C.psBg : p.M === p.N ? C.assumBg : C.failBg, border: `1px solid ${(p.M < p.N ? C.ps : p.M === p.N ? C.assum : C.fail) + "66"}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: p.M < p.N ? C.ps : p.M === p.N ? C.assum : C.fail, fontWeight: 700 }}>relation</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: p.M < p.N ? C.ps : p.M === p.N ? C.assum : C.fail }}><Tex>{p.M < p.N ? "M < N" : p.M === p.N ? "M = N" : "M > N"}</Tex></div>
          </div>
        </div>
      </div>
      <div style={{ background: C.assumBg, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>Notice: in every preset, every blue root of <Tex>{"f"}</Tex> also appears in the green roots of <Tex>{"g"}</Tex>. That inclusion is forced because <Tex>{"g(x) = f(x) \\cdot f'(x)"}</Tex> contains <Tex>{"f"}</Tex> as a factor. So <Tex>{"M"}</Tex> can never EXCEED <Tex>{"N"}</Tex>.</div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawMLessN ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawMLessN} />
            <span style={{ fontWeight: sawMLessN ? 700 : 500 }}>Saw a preset with <Tex>{"M < N"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Realises I.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawMEqN ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawMEqN} />
            <span style={{ fontWeight: sawMEqN ? 700 : 500 }}>Saw a preset with <Tex>{"M = N"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Realises II.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: notedImpossible ? C.accentLight : C.muted }}>
            <ProgressCheck done={notedImpossible} />
            <button onClick={() => setNotedImpossible(true)} disabled={notedImpossible} style={{ flex: 1, padding: "4px 8px", borderRadius: 6, border: `1px solid ${notedImpossible ? C.accentLight : C.border}`, background: notedImpossible ? C.accentLight + "15" : C.card, color: notedImpossible ? C.accentLight : C.text, fontSize: 12, cursor: notedImpossible ? "default" : "pointer", fontWeight: notedImpossible ? 700 : 500, textAlign: "left" }}>
              {notedImpossible ? <>Noted: no preset gives <Tex>{"M > N"}</Tex>, and no polynomial ever can.</> : <>Click to note: no preset gives <Tex>{"M > N"}</Tex>, and no polynomial ever can.</>}
            </button>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>You've seen both <Tex>{"M < N"}</Tex> and <Tex>{"M = N"}</Tex> realised. <Tex>{"M > N"}</Tex> would require a real root of <Tex>{"f"}</Tex> NOT to be a root of <Tex>{"g = f \\cdot f'"}</Tex>, which can't happen.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is E: I and II only.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Work through the presets to see both <Tex>{"M < N"}</Tex> and <Tex>{"M = N"}</Tex> realised.
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
        <div style={{ marginBottom: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: 1 }}>TMUA</span><span style={{ fontSize: 12, color: C.muted }}>AceAdmissions Mock {"·"} Set {META.set}</span><span style={{ fontSize: 12, color: C.muted }}>{"·"}</span><span style={{ fontSize: 12, color: C.ps }}>{META.topicTag}</span></div><h1 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: titleFont, fontStyle: "italic", letterSpacing: 0.5 }}>Interactive Walkthrough</h1><p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{META.paperNumber} {"·"} Question {META.questionNumber}</p></div>
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
