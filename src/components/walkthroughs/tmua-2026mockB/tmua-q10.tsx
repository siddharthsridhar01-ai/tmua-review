"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 10, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Integration / Trapezium Rule" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: true, tex: "4(\\pi - 1 - \\sqrt{3})", expl: "The exact integral is the area of a quarter-circle of radius 4, giving 4\u03C0. The trapezium estimate with 2 strips is 4 + 4\u221A3. The positive difference is 4\u03C0 \u2212 4 \u2212 4\u221A3 = 4(\u03C0 \u2212 1 \u2212 \u221A3)." },
  { letter: "B", ok: false, tex: "4\\pi - 4 - 4\\sqrt{3}", expl: "This is actually the same value as option A, just not factorised. Since A is listed first and is the factorised form, A is the intended answer. However, if you selected this, your working was correct." },
  { letter: "C", ok: false, tex: "4\\pi - 4", expl: "You might get this by using f(2) = 2 instead of f(2) = 2\u221A3, i.e. forgetting to evaluate \u221A(16 \u2212 4) = \u221A12 = 2\u221A3 correctly." },
  { letter: "D", ok: false, tex: "2(\\pi - 1 - \\sqrt{3})", expl: "You might get this by using h = 1 instead of h = 2 in the trapezium rule, effectively halving the estimate." },
  { letter: "E", ok: false, tex: "4\\pi - 2\\sqrt{3}", expl: "You might get this by using only one f(2) term instead of 2f(2) in the trapezium formula, i.e. forgetting to double the middle ordinate." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q10</span>
        The trapezium rule with <Tex>{"2"}</Tex> strips is used to estimate <Tex>{"\\displaystyle\\int_0^4 \\!\\sqrt{16 - x^2}\\,dx"}</Tex>. What is the positive difference between the estimate and the exact value?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","4(\\pi-1-\\sqrt{3})"],["B","4\\pi-4-4\\sqrt{3}"],["C","4\\pi-4"],["D","2(\\pi-1-\\sqrt{3})"],["E","4\\pi-2\\sqrt{3}"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 10</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The trapezium rule with <Tex>{"2"}</Tex> strips is used to estimate</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"\\int_0^4 \\sqrt{16 - x^2}\\,dx"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 0" }}>What is the positive difference between the estimate and the exact value?</p>
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
        <p style={{ margin: 0 }}>Recognise that <Tex>{"y = \\sqrt{16 - x^2}"}</Tex> is the upper half of the circle <Tex>{"x^2 + y^2 = 16"}</Tex>. Integrating from <Tex>{"0"}</Tex> to <Tex>{"4"}</Tex> gives a quarter-circle area. Compute this exactly using geometry, then apply the trapezium rule separately, and subtract.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Exact value = area of a quarter-circle of radius <Tex>{"4"}</Tex>: <Tex>{"\\tfrac{1}{4}\\pi(4)^2 = 4\\pi"}</Tex>.</p>
        <p style={{ margin: 0 }}>Trapezium rule with <Tex>{"2"}</Tex> strips has strip width <Tex>{"h = \\tfrac{4-0}{2} = 2"}</Tex> and ordinates at <Tex>{"x = 0, 2, 4"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveDiagram = (() => {
    const pW = 260;
    const pad = { l: 24, r: 8, t: 8, b: 20 };
    const gW = pW - pad.l - pad.r;
    const xMin = -0.5, xMax = 5, yMin = -0.5, yMax = 5;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;
    // Quarter circle arc
    const arcPts = [];
    for (let i = 0; i <= 40; i++) {
      const x = (i / 40) * 4;
      const y = Math.sqrt(16 - x * x);
      arcPts.push(`${sx(x)},${sy(y)}`);
    }
    arcPts.push(`${sx(4)},${sy(0)}`);
    arcPts.push(`${sx(0)},${sy(0)}`);
    // Trapezium region
    const trapPts = `${sx(0)},${sy(0)} ${sx(0)},${sy(4)} ${sx(2)},${sy(Math.sqrt(12))} ${sx(4)},${sy(0)}`;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <polygon points={arcPts.join(" ")} fill={C.ps + "22"} stroke="none" />
        <polyline points={arcPts.slice(0, 41).join(" ")} fill="none" stroke={C.ps} strokeWidth={1.5} />
        <polygon points={trapPts} fill={C.calc + "22"} stroke={C.calc} strokeWidth={1} strokeDasharray="4,2" />
        {[[0, 4], [2, Math.sqrt(12)], [4, 0]].map(([x, y], i) => <circle key={i} cx={sx(x)} cy={sy(y)} r={3} fill={C.calc} stroke={C.white} strokeWidth={1} />)}
        <text x={sx(0) - 3} y={sy(4) - 4} textAnchor="end" fill={C.calc} fontSize={11} fontFamily={mathFont}>4</text>
        <text x={sx(2)} y={sy(Math.sqrt(12)) - 5} textAnchor="middle" fill={C.calc} fontSize={11} fontFamily={mathFont}>2{"\u221A"}3</text>
        <text x={sx(4) + 3} y={sy(0) + 12} textAnchor="start" fill={C.muted} fontSize={11} fontFamily={mathFont}>4</text>
        <text x={sx(2)} y={sy(0) + 12} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont}>2</text>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Find the exact value of the integral using the geometric interpretation as a quarter-circle. Then compute the trapezium rule estimate and subtract.</span>, math: (<div><Tex>{"\\text{Difference} = |\\text{Exact} - \\text{Estimate}|"}</Tex></div>) },
    { label: "EXACT VALUE (QUARTER-CIRCLE)", color: C.calc, text: <span>The curve <Tex>{"y = \\sqrt{16 - x^2}"}</Tex> is the top half of the circle <Tex>{"x^2 + y^2 = 16"}</Tex> (radius <Tex>{"4"}</Tex>). Integrating from <Tex>{"0"}</Tex> to <Tex>{"4"}</Tex> gives the area of one quarter of this circle.</span>, math: (<><div><Tex>{"\\int_0^4 \\sqrt{16 - x^2}\\,dx = \\tfrac{1}{4}\\pi r^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\tfrac{1}{4}\\pi(4)^2 = 4\\pi"}</Tex></div></>), diagram: solveDiagram },
    { label: "TRAPEZIUM RULE SETUP", color: C.calc, text: <span>With <Tex>{"n = 2"}</Tex> strips from <Tex>{"0"}</Tex> to <Tex>{"4"}</Tex>, the strip width is <Tex>{"h = 2"}</Tex>. The ordinates are at <Tex>{"x = 0"}</Tex>, <Tex>{"x = 2"}</Tex>, and <Tex>{"x = 4"}</Tex>.</span>, math: (<><div><Tex>{"h = \\frac{4-0}{2} = 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"f(0) = \\sqrt{16 - 0} = 4"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"f(2) = \\sqrt{16 - 4} = \\sqrt{12} = 2\\sqrt{3}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"f(4) = \\sqrt{16 - 16} = 0"}</Tex></div></>) },
    { label: "COMPUTE THE ESTIMATE", color: C.calc, text: <span>Apply the trapezium rule formula: <Tex>{"T = \\tfrac{h}{2}[f(x_0) + 2f(x_1) + f(x_2)]"}</Tex>.</span>, math: (<><div><Tex>{"T = \\tfrac{2}{2}\\bigl[4 + 2(2\\sqrt{3}) + 0\\bigr]"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 1 \\times (4 + 4\\sqrt{3})"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 4 + 4\\sqrt{3}"}</Tex></div></>) },
    { label: "FIND THE DIFFERENCE", color: C.calc, text: <span>Subtract the estimate from the exact value. Since the quarter-circle is concave, the trapezium rule underestimates, so <Tex>{"4\\pi > 4 + 4\\sqrt{3}"}</Tex>.</span>, math: (<><div><Tex>{"\\text{Exact} - \\text{Estimate} = 4\\pi - (4 + 4\\sqrt{3})"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 4\\pi - 4 - 4\\sqrt{3}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 4(\\pi - 1 - \\sqrt{3})"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>The positive difference is <Tex>{"4(\\pi - 1 - \\sqrt{3})"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{4(\\pi - 1 - \\sqrt{3}) \\approx 0.63}"}</Tex></div>), conclusion: <span>The answer is A: <Tex>{"4(\\pi - 1 - \\sqrt{3})"}</Tex>.</span> },
  ];

  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [nStrips, setNStrips] = useState(2);
  const snapPoints = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20];
  const snapRadius = 0.8;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return Math.round(raw); };

  const f = (x) => Math.sqrt(Math.max(0, 16 - x * x));
  const exactVal = Math.PI * 4; // 4pi

  // Trapezium rule with nStrips strips
  const h = 4 / nStrips;
  let trapEst = 0;
  for (let i = 0; i <= nStrips; i++) {
    const xi = i * h;
    const w = (i === 0 || i === nStrips) ? 1 : 2;
    trapEst += w * f(xi);
  }
  trapEst *= h / 2;

  const diff = Math.abs(exactVal - trapEst);

  const isExact2 = nStrips === 2;
  const isNear = !isExact2 && Math.abs(nStrips - 2) <= 1;
  const col = isExact2 ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "n1", jsx: <span><Tex>{"n = 1"}</Tex></span>, val: 1 },
    { label: "n2", jsx: <span><Tex>{"n = 2"}</Tex></span>, val: 2 },
    { label: "n4", jsx: <span><Tex>{"n = 4"}</Tex></span>, val: 4 },
    { label: "n10", jsx: <span><Tex>{"n = 10"}</Tex></span>, val: 10 },
  ];

  const graph = (() => {
    const pW = 500;
    const pad = { l: 44, r: 16, t: 16, b: 28 };
    const gW = pW - pad.l - pad.r;
    const xMin = -0.3, xMax = 4.8, yMin = -0.3, yMax = 4.5;
    const xRange = xMax - xMin, yRange = yMax - yMin;
    const gH = gW * (yRange / xRange);
    const pH = gH + pad.t + pad.b;
    const sx = (x) => pad.l + ((x - xMin) / xRange) * gW;
    const sy = (y) => pad.t + ((yMax - y) / yRange) * gH;

    // Quarter-circle curve
    const curvePts = [];
    for (let i = 0; i <= 80; i++) {
      const x = (i / 80) * 4;
      const y = f(x);
      curvePts.push(`${sx(x)},${sy(y)}`);
    }

    // Shaded area under curve
    const shadedPts = [...curvePts, `${sx(4)},${sy(0)}`, `${sx(0)},${sy(0)}`].join(" ");

    // Trapezium polygon
    const trapPts = [];
    trapPts.push(`${sx(0)},${sy(0)}`);
    for (let i = 0; i <= nStrips; i++) {
      const xi = i * h;
      trapPts.push(`${sx(xi)},${sy(f(xi))}`);
    }
    trapPts.push(`${sx(4)},${sy(0)}`);

    // Vertical lines for strips
    const stripLines = [];
    for (let i = 0; i <= nStrips; i++) {
      const xi = i * h;
      stripLines.push({ x: xi, y: f(xi) });
    }

    const FO = ({ x, y, w, hh, color, align, bg, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 20}>
        <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
      </foreignObject>
    );

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="plotArea"><rect x={pad.l} y={pad.t} width={gW} height={gH} /></clipPath></defs>
        {[0, 1, 2, 3, 4].map(y => <line key={"gy" + y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        {[0, 1, 2, 3, 4].map(x => <line key={"gx" + x} x1={sx(x)} y1={pad.t} x2={sx(x)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        <g clipPath="url(#plotArea)">
          <polygon points={shadedPts} fill={C.ps + "18"} />
          <polygon points={trapPts.join(" ")} fill={col + "22"} stroke={col} strokeWidth={1.5} strokeDasharray="4,2" />
          <polyline points={curvePts.join(" ")} fill="none" stroke={C.ps} strokeWidth={2} />
          {stripLines.map((pt, i) => <line key={i} x1={sx(pt.x)} y1={sy(0)} x2={sx(pt.x)} y2={sy(pt.y)} stroke={col} strokeWidth={1} strokeOpacity={0.6} />)}
        </g>
        {stripLines.map((pt, i) => <circle key={i} cx={sx(pt.x)} cy={sy(pt.y)} r={3.5} fill={col} stroke={C.white} strokeWidth={1} />)}
        <FO x={sx(0.5)} y={sy(4.2)} w={90} hh={16} color={C.ps} bg><Tex>{"y = \\sqrt{16-x^2}"}</Tex></FO>
        {[0, 2, 4].map(x => <FO key={"x" + x} x={sx(x) - 10} y={pH - pad.b + 2} w={20} hh={18}><Tex>{String(x)}</Tex></FO>)}
        {[2, 4].map(y => <FO key={"y" + y} x={0} y={sy(y) - 9} w={pad.l - 6} hh={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      {/* Slider + presets row */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"n"}</Tex> (strips)</span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{String(nStrips)}</Tex></span>
        </div>
        <input type="range" min={1} max={20} step={1} value={nStrips} onChange={e => setNStrips(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map(pr => { const active = nStrips === pr.val; return (<button key={pr.label} onClick={() => setNStrips(pr.val)} style={{ flex: 1, padding: "5px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      {/* Panels row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 6 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 1 }}>Exact</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{`4\\pi`}</Tex></div>
          <div style={{ fontSize: 11, color: C.muted }}><Tex>{`\\approx ${fmt(exactVal)}`}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 1 }}>Estimate</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{fmt(trapEst)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 1 }}>Difference</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col }}><Tex>{fmt(diff)}</Tex></div>
        </div>
      </div>
      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 6 }}>{graph}</div>
      {/* Conclusion banner */}
      {isExact2 ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>With <Tex>{"n = 2"}</Tex>: difference = <Tex>{"4(\\pi - 1 - \\sqrt{3}) \\approx 0.63"}</Tex>. The answer is A.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.assum }}>Close! Try <Tex>{"n = 2"}</Tex> to match the question.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Difference = <Tex>{fmt(diff)}</Tex>. Set <Tex>{"n = 2"}</Tex> to match the question.</span>
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
