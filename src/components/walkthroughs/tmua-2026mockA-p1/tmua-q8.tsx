"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 8, paper: "Set A Paper 1", year: "2026 Mock", topicTag: "Geometric Series / Index Laws" };

const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "2^5", text: "32", ok: false, expl: "You might get 2\u2075 = 32 by computing r\u2075 instead of r\u00B9\u2070. The ratio of S\u2082\u2080 \u2212 S\u2081\u2080 to S\u2081\u2080 involves r\u00B9\u2070, not r\u2075." },
  { letter: "B", tex: "2^{10}", text: "1024", ok: true, expl: "S\u2082\u2080 \u2212 S\u2081\u2080 = ar\u00B9\u2070(r\u00B9\u2070 \u2212 1)/(r \u2212 1), and S\u2081\u2080 = a(r\u00B9\u2070 \u2212 1)/(r \u2212 1). Dividing gives k = r\u00B9\u2070. Smallest r > 1 integer is r = 2, so k = 2\u00B9\u2070 = 1024." },
  { letter: "C", tex: "2^{15}", text: "32768", ok: false, expl: "You might get 2\u00B9\u2075 by incorrectly computing the ratio as r\u00B9\u2075 or r\u2082\u2080/r\u2075." },
  { letter: "D", tex: "2^{20}", text: "1048576", ok: false, expl: "You might get 2\u00B2\u2070 by computing r\u00B2\u2070 instead of r\u00B9\u2070. The key cancellation gives k = r\u00B9\u2070, not r\u00B2\u2070." },
  { letter: "E", tex: "2^{10}(2^{10} - 1)", text: "1047552", ok: false, expl: "You might get this by computing S\u2082\u2080 \u2212 S\u2081\u2080 without dividing by S\u2081\u2080, or by not fully cancelling the (r\u00B9\u2070 \u2212 1) factor." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q8</span>
        A geometric sequence has first term <Tex>{"a"}</Tex> and common ratio <Tex>{"r"}</Tex>, where <Tex>{"a"}</Tex> and <Tex>{"r"}</Tex> are positive integers and <Tex>{"r > 1"}</Tex>. It is given that <Tex>{"S_{20} - S_{10} = k \\cdot S_{10}"}</Tex> for some positive integer <Tex>{"k"}</Tex>. What is the smallest possible value of <Tex>{"k"}</Tex>?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","2^5"],["B","2^{10}"],["C","2^{15}"],["D","2^{20}"],["E","2^{10}(2^{10}-1)"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 8</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>A geometric sequence has first term <Tex>{"a"}</Tex> and common ratio <Tex>{"r"}</Tex>, where <Tex>{"a"}</Tex> and <Tex>{"r"}</Tex> are positive integers and <Tex>{"r > 1"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>It is given that</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}>
          <Tex>{"S_{20} - S_{10} = k \\cdot S_{10}"}</Tex>
        </MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>for some positive integer <Tex>{"k"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>What is the smallest possible value of <Tex>{"k"}</Tex>?</p>
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
        <p style={{ margin: 0 }}>Write <Tex>{"S_{20}"}</Tex> and <Tex>{"S_{10}"}</Tex> using the GP sum formula, compute <Tex>{"S_{20} - S_{10}"}</Tex>, divide by <Tex>{"S_{10}"}</Tex> to find <Tex>{"k"}</Tex> in terms of <Tex>{"r"}</Tex>, then minimise.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The first term <Tex>{"a"}</Tex> and the factor <Tex>{"(r^{10} - 1)"}</Tex> will cancel in the ratio, leaving <Tex>{"k"}</Tex> as a pure power of <Tex>{"r"}</Tex>.</p>
        <p style={{ margin: 0 }}>Since <Tex>{"k"}</Tex> must be a positive integer and <Tex>{"r \\ge 2"}</Tex>, the smallest <Tex>{"k"}</Tex> comes from the smallest <Tex>{"r"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    {
      label: "APPROACH", color: C.ps,
      text: <span>Express <Tex>{"S_{20} - S_{10}"}</Tex> and <Tex>{"S_{10}"}</Tex> using the GP sum formula, then divide to find <Tex>{"k"}</Tex>.</span>,
      math: (<div><Tex>{"S_n = \\frac{a(r^n - 1)}{r - 1}"}</Tex></div>),
    },
    {
      label: "COMPUTE S\u2082\u2080 \u2212 S\u2081\u2080", color: C.calc,
      text: <span>Write out both sums using the GP formula and subtract.</span>,
      math: (
        <>
          <div><Tex>{"S_{20} = \\frac{a(r^{20} - 1)}{r - 1}, \\qquad S_{10} = \\frac{a(r^{10} - 1)}{r - 1}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"S_{20} - S_{10} = \\frac{a(r^{20} - 1) - a(r^{10} - 1)}{r - 1}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"= \\frac{a(r^{20} - 1 - r^{10} + 1)}{r - 1} = \\frac{a(r^{20} - r^{10})}{r - 1}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"= \\frac{a \\cdot r^{10}(r^{10} - 1)}{r - 1}"}</Tex></div>
        </>
      ),
    },
    {
      label: "DIVIDE BY S\u2081\u2080", color: C.calc,
      text: <span>Since <Tex>{"S_{20} - S_{10} = k \\cdot S_{10}"}</Tex>, divide both sides by <Tex>{"S_{10}"}</Tex>.</span>,
      math: (
        <>
          <div><Tex>{"k = \\frac{S_{20} - S_{10}}{S_{10}} = \\frac{\\frac{a \\cdot r^{10}(r^{10} - 1)}{r - 1}}{\\frac{a(r^{10} - 1)}{r - 1}}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"= \\frac{a \\cdot r^{10}(r^{10} - 1)}{r - 1} \\times \\frac{r - 1}{a(r^{10} - 1)}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"\\text{The } a,\\; (r^{10}-1),\\; (r-1) \\text{ all cancel:}"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"\\color{#fdcb6e}{k = r^{10}}"}</Tex></div>
        </>
      ),
    },
    {
      label: "MINIMISE", color: C.calc,
      text: <span>Since <Tex>{"r"}</Tex> is a positive integer with <Tex>{"r > 1"}</Tex>, the smallest value is <Tex>{"r = 2"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#fdcb6e}{k = 2^{10} = 1024}"}</Tex></div>),
    },
    {
      label: "CONCLUSION", color: C.ok,
      text: <span>The smallest possible <Tex>{"k"}</Tex> is <Tex>{"2^{10}"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{k_{\\min} = 2^{10} = 1024}"}</Tex></div>),
      conclusion: <span>The smallest <Tex>{"k"}</Tex> is <Tex>{"2^{10} = 1024"}</Tex>. The answer is B.</span>,
    },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => {
          if (i > revealed) return null;
          return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><MathBox>{s.math}</MathBox>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>);
        })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [rVal, setRVal] = useState(2);
  const kVal = Math.pow(rVal, 10);
  const isSmallest = rVal === 2;

  const presets = [
    { label: "r2", jsx: <span><Tex>{"r = 2"}</Tex></span>, val: 2 },
    { label: "r3", jsx: <span><Tex>{"r = 3"}</Tex></span>, val: 3 },
    { label: "r4", jsx: <span><Tex>{"r = 4"}</Tex></span>, val: 4 },
    { label: "r5", jsx: <span><Tex>{"r = 5"}</Tex></span>, val: 5 },
  ];

  // Table of r values and corresponding k
  const rows = [2, 3, 4, 5].map(r => ({ r, k: Math.pow(r, 10), kTex: `${r}^{10} = ${Math.pow(r, 10).toLocaleString()}` }));

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. We showed <Tex>{"k = r^{10}"}</Tex>, independent of <Tex>{"a"}</Tex></p>
        <p style={{ margin: "0 0 4px" }}>2. Try different values of <Tex>{"r"}</Tex> to see how <Tex>{"k"}</Tex> grows</p>
        <p style={{ margin: 0 }}>3. The smallest <Tex>{"r > 1"}</Tex> gives the smallest <Tex>{"k"}</Tex></p>
      </InfoBox>

      {/* Presets */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {presets.map(pr => {
          const active = rVal === pr.val;
          const col = active && isSmallest ? C.ok : active ? C.ps : C.muted;
          return (<button key={pr.label} onClick={() => setRVal(pr.val)} style={{
            flex: 1, padding: "8px 4px", borderRadius: 7,
            border: `1px solid ${active ? col : C.border}`,
            background: active ? col + "15" : C.card,
            color: active ? col : C.muted,
            fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400,
          }}>{pr.jsx}</button>);
        })}
      </div>

      {/* Computation for selected r */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ background: "#1e2030", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
          <div><Tex>{`\\color{#e2e2e8}{k = r^{10} = ${rVal}^{10}}`}</Tex></div>
          <div style={{ marginTop: 6, fontSize: 18, fontWeight: 700 }}><Tex>{`\\color{${isSmallest ? C.ok : C.assum}}{= ${kVal.toLocaleString()}}`}</Tex></div>
        </div>
      </div>

      {/* Comparison table */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.ps, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Values of <Tex>{"k = r^{10}"}</Tex></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {rows.map(row => {
            const active = rVal === row.r;
            const isMin = row.r === 2;
            const col = isMin ? C.ok : C.muted;
            return (
              <div key={row.r} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: active ? (isMin ? C.conclBg : C.assumBg) : "#1e2030",
                border: `1px solid ${active ? col + "44" : C.border}`,
                borderRadius: 8, padding: "8px 12px", transition: "all 0.2s",
              }}>
                <div style={{ width: 50 }}><Tex>{`\\color{${active ? col : C.muted}}{r = ${row.r}}`}</Tex></div>
                <div style={{ flex: 1 }}><Tex>{`\\color{${active ? col : C.muted}}{k = ${row.r}^{10} = ${row.k.toLocaleString()}}`}</Tex></div>
                {isMin && <span style={{ fontSize: 12, color: C.ok, fontWeight: 700 }}>smallest</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"r"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{rVal}</div>
        </div>
        <div style={{ background: isSmallest ? C.conclBg : C.card, border: `1px solid ${isSmallest ? C.ok + "66" : C.ps + "44"}`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: isSmallest ? C.ok : C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{"k = r^{10}"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: isSmallest ? C.ok : C.ps, fontFamily: mathFont }}>{kVal.toLocaleString()}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}66`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}><Tex>{"k_{\\min}"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>1024</div>
        </div>
      </div>

      {/* Banner */}
      {isSmallest ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>
            At <Tex>{"r = 2"}</Tex>: <Tex>{"k = 2^{10} = 1024"}</Tex>. This is the smallest since any larger <Tex>{"r"}</Tex> gives <Tex>{"r^{10} > 2^{10}"}</Tex>. The answer is B.
          </span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>
            <Tex>{`r = ${rVal}`}</Tex> gives <Tex>{`k = ${kVal.toLocaleString()}`}</Tex>. Try <Tex>{"r = 2"}</Tex> to find the smallest <Tex>{"k"}</Tex>.
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
