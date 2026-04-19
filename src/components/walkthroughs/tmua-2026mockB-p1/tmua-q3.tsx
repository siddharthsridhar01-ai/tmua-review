"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 3, paper: "Set B Paper 1", year: "2026 Mock", topicTag: "Calculus / Second Derivative Conditions" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "-6", text: "-6", ok: true, expl: "Obtained by writing f(x) = (a/2)x\u00B2 + bx + 2. From f(1)=3: a/2 + b = 1. From the integral condition: a/6 + b/2 = 1. Solving gives a = \u22126." },
  { letter: "B", tex: "-3", text: "-3", ok: false, expl: "You might get \u22123 by a factor-of-2 error, e.g. forgetting the 1/2 when integrating x\u00B2, computing a/3 + b = 1 instead of a/6 + b/2 = 1." },
  { letter: "C", tex: "-2", text: "-2", ok: false, expl: "You might get \u22122 by confusing f'(x) = a with f''(x) = a, using f(x) = ax + c instead of the quadratic form." },
  { letter: "D", tex: "2", text: "2", ok: false, expl: "You might get 2 by the same linear confusion as C but with a sign error, or by misreading the integral target." },
  { letter: "E", tex: "3", text: "3", ok: false, expl: "You might get 3 by mixing up the integral result with f(1), or by forgetting to subtract 2 from the integral before solving." },
  { letter: "F", tex: "6", text: "6", ok: false, expl: "You might get 6 by a sign error in the final step. The equation \u2212a/12 = 1/2 gives a = \u22126, not +6." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q3</span>
        Given that <Tex>{"f''(x) = a"}</Tex> for all <Tex>{"x"}</Tex>, <Tex>{"f(0) = 2"}</Tex>, <Tex>{"f(1) = 3"}</Tex>, and <Tex>{"\\displaystyle\\int_0^1 f(x)\\,dx = 3"}</Tex>, find the value of <Tex>{"a"}</Tex>.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","-6"],["B","-3"],["C","-2"],["D","2"],["E","3"],["F","6"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 3</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Given the following statements about a function f:</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"f''(x) = a \\text{ for all } x, \\quad f(0) = 2, \\quad f(1) = 3, \\quad \\int_0^1 f(x)\\,dx = 3"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 10px" }}>Find the value of <Tex>{"a"}</Tex>.</p>
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
        <p style={{ margin: 0 }}>Since <Tex>{"f''(x) = a"}</Tex> (constant), <Tex>{"f"}</Tex> must be quadratic: <Tex>{"f(x) = \\tfrac{a}{2}x^2 + bx + c"}</Tex>. Use the three conditions <Tex>{"f(0)=2"}</Tex>, <Tex>{"f(1)=3"}</Tex>, and the integral to find <Tex>{"a"}</Tex>, <Tex>{"b"}</Tex>, <Tex>{"c"}</Tex>.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}><Tex>{"f(0) = 2"}</Tex> immediately gives <Tex>{"c = 2"}</Tex>. Then <Tex>{"f(1) = 3"}</Tex> and the integral each give a linear equation in <Tex>{"a"}</Tex> and <Tex>{"b"}</Tex>.</p>
        <p style={{ margin: 0 }}>Two equations, two unknowns: solve simultaneously.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Write the general quadratic with second derivative equal to <Tex>{"a"}</Tex>, then apply all three conditions.</span>,
      math: (<div><Tex>{"f''(x) = a \\;\\Rightarrow\\; f(x) = \\frac{a}{2}x^2 + bx + c"}</Tex></div>), },
    { label: "APPLY f(0) = 2", color: C.calc,
      text: <span>Substituting <Tex>{"x = 0"}</Tex> gives <Tex>{"c"}</Tex> directly.</span>,
      math: (<><div><Tex>{"f(0) = \\frac{a}{2}(0)^2 + b(0) + c = c = 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{So } c = 2"}</Tex></div></>), },
    { label: "APPLY f(1) = 3", color: C.calc,
      text: <span>Substituting <Tex>{"x = 1"}</Tex> and <Tex>{"c = 2"}</Tex>.</span>,
      math: (<><div><Tex>{"f(1) = \\frac{a}{2} + b + 2 = 3"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{a}{2} + b = 1 \\quad \\cdots \\text{(i)}"}</Tex></div></>), },
    { label: "APPLY THE INTEGRAL CONDITION", color: C.calc,
      text: <span>Integrate <Tex>{"f(x) = \\tfrac{a}{2}x^2 + bx + 2"}</Tex> from 0 to 1.</span>,
      math: (<><div><Tex>{"\\int_0^1 \\!\\left(\\frac{a}{2}x^2 + bx + 2\\right)dx = \\left[\\frac{a}{6}x^3 + \\frac{b}{2}x^2 + 2x\\right]_0^1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\frac{a}{6} + \\frac{b}{2} + 2 = 3"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{a}{6} + \\frac{b}{2} = 1 \\quad \\cdots \\text{(ii)}"}</Tex></div></>), },
    { label: "SOLVE SIMULTANEOUSLY", color: C.calc,
      text: <span>From (i): <Tex>{"b = 1 - a/2"}</Tex>. Substitute into (ii).</span>,
      math: (<><div><Tex>{"\\frac{a}{6} + \\frac{1 - a/2}{2} = 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{a}{6} + \\frac{1}{2} - \\frac{a}{4} = 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{a}{6} - \\frac{a}{4} = \\frac{1}{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{2a - 3a}{12} = \\frac{1}{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{-a}{12} = \\frac{1}{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"a = -6"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>With <Tex>{"a = -6"}</Tex>, we get <Tex>{"b = 1 - (-6)/2 = 4"}</Tex>, so <Tex>{"f(x) = -3x^2 + 4x + 2"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{a = -6}"}</Tex></div>),
      conclusion: <span>The answer is A: <Tex>{"a = -6"}</Tex>.</span>, },
  ];
  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [aVal, setAVal] = useState(0);
  const snapPoints = [-6, -3, -2, 0, 2, 3, 6];
  const snapRadius = 0.4;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const bVal = 1 - aVal / 2;
  const f = (x) => (aVal / 2) * x * x + bVal * x + 2;
  const f1 = f(1);
  const intVal = aVal / 6 + bVal / 2 + 2;
  const isExact = Math.abs(aVal - (-6)) < 0.1;
  const isNear = !isExact && Math.abs(intVal - 3) < 0.15;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "an6", jsx: <span><Tex>{"a = -6"}</Tex></span>, val: -6 },
    { label: "an3", jsx: <span><Tex>{"a = -3"}</Tex></span>, val: -3 },
    { label: "a0", jsx: <span><Tex>{"a = 0"}</Tex></span>, val: 0 },
    { label: "a6", jsx: <span><Tex>{"a = 6"}</Tex></span>, val: 6 },
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
    const xMin = -0.3, xMax = 1.5, yMin = -1, yMax = 5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const curvePath = (fn, x0, x1) => { const pts = []; for (let i = 0; i <= 200; i++) { const x = x0 + (x1 - x0) * (i / 200); const y = fn(x); pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } return "M" + pts.join("L"); };
    const fillPath = (fn, x0, x1) => { const pts = [`${sx(x0).toFixed(1)},${sy(0).toFixed(1)}`]; for (let i = 0; i <= 200; i++) { const x = x0 + (x1 - x0) * (i / 200); const y = fn(x); pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } pts.push(`${sx(x1).toFixed(1)},${sy(0).toFixed(1)}`); return "M" + pts.join("L") + "Z"; };
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs>
          <filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter>
          <clipPath id="plotArea"><rect x={pad.l} y={pad.t} width={gW} height={gH} /></clipPath>
        </defs>
        {[0, 1, 2, 3, 4].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(1)} y1={pad.t} x2={sx(1)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.8} strokeDasharray="4,3" />
        <g clipPath="url(#plotArea)">
          <path d={fillPath(f, 0, 1)} fill={col + "15"} />
          <path d={curvePath(f, xMin, xMax)} fill="none" stroke={col} strokeWidth={2} />
        </g>
        {/* Key points */}
        <circle cx={sx(0)} cy={sy(f(0))} r={4} fill={C.ps} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(1)} cy={sy(f(1))} r={4} fill={C.ps} stroke={C.white} strokeWidth={1} />
        {/* Point labels via foreignObject */}
        <FO x={sx(0) - 70} y={sy(f(0)) - 20} w={66} h={20} color={C.ps} align="right" bg><Tex>{`(0,\\,${fmt(f(0))})`}</Tex></FO>
        <FO x={sx(1) + 6} y={sy(f(1)) - 20} w={66} h={20} color={C.ps} align="left" bg><Tex>{`(1,\\,${fmt(f(1))})`}</Tex></FO>
        {/* Curve label */}
        <FO x={sx(0.85) - 20} y={sy(f(0.85)) - 22} w={44} h={18} color={col} align="center" bg><Tex>{"f(x)"}</Tex></FO>
        {/* Area label */}
        <FO x={(sx(0) + sx(1)) / 2 - 36} y={sy(intVal / 2.5) - 8} w={72} h={18} color={col} align="center" bg><Tex>{`\\text{area} = ${fmt(intVal)}`}</Tex></FO>
        {/* X-axis labels */}
        {[0, 1].map(x => <FO key={x} x={sx(x) - 12} y={pH - pad.b + 2} w={24} h={18} color={C.muted}><Tex>{String(x)}</Tex></FO>)}
        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(y => <FO key={y} x={pad.l - 30} y={sy(y) - 8} w={26} h={18} color={C.muted} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>Since <Tex>{"f(0) = 2"}</Tex> forces <Tex>{"c = 2"}</Tex>, and <Tex>{"f(1) = 3"}</Tex> forces <Tex>{"b = 1 - a/2"}</Tex>, the curve <Tex>{"f(x) = \\tfrac{a}{2}x^2 + bx + 2"}</Tex> depends only on <Tex>{"a"}</Tex>.</p>
        <p style={{ margin: 0 }}>The remaining question: for which <Tex>{"a"}</Tex> does <Tex>{"\\int_0^1 f(x)\\,dx = 3"}</Tex>?</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"a"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(aVal)}</Tex></span>
        </div>
        <input type="range" min={-10} max={10} step={0.1} value={aVal} onChange={e => setAVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(aVal - pr.val) < 0.2; return (<button key={pr.label} onClick={() => setAVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 2 }}><Tex>{"a"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{fmt(aVal)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{"b"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{fmt(bVal)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{"f(1)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{fmt(f1)}</Tex></div>
        </div>
        <div style={{ background: isExact ? C.conclBg : C.card, border: `1px solid ${isExact ? C.ok : C.muted}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: isExact ? C.ok : C.muted, fontWeight: 700, marginBottom: 2 }}><Tex>{"f(0)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: isExact ? C.ok : C.muted }}><Tex>{"2"}</Tex></div>
        </div>
      </div>
      <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, transition: "all 0.3s" }}>
        <span style={{ fontSize: 13, color: col, fontWeight: 600 }}><Tex>{"\\int_0^1 f(x)\\,dx"}</Tex></span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: col, transition: "color 0.3s" }}><Tex>{fmt(intVal)}</Tex></span>
          <span style={{ fontSize: 16, marginLeft: 4 }}>{isExact ? "\u2705" : "\u274C"}</span>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>All three conditions met: <Tex>{"f(x) = -3x^2 + 4x + 2"}</Tex>, so <Tex>{"a = -6"}</Tex>. The answer is A.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! The integral gives <Tex>{fmt(intVal)}</Tex> instead of <Tex>{"3"}</Tex>. Try <Tex>{"a = -6"}</Tex>.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>The integral gives <Tex>{fmt(intVal)}</Tex>, not <Tex>{"3"}</Tex>. Adjust <Tex>{"a"}</Tex> until it matches.</span>
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
