"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 4, paper: "Paper 1", year: "2026 Mock", topicTag: "Exponentials / Completing the Square" };

const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "-4", text: "\u22124", ok: false, expl: "You might get \u22124 by completing the square incorrectly, perhaps writing (u \u2212 3)\u00B2 \u2212 9 + 10 = (u \u2212 3)\u00B2 + 1 but then confusing the minimum of the quadratic (\u22129) with the minimum of the whole expression." },
  { letter: "B", tex: "-1", text: "\u22121", ok: false, expl: "You might get \u22121 by completing the square as (u \u2212 3)\u00B2 \u2212 1, forgetting to add the constant 10 correctly." },
  { letter: "C", tex: "0", text: "0", ok: false, expl: "You might get 0 by thinking the minimum of u\u00B2 \u2212 6u + 10 is at u = 0. But the vertex is at u = 3, and u = 2^x > 0 so u = 3 is achievable." },
  { letter: "D", tex: "1", text: "1", ok: true, expl: "Substituting u = 2^x gives u\u00B2 \u2212 6u + 10 = (u \u2212 3)\u00B2 + 1. The minimum is 1, achieved when u = 3 (i.e. x = log\u2082 3). Since u = 2^x > 0 and 3 > 0, this minimum is attainable." },
  { letter: "E", tex: "2", text: "2", ok: false, expl: "You might get 2 by evaluating at x = 1 (giving 4 \u2212 12 + 10 = 2) and assuming this is the minimum without completing the square." },
  { letter: "F", tex: "5", text: "5", ok: false, expl: "You might get 5 by evaluating at x = 0 (giving 1 \u2212 6 + 10 = 5) and assuming this is the minimum." },
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
        Find the minimum value of <Tex>{"4^x - 6 \\cdot 2^x + 10"}</Tex>.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","-4"],["B","-1"],["C","0"],["D","1"],["E","2"],["F","5"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

// Parabola in u-space: y = (u-3)^2 + 1
function ParabolaGraph({ compact, dotU, dotCol }) {
  const pW = compact ? 220 : 500, pH = compact ? 140 : 240;
  const pad = { l: 36, r: 16, t: 20, b: 28 };
  const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
  const uMin = -0.5, uMax = 7, yMin = -1, yMax = 14;
  const su = (u) => pad.l + ((u - uMin) / (uMax - uMin)) * gW;
  const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
  const qfn = (u) => (u - 3) * (u - 3) + 1;
  const pts = [];
  for (let i = 0; i <= 300; i++) {
    const u = uMin + (uMax - uMin) * (i / 300); const y = qfn(u);
    if (y >= yMin && y <= yMax) pts.push(`${su(u).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  const dotY = dotU != null ? qfn(dotU) : null;
  const dotVisible = dotU != null && dotU >= uMin && dotU <= uMax && dotY >= yMin && dotY <= yMax;
  return (
    <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
      <defs>
        <filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="labelBg">
          <feFlood floodColor="#0f1117" floodOpacity="0.85" />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </defs>
      {[0, 1, 2, 3, 4, 5, 6].map(u => <line key={u} x1={su(u)} y1={pad.t} x2={su(u)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.5} />)}
      {[0, 2, 4, 6, 8, 10, 12].map(y => y >= yMin && y <= yMax && <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
      <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
      <line x1={su(0)} y1={pad.t} x2={su(0)} y2={pH - pad.b} stroke={C.muted} strokeWidth={0.5} />
      <path d={"M" + pts.join("L")} fill="none" stroke={C.ps} strokeWidth={2.5} />
      {/* Vertex marker */}
      <line x1={su(3)} y1={sy(1) - 4} x2={su(3)} y2={sy(0)} stroke={C.ok + "44"} strokeWidth={1} strokeDasharray="4,3" />
      <circle cx={su(3)} cy={sy(1)} r={4} fill="none" stroke={C.ok} strokeWidth={1.5} strokeDasharray="3,2" />
      {compact && <foreignObject x={su(3) - 32} y={sy(1) + 14 - 13} width={64} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>(3, 1)</div></foreignObject>}
      {/* Moving dot with coordinates */}
      {dotVisible && <>
        <circle cx={su(dotU)} cy={sy(dotY)} r={6} fill={dotCol || C.ps} stroke={C.white} strokeWidth={1.5} />
        {!compact && <foreignObject x={su(dotU) - 40} y={sy(dotY) - 12 - 13} width={80} height={20}><div style={{ fontSize: 11, color: C.white, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>({fmt(dotU)}, {fmt(dotY)})</div></foreignObject>}
      </>}
      {/* Labels with auto-hugging backgrounds */}
      {!compact && <foreignObject x={su(3) - 64} y={sy(1) + 15 - 13} width={128} height={20}><div style={{ fontSize: 11, color: C.ok, textAlign: "center", lineHeight: 1, fontWeight: 600, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content", margin: "0 auto" }}>u = 3, min = 1</div></foreignObject>}
      <foreignObject x={pW - pad.r - 30} y={sy(0) - 6 - 13} width={30} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1, fontWeight: 400, fontStyle: "normal", marginLeft: "auto" }}>u</div></foreignObject>
      {!compact && <foreignObject x={su(0) + 6} y={pad.t + 10 - 13} width={112} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "left", lineHeight: 1, fontWeight: 400, fontStyle: "normal", background: "rgba(15,17,23,0.7)", borderRadius: 2, padding: "0 2px", width: "fit-content" }}>(u{"\u2212"}3){"\u00B2"} + 1</div></foreignObject>}
      {[0, 2, 4, 6].map(u => <foreignObject key={u} x={su(u) - 16} y={pH - pad.b + 14 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1, fontWeight: 400, fontStyle: "normal", margin: "0 auto" }}>{u}</div></foreignObject>)}
      {[2, 4, 6, 8, 10, 12].map(y => y >= yMin && y <= yMax && <foreignObject key={y} x={pad.l - 8 - 32} y={sy(y) + 4 - 13} width={32} height={20}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1, fontWeight: 400, fontStyle: "normal", marginLeft: "auto" }}>{y}</div></foreignObject>)}
    </svg>
  );
}

function ReadStep() {
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 4</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Find the minimum value of</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}>
          <Tex>{"4^x - 6 \\cdot 2^x + 10"}</Tex>
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
        <p style={{ margin: 0 }}>Recognise that <Tex>{"4^x = (2^x)^2"}</Tex>, so this is a quadratic in disguise. Substitute <Tex>{"u = 2^x"}</Tex>, complete the square, and find the minimum.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Since <Tex>{"u = 2^x > 0"}</Tex> for all real <Tex>{"x"}</Tex>, you need to check that the vertex of the quadratic falls in the region <Tex>{"u > 0"}</Tex>.</p>
        <p style={{ margin: 0 }}>Here the vertex is at <Tex>{"u = 3 > 0"}</Tex>, so the minimum IS attainable.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    {
      label: "APPROACH", color: C.ps,
      text: <span>Recognise <Tex>{"4^x = (2^x)^2"}</Tex> makes this a quadratic in <Tex>{"u = 2^x"}</Tex>. Complete the square to find the minimum.</span>,
      math: (<div><Tex>{"\\text{\\color{#e2e2e8}{Let}} \\; u = 2^x \\quad \\Rightarrow \\quad u^2 = 4^x"}</Tex></div>),
    },
    {
      label: "SUBSTITUTE", color: C.calc,
      text: <span>Replace <Tex>{"4^x"}</Tex> with <Tex>{"u^2"}</Tex> and <Tex>{"2^x"}</Tex> with <Tex>{"u"}</Tex>.</span>,
      math: (<div><Tex>{"u^2 - 6u + 10"}</Tex></div>),
    },
    {
      label: "COMPLETE THE SQUARE", color: C.calc,
      text: <span>Complete the square for <Tex>{"u^2 - 6u + 10"}</Tex>. Half the coefficient of <Tex>{"u"}</Tex> is <Tex>{"3"}</Tex>, so add and subtract <Tex>{"3^2 = 9"}</Tex>.</span>,
      math: (
        <>
          <div><Tex>{"u^2 - 6u + 10"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"= u^2 - 6u + 9 - 9 + 10"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"= (u - 3)^2 + 1"}</Tex></div>
        </>
      ),
      diagram: <div style={{ width: 220, background: "#1e2030", border: `1px solid ${C.calc}33`, borderRadius: 8, overflow: "hidden" }}><ParabolaGraph compact={true} /></div>,
    },
    {
      label: "FIND MINIMUM", color: C.calc,
      text: <span>The square term <Tex>{"(u-3)^2 \\ge 0"}</Tex>, so the minimum is when <Tex>{"u = 3"}</Tex>. Since <Tex>{"u = 2^x > 0"}</Tex> and <Tex>{"3 > 0"}</Tex>, this is achievable at <Tex>{"x = \\log_2 3"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#fdcb6e}{(3 - 3)^2 + 1 = 0 + 1 = 1 \\quad \\text{\\color{#e2e2e8}{when}} \\; u = 3 \\; (x = \\log_2 3)}"}</Tex></div>),
    },
    {
      label: "CONCLUSION", color: C.ok,
      text: <span>The minimum value is <Tex>{"1"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\min(4^x - 6 \\cdot 2^x + 10) = 1}"}</Tex></div>),
      conclusion: <span>The minimum value is <Tex>{"1"}</Tex>. The answer is D.</span>,
    },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => {
          if (i > revealed) return null;
          return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 220px", alignSelf: "flex-start" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>);
        })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [xVal, setXVal] = useState(0);
  const snapPoints = [0, 1, Math.log2(3), 2]; // key values to snap to
  const snapRadius = 0.08; // how close before snapping

  const handleSlider = (raw) => {
    // Check if near a snap point
    for (const sp of snapPoints) {
      if (Math.abs(raw - sp) < snapRadius) return sp;
    }
    return raw;
  };

  const uVal = Math.pow(2, xVal);
  const exprVal = Math.pow(4, xVal) - 6 * Math.pow(2, xVal) + 10;
  const target = 1;
  const isExact = Math.abs(xVal - Math.log2(3)) < 0.01;
  const isNear = !isExact && Math.abs(exprVal - target) < target * 0.05;
  const isHit = isExact || isNear;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "x0", jsx: <span><Tex>{"x = 0"}</Tex></span>, val: 0 },
    { label: "x1", jsx: <span><Tex>{"x = 1"}</Tex></span>, val: 1 },
    { label: "xlog", jsx: <span><Tex>{"x = \\log_2 3"}</Tex></span>, val: Math.log2(3) },
    { label: "x2", jsx: <span><Tex>{"x = 2"}</Tex></span>, val: 2 },
  ];

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Drag the slider to change <Tex>{"x"}</Tex>, which maps to <Tex>{"u = 2^x"}</Tex> on the parabola</p>
        <p style={{ margin: "0 0 4px" }}>2. Watch the dot slide along <Tex>{"(u - 3)^2 + 1"}</Tex> and the expression value update</p>
        <p style={{ margin: 0 }}>3. Find the <Tex>{"x"}</Tex> value that minimises the expression</p>
      </InfoBox>

      {/* Slider */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{fmt(xVal)}</span>
        </div>
        <input type="range" min={-0.5} max={2.5} step={0.01} value={xVal} onChange={e => setXVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => {
            const active = isExact && Math.abs(xVal - Math.log2(3)) < 0.02;
            return (
              <button key={pr.label} onClick={() => setXVal(pr.val)} style={{
                flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s",
                border: `1px solid ${active && pr.val === Math.log2(3) ? C.ok : C.border}`,
                background: active && pr.val === Math.log2(3) ? C.ok + "15" : C.card,
                color: active && pr.val === Math.log2(3) ? C.ok : C.muted,
                fontSize: 12, cursor: "pointer", fontWeight: active && pr.val === Math.log2(3) ? 700 : 400,
              }}>{pr.jsx || pr.label}</button>
            );
          })}
        </div>
      </div>

      {/* Parabola graph */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
        <ParabolaGraph compact={false} dotU={uVal} dotCol={col} />
      </div>

      {/* Substitution display */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"u = 2^x"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(uVal)}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}><Tex>{"(u-3)^2"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col, fontFamily: mathFont }}>{fmt((uVal - 3) * (uVal - 3))}</div>
        </div>
      </div>

      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"x"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{fmt(xVal)}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${isExact ? C.ok + "66" : isNear ? C.assum + "66" : col + "44"}`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}><Tex>{"4^x - 6{\\cdot}2^x + 10"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col, fontFamily: mathFont, transition: "color 0.3s" }}>{fmt(exprVal)}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Min</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.white, fontFamily: mathFont }}>1</div>
        </div>
      </div>

      {/* Banner */}
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>
            At <Tex>{"x = \\log_2 3"}</Tex>, <Tex>{"u = 3"}</Tex> and <Tex>{"(u-3)^2 + 1 = 0 + 1 = 1"}</Tex>. The minimum value is <Tex>{"1"}</Tex>. The answer is D.
          </span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>
            Close! Expression {"\u2248"} <Tex>{fmt(exprVal)}</Tex>. Tap <Tex>{"x = \\log_2 3"}</Tex> to check the exact minimum.
          </span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>
            <Tex>{`u = ${fmt(uVal)}`}</Tex>, expression = <Tex>{fmt(exprVal)}</Tex>. Slide <Tex>{"x"}</Tex> to find the minimum.
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
