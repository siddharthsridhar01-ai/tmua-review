"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 11, paper: "Set A Paper 1", year: "2026 Mock", topicTag: "Telescoping Series / Logarithms" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "-2", text: "\u22122", ok: false, expl: "A negative result would require log\u2081\u2080 of a number less than 1. But the telescoped sum is log\u2081\u2080(100) \u2212 log\u2081\u2080(1) = 2 \u2212 0 = 2, which is positive." },
  { letter: "B", tex: "-1", text: "\u22121", ok: false, expl: "You might get \u22121 by computing log\u2081\u2080(1/10) = \u22121, confusing the final term with the full sum." },
  { letter: "C", tex: "0", text: "0", ok: false, expl: "You might get 0 if you think the terms cancel completely. They telescope, but the first and last terms survive: log\u2081\u2080(100) \u2212 log\u2081\u2080(1) = 2." },
  { letter: "D", tex: "1", text: "1", ok: false, expl: "You might get 1 by evaluating log\u2081\u2080(10) instead of log\u2081\u2080(100). The sum telescopes to log\u2081\u2080(100), not log\u2081\u2080(10)." },
  { letter: "E", tex: "2", text: "2", ok: true, expl: "Using log(a/b) = log a \u2212 log b, the sum telescopes: log\u2081\u2080(2) \u2212 log\u2081\u2080(1) + log\u2081\u2080(3) \u2212 log\u2081\u2080(2) + \u2026 = log\u2081\u2080(100) \u2212 log\u2081\u2080(1) = 2." },
  { letter: "F", tex: "\\log_{10} 99", text: "log\u2081\u208099", ok: false, expl: "You might get log\u2081\u208099 by telescoping to log\u2081\u2080(100) \u2212 log\u2081\u2080(1) but then writing it as log\u2081\u208099 by confusing 100 \u2212 1 = 99 with log\u2081\u2080(100/1)." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q11</span>
        Evaluate <Tex>{"\\displaystyle\\sum_{n=1}^{99} \\log_{10}\\!\\left(\\tfrac{n+1}{n}\\right)"}</Tex>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","-2"],["B","-1"],["C","0"],["D","1"],["E","2"],["F","\\log_{10}99"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 11</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>Evaluate</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"\\sum_{n=1}^{99} \\log_{10}\\!\\left(\\frac{n+1}{n}\\right)"}</Tex></MathBox>
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (
          <div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 140px" }}>
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
        <p style={{ margin: 0 }}>Use the log quotient rule <Tex>{"\\log\\!\\left(\\tfrac{a}{b}\\right) = \\log a - \\log b"}</Tex> to split each term. The resulting sum telescopes: most terms cancel in consecutive pairs.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>After splitting, term <Tex>{"n"}</Tex> contributes <Tex>{"\\log_{10}(n+1) - \\log_{10}(n)"}</Tex>.</p>
        <p style={{ margin: 0 }}>In a telescoping sum, almost everything cancels. Only the very first subtracted term <Tex>{"\\log_{10}(1)"}</Tex> and the very last added term <Tex>{"\\log_{10}(100)"}</Tex> survive.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Split each log using the quotient rule, then recognise the telescoping pattern.</span>,
      math: (<div><Tex>{"\\log_{10}\\!\\left(\\frac{n+1}{n}\\right) = \\log_{10}(n+1) - \\log_{10}(n)"}</Tex></div>), },
    { label: "EXPAND THE SUM", color: C.calc,
      text: <span>Write out the first few and last few terms to see the cancellation.</span>,
      math: (<><div><Tex>{"\\bigl[\\log_{10}(2) - \\log_{10}(1)\\bigr] + \\bigl[\\log_{10}(3) - \\log_{10}(2)\\bigr] + \\bigl[\\log_{10}(4) - \\log_{10}(3)\\bigr] + \\cdots"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"\\cdots + \\bigl[\\log_{10}(100) - \\log_{10}(99)\\bigr]"}</Tex></div></>), },
    { label: "TELESCOPE", color: C.calc,
      text: <span>Each <Tex>{"\\log_{10}(k)"}</Tex> appears once with a <Tex>{"+"}</Tex> sign (from <Tex>{"n = k-1"}</Tex>) and once with a <Tex>{"-"}</Tex> sign (from <Tex>{"n = k"}</Tex>), so they cancel. Only the endpoints remain.</span>,
      math: (<><div><Tex>{"= \\log_{10}(100) - \\log_{10}(1)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 2 - 0 = 2"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The sum evaluates to <Tex>{"2"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\sum_{n=1}^{99} \\log_{10}\\!\\left(\\frac{n+1}{n}\\right) = 2}"}</Tex></div>),
      conclusion: <span>The sum telescopes to <Tex>{"\\log_{10}(100) - \\log_{10}(1) = 2"}</Tex>. The answer is E.</span>, },
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
  const [nVal, setNVal] = useState(5);
  const snapPoints = [1, 2, 3, 5, 9, 10, 20, 50, 99];
  const snapRadius = 1.5;
  const handleSlider = (raw) => { const rounded = Math.round(raw); for (const sp of snapPoints) { if (Math.abs(rounded - sp) < snapRadius) return sp; } return rounded; };

  const partialSum = (() => { let s = 0; for (let i = 1; i <= nVal; i++) s += Math.log10((i + 1) / i); return s; })();
  const target = 2;
  const isExact = nVal === 99;
  const isNear = !isExact && Math.abs(partialSum - target) < target * 0.05;
  const isHit = isExact || isNear;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "n5", jsx: <span><Tex>{"N = 5"}</Tex></span>, val: 5 },
    { label: "n10", jsx: <span><Tex>{"N = 10"}</Tex></span>, val: 10 },
    { label: "n50", jsx: <span><Tex>{"N = 50"}</Tex></span>, val: 50 },
    { label: "n99", jsx: <span><Tex>{"N = 99"}</Tex></span>, val: 99 },
  ];

  const graph = (() => {
    const pW = 500, pH = 240;
    const pad = { l: 40, r: 16, t: 20, b: 28 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const xMin = 0, xMax = 105, yMin = -0.2, yMax = 2.3;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * gH;
    const pts = [];
    let cumSum = 0;
    pts.push({ n: 0, s: 0 });
    for (let i = 1; i <= 99; i++) { cumSum += Math.log10((i + 1) / i); pts.push({ n: i, s: cumSum }); }
    const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.n).toFixed(1)},${sy(p.s).toFixed(1)}`).join("");
    const dotPt = pts[nVal] || pts[pts.length - 1];
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        {[0.5, 1, 1.5, 2].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={pad.l} y1={sy(2)} x2={pW - pad.r} y2={sy(2)} stroke={C.ok} strokeWidth={1} strokeDasharray="6,3" />
        <path d={pathD} fill="none" stroke={col} strokeWidth={2.5} />
        <circle cx={sx(dotPt.n)} cy={sy(dotPt.s)} r={6} fill={col} stroke={C.white} strokeWidth={1.5} />
        <text x={sx(dotPt.n)} y={sy(dotPt.s) - 12} textAnchor="middle" fill={C.white} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb)">({nVal}, {fmt(dotPt.s)})</text>
        <text x={pW - pad.r - 4} y={sy(2) + 14} textAnchor="end" fill={C.ok} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb)">target = 2</text>
        <text x={sx(50)} y={pad.t + 12} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont} filter="url(#lb)">Partial sum S(N)</text>
        {[10, 20, 50, 99].map(x => <text key={x} x={sx(x)} y={pH - pad.b + 14} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont}>{x}</text>)}
        {[0, 1, 2].map(y => <text key={y} x={pad.l - 8} y={sy(y) + 4} textAnchor="end" fill={C.muted} fontSize={11} fontFamily={mathFont}>{y}</text>)}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Slide <Tex>{"N"}</Tex> to control the upper limit of the partial sum <Tex>{"S(N) = \\sum_{n=1}^{N} \\log_{10}\\!\\left(\\tfrac{n+1}{n}\\right)"}</Tex></p>
        <p style={{ margin: "0 0 4px" }}>2. Watch the sum telescope: <Tex>{"S(N) = \\log_{10}(N+1) - \\log_{10}(1) = \\log_{10}(N+1)"}</Tex></p>
        <p style={{ margin: 0 }}>3. At <Tex>{"N = 99"}</Tex>, the sum reaches <Tex>{"\\log_{10}(100) = 2"}</Tex></p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}><Tex>{"N"}</Tex></span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{nVal}</span>
        </div>
        <input type="range" min={1} max={99} step={1} value={nVal} onChange={e => setNVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = nVal === pr.val; return (<button key={pr.label} onClick={() => setNVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active && isHit ? C.ok : active ? C.ps : C.border}`, background: active && isHit ? C.ok + "15" : active ? C.ps + "15" : C.card, color: active ? (isHit ? C.ok : C.ps) : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ background: "#1e2030", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <div><Tex>{`\\color{#e2e2e8}{S(${nVal}) = \\log_{10}(${nVal + 1}) - \\log_{10}(1) = \\log_{10}(${nVal + 1})}`}</Tex></div>
          <div style={{ marginTop: 6 }}><Tex>{`\\color{${col}}{S(${nVal}) = ${fmt(partialSum, 4)}}`}</Tex></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"N"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{nVal}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}><Tex>{"S(N)"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col, fontFamily: mathFont, transition: "color 0.3s" }}>{fmt(partialSum, 4)}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}66`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Target</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>2</div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {isHit ? (
        isExact ? (
          <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>At <Tex>{"N = 99"}</Tex>: <Tex>{"S = \\log_{10}(100) = 2"}</Tex>. The sum telescopes perfectly. The answer is E.</span>
          </div>
        ) : (
          <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! <Tex>{`S(${nVal}) \\approx ${fmt(partialSum, 4)}`}</Tex>. Tap <Tex>{"N = 99"}</Tex> to see the exact result.</span>
          </div>
        )
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}><Tex>{`S(${nVal}) = ${fmt(partialSum, 4)}`}</Tex>. Slide to <Tex>{"N = 99"}</Tex> to reach the answer.</span>
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
