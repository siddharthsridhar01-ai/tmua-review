"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 13, set: "A", paperNumber: "Paper 2", topicTag: "Algebra / Existence" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\text{no values}", expl: "Plenty of x values work. For example x = 0: the equation becomes 0 = 0 + y + 1, so y = -1 works. So at least one x satisfies (*)." },
  { letter: "B", ok: false, tex: "\\text{exactly one}", expl: "Many x values work, not just one. For x = 2: rearranging gives y = (x+1)/(x-1) = 3, and checking: xy = 6, x + y + 1 = 6 ✓." },
  { letter: "C", ok: false, tex: "\\text{exactly two}", expl: "The statement holds for a whole range of x values, not just two. Rearranging xy = x + y + 1 gives y(x-1) = x+1, so y = (x+1)/(x-1) exists whenever x ≠ 1." },
  { letter: "D", ok: true, tex: "\\text{all except one}", expl: "Rearrange xy = x + y + 1 as y(x - 1) = x + 1. If x ≠ 1, divide: y = (x+1)/(x-1) is a valid real number, so (*) holds. If x = 1, the equation becomes y = 1 + y + 1, i.e. 0 = 2: impossible. So (*) is true for every x except x = 1." },
  { letter: "E", ok: false, tex: "\\text{all except two}", expl: "Only one value of x fails, namely x = 1 (where the rearranged equation loses the y term and becomes 0 = 2). Every other x admits a solution y = (x+1)/(x-1)." },
  { letter: "F", ok: false, tex: "\\text{all values}", expl: "At x = 1 the equation becomes 1·y = 1 + y + 1, i.e. y = y + 2, i.e. 0 = 2, which is false. So x = 1 has no y that works. Therefore (*) does not hold for every real x." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }


const ITEMS_Q13 = [
  { label: '(*)', content: (<>There exists a real number <Tex>{"y"}</Tex> such that <Tex>{"xy = x + y + 1"}</Tex>.</>) }
];
const OPTIONS_Q13 = [
  ["A", "\\text{no values}"],
  ["B", "\\text{exactly one}"],
  ["C", "\\text{exactly two}"],
  ["D", "\\text{all except one}"],
  ["E", "\\text{all except two}"],
  ["F", "\\text{all values}"]
];
const SECTIONS_Q13 = [
  { type: 'prose', text: (<>In this question, <Tex>{"x"}</Tex> is a real number. Consider the following statement about <Tex>{"x"}</Tex>:</>) },
  { type: "items", items: [
    { label: '(*)', content: (<>There exists a real number <Tex>{"y"}</Tex> such that <Tex>{"xy = x + y + 1"}</Tex>.</>) }
  ] },
  { type: 'prose-tight', text: (<>For how many real values of <Tex>{"x"}</Tex> is (*) true?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q13;
  const options = OPTIONS_Q13;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q13</span>
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
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }


function ReadStep() {
  const sections = SECTIONS_Q13;
  const options = OPTIONS_Q13;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 13</span>
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
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 200px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>Treat <Tex>{"x"}</Tex> as a fixed parameter and try to solve <Tex>{"xy = x + y + 1"}</Tex> for <Tex>{"y"}</Tex>.</p><p style={{ margin: 0 }}>Group the <Tex>{"y"}</Tex> terms on one side: <Tex>{"xy - y = x + 1"}</Tex>, then factor to <Tex>{"y(x - 1) = x + 1"}</Tex>. Now the situation depends on whether <Tex>{"x - 1 = 0"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>When <Tex>{"x - 1 \\ne 0"}</Tex>, divide both sides by <Tex>{"x - 1"}</Tex> to get <Tex>{"y = (x+1)/(x-1)"}</Tex>, a perfectly good real number.</p><p style={{ margin: 0 }}>When <Tex>{"x - 1 = 0"}</Tex> (so <Tex>{"x = 1"}</Tex>), the left side <Tex>{"y \\cdot 0"}</Tex> is 0 regardless of <Tex>{"y"}</Tex>, but the right side is <Tex>{"1 + 1 = 2 \\ne 0"}</Tex>. No <Tex>{"y"}</Tex> can make that work, so <Tex>{"x = 1"}</Tex> is the single exception.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const FO = ({ x, y, w, hh, color, children }) => (<foreignObject x={x} y={y} width={w || 40} height={hh || 16}><div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div></foreignObject>);

  // STEP 1 DIAGRAM: rearrangement chain shown as stacked boxes.
  const rearrangementDiagram = (() => {
    const pW = 300, pH = 180;
    const steps = [
      { tex: "xy = x + y + 1", note: "given" },
      { tex: "xy - y = x + 1", note: "subtract y" },
      { tex: "y(x - 1) = x + 1", note: "factor out y" },
    ];
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Rearrange for <Tex>{"y"}</Tex></span></FO>
        {steps.map((s, i) => {
          const y = 34 + i * 46;
          return (
            <g key={i}>
              <rect x={15} y={y} width={pW - 30} height={32} rx={5} fill={C.ps + "12"} stroke={C.ps + "55"} strokeWidth={0.8} />
              <FO x={20} y={y + 6} w={pW - 60} hh={20} color={C.text}><span style={{ fontSize: 13 }}><Tex>{s.tex}</Tex></span></FO>
              <FO x={pW - 68} y={y + 18} w={60} hh={14} color={C.muted}><span style={{ fontSize: 11, fontStyle: "italic" }}>{s.note}</span></FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  // STEP 2 DIAGRAM: two-branch case split, with the x = 1 box marked red.
  const caseSplitDiagram = (() => {
    const pW = 300, pH = 210;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Split by <Tex>{"x - 1"}</Tex> being zero or not</span></FO>
        {/* Case 1: x ≠ 1 */}
        <g>
          <rect x={15} y={34} width={pW - 30} height={68} rx={6} fill={C.ok + "12"} stroke={C.ok + "66"} strokeWidth={1} />
          <FO x={22} y={40} w={pW - 44} hh={16} color={C.ok}><span style={{ fontSize: 12, fontWeight: 700 }}>Case 1: <Tex>{"x \\ne 1"}</Tex></span></FO>
          <FO x={22} y={58} w={pW - 44} hh={16} color={C.text}><span style={{ fontSize: 11 }}><Tex>{"\\text{Divide by } x-1:"}</Tex></span></FO>
          <FO x={22} y={76} w={pW - 44} hh={20} color={C.text}><span style={{ fontSize: 13 }}><Tex>{"y = \\tfrac{x+1}{x-1} \\;\\checkmark"}</Tex></span></FO>
        </g>
        {/* Case 2: x = 1 */}
        <g>
          <rect x={15} y={112} width={pW - 30} height={84} rx={6} fill={C.fail + "12"} stroke={C.fail + "66"} strokeWidth={1} />
          <FO x={22} y={118} w={pW - 44} hh={16} color={C.fail}><span style={{ fontSize: 12, fontWeight: 700 }}>Case 2: <Tex>{"x = 1"}</Tex></span></FO>
          <FO x={22} y={136} w={pW - 44} hh={16} color={C.text}><span style={{ fontSize: 11 }}><Tex>{"y \\cdot 0 = 2 \\Rightarrow 0 = 2"}</Tex></span></FO>
          <FO x={22} y={154} w={pW - 44} hh={16} color={C.fail}><span style={{ fontSize: 11, fontWeight: 600 }}>Contradiction: no <Tex>{"y"}</Tex> works.</span></FO>
          <FO x={22} y={172} w={pW - 44} hh={16} color={C.fail}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"x = 1 \\text{ is the exception}"}</Tex></span></FO>
        </g>
      </svg>
    );
  })();

  // STEP 3 DIAGRAM: number line showing all x except x = 1 work.
  const numberLineDiagram = (() => {
    const pW = 300, pH = 130;
    const pad = { l: 20, r: 20 };
    const xMin = -3, xMax = 4;
    const sx = (v) => pad.l + ((v - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const axisY = 70;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Values of <Tex>{"x"}</Tex> for which (*) holds</span></FO>
        {/* Green segments on either side of x = 1 */}
        <line x1={sx(xMin)} y1={axisY} x2={sx(1) - 5} y2={axisY} stroke={C.ok} strokeWidth={4} strokeLinecap="round" />
        <line x1={sx(1) + 5} y1={axisY} x2={sx(xMax)} y2={axisY} stroke={C.ok} strokeWidth={4} strokeLinecap="round" />
        {/* Hollow circle at x = 1 (excluded) */}
        <circle cx={sx(1)} cy={axisY} r={6} fill={C.bg} stroke={C.fail} strokeWidth={2} />
        {/* Axis tick marks */}
        {[-3, -2, -1, 0, 1, 2, 3, 4].map(t => (
          <g key={t}>
            <line x1={sx(t)} y1={axisY - 3} x2={sx(t)} y2={axisY + 3} stroke={C.muted} strokeWidth={1} />
            <FO x={sx(t) - 10} y={axisY + 8} w={20} hh={14} color={t === 1 ? C.fail : C.muted}><span style={{ fontSize: 11, fontWeight: t === 1 ? 700 : 500 }}>{t}</span></FO>
          </g>
        ))}
        {/* Label for x = 1 */}
        <FO x={sx(1) - 40} y={axisY - 32} w={80} hh={14} color={C.fail}><span style={{ fontSize: 11, fontWeight: 700 }}>excluded</span></FO>
        <line x1={sx(1)} y1={axisY - 18} x2={sx(1)} y2={axisY - 8} stroke={C.fail} strokeWidth={1} strokeDasharray="2,2" />
        <FO x={10} y={axisY + 34} w={pW - 20} hh={16} color={C.ok}><span style={{ fontSize: 11, fontWeight: 600 }}>All reals except <Tex>{"x = 1"}</Tex></span></FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "REARRANGE FOR y", color: C.ps, text: <span>Treat <Tex>{"x"}</Tex> as a fixed parameter and collect the <Tex>{"y"}</Tex> terms: <Tex>{"xy - y = x + 1"}</Tex>, then factor out <Tex>{"y"}</Tex>.</span>, math: (<><div><Tex>{"xy = x + y + 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"xy - y = x + 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"y(x - 1) = x + 1"}</Tex></div></>), diagram: rearrangementDiagram },
    { label: "SPLIT INTO CASES", color: C.calc, text: <span>The coefficient <Tex>{"x - 1"}</Tex> in front of <Tex>{"y"}</Tex> might be zero or non-zero. This matters because dividing by zero is forbidden, so the two cases must be handled separately.</span>, math: (<><div><Tex>{"\\text{Case } x \\ne 1: \\; y = \\tfrac{x+1}{x-1}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Case } x = 1: \\; 0 = 2 \\;\\text{✗}"}</Tex></div></>), diagram: caseSplitDiagram },
    { label: "COUNT THE SOLUTIONS", color: C.ok, text: <span>Every real <Tex>{"x"}</Tex> other than 1 admits some <Tex>{"y"}</Tex>, namely <Tex>{"y = (x+1)/(x-1)"}</Tex>. The single exception is <Tex>{"x = 1"}</Tex>, where no real <Tex>{"y"}</Tex> can satisfy the equation.</span>, math: (<><div><Tex>{"\\text{(*) holds for all } x \\in \\mathbb{R} \\setminus \\{1\\}"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\text{one exception: } x = 1}"}</Tex></div></>), diagram: numberLineDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>(*) is true for every real <Tex>{"x"}</Tex> except <Tex>{"x = 1"}</Tex>, i.e. all values except one.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{all except one}}"}</Tex></div>), conclusion: <span>The answer is D: all except one.</span> },
  ];

  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 300px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Slider for x. Shows the candidate y = (x+1)/(x-1) (or NaN at x=1), and the live LHS/RHS of xy = x+y+1.
  // Progress: see (*) hold at multiple x ≠ 1 values, AND see it fail at x = 1.
  const [x, setX] = useState(2);
  const [sawHoldAway, setSawHoldAway] = useState(false);  // (*) holds at some x ≠ 1
  const [sawFailAtOne, setSawFailAtOne] = useState(false); // student visited x = 1 and saw failure

  const snap = [-3, -2, -1, 0, 0.5, 1, 1.5, 2, 3];
  const snapRadius = 0.04;
  const handleSnap = (raw) => { for (const s of snap) { if (Math.abs(raw - s) < snapRadius) return s; } return Math.round(raw * 20) / 20; };

  const atOne = Math.abs(x - 1) < 0.001;
  const y = atOne ? NaN : (x + 1) / (x - 1);
  const LHS = atOne ? NaN : x * y;
  const RHS = atOne ? NaN : x + y + 1;
  const holds = !atOne && Math.abs(LHS - RHS) < 1e-9;

  useEffect(() => {
    if (holds) setSawHoldAway(true);
    if (atOne) setSawFailAtOne(true);
  }, [holds, atOne]);
  const bothDemonstrated = sawHoldAway && sawFailAtOne;

  // Small graph showing y = (x+1)/(x-1), with a clear vertical asymptote at x = 1.
  const graph = (() => {
    const pW = 360, pH = 230;
    const pad = { l: 30, r: 14, t: 14, b: 22 };
    const xMin = -3, xMax = 4, yMin = -5, yMax = 5;
    const sx = (v) => pad.l + ((v - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (v) => pad.t + ((yMax - v) / (yMax - yMin)) * (pH - pad.t - pad.b);
    // Build two curve segments, one for x < 1 and one for x > 1, skipping near the asymptote.
    const leftPts = [], rightPts = [];
    const N = 400;
    for (let i = 0; i <= N; i++) {
      const xi = xMin + (i / N) * (xMax - xMin);
      const yi = (xi + 1) / (xi - 1);
      if (xi < 0.96) leftPts.push(`${sx(xi)},${sy(yi)}`);
      else if (xi > 1.04) rightPts.push(`${sx(xi)},${sy(yi)}`);
    }
    const FO = ({ xx, y: yy, w, hh, color, children }) => (<foreignObject x={xx} y={yy} width={w || 40} height={hh || 16}><div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div></foreignObject>);
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="vgc13"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        {/* Grid */}
        {[-4, -2, 2, 4].map(g => <line key={`gy${g}`} x1={pad.l} y1={sy(g)} x2={pW - pad.r} y2={sy(g)} stroke={C.border} strokeWidth={0.4} />)}
        {[-3, -2, -1, 2, 3].map(g => <line key={`gx${g}`} x1={sx(g)} y1={pad.t} x2={sx(g)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.4} />)}
        {/* Axes */}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        {/* Asymptote x = 1 */}
        <line x1={sx(1)} y1={pad.t} x2={sx(1)} y2={pH - pad.b} stroke={C.fail} strokeWidth={1.2} strokeDasharray="4,3" />
        <FO xx={sx(1) + 4} yy={pad.t + 2} w={60} hh={14} color={C.fail}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"x = 1"}</Tex></span></FO>
        {/* Curve */}
        <g clipPath="url(#vgc13)">
          <polyline points={leftPts.join(" ")} fill="none" stroke={C.ok} strokeWidth={2} />
          <polyline points={rightPts.join(" ")} fill="none" stroke={C.ok} strokeWidth={2} />
          {/* Current point */}
          {!atOne && isFinite(y) && (
            <>
              <line x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(y)} stroke={C.calc} strokeWidth={1} strokeDasharray="2,2" />
              <circle cx={sx(x)} cy={sy(y)} r={5} fill={C.calc} stroke={C.white} strokeWidth={1.5} />
            </>
          )}
        </g>
        {/* Label for the curve */}
        <FO xx={sx(2.3)} yy={sy(3)} w={100} hh={16} color={C.ok}><Tex>{"y = \\tfrac{x+1}{x-1}"}</Tex></FO>
        {/* Tick labels */}
        {[-2, 0, 2, 4].map(t => <FO key={`tx${t}`} xx={sx(t) - 6} yy={sy(0) + 2} w={12} hh={14} color={C.muted}><Tex>{String(t)}</Tex></FO>)}
        {[-4, -2, 2, 4].map(t => <FO key={`ty${t}`} xx={sx(0) - 18} yy={sy(t) - 6} w={14} hh={14} color={C.muted}><Tex>{String(t)}</Tex></FO>)}
      </svg>
    );
  })();

  const presets = [
    { val: -2 },
    { val: 0 },
    { val: 1 },
    { val: 2 },
    { val: 3 },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`x = ${fmt(x, 2)}`}</Tex></span>
        </div>
        <input type="range" min={-3} max={4} step={0.05} value={x} onChange={e => setX(handleSnap(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map((pr, i) => { const active = Math.abs(x - pr.val) < 0.03; return (<button key={i} onClick={() => setX(pr.val)} style={{ flex: 1, padding: "5px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 500 }}><Tex>{`x = ${pr.val}`}</Tex></button>); })}
        </div>
      </div>
      {/* Plot + computation panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}>candidate <Tex>{"y"}</Tex></div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}><Tex>{"\\tfrac{x+1}{x-1}"}</Tex></div>
            <div style={{ fontSize: 18, fontWeight: 700, color: atOne ? C.fail : C.calc, marginTop: 2 }}>{atOne ? "undefined" : fmt(y, 3)}</div>
          </div>
          <div style={{ background: holds ? C.conclBg : atOne ? C.failBg : C.card, border: `1px solid ${(holds ? C.ok : atOne ? C.fail : C.border) + "66"}`, borderRadius: 8, padding: "5px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: holds ? C.ok : atOne ? C.fail : C.muted, fontWeight: 700 }}>(*) holds?</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: holds ? C.ok : atOne ? C.fail : C.muted }}>{atOne ? "NO" : "YES"}</div>
          </div>
          {!atOne && (
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>check</div>
              <div style={{ fontSize: 11, color: C.text, marginTop: 2 }}><Tex>{`xy = ${fmt(LHS, 2)}`}</Tex></div>
              <div style={{ fontSize: 11, color: C.text, marginTop: 2 }}><Tex>{`x+y+1 = ${fmt(RHS, 2)}`}</Tex></div>
            </div>
          )}
        </div>
      </div>
      {/* Status message */}
      {atOne ? (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.fail, lineHeight: 1.5 }}>At <Tex>{"x = 1"}</Tex>, the equation forces <Tex>{"0 = 2"}</Tex>.</div>
          <div style={{ fontSize: 12, color: C.fail, marginTop: 2 }}>No real <Tex>{"y"}</Tex> satisfies <Tex>{"1 \\cdot y = 1 + y + 1"}</Tex>, so (*) fails here.</div>
        </div>
      ) : holds ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ok, lineHeight: 1.5 }}>Found <Tex>{`y = ${fmt(y, 3)}`}</Tex>, equation checks out.</div>
          <div style={{ fontSize: 12, color: C.ok, marginTop: 2 }}>(*) holds at this <Tex>{"x"}</Tex>.</div>
        </div>
      ) : null}
      {/* Progress tracker */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawHoldAway ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawHoldAway} />
            <span style={{ fontWeight: sawHoldAway ? 700 : 500 }}>Found (*) true for some <Tex>{"x \\ne 1"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Most <Tex>{"x"}</Tex> admit a <Tex>{"y"}</Tex>.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawFailAtOne ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawFailAtOne} />
            <span style={{ fontWeight: sawFailAtOne ? 700 : 500 }}>Visited <Tex>{"x = 1"}</Tex> and saw (*) fail. <span style={{ color: C.muted, fontWeight: 500 }}>(The single exception.)</span></span>
          </div>
        </div>
        {bothDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>The equation rearranges to <Tex>{"y(x - 1) = x + 1"}</Tex>. When <Tex>{"x \\ne 1"}</Tex>, dividing by <Tex>{"x - 1"}</Tex> gives a valid <Tex>{"y"}</Tex>. When <Tex>{"x = 1"}</Tex>, the coefficient of <Tex>{"y"}</Tex> vanishes but the right-hand side is 2, leaving an unsolvable <Tex>{"0 = 2"}</Tex>.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is D: all except one.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Try both an <Tex>{"x \\ne 1"}</Tex> and <Tex>{"x = 1"}</Tex> to conclude the answer.
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
