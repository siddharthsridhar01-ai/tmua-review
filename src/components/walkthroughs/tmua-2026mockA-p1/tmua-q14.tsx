"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 14, set: "A", paperNumber: "Paper 1", topicTag: "Cubic Roots / Turning Points" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "-4", text: "\u22124", ok: false, expl: "You might get \u22124 by computing f(\u22121) + f(1) = (2+k) + (\u22122+k) = 2k, then setting 2k = \u22124 and getting k = \u22122. But the question asks for the sum of the k values, not f-values." },
  { letter: "B", tex: "-2", text: "\u22122", ok: false, expl: "k = \u22122 is one valid value (the local max touches the x-axis), but k = 2 also works (the local min touches). You need the sum: \u22122 + 2 = 0." },
  { letter: "C", tex: "0", text: "0", ok: true, expl: "f'(x) = 3x\u00B2 \u2212 3 = 0 at x = \u00B11. The cubic has exactly two roots when a turning point sits on the axis: f(\u22121) = 2 + k = 0 gives k = \u22122, and f(1) = \u22122 + k = 0 gives k = 2. Sum: \u22122 + 2 = 0." },
  { letter: "D", tex: "2", text: "2", ok: false, expl: "k = 2 is one valid value (the local min touches the x-axis), but k = \u22122 also works (the local max touches). You need the sum: \u22122 + 2 = 0, not just one value." },
  { letter: "E", tex: "4", text: "4", ok: false, expl: "You might get 4 by computing |\u22122| + |2| = 4, but the question asks for the sum of the values of k, not the sum of their absolute values." },
  { letter: "F", tex: "\\pm 2", text: "\u00B12", ok: false, expl: "The two possible values are indeed k = \u22122 and k = 2, but the question asks for their sum, not the values themselves. The sum is \u22122 + 2 = 0." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const SECTIONS_Q14 = [
  { type: "prose", text: (<>The function</>) },
  { type: "mathbox", tex: "f(x) = x^3 - 3x + k" },
  { type: "prose", text: (<>has exactly two distinct real roots.</>) },
  { type: "prose", text: (<>Find the sum of the possible values of <Tex>{"k."}</Tex></>) },
];
const OPTIONS_Q14 = [["A", "-4"], ["B", "-2"], ["C", "0"], ["D", "2"], ["E", "4"], ["F", "\\pm 2"]];

function QuestionSummary() {
  const sections = SECTIONS_Q14;
  const options = OPTIONS_Q14;
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q14</span>
        {sections.map((s, i) => {
          if (s.type === "prose") return <span key={i}>{s.text} </span>;
          if (s.type === "mathbox") return <div key={i} style={{ display: "block", margin: "6px auto", color: C.text, fontSize: 14, fontWeight: 700, textAlign: "center" }}><Tex display>{s.tex}</Tex></div>;
          if (s.type === "custom") return <div key={i} style={{ margin: "6px 0" }}>{s.jsx}</div>;
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {options.map(([l, v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 14</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The function</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"f(x) = x^3 - 3x + k"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>has exactly two distinct real roots.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Find the sum of the possible values of <Tex>{"k."}</Tex></p>
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
        <p style={{ margin: 0 }}>A cubic has exactly two distinct real roots when one turning point sits on the x-axis (giving a repeated root there) and the other is on the opposite side. Find the turning points, set each equal to zero, and add the resulting <Tex>{"k"}</Tex> values.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Differentiate to find the turning points. A cubic <Tex>{"ax^3 + bx + k"}</Tex> has turning points where <Tex>{"f'(x) = 0"}</Tex>.</p>
        <p style={{ margin: 0 }}>For exactly two distinct roots, we need <Tex>{"f(\\text{turning point}) = 0"}</Tex> at one of them. If the local max is above the axis and the local min is below, there are three roots. If either touches, there are exactly two.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const compactGraph = (kVal, label, col) => {
    const pW = 270, pH = 185;
    const pad = { l: 32, r: 12, t: 22, b: 24 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = -2.8, xMax = 2.8, yMin = -5, yMax = 5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const f = (x) => x * x * x - 3 * x + kVal;
    const segs = []; let cur = [];
    for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); const y = f(x); if (y >= yMin && y <= yMax) cur.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); else { if (cur.length > 1) segs.push("M" + cur.join("L")); cur = []; } }
    if (cur.length > 1) segs.push("M" + cur.join("L"));
    const fNeg1 = f(-1), f1 = f(1);
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lbc"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.7} />
        <path d={segs.join("")} fill="none" stroke={col} strokeWidth={2} />
        {fNeg1 >= yMin && fNeg1 <= yMax && <circle cx={sx(-1)} cy={sy(fNeg1)} r={3.5} fill={Math.abs(fNeg1) < 0.01 ? C.ok : col} stroke={C.white} strokeWidth={1} />}
        {f1 >= yMin && f1 <= yMax && <circle cx={sx(1)} cy={sy(f1)} r={3.5} fill={Math.abs(f1) < 0.01 ? C.ok : col} stroke={C.white} strokeWidth={1} />}
        {fNeg1 >= yMin && fNeg1 <= yMax && <text x={sx(-1)} y={sy(fNeg1) - 8} textAnchor="middle" fill={C.white} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lbc)">({"\u2212"}1, {fmt(fNeg1)})</text>}
        {f1 >= yMin && f1 <= yMax && <text x={sx(1)} y={sy(f1) + 16} textAnchor="middle" fill={C.white} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lbc)">(1, {fmt(f1)})</text>}
        <text x={pW / 2} y={pad.t - 6} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont} filter="url(#lbc)">{label}</text>
      </svg>
    );
  };

  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Differentiate <Tex>{"f(x)"}</Tex> to find the turning points, evaluate <Tex>{"f"}</Tex> at each, and find which values of <Tex>{"k"}</Tex> make a turning point sit on the x-axis.</span>,
      math: (<div><Tex>{"\\text{Exactly two distinct roots} \\;\\Longleftrightarrow\\; f(\\text{turning point}) = 0"}</Tex></div>), },
    { label: "FIND THE TURNING POINTS", color: C.calc,
      text: <span>Differentiate <Tex>{"f(x) = x^3 - 3x + k"}</Tex> and set the derivative to zero.</span>,
      math: (<><div><Tex>{"f'(x) = 3x^2 - 3"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"3x^2 - 3 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"3(x^2 - 1) = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"3(x - 1)(x + 1) = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#fdcb6e}{x = -1 \\;\\text{ (local max)}, \\quad x = 1 \\;\\text{ (local min)}}"}</Tex></div></>), },
    { label: "EVALUATE f AT EACH TURNING POINT", color: C.calc,
      text: <span>Substitute <Tex>{"x = -1"}</Tex> and <Tex>{"x = 1"}</Tex> into <Tex>{"f(x) = x^3 - 3x + k"}</Tex>.</span>,
      math: (<><div><Tex>{"f(-1) = (-1)^3 - 3(-1) + k = -1 + 3 + k = 2 + k"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"f(1) = (1)^3 - 3(1) + k = 1 - 3 + k = -2 + k"}</Tex></div></>), },
    { label: "SET EACH TURNING POINT VALUE TO ZERO", color: C.calc,
      text: <span>For exactly two roots, one turning point must sit on the x-axis.</span>,
      math: (<><div><Tex>{"f(-1) = 0: \\quad 2 + k = 0 \\quad \\Rightarrow \\quad k = -2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"f(1) = 0: \\quad -2 + k = 0 \\quad \\Rightarrow \\quad k = 2"}</Tex></div></>), },
    { label: "CHECK BOTH VALUES GIVE EXACTLY TWO ROOTS", color: C.calc,
      text: <span>Verify each <Tex>{"k"}</Tex> value produces a repeated root at one turning point and a single root elsewhere.</span>,
      math: (<><div><Tex>{"k = -2: \\; f(-1) = 0 \\text{ (double root)}, \\; f(1) = -4 < 0 \\;\\checkmark"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"k = 2: \\; f(1) = 0 \\text{ (double root)}, \\; f(-1) = 4 > 0 \\;\\checkmark"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Both give exactly two distinct roots.}"}</Tex></div></>),
      diagram: (<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 130px", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{compactGraph(-2, "k = \u22122", C.ps)}</div>
        <div style={{ flex: "1 1 130px", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{compactGraph(2, "k = 2", C.assum)}</div>
      </div>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>Sum the two values of <Tex>{"k"}</Tex>.</span>,
      math: (<><div><Tex>{"\\text{Sum} = (-2) + 2 = \\color{#55efc4}{0}"}</Tex></div></>),
      conclusion: <span>The possible values are <Tex>{"k = -2"}</Tex> and <Tex>{"k = 2"}</Tex>. Their sum is <Tex>{"0"}</Tex>. The answer is C.</span>, },
  ];
  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><MathBox>{s.math}</MathBox>{s.diagram && <div style={{ marginTop: 8 }}>{s.diagram}</div>}{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [kVal, setKVal] = useState(0);
  const snapPoints = [-3, -2, -1, 0, 1, 2, 3];
  const snapRadius = 0.15;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const fNeg1 = 2 + kVal;
  const f1 = -2 + kVal;
  const isK2 = Math.abs(kVal - 2) < 0.01;
  const isKNeg2 = Math.abs(kVal - (-2)) < 0.01;
  const isNearK2 = !isK2 && Math.abs(f1) < 0.2;
  const isNearKNeg2 = !isKNeg2 && Math.abs(fNeg1) < 0.2;
  const isExact = isK2 || isKNeg2;
  const isNear = isNearK2 || isNearKNeg2;
  const isHit = isExact || isNear;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "kn2", jsx: <span><Tex>{"k = -2"}</Tex></span>, val: -2 },
    { label: "k0", jsx: <span><Tex>{"k = 0"}</Tex></span>, val: 0 },
    { label: "k2", jsx: <span><Tex>{"k = 2"}</Tex></span>, val: 2 },
  ];

  const graph = (() => {
    const pW = 500, pH = 240;
    const pad = { l: 40, r: 16, t: 20, b: 28 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = -3, xMax = 3, yMin = -6, yMax = 6;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const f = (x) => x * x * x - 3 * x + kVal;
    const segs = []; let cur = [];
    for (let i = 0; i <= 300; i++) { const x = xMin + (xMax - xMin) * (i / 300); const y = f(x); if (y >= yMin && y <= yMax) cur.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); else { if (cur.length > 1) segs.push("M" + cur.join("L")); cur = []; } }
    if (cur.length > 1) segs.push("M" + cur.join("L"));
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[-4, -2, 2, 4].map(y => y >= yMin && y <= yMax && <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        <path d={segs.join("")} fill="none" stroke={col} strokeWidth={2.5} />
        {fNeg1 >= yMin && fNeg1 <= yMax && <circle cx={sx(-1)} cy={sy(fNeg1)} r={6} fill={Math.abs(fNeg1) < 0.2 ? C.ok : C.assum} stroke={C.white} strokeWidth={1.5} />}
        {f1 >= yMin && f1 <= yMax && <circle cx={sx(1)} cy={sy(f1)} r={6} fill={Math.abs(f1) < 0.2 ? C.ok : C.assum} stroke={C.white} strokeWidth={1.5} />}
        {fNeg1 >= yMin && fNeg1 <= yMax && <text x={sx(-1)} y={sy(fNeg1) - 12} textAnchor="middle" fill={C.white} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb)">({"\u2212"}1, {fmt(fNeg1)})</text>}
        {f1 >= yMin && f1 <= yMax && <text x={sx(1)} y={sy(f1) + 18} textAnchor="middle" fill={C.white} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb)">(1, {fmt(f1)})</text>}
        <text x={pW / 2} y={pad.t + 12} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont} filter="url(#lb)">f(x) = x{"\u00B3"} {"\u2212"} 3x + k</text>
        {[-2, -1, 1, 2].map(x => <text key={x} x={sx(x)} y={pH - pad.b + 14} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont}>{x}</text>)}
        {[-4, -2, 2, 4].map(y => y >= yMin && y <= yMax && <text key={y} x={pad.l - 8} y={sy(y) + 4} textAnchor="end" fill={C.muted} fontSize={11} fontFamily={mathFont}>{y}</text>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Slide <Tex>{"k"}</Tex> to shift the cubic up and down</p>
        <p style={{ margin: "0 0 4px" }}>2. Watch the turning points: the curve has exactly two roots when one dot touches the x-axis</p>
        <p style={{ margin: 0 }}>3. Find both values of <Tex>{"k"}</Tex> where this happens and add them</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}><Tex>{"k"}</Tex></span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{fmt(kVal)}</span>
        </div>
        <input type="range" min={-4} max={4} step={0.01} value={kVal} onChange={e => setKVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(kVal - pr.val) < 0.02; const prHit = (pr.val === 2 && isK2) || (pr.val === -2 && isKNeg2); return (<button key={pr.label} onClick={() => setKVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${prHit ? C.ok : active ? C.ps : C.border}`, background: prHit ? C.ok + "15" : active ? C.ps + "15" : C.card, color: active ? (prHit ? C.ok : C.ps) : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"k"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(kVal)}</div>
        </div>
        <div style={{ background: Math.abs(fNeg1) < 0.2 ? C.conclBg : C.card, border: `1px solid ${Math.abs(fNeg1) < 0.2 ? C.ok : C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: Math.abs(fNeg1) < 0.2 ? C.ok : C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{"f(-1)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: Math.abs(fNeg1) < 0.2 ? C.ok : C.ps, fontFamily: mathFont }}>{fmt(fNeg1)}</div>
        </div>
        <div style={{ background: Math.abs(f1) < 0.2 ? C.conclBg : C.card, border: `1px solid ${Math.abs(f1) < 0.2 ? C.ok : C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: Math.abs(f1) < 0.2 ? C.ok : C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{"f(1)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: Math.abs(f1) < 0.2 ? C.ok : C.ps, fontFamily: mathFont }}>{fmt(f1)}</div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>{isKNeg2 ? <span>At <Tex>{"k = -2"}</Tex>: local max touches axis. The other solution is <Tex>{"k = 2"}</Tex>. Sum: <Tex>{"-2 + 2 = 0"}</Tex>. The answer is C.</span> : <span>At <Tex>{"k = 2"}</Tex>: local min touches axis. The other solution is <Tex>{"k = -2"}</Tex>. Sum: <Tex>{"2 + (-2) = 0"}</Tex>. The answer is C.</span>}</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! {isNearKNeg2 ? <span>Tap <Tex>{"k = -2"}</Tex> to see the local max touch the axis exactly.</span> : <span>Tap <Tex>{"k = 2"}</Tex> to see the local min touch the axis exactly.</span>}</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Slide <Tex>{"k"}</Tex> until a turning point touches the x-axis (i.e. <Tex>{"f(-1) = 0"}</Tex> or <Tex>{"f(1) = 0"}</Tex>).</span>
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
        <div style={{ marginBottom: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: 1 }}>TMUA</span><span style={{ fontSize: 12, color: C.muted }}>AceAdmissions Mock {"\u00B7"} Set {META.set}</span><span style={{ fontSize: 12, color: C.muted }}>{"\u00B7"}</span><span style={{ fontSize: 12, color: C.ps }}>{META.topicTag}</span></div><h1 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: titleFont, fontStyle: "italic", letterSpacing: 0.5 }}>Interactive Walkthrough</h1><p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{META.paperNumber} {"\u00B7"} Question {META.questionNumber}</p></div>
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
