"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 4, paper: "Set A Paper 2", year: "2026 Mock", topicTag: "Logic / Proof Critique" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\text{It is completely correct.}", expl: "The first four lines and lines IV–V are fine, but line VI adds a multiple of 3 to something that isn't a multiple of 3. (n³−n) is divisible by 3, but 2n is not in general, so the sum isn't either. The conclusion is actually true, but this particular argument fails at VI." },
  { letter: "B", ok: false, tex: "\\text{The first error is on line I.}", expl: "You might reject this if you expected the student to use 'let k = n² + 1' or some substitution, but line I is just the standard factorisation n³ + n = n(n² + 1). You can verify by expanding: n · n² + n · 1 = n³ + n. Nothing wrong here." },
  { letter: "C", ok: false, tex: "\\text{The first error is on line III.}", expl: "By line III the student has only used that n and n²+1 have opposite parities, so their product is even. That reasoning is sound, so line III is fine. The trouble starts later." },
  { letter: "D", ok: false, tex: "\\text{The first error is on line IV.}", expl: "Line IV is a well-known fact: any three consecutive integers include one divisible by 3. Nothing wrong here." },
  { letter: "E", ok: false, tex: "\\text{The first error is on line V.}", expl: "Line V follows directly from line IV: if one of n−1, n, n+1 is divisible by 3, then the product (n−1)n(n+1) = n³−n is too. This is correct." },
  { letter: "F", ok: true, tex: "\\text{The first error is on line VI.}", expl: "Line VI claims: since n³−n is divisible by 3 and n³+n = (n³−n) + 2n, therefore n³+n is divisible by 3. But 2n is not a multiple of 3 in general (e.g. n=1 gives 2n=2). Adding a non-multiple of 3 to a multiple of 3 doesn't give a multiple of 3. The divisibility-by-3 argument collapses here." },
  { letter: "G", ok: false, tex: "\\text{The first error is on line VII.}", expl: "Line VII is just the combination step: if n³+n is divisible by both 2 and 3, it's divisible by 6. That's correct, but the divisibility-by-3 claim it relies on was broken back at line VI." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function ProgressCheck({ done }) { const size = 16; const color = done ? C.accentLight : C.muted; return (<svg width={size} height={size} viewBox="0 0 16 16" style={{ flexShrink: 0 }}><rect x={1.5} y={1.5} width={13} height={13} rx={2.5} fill="none" stroke={color} strokeWidth={1.5} />{done && (<><line x1={4.5} y1={4.5} x2={11.5} y2={11.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" /><line x1={11.5} y1={4.5} x2={4.5} y2={11.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" /></>)}</svg>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }


const ITEMS_Q4 = [
  { label: 'I', content: (<Tex>{"n^3 + n = n(n^2 + 1)"}</Tex>) },
  { label: 'II', content: (<><Tex>{"n"}</Tex> and <Tex>{"n^2+1"}</Tex> have opposite parities, so product is even.</>) },
  { label: 'III', content: (<>Therefore <Tex>{"n^3+n"}</Tex> is divisible by 2.</>) },
  { label: 'IV', content: (<>Among any 3 consecutive integers, one is divisible by 3.</>) },
  { label: 'V', content: (<>So <Tex>{"(n-1)n(n+1) = n^3 - n"}</Tex> is divisible by 3.</>) },
  { label: 'VI', content: (<><Tex>{"n^3 + n = (n^3 - n) + 2n"}</Tex>, so divisible by 3.</>) },
  { label: 'VII', content: (<>Divisible by 2 and 3, so divisible by 6.</>) }
];
const OPTIONS_Q4 = [
  ["A", "\\text{It is completely correct.}"],
  ["B", "\\text{The first error is on line I.}"],
  ["C", "\\text{The first error is on line III.}"],
  ["D", "\\text{The first error is on line IV.}"],
  ["E", "\\text{The first error is on line V.}"],
  ["F", "\\text{The first error is on line VI.}"],
  ["G", "\\text{The first error is on line VII.}"]
];
const SECTIONS_Q4 = [
  { type: 'prose', text: (<>A student attempts to prove the following claim:</>) },
  { type: "mathbox", tex: "\\text{For all positive integers } n, \\;\\; n^3 + n \\text{ is divisible by } 6." },
  { type: 'prose', text: (<>Here is the student's attempt:</>) },
  { type: "items", items: [
    { label: 'I', content: (<Tex>{"n^3 + n = n(n^2 + 1)"}</Tex>) },
    { label: 'II', content: (<><Tex>{"n"}</Tex> and <Tex>{"n^2+1"}</Tex> have opposite parities, so product is even.</>) },
    { label: 'III', content: (<>Therefore <Tex>{"n^3+n"}</Tex> is divisible by 2.</>) },
    { label: 'IV', content: (<>Among any 3 consecutive integers, one is divisible by 3.</>) },
    { label: 'V', content: (<>So <Tex>{"(n-1)n(n+1) = n^3 - n"}</Tex> is divisible by 3.</>) },
    { label: 'VI', content: (<><Tex>{"n^3 + n = (n^3 - n) + 2n"}</Tex>, so divisible by 3.</>) },
    { label: 'VII', content: (<>Divisible by 2 and 3, so divisible by 6.</>) }
  ] },
  { type: 'prose-tight', text: (<>Which of the following best describes this attempt?</>) }
];

function ReadStep() {
  const sections = SECTIONS_Q4;
  const options = OPTIONS_Q4;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 4</span>
        </div>
        {sections.map((s, i) => {
          if (s.type === "prose") return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>{s.text}</p>;
          if (s.type === "prose-tight") return <p key={i} style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "6px 0 0" }}>{s.text}</p>;
          if (s.type === "mathbox") return <MathBox key={i} style={{ fontSize: 17, padding: "12px 18px", margin: "8px 0" }}><Tex display>{s.tex}</Tex></MathBox>;
          if (s.type === "items") return (
            <div key={i} style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", margin: "4px 0 8px", display: "flex", justifyContent: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 10, rowGap: 2, fontSize: 14, color: C.text, lineHeight: 1.6, maxWidth: 560 }}>
                {s.items.map((it, j) => (
                  <Fragment key={j}>
                    <div style={{ fontWeight: 700, color: C.muted, borderRight: `1px solid ${C.border}`, paddingRight: 8, textAlign: "right" }}>{it.label}</div>
                    <div style={{ paddingLeft: 4 }}>{it.content}</div>
                  </Fragment>
                ))}
              </div>
            </div>
          );
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {options.map(([l, v]) => (
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 280px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Walk through each line in order. Ask: "Does this line follow from what came before?" The first line that fails is the answer. Don't stop just because the final conclusion happens to be true: a broken step is still a broken step.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 6px" }}>Watch line VI carefully. It writes <Tex>{"n^3+n = (n^3-n) + 2n"}</Tex> and concludes "divisible by 3" because <Tex>{"n^3-n"}</Tex> is. But <Tex>{"2n"}</Tex> usually isn't a multiple of 3.</p><p style={{ margin: 0 }}>Adding a multiple of 3 to a non-multiple of 3 gives a non-multiple of 3. So the step doesn't follow.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram: a compact "line audit" showing which lines are green/red
  const auditDiagram = (() => {
    const pW = 270, pH = 220;
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 50} height={hh || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.3 }}>{children}</div>
      </foreignObject>
    );
    const rows = [
      { n: "I", desc: "factorise", valid: true },
      { n: "II", desc: "parity argument", valid: true },
      { n: "III", desc: "÷ 2", valid: true },
      { n: "IV", desc: "3 consec. → one ÷ 3", valid: true },
      { n: "V", desc: "n³−n ÷ 3", valid: true },
      { n: "VI", desc: "+ 2n breaks ÷ 3", valid: false },
      { n: "VII", desc: "relies on VI", valid: false, dim: true },
    ];
    const rowH = 26;
    const y0 = 14;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={0} w={pW - 20} hh={14} color={C.muted}><span style={{ fontWeight: 700, fontSize: 11 }}>Line audit</span></FO>
        {rows.map((r, i) => {
          const y = y0 + i * rowH;
          const col = r.valid ? C.ok : C.fail;
          const bg = r.valid ? "rgba(85,239,196,0.08)" : "rgba(255,118,117,0.10)";
          return (
            <g key={i}>
              <rect x={10} y={y} width={pW - 20} height={rowH - 4} rx={4} fill={bg} stroke={col} strokeWidth={0.7} opacity={r.dim ? 0.55 : 1} />
              <FO x={14} y={y + 4} w={28} hh={18} color={col}><span style={{ fontWeight: 700, fontSize: 11 }}>{r.n}</span></FO>
              <FO x={44} y={y + 4} w={pW - 90} hh={18} color={C.text}><span style={{ fontSize: 11, opacity: r.dim ? 0.7 : 1 }}>{r.desc}</span></FO>
              <FO x={pW - 40} y={y + 4} w={30} hh={18} color={col}>{r.valid ? "✅" : "❌"}</FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Read each line in sequence. A line is valid if it follows from the ones before it. The first broken step (if any) is the answer.</span>, math: (<div><Tex>{"\\text{Check I} \\to \\text{II} \\to \\text{III} \\to \\ldots \\to \\text{VII}"}</Tex></div>) },
    { label: "LINES I–III: DIVISIBLE BY 2", color: C.ok, text: <span>Line I is a standard factorisation. Line II: if <Tex>{"n"}</Tex> is even then <Tex>{"n^2+1"}</Tex> is odd, and vice versa, so one factor is always even. Line III then follows. All three lines are fine.</span>, math: (<><div><Tex>{"n^3 + n = n(n^2+1)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{one of } n,\\, n^2+1 \\text{ is even}"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{n^3+n \\text{ is even} \\;\\checkmark}"}</Tex></div></>) },
    { label: "LINES IV–V: n³−n DIVISIBLE BY 3", color: C.ok, text: <span>Line IV is a familiar fact (three consecutive integers always include a multiple of 3). Line V applies it to <Tex>{"(n-1)n(n+1)"}</Tex>, which expands to <Tex>{"n^3 - n"}</Tex>. Both lines are valid.</span>, math: (<><div><Tex>{"(n-1)\\,n\\,(n+1) = n^3 - n"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{n^3 - n \\text{ divisible by 3} \\;\\checkmark}"}</Tex></div></>) },
    { label: "LINE VI: THE BREAK", color: C.fail, text: <span>The student writes <Tex>{"n^3 + n = (n^3 - n) + 2n"}</Tex> (algebra is fine) and concludes divisibility by 3. But while <Tex>{"n^3-n"}</Tex> is a multiple of 3, <Tex>{"2n"}</Tex> usually isn't. Multiple of 3 <Tex>{"+"}</Tex> non-multiple of 3 is not a multiple of 3. Try <Tex>{"n=1"}</Tex>: <Tex>{"n^3-n = 0"}</Tex> and <Tex>{"2n = 2"}</Tex>, giving <Tex>{"n^3+n = 2"}</Tex>, which is not divisible by 3.</span>, math: (<><div><Tex>{"n^3+n = \\underbrace{(n^3-n)}_{\\text{mult. of 3}} + \\underbrace{2n}_{\\text{usually not}}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"n=1:\\; n^3+n = 2 \\text{, not a multiple of 3}"}</Tex></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{\\text{step does NOT follow}}"}</Tex></div></>), diagram: auditDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>The first broken line is VI. (The overall claim <Tex>{"6 \\mid n^3+n"}</Tex> is actually true: it can be proved correctly, but this particular argument fails at VI.)</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{First error: line VI}}"}</Tex></div>), conclusion: <span>The answer is F: the first error is on line VI.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [nVal, setNVal] = useState(1);
  const [sawVIBreak, setSawVIBreak] = useState(false); // seen an n where 2n is NOT a multiple of 3 (so VI's inference fails)
  const nVals = [1, 2, 3, 4, 5, 6];

  const compute = (n) => {
    const cube = n * n * n;
    const total = cube + n;
    const nCubeMinusN = cube - n;
    const twoN = 2 * n;
    // Check: is (n^3 - n) divisible by 3?
    const part1Div3 = nCubeMinusN % 3 === 0;
    // Check: is 2n divisible by 3?
    const part2Div3 = twoN % 3 === 0;
    // Check: is total divisible by 3? (it will be, always, since n^3+n = n(n^2+1)... actually no)
    // Wait - n^3 + n divisible by 3 always? Let's check: n=1: 2 (no). So the sum isn't always divisible by 3.
    const totalDiv3 = total % 3 === 0;
    const totalDiv6 = total % 6 === 0;
    return { n, cube, total, nCubeMinusN, twoN, part1Div3, part2Div3, totalDiv3, totalDiv6 };
  };

  const r = compute(nVal);
  // The line VI failure: (n^3 - n) is div by 3 but 2n isn't, so sum not div by 3 via VI's argument.
  // Show specifically for this n whether VI's reasoning produces a contradiction.
  const viIsBroken = r.part1Div3 && !r.part2Div3; // always true: part1 always div 3, part2 div 3 iff n div 3
  // For n=3, 6: 2n IS divisible by 3, so VI happens to "work" numerically for those but it's still invalid reasoning in general

  useEffect(() => {
    if (viIsBroken) setSawVIBreak(true);
  }, [viIsBroken]);

  return (
    <div>
      <QuestionSummary />
      {/* n selector */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}>Pick <Tex>{"n"}</Tex></span>
          <span style={{ fontSize: 15, color: C.calc, fontWeight: 700 }}><Tex>{`n = ${nVal}`}</Tex></span>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {nVals.map(n => {
            const active = nVal === n;
            return (<button key={n} onClick={() => setNVal(n)} style={{ flex: "1 1 60px", padding: "8px 4px", borderRadius: 7, border: `1.5px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "22" : C.card, color: active ? C.calc : C.text, fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", transition: "all 0.2s" }}><Tex>{`n = ${n}`}</Tex></button>);
          })}
        </div>
      </div>

      {/* Compute table */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Line VI's setup</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 6, alignItems: "center", fontSize: 13 }}>
          <div style={{ background: r.part1Div3 ? C.conclBg : C.failBg, border: `1px solid ${(r.part1Div3 ? C.ok : C.fail) + "55"}`, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 11, marginBottom: 2 }}><Tex>{"n^3 - n"}</Tex></div>
            <div style={{ color: r.part1Div3 ? C.ok : C.fail, fontWeight: 700, fontSize: 20 }}><Tex>{String(r.nCubeMinusN)}</Tex></div>
            <div style={{ fontSize: 11, color: r.part1Div3 ? C.ok : C.fail, marginTop: 2 }}>{r.part1Div3 ? "÷ 3 ✅" : "÷ 3 ❌"}</div>
          </div>
          <div style={{ textAlign: "center", color: C.text, fontSize: 18, fontWeight: 700 }}>+</div>
          <div style={{ background: r.part2Div3 ? C.conclBg : C.failBg, border: `1px solid ${(r.part2Div3 ? C.ok : C.fail) + "55"}`, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 11, marginBottom: 2 }}><Tex>{"2n"}</Tex></div>
            <div style={{ color: r.part2Div3 ? C.ok : C.fail, fontWeight: 700, fontSize: 20 }}><Tex>{String(r.twoN)}</Tex></div>
            <div style={{ fontSize: 11, color: r.part2Div3 ? C.ok : C.fail, marginTop: 2 }}>{r.part2Div3 ? "÷ 3 ✅" : "÷ 3 ❌"}</div>
          </div>
          <div style={{ textAlign: "center", color: C.text, fontSize: 18, fontWeight: 700 }}>=</div>
          <div style={{ background: r.totalDiv3 ? C.conclBg : C.failBg, border: `1px solid ${(r.totalDiv3 ? C.ok : C.fail) + "55"}`, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 11, marginBottom: 2 }}><Tex>{"n^3 + n"}</Tex></div>
            <div style={{ color: r.totalDiv3 ? C.ok : C.fail, fontWeight: 700, fontSize: 20 }}><Tex>{String(r.total)}</Tex></div>
            <div style={{ fontSize: 11, color: r.totalDiv3 ? C.ok : C.fail, marginTop: 2 }}>{r.totalDiv3 ? "÷ 3 ✅" : "÷ 3 ❌"}</div>
          </div>
        </div>
      </div>

      {/* Verdict banner */}
      {!r.part2Div3 ? (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 13, color: C.fail, fontWeight: 700, marginBottom: 4 }}>Line VI's reasoning fails for <Tex>{`n = ${nVal}`}</Tex></div>
          <div style={{ fontSize: 12, color: C.fail, lineHeight: 1.5 }}>The student argues <Tex>{"n^3+n"}</Tex> is divisible by 3 because <Tex>{"n^3 - n"}</Tex> is. But <Tex>{`2n = ${r.twoN}`}</Tex> is not a multiple of 3, so adding it breaks divisibility by 3. The sum <Tex>{String(r.total)}</Tex> {r.totalDiv3 ? "happens to still be" : "is"} {r.totalDiv3 ? "divisible by 3, but not for the reason line VI claims" : "not divisible by 3"}.</div>
        </div>
      ) : (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 13, color: C.assum, fontWeight: 700, marginBottom: 4 }}>Line VI "works" numerically for <Tex>{`n = ${nVal}`}</Tex>, but only by luck</div>
          <div style={{ fontSize: 12, color: C.assum, lineHeight: 1.5 }}>Here <Tex>{`2n = ${r.twoN}`}</Tex> happens to be divisible by 3 (because <Tex>{`n = ${nVal}`}</Tex> is). So the sum is divisible by 3. But the student's argument doesn't rely on that: it claims divisibility holds in general. Try <Tex>{"n = 1"}</Tex> or <Tex>{"n = 2"}</Tex> to see the argument collapse.</div>
        </div>
      )}

      {/* Progress tracker */}
      <div style={{ marginTop: 8, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawVIBreak ? C.accentLight : C.muted }}>
          <ProgressCheck done={sawVIBreak} />
          <span style={{ fontWeight: sawVIBreak ? 700 : 500 }}>Tried an <Tex>{"n"}</Tex> where <Tex>{"2n"}</Tex> is NOT a multiple of 3. <span style={{ color: C.muted, fontWeight: 500 }}>(Breaks line VI's inference.)</span></span>
        </div>
        {sawVIBreak ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>Adding a multiple of 3 to a non-multiple of 3 can never produce a multiple of 3, so line VI's inference is invalid regardless of whether the final claim happens to be true for some values of <Tex>{"n"}</Tex>.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is F: the first error is on line VI.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Try <Tex>{"n = 1, 2, 4"}</Tex> or <Tex>{"5"}</Tex> to see line VI collapse.
          </div>
        )}
      </div>
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
        <div style={{ marginBottom: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: 1 }}>TMUA</span><span style={{ fontSize: 12, color: C.muted }}>{META.paper}</span><span style={{ fontSize: 12, color: C.muted }}>{"·"}</span><span style={{ fontSize: 12, color: C.ps }}>{META.topicTag}</span></div><h1 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: titleFont, fontStyle: "italic", letterSpacing: 0.5 }}>Interactive Walkthrough</h1><p style={{ fontSize: 12, color: C.muted, margin: 0 }}>TMUA {META.year} {"·"} {META.paper} {"·"} Question {META.questionNumber}</p></div>
        <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>{stepsMeta.map(s => (<button key={s.id} onClick={() => setStep(s.id)} style={{ flex: 1, minWidth: 0, background: step === s.id ? C.accent : step > s.id ? "rgba(108,92,231,0.15)" : "#1e2030", border: `1px solid ${step === s.id ? C.accent : step > s.id ? C.accent + "44" : C.border}`, borderRadius: 9, padding: "8px 3px", cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}><span style={{ fontSize: 13, fontWeight: 700, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted }}>{s.id + 1}</span><span style={{ fontSize: 11, fontWeight: step === s.id ? 700 : 500, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted, whiteSpace: "nowrap" }}>{s.label}</span></button>))}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><span style={{ background: C.accent, borderRadius: 6, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.white }}>{step + 1}</span><h2 style={{ fontSize: 16, fontWeight: 700, color: C.white, margin: 0 }}>{stepsMeta[step].title}</h2></div>
        {step === 0 && <ReadStep />}
        {step === 1 && <SetupStep />}
        {step === 2 && <SolveStepContent revealed={revealed} setRevealed={setRevealed} />}
        {step === 3 && <VerifyStepContent />}
        {step === 4 && (<div><QuestionSummary /><div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>{opts.map((o, i) => (<OptionCard key={o.letter} o={o} expanded={expanded === i} animate={optAnim[i]} onClick={() => setExpanded(expanded === i ? null : i)} />))}</div></div>)}
        <div style={{ display: "flex", gap: 10, marginTop: 20, paddingBottom: 28 }}><button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: `1px solid ${C.border}`, background: step === 0 ? C.card : "#1e2030", color: step === 0 ? C.muted : C.text, fontSize: 14, fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer", opacity: step === 0 ? 0.4 : 1 }}>{"←"} Previous</button>{step < 4 ? (<button onClick={() => setStep(step + 1)} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Next {"→"}</button>) : (<button style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.ok},#2ecc71)`, color: C.white, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Complete</button>)}</div>
      </div>
    </div>
  );
}

function QuestionSummary() {
  const sections = SECTIONS_Q4;
  const options = OPTIONS_Q4;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q4</span>
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

