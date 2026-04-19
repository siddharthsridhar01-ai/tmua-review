"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 2, set: "A", paperNumber: "Paper 1", topicTag: "Calculus / Turning Points / Integration" };

const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "-\\tfrac{3}{2}", text: "\u22123/2", ok: false, expl: "You might get \u22123/2 by making a sign error in the antiderivative evaluation, perhaps subtracting in the wrong order." },
  { letter: "B", tex: "-\\tfrac{1}{2}", text: "\u22121/2", ok: false, expl: "You might get \u22121/2 by computing F(1) \u2212 F(2) instead of F(2) \u2212 F(1), reversing the limits." },
  { letter: "C", tex: "0", text: "0", ok: false, expl: "You might think the integral is zero by symmetry, but the cubic is not symmetric about the midpoint of [1, 2]." },
  { letter: "D", tex: "\\tfrac{1}{2}", text: "1/2", ok: false, expl: "You might get 1/2 by making an arithmetic error in the evaluation, e.g. computing 8 \u2212 24 + 24 \u2212 6 = 2 but then 1/2 \u2212 3 + 6 \u2212 3 = 3/2 and subtracting wrong." },
  { letter: "E", tex: "\\tfrac{3}{2}", text: "3/2", ok: true, expl: "Turning points at x = 1 and x = 2 (from dy/dx = 6(x\u22121)(x\u22122) = 0). Evaluating [\u00BDx\u2074 \u2212 3x\u00B3 + 6x\u00B2 \u2212 3x] from 1 to 2 gives 2 \u2212 \u00BD = 3/2." },
  { letter: "F", tex: "3", text: "3", ok: false, expl: "You might get 3 by forgetting to evaluate at the lower limit, or by using the wrong turning points." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const SECTIONS_Q2 = [
  { type: "prose", text: (<>The curve</>) },
  { type: "mathbox", tex: "y = 2x^3 - 9x^2 + 12x - 3" },
  { type: "prose", text: (<>has turning points at <Tex>{"x = \\alpha"}</Tex> and <Tex>{"x = \\beta"}</Tex>, where <Tex>{"\\beta > \\alpha"}</Tex>.</>) },
  { type: "prose", text: (<>Find <Tex>{"\\displaystyle\\int_\\alpha^\\beta (2x^3 - 9x^2 + 12x - 3)\\,dx"}</Tex>.</>) },
];
const OPTIONS_Q2 = [["A", "-\\tfrac{3}{2}"], ["B", "-\\tfrac{1}{2}"], ["C", "0"], ["D", "\\tfrac{1}{2}"], ["E", "\\tfrac{3}{2}"], ["F", "3"]];

function QuestionSummary() {
  const sections = SECTIONS_Q2;
  const options = OPTIONS_Q2;
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q2</span>
        {sections.map((s, i) => {
          if (s.type === "prose") return <span key={i}>{s.text} </span>;
          if (s.type === "mathbox") return <div key={i} style={{ display: "block", margin: "6px auto", color: C.text, fontSize: 14, fontWeight: 700, textAlign: "center" }}><Tex display>{s.tex}</Tex></div>;
          if (s.type === "custom") return <div key={i} style={{ margin: "6px 0" }}>{s.jsx}</div>;
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {options.map(([l, v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function CubicGraph({ showArea, compact, upperLim, areaCol, hitTP }) {
  const pW = compact ? 220 : 500, pH = compact ? 140 : 220;
  const pad = { l: 36, r: 16, t: 16, b: 28 };
  const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
  const xMin = -0.3, xMax = 3, yMin = -4, yMax = 4;
  const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
  const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
  const fn = (x) => 2*x*x*x - 9*x*x + 12*x - 3;
  const pts = [];
  for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); const y = fn(x); if (y >= yMin && y <= yMax) pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); }
  const ul = upperLim != null ? Math.min(Math.max(upperLim, 1), 2) : 2;
  const areaPts = [];
  if (showArea) {
    for (let i = 0; i <= 80; i++) { const x = 1 + (ul - 1) * i / 80; areaPts.push(`${sx(x).toFixed(1)},${sy(fn(x)).toFixed(1)}`); }
    areaPts.push(`${sx(ul).toFixed(1)},${sy(0).toFixed(1)}`);
    areaPts.push(`${sx(1).toFixed(1)},${sy(0).toFixed(1)}`);
  }
  return (
    <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
      <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lblBg"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
      {[0, 1, 2].map(x => <line key={x} x1={sx(x)} y1={pad.t} x2={sx(x)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.5} />)}
      {[-2, 0, 2].map(y => y >= yMin && y <= yMax && <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
      <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
      {showArea && <polygon points={areaPts.join(" ")} fill={(areaCol || C.ok) + "22"} />}
      <path d={"M" + pts.join("L")} fill="none" stroke={C.ps} strokeWidth={2.5} />
      <circle cx={sx(1)} cy={sy(fn(1))} r={compact ? 3.5 : 5} fill={hitTP ? C.ok : C.ps} stroke={C.white} strokeWidth={1.5} />
      <circle cx={sx(2)} cy={sy(fn(2))} r={compact ? 3.5 : 5} fill={hitTP ? C.ok : C.ps} stroke={C.white} strokeWidth={1.5} />
      {compact && <text x={sx(1)} y={sy(fn(1)) - 8} textAnchor="middle" fill={C.ps} fontSize={11} fontFamily={mathFont}>(1, {fmt(fn(1))})</text>}
      {compact && <text x={sx(2)} y={sy(fn(2)) + 14} textAnchor="middle" fill={C.ps} fontSize={11} fontFamily={mathFont}>(2, {fmt(fn(2))})</text>}
      {!compact && <text x={sx(1)} y={sy(fn(1)) - 10} textAnchor="middle" fill={hitTP ? C.ok : C.ps} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lblBg)">{"\u03B1"} = 1</text>}
      {!compact && <text x={sx(2)} y={sy(fn(2)) + 18} textAnchor="middle" fill={hitTP ? C.ok : C.ps} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lblBg)">{"\u03B2"} = 2</text>}
      {/* Moving dot at upper limit with coordinates */}
      {upperLim != null && !compact && ul > 1 && (() => {
        const dy = fn(ul);
        const dotVisible = dy >= yMin && dy <= yMax;
        return dotVisible && <>
          <circle cx={sx(ul)} cy={sy(dy)} r={5} fill={areaCol || C.ok} stroke={C.white} strokeWidth={1.5} />
          <text x={sx(ul)} y={sy(dy) - 10} textAnchor="middle" fill={C.white} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lblBg)">({fmt(ul)}, {fmt(dy)})</text>
        </>;
      })()}
      {[0, 1, 2].map(x => <text key={x} x={sx(x)} y={pH - pad.b + 14} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont}>{x}</text>)}
      {[-2, 2].map(y => y >= yMin && y <= yMax && <text key={y} x={pad.l - 8} y={sy(y) + 4} textAnchor="end" fill={C.muted} fontSize={11} fontFamily={mathFont}>{y}</text>)}
    </svg>
  );
}

function ReadStep() {
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 2</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The curve</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"y = 2x^3 - 9x^2 + 12x - 3"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>has turning points at <Tex>{"x = \\alpha"}</Tex> and <Tex>{"x = \\beta"}</Tex>, where <Tex>{"\\beta > \\alpha"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Find <Tex>{"\\displaystyle\\int_\\alpha^\\beta (2x^3 - 9x^2 + 12x - 3)\\,dx"}</Tex>.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (
          <div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 100px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{o.letter}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{o.tex}</Tex></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetupStep() {
  return (
    <div>
      <QuestionSummary />
      <InfoBox type="strategy">
        <p style={{ margin: 0 }}>Differentiate to find the turning points <Tex>{"\\alpha"}</Tex> and <Tex>{"\\beta"}</Tex>, then integrate the original function between them.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: 0 }}>The question asks for the integral of the original function <Tex>{"y"}</Tex>, not the derivative. The turning points just tell you the limits of integration.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Differentiate to find where <Tex>{"\\tfrac{dy}{dx} = 0"}</Tex>, giving the limits <Tex>{"\\alpha"}</Tex> and <Tex>{"\\beta"}</Tex>. Then evaluate the definite integral of the original curve.</span>,
      math: (<div><Tex>{"\\frac{dy}{dx} = 3 \\cdot 2x^2 - 2 \\cdot 9x + 12 = 6x^2 - 18x + 12"}</Tex></div>), },
    { label: "FIND TURNING POINTS", color: C.calc,
      text: <span>Set the derivative to zero, divide through by <Tex>{"6"}</Tex>, then factorise.</span>,
      math: (<><div><Tex>{"6x^2 - 18x + 12 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 - 3x + 2 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(x - 1)(x - 2) = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#fdcb6e}{x = 1 \\text{ or } x = 2, \\quad \\text{so } \\alpha = 1,\\; \\beta = 2}"}</Tex></div></>),
      diagram: <div style={{ width: 220, background: "#1e2030", border: `1px solid ${C.calc}33`, borderRadius: 8, overflow: "hidden" }}><CubicGraph showArea={true} compact={true} /></div>, },
    { label: "FIND ANTIDERIVATIVE", color: C.calc,
      text: <span>Integrate each term of <Tex>{"2x^3 - 9x^2 + 12x - 3"}</Tex>.</span>,
      math: (<><div><Tex>{"\\int (2x^3 - 9x^2 + 12x - 3)\\,dx"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\frac{2x^4}{4} - \\frac{9x^3}{3} + \\frac{12x^2}{2} - 3x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\frac{x^4}{2} - 3x^3 + 6x^2 - 3x"}</Tex></div></>), },
    { label: "EVALUATE AT THE LIMITS", color: C.calc,
      text: <span>Compute <Tex>{"F(2) - F(1)"}</Tex> where <Tex>{"F(x) = \\tfrac{x^4}{2} - 3x^3 + 6x^2 - 3x"}</Tex>.</span>,
      math: (<><div><Tex>{"F(2) = \\frac{2^4}{2} - 3(2^3) + 6(2^2) - 3(2) = \\frac{16}{2} - 24 + 24 - 6 = 8 - 6 = 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"F(1) = \\frac{1^4}{2} - 3(1^3) + 6(1^2) - 3(1) = \\frac{1}{2} - 3 + 6 - 3 = \\frac{1}{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#fdcb6e}{F(2) - F(1) = 2 - \\frac{1}{2} = \\frac{4}{2} - \\frac{1}{2} = \\frac{3}{2}}"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The integral equals <Tex>{"\\tfrac{3}{2}"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\int_1^2 (2x^3 - 9x^2 + 12x - 3)\\,dx = \\frac{3}{2}}"}</Tex></div>),
      conclusion: <span>The integral is <Tex>{"\\tfrac{3}{2}"}</Tex>. The answer is E.</span>, },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => {
          if (i > revealed) return null;
          return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 220px", alignSelf: "flex-start" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>);
        })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [upperLim, setUpperLim] = useState(1.5);
  const snapPoints = [1, 1.5, 2];
  const snapRadius = 0.03;
  const handleSlider = (raw) => {
    for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; }
    return raw;
  };
  const fn = (x) => 2*x*x*x - 9*x*x + 12*x - 3;
  const F = (x) => x*x*x*x/2 - 3*x*x*x + 6*x*x - 3*x;
  const computed = F(Math.min(upperLim, 2)) - F(1);
  const isExact = upperLim === 2;
  const isNear = !isExact && Math.abs(upperLim - 2) < 0.05;
  const isHit = isExact || isNear;
  const intCol = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "x1", jsx: <span><Tex>{"x = 1"}</Tex></span>, val: 1 },
    { label: "x15", jsx: <span><Tex>{"x = 1.5"}</Tex></span>, val: 1.5 },
    { label: "x2", jsx: <span><Tex>{"x = 2"}</Tex></span>, val: 2 },
  ];

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. The graph shows the cubic with turning points marked</p>
        <p style={{ margin: "0 0 4px" }}>2. Drag the slider to change the upper limit from <Tex>{"\\alpha = 1"}</Tex> to <Tex>{"\\beta = 2"}</Tex></p>
        <p style={{ margin: 0 }}>3. At <Tex>{"x = 2"}</Tex> the shaded area gives the integral value <Tex>{"\\tfrac{3}{2}"}</Tex></p>
      </InfoBox>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}>Upper limit</span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{fmt(upperLim)}</span>
        </div>
        <input type="range" min={1} max={2} step={0.01} value={upperLim} onChange={e => setUpperLim(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => {
            const active = isExact && pr.val === 2;
            return (<button key={pr.label} onClick={() => setUpperLim(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, border: `1px solid ${active ? C.ok : C.border}`, background: active ? C.ok + "15" : C.card, color: active ? C.ok : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx || pr.label}</button>);
          })}
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
        <CubicGraph showArea={true} compact={false} upperLim={upperLim} areaCol={intCol} hitTP={isHit} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Upper limit</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(upperLim)}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${isExact ? C.ok + "66" : isNear ? C.assum + "66" : intCol + "44"}`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: isHit ? C.ok : intCol, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Integral</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: isHit ? C.ok : intCol, fontFamily: mathFont, transition: "color 0.3s" }}>{fmt(computed)}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Target</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.white, fontFamily: mathFont }}>1.50</div>
        </div>
      </div>

      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}><Tex>{"F(2) - F(1) = 2 - \\tfrac{1}{2} = \\tfrac{3}{2}"}</Tex>. The answer is E.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>Close! Integral {"\u2248"} <Tex>{fmt(computed)}</Tex>. Tap the <Tex>{"x = 2"}</Tex> preset to evaluate at the exact turning point.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Integral from <Tex>{"1"}</Tex> to <Tex>{fmt(upperLim)}</Tex> = <Tex>{fmt(computed)}</Tex>. Slide to <Tex>{"\\beta = 2"}</Tex>.</span>
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
        <div style={{ marginBottom: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: 1 }}>TMUA</span><span style={{ fontSize: 12, color: C.muted }}>AceAdmissions Mock {"\u00B7"} Set {META.set}</span><span style={{ fontSize: 12, color: C.muted }}>{"\u00B7"}</span><span style={{ fontSize: 12, color: C.ps }}>{META.topicTag}</span></div><h1 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: titleFont, fontStyle: "italic", letterSpacing: 0.5 }}>Interactive Walkthrough</h1><p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{META.paperNumber} {"\u00B7"} Question {META.questionNumber}</p></div>
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
