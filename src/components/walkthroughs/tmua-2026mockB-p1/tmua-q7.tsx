"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 7, set: "B", paperNumber: "Paper 1", topicTag: "Exponentials / Substitution" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "1", text: "1", ok: false, expl: "You might get x = 1 by solving 2\u02E3 = 2, which is the smaller root. The question asks for the largest x." },
  { letter: "B", ok: true, tex: "\\log_2 3", text: "log\u2082 3", expl: "Obtained by substituting u = 2\u02E3 to get u\u00B2 \u2212 5u + 6 = 0, so (u\u22122)(u\u22123) = 0. The roots u = 2, 3 give x = 1, log\u2082 3. Since log\u2082 3 \u2248 1.58 > 1, it is the largest." },
  { letter: "C", tex: "\\log_2 5", text: "log\u2082 5", ok: false, expl: "You might get log\u2082 5 by incorrectly factoring as u(u\u22125) = \u22126, or by confusing the coefficient 5 with a root." },
  { letter: "D", tex: "2", text: "2", ok: false, expl: "You might get 2 by solving 4\u02E3 = 16, i.e. trying x = 2 directly, but 4\u00B2 \u2212 5(4) + 6 = 16 \u2212 20 + 6 = 2 \u2260 0." },
  { letter: "E", tex: "\\log_2 6", text: "log\u2082 6", ok: false, expl: "You might get log\u2082 6 by misreading the constant term as 6 = 2\u02E3\u00B73\u02E3 and setting 2\u02E3 = 6 directly." },
  { letter: "F", tex: "3", text: "3", ok: false, expl: "You might get 3 by confusing the substitution root u = 3 with the answer x = 3, forgetting that u = 2\u02E3, so x = log\u2082 3, not 3." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const SECTIONS_Q7 = [
  { type: "prose", text: (<>Find the largest value of <Tex>{"x"}</Tex> such that</>) },
  { type: "mathbox", tex: "4^x - 5 \\cdot 2^x + 6 = 0" },
];
const OPTIONS_Q7 = [["A", "1"], ["B", "\\log_2 3"], ["C", "\\log_2 5"], ["D", "2"], ["E", "\\log_2 6"], ["F", "3"]];

function QuestionSummary() {
  const sections = SECTIONS_Q7;
  const options = OPTIONS_Q7;
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q7</span>
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

function ReadStep() {
  return (<div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 7</span></div><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Find the largest value of <Tex>{"x"}</Tex> such that</p><MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"4^x - 5 \\cdot 2^x + 6 = 0"}</Tex></MathBox></div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (
          <div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 100px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{o.letter}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{o.tex}</Tex></div>
          </div>
        ))}
      </div></div>);
}

function SetupStep() {
  return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Recognise that <Tex>{"4^x = (2^x)^2"}</Tex>. Substitute <Tex>{"u = 2^x"}</Tex> to convert into a standard quadratic in <Tex>{"u"}</Tex>, solve for <Tex>{"u"}</Tex>, then convert back to <Tex>{"x"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>The equation becomes <Tex>{"u^2 - 5u + 6 = 0"}</Tex>, which factors as <Tex>{"(u-2)(u-3) = 0"}</Tex>.</p><p style={{ margin: 0 }}>Since <Tex>{"u = 2^x > 0"}</Tex>, both roots <Tex>{"u = 2"}</Tex> and <Tex>{"u = 3"}</Tex> are valid, giving <Tex>{"x = 1"}</Tex> and <Tex>{"x = \\log_2 3"}</Tex>.</p></InfoBox></div>);
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Substitute <Tex>{"u = 2^x"}</Tex> so that <Tex>{"4^x = (2^x)^2 = u^2"}</Tex>, giving a quadratic in <Tex>{"u"}</Tex>.</span>, math: (<div><Tex>{"4^x - 5 \\cdot 2^x + 6 = 0 \\;\\Rightarrow\\; u^2 - 5u + 6 = 0"}</Tex></div>), },
    { label: "FACTORISE", color: C.calc, text: <span>Factor the quadratic.</span>, math: (<><div><Tex>{"u^2 - 5u + 6 = (u - 2)(u - 3) = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"u = 2 \\quad \\text{or} \\quad u = 3"}</Tex></div></>), },
    { label: "CONVERT BACK TO x", color: C.calc, text: <span>Since <Tex>{"u = 2^x"}</Tex>, solve each case.</span>, math: (<><div><Tex>{"2^x = 2 \\;\\Rightarrow\\; x = 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"2^x = 3 \\;\\Rightarrow\\; x = \\log_2 3"}</Tex></div></>), },
    { label: "COMPARE", color: C.calc, text: <span>Determine which is larger.</span>, math: (<><div><Tex>{"\\log_2 3 \\approx 1.58"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\log_2 3 > 1"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok, text: <span>The largest value of <Tex>{"x"}</Tex> is <Tex>{"\\log_2 3"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{x_{\\max} = \\log_2 3 \\approx 1.58}"}</Tex></div>), conclusion: <span>The answer is B: <Tex>{"\\log_2 3"}</Tex>.</span>, },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [xVal, setXVal] = useState(0.5);
  const log23 = Math.log2(3);
  const snapPoints = [0, 1, log23, 2, Math.log2(5), Math.log2(6), 3];
  const snapRadius = 0.08;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const exactMap = [
    { val: 1, tex: "1" },
    { val: log23, tex: "\\log_2 3" },
    { val: 2, tex: "2" },
    { val: Math.log2(5), tex: "\\log_2 5" },
    { val: Math.log2(6), tex: "\\log_2 6" },
    { val: 3, tex: "3" },
  ];
  const snappedExact = exactMap.find(e => Math.abs(xVal - e.val) < 0.02);

  const lhs = Math.pow(4, xVal) - 5 * Math.pow(2, xVal) + 6;
  const uVal = Math.pow(2, xVal);
  const isExact = Math.abs(lhs) < 0.05;
  const isNear = !isExact && Math.abs(lhs) < 0.5;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const xDisplay = snappedExact
    ? (Number.isInteger(snappedExact.val) ? <Tex>{snappedExact.tex}</Tex> : <span><Tex>{snappedExact.tex}</Tex> <span style={{ color: C.muted }}>{"\u2248"} <Tex>{fmt(xVal)}</Tex></span></span>)
    : <Tex>{fmt(xVal)}</Tex>;

  const presets = [
    { label: "x1", jsx: <span><Tex>{"x = 1"}</Tex></span>, val: 1 },
    { label: "xl3", jsx: <span><Tex>{"x = \\log_2 3"}</Tex></span>, val: log23 },
    { label: "x2", jsx: <span><Tex>{"x = 2"}</Tex></span>, val: 2 },
  ];

  const FO = ({ x, y, w, h, color, align, bg, children }) => (
    <foreignObject x={x} y={y} width={w || 40} height={h || 20}>
      <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
    </foreignObject>
  );

  const graph = (() => {
    const pW = 500, pH = 260;
    const pad = { l: 44, r: 16, t: 20, b: 32 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = -0.5, xMax = 3.5, yMin = -3, yMax = 8;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const curvePath = (fn, x0, x1) => { const pts = []; for (let i = 0; i <= 300; i++) { const x = x0 + (x1 - x0) * (i / 300); const y = fn(x); pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } return "M" + pts.join("L"); };
    const f = (x) => Math.pow(4, x) - 5 * Math.pow(2, x) + 6;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="plotArea"><rect x={pad.l} y={pad.t} width={gW} height={gH} /></clipPath></defs>
        {[0, 2, 4, 6].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        <g clipPath="url(#plotArea)">
          <path d={curvePath(f, xMin, xMax)} fill="none" stroke={C.ps} strokeWidth={2} />
          {/* Moving dot */}
          <circle cx={sx(xVal)} cy={sy(lhs)} r={5} fill={col} stroke={C.white} strokeWidth={1.5} />
        </g>
        {/* Roots */}
        <circle cx={sx(1)} cy={sy(0)} r={4} fill={C.ok} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(log23)} cy={sy(0)} r={4} fill={C.ok} stroke={C.white} strokeWidth={1} />
        {/* Labels */}
        <FO x={sx(0.7) - 20} y={sy(0) + 4} w={40} h={18} color={C.ok} bg><Tex>{"x = 1"}</Tex></FO>
        <FO x={sx(log23) - 24} y={sy(0) - 20} w={60} h={18} color={C.ok} bg><Tex>{"x = \\log_2 3"}</Tex></FO>
        <FO x={sx(2.5) - 50} y={sy(f(2.5)) - 18} w={100} h={18} color={C.ps} bg><Tex>{"4^x - 5{\\cdot}2^x + 6"}</Tex></FO>
        {/* Axes */}
        {[0, 1, 2, 3].map(x => <FO key={x} x={sx(x) - 10} y={pH - pad.b + 2} w={20} h={18}><Tex>{String(x)}</Tex></FO>)}
        {[0, 2, 4, 6].map(y => <FO key={y} x={0} y={sy(y) - 9} w={pad.l - 6} h={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>The curve <Tex>{"y = 4^x - 5 \\cdot 2^x + 6"}</Tex> crosses the x-axis at the solutions. There are two roots.</p>
        <p style={{ margin: 0 }}>Find both, and identify which is larger.</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}>{xDisplay}</span>
        </div>
        <input type="range" min={0} max={3} step={0.01} value={xVal} onChange={e => setXVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(xVal - pr.val) < 0.05; return (<button key={pr.label} onClick={() => setXVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>

      <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, transition: "all 0.3s" }}>
        <span style={{ fontSize: 13, color: col, fontWeight: 600 }}><Tex>{"4^x - 5{\\cdot}2^x + 6"}</Tex></span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: col }}><Tex>{fmt(lhs)}</Tex></span>
          <span style={{ fontSize: 16, marginLeft: 4 }}>{isExact ? "\u2705" : "\u274C"}</span>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>LHS = <Tex>{"0"}</Tex> at <Tex>{`x = ${snappedExact ? snappedExact.tex : fmt(xVal)}`}</Tex>. The largest root is <Tex>{"\\log_2 3"}</Tex>. The answer is B.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! LHS = <Tex>{fmt(lhs)}</Tex>. Try <Tex>{"x = 1"}</Tex> or <Tex>{"x = \\log_2 3"}</Tex>.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>LHS = <Tex>{fmt(lhs)}</Tex>. Find <Tex>{"x"}</Tex> where this equals <Tex>{"0"}</Tex>.</span>
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
