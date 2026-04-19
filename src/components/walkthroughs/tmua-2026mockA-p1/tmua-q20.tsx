"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 20, paper: "Set A Paper 1", year: "2026 Mock", topicTag: "Hidden Circle / Logarithm Equation" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "50\\pi", text: "50\u03C0", ok: false, expl: "You might get 50\u03C0 by computing r\u00B2 = 50 (halving the correct value), perhaps from a sign error when completing the square." },
  { letter: "B", tex: "100\\pi", text: "100\u03C0", ok: false, expl: "You might get 100\u03C0 by finding r\u00B2 = 100, perhaps from only completing the square in one variable and missing the other." },
  { letter: "C", tex: "200\\pi", text: "200\u03C0", ok: true, expl: "Simplify the log equation: x\u00B2 + y\u00B2 = 10(2y \u2212 2x). Complete the square: (x+10)\u00B2 + (y\u221210)\u00B2 = 200. Area = \u03C0r\u00B2 = 200\u03C0." },
  { letter: "D", tex: "400\\pi", text: "400\u03C0", ok: false, expl: "You might get 400\u03C0 by squaring the radius again: (\u221A200)\u00B2 = 200, but \u03C0(200) = 200\u03C0, not 400\u03C0. Or by computing \u03C0(20)\u00B2 from a wrong radius." },
  { letter: "E", tex: "10\\sqrt{2}\\,\\pi", text: "10\u221A2 \u03C0", ok: false, expl: "10\u221A2 is the radius, not the area. The area is \u03C0r\u00B2 = \u03C0(10\u221A2)\u00B2 = 200\u03C0." },
  { letter: "F", tex: "20\\sqrt{2}\\,\\pi", text: "20\u221A2 \u03C0", ok: false, expl: "You might get 20\u221A2 \u03C0 by confusing \u03C0r with \u03C0r\u00B2, or by using 2r instead of r\u00B2 in the area formula." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q20</span>
        Find the area enclosed by the curve <Tex>{"\\log_{10}(x^2 + y^2) = 1 + \\log_{10}(2y - 2x)."}</Tex>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","50\\pi"],["B","100\\pi"],["C","200\\pi"],["D","400\\pi"],["E","10\\sqrt{2}\\,\\pi"],["F","20\\sqrt{2}\\,\\pi"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 20</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Find the area enclosed by the curve</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"\\log_{10}(x^2 + y^2) = 1 + \\log_{10}(2y - 2x)"}</Tex></MathBox>
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
        <p style={{ margin: 0 }}>Use log rules to combine the right side, then remove the logs to get a polynomial equation. Complete the square to reveal a hidden circle, then read off the radius and compute the area.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}><Tex>{"1 = \\log_{10}(10)"}</Tex>, so <Tex>{"1 + \\log_{10}(2y - 2x) = \\log_{10}(10(2y - 2x))"}</Tex>.</p>
        <p style={{ margin: 0 }}>Once both sides are a single log, equate the arguments: <Tex>{"x^2 + y^2 = 20y - 20x"}</Tex>. This is the equation of a circle in disguise.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const circleDiagram = (() => {
    const pW = 270, pH = 200;
    const pad = { l: 28, r: 12, t: 16, b: 20 };
    const cx = -10, cy = 10, r = Math.sqrt(200);
    const xMin = cx - r - 4, xMax = cx + r + 4, yMin = cy - r - 4, yMax = cy + r + 4;
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.08" y="-0.2" width="1.16" height="1.45" id="lbc"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        <circle cx={sx(cx)} cy={sy(cy)} r={r / (xMax - xMin) * gW} fill={C.ok + "15"} stroke={C.ok} strokeWidth={2} />
        <circle cx={sx(cx)} cy={sy(cy)} r={3} fill={C.ok} stroke={C.white} strokeWidth={1} />
        <text x={sx(cx)} y={sy(cy) + 14} textAnchor="middle" fill={C.ok} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lbc)">({"\u2212"}10, 10)</text>
        <text x={sx(cx + r / 2)} y={sy(cy) - 4} textAnchor="start" fill={C.assum} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lbc)">r = 10{"\u221A"}2</text>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Use log rules to remove the logarithms, then complete the square to identify the curve.</span>,
      math: (<div><Tex>{"\\log_{10}(A) = \\log_{10}(B) \\;\\Longleftrightarrow\\; A = B"}</Tex></div>), },
    { label: "COMBINE THE LOG TERMS", color: C.calc,
      text: <span>Use <Tex>{"1 = \\log_{10}(10)"}</Tex> and the log addition rule <Tex>{"\\log a + \\log b = \\log(ab)"}</Tex>.</span>,
      math: (<><div><Tex>{"\\log_{10}(x^2 + y^2) = 1 + \\log_{10}(2y - 2x)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\log_{10}(x^2 + y^2) = \\log_{10}(10) + \\log_{10}(2y - 2x)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\log_{10}(x^2 + y^2) = \\log_{10}\\bigl(10(2y - 2x)\\bigr)"}</Tex></div></>), },
    { label: "REMOVE THE LOGS", color: C.calc,
      text: <span>Since the logs are equal, the arguments are equal.</span>,
      math: (<><div><Tex>{"x^2 + y^2 = 10(2y - 2x)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 + y^2 = 20y - 20x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 + 20x + y^2 - 20y = 0"}</Tex></div></>), },
    { label: "COMPLETE THE SQUARE", color: C.calc,
      text: <span>Complete the square in <Tex>{"x"}</Tex> (half of <Tex>{"20"}</Tex> is <Tex>{"10"}</Tex>, so add <Tex>{"10^2 = 100"}</Tex>) and in <Tex>{"y"}</Tex> (half of <Tex>{"-20"}</Tex> is <Tex>{"-10"}</Tex>, so add <Tex>{"(-10)^2 = 100"}</Tex>).</span>,
      math: (<><div><Tex>{"(x^2 + 20x + 100) + (y^2 - 20y + 100) = 0 + 100 + 100"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(x + 10)^2 + (y - 10)^2 = 200"}</Tex></div></>),
      diagram: circleDiagram, },
    { label: "READ OFF CENTRE AND RADIUS", color: C.calc,
      text: <span>This is a circle with centre <Tex>{"(-10, 10)"}</Tex> and radius <Tex>{"r = \\sqrt{200} = 10\\sqrt{2}"}</Tex>.</span>,
      math: (<><div><Tex>{"\\text{Centre} = (-10, 10), \\quad r^2 = 200, \\quad r = \\sqrt{200} = \\sqrt{100 \\times 2} = 10\\sqrt{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Area} = \\pi r^2 = \\pi \\times 200 = 200\\pi"}</Tex></div></>), },
    { label: "CHECK DOMAIN", color: C.calc,
      text: <span>We need <Tex>{"2y - 2x > 0"}</Tex>, i.e. <Tex>{"y > x"}</Tex>. The centre <Tex>{"(-10, 10)"}</Tex> is distance <Tex>{"\\tfrac{|10-(-10)|}{\\sqrt{2}} = \\tfrac{20}{\\sqrt{2}} = 10\\sqrt{2}"}</Tex> from the line <Tex>{"y = x"}</Tex>, which equals the radius. So the circle is tangent to <Tex>{"y = x"}</Tex>, and the entire circle (minus the tangent point) satisfies <Tex>{"y > x"}</Tex>.</span>,
      math: (<div><Tex>{"\\text{Distance from centre to } y = x \\text{ equals } r \\;\\Rightarrow\\; \\text{full circle is valid}"}</Tex></div>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The enclosed area is <Tex>{"200\\pi"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\text{Area} = \\pi r^2 = \\pi \\times 200 = 200\\pi}"}</Tex></div>),
      conclusion: <span>The curve is a circle with <Tex>{"r^2 = 200"}</Tex>. Area <Tex>{"= 200\\pi"}</Tex>. The answer is C.</span>, },
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
  const graph = (() => {
    const pW = 500, pH = 360;
    const pad = { l: 40, r: 16, t: 20, b: 28 };
    const cx = -10, cy = 10, r = Math.sqrt(200);
    const xMin = cx - r - 6, xMax = cx + r + 6, yMin = cy - r - 6, yMax = cy + r + 6;
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const rPx = r / (xMax - xMin) * gW;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.08" y="-0.2" width="1.16" height="1.45" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {/* Axes */}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        {/* y = x tangent line */}
        <line x1={sx(yMin)} y1={sy(yMin)} x2={sx(yMax)} y2={sy(yMax)} stroke={C.muted + "44"} strokeWidth={1} strokeDasharray="6,4" />
        <text x={sx(yMax - 2)} y={sy(yMax - 2) + 14} textAnchor="end" fill={C.muted} fontSize={11} fontFamily={mathFont} filter="url(#lb)">y = x</text>
        {/* Circle */}
        <circle cx={sx(cx)} cy={sy(cy)} r={rPx} fill={C.ok + "12"} stroke={C.ok} strokeWidth={2.5} />
        {/* Centre dot */}
        <circle cx={sx(cx)} cy={sy(cy)} r={4} fill={C.ok} stroke={C.white} strokeWidth={1.5} />
        <text x={sx(cx) + 8} y={sy(cy) + 4} textAnchor="start" fill={C.ok} fontSize={12} fontWeight={600} fontFamily={mathFont} filter="url(#lb)">({"\u2212"}10, 10)</text>
        {/* Radius line */}
        <line x1={sx(cx)} y1={sy(cy)} x2={sx(cx + r)} y2={sy(cy)} stroke={C.assum} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={sx(cx + r / 2)} y={sy(cy) - 8} textAnchor="middle" fill={C.assum} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb)">r = 10{"\u221A"}2 {"\u2248"} 14.1</text>
        {/* Area label inside */}
        <text x={sx(cx)} y={sy(cy) - 22} textAnchor="middle" fill={C.ok} fontSize={14} fontWeight={700} fontFamily={mathFont} filter="url(#lb)">Area = 200{"\u03C0"}</text>
        {/* Tangent point */}
        <circle cx={sx(0)} cy={sy(0)} r={3.5} fill={C.muted} stroke={C.white} strokeWidth={1} />
        <text x={sx(0) + 6} y={sy(0) - 6} textAnchor="start" fill={C.muted} fontSize={11} fontFamily={mathFont} filter="url(#lb)">tangent to y = x</text>
        {/* Axis labels */}
        {[-20, -10, 10, 20].filter(x => x >= xMin && x <= xMax).map(x => <text key={`x${x}`} x={sx(x)} y={pH - pad.b + 14} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont}>{x}</text>)}
        {[10, 20].filter(y => y >= yMin && y <= yMax).map(y => <text key={`y${y}`} x={pad.l - 8} y={sy(y) + 4} textAnchor="end" fill={C.muted} fontSize={11} fontFamily={mathFont}>{y}</text>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>The log equation simplifies to <Tex>{"(x+10)^2 + (y-10)^2 = 200"}</Tex>, a circle</p>
        <p style={{ margin: 0 }}>The circle is tangent to <Tex>{"y = x"}</Tex> at the origin, confirming the domain <Tex>{"2y - 2x > 0"}</Tex> holds everywhere on the curve</p>
      </InfoBox>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Centre</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.assum }}><Tex>{"(-10, 10)"}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}><Tex>{"r^2"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps, fontFamily: mathFont }}>200</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}66`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Area</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.ok }}><Tex>{"200\\pi"}</Tex></div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>The curve is a circle: <Tex>{"(x+10)^2 + (y-10)^2 = 200"}</Tex>. Area <Tex>{"= \\pi r^2 = 200\\pi"}</Tex>. The answer is C.</span>
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
