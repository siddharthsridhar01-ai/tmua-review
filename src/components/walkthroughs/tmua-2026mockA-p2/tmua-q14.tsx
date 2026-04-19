"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 14, paper: "Set A Paper 2", year: "2026 Mock", topicTag: "Simultaneous Equations / Parameters" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "p \\ne \\sqrt{3}", expl: "This excludes only one of the two problematic values. At p = -√3 the coefficient p² - 3 also vanishes, so the system has no solution there too. The answer must exclude BOTH √3 and -√3." },
  { letter: "B", ok: false, tex: "p \\ne -\\sqrt{3}", expl: "Symmetric mistake to A: excludes only one problematic value. At p = √3, p² = 3, so (p² - 3)x = p - 2 becomes 0 · x = √3 - 2 ≠ 0, giving no solution. Both √3 and -√3 must be excluded." },
  { letter: "C", ok: true, tex: "p \\ne \\sqrt{3} \\text{ and } p \\ne -\\sqrt{3}", expl: "Eliminating y via y = 2 - x gives (p² - 3)x = p - 2. When p² ≠ 3 this has the unique solution x = (p - 2)/(p² - 3), y = 2 - x. When p² = 3 (i.e. p = ±√3) the coefficient of x vanishes while the right-hand side p - 2 does not, so no (x, y) works. Hence unique solution exactly when p ≠ ±√3." },
  { letter: "D", ok: false, tex: "p = \\sqrt{3} \\text{ or } p = -\\sqrt{3}", expl: "Inverted: these are the two values that destroy uniqueness, not the ones that give it. At p = ±√3 the eliminated equation becomes 0 · x = p - 2 ≠ 0, which has no solutions." },
  { letter: "E", ok: false, tex: "\\text{all real } p", expl: "Two real values of p break the system: p = ±√3. At these values, substituting y = 2 - x collapses the first equation to 0 · x = p - 2 ≠ 0, leaving no solution. So not every real p gives a unique solution." },
  { letter: "F", ok: false, tex: "\\text{no real } p", expl: "Far too strong. For almost every p (in fact every p other than ±√3) the system does have a unique solution. Try p = 0: the equations become 3y = 4 and x + y = 2, giving y = 4/3, x = 2/3." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }


const ITEMS_Q14 = null;
const OPTIONS_Q14 = [
  ["A", "p \\ne \\sqrt{3}"],
  ["B", "p \\ne -\\sqrt{3}"],
  ["C", "p \\ne \\sqrt{3} \\text{ and } p \\ne -\\sqrt{3}"],
  ["D", "p = \\sqrt{3} \\text{ or } p = -\\sqrt{3}"],
  ["E", "\\text{all real p}"],
  ["F", "\\text{no real p}"]
];
const SECTIONS_Q14 = [
  { type: 'prose', text: (<>Consider the following simultaneous equations, where <Tex>{"p"}</Tex> is a real number:</>) },
  { type: "mathbox", tex: "p^2 x + 3y = p + 4 \\qquad \\text{and} \\qquad x + y = 2" },
  { type: 'prose-tight', text: (<>What is the complete range of values of <Tex>{"p"}</Tex> for which these equations have a unique real solution <Tex>{"(x, y)"}</Tex>?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q14;
  const options = OPTIONS_Q14;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q14</span>
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
  const sections = SECTIONS_Q14;
  const options = OPTIONS_Q14;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4) : maxLen <= 20 ? 3 : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 14</span>
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
        {options.map(([l, v]) => (<div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 280px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>This is a 2×2 linear system in <Tex>{"x"}</Tex> and <Tex>{"y"}</Tex>, with the parameter <Tex>{"p"}</Tex> hiding inside the coefficient of <Tex>{"x"}</Tex> and on the right-hand side of the first equation.</p><p style={{ margin: "0 0 4px" }}>The cleanest route is substitution: the second equation gives <Tex>{"y = 2 - x"}</Tex>. Put that into the first equation to get a single equation in <Tex>{"x"}</Tex>.</p><p style={{ margin: 0 }}>Unique solution means the resulting equation has exactly one value of <Tex>{"x"}</Tex>. The question becomes: when is the coefficient of <Tex>{"x"}</Tex> non-zero?</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>After substituting, you'll get <Tex>{"(p^2 - 3)\\, x = p - 2"}</Tex>. Three scenarios:</p><p style={{ margin: "0 0 4px" }}><b>Case 1:</b> <Tex>{"p^2 - 3 \\ne 0"}</Tex>: unique solution <Tex>{"x = (p-2)/(p^2 - 3)"}</Tex>.</p><p style={{ margin: "0 0 4px" }}><b>Case 2:</b> <Tex>{"p^2 - 3 = 0"}</Tex> AND <Tex>{"p - 2 = 0"}</Tex>: every <Tex>{"x"}</Tex> works, infinitely many solutions.</p><p style={{ margin: 0 }}><b>Case 3:</b> <Tex>{"p^2 - 3 = 0"}</Tex> but <Tex>{"p - 2 \\ne 0"}</Tex>: no solution. This is what happens at <Tex>{"p = \\pm\\sqrt{3}"}</Tex> (since <Tex>{"\\pm\\sqrt{3} \\ne 2"}</Tex>).</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram: show two lines in (x, y) plane for a specific p, and the degeneracy at p = ±√3
  const linesDiagram = (() => {
    const pW = 280, pH = 220;
    const pad = { l: 24, r: 12, t: 14, b: 22 };
    const xMin = -1, xMax = 4, yMin = -1, yMax = 4;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    // At p = √3: line 1 is 3x + 3y = √3 + 4, i.e. x + y = (√3 + 4)/3 ≈ 1.91
    // Line 2 is x + y = 2. These are parallel (both slope -1) but different intercepts → no intersection.
    const int1 = (Math.sqrt(3) + 4) / 3;
    const int2 = 2;
    // Line 1: y = int1 - x; Line 2: y = int2 - x
    // Plot over xMin..xMax
    const line1 = [[xMin, int1 - xMin], [xMax, int1 - xMax]];
    const line2 = [[xMin, int2 - xMin], [xMax, int2 - xMax]];
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="linClip14"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        <FO x={10} y={2} w={pW - 20} hh={14} color={C.fail}><span style={{ fontWeight: 700, fontSize: 11 }}>At <Tex>{"p = \\sqrt{3}"}</Tex>: parallel lines, no intersection</span></FO>
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={0.7} />
        <g clipPath="url(#linClip14)">
          <line x1={sx(line1[0][0])} y1={sy(line1[0][1])} x2={sx(line1[1][0])} y2={sy(line1[1][1])} stroke={C.fail} strokeWidth={2} />
          <line x1={sx(line2[0][0])} y1={sy(line2[0][1])} x2={sx(line2[1][0])} y2={sy(line2[1][1])} stroke={C.ps} strokeWidth={2} />
        </g>
        <FO x={sx(2.8)} y={sy(int1 - 2.8) - 16} w={80} hh={14} color={C.fail}><Tex>{"x+y = \\tfrac{\\sqrt{3}+4}{3}"}</Tex></FO>
        <FO x={sx(0.4)} y={sy(int2 - 0.4) - 16} w={52} hh={14} color={C.ps}><Tex>{"x+y = 2"}</Tex></FO>
        {[1, 2, 3].map(v => <FO key={`tx${v}`} x={sx(v) - 6} y={sy(0) + 3} w={14} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        {[1, 2, 3].map(v => <FO key={`ty${v}`} x={sx(0) - 16} y={sy(v) - 7} w={14} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        <FO x={sx(xMax) - 14} y={sy(0) + 2} w={12} hh={14} color={C.muted}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0) - 6} y={pad.t} w={12} hh={14} color={C.muted}><Tex>{"y"}</Tex></FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "ELIMINATE y VIA SUBSTITUTION", color: C.ps, text: <span>From the second equation, <Tex>{"y = 2 - x"}</Tex>. Substitute into the first equation to get a single equation in <Tex>{"x"}</Tex>.</span>, math: (<><div><Tex>{"p^2 x + 3(2 - x) = p + 4"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"p^2 x - 3x + 6 = p + 4"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(p^2 - 3)\\, x = p - 2"}</Tex></div></>) },
    { label: "WHEN IS THIS UNIQUE?", color: C.ok, text: <span>A linear equation <Tex>{"a\\, x = b"}</Tex> has a unique solution exactly when <Tex>{"a \\ne 0"}</Tex>. Here the coefficient is <Tex>{"p^2 - 3"}</Tex>, so unique solution requires <Tex>{"p^2 \\ne 3"}</Tex>, i.e. <Tex>{"p \\ne \\pm\\sqrt{3}"}</Tex>.</span>, math: (<><div><Tex>{"(p^2 - 3)\\, x = p - 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{unique} \\;\\Leftrightarrow\\; p^2 - 3 \\ne 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Leftrightarrow\\; p \\ne \\pm\\sqrt{3}"}</Tex></div></>) },
    { label: "CHECK THE BAD VALUES p = ±√3", color: C.fail, text: <span>At <Tex>{"p = \\sqrt{3}"}</Tex>: the coefficient becomes <Tex>{"0"}</Tex>, and the right-hand side is <Tex>{"\\sqrt{3} - 2 \\ne 0"}</Tex>. So the equation reads <Tex>{"0 \\cdot x = \\sqrt{3} - 2"}</Tex>, which has NO solution. Same story at <Tex>{"p = -\\sqrt{3}"}</Tex>: <Tex>{"0 \\cdot x = -\\sqrt{3} - 2 \\ne 0"}</Tex>, no solution. Geometrically, the two lines are parallel but not coincident.</span>, math: (<><div><Tex>{"p = \\sqrt{3}:\\quad 0 \\cdot x = \\sqrt{3} - 2 \\ne 0"}</Tex></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{\\Rightarrow \\text{no solution}}"}</Tex></div><div style={{ marginTop: 8 }}><Tex>{"p = -\\sqrt{3}:\\quad 0 \\cdot x = -\\sqrt{3} - 2 \\ne 0"}</Tex></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{\\Rightarrow \\text{no solution}}"}</Tex></div></>), diagram: linesDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>The system has a unique solution exactly when <Tex>{"p \\ne \\pm\\sqrt{3}"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{p \\ne \\sqrt{3} \\text{ and } p \\ne -\\sqrt{3}}"}</Tex></div>), conclusion: <span>The answer is C: <Tex>{"p \\ne \\sqrt{3}"}</Tex> and <Tex>{"p \\ne -\\sqrt{3}"}</Tex>.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 280px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [p, setP] = useState(0);
  const [sawUniqueNormal, setSawUniqueNormal] = useState(false);  // saw unique solution at p far from ±√3
  const [sawFailPos, setSawFailPos] = useState(false);            // saw no-solution at p = √3
  const [sawFailNeg, setSawFailNeg] = useState(false);            // saw no-solution at p = -√3
  const sqrt3 = Math.sqrt(3);
  // Snap near ±√3 so users can land on the critical values
  const snap = [-sqrt3, -1, 0, 1, sqrt3, 2];
  const snapRadius = 0.06;
  const handleSnap = (raw) => { for (const s of snap) { if (Math.abs(raw - s) < snapRadius) return s; } return Math.round(raw * 50) / 50; };

  // Compute status
  const coefX = p * p - 3;
  const rhs = p - 2;
  const unique = Math.abs(coefX) > 1e-9;
  // Solution when unique:
  const xSol = unique ? rhs / coefX : null;
  const ySol = unique ? 2 - xSol : null;

  useEffect(() => {
    if (unique && Math.abs(p - sqrt3) > 0.02 && Math.abs(p + sqrt3) > 0.02) setSawUniqueNormal(true);
    if (!unique && p > 0) setSawFailPos(true);
    if (!unique && p < 0) setSawFailNeg(true);
  }, [p]);
  const allDemonstrated = sawUniqueNormal && sawFailPos && sawFailNeg;

  // Plot: two lines in (x, y) plane
  const graph = (() => {
    const pW = 380, pH = 260;
    const pad = { l: 28, r: 16, t: 16, b: 22 };
    const xMin = -2, xMax = 5, yMin = -2, yMax = 5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    // Line 1: p^2 x + 3y = p + 4 → y = (p + 4 - p^2 x) / 3
    const line1 = (x) => (p + 4 - p * p * x) / 3;
    // Line 2: x + y = 2 → y = 2 - x
    const line2 = (x) => 2 - x;
    const gridLines = [];
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) { if (x === 0) continue; gridLines.push(<line key={`gx${x}`} x1={sx(x)} y1={sy(yMax)} x2={sx(x)} y2={sy(yMin)} stroke={C.border} strokeWidth={0.4} />); }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) { if (y === 0) continue; gridLines.push(<line key={`gy${y}`} x1={sx(xMin)} y1={sy(y)} x2={sx(xMax)} y2={sy(y)} stroke={C.border} strokeWidth={0.4} />); }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="vgc14"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        {gridLines}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        {[-1, 1, 2, 3, 4].map(v => <FO key={`tx${v}`} x={sx(v) - 8} y={sy(0) + 2} w={16} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        {[-1, 1, 2, 3, 4].map(v => <FO key={`ty${v}`} x={sx(0) - 18} y={sy(v) - 7} w={14} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        <g clipPath="url(#vgc14)">
          {/* Line 1 (depends on p) */}
          <line x1={sx(xMin)} y1={sy(line1(xMin))} x2={sx(xMax)} y2={sy(line1(xMax))} stroke={C.fail} strokeWidth={2} />
          {/* Line 2 (fixed) */}
          <line x1={sx(xMin)} y1={sy(line2(xMin))} x2={sx(xMax)} y2={sy(line2(xMax))} stroke={C.ps} strokeWidth={2} />
          {/* Intersection point if unique */}
          {unique && Math.abs(xSol) < 20 && Math.abs(ySol) < 20 && (
            <circle cx={sx(xSol)} cy={sy(ySol)} r={6} fill={C.ok} stroke={C.white} strokeWidth={1.5} />
          )}
        </g>
        {/* Labels */}
        <FO x={sx(3.2)} y={sy(line1(3.2)) - 16} w={84} hh={14} color={C.fail}><Tex>{"p^2 x + 3y = p + 4"}</Tex></FO>
        <FO x={sx(3.5)} y={sy(line2(3.5)) + 4} w={60} hh={14} color={C.ps}><Tex>{"x + y = 2"}</Tex></FO>
        {unique && Math.abs(xSol) < 20 && Math.abs(ySol) < 20 && (
          <FO x={sx(xSol) + 8} y={sy(ySol) - 16} w={70} hh={14} color={C.ok}><Tex>{`(${fmt(xSol, 2)}, ${fmt(ySol, 2)})`}</Tex></FO>
        )}
        <FO x={sx(xMax) - 14} y={sy(0) + 2} w={12} hh={14} color={C.muted}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0) - 6} y={pad.t} w={12} hh={14} color={C.muted}><Tex>{"y"}</Tex></FO>
      </svg>
    );
  })();

  const presets = [
    { val: -sqrt3, label: "-\\sqrt{3}" },
    { val: -1, label: "-1" },
    { val: 0, label: "0" },
    { val: 1, label: "1" },
    { val: sqrt3, label: "\\sqrt{3}" },
    { val: 2, label: "2" },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"p"}</Tex></span>
          <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`p = ${fmt(p, 2)}`}</Tex></span>
        </div>
        <input type="range" min={-2.5} max={2.5} step={0.02} value={p} onChange={e => setP(handleSnap(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map((pr, i) => { const active = Math.abs(p - pr.val) < 0.03; return (<button key={i} onClick={() => setP(pr.val)} style={{ flex: 1, padding: "5px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 500 }}><Tex>{`p = ${pr.label}`}</Tex></button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}>coefficient</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.calc, marginTop: 2 }}><Tex>{`p^2 - 3 = ${fmt(coefX, 2)}`}</Tex></div>
            <div style={{ fontSize: 11, color: Math.abs(coefX) > 0.01 ? C.ok : C.fail, marginTop: 2 }}>{Math.abs(coefX) > 0.01 ? "non-zero ✓" : "ZERO ✗"}</div>
          </div>
          <div style={{ background: unique ? C.conclBg : C.failBg, border: `1px solid ${(unique ? C.ok : C.fail) + "66"}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: unique ? C.ok : C.fail, fontWeight: 700 }}>unique solution?</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: unique ? C.ok : C.fail }}>{unique ? "YES" : "NO"}</div>
          </div>
        </div>
      </div>
      {unique ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ok, lineHeight: 1.5 }}>For <Tex>{`p = ${fmt(p, 2)}`}</Tex> the lines meet at <Tex>{`(${fmt(xSol, 2)}, ${fmt(ySol, 2)})`}</Tex>.</div>
          <div style={{ fontSize: 12, color: C.ok, marginTop: 2 }}>The coefficient <Tex>{`p^2 - 3 = ${fmt(coefX, 2)}`}</Tex> is non-zero, so the reduced equation has exactly one <Tex>{"x"}</Tex>.</div>
        </div>
      ) : (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, color: C.fail, fontWeight: 700, marginBottom: 2 }}>At <Tex>{`p = ${fmt(p, 2)}`}</Tex> the coefficient <Tex>{"p^2 - 3"}</Tex> is zero.</div>
          <div style={{ fontSize: 12, color: C.fail, lineHeight: 1.5 }}>The reduced equation reads <Tex>{`0 \\cdot x = ${fmt(rhs, 2)}`}</Tex>, which has no solution. Geometrically, the two lines are parallel but distinct.</div>
        </div>
      )}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawUniqueNormal ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawUniqueNormal} />
            <span style={{ fontWeight: sawUniqueNormal ? 700 : 500 }}>Saw a unique solution at some <Tex>{"p \\ne \\pm\\sqrt{3}"}</Tex>.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawFailPos ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawFailPos} />
            <span style={{ fontWeight: sawFailPos ? 700 : 500 }}>Saw no solution at <Tex>{"p = \\sqrt{3}"}</Tex>.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawFailNeg ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawFailNeg} />
            <span style={{ fontWeight: sawFailNeg ? 700 : 500 }}>Saw no solution at <Tex>{"p = -\\sqrt{3}"}</Tex>.</span>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>Uniqueness depends entirely on whether the coefficient <Tex>{"p^2 - 3"}</Tex> is non-zero. The only real values that zero it out are <Tex>{"p = \\pm\\sqrt{3}"}</Tex>, and at both of those the right-hand side <Tex>{"p - 2"}</Tex> is still non-zero, so the system collapses to <Tex>{"0 \\cdot x = \\text{non-zero}"}</Tex>: impossible.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is C: <Tex>{"p \\ne \\sqrt{3}"}</Tex> and <Tex>{"p \\ne -\\sqrt{3}"}</Tex>.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Try the <Tex>{"\\pm\\sqrt{3}"}</Tex> presets and also a generic value (like <Tex>{"p = 0"}</Tex> or <Tex>{"p = 1"}</Tex>) to demonstrate both regimes.
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
