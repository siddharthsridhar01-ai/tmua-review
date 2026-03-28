"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 9, paper: "Paper 1", year: "2026 Mock", topicTag: "Functional Equations / Quadratic in f" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "-4", text: "\u22124", ok: false, expl: "You might get \u22124 by incorrectly computing the discriminant as 9cos\u00B2x + 4sin\u00B2x = 9 + 4 = 13 at some point, or by an algebra slip." },
  { letter: "B", tex: "-3", text: "\u22123", ok: true, expl: "Writing g = f \u2212 3cos x and substituting gives f\u00B2 \u2212 3f cos x \u2212 sin\u00B2x = 0. Using the quadratic formula: f = (3cos x \u2212 \u221A(5cos\u00B2x + 4))/2. At cos x = \u22121: f = (\u22123 \u2212 \u221A9)/2 = (\u22123 \u2212 3)/2 = \u22123." },
  { letter: "C", tex: "-2", text: "\u22122", ok: false, expl: "You might get \u22122 by evaluating at cos x = 0 where f = (0 \u2212 2)/2 = \u22121, or by a different error in the discriminant." },
  { letter: "D", tex: "-1", text: "\u22121", ok: false, expl: "This is the value of f at x = \u03C0/2 (cos x = 0), not the global minimum. The minimum occurs at x = \u03C0 (cos x = \u22121)." },
  { letter: "E", tex: "0", text: "0", ok: false, expl: "This is the value of f at x = 0 (cos x = 1), using the '\u2212' branch. It is the maximum of the lower branch, not the minimum." },
  { letter: "F", tex: "1", text: "1", ok: false, expl: "You might get 1 by considering only the '+' branch of the quadratic formula, where f is always positive." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q9</span>
        This question is about pairs of functions <Tex>{"f"}</Tex> and <Tex>{"g"}</Tex> that satisfy <Tex>{"f(x) - g(x) = 3\\cos x"}</Tex> and <Tex>{"f(x) \\cdot g(x) = \\sin^2 x"}</Tex> for all real numbers <Tex>{"x"}</Tex>. Across all solutions for <Tex>{"f(x)"}</Tex>, what is the minimum value that <Tex>{"f(x)"}</Tex> attains for any <Tex>{"x"}</Tex>?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","-4"],["B","-3"],["C","-2"],["D","-1"],["E","0"],["F","1"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 9</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>This question is about pairs of functions <Tex>{"f"}</Tex> and <Tex>{"g"}</Tex> that satisfy</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"f(x) - g(x) = 3\\cos x"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>and</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"f(x) \\cdot g(x) = \\sin^2 x"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 10px" }}>for all real numbers <Tex>{"x"}</Tex>. Across all solutions for <Tex>{"f(x)"}</Tex>, what is the minimum value that <Tex>{"f(x)"}</Tex> attains for any <Tex>{"x"}</Tex>?</p>
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
        <p style={{ margin: 0 }}>Eliminate <Tex>{"g"}</Tex> by substituting <Tex>{"g = f - 3\\cos x"}</Tex> into the product equation. This gives a quadratic in <Tex>{"f"}</Tex> that you can solve with the quadratic formula, then minimise.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The quadratic formula gives two branches for <Tex>{"f"}</Tex>. The minimum comes from the "<Tex>{"-"}</Tex>" branch (the lower one).</p>
        <p style={{ margin: 0 }}>Since the discriminant (<Tex>{"b^2 - 4ac"}</Tex>) simplifies to <Tex>{"5\\cos^2 x + 4"}</Tex>, check the boundary values <Tex>{"\\cos x = \\pm 1"}</Tex> and <Tex>{"\\cos x = 0"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Eliminate <Tex>{"g"}</Tex> to get a quadratic in <Tex>{"f"}</Tex>, solve it, then find where the lower branch is minimised.</span>,
      math: (<div><Tex>{"g = f - 3\\cos x \\quad \\Rightarrow \\quad f(f - 3\\cos x) = \\sin^2 x"}</Tex></div>), },
    { label: "FORM QUADRATIC IN f", color: C.calc,
      text: <span>Expand and rearrange.</span>,
      math: (<div><Tex>{"f^2 - 3f\\cos x - \\sin^2 x = 0"}</Tex></div>), },
    { label: "APPLY QUADRATIC FORMULA", color: C.calc,
      text: <span>Here <Tex>{"a = 1"}</Tex>, <Tex>{"b = -3\\cos x"}</Tex>, <Tex>{"c = -\\sin^2 x"}</Tex>. The discriminant is <Tex>{"b^2 - 4ac"}</Tex>.</span>,
      math: (<><div><Tex>{"b^2 - 4ac = 9\\cos^2 x + 4\\sin^2 x = 9\\cos^2 x + 4(1 - \\cos^2 x) = 5\\cos^2 x + 4"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#fdcb6e}{f = \\frac{3\\cos x \\pm \\sqrt{5\\cos^2 x + 4}}{2}}"}</Tex></div></>), },
    { label: "MINIMISE THE LOWER BRANCH", color: C.calc,
      text: <span>Take the "<Tex>{"-"}</Tex>" branch and evaluate at the boundaries of <Tex>{"\\cos x \\in [-1, 1]"}</Tex>.</span>,
      math: (<><div><Tex>{"\\cos x = -1: \\; f = \\frac{-3 - \\sqrt{5(-1)^2 + 4}}{2} = \\frac{-3 - \\sqrt{9}}{2} = \\frac{-3 - 3}{2} = -3"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\cos x = 0: \\; f = \\frac{0 - \\sqrt{0 + 4}}{2} = \\frac{-2}{2} = -1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\cos x = 1: \\; f = \\frac{3 - \\sqrt{5 + 4}}{2} = \\frac{3 - 3}{2} = 0"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The minimum value of <Tex>{"f(x)"}</Tex> is <Tex>{"-3"}</Tex>, occurring when <Tex>{"\\cos x = -1"}</Tex> (i.e. <Tex>{"x = \\pi"}</Tex>).</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\min f(x) = -3}"}</Tex></div>),
      conclusion: <span>The minimum value of <Tex>{"f(x)"}</Tex> is <Tex>{"-3"}</Tex>. The answer is B.</span>, },
  ];
  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><MathBox>{s.math}</MathBox>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [xVal, setXVal] = useState(0);
  const snapPoints = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2, 2 * Math.PI];
  const snapRadius = 0.12;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };
  const cosVal = Math.cos(xVal);
  const disc = 5 * cosVal * cosVal + 4;
  const fPlus = (3 * cosVal + Math.sqrt(disc)) / 2;
  const fMinus = (3 * cosVal - Math.sqrt(disc)) / 2;
  const isExact = Math.abs(xVal - Math.PI) < 0.01;
  const isNear = !isExact && Math.abs(cosVal - (-1)) < 0.05;
  const isHit = isExact || isNear;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;
  const presets = [
    { label: "x0", jsx: <span><Tex>{"x = 0"}</Tex></span>, val: 0 },
    { label: "xpi2", jsx: <span><Tex>{"x = \\tfrac{\\pi}{2}"}</Tex></span>, val: Math.PI / 2 },
    { label: "xpi", jsx: <span><Tex>{"x = \\pi"}</Tex></span>, val: Math.PI },
    { label: "x3pi2", jsx: <span><Tex>{"x = \\tfrac{3\\pi}{2}"}</Tex></span>, val: 3 * Math.PI / 2 },
  ];
  const graph = (() => {
    const pW = 500, pH = 240;
    const pad = { l: 40, r: 16, t: 20, b: 28 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = 0, xMax = 2 * Math.PI, yMin = -3.5, yMax = 3.5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const fP = (x) => { const c = Math.cos(x); return (3 * c + Math.sqrt(5 * c * c + 4)) / 2; };
    const fM = (x) => { const c = Math.cos(x); return (3 * c - Math.sqrt(5 * c * c + 4)) / 2; };
    const ptsPlus = [], ptsMinus = [];
    for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); const yp = fP(x), ym = fM(x); if (yp >= yMin && yp <= yMax) ptsPlus.push(`${sx(x).toFixed(1)},${sy(yp).toFixed(1)}`); if (ym >= yMin && ym <= yMax) ptsMinus.push(`${sx(x).toFixed(1)},${sy(ym).toFixed(1)}`); }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[-2, 0, 2].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={pad.l} y1={sy(-3)} x2={pW - pad.r} y2={sy(-3)} stroke={C.ok} strokeWidth={1} strokeDasharray="6,3" />
        <path d={"M" + ptsPlus.join("L")} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="4,3" />
        <path d={"M" + ptsMinus.join("L")} fill="none" stroke={C.ps} strokeWidth={2.5} />
        <circle cx={sx(xVal)} cy={sy(fPlus)} r={4} fill={C.muted} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(xVal)} cy={sy(fMinus)} r={6} fill={col} stroke={C.white} strokeWidth={1.5} />
        <text x={sx(xVal)} y={sy(fMinus) - 12} textAnchor="middle" fill={C.white} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb)">({fmt(xVal / Math.PI)}{"\u03C0"}, {fmt(fMinus)})</text>
        <text x={pW - pad.r - 4} y={sy(-3) + 14} textAnchor="end" fill={C.ok} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb)">min = {"\u22123"}</text>
        <text x={sx(0.3)} y={sy(fP(0.3)) - 8} textAnchor="start" fill={C.muted} fontSize={11} fontFamily={mathFont} filter="url(#lb)">f+ = (3cos x + {"\u221A"}(5cos{"\u00B2"}x + 4))/2</text>
        <text x={sx(0.3)} y={sy(fM(0.3)) + 16} textAnchor="start" fill={C.ps} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb)">f{"\u2212"} = (3cos x {"\u2212"} {"\u221A"}(5cos{"\u00B2"}x + 4))/2</text>
        {[0, 1, 2].map(n => <text key={n} x={sx(n * Math.PI)} y={pH - pad.b + 14} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont}>{n === 0 ? "0" : n === 1 ? "\u03C0" : "2\u03C0"}</text>)}
        {[-3, -2, -1, 1, 2, 3].map(y => y >= yMin && y <= yMax && <text key={y} x={pad.l - 8} y={sy(y) + 4} textAnchor="end" fill={C.muted} fontSize={11} fontFamily={mathFont}>{y}</text>)}
      </svg>
    );
  })();
  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. The graph shows both branches of <Tex>{"f"}</Tex> from the quadratic formula</p>
        <p style={{ margin: "0 0 4px" }}>2. The solid blue curve is the lower branch (gives the minimum)</p>
        <p style={{ margin: 0 }}>3. Slide to <Tex>{"x = \\pi"}</Tex> to find where <Tex>{"f"}</Tex> reaches <Tex>{"-3"}</Tex></p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 16, color: C.assum, fontWeight: 700 }}>{(() => { const ex = Math.abs(xVal) < 0.01 ? "0" : Math.abs(xVal - Math.PI/2) < 0.01 ? "\\tfrac{\\pi}{2}" : Math.abs(xVal - Math.PI) < 0.01 ? "\\pi" : Math.abs(xVal - 3*Math.PI/2) < 0.01 ? "\\tfrac{3\\pi}{2}" : null; return ex ? <span><Tex>{ex}</Tex><span style={{ fontFamily: mathFont, fontSize: 16, color: C.muted, marginLeft: 6 }}>{"\u2248"} {fmt(xVal / Math.PI)}{"\u03C0"}</span></span> : <span style={{ fontFamily: mathFont }}>{fmt(xVal / Math.PI)}{"\u03C0"}</span>; })()}</span>
        </div>
        <input type="range" min={0} max={2 * Math.PI} step={0.01} value={xVal} onChange={e => setXVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(xVal - pr.val) < 0.02; return (<button key={pr.label} onClick={() => setXVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active && isHit ? C.ok : active ? C.ps : C.border}`, background: active && isHit ? C.ok + "15" : active ? C.ps + "15" : C.card, color: active ? (isHit ? C.ok : C.ps) : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ background: "#1e2030", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <div><Tex>{`\\color{#e2e2e8}{\\cos x = ${fmt(cosVal)}, \\quad b^2 - 4ac = 5(${fmt(cosVal)})^2 + 4 = ${fmt(disc)}}`}</Tex></div>
          <div style={{ marginTop: 6 }}><Tex>{`\\color{${C.ps}}{f_- = \\frac{${fmt(3 * cosVal)} - \\sqrt{${fmt(disc)}}}{2} = \\frac{${fmt(3 * cosVal)} - ${fmt(Math.sqrt(disc))}}{2} = ${fmt(fMinus)}}`}</Tex></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"\\cos x"}</Tex></div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(cosVal)}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}><Tex>{"f_-(x)"}</Tex></div>
          <div style={{ fontSize: 18, fontWeight: 700, color: col, fontFamily: mathFont, transition: "color 0.3s" }}>{fmt(fMinus)}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}66`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Min</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>{"\u22123"}</div>
        </div>
      </div>
      {isHit ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>At <Tex>{"x = \\pi"}</Tex>, <Tex>{"\\cos x = -1"}</Tex>: <Tex>{"f = \\tfrac{-3 - \\sqrt{9}}{2} = \\tfrac{-3 - 3}{2} = -3"}</Tex>. The answer is B.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}><Tex>{`f_- = ${fmt(fMinus)}`}</Tex> at <Tex>{`x = ${fmt(xVal / Math.PI)}\\pi`}</Tex>. Slide to <Tex>{"x = \\pi"}</Tex> to find the minimum.</span>
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
