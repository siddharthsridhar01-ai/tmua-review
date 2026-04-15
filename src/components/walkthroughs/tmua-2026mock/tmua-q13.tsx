"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 13, paper: "Paper 1", year: "2026 Mock", topicTag: "Piecewise Integration / Summation" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "15", text: "15", ok: false, expl: "You might get 15 by summing 1 + 3 + 5 + 7 = 16 (four terms, missing the fifth) or by an off-by-one error using n = 1 to 5 instead of n = 0 to 4." },
  { letter: "B", tex: "20", text: "20", ok: false, expl: "You might get 20 by computing 2n instead of 2n + 1 for each interval: 0 + 2 + 4 + 6 + 8 = 20. But the formula gives 2n + 1, not 2n." },
  { letter: "C", tex: "25", text: "25", ok: true, expl: "Split \u222B\u2080\u2075 into five unit intervals. Each gives 2n + 1 for n = 0, 1, 2, 3, 4: that is 1 + 3 + 5 + 7 + 9 = 25." },
  { letter: "D", tex: "30", text: "30", ok: false, expl: "You might get 30 by using n = 0 to 5 (six terms) instead of n = 0 to 4. The integral to 5 uses n = 0, 1, 2, 3, 4 only (five intervals, not six)." },
  { letter: "E", tex: "35", text: "35", ok: false, expl: "You might get 35 by using n = 1 to 5 and computing 2n + 1: 3 + 5 + 7 + 9 + 11 = 35. But n starts at 0 (\u222B\u2080\u00B9), not at 1." },
  { letter: "F", tex: "50", text: "50", ok: false, expl: "You might get 50 by doubling the correct answer, perhaps by mistakenly summing both 2n + 1 and the integral again." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q13</span>
        The function <Tex>{"f"}</Tex> is such that, for every integer <Tex>{"n \\ge 0"}</Tex>, <Tex>{"\\displaystyle\\int_n^{n+1} f(x)\\,dx = 2n + 1"}</Tex>. Evaluate <Tex>{"\\displaystyle\\int_0^5 f(x)\\,dx."}</Tex>
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","15"],["B","20"],["C","25"],["D","30"],["E","35"],["F","50"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 13</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The function <Tex>{"f"}</Tex> is such that, for every integer <Tex>{"n \\ge 0"}</Tex>,</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"\\int_n^{n+1} f(x)\\,dx = 2n + 1"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 10px" }}>Evaluate the integral from <Tex>{"0"}</Tex> to <Tex>{"5"}</Tex> of <Tex>{"f(x)\\,dx"}</Tex>.</p>
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
        <p style={{ margin: 0 }}>Split <Tex>{"\\int_0^5 f(x)\\,dx"}</Tex> into five consecutive unit-width integrals. Each piece is given by the formula <Tex>{"2n + 1"}</Tex>, so just evaluate and add them up.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The integral from <Tex>{"0"}</Tex> to <Tex>{"5"}</Tex> covers <Tex>{"5"}</Tex> unit intervals: <Tex>{"[0,1], [1,2], [2,3], [3,4], [4,5]"}</Tex>.</p>
        <p style={{ margin: 0 }}>These correspond to <Tex>{"n = 0, 1, 2, 3, 4"}</Tex> (not <Tex>{"n = 1"}</Tex> to <Tex>{"5"}</Tex>). The values <Tex>{"2n+1"}</Tex> are the first <Tex>{"5"}</Tex> odd numbers: <Tex>{"1, 3, 5, 7, 9"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Split the integral at each integer to use the given formula on each piece.</span>,
      math: (<div><Tex>{"\\int_0^5 f(x)\\,dx = \\int_0^1 f(x)\\,dx + \\int_1^2 f(x)\\,dx + \\int_2^3 f(x)\\,dx + \\int_3^4 f(x)\\,dx + \\int_4^5 f(x)\\,dx"}</Tex></div>), },
    { label: "EVALUATE EACH PIECE", color: C.calc,
      text: <span>Substitute <Tex>{"n = 0, 1, 2, 3, 4"}</Tex> into <Tex>{"2n + 1"}</Tex>.</span>,
      math: (<><div><Tex>{"n = 0: \\quad \\int_0^1 f(x)\\,dx = 2(0) + 1 = 0 + 1 = 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"n = 1: \\quad \\int_1^2 f(x)\\,dx = 2(1) + 1 = 2 + 1 = 3"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"n = 2: \\quad \\int_2^3 f(x)\\,dx = 2(2) + 1 = 4 + 1 = 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"n = 3: \\quad \\int_3^4 f(x)\\,dx = 2(3) + 1 = 6 + 1 = 7"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"n = 4: \\quad \\int_4^5 f(x)\\,dx = 2(4) + 1 = 8 + 1 = 9"}</Tex></div></>), },
    { label: "SUM THE PIECES", color: C.calc,
      text: <span>Add all five values.</span>,
      math: (<><div><Tex>{"1 + 3 + 5 + 7 + 9"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= (1 + 9) + (3 + 7) + 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 10 + 10 + 5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 25"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The integral evaluates to <Tex>{"25"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\int_0^5 f(x)\\,dx = 1 + 3 + 5 + 7 + 9 = 25}"}</Tex></div>),
      conclusion: <span><Tex>{"\\int_0^5 f(x)\\,dx = 25"}</Tex>. The answer is C.</span>, },
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
  const [numIntervals, setNumIntervals] = useState(1);
  const vals = [1, 3, 5, 7, 9];
  const cumSum = vals.reduce((acc, v, i) => { acc.push((acc[i - 1] || 0) + v); return acc; }, []);
  const currentSum = cumSum[numIntervals - 1];
  const target = 25;
  const isExact = numIntervals === 5;
  const isNear = !isExact && numIntervals === 4;
  const isHit = isExact || isNear;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "n1", jsx: <span><Tex>{"N = 1"}</Tex></span>, val: 1 },
    { label: "n3", jsx: <span><Tex>{"N = 3"}</Tex></span>, val: 3 },
    { label: "n5", jsx: <span><Tex>{"N = 5"}</Tex></span>, val: 5 },
  ];

  const barGraph = (() => {
    const pW = 500, pH = 220;
    const pad = { l: 40, r: 16, t: 20, b: 32 };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const barW = gW / 5 - 6;
    const yMax = 10;
    const sx = (i) => pad.l + (gW / 5) * i + 3;
    const sy = (y) => pad.t + gH - (y / yMax) * gH;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><filter x="-0.06" y="-0.15" width="1.12" height="1.35" id="lb"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter></defs>
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        {[2, 4, 6, 8].map(y => <line key={y} x1={pad.l} y1={sy(y)} x2={pW - pad.r} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />)}
        {vals.map((v, i) => {
          const active = i < numIntervals;
          const barCol = active ? (isExact ? C.ok : C.ps) : C.border;
          return (<g key={i}>
            <rect x={sx(i)} y={sy(v)} width={barW} height={sy(0) - sy(v)} rx={4} fill={active ? barCol + "44" : "#1e2030"} stroke={barCol} strokeWidth={1.5} />
            {active && <foreignObject x={sx(i) + barW / 2 - 22} y={sy(v) - 6 - 12} width={44} height={16}><div style={{ fontSize: 11, color: barCol, textAlign: "center", lineHeight: 1 }}><Tex>{String(v)}</Tex></div></foreignObject>}
            <foreignObject x={sx(i) + barW / 2 - 30} y={pH - pad.b + 14 - 12} width={60} height={18}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1, fontFamily: mathFont, fontWeight: 400, fontStyle: "normal" }}>[{i},{i + 1}]</div></foreignObject>
          </g>);
        })}
        {[2, 4, 6, 8].map(y => <foreignObject x={pad.l - 8 - 48} y={sy(y) + 4 - 12} width={50} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "right", lineHeight: 1 }}><Tex>{String(y)}</Tex></div></foreignObject>)}
        <foreignObject x={pW / 2 - 24} y={pad.t - 4 - 12} width={48} height={16}><div style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1 }}><Tex>{"Each bar = 2n + 1"}</Tex></div></foreignObject>
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Slide <Tex>{"N"}</Tex> to control how many unit intervals are included</p>
        <p style={{ margin: "0 0 4px" }}>2. Each bar shows the integral <Tex>{"\\int_n^{n+1} f(x)\\,dx = 2n + 1"}</Tex></p>
        <p style={{ margin: 0 }}>3. At <Tex>{"N = 5"}</Tex>, all five bars add to the total</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}>Intervals included</span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{numIntervals}</span>
        </div>
        <input type="range" min={1} max={5} step={1} value={numIntervals} onChange={e => setNumIntervals(+e.target.value)} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = numIntervals === pr.val; return (<button key={pr.label} onClick={() => setNumIntervals(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active && isHit ? C.ok : active ? C.ps : C.border}`, background: active && isHit ? C.ok + "15" : active ? C.ps + "15" : C.card, color: active ? (isHit ? C.ok : C.ps) : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ background: "#1e2030", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <div><Tex>{`\\color{#e2e2e8}{\\int_0^{${numIntervals}} f(x)\\,dx = ${vals.slice(0, numIntervals).join(" + ")}}`}</Tex></div>
          <div style={{ marginTop: 6 }}><Tex>{`\\color{${col}}{= ${currentSum}}`}</Tex></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Intervals</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{numIntervals}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Running sum</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col, fontFamily: mathFont, transition: "color 0.3s" }}>{currentSum}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}66`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Target</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>25</div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{barGraph}</div>
      {isHit ? (
        isExact ? (
          <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>All <Tex>{"5"}</Tex> intervals: <Tex>{"1 + 3 + 5 + 7 + 9 = 25"}</Tex>. The answer is C.</span>
          </div>
        ) : (
          <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! Sum so far is <Tex>{`${currentSum}`}</Tex>. Tap <Tex>{"N = 5"}</Tex> to include all intervals.</span>
          </div>
        )
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}><Tex>{`\\int_0^{${numIntervals}} f(x)\\,dx = ${currentSum}`}</Tex>. Slide to <Tex>{"N = 5"}</Tex> for the full integral.</span>
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
