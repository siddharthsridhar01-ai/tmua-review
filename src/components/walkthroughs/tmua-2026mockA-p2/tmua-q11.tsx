"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 11, set: "A", paperNumber: "Paper 2", topicTag: "Proof Audit / Inequalities" };

const opts = [
  { letter: "A", ok: true, tex: "\\text{It is completely correct.}", expl: "Every line is valid. Line I is the standard expansion of (a+b)². Line II substitutes the hypothesis a²+b² = c². Line III uses a, b > 0 to conclude 2ab > 0. Line IV follows by adding 2ab > 0 to c². Line V takes positive square roots of both sides (valid because both sides are positive since a+b > 0 and c > 0). The conclusion a+b > c is established correctly." },
  { letter: "B", ok: false, tex: "\\text{The student has proved the converse.}", expl: "The converse would be 'a+b > c ⇒ a² + b² = c² (for a, b, c > 0)', and the student did not prove that. They used the hypothesis a² + b² = c² as a premise and concluded a + b > c, which is the original direction." },
  { letter: "C", ok: false, tex: "\\text{The first error is on line II.}", expl: "Line II is valid. The hypothesis is a² + b² = c², so replacing a² + b² with c² in line I's expansion gives exactly line II." },
  { letter: "D", ok: false, tex: "\\text{The first error is on line III.}", expl: "Line III is valid. a > 0 and b > 0 imply ab > 0, hence 2ab > 0." },
  { letter: "E", ok: false, tex: "\\text{The first error is on line IV.}", expl: "Line IV is valid. From (a+b)² = c² + 2ab and 2ab > 0, we get (a+b)² > c²." },
  { letter: "F", ok: false, tex: "\\text{The first error is on line V.}", expl: "Line V is valid. Both a+b and c are positive, so taking positive square roots preserves the inequality: (a+b)² > c² and both sides positive give a+b > c." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const PROOF_LINES = [
  { roman: "I",   tex: "(a+b)^2 = a^2 + 2ab + b^2", note: "Standard expansion." },
  { roman: "II",  tex: "\\phantom{(a+b)^2} = c^2 + 2ab", note: "Using hypothesis a² + b² = c²." },
  { roman: "III", tex: "\\text{Since } a, b > 0, \\;\\; 2ab > 0", note: "Positive times positive." },
  { roman: "IV",  tex: "\\text{So } (a+b)^2 > c^2", note: "c² + 2ab > c²." },
  { roman: "V",   tex: "\\text{Since } a+b > 0 \\text{ and } c > 0, \\;\\; a+b > c", note: "Take positive square roots." },
];

function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function ProgressCheck({ done }) { const size = 16; const color = done ? C.accentLight : C.muted; return (<svg width={size} height={size} viewBox="0 0 16 16" style={{ flexShrink: 0 }}><rect x={1.5} y={1.5} width={13} height={13} rx={2.5} fill="none" stroke={color} strokeWidth={1.5} />{done && (<><line x1={4.5} y1={4.5} x2={11.5} y2={11.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" /><line x1={11.5} y1={4.5} x2={4.5} y2={11.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" /></>)}</svg>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }


const ITEMS_Q11 = [
  { label: 'I', content: (<Tex>{"(a+b)^2 = a^2 + 2ab + b^2"}</Tex>) },
  { label: 'II', content: (<><Tex>{"= c^2 + 2ab"}</Tex> (using hypothesis <Tex>{"a^2 + b^2 = c^2"}</Tex>)</>) },
  { label: 'III', content: (<>Since <Tex>{"a, b > 0"}</Tex>, <Tex>{"2ab > 0"}</Tex></>) },
  { label: 'IV', content: (<>So <Tex>{"(a+b)^2 > c^2"}</Tex></>) },
  { label: 'V', content: (<>Since <Tex>{"a+b > 0"}</Tex> and <Tex>{"c > 0"}</Tex>, <Tex>{"a+b > c"}</Tex></>) }
];
const OPTIONS_Q11 = [
  ["A", "\\text{It is completely correct.}"],
  ["B", "\\text{The student has proved the converse.}"],
  ["C", "\\text{The first error is on line II.}"],
  ["D", "\\text{The first error is on line III.}"],
  ["E", "\\text{The first error is on line IV.}"],
  ["F", "\\text{The first error is on line V.}"]
];
const SECTIONS_Q11 = [
  { type: 'prose', text: (<>A student attempts to prove that for positive real numbers <Tex>{"a, b, c"}</Tex>:</>) },
  { type: "mathbox", tex: "a^2 + b^2 = c^2, \\;\\; a, b, c > 0 \\;\\Rightarrow\\; a + b > c" },
  { type: 'prose', text: (<>Here is the student's attempt:</>) },
  { type: "items", items: [
    { label: 'I', content: (<Tex>{"(a+b)^2 = a^2 + 2ab + b^2"}</Tex>) },
    { label: 'II', content: (<><Tex>{"= c^2 + 2ab"}</Tex> (using hypothesis <Tex>{"a^2 + b^2 = c^2"}</Tex>)</>) },
    { label: 'III', content: (<>Since <Tex>{"a, b > 0"}</Tex>, <Tex>{"2ab > 0"}</Tex></>) },
    { label: 'IV', content: (<>So <Tex>{"(a+b)^2 > c^2"}</Tex></>) },
    { label: 'V', content: (<>Since <Tex>{"a+b > 0"}</Tex> and <Tex>{"c > 0"}</Tex>, <Tex>{"a+b > c"}</Tex></>) }
  ] },
  { type: 'prose-tight', text: (<>Which of the following best describes this attempt?</>) }
];

function ReadStep() {
  const sections = SECTIONS_Q11;
  const options = OPTIONS_Q11;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 11</span>
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

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>Audit each line in sequence. For each, ask: <b>does the claim follow from the previous lines and the hypotheses?</b></p><p style={{ margin: "0 0 4px" }}>The first line whose claim does NOT follow is the answer. If every line follows, the proof is complete and the answer is A.</p><p style={{ margin: 0 }}>Also check the final statement: does it actually prove the required result, not merely its converse or something adjacent?</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}><b>The classic pitfall:</b> taking square roots of an inequality. <Tex>{"(a+b)^2 > c^2"}</Tex> gives <Tex>{"|a+b| > |c|"}</Tex>, not <Tex>{"a+b > c"}</Tex> directly. The step is only valid when you know both sides are non-negative, so that the absolute values match the values.</p><p style={{ margin: 0 }}>Here, <Tex>{"a + b > 0"}</Tex> (sum of two positives) and <Tex>{"c > 0"}</Tex> (given), so taking positive square roots IS valid. Verify this carefully.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const FO = ({ x, y, w, hh, color, children }) => (<foreignObject x={x} y={y} width={w || 40} height={hh || 16}><div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div></foreignObject>);

  // Diagram: a table of each line with a check mark indicating validity
  const lineAuditDiagram = (validThrough) => (() => {
    const pW = 300, pH = 176;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={6} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Audit: is each line valid?</span></FO>
        {PROOF_LINES.map((l, i) => {
          const y = 28 + i * 26;
          const audited = i <= validThrough;
          const col = audited ? C.ok : C.muted;
          return (
            <g key={i}>
              <rect x={10} y={y} width={pW - 20} height={22} rx={4} fill={audited ? C.ok + "12" : C.card} stroke={col + "55"} strokeWidth={0.7} />
              <FO x={18} y={y + 3} w={28} hh={16} color={col}><span style={{ fontSize: 12, fontWeight: 700 }}>{l.roman}</span></FO>
              <FO x={52} y={y + 3} w={pW - 110} hh={16} color={C.text}><span style={{ fontSize: 11 }}>{l.note}</span></FO>
              <FO x={pW - 60} y={y + 3} w={50} hh={16} color={col}><span style={{ fontSize: 11, fontWeight: 600 }}>{audited ? "valid ✓" : "..."}</span></FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  const sqrtDiagram = (() => {
    const pW = 300, pH = 150;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={6} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Square-root step: why it's valid here</span></FO>
        <g>
          <rect x={15} y={30} width={pW - 30} height={22} rx={4} fill={C.ps + "10"} stroke={C.ps + "55"} strokeWidth={0.6} />
          <FO x={22} y={33} w={pW - 44} hh={18} color={C.text}><span style={{ fontSize: 11 }}><Tex>{"(a+b)^2 > c^2"}</Tex> (from line IV)</span></FO>
        </g>
        <g>
          <rect x={15} y={56} width={pW - 30} height={22} rx={4} fill={C.assum + "10"} stroke={C.assum + "55"} strokeWidth={0.6} />
          <FO x={22} y={59} w={pW - 44} hh={18} color={C.text}><span style={{ fontSize: 11 }}><Tex>{"\\Rightarrow |a+b| > |c|"}</Tex> (square roots)</span></FO>
        </g>
        <g>
          <rect x={15} y={82} width={pW - 30} height={22} rx={4} fill={C.ok + "12"} stroke={C.ok + "55"} strokeWidth={0.6} />
          <FO x={22} y={85} w={pW - 44} hh={18} color={C.ok}><span style={{ fontSize: 11, fontWeight: 600 }}><Tex>{"a+b > 0, \\; c > 0 \\;\\Rightarrow\\; a+b > c"}</Tex></span></FO>
        </g>
        <FO x={10} y={112} w={pW - 20} hh={30} color={C.muted}><span style={{ fontSize: 11 }}>Positive sides mean <Tex>{"|a+b| = a+b"}</Tex> and <Tex>{"|c| = c"}</Tex>, so the modulus step drops safely.</span></FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "LINE I: EXPAND (a+b)²", color: C.ok, text: <span>The standard identity <Tex>{"(a+b)^2 = a^2 + 2ab + b^2"}</Tex>. No hypothesis used yet. Valid.</span>, math: (<><div><Tex>{"(a+b)^2 = a^2 + 2ab + b^2"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\text{I: valid}}"}</Tex></div></>), diagram: lineAuditDiagram(0) },
    { label: "LINE II: USE HYPOTHESIS", color: C.ok, text: <span>Substitute <Tex>{"a^2 + b^2 = c^2"}</Tex> (given) into line I. This replaces the first two terms with <Tex>{"c^2"}</Tex>.</span>, math: (<><div><Tex>{"= c^2 + 2ab"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\text{II: valid}}"}</Tex></div></>), diagram: lineAuditDiagram(1) },
    { label: "LINE III: SIGN OF 2ab", color: C.ok, text: <span><Tex>{"a > 0"}</Tex> and <Tex>{"b > 0"}</Tex> (given) give <Tex>{"ab > 0"}</Tex>, hence <Tex>{"2ab > 0"}</Tex>.</span>, math: (<><div><Tex>{"a, b > 0 \\;\\Rightarrow\\; 2ab > 0"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\text{III: valid}}"}</Tex></div></>), diagram: lineAuditDiagram(2) },
    { label: "LINE IV: (a+b)² > c²", color: C.ok, text: <span>From line II, <Tex>{"(a+b)^2 = c^2 + 2ab"}</Tex>. From line III, <Tex>{"2ab > 0"}</Tex>. Adding a positive to <Tex>{"c^2"}</Tex> gives something strictly larger.</span>, math: (<><div><Tex>{"(a+b)^2 = c^2 + 2ab > c^2"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\text{IV: valid}}"}</Tex></div></>), diagram: lineAuditDiagram(3) },
    { label: "LINE V: TAKE SQUARE ROOTS", color: C.ok, text: <span>From <Tex>{"(a+b)^2 > c^2"}</Tex>, the cautious conclusion is <Tex>{"|a+b| > |c|"}</Tex>. But <Tex>{"a + b > 0"}</Tex> (sum of two positives) and <Tex>{"c > 0"}</Tex> (given), so the modulus bars drop harmlessly and we get <Tex>{"a + b > c"}</Tex>.</span>, math: (<><div><Tex>{"a+b > 0,\\; c > 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow\\; a+b > c"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\text{V: valid}}"}</Tex></div></>), diagram: sqrtDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>Every line is valid and the chain establishes the required result.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{Proof is complete}}"}</Tex></div>), conclusion: <span>The answer is A: it is completely correct.</span> },
  ];

  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 300px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Let student plug in (a, b, c) satisfying a² + b² = c², watch proof lines compute.
  // Presets: (3, 4, 5), (5, 12, 13), (1, 1, sqrt(2)): Pythagorean triples.
  // Student sees: each proof line holds, chain produces a + b > c.
  const triples = [
    { a: 3, b: 4, c: 5, name: "(3, 4, 5)" },
    { a: 5, b: 12, c: 13, name: "(5, 12, 13)" },
    { a: 6, b: 8, c: 10, name: "(6, 8, 10)" },
  ];
  const [idx, setIdx] = useState(0);
  const [checkedLines, setCheckedLines] = useState(new Set());

  const tr = triples[idx];
  const a = tr.a, b = tr.b, c = tr.c;
  const toggleLine = (i) => setCheckedLines(prev => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; });

  // Computed values
  const aSq = a * a, bSq = b * b, cSq = c * c, twoAB = 2 * a * b, aPlusB = a + b, aPlusBSq = aPlusB * aPlusB;
  const lineEvals = [
    { label: "I", expr: `(${a}+${b})^2 = ${aPlusBSq} = ${aSq} + ${twoAB} + ${bSq}`, holds: aPlusBSq === aSq + twoAB + bSq },
    { label: "II", expr: `= ${cSq} + ${twoAB} \\;(\\text{using } a^2+b^2=c^2)`, holds: aSq + bSq === cSq },
    { label: "III", expr: `2ab = ${twoAB} > 0`, holds: twoAB > 0 },
    { label: "IV", expr: `(${a}+${b})^2 = ${aPlusBSq} > ${cSq} = c^2`, holds: aPlusBSq > cSq },
    { label: "V", expr: `a+b = ${aPlusB} > ${c} = c`, holds: aPlusB > c },
  ];

  const allLinesChecked = checkedLines.size === 5;
  const [sawTriedTwo, setSawTriedTwo] = useState(false);
  const [triedTriples, setTriedTriples] = useState(new Set([0]));
  useEffect(() => { if (triedTriples.size >= 2) setSawTriedTwo(true); }, [triedTriples]);
  const setPreset = (i) => { setIdx(i); setTriedTriples(prev => new Set([...prev, i])); };

  const bothDemonstrated = allLinesChecked && sawTriedTwo;

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 5 }}>
        <p style={{ margin: 0, fontSize: 13, color: C.text, lineHeight: 1.5 }}>Try a few Pythagorean triples (each satisfies <Tex>{"a^2 + b^2 = c^2"}</Tex>). Check off each line once you've confirmed it holds numerically. The conclusion <Tex>{"a + b > c"}</Tex> should hold in every case.</p>
      </div>
      {/* Triple presets */}
      <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
        {triples.map((t, i) => { const active = idx === i; return (<button key={i} onClick={() => setPreset(i)} style={{ flex: 1, padding: "7px 8px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 13, cursor: "pointer", fontWeight: active ? 700 : 500 }}>{t.name}</button>); })}
      </div>
      {/* Line audit table */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", marginBottom: 5 }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>For <Tex>{`a = ${a}, \\; b = ${b}, \\; c = ${c}`}</Tex></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {lineEvals.map((le, i) => {
            const checked = checkedLines.has(i);
            return (
              <div key={i} onClick={() => toggleLine(i)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: checked ? C.conclBg : "#1e2030", border: `1px solid ${(checked ? C.ok : C.border) + (checked ? "55" : "")}`, borderRadius: 6, padding: "6px 10px" }}>
                <ProgressCheck done={checked} />
                <span style={{ fontSize: 12, fontWeight: 700, color: C.ps, minWidth: 24 }}>{le.label}</span>
                <span style={{ fontSize: 13, color: C.text, flex: 1 }}><Tex>{le.expr}</Tex></span>
                <span style={{ fontSize: 11, color: le.holds ? C.ok : C.fail, fontWeight: 600 }}>{le.holds ? "✓" : "✗"}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Progress tracker */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: allLinesChecked ? C.accentLight : C.muted }}>
            <ProgressCheck done={allLinesChecked} />
            <span style={{ fontWeight: allLinesChecked ? 700 : 500 }}>Confirmed all five lines hold for one triple. <span style={{ color: C.muted, fontWeight: 500 }}>(Proof chain checks numerically.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawTriedTwo ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawTriedTwo} />
            <span style={{ fontWeight: sawTriedTwo ? 700 : 500 }}>Tested at least two different triples. <span style={{ color: C.muted, fontWeight: 500 }}>(Same logic each time.)</span></span>
          </div>
        </div>
        {bothDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>Expanding <Tex>{"(a+b)^2"}</Tex> introduces the slack <Tex>{"+2ab"}</Tex> above <Tex>{"c^2"}</Tex>, and because both <Tex>{"a+b"}</Tex> and <Tex>{"c"}</Tex> are positive, square-rooting the inequality safely gives <Tex>{"a+b > c"}</Tex>. No step depends on an unproven lemma.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is A: it is completely correct.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Click each line to check it off, then try another triple.
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
        <div style={{ marginBottom: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: 1 }}>TMUA</span><span style={{ fontSize: 12, color: C.muted }}>AceAdmissions Mock {"·"} Set {META.set}</span><span style={{ fontSize: 12, color: C.muted }}>{"·"}</span><span style={{ fontSize: 12, color: C.ps }}>{META.topicTag}</span></div><h1 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: titleFont, fontStyle: "italic", letterSpacing: 0.5 }}>Interactive Walkthrough</h1><p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{META.paperNumber} {"·"} Question {META.questionNumber}</p></div>
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
  const sections = SECTIONS_Q11;
  const options = OPTIONS_Q11;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q11</span>
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

