"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 10, paper: "Paper 1", year: "2026 Mock", topicTag: "Translations / Completing the Square" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "\\text{none}", text: "none", ok: false, expl: "Both I and II are valid translations of y = x\u00B2. Statement I gives (x\u22122)\u00B2 + 2 (translated right 2, up 2) and II gives (x+3)\u00B2 (translated left 3)." },
  { letter: "B", tex: "\\text{I only}", text: "I only", ok: false, expl: "Statement I is correct, but II is also a translation: x\u00B2 + 6x + 9 = (x+3)\u00B2, which is y = x\u00B2 shifted left by 3." },
  { letter: "C", tex: "\\text{II only}", text: "II only", ok: false, expl: "Statement II is correct, but I is also a translation: x\u00B2 \u2212 4x + 6 = (x\u22122)\u00B2 + 2, which is y = x\u00B2 shifted right 2 and up 2." },
  { letter: "D", tex: "\\text{III only}", text: "III only", ok: false, expl: "Statement III has leading coefficient 4, not 1. Since translations don\u2019t change the shape of a curve, the x\u00B2 coefficient must stay 1. So III is not a translation of y = x\u00B2." },
  { letter: "E", tex: "\\text{I and II only}", text: "I and II only", ok: true, expl: "I = (x\u22122)\u00B2 + 2 and II = (x+3)\u00B2 are both translations of y = x\u00B2. III = (2x\u22121)\u00B2 has leading coefficient 4, so it\u2019s a stretch, not a translation." },
  { letter: "F", tex: "\\text{I and III only}", text: "I and III only", ok: false, expl: "Statement I is a valid translation, but III is not. The coefficient of x\u00B2 in III is 4, meaning the parabola is narrower \u2014 that\u2019s a vertical stretch, not a translation." },
  { letter: "G", tex: "\\text{II and III only}", text: "II and III only", ok: false, expl: "Statement II is a valid translation, but III is not. 4x\u00B2 \u2212 4x + 1 = (2x\u22121)\u00B2 has leading coefficient 4 \u2014 the parabola has been stretched, not translated." },
  { letter: "H", tex: "\\text{I, II and III}", text: "I, II and III", ok: false, expl: "Statements I and II are translations, but III is not. Translations preserve the leading coefficient (must remain 1), and III has coefficient 4." },
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
        A sequence of translations is applied to the graph of <Tex>{"y = x^2"}</Tex>. Which of the following graphs could be the result of this sequence of translations?
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4 }}>
        {[["I","x^2 - 4x + 6"],["II","x^2 + 6x + 9"],["III","4x^2 - 4x + 1"]].map(([n,eq], i) => (
          <div key={n} style={{ display: "flex", gap: 4, marginBottom: i < 2 ? 2 : 0 }}>
            <span style={{ fontWeight: 700, color: C.white, minWidth: 24 }}>{n}</span>
            <span style={{ color: C.text, fontSize: 13 }}><Tex>{`y = ${eq}`}</Tex></span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 6 }}>
        {[["A","\\text{none}"],["B","\\text{I only}"],["C","\\text{II only}"],["D","\\text{III only}"],["E","\\text{I and II only}"],["F","\\text{I and III only}"],["G","\\text{II and III only}"],["H","\\text{I, II and III}"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}>{o.text}</p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 10</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>A sequence of translations is applied to the graph of <Tex>{"y = x^2"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Which of the following graphs could be the result of this sequence of translations?</p>
        <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 10 }}>
          <div style={{ fontSize: 14, color: C.text, lineHeight: 1.9 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 2 }}>
              <span style={{ fontWeight: 700, color: C.muted, minWidth: 28 }}>I</span>
              <span><Tex>{"y = x^2 - 4x + 6"}</Tex></span>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 2 }}>
              <span style={{ fontWeight: 700, color: C.muted, minWidth: 28 }}>II</span>
              <span><Tex>{"y = x^2 + 6x + 9"}</Tex></span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ fontWeight: 700, color: C.muted, minWidth: 28 }}>III</span>
              <span><Tex>{"y = 4x^2 - 4x + 1"}</Tex></span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span>{o.text}</div>))}
      </div>
    </div>
  );
}

function SetupStep() {
  return (
    <div>
      <QuestionSummary />
      <InfoBox type="strategy">
        <p style={{ margin: 0 }}>Complete the square for each equation. A translation of <Tex>{"y = x^2"}</Tex> must have the form <Tex>{"y = (x - h)^2 + k"}</Tex>. The key test: the coefficient of <Tex>{"x^2"}</Tex> must be <Tex>{"1"}</Tex>, since translations don't change the shape of the curve.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Translating <Tex>{"y = x^2"}</Tex> by <Tex>{"(h, k)"}</Tex> gives <Tex>{"y = (x - h)^2 + k = x^2 - 2hx + h^2 + k"}</Tex>.</p>
        <p style={{ margin: 0 }}>This means: leading coefficient stays <Tex>{"1"}</Tex>, the <Tex>{"x"}</Tex> coefficient is <Tex>{"-2h"}</Tex>, and the constant is <Tex>{"h^2 + k"}</Tex>. Any quadratic with leading coefficient <Tex>{"\\neq 1"}</Tex> involves a stretch, not just a translation.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Complete the square for each of I, II, and III. Check whether each can be written as <Tex>{"(x - h)^2 + k"}</Tex> for some constants <Tex>{"h"}</Tex> and <Tex>{"k"}</Tex>.</span>,
      math: (<div><Tex>{"\\text{Translation of } y = x^2 \\;\\Longleftrightarrow\\; y = (x-h)^2 + k"}</Tex></div>), },
    { label: "CHECK STATEMENT I", color: C.calc,
      text: <span>Complete the square for <Tex>{"x^2 - 4x + 6"}</Tex>. Half the coefficient of <Tex>{"x"}</Tex> is <Tex>{"-2"}</Tex>, so <Tex>{"(-2)^2 = 4"}</Tex>.</span>,
      math: (<><div><Tex>{"x^2 - 4x + 6 = (x^2 - 4x + 4) + 6 - 4 = (x - 2)^2 + 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Leading coefficient} = 1 \\;\\checkmark, \\quad h = 2,\\; k = 2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#55efc4}{\\checkmark \\text{ This is } y = x^2 \\text{ translated right } 2 \\text{, up } 2}"}</Tex></div></>), },
    { label: "CHECK STATEMENT II", color: C.calc,
      text: <span>Complete the square for <Tex>{"x^2 + 6x + 9"}</Tex>. Half the coefficient of <Tex>{"x"}</Tex> is <Tex>{"3"}</Tex>, so <Tex>{"3^2 = 9"}</Tex>. That already matches.</span>,
      math: (<><div><Tex>{"x^2 + 6x + 9 = (x + 3)^2 + 0 = (x - (-3))^2 + 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Leading coefficient} = 1 \\;\\checkmark, \\quad h = -3,\\; k = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#55efc4}{\\checkmark \\text{ This is } y = x^2 \\text{ translated left } 3}"}</Tex></div></>), },
    { label: "CHECK STATEMENT III", color: C.calc,
      text: <span>The coefficient of <Tex>{"x^2"}</Tex> in <Tex>{"4x^2 - 4x + 1"}</Tex> is <Tex>{"4"}</Tex>, not <Tex>{"1"}</Tex>. We can still factorise to confirm.</span>,
      math: (<><div><Tex>{"4x^2 - 4x + 1 = (2x)^2 - 2(2x)(1) + 1^2 = (2x - 1)^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Leading coefficient} = 4 \\neq 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#ff7675}{\\times \\text{ This is a vertical stretch (by factor 4), not a translation}}"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>Statements I and II are translations of <Tex>{"y = x^2"}</Tex>. Statement III is not (it has a different leading coefficient).</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\text{I and II only} \\implies \\text{Answer: E}}"}</Tex></div>),
      conclusion: <span>I and II are translations. III is a stretch. The answer is E.</span>, },
  ];
  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><MathBox>{s.math}</MathBox>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [checked, setChecked] = useState({ I: false, II: false, III: false });
  const stmts = [
    { id: "I", eq: "x^2 - 4x + 6", completed: "(x-2)^2 + 2", vertex: [2, 2], isTranslation: true, reason: "Leading coefficient is 1. Vertex at (2, 2)." },
    { id: "II", eq: "x^2 + 6x + 9", completed: "(x+3)^2", vertex: [-3, 0], isTranslation: true, reason: "Leading coefficient is 1. Vertex at (\u22123, 0)." },
    { id: "III", eq: "4x^2 - 4x + 1", completed: "(2x-1)^2", vertex: [0.5, 0], isTranslation: false, reason: "Leading coefficient is 4 \u2260 1. This is a stretch, not a translation." },
  ];
  const allChecked = checked.I && checked.II && checked.III;
  const graph = (() => {
    const pW = 500, pH = 260;
    const pad = { l: 40, r: 16, t: 24, b: 28 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = -5, xMax = 5, yMin = -1, yMax = 12;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const curvePath = (fn) => { const segs = []; let current = []; for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); const y = fn(x); if (y >= yMin && y <= yMax) { current.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } else { if (current.length > 1) segs.push("M" + current.join("L")); current = []; } } if (current.length > 1) segs.push("M" + current.join("L")); return segs.join(""); };
    const base = (x) => x * x;
    const f1 = (x) => x * x - 4 * x + 6;
    const f2 = (x) => x * x + 6 * x + 9;
    const f3 = (x) => 4 * x * x - 4 * x + 1;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[0, 4, 8].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        <path d={curvePath(base)} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5,4" />
        <foreignObject x={sx(2)} y={sy(base(2)) - 8 - 13} width={72} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "left", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>y = x{"\u00B2"}</div></foreignObject>
        {checked.I && <>
          <path d={curvePath(f1)} fill="none" stroke={C.ok} strokeWidth={2.5} />
          <circle cx={sx(2)} cy={sy(2)} r={4} fill={C.ok} stroke={C.white} strokeWidth={1} />
          <foreignObject x={sx(2) + 8} y={sy(2) + 4 - 13} width={64} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "left", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>(2, 2)</div></foreignObject>
          <foreignObject x={sx(3.8) - 30} y={sy(f1(3.8)) - 8 - 13} width={30} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "right", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", marginLeft: "auto" }}>I</div></foreignObject>
        </>}
        {checked.II && <>
          <path d={curvePath(f2)} fill="none" stroke={C.ps} strokeWidth={2.5} />
          <circle cx={sx(-3)} cy={sy(0)} r={4} fill={C.ps} stroke={C.white} strokeWidth={1} />
          <foreignObject x={sx(-3) - 40} y={sy(0) - 10 - 13} width={80} height={20}><div style={{ fontSize: 11, color: C.ps, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>({"\u2212"}3, 0)</div></foreignObject>
          <foreignObject x={sx(-4.5)} y={sy(f2(-4.5)) - 8 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.ps, textAlign: "left", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>II</div></foreignObject>
        </>}
        {checked.III && <>
          <path d={curvePath(f3)} fill="none" stroke={C.fail} strokeWidth={2.5} />
          <circle cx={sx(0.5)} cy={sy(0)} r={4} fill={C.fail} stroke={C.white} strokeWidth={1} />
          <foreignObject x={sx(0.5) + 8} y={sy(0) + 4 - 13} width={80} height={20}><div style={{ fontSize: 11, color: C.fail, textAlign: "left", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>(0.5, 0)</div></foreignObject>
          <foreignObject x={sx(1.3)} y={sy(f3(1.3)) - 8 - 13} width={40} height={20}><div style={{ fontSize: 11, color: C.fail, textAlign: "left", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>III</div></foreignObject>
        </>}
        {[-4,-3,-2,-1,1,2,3,4].map(x => <foreignObject key={x} x={sx(x) - 16} y={pH - pad.b + 14 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>{x}</div></foreignObject>)}
        {[4, 8].map(y => <foreignObject key={y} x={pad.l - 8 - 32} y={sy(y) + 4 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1, fontWeight: 400, fontStyle: "normal", marginLeft: "auto" }}>{y}</div></foreignObject>)}
      </svg>
    );
  })();
  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Tap each statement card to check whether it is a translation of <Tex>{"y = x^2"}</Tex></p>
        <p style={{ margin: "0 0 4px" }}>2. The graph shows <Tex>{"y = x^2"}</Tex> (dashed) and each checked curve</p>
        <p style={{ margin: 0 }}>3. A valid translation has the same shape (leading coefficient <Tex>{"1"}</Tex>)</p>
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
        {stmts.map(s => {
          const tested = checked[s.id];
          const fails = tested && !s.isTranslation;
          const passes = tested && s.isTranslation;
          const col = tested ? (passes ? C.ok : C.fail) : C.muted;
          return (
            <div key={s.id} onClick={() => setChecked(p => ({ ...p, [s.id]: true }))} style={{ background: tested ? (fails ? C.failBg : C.conclBg) : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10, cursor: tested ? "default" : "pointer", transition: "all 0.3s" }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: col, minWidth: 24, textAlign: "center" }}>{tested ? (passes ? "\u2713" : "\u2717") : "\u2013"}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{s.id}: <Tex>{`y = ${s.eq}`}</Tex></div>
                {tested && <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}><Tex>{s.completed}</Tex> {"\u2014"} {s.reason}</div>}
                {!tested && <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Tap to check</div>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {allChecked ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>I {"\u2713"} and II {"\u2713"} are translations. III {"\u2717"} has leading coefficient <Tex>{"4"}</Tex> (a stretch). The answer is E.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Tap each statement above to test whether it is a translation of <Tex>{"y = x^2"}</Tex>.</span>
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
