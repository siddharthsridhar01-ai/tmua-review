"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 3, paper: "Paper 2", year: "2026 Mock", topicTag: "Logic / Counterexamples" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\text{none}", expl: "You might pick none if you think the claim is always true, but testing n = 3 gives 9 + 4 = 13 which is prime, so the implication fails." },
  { letter: "B", ok: false, tex: "\\text{I only}", expl: "You might pick I if you confuse the direction of the implication. For n = 2: 2\u00B2 + 4 = 8, which is not prime, so the implication actually holds and n = 2 is NOT a counterexample." },
  { letter: "C", ok: false, tex: "\\text{II only}", expl: "You correctly identified n = 3 as a counterexample (3\u00B2 + 4 = 13 is prime), but you missed that n = 5 also works (5\u00B2 + 4 = 29 is prime). Both II and III are counterexamples." },
  { letter: "D", ok: false, tex: "\\text{III only}", expl: "You correctly identified n = 5 as a counterexample (5\u00B2 + 4 = 29 is prime), but you missed that n = 3 also works (3\u00B2 + 4 = 13 is prime). Both II and III are counterexamples." },
  { letter: "E", ok: false, tex: "\\text{I and II}", expl: "You correctly identified n = 3 but incorrectly included n = 2. For n = 2: 2\u00B2 + 4 = 8 is not prime, so the implication holds and n = 2 is not a counterexample." },
  { letter: "F", ok: false, tex: "\\text{I and III}", expl: "You correctly identified n = 5 but incorrectly included n = 2. For n = 2: 2\u00B2 + 4 = 8 is not prime, so the implication holds and n = 2 is not a counterexample." },
  { letter: "G", ok: true, tex: "\\text{II and III}", expl: "For n = 3: 3 is prime and 3\u00B2 + 4 = 13 is also prime, contradicting the claim. For n = 5: 5 is prime and 5\u00B2 + 4 = 29 is also prime. For n = 2: 2\u00B2 + 4 = 8 is not prime, so the implication holds and n = 2 is not a counterexample." },
  { letter: "H", ok: false, tex: "\\text{I, II and III}", expl: "You correctly found II and III but incorrectly included I. For n = 2: 2\u00B2 + 4 = 8 is not prime, so the claim's conclusion holds and n = 2 is not a counterexample." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const ITEMS_Q3 = [
  { label: 'I', content: (<><Tex>{"n = 2"}</Tex></>) },
  { label: 'II', content: (<><Tex>{"n = 3"}</Tex></>) },
  { label: 'III', content: (<><Tex>{"n = 5"}</Tex></>) }
];
const OPTIONS_Q3 = [
  ["A", "\\text{none}"], ["B", "\\text{I only}"], ["C", "\\text{II only}"], ["D", "\\text{III only}"],
  ["E", "\\text{I and II}"], ["F", "\\text{I and III}"], ["G", "\\text{II and III}"], ["H", "\\text{I, II and III}"]
];
const SECTIONS_Q3 = [
  { type: 'prose', text: (<>Consider the following claim about the positive integer <Tex>{"n"}</Tex>:</>) },
  { type: "mathbox", tex: "n \\text{ prime} \\;\\Rightarrow\\; n^2 + 4 \\text{ not prime}" },
  { type: 'prose-tight', text: (<>Which of the following provide(s) a counterexample to this claim?</>) },
  { type: "items", items: ITEMS_Q3 }
];

function QuestionSummary() {
  const sections = SECTIONS_Q3;
  const options = OPTIONS_Q3;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q3</span>
        {sections.map((s, i) => {
          if (s.type === "prose" || s.type === "prose-tight") return <span key={i}>{s.text} </span>;
          if (s.type === "mathbox") return (
            <div key={i} style={{ display: "block", margin: "6px auto", color: C.text, fontSize: 14, fontWeight: 700, textAlign: "center", maxWidth: 560 }}>
              <Tex display>{s.tex}</Tex>
            </div>
          );
          if (s.type === "items") return (
            <div key={i} style={{ display: "flex", justifyContent: "center", margin: "6px 0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 10, rowGap: 2, fontSize: 12, color: C.text, lineHeight: 1.5, maxWidth: 560 }}>
                {s.items.map((it, j) => (
                  <Fragment key={j}>
                    <div style={{ fontWeight: 700, color: C.muted, borderRight: `1px solid ${C.border}`, paddingRight: 8, textAlign: "right" }}>{it.label}</div>
                    <div style={{ paddingLeft: 4, textAlign: "left" }}>{it.content}</div>
                  </Fragment>
                ))}
              </div>
            </div>
          );
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, fontSize: 12, fontWeight: 600, color: C.text, borderTop: hasItems ? `1px solid ${C.border}` : "none", paddingTop: hasItems ? 6 : 0 }}>
        {options.map(([l, v]) => (<span key={l}>{l}: <Tex>{v}</Tex></span>))}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  const sections = SECTIONS_Q3;
  const options = OPTIONS_Q3;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 3</span>
        </div>
        {sections.map((s, i) => {
          if (s.type === "prose") return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>{s.text}</p>;
          if (s.type === "prose-tight") return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 0" }}>{s.text}</p>;
          if (s.type === "mathbox") return <MathBox key={i} style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{s.tex}</Tex></MathBox>;
          if (s.type === "items") return (
            <div key={i} style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", margin: "4px 0 8px", display: "flex", justifyContent: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 10, rowGap: 2, fontSize: 14, color: C.text, lineHeight: 1.6, maxWidth: 560 }}>
                {s.items.map((it, j) => (<Fragment key={j}><div style={{ fontWeight: 700, color: C.muted, borderRight: `1px solid ${C.border}`, paddingRight: 8, textAlign: "right" }}>{it.label}</div><div style={{ paddingLeft: 4 }}>{it.content}</div></Fragment>))}
              </div>
            </div>
          );
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {options.map(([l, v]) => (<div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 200px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>A counterexample to <Tex>{"P \\Rightarrow Q"}</Tex> requires <Tex>{"P"}</Tex> true and <Tex>{"Q"}</Tex> false. Here that means: <Tex>{"n"}</Tex> is prime AND <Tex>{"n^2 + 4"}</Tex> IS prime (contradicting the "not prime" conclusion).</p></InfoBox><InfoBox type="insight"><p style={{ margin: 0 }}>For each candidate, check two things: (1) is <Tex>{"n"}</Tex> prime? (2) is <Tex>{"n^2 + 4"}</Tex> prime? A counterexample needs both to be yes.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram showing the three cases as a summary table
  const tableDiagram = (() => {
    const pW = 270, pH = 130;
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 50} height={hh || 18}>
        <div style={{ fontSize: 12, color: color || C.text, textAlign: "center", lineHeight: 1.3 }}>{children}</div>
      </foreignObject>
    );
    const rows = [
      { n: "2", nSq4: "8", nP: true, rP: false, ce: false },
      { n: "3", nSq4: "13", nP: true, rP: true, ce: true },
      { n: "5", nSq4: "29", nP: true, rP: true, ce: true },
    ];
    const colX = [20, 70, 130, 200];
    const rowY0 = 16, rowH = 30;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {/* Headers */}
        <FO x={colX[0]} y={2} w={40} hh={16} color={C.muted}><span style={{ fontWeight: 700, fontSize: 11 }}><Tex>{"n"}</Tex></span></FO>
        <FO x={colX[1] - 10} y={2} w={60} hh={16} color={C.muted}><span style={{ fontWeight: 700, fontSize: 11 }}><Tex>{"n^2+4"}</Tex></span></FO>
        <FO x={colX[2] - 10} y={2} w={60} hh={16} color={C.muted}><span style={{ fontWeight: 700, fontSize: 11 }}>Prime?</span></FO>
        <FO x={colX[3] - 10} y={2} w={60} hh={16} color={C.muted}><span style={{ fontWeight: 700, fontSize: 11 }}>Cex?</span></FO>
        <line x1={12} y1={rowY0 + 2} x2={pW - 12} y2={rowY0 + 2} stroke={C.border} strokeWidth={0.7} />
        {rows.map((r, i) => {
          const y = rowY0 + 6 + i * rowH;
          return (
            <g key={i}>
              <FO x={colX[0]} y={y} w={40} hh={20} color={C.accentLight}><Tex>{r.n}</Tex></FO>
              <FO x={colX[1] - 10} y={y} w={60} hh={20} color={C.text}><Tex>{r.nSq4}</Tex></FO>
              <FO x={colX[2] - 10} y={y} w={60} hh={20} color={r.rP ? C.ok : C.fail}>{r.rP ? "\u2705 yes" : "\u274C no"}</FO>
              <FO x={colX[3] - 10} y={y} w={60} hh={20} color={r.ce ? C.ok : C.fail}>{r.ce ? "\u2705" : "\u274C"}</FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>A counterexample to <Tex>{"P \\Rightarrow Q"}</Tex> needs <Tex>{"P"}</Tex> true and <Tex>{"Q"}</Tex> false. So we need <Tex>{"n"}</Tex> prime and <Tex>{"n^2+4"}</Tex> also prime.</span>, math: (<div><Tex>{"\\text{Counterexample: } n \\text{ prime AND } n^2+4 \\text{ prime}"}</Tex></div>) },
    { label: "TEST n = 2", color: C.fail, text: <span>Check: 2 is prime. Compute <Tex>{"2^2 + 4 = 8"}</Tex>. Is 8 prime? No. So the implication holds here and n = 2 is not a counterexample.</span>, math: (<><div><Tex>{"n = 2: \\quad 2^2 + 4 = 8 = 2^3"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"8 \\text{ not prime} \\;\\Rightarrow\\; \\color{#ff7675}{\\text{NOT a counterexample}}"}</Tex></div></>) },
    { label: "TEST n = 3", color: C.ok, text: <span>Check: 3 is prime. Compute <Tex>{"3^2 + 4 = 13"}</Tex>. Is 13 prime? Yes! The claim says <Tex>{"n^2+4"}</Tex> should not be prime, but it is. This is a counterexample.</span>, math: (<><div><Tex>{"n = 3: \\quad 3^2 + 4 = 13"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"13 \\text{ is prime} \\;\\Rightarrow\\; \\color{#55efc4}{\\text{counterexample!}}"}</Tex></div></>) },
    { label: "TEST n = 5", color: C.ok, text: <span>Check: 5 is prime. Compute <Tex>{"5^2 + 4 = 29"}</Tex>. Is 29 prime? Yes! Another counterexample.</span>, math: (<><div><Tex>{"n = 5: \\quad 5^2 + 4 = 29"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"29 \\text{ is prime} \\;\\Rightarrow\\; \\color{#55efc4}{\\text{counterexample!}}"}</Tex></div></>), diagram: tableDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>II and III are counterexamples; I is not.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{II and III}}"}</Tex></div>), conclusion: <span>The answer is G: II and III.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [picked, setPicked] = useState(null);
  const [flowStep, setFlowStep] = useState(0);
  const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) { if (n % i === 0) return false; } return true; };
  const cases = [
    { label: "I", n: 2 },
    { label: "II", n: 3 },
    { label: "III", n: 5 },
  ];
  const [results, setResults] = useState({});

  const handlePick = (i) => { setPicked(i); setFlowStep(0); };
  const handleNext = () => {
    if (flowStep >= 2) {
      setResults(p => ({ ...p, [picked]: true }));
      setPicked(null);
      setFlowStep(0);
    } else {
      setFlowStep(p => p + 1);
    }
  };

  const allDone = cases.every((_, i) => results[i]);

  // Current case data
  const c = picked !== null ? cases[picked] : null;
  const nSq4 = c ? c.n * c.n + 4 : 0;
  const nSq4Prime = c ? isPrime(nSq4) : false;
  const isCE = c ? nSq4Prime : false;

  const flowSteps = c ? [
    { q: <span>Is <Tex>{`n = ${c.n}`}</Tex> prime?</span>, a: <span>Yes, <Tex>{`${c.n}`}</Tex> is prime.</span>, col: C.ok },
    { q: <span>Compute <Tex>{`n^2 + 4 = ${c.n}^2 + 4`}</Tex></span>, a: <span><Tex>{`= ${c.n * c.n} + 4 = ${nSq4}`}</Tex></span>, col: C.calc },
    { q: <span>Is <Tex>{`${nSq4}`}</Tex> prime?</span>, a: nSq4Prime ? <span>Yes! <Tex>{`${nSq4}`}</Tex> is prime. The claim says it shouldn't be, so this IS a counterexample.</span> : <span>No. <Tex>{`${nSq4}`}</Tex> is not prime{nSq4 === 8 ? <span> (<Tex>{"= 2^3"}</Tex>)</span> : ""}. The claim holds here, so NOT a counterexample.</span>, col: isCE ? C.ok : C.fail },
  ] : [];

  return (
    <div>
      <QuestionSummary />
      <p style={{ fontSize: 13, color: C.muted, margin: "0 0 8px", textAlign: "center" }}>Pick a value to test. Step through the logic to decide: counterexample or not?</p>
      {/* Case selector buttons */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, justifyContent: "center" }}>
        {cases.map((cs, i) => {
          const done = results[i];
          const active = picked === i;
          const wasCE = done && isPrime(cs.n * cs.n + 4);
          return (<button key={i} onClick={() => !done && handlePick(i)} style={{ padding: "10px 20px", borderRadius: 8, border: `1.5px solid ${done ? (wasCE ? C.ok : C.fail) : active ? C.accent : C.border}`, background: done ? (wasCE ? C.conclBg : C.failBg) : active ? C.accent + "22" : C.card, color: done ? (wasCE ? C.ok : C.fail) : active ? C.accentLight : C.text, fontSize: 14, fontWeight: 700, cursor: done ? "default" : "pointer", transition: "all 0.2s", opacity: done && picked !== i ? 0.7 : 1 }}><span style={{ color: C.accent, marginRight: 4 }}>{cs.label}:</span><Tex>{`n = ${cs.n}`}</Tex>{done && <span style={{ marginLeft: 6 }}>{wasCE ? "\u2705" : "\u274C"}</span>}</button>);
        })}
      </div>
      {/* Flowchart steps */}
      {picked !== null && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
          {flowSteps.map((fs, i) => {
            if (i > flowStep) return null;
            return (
              <div key={i} style={{ background: C.card, border: `1px solid ${fs.col}44`, borderLeft: `4px solid ${fs.col}`, borderRadius: 10, padding: "10px 14px", transition: "all 0.3s" }}>
                <div style={{ fontSize: 13, color: C.text, marginBottom: 4, fontWeight: 600 }}>{fs.q}</div>
                <div style={{ fontSize: 13, color: fs.col, lineHeight: 1.5 }}>{fs.a}</div>
              </div>
            );
          })}
          <button onClick={handleNext} style={{ alignSelf: "center", padding: "8px 20px", borderRadius: 8, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{flowStep >= 2 ? (isCE ? "Counterexample! Next case \u2192" : "Not a counterexample. Next case \u2192") : "Next step \u2192"}</button>
        </div>
      )}
      {/* Banner */}
      {allDone ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ok }}>II (<Tex>{"n=3 \\to 13"}</Tex>) and III (<Tex>{"n=5 \\to 29"}</Tex>) are counterexamples. I (<Tex>{"n=2 \\to 8"}</Tex>) is not. The answer is G.</span>
        </div>
      ) : picked === null && !allDone && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Test each case above. A counterexample needs <Tex>{"n"}</Tex> prime AND <Tex>{"n^2+4"}</Tex> prime.</span>
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
