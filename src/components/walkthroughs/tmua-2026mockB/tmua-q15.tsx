"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 15, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Exponentials / Trig" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const a1 = (5 + Math.sqrt(29)) / 2;
const a2 = (-5 + Math.sqrt(29)) / 2;

const opts = [
  { letter: "A", ok: false, tex: "\\sqrt{13}", expl: "You might get \u221A13 by solving a\u00B2 \u2212 5a + 1 = 0 instead of a\u00B2 \u2212 5a \u2212 1 = 0, using the wrong sign for the constant term." },
  { letter: "B", ok: false, tex: "\\sqrt{21}", expl: "You might get \u221A21 by incorrectly setting up the equation as a\u00B2 \u2212 4a \u2212 1 = 0 (using cos x range as [\u22121/2, 1/2] or similar)." },
  { letter: "C", ok: true, tex: "\\sqrt{29}", expl: "The two valid values of a satisfy a \u2212 1/a = \u00B15. Solving gives a = (5+\u221A29)/2 and a = (\u22125+\u221A29)/2. Their sum is \u221A29." },
  { letter: "D", ok: false, tex: "\\sqrt{37}", expl: "You might get \u221A37 by solving a\u00B2 \u2212 5a \u2212 3 = 0 from a sign error when computing 1/a terms." },
  { letter: "E", ok: false, tex: "5", expl: "You might get 5 by only finding the a > 1 case where a \u2212 1/a = 5 and assuming there is only one solution, or by confusing the sum of a-values with the given difference." },
  { letter: "F", ok: false, tex: "6", expl: "You might get 6 by solving a different quadratic, perhaps a\u00B2 \u2212 6a + 1 = 0 from an arithmetic slip." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q15</span>
        The difference between the maximum and minimum values of the function <Tex>{"f(x) = a^{\\cos x}"}</Tex>, where <Tex>{"a > 0"}</Tex> and <Tex>{"x"}</Tex> is real, is <Tex>{"5"}</Tex>. Find the sum of the possible values of <Tex>{"a"}</Tex>.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","\\sqrt{13}"],["B","\\sqrt{21}"],["C","\\sqrt{29}"],["D","\\sqrt{37}"],["E","5"],["F","6"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  return (<div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 15</span></div><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The difference between the maximum and minimum values of the function</p><MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"f(x) = a^{\\cos x}"}</Tex></MathBox><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>where <Tex>{"a > 0"}</Tex> and <Tex>{"x"}</Tex> is real, is <Tex>{"5"}</Tex>.</p><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Find the sum of the possible values of <Tex>{"a"}</Tex>.</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>{opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}</div></div>);
}

function SetupStep() {
  return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Since <Tex>{"\\cos x"}</Tex> ranges from <Tex>{"-1"}</Tex> to <Tex>{"1"}</Tex>, <Tex>{"f(x) = a^{\\cos x}"}</Tex> ranges from <Tex>{"a^{-1}"}</Tex> to <Tex>{"a^1"}</Tex> (or vice versa if <Tex>{"0 < a < 1"}</Tex>). Set <Tex>{"|a - 1/a| = 5"}</Tex> and solve for <Tex>{"a"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Note <Tex>{"a = 1"}</Tex> gives <Tex>{"f(x) = 1"}</Tex> always (difference <Tex>{"0"}</Tex>), so <Tex>{"a \\ne 1"}</Tex>.</p><p style={{ margin: 0 }}>For <Tex>{"a > 1"}</Tex>: max = <Tex>{"a"}</Tex>, min = <Tex>{"1/a"}</Tex>. For <Tex>{"0 < a < 1"}</Tex>: max = <Tex>{"1/a"}</Tex>, min = <Tex>{"a"}</Tex>. Either way, <Tex>{"|a - 1/a| = 5"}</Tex>.</p></InfoBox></div>);
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Use the range of <Tex>{"\\cos x"}</Tex> to find the range of <Tex>{"a^{\\cos x}"}</Tex>, then set the difference equal to <Tex>{"5"}</Tex>.</span>, math: (<div><Tex>{"|a - a^{-1}| = 5"}</Tex></div>) },
    { label: "SET UP THE EQUATION", color: C.calc, text: <span>Since <Tex>{"-1 \\le \\cos x \\le 1"}</Tex>, the function <Tex>{"a^{\\cos x}"}</Tex> ranges between <Tex>{"a^{-1} = 1/a"}</Tex> and <Tex>{"a"}</Tex>. The difference is:</span>, math: (<><div><Tex>{"|a - \\tfrac{1}{a}| = 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Let } t = a - \\tfrac{1}{a}, \\text{ so } t = \\pm 5"}</Tex></div></>) },
    { label: "CASE 1: a > 1", color: C.calc, text: <span>When <Tex>{"a > 1"}</Tex>, we have <Tex>{"a - 1/a > 0"}</Tex>, so <Tex>{"a - 1/a = 5"}</Tex>.</span>, math: (<><div><Tex>{"a - \\tfrac{1}{a} = 5 \\;\\Rightarrow\\; a^2 - 5a - 1 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"a = \\frac{5 + \\sqrt{25 + 4}}{2} = \\frac{5 + \\sqrt{29}}{2}"}</Tex></div><div style={{ marginTop: 4, fontSize: 13, color: C.muted }}>(Taking the positive root since <Tex>{"a > 1"}</Tex>)</div></>) },
    { label: "CASE 2: 0 < a < 1", color: C.calc, text: <span>When <Tex>{"0 < a < 1"}</Tex>, we have <Tex>{"a - 1/a < 0"}</Tex>, so <Tex>{"1/a - a = 5"}</Tex>, i.e. <Tex>{"a - 1/a = -5"}</Tex>.</span>, math: (<><div><Tex>{"a - \\tfrac{1}{a} = -5 \\;\\Rightarrow\\; a^2 + 5a - 1 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"a = \\frac{-5 + \\sqrt{25 + 4}}{2} = \\frac{-5 + \\sqrt{29}}{2}"}</Tex></div><div style={{ marginTop: 4, fontSize: 13, color: C.muted }}>(Taking the positive root since <Tex>{"a > 0"}</Tex>; note <Tex>{"\\sqrt{29} > 5"}</Tex> so this is positive)</div></>) },
    { label: "SUM THE VALUES", color: C.calc, text: <span>Add the two valid values of <Tex>{"a"}</Tex>.</span>, math: (<><div><Tex>{"\\frac{5 + \\sqrt{29}}{2} + \\frac{-5 + \\sqrt{29}}{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\frac{2\\sqrt{29}}{2} = \\sqrt{29}"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>The sum of the possible values of <Tex>{"a"}</Tex> is <Tex>{"\\sqrt{29}"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\sqrt{29} \\approx 5.39}"}</Tex></div>), conclusion: <span>The answer is C: <Tex>{"\\sqrt{29}"}</Tex>.</span> },
  ];

  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [aVal, setAVal] = useState(a1);
  const snapPoints = [a2, 1, a1];
  const snapRadius = 0.15;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const maxF = Math.max(aVal, 1 / aVal);
  const minF = Math.min(aVal, 1 / aVal);
  const diff = maxF - minF;

  const isExact = Math.abs(diff - 5) < 0.05;
  const isNear = !isExact && Math.abs(diff - 5) < 0.5;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "a2v", jsx: <span><Tex>{`a_2 \\approx ${fmt(a2)}`}</Tex></span>, val: a2 },
    { label: "a1v", jsx: <span><Tex>{`a_1 \\approx ${fmt(a1)}`}</Tex></span>, val: a1 },
  ];

  const graph = (() => {
    const pW = 500;
    const pad = { l: 44, r: 16, t: 16, b: 28 };
    const gW2 = pW - pad.l - pad.r;
    const xMin = -Math.PI - 0.3, xMax = Math.PI + 0.3;
    const yMin = -0.5, yMax = Math.max(5, maxF + 0.5);
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const pH = 260;
    const gH = pH - pad.t - pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW2;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;

    const curvePts = [];
    for (let i = 0; i <= 120; i++) {
      const x = xMin + (i / 120) * xRange;
      const y = Math.pow(aVal, Math.cos(x));
      curvePts.push(`${sx(x)},${sy(y)}`);
    }

    const FO = ({ x, y, w, hh, color, align, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="plotArea15"><rect x={pad.l} y={pad.t} width={gW2} height={gH} /></clipPath></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        <g clipPath="url(#plotArea15)">
          <polyline points={curvePts.join(" ")} fill="none" stroke={col} strokeWidth={2} />
          {/* Max and min lines */}
          <line x1={pad.l} y1={sy(maxF)} x2={pW - pad.r} y2={sy(maxF)} stroke={C.ok} strokeWidth={1} strokeDasharray="4,3" />
          <line x1={pad.l} y1={sy(minF)} x2={pW - pad.r} y2={sy(minF)} stroke={C.fail} strokeWidth={1} strokeDasharray="4,3" />
        </g>
        <FO x={pW - pad.r - 70} y={sy(maxF) - 16} w={68} hh={16} color={C.ok} bg><Tex>{`\\text{max} = ${fmt(maxF)}`}</Tex></FO>
        <FO x={pW - pad.r - 70} y={sy(minF) + 2} w={68} hh={16} color={C.fail} bg><Tex>{`\\text{min} = ${fmt(minF)}`}</Tex></FO>
        <FO x={sx(0) + 4} y={sy(maxF / 2 + minF / 2) - 8} w={68} hh={16} color={col} bg><Tex>{`\\text{diff} = ${fmt(diff)}`}</Tex></FO>
        {[-3, -2, -1, 0, 1, 2, 3].map(x => <FO key={"x" + x} x={sx(x) - 10} y={pH - pad.b + 2} w={20} hh={18}><Tex>{String(x)}</Tex></FO>)}
        {[0, 1, 2, 3, 4].filter(y => y <= yMax).map(y => <FO key={"y" + y} x={0} y={sy(y) - 9} w={pad.l - 6} hh={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"a"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(aVal)}</Tex></span>
        </div>
        <input type="range" min={0.1} max={5.5} step={0.05} value={aVal} onChange={e => setAVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map(pr => { const active = Math.abs(aVal - pr.val) < 0.15; return (<button key={pr.label} onClick={() => setAVal(pr.val)} style={{ flex: 1, padding: "5px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 1 }}>Max</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok }}><Tex>{fmt(maxF)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.fail}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.fail, fontWeight: 700, marginBottom: 1 }}>Min</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.fail }}><Tex>{fmt(minF)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 1 }}>Difference</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col }}><Tex>{fmt(diff)}</Tex></div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}><Tex>{`a = ${fmt(aVal)}`}</Tex>: difference = <Tex>{"5"}</Tex> {"\u2705"}. Both solutions sum to <Tex>{"\\sqrt{29}"}</Tex>. The answer is C.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.assum }}>Close! Difference = <Tex>{fmt(diff)}</Tex>. Try one of the preset values.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Difference = <Tex>{fmt(diff)}</Tex>. Need <Tex>{"5"}</Tex>.</span>
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
