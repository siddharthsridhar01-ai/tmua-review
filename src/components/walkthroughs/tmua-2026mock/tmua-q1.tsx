"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 1, paper: "Paper 1", year: "2026 Mock", topicTag: "Trig Equations / Quadratic Substitution" };

// Format number: 2dp for non-integers, no decimals for whole numbers
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "1", text: "1", ok: false, expl: "You might get 1 by finding only x = \u03C0/2 and missing x = 3\u03C0/2. Both values where sin x = \u00B11 satisfy sin\u00B2x = 1." },
  { letter: "B", tex: "2", text: "2", ok: true, expl: "Substituting u = sin\u00B2x gives (u\u22121)(u\u22122) = 0, so u = 1 or u = 2. Since sin\u00B2x \u2264 1, only u = 1 works, giving sin x = \u00B11, so x = \u03C0/2 and x = 3\u03C0/2." },
  { letter: "C", tex: "3", text: "3", ok: false, expl: "You might get 3 by including x = 0 or x = 2\u03C0. But sin\u00B2(0) = 0 \u2260 1, so these do not satisfy the equation." },
  { letter: "D", tex: "4", text: "4", ok: false, expl: "You might get 4 by solving sin\u00B2x = 2 as well, thinking it gives solutions. But sin\u00B2x cannot exceed 1, so u = 2 has no solutions." },
  { letter: "E", tex: "5", text: "5", ok: false, expl: "There is no way to get 5 solutions. The only valid substitution value u = 1 yields exactly 2 solutions." },
  { letter: "F", tex: "6", text: "6", ok: false, expl: "You might get 6 by counting solutions to sin x = 1 and sin x = \u22121 and incorrectly adding solutions from sin\u00B2x = 2." },
  { letter: "G", tex: "7", text: "7", ok: false, expl: "There is no mechanism to produce 7 solutions from a quadratic in sin\u00B2x with at most one valid root." },
  { letter: "H", tex: "8", text: "8", ok: false, expl: "You might get 8 by thinking each of sin x = \u00B11 and sin x = \u00B1\u221A2 gives 2 solutions each. But sin x = \u00B1\u221A2 has no solutions." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q1</span>
        How many real solutions are there to the equation <Tex>{"\\sin^4 x - 3\\sin^2 x + 2 = 0"}</Tex> in the interval <Tex>{"0 \\le x \\le 2\\pi"}</Tex>?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","1"],["B","2"],["C","3"],["D","4"],["E","5"],["F","6"],["G","7"],["H","8"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

// sin^2 x graph with horizontal line at y=1
function SinSqGraph({ compact }) {
  const pW = compact ? 220 : 500, pH = compact ? 130 : 200;
  const pad = { l: 36, r: 16, t: 16, b: 28 };
  const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
  const xMin = 0, xMax = 2 * Math.PI, yMin = -0.3, yMax = 2.5;
  const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
  const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
  const sinSq = (x) => Math.sin(x) * Math.sin(x);
  const pts = [];
  for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); const y = sinSq(x); pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); }
  return (
    <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
      <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lblBg"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
      {[0, 1, 2].map(y => y >= yMin && y <= yMax && <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
      <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
      <path d={"M" + pts.join("L")} fill="none" stroke={C.ps} strokeWidth={2.5} />
      <line x1={pad.l} y1={sy(1)} x2={pW - pad.r} y2={sy(1)} stroke={C.ok} strokeWidth={1.5} strokeDasharray="6,3" />
      <line x1={pad.l} y1={sy(2)} x2={pW - pad.r} y2={sy(2)} stroke={C.fail} strokeWidth={1.5} strokeDasharray="6,3" />
      <circle cx={sx(Math.PI / 2)} cy={sy(1)} r={compact ? 3.5 : 5} fill={C.ok} stroke={C.white} strokeWidth={1.5} />
      <circle cx={sx(3 * Math.PI / 2)} cy={sy(1)} r={compact ? 3.5 : 5} fill={C.ok} stroke={C.white} strokeWidth={1.5} />
      {compact && <foreignObject x={sx(Math.PI / 2) - 22} y={sy(1) + 13 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1 }}><Tex>{"\pi /2"}</Tex></div></foreignObject>}
      {compact && <foreignObject x={sx(3 * Math.PI / 2) - 22} y={sy(1) + 13 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1 }}><Tex>{"3\pi /2"}</Tex></div></foreignObject>}
      {!compact && <foreignObject x={pW - pad.r - 4 - 50} y={sy(1) - 6 - 12} width={52} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "right", lineHeight: 1 }}><Tex>{"u = 1"}</Tex></div></foreignObject>}
      {!compact && <foreignObject x={pW - pad.r - 4 - 50} y={sy(2) - 6 - 12} width={52} height={16}><div style={{ fontSize: 11, color: C.fail, textAlign: "right", lineHeight: 1 }}><Tex>{"u = 2 (impossible)"}</Tex></div></foreignObject>}
      {!compact && <foreignObject x={sx(Math.PI / 2) - 22} y={sy(1) + 16 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1 }}><Tex>{"\pi /2"}</Tex></div></foreignObject>}
      {!compact && <foreignObject x={sx(3 * Math.PI / 2) - 22} y={sy(1) + 16 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1 }}><Tex>{"3\pi /2"}</Tex></div></foreignObject>}
      <foreignObject x={sx(Math.PI) - 22} y={pH - pad.b + 14 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1 }}><Tex>{"\pi "}</Tex></div></foreignObject>
      <foreignObject x={sx(2 * Math.PI) - 22} y={pH - pad.b + 14 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1 }}><Tex>{"2\pi "}</Tex></div></foreignObject>
      {[1, 2].map(y => <foreignObject x={pad.l - 8 - 48} y={sy(y) + 4 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1 }}><Tex>{String(y)}</Tex></div></foreignObject>)}
    </svg>
  );
}

function ReadStep() {
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 1</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>How many real solutions are there to the equation</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}>
          <Tex>{"\\sin^4 x - 3\\sin^2 x + 2 = 0"}</Tex>
        </MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 10px" }}>in the interval <Tex>{"0 \\le x \\le 2\\pi"}</Tex>?</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (
          <div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}>
            <span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex>
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
        <p style={{ margin: 0 }}>Substitute <Tex>{"u = \\sin^2 x"}</Tex> to get a quadratic in <Tex>{"u"}</Tex>. Solve for <Tex>{"u"}</Tex>, then check which values are achievable (since <Tex>{"0 \\le \\sin^2 x \\le 1"}</Tex>), and count the corresponding <Tex>{"x"}</Tex> values.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Since <Tex>{"\\sin^2 x"}</Tex> ranges from <Tex>{"0"}</Tex> to <Tex>{"1"}</Tex>, any quadratic root with <Tex>{"u > 1"}</Tex> or <Tex>{"u < 0"}</Tex> is automatically rejected.</p>
        <p style={{ margin: 0 }}>For <Tex>{"\\sin^2 x = c"}</Tex> where <Tex>{"0 < c < 1"}</Tex>, there are <Tex>{"4"}</Tex> solutions in <Tex>{"[0, 2\\pi]"}</Tex>. But for <Tex>{"c = 1"}</Tex>, there are only <Tex>{"2"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    {
      label: "APPROACH", color: C.ps,
      text: <span>Recognise this is a quadratic in <Tex>{"\\sin^2 x"}</Tex>. Substitute <Tex>{"u = \\sin^2 x"}</Tex>, solve the quadratic, then filter for valid values and count solutions.</span>,
      math: (<div><Tex>{"u^2 - 3u + 2 = 0 \\quad \\text{\\color{#e2e2e8}{where}} \\; u = \\sin^2 x"}</Tex></div>),
    },
    {
      label: "FACTORISE", color: C.calc,
      text: <span>Factorise the quadratic in <Tex>{"u"}</Tex>.</span>,
      math: (
        <>
          <div><Tex>{"(u - 1)(u - 2) = 0"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"\\color{#fdcb6e}{u = 1 \\quad \\text{\\color{#e2e2e8}{or}} \\quad u = 2}"}</Tex></div>
        </>
      ),
    },
    {
      label: "FILTER VALID ROOTS", color: C.calc,
      text: <span>Since <Tex>{"0 \\le \\sin^2 x \\le 1"}</Tex>, the root <Tex>{"u = 2"}</Tex> is impossible.</span>,
      math: (
        <>
          <div><Tex>{"\\sin^2 x = 1 \\quad \\checkmark"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"\\color{#ff7675}{\\sin^2 x = 2 \\quad \\text{impossible}}"}</Tex></div>
        </>
      ),
      diagram: <div style={{ width: 220, background: "#1e2030", border: `1px solid ${C.calc}33`, borderRadius: 8, overflow: "hidden" }}><SinSqGraph compact={true} /></div>,
    },
    {
      label: "COUNT SOLUTIONS", color: C.calc,
      text: <span><Tex>{"\\sin^2 x = 1"}</Tex> means <Tex>{"\\sin x = \\pm 1"}</Tex>.</span>,
      math: (
        <>
          <div><Tex>{"\\sin x = 1 \\;\\Rightarrow\\; x = \\tfrac{\\pi}{2}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"\\sin x = -1 \\;\\Rightarrow\\; x = \\tfrac{3\\pi}{2}"}</Tex></div>
        </>
      ),
    },
    {
      label: "CONCLUSION", color: C.ok,
      text: <span>There are <Tex>{"2"}</Tex> solutions.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{2 \\text{ \\color{#e2e2e8}{solutions:}} \\; x = \\tfrac{\\pi}{2}, \\; \\tfrac{3\\pi}{2}}"}</Tex></div>),
      conclusion: <span>There are <Tex>{"2"}</Tex> solutions. The answer is B.</span>,
    },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => {
          if (i > revealed) return null;
          return (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                  <p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
                    <MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>
                    {s.diagram && <div style={{ flex: "0 0 220px", alignSelf: "flex-start" }}>{s.diagram}</div>}
                  </div>
                  {i === solveSteps.length - 1 && s.conclusion && (
                    <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>
                  )}
                </div>
              </div>
              {i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}
            </div>
          );
        })}
        {revealed < solveSteps.length - 1 && (
          <button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>
        )}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [xVal, setXVal] = useState(1);
  const snapPoints = [0, Math.PI / 4, Math.PI / 2, Math.PI, 3 * Math.PI / 2, 2 * Math.PI];
  const snapRadius = 0.12; // ~2% of 2pi range
  const handleSlider = (raw) => {
    for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; }
    return raw;
  };
  const sinSqVal = Math.sin(xVal) * Math.sin(xVal);
  const lhs = sinSqVal * sinSqVal - 3 * sinSqVal + 2;
  const sol1 = Math.PI / 2;
  const sol2 = 3 * Math.PI / 2;
  const isExact = Math.abs(xVal - sol1) < 0.01 || Math.abs(xVal - sol2) < 0.01;
  const isNear = !isExact && Math.abs(lhs) < 0.1;
  const isHit = isExact || isNear;

  const presets = [
    { label: "p1", jsx: <span><Tex>{"x = \\tfrac{\\pi}{4}"}</Tex></span>, val: Math.PI / 4 },
    { label: "p2", jsx: <span><Tex>{"x = \\tfrac{\\pi}{2}"}</Tex></span>, val: Math.PI / 2 },
    { label: "p3", jsx: <span><Tex>{"x = \\pi"}</Tex></span>, val: Math.PI },
    { label: "p4", jsx: <span><Tex>{"x = \\tfrac{3\\pi}{2}"}</Tex></span>, val: 3 * Math.PI / 2 },
  ];

  // Interactive graph
  const graph = (() => {
    const pW = 500, pH = 220;
    const pad = { l: 36, r: 16, t: 16, b: 28 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = 0, xMax = 2 * Math.PI, yMin = -0.3, yMax = 2.5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const sinSq = (x) => Math.sin(x) * Math.sin(x);
    const pts = [];
    for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); pts.push(`${sx(x).toFixed(1)},${sy(sinSq(x)).toFixed(1)}`); }
    const dotCol = isExact ? C.ok : isNear ? C.assum : C.ps;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lblBg2"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[0, 1, 2].map(y => y >= yMin && y <= yMax && <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <path d={"M" + pts.join("L")} fill="none" stroke={C.ps} strokeWidth={2.5} />
        <line x1={pad.l} y1={sy(1)} x2={pW - pad.r} y2={sy(1)} stroke={C.ok} strokeWidth={1.5} strokeDasharray="6,3" />
        <line x1={pad.l} y1={sy(2)} x2={pW - pad.r} y2={sy(2)} stroke={C.fail} strokeWidth={1.5} strokeDasharray="6,3" />
        {/* Solution markers */}
        <circle cx={sx(sol1)} cy={sy(1)} r={4} fill="none" stroke={C.ok} strokeWidth={1.5} strokeDasharray="3,2" />
        <circle cx={sx(sol2)} cy={sy(1)} r={4} fill="none" stroke={C.ok} strokeWidth={1.5} strokeDasharray="3,2" />
        {/* Moving dot with coordinates */}
        <circle cx={sx(xVal)} cy={sy(sinSqVal)} r={6} fill={dotCol} stroke={C.white} strokeWidth={1.5} />
        <foreignObject x={sx(xVal) - 30} y={sy(sinSqVal) - 12 - 12} width={60} height={18}><div style={{ fontSize: 11, color: C.white, textAlign: "center", lineHeight: 1, fontFamily: mathFont, fontWeight: 600, fontStyle: "normal" }}>({(xVal / Math.PI).toFixed(2)}{"\u03C0"}, {fmt(sinSqVal)})</div></foreignObject>
        {/* Labels */}
        <foreignObject x={pW - pad.r - 4 - 50} y={sy(1) - 6 - 12} width={52} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "right", lineHeight: 1 }}><Tex>{"u = 1"}</Tex></div></foreignObject>
        <foreignObject x={pW - pad.r - 4 - 50} y={sy(2) - 6 - 12} width={52} height={16}><div style={{ fontSize: 11, color: C.fail, textAlign: "right", lineHeight: 1 }}><Tex>{"u = 2"}</Tex></div></foreignObject>
        <foreignObject x={sx(sol1) - 22} y={sy(1) + 16 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1 }}><Tex>{"\pi /2"}</Tex></div></foreignObject>
        <foreignObject x={sx(sol2) - 22} y={sy(1) + 16 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1 }}><Tex>{"3\pi /2"}</Tex></div></foreignObject>
        <foreignObject x={sx(Math.PI) - 22} y={pH - pad.b + 14 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1 }}><Tex>{"\pi "}</Tex></div></foreignObject>
        <foreignObject x={sx(2 * Math.PI) - 22} y={pH - pad.b + 14 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1 }}><Tex>{"2\pi "}</Tex></div></foreignObject>
        {[1, 2].map(y => <foreignObject x={pad.l - 8 - 48} y={sy(y) + 4 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1 }}><Tex>{String(y)}</Tex></div></foreignObject>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Drag the slider to move the dot along the <Tex>{"\\sin^2 x"}</Tex> curve</p>
        <p style={{ margin: "0 0 4px" }}>2. The equation equals zero when <Tex>{"\\sin^2 x = 1"}</Tex> (green dashed line)</p>
        <p style={{ margin: 0 }}>3. Tap the presets to check the two solutions</p>
      </InfoBox>

      {/* Slider */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 16, color: C.assum, fontWeight: 700 }}>{(() => { const ex = Math.abs(xVal - Math.PI/2) < 0.01 ? "\\tfrac{\\pi}{2}" : Math.abs(xVal - Math.PI) < 0.01 ? "\\pi" : Math.abs(xVal - 3*Math.PI/2) < 0.01 ? "\\tfrac{3\\pi}{2}" : Math.abs(xVal - 2*Math.PI) < 0.01 ? "2\\pi" : Math.abs(xVal) < 0.01 ? "0" : null; return ex ? <span><Tex>{ex}</Tex><span style={{ fontFamily: mathFont, fontSize: 16, color: C.muted, marginLeft: 6 }}>{"\u2248"} {(xVal / Math.PI).toFixed(2)}{"\u03C0"}</span></span> : <span style={{ fontFamily: mathFont }}>{(xVal / Math.PI).toFixed(2)}{"\u03C0"}</span>; })()}</span>
        </div>
        <input type="range" min={0} max={2 * Math.PI} step={0.01} value={xVal} onChange={e => setXVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => {
            const active = isExact && Math.abs(xVal - pr.val) < 0.02;
            return (
              <button key={pr.label} onClick={() => setXVal(pr.val)} style={{
                flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s",
                border: `1px solid ${active ? C.ok : C.border}`,
                background: active ? C.ok + "15" : C.card,
                color: active ? C.ok : C.muted,
                fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400,
              }}>{pr.jsx || pr.label}</button>
            );
          })}
        </div>
      </div>

      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
        {graph}
      </div>

      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"\\sin^2 x"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(sinSqVal)}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${isExact ? C.ok + "66" : isNear ? C.assum + "66" : C.ps + "44"}`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: isExact ? C.ok : isNear ? C.assum : C.ps, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>LHS</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: isExact ? C.ok : isNear ? C.assum : C.ps, fontFamily: mathFont }}>{fmt(lhs)}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Target</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.white, fontFamily: mathFont }}>0</div>
        </div>
      </div>

      {/* Banner */}
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>
            {Math.abs(xVal - sol1) < 0.02
              ? <span>At <Tex>{"x = \\tfrac{\\pi}{2}"}</Tex>, <Tex>{"\\sin^2 x = 1"}</Tex> and the equation equals <Tex>{"0"}</Tex>. Try <Tex>{"x = \\tfrac{3\\pi}{2}"}</Tex> for the other solution. Total: <Tex>{"2"}</Tex>, answer is B.</span>
              : <span>At <Tex>{"x = \\tfrac{3\\pi}{2}"}</Tex>, <Tex>{"\\sin^2 x = 1"}</Tex> and the equation equals <Tex>{"0"}</Tex>. Both solutions found! Total: <Tex>{"2"}</Tex>, answer is B.</span>
            }
          </span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>
            {Math.abs(xVal - sol1) < Math.abs(xVal - sol2)
              ? <span>Close! <Tex>{`x \\approx ${(xVal / Math.PI).toFixed(2)}\\pi`}</Tex>. Tap <Tex>{"x = \\tfrac{\\pi}{2}"}</Tex> to check the exact solution.</span>
              : <span>Close! <Tex>{`x \\approx ${(xVal / Math.PI).toFixed(2)}\\pi`}</Tex>. Tap <Tex>{"x = \\tfrac{3\\pi}{2}"}</Tex> to check the exact solution.</span>
            }
          </span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>
            <Tex>{`\\sin^2 x = ${fmt(sinSqVal)}`}</Tex>, LHS = <Tex>{fmt(lhs)}</Tex>. Slide <Tex>{"x"}</Tex> to find where the equation equals <Tex>{"0"}</Tex>.
          </span>
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
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: 1 }}>TMUA</span>
            <span style={{ fontSize: 12, color: C.muted }}>{META.paper}</span><span style={{ fontSize: 12, color: C.muted }}>{"\u00B7"}</span><span style={{ fontSize: 12, color: C.ps }}>{META.topicTag}</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: titleFont, fontStyle: "italic", letterSpacing: 0.5 }}>Interactive Walkthrough</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>TMUA {META.year} {"\u00B7"} {META.paper} {"\u00B7"} Question {META.questionNumber}</p>
        </div>
        <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>{stepsMeta.map(s => (<button key={s.id} onClick={() => setStep(s.id)} style={{ flex: 1, minWidth: 0, background: step === s.id ? C.accent : step > s.id ? "rgba(108,92,231,0.15)" : "#1e2030", border: `1px solid ${step === s.id ? C.accent : step > s.id ? C.accent + "44" : C.border}`, borderRadius: 9, padding: "8px 3px", cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}><span style={{ fontSize: 13, fontWeight: 700, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted }}>{s.id + 1}</span><span style={{ fontSize: 11, fontWeight: step === s.id ? 700 : 500, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted, whiteSpace: "nowrap" }}>{s.label}</span></button>))}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><span style={{ background: C.accent, borderRadius: 6, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.white }}>{step + 1}</span><h2 style={{ fontSize: 16, fontWeight: 700, color: C.white, margin: 0 }}>{stepsMeta[step].title}</h2></div>
        {step === 0 && <ReadStep />}
        {step === 1 && <SetupStep />}
        {step === 2 && <SolveStepContent revealed={revealed} setRevealed={setRevealed} />}
        {step === 3 && <VerifyStepContent />}
        {step === 4 && (<div><QuestionSummary /><div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>{opts.map((o, i) => (<OptionCard key={o.letter} o={o} expanded={expanded === i} animate={optAnim[i]} onClick={() => setExpanded(expanded === i ? null : i)} />))}</div></div>)}
        <div style={{ display: "flex", gap: 10, marginTop: 20, paddingBottom: 28 }}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: `1px solid ${C.border}`, background: step === 0 ? C.card : "#1e2030", color: step === 0 ? C.muted : C.text, fontSize: 14, fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer", opacity: step === 0 ? 0.4 : 1 }}>{"\u2190"} Previous</button>
          {step < 4 ? (<button onClick={() => setStep(step + 1)} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Next {"\u2192"}</button>) : (<button style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.ok},#2ecc71)`, color: C.white, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Complete</button>)}
        </div>
      </div>
    </div>
  );
}
