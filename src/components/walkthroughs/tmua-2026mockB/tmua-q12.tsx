"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 12, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Quadratics / Optimisation" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "-1", expl: "You might get \u22121 by finding the minimum of g(k) = 2k\u00B2 \u2212 4k + 5 at k = 1, giving y = 3, then computing a + b = 1 + 3 = 4 but making a sign error to get \u22121." },
  { letter: "B", ok: false, tex: "0", expl: "You might get 0 by incorrectly assuming the lowest point occurs at the vertex of a single parabola where k = 0, forgetting that a varies with k." },
  { letter: "C", ok: false, tex: "1", expl: "You might get 1 by finding a = 1 correctly but then using b = 0 (the x-intercept) instead of b = 3 (the minimum y-value)." },
  { letter: "D", ok: false, tex: "3", expl: "You might get 3 by finding b = 3 correctly but then using a = 0 instead of a = 1, confusing the k-value that minimises g(k) with the x-coordinate." },
  { letter: "E", ok: true, tex: "4", expl: "Each parabola y_k has vertex at (k, 2k\u00B2 \u2212 4k + 5). Minimising 2k\u00B2 \u2212 4k + 5 = 2(k\u22121)\u00B2 + 3 gives k = 1, y = 3. So (a, b) = (1, 3) and a + b = 4." },
  { letter: "F", ok: false, tex: "7", expl: "You might get 7 by substituting k = 0 into g(k) = 2k\u00B2 \u2212 4k + 5 to get y = 5, then adding a = 2 from a different error, giving 2 + 5 = 7." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q12</span>
        A family of quadratic curves is given by <Tex>{"y_k = (x - k)^2 + 2k^2 - 4k + 5"}</Tex> where <Tex>{"k"}</Tex> is any real number. All these curves are sketched, and the point with the lowest y-coordinate among all the curves is <Tex>{"(a, b)"}</Tex>. Find the value of <Tex>{"a + b"}</Tex>.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","-1"],["B","0"],["C","1"],["D","3"],["E","4"],["F","7"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 12</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>A family of quadratic curves is given by</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"y_k = (x - k)^2 + 2k^2 - 4k + 5"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>where <Tex>{"k"}</Tex> is any real number.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>All these curves are sketched, and the point with the lowest y-coordinate among all the curves is <Tex>{"(a, b)"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Find the value of <Tex>{"a + b"}</Tex>.</p>
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
        <p style={{ margin: 0 }}>Each parabola <Tex>{"y_k"}</Tex> has its vertex at <Tex>{"x = k"}</Tex> with y-value <Tex>{"2k^2 - 4k + 5"}</Tex>. The lowest point overall is found by minimising this vertex y-value over all <Tex>{"k"}</Tex>. This is a "minimise over a family" problem: first find the vertex of each curve, then minimise that vertex height.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Let <Tex>{"g(k) = 2k^2 - 4k + 5"}</Tex> be the minimum y-value of the <Tex>{"k"}</Tex>-th parabola.</p>
        <p style={{ margin: 0 }}>The overall lowest point is the minimum of <Tex>{"g(k)"}</Tex>, which is itself a quadratic in <Tex>{"k"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Find the vertex of each parabola <Tex>{"y_k"}</Tex> as a function of <Tex>{"k"}</Tex>, then minimise over <Tex>{"k"}</Tex> to find the overall lowest point.</span>, math: (<div><Tex>{"\\text{Minimise } g(k) = \\text{vertex y-value of } y_k"}</Tex></div>) },
    { label: "VERTEX OF EACH PARABOLA", color: C.calc, text: <span>Since <Tex>{"y_k = (x - k)^2 + 2k^2 - 4k + 5"}</Tex> is already in vertex form, the minimum of <Tex>{"y_k"}</Tex> occurs at <Tex>{"x = k"}</Tex> where <Tex>{"(x - k)^2 = 0"}</Tex>.</span>, math: (<><div><Tex>{"\\text{Vertex of } y_k: \\quad x = k"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"y_{\\min} = 0 + 2k^2 - 4k + 5 = 2k^2 - 4k + 5"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Vertex: } (k,\\; 2k^2 - 4k + 5)"}</Tex></div></>) },
    { label: "MINIMISE g(k)", color: C.calc, text: <span>Complete the square for <Tex>{"g(k) = 2k^2 - 4k + 5"}</Tex> to find its minimum.</span>, math: (<><div><Tex>{"g(k) = 2k^2 - 4k + 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 2(k^2 - 2k) + 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 2(k - 1)^2 - 2 + 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 2(k - 1)^2 + 3"}</Tex></div></>) },
    { label: "READ OFF THE MINIMUM", color: C.calc, text: <span>Since <Tex>{"2(k-1)^2 \\ge 0"}</Tex>, the minimum of <Tex>{"g(k)"}</Tex> is <Tex>{"3"}</Tex>, achieved when <Tex>{"k = 1"}</Tex>. At <Tex>{"k = 1"}</Tex>, the vertex is at <Tex>{"x = k = 1"}</Tex>.</span>, math: (<><div><Tex>{"g(1) = 2(0) + 3 = 3"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(a, b) = (1, 3)"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"a + b = 1 + 3 = 4"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>The lowest point among all curves is <Tex>{"(1, 3)"}</Tex>, giving <Tex>{"a + b = 4"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{a + b = 4}"}</Tex></div>), conclusion: <span>The answer is E: <Tex>{"4"}</Tex>.</span> },
  ];

  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [kVal, setKVal] = useState(1);
  const snapPoints = [-2, -1, 0, 1, 2, 3, 4];
  const snapRadius = 0.2;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return Math.round(raw * 10) / 10; };

  const gk = (k) => 2 * k * k - 4 * k + 5;
  const yk = (x, k) => (x - k) * (x - k) + gk(k);
  const vertexY = gk(kVal);
  const isExact = Math.abs(kVal - 1) < 0.05;
  const isNear = !isExact && Math.abs(kVal - 1) < 0.5;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "km1", jsx: <span><Tex>{"k = -1"}</Tex></span>, val: -1 },
    { label: "k0", jsx: <span><Tex>{"k = 0"}</Tex></span>, val: 0 },
    { label: "k1", jsx: <span><Tex>{"k = 1"}</Tex></span>, val: 1 },
    { label: "k2", jsx: <span><Tex>{"k = 2"}</Tex></span>, val: 2 },
  ];

  const graph = (() => {
    const pW = 500;
    const pad = { l: 44, r: 16, t: 16, b: 28 };
    const xMin = -3.5, xMax = 5.5, yMin = 0, yMax = 12;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const pH = 300;
    const gW2 = pW - pad.l - pad.r;
    const gH = pH - pad.t - pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW2;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;

    const makeCurve = (k, steps) => {
      const pts = [];
      for (let i = 0; i <= steps; i++) {
        const x = xMin + (i / steps) * xRange;
        const y = yk(x, k);
        pts.push(`${sx(x)},${sy(y)}`);
      }
      return pts.join(" ");
    };

    // Ghost parabolas for several k values
    const ghostKs = [-1, 0, 0.5, 1, 1.5, 2];
    // Envelope: the curve g(k) = 2k^2 - 4k + 5 traced at (k, g(k))
    const envPts = [];
    for (let i = 0; i <= 60; i++) {
      const k = -1.5 + (i / 60) * 5;
      const y = gk(k);
      if (y <= yMax && y >= yMin) envPts.push(`${sx(k)},${sy(y)}`);
    }

    const FO = ({ x, y, w, hh, color, align, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="plotArea12"><rect x={pad.l} y={pad.t} width={gW2} height={gH} /></clipPath></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        <g clipPath="url(#plotArea12)">
          {/* Ghost parabolas */}
          {ghostKs.map(k => <polyline key={k} points={makeCurve(k, 80)} fill="none" stroke={C.border} strokeWidth={1} />)}
          {/* Envelope of vertices */}
          <polyline points={envPts.join(" ")} fill="none" stroke={C.assum} strokeWidth={1.5} strokeDasharray="4,3" />
          {/* Active parabola */}
          <polyline points={makeCurve(kVal, 100)} fill="none" stroke={col} strokeWidth={2.5} />
        </g>
        {/* Vertex dot of active parabola */}
        <circle cx={sx(kVal)} cy={sy(vertexY)} r={5} fill={col} stroke={C.white} strokeWidth={1.5} />
        {/* Lowest point marker */}
        <circle cx={sx(1)} cy={sy(3)} r={4} fill={C.ok} stroke={C.white} strokeWidth={1.5} />
        {/* Labels */}
        <FO x={sx(kVal) + 6} y={sy(vertexY) - 8} w={70} hh={16} color={col} bg><Tex>{`(${fmt(kVal)},\\,${fmt(vertexY)})`}</Tex></FO>
        {!isExact && <FO x={sx(1) - 36} y={sy(3) + 6} w={50} hh={16} color={C.ok} bg><Tex>{"(1,\\,3)"}</Tex></FO>}
        <FO x={sx(-1.5)} y={sy(gk(-1.5)) - 16} w={50} hh={16} color={C.assum} bg><Tex>{"g(k)"}</Tex></FO>
        {/* Axis ticks */}
        {[-2, 0, 2, 4].map(x => <FO key={"x" + x} x={sx(x) - 10} y={pH - pad.b + 2} w={20} hh={18}><Tex>{String(x)}</Tex></FO>)}
        {[0, 3, 6, 9, 12].map(y => <FO key={"y" + y} x={0} y={sy(y) - 9} w={pad.l - 6} hh={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      {/* Slider */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"k"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(kVal)}</Tex></span>
        </div>
        <input type="range" min={-1.5} max={3} step={0.1} value={kVal} onChange={e => setKVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map(pr => { const active = Math.abs(kVal - pr.val) < 0.15; return (<button key={pr.label} onClick={() => setKVal(pr.val)} style={{ flex: 1, padding: "5px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      {/* Panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 1 }}>Vertex <Tex>{"x"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{fmt(kVal)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 1 }}>Vertex <Tex>{"y"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col }}><Tex>{fmt(vertexY)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 1 }}>Lowest <Tex>{"y"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok }}><Tex>{"3"}</Tex></div>
        </div>
      </div>
      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      {/* Banner */}
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>At <Tex>{"k = 1"}</Tex>: vertex = <Tex>{"(1, 3)"}</Tex>, the lowest point. <Tex>{"a + b = 4"}</Tex>. The answer is E.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.assum }}>Close! Vertex y = <Tex>{fmt(vertexY)}</Tex>. Try <Tex>{"k = 1"}</Tex> for the lowest.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Vertex y = <Tex>{fmt(vertexY)}</Tex>. The minimum is <Tex>{"3"}</Tex> at <Tex>{"k = 1"}</Tex>.</span>
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
