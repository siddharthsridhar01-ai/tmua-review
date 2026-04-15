"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 16, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Coordinate Geometry / Perpendicular Gradients" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "16", expl: "You might get 16 by finding only three of the four values of k, perhaps missing k = \u22123 from the case where the right angle is at (0, 1)." },
  { letter: "B", ok: false, tex: "18", expl: "You might get 18 by finding k = \u22121, 7, 17 but missing k = \u22123, or by a sign error in the gradient calculation at (0, 1)." },
  { letter: "C", ok: true, tex: "20", expl: "There are four valid values: k = \u22123 (right angle at (0,1)), k = 17 (at (8,5)), and k = \u22121 or 7 (at (2,k)). Their sum is \u22123 + 17 + (\u22121) + 7 = 20." },
  { letter: "D", ok: false, tex: "22", expl: "You might get 22 by computing the case at (0,1) incorrectly as k = \u22121 instead of k = \u22123, double-counting \u22121." },
  { letter: "E", ok: false, tex: "24", expl: "You might get 24 by finding k = 7, 17 and solving the quadratic at (2,k) incorrectly to get different roots." },
  { letter: "F", ok: false, tex: "28", expl: "You might get 28 by summing absolute values |k| instead of signed values, giving 3 + 1 + 7 + 17 = 28." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

function QuestionSummary() { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}><p style={{ margin: "0 0 4px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}><span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q16</span>A right-angled triangle has vertices at <Tex>{"(0, 1)"}</Tex>, <Tex>{"(8, 5)"}</Tex> and <Tex>{"(2, k)"}</Tex>. Find the sum of all possible values of <Tex>{"k"}</Tex>.</p><div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>{[["A","16"],["B","18"],["C","20"],["D","22"],["E","24"],["F","28"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}</div></div>); }
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() { return (<div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 16</span></div><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>A right-angled triangle has vertices at <Tex>{"(0, 1)"}</Tex>, <Tex>{"(8, 5)"}</Tex> and <Tex>{"(2, k)"}</Tex>.</p><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Find the sum of all possible values of <Tex>{"k"}</Tex>.</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>{opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}</div></div>); }

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>The right angle can be at any of the three vertices. For each case, compute the gradients of the two sides meeting at that vertex. Perpendicular lines satisfy <Tex>{"m_1 \\times m_2 = -1"}</Tex>. This gives up to four values of <Tex>{"k"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Label: <Tex>{"A = (0, 1)"}</Tex>, <Tex>{"B = (8, 5)"}</Tex>, <Tex>{"C = (2, k)"}</Tex>.</p><p style={{ margin: 0 }}>The gradient of AB is <Tex>{"\\frac{5-1}{8-0} = \\frac{1}{2}"}</Tex>. This appears in every case.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const solveDiagram = (() => {
    const pW = 260, pad = { l: 20, r: 8, t: 12, b: 16 };
    const gW = pW - pad.l - pad.r;
    const xMin = -1.5, xMax = 10, yMin = -5, yMax = 19;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;
    const ks = [{ k: -3, col: C.calc, lbl: "\u22123" }, { k: -1, col: C.ps, lbl: "\u22121" }, { k: 7, col: C.ok, lbl: "7" }, { k: 17, col: C.assum, lbl: "17" }];
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.5} />
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.5} />
        <line x1={sx(0)} y1={sy(1)} x2={sx(8)} y2={sy(5)} stroke={C.muted} strokeWidth={1} />
        <circle cx={sx(0)} cy={sy(1)} r={3} fill={C.white} stroke={C.muted} strokeWidth={1} />
        <circle cx={sx(8)} cy={sy(5)} r={3} fill={C.white} stroke={C.muted} strokeWidth={1} />
        <foreignObject x={sx(0) - 4 - 50} y={sy(1) - 6 - 12} width={52} height={16}><div style={{ fontSize: 11, color: C.white, textAlign: "right", lineHeight: 1 }}><Tex>{"A"}</Tex></div></foreignObject>
        <foreignObject x={sx(8) + 4} y={sy(5) - 6 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.white, textAlign: "left", lineHeight: 1 }}><Tex>{"B"}</Tex></div></foreignObject>
        {ks.map(({ k, col, lbl }) => (<g key={k}><line x1={sx(0)} y1={sy(1)} x2={sx(2)} y2={sy(k)} stroke={col} strokeWidth={1} opacity={0.5} /><line x1={sx(8)} y1={sy(5)} x2={sx(2)} y2={sy(k)} stroke={col} strokeWidth={1} opacity={0.5} /><circle cx={sx(2)} cy={sy(k)} r={3} fill={col} stroke={C.white} strokeWidth={1} /><foreignObject x={sx(2) + 6} y={sy(k) + 4 - 12} width={50} height={16}><div style={{ fontSize: 11, color: col, textAlign: "left", lineHeight: 1 }}><Tex>{String(lbl)}</Tex></div></foreignObject></g>))}
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Try each vertex as the right-angle vertex. Two perpendicular sides have gradients satisfying <Tex>{"m_1 \\times m_2 = -1"}</Tex>.</span>, math: (<div><Tex>{"\\text{Perpendicular: } m_1 \\times m_2 = -1"}</Tex></div>) },
    { label: "GRADIENT OF AB", color: C.calc, text: <span>First compute the gradient of AB, as it appears in every case.</span>, math: (<div><Tex>{"m_{AB} = \\frac{5 - 1}{8 - 0} = \\frac{4}{8} = \\frac{1}{2}"}</Tex></div>) },
    { label: "RIGHT ANGLE AT A = (0, 1)", color: C.calc, text: <span>Edges from A: AB (gradient <Tex>{"\\frac{1}{2}"}</Tex>) and AC (gradient <Tex>{"\\frac{k-1}{2}"}</Tex>). Set their product to <Tex>{"-1"}</Tex>.</span>, math: (<><div><Tex>{"m_{AC} = \\frac{k - 1}{2 - 0} = \\frac{k-1}{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{1}{2} \\times \\frac{k-1}{2} = -1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"k - 1 = -4 \\;\\Rightarrow\\; k = -3"}</Tex></div></>) },
    { label: "RIGHT ANGLE AT B = (8, 5)", color: C.calc, text: <span>Edges from B: BA (gradient <Tex>{"\\frac{1}{2}"}</Tex>) and BC (gradient <Tex>{"\\frac{k-5}{-6}"}</Tex>).</span>, math: (<><div><Tex>{"m_{BC} = \\frac{k - 5}{2 - 8} = \\frac{k-5}{-6}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{1}{2} \\times \\frac{k-5}{-6} = -1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"k - 5 = 12 \\;\\Rightarrow\\; k = 17"}</Tex></div></>) },
    { label: "RIGHT ANGLE AT C = (2, k)", color: C.calc, text: <span>Edges from C: CA (gradient <Tex>{"\\frac{k-1}{2}"}</Tex>) and CB (gradient <Tex>{"\\frac{5-k}{6}"}</Tex>).</span>, math: (<><div><Tex>{"m_{CA} = \\frac{1-k}{0-2} = \\frac{k-1}{2}, \\quad m_{CB} = \\frac{5-k}{8-2} = \\frac{5-k}{6}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{k-1}{2} \\times \\frac{5-k}{6} = -1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(k-1)(5-k) = -12"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"5k - k^2 - 5 + k = -12"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"k^2 - 6k - 7 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(k - 7)(k + 1) = 0 \\;\\Rightarrow\\; k = 7 \\text{ or } k = -1"}</Tex></div></>) },
    { label: "SUM ALL VALUES", color: C.calc, text: <span>Four valid values of <Tex>{"k"}</Tex>.</span>, math: (<><div><Tex>{"k \\in \\{-3,\\; -1,\\; 7,\\; 17\\}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"-3 + (-1) + 7 + 17 = 20"}</Tex></div></>), diagram: solveDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>The sum of all possible values of <Tex>{"k"}</Tex> is <Tex>{"20"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\sum k = 20}"}</Tex></div>), conclusion: <span>The answer is C: <Tex>{"20"}</Tex>.</span> },
  ];

  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [selK, setSelK] = useState(null);
  const allKs = [-3, -1, 7, 17];
  const ax = 0, ay = 1, bx = 8, by = 5;

  const checkRight = (k) => {
    const cx = 2;
    const mAB = (by - ay) / (bx - ax);
    const mAC = (k - ay) / (cx - ax);
    const mBC = (k - by) / (cx - bx);
    if (Math.abs(mAB * mAC + 1) < 0.01) return { vertex: "A", vx: ax, vy: ay, e1: [bx, by], e2: [cx, k] };
    if (Math.abs(mAB * mBC + 1) < 0.01) return { vertex: "B", vx: bx, vy: by, e1: [ax, ay], e2: [cx, k] };
    if (Math.abs(mAC * mBC + 1) < 0.01) return { vertex: "C", vx: cx, vy: k, e1: [ax, ay], e2: [bx, by] };
    return null;
  };

  const graph = (() => {
    const pW = 500, pad = { l: 44, r: 16, t: 16, b: 28 };
    const gW2 = pW - pad.l - pad.r;
    const kShow = selK !== null ? selK : 7;
    const info = checkRight(kShow);
    const allY = [ay, by, kShow, 0];
    const yLo = Math.min(...allY) - 2, yHi = Math.max(...allY) + 2;
    const xMin = -2, xMax = 11;
    const xRange = xMax - xMin, yRange = yHi - yLo;
    // Square grid for undistorted right angles
    const gH = gW2 * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW2;
    const sy = (y) => pad.t + ((yHi - y) / yRange) * gH;
    const cx2 = 2, cy2 = kShow;

    // Right angle square indicator
    const sqr = 14;
    let rightAnglePoly = null;
    if (info) {
      const vxs = sx(info.vx), vys = sy(info.vy);
      const e1xs = sx(info.e1[0]), e1ys = sy(info.e1[1]);
      const e2xs = sx(info.e2[0]), e2ys = sy(info.e2[1]);
      const d1 = Math.sqrt((e1xs - vxs) ** 2 + (e1ys - vys) ** 2);
      const d2 = Math.sqrt((e2xs - vxs) ** 2 + (e2ys - vys) ** 2);
      const u1x = (e1xs - vxs) / d1 * sqr, u1y = (e1ys - vys) / d1 * sqr;
      const u2x = (e2xs - vxs) / d2 * sqr, u2y = (e2ys - vys) / d2 * sqr;
      rightAnglePoly = `${vxs + u1x},${vys + u1y} ${vxs + u1x + u2x},${vys + u1y + u2y} ${vxs + u2x},${vys + u2y}`;
    }

    const FO = ({ x, y, w, hh, color, align, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="plotArea16"><rect x={pad.l} y={pad.t} width={gW2} height={gH} /></clipPath></defs>
        {/* Grid */}
        {Array.from({ length: 14 }, (_, i) => xMin + i).filter(x => x >= xMin && x <= xMax).map(x => <line key={"gx" + x} x1={sx(x)} y1={pad.t} x2={sx(x)} y2={pad.t + gH} stroke={C.border} strokeWidth={0.3} />)}
        {Array.from({ length: 40 }, (_, i) => Math.floor(yLo) + i).filter(y => y >= yLo && y <= yHi).map(y => <line key={"gy" + y} x1={pad.l} y1={sy(y)} x2={pad.l + gW2} y2={sy(y)} stroke={C.border} strokeWidth={0.3} />)}
        {/* Axes */}
        <line x1={pad.l} y1={sy(0)} x2={pad.l + gW2} y2={sy(0)} stroke={C.muted} strokeWidth={0.8} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pad.t + gH} stroke={C.muted} strokeWidth={0.8} />
        <g clipPath="url(#plotArea16)">
          <polygon points={`${sx(ax)},${sy(ay)} ${sx(bx)},${sy(by)} ${sx(cx2)},${sy(cy2)}`} fill={info ? C.ok + "15" : C.ps + "15"} stroke={info ? C.ok : C.ps} strokeWidth={2} />
          {rightAnglePoly && <polyline points={rightAnglePoly} fill="none" stroke={C.ok} strokeWidth={1.5} />}
        </g>
        <circle cx={sx(ax)} cy={sy(ay)} r={4} fill={C.ps} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(bx)} cy={sy(by)} r={4} fill={C.ps} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(cx2)} cy={sy(cy2)} r={5} fill={info ? C.ok : C.calc} stroke={C.white} strokeWidth={1.5} />
        <FO x={sx(ax) - 46} y={sy(ay) - 8} w={44} hh={16} color={C.ps} bg><Tex>{"(0,1)"}</Tex></FO>
        <FO x={sx(bx) + 4} y={sy(by) - 8} w={44} hh={16} color={C.ps} bg><Tex>{"(8,5)"}</Tex></FO>
        <FO x={sx(cx2) + 6} y={sy(cy2) - 8} w={54} hh={16} color={info ? C.ok : C.calc} bg><Tex>{`(2,${kShow})`}</Tex></FO>
        {info && <FO x={sx(info.vx) + (info.vx < 4 ? -64 : 6)} y={sy(info.vy) + 10} w={60} hh={16} color={C.ok} bg><Tex>{`\\angle ${info.vertex} = 90^\\circ`}</Tex></FO>}
        {[0, 2, 4, 6, 8, 10].map(x => <FO key={"x" + x} x={sx(x) - 10} y={pad.t + gH + 2} w={20} hh={18}><Tex>{String(x)}</Tex></FO>)}
        {Array.from({ length: 30 }, (_, i) => Math.ceil(yLo) + i).filter(y => y >= yLo && y <= yHi && y % 2 === 0).map(y => <FO key={"y" + y} x={0} y={sy(y) - 9} w={pad.l - 6} hh={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5, marginBottom: 6 }}>
        {allKs.map(k => { const active = selK === k; const info = checkRight(k); return (<button key={k} onClick={() => setSelK(active ? null : k)} style={{ background: active ? C.ok + "15" : C.card, border: `1px solid ${active ? C.ok : C.border}`, borderRadius: 8, padding: "8px 4px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}><div style={{ fontSize: 18, fontWeight: 700, color: active ? C.ok : C.text }}><Tex>{`k = ${k}`}</Tex></div>{active && info && <div style={{ fontSize: 11, color: C.ok, marginTop: 2 }}><Tex>{`\\angle ${info.vertex} = 90^\\circ`}</Tex></div>}</button>); })}
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}><Tex>{`k \\in \\{-3,\\, -1,\\, 7,\\, 17\\}`}</Tex>. Sum = <Tex>{"-3 + (-1) + 7 + 17 = 20"}</Tex>. The answer is C.</span>
      </div>
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
