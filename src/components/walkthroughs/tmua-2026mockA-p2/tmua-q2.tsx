"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 2, paper: "Set A Paper 2", year: "2026 Mock", topicTag: "Integration / Algebraic Simplification" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "0", expl: "You might get 0 if you mistakenly think (a+b)\u00B2 and (a\u2212b)\u00B2 are equal, but they differ by the cross-term 4ab." },
  { letter: "B", ok: false, tex: "4", expl: "You might get 4 by correctly simplifying the integrand to 4 but then forgetting to integrate, treating \u222B4 dx as just 4 instead of 4(9\u22121) = 32." },
  { letter: "C", ok: false, tex: "14", expl: "You might get 14 by expanding each square separately but making a sign error in the cross-terms or miscalculating the antiderivatives." },
  { letter: "D", ok: false, tex: "28", expl: "You might get 28 by correctly finding the integrand is 4 but computing the interval length as 7 instead of 8, giving 4 \u00D7 7 = 28." },
  { letter: "E", ok: true, tex: "32", expl: "Using (a+b)\u00B2 \u2212 (a\u2212b)\u00B2 = 4ab with a = \u221Ax, b = 1/\u221Ax gives ab = 1. So the integrand simplifies to 4, and \u222B\u2081\u2079 4 dx = 4 \u00D7 8 = 32." },
  { letter: "F", ok: false, tex: "56", expl: "You might get 56 by expanding each square and integrating but doubling the cross-term contribution, computing 2 \u00D7 28 instead of 32." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const ITEMS_Q2 = null;
const OPTIONS_Q2 = [["A", "0"], ["B", "4"], ["C", "14"], ["D", "28"], ["E", "32"], ["F", "56"]];
const SECTIONS_Q2 = [
  { type: 'prose-tight', text: (<>Evaluate</>) },
  { type: "mathbox", tex: "\\int_1^9\\!\\left(\\sqrt{x}+\\tfrac{1}{\\sqrt{x}}\\right)^{\\!2}dx \\;-\\; \\int_1^9\\!\\left(\\sqrt{x}-\\tfrac{1}{\\sqrt{x}}\\right)^{\\!2}dx" }
];

function QuestionSummary() {
  const sections = SECTIONS_Q2;
  const options = OPTIONS_Q2;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q2</span>
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
  const sections = SECTIONS_Q2;
  const options = OPTIONS_Q2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 2</span>
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

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Don't expand each square and integrate separately. Instead, combine the two integrals first using <Tex>{"(a+b)^2 - (a-b)^2 = 4ab"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: 0 }}>With <Tex>{"a = \\sqrt{x}"}</Tex> and <Tex>{"b = \\tfrac{1}{\\sqrt{x}}"}</Tex>, the product <Tex>{"ab = \\sqrt{x} \\cdot \\tfrac{1}{\\sqrt{x}} = 1"}</Tex>. This collapses the integrand to a constant.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram: area under y=4 from 1 to 9
  const areaDiagram = (() => {
    const pW = 270, pH = 140;
    const pad = { l: 30, r: 12, t: 14, b: 28 };
    const xMin = 0, xMax = 10, yMin = 0, yMax = 6;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 50} height={hh || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={0.7} />
        <rect x={sx(1)} y={sy(4)} width={sx(9) - sx(1)} height={sy(0) - sy(4)} fill={C.ok + "22"} stroke={C.ok} strokeWidth={1.5} />
        <line x1={sx(0)} y1={sy(4)} x2={sx(10)} y2={sy(4)} stroke={C.calc} strokeWidth={1} strokeDasharray="4,3" />
        <FO x={sx(1) - 6} y={sy(0) + 4} w={14} hh={16} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO x={sx(9) - 6} y={sy(0) + 4} w={14} hh={16} color={C.muted}><Tex>{"9"}</Tex></FO>
        <FO x={sx(0) - 28} y={sy(4) - 8} w={24} hh={16} color={C.calc}><Tex>{"4"}</Tex></FO>
        <FO x={sx(5) - 40} y={sy(2) - 10} w={80} hh={20} color={C.ok}><span style={{ fontSize: 13, fontWeight: 700 }}><Tex>{"4 \\times 8 = 32"}</Tex></span></FO>
        <line x1={sx(1)} y1={sy(-0.3)} x2={sx(9)} y2={sy(-0.3)} stroke={C.ps} strokeWidth={1} />
        <line x1={sx(1)} y1={sy(-0.1)} x2={sx(1)} y2={sy(-0.5)} stroke={C.ps} strokeWidth={0.7} />
        <line x1={sx(9)} y1={sy(-0.1)} x2={sx(9)} y2={sy(-0.5)} stroke={C.ps} strokeWidth={0.7} />
        <FO x={sx(5) - 30} y={sy(-0.3) - 2} w={60} hh={16} color={C.ps}><span style={{ fontSize: 11 }}><Tex>{"\\text{width } 8"}</Tex></span></FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Recognise the structure <Tex>{"(a+b)^2 - (a-b)^2"}</Tex> and apply the algebraic identity before integrating.</span>, math: (<div><Tex>{"(a+b)^2 - (a-b)^2 = 4ab"}</Tex></div>) },
    { label: "IDENTIFY a AND b", color: C.calc, text: <span>Set <Tex>{"a = \\sqrt{x}"}</Tex> and <Tex>{"b = \\tfrac{1}{\\sqrt{x}}"}</Tex>, then compute their product.</span>, math: (<><div><Tex>{"ab = \\sqrt{x} \\cdot \\frac{1}{\\sqrt{x}} = 1"}</Tex></div></>) },
    { label: "SIMPLIFY THE INTEGRAND", color: C.calc, text: <span>The difference of the two squared expressions equals <Tex>{"4ab = 4"}</Tex>, a constant.</span>, math: (<><div><Tex>{"\\left(\\sqrt{x}+\\tfrac{1}{\\sqrt{x}}\\right)^{\\!2} - \\left(\\sqrt{x}-\\tfrac{1}{\\sqrt{x}}\\right)^{\\!2} = 4"}</Tex></div></>) },
    { label: "INTEGRATE", color: C.calc, text: <span>The integral of the constant 4 over the interval from 1 to 9 is 4 times the width.</span>, math: (<><div><Tex>{"\\int_1^9 4\\,dx = 4(9 - 1) = 32"}</Tex></div></>), diagram: areaDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>The value of the expression is 32.</span>, math: (<div><Tex>{"\\color{#55efc4}{32}"}</Tex></div>), conclusion: <span>The answer is E: 32.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [uVal, setUVal] = useState(9);
  const snapPoints = [1, 3, 5, 7, 9];
  const snapRadius = 0.2;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return Math.round(raw * 10) / 10; };

  const f1 = (x) => (Math.sqrt(x) + 1 / Math.sqrt(x)) ** 2;
  const f2 = (x) => (Math.sqrt(x) - 1 / Math.sqrt(x)) ** 2;
  const area = 4 * (uVal - 1); // since integrand simplifies to 4
  const isExact = Math.abs(uVal - 9) < 0.05;
  const col = isExact ? C.ok : C.ps;

  const presets = [
    { label: "p1", jsx: <span><Tex>{"u = 1"}</Tex></span>, val: 1 },
    { label: "p5", jsx: <span><Tex>{"u = 5"}</Tex></span>, val: 5 },
    { label: "p9", jsx: <span><Tex>{"u = 9"}</Tex></span>, val: 9 },
  ];

  const graph = (() => {
    const pW = 500, pH = 280;
    const pad = { l: 40, r: 16, t: 20, b: 28 };
    const xMin = 0.5, xMax = 10, yMin = -1, yMax = 14;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 50} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const f1Pts = [], f2Pts = [];
    for (let i = 0; i <= 200; i++) {
      const x = 0.6 + (i / 200) * (xMax - 0.6);
      const y1 = f1(x);
      if (y1 <= yMax + 2) f1Pts.push(`${sx(x)},${sy(y1)}`);
      f2Pts.push(`${sx(x)},${sy(f2(x))}`);
    }
    // Shaded area between curves from 1 to uVal
    const areaTop = [], areaBot = [];
    const uClamped = Math.max(1, Math.min(uVal, 10));
    if (uClamped > 1) {
      for (let i = 0; i <= 80; i++) {
        const x = 1 + (i / 80) * (uClamped - 1);
        areaTop.push(`${sx(x)},${sy(Math.min(f1(x), yMax))}`);
        areaBot.unshift(`${sx(x)},${sy(f2(x))}`);
      }
    }
    const gridLines = [];
    for (let x = 1; x <= 9; x += 2) { gridLines.push(<line key={`gx${x}`} x1={sx(x)} y1={sy(yMax)} x2={sx(x)} y2={sy(yMin)} stroke={C.border} strokeWidth={0.5} />); }
    for (let y = 0; y <= 12; y += 4) { gridLines.push(<line key={`gy${y}`} x1={sx(xMin)} y1={sy(y)} x2={sx(xMax)} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />); }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="vgClip2"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        {gridLines}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <FO x={sx(xMax) - 10} y={sy(0) + 4} w={20} hh={18} color={C.muted}><Tex>{"x"}</Tex></FO>
        {[1, 5, 9].map(x => <FO key={`tx${x}`} x={sx(x) - 8} y={sy(0) + 4} w={16} hh={16} color={C.muted}><Tex>{String(x)}</Tex></FO>)}
        {[4, 8, 12].map(y => <FO key={`ty${y}`} x={pad.l - 28} y={sy(y) - 8} w={24} hh={16} color={C.muted}><Tex>{String(y)}</Tex></FO>)}
        <g clipPath="url(#vgClip2)">
          {uClamped > 1 && <polygon points={[...areaTop, ...areaBot].join(" ")} fill={col + "20"} />}
          <polyline points={f1Pts.join(" ")} fill="none" stroke={C.accentLight} strokeWidth={2} />
          <polyline points={f2Pts.join(" ")} fill="none" stroke={C.calc} strokeWidth={2} />
        </g>
        {/* Boundary lines */}
        <line x1={sx(1)} y1={sy(yMin)} x2={sx(1)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} strokeDasharray="3,3" />
        <line x1={sx(uClamped)} y1={sy(yMin)} x2={sx(uClamped)} y2={sy(yMax)} stroke={col} strokeWidth={1.5} strokeDasharray="3,3" />
        {/* Moving dot on upper curve */}
        {uClamped > 0.8 && <circle cx={sx(uClamped)} cy={sy(f1(uClamped))} r={4} fill={C.accentLight} stroke={C.white} strokeWidth={1.5} />}
        {uClamped > 0.8 && <circle cx={sx(uClamped)} cy={sy(f2(uClamped))} r={4} fill={C.calc} stroke={C.white} strokeWidth={1.5} />}
        {/* Legend */}
        <rect x={pW - 218} y={pH - 26} width={210} height={20} rx={4} fill={C.bg + "cc"} />
        <line x1={pW - 210} y1={pH - 16} x2={pW - 192} y2={pH - 16} stroke={C.accentLight} strokeWidth={2} />
        <FO x={pW - 190} y={pH - 24} w={80} hh={18} color={C.accentLight}><span style={{ fontSize: 11 }}><Tex>{"(\\sqrt x+\\frac1{\\sqrt x})^2"}</Tex></span></FO>
        <line x1={pW - 104} y1={pH - 16} x2={pW - 86} y2={pH - 16} stroke={C.calc} strokeWidth={2} />
        <FO x={pW - 84} y={pH - 24} w={76} hh={18} color={C.calc}><span style={{ fontSize: 11 }}><Tex>{"(\\sqrt x-\\frac1{\\sqrt x})^2"}</Tex></span></FO>
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      {/* Slider card */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}>Upper limit <Tex>{"u"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(uVal)}</Tex></span>
        </div>
        <input type="range" min={1} max={9} step={0.1} value={uVal} onChange={e => setUVal(handleSlider(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map(pr => { const active = Math.abs(uVal - pr.val) < 0.15; return (<button key={pr.label} onClick={() => setUVal(pr.val)} style={{ flex: 1, padding: "5px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.accentLight}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.accentLight, fontWeight: 700, marginBottom: 1 }}>Top curve at <Tex>{"u"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.accentLight }}><Tex>{uVal > 1 ? fmt(f1(uVal)) : "\\text{--}"}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 1 }}>Bottom curve at <Tex>{"u"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{uVal > 1 ? fmt(f2(uVal)) : "\\text{--}"}</Tex></div>
        </div>
        <div style={{ background: isExact ? C.conclBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 1 }}><Tex>{"\\int_1^u 4\\,dx"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col }}><Tex>{fmt(area)}</Tex></div>
        </div>
      </div>
      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      {/* Banner */}
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>At <Tex>{"u = 9"}</Tex>: the gap is always 4, so <Tex>{"\\int_1^9 4\\,dx = 4 \\times 8 = 32"}</Tex>. The answer is E.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Slide the upper limit to 9. The difference between the curves is always exactly 4.</span>
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
