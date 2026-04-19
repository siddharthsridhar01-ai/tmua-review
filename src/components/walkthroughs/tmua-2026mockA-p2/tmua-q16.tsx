"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 16, paper: "Set A Paper 2", year: "2026 Mock", topicTag: "Number / Sequences / gcd" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\text{none of them}", expl: "Statement I is actually true. Since u₁ = a ≡ 0 and u₂ = b ≡ 0 mod 5 (because hcf(a, b) = 5 means both are multiples of 5), every subsequent term is a sum of two multiples of 5, so the whole sequence is ≡ 0 mod 5. So at least I holds." },
  { letter: "B", ok: true, tex: "\\text{I only}", expl: "I is true: since 5 | a and 5 | b, the recurrence u_{n+2} = u_{n+1} + u_n preserves divisibility by 5 at every step, so 5 | u_{100}. II is false: take a = 10, b = 15 (hcf = 5). Here u_1 = 10 does not divide u_2 = 15, but u_4 = u_3 + u_2 = 25 + 15 = 40, and 10 | 40. III is false: take a = 15, b = 5 (hcf = 5). Then u_5 = 2a + 3b = 30 + 15 = 45, and hcf(15, 45) = 15, not 5." },
  { letter: "C", ok: false, tex: "\\text{II only}", expl: "II is actually false. Counterexample: a = 10, b = 15 (hcf = 5). u_1 = 10 does not divide u_2 = 15. But u_4 = 40, and 10 does divide 40, breaking the claim that u_1 divides no later term." },
  { letter: "D", ok: false, tex: "\\text{III only}", expl: "III is not always true. Counterexample: a = 15, b = 5 (hcf = 5). Compute u_5 = 2a + 3b = 30 + 15 = 45. Then hcf(u_1, u_5) = hcf(15, 45) = 15, not 5." },
  { letter: "E", ok: false, tex: "\\text{I and II only}", expl: "I is correct but II is false. Take a = 10, b = 15: u_1 = 10 does not divide u_2 = 15, yet u_4 = 40 is a multiple of u_1 = 10. So II fails." },
  { letter: "F", ok: false, tex: "\\text{I and III only}", expl: "I is correct but III is false in general. With a = 15, b = 5 we get u_5 = 45, and hcf(15, 45) = 15, not 5." },
  { letter: "G", ok: false, tex: "\\text{II and III only}", expl: "I is true (not included here), and both II and III are false in general. II fails at a = 10, b = 15 (u_1 = 10 divides u_4 = 40). III fails at a = 15, b = 5 (hcf(u_1, u_5) = 15)." },
  { letter: "H", ok: false, tex: "\\text{I, II and III}", expl: "Only I must hold. II and III both admit counterexamples: (a, b) = (10, 15) breaks II because u_1 = 10 divides u_4 = 40 even though u_1 does not divide u_2 = 15. (a, b) = (15, 5) breaks III because hcf(u_1, u_5) = hcf(15, 45) = 15." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const ITEMS_Q16 = [
  { label: 'I', content: (<><Tex>{"u_{100}"}</Tex> is a multiple of <Tex>{"5"}</Tex></>) },
  { label: 'II', content: (<>If <Tex>{"u_1"}</Tex> is not a factor of <Tex>{"u_2"}</Tex>, then <Tex>{"u_1"}</Tex> is not a factor of <Tex>{"u_n"}</Tex> for any <Tex>{"n > 1"}</Tex></>) },
  { label: 'III', content: (<><Tex>{"\\operatorname{hcf}(u_1, u_5) = 5"}</Tex></>) }
];
const OPTIONS_Q16 = [
  ["A", "\\text{none of them}"],
  ["B", "\\text{I only}"],
  ["C", "\\text{II only}"],
  ["D", "\\text{III only}"],
  ["E", "\\text{I and II only}"],
  ["F", "\\text{I and III only}"],
  ["G", "\\text{II and III only}"],
  ["H", "\\text{I, II and III}"]
];
const SECTIONS_Q16 = [
  { type: 'prose', text: (<>A sequence is defined by</>) },
  { type: "mathbox", tex: "u_1 = a, \\quad u_2 = b, \\quad u_{n+2} = u_{n+1} + u_n" },
  { type: 'prose', text: (<>where <Tex>{"a"}</Tex> and <Tex>{"b"}</Tex> are positive integers with <Tex>{"\\operatorname{hcf}(a, b) = 5"}</Tex>.</>) },
  { type: 'prose', text: (<>Which of the following statements must be true?</>) },
  { type: "items", items: [
    { label: 'I', content: (<><Tex>{"u_{100}"}</Tex> is a multiple of <Tex>{"5"}</Tex></>) },
    { label: 'II', content: (<>If <Tex>{"u_1"}</Tex> is not a factor of <Tex>{"u_2"}</Tex>, then <Tex>{"u_1"}</Tex> is not a factor of <Tex>{"u_n"}</Tex> for any <Tex>{"n > 1"}</Tex></>) },
    { label: 'III', content: (<><Tex>{"\\operatorname{hcf}(u_1, u_5) = 5"}</Tex></>) }
  ] }
];

function QuestionSummary() {
  const sections = SECTIONS_Q16;
  const options = OPTIONS_Q16;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q16</span>
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
function ProgressCheck({ done }) { const size = 16; const color = done ? C.accentLight : C.muted; return (<svg width={size} height={size} viewBox="0 0 16 16" style={{ flexShrink: 0 }}><rect x={1.5} y={1.5} width={13} height={13} rx={2.5} fill="none" stroke={color} strokeWidth={1.5} />{done && (<><line x1={4.5} y1={4.5} x2={11.5} y2={11.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" /><line x1={11.5} y1={4.5} x2={4.5} y2={11.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" /></>)}</svg>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  const sections = SECTIONS_Q16;
  const options = OPTIONS_Q16;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 16</span>
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

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>This is a multiple-true-false question. Each of I, II, III has to be decided independently. A statement "must be true" is only established by a general proof; it is refuted by a single concrete counterexample.</p><p style={{ margin: "0 0 4px" }}>For I: use the fact that if <Tex>{"u_1"}</Tex> and <Tex>{"u_2"}</Tex> are both multiples of <Tex>{"5"}</Tex>, then every later term (a sum of two earlier terms) is also a multiple of <Tex>{"5"}</Tex>.</p><p style={{ margin: 0 }}>For II and III: try specific <Tex>{"(a, b)"}</Tex> pairs with <Tex>{"\\operatorname{hcf}(a, b) = 5"}</Tex> and look for counterexamples. Useful candidates are <Tex>{"(5, 5), (5, 10), (10, 15), (15, 5)"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Key fact for I: <Tex>{"\\operatorname{hcf}(a, b) = 5"}</Tex> tells you that <Tex>{"a"}</Tex> and <Tex>{"b"}</Tex> are both multiples of <Tex>{"5"}</Tex>. So the sequence starts with two multiples of <Tex>{"5"}</Tex>. The recurrence adds consecutive terms, and the sum of two multiples of <Tex>{"5"}</Tex> is still a multiple of <Tex>{"5"}</Tex>, so this property propagates forever.</p><p style={{ margin: 0 }}>Key fact for III: compute <Tex>{"u_5"}</Tex> in terms of <Tex>{"a"}</Tex> and <Tex>{"b"}</Tex>. You'll get <Tex>{"u_5 = 2a + 3b"}</Tex>, and then <Tex>{"\\operatorname{hcf}(a, 2a + 3b) = \\operatorname{hcf}(a, 3b)"}</Tex>, which can exceed <Tex>{"5"}</Tex>.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram: show the sequence mod 5 starting from (0, 0), demonstrating all terms are 0 mod 5
  const mod5Diagram = (() => {
    const pW = 280, pH = 140;
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    // Table: n, u_n mod 5
    const nValues = [1, 2, 3, 4, 5, 6, 7, 8];
    const modValues = [0, 0, 0, 0, 0, 0, 0, 0];  // all zero
    const cellW = 24, cellH = 26;
    const tableX = 54, tableY = 28;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={4} w={pW - 20} hh={16} color={C.ok}><span style={{ fontWeight: 700, fontSize: 11 }}>Remainders when divided by <Tex>{"5"}</Tex> (all zero)</span></FO>
        {/* Header row: n */}
        <FO x={2} y={tableY + 2} w={50} hh={14} color={C.muted}><Tex>{"n"}</Tex></FO>
        {nValues.map((n, i) => (
          <g key={`n${i}`}>
            <rect x={tableX + i * cellW} y={tableY} width={cellW} height={cellH} fill="none" stroke={C.border} strokeWidth={0.8} />
            <FO x={tableX + i * cellW} y={tableY + 6} w={cellW} hh={14} color={C.muted}><span style={{ fontSize: 11 }}>{n}</span></FO>
          </g>
        ))}
        {/* Row: u_n mod 5 */}
        <FO x={2} y={tableY + cellH + 5} w={50} hh={14} color={C.muted}><span style={{ fontSize: 11 }}>rem.</span></FO>
        {modValues.map((v, i) => (
          <g key={`m${i}`}>
            <rect x={tableX + i * cellW} y={tableY + cellH} width={cellW} height={cellH} fill={C.ok + "22"} stroke={C.ok} strokeWidth={0.8} />
            <FO x={tableX + i * cellW} y={tableY + cellH + 6} w={cellW} hh={14} color={C.ok}><span style={{ fontWeight: 700, fontSize: 12 }}>{v}</span></FO>
          </g>
        ))}
        <FO x={10} y={tableY + 2 * cellH + 10} w={pW - 20} hh={20} color={C.muted}><span style={{ fontSize: 11 }}>Since <Tex>{"u_1"}</Tex> and <Tex>{"u_2"}</Tex> are multiples of <Tex>{"5"}</Tex>, every later term is too.</span></FO>
      </svg>
    );
  })();

  // Diagram for III counterexample: show (a, b) = (15, 5), compute u_5 = 45
  const counterDiagram = (() => {
    const pW = 280, pH = 150;
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const nValues = [1, 2, 3, 4, 5];
    const vals = [15, 5, 20, 25, 45];
    const cellW = 40, cellH = 26;
    const tableX = 50, tableY = 30;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={4} w={pW - 20} hh={16} color={C.fail}><span style={{ fontWeight: 700, fontSize: 11 }}>Counter for III: <Tex>{"a = 15,\\; b = 5"}</Tex></span></FO>
        {/* Header row: n */}
        <FO x={2} y={tableY + 6} w={46} hh={14} color={C.muted}><Tex>{"n"}</Tex></FO>
        {nValues.map((n, i) => (
          <g key={`n${i}`}>
            <rect x={tableX + i * cellW} y={tableY} width={cellW} height={cellH} fill="none" stroke={C.border} strokeWidth={0.8} />
            <FO x={tableX + i * cellW} y={tableY + 6} w={cellW} hh={14} color={C.muted}><span style={{ fontSize: 11 }}>{n}</span></FO>
          </g>
        ))}
        {/* Row: u_n */}
        <FO x={2} y={tableY + cellH + 6} w={46} hh={14} color={C.muted}><Tex>{"u_n"}</Tex></FO>
        {vals.map((v, i) => {
          const isHighlight = i === 0 || i === 4;
          return (
            <g key={`v${i}`}>
              <rect x={tableX + i * cellW} y={tableY + cellH} width={cellW} height={cellH} fill={isHighlight ? C.fail + "22" : "none"} stroke={isHighlight ? C.fail : C.border} strokeWidth={0.8} />
              <FO x={tableX + i * cellW} y={tableY + cellH + 6} w={cellW} hh={14} color={isHighlight ? C.fail : C.text}><span style={{ fontWeight: isHighlight ? 700 : 500, fontSize: 12 }}>{v}</span></FO>
            </g>
          );
        })}
        <FO x={10} y={tableY + 2 * cellH + 14} w={pW - 20} hh={30} color={C.fail}>
          <span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"\\operatorname{hcf}(u_1, u_5) = \\operatorname{hcf}(15, 45) = 15"}</Tex></span>
        </FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "STATEMENT I: u₁₀₀ DIVISIBLE BY 5", color: C.ok, text: <span>Since <Tex>{"\\operatorname{hcf}(a, b) = 5"}</Tex>, both <Tex>{"a"}</Tex> and <Tex>{"b"}</Tex> are multiples of <Tex>{"5"}</Tex>. So <Tex>{"u_1"}</Tex> and <Tex>{"u_2"}</Tex> are multiples of <Tex>{"5"}</Tex>. But the sum of two multiples of <Tex>{"5"}</Tex> is also a multiple of <Tex>{"5"}</Tex>, so <Tex>{"u_3 = u_2 + u_1"}</Tex> is a multiple of <Tex>{"5"}</Tex>. Repeating this step indefinitely, every later term is a multiple of <Tex>{"5"}</Tex>. In particular, <Tex>{"u_{100}"}</Tex> is a multiple of <Tex>{"5"}</Tex>.</span>, math: (<><div><span><Tex>{"u_1"}</Tex> and <Tex>{"u_2"}</Tex> are multiples of <Tex>{"5"}</Tex></span></div><div style={{ marginTop: 4 }}><span>so <Tex>{"u_3 = u_1 + u_2"}</Tex> is also a multiple of <Tex>{"5"}</Tex></span></div><div style={{ marginTop: 4 }}><span>and so are <Tex>{"u_4, u_5, \\ldots"}</Tex></span></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\Rightarrow \\text{I is TRUE}}"}</Tex></div></>), diagram: mod5Diagram },
    { label: "STATEMENT II: COUNTEREXAMPLE", color: C.fail, text: <span>Try <Tex>{"a = 10, b = 15"}</Tex> (so <Tex>{"\\operatorname{hcf}(a, b) = 5"}</Tex>). The sequence starts <Tex>{"10, 15, 25, 40, \\ldots"}</Tex>. Is <Tex>{"u_1 = 10"}</Tex> a factor of <Tex>{"u_2 = 15"}</Tex>? No. But <Tex>{"u_4 = 40 = 4 \\times 10"}</Tex>, so <Tex>{"u_1"}</Tex> DOES divide <Tex>{"u_4"}</Tex>. Statement II claims this can never happen; this example shows it can. So II is false.</span>, math: (<><div><Tex>{"(a, b) = (10, 15): \\;\\; 10, 15, 25, 40, \\ldots"}</Tex></div><div style={{ marginTop: 4 }}><span><Tex>{"10"}</Tex> is NOT a factor of <Tex>{"15"}</Tex>, but <Tex>{"10"}</Tex> IS a factor of <Tex>{"40"}</Tex></span></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{\\Rightarrow \\text{II is FALSE}}"}</Tex></div></>) },
    { label: "STATEMENT III: COMPUTE u₅", color: C.fail, text: <span>Work out <Tex>{"u_5"}</Tex> in closed form. <Tex>{"u_3 = a + b, u_4 = a + 2b, u_5 = 2a + 3b"}</Tex>. So <Tex>{"\\operatorname{hcf}(u_1, u_5) = \\operatorname{hcf}(a, 2a + 3b) = \\operatorname{hcf}(a, 3b)"}</Tex>. This usually equals <Tex>{"5"}</Tex>, but not always. Try <Tex>{"a = 15, b = 5"}</Tex>: <Tex>{"u_5 = 30 + 15 = 45"}</Tex>, so <Tex>{"\\operatorname{hcf}(15, 45) = 15"}</Tex>, not <Tex>{"5"}</Tex>. III fails.</span>, math: (<><div><Tex>{"u_5 = 2a + 3b"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\operatorname{hcf}(u_1, u_5) = \\operatorname{hcf}(a, 3b)"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"(a, b) = (15, 5): \\;\\; \\operatorname{hcf}(15, 45) = 15"}</Tex></div><div style={{ marginTop: 4, color: C.fail }}><Tex>{"\\color{#ff7675}{\\Rightarrow \\text{III is FALSE}}"}</Tex></div></>), diagram: counterDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>Only statement I must be true. Statements II and III admit counterexamples. The answer is <b>B</b>: I only.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{I true}} \\;\\; \\color{#ff7675}{\\text{II false}} \\;\\; \\color{#ff7675}{\\text{III false}}"}</Tex></div>), conclusion: <span>The answer is B: I only.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 280px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function gcd(x, y) { x = Math.abs(x); y = Math.abs(y); while (y) { [x, y] = [y, x % y]; } return x; }

function VerifyStepContent() {
  // Preset (a, b) with gcd = 5, chosen to exercise each statement
  const presets = [
    { a: 5, b: 5, label: "5, 5" },
    { a: 5, b: 10, label: "5, 10" },
    { a: 10, b: 15, label: "10, 15" },   // breaks II: 10 | 40
    { a: 15, b: 5, label: "15, 5" },     // breaks III: hcf(15, 45) = 15
    { a: 5, b: 20, label: "5, 20" },
  ];
  const [idx, setIdx] = useState(0);
  const { a, b } = presets[idx];

  // Compute first 10 terms
  const terms = [a, b];
  for (let i = 2; i < 10; i++) terms.push(terms[i - 1] + terms[i - 2]);
  const mod5 = terms.map(v => v % 5);
  // u_5 = terms[4]; gcd(u_1, u_5) = gcd(a, terms[4])
  const u5 = terms[4];
  const gcdU1U5 = gcd(a, u5);
  // For II: check if a | u_n for any n >= 2, assuming a ∤ b
  const aDividesB = (b % a === 0);
  let laterDivIndex = -1;
  if (!aDividesB) {
    for (let n = 1; n < terms.length; n++) {
      if (terms[n] % a === 0) { laterDivIndex = n; break; }
    }
  }

  // Progress flags
  const [sawIHolds, setSawIHolds] = useState(false);
  const [sawIIFail, setSawIIFail] = useState(false);
  const [sawIIIFail, setSawIIIFail] = useState(false);
  useEffect(() => {
    if (mod5.every(v => v === 0)) setSawIHolds(true);
    if (!aDividesB && laterDivIndex > 0) setSawIIFail(true);
    if (gcdU1U5 !== 5) setSawIIIFail(true);
  }, [idx]);
  const allDemonstrated = sawIHolds && sawIIFail && sawIIIFail;

  // Diagram: sequence + mod 5 row
  const graph = (() => {
    const pW = 380, pH = 180;
    const cellW = 30, cellH = 26;
    const tableX = 62, tableY = 36;
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={C.muted}><span style={{ fontWeight: 700, fontSize: 12 }}>Sequence with <Tex>{`(a,b) = (${a}, ${b})`}</Tex></span></FO>
        {/* Header row: n */}
        <FO x={2} y={tableY + 6} w={58} hh={14} color={C.muted}><Tex>{"n"}</Tex></FO>
        {terms.map((_, i) => (
          <g key={`n${i}`}>
            <rect x={tableX + i * cellW} y={tableY} width={cellW} height={cellH} fill="none" stroke={C.border} strokeWidth={0.8} />
            <FO x={tableX + i * cellW} y={tableY + 6} w={cellW} hh={14} color={C.muted}><span style={{ fontSize: 11 }}>{i + 1}</span></FO>
          </g>
        ))}
        {/* u_n row */}
        <FO x={2} y={tableY + cellH + 6} w={58} hh={14} color={C.muted}><Tex>{"u_n"}</Tex></FO>
        {terms.map((v, i) => {
          const isU1 = i === 0, isU5 = i === 4;
          const isLaterDiv = i === laterDivIndex;
          const hl = isU1 || isU5 ? C.calc : (isLaterDiv ? C.fail : null);
          return (
            <g key={`v${i}`}>
              <rect x={tableX + i * cellW} y={tableY + cellH} width={cellW} height={cellH} fill={hl ? hl + "22" : "none"} stroke={hl || C.border} strokeWidth={0.8} />
              <FO x={tableX + i * cellW} y={tableY + cellH + 6} w={cellW} hh={14} color={hl || C.text}><span style={{ fontWeight: hl ? 700 : 500, fontSize: 11 }}>{v}</span></FO>
            </g>
          );
        })}
        {/* mod 5 row */}
        <FO x={2} y={tableY + 2 * cellH + 6} w={58} hh={14} color={C.muted}><span style={{ fontSize: 11 }}>rem.</span></FO>
        {mod5.map((v, i) => (
          <g key={`m${i}`}>
            <rect x={tableX + i * cellW} y={tableY + 2 * cellH} width={cellW} height={cellH} fill={v === 0 ? C.ok + "22" : C.fail + "22"} stroke={v === 0 ? C.ok : C.fail} strokeWidth={0.8} />
            <FO x={tableX + i * cellW} y={tableY + 2 * cellH + 6} w={cellW} hh={14} color={v === 0 ? C.ok : C.fail}><span style={{ fontWeight: 700, fontSize: 12 }}>{v}</span></FO>
          </g>
        ))}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}>Starting pair <Tex>{"(a, b)"}</Tex></span>
          <span style={{ fontSize: 13, color: C.calc, fontWeight: 700 }}><Tex>{`(a, b) = (${a}, ${b}),\\; \\operatorname{hcf} = ${gcd(a, b)}`}</Tex></span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {presets.map((pr, i) => { const active = i === idx; return (<button key={i} onClick={() => setIdx(i)} style={{ flex: 1, padding: "6px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 500 }}><Tex>{pr.label}</Tex></button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}><Tex>{"\\operatorname{hcf}(u_1, u_5)"}</Tex></div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.calc, marginTop: 2 }}><Tex>{`\\operatorname{hcf}(${a}, ${u5}) = ${gcdU1U5}`}</Tex></div>
            <div style={{ fontSize: 11, color: gcdU1U5 === 5 ? C.ok : C.fail, marginTop: 2 }}>{gcdU1U5 === 5 ? "matches 5 ✓" : `≠ 5 ✗`}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}>Is <Tex>{"a"}</Tex> a factor of any <Tex>{"u_n"}</Tex>?</div>
            {aDividesB ? (
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}><Tex>{"a"}</Tex> already divides <Tex>{"b"}</Tex></div>
            ) : laterDivIndex > 0 ? (
              <>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.fail, marginTop: 2 }}><Tex>{`u_{${laterDivIndex + 1}} = ${terms[laterDivIndex]}`}</Tex></div>
                <div style={{ fontSize: 11, color: C.fail, marginTop: 2 }}>II breaks here ✗</div>
              </>
            ) : (
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>none in first 10</div>
            )}
          </div>
        </div>
      </div>
      <div style={{ background: mod5.every(v => v === 0) ? C.conclBg : C.failBg, border: `1px solid ${(mod5.every(v => v === 0) ? C.ok : C.fail) + "55"}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: mod5.every(v => v === 0) ? C.ok : C.fail, lineHeight: 1.5 }}>
          {mod5.every(v => v === 0) ? (<span>Every term so far is divisible by <Tex>{"5"}</Tex> (bottom row is all zeros).</span>) : (<span>Sequence leaves <Tex>{"5"}</Tex>-divisibility!</span>)}
        </div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 2, lineHeight: 1.5 }}>In every case with <Tex>{"\\operatorname{hcf}(a, b) = 5"}</Tex>, the remainder row is always zero. Statement I is secured.</div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawIHolds ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawIHolds} />
            <span style={{ fontWeight: sawIHolds ? 700 : 500 }}>Saw the remainder row stay all zero. <span style={{ color: C.muted, fontWeight: 500 }}>(Secures I.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawIIFail ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawIIFail} />
            <span style={{ fontWeight: sawIIFail ? 700 : 500 }}>Saw <Tex>{"u_1"}</Tex> failing to divide <Tex>{"u_2"}</Tex>, yet dividing a later <Tex>{"u_n"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Breaks II.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawIIIFail ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawIIIFail} />
            <span style={{ fontWeight: sawIIIFail ? 700 : 500 }}>Saw <Tex>{"\\operatorname{hcf}(u_1, u_5) \\ne 5"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Breaks III.)</span></span>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>Only I must hold. II fails for <Tex>{"(10, 15)"}</Tex> because <Tex>{"u_4 = 40"}</Tex> is divisible by <Tex>{"u_1 = 10"}</Tex>. III fails for <Tex>{"(15, 5)"}</Tex> because <Tex>{"\\operatorname{hcf}(15, 45) = 15"}</Tex>.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is B: I only.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Try all five presets. Each one lights up at least one progress box.
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
