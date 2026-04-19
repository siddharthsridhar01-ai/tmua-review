"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 2, paper: "Set B Paper 1", year: "2026 Mock", topicTag: "Quadratics / Discriminant Inequality" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "-12 < m < 0", text: "-12 < m < 0", ok: true, expl: "Obtained by setting the curves equal to get x\u00B2 \u2212 (6+m)x + 9 = 0. No intersection requires b\u00B2 \u2212 4ac < 0, giving m\u00B2 + 12m < 0, i.e. m(m+12) < 0, so \u221212 < m < 0." },
  { letter: "B", tex: "m < -12 \\text{ or } m > 0", text: "m < -12 or m > 0", ok: false, expl: "You might get this by solving m(m+12) > 0 instead of < 0. That gives where the curves DO intersect, not where they don't." },
  { letter: "C", tex: "-6 < m < 6", text: "-6 < m < 6", ok: false, expl: "You might get this by forgetting to rearrange the constant term, e.g. using discriminant of x\u00B2 \u2212 6x + 10 \u2212 mx without moving the 1 across, getting m\u00B2 \u2212 36 < 0." },
  { letter: "D", tex: "0 < m < 12", text: "0 < m < 12", ok: false, expl: "You might get this by a sign error when forming the quadratic, e.g. writing \u2212(6\u2212m) instead of \u2212(6+m), leading to m\u00B2 \u2212 12m < 0." },
  { letter: "E", tex: "m < 0 \\text{ or } m > 12", text: "m < 0 or m > 12", ok: false, expl: "You might get this from the sign error in D (getting m\u00B2 \u2212 12m) combined with solving > 0 instead of < 0, giving the exterior of the wrong interval." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q2</span>
        The graphs of <Tex>{"y = x^2 - 6x + 10"}</Tex> and <Tex>{"y = mx + 1"}</Tex>, where <Tex>{"m"}</Tex> is a constant, do not intersect. What is the complete range of values of <Tex>{"m"}</Tex>?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","-12 < m < 0"],["B","m < -12 \\text{ or } m > 0"],["C","-6 < m < 6"],["D","0 < m < 12"],["E","m < 0 \\text{ or } m > 12"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 2</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The graphs of</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"y = x^2 - 6x + 10 \\qquad \\text{and} \\qquad y = mx + 1"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>where <Tex>{"m"}</Tex> is a constant, do not intersect.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>What is the complete range of values of <Tex>{"m"}</Tex>?</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (
          <div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 200px" }}>
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
        <p style={{ margin: 0 }}>Set the two expressions equal and rearrange into a single quadratic in <Tex>{"x"}</Tex>. For no intersection, require the discriminant to be strictly negative: <Tex>{"b^2 - 4ac < 0"}</Tex>.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}><Tex>{"x^2 - 6x + 10 = mx + 1"}</Tex> rearranges to <Tex>{"x^2 - (6+m)x + 9 = 0"}</Tex>.</p>
        <p style={{ margin: 0 }}>The discriminant is <Tex>{"(6+m)^2 - 36 = m^2 + 12m"}</Tex>. Setting this negative gives a quadratic inequality in <Tex>{"m"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Set the two curves equal, rearrange to standard form, then apply the discriminant condition for no real roots.</span>,
      math: (<div><Tex>{"x^2 - 6x + 10 = mx + 1 \\;\\Rightarrow\\; x^2 - (6+m)x + 9 = 0"}</Tex></div>), },
    { label: "FORM THE QUADRATIC", color: C.calc,
      text: <span>Move everything to one side.</span>,
      math: (<><div><Tex>{"x^2 - 6x + 10 - mx - 1 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 - (6 + m)x + 9 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Here } a = 1,\\; b = -(6+m),\\; c = 9"}</Tex></div></>), },
    { label: "COMPUTE THE DISCRIMINANT", color: C.calc,
      text: <span>For no intersection we need <Tex>{"b^2 - 4ac < 0"}</Tex>.</span>,
      math: (<><div><Tex>{"b^2 - 4ac = (-(6+m))^2 - 4(1)(9)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= (6+m)^2 - 36"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 36 + 12m + m^2 - 36"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= m^2 + 12m"}</Tex></div></>), },
    { label: "SOLVE THE INEQUALITY", color: C.calc,
      text: <span>Factorise and find where the expression is negative.</span>,
      math: (<><div><Tex>{"m^2 + 12m < 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"m(m + 12) < 0"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\text{Roots at } m = 0 \\text{ and } m = -12"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Parabola opens upwards, so negative between the roots:}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"-12 < m < 0"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The graphs do not intersect when <Tex>{"-12 < m < 0"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{-12 < m < 0}"}</Tex></div>),
      conclusion: <span>The answer is A: <Tex>{"-12 < m < 0"}</Tex>.</span>, },
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
  const [mVal, setMVal] = useState(2);
  const snapPoints = [-14, -12, -6, -3, 0, 6];
  const snapRadius = 0.5;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  const disc = mVal * mVal + 12 * mVal;
  const noIntersect = disc < 0;
  const isBoundary = Math.abs(disc) < 0.5;
  const isInRange = mVal > -12 && mVal < 0;

  const col = noIntersect ? C.ok : isBoundary ? C.assum : C.fail;
  const statusLabel = noIntersect ? "NO INTERSECTION" : isBoundary ? "TANGENT (boundary)" : "INTERSECTS";

  const presets = [
    { label: "mn12", jsx: <span><Tex>{"m = -12"}</Tex></span>, val: -12 },
    { label: "mn6", jsx: <span><Tex>{"m = -6"}</Tex></span>, val: -6 },
    { label: "m0", jsx: <span><Tex>{"m = 0"}</Tex></span>, val: 0 },
    { label: "m6", jsx: <span><Tex>{"m = 6"}</Tex></span>, val: 6 },
  ];

  const FO = ({ x, y, w, h, color, align, bg, children }) => (
    <foreignObject x={x} y={y} width={w || 40} height={h || 20}>
      <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
    </foreignObject>
  );

  const graph = (() => {
    const pW = 500, pH = 300;
    const pad = { l: 44, r: 16, t: 20, b: 32 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const parab = (x) => x * x - 6 * x + 10;
    const lineFn = (x) => mVal * x + 1;
    const xMin = -1, xMax = 8, yMin = -5, yMax = 20;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const curvePath = (fn, x0, x1) => { const pts = []; for (let i = 0; i <= 300; i++) { const x = x0 + (x1 - x0) * (i / 300); const y = fn(x); pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`); } return pts.length > 1 ? "M" + pts.join("L") : ""; };

    const roots = [];
    if (disc >= 0) {
      const sqD = Math.sqrt(Math.max(0, disc));
      roots.push(((6 + mVal) - sqD) / 2, ((6 + mVal) + sqD) / 2);
    }

    const lineLabelX = mVal >= 0 ? Math.min(7, (yMax - 3 - 1) / Math.max(mVal, 0.1)) : Math.max(0, (yMin + 3 - 1) / Math.min(mVal, -0.1));
    const lineLabelClampX = Math.max(xMin + 0.5, Math.min(xMax - 0.5, lineLabelX));
    const lineLabelY = Math.max(yMin + 1, Math.min(yMax - 1, lineFn(lineLabelClampX)));
    const lineCol = noIntersect ? C.ok : C.assum;

    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs>
          <filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter>
          <clipPath id="plotArea"><rect x={pad.l} y={pad.t} width={gW} height={gH} /></clipPath>
        </defs>
        {[0, 5, 10, 15].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={1} />
        <g clipPath="url(#plotArea)">
          <path d={curvePath(parab, xMin, xMax)} fill="none" stroke={C.ps} strokeWidth={2} />
          <path d={curvePath(lineFn, xMin, xMax)} fill="none" stroke={lineCol} strokeWidth={2} />
          {roots.filter(r => r >= xMin && r <= xMax).map((r, i) => (
            <circle key={i} cx={sx(r)} cy={sy(parab(r))} r={5} fill={C.fail} stroke={C.white} strokeWidth={1.5} />
          ))}
        </g>
        <circle cx={sx(3)} cy={sy(1)} r={3} fill={C.ps} stroke={C.white} strokeWidth={1} />
        {/* Labels via foreignObject */}
        <FO x={sx(6.5) - 70} y={sy(parab(6.5)) - 22} w={140} h={18} color={C.ps} bg><Tex>{"y = x^2 - 6x + 10"}</Tex></FO>
        <FO x={sx(lineLabelClampX) - 56} y={sy(lineLabelY) - 22} w={112} h={18} color={lineCol} bg><Tex>{`y = ${fmt(mVal)}x + 1`}</Tex></FO>
        {/* X-axis */}
        {[0, 2, 4, 6, 8].map(x => <FO key={x} x={sx(x) - 10} y={pH - pad.b + 2} w={20} h={18}><Tex>{String(x)}</Tex></FO>)}
        {/* Y-axis */}
        {[0, 5, 10, 15].map(y => <FO key={y} x={pad.l - 32} y={sy(y) - 8} w={28} h={18} align="right"><Tex>{String(y)}</Tex></FO>)}
        <FO x={pW - pad.r - 14} y={sy(0) - 18} w={16} h={18}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0) + 4} y={pad.t - 4} w={16} h={18}><Tex>{"y"}</Tex></FO>
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>The parabola <Tex>{"y = x^2 - 6x + 10"}</Tex> has vertex at <Tex>{"(3, 1)"}</Tex> and passes through <Tex>{"(0, 10)"}</Tex>.</p>
        <p style={{ margin: 0 }}>The line <Tex>{"y = mx + 1"}</Tex> always passes through <Tex>{"(0, 1)"}</Tex>. Vary <Tex>{"m"}</Tex> to see when it misses the parabola entirely.</p>
      </InfoBox>
      {/* Slider */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"m"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}><Tex>{fmt(mVal)}</Tex></span>
        </div>
        <input type="range" min={-20} max={8} step={0.1} value={mVal} onChange={e => setMVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(mVal - pr.val) < 0.3; return (<button key={pr.label} onClick={() => setMVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 2 }}><Tex>{"m"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{fmt(mVal)}</Tex></div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{"m^2 + 12m"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{fmt(disc)}</Tex></div>
        </div>
        <div style={{ background: noIntersect ? C.conclBg : isBoundary ? C.assumBg : C.failBg, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}>STATUS</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: col }}>{noIntersect ? "No intersect" : isBoundary ? "Tangent" : "Intersects"}</div>
        </div>
      </div>
      {/* Discriminant constraint */}
      <div style={{ background: noIntersect ? C.conclBg : C.card, border: `1px solid ${col}44`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, transition: "all 0.3s" }}>
        <span style={{ fontSize: 13, color: col, fontWeight: 600 }}><Tex>{"m^2 + 12m"}</Tex></span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: col, transition: "color 0.3s" }}><Tex>{fmt(disc)}</Tex></span>
          <span style={{ fontSize: 16, marginLeft: 4 }}>{noIntersect ? "\u2705" : "\u274C"}</span>
        </div>
      </div>
      {/* Graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {/* Banner */}
      {noIntersect ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}><Tex>{`m = ${fmt(mVal)}`}</Tex> is in <Tex>{"-12 < m < 0"}</Tex>: the line misses the parabola. Discriminant <Tex>{`= ${fmt(disc)} < 0`}</Tex> {"\u2705"}</span>
        </div>
      ) : isBoundary ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Boundary: the line is tangent (discriminant <Tex>{`\\approx 0`}</Tex>). Not included in the no-intersection range.</span>
        </div>
      ) : (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.fail }}>The line intersects the parabola (discriminant <Tex>{`= ${fmt(disc)} > 0`}</Tex>). Try values between <Tex>{"-12"}</Tex> and <Tex>{"0"}</Tex>.</span>
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
