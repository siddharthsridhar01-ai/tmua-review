"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 7, paper: "Paper 1", year: "2026 Mock", topicTag: "Modulus / Integration / Symmetry" };

const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "\\tfrac{32}{3}", text: "32/3", ok: false, expl: "This is the area of just one pocket (between x = 1 and x = 5). The curve is symmetric about the y-axis, so there is an identical pocket on the left. You need to double it." },
  { letter: "B", tex: "16", text: "16", ok: false, expl: "You might get 16 by computing the area under x\u00B2 \u2212 6x + 5 from 0 to 5 without accounting for the sign change or the symmetry." },
  { letter: "C", tex: "\\tfrac{56}{3}", text: "56/3", ok: false, expl: "You might get 56/3 by integrating from \u22125 to 5 without splitting at the roots, or by including area where the curve is above the x-axis." },
  { letter: "D", tex: "\\tfrac{64}{3}", text: "64/3", ok: true, expl: "For x \u2265 0, the curve is x\u00B2 \u2212 6x + 5 = (x\u22121)(x\u22125), below the axis on [1, 5]. Area of right pocket = 32/3. By symmetry (|x| makes it even), total = 2 \u00D7 32/3 = 64/3." },
  { letter: "E", tex: "24", text: "24", ok: false, expl: "You might get 24 by making an error in the antiderivative evaluation, perhaps computing [x\u00B3/3 \u2212 3x\u00B2 + 5x] incorrectly." },
  { letter: "F", tex: "32", text: "32", ok: false, expl: "You might get 32 by computing 2 \u00D7 16, where 16 itself comes from an incorrect integration." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q7</span>
        Find the finite area enclosed between <Tex>{"y = 0"}</Tex> and the curve <Tex>{"y = x^2 - 6|x| + 5."}</Tex>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","\\tfrac{32}{3}"],["B","16"],["C","\\tfrac{56}{3}"],["D","\\tfrac{64}{3}"],["E","24"],["F","32"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

// Graph of y = x^2 - 6|x| + 5
function ModCurveGraph({ compact, showBothPockets }) {
  const pW = compact ? 240 : 500, pH = compact ? 150 : 240;
  const pad = { l: 40, r: 16, t: 20, b: 28 };
  const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
  const xMin = -6.5, xMax = 6.5, yMin = -5, yMax = 8;
  const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
  const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
  const fn = (x) => x * x - 6 * Math.abs(x) + 5;

  const pts = [];
  for (let i = 0; i <= 400; i++) { const x = xMin + (xMax - xMin) * (i / 400); const y = fn(x); if (y >= yMin && y <= yMax) pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); }

  // Shaded pockets (where curve is below x-axis)
  const makeArea = (a, b) => {
    const ap = [];
    for (let i = 0; i <= 60; i++) { const x = a + (b - a) * i / 60; ap.push(`${sx(x).toFixed(1)},${sy(fn(x)).toFixed(1)}`); }
    ap.push(`${sx(b).toFixed(1)},${sy(0).toFixed(1)}`);
    ap.push(`${sx(a).toFixed(1)},${sy(0).toFixed(1)}`);
    return ap.join(" ");
  };

  return (
    <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
      <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
      {[-4, -2, 0, 2, 4, 6].map(x => <line key={x} x1={sx(x)} y1={pad.t} x2={sx(x)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.5} />)}
      {[-4, -2, 0, 2, 4, 6].map(y => y >= yMin && y <= yMax && <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
      <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
      <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.5} />
      {/* Shaded pockets */}
      <polygon points={makeArea(1, 5)} fill={C.ok + "22"} />
      {showBothPockets && <polygon points={makeArea(-5, -1)} fill={C.ok + "22"} />}
      {/* Curve */}
      <path d={"M" + pts.join("L")} fill="none" stroke={C.ps} strokeWidth={2.5} />
      {/* Root markers */}
      {[1, 5, -1, -5].map(x => <circle key={x} cx={sx(x)} cy={sy(0)} r={4} fill={C.ok} stroke={C.white} strokeWidth={1} />)}
      {/* Labels */}
      {!compact && <>
        <foreignObject x={sx(1) - 15} y={sy(0) + 14 - 13} width={30} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>1</div></foreignObject>
        <foreignObject x={sx(5) - 15} y={sy(0) + 14 - 13} width={30} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>5</div></foreignObject>
        <foreignObject x={sx(-1) - 16} y={sy(0) + 14 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>{"\u22121"}</div></foreignObject>
        <foreignObject x={sx(-5) - 16} y={sy(0) + 14 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>{"\u22125"}</div></foreignObject>
        <foreignObject x={sx(0) + 6} y={pad.t + 12 - 13} width={160} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "left", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>y = x{"\u00B2"} {"\u2212"} 6|x| + 5</div></foreignObject>
      </>}
      {compact && <>
        <foreignObject x={sx(1) - 15} y={sy(0) + 13 - 13} width={30} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>1</div></foreignObject>
        <foreignObject x={sx(5) - 15} y={sy(0) + 13 - 13} width={30} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>5</div></foreignObject>
        <foreignObject x={sx(-1) - 16} y={sy(0) + 13 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>{"\u22121"}</div></foreignObject>
        <foreignObject x={sx(-5) - 16} y={sy(0) + 13 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>{"\u22125"}</div></foreignObject>
      </>}
      {[-4, -2, 2, 4, 6].map(x => <foreignObject key={`lx${x} x={sx(x) - 16} y={pH - pad.b + 14 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>{x}</div></foreignObject>)}
      {[-4, -2, 2, 4, 6].map(y => y >= yMin && y <= yMax && <foreignObject key={`ly${y} x={pad.l - 8 - 32} y={sy(y) + 4 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1, fontWeight: 400, fontStyle: "normal", marginLeft: "auto" }}>{y}</div></foreignObject>)}
    </svg>
  );
}

function ReadStep() {
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 7</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Find the finite area enclosed between the line <Tex>{"y = 0"}</Tex> and the curve</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}>
          <Tex>{"y = x^2 - 6|x| + 5"}</Tex>
        </MathBox>
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
        <p style={{ margin: 0 }}>For <Tex>{"x \\ge 0"}</Tex>, <Tex>{"|x| = x"}</Tex> so the curve is <Tex>{"x^2 - 6x + 5 = (x-1)(x-5)"}</Tex>. Find where it's below the x-axis, integrate, and use symmetry to double.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The <Tex>{"|x|"}</Tex> makes the curve symmetric about the y-axis. So the area of the left pocket equals the area of the right pocket.</p>
        <p style={{ margin: 0 }}>Total area = <Tex>{"2 \\times"}</Tex> (area of right pocket from <Tex>{"x = 1"}</Tex> to <Tex>{"x = 5"}</Tex>).</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    {
      label: "APPROACH", color: C.ps,
      text: <span>Replace <Tex>{"|x|"}</Tex> with <Tex>{"x"}</Tex> for <Tex>{"x \\ge 0"}</Tex>, find the roots, integrate the negative region, then double by symmetry.</span>,
      math: (<div><Tex>{"y = x^2 - 6x + 5 = (x - 1)(x - 5) \\quad \\text{\\color{#e2e2e8}{for}} \\; x \\ge 0"}</Tex></div>),
    },
    {
      label: "FIND ROOTS", color: C.calc,
      text: <span>The curve crosses <Tex>{"y = 0"}</Tex> at <Tex>{"x = 1"}</Tex> and <Tex>{"x = 5"}</Tex>. Between these, the curve is below the axis.</span>,
      math: (
        <>
          <div><Tex>{"(x-1)(x-5) = 0 \\;\\Rightarrow\\; x = 1, \\; x = 5"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"\\text{\\color{#e2e2e8}{Curve below axis on}} \\; [1, 5]"}</Tex></div>
        </>
      ),
      diagram: <div style={{ width: 240, background: "#1e2030", border: `1px solid ${C.calc}33`, borderRadius: 8, overflow: "hidden" }}><ModCurveGraph compact={true} showBothPockets={true} /></div>,
    },
    {
      label: "INTEGRATE RIGHT POCKET", color: C.calc,
      text: <span>Compute the area between <Tex>{"x = 1"}</Tex> and <Tex>{"x = 5"}</Tex>.</span>,
      math: (
        <>
          <div><Tex>{"-\\int_1^5 (x^2 - 6x + 5)\\,dx = -\\left[\\frac{x^3}{3} - 3x^2 + 5x\\right]_1^5"}</Tex></div>
          <div style={{ marginTop: 6 }}><Tex>{"F(5) = \\frac{125}{3} - 75 + 25 = \\frac{125 - 150}{3} = -\\frac{25}{3}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"F(1) = \\frac{1}{3} - 3 + 5 = \\frac{1 + 6}{3} = \\frac{7}{3}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"\\color{#fdcb6e}{-\\left(-\\frac{25}{3} - \\frac{7}{3}\\right) = -\\left(-\\frac{32}{3}\\right) = \\frac{32}{3}}"}</Tex></div>
        </>
      ),
    },
    {
      label: "DOUBLE BY SYMMETRY", color: C.calc,
      text: <span>The left pocket (from <Tex>{"x = -5"}</Tex> to <Tex>{"x = -1"}</Tex>) has the same area by the <Tex>{"|x|"}</Tex> symmetry.</span>,
      math: (<div><Tex>{"\\color{#fdcb6e}{\\text{Total} = 2 \\times \\frac{32}{3} = \\frac{64}{3}}"}</Tex></div>),
    },
    {
      label: "CONCLUSION", color: C.ok,
      text: <span>The enclosed area is <Tex>{"\\tfrac{64}{3}"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\text{Area} = \\frac{64}{3}}"}</Tex></div>),
      conclusion: <span>The area is <Tex>{"\\tfrac{64}{3}"}</Tex>. The answer is D.</span>,
    },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => {
          if (i > revealed) return null;
          return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 240px", alignSelf: "flex-start" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>);
        })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [showBoth, setShowBoth] = useState(false);
  const rightArea = 32 / 3;
  const totalArea = 64 / 3;

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. The graph shows <Tex>{"y = x^2 - 6|x| + 5"}</Tex> with roots at <Tex>{"\\pm 1"}</Tex> and <Tex>{"\\pm 5"}</Tex></p>
        <p style={{ margin: "0 0 4px" }}>2. Toggle to show both pockets and see the symmetry</p>
        <p style={{ margin: 0 }}>3. Each green pocket has area <Tex>{"\\tfrac{32}{3}"}</Tex>; together they give <Tex>{"\\tfrac{64}{3}"}</Tex></p>
      </InfoBox>

      {/* Toggle */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        <button onClick={() => setShowBoth(false)} style={{
          flex: 1, padding: "8px 4px", borderRadius: 7,
          border: `1px solid ${!showBoth ? C.ps : C.border}`,
          background: !showBoth ? C.ps + "15" : C.card,
          color: !showBoth ? C.ps : C.muted,
          fontSize: 12, cursor: "pointer", fontWeight: !showBoth ? 700 : 400,
        }}>Right pocket only</button>
        <button onClick={() => setShowBoth(true)} style={{
          flex: 1, padding: "8px 4px", borderRadius: 7,
          border: `1px solid ${showBoth ? C.ok : C.border}`,
          background: showBoth ? C.ok + "15" : C.card,
          color: showBoth ? C.ok : C.muted,
          fontSize: 12, cursor: "pointer", fontWeight: showBoth ? 700 : 400,
        }}>Both pockets (symmetry)</button>
      </div>

      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
        <ModCurveGraph compact={false} showBothPockets={showBoth} />
      </div>

      {/* Computation display */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ background: "#1e2030", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          {showBoth ? (
            <>
              <div><Tex>{"\\color{#8b8d9a}{\\text{Right pocket:}} \\; \\color{#e2e2e8}{-\\int_1^5 (x^2 - 6x + 5)\\,dx = \\frac{32}{3}}"}</Tex></div>
              <div style={{ marginTop: 6 }}><Tex>{"\\color{#8b8d9a}{\\text{Left pocket:}} \\; \\color{#e2e2e8}{-\\int_{-5}^{-1} (x^2 + 6x + 5)\\,dx = \\frac{32}{3}}"}</Tex></div>
              <div style={{ marginTop: 6 }}><Tex>{"\\color{#55efc4}{\\text{Total} = \\frac{32}{3} + \\frac{32}{3} = \\frac{64}{3}}"}</Tex></div>
            </>
          ) : (
            <>
              <div><Tex>{"\\color{#e2e2e8}{-\\int_1^5 (x^2 - 6x + 5)\\,dx}"}</Tex></div>
              <div style={{ marginTop: 4 }}><Tex>{"\\color{#e2e2e8}{= -\\left[\\frac{x^3}{3} - 3x^2 + 5x\\right]_1^5 = -\\left(-\\frac{25}{3} - \\frac{7}{3}\\right) = \\frac{32}{3}}"}</Tex></div>
            </>
          )}
        </div>
      </div>

      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}>Right pocket</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.ps, fontFamily: mathFont }}>32/3</div>
        </div>
        <div style={{ background: showBoth ? C.card : "transparent", border: `1px solid ${showBoth ? C.ps + "44" : "transparent"}`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: showBoth ? C.ps : "transparent", fontWeight: 700, marginBottom: 2 }}>Left pocket</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: showBoth ? C.ps : "transparent", fontFamily: mathFont }}>32/3</div>
        </div>
        <div style={{ background: showBoth ? C.conclBg : C.card, border: `1px solid ${showBoth ? C.ok + "66" : C.border}`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: showBoth ? C.ok : C.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Total</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: showBoth ? C.ok : C.muted, fontFamily: mathFont }}>{showBoth ? "64/3" : "?"}</div>
        </div>
      </div>

      {/* Banner */}
      {showBoth ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>
            Two symmetric pockets: <Tex>{"\\tfrac{32}{3} + \\tfrac{32}{3} = \\tfrac{64}{3}"}</Tex>. The answer is D.
          </span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>
            Right pocket area = <Tex>{"\\tfrac{32}{3}"}</Tex>. Tap "Both pockets" to see the full symmetric area.
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
