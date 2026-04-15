"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 13, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Circles / Coordinate Geometry" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "5", expl: "This is just the distance between the centres (\u221A41 \u2248 6.4), not 5. You might confuse \u221A(25) = 5 with \u221A(25+16) = \u221A41." },
  { letter: "B", ok: true, tex: "5 + \\sqrt{41}", expl: "The maximum distance is the distance between centres plus both radii: \u221A41 + 3 + 2 = 5 + \u221A41." },
  { letter: "C", ok: false, tex: "\\sqrt{41} + 3", expl: "You might get this by adding only one radius (3) to the centre distance, forgetting to also add the radius of the second circle (2)." },
  { letter: "D", ok: false, tex: "5 + 2\\sqrt{41}", expl: "You might get this by doubling \u221A41, perhaps computing the diameter of a combined region instead of the sum of radii plus centre distance." },
  { letter: "E", ok: false, tex: "10", expl: "You might get 10 by adding the two diameters (6 + 4), ignoring the distance between centres entirely." },
  { letter: "F", ok: false, tex: "\\sqrt{41}", expl: "This is just the distance between the two centres. You need to add both radii to get the maximum PQ." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

function QuestionSummary() {
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}>
      <p style={{ margin: "0 0 4px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q13</span>
        Point P lies on the circle <Tex>{"(x-2)^2 + (y+1)^2 = 9"}</Tex>. Point Q lies on the circle <Tex>{"(x+3)^2 + (y-3)^2 = 4"}</Tex>. What is the maximum possible length of PQ?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","5"],["B","5+\\sqrt{41}"],["C","\\sqrt{41}+3"],["D","5+2\\sqrt{41}"],["E","10"],["F","\\sqrt{41}"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 13</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Point P lies on the circle</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"(x - 2)^2 + (y + 1)^2 = 9"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>Point Q lies on the circle</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"(x + 3)^2 + (y - 3)^2 = 4"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 0" }}>What is the maximum possible length of PQ?</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}
      </div>
    </div>
  );
}

function SetupStep() {
  return (
    <div>
      <QuestionSummary />
      <InfoBox type="strategy">
        <p style={{ margin: 0 }}>The maximum distance between a point on one circle and a point on another is the distance between their centres plus both radii. The two points, both centres, are collinear when PQ is maximised.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Circle 1: centre <Tex>{"(2, -1)"}</Tex>, radius <Tex>{"3"}</Tex>. Circle 2: centre <Tex>{"(-3, 3)"}</Tex>, radius <Tex>{"2"}</Tex>.</p>
        <p style={{ margin: 0 }}><Tex>{"\\text{Max PQ} = d(C_1, C_2) + r_1 + r_2"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveDiagram = (() => {
    const pW = 260;
    const pad = { l: 20, r: 8, t: 8, b: 16 };
    const gW = pW - pad.l - pad.r;
    const xMin = -6.5, xMax = 6.5, yMin = -5.5, yMax = 6.5;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;
    const c1x = 2, c1y = -1, r1 = 3, c2x = -3, c2y = 3, r2 = 2;
    const dist = Math.sqrt(41);
    const dx = (c2x - c1x) / dist, dy = (c2y - c1y) / dist;
    const p1x = c1x - dx * r1, p1y = c1y - dy * r1;
    const p2x = c2x + dx * r2, p2y = c2y + dy * r2;
    const makeCircle = (cx, cy, r, n) => { const pts = []; for (let i = 0; i <= n; i++) { const a = (i / n) * 2 * Math.PI; pts.push(`${sx(cx + r * Math.cos(a))},${sy(cy + r * Math.sin(a))}`); } return pts.join(" "); };
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.5} />
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.5} />
        <polyline points={makeCircle(c1x, c1y, r1, 60)} fill="none" stroke={C.ps} strokeWidth={1.2} />
        <polyline points={makeCircle(c2x, c2y, r2, 60)} fill="none" stroke={C.calc} strokeWidth={1.2} />
        <line x1={sx(p1x)} y1={sy(p1y)} x2={sx(p2x)} y2={sy(p2y)} stroke={C.ok} strokeWidth={1.5} strokeDasharray="4,2" />
        <line x1={sx(c1x)} y1={sy(c1y)} x2={sx(c2x)} y2={sy(c2y)} stroke={C.muted} strokeWidth={1} strokeDasharray="3,2" />
        <circle cx={sx(c1x)} cy={sy(c1y)} r={3} fill={C.ps} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(c2x)} cy={sy(c2y)} r={3} fill={C.calc} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(p1x)} cy={sy(p1y)} r={3} fill={C.ok} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(p2x)} cy={sy(p2y)} r={3} fill={C.ok} stroke={C.white} strokeWidth={1} />
        <foreignObject x={sx(c1x) + 5} y={sy(c1y) + 12 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.ps, textAlign: "left", lineHeight: 1 }}><Tex>{"(2,-1)"}</Tex></div></foreignObject>
        <foreignObject x={sx(c2x) - 4 - 48} y={sy(c2y) - 6 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.calc, textAlign: "right", lineHeight: 1 }}><Tex>{"(-3,3)"}</Tex></div></foreignObject>
        <foreignObject x={sx(p1x) + 4} y={sy(p1y) + 12 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "left", lineHeight: 1 }}><Tex>{"P"}</Tex></div></foreignObject>
        <foreignObject x={sx(p2x) - 4 - 50} y={sy(p2y) - 6 - 12} width={52} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "right", lineHeight: 1 }}><Tex>{"Q"}</Tex></div></foreignObject>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Identify the centres and radii, compute the distance between centres, then add both radii for the maximum PQ.</span>, math: (<div><Tex>{"\\text{Max PQ} = d(C_1, C_2) + r_1 + r_2"}</Tex></div>) },
    { label: "READ OFF CENTRES AND RADII", color: C.calc, text: <span>Compare each equation with the standard form <Tex>{"(x-a)^2 + (y-b)^2 = r^2"}</Tex>.</span>, math: (<><div><Tex>{"C_1 = (2, -1),\\quad r_1 = \\sqrt{9} = 3"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"C_2 = (-3, 3),\\quad r_2 = \\sqrt{4} = 2"}</Tex></div></>) },
    { label: "DISTANCE BETWEEN CENTRES", color: C.calc, text: <span>Use the distance formula between <Tex>{"(2, -1)"}</Tex> and <Tex>{"(-3, 3)"}</Tex>.</span>, math: (<><div><Tex>{"d = \\sqrt{(2-(-3))^2 + (-1-3)^2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\sqrt{5^2 + (-4)^2} = \\sqrt{25 + 16}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\sqrt{41}"}</Tex></div></>), diagram: solveDiagram },
    { label: "MAXIMUM DISTANCE", color: C.calc, text: <span>P and Q are farthest apart when they lie on the line through both centres, on opposite sides.</span>, math: (<><div><Tex>{"\\text{Max PQ} = \\sqrt{41} + 3 + 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 5 + \\sqrt{41}"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>The maximum possible length of PQ is <Tex>{"5 + \\sqrt{41}"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{Max PQ} = 5 + \\sqrt{41} \\approx 11.4}"}</Tex></div>), conclusion: <span>The answer is B: <Tex>{"5 + \\sqrt{41}"}</Tex>.</span> },
  ];

  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const c1x = 2, c1y = -1, r1 = 3, c2x = -3, c2y = 3, r2 = 2;
  const dist = Math.sqrt(41);
  const lineAngle = Math.atan2(c2y - c1y, c2x - c1x);
  const optTheta0 = lineAngle + Math.PI;
  const optThetaNorm = optTheta0 < 0 ? optTheta0 + 2 * Math.PI : optTheta0;
  const [theta, setTheta] = useState(optThetaNorm);
  const snapPoints = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2, optThetaNorm];
  const snapRadius = 0.15;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const optTheta = optThetaNorm;

  const px = c1x + r1 * Math.cos(theta);
  const py = c1y + r1 * Math.sin(theta);
  // Q on the far side of circle 2 from P (opposite direction) to maximise PQ
  const awayAngle = Math.atan2(c2y - py, c2x - px);
  const qx = c2x + r2 * Math.cos(awayAngle);
  const qy = c2y + r2 * Math.sin(awayAngle);
  const pqDist = Math.sqrt((px - qx) ** 2 + (py - qy) ** 2);

  const maxPQ = dist + r1 + r2;
  const isExact = Math.abs(pqDist - maxPQ) < 0.15;
  const isNear = !isExact && Math.abs(pqDist - maxPQ) < 0.8;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "t0", jsx: <span><Tex>{"\\theta = 0"}</Tex></span>, val: 0 },
    { label: "tpi2", jsx: <span><Tex>{"\\theta = \\frac{\\pi}{2}"}</Tex></span>, val: Math.PI / 2 },
    { label: "tmax", jsx: <span>Max PQ</span>, val: optTheta > 0 ? optTheta : optTheta + 2 * Math.PI },
  ];

  const graph = (() => {
    const pW = 500;
    const pad = { l: 44, r: 16, t: 16, b: 28 };
    const gW2 = pW - pad.l - pad.r;
    const xMin = -7, xMax = 7, yMin = -6, yMax = 7;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW2 * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW2;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;

    const makeCircle = (cx, cy, r, n) => { const pts = []; for (let i = 0; i <= n; i++) { const a = (i / n) * 2 * Math.PI; pts.push(`${sx(cx + r * Math.cos(a))},${sy(cy + r * Math.sin(a))}`); } return pts.join(" "); };

    const FO = ({ x, y, w, hh, color, align, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="plotArea13"><rect x={pad.l} y={pad.t} width={gW2} height={gH} /></clipPath></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        <g clipPath="url(#plotArea13)">
          <polyline points={makeCircle(c1x, c1y, r1, 80)} fill="none" stroke={C.ps} strokeWidth={1.5} />
          <polyline points={makeCircle(c2x, c2y, r2, 80)} fill="none" stroke={C.calc} strokeWidth={1.5} />
          <line x1={sx(px)} y1={sy(py)} x2={sx(qx)} y2={sy(qy)} stroke={col} strokeWidth={2} />
        </g>
        <circle cx={sx(c1x)} cy={sy(c1y)} r={3} fill={C.ps} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(c2x)} cy={sy(c2y)} r={3} fill={C.calc} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(px)} cy={sy(py)} r={5} fill={col} stroke={C.white} strokeWidth={1.5} />
        <circle cx={sx(qx)} cy={sy(qy)} r={5} fill={col} stroke={C.white} strokeWidth={1.5} />
        <FO x={sx(c1x) + 4} y={sy(c1y) + 4} w={54} hh={16} color={C.ps} bg><Tex>{"(2,-1)"}</Tex></FO>
        <FO x={sx(c2x) - 58} y={sy(c2y) - 14} w={54} hh={16} color={C.calc} bg><Tex>{"(-3,3)"}</Tex></FO>
        <FO x={sx(px) + 6} y={sy(py) - 14} w={24} hh={16} color={col} bg><Tex>{"P"}</Tex></FO>
        <FO x={sx(qx) - 24} y={sy(qy) + 4} w={24} hh={16} color={col} bg><Tex>{"Q"}</Tex></FO>
        <FO x={(sx(px) + sx(qx)) / 2 + 6} y={(sy(py) + sy(qy)) / 2 - 14} w={64} hh={16} color={col} bg><Tex>{`PQ = ${fmt(pqDist)}`}</Tex></FO>
        {[-4, -2, 0, 2, 4, 6].map(x => <FO key={"x" + x} x={sx(x) - 10} y={pH - pad.b + 2} w={20} hh={18}><Tex>{String(x)}</Tex></FO>)}
        {[-4, -2, 0, 2, 4, 6].map(y => <FO key={"y" + y} x={0} y={sy(y) - 9} w={pad.l - 6} hh={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}>Position of P on circle 1</span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{`\\theta = ${fmt(theta)}`}</Tex></span>
        </div>
        <input type="range" min={0} max={6.28} step={0.05} value={theta} onChange={e => setTheta(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map(pr => { const active = Math.abs(theta - pr.val) < 0.15; return (<button key={pr.label} onClick={() => setTheta(pr.val)} style={{ flex: 1, padding: "5px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 1 }}>Centre dist</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{`\\sqrt{41}`}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 1 }}>PQ</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col }}><Tex>{fmt(pqDist)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 1 }}>Max PQ</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok }}><Tex>{`5+\\!\\sqrt{41}`}</Tex></div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>PQ = <Tex>{`5 + \\sqrt{41} \\approx ${fmt(maxPQ)}`}</Tex>. Maximum reached! The answer is B.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.assum }}>Close! PQ = <Tex>{fmt(pqDist)}</Tex>. Move P to align with the line through both centres.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>PQ = <Tex>{fmt(pqDist)}</Tex>. Maximum is <Tex>{`5 + \\sqrt{41} \\approx ${fmt(maxPQ)}`}</Tex>.</span>
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
