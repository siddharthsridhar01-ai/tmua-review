"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 1, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Integration / Simultaneous Equations" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "2", text: "2", ok: false, expl: "You might get 2 if you only solve for q = 2 and forget to add p. The question asks for p + q, not just q." },
  { letter: "B", tex: "4", text: "4", ok: false, expl: "You might get 4 by a sign error when eliminating variables, e.g. subtracting the equations the wrong way round and getting p = 2, q = 2." },
  { letter: "C", tex: "6", text: "6", ok: false, expl: "You might get 6 if you confuse p + q with p alone. The value of p is 6, but the question asks for p + q = 6 + 2 = 8." },
  { letter: "D", tex: "8", text: "8", ok: true, expl: "Obtained by integrating to get p/2 + q = 5 and p/3 + q/2 = 3, then solving simultaneously: p = 6, q = 2, so p + q = 8." },
  { letter: "E", tex: "10", text: "10", ok: false, expl: "You might get 10 from p + 2q = 10 (the first equation rearranged) but this equals p + 2q, not p + q." },
  { letter: "F", tex: "12", text: "12", ok: false, expl: "You might get 12 by doubling the first integral result, or from 2p + 3q = 18 and misreading it as p + q = 12 by ignoring the coefficients." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q1</span>
        Given that <Tex>{"\\displaystyle\\int_0^1 (px + q)\\,dx = 5"}</Tex> and <Tex>{"\\displaystyle\\int_0^1 x(px + q)\\,dx = 3"}</Tex>, find the value of <Tex>{"p + q"}</Tex>.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","2"],["B","4"],["C","6"],["D","8"],["E","10"],["F","12"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 1</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Given that</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"\\int_0^1 (px + q)\\,dx = 5 \\qquad \\text{and} \\qquad \\int_0^1 x(px + q)\\,dx = 3"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 10px" }}>find the value of <Tex>{"p + q"}</Tex>.</p>
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
        <p style={{ margin: 0 }}>Evaluate each definite integral to obtain two simultaneous equations in <Tex>{"p"}</Tex> and <Tex>{"q"}</Tex>. Then solve for <Tex>{"p"}</Tex> and <Tex>{"q"}</Tex> and compute <Tex>{"p + q"}</Tex>.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The first integral gives <Tex>{"\\tfrac{p}{2} + q = 5"}</Tex>. The second integral (expand <Tex>{"x(px+q) = px^2 + qx"}</Tex>) gives <Tex>{"\\tfrac{p}{3} + \\tfrac{q}{2} = 3"}</Tex>.</p>
        <p style={{ margin: 0 }}>These are linear in <Tex>{"p"}</Tex> and <Tex>{"q"}</Tex>, so standard elimination or substitution will work.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Integrate each expression, apply the limits, and form two simultaneous equations in <Tex>{"p"}</Tex> and <Tex>{"q"}</Tex>.</span>,
      math: (<div><Tex>{"\\text{Equation 1: } \\int_0^1 (px+q)\\,dx = 5 \\qquad \\text{Equation 2: } \\int_0^1 x(px+q)\\,dx = 3"}</Tex></div>), },
    { label: "EVALUATE THE FIRST INTEGRAL", color: C.calc,
      text: <span>Integrate <Tex>{"px + q"}</Tex> with respect to <Tex>{"x"}</Tex> from 0 to 1.</span>,
      math: (<><div><Tex>{"\\int_0^1 (px + q)\\,dx = \\left[\\frac{px^2}{2} + qx\\right]_0^1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\frac{p(1)^2}{2} + q(1) - 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\frac{p}{2} + q = 5"}</Tex></div></>), },
    { label: "EVALUATE THE SECOND INTEGRAL", color: C.calc,
      text: <span>Expand <Tex>{"x(px + q) = px^2 + qx"}</Tex> and integrate from 0 to 1.</span>,
      math: (<><div><Tex>{"\\int_0^1 (px^2 + qx)\\,dx = \\left[\\frac{px^3}{3} + \\frac{qx^2}{2}\\right]_0^1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\frac{p}{3} + \\frac{q}{2} = 3"}</Tex></div></>), },
    { label: "CLEAR FRACTIONS", color: C.calc,
      text: <span>Multiply both equations through to eliminate fractions.</span>,
      math: (<><div><Tex>{"\\text{Eq 1} \\times 2: \\quad p + 2q = 10"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Eq 2} \\times 6: \\quad 2p + 3q = 18"}</Tex></div></>), },
    { label: "SOLVE BY ELIMINATION", color: C.calc,
      text: <span>Multiply the first cleared equation by 2 and subtract.</span>,
      math: (<><div><Tex>{"2 \\times (p + 2q = 10): \\quad 2p + 4q = 20"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(2p + 4q) - (2p + 3q) = 20 - 18"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"q = 2"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Substitute back: } p + 2(2) = 10 \\;\\Rightarrow\\; p = 6"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>We have <Tex>{"p = 6"}</Tex> and <Tex>{"q = 2"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{p + q = 6 + 2 = 8}"}</Tex></div>),
      conclusion: <span>The answer is D: <Tex>{"p + q = 8"}</Tex>.</span>, },
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
  const [pVal, setPVal] = useState(3);
  const snapPoints = [0, 2, 4, 6, 8, 10];
  const snapRadius = 0.4;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const qVal = 5 - pVal / 2;
  const int2 = pVal / 3 + qVal / 2;
  const pPlusQ = pVal + qVal;
  const isExact = Math.abs(pVal - 6) < 0.05;
  const isNear = !isExact && Math.abs(int2 - 3) < 0.25;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "p2", jsx: <span><Tex>{"p = 2"}</Tex></span>, val: 2 },
    { label: "p6", jsx: <span><Tex>{"p = 6"}</Tex></span>, val: 6 },
    { label: "p10", jsx: <span><Tex>{"p = 10"}</Tex></span>, val: 10 },
  ];

  const FO = ({ x, y, w, h, color, align, bg, children }) => (
    <foreignObject x={x} y={y} width={w || 40} height={h || 20}>
      <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
    </foreignObject>
  );

  const graph = (() => {
    const pW = 500, pH = 260;
    const pad = { l: 44, r: 16, t: 20, b: 32 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = 0, xMax = 1.15, yMin = -2, yMax = 14;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const curvePath = (fn, x0, x1) => { const pts = []; for (let i = 0; i <= 200; i++) { const x = x0 + (x1 - x0) * (i / 200); const y = fn(x); if (y >= yMin && y <= yMax) pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } return "M" + pts.join("L"); };
    const fillPath = (fn, x0, x1) => { const pts = [`${sx(x0).toFixed(1)},${sy(0).toFixed(1)}`]; for (let i = 0; i <= 200; i++) { const x = x0 + (x1 - x0) * (i / 200); const y = Math.max(yMin, Math.min(yMax, fn(x))); pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } pts.push(`${sx(x1).toFixed(1)},${sy(0).toFixed(1)}`); return "M" + pts.join("L") + "Z"; };
    const f1 = (x) => pVal * x + qVal;
    const f2 = (x) => x * (pVal * x + qVal);
    const f1Mid = f1(0.5), f2Mid = f2(0.5);
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[0, 4, 8, 12].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(1)} y1={pad.t} x2={sx(1)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.8} strokeDasharray="4,3" />
        <path d={fillPath(f1, 0, 1)} fill={C.ps + "15"} />
        <path d={fillPath(f2, 0, 1)} fill={C.assum + "15"} />
        <path d={curvePath(f1, 0, 1)} fill="none" stroke={C.ps} strokeWidth={2} />
        <path d={curvePath(f2, 0, 1)} fill="none" stroke={C.assum} strokeWidth={2} />
        <circle cx={sx(1)} cy={sy(f1(1))} r={4} fill={C.ps} stroke={C.white} strokeWidth={1} />
        <circle cx={sx(1)} cy={sy(f2(1))} r={4} fill={C.assum} stroke={C.white} strokeWidth={1} />
        {/* Curve labels and area labels via foreignObject */}
        <FO x={sx(0.35) - 40} y={sy(f1(0.35)) - 22} w={80} h={18} color={C.ps} bg><Tex>{"y = px + q"}</Tex></FO>
        <FO x={sx(0.45) - 50} y={sy(f1Mid * 0.65) - 8} w={100} h={18} color={C.ps} bg><Tex>{`\\text{area} = 5\\text{ (always)}`}</Tex></FO>
        <FO x={sx(0.7) - 46} y={sy(f2(0.7)) + 4} w={92} h={18} color={C.assum} bg><Tex>{"y = x(px + q)"}</Tex></FO>
        <FO x={sx(0.55) - 42} y={sy(f2Mid * 0.5) - 8} w={84} h={18} color={C.assum} bg><Tex>{`\\text{area} = ${fmt(int2)}`}</Tex></FO>
        {/* Axis labels */}
        <FO x={sx(1) - 10} y={pH - pad.b + 2} w={20} h={18}><Tex>{"1"}</Tex></FO>
        {[0, 4, 8, 12].map(y => <FO key={y} x={pad.l - 32} y={sy(y) - 8} w={28} h={18} align="right"><Tex>{String(y)}</Tex></FO>)}
        <FO x={pW - pad.r - 14} y={sy(0) - 18} w={16} h={18}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0) + 4} y={pad.t - 4} w={16} h={18}><Tex>{"y"}</Tex></FO>
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>The first integral forces <Tex>{"q = 5 - p/2"}</Tex>, so it equals <Tex>{"5"}</Tex> automatically for any <Tex>{"p"}</Tex>.</p>
        <p style={{ margin: 0 }}>The real question: for which <Tex>{"p"}</Tex> does the second integral also equal <Tex>{"3"}</Tex>?</p>
      </InfoBox>
      {/* Slider */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"p"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(pVal)}</Tex></span>
        </div>
        <input type="range" min={0} max={10} step={0.1} value={pVal} onChange={e => setPVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(pVal - pr.val) < 0.15; return (<button key={pr.label} onClick={() => setPVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active && isExact ? C.ok : active ? C.ps : C.border}`, background: active && isExact ? C.ok + "15" : active ? C.ps + "15" : C.card, color: active ? (isExact ? C.ok : C.ps) : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      {/* Values: p, q, p+q */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 2 }}><Tex>{"p"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{fmt(pVal)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{"q = 5 - \\tfrac{p}{2}"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{fmt(qVal)}</Tex></div>
        </div>
        <div style={{ background: isExact ? C.conclBg : C.card, border: `1px solid ${isExact ? C.ok : C.muted}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: isExact ? C.ok : C.muted, fontWeight: 700, marginBottom: 2 }}><Tex>{"p + q"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: isExact ? C.ok : C.muted }}><Tex>{fmt(pPlusQ)}</Tex></div>
        </div>
      </div>
      {/* The key constraint: does Eq 2 hold? */}
      <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, transition: "all 0.3s" }}>
        <span style={{ fontSize: 13, color: col, fontWeight: 600 }}><Tex>{"\\int_0^1 x(px+q)\\,dx"}</Tex></span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: col, transition: "color 0.3s" }}><Tex>{fmt(int2)}</Tex></span>
          <span style={{ fontSize: 16, marginLeft: 4 }}>{isExact ? "\u2705" : "\u274C"}</span>
        </div>
      </div>
      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {/* Banner */}
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>Both integrals satisfied: <Tex>{"p = 6"}</Tex>, <Tex>{"q = 2"}</Tex>, so <Tex>{"p + q = 8"}</Tex>. The answer is D.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! The second integral gives <Tex>{fmt(int2)}</Tex> instead of <Tex>{"3"}</Tex>. Try <Tex>{"p = 6"}</Tex>.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>The second integral gives <Tex>{fmt(int2)}</Tex>, not <Tex>{"3"}</Tex>. Adjust <Tex>{"p"}</Tex> until it matches.</span>
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
