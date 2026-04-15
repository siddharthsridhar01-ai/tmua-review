"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 20, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Functions / Completing the Square" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\dfrac{9}{4}", expl: "You might get 9/4 by computing (f(x))^2 + f(x) at only the endpoints f = 2 and f = \u22122 without checking for a minimum in between." },
  { letter: "B", ok: false, tex: "4", expl: "You might get 4 by computing g(2) \u2212 g(\u22122) = 6 \u2212 2 = 4, using the values at the endpoints but not checking the turning point." },
  { letter: "C", ok: false, tex: "\\dfrac{17}{4}", expl: "You might get 17/4 by finding the correct minimum \u22121/4 but computing max \u2212 min as 4 \u2212 (\u22121/4) = 17/4, using g(\u22122) = 2 instead of g(2) = 6." },
  { letter: "D", ok: false, tex: "6", expl: "You might get 6 by computing only the maximum g(2) = 6 and assuming the minimum is 0, giving 6 \u2212 0 = 6." },
  { letter: "E", ok: true, tex: "\\dfrac{25}{4}", expl: "Let u = f(x) \u2208 [\u22122, 2]. Then g(u) = u\u00B2 + u = (u + 1/2)\u00B2 \u2212 1/4. Min at u = \u22121/2: g = \u22121/4. Max at u = 2: g = 6. Difference = 6 \u2212 (\u22121/4) = 25/4." },
  { letter: "F", ok: false, tex: "8", expl: "You might get 8 by computing g(2) \u2212 g(\u22122) = 6 \u2212 (\u22122) = 8, but g(\u22122) = 4 \u2212 2 = 2, not \u22122." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

function QuestionSummary() { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}><p style={{ margin: "0 0 4px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}><span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q20</span>The graph of <Tex>{"y = f(x)"}</Tex> is a continuous curve. The function <Tex>{"f"}</Tex> attains its maximum value of <Tex>{"2"}</Tex> at <Tex>{"x = 1"}</Tex>, and its minimum value of <Tex>{"-2"}</Tex> at <Tex>{"x = -1"}</Tex>. Find the difference between the maximum and minimum values of <Tex>{"(f(x))^2 + f(x)"}</Tex>.</p><div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>{[["A","\\frac{9}{4}"],["B","4"],["C","\\frac{17}{4}"],["D","6"],["E","\\frac{25}{4}"],["F","8"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}</div></div>); }
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() { return (<div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 20</span></div><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The graph of <Tex>{"y = f(x)"}</Tex> is a continuous curve. The function <Tex>{"f"}</Tex> attains its maximum value of <Tex>{"2"}</Tex> at <Tex>{"x = 1"}</Tex>, and its minimum value of <Tex>{"-2"}</Tex> at <Tex>{"x = -1"}</Tex>.</p><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Find the difference between the maximum and minimum values of</p><MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"(f(x))^2 + f(x)"}</Tex></MathBox></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>{opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}</div></div>); }

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Since <Tex>{"f"}</Tex> is continuous with range <Tex>{"[-2, 2]"}</Tex>, let <Tex>{"u = f(x)"}</Tex> and study <Tex>{"g(u) = u^2 + u"}</Tex> on <Tex>{"[-2, 2]"}</Tex>. By the intermediate value theorem, <Tex>{"f"}</Tex> takes every value in <Tex>{"[-2, 2]"}</Tex>, so we need the max and min of <Tex>{"g"}</Tex> on this interval.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}><Tex>{"g(u) = u^2 + u = (u + \\tfrac{1}{2})^2 - \\tfrac{1}{4}"}</Tex> is a parabola in <Tex>{"u"}</Tex> with vertex at <Tex>{"u = -\\tfrac{1}{2}"}</Tex>.</p><p style={{ margin: 0 }}>Check the vertex and both endpoints of <Tex>{"[-2, 2]"}</Tex> to find the global max and min.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const solveDiagram = (() => {
    const pW = 260, pad = { l: 28, r: 8, t: 12, b: 20 };
    const gW = pW - pad.l - pad.r;
    const xMin = -2.5, xMax = 2.5, yMin = -1, yMax = 7;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const pH = 180;
    const gH = pH - pad.t - pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;
    const g = (u) => u * u + u;
    const pts = [];
    for (let i = 0; i <= 60; i++) { const u = -2 + (i / 60) * 4; pts.push(`${sx(u)},${sy(g(u))}`); }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="solvClip20"><rect x={pad.l} y={pad.t} width={gW} height={gH} /></clipPath></defs>
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.5} />
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.5} />
        <g clipPath="url(#solvClip20)">
          <polyline points={pts.join(" ")} fill="none" stroke={C.ps} strokeWidth={2} />
          <line x1={pad.l} y1={sy(6)} x2={pW - pad.r} y2={sy(6)} stroke={C.ok} strokeWidth={1} strokeDasharray="3,2" />
          <line x1={pad.l} y1={sy(-0.25)} x2={pW - pad.r} y2={sy(-0.25)} stroke={C.fail} strokeWidth={1} strokeDasharray="3,2" />
        </g>
        <circle cx={sx(2)} cy={sy(6)} r={3} fill={C.ok} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(-0.5)} cy={sy(-0.25)} r={3} fill={C.fail} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(-2)} cy={sy(2)} r={3} fill={C.muted} stroke={C.white} strokeWidth={1} />
        <foreignObject x={sx(2) + 4} y={sy(6) - 4 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "left", lineHeight: 1 }}><Tex>{"6"}</Tex></div></foreignObject>
        <foreignObject x={sx(-0.5) + 6} y={sy(-0.25) + 12 - 12} width={80} height={18}><div style={{ fontSize: 11, color: C.fail, textAlign: "left", lineHeight: 1, fontFamily: mathFont, fontWeight: 400, fontStyle: "normal" }}>{"-\u00BC"}</div></foreignObject>
        <foreignObject x={sx(-2) - 4 - 50} y={sy(2) - 4 - 12} width={52} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1 }}><Tex>{"2"}</Tex></div></foreignObject>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Let <Tex>{"u = f(x)"}</Tex>. Since <Tex>{"f"}</Tex> is continuous with range <Tex>{"[-2, 2]"}</Tex>, find the max and min of <Tex>{"g(u) = u^2 + u"}</Tex> on <Tex>{"[-2, 2]"}</Tex>.</span>, math: (<div><Tex>{"g(u) = u^2 + u \\text{ on } [-2, 2]"}</Tex></div>) },
    { label: "COMPLETE THE SQUARE", color: C.calc, text: <span>Write <Tex>{"g(u)"}</Tex> in vertex form to find its turning point.</span>, math: (<><div><Tex>{"g(u) = u^2 + u = \\left(u + \\tfrac{1}{2}\\right)^2 - \\tfrac{1}{4}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Vertex at } u = -\\tfrac{1}{2}, \\quad g = -\\tfrac{1}{4}"}</Tex></div></>) },
    { label: "EVALUATE AT CRITICAL POINTS", color: C.calc, text: <span>Check the vertex and both endpoints of the interval <Tex>{"[-2, 2]"}</Tex>.</span>, math: (<><div><Tex>{"g(-\\tfrac{1}{2}) = \\tfrac{1}{4} - \\tfrac{1}{2} = -\\tfrac{1}{4}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"g(-2) = 4 - 2 = 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"g(2) = 4 + 2 = 6"}</Tex></div></>), diagram: solveDiagram },
    { label: "IDENTIFY MAX AND MIN", color: C.calc, text: <span>The vertex <Tex>{"u = -1/2"}</Tex> is inside <Tex>{"[-2, 2]"}</Tex>, so by IVT there exists <Tex>{"x"}</Tex> with <Tex>{"f(x) = -1/2"}</Tex>.</span>, math: (<><div><Tex>{"\\text{Max } g = 6 \\text{ (at } u = 2\\text{)}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Min } g = -\\tfrac{1}{4} \\text{ (at } u = -\\tfrac{1}{2}\\text{)}"}</Tex></div></>) },
    { label: "COMPUTE THE DIFFERENCE", color: C.calc, text: <span>Subtract the minimum from the maximum.</span>, math: (<><div><Tex>{"6 - \\left(-\\tfrac{1}{4}\\right) = 6 + \\tfrac{1}{4} = \\frac{25}{4}"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>The difference between the maximum and minimum of <Tex>{"(f(x))^2 + f(x)"}</Tex> is <Tex>{"\\frac{25}{4}"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\frac{25}{4} = 6.25}"}</Tex></div>), conclusion: <span>The answer is E: <Tex>{"\\frac{25}{4}"}</Tex>.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Graph + panels verify for this algebraic question
  const g = (u) => u * u + u;

  const graph = (() => {
    const pW = 540, pad = { l: 44, r: 56, t: 16, b: 28 };
    const gW2 = pW - pad.l - pad.r;
    const xMin = -2.8, xMax = 2.8, yMin = -1.5, yMax = 7;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const pH = 260;
    const gH = pH - pad.t - pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW2;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;

    const pts = [];
    for (let i = 0; i <= 100; i++) { const u = -2.5 + (i / 100) * 5; pts.push(`${sx(u)},${sy(g(u))}`); }

    const FO = ({ x, y, w, hh, color, align, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="plotArea20"><rect x={pad.l} y={pad.t} width={gW2} height={gH} /></clipPath></defs>
        {[-2, -1, 0, 1, 2].map(x => <line key={"gx" + x} x1={sx(x)} y1={pad.t} x2={sx(x)} y2={pad.t + gH} stroke={C.border} strokeWidth={0.3} />)}
        {[0, 2, 4, 6].map(y => <line key={"gy" + y} x1={pad.l} y1={sy(y)} x2={pad.l + gW2} y2={sy(y)} stroke={C.border} strokeWidth={0.3} />)}
        <line x1={pad.l} y1={sy(0)} x2={pad.l + gW2} y2={sy(0)} stroke={C.muted} strokeWidth={0.8} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pad.t + gH} stroke={C.muted} strokeWidth={0.8} />
        {/* Domain shading [-2, 2] */}
        <rect x={sx(-2)} y={pad.t} width={sx(2) - sx(-2)} height={gH} fill={C.ps + "08"} />
        <line x1={sx(-2)} y1={pad.t} x2={sx(-2)} y2={pad.t + gH} stroke={C.ps} strokeWidth={1} strokeDasharray="3,2" />
        <line x1={sx(2)} y1={pad.t} x2={sx(2)} y2={pad.t + gH} stroke={C.ps} strokeWidth={1} strokeDasharray="3,2" />
        <g clipPath="url(#plotArea20)">
          <polyline points={pts.join(" ")} fill="none" stroke={C.ps} strokeWidth={2.5} />
          {/* Max line */}
          <line x1={sx(-2)} y1={sy(6)} x2={sx(2)} y2={sy(6)} stroke={C.ok} strokeWidth={1.5} strokeDasharray="4,3" />
          {/* Min line */}
          <line x1={sx(-2)} y1={sy(-0.25)} x2={sx(2)} y2={sy(-0.25)} stroke={C.fail} strokeWidth={1.5} strokeDasharray="4,3" />
        </g>
        {/* Key points */}
        <circle cx={sx(2)} cy={sy(6)} r={5} fill={C.ok} stroke={C.white} strokeWidth={1.5} />
        <circle cx={sx(-0.5)} cy={sy(-0.25)} r={5} fill={C.fail} stroke={C.white} strokeWidth={1.5} />
        <circle cx={sx(-2)} cy={sy(2)} r={4} fill={C.muted} stroke={C.white} strokeWidth={1} />
        {/* Labels */}
        <FO x={sx(2) - 54} y={sy(6) - 14} w={52} hh={16} color={C.ok} bg><Tex>{"(2,\\,6)"}</Tex></FO>
        <FO x={sx(-0.5) + 6} y={sy(-0.25) + 4} w={72} hh={16} color={C.fail} bg><Tex>{"(-\\frac{1}{2},\\,-\\frac{1}{4})"}</Tex></FO>
        <FO x={sx(-2) - 50} y={sy(2) - 8} w={48} hh={16} color={C.muted} bg><Tex>{"(-2,\\,2)"}</Tex></FO>
        {/* Axis label */}
        <FO x={sx(2.3)} y={sy(0) + 4} w={20} hh={16} color={C.muted}><Tex>{"u"}</Tex></FO>
        <FO x={sx(0) + 4} y={pad.t - 2} w={30} hh={16} color={C.muted}><Tex>{"g(u)"}</Tex></FO>
        {/* Difference bracket */}
        <line x1={pad.l + gW2 + 12} y1={sy(6)} x2={pad.l + gW2 + 12} y2={sy(-0.25)} stroke={C.calc} strokeWidth={2} />
        <line x1={pad.l + gW2 + 8} y1={sy(6)} x2={pad.l + gW2 + 16} y2={sy(6)} stroke={C.calc} strokeWidth={2} />
        <line x1={pad.l + gW2 + 8} y1={sy(-0.25)} x2={pad.l + gW2 + 16} y2={sy(-0.25)} stroke={C.calc} strokeWidth={2} />
        <FO x={pad.l + gW2 + 18} y={(sy(6) + sy(-0.25)) / 2 - 8} w={36} hh={16} color={C.calc} bg><Tex>{"\\frac{25}{4}"}</Tex></FO>
        {/* Ticks */}
        {[-2, -1, 0, 1, 2].map(x => <FO key={"x" + x} x={sx(x) - 10} y={pad.t + gH + 2} w={20} hh={18}><Tex>{String(x)}</Tex></FO>)}
        {[0, 2, 4, 6].map(y => <FO key={"y" + y} x={0} y={sy(y) - 9} w={pad.l - 6} hh={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 1 }}>Max <Tex>{"g"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok }}><Tex>{"6"}</Tex></div>
          <div style={{ fontSize: 11, color: C.muted }}>at <Tex>{"u = 2"}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.fail}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.fail, fontWeight: 700, marginBottom: 1 }}>Min <Tex>{"g"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.fail }}><Tex>{"-\\tfrac{1}{4}"}</Tex></div>
          <div style={{ fontSize: 11, color: C.muted }}>at <Tex>{"u = -\\tfrac{1}{2}"}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 1 }}>Difference</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{"\\tfrac{25}{4}"}</Tex></div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>Max <Tex>{"g = 6"}</Tex> at <Tex>{"u = 2"}</Tex>, min <Tex>{"g = -\\tfrac{1}{4}"}</Tex> at <Tex>{"u = -\\tfrac{1}{2}"}</Tex>. Difference = <Tex>{"\\tfrac{25}{4}"}</Tex>. The answer is E.</span>
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
        <div style={{ marginBottom: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: 1 }}>TMUA</span><span style={{ fontSize: 12, color: C.muted }}>{META.paper}</span><span style={{ fontSize: 12, color: C.muted }}>{"\u00B7"}</span><span style={{ fontSize: 12, color: C.ps }}>{META.topicTag}</span></div><h1 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: titleFont, fontStyle: "italic", letterSpacing: 0.5 }}>Interactive Walkthrough</h1><p style={{ fontSize: 12, color: C.muted, margin: 0 }}>TMUA {META.year} {"\u00B7"} {META.paper} {"\u00B7"} Question {META.questionNumber}</p></div>
        <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>{stepsMeta.map(s => (<button key={s.id} onClick={() => setStep(s.id)} style={{ flex: 1, minWidth: 0, background: step === s.id ? C.accent : step > s.id ? "rgba(108,92,231,0.15)" : "#1e2030", border: `1px solid ${step === s.id ? C.accent : step > s.id ? C.accent + "44" : C.border}`, borderRadius: 9, padding: "8px 3px", cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}><span style={{ fontSize: 13, fontWeight: 700, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted }}>{s.id + 1}</span><span style={{ fontSize: 11, fontWeight: step === s.id ? 700 : 500, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted, whiteSpace: "nowrap" }}>{s.label}</span></button>))}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><span style={{ background: C.accent, borderRadius: 6, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.white }}>{step + 1}</span><h2 style={{ fontSize: 16, fontWeight: 700, color: C.white, margin: 0 }}>{stepsMeta[step].title}</h2></div>
        {step === 0 && <ReadStep />}
        {step === 1 && <SetupStep />}
        {step === 2 && <SolveStepContent revealed={revealed} setRevealed={setRevealed} />}
        {step === 3 && <VerifyStepContent />}
        {step === 4 && (<div><QuestionSummary /><div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>{opts.map((o, i) => (<OptionCard key={o.letter} o={o} expanded={expanded === i} animate={optAnim[i]} onClick={() => setExpanded(expanded === i ? null : i)} />))}</div></div>)}
        <div style={{ display: "flex", gap: 10, marginTop: 20, paddingBottom: 28 }}><button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: `1px solid ${C.border}`, background: step === 0 ? C.card : "#1e2030", color: step === 0 ? C.muted : C.text, fontSize: 14, fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer", opacity: step === 0 ? 0.4 : 1 }}>{"\u2190"} Previous</button>{step < 4 ? (<button onClick={() => setStep(step + 1)} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Next {"\u2192"}</button>) : (<button style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.ok},#2ecc71)`, color: C.white, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Complete</button>)}</div>
      </div>
    </div>
  );
}
