"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 9, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Coordinate Geometry / Absolute Value" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "9", ok: false, expl: "You might get 9 by computing the area as 3\u00B2, forgetting that the diamond has diagonals of length 6, not 3." },
  { letter: "B", tex: "12", ok: false, expl: "You might get 12 by incorrectly computing \u00BD \u00D7 6 \u00D7 4, perhaps confusing the diagonal lengths." },
  { letter: "C", tex: "15", ok: false, expl: "You might get 15 by a miscalculation such as averaging 12 and 18." },
  { letter: "D", ok: true, tex: "18", expl: "The curve |x\u22121| + |y+2| = 3 is a diamond (rotated square) with vertices 3 units from the centre (1,\u22122). Both diagonals have length 6, so the area is \u00BD \u00D7 6 \u00D7 6 = 18." },
  { letter: "E", tex: "24", ok: false, expl: "You might get 24 by computing 4 \u00D7 6, treating the shape as a rectangle instead of a diamond." },
  { letter: "F", tex: "36", ok: false, expl: "You might get 36 by computing 6 \u00D7 6, forgetting the \u00BD factor in the diamond area formula." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q9</span>
        Find the area enclosed by the curve <Tex>{"|x - 1| + |y + 2| = 3"}</Tex>.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","9"],["B","12"],["C","15"],["D","18"],["E","24"],["F","36"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  return (<div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 9</span></div><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Find the area enclosed by the curve</p><MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"|x - 1| + |y + 2| = 3"}</Tex></MathBox></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>{opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}</div></div>);
}

function SetupStep() {
  return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Recognise that <Tex>{"|x - a| + |y - b| = k"}</Tex> is a diamond (rotated square) centred at <Tex>{"(a, b)"}</Tex> with vertices <Tex>{"k"}</Tex> units away along each axis. Use the diamond area formula: <Tex>{"\\tfrac{1}{2} d_1 d_2"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>The centre is <Tex>{"(1, -2)"}</Tex> and <Tex>{"k = 3"}</Tex>. The vertices are <Tex>{"3"}</Tex> units from the centre in each axis direction.</p><p style={{ margin: 0 }}>Both diagonals have length <Tex>{"2k = 6"}</Tex>, so the area is <Tex>{"\\tfrac{1}{2} \\times 6 \\times 6 = 18"}</Tex>.</p></InfoBox></div>);
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveDiagram = (() => {
    const pW = 260;
    const pad = { l: 24, r: 8, t: 8, b: 20 };
    const gW = pW - pad.l - pad.r;
    const xMin = -3.5, xMax = 5.5, yMin = -6, yMax = 2.5;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const vR = [4, -2], vL = [-2, -2], vT = [1, 1], vB = [1, -5];
    const pts = `${sx(vR[0])},${sy(vR[1])} ${sx(vT[0])},${sy(vT[1])} ${sx(vL[0])},${sy(vL[1])} ${sx(vB[0])},${sy(vB[1])}`;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        <polygon points={pts} fill={C.ok + "22"} stroke={C.ok} strokeWidth={1.5} />
        <circle cx={sx(1)} cy={sy(-2)} r={3} fill={C.calc} stroke={C.white} strokeWidth={1} />
        {[[4,-2,"(4,\u22122)"],[1,1,"(1,1)"],[-2,-2,"(\u22122,\u22122)"],[1,-5,"(1,\u22125)"]].map(([x,y,l],i) => <text key={i} x={sx(x)+(x>1?4:x<1?-4:4)} y={sy(y)+(y>-2?-4:y<-2?12:0)} textAnchor={x>1?"start":x<1?"end":"start"} fill={C.ok} fontSize={8} fontFamily={mathFont}>{l}</text>)}
        <text x={sx(1)} y={sy(-2)+12} textAnchor="middle" fill={C.calc} fontSize={8} fontFamily={mathFont}>(1,{"\u2212"}2)</text>
      </svg>
    );
  })();
  const solveSteps = [
    { label: "RECOGNISE THE SHAPE", color: C.ps, text: <span>The equation <Tex>{"|x - 1| + |y + 2| = 3"}</Tex> defines a diamond (rotated square) centred at <Tex>{"(1, -2)"}</Tex>.</span>, math: (<div><Tex>{"\\text{Centre: } (1, -2)"}</Tex></div>), },
    { label: "FIND THE VERTICES", color: C.calc, text: <span>A vertex lies on an axis through the centre where one absolute value term is zero and the other equals <Tex>{"3"}</Tex>. For example, setting <Tex>{"y = -2"}</Tex> gives <Tex>{"|x - 1| = 3"}</Tex>, so <Tex>{"x = 4"}</Tex> or <Tex>{"x = -2"}</Tex>.</span>, math: (<><div><Tex>{"y = -2: \\; |x-1| + 0 = 3 \\;\\Rightarrow\\; x = 4 \\text{ or } {-2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x = 1: \\; 0 + |y+2| = 3 \\;\\Rightarrow\\; y = 1 \\text{ or } {-5}"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Vertices: } (4,-2),\\;(-2,-2),\\;(1,1),\\;(1,-5)"}</Tex></div></>), diagram: solveDiagram },
    { label: "COMPUTE DIAGONALS", color: C.calc, text: <span>The horizontal diagonal spans from <Tex>{"(-2, -2)"}</Tex> to <Tex>{"(4, -2)"}</Tex>, and the vertical from <Tex>{"(1, 1)"}</Tex> to <Tex>{"(1, -5)"}</Tex>.</span>, math: (<><div><Tex>{"d_1 = 4 - (-2) = 6"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"d_2 = 1 - (-5) = 6"}</Tex></div></>), },
    { label: "APPLY DIAMOND AREA FORMULA", color: C.calc, text: <span>Area of a rhombus with diagonals <Tex>{"d_1"}</Tex> and <Tex>{"d_2"}</Tex>.</span>, math: (<div><Tex>{"\\text{Area} = \\tfrac{1}{2} \\times d_1 \\times d_2 = \\tfrac{1}{2} \\times 6 \\times 6 = 18"}</Tex></div>), },
    { label: "CONCLUSION", color: C.ok, text: <span>The enclosed area is <Tex>{"18"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{Area} = 18}"}</Tex></div>), conclusion: <span>The answer is D: <Tex>{"18"}</Tex>.</span>, },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [kVal, setKVal] = useState(3);
  const snapPoints = [1, 2, 3, 4, 5];
  const snapRadius = 0.2;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const cx = 1, cy = -2;
  const d1 = 2 * kVal, d2 = 2 * kVal;
  const area = 0.5 * d1 * d2;
  const isExact = Math.abs(kVal - 3) < 0.05;
  const isNear = !isExact && Math.abs(area - 18) < 1;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "k1", jsx: <span><Tex>{"k = 1"}</Tex></span>, val: 1 },
    { label: "k3", jsx: <span><Tex>{"k = 3"}</Tex></span>, val: 3 },
    { label: "k5", jsx: <span><Tex>{"k = 5"}</Tex></span>, val: 5 },
  ];

  const FO = ({ x, y, w, h, color, align, bg, children }) => (
    <foreignObject x={x} y={y} width={w || 40} height={h || 20}>
      <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
    </foreignObject>
  );

  const graph = (() => {
    const pW = 500;
    const pad = { l: 44, r: 16, t: 20, b: 32 };
    const gW = pW - pad.l - pad.r;
    const xMin = -4, xMax = 7, yMin = -7, yMax = 4;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW * (yRange / xRange); // square grid cells
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;

    // Diamond vertices
    const vR = [cx + kVal, cy], vL = [cx - kVal, cy], vT = [cx, cy + kVal], vB = [cx, cy - kVal];
    const diamondPts = `${sx(vR[0])},${sy(vR[1])} ${sx(vT[0])},${sy(vT[1])} ${sx(vL[0])},${sy(vL[1])} ${sx(vB[0])},${sy(vB[1])}`;

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="plotArea"><rect x={pad.l} y={pad.t} width={gW} height={gH} /></clipPath></defs>
        {/* Grid lines */}
        {[-6,-4,-2,0,2].map(y => <line key={"gy"+y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        {[-2,0,2,4,6].map(x => <line key={"gx"+x} x1={sx(x)} y1={pad.t} x2={sx(x)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.5} />)}
        {/* Axes */}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        {/* Diamond */}
        <g clipPath="url(#plotArea)">
          <polygon points={diamondPts} fill={col + "22"} stroke={col} strokeWidth={2} />
        </g>
        {/* Centre dot */}
        <circle cx={sx(cx)} cy={sy(cy)} r={4} fill={C.calc} stroke={C.white} strokeWidth={1} />
        {/* Vertex dots */}
        {[vR, vL, vT, vB].map((v, i) => <circle key={i} cx={sx(v[0])} cy={sy(v[1])} r={3} fill={col} stroke={C.white} strokeWidth={1} />)}
        {/* Labels - wider FOs for coordinates */}
        <FO x={sx(cx) - 20} y={sy(cy) + 6} w={44} h={16} color={C.calc} bg><Tex>{"(1,-2)"}</Tex></FO>
        <FO x={sx(vR[0]) + 4} y={sy(vR[1]) - 4} w={54} h={16} color={col} bg><Tex>{`(${fmt(vR[0])},${fmt(vR[1])})`}</Tex></FO>
        <FO x={sx(vT[0]) + 4} y={sy(vT[1]) - 16} w={46} h={16} color={col} bg><Tex>{`(${fmt(vT[0])},${fmt(vT[1])})`}</Tex></FO>
        {/* Area label always visible */}
        <FO x={sx(cx) - 30} y={sy(cy) - 20} w={64} h={16} color={col} bg><Tex>{`A = ${fmt(area)}`}</Tex></FO>
        {/* Axis ticks */}
        {[-2, 0, 2, 4, 6].map(x => <FO key={"x"+x} x={sx(x) - 10} y={pH - pad.b + 2} w={20} h={18}><Tex>{String(x)}</Tex></FO>)}
        {[-6, -4, -2, 0, 2].map(y => <FO key={"y"+y} x={0} y={sy(y) - 9} w={pad.l - 6} h={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}><Tex>{"|x - 1| + |y + 2| = k"}</Tex> is a diamond centred at <Tex>{"(1, -2)"}</Tex>. The question has <Tex>{"k = 3"}</Tex>.</p>
        <p style={{ margin: 0 }}>Adjust <Tex>{"k"}</Tex> to see how the diamond and area change.</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"k"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(kVal)}</Tex></span>
        </div>
        <input type="range" min={0.5} max={5.5} step={0.1} value={kVal} onChange={e => setKVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(kVal - pr.val) < 0.15; return (<button key={pr.label} onClick={() => setKVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 2 }}><Tex>{"k"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{fmt(kVal)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{"d_1"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{fmt(d1)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{"d_2"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{fmt(d2)}</Tex></div>
        </div>
      </div>
      <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, transition: "all 0.3s" }}>
        <span style={{ fontSize: 13, color: col, fontWeight: 600 }}><Tex>{`\\text{Area} = \\tfrac{1}{2} \\times ${fmt(d1)} \\times ${fmt(d2)}`}</Tex></span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: col }}><Tex>{fmt(area)}</Tex></span>
          <span style={{ fontSize: 16, marginLeft: 4 }}>{isExact ? "\u2705" : "\u274C"}</span>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>Diamond with diagonals <Tex>{"6 \\times 6"}</Tex>: area <Tex>{"= \\tfrac{1}{2} \\times 6 \\times 6 = 18"}</Tex>. The answer is D.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! Area = <Tex>{fmt(area)}</Tex>. Try <Tex>{"k = 3"}</Tex>.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Area = <Tex>{fmt(area)}</Tex>. Set <Tex>{"k = 3"}</Tex> to match the question.</span>
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
