"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 11, paper: "Set B Paper 1", year: "2026 Mock", topicTag: "Functions / Transformations" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: true, tex: "k = \\dfrac{3}{3+c}", expl: "y = f(kx) has minimum at x = 3/k and y = f(x\u2212c) has minimum at x = 3+c. Setting 3/k = 3+c gives k = 3/(3+c)." },
  { letter: "B", ok: false, tex: "k = \\dfrac{3+c}{3}", expl: "You might get this by inverting the equation, writing k = (3+c)/3 instead of k = 3/(3+c). This swaps numerator and denominator." },
  { letter: "C", ok: false, tex: "k = \\dfrac{3}{c-3}", expl: "You might get this by using x = c\u22123 as the minimum of f(x\u2212c) instead of 3+c, perhaps subtracting c from 3 instead of adding." },
  { letter: "D", ok: false, tex: "k = \\dfrac{c}{3}", expl: "You might get this by setting 3k = c instead of 3/k = 3+c, confusing horizontal stretch with horizontal shift." },
  { letter: "E", ok: false, tex: "k = \\dfrac{6}{6+c}", expl: "You might get this by using the coefficient 6 from f(x) = x\u00B2\u22126x instead of the minimum x-coordinate 3." },
  { letter: "F", ok: false, tex: "k = \\dfrac{6+c}{6}", expl: "You might get this by the same error as E but also inverting the fraction." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q11</span>
        It is given that <Tex>{"f(x) = x^2 - 6x"}</Tex>. The curves <Tex>{"y = f(kx)"}</Tex> and <Tex>{"y = f(x - c)"}</Tex> have the same minimum point, where <Tex>{"k > 0"}</Tex> and <Tex>{"c > 0"}</Tex>. Which is a correct expression for <Tex>{"k"}</Tex> in terms of <Tex>{"c"}</Tex>?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","\\frac{3}{3+c}"],["B","\\frac{3+c}{3}"],["C","\\frac{3}{c-3}"],["D","\\frac{c}{3}"],["E","\\frac{6}{6+c}"],["F","\\frac{6+c}{6}"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 11</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>It is given that <Tex>{"f(x) = x^2 - 6x"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The curves</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"y = f(kx) \\qquad \\text{and} \\qquad y = f(x - c)"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>have the same minimum point, where <Tex>{"k > 0"}</Tex> and <Tex>{"c > 0"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Which is a correct expression for <Tex>{"k"}</Tex> in terms of <Tex>{"c"}</Tex>?</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (
          <div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 140px" }}>
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
        <p style={{ margin: 0 }}>Find the minimum of <Tex>{"f(x)"}</Tex> by completing the square. Then determine how the transformations <Tex>{"x \\to kx"}</Tex> (horizontal stretch) and <Tex>{"x \\to x - c"}</Tex> (horizontal shift) move that minimum. Set the two x-coordinates equal and solve for <Tex>{"k"}</Tex>.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}><Tex>{"f(x) = (x-3)^2 - 9"}</Tex> has minimum at <Tex>{"(3, -9)"}</Tex>.</p>
        <p style={{ margin: "0 0 4px" }}><Tex>{"y = f(kx)"}</Tex> replaces <Tex>{"x"}</Tex> with <Tex>{"kx"}</Tex>, so the minimum moves to <Tex>{"x = 3/k"}</Tex>.</p>
        <p style={{ margin: 0 }}><Tex>{"y = f(x - c)"}</Tex> shifts the graph right by <Tex>{"c"}</Tex>, so the minimum moves to <Tex>{"x = 3 + c"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Complete the square for <Tex>{"f(x)"}</Tex>, find the minimum, then apply each transformation to determine where each minimum lies. Set them equal.</span>, math: (<div><Tex>{"\\text{Set min of } f(kx) = \\text{min of } f(x-c)"}</Tex></div>) },
    { label: "COMPLETE THE SQUARE", color: C.calc, text: <span>Write <Tex>{"f(x)"}</Tex> in vertex form to read off the minimum.</span>, math: (<><div><Tex>{"f(x) = x^2 - 6x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= (x - 3)^2 - 9"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Minimum at } (3,\\,-9)"}</Tex></div></>) },
    { label: "MINIMUM OF f(kx)", color: C.calc, text: <span>Replace <Tex>{"x"}</Tex> by <Tex>{"kx"}</Tex>. The minimum of <Tex>{"f"}</Tex> occurs when its argument equals <Tex>{"3"}</Tex>, so <Tex>{"kx = 3"}</Tex>, giving <Tex>{"x = 3/k"}</Tex>. The y-value is unchanged at <Tex>{"-9"}</Tex>.</span>, math: (<><div><Tex>{"f(kx) = (kx)^2 - 6(kx) = (kx - 3)^2 - 9"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Min when } kx = 3 \\;\\Rightarrow\\; x = \\frac{3}{k}"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Minimum at } \\left(\\frac{3}{k},\\,-9\\right)"}</Tex></div></>) },
    { label: "MINIMUM OF f(x \u2212 c)", color: C.calc, text: <span>Replace <Tex>{"x"}</Tex> by <Tex>{"x - c"}</Tex>. The minimum of <Tex>{"f"}</Tex> occurs when its argument equals <Tex>{"3"}</Tex>, so <Tex>{"x - c = 3"}</Tex>, giving <Tex>{"x = 3 + c"}</Tex>.</span>, math: (<><div><Tex>{"f(x-c) = (x-c-3)^2 - 9"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Min when } x - c = 3 \\;\\Rightarrow\\; x = 3 + c"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Minimum at } (3+c,\\,-9)"}</Tex></div></>) },
    { label: "EQUATE AND SOLVE", color: C.calc, text: <span>Both curves have the same minimum point, so their x-coordinates must be equal. Note the y-coordinates are already both <Tex>{"-9"}</Tex>.</span>, math: (<><div><Tex>{"\\frac{3}{k} = 3 + c"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"k = \\frac{3}{3 + c}"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>The expression for <Tex>{"k"}</Tex> in terms of <Tex>{"c"}</Tex> is <Tex>{"\\frac{3}{3+c}"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{k = \\frac{3}{3+c}}"}</Tex></div>), conclusion: <span>The answer is A: <Tex>{"k = \\dfrac{3}{3+c}"}</Tex>.</span> },
  ];

  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [cVal, setCVal] = useState(1);
  const snapPoints = [0.5, 1, 2, 3, 4, 5];
  const snapRadius = 0.15;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return Math.round(raw * 10) / 10; };

  const kVal = 3 / (3 + cVal);
  const f = (x) => x * x - 6 * x;
  const fk = (x) => f(kVal * x);
  const fc = (x) => f(x - cVal);
  const minXk = 3 / kVal;
  const minXc = 3 + cVal;
  const minY = -9;

  const match = Math.abs(minXk - minXc) < 0.05;
  const col = match ? C.ok : C.ps;

  const presets = [
    { label: "c05", jsx: <span><Tex>{"c = 0.5"}</Tex></span>, val: 0.5 },
    { label: "c1", jsx: <span><Tex>{"c = 1"}</Tex></span>, val: 1 },
    { label: "c3", jsx: <span><Tex>{"c = 3"}</Tex></span>, val: 3 },
    { label: "c5", jsx: <span><Tex>{"c = 5"}</Tex></span>, val: 5 },
  ];

  const graph = (() => {
    const pW = 500;
    const pad = { l: 44, r: 16, t: 16, b: 28 };
    const gW = pW - pad.l - pad.r;
    const xMin = -2, xMax = Math.max(10, minXc + 2), yMin = -11, yMax = 4;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = Math.min(280, gW * (yRange / xRange));
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;

    const makeCurve = (fn, xL, xR, steps) => {
      const pts = [];
      for (let i = 0; i <= steps; i++) {
        const x = xL + (i / steps) * (xR - xL);
        const y = fn(x);
        pts.push(`${sx(x)},${sy(y)}`);
      }
      return pts.join(" ");
    };

    const fkPts = makeCurve(fk, xMin, xMax, 120);
    const fcPts = makeCurve(fc, xMin, xMax, 120);

    const FO = ({ x, y, w, hh, color, align, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs>
          <clipPath id="plotArea11"><rect x={pad.l} y={pad.t} width={gW} height={gH} /></clipPath>
          <filter x="-0.08" y="-0.2" width="1.16" height="1.45" id="lb11"><feFlood floodColor="#0f1117" floodOpacity="0.85"/><feComposite in="SourceGraphic" operator="over"/></filter>
        </defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        <g clipPath="url(#plotArea11)">
          <polyline points={fkPts} fill="none" stroke={C.calc} strokeWidth={2} />
          <polyline points={fcPts} fill="none" stroke={C.ps} strokeWidth={2} />
        </g>
        {/* Minimum dots */}
        <circle cx={sx(minXk)} cy={sy(minY)} r={4} fill={C.calc} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(minXc)} cy={sy(minY)} r={4} fill={C.ps} stroke={C.white} strokeWidth={1} />
        {/* Labels */}
        <FO x={sx(Math.min(minXk, 2)) - 10} y={sy(1.5)} w={70} hh={16} color={C.calc} bg><Tex>{"y = f(kx)"}</Tex></FO>
        <FO x={sx(Math.max(minXc, 5)) - 10} y={sy(1.5)} w={80} hh={16} color={C.ps} bg><Tex>{"y = f(x-c)"}</Tex></FO>
        {/* Coordinate labels */}
        <FO x={sx(minXk) - 30} y={sy(minY) + 6} w={64} hh={16} color={C.calc} bg><Tex>{`(${fmt(minXk)},\\,-9)`}</Tex></FO>
        {!match && <FO x={sx(minXc) - 30} y={sy(minY) - 18} w={64} hh={16} color={C.ps} bg><Tex>{`(${fmt(minXc)},\\,-9)`}</Tex></FO>}
        {/* Axis ticks */}
        {[0, 2, 4, 6, 8].filter(x => x <= xMax).map(x => <FO key={"x" + x} x={sx(x) - 10} y={pH - pad.b + 2} w={20} hh={18}><Tex>{String(x)}</Tex></FO>)}
        {[-9, -5, 0].map(y => <FO key={"y" + y} x={0} y={sy(y) - 9} w={pad.l - 6} hh={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      {/* Slider */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"c"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(cVal)}</Tex></span>
        </div>
        <input type="range" min={0.1} max={6} step={0.1} value={cVal} onChange={e => setCVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map(pr => { const active = Math.abs(cVal - pr.val) < 0.15; return (<button key={pr.label} onClick={() => setCVal(pr.val)} style={{ flex: 1, padding: "5px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      {/* Panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 1 }}><Tex>{"k = \\frac{3}{3+c}"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{fmt(kVal)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 1 }}>Min of <Tex>{"f(kx)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{`x = ${fmt(minXk)}`}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 1 }}>Min of <Tex>{"f(x\\!-\\!c)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{`x = ${fmt(minXc)}`}</Tex></div>
        </div>
      </div>
      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      {/* Banner */}
      {match ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>Both minima coincide at <Tex>{`x = ${fmt(minXc)}`}</Tex> with <Tex>{`k = ${fmt(kVal)}`}</Tex>. Confirmed: <Tex>{"k = \\frac{3}{3+c}"}</Tex>. The answer is A.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Minima at <Tex>{`x = ${fmt(minXk)}`}</Tex> and <Tex>{`x = ${fmt(minXc)}`}</Tex>. They always coincide when <Tex>{"k = \\frac{3}{3+c}"}</Tex>.</span>
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
