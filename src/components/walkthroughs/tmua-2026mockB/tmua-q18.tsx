"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 18, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Transformations / Rotation" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: true, tex: "x = (4 - y)^2 + 3", expl: "Rotating 90° clockwise about (3,2): (x,y) maps to (3+(y\u22122), 2\u2212(x\u22123)). Substituting into y = (x\u22121)\u00B2+2 gives X\u22121 = (4\u2212Y)\u00B2+2, so X = (4\u2212Y)\u00B2+3, i.e. x = (4\u2212y)\u00B2+3." },
  { letter: "B", ok: false, tex: "x = -(4 - y)^2 + 3", expl: "You might get this by introducing an incorrect negative sign, perhaps confusing clockwise with anticlockwise rotation." },
  { letter: "C", ok: false, tex: "y = (x - 4)^2 + 3", expl: "You might get this by swapping x and y roles incorrectly, treating the rotation as a reflection in y = x instead of a 90° rotation." },
  { letter: "D", ok: false, tex: "y = -(x - 3)^2 + 4", expl: "You might get this by applying the rotation formula incorrectly, perhaps rotating about the origin then translating." },
  { letter: "E", ok: false, tex: "x = (y - 4)^2 + 3", expl: "You might get this by using (y\u22124) instead of (4\u2212y), which gives the same curve reflected in y = 4. The direction matters." },
  { letter: "F", ok: false, tex: "y = -(x - 4)^2 - 3", expl: "You might get this by applying both an incorrect rotation direction and centre, ending up with a downward parabola in y." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

function QuestionSummary() { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}><p style={{ margin: "0 0 4px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}><span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q18</span>The curve <Tex>{"y = (x-1)^2 + 2"}</Tex> is rotated <Tex>{"90^\\circ"}</Tex> clockwise about the point <Tex>{"(3, 2)"}</Tex> to give the curve C. What is the equation of C?</p><div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>{[["A","x=(4-y)^2+3"],["B","x=-(4-y)^2+3"],["C","y=(x-4)^2+3"],["D","y=-(x-3)^2+4"],["E","x=(y-4)^2+3"],["F","y=-(x-4)^2-3"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}</div></div>); }
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() { return (<div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 18</span></div><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The curve with equation</p><MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"y = (x - 1)^2 + 2"}</Tex></MathBox><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>is rotated <Tex>{"90"}</Tex> degrees clockwise about the point <Tex>{"(3, 2)"}</Tex> to give the curve C.</p><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>What is the equation of C?</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>{opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}</div></div>); }

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>For a 90° clockwise rotation about <Tex>{"(h, k)"}</Tex>: the point <Tex>{"(x, y)"}</Tex> maps to <Tex>{"(h + (y - k),\\; k - (x - h))"}</Tex>. To find the equation of the image curve, express the original coordinates in terms of the new ones and substitute back.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>If <Tex>{"(X, Y)"}</Tex> is the image of <Tex>{"(x, y)"}</Tex> under the rotation, then <Tex>{"X = 3 + (y - 2)"}</Tex> and <Tex>{"Y = 2 - (x - 3)"}</Tex>.</p><p style={{ margin: 0 }}>Rearranging: <Tex>{"x = 5 - Y"}</Tex> and <Tex>{"y = X - 1"}</Tex>. Substitute into the original equation.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Solve diagram showing original and rotated parabola
  const solveDiagram = (() => {
    const pW = 260, pad = { l: 16, r: 8, t: 8, b: 16 };
    const gW = pW - pad.l - pad.r;
    const xMin = -1, xMax = 8, yMin = -1, yMax = 7;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;
    // Original: y = (x-1)^2 + 2
    const origPts = [];
    for (let i = 0; i <= 60; i++) { const x = -1 + (i / 60) * 5; const y = (x - 1) ** 2 + 2; if (y <= yMax) origPts.push(`${sx(x)},${sy(y)}`); }
    // Rotated: x = (4-y)^2 + 3
    const rotPts = [];
    for (let i = 0; i <= 60; i++) { const y = -1 + (i / 60) * 8; const x = (4 - y) ** 2 + 3; if (x <= xMax && x >= xMin) rotPts.push(`${sx(x)},${sy(y)}`); }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="solvClip18"><rect x={pad.l} y={pad.t} width={gW} height={gH} /></clipPath></defs>
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.5} />
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.5} />
        <g clipPath="url(#solvClip18)">
          <polyline points={origPts.join(" ")} fill="none" stroke={C.ps} strokeWidth={1.5} />
          <polyline points={rotPts.join(" ")} fill="none" stroke={C.ok} strokeWidth={1.5} />
        </g>
        <circle cx={sx(3)} cy={sy(2)} r={4} fill={C.calc} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(1)} cy={sy(2)} r={3} fill={C.ps} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(3)} cy={sy(4)} r={3} fill={C.ok} stroke={C.white} strokeWidth={1} />
        <foreignObject x={sx(3) + 5} y={sy(2) + 12 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.calc, textAlign: "left", lineHeight: 1 }}><Tex>{"(3,2)"}</Tex></div></foreignObject>
        <foreignObject x={sx(0.2)} y={sy(5) - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.ps, textAlign: "left", lineHeight: 1 }}><Tex>{"original"}</Tex></div></foreignObject>
        <foreignObject x={sx(5)} y={sy(5.5) - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.ok, textAlign: "left", lineHeight: 1 }}><Tex>{"rotated"}</Tex></div></foreignObject>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>To rotate about <Tex>{"(3, 2)"}</Tex>, use three steps: (1) translate so the centre is at the origin, (2) apply the 90° clockwise rotation, (3) translate back. Then substitute to find the new equation.</span>, math: (<div><Tex>{"\\text{Translate} \\to \\text{Rotate} \\to \\text{Translate back}"}</Tex></div>) },
    { label: "STEP 1: TRANSLATE TO ORIGIN", color: C.calc, text: <span>Replace <Tex>{"x"}</Tex> with <Tex>{"u + 3"}</Tex> and <Tex>{"y"}</Tex> with <Tex>{"v + 2"}</Tex> so the centre <Tex>{"(3, 2)"}</Tex> moves to the origin.</span>, math: (<><div><Tex>{"x = u + 3, \\quad y = v + 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"v + 2 = (u + 3 - 1)^2 + 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"v = (u + 2)^2"}</Tex></div></>) },
    { label: "STEP 2: ROTATE 90° CLOCKWISE", color: C.calc, text: <span>A 90° clockwise rotation about the origin sends <Tex>{"(u, v)"}</Tex> to <Tex>{"(v, -u)"}</Tex>. For the image curve, replace <Tex>{"u"}</Tex> with <Tex>{"-V"}</Tex> and <Tex>{"v"}</Tex> with <Tex>{"U"}</Tex> in the equation.</span>, math: (<><div><Tex>{"(u, v) \\to (v, -u)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{So } U = v,\\; V = -u \\;\\Rightarrow\\; u = -V,\\; v = U"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"U = (-V + 2)^2 = (2 - V)^2"}</Tex></div></>)},
    { label: "STEP 3: TRANSLATE BACK", color: C.calc, text: <span>Replace <Tex>{"U"}</Tex> with <Tex>{"x - 3"}</Tex> and <Tex>{"V"}</Tex> with <Tex>{"y - 2"}</Tex> to undo the initial translation.</span>, math: (<><div><Tex>{"U = x - 3, \\quad V = y - 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x - 3 = (2 - (y - 2))^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x - 3 = (4 - y)^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x = (4 - y)^2 + 3"}</Tex></div></>), diagram: solveDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>The equation of curve C is <Tex>{"x = (4 - y)^2 + 3"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{x = (4-y)^2 + 3}"}</Tex></div>), conclusion: <span>The answer is A: <Tex>{"x = (4 - y)^2 + 3"}</Tex>.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Graph + panels verify (algebraic, no slider needed)
  const graph = (() => {
    const pW = 500, pad = { l: 44, r: 16, t: 16, b: 28 };
    const gW2 = pW - pad.l - pad.r;
    const xMin = -2, xMax = 9, yMin = -2, yMax = 8;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW2 * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW2;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;

    // Original: y = (x-1)^2 + 2
    const origPts = [];
    for (let i = 0; i <= 100; i++) { const x = -2 + (i / 100) * 11; const y = (x - 1) ** 2 + 2; origPts.push(`${sx(x)},${sy(y)}`); }
    // Rotated: x = (4-y)^2 + 3
    const rotPts = [];
    for (let i = 0; i <= 100; i++) { const y = -2 + (i / 100) * 10; const x = (4 - y) ** 2 + 3; rotPts.push(`${sx(x)},${sy(y)}`); }
    // Key points: vertex of original (1,2) -> rotated vertex (3,4)
    // Check: (1,2) -> (3+(2-2), 2-(1-3)) = (3, 4) ✓

    const FO = ({ x, y, w, hh, color, align, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="plotArea18"><rect x={pad.l} y={pad.t} width={gW2} height={gH} /></clipPath></defs>
        {[0, 2, 4, 6, 8].map(x => <line key={"gx" + x} x1={sx(x)} y1={pad.t} x2={sx(x)} y2={pad.t + gH} stroke={C.border} strokeWidth={0.3} />)}
        {[0, 2, 4, 6].map(y => <line key={"gy" + y} x1={pad.l} y1={sy(y)} x2={pad.l + gW2} y2={sy(y)} stroke={C.border} strokeWidth={0.3} />)}
        <line x1={pad.l} y1={sy(0)} x2={pad.l + gW2} y2={sy(0)} stroke={C.muted} strokeWidth={0.8} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pad.t + gH} stroke={C.muted} strokeWidth={0.8} />
        <g clipPath="url(#plotArea18)">
          <polyline points={origPts.join(" ")} fill="none" stroke={C.ps} strokeWidth={2} />
          <polyline points={rotPts.join(" ")} fill="none" stroke={C.ok} strokeWidth={2} />
        </g>
        {/* Centre of rotation */}
        <circle cx={sx(3)} cy={sy(2)} r={5} fill={C.calc} stroke={C.white} strokeWidth={1.5} />
        {/* Original vertex */}
        <circle cx={sx(1)} cy={sy(2)} r={4} fill={C.ps} stroke={C.white} strokeWidth={1} />
        {/* Rotated vertex */}
        <circle cx={sx(3)} cy={sy(4)} r={4} fill={C.ok} stroke={C.white} strokeWidth={1} />
        {/* Labels */}
        <FO x={sx(3) + 6} y={sy(2) + 2} w={44} hh={16} color={C.calc} bg><Tex>{"(3,2)"}</Tex></FO>
        <FO x={sx(1) - 44} y={sy(2) - 14} w={42} hh={16} color={C.ps} bg><Tex>{"(1,2)"}</Tex></FO>
        <FO x={sx(3) + 6} y={sy(4) - 14} w={42} hh={16} color={C.ok} bg><Tex>{"(3,4)"}</Tex></FO>
        <FO x={sx(-0.5)} y={sy(6.5)} w={100} hh={16} color={C.ps} bg><Tex>{"y = (x-1)^2+2"}</Tex></FO>
        <FO x={sx(5.5)} y={sy(6)} w={100} hh={16} color={C.ok} bg><Tex>{"x = (4-y)^2+3"}</Tex></FO>
        {[0, 2, 4, 6, 8].map(x => <FO key={"x" + x} x={sx(x) - 10} y={pad.t + gH + 2} w={20} hh={18}><Tex>{String(x)}</Tex></FO>)}
        {[0, 2, 4, 6].map(y => <FO key={"y" + y} x={0} y={sy(y) - 9} w={pad.l - 6} hh={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 1 }}>Original vertex</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{"(1, 2)"}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 1 }}>Rotated vertex</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok }}><Tex>{"(3, 4)"}</Tex></div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>Original vertex <Tex>{"(1,2)"}</Tex> maps to <Tex>{"(3,4)"}</Tex>. The rotated curve opens rightward: <Tex>{"x = (4-y)^2 + 3"}</Tex>. The answer is A.</span>
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
