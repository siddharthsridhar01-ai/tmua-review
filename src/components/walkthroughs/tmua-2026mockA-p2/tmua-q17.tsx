"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 17, paper: "Set A Paper 2", year: "2026 Mock", topicTag: "Proof Audit / Cubics" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\text{correct}", expl: "The proof is not complete. Line IV states the CONVERSE of what is needed. To deduce \"three distinct roots\" from \"opposite signs\", the student would need the direction (opposite signs ⇒ three distinct roots), not (three distinct roots ⇒ opposite signs). As written, line V's \"Hence\" does not follow from IV plus III." },
  { letter: "B", ok: true, tex: "\\text{converse}", expl: "Line IV states: three distinct real roots ⇒ stationary values have opposite signs. But what's needed to conclude V is the reverse direction: stationary values have opposite signs ⇒ three distinct real roots. The student has used the converse of the required implication. (The stated claim 0 < c < 4 ⇒ three distinct roots is in fact true, so the issue is purely with the PROOF, not the result.)" },
  { letter: "C", ok: false, tex: "\\text{error II}", expl: "Line II is correct. f(0) = 0 − 0 + c = c and f(2) = 8 − 12 + c = c − 4, and f'(x) = 3x(x − 2) indeed vanishes at x = 0 and x = 2." },
  { letter: "D", ok: false, tex: "\\text{error III}", expl: "Line III is correct. If 0 < c < 4 then c > 0 and c − 4 < 0. So one stationary value is positive and the other is negative; their signs are opposite." },
  { letter: "E", ok: false, tex: "\\text{error IV}", expl: "Line IV is a true statement on its own (three distinct real roots of a cubic do force opposite-sign stationary values). The issue is not that IV is false, but that it is the WRONG DIRECTION for what the proof needs. This is best described as the converse, not an error in IV itself." },
  { letter: "F", ok: false, tex: "\\text{reverse order}", expl: "The ordering of lines I–V is fine; reordering them would not fix the problem. The structural defect is that line IV points the logical arrow the wrong way: we need opposite signs ⇒ three distinct roots, and IV gives the reverse." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const ITEMS_Q17 = [
  { label: 'I', content: (<><Tex>{"f(x) = x^3 - 3x^2 + c"}</Tex>. <Tex>{"f'(x) = 3x^2 - 6x = 3x(x - 2)"}</Tex>.</>) },
  { label: 'II', content: (<>Stationary points at <Tex>{"x = 0"}</Tex> (value <Tex>{"c"}</Tex>) and at <Tex>{"x = 2"}</Tex> (value <Tex>{"c - 4"}</Tex>).</>) },
  { label: 'III', content: (<>If <Tex>{"0 < c < 4"}</Tex>, then <Tex>{"c > 0"}</Tex> and <Tex>{"c - 4 < 0"}</Tex>, so the stationary values have opposite signs.</>) },
  { label: 'IV', content: (<>If the cubic has three distinct real roots, then the stationary values have opposite signs.</>) },
  { label: 'V', content: (<>Hence the condition gives three distinct roots.</>) }
];
const OPTIONS_Q17 = [
  ["A", "\\text{correct}"],
  ["B", "\\text{converse}"],
  ["C", "\\text{error II}"],
  ["D", "\\text{error III}"],
  ["E", "\\text{error IV}"],
  ["F", "\\text{reverse order}"]
];
const SECTIONS_Q17 = [
  { type: 'prose', text: (<>A student answered the following question:</>) },
  { type: 'prose', text: (<>"Prove that the equation</>) },
  { type: "mathbox", tex: "x^3 - 3x^2 + c = 0" },
  { type: 'prose', text: (<>has three distinct real roots if <Tex>{"0 < c < 4"}</Tex>."</>) },
  { type: 'prose', text: (<>Here is the student's solution:</>) },
  { type: "items", items: [
    { label: 'I', content: (<><Tex>{"f(x) = x^3 - 3x^2 + c"}</Tex>. <Tex>{"f'(x) = 3x^2 - 6x = 3x(x - 2)"}</Tex>.</>) },
    { label: 'II', content: (<>Stationary points at <Tex>{"x = 0"}</Tex> (value <Tex>{"c"}</Tex>) and at <Tex>{"x = 2"}</Tex> (value <Tex>{"c - 4"}</Tex>).</>) },
    { label: 'III', content: (<>If <Tex>{"0 < c < 4"}</Tex>, then <Tex>{"c > 0"}</Tex> and <Tex>{"c - 4 < 0"}</Tex>, so the stationary values have opposite signs.</>) },
    { label: 'IV', content: (<>If the cubic has three distinct real roots, then the stationary values have opposite signs.</>) },
    { label: 'V', content: (<>Hence the condition gives three distinct roots.</>) }
  ] },
  { type: 'prose-tight', text: (<>Which one of the following options best describes the student's solution?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q17;
  const options = OPTIONS_Q17;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q17</span>
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
  const sections = SECTIONS_Q17;
  const options = OPTIONS_Q17;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 17</span>
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
        {options.map(([l, v]) => (<div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 200px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>This is a proof-audit question. Walk through each line and ask: is this statement true, and does it follow from what came before? A proof can fail in two different ways:</p><p style={{ margin: "0 0 4px" }}>• A line is just false.</p><p style={{ margin: 0 }}>• All lines are individually true, but the final conclusion doesn't follow from them (a structural / logical flaw).</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>The goal is: "if <Tex>{"0 < c < 4"}</Tex> then three distinct real roots". To conclude three distinct roots from opposite-sign stationary values the student needs the implication</p><p style={{ margin: "0 0 4px", textAlign: "center" }}><Tex>{"\\text{opposite signs} \\;\\Rightarrow\\; \\text{three distinct roots.}"}</Tex></p><p style={{ margin: "0 0 4px" }}>But line IV gives the reverse:</p><p style={{ margin: "0 0 4px", textAlign: "center" }}><Tex>{"\\text{three distinct roots} \\;\\Rightarrow\\; \\text{opposite signs.}"}</Tex></p><p style={{ margin: 0 }}>That's the converse. Using the converse when you need the original is exactly the "converse" fallacy.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram: the logical arrow diagram. Two boxes: opposite signs and three distinct roots.
  // Show both directions and highlight which is needed vs which the student proved.
  const arrowDiagram = (() => {
    const pW = 300, pH = 180;
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const leftX = 16, rightX = pW - 128, boxW = 112, boxH = 50;
    const cyTop = 22, cyBot = 106;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {/* Top arrow: NEEDED direction (opposite signs → three roots) */}
        <FO x={0} y={6} w={pW} hh={14} color={C.ok}><span style={{ fontWeight: 700, fontSize: 11 }}>Needed for the proof</span></FO>
        <rect x={leftX} y={cyTop} width={boxW} height={boxH} rx={6} fill={C.ok + "18"} stroke={C.ok} strokeWidth={1.2} />
        <FO x={leftX + 4} y={cyTop + 10} w={boxW - 8} hh={32} color={C.ok}><span style={{ fontSize: 11, lineHeight: 1.2 }}>opposite-sign stationary values</span></FO>
        <line x1={leftX + boxW + 2} y1={cyTop + boxH/2} x2={rightX - 2} y2={cyTop + boxH/2} stroke={C.ok} strokeWidth={2} markerEnd="url(#arrHead)" />
        <rect x={rightX} y={cyTop} width={boxW} height={boxH} rx={6} fill={C.ok + "18"} stroke={C.ok} strokeWidth={1.2} />
        <FO x={rightX + 4} y={cyTop + 10} w={boxW - 8} hh={32} color={C.ok}><span style={{ fontSize: 11, lineHeight: 1.2 }}>three distinct real roots</span></FO>
        {/* Bottom arrow: CONVERSE (what the student wrote as line IV) */}
        <FO x={0} y={cyBot - 16} w={pW} hh={14} color={C.fail}><span style={{ fontWeight: 700, fontSize: 11 }}>What line IV says (converse)</span></FO>
        <rect x={leftX} y={cyBot} width={boxW} height={boxH} rx={6} fill={C.fail + "18"} stroke={C.fail} strokeWidth={1.2} />
        <FO x={leftX + 4} y={cyBot + 10} w={boxW - 8} hh={32} color={C.fail}><span style={{ fontSize: 11, lineHeight: 1.2 }}>opposite-sign stationary values</span></FO>
        <line x1={rightX - 2} y1={cyBot + boxH/2} x2={leftX + boxW + 2} y2={cyBot + boxH/2} stroke={C.fail} strokeWidth={2} markerEnd="url(#arrHead2)" />
        <rect x={rightX} y={cyBot} width={boxW} height={boxH} rx={6} fill={C.fail + "18"} stroke={C.fail} strokeWidth={1.2} />
        <FO x={rightX + 4} y={cyBot + 10} w={boxW - 8} hh={32} color={C.fail}><span style={{ fontSize: 11, lineHeight: 1.2 }}>three distinct real roots</span></FO>
        <defs>
          <marker id="arrHead" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto"><polygon points="0 0, 6 3, 0 6" fill={C.ok} /></marker>
          <marker id="arrHead2" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto"><polygon points="0 0, 6 3, 0 6" fill={C.fail} /></marker>
        </defs>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "READ THE CLAIM CAREFULLY", color: C.ps, text: <span>The stated goal is: <Tex>{"0 < c < 4 \\;\\Rightarrow\\; \\text{three distinct real roots}"}</Tex>. Lines I-III are a chain of correct deductions: <Tex>{"0 < c < 4 \\Rightarrow c > 0 \\text{ and } c - 4 < 0 \\Rightarrow"}</Tex> stationary values have opposite signs. So by line III the student has established opposite-sign stationary values. What is needed NEXT is the bridge leading opposite signs to three distinct roots.</span>, math: (<><div><Tex>{"\\text{Have: } 0 < c < 4"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Derived (lines I-III):}"}</Tex></div><div style={{ marginTop: 2 }}><Tex>{"\\text{stationary values have opposite signs}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Want: three distinct real roots}"}</Tex></div></>) },
    { label: "IDENTIFY THE NEEDED DIRECTION", color: C.ok, text: <span>The missing step is an implication starting at opposite signs (the premise we just earned) and arriving at three distinct roots (the target). So we want:</span>, math: (<><div><Tex>{"\\text{opposite signs} \\;\\Rightarrow\\; \\text{three distinct roots}"}</Tex></div><div style={{ marginTop: 6, color: C.muted }}><Tex>{"\\text{\\small{(this IS true: it's the standard}}"}</Tex></div><div style={{ color: C.muted }}><Tex>{"\\text{\\small{cubic-root-counting lemma)}}"}</Tex></div></>) },
    { label: "COMPARE WITH LINE IV", color: C.fail, text: <span>Line IV states: "If the cubic has three distinct real roots, then the stationary values have opposite signs". That's the REVERSE arrow:</span>, math: (<><div><Tex>{"\\text{three distinct roots} \\;\\Rightarrow\\; \\text{opposite signs}"}</Tex></div><div style={{ marginTop: 6, color: C.fail }}><Tex>{"\\color{#ff7675}{\\text{This is the CONVERSE of what's needed.}}"}</Tex></div></>), diagram: arrowDiagram },
    { label: "WHY LINE V DOESN'T FOLLOW", color: C.fail, text: <span>Line V says "Hence the condition gives three distinct roots". From III (opposite signs) combined with IV (three-roots ⇒ opposite-signs), we cannot conclude three roots. That would be affirming the consequent. The original claim happens to BE true, but this proof does not establish it. The student has proved the converse instead.</span>, math: (<><div><Tex>{"\\text{III: opp signs. \\; IV: 3 roots} \\Rightarrow \\text{opp signs.}"}</Tex></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{\\not\\Rightarrow \\text{3 roots}}"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"(\\text{affirming the consequent})"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>The student has proved: "if three distinct real roots, then opposite-sign stationary values." That is the CONVERSE of what was asked. No line is individually wrong; the issue is purely structural (wrong logical direction).</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{Answer: converse}}"}</Tex></div>), conclusion: <span>The answer is B: the student has proved the converse.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 300px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [c, setC] = useState(2);
  const [sawClaimTrue, setSawClaimTrue] = useState(false);    // saw 3 roots for some 0<c<4
  const [sawClaimFalse, setSawClaimFalse] = useState(false);   // saw <3 roots for c outside (0,4)
  const [identifiedConverse, setIdentifiedConverse] = useState(false);

  // f is the cubic x cubed minus 3 x squared plus c
  const f = (x) => x * x * x - 3 * x * x + c;
  const valAt0 = c;          // f(0) = c
  const valAt2 = c - 4;      // f(2) = c - 4
  const oppositeSigns = valAt0 * valAt2 < 0;   // i.e. c > 0 and c < 4

  // Count real roots: for a cubic with two stationary points, three distinct real roots
  // iff the stationary values straddle zero, i.e. have strictly opposite signs.
  const numRoots = oppositeSigns ? 3 : (valAt0 === 0 || valAt2 === 0) ? 2 : 1;

  useEffect(() => {
    if (numRoots === 3 && c > 0 && c < 4) setSawClaimTrue(true);
    if (numRoots < 3 && (c <= 0 || c >= 4)) setSawClaimFalse(true);
  }, [c]);
  const allDemonstrated = sawClaimTrue && sawClaimFalse && identifiedConverse;

  // Graph: y = f(x) with stationary points and x-axis
  const graph = (() => {
    const pW = 380, pH = 260;
    const pad = { l: 30, r: 16, t: 28, b: 24 };
    const xMin = -2, xMax = 4;
    const yMin = -8, yMax = 8;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    // Sample the curve
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      const x = xMin + (xMax - xMin) * (i / 120);
      const y = f(x);
      if (y >= yMin && y <= yMax) pts.push(`${sx(x)},${sy(y)}`);
      else if (pts.length) { pts.push('M'); }
    }
    const pathD = pts.length ? `M ${pts.join(' L ').replace(/L M L/g, 'M').replace(/L M /g, 'M ')}` : '';
    const gridLines = [];
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) { if (x === 0) continue; gridLines.push(<line key={`gx${x}`} x1={sx(x)} y1={sy(yMax)} x2={sx(x)} y2={sy(yMin)} stroke={C.border} strokeWidth={0.4} />); }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 2) { if (y === 0) continue; gridLines.push(<line key={`gy${y}`} x1={sx(xMin)} y1={sy(y)} x2={sx(xMax)} y2={sy(y)} stroke={C.border} strokeWidth={0.4} />); }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="vgc17"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        <FO x={pad.l} y={2} w={pW - pad.l - pad.r} hh={16} color={C.ps}><span style={{ fontWeight: 700, fontSize: 12 }}><Tex>{`y = x^3 - 3x^2 ${c >= 0 ? "+" : "-"} ${fmt(Math.abs(c), 2)}`}</Tex></span></FO>
        {gridLines}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        {[-1, 1, 2, 3].map(v => <FO key={`tx${v}`} x={sx(v) - 8} y={sy(0) + 2} w={16} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        {[-6, -4, -2, 2, 4, 6].map(v => <FO key={`ty${v}`} x={sx(0) - 22} y={sy(v) - 7} w={18} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        <g clipPath="url(#vgc17)">
          <path d={pathD} fill="none" stroke={C.ps} strokeWidth={2} />
          {/* Stationary points */}
          <circle cx={sx(0)} cy={sy(valAt0)} r={5} fill={valAt0 > 0 ? C.ok : valAt0 < 0 ? C.fail : C.muted} stroke={C.white} strokeWidth={1.5} />
          <circle cx={sx(2)} cy={sy(valAt2)} r={5} fill={valAt2 > 0 ? C.ok : valAt2 < 0 ? C.fail : C.muted} stroke={C.white} strokeWidth={1.5} />
        </g>
        {/* Labels */}
        <FO x={sx(0) - 42} y={sy(valAt0) - 18} w={80} hh={14} color={valAt0 > 0 ? C.ok : valAt0 < 0 ? C.fail : C.muted}><Tex>{`f(0) = ${fmt(valAt0, 1)}`}</Tex></FO>
        <FO x={sx(2) - 2} y={sy(valAt2) + 4} w={80} hh={14} color={valAt2 > 0 ? C.ok : valAt2 < 0 ? C.fail : C.muted}><Tex>{`f(2) = ${fmt(valAt2, 1)}`}</Tex></FO>
        <FO x={sx(xMax) - 14} y={sy(0) + 2} w={12} hh={14} color={C.muted}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0) - 6} y={pad.t} w={12} hh={14} color={C.muted}><Tex>{"y"}</Tex></FO>
      </svg>
    );
  })();

  const presets = [
    { val: -1, label: "-1" },
    { val: 0, label: "0" },
    { val: 2, label: "2" },
    { val: 4, label: "4" },
    { val: 5, label: "5" },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.psBg, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "6px 12px", marginBottom: 5, textAlign: "center" }}>
        <span style={{ fontSize: 13, color: C.ps, fontWeight: 700 }}>Plotting <Tex>{"y = f(x)"}</Tex> where <Tex>{"f(x) = x^3 - 3x^2 + c"}</Tex></span>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"c"}</Tex></span>
          <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`c = ${fmt(c, 2)}`}</Tex></span>
        </div>
        <input type="range" min={-2} max={6} step={0.1} value={c} onChange={e => setC(parseFloat(e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map((pr, i) => { const active = Math.abs(c - pr.val) < 0.05; return (<button key={i} onClick={() => setC(pr.val)} style={{ flex: 1, padding: "5px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 500 }}><Tex>{`c = ${pr.label}`}</Tex></button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}>stationary values</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.calc, marginTop: 2 }}><Tex>{`${fmt(valAt0, 1)} \\text{ and } ${fmt(valAt2, 1)}`}</Tex></div>
            <div style={{ fontSize: 11, color: oppositeSigns ? C.ok : C.fail, marginTop: 2 }}>{oppositeSigns ? "opposite signs ✓" : "same sign ✗"}</div>
          </div>
          <div style={{ background: numRoots === 3 ? C.conclBg : C.failBg, border: `1px solid ${(numRoots === 3 ? C.ok : C.fail) + "66"}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: numRoots === 3 ? C.ok : C.fail, fontWeight: 700 }}>distinct real roots</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: numRoots === 3 ? C.ok : C.fail }}>{numRoots}</div>
          </div>
        </div>
      </div>
      <div style={{ background: C.assumBg, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>The relationship <i>is</i> an equivalence: the cubic has three distinct real roots iff the stationary values have opposite signs. But an equivalence is two directions, and the student only wrote down ONE of them (line IV), in the wrong way round.</div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawClaimTrue ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawClaimTrue} />
            <span style={{ fontWeight: sawClaimTrue ? 700 : 500 }}>Saw three distinct roots for some <Tex>{"c \\in (0, 4)"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Stated claim really is true.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawClaimFalse ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawClaimFalse} />
            <span style={{ fontWeight: sawClaimFalse ? 700 : 500 }}>Saw fewer than three roots for some <Tex>{"c"}</Tex> outside <Tex>{"(0, 4)"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Boundary matters.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: identifiedConverse ? C.accentLight : C.muted }}>
            <ProgressCheck done={identifiedConverse} />
            <button onClick={() => setIdentifiedConverse(true)} disabled={identifiedConverse} style={{ flex: 1, padding: "4px 8px", borderRadius: 6, border: `1px solid ${identifiedConverse ? C.accentLight : C.border}`, background: identifiedConverse ? C.accentLight + "15" : C.card, color: identifiedConverse ? C.accentLight : C.text, fontSize: 12, cursor: identifiedConverse ? "default" : "pointer", fontWeight: identifiedConverse ? 700 : 500, textAlign: "left" }}>
              {identifiedConverse ? "Identified: line IV states the converse of what's needed." : "Click to confirm line IV is the converse of the missing step."}
            </button>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>The STATED claim is true, but the PROOF invokes line IV ("3 distinct roots ⇒ opposite signs"), which is the reverse of the arrow needed from line III to line V. So the student has effectively proved the converse of their own target.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is B: converse.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Try <Tex>{"c = 2"}</Tex> (should give 3 roots) and <Tex>{"c = 5"}</Tex> (should not), then confirm the converse observation.
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
