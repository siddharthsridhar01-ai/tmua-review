"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 8, paper: "Set B Paper 1", year: "2026 Mock", topicTag: "Trigonometry / Ambiguous Case" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "1:1", text: "1:1", ok: false, expl: "You might get 1:1 by assuming the two triangles have equal area, but they have different angles at Q so different areas." },
  { letter: "B", ok: true, tex: "2:1", text: "2:1", expl: "By the sine rule, sin R = \u221A3/2, so R = 60\u00B0 or 120\u00B0. This gives Q = 90\u00B0 or 30\u00B0. Area = \u00BD(3\u221A3)(3)sin Q. Ratio = sin 90\u00B0/sin 30\u00B0 = 1/(1/2) = 2:1." },
  { letter: "C", tex: "3:1", text: "3:1", ok: false, expl: "You might get 3:1 by confusing the side ratio with the area ratio, or by computing PR for each case and using the wrong area formula." },
  { letter: "D", tex: "\\sqrt{3}:1", text: "\u221A3:1", ok: false, expl: "You might get \u221A3:1 by computing areas using \u00BD\u00B7PQ\u00B7PR\u00B7sin P and getting the PR values confused, since PR involves \u221A3." },
  { letter: "E", tex: "2:\\sqrt{3}", text: "2:\u221A3", ok: false, expl: "You might get 2:\u221A3 by using area = \u00BD\u00B7base\u00B7height with an incorrect height calculation involving \u221A3." },
  { letter: "F", tex: "3:2", text: "3:2", ok: false, expl: "You might get 3:2 by a numerical slip when computing sin 90\u00B0/sin 30\u00B0, perhaps writing 3/2 instead of 1/(1/2) = 2." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q8</span>
        A triangle PQR has angle <Tex>{"QPR = 30^\\circ"}</Tex>, <Tex>{"PQ = 3\\sqrt{3}"}</Tex>, and <Tex>{"QR = 3"}</Tex>. There are two distinct triangles with these measurements. Let S be the one with larger area and T the one with smaller area. Find the ratio area of S : area of T.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","1:1"],["B","2:1"],["C","3:1"],["D","\\sqrt{3}:1"],["E","2:\\sqrt{3}"],["F","3:2"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  return (<div><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 8</span></div><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>A triangle PQR has angle <Tex>{"QPR = 30^\\circ"}</Tex>, <Tex>{"PQ = 3\\sqrt{3}"}</Tex>, and <Tex>{"QR = 3"}</Tex>.</p><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>There are two distinct triangles with these measurements. Let S be the one with larger area and T the one with smaller area.</p><p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Find the ratio area of S : area of T.</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>{opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}</div></div>);
}

function SetupStep() {
  return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Use the sine rule to find angle R. Since we know an angle (P) and the opposite side (QR) plus another side (PQ), this is the ambiguous case: <Tex>{"\\sin R"}</Tex> will give two possible values of R.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Area = <Tex>{"\\tfrac{1}{2} \\cdot PQ \\cdot QR \\cdot \\sin(\\angle PQR)"}</Tex>. Since PQ and QR are the same in both triangles, the ratio depends only on <Tex>{"\\sin(\\angle Q_1) : \\sin(\\angle Q_2)"}</Tex>.</p><p style={{ margin: 0 }}>The two values of R give two values of <Tex>{"Q = 180^\\circ - 30^\\circ - R"}</Tex>, so two different <Tex>{"\\sin(\\angle Q)"}</Tex>.</p></InfoBox></div>);
}

function SolveStepContent({ revealed, setRevealed }) {
  const S3s = Math.sqrt(3);
  const solveDiagram = (() => {
    const rad = (d) => d * Math.PI / 180;
    const sc = 16, pqLen = 3 * S3s * sc, qrLen = 3 * sc, pW = 260, gap = 20;
    const by = 14 + qrLen, pH = by + 18;
    const P1x = 12, P1y = by, Q1x = P1x + pqLen, Q1y = by, R1x = Q1x, R1y = Q1y - qrLen;
    const P2x = Q1x + gap, P2y = by, Q2x = P2x + pqLen, Q2y = by;
    const R2x = Q2x - qrLen * Math.cos(rad(30)), R2y = Q2y - qrLen * Math.sin(rad(30));
    const sqr = 6;
    const arc = (cx, cy, s, e, r) => { const sr = rad(s), er = rad(e); return `M${(cx+r*Math.cos(sr)).toFixed(1)},${(cy-r*Math.sin(sr)).toFixed(1)} A${r},${r} 0 0 0 ${(cx+r*Math.cos(er)).toFixed(1)},${(cy-r*Math.sin(er)).toFixed(1)}`; };
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <polygon points={`${P1x},${P1y} ${Q1x},${Q1y} ${R1x},${R1y}`} fill={C.ps + "15"} stroke={C.ps} strokeWidth={1.5} />
        <path d={arc(P1x, P1y, 0, 30, 10)} fill="none" stroke={C.calc} strokeWidth={1} />
        <polyline points={`${Q1x-sqr},${Q1y} ${Q1x-sqr},${Q1y-sqr} ${Q1x},${Q1y-sqr}`} fill="none" stroke={C.calc} strokeWidth={1} />
        <text x={P1x} y={P1y+12} fill={C.text} fontSize={9} fontFamily={mathFont} fontStyle="italic">P</text>
        <text x={Q1x+2} y={Q1y+12} fill={C.text} fontSize={9} fontFamily={mathFont} fontStyle="italic">Q</text>
        <text x={R1x+3} y={R1y-2} fill={C.text} fontSize={9} fontFamily={mathFont} fontStyle="italic">R</text>
        <text x={(P1x+Q1x)/2} y={P1y+12} textAnchor="middle" fill={C.ps} fontSize={9} fontWeight={700} fontFamily={mathFont}>S</text>
        <polygon points={`${P2x},${P2y} ${Q2x},${Q2y} ${R2x},${R2y}`} fill={C.assum + "15"} stroke={C.assum} strokeWidth={1.5} />
        <path d={arc(P2x, P2y, 0, 30, 10)} fill="none" stroke={C.calc} strokeWidth={1} />
        <path d={arc(Q2x, Q2y, 150, 180, 10)} fill="none" stroke={C.calc} strokeWidth={1} />
        <text x={P2x} y={P2y+12} fill={C.text} fontSize={9} fontFamily={mathFont} fontStyle="italic">P</text>
        <text x={Q2x+2} y={Q2y+12} fill={C.text} fontSize={9} fontFamily={mathFont} fontStyle="italic">Q</text>
        <text x={R2x-2} y={R2y-4} textAnchor="end" fill={C.text} fontSize={9} fontFamily={mathFont} fontStyle="italic">R</text>
        <text x={(P2x+Q2x)/2} y={P2y+12} textAnchor="middle" fill={C.assum} fontSize={9} fontWeight={700} fontFamily={mathFont}>T</text>
      </svg>
    );
  })();
  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Apply the sine rule to find <Tex>{"\\sin R"}</Tex>, identify both possible angles, then compute the area ratio via <Tex>{"\\sin(\\angle Q)"}</Tex>.</span>, math: (<div><Tex>{"\\frac{QR}{\\sin P} = \\frac{PQ}{\\sin R}"}</Tex></div>), },
    { label: "FIND sin R", color: C.calc, text: <span>Substitute the known values.</span>, math: (<><div><Tex>{"\\frac{3}{\\sin 30^\\circ} = \\frac{3\\sqrt{3}}{\\sin R}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\sin R = \\frac{3\\sqrt{3} \\cdot \\frac{1}{2}}{3} = \\frac{\\sqrt{3}}{2}"}</Tex></div></>), },
    { label: "TWO POSSIBLE ANGLES", color: C.calc, text: <span>Since <Tex>{"\\sin R = \\tfrac{\\sqrt{3}}{2}"}</Tex>, there are two cases.</span>, math: (<><div><Tex>{"R = 60^\\circ \\quad \\text{or} \\quad R = 120^\\circ"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Case 1: } R = 60^\\circ \\;\\Rightarrow\\; \\angle Q = 90^\\circ"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Case 2: } R = 120^\\circ \\;\\Rightarrow\\; \\angle Q = 30^\\circ"}</Tex></div></>), diagram: solveDiagram },
    { label: "COMPUTE AREAS", color: C.calc, text: <span>Area <Tex>{"= \\tfrac{1}{2} \\cdot PQ \\cdot QR \\cdot \\sin(\\angle Q)"}</Tex>, where <Tex>{"\\angle Q"}</Tex> is the included angle at Q.</span>, math: (<><div><Tex>{"\\text{S: } \\tfrac{1}{2}(3\\sqrt{3})(3)\\sin 90^\\circ = \\tfrac{9\\sqrt{3}}{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{T: } \\tfrac{1}{2}(3\\sqrt{3})(3)\\sin 30^\\circ = \\tfrac{9\\sqrt{3}}{4}"}</Tex></div></>), },
    { label: "FIND THE RATIO", color: C.calc, text: <span>Divide S by T.</span>, math: (<div><Tex>{"\\frac{\\text{Area S}}{\\text{Area T}} = \\frac{9\\sqrt{3}/2}{9\\sqrt{3}/4} = 2"}</Tex></div>), },
    { label: "CONCLUSION", color: C.ok, text: <span>The ratio of areas is <Tex>{"2:1"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{Area S} : \\text{Area T} = 2 : 1}"}</Tex></div>), conclusion: <span>The answer is B: <Tex>{"2:1"}</Tex>.</span>, },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const S3 = Math.sqrt(3);
  const areaS = 9 * S3 / 2;
  const areaT = 9 * S3 / 4;

  const FO = ({ x, y, w, h, color, align, bg, children }) => (
    <foreignObject x={x} y={y} width={w || 40} height={h || 20}>
      <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
    </foreignObject>
  );

  // Two triangles side by side, centred, with angle indicators
  const diagram = (() => {
    const rad = (d) => d * Math.PI / 180;
    const sc = 26;
    const pqLen = 3 * S3 * sc;
    const qrLen = 3 * sc;
    const pW = 500;
    const gap = 40;
    const totalW = pqLen + gap + pqLen + 30; // 30 for right-side labels
    const ox = (pW - totalW) / 2; // centre offset
    const by = 22 + qrLen;
    const pH = by + 28;

    // Triangle S (left, offset by ox)
    const P1x = ox, P1y = by;
    const Q1x = P1x + pqLen, Q1y = by;
    const R1x = Q1x, R1y = Q1y - qrLen;

    // Triangle T (right)
    const P2x = Q1x + gap, P2y = by;
    const Q2x = P2x + pqLen, Q2y = by;
    const R2x = Q2x - qrLen * Math.cos(rad(30));
    const R2y = Q2y - qrLen * Math.sin(rad(30));

    // Arc for non-right angles
    const arc = (cx, cy, startDeg, endDeg, r) => {
      const s = rad(startDeg), e = rad(endDeg);
      const x1 = cx + r * Math.cos(s), y1 = cy - r * Math.sin(s);
      const x2 = cx + r * Math.cos(e), y2 = cy - r * Math.sin(e);
      return `M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 0 ${x2.toFixed(1)},${y2.toFixed(1)}`;
    };
    // Small square for right angle
    const sqr = 10;

    const FOS = ({ x, y, w, h, color, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 30} height={h || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {/* Triangle S */}
        <polygon points={`${P1x},${P1y} ${Q1x},${Q1y} ${R1x},${R1y}`} fill={C.ps + "15"} stroke={C.ps} strokeWidth={2} />
        <path d={arc(P1x, P1y, 0, 30, 16)} fill="none" stroke={C.calc} strokeWidth={1} />
        {/* Right angle square at Q */}
        <polyline points={`${Q1x - sqr},${Q1y} ${Q1x - sqr},${Q1y - sqr} ${Q1x},${Q1y - sqr}`} fill="none" stroke={C.calc} strokeWidth={1} />
        {/* Vertex labels */}
        <FOS x={P1x - 14} y={P1y + 2} w={14} h={16} color={C.text}><Tex>{"P"}</Tex></FOS>
        <FOS x={Q1x + 3} y={Q1y + 2} w={14} h={16} color={C.text}><Tex>{"Q"}</Tex></FOS>
        <FOS x={R1x + 4} y={R1y - 16} w={14} h={16} color={C.text}><Tex>{"R"}</Tex></FOS>
        {/* Angle labels */}
        <FOS x={P1x + 20} y={P1y - 16} w={24} h={14} color={C.calc}><Tex>{"30^\\circ"}</Tex></FOS>
        <FOS x={Q1x - 14} y={Q1y - 24} w={24} h={14} color={C.calc}><Tex>{"90^\\circ"}</Tex></FOS>
        {/* Side labels */}
        <FOS x={(P1x + Q1x) / 2 - 20} y={P1y + 4} w={44} h={16} color={C.ps}><Tex>{"3\\sqrt{3}"}</Tex></FOS>
        <FOS x={Q1x + 6} y={(Q1y + R1y) / 2 - 8} w={14} h={16} color={C.ps}><Tex>{"3"}</Tex></FOS>
        {/* Name */}
        <FOS x={(P1x + Q1x + R1x) / 3 - 6} y={(P1y + Q1y + R1y) / 3 - 6} w={14} h={16} color={C.ps} bg><Tex>{"S"}</Tex></FOS>

        {/* Triangle T */}
        <polygon points={`${P2x},${P2y} ${Q2x},${Q2y} ${R2x},${R2y}`} fill={C.assum + "15"} stroke={C.assum} strokeWidth={2} />
        <path d={arc(P2x, P2y, 0, 30, 16)} fill="none" stroke={C.calc} strokeWidth={1} />
        <path d={arc(Q2x, Q2y, 150, 180, 16)} fill="none" stroke={C.calc} strokeWidth={1} />
        {/* Vertex labels */}
        <FOS x={P2x - 14} y={P2y + 2} w={14} h={16} color={C.text}><Tex>{"P"}</Tex></FOS>
        <FOS x={Q2x + 3} y={Q2y + 2} w={14} h={16} color={C.text}><Tex>{"Q"}</Tex></FOS>
        <FOS x={R2x - 6} y={R2y - 18} w={14} h={16} color={C.text}><Tex>{"R"}</Tex></FOS>
        {/* Angle labels */}
        <FOS x={P2x + 20} y={P2y - 16} w={24} h={14} color={C.calc}><Tex>{"30^\\circ"}</Tex></FOS>
        <FOS x={Q2x - 8} y={Q2y - 22} w={24} h={14} color={C.calc}><Tex>{"30^\\circ"}</Tex></FOS>
        {/* Side labels */}
        <FOS x={(P2x + Q2x) / 2 - 20} y={P2y + 4} w={44} h={16} color={C.assum}><Tex>{"3\\sqrt{3}"}</Tex></FOS>
        <FOS x={(Q2x + R2x) / 2 + 8} y={(Q2y + R2y) / 2 - 14} w={14} h={16} color={C.assum}><Tex>{"3"}</Tex></FOS>
        {/* Name */}
        <FOS x={(P2x + Q2x + R2x) / 3 - 6} y={(P2y + Q2y + R2y) / 3 - 8} w={14} h={16} color={C.assum} bg><Tex>{"T"}</Tex></FOS>
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>The ambiguous case gives two triangles with the same <Tex>{"P"}</Tex>, <Tex>{"PQ"}</Tex>, <Tex>{"QR"}</Tex> but different angles at <Tex>{"R"}</Tex> (and hence <Tex>{"Q"}</Tex>).</p>
        <p style={{ margin: 0 }}>Since <Tex>{"\\text{Area} = \\tfrac{1}{2} \\cdot PQ \\cdot QR \\cdot \\sin(\\angle PQR)"}</Tex>, the ratio depends only on <Tex>{"\\sin(\\angle Q)"}</Tex>.</p>
      </InfoBox>
      {/* Both triangles info cards */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (
          <div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 100px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{o.letter}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{o.tex}</Tex></div>
          </div>
        ))}
      </div>
      {/* Ratio panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}>AREA S</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{"\\tfrac{9\\sqrt{3}}{2}"}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}>AREA T</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum }}><Tex>{"\\tfrac{9\\sqrt{3}}{4}"}</Tex></div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}>RATIO</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok }}><Tex>{"2 : 1"}</Tex></div>
        </div>
      </div>
      {/* Diagram */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", padding: "8px", marginBottom: 8 }}>{diagram}</div>
      <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}><Tex>{"\\sin 90^\\circ : \\sin 30^\\circ = 1 : \\tfrac{1}{2} = 2 : 1"}</Tex>. The answer is B.</span>
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
