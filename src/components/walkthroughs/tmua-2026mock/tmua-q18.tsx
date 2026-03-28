"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 18, paper: "Paper 1", year: "2026 Mock", topicTag: "Geometric Series / Probability" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "\\tfrac{1}{7}", text: "1/7", ok: false, expl: "You might get 1/7 if you only count k = 3 (where S = 50). But k = 2 also gives S = 50/4 = 12.5 > 8, so two values work." },
  { letter: "B", tex: "\\tfrac{2}{7}", text: "2/7", ok: true, expl: "S = 50/(10 \u2212 3k). For S > 8: k > 5/4, so k \u2265 2. The values k = 2 (S = 12.5) and k = 3 (S = 50) both satisfy S > 8. Probability = 2/7." },
  { letter: "C", tex: "\\tfrac{3}{7}", text: "3/7", ok: false, expl: "You might get 3/7 by including k = 1 where S = 50/7 \u2248 7.14. But 7.14 is not greater than 8, so k = 1 doesn't count." },
  { letter: "D", tex: "\\tfrac{4}{7}", text: "4/7", ok: false, expl: "You might get 4/7 by including k = 0 and k = 1 alongside k = 2 and k = 3. But S(0) = 5 and S(1) = 50/7 \u2248 7.14, neither exceeds 8." },
  { letter: "E", tex: "\\tfrac{5}{7}", text: "5/7", ok: false, expl: "You might get 5/7 by counting all values where S is finite and positive (k = \u22123 to 3, all 7 converge) minus 2, but the condition is S > 8, not just S finite." },
  { letter: "F", tex: "\\tfrac{6}{7}", text: "6/7", ok: false, expl: "You might get 6/7 by miscounting: all 7 values converge but only 2 give S > 8, so 6/7 is too large." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q18</span>
        You are given that <Tex>{"S = 5 + 5\\!\\left(\\tfrac{3k}{10}\\right) + 5\\!\\left(\\tfrac{3k}{10}\\right)^{\\!2} + \\cdots"}</Tex> The integer <Tex>{"k"}</Tex> is chosen uniformly at random from <Tex>{"-3 \\le k \\le 3"}</Tex>. What is the probability that <Tex>{"S"}</Tex> is a finite number greater than <Tex>{"8"}</Tex>?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","\\tfrac{1}{7}"],["B","\\tfrac{2}{7}"],["C","\\tfrac{3}{7}"],["D","\\tfrac{4}{7}"],["E","\\tfrac{5}{7}"],["F","\\tfrac{6}{7}"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 18</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>You are given that</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex>{"S = 5 + 5\\!\\left(\\frac{3k}{10}\\right) + 5\\!\\left(\\frac{3k}{10}\\right)^{\\!2} + \\cdots"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>The integer <Tex>{"k"}</Tex> is chosen uniformly at random from <Tex>{"-3 \\le k \\le 3"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>What is the probability that <Tex>{"S"}</Tex> is a finite number greater than <Tex>{"8"}</Tex>?</p>
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
        <p style={{ margin: 0 }}>This is a geometric series with first term <Tex>{"a = 5"}</Tex> and common ratio <Tex>{"r = \\tfrac{3k}{10}"}</Tex>. Use the sum formula <Tex>{"S = \\tfrac{a}{1-r}"}</Tex> (valid when <Tex>{"|r| < 1"}</Tex>), then check which values of <Tex>{"k"}</Tex> make <Tex>{"S"}</Tex> both finite and greater than <Tex>{"8"}</Tex>.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>For integer <Tex>{"k"}</Tex> with <Tex>{"-3 \\le k \\le 3"}</Tex>, there are <Tex>{"7"}</Tex> equally likely values. The common ratio is <Tex>{"r = \\tfrac{3k}{10}"}</Tex>, so <Tex>{"|r| = \\tfrac{3|k|}{10} \\le \\tfrac{9}{10} < 1"}</Tex> for all <Tex>{"7"}</Tex> values. So <Tex>{"S"}</Tex> is always finite.</p>
        <p style={{ margin: 0 }}>The real question is: for which <Tex>{"k"}</Tex> is <Tex>{"S > 8"}</Tex>?</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Identify the geometric series, find its sum in closed form, then test each value of <Tex>{"k"}</Tex>.</span>,
      math: (<div><Tex>{"S = \\frac{a}{1 - r} = \\frac{5}{1 - \\frac{3k}{10}} \\quad \\text{when } |r| = \\left|\\frac{3k}{10}\\right| < 1"}</Tex></div>), },
    { label: "SIMPLIFY THE SUM", color: C.calc,
      text: <span>Simplify the fraction.</span>,
      math: (<><div><Tex>{"S = \\frac{5}{1 - \\frac{3k}{10}} = \\frac{5}{\\frac{10 - 3k}{10}} = \\frac{5 \\times 10}{10 - 3k} = \\frac{50}{10 - 3k}"}</Tex></div></>), },
    { label: "CHECK CONVERGENCE", color: C.calc,
      text: <span>The series converges when <Tex>{"|r| < 1"}</Tex>. Check the range of <Tex>{"r"}</Tex> for <Tex>{"-3 \\le k \\le 3"}</Tex>.</span>,
      math: (<><div><Tex>{"|r| = \\frac{3|k|}{10} \\le \\frac{3 \\times 3}{10} = \\frac{9}{10} < 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{So } S \\text{ is finite for all } 7 \\text{ values of } k."}</Tex></div></>), },
    { label: "SOLVE S > 8", color: C.calc,
      text: <span>Set <Tex>{"\\tfrac{50}{10 - 3k} > 8"}</Tex> and solve for <Tex>{"k"}</Tex>. Since <Tex>{"10 - 3k > 0"}</Tex> for all <Tex>{"k \\le 3"}</Tex>, we can multiply both sides.</span>,
      math: (<><div><Tex>{"\\frac{50}{10 - 3k} > 8"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"50 > 8(10 - 3k)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"50 > 80 - 24k"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"24k > 80 - 50"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"24k > 30"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"k > \\frac{30}{24} = \\frac{5}{4} = 1.25"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Since } k \\text{ is an integer: } k \\ge 2"}</Tex></div></>), },
    { label: "COUNT AND VERIFY", color: C.calc,
      text: <span>The values <Tex>{"k = 2"}</Tex> and <Tex>{"k = 3"}</Tex> satisfy <Tex>{"k \\ge 2"}</Tex> and <Tex>{"-3 \\le k \\le 3"}</Tex>. Verify:</span>,
      math: (<><div><Tex>{"k = 2: \\quad S = \\frac{50}{10 - 6} = \\frac{50}{4} = 12.5 > 8 \\;\\checkmark"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"k = 3: \\quad S = \\frac{50}{10 - 9} = \\frac{50}{1} = 50 > 8 \\;\\checkmark"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"k = 1: \\quad S = \\frac{50}{10 - 3} = \\frac{50}{7} \\approx 7.14 < 8 \\;\\times"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span><Tex>{"2"}</Tex> values out of <Tex>{"7"}</Tex> give <Tex>{"S > 8"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{P(S > 8) = \\frac{2}{7}}"}</Tex></div>),
      conclusion: <span><Tex>{"2"}</Tex> values (<Tex>{"k = 2"}</Tex> and <Tex>{"k = 3"}</Tex>) out of <Tex>{"7"}</Tex> give <Tex>{"S > 8"}</Tex>. The answer is B.</span>, },
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
  const [checked, setChecked] = useState({});
  const kVals = [-3, -2, -1, 0, 1, 2, 3];
  const getS = (k) => { const denom = 10 - 3 * k; return denom === 0 ? Infinity : 50 / denom; };
  const getR = (k) => 3 * k / 10;
  const allChecked = kVals.every(k => checked[k]);
  const successCount = kVals.filter(k => checked[k] && getS(k) > 8 && isFinite(getS(k))).length;

  const exactFracs = { "-3": "\\tfrac{50}{19}", "-2": "\\tfrac{50}{16} = \\tfrac{25}{8}", "-1": "\\tfrac{50}{13}", "0": "\\tfrac{50}{10} = 5", "1": "\\tfrac{50}{7}", "2": "\\tfrac{50}{4} = 12.5", "3": "\\tfrac{50}{1} = 50" };

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Tap each value of <Tex>{"k"}</Tex> to compute <Tex>{"S = \\tfrac{50}{10 - 3k}"}</Tex></p>
        <p style={{ margin: "0 0 4px" }}>2. Check whether <Tex>{"S"}</Tex> is finite and greater than <Tex>{"8"}</Tex></p>
        <p style={{ margin: 0 }}>3. Count the successes out of <Tex>{"7"}</Tex> equally likely values</p>
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
        {kVals.map(k => {
          const tested = checked[k];
          const sVal = getS(k);
          const rVal = getR(k);
          const finite = isFinite(sVal);
          const gt8 = finite && sVal > 8;
          const col = tested ? (gt8 ? C.ok : C.fail) : C.muted;
          return (
            <div key={k} onClick={() => setChecked(p => ({ ...p, [k]: true }))} style={{ background: tested ? (gt8 ? C.conclBg : C.failBg) : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10, cursor: tested ? "default" : "pointer", transition: "all 0.3s" }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: col, minWidth: 24, textAlign: "center" }}>{tested ? (gt8 ? "\u2713" : "\u2717") : "\u2013"}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: col }}><Tex>{`k = ${k}`}</Tex>{tested && <span style={{ fontWeight: 400, marginLeft: 8, color: C.text }}><Tex>{`r = ${rVal < 0 ? fmt(rVal) : fmt(rVal)},\\; S = ${exactFracs[String(k)]}`}</Tex></span>}</div>
                {tested && <div style={{ fontSize: 13, color: col, marginTop: 2 }}>{gt8 ? <span><Tex>{`S = ${fmt(sVal)} > 8`}</Tex> {"\u2714"}</span> : <span><Tex>{`S = ${fmt(sVal)} \\le 8`}</Tex></span>}</div>}
                {!tested && <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Tap to evaluate</div>}
              </div>
            </div>
          );
        })}
      </div>
      {allChecked ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}><Tex>{`${successCount}`}</Tex> values give <Tex>{"S > 8"}</Tex> out of <Tex>{"7"}</Tex>. Probability <Tex>{"= \\tfrac{2}{7}"}</Tex>. The answer is B.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Tap each value of <Tex>{"k"}</Tex> to test. {Object.keys(checked).length} of 7 checked so far.</span>
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
