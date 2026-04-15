"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 6, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Binomial Expansion / Parity" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "0", text: "0", ok: false, expl: "You might think all coefficients are even since most C(8,k) are even, but C(8,0) and C(8,8) are both 1, and 3\u2078 and 3\u2070 are both odd, so two terms are odd." },
  { letter: "B", tex: "1", text: "1", ok: false, expl: "You might get 1 by only checking the x\u2078 term (coefficient 1) and missing that the constant term 3\u2078 = 6561 is also odd." },
  { letter: "C", tex: "2", ok: true, text: "2", expl: "The coefficient of x\u1D4F is C(8,k)\u00B73\u2078\u207B\u1D4F. For this to be odd, both C(8,k) and 3\u2078\u207B\u1D4F must be odd. Since 3\u207F is always odd, we need C(8,k) odd. By Lucas' theorem, C(8,k) is odd only when k=0 and k=8, giving 2 terms." },
  { letter: "D", tex: "3", text: "3", ok: false, expl: "You might get 3 by incorrectly including k=4 (C(8,4)=70, which is even) or some other term where C(8,k) appears odd but isn't." },
  { letter: "E", tex: "4", text: "4", ok: false, expl: "You might get 4 by miscounting which binomial coefficients are odd, perhaps confusing C(8,k) parity with C(7,k) parity." },
  { letter: "F", tex: "5", text: "5", ok: false, expl: "You might get 5 by forgetting that powers of 3 are always odd and instead thinking some 3\u207F are even, counting more terms as having mixed parity." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q6</span>
        In the expansion of <Tex>{"(3 + x)^8"}</Tex>, how many of the terms have an odd coefficient?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","0"],["B","1"],["C","2"],["D","3"],["E","4"],["F","5"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 6</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>In the expansion of</p>
        <MathBox style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{"(3 + x)^8"}</Tex></MathBox>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 10px" }}>how many of the terms have an odd coefficient?</p>
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
        <p style={{ margin: 0 }}>The general term is <Tex>{"\\binom{8}{k} \\cdot 3^{8-k} \\cdot x^k"}</Tex>. For the coefficient to be odd, both <Tex>{"\\binom{8}{k}"}</Tex> and <Tex>{"3^{8-k}"}</Tex> must be odd (since odd <Tex>{"\\times"}</Tex> odd = odd, but even <Tex>{"\\times"}</Tex> anything = even).</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>Powers of 3 are always odd, so the parity depends entirely on <Tex>{"\\binom{8}{k}"}</Tex>.</p>
        <p style={{ margin: 0 }}>By Lucas' theorem, <Tex>{"\\binom{8}{k}"}</Tex> is odd if and only if every digit of <Tex>{"k"}</Tex> in binary is <Tex>{"\\le"}</Tex> the corresponding digit of 8. Since <Tex>{"8 = 1000_2"}</Tex>, the only values where this holds are <Tex>{"k = 0"}</Tex> (<Tex>{"0000_2"}</Tex>) and <Tex>{"k = 8"}</Tex> (<Tex>{"1000_2"}</Tex>).</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Compute each coefficient <Tex>{"\\binom{8}{k} \\cdot 3^{8-k}"}</Tex> and check its parity.</span>,
      math: (<div><Tex>{"(3+x)^8 = \\sum_{k=0}^{8} \\binom{8}{k} \\cdot 3^{8-k} \\cdot x^k"}</Tex></div>), },
    { label: "KEY OBSERVATION", color: C.calc,
      text: <span>Since <Tex>{"3^n"}</Tex> is odd for all <Tex>{"n \\ge 0"}</Tex>, the coefficient is odd if and only if <Tex>{"\\binom{8}{k}"}</Tex> is odd.</span>,
      math: (<><div><Tex>{"3^0 = 1,\\; 3^1 = 3,\\; 3^2 = 9,\\; \\ldots \\text{ all odd}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{odd} \\times \\text{odd} = \\text{odd}, \\quad \\text{even} \\times \\text{odd} = \\text{even}"}</Tex></div></>), },
    { label: "CHECK EACH BINOMIAL COEFFICIENT", color: C.calc,
      text: <span>List <Tex>{"\\binom{8}{k}"}</Tex> for <Tex>{"k = 0, 1, \\ldots, 8"}</Tex>.</span>,
      math: (<><div><Tex>{"\\binom{8}{0} = 1 \\;\\text{(odd)}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\binom{8}{1} = 8 \\;\\text{(even)}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\binom{8}{2} = 28 \\;\\text{(even)}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\binom{8}{3} = 56 \\;\\text{(even)}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\binom{8}{4} = 70 \\;\\text{(even)}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{By symmetry: } \\binom{8}{5}=56,\\; \\binom{8}{6}=28,\\; \\binom{8}{7}=8 \\;\\text{(all even)}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\binom{8}{8} = 1 \\;\\text{(odd)}"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>Only <Tex>{"k = 0"}</Tex> and <Tex>{"k = 8"}</Tex> give odd binomial coefficients, so exactly 2 terms have odd coefficients.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\text{2 terms have odd coefficients: } 3^8 = 6561 \\text{ and } x^8 = 1}"}</Tex></div>),
      conclusion: <span>The answer is C: <Tex>{"2"}</Tex> terms.</span>, },
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
  const [checked, setChecked] = useState({});

  const binom = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); };
  const terms = Array.from({ length: 9 }, (_, k) => {
    const bc = binom(8, k);
    const p3 = Math.pow(3, 8 - k);
    const coeff = bc * p3;
    return { k, bc, p3, coeff, odd: coeff % 2 === 1 };
  });

  const numChecked = Object.keys(checked).length;
  const allChecked = numChecked === 9;
  const oddCount = terms.filter(t => t.odd).length;

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>Each term's coefficient is <Tex>{"\\binom{8}{k} \\times 3^{8-k}"}</Tex>. Tap each term to reveal whether it is odd or even.</p>
        <p style={{ margin: 0 }}>Remember: odd <Tex>{"\\times"}</Tex> odd = odd, but even <Tex>{"\\times"}</Tex> anything = even.</p>
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {terms.map(t => {
          const isRevealed = !!checked[t.k];
          const isOdd = t.odd;
          return (
            <div key={t.k} onClick={() => setChecked(p => ({ ...p, [t.k]: true }))} style={{ background: isRevealed ? (isOdd ? C.conclBg : C.failBg) : C.card, border: `1px solid ${isRevealed ? (isOdd ? C.ok : C.fail) + "55" : C.border}`, borderLeft: isRevealed ? `4px solid ${isOdd ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: isRevealed ? "default" : "pointer", transition: "all 0.3s" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ minWidth: 28, height: 28, borderRadius: 7, padding: "0 6px", background: isRevealed ? (isOdd ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${isRevealed ? (isOdd ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: isRevealed ? (isOdd ? C.ok : C.fail) : C.accent, flexShrink: 0, fontFamily: mathFont }}>{t.k}</div>
                  <span style={{ fontSize: 14, color: C.text }}><Tex>{`\\binom{8}{${t.k}} \\cdot 3^{${8 - t.k}} = ${t.bc} \\times ${t.p3}`}</Tex></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {isRevealed ? (
                    <>
                      <span style={{ fontSize: 16, fontWeight: 700, color: isOdd ? C.ok : C.fail }}><Tex>{String(t.coeff)}</Tex></span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: isOdd ? C.ok : C.fail, background: isOdd ? C.ok + "22" : C.fail + "22", padding: "2px 8px", borderRadius: 6 }}>{isOdd ? "ODD" : "EVEN"}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 13, color: C.muted }}>tap to check</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {allChecked && (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}><Tex>{`${oddCount}`}</Tex> terms have odd coefficients (<Tex>{"k = 0"}</Tex> and <Tex>{"k = 8"}</Tex>). The answer is C.</span>
        </div>
      )}
      {!allChecked && numChecked > 0 && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Checked <Tex>{String(numChecked)}</Tex> of <Tex>{"9"}</Tex> terms. Found <Tex>{String(Object.entries(checked).filter(([k]) => terms[+k].odd).length)}</Tex> odd so far.</span>
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
