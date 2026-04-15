"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 19, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Circles / Geometric Probability" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: true, tex: "\\dfrac{16 - \\pi}{16}", expl: "The circles fail to intersect when a\u00B2 + b\u00B2 \u2264 1 (C2 entirely inside C1). This is a disc of area \u03C0 inside the 4\u00D74 square of area 16. So P(intersect) = 1 \u2212 \u03C0/16 = (16\u2212\u03C0)/16." },
  { letter: "B", ok: false, tex: "\\dfrac{16 + \\pi}{16}", expl: "You might get (16+\u03C0)/16 by adding \u03C0/16 instead of subtracting it, perhaps confusing the intersection region with the non-intersection region." },
  { letter: "C", ok: false, tex: "\\dfrac{12 - \\pi}{12}", expl: "You might get this by using a 3\u00D74 or similar incorrect sample space area instead of 4\u00D74 = 16." },
  { letter: "D", ok: false, tex: "\\dfrac{4 - \\pi}{4}", expl: "You might get this by using the sample space area as 4 (treating the range as 2\u00D72 instead of 4\u00D74), which would give 1 \u2212 \u03C0/4." },
  { letter: "E", ok: false, tex: "1 - \\dfrac{\\pi}{16}", expl: "This is actually the same value as option A. Since A is the more standard form, A is the intended answer." },
  { letter: "F", ok: false, tex: "\\dfrac{\\pi}{16}", expl: "You might get \u03C0/16 by computing the probability that the circles do NOT intersect instead of the probability that they do." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

function QuestionSummary() { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}><p style={{ margin: "0 0 4px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}><span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q19</span>Circle C1 is <Tex>{"x^2 + y^2 = 16"}</Tex>. Circle C2 has radius <Tex>{"3"}</Tex> and centre <Tex>{"(a, b)"}</Tex> where <Tex>{"-2 \\le a \\le 2"}</Tex> and <Tex>{"-2 \\le b \\le 2"}</Tex>. What is the probability that C2 intersects C1?</p><div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>{[["A","\\frac{16-\\pi}{16}"],["B","\\frac{16+\\pi}{16}"],["C","\\frac{12-\\pi}{12}"],["D","\\frac{4-\\pi}{4}"],["E","1-\\frac{\\pi}{16}"],["F","\\frac{\\pi}{16}"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}</div></div>); }
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() { return (<div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 19</span></div><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Circle C1 is defined as</p><MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"x^2 + y^2 = 16"}</Tex></MathBox><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>A second circle C2 has radius <Tex>{"3"}</Tex> and centre <Tex>{"(a, b)"}</Tex> where <Tex>{"-2 \\le a \\le 2"}</Tex> and <Tex>{"-2 \\le b \\le 2"}</Tex>.</p><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>If the centre of C2 is equally likely to be located anywhere within the given range, what is the probability that C2 intersects C1?</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>{opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}</div></div>); }

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Two circles intersect when <Tex>{"|r_1 - r_2| < d < r_1 + r_2"}</Tex> where <Tex>{"d"}</Tex> is the distance between centres. Find the region in the <Tex>{"(a, b)"}</Tex> square where this fails, compute its area, and subtract from <Tex>{"1"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>C1 has radius <Tex>{"4"}</Tex>, C2 has radius <Tex>{"3"}</Tex>. They fail to intersect when <Tex>{"d \\le 1"}</Tex> (C2 entirely inside C1) or <Tex>{"d \\ge 7"}</Tex> (too far apart).</p><p style={{ margin: 0 }}>Since the max distance from the origin to any point in the square is <Tex>{"\\sqrt{2^2 + 2^2} = 2\\sqrt{2} \\approx 2.83"}</Tex>, the condition <Tex>{"d \\ge 7"}</Tex> never occurs. Only <Tex>{"d \\le 1"}</Tex> matters.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const solveDiagram = (() => {
    const pW = 260, pad = { l: 8, r: 8, t: 8, b: 8 };
    const gW = pW - pad.l - pad.r;
    const cx = pad.l + gW / 2, cy = pad.t + gW / 2;
    const s = gW / 12;
    const pH = gW + pad.t + pad.b;
    const makeCirc = (r, n) => { const pts = []; for (let i = 0; i <= n; i++) { const ang = (i / n) * 2 * Math.PI; pts.push(`${cx + r * s * Math.cos(ang)},${cy - r * s * Math.sin(ang)}`); } return pts.join(" "); };
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <polyline points={makeCirc(4, 80)} fill="none" stroke={C.ps} strokeWidth={1.5} />
        <rect x={cx - 2 * s} y={cy - 2 * s} width={4 * s} height={4 * s} fill={C.calc + "15"} stroke={C.calc} strokeWidth={1.5} />
        <polyline points={makeCirc(1, 60)} fill={C.fail + "22"} stroke={C.fail} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={2} fill={C.white} stroke={C.muted} strokeWidth={1} />
        <text x={cx + 4} y={cy - 4} fill={C.white} fontSize={11} fontFamily={mathFont}>O</text>
        <text x={cx + 4 * s + 4} y={cy + 4} fill={C.ps} fontSize={11} fontFamily={mathFont}>C1</text>
        <text x={cx + 1 * s + 4} y={cy - 1 * s - 2} fill={C.fail} fontSize={11} fontFamily={mathFont}>d=1</text>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Find the set of centres for which C2 does not intersect C1, then subtract from <Tex>{"1"}</Tex>.</span>, math: (<div><Tex>{"P(\\text{intersect}) = 1 - P(\\text{no intersect})"}</Tex></div>) },
    { label: "INTERSECTION CONDITION", color: C.calc, text: <span>Two circles with radii <Tex>{"r_1"}</Tex> and <Tex>{"r_2"}</Tex> intersect when the distance <Tex>{"d"}</Tex> between their centres satisfies <Tex>{"|r_1 - r_2| < d < r_1 + r_2"}</Tex>. Here <Tex>{"d = \\sqrt{a^2 + b^2}"}</Tex> since C1 is centred at the origin.</span>, math: (<><div><Tex>{"|4 - 3| < \\sqrt{a^2 + b^2} < 4 + 3"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"1 < \\sqrt{a^2 + b^2} < 7"}</Tex></div></>) },
    { label: "ELIMINATE d > 7", color: C.calc, text: <span>The centre of C2 lies in the square, so the maximum possible distance from the origin is at a corner. This is always well below <Tex>{"7"}</Tex>, so only the lower bound matters.</span>, math: (<><div><Tex>{"d_{\\max} = \\sqrt{2^2 + 2^2} = 2\\sqrt{2} \\approx 2.83"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"2\\sqrt{2} < 7 \\;\\;\\checkmark \\quad \\text{always satisfied}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{No intersection} \\;\\Leftrightarrow\\; d \\le 1"}</Tex></div></>), diagram: solveDiagram },
    { label: "NON-INTERSECTION REGION", color: C.calc, text: <span>The circles fail to intersect only when C2 is entirely inside C1. This happens when the centre lies within a unit disc, which fits entirely inside the sample space square.</span>, math: (<><div><Tex>{"a^2 + b^2 \\le 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Area of disc} = \\pi(1)^2 = \\pi"}</Tex></div></>) },
    { label: "COMPUTE PROBABILITY", color: C.calc, text: <span>The sample space has area <Tex>{"4 \\times 4 = 16"}</Tex>. Subtract the non-intersection probability.</span>, math: (<><div><Tex>{"P(\\text{no intersect}) = \\frac{\\text{disc area}}{\\text{square area}} = \\frac{\\pi}{16}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"P(\\text{intersect}) = 1 - \\frac{\\pi}{16} = \\frac{16 - \\pi}{16}"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>The probability is <Tex>{"\\frac{16 - \\pi}{16}"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\frac{16 - \\pi}{16} \\approx 0.80}"}</Tex></div>), conclusion: <span>The answer is A: <Tex>{"\\frac{16 - \\pi}{16}"}</Tex>.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [pos, setPos] = useState([0.5, 0.5]);
  const svgRef = useRef(null);
  const dragging = useRef(false);
  const aVal = pos[0], bVal = pos[1];
  const dist = Math.sqrt(aVal * aVal + bVal * bVal);
  const intersects = dist > 1 && dist < 7;
  const inside = dist <= 1;
  const col = intersects ? C.ok : C.fail;

  const handleMove = (e) => {
    if (!dragging.current || !svgRef.current) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const svgW = 500, svgH = 340;
    const px = ((e.clientX || e.touches?.[0]?.clientX || 0) - rect.left) / rect.width * svgW;
    const py = ((e.clientY || e.touches?.[0]?.clientY || 0) - rect.top) / rect.height * svgH;
    const pad = { l: 44, r: 16, t: 16, b: 28 };
    const gW2 = svgW - pad.l - pad.r;
    const gH = svgH - pad.t - pad.b;
    const xMin = -5.5, xMax = 5.5, yMin = -5.5, yMax = 5.5;
    const a2 = xMin + ((px - pad.l) / gW2) * (xMax - xMin);
    const b2 = yMax - ((py - pad.t) / gH) * (yMax - yMin);
    setPos([Math.max(-2, Math.min(2, Math.round(a2 * 10) / 10)), Math.max(-2, Math.min(2, Math.round(b2 * 10) / 10))]);
  };

  const graph = (() => {
    const pW = 500, pad = { l: 44, r: 16, t: 16, b: 28 };
    const gW2 = pW - pad.l - pad.r;
    const xMin = -5.5, xMax = 5.5, yMin = -5.5, yMax = 5.5;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW2 * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW2;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;
    const makeCirc = (cx, cy, r, n) => { const pts = []; for (let i = 0; i <= n; i++) { const ang = (i / n) * 2 * Math.PI; pts.push(`${sx(cx + r * Math.cos(ang))},${sy(cy + r * Math.sin(ang))}`); } return pts.join(" "); };

    const FO = ({ x, y, w, hh, color, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg ref={svgRef} viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%", cursor: "crosshair" }}
        onMouseDown={() => { dragging.current = true; }} onMouseUp={() => { dragging.current = false; }} onMouseLeave={() => { dragging.current = false; }}
        onMouseMove={handleMove} onTouchStart={() => { dragging.current = true; }} onTouchEnd={() => { dragging.current = false; }} onTouchMove={handleMove}
        onClick={handleMove}>
        <defs><clipPath id="plotArea19"><rect x={pad.l} y={pad.t} width={gW2} height={gH} /></clipPath></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pad.t + gH} stroke={C.muted} strokeWidth={0.7} />
        <g clipPath="url(#plotArea19)">
          {/* C1 circle */}
          <polyline points={makeCirc(0, 0, 4, 100)} fill="none" stroke={C.ps} strokeWidth={2} />
          {/* Square sample space */}
          <rect x={sx(-2)} y={sy(2)} width={sx(2) - sx(-2)} height={sy(-2) - sy(2)} fill={C.calc + "08"} stroke={C.calc} strokeWidth={1.5} />
          {/* Non-intersection disc */}
          <polyline points={makeCirc(0, 0, 1, 60)} fill={C.fail + "15"} stroke={C.fail} strokeWidth={1} strokeDasharray="3,2" />
          {/* C2 circle at current position */}
          <polyline points={makeCirc(aVal, bVal, 3, 80)} fill="none" stroke={col} strokeWidth={2} />
        </g>
        {/* Centre of C2 */}
        <circle cx={sx(aVal)} cy={sy(bVal)} r={6} fill={col} stroke={C.white} strokeWidth={2} />
        {/* Labels */}
        <FO x={sx(4) + 4} y={sy(0) - 14} w={30} hh={16} color={C.ps} bg><Tex>{"C_1"}</Tex></FO>
        <FO x={sx(aVal) + 8} y={sy(bVal) - 14} w={30} hh={16} color={col} bg><Tex>{"C_2"}</Tex></FO>
        <FO x={sx(0) - 36} y={sy(1) - 14} w={40} hh={16} color={C.fail} bg><Tex>{"d=1"}</Tex></FO>
        {[-4, -2, 0, 2, 4].map(x => <FO key={"x" + x} x={sx(x) - 10} y={pad.t + gH + 2} w={20} hh={18}><Tex>{String(x)}</Tex></FO>)}
        {[-4, -2, 0, 2, 4].map(y => <FO key={"y" + y} x={0} y={sy(y) - 9} w={pad.l - 6} hh={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 1 }}>Centre</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{`(${fmt(aVal)},${fmt(bVal)})`}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 1 }}><Tex>{"d"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col }}><Tex>{fmt(dist)}</Tex></div>
        </div>
        <div style={{ background: intersects ? C.conclBg : C.failBg, border: `1px solid ${col}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 1 }}>Status</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: col }}>{intersects ? "Intersects" : inside ? "Inside" : "Too far"}</div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>Drag to move C2. It fails to intersect when <Tex>{"d \\le 1"}</Tex> (red disc). <Tex>{"P = \\frac{16 - \\pi}{16} \\approx 0.80"}</Tex>. The answer is A.</span>
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
