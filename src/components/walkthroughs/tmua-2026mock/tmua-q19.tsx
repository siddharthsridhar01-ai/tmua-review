"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 19, paper: "Paper 1", year: "2026 Mock", topicTag: "Differential Equation / Absolute Values" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

// f(x) = integral from 0 to x of (|3-t| - |t-1|) dt, so f(0)=0
const fExact = (x) => {
  if (x <= 1) return 2 * x;
  if (x <= 3) return 2 * 1 + (4 * (x - 1) - (x * x - 1 * 1)) - (4 * 0); // integral from 1 to x of (4-2t)
  // f(1) = 2, f(x) for 1<=x<=3: f(1) + [4t - t^2] from 1 to x = 2 + (4x - x^2) - (4 - 1) = 2 + 4x - x^2 - 3 = 4x - x^2 - 1
  // f(3) = 12 - 9 - 1 = 2, then f(x) for x>=3: f(3) + [-2t] from 3 to x = 2 + (-2x + 6) = 8 - 2x
  return 0; // placeholder
};
// Let me redo this properly
const f = (x) => {
  if (x <= 1) return 2 * x;
  if (x <= 3) return 2 + (4 * x - x * x) - (4 * 1 - 1 * 1); // = 2 + 4x - x^2 - 3 = 4x - x^2 - 1
  return (4 * 3 - 3 * 3 - 1) + (-2) * (x - 3); // f(3) = 12 - 9 - 1 = 2, then -2(x-3)
};
// Check: f(0)=0, f(1)=2, f(2)=8-4-1=3, f(3)=12-9-1=2, f(4)=2+(-2)(1)=0. Sum = 0+3+0 = 3. ✓

const g = (x) => Math.abs(3 - x) - Math.abs(x - 1); // dy/dx

const opts = [
  { letter: "A", tex: "1", text: "1", ok: false, expl: "You might get 1 if you evaluate f at only one point, or make an integration error in one of the regions." },
  { letter: "B", tex: "2", text: "2", ok: false, expl: "You might get 2 if you compute f(2) = 3 correctly but make errors on f(0) or f(4), for example getting f(0) = \u22121 and f(4) = 0." },
  { letter: "C", tex: "3", text: "3", ok: true, expl: "Using f(x) = \u222B\u2080\u02E3 g(t) dt: f(0) = 0, f(2) = \u222B\u2080\u00B9 2 dt + \u222B\u2081\u00B2 (4\u22122t) dt = 2 + 1 = 3, f(4) = 3 + (\u22121) + (\u22122) = 0. Sum = 0 + 3 + 0 = 3." },
  { letter: "D", tex: "4", text: "4", ok: false, expl: "You might get 4 by computing f(2) = 4 (forgetting the constant of integration when joining the piecewise sections)." },
  { letter: "E", tex: "5", text: "5", ok: false, expl: "You might get 5 by evaluating the antiderivative 4x \u2212 x\u00B2 at x = 0, 2, 4 without splitting into the correct regions." },
  { letter: "F", tex: "6", text: "6", ok: false, expl: "You might get 6 by computing 3 \u00D7 f(2) = 3 \u00D7 2 = 6, confusing the sum with a multiple of one value." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q19</span>
        The solution to the differential equation <Tex>{"\\tfrac{dy}{dx} = |3-x| - |x-1|"}</Tex> for all <Tex>{"x"}</Tex> is <Tex>{"y = f(x) + c"}</Tex>, where <Tex>{"c"}</Tex> is a constant. Find the value of <Tex>{"f(0) + f(2) + f(4)."}</Tex>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","1"],["B","2"],["C","3"],["D","4"],["E","5"],["F","6"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 19</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The solution to the differential equation</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"\\frac{dy}{dx} = |3 - x| - |x - 1| \\quad \\text{for all } x"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>is <Tex>{"y = f(x) + c"}</Tex>, where <Tex>{"c"}</Tex> is a constant.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Find the value of <Tex>{"f(0) + f(2) + f(4)."}</Tex></p>
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
        <p style={{ margin: 0 }}>The absolute values create breakpoints at <Tex>{"x = 1"}</Tex> and <Tex>{"x = 3"}</Tex>. Split into three regions, simplify <Tex>{"\\tfrac{dy}{dx}"}</Tex> in each, integrate piecewise, and join with continuity conditions. Then evaluate <Tex>{"f"}</Tex> at <Tex>{"0, 2, 4"}</Tex>.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}><Tex>{"|3 - x|"}</Tex> changes sign at <Tex>{"x = 3"}</Tex> and <Tex>{"|x - 1|"}</Tex> changes sign at <Tex>{"x = 1"}</Tex>.</p>
        <p style={{ margin: 0 }}>The three regions are <Tex>{"x < 1"}</Tex>, <Tex>{"1 \\le x < 3"}</Tex>, and <Tex>{"x \\ge 3"}</Tex>. Conveniently, the evaluation points <Tex>{"0, 2, 4"}</Tex> fall one in each region.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const mkGraph = (drawFn, opts) => {
    const pW = 270, pH = 170;
    const pad = { l: 30, r: 12, t: 18, b: 22 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const { xMin, xMax, yMin, yMax } = opts;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lbs"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(1)} y1={pad.t} x2={sx(1)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.5} strokeDasharray="3,3" />
        <line x1={sx(3)} y1={pad.t} x2={sx(3)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.5} strokeDasharray="3,3" />
        {drawFn(sx, sy, pW, pH, pad)}
        {[0, 1, 2, 3, 4].map(x => <foreignObject key={x} x={sx(x) - 16} y={pH - pad.b + 13 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>{x}</div></foreignObject>)}
      </svg>
    );
  };

  // Three colours for three regions - consistent between solve and verify
  const c1 = "#74b9ff", c2 = "#a29bfe", c3 = "#fd79a8";

  const derivGraph = mkGraph((sx, sy) => {
    const segPath = (fn, x0, x1) => { const pts = []; for (let i = 0; i <= 100; i++) { const x = x0 + (x1 - x0) * (i / 100); const y = fn(x); pts.push(`${pts.length === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } return pts.join(""); };
    return (<>
      <path d={segPath(g, -0.5, 1)} fill="none" stroke={c1} strokeWidth={2} />
      <path d={segPath(g, 1, 3)} fill="none" stroke={c2} strokeWidth={2} />
      <path d={segPath(g, 3, 5)} fill="none" stroke={c3} strokeWidth={2} />
      <foreignObject x={sx(0.2)} y={sy(2) - 6 - 13} width={30} height={20}><div style={{ fontSize: 11, color: c1, textAlign: "left", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>2</div></foreignObject>
      <foreignObject x={sx(2) - 28} y={sy(g(2)) - 6 - 13} width={56} height={20}><div style={{ fontSize: 11, color: c2, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>4{"\u2212"}2x</div></foreignObject>
      <foreignObject x={sx(4) - 20} y={sy(-2) - 6 - 13} width={40} height={20}><div style={{ fontSize: 11, color: c3, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>{"\u2212"}2</div></foreignObject>
    </>);
  }, { xMin: -0.5, xMax: 5, yMin: -3, yMax: 3 });

  const antiderivGraph = mkGraph((sx, sy) => {
    const segPath = (fn, x0, x1) => { const pts = []; for (let i = 0; i <= 100; i++) { const x = x0 + (x1 - x0) * (i / 100); const y = fn(x); if (y >= -1 && y <= 4) pts.push(`${pts.length === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } return pts.join(""); };
    return (<>
      <path d={segPath(f, -0.5, 1)} fill="none" stroke={c1} strokeWidth={2} />
      <path d={segPath(f, 1, 3)} fill="none" stroke={c2} strokeWidth={2} />
      <path d={segPath(f, 3, 5)} fill="none" stroke={c3} strokeWidth={2} />
      <circle cx={sx(0)} cy={sy(f(0))} r={3.5} fill={C.ok} stroke={C.white} strokeWidth={0.8} />
      <circle cx={sx(2)} cy={sy(f(2))} r={3.5} fill={C.ok} stroke={C.white} strokeWidth={0.8} />
      <circle cx={sx(4)} cy={sy(f(4))} r={3.5} fill={C.ok} stroke={C.white} strokeWidth={0.8} />
      <foreignObject x={sx(2) - 32} y={sy(f(2)) - 8 - 13} width={64} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>(2, 3)</div></foreignObject>
      <foreignObject x={sx(0) + 8} y={sy(0) + 14 - 13} width={64} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "left", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>(0, 0)</div></foreignObject>
      <foreignObject x={sx(4) - 4 - 64} y={sy(0) + 14 - 13} width={64} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "right", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", marginLeft: "auto" }}>(4, 0)</div></foreignObject>
    </>);
  }, { xMin: -0.5, xMax: 5, yMin: -1, yMax: 4 });

  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Remove the absolute values region by region, integrate each piece, then join them using continuity.</span>,
      math: (<div><Tex>{"\\text{Breakpoints at } x = 1 \\text{ and } x = 3"}</Tex></div>), },
    { label: "SIMPLIFY dy/dx IN EACH REGION", color: C.calc,
      text: <span>Determine the sign of each expression inside the absolute values.</span>,
      math: (<><div><Tex>{"x < 1: \\quad |3-x| = 3-x, \\quad |x-1| = 1-x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{dy}{dx} = (3-x) - (1-x) = 3 - x - 1 + x = 2"}</Tex></div><div style={{ marginTop: 8 }}><Tex>{"1 \\le x < 3: \\quad |3-x| = 3-x, \\quad |x-1| = x-1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{dy}{dx} = (3-x) - (x-1) = 3 - x - x + 1 = 4 - 2x"}</Tex></div><div style={{ marginTop: 8 }}><Tex>{"x \\ge 3: \\quad |3-x| = x-3, \\quad |x-1| = x-1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\frac{dy}{dx} = (x-3) - (x-1) = x - 3 - x + 1 = -2"}</Tex></div></>),
      diagram: derivGraph, },
    { label: "INTEGRATE EACH REGION", color: C.calc,
      text: <span>Choose <Tex>{"f(x) = \\int_0^x g(t)\\,dt"}</Tex> so that <Tex>{"f(0) = 0"}</Tex>.</span>,
      math: (<><div><Tex>{"x < 1: \\quad f(x) = \\int_0^x 2\\,dt = 2x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{So } f(1) = 2(1) = 2"}</Tex></div><div style={{ marginTop: 8 }}><Tex>{"1 \\le x < 3: \\quad f(x) = f(1) + \\int_1^x (4-2t)\\,dt = 2 + \\bigl[4t - t^2\\bigr]_1^x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 2 + (4x - x^2) - (4 - 1) = 2 + 4x - x^2 - 3 = 4x - x^2 - 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{So } f(3) = 12 - 9 - 1 = 2"}</Tex></div><div style={{ marginTop: 8 }}><Tex>{"x \\ge 3: \\quad f(x) = f(3) + \\int_3^x (-2)\\,dt = 2 + [-2t]_3^x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 2 + (-2x) - (-6) = 2 - 2x + 6 = 8 - 2x"}</Tex></div></>),
      diagram: antiderivGraph, },
    { label: "EVALUATE f(0) + f(2) + f(4)", color: C.calc,
      text: <span>Substitute into the appropriate piece for each point.</span>,
      math: (<><div><Tex>{"f(0) = 2(0) = 0 \\quad (\\text{region } x < 1)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"f(2) = 4(2) - (2)^2 - 1 = 8 - 4 - 1 = 3 \\quad (\\text{region } 1 \\le x < 3)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"f(4) = 8 - 2(4) = 8 - 8 = 0 \\quad (\\text{region } x \\ge 3)"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"f(0) + f(2) + f(4) = 0 + 3 + 0 = 3"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span><Tex>{"f(0) + f(2) + f(4) = 3"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{f(0) + f(2) + f(4) = 0 + 3 + 0 = 3}"}</Tex></div>),
      conclusion: <span><Tex>{"f(0) + f(2) + f(4) = 3"}</Tex>. The answer is C.</span>, },
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
  const [xVal, setXVal] = useState(0);
  const snapPoints = [0, 1, 2, 3, 4];
  const snapRadius = 0.12;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const fVal = f(xVal);
  const gVal = g(xVal);
  const f0 = f(0), f2 = f(2), f4 = f(4);
  const sum = f0 + f2 + f4;
  const atKey = Math.abs(xVal - 0) < 0.01 || Math.abs(xVal - 2) < 0.01 || Math.abs(xVal - 4) < 0.01;
  const isExact = atKey;
  const isNear = false;
  const col = isExact ? C.ok : C.ps;

  const presets = [
    { label: "x0", jsx: <span><Tex>{"x = 0"}</Tex></span>, val: 0 },
    { label: "x1", jsx: <span><Tex>{"x = 1"}</Tex></span>, val: 1 },
    { label: "x2", jsx: <span><Tex>{"x = 2"}</Tex></span>, val: 2 },
    { label: "x4", jsx: <span><Tex>{"x = 4"}</Tex></span>, val: 4 },
  ];

  // Three colours for three regions of f(x)
  const c1 = "#74b9ff", c2 = "#a29bfe", c3 = "#fd79a8";
  const graph = (() => {
    const pW = 500, pH = 300;
    const pad = { l: 40, r: 16, t: 24, b: 28 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = -0.5, xMax = 5, yMin = -2.8, yMax = 3.8;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const segPath = (fn, x0, x1) => { const pts = []; const steps = 150; for (let i = 0; i <= steps; i++) { const x = x0 + (x1 - x0) * (i / steps); const y = fn(x); if (y >= yMin && y <= yMax) pts.push(`${pts.length === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } return pts.join(""); };
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.08" y="-0.2" width="1.16" height="1.45" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[-2, -1, 0, 1, 2, 3].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={y === 0 ? C.muted : C.border} strokeWidth={y === 0 ? 1 : 0.5} />)}
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        {/* Breakpoint lines with labels */}
        <line x1={sx(1)} y1={pad.t} x2={sx(1)} y2={pH - pad.b} stroke={C.text + "44"} strokeWidth={1} strokeDasharray="4,4" />
        <line x1={sx(3)} y1={pad.t} x2={sx(3)} y2={pH - pad.b} stroke={C.text + "44"} strokeWidth={1} strokeDasharray="4,4" />
        <foreignObject x={sx(1) - 28} y={pad.t + 12 - 13} width={56} height={20}><div style={{ fontSize: 11, color: C.text + "88", textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>x = 1</div></foreignObject>
        <foreignObject x={sx(3) - 28} y={pad.t + 12 - 13} width={56} height={20}><div style={{ fontSize: 11, color: C.text + "88", textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>x = 3</div></foreignObject>
        {/* dy/dx - dashed yellow, three segments */}
        <path d={segPath(g, xMin, 1)} fill="none" stroke={C.assum} strokeWidth={1.8} strokeDasharray="5,3" />
        <path d={segPath(g, 1, 3)} fill="none" stroke={C.assum} strokeWidth={1.8} strokeDasharray="5,3" />
        <path d={segPath(g, 3, xMax)} fill="none" stroke={C.assum} strokeWidth={1.8} strokeDasharray="5,3" />
        {/* f(x) - three colour-coded solid segments */}
        <path d={segPath(f, xMin, 1)} fill="none" stroke={c1} strokeWidth={2.5} />
        <path d={segPath(f, 1, 3)} fill="none" stroke={c2} strokeWidth={2.5} />
        <path d={segPath(f, 3, xMax)} fill="none" stroke={c3} strokeWidth={2.5} />
        {/* Region formula labels - positioned in middle of each segment, below curve */}
        <foreignObject x={sx(0.5) - 32} y={sy(1) + 2 - 13} width={64} height={20}><div style={{ fontSize: 11, color: c1, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>f = 2x</div></foreignObject>
        <foreignObject x={sx(2) - 64} y={sy(2) - 13} width={128} height={20}><div style={{ fontSize: 11, color: c2, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>f = 4x{"\u2212"}x{"\u00B2"}{"\u2212"}1</div></foreignObject>
        <foreignObject x={sx(3.5) - 44} y={sy(1) + 2 - 13} width={88} height={20}><div style={{ fontSize: 11, color: c3, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>f = 8{"\u2212"}2x</div></foreignObject>
        {/* Green evaluation dots */}
        {[0, 2, 4].map(x => <circle key={x} cx={sx(x)} cy={sy(f(x))} r={5} fill={C.ok} stroke={C.white} strokeWidth={1.5} />)}
        {/* Evaluation labels - offset to sides to avoid formula labels */}
        <foreignObject x={sx(0) - 4 - 80} y={sy(f(0)) - 10 - 13} width={80} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "right", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", marginLeft: "auto" }}>f(0) = 0</div></foreignObject>
        <foreignObject x={sx(2) - 40} y={sy(f(2)) - 10 - 13} width={80} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>f(2) = 3</div></foreignObject>
        <foreignObject x={sx(4) + 4} y={sy(f(4)) - 10 - 13} width={80} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "left", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>f(4) = 0</div></foreignObject>
        {/* Moving dot on f(x) */}
        <circle cx={sx(xVal)} cy={sy(fVal)} r={6} fill={col} stroke={C.white} strokeWidth={1.5} />
        <foreignObject x={sx(xVal) - 40} y={sy(fVal) - 14 - 13} width={80} height={20}><div style={{ fontSize: 11, color: C.white, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>({fmt(xVal)}, {fmt(fVal)})</div></foreignObject>
        {/* Moving dot on dy/dx */}
        <circle cx={sx(xVal)} cy={sy(gVal)} r={4} fill={C.assum} stroke={C.white} strokeWidth={1} />
        {/* dy/dx label */}
        <foreignObject x={pW - pad.r - 4 - 56} y={sy(-2) + 14 - 13} width={56} height={20}><div style={{ fontSize: 11, color: C.assum, textAlign: "right", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", marginLeft: "auto" }}>dy/dx</div></foreignObject>
        {/* Axis labels */}
        {[0, 1, 2, 3, 4].map(x => <foreignObject key={x} x={sx(x) - 16} y={pH - pad.b + 14 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>{x}</div></foreignObject>)}
        {[-2, -1, 1, 2, 3].map(y => <foreignObject key={y} x={pad.l - 8 - 32} y={sy(y) + 4 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1, fontWeight: 400, fontStyle: "normal", marginLeft: "auto" }}>{y}</div></foreignObject>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. The dashed yellow line shows <Tex>{"\\tfrac{dy}{dx} = |3-x| - |x-1|"}</Tex> (piecewise linear)</p>
        <p style={{ margin: "0 0 4px" }}>2. The solid blue curve shows <Tex>{"f(x)"}</Tex>, its antiderivative with <Tex>{"f(0) = 0"}</Tex></p>
        <p style={{ margin: 0 }}>3. The green dots mark <Tex>{"f(0), f(2), f(4)"}</Tex> whose values sum to <Tex>{"3"}</Tex></p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{fmt(xVal)}</span>
        </div>
        <input type="range" min={-0.5} max={5} step={0.01} value={xVal} onChange={e => setXVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(xVal - pr.val) < 0.02; return (<button key={pr.label} onClick={() => setXVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active && isExact ? C.ok : active ? C.ps : C.border}`, background: active && isExact ? C.ok + "15" : active ? C.ps + "15" : C.card, color: active ? (isExact ? C.ok : C.ps) : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}><Tex>{"f(0)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>{f0}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}><Tex>{"f(2)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>{f2}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}><Tex>{"f(4)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>{f4}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}66`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Sum</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>{sum}</div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}><Tex>{"f(0) = 0"}</Tex>, <Tex>{"f(2) = 3"}</Tex>, <Tex>{"f(4) = 0"}</Tex>. Sum <Tex>{"= 0 + 3 + 0 = 3"}</Tex>. The answer is C.</span>
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
