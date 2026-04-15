"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 6, paper: "Paper 1", year: "2026 Mock", topicTag: "Trig Identities / Range of Functions" };

const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "0", text: "0", ok: false, expl: "You might get 0 by thinking the function is constant. It simplifies to 1/(sin x + 2), which does vary as sin x changes." },
  { letter: "B", tex: "\\tfrac{1}{3}", text: "1/3", ok: false, expl: "This is the minimum value of f(x), not the difference. The minimum occurs when sin x = 1, giving f = 1/3." },
  { letter: "C", tex: "\\tfrac{1}{2}", text: "1/2", ok: false, expl: "You might get 1/2 by incorrectly simplifying the denominator or using cos\u00B2x = 1 + sin\u00B2x instead of 1 \u2212 sin\u00B2x." },
  { letter: "D", tex: "\\tfrac{2}{3}", text: "2/3", ok: true, expl: "Replacing cos\u00B2x with 1 \u2212 sin\u00B2x, the denominator becomes (sin x + 2)\u00B2. So f(x) = 1/(sin x + 2). Max is 1 (at sin x = \u22121), min is 1/3 (at sin x = 1). Difference = 2/3." },
  { letter: "E", tex: "1", text: "1", ok: false, expl: "This is the maximum value of f(x), not the difference. The maximum occurs when sin x = \u22121, giving f = 1." },
  { letter: "F", tex: "2", text: "2", ok: false, expl: "You might get 2 by computing max + min = 1 + 1/3 = 4/3 and then doubling by mistake, or by a different simplification error." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q6</span>
        The function <Tex>{"f"}</Tex> is given by <Tex>{"f(x) = \\dfrac{\\sin x + 2}{5 + 4\\sin x - \\cos^2 x}"}</Tex>. Find the positive difference between the maximum and the minimum values of <Tex>{"f(x)"}</Tex>.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","0"],["B","\\tfrac{1}{3}"],["C","\\tfrac{1}{2}"],["D","\\tfrac{2}{3}"],["E","1"],["F","2"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 6</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The function <Tex>{"f"}</Tex> is given by</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}>
          <Tex>{"f(x) = \\frac{\\sin x + 2}{5 + 4\\sin x - \\cos^2 x}"}</Tex>
        </MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 10px" }}>Find the positive difference between the maximum and the minimum values of <Tex>{"f(x)"}</Tex>.</p>
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
        <p style={{ margin: 0 }}>Use <Tex>{"\\cos^2 x = 1 - \\sin^2 x"}</Tex> to rewrite the denominator entirely in terms of <Tex>{"\\sin x"}</Tex>. Look for a simplification, then find the range.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The denominator <Tex>{"5 + 4\\sin x - \\cos^2 x"}</Tex> becomes <Tex>{"4 + 4\\sin x + \\sin^2 x = (\\sin x + 2)^2"}</Tex>.</p>
        <p style={{ margin: 0 }}>This means the numerator <Tex>{"(\\sin x + 2)"}</Tex> cancels with one factor, giving <Tex>{"f(x) = \\tfrac{1}{\\sin x + 2}"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    {
      label: "APPROACH", color: C.ps,
      text: <span>Replace <Tex>{"\\cos^2 x"}</Tex> with <Tex>{"1 - \\sin^2 x"}</Tex> to get everything in terms of <Tex>{"\\sin x"}</Tex>, then simplify and find the range.</span>,
      math: (<div><Tex>{"\\cos^2 x = 1 - \\sin^2 x"}</Tex></div>),
    },
    {
      label: "SIMPLIFY DENOMINATOR", color: C.calc,
      text: <span>Replace <Tex>{"\\cos^2 x"}</Tex> with <Tex>{"1 - \\sin^2 x"}</Tex> and expand.</span>,
      math: (
        <>
          <div><Tex>{"5 + 4\\sin x - \\cos^2 x"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"= 5 + 4\\sin x - (1 - \\sin^2 x)"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"= 5 + 4\\sin x - 1 + \\sin^2 x"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"= \\sin^2 x + 4\\sin x + 4"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"= \\color{#fdcb6e}{(\\sin x + 2)^2}"}</Tex></div>
        </>
      ),
    },
    {
      label: "CANCEL", color: C.calc,
      text: <span>The numerator <Tex>{"\\sin x + 2"}</Tex> cancels with one factor of the denominator.</span>,
      math: (
        <>
          <div><Tex>{"f(x) = \\frac{\\sin x + 2}{(\\sin x + 2)^2} = \\color{#fdcb6e}{\\frac{1}{\\sin x + 2}}"}</Tex></div>
        </>
      ),
    },
    {
      label: "FIND MAX AND MIN", color: C.calc,
      text: <span>Since <Tex>{"-1 \\le \\sin x \\le 1"}</Tex>, we have <Tex>{"1 \\le \\sin x + 2 \\le 3"}</Tex>. The reciprocal reverses the inequality.</span>,
      math: (
        <>
          <div><Tex>{"\\sin x = -1: \\quad f = \\frac{1}{-1 + 2} = \\frac{1}{1} = 1 \\quad \\text{\\color{#e2e2e8}{(max)}}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"\\sin x = 1: \\quad f = \\frac{1}{1 + 2} = \\frac{1}{3} \\quad \\text{\\color{#e2e2e8}{(min)}}"}</Tex></div>
        </>
      ),
    },
    {
      label: "CONCLUSION", color: C.ok,
      text: <span>Compute the positive difference.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{1 - \\frac{1}{3} = \\frac{3}{3} - \\frac{1}{3} = \\frac{2}{3}}"}</Tex></div>),
      conclusion: <span>The positive difference is <Tex>{"\\tfrac{2}{3}"}</Tex>. The answer is D.</span>,
    },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => {
          if (i > revealed) return null;
          return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><MathBox>{s.math}</MathBox>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>);
        })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [xVal, setXVal] = useState(0);
  const snapPoints = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2, 2 * Math.PI];
  const snapRadius = 0.12;
  const handleSlider = (raw) => {
    for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; }
    return raw;
  };

  const sinVal = Math.sin(xVal);
  const fVal = 1 / (sinVal + 2);
  const fOriginal = (sinVal + 2) / (5 + 4 * sinVal - Math.cos(xVal) * Math.cos(xVal));
  const maxF = 1, minF = 1 / 3;
  const diff = maxF - minF;

  const isAtMax = Math.abs(sinVal - (-1)) < 0.05;
  const isAtMin = Math.abs(sinVal - 1) < 0.05;
  const isExact = (Math.abs(xVal - 3 * Math.PI / 2) < 0.01) || (Math.abs(xVal - Math.PI / 2) < 0.01);
  const isNear = !isExact && (isAtMax || isAtMin);
  const isHit = isExact || isNear;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "x0", jsx: <span><Tex>{"x = 0"}</Tex></span>, val: 0 },
    { label: "xpi2", jsx: <span><Tex>{"x = \\tfrac{\\pi}{2}"}</Tex></span>, val: Math.PI / 2 },
    { label: "xpi", jsx: <span><Tex>{"x = \\pi"}</Tex></span>, val: Math.PI },
    { label: "x3pi2", jsx: <span><Tex>{"x = \\tfrac{3\\pi}{2}"}</Tex></span>, val: 3 * Math.PI / 2 },
  ];

  // Graph of f(x) = 1/(sinx + 2)
  const graph = (() => {
    const pW = 500, pH = 220;
    const pad = { l: 40, r: 16, t: 20, b: 28 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = 0, xMax = 2 * Math.PI, yMin = 0, yMax = 1.3;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const fn = (x) => 1 / (Math.sin(x) + 2);
    const pts = [];
    for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); pts.push(`${sx(x).toFixed(1)},${sy(fn(x)).toFixed(1)}`); }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lblBg"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[0.5, 1].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        {/* Max and min horizontal lines */}
        <line x1={pad.l} y1={sy(1)} x2={pW - pad.r} y2={sy(1)} stroke={C.ok} strokeWidth={1} strokeDasharray="6,3" />
        <line x1={pad.l} y1={sy(1/3)} x2={pW - pad.r} y2={sy(1/3)} stroke={C.assum} strokeWidth={1} strokeDasharray="6,3" />
        {/* Curve */}
        <path d={"M" + pts.join("L")} fill="none" stroke={C.ps} strokeWidth={2.5} />
        {/* Moving dot with coordinates */}
        <circle cx={sx(xVal)} cy={sy(fVal)} r={6} fill={col} stroke={C.white} strokeWidth={1.5} />
        <foreignObject x={sx(xVal) - 48} y={sy(fVal) - 12 - 13} width={96} height={20}><div style={{ fontSize: 11, color: C.white, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>({fmt(xVal / Math.PI)}{"\u03C0"}, {fmt(fVal)})</div></foreignObject>
        {/* Labels */}
        <foreignObject x={pW - pad.r - 4 - 72} y={sy(1) - 6 - 13} width={72} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "right", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", marginLeft: "auto" }}>max = 1</div></foreignObject>
        <foreignObject x={pW - pad.r - 4 - 88} y={sy(1/3) + 14 - 13} width={88} height={20}><div style={{ fontSize: 11, color: C.assum, textAlign: "right", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", marginLeft: "auto" }}>min = 1/3</div></foreignObject>
        {/* Axis labels */}
        {[0, 1, 2].map(n => <foreignObject key={n} x={sx(n * Math.PI) - 16} y={pH - pad.b + 14 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>{n === 0 ? "0" : n === 1 ? "\u03C0" : "2\u03C0"}</div></foreignObject>)}
        {[0.5, 1].map(y => <foreignObject key={y} x={pad.l - 8 - 32} y={sy(y) + 4 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1, fontWeight: 400, fontStyle: "normal", marginLeft: "auto" }}>{y}</div></foreignObject>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. The graph shows the simplified <Tex>{"f(x) = \\tfrac{1}{\\sin x + 2}"}</Tex></p>
        <p style={{ margin: "0 0 4px" }}>2. Drag the slider to find where <Tex>{"f"}</Tex> is largest and smallest</p>
        <p style={{ margin: 0 }}>3. The max occurs when <Tex>{"\\sin x = -1"}</Tex>, the min when <Tex>{"\\sin x = 1"}</Tex></p>
      </InfoBox>

      {/* Slider */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{fmt(xVal / Math.PI)}{"\u03C0"}</span>
        </div>
        <input type="range" min={0} max={2 * Math.PI} step={0.01} value={xVal} onChange={e => setXVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => {
            const active = Math.abs(xVal - pr.val) < 0.02;
            return (<button key={pr.label} onClick={() => setXVal(pr.val)} style={{
              flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s",
              border: `1px solid ${active && isHit ? C.ok : active ? C.ps : C.border}`,
              background: active && isHit ? C.ok + "15" : active ? C.ps + "15" : C.card,
              color: active ? (isHit ? C.ok : C.ps) : C.muted,
              fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400,
            }}>{pr.jsx || pr.label}</button>);
          })}
        </div>
      </div>

      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
        {graph}
      </div>

      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"\\sin x"}</Tex></div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(sinVal)}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}><Tex>{"f(x)"}</Tex></div>
          <div style={{ fontSize: 18, fontWeight: 700, color: col, fontFamily: mathFont, transition: "color 0.3s" }}>{fmt(fVal)}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Max</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>1</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Min</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>1/3</div>
        </div>
      </div>

      {/* Banner */}
      {isHit ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>
            {isAtMax
              ? <span>At <Tex>{"x = \\tfrac{3\\pi}{2}"}</Tex>, <Tex>{"\\sin x = -1"}</Tex> and <Tex>{"f = 1"}</Tex> (maximum). Try <Tex>{"x = \\tfrac{\\pi}{2}"}</Tex> for the minimum. Difference = <Tex>{"1 - \\tfrac{1}{3} = \\tfrac{2}{3}"}</Tex>. Answer is D.</span>
              : <span>At <Tex>{"x = \\tfrac{\\pi}{2}"}</Tex>, <Tex>{"\\sin x = 1"}</Tex> and <Tex>{"f = \\tfrac{1}{3}"}</Tex> (minimum). Try <Tex>{"x = \\tfrac{3\\pi}{2}"}</Tex> for the maximum. Difference = <Tex>{"1 - \\tfrac{1}{3} = \\tfrac{2}{3}"}</Tex>. Answer is D.</span>
            }
          </span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>
            <Tex>{`\\sin x = ${fmt(sinVal)}`}</Tex>, <Tex>{`f(x) = ${fmt(fVal)}`}</Tex>. Slide to find where <Tex>{"f"}</Tex> is largest and smallest.
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
