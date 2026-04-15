"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 3, paper: "Paper 1", year: "2026 Mock", topicTag: "Sequences / AP & GP" };

const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "4", text: "4", ok: false, expl: "You might get 4 by using the wrong value of r. Check that your r satisfies both the second-term and third-term conditions." },
  { letter: "B", tex: "6", text: "6", ok: false, expl: "You might get 6 by solving the quadratic for r and picking r = 4/3 (the non-convergent root), then computing 3/(1\u22124/3) = \u22129 and taking the absolute value." },
  { letter: "C", tex: "8", text: "8", ok: false, expl: "You might get 8 by making an arithmetic error when substituting d into the third-term equation." },
  { letter: "D", tex: "9", text: "9", ok: true, expl: "From the conditions: d + 3r = 2 and 2d + 3r\u00B2 = 4/3. Substituting d = 2 \u2212 3r gives 9r\u00B2 \u2212 18r + 8 = 0, so r = 2/3 (convergent) or r = 4/3 (divergent). With r = 2/3: S\u221E = 3/(1 \u2212 2/3) = 9." },
  { letter: "E", tex: "12", text: "12", ok: false, expl: "You might get 12 by using r = 1/2 from a calculation error in the quadratic, giving 3/(1\u22121/2) = 6, then doubling by mistake." },
  { letter: "F", tex: "18", text: "18", ok: false, expl: "You might get 18 by using r = 2/3 correctly but computing 3/(2/3) = 9/2 and then doubling, or by other arithmetic errors." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q3</span>
        An arithmetic progression and a convergent geometric progression each have first term <Tex>{"3"}</Tex>. The sum of their second terms is <Tex>{"5"}</Tex>. The sum of their third terms is <Tex>{"\\tfrac{13}{3}"}</Tex>. What is the sum to infinity of the geometric progression?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","4"],["B","6"],["C","8"],["D","9"],["E","12"],["F","18"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
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
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 3</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>An arithmetic progression and a convergent geometric progression each have first term <Tex>{"3"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The sum of their second terms is <Tex>{"5"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>The sum of their third terms is <Tex>{"\\tfrac{13}{3}"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>What is the sum to infinity of the geometric progression?</p>
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
        <p style={{ margin: 0 }}>Write the AP as <Tex>{"3, 3+d, 3+2d, \\ldots"}</Tex> and the GP as <Tex>{"3, 3r, 3r^2, \\ldots"}</Tex>. Use the two sum conditions to form simultaneous equations in <Tex>{"d"}</Tex> and <Tex>{"r"}</Tex>, then apply <Tex>{"S_\\infty = \\tfrac{3}{1-r}"}</Tex>.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The quadratic in <Tex>{"r"}</Tex> will have two roots. Only the root with <Tex>{"|r| < 1"}</Tex> gives a convergent GP.</p>
        <p style={{ margin: 0 }}>The word "convergent" in the question is a filter: it tells you which root to use.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Set up the AP and GP with their general terms, form two equations from the sum conditions, eliminate <Tex>{"d"}</Tex>, solve the quadratic in <Tex>{"r"}</Tex>, and pick the convergent root.</span>,
      math: (<div><Tex>{"\\text{\\color{#e2e2e8}{AP:}}\\; 3, 3+d, \\ldots \\qquad \\text{\\color{#e2e2e8}{GP:}}\\; 3, 3r, \\ldots"}</Tex></div>), },
    { label: "FORM EQUATIONS", color: C.calc,
      text: <span>The AP has second term <Tex>{"3 + d"}</Tex> and third term <Tex>{"3 + 2d"}</Tex>. The GP has second term <Tex>{"3r"}</Tex> and third term <Tex>{"3r^2"}</Tex>.</span>,
      math: (<><div><Tex>{"(3+d) + 3r = 5 \\;\\Rightarrow\\; d + 3r = 5 - 3 = 2 \\quad \\text{\\color{#e2e2e8}{(i)}}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"(3+2d) + 3r^2 = \\tfrac{13}{3} \\;\\Rightarrow\\; 2d + 3r^2 = \\tfrac{13}{3} - 3 = \\tfrac{13-9}{3} = \\tfrac{4}{3} \\quad \\text{\\color{#e2e2e8}{(ii)}}"}</Tex></div></>), },
    { label: "ELIMINATE d", color: C.calc,
      text: <span>From (i): <Tex>{"d = 2 - 3r"}</Tex>. Substitute into (ii).</span>,
      math: (<><div><Tex>{"2(2 - 3r) + 3r^2 = \\tfrac{4}{3}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"4 - 6r + 3r^2 = \\tfrac{4}{3}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Multiply through by 3: } 12 - 18r + 9r^2 = 4"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"9r^2 - 18r + 12 - 4 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"9r^2 - 18r + 8 = 0"}</Tex></div></>), },
    { label: "SOLVE QUADRATIC", color: C.calc,
      text: <span>Factorise <Tex>{"9r^2 - 18r + 8"}</Tex>. Look for factors of <Tex>{"9 \\times 8 = 72"}</Tex> that sum to <Tex>{"-18"}</Tex>: that is <Tex>{"-6"}</Tex> and <Tex>{"-12"}</Tex>.</span>,
      math: (<><div><Tex>{"9r^2 - 6r - 12r + 8 = 3r(3r - 2) - 4(3r - 2) = (3r - 2)(3r - 4) = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"3r - 2 = 0 \\;\\Rightarrow\\; r = \\tfrac{2}{3} \\qquad 3r - 4 = 0 \\;\\Rightarrow\\; r = \\tfrac{4}{3}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{GP is convergent} \\;\\Rightarrow\\; |r| < 1 \\;\\Rightarrow\\; \\color{#fdcb6e}{r = \\tfrac{2}{3}}"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>Compute the sum to infinity using <Tex>{"S_\\infty = \\tfrac{a}{1 - r}"}</Tex>.</span>,
      math: (<><div><Tex>{"S_\\infty = \\frac{a}{1 - r} = \\frac{3}{1 - \\frac{2}{3}} = \\frac{3}{\\frac{1}{3}} = 3 \\times 3 = \\color{#55efc4}{9}"}</Tex></div></>),
      conclusion: <span>The sum to infinity is <Tex>{"9"}</Tex>. The answer is D.</span>, },
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
  const [nTerms, setNTerms] = useState(3);
  const r = 2 / 3;
  const partialSum = 3 * (1 - Math.pow(r, nTerms)) / (1 - r);
  const target = 9;
  const nearTarget = Math.abs(partialSum - target) < target * 0.05;

  const presets = [
    { label: "n3", jsx: <span><Tex>{"n = 3"}</Tex></span>, val: 3 },
    { label: "n5", jsx: <span><Tex>{"n = 5"}</Tex></span>, val: 5 },
    { label: "n8", jsx: <span><Tex>{"n = 8"}</Tex></span>, val: 8 },
    { label: "n12", jsx: <span><Tex>{"n = 12"}</Tex></span>, val: 12 },
  ];

  // Check conditions
  const d = 2 - 3 * r;
  const apSecond = 3 + d;
  const gpSecond = 3 * r;
  const apThird = 3 + 2 * d;
  const gpThird = 3 * r * r;

  // Generate individual GP terms for display
  const terms = [];
  for (let i = 0; i < 12; i++) terms.push(3 * Math.pow(r, i));

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Verify: with <Tex>{"r = \\tfrac{2}{3}"}</Tex> and <Tex>{"d = 0"}</Tex>, check the sum conditions hold</p>
        <p style={{ margin: "0 0 4px" }}>2. Increase the number of GP terms to watch the partial sum approach <Tex>{"9"}</Tex></p>
        <p style={{ margin: 0 }}>3. The GP converges because <Tex>{"|r| = \\tfrac{2}{3} < 1"}</Tex></p>
      </InfoBox>

      {/* Condition check */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}>Sum of 2nd terms</div>
          <div style={{ fontSize: 14, color: C.ok, fontFamily: mathFont }}><Tex>{`${apSecond.toFixed(0)} + ${gpSecond.toFixed(0)} = ${(apSecond + gpSecond).toFixed(0)}`}</Tex> {"\u2713"}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}>Sum of 3rd terms</div>
          <div style={{ fontSize: 14, color: C.ok, fontFamily: mathFont }}><Tex>{`${apThird.toFixed(0)} + \\tfrac{${(gpThird * 3).toFixed(0)}}{3} = \\tfrac{13}{3}`}</Tex> {"\u2713"}</div>
        </div>
      </div>

      {/* Slider for number of terms */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}>Number of GP terms</span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{nTerms}</span>
        </div>
        <input type="range" min={1} max={12} step={1} value={nTerms} onChange={e => setNTerms(+e.target.value)} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => {
            const active = nTerms === pr.val;
            return (<button key={pr.label} onClick={() => setNTerms(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, border: `1px solid ${active ? C.ok : C.border}`, background: active ? C.ok + "15" : C.card, color: active ? C.ok : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx || pr.label}</button>);
          })}
        </div>
      </div>

      {/* Explicit terms display */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.ps, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
          GP terms (<Tex>{`a = 3,\\; r = \\tfrac{2}{3}`}</Tex>)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
          {terms.map((t, i) => (
            <div key={i} style={{
              background: "#1e2030", border: `1px solid ${i < nTerms ? C.ok + "44" : C.border}`,
              borderRadius: 8, padding: "6px 10px", textAlign: "center",
              opacity: i < nTerms ? 1 : 0.35, transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}><Tex>{`a_${i + 1}`}</Tex></div>
              <div style={{ fontSize: 14, fontWeight: 700, color: i < nTerms ? C.ok : C.muted, fontFamily: mathFont }}>{fmt(t)}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#1e2030", borderRadius: 10, padding: "10px 14px", textAlign: "center", color: C.text }}>
          <span style={{ fontSize: 13 }}><Tex>{`\\color{#8b8d9a}{${terms.slice(0, nTerms).map((t, i) => (i === 0 ? t.toFixed(2) : `+ ${fmt(t)}`)).join("\\;")}}`}</Tex></span>
          <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700, color: nearTarget ? C.ok : C.ps }}>
            <Tex>{`= ${fmt(partialSum)}`}</Tex>
          </div>
        </div>
      </div>

      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, marginBottom: 2 }}><Tex>{"r"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>2/3</div>
        </div>
        <div style={{ background: nearTarget ? C.conclBg : C.card, border: `1px solid ${nearTarget ? C.ok + "66" : C.ps + "44"}`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: nearTarget ? C.ok : C.ps, fontWeight: 700, marginBottom: 2 }}><Tex>{`S_{${nTerms}}`}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: nearTarget ? C.ok : C.ps, fontFamily: mathFont }}>{fmt(partialSum)}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 2 }}><Tex>{"S_\\infty"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.white, fontFamily: mathFont }}>9</div>
        </div>
      </div>

      {/* Banner */}
      {nearTarget ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>
            <Tex>{`S_{${nTerms}} = ${fmt(partialSum)}`}</Tex> {"\u2248"} <Tex>{"9"}</Tex>. The GP converges to <Tex>{"S_\\infty = 9"}</Tex>. The answer is D.
          </span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>
            <Tex>{`S_{${nTerms}} = ${fmt(partialSum)}`}</Tex>. Add more terms to see convergence towards <Tex>{"9"}</Tex>.
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
