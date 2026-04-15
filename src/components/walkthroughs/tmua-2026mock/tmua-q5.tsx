"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 5, paper: "Paper 1", year: "2026 Mock", topicTag: "Recurrence Relations" };

const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "-5", text: "\u22125", ok: false, expl: "You might get \u22125 by making a sign error when solving for p and q, perhaps getting p = \u221214 and q = \u22122." },
  { letter: "B", tex: "-\\tfrac{5}{3}", text: "\u22125/3", ok: false, expl: "You might get \u22125/3 by swapping p and q (using p = 2, q = 14), which gives a different recurrence." },
  { letter: "C", tex: "\\tfrac{11}{5}", text: "11/5", ok: false, expl: "You might get 11/5 by computing x₄ = (3 + p)/(3 + q) with the wrong values of p or q." },
  { letter: "D", tex: "\\tfrac{29}{9}", text: "29/9", ok: true, expl: "From x₁ = 2 \u2192 x₂ = 4 and x₂ = 4 \u2192 x₃ = 3, we get p = 14, q = 2. Then x₄ = 17/5, and x₅ = (17/5 + 14)/(17/5 + 2) = (87/5)/(27/5) = 29/9." },
  { letter: "E", tex: "\\tfrac{17}{3}", text: "17/3", ok: false, expl: "You might get 17/3 by computing x₄ = 17/5 and then mistakenly using (17/5 + 14)/(17/5) = 87/17 or a similar error." },
  { letter: "F", tex: "13", text: "13", ok: false, expl: "You might get 13 by computing (3 + 14)/(3 + 2) = 17/5 and then rounding or misreading 87/27 as a larger value." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q5</span>
        The terms <Tex>{"x_n"}</Tex> of a sequence follow the rule <Tex>{"x_{n+1} = \\dfrac{x_n + p}{x_n + q}"}</Tex> where <Tex>{"p"}</Tex> and <Tex>{"q"}</Tex> are real numbers. Given that <Tex>{"x_1 = 2"}</Tex>, <Tex>{"x_2 = 4"}</Tex>, and <Tex>{"x_3 = 3"}</Tex>, find the value of <Tex>{"x_5"}</Tex>.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","-5"],["B","-\\tfrac{5}{3}"],["C","\\tfrac{11}{5}"],["D","\\tfrac{29}{9}"],["E","\\tfrac{17}{3}"],["F","13"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 5</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The terms <Tex>{"x_n"}</Tex> of a sequence follow the rule</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}>
          <Tex>{"x_{n+1} = \\frac{x_n + p}{x_n + q}"}</Tex>
        </MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 6px" }}>where <Tex>{"p"}</Tex> and <Tex>{"q"}</Tex> are real numbers.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>Given that <Tex>{"x_1 = 2"}</Tex>, <Tex>{"x_2 = 4"}</Tex>, and <Tex>{"x_3 = 3"}</Tex>, find the value of <Tex>{"x_5"}</Tex>.</p>
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
        <p style={{ margin: 0 }}>Use the known terms <Tex>{"x_1, x_2, x_3"}</Tex> to form two simultaneous equations in <Tex>{"p"}</Tex> and <Tex>{"q"}</Tex>. Solve for <Tex>{"p"}</Tex> and <Tex>{"q"}</Tex>, then iterate the recurrence to find <Tex>{"x_4"}</Tex> and <Tex>{"x_5"}</Tex>.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Each pair of consecutive terms gives one equation. With <Tex>{"x_1 \\to x_2"}</Tex> and <Tex>{"x_2 \\to x_3"}</Tex>, you get two equations in two unknowns.</p>
        <p style={{ margin: 0 }}>Keep fractions exact throughout. Do not use decimals. The answer is a clean fraction.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    {
      label: "APPROACH", color: C.ps,
      text: <span>Use two consecutive pairs to find <Tex>{"p"}</Tex> and <Tex>{"q"}</Tex>, then iterate the recurrence twice more to reach <Tex>{"x_5"}</Tex>.</span>,
      math: (<div><Tex>{"x_{n+1} = \\frac{x_n + p}{x_n + q} \\quad \\Rightarrow \\quad x_{n+1}(x_n + q) = x_n + p"}</Tex></div>),
    },
    {
      label: "FORM EQUATIONS", color: C.calc,
      text: <span>From <Tex>{"x_1 = 2 \\to x_2 = 4"}</Tex> and <Tex>{"x_2 = 4 \\to x_3 = 3"}</Tex>.</span>,
      math: (
        <>
          <div><Tex>{"4 = \\frac{2 + p}{2 + q} \\;\\Rightarrow\\; 2 + p = 8 + 4q \\;\\Rightarrow\\; p = 6 + 4q \\quad \\text{\\color{#e2e2e8}{(i)}}"}</Tex></div>
          <div style={{ marginTop: 6 }}><Tex>{"3 = \\frac{4 + p}{4 + q} \\;\\Rightarrow\\; 4 + p = 12 + 3q \\;\\Rightarrow\\; p = 8 + 3q \\quad \\text{\\color{#e2e2e8}{(ii)}}"}</Tex></div>
        </>
      ),
    },
    {
      label: "SOLVE FOR p AND q", color: C.calc,
      text: <span>Equate (i) and (ii).</span>,
      math: (
        <>
          <div><Tex>{"6 + 4q = 8 + 3q"}</Tex></div>
          <div style={{ marginTop: 4 }}><Tex>{"\\color{#fdcb6e}{q = 2, \\quad p = 6 + 8 = 14}"}</Tex></div>
        </>
      ),
    },
    {
      label: "COMPUTE x\u2084 AND x\u2085", color: C.calc,
      text: <span>Iterate the recurrence with <Tex>{"p = 14"}</Tex> and <Tex>{"q = 2"}</Tex>.</span>,
      math: (
        <>
          <div><Tex>{"x_4 = \\frac{x_3 + 14}{x_3 + 2} = \\frac{3 + 14}{3 + 2} = \\frac{17}{5}"}</Tex></div>
          <div style={{ marginTop: 6 }}><Tex>{"x_5 = \\frac{x_4 + 14}{x_4 + 2} = \\frac{\\frac{17}{5} + 14}{\\frac{17}{5} + 2} = \\frac{\\frac{17 + 70}{5}}{\\frac{17 + 10}{5}} = \\frac{\\frac{87}{5}}{\\frac{27}{5}} = \\frac{87}{27} = \\color{#fdcb6e}{\\frac{29}{9}}"}</Tex></div>
        </>
      ),
    },
    {
      label: "CONCLUSION", color: C.ok,
      text: <span><Tex>{"x_5 = \\tfrac{29}{9}"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{x_5 = \\frac{29}{9}}"}</Tex></div>),
      conclusion: <span><Tex>{"x_5 = \\tfrac{29}{9}"}</Tex>. The answer is D.</span>,
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
  const [showN, setShowN] = useState(3); // how many terms to reveal (x1..xN)
  const p = 14, q = 2;

  // Compute all terms as exact fractions (num/den)
  const terms = [{ n: 1, num: 2, den: 1 }];
  for (let i = 1; i < 5; i++) {
    const prev = terms[i - 1];
    const newNum = prev.num + p * prev.den; // x_n + p as fraction
    const newDen = prev.num + q * prev.den; // x_n + q as fraction
    // Simplify with GCD
    const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
    const g = gcd(newNum, newDen);
    terms.push({ n: i + 1, num: newNum / g, den: newDen / g });
  }

  const frac = (t) => t.den === 1 ? String(t.num) : `\\tfrac{${t.num}}{${t.den}}`;
  const decimal = (t) => fmt(t.num / t.den);
  const isTarget = showN >= 5;

  const presets = [
    { label: "n3", jsx: <span><Tex>{"x_1"}</Tex> to <Tex>{"x_3"}</Tex></span>, val: 3 },
    { label: "n4", jsx: <span><Tex>{"x_1"}</Tex> to <Tex>{"x_4"}</Tex></span>, val: 4 },
    { label: "n5", jsx: <span><Tex>{"x_1"}</Tex> to <Tex>{"x_5"}</Tex></span>, val: 5 },
  ];

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. We found <Tex>{"p = 14"}</Tex> and <Tex>{"q = 2"}</Tex>, so the recurrence is <Tex>{"x_{n+1} = \\tfrac{x_n + 14}{x_n + 2}"}</Tex></p>
        <p style={{ margin: "0 0 4px" }}>2. Tap to reveal each new term computed from the previous one</p>
        <p style={{ margin: 0 }}>3. Check that <Tex>{"x_5 = \\tfrac{29}{9}"}</Tex></p>
      </InfoBox>

      {/* Parameters display */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}><Tex>{"p"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>14</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}><Tex>{"q"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>2</div>
        </div>
      </div>

      {/* Presets */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {presets.map(pr => {
          const active = showN === pr.val;
          return (<button key={pr.label} onClick={() => setShowN(pr.val)} style={{
            flex: 1, padding: "8px 4px", borderRadius: 7,
            border: `1px solid ${active ? (pr.val === 5 ? C.ok : C.ps) : C.border}`,
            background: active ? (pr.val === 5 ? C.ok : C.ps) + "15" : C.card,
            color: active ? (pr.val === 5 ? C.ok : C.ps) : C.muted,
            fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400,
          }}>{pr.jsx}</button>);
        })}
      </div>

      {/* Term cards */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {terms.slice(0, showN).map((t, i) => {
            const given = i < 3; // x1, x2, x3 are given
            const isAnswer = t.n === 5;
            const col = isAnswer ? C.ok : given ? C.muted : C.assum;
            const bgCol = isAnswer ? C.conclBg : given ? "#1e2030" : C.assumBg;
            return (
              <div key={t.n} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: bgCol, border: `1px solid ${col}44`,
                borderRadius: 10, padding: "10px 14px",
                transition: "all 0.3s",
              }}>
                <div style={{ width: 36, textAlign: "center" }}>
                  <Tex>{`\\color{${col}}{x_${t.n}}`}</Tex>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: mathFont, flex: 1 }}>
                  <Tex>{`\\color{${col}}{${frac(t)}}`}</Tex>
                  {t.den !== 1 && <span style={{ fontSize: 13, color: C.muted, marginLeft: 8 }}>= {decimal(t)}</span>}
                </div>
                {i > 0 && !given && (
                  <div style={{ fontSize: 12, textAlign: "right" }}>
                    <Tex>{`\\color{${C.muted}}{\\tfrac{${frac(terms[i-1])} + 14}{${frac(terms[i-1])} + 2}}`}</Tex>
                  </div>
                )}
                {given && <span style={{ fontSize: 12, color: C.muted }}>given</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Banner */}
      {isTarget ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>
            <Tex>{"x_5 = \\tfrac{29}{9}"}</Tex>. The answer is D.
          </span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>
            Showing <Tex>{`x_1`}</Tex> to <Tex>{`x_${showN}`}</Tex>. Tap to reveal more terms.
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
