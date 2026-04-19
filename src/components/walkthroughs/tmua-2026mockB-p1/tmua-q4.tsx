"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 4, paper: "Set B Paper 1", year: "2026 Mock", topicTag: "Series / Trig + Geometric Sum" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "0", text: "0", ok: false, expl: "You might get 0 by incorrectly assuming the cosine terms cancel in pairs, but the (1/3)\u207F factor breaks the symmetry." },
  { letter: "B", tex: "\\tfrac{1}{4}", text: "1/4", ok: false, expl: "You might get 1/4 by using cos(\u03C0/3) = 1/2 and the geometric sum 1/(1+1/3) = 3/4, but then forgetting to multiply: (1/2)(3/4) = 3/8, not 1/4." },
  { letter: "C", ok: true, tex: "\\tfrac{3}{8}", text: "3/8", expl: "Obtained by writing cos(n\u03C0 + \u03C0/3) = cos(\u03C0/3)\u00B7cos(n\u03C0) = (1/2)(\u22121)\u207F. The sum becomes (1/2)\u2211(\u22121/3)\u207F = (1/2)\u00B7(3/4) = 3/8." },
  { letter: "D", tex: "\\tfrac{1}{2}", text: "1/2", ok: false, expl: "You might get 1/2 by computing the geometric sum as 1/(1\u22121/3) = 3/2 instead of 1/(1+1/3) = 3/4, missing that the common ratio is \u22121/3." },
  { letter: "E", tex: "\\tfrac{3}{4}", text: "3/4", ok: false, expl: "You might get 3/4 by correctly computing the geometric sum 3/4 but forgetting to multiply by cos(\u03C0/3) = 1/2." },
  { letter: "F", tex: "1", text: "1", ok: false, expl: "You might get 1 by treating cos(n\u03C0 + \u03C0/3) as always equal to 1/2, ignoring the alternating sign from cos(n\u03C0), giving (1/2)\u00B7(3/2) = 3/4, then a further error." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q4</span>
        Evaluate <Tex>{"\\displaystyle\\sum_{n=0}^{\\infty} \\cos\\!\\left(n\\pi + \\tfrac{\\pi}{3}\\right) \\cdot \\left(\\tfrac{1}{3}\\right)^{\\!n}"}</Tex>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","0"],["B","\\tfrac{1}{4}"],["C","\\tfrac{3}{8}"],["D","\\tfrac{1}{2}"],["E","\\tfrac{3}{4}"],["F","1"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 4</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Evaluate</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"\\sum_{n=0}^{\\infty} \\cos\\!\\left(n\\pi + \\frac{\\pi}{3}\\right) \\cdot \\left(\\frac{1}{3}\\right)^{\\!n}"}</Tex></MathBox>
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
        <p style={{ margin: 0 }}>Use the addition formula <Tex>{"\\cos(n\\pi + \\pi/3) = \\cos(\\pi/3)\\cos(n\\pi) - \\sin(\\pi/3)\\sin(n\\pi)"}</Tex>. Since <Tex>{"\\sin(n\\pi) = 0"}</Tex> for all integers <Tex>{"n"}</Tex>, this simplifies to <Tex>{"\\cos(\\pi/3) \\cdot (-1)^n"}</Tex>. Then sum the resulting geometric series.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The key simplification: <Tex>{"\\cos(n\\pi) = (-1)^n"}</Tex>, so each term becomes <Tex>{"\\tfrac{1}{2} \\cdot (-1)^n \\cdot (\\tfrac{1}{3})^n = \\tfrac{1}{2} \\cdot (-\\tfrac{1}{3})^n"}</Tex>.</p>
        <p style={{ margin: 0 }}>This is a geometric series with first term <Tex>{"\\tfrac{1}{2}"}</Tex> and common ratio <Tex>{"r = -\\tfrac{1}{3}"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Simplify the cosine using the angle addition formula, then recognise a geometric series.</span>,
      math: (<div><Tex>{"\\sum_{n=0}^{\\infty} \\cos\\!\\left(n\\pi + \\tfrac{\\pi}{3}\\right) \\cdot \\left(\\tfrac{1}{3}\\right)^n"}</Tex></div>), },
    { label: "SIMPLIFY THE COSINE", color: C.calc,
      text: <span>Apply <Tex>{"\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B"}</Tex> with <Tex>{"A = n\\pi"}</Tex>, <Tex>{"B = \\pi/3"}</Tex>.</span>,
      math: (<><div><Tex>{"\\cos(n\\pi + \\tfrac{\\pi}{3}) = \\cos(n\\pi)\\cos(\\tfrac{\\pi}{3}) - \\sin(n\\pi)\\sin(\\tfrac{\\pi}{3})"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\sin(n\\pi) = 0 \\text{ for all integer } n"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\cos(n\\pi) \\cdot \\tfrac{1}{2} = \\tfrac{1}{2} \\cdot (-1)^n"}</Tex></div></>), },
    { label: "REWRITE AS GEOMETRIC SERIES", color: C.calc,
      text: <span>Substitute back and combine the powers.</span>,
      math: (<><div><Tex>{"\\sum_{n=0}^{\\infty} \\tfrac{1}{2} \\cdot (-1)^n \\cdot \\left(\\tfrac{1}{3}\\right)^n"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\frac{1}{2} \\sum_{n=0}^{\\infty} \\left(-\\frac{1}{3}\\right)^n"}</Tex></div></>), },
    { label: "EVALUATE THE GEOMETRIC SUM", color: C.calc,
      text: <span>Apply <Tex>{"\\sum_{n=0}^{\\infty} r^n = \\frac{1}{1-r}"}</Tex> with <Tex>{"r = -1/3"}</Tex> (valid since <Tex>{"|r| < 1"}</Tex>).</span>,
      math: (<><div><Tex>{"\\sum_{n=0}^{\\infty} \\left(-\\frac{1}{3}\\right)^n = \\frac{1}{1 - (-\\frac{1}{3})} = \\frac{1}{1 + \\frac{1}{3}} = \\frac{1}{\\frac{4}{3}} = \\frac{3}{4}"}</Tex></div></>), },
    { label: "MULTIPLY", color: C.calc,
      text: <span>Multiply by the factor of <Tex>{"1/2"}</Tex>.</span>,
      math: (<><div><Tex>{"\\frac{1}{2} \\times \\frac{3}{4} = \\frac{3}{8}"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The infinite sum evaluates to <Tex>{"3/8"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\sum_{n=0}^{\\infty} \\cos\\!\\left(n\\pi + \\tfrac{\\pi}{3}\\right) \\cdot \\left(\\tfrac{1}{3}\\right)^{\\!n} = \\frac{3}{8}}"}</Tex></div>),
      conclusion: <span>The answer is C: <Tex>{"3/8"}</Tex>.</span>, },
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
  const [N, setN] = useState(3);

  const term = (n) => Math.cos(n * Math.PI + Math.PI / 3) * Math.pow(1 / 3, n);
  const partialSum = (k) => { let s = 0; for (let i = 0; i <= k; i++) s += term(i); return s; };
  const target = 3 / 8;
  const currentSum = partialSum(N);
  const isExact = Math.abs(currentSum - target) < 0.01;
  const isNear = !isExact && Math.abs(currentSum - target) < 0.02;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const terms = [];
  for (let i = 0; i <= Math.min(N, 12); i++) {
    terms.push({ n: i, val: term(i), cumSum: partialSum(i) });
  }

  const FO = ({ x, y, w, h, color, align, bg, children }) => (
    <foreignObject x={x} y={y} width={w || 30} height={h || 18}>
      <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
    </foreignObject>
  );

  const graph = (() => {
    const pW = 500, pH = 200;
    const pad = { l: 44, r: 20, t: 20, b: 32 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const maxN = Math.max(N + 1, 6);
    const yMin = -0.1, yMax = 0.6;
    const sx = (n) => pad.l + (n / maxN) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        {/* Target line */}
        <line x1={pad.l} y1={sy(target)} x2={pW - pad.r} y2={sy(target)} stroke={C.ok} strokeWidth={1} strokeDasharray="6,3" />
        {/* Fraction label via foreignObject + KaTeX */}
        <foreignObject x={pW - pad.r - 40} y={sy(target) - 22} width={44} height={30}>
          <div style={{ fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "right" }}><span style={{ background: "rgba(15,17,23,0.85)", borderRadius: 3, padding: "1px 3px" }}><Tex>{"\\tfrac{3}{8}"}</Tex></span></div>
        </foreignObject>
        {/* Sum line and points */}
        {terms.length > 1 && <path d={"M" + terms.map(t => `${sx(t.n).toFixed(1)},${sy(t.cumSum).toFixed(1)}`).join("L")} fill="none" stroke={col} strokeWidth={1.5} />}
        {terms.map(t => (<circle key={t.n} cx={sx(t.n)} cy={sy(t.cumSum)} r={4} fill={t.n === N ? col : C.ps} stroke={C.white} strokeWidth={1} />))}
        {/* Individual term bars */}
        {terms.map(t => (<rect key={"b" + t.n} x={sx(t.n) - 6} y={t.val >= 0 ? sy(t.val) : sy(0)} width={12} height={Math.abs(sy(0) - sy(t.val))} rx={2} fill={t.val >= 0 ? C.ps + "44" : C.assum + "44"} />))}
        {/* x-axis labels via foreignObject */}
        {terms.map(t => <FO key={t.n} x={sx(t.n) - 10} y={pH - pad.b + 2} w={20} h={18}><Tex>{String(t.n)}</Tex></FO>)}
        {/* y-axis labels via foreignObject */}
        {[0, 0.25, 0.5].map(y => <FO key={y} x={0} y={sy(y) - 9} w={pad.l - 6} h={18} align="right"><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>The terms alternate in sign and shrink by a factor of <Tex>{"\\tfrac{1}{3}"}</Tex> each time. Watch the sum converge to <Tex>{"\\tfrac{3}{8}"}</Tex> as you add more terms.</p>
        <p style={{ margin: 0 }}>Bars show individual terms; the connected line shows the running total.</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"n"}</Tex> (up to)</span>
          <span style={{ fontSize: 16, color: C.calc, fontFamily: mathFont, fontWeight: 700 }}>{N}</span>
        </div>
        <input type="range" min={0} max={12} step={1} value={N} onChange={e => setN(+e.target.value)} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 2 }}>TERMS</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc, fontFamily: mathFont }}><Tex>{String(N + 1)}</Tex></div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}>SUM</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col, fontFamily: mathFont }}><Tex>{fmt(currentSum)}</Tex></div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}>TARGET</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}><Tex>{"\\tfrac{3}{8}"}</Tex></div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {/* Term table */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8, maxHeight: 180, overflowY: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 1fr 1fr", gap: 4, fontSize: 12, fontFamily: mathFont }}>
          <div style={{ color: C.muted, fontWeight: 700 }}><Tex>{"n"}</Tex></div>
          <div style={{ color: C.muted, fontWeight: 700, textAlign: "right" }}>cos</div>
          <div style={{ color: C.muted, fontWeight: 700, textAlign: "right" }}><Tex>{"a_n"}</Tex></div>
          <div style={{ color: C.muted, fontWeight: 700, textAlign: "right" }}><Tex>{"S_n"}</Tex></div>
          {terms.map(t => (<React.Fragment key={t.n}>
            <div style={{ color: C.text }}><Tex>{String(t.n)}</Tex></div>
            <div style={{ color: t.val >= 0 ? C.ps : C.assum, textAlign: "right" }}><Tex>{fmt(Math.cos(t.n * Math.PI + Math.PI / 3))}</Tex></div>
            <div style={{ color: t.val >= 0 ? C.ps : C.assum, textAlign: "right" }}><Tex>{fmt(t.val)}</Tex></div>
            <div style={{ color: col, textAlign: "right", fontWeight: t.n === N ? 700 : 400 }}><Tex>{fmt(t.cumSum)}</Tex></div>
          </React.Fragment>))}
        </div>
      </div>
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>The sum has converged to <Tex>{"\\tfrac{3}{8}"}</Tex>. The answer is C.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Sum = <Tex>{fmt(currentSum)}</Tex>, approaching the dashed line at <Tex>{"\\tfrac{3}{8}"}</Tex>. Add more terms to converge.</span>
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
