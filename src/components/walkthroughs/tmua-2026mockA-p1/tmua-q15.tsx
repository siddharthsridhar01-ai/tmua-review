"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 15, set: "A", paperNumber: "Paper 1", topicTag: "Optimisation / Rectangle Between Curves" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "4", text: "4", ok: false, expl: "You might get 4 by evaluating the area at a = \u221A3 (the intersection point), where the height is zero and the rectangle degenerates, or by a factor-of-2 error in the width." },
  { letter: "B", tex: "6", text: "6", ok: false, expl: "You might get 6 by computing the height at a = 1 as 6 \u2212 2(1) = 4 but using width = 1.5 or some other slip. The correct width is 2a = 2." },
  { letter: "C", tex: "8", text: "8", ok: true, expl: "The rectangle has width 2a and height (5 \u2212 a\u00B2) \u2212 (a\u00B2 \u2212 1) = 6 \u2212 2a\u00B2. Area = 2a(6 \u2212 2a\u00B2) = 12a \u2212 4a\u00B3. Setting dA/da = 12 \u2212 12a\u00B2 = 0 gives a = 1, and A(1) = 12 \u2212 4 = 8." },
  { letter: "D", tex: "10", text: "10", ok: false, expl: "You might get 10 by using a = \u221A(5/3) or a similar incorrect critical point from a sign error in the height formula." },
  { letter: "E", tex: "12", text: "12", ok: false, expl: "You might get 12 by computing 12a at a = 1 but forgetting to subtract 4a\u00B3. The full area is 12(1) \u2212 4(1)\u00B3 = 8, not 12." },
  { letter: "F", tex: "16", text: "16", ok: false, expl: "You might get 16 by computing the area of the bounding box (width 2\u221A3 \u00D7 height 6 \u2248 20.8) and rounding, or by doubling the correct answer." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const SECTIONS_Q15 = [
  { type: "prose", text: (<>A rectangle is drawn in the region enclosed by the curves</>) },
  { type: "mathbox", tex: "y = x^2 - 1 \\qquad \\text{and} \\qquad y = 5 - x^2" },
  { type: "prose", text: (<>such that the sides of the rectangle are parallel to the x- and y-axes and the rectangle is symmetric about the y-axis.</>) },
  { type: "prose", text: (<>What is the maximum possible area of the rectangle?</>) },
];
const OPTIONS_Q15 = [["A", "4"], ["B", "6"], ["C", "8"], ["D", "10"], ["E", "12"], ["F", "16"]];

function QuestionSummary() {
  const sections = SECTIONS_Q15;
  const options = OPTIONS_Q15;
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q15</span>
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
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 15</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>A rectangle is drawn in the region enclosed by the curves</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"y = x^2 - 1 \\qquad \\text{and} \\qquad y = 5 - x^2"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>such that the sides of the rectangle are parallel to the x- and y-axes and the rectangle is symmetric about the y-axis.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>What is the maximum possible area of the rectangle?</p>
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
        <p style={{ margin: 0 }}>By symmetry, the rectangle spans from <Tex>{"x = -a"}</Tex> to <Tex>{"x = a"}</Tex>, with bottom on <Tex>{"y = x^2 - 1"}</Tex> and top on <Tex>{"y = 5 - x^2"}</Tex>. Express the area as a function of <Tex>{"a"}</Tex>, differentiate, and set to zero to find the maximum.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Width = <Tex>{"2a"}</Tex>. Height = top curve minus bottom curve at <Tex>{"x = a"}</Tex>: <Tex>{"(5 - a^2) - (a^2 - 1) = 6 - 2a^2"}</Tex>.</p>
        <p style={{ margin: 0 }}>The curves intersect where <Tex>{"x^2 - 1 = 5 - x^2"}</Tex>, giving <Tex>{"x = \\pm\\sqrt{3}"}</Tex>, so the valid range is <Tex>{"0 < a \\le \\sqrt{3}"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const mkGraph = (aVal, showRect, label) => {
    const pW = 270, pH = 185;
    const pad = { l: 32, r: 12, t: 22, b: 24 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = -2.5, xMax = 2.5, yMin = -1.5, yMax = 5.5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const curvePath = (fn) => { const segs = []; let cur = []; for (let i = 0; i <= 200; i++) { const x = xMin + (xMax - xMin) * (i / 200); const y = fn(x); if (y >= yMin && y <= yMax) cur.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); else { if (cur.length > 1) segs.push("M" + cur.join("L")); cur = []; } } if (cur.length > 1) segs.push("M" + cur.join("L")); return segs.join(""); };
    const bot = (x) => x * x - 1, top = (x) => 5 - x * x;
    const yB = aVal * aVal - 1, yT = 5 - aVal * aVal, h = yT - yB;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lbs"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        {showRect && h > 0 && <rect x={sx(-aVal)} y={sy(yT)} width={sx(aVal) - sx(-aVal)} height={sy(yB) - sy(yT)} rx={2} fill={C.ok + "22"} stroke={C.ok} strokeWidth={1.5} />}
        <path d={curvePath(bot)} fill="none" stroke={C.assum} strokeWidth={1.5} />
        <path d={curvePath(top)} fill="none" stroke={C.ps} strokeWidth={1.5} />
        {showRect && h > 0 && <>
          <circle cx={sx(aVal)} cy={sy(yT)} r={3} fill={C.ok} stroke={C.white} strokeWidth={1} />
          <circle cx={sx(aVal)} cy={sy(yB)} r={3} fill={C.ok} stroke={C.white} strokeWidth={1} />
          <text x={(sx(-aVal) + sx(aVal)) / 2} y={(sy(yT) + sy(yB)) / 2 + 4} textAnchor="middle" fill={C.ok} fontSize={11} fontWeight={700} fontFamily={mathFont}>A = {Math.round(2 * aVal * h)}</text>
        </>}
        {label && <text x={pW / 2} y={pad.t - 6} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont} filter="url(#lbs)">{label}</text>}
      </svg>
    );
  };

  const intersectDiagram = mkGraph(Math.sqrt(3), false, "Intersection at x = \u00B1\u221A3");
  const optimalDiagram = mkGraph(1, true, "a = 1: width 2, height 4, area 8");

  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Write the area of the rectangle in terms of the half-width <Tex>{"a"}</Tex>, then differentiate to find the maximum.</span>,
      math: (<div><Tex>{"A(a) = \\text{width} \\times \\text{height} = 2a \\times \\bigl[(5 - a^2) - (a^2 - 1)\\bigr]"}</Tex></div>), },
    { label: "FIND WHERE THE CURVES INTERSECT", color: C.calc,
      text: <span>Set the two curves equal to find the boundary for <Tex>{"a"}</Tex>.</span>,
      math: (<><div><Tex>{"x^2 - 1 = 5 - x^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 + x^2 = 5 + 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"2x^2 = 6"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 = 3 \\;\\Rightarrow\\; x = \\pm\\sqrt{3}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{So } 0 < a \\le \\sqrt{3}"}</Tex></div></>),
      diagram: intersectDiagram, },
    { label: "SIMPLIFY THE AREA FORMULA", color: C.calc,
      text: <span>Compute the height at <Tex>{"x = a"}</Tex> and multiply by the width <Tex>{"2a"}</Tex>.</span>,
      math: (<><div><Tex>{"\\text{Height} = (5 - a^2) - (a^2 - 1) = 5 - a^2 - a^2 + 1 = 6 - 2a^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"A(a) = 2a(6 - 2a^2) = 12a - 4a^3"}</Tex></div></>), },
    { label: "DIFFERENTIATE AND FIND CRITICAL POINT", color: C.calc,
      text: <span>Differentiate <Tex>{"A(a) = 12a - 4a^3"}</Tex> with respect to <Tex>{"a"}</Tex> and set to zero.</span>,
      math: (<><div><Tex>{"\\frac{dA}{da} = 12 - 12a^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"12 - 12a^2 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"12a^2 = 12"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"a^2 = 1 \\;\\Rightarrow\\; a = 1 \\quad (\\text{since } a > 0)"}</Tex></div></>), },
    { label: "EVALUATE THE MAXIMUM AREA", color: C.calc,
      text: <span>Substitute <Tex>{"a = 1"}</Tex> into <Tex>{"A(a) = 12a - 4a^3"}</Tex>.</span>,
      math: (<><div><Tex>{"A(1) = 12(1) - 4(1)^3 = 12 - 4 = 8"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Check: } \\frac{d^2A}{da^2} = -24a = -24(1) = -24 < 0 \\;\\checkmark \\text{ (maximum)}"}</Tex></div></>),
      diagram: optimalDiagram, },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The maximum area of the rectangle is <Tex>{"8"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{A_{\\max} = 8 \\quad \\text{at } a = 1 \\;(\\text{rectangle from } x = -1 \\text{ to } x = 1)}"}</Tex></div>),
      conclusion: <span>The maximum area is <Tex>{"8"}</Tex>, achieved when <Tex>{"a = 1"}</Tex> (width <Tex>{"= 2"}</Tex>, height <Tex>{"= 4"}</Tex>). The answer is C.</span>, },
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
  const [aVal, setAVal] = useState(0.5);
  const sqr3 = Math.sqrt(3);
  const snapPoints = [0.5, 1, 1.5, sqr3];
  const snapRadius = 0.06;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const yBot = aVal * aVal - 1;
  const yTop = 5 - aVal * aVal;
  const height = yTop - yBot;
  const width = 2 * aVal;
  const area = width * height;
  const target = 8;
  const isExact = Math.abs(aVal - 1) < 0.005;
  const isNear = !isExact && Math.abs(area - target) < target * 0.05;
  const isHit = isExact || isNear;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "a05", jsx: <span><Tex>{"a = 0.5"}</Tex></span>, val: 0.5 },
    { label: "a1", jsx: <span><Tex>{"a = 1"}</Tex></span>, val: 1 },
    { label: "asq3", jsx: <span><Tex>{"a = \\sqrt{3}"}</Tex></span>, val: sqr3 },
  ];

  const graph = (() => {
    const pW = 500, pH = 280;
    const pad = { l: 40, r: 16, t: 20, b: 28 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = -2.5, xMax = 2.5, yMin = -1.5, yMax = 5.5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const curvePath = (fn) => { const segs = []; let cur = []; for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); const y = fn(x); if (y >= yMin && y <= yMax) cur.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); else { if (cur.length > 1) segs.push("M" + cur.join("L")); cur = []; } } if (cur.length > 1) segs.push("M" + cur.join("L")); return segs.join(""); };
    const bottom = (x) => x * x - 1;
    const top = (x) => 5 - x * x;
    const rectX1 = sx(-aVal), rectX2 = sx(aVal);
    const rectY1 = sy(yTop), rectY2 = sy(yBot);
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[0, 2, 4].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        {height > 0 && <rect x={rectX1} y={rectY1} width={rectX2 - rectX1} height={rectY2 - rectY1} rx={2} fill={col + "22"} stroke={col} strokeWidth={2} />}
        <path d={curvePath(bottom)} fill="none" stroke={C.assum} strokeWidth={2} />
        <path d={curvePath(top)} fill="none" stroke={C.ps} strokeWidth={2} />
        <circle cx={sx(sqr3)} cy={sy(top(sqr3))} r={3.5} fill={C.muted} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(-sqr3)} cy={sy(top(-sqr3))} r={3.5} fill={C.muted} stroke={C.white} strokeWidth={1} />
        <text x={sx(1.8)} y={sy(bottom(1.8)) + 14} textAnchor="start" fill={C.assum} fontSize={11} fontFamily={mathFont} filter="url(#lb)">y = x{"\u00B2"} {"\u2212"} 1</text>
        <text x={sx(1.5)} y={sy(top(1.5)) - 8} textAnchor="start" fill={C.ps} fontSize={11} fontFamily={mathFont} filter="url(#lb)">y = 5 {"\u2212"} x{"\u00B2"}</text>
        {height > 0 && <text x={(rectX1 + rectX2) / 2} y={(rectY1 + rectY2) / 2 + 4} textAnchor="middle" fill={col} fontSize={13} fontWeight={700} fontFamily={mathFont}>A = {fmt(area)}</text>}
        {[-2, -1, 1, 2].map(x => <text key={x} x={sx(x)} y={pH - pad.b + 14} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont}>{x}</text>)}
        {[0, 2, 4].map(y => <text key={y} x={pad.l - 8} y={sy(y) + 4} textAnchor="end" fill={C.muted} fontSize={11} fontFamily={mathFont}>{y}</text>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Slide <Tex>{"a"}</Tex> to change the half-width of the rectangle</p>
        <p style={{ margin: "0 0 4px" }}>2. The rectangle sits between the two parabolas, symmetric about the y-axis</p>
        <p style={{ margin: 0 }}>3. Find the value of <Tex>{"a"}</Tex> that maximises the shaded area</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}><Tex>{"a"}</Tex></span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{fmt(aVal)}</span>
        </div>
        <input type="range" min={0.1} max={sqr3} step={0.01} value={aVal} onChange={e => setAVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(aVal - pr.val) < 0.02; return (<button key={pr.label} onClick={() => setAVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active && isHit ? C.ok : active ? C.ps : C.border}`, background: active && isHit ? C.ok + "15" : active ? C.ps + "15" : C.card, color: active ? (isHit ? C.ok : C.ps) : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}>WIDTH</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(width)}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}>HEIGHT</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps, fontFamily: mathFont }}>{fmt(height)}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}>AREA</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col, fontFamily: mathFont, transition: "color 0.3s" }}>{fmt(area)}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}66`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Max</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>8</div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {isHit ? (
        isExact ? (
          <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>At <Tex>{"a = 1"}</Tex>: width <Tex>{"= 2"}</Tex>, height <Tex>{"= 4"}</Tex>, area <Tex>{"= 2 \\times 4 = 8"}</Tex>. The answer is C.</span>
          </div>
        ) : (
          <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! Area <Tex>{`\\approx ${fmt(area)}`}</Tex>. Tap <Tex>{"a = 1"}</Tex> to see the exact maximum.</span>
          </div>
        )
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Area <Tex>{`= ${fmt(area)}`}</Tex>. Slide to find the maximum (try <Tex>{"a = 1"}</Tex>).</span>
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
