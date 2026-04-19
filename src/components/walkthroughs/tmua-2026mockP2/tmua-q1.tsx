"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 1, paper: "Paper 2", year: "2026 Mock", topicTag: "Calculus / Stationary Points" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "0", expl: "You might get 0 if you mistakenly believe the derivative has no real roots. In fact, 8x\u00B3 \u2212 6x = 2x(4x\u00B2 \u2212 3) = 0 gives three real solutions." },
  { letter: "B", ok: false, tex: "1", expl: "You might get 1 by only finding x = 0 from the factor 2x and forgetting to solve 4x\u00B2 \u2212 3 = 0." },
  { letter: "C", ok: false, tex: "2", expl: "You might get 2 by solving 4x\u00B2 \u2212 3 = 0 but forgetting the x = 0 root from the factor 2x." },
  { letter: "D", ok: true, tex: "3", expl: "Differentiating gives dy/dx = 8x\u00B3 \u2212 6x = 2x(4x\u00B2 \u2212 3). Setting to zero: x = 0 or x\u00B2 = 3/4, giving x = 0, x = \u00B1\u221A3/2. That is 3 stationary points." },
  { letter: "E", ok: false, tex: "4", expl: "You might count 4 by mistakenly including a repeated root or an inflection. The derivative is a cubic with at most 3 real roots, so 4 stationary points is impossible." },
  { letter: "F", ok: false, tex: "5", expl: "You might count 5 by confusing stationary points with roots of the original equation. The derivative is cubic, so at most 3 stationary points exist." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const ITEMS_Q1 = null;
const OPTIONS_Q1 = [["A", "0"], ["B", "1"], ["C", "2"], ["D", "3"], ["E", "4"], ["F", "5"]];
const SECTIONS_Q1 = [
  { type: 'prose', text: (<>Determine the number of stationary points on the curve with equation</>) },
  { type: "mathbox", tex: "y = 2x^4 - 3x^2 + 1" }
];

function QuestionSummary() {
  const sections = SECTIONS_Q1;
  const options = OPTIONS_Q1;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q1</span>
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
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  const sections = SECTIONS_Q1;
  const options = OPTIONS_Q1;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 1</span>
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
        {options.map(([l, v]) => (<div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 100px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Stationary points occur where <Tex>{"\\dfrac{dy}{dx} = 0"}</Tex>. Differentiate, factorise, then count the number of real solutions.</p></InfoBox><InfoBox type="insight"><p style={{ margin: 0 }}>This is a degree-4 polynomial, so its derivative is a cubic (degree 3). A cubic has at most 3 real roots, so we expect at most 3 stationary points.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const f = (x) => 2 * x * x * x * x - 3 * x * x + 1;
  const sp1 = -Math.sqrt(3) / 2, sp2 = 0, sp3 = Math.sqrt(3) / 2;

  // Diagram: the curve with three stationary points marked
  const curveDiagram = (() => {
    const pW = 270, pH = 200;
    const pad = { l: 32, r: 12, t: 14, b: 24 };
    const xMin = -1.6, xMax = 1.6, yMin = -0.5, yMax = 1.5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 50} height={hh || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const pts = [];
    for (let i = 0; i <= 150; i++) {
      const x = xMin + (i / 150) * (xMax - xMin);
      pts.push(`${sx(x)},${sy(f(x))}`);
    }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="scClip"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={0.7} />
        {[-1, 1].map(x => <line key={`t${x}`} x1={sx(x)} y1={sy(0) - 3} x2={sx(x)} y2={sy(0) + 3} stroke={C.muted} strokeWidth={0.7} />)}
        <FO x={sx(1) - 8} y={sy(0) + 4} w={16} hh={16} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO x={sx(-1) - 12} y={sy(0) + 4} w={24} hh={16} color={C.muted}><Tex>{"-1"}</Tex></FO>
        <FO x={sx(0) - 24} y={sy(1) - 8} w={20} hh={16} color={C.muted}><Tex>{"1"}</Tex></FO>
        <g clipPath="url(#scClip)">
          <polyline points={pts.join(" ")} fill="none" stroke={C.accentLight} strokeWidth={2} />
        </g>
        {/* Stationary points */}
        <circle cx={sx(sp1)} cy={sy(f(sp1))} r={4.5} fill={C.ok} stroke={C.white} strokeWidth={1.5} />
        <circle cx={sx(sp2)} cy={sy(f(sp2))} r={4.5} fill={C.ok} stroke={C.white} strokeWidth={1.5} />
        <circle cx={sx(sp3)} cy={sy(f(sp3))} r={4.5} fill={C.ok} stroke={C.white} strokeWidth={1.5} />
        {/* Labels */}
        <FO x={sx(sp1) - 30} y={sy(f(sp1)) + 4} w={60} hh={16} color={C.ok}><Tex>{"-\\frac{\\sqrt3}{2}"}</Tex></FO>
        <FO x={sx(sp2) + 6} y={sy(f(sp2)) - 16} w={30} hh={16} color={C.ok}><Tex>{"0"}</Tex></FO>
        <FO x={sx(sp3) - 28} y={sy(f(sp3)) + 4} w={60} hh={16} color={C.ok}><Tex>{"\\frac{\\sqrt3}{2}"}</Tex></FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Differentiate <Tex>{"y = 2x^4 - 3x^2 + 1"}</Tex> and set the derivative equal to zero.</span>, math: (<div><Tex>{"\\frac{dy}{dx} = 0"}</Tex></div>) },
    { label: "DIFFERENTIATE", color: C.calc, text: <span>Apply the power rule to each term.</span>, math: (<><div><Tex>{"\\frac{dy}{dx} = 8x^3 - 6x"}</Tex></div></>) },
    { label: "FACTORISE", color: C.calc, text: <span>Take out the common factor of <Tex>{"2x"}</Tex>.</span>, math: (<><div><Tex>{"8x^3 - 6x = 2x(4x^2 - 3)"}</Tex></div></>) },
    { label: "SOLVE", color: C.calc, text: <span>Set each factor equal to zero and solve.</span>, math: (<><div><Tex>{"2x = 0 \\;\\Rightarrow\\; x = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"4x^2 - 3 = 0 \\;\\Rightarrow\\; x^2 = \\frac{3}{4}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow\\; x = \\pm\\frac{\\sqrt{3}}{2}"}</Tex></div></>), diagram: curveDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>There are three distinct real solutions, so the curve has three stationary points.</span>, math: (<div><Tex>{"\\color{#55efc4}{x = 0,\\; x = \\frac{\\sqrt{3}}{2},\\; x = -\\frac{\\sqrt{3}}{2}}"}</Tex></div>), conclusion: <span>The answer is D: 3 stationary points.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [xVal, setXVal] = useState(0);
  const snapPoints = [-Math.sqrt(3) / 2, 0, Math.sqrt(3) / 2];
  const snapRadius = 0.06;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return Math.round(raw * 100) / 100; };

  const f = (x) => 2 * x * x * x * x - 3 * x * x + 1;
  const df = (x) => 8 * x * x * x - 6 * x;
  const yNow = f(xVal);
  const slope = df(xVal);
  const isFlat = Math.abs(slope) < 0.01;
  const isSnapped = snapPoints.some(sp => Math.abs(xVal - sp) < 0.001);
  const col = isSnapped ? C.ok : C.ps;

  const presets = [
    { label: "sp1", jsx: <span><Tex>{"x = -0.87"}</Tex></span>, val: -Math.sqrt(3) / 2 },
    { label: "mid", jsx: <span><Tex>{"x = 0"}</Tex></span>, val: 0 },
    { label: "sp3", jsx: <span><Tex>{"x = 0.87"}</Tex></span>, val: Math.sqrt(3) / 2 },
  ];

  const graph = (() => {
    const pW = 500, pH = 280;
    const pad = { l: 40, r: 16, t: 20, b: 28 };
    const xMin = -1.8, xMax = 1.8, yMin = -0.6, yMax = 1.8;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 22}>
        <div style={{ fontSize: 12, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );

    const fPts = [];
    for (let i = 0; i <= 200; i++) {
      const x = xMin + (i / 200) * (xMax - xMin);
      fPts.push(`${sx(x)},${sy(f(x))}`);
    }

    // Tangent line segment
    const tanHalf = 0.5;
    const tx1 = xVal - tanHalf, ty1 = yNow - slope * tanHalf;
    const tx2 = xVal + tanHalf, ty2 = yNow + slope * tanHalf;

    // Grid
    const gridLines = [];
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0) continue;
      gridLines.push(<line key={`gx${x}`} x1={sx(x)} y1={sy(yMax)} x2={sx(x)} y2={sy(yMin)} stroke={C.border} strokeWidth={0.5} />);
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue;
      gridLines.push(<line key={`gy${y}`} x1={sx(xMin)} y1={sy(y)} x2={sx(xMax)} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />);
    }

    // Stationary point ghost dots
    const spGhosts = snapPoints.map((sp, i) => (
      <circle key={`gh${i}`} cx={sx(sp)} cy={sy(f(sp))} r={4} fill="none" stroke={C.ok} strokeWidth={1} strokeDasharray="2,2" opacity={0.4} />
    ));

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs>
          <clipPath id="vgClip"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath>
        </defs>
        {gridLines}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        <FO x={sx(xMax) - 10} y={sy(0) + 4} w={20} hh={18} color={C.muted}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0) + 4} y={sy(yMax) - 2} w={20} hh={18} color={C.muted}><Tex>{"y"}</Tex></FO>
        {[-1, 1].map(x => <FO key={`tx${x}`} x={sx(x) - 10} y={sy(0) + 4} w={20} hh={18} color={C.muted}><Tex>{String(x)}</Tex></FO>)}
        {[1].map(y => <FO key={`ty${y}`} x={sx(0) - 30} y={sy(y) - 9} w={24} hh={18} color={C.muted}><Tex>{String(y)}</Tex></FO>)}
        <g clipPath="url(#vgClip)">
          <polyline points={fPts.join(" ")} fill="none" stroke={C.accentLight} strokeWidth={2.5} />
          <line x1={sx(tx1)} y1={sy(ty1)} x2={sx(tx2)} y2={sy(ty2)} stroke={isFlat ? C.ok : C.calc} strokeWidth={2} />
        </g>
        {spGhosts}
        <circle cx={sx(xVal)} cy={sy(yNow)} r={6} fill={col} stroke={C.white} strokeWidth={2} />
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      {/* Slider card */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(xVal)}</Tex></span>
        </div>
        <input type="range" min={-1.6} max={1.6} step={0.01} value={xVal} onChange={e => setXVal(handleSlider(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map(pr => { const active = Math.abs(xVal - pr.val) < 0.05; return (<button key={pr.label} onClick={() => setXVal(pr.val)} style={{ flex: 1, padding: "5px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 1 }}><Tex>{"y"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col }}><Tex>{fmt(yNow)}</Tex></div>
        </div>
        <div style={{ background: isFlat ? C.conclBg : C.card, border: `1px solid ${isFlat ? C.ok : C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: isFlat ? C.ok : C.calc, fontWeight: 700, marginBottom: 1 }}><Tex>{"\\tfrac{dy}{dx}"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: isFlat ? C.ok : C.calc }}><Tex>{fmt(slope)}</Tex></div>
        </div>
        <div style={{ background: isFlat ? C.conclBg : C.failBg, border: `1px solid ${isFlat ? C.ok : C.fail}44`, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: isFlat ? C.ok : C.fail, fontWeight: 600 }}><Tex>{"\\tfrac{dy}{dx} = 0"}</Tex> {isFlat ? "\u2705" : "\u274C"}</span>
        </div>
      </div>
      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      {/* Banner */}
      {isSnapped ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>Tangent is flat here: stationary point found! Slide to find all 3. The answer is D.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Slide along the curve. The tangent line turns flat at each stationary point.</span>
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
