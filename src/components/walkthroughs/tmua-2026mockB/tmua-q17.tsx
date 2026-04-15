"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 17, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Trigonometry / Ambiguous Case" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "1 < x < 3", expl: "You might get this by finding the condition a > b sin A (giving x > 3) but then inverting the inequality, or by only requiring both sides positive without the ambiguous case conditions." },
  { letter: "B", ok: false, tex: "1 < x < 4", expl: "You might get this by finding the condition a < b (giving x < 4) and a > 0 (giving x > 1), but forgetting the additional condition a > b sin 30\u00B0 which requires x > 3." },
  { letter: "C", ok: false, tex: "1 < x < 5", expl: "You might get this by only requiring both sides to be positive (x > 1 and \u2212x\u00B2 + 6x \u2212 5 > 0), without applying the ambiguous case conditions." },
  { letter: "D", ok: true, tex: "3 < x < 4", expl: "Two non-congruent triangles require: (1) both sides positive: 1 < x < 5, (2) opposite < adjacent: x < 4, (3) opposite > adjacent \u00D7 sin 30\u00B0: x > 3. The intersection is 3 < x < 4." },
  { letter: "E", ok: false, tex: "3 < x < 5", expl: "You might get this by finding x > 3 from a > b sin A and 1 < x < 5 from positivity, but missing the condition a < b which gives x < 4." },
  { letter: "F", ok: false, tex: "4 < x < 5", expl: "You might get this by confusing which side is opposite and which is adjacent, or by reversing the a < b inequality." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

function QuestionSummary() { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}><p style={{ margin: "0 0 4px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}><span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q17</span>A triangle has one angle of <Tex>{"30^\\circ"}</Tex>. The sides are: opposite = <Tex>{"x - 1"}</Tex>, adjacent = <Tex>{"-x^2 + 6x - 5"}</Tex>. Find the complete set of values of <Tex>{"x"}</Tex> for which there are two non-congruent triangles.</p><div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>{[["A","1<x<3"],["B","1<x<4"],["C","1<x<5"],["D","3<x<4"],["E","3<x<5"],["F","4<x<5"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}</div></div>); }
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() { return (<div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 17</span></div><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The following diagram shows a triangle with one angle of <Tex>{"30"}</Tex> degrees. The sides are as shown:</p><MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"\\text{angle } 30^\\circ, \\quad \\text{opposite} = x - 1, \\quad \\text{adjacent} = -x^2 + 6x - 5"}</Tex></MathBox><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 0" }}>Find the complete set of values of <Tex>{"x"}</Tex> for which there are two non-congruent triangles with the side lengths and angle as shown.</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>{opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}</div></div>); }

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>This is the ambiguous case of the sine rule. Given angle <Tex>{"A"}</Tex>, the side opposite it (<Tex>{"a"}</Tex>), and the side next to it (<Tex>{"b"}</Tex>), two distinct triangles exist when <Tex>{"b \\sin A < a < b"}</Tex>. Also require both sides positive.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Let <Tex>{"a = x - 1"}</Tex> (the side opposite the <Tex>{"30^\\circ"}</Tex> angle) and <Tex>{"b = -x^2 + 6x - 5"}</Tex> (the side next to it), <Tex>{"A = 30^\\circ"}</Tex>.</p><p style={{ margin: 0 }}>Three conditions: (1) <Tex>{"a > 0"}</Tex> and <Tex>{"b > 0"}</Tex>, (2) <Tex>{"a < b"}</Tex>, (3) <Tex>{"a > b \\sin 30^\\circ = b/2"}</Tex>.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Find where all three conditions are simultaneously satisfied: both sides positive, <Tex>{"a < b"}</Tex>, and <Tex>{"a > b \\sin 30^\\circ"}</Tex>.</span>, math: (<div><Tex>{"b \\sin A < a < b"}</Tex></div>) },
    { label: "CONDITION 1: SIDES POSITIVE", color: C.calc, text: <span>Both side lengths must be strictly positive.</span>, math: (<><div><Tex>{"a = x - 1 > 0 \\;\\Rightarrow\\; x > 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"b = -x^2 + 6x - 5 > 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 - 6x + 5 < 0 \\;\\Rightarrow\\; (x-1)(x-5) < 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow\\; 1 < x < 5"}</Tex></div></>) },
    { label: "CONDITION 2: a < b", color: C.calc, text: <span>The side opposite the <Tex>{"30^\\circ"}</Tex> angle must be shorter than the other given side, otherwise the arc centred at B with radius <Tex>{"a"}</Tex> can only cross the ray from A once (or not at all), giving at most one triangle.</span>, math: (<><div><Tex>{"x - 1 < -x^2 + 6x - 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 - 5x + 4 < 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(x - 1)(x - 4) < 0 \\;\\Rightarrow\\; 1 < x < 4"}</Tex></div></>) },
    { label: "CONDITION 3: a > b sin 30\u00B0", color: C.calc, text: <span>The opposite side must be longer than the "height" <Tex>{"b \\sin A"}</Tex>, otherwise no triangle exists.</span>, math: (<><div><Tex>{"x - 1 > (-x^2 + 6x - 5) \\times \\tfrac{1}{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"2(x - 1) > -x^2 + 6x - 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"2x - 2 > -x^2 + 6x - 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 - 4x + 3 > 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(x - 1)(x - 3) > 0 \\;\\Rightarrow\\; x < 1 \\text{ or } x > 3"}</Tex></div></>) },
    { label: "INTERSECT ALL CONDITIONS", color: C.calc, text: <span>Combine: <Tex>{"1 < x < 5"}</Tex> (positivity), <Tex>{"1 < x < 4"}</Tex> (<Tex>{"a"}</Tex> {"<"} <Tex>{"b"}</Tex>), and <Tex>{"x > 3"}</Tex> (above height).</span>, math: (<><div><Tex>{"(1 < x < 5) \\;\\cap\\; (1 < x < 4) \\;\\cap\\; (x > 3)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 3 < x < 4"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>Two non-congruent triangles exist when <Tex>{"3 < x < 4"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{3 < x < 4}"}</Tex></div>), conclusion: <span>The answer is D: <Tex>{"3 < x < 4"}</Tex>.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [xVal, setXVal] = useState(3.5);
  const snapPoints = [1, 2, 3, 3.5, 4, 5];
  const snapRadius = 0.12;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return Math.round(raw * 10) / 10; };

  const a = xVal - 1;
  const b = -xVal * xVal + 6 * xVal - 5;
  const bSinA = b * 0.5;
  const cond1 = a > 0 && b > 0;
  const cond2 = a < b;
  const cond3 = a > bSinA;
  const twoTriangles = cond1 && cond2 && cond3;

  const isInRange = xVal > 3 && xVal < 4;
  const col = isInRange ? C.ok : C.ps;

  const presets = [
    { label: "x2", jsx: <span><Tex>{"x = 2"}</Tex></span>, val: 2 },
    { label: "x35", jsx: <span><Tex>{"x = 3.5"}</Tex></span>, val: 3.5 },
    { label: "x45", jsx: <span><Tex>{"x = 4.5"}</Tex></span>, val: 4.5 },
  ];

  // Triangle diagram showing ambiguous case with locus arc
  const triDiagram = (() => {
    const pW = 500, pH = 210;
    const pad = { l: 50, r: 50, t: 20, b: 36 };
    const drawW = pW - pad.l - pad.r;
    const drawH = pH - pad.t - pad.b;

    if (a <= 0 || b <= 0) {
      // Show placeholder when sides are invalid
      const FO2 = ({ x, y, w, hh, color, children }) => (
        <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
          <div style={{ fontSize: 13, color: color || C.fail, textAlign: "center", lineHeight: 1.4 }}>{children}</div>
        </foreignObject>
      );
      return (
        <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
          <FO2 x={pW / 2 - 100} y={pH / 2 - 16} w={200} hh={32} color={C.fail}>
            {a <= 0 && b <= 0 ? <Tex>{"a \\le 0 \\text{ and } b \\le 0"}</Tex> : a <= 0 ? <Tex>{"a = x-1 \\le 0"}</Tex> : <Tex>{"b = -x^2+6x-5 \\le 0"}</Tex>}
          </FO2>
          <FO2 x={pW / 2 - 60} y={pH / 2 + 10} w={120} hh={20} color={C.muted}>No valid triangle</FO2>
        </svg>
      );
    }

    const angleRad = Math.PI / 6;
    // Scale: fit the larger of a and b into the drawing width, leaving room for the arc above
    const maxExtent = Math.max(b, a + b * 0.5, 3);
    const scale = drawW / (maxExtent * 1.4);
    const Ax = pad.l, Ay = pH - pad.b;
    const Bx = Ax + b * scale, By = Ay;

    // Ray from A at 30 degrees
    const rayEndX = Ax + drawW * 1.1 * Math.cos(angleRad);
    const rayEndY = Ay - drawW * 1.1 * Math.sin(angleRad);

    // Arc of radius a centred at B
    const arcPts = [];
    for (let i = 0; i <= 80; i++) {
      const ang = (i / 80) * Math.PI;
      arcPts.push(`${Bx + a * scale * Math.cos(ang)},${By - a * scale * Math.sin(ang)}`);
    }

    // Intersections of arc with ray
    const rdx = Math.cos(angleRad), rdy = -Math.sin(angleRad);
    const exx = Ax - Bx, eyy = Ay - By;
    const qa = 1, qbb = 2 * (exx * rdx + eyy * rdy);
    const qcc = exx * exx + eyy * eyy - (a * scale) * (a * scale);
    const disc = qbb * qbb - 4 * qa * qcc;
    let C1x = null, C1y = null, C2x = null, C2y = null, numInt = 0;
    if (disc >= 0) {
      const t1 = (-qbb + Math.sqrt(Math.max(0, disc))) / 2;
      const t2 = (-qbb - Math.sqrt(Math.max(0, disc))) / 2;
      if (t1 > 3) { C1x = Ax + t1 * rdx; C1y = Ay + t1 * rdy; numInt++; }
      if (t2 > 3 && Math.abs(t1 - t2) > 1) { C2x = Ax + t2 * rdx; C2y = Ay + t2 * rdy; numInt++; }
    }
    const twoTris = numInt === 2;
    const oneTri = numInt === 1;
    const triCol = twoTris ? C.ok : oneTri ? C.ps : C.fail;

    // Perpendicular foot from B to ray (this IS the height h = b*sin30)
    const tFoot = (Bx - Ax) * rdx + (By - Ay) * rdy;
    const Fx = Ax + tFoot * rdx, Fy = Ay + tFoot * rdy;

    const FO = ({ x, y, w, hh, color, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="triClip"><rect x={0} y={0} width={pW} height={pH} /></clipPath></defs>
        <g clipPath="url(#triClip)">
          <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke={C.ps} strokeWidth={2} />
          <line x1={Ax} y1={Ay} x2={rayEndX} y2={rayEndY} stroke={C.muted} strokeWidth={1} strokeDasharray="4,3" />
          <polyline points={arcPts.join(" ")} fill="none" stroke={C.calc} strokeWidth={1.5} strokeDasharray="3,2" />
          <line x1={Bx} y1={By} x2={Fx} y2={Fy} stroke={C.assum} strokeWidth={1} strokeDasharray="2,2" />
          {C1x !== null && <polygon points={`${Ax},${Ay} ${Bx},${By} ${C1x},${C1y}`} fill={triCol + "12"} stroke={triCol} strokeWidth={2} />}
          {C2x !== null && <polygon points={`${Ax},${Ay} ${Bx},${By} ${C2x},${C2y}`} fill={C.assum + "08"} stroke={C.assum} strokeWidth={1.5} strokeDasharray="5,3" />}
        </g>
        <circle cx={Ax} cy={Ay} r={4} fill={C.white} stroke={C.muted} strokeWidth={1} />
        <circle cx={Bx} cy={By} r={4} fill={C.ps} stroke={C.white} strokeWidth={1} />
        {C1x !== null && <circle cx={C1x} cy={C1y} r={4} fill={triCol} stroke={C.white} strokeWidth={1} />}
        {C2x !== null && <circle cx={C2x} cy={C2y} r={4} fill={C.assum} stroke={C.white} strokeWidth={1} />}
        {(() => { const r = 20; const pts = []; for (let i = 0; i <= 10; i++) { const ang = -(i / 10) * angleRad; pts.push(`${Ax + r * Math.cos(ang)},${Ay + r * Math.sin(ang)}`); } return <polyline points={pts.join(" ")} fill="none" stroke={C.calc} strokeWidth={1} />; })()}
        <FO x={Ax - 6} y={Ay + 6} w={20} hh={16} color={C.white} bg><Tex>{"A"}</Tex></FO>
        <FO x={Bx - 6} y={By + 6} w={20} hh={16} color={C.ps} bg><Tex>{"B"}</Tex></FO>
        <FO x={Ax + 24} y={Ay - 18} w={36} hh={16} color={C.calc} bg><Tex>{"30^\\circ"}</Tex></FO>
        <FO x={(Ax + Bx) / 2 - 24} y={Ay + 8} w={64} hh={16} color={C.ps} bg><Tex>{`b = ${fmt(b)}`}</Tex></FO>
        <FO x={Bx + 4} y={By - a * scale - 4} w={56} hh={16} color={C.calc} bg><Tex>{`a = ${fmt(a)}`}</Tex></FO>
        <FO x={(Bx + Fx) / 2 + 4} y={(By + Fy) / 2 - 12} w={56} hh={16} color={C.assum} bg><Tex>{`h = ${fmt(b * 0.5)}`}</Tex></FO>
        {twoTris && <FO x={pW / 2 - 36} y={2} w={80} hh={16} color={C.ok} bg><Tex>{"\\text{2 triangles}"}</Tex></FO>}
        {oneTri && <FO x={pW / 2 - 36} y={2} w={80} hh={16} color={C.ps} bg><Tex>{"\\text{1 triangle}"}</Tex></FO>}
        {numInt === 0 && <FO x={pW / 2 - 36} y={2} w={80} hh={16} color={C.fail} bg><Tex>{"\\text{no triangle}"}</Tex></FO>}
        {C1x !== null && <FO x={C1x + 6} y={C1y - 14} w={24} hh={16} color={triCol} bg><Tex>{"C_1"}</Tex></FO>}
        {C2x !== null && <FO x={C2x - 28} y={C2y - 14} w={24} hh={16} color={C.assum} bg><Tex>{"C_2"}</Tex></FO>}
      </svg>
    );
  })();

  // Number line diagram
  const graph = (() => {
    const pW = 500, pH = 120;
    const pad = { l: 44, r: 16, t: 30, b: 28 };
    const gW2 = pW - pad.l - pad.r;
    const xMin = 0.5, xMax = 5.5, xRange = xMax - xMin;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW2;
    const barY = 50;

    const FO = ({ x, y, w, hh, color, align, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {/* Number line */}
        <line x1={pad.l} y1={barY} x2={pW - pad.r} y2={barY} stroke={C.muted} strokeWidth={1} />
        {[1, 2, 3, 4, 5].map(x => (<g key={x}><line x1={sx(x)} y1={barY - 4} x2={sx(x)} y2={barY + 4} stroke={C.muted} strokeWidth={1} /><FO x={sx(x) - 10} y={barY + 8} w={20} hh={18}><Tex>{String(x)}</Tex></FO></g>))}
        {/* Condition bars */}
        <rect x={sx(1)} y={barY - 22} width={sx(5) - sx(1)} height={6} rx={3} fill={C.ps + "44"} />
        <FO x={sx(1) - 4} y={barY - 36} w={80} hh={14} color={C.ps}><Tex>{"1 < x < 5"}</Tex></FO>
        <rect x={sx(1)} y={barY - 14} width={sx(4) - sx(1)} height={6} rx={3} fill={C.calc + "44"} />
        <FO x={sx(2)} y={barY - 14} w={80} hh={14} color={C.calc}><Tex>{"a < b"}</Tex></FO>
        {/* Result region */}
        <rect x={sx(3)} y={barY - 3} width={sx(4) - sx(3)} height={6} rx={3} fill={C.ok} />
        {/* Current x marker */}
        <circle cx={sx(xVal)} cy={barY} r={6} fill={col} stroke={C.white} strokeWidth={2} />
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(xVal)}</Tex></span>
        </div>
        <input type="range" min={0.5} max={5.5} step={0.1} value={xVal} onChange={e => setXVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map(pr => { const active = Math.abs(xVal - pr.val) < 0.15; return (<button key={pr.label} onClick={() => setXVal(pr.val)} style={{ flex: 1, padding: "5px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      {triDiagram && <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{triDiagram}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 1 }}><Tex>{"a = x-1"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: a > 0 ? C.calc : C.fail }}><Tex>{fmt(a)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 1 }}><Tex>{"b"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: b > 0 ? C.ps : C.fail }}><Tex>{fmt(b)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 1 }}><Tex>{"b\\sin 30^\\circ"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum }}><Tex>{fmt(bSinA)}</Tex></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: cond1 ? C.conclBg : C.failBg, border: `1px solid ${cond1 ? C.ok : C.fail}44`, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: cond1 ? C.ok : C.fail, fontWeight: 600 }}><Tex>{"a,b > 0"}</Tex> {cond1 ? "\u2705" : "\u274C"}</span>
        </div>
        <div style={{ background: cond2 ? C.conclBg : C.failBg, border: `1px solid ${cond2 ? C.ok : C.fail}44`, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: cond2 ? C.ok : C.fail, fontWeight: 600 }}><Tex>{"a < b"}</Tex> {cond2 ? "\u2705" : "\u274C"}</span>
        </div>
        <div style={{ background: cond3 ? C.conclBg : C.failBg, border: `1px solid ${cond3 ? C.ok : C.fail}44`, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: cond3 ? C.ok : C.fail, fontWeight: 600 }}><Tex>{"a > b\\sin A"}</Tex> {cond3 ? "\u2705" : "\u274C"}</span>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      {twoTriangles ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>All three conditions met: two non-congruent triangles exist. Valid range: <Tex>{"3 < x < 4"}</Tex>. The answer is D.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Not all conditions met. Two triangles require <Tex>{"3 < x < 4"}</Tex>.</span>
        </div>
      )}
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
