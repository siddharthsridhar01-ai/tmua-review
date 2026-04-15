"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 12, paper: "Paper 1", year: "2026 Mock", topicTag: "Quartic Minimum / Completing the Square" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "-3", text: "\u22123", ok: false, expl: "You might get \u22123 if you use k = 1 instead of k = 2. With k = 2, the quadratic x\u00B2 \u2212 4x + 5 = (x\u22122)\u00B2 + 1 has minimum 1, not \u22123." },
  { letter: "B", tex: "-1", text: "\u22121", ok: false, expl: "You might get \u22121 if you find k = 2 correctly but then compute the minimum of x\u00B2 \u2212 2kx + 5 as 5 \u2212 k\u00B2 = 5 \u2212 4 = 1 but make a sign error." },
  { letter: "C", tex: "0", text: "0", ok: false, expl: "You might get 0 if you confuse the minimum of x\u00B2 \u2212 4x + 5 with the root of x\u00B2 \u2212 4x + 5 = 0. But the discriminant is 16 \u2212 20 = \u22124 < 0, so there are no real roots." },
  { letter: "D", tex: "1", text: "1", ok: true, expl: "From the quartic: min of x\u2074 \u2212 2kx\u00B2 is \u2212k\u00B2 = \u22124, so k = 2. Then x\u00B2 \u2212 2(2)x + 5 = x\u00B2 \u2212 4x + 5 = (x\u22122)\u00B2 + 1. The minimum is 1." },
  { letter: "E", tex: "3", text: "3", ok: false, expl: "You might get 3 if you use k = 1 (from \u2212k = \u22124, wrong) and compute min of x\u00B2 \u2212 2x + 5 = (x\u22121)\u00B2 + 4 = 4, or a similar arithmetic slip." },
  { letter: "F", tex: "5", text: "5", ok: false, expl: "You get 5 by evaluating x\u00B2 \u2212 2kx + 5 at x = 0 rather than at the vertex. The minimum of a quadratic is at x = k, not at x = 0." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q12</span>
        The minimum value of the function <Tex>{"x^4 - 2kx^2"}</Tex> is <Tex>{"-4"}</Tex>, where <Tex>{"k > 0"}</Tex>. Find the minimum value of the function <Tex>{"x^2 - 2kx + 5."}</Tex>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","-3"],["B","-1"],["C","0"],["D","1"],["E","3"],["F","5"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 12</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The minimum value of the function</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"x^4 - 2kx^2"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>is <Tex>{"-4"}</Tex>, where <Tex>{"k > 0"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>Find the minimum value of the function</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"x^2 - 2kx + 5"}</Tex></MathBox>
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
        <p style={{ margin: 0 }}>Two stages: first use the quartic constraint to find <Tex>{"k"}</Tex>, then complete the square on the quadratic <Tex>{"x^2 - 2kx + 5"}</Tex> to find its minimum.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The quartic <Tex>{"x^4 - 2kx^2"}</Tex> is a quadratic in disguise: let <Tex>{"u = x^2"}</Tex> to get <Tex>{"u^2 - 2ku"}</Tex>. Completing the square gives <Tex>{"(u - k)^2 - k^2"}</Tex>, so its minimum is <Tex>{"-k^2"}</Tex> (achieved when <Tex>{"u = k"}</Tex>, i.e. <Tex>{"x^2 = k"}</Tex>).</p>
        <p style={{ margin: 0 }}>Since <Tex>{"k > 0"}</Tex>, the value <Tex>{"u = k"}</Tex> is achievable (we need <Tex>{"x^2 \\ge 0"}</Tex>).</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const compactGraph = (fn, { xMin, xMax, yMin, yMax, color, dots, labels, title }) => {
    const pW = 270, pH = 185;
    const pad = { l: 32, r: 12, t: 22, b: 24 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const segs = []; let cur = [];
    for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); const y = fn(x); if (y >= yMin && y <= yMax) { cur.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } else { if (cur.length > 1) segs.push("M" + cur.join("L")); cur = []; } }
    if (cur.length > 1) segs.push("M" + cur.join("L"));
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lbc"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        <path d={segs.join("")} fill="none" stroke={color} strokeWidth={2} />
        {(dots || []).map((d, i) => <circle key={i} cx={sx(d[0])} cy={sy(d[1])} r={3.5} fill={d[2] || color} stroke={C.white} strokeWidth={1} />)}
        {(labels || []).map((lb, i) => <foreignObject x={sx(lb[0])} y={sy(lb[1]) + (lb[4] || -10) - 12} width={80} height={18}><div style={{ fontSize: 11, color: lb[2] || C.white, textAlign: "left", lineHeight: 1, fontFamily: mathFont, fontWeight: 600, fontStyle: "normal" }}>{lb[5]}</div></foreignObject>)}
        {title && <foreignObject x={pW / 2 - 22} y={pad.t - 6 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1 }}><Tex>{String(title)}</Tex></div></foreignObject>}
        {[Math.round(xMin), Math.round(xMax)].map(x => x !== 0 && <foreignObject x={sx(x) - 22} y={pH - pad.b + 14 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1 }}><Tex>{String(x)}</Tex></div></foreignObject>)}
      </svg>
    );
  };

  const quarticDiagram = compactGraph(
    (x) => x * x * x * x - 4 * x * x,
    { xMin: -3, xMax: 3, yMin: -5, yMax: 8, color: C.assum,
      dots: [[Math.sqrt(2), -4, C.ok], [-Math.sqrt(2), -4, C.ok], [0, 0, C.muted]],
      labels: [
        [Math.sqrt(2), -4, C.ok, "start", 14, `(\u221A2, \u22124)`],
        [-Math.sqrt(2), -4, C.ok, "end", 14, `(\u2212\u221A2, \u22124)`],
      ],
      title: `x\u2074 \u2212 2(2)x\u00B2` }
  );

  const quadDiagram = compactGraph(
    (x) => x * x - 4 * x + 5,
    { xMin: -1, xMax: 5, yMin: -1, yMax: 8, color: C.ps,
      dots: [[2, 1, C.ok]],
      labels: [
        [2, 1, C.ok, "middle", -10, "(2, 1)"],
      ],
      title: `x\u00B2 \u2212 4x + 5 = (x\u22122)\u00B2 + 1` }
  );

  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Treat the quartic as a quadratic in <Tex>{"x^2"}</Tex> to find <Tex>{"k"}</Tex>, then complete the square on the second function.</span>,
      math: (<div><Tex>{"x^4 - 2kx^2 = (x^2)^2 - 2k(x^2) \\;\\longrightarrow\\; \\text{quadratic in } u = x^2"}</Tex></div>), },
    { label: "COMPLETE THE SQUARE ON THE QUARTIC", color: C.calc,
      text: <span>Substitute <Tex>{"u = x^2"}</Tex> so the quartic becomes <Tex>{"u^2 - 2ku"}</Tex>. Complete the square in <Tex>{"u"}</Tex>.</span>,
      math: (<><div><Tex>{"u^2 - 2ku"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= u^2 - 2ku + k^2 - k^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= (u - k)^2 - k^2"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Since } (u-k)^2 \\ge 0 \\text{, the minimum value is } 0 - k^2 = -k^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{achieved when } u - k = 0, \\text{ i.e. } u = k, \\text{ i.e. } x^2 = k"}</Tex></div></>), },
    { label: "SOLVE FOR k", color: C.calc,
      text: <span>Set the minimum equal to <Tex>{"-4"}</Tex> and solve.</span>,
      math: (<><div><Tex>{"-k^2 = -4"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"k^2 = 4"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"k = \\sqrt{4} = 2 \\quad (\\text{since } k > 0)"}</Tex></div></>),
      diagram: quarticDiagram, },
    { label: "COMPLETE THE SQUARE ON THE QUADRATIC", color: C.calc,
      text: <span>Substitute <Tex>{"k = 2"}</Tex> into <Tex>{"x^2 - 2kx + 5"}</Tex> and complete the square.</span>,
      math: (<><div><Tex>{"x^2 - 2(2)x + 5 = x^2 - 4x + 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= x^2 - 4x + 4 + 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= (x - 2)^2 + 1"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Since } (x-2)^2 \\ge 0 \\text{, the minimum value is } 0 + 1 = 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#fdcb6e}{\\text{achieved when } x = 2}"}</Tex></div></>),
      diagram: quadDiagram, },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The minimum value of <Tex>{"x^2 - 2kx + 5"}</Tex> is <Tex>{"1"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{k = 2,\\quad \\min(x^2 - 4x + 5) = (2-2)^2 + 1 = 0 + 1 = 1}"}</Tex></div>),
      conclusion: <span>With <Tex>{"k = 2"}</Tex>, the minimum of <Tex>{"x^2 - 4x + 5 = (x-2)^2 + 1"}</Tex> is <Tex>{"1"}</Tex>. The answer is D.</span>, },
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
  const [kVal, setKVal] = useState(1);
  const snapPoints = [0.5, 1, 1.5, 2, 2.5, 3];
  const snapRadius = 0.08;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const quarticMin = -(kVal * kVal);
  const quadMin = 5 - kVal * kVal;
  const isExact = Math.abs(kVal - 2) < 0.001;
  const isNear = !isExact && Math.abs(quarticMin - (-4)) < 4 * 0.05;
  const isHit = isExact || isNear;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "k1", jsx: <span><Tex>{"k = 1"}</Tex></span>, val: 1 },
    { label: "k15", jsx: <span><Tex>{"k = 1.5"}</Tex></span>, val: 1.5 },
    { label: "k2", jsx: <span><Tex>{"k = 2"}</Tex></span>, val: 2 },
    { label: "k3", jsx: <span><Tex>{"k = 3"}</Tex></span>, val: 3 },
  ];

  const graph = (() => {
    const pW = 500, pH = 240;
    const pad = { l: 40, r: 16, t: 20, b: 28 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = -3.5, xMax = 5.5, yMin = -6, yMax = 10;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const curvePath = (fn) => { const segs = []; let current = []; for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); const y = fn(x); if (y >= yMin && y <= yMax) { current.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } else { if (current.length > 1) segs.push("M" + current.join("L")); current = []; } } if (current.length > 1) segs.push("M" + current.join("L")); return segs.join(""); };
    const quartic = (x) => x * x * x * x - 2 * kVal * x * x;
    const quadratic = (x) => x * x - 2 * kVal * x + 5;
    const sqrtK = Math.sqrt(kVal);
    const qMinX = kVal;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[-4, 0, 4, 8].map(y => y >= yMin && y <= yMax && <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        <line x1={pad.l} y1={sy(-4)} x2={pW - pad.r} y2={sy(-4)} stroke={C.assum} strokeWidth={1} strokeDasharray="6,3" />
        <path d={curvePath(quartic)} fill="none" stroke={C.assum} strokeWidth={2} />
        <path d={curvePath(quadratic)} fill="none" stroke={col} strokeWidth={2.5} />
        {sqrtK >= 0 && sqrtK <= 3.5 && quarticMin >= yMin && <>
          <circle cx={sx(sqrtK)} cy={sy(quarticMin)} r={4} fill={C.assum} stroke={C.white} strokeWidth={1} />
          <circle cx={sx(-sqrtK)} cy={sy(quarticMin)} r={4} fill={C.assum} stroke={C.white} strokeWidth={1} />
        </>}
        {qMinX >= xMin && qMinX <= xMax && quadMin >= yMin && <>
          <circle cx={sx(qMinX)} cy={sy(quadMin)} r={6} fill={col} stroke={C.white} strokeWidth={1.5} />
          <foreignObject x={sx(qMinX) - 30} y={sy(quadMin) - 12 - 12} width={60} height={18}><div style={{ fontSize: 11, color: C.white, textAlign: "center", lineHeight: 1, fontFamily: mathFont, fontWeight: 600, fontStyle: "normal" }}>({fmt(qMinX)}, {fmt(quadMin)})</div></foreignObject>
        </>}
        <foreignObject x={pW - pad.r - 4 - 60} y={sy(-4) - 6 - 12} width={62} height={18}><div style={{ fontSize: 11, color: C.assum, textAlign: "right", lineHeight: 1, fontFamily: mathFont, fontWeight: 600, fontStyle: "normal" }}>target min = {"\u22124"}</div></foreignObject>
        <foreignObject x={sx(-2.5) - 30} y={sy(quartic(-2.5)) - 8 - 12} width={60} height={18}><div style={{ fontSize: 11, color: C.assum, textAlign: "center", lineHeight: 1, fontFamily: mathFont, fontWeight: 400, fontStyle: "normal" }}>x{"\u2074"} {"\u2212"} 2kx{"\u00B2"}</div></foreignObject>
        <foreignObject x={sx(4) - 22} y={sy(quadratic(4)) - 8 - 12} width={44} height={16}><div style={{ fontSize: 11, color: col, textAlign: "center", lineHeight: 1 }}><Tex>{"x^2 - 2kx + 5"}</Tex></div></foreignObject>
        {[-3, -2, -1, 1, 2, 3, 4, 5].map(x => x >= xMin && x <= xMax && <foreignObject x={sx(x) - 22} y={pH - pad.b + 14 - 12} width={44} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1 }}><Tex>{String(x)}</Tex></div></foreignObject>)}
        {[-4, 4, 8].map(y => y >= yMin && y <= yMax && <foreignObject x={pad.l - 8 - 48} y={sy(y) + 4 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1 }}><Tex>{String(y)}</Tex></div></foreignObject>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Slide <Tex>{"k"}</Tex> until the quartic minimum (yellow) hits <Tex>{"-4"}</Tex></p>
        <p style={{ margin: "0 0 4px" }}>2. The blue curve shows <Tex>{"x^2 - 2kx + 5"}</Tex> with its vertex marked</p>
        <p style={{ margin: 0 }}>3. At the correct <Tex>{"k"}</Tex>, read off the quadratic's minimum value</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}><Tex>{"k"}</Tex></span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{fmt(kVal)}</span>
        </div>
        <input type="range" min={0.5} max={3} step={0.01} value={kVal} onChange={e => setKVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(kVal - pr.val) < 0.02; return (<button key={pr.label} onClick={() => setKVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active && isHit ? C.ok : active ? C.ps : C.border}`, background: active && isHit ? C.ok + "15" : active ? C.ps + "15" : C.card, color: active ? (isHit ? C.ok : C.ps) : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ background: "#1e2030", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <div><Tex>{`\\color{#fdcb6e}{\\min(x^4 - 2kx^2) = -k^2 = -${fmt(kVal)}^2 = ${fmt(quarticMin)}}`}</Tex></div>
          <div style={{ marginTop: 6 }}><Tex>{`\\color{${col}}{\\min(x^2 - 2kx + 5) = 5 - k^2 = 5 - ${fmt(kVal * kVal)} = ${fmt(quadMin)}}`}</Tex></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"k"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(kVal)}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}>QUARTIC MIN</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(quarticMin)}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}>QUAD MIN</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col, fontFamily: mathFont, transition: "color 0.3s" }}>{fmt(quadMin)}</div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {isHit ? (
        isExact ? (
          <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>At <Tex>{"k = 2"}</Tex>: quartic min <Tex>{"= -4"}</Tex> {"\u2713"}, quadratic <Tex>{"= (x-2)^2 + 1"}</Tex>, min <Tex>{"= 1"}</Tex>. The answer is D.</span>
          </div>
        ) : (
          <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! Quartic min <Tex>{`\\approx ${fmt(quarticMin)}`}</Tex>. Tap <Tex>{"k = 2"}</Tex> to see the exact answer.</span>
          </div>
        )
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Quartic min <Tex>{`= ${fmt(quarticMin)}`}</Tex> (need <Tex>{"-4"}</Tex>). Slide <Tex>{"k"}</Tex> to <Tex>{"2"}</Tex>.</span>
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
