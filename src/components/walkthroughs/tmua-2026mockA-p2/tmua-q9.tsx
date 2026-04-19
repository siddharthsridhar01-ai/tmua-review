"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 9, paper: "Set A Paper 2", year: "2026 Mock", topicTag: "Inequalities / Implications" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "k \\le 0", expl: "These k values work, but they aren't the complete set. For example k = 2 also works: if x ≥ 2 then x² ≥ 4 ≥ 2, so the implication holds. The answer must include all k ≥ 1 as well." },
  { letter: "B", ok: false, tex: "k \\ge 1", expl: "These k values work, but they aren't the complete set. For example k = -3 also works: if x ≥ -3 then... we just need x² ≥ -3, but x² ≥ 0 ≥ -3 is always true. So negative k values also work." },
  { letter: "C", ok: true, tex: "k \\le 0 \\text{ or } k \\ge 1", expl: "For k ≤ 0: x² is always ≥ 0 ≥ k, so the implication holds trivially (the conclusion is always true). For k ≥ 1: if x ≥ k ≥ 1, then x² ≥ x (since x ≥ 1) and x ≥ k, so x² ≥ k. For 0 < k < 1: counterexample x = k itself, where x² = k² < k. So the implication FAILS on (0, 1) and HOLDS on the complement." },
  { letter: "D", ok: false, tex: "0 < k < 1", expl: "This is the opposite: for 0 < k < 1 the implication actually FAILS. Counterexample x = k: then x ≥ k holds but x² = k² < k (because squaring a number between 0 and 1 makes it smaller)." },
  { letter: "E", ok: false, tex: "\\text{all real } k", expl: "The implication fails on the interval (0, 1). For example k = 0.5: pick x = 0.5, then x ≥ 0.5 ✓ but x² = 0.25 < 0.5, so x² ≥ k fails. Thus not all real k work." },
  { letter: "F", ok: false, tex: "\\text{no real } k", expl: "Plenty of k values work. For instance k = 0: x ≥ 0 gives x² ≥ 0 ✓. Or k = 2: x ≥ 2 gives x² ≥ 4 ≥ 2 ✓. So the set of valid k is definitely not empty." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }


const ITEMS_Q9 = null;
const OPTIONS_Q9 = [
  ["A", "k \\le 0"],
  ["B", "k \\ge 1"],
  ["C", "k \\le 0 \\text{ or } k \\ge 1"],
  ["D", "0 < k < 1"],
  ["E", "\\text{all real k}"],
  ["F", "\\text{no real k}"]
];
const SECTIONS_Q9 = [
  { type: 'prose', text: (<>Consider the following statement about a real number <Tex>{"k"}</Tex>:</>) },
  { type: "mathbox", tex: "\\text{For all real } x, \\quad x \\ge k \\;\\Rightarrow\\; x^2 \\ge k" },
  { type: 'prose-tight', text: (<>What is the complete set of values of <Tex>{"k"}</Tex> for which this statement is true?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q9;
  const options = OPTIONS_Q9;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q9</span>
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
  const sections = SECTIONS_Q9;
  const options = OPTIONS_Q9;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 9</span>
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
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 200px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>The implication "<Tex>{"x \\ge k \\Rightarrow x^2 \\ge k"}</Tex>" says: whenever <Tex>{"x"}</Tex> is at least <Tex>{"k"}</Tex>, its square is also at least <Tex>{"k"}</Tex>.</p><p style={{ margin: "0 0 4px" }}>To find the values of <Tex>{"k"}</Tex> for which this is true, split into cases based on the sign and size of <Tex>{"k"}</Tex>.</p><p style={{ margin: 0 }}>Look for a single counterexample (some <Tex>{"x \\ge k"}</Tex> with <Tex>{"x^2 < k"}</Tex>) to disprove the statement for a given <Tex>{"k"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>The most dangerous candidate for a counterexample is usually the boundary: <Tex>{"x = k"}</Tex> itself. At this value, <Tex>{"x \\ge k"}</Tex> holds (with equality), and we need <Tex>{"k^2 \\ge k"}</Tex>.</p><p style={{ margin: 0 }}>That reduces to <Tex>{"k^2 - k \\ge 0"}</Tex>, or <Tex>{"k(k - 1) \\ge 0"}</Tex>, which holds when <Tex>{"k \\le 0"}</Tex> or <Tex>{"k \\ge 1"}</Tex>. This is a necessary condition on <Tex>{"k"}</Tex>. Check it's also sufficient.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Parabola with shaded "bad zone" (0 < k < 1)
  const kCasesDiagram = (() => {
    const pW = 280, pH = 200;
    const pad = { l: 24, r: 10, t: 14, b: 24 };
    const xMin = -2, xMax = 2, yMin = -2, yMax = 3;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    // Parabola y = x^2, sampled
    const parabola = [];
    for (let i = 0; i <= 80; i++) {
      const x = xMin + (i / 80) * (xMax - xMin);
      parabola.push(`${sx(x)},${sy(x * x)}`);
    }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="parClip9"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        {/* Bad zone: 0 < k < 1 shaded */}
        <rect x={sx(0)} y={pad.t} width={sx(1) - sx(0)} height={pH - pad.t - pad.b} fill={C.fail} opacity={0.14} />
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={0.7} />
        {/* y = x line (the identity) */}
        <line x1={sx(xMin)} y1={sy(xMin)} x2={sx(xMax)} y2={sy(xMax)} stroke={C.assum} strokeWidth={1} strokeDasharray="3,3" />
        <g clipPath="url(#parClip9)">
          <polyline points={parabola.join(" ")} fill="none" stroke={C.ok} strokeWidth={2} />
        </g>
        <FO x={sx(1.3) + 4} y={sy(1.3) - 18} w={50} hh={14} color={C.assum}><Tex>{"y = x"}</Tex></FO>
        <FO x={sx(-1.4)} y={sy(2) - 4} w={50} hh={14} color={C.ok}><Tex>{"y = x^2"}</Tex></FO>
        {/* Bad-zone label */}
        <FO x={sx(0.5) - 40} y={sy(-0.5) - 6} w={80} hh={14} color={C.fail}><span style={{ fontSize: 11, fontWeight: 700 }}>bad zone</span></FO>
        <FO x={sx(0.5) - 40} y={sy(-0.5) + 8} w={80} hh={14} color={C.fail}><Tex>{"0 < k < 1"}</Tex></FO>
        {/* Axis ticks */}
        <FO x={sx(1) - 6} y={sy(0) + 3} w={14} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO x={sx(-1) - 6} y={sy(0) + 3} w={14} hh={14} color={C.muted}><Tex>{"-1"}</Tex></FO>
        <FO x={sx(0) - 16} y={sy(1) - 6} w={14} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "TRY THE BOUNDARY CASE x = k", color: C.ps, text: <span>The implication "<Tex>{"x \\ge k \\Rightarrow x^2 \\ge k"}</Tex>" must hold for every <Tex>{"x"}</Tex>, including <Tex>{"x = k"}</Tex> (which trivially satisfies <Tex>{"x \\ge k"}</Tex>). Substituting gives the condition <Tex>{"k^2 \\ge k"}</Tex>.</span>, math: (<><div><Tex>{"x = k: \\quad k^2 \\ge k"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Leftrightarrow\\; k(k-1) \\ge 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Leftrightarrow\\; k \\le 0 \\text{ or } k \\ge 1"}</Tex></div></>) },
    { label: "CHECK: IS THIS ALSO SUFFICIENT?", color: C.ok, text: <span>We've shown <Tex>{"k \\le 0 \\text{ or } k \\ge 1"}</Tex> is necessary. Now check whether every such <Tex>{"k"}</Tex> also makes the full implication hold for ALL <Tex>{"x \\ge k"}</Tex>, not just <Tex>{"x = k"}</Tex>.</span>, math: (<><div><Tex>{"\\text{Case 1: } k \\le 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 \\ge 0 \\ge k \\;\\checkmark"}</Tex></div><div style={{ marginTop: 8 }}><Tex>{"\\text{Case 2: } k \\ge 1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x \\ge k \\ge 1 \\Rightarrow x^2 \\ge x \\ge k"}</Tex></div></>), diagram: kCasesDiagram },
    { label: "CONFIRM THE 'BAD ZONE'", color: C.fail, text: <span>For <Tex>{"0 < k < 1"}</Tex>, the implication fails. Take <Tex>{"x = k"}</Tex>: then <Tex>{"x \\ge k"}</Tex> ✓ but <Tex>{"x^2 = k^2 < k"}</Tex> (because squaring a number strictly between 0 and 1 makes it smaller). Counterexample found.</span>, math: (<><div><Tex>{"k = 0.5, \\; x = 0.5"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x \\ge k \\;\\checkmark"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 = 0.25 < 0.5 = k \\;\\text{✗}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#ff7675}{\\text{Statement FAILS on } (0, 1)}"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>The statement is true exactly for <Tex>{"k \\le 0"}</Tex> or <Tex>{"k \\ge 1"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{k \\le 0 \\text{ or } k \\ge 1}"}</Tex></div>), conclusion: <span>The answer is C: <Tex>{"k \\le 0"}</Tex> or <Tex>{"k \\ge 1"}</Tex>.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 280px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Slider for k. Plot y = x^2 and y = k as horizontal line. For each x in [k, xmax],
  // check whether x^2 >= k. Show the "region to verify" (x >= k) and highlight any x
  // where x^2 < k (which would be a counterexample).
  const [k, setK] = useState(0.5);
  // Progress flags: student should see the statement hold on both k ≤ 0 AND k ≥ 1, and fail in 0 < k < 1
  const [sawHoldNeg, setSawHoldNeg] = useState(false);    // held at some k ≤ 0
  const [sawHoldHigh, setSawHoldHigh] = useState(false);  // held at some k ≥ 1
  const [sawFailMid, setSawFailMid] = useState(false);    // failed at some 0 < k < 1
  const snap = [-2, -1, -0.5, 0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3];
  const snapRadius = 0.08;
  const handleSnap = (raw) => { for (const s of snap) { if (Math.abs(raw - s) < snapRadius) return s; } return Math.round(raw * 20) / 20; };

  // Check statement: for all x >= k, is x^2 >= k?
  // This fails iff there exists x in [k, ?] with x^2 < k. The worst x is the one minimising x^2 in [k, infinity).
  // If k >= 0, the minimum of x^2 on [k, infinity) is k^2, at x = k. So statement holds iff k^2 >= k, i.e. k <= 0 or k >= 1.
  // If k < 0, minimum of x^2 on [k, infinity) is 0 (at x = 0), and 0 >= k since k < 0. Always holds.
  const holds = (k <= 0) || (k >= 1);

  useEffect(() => {
    if (holds && k <= 0) setSawHoldNeg(true);
    if (holds && k >= 1) setSawHoldHigh(true);
    if (!holds && k > 0 && k < 1) setSawFailMid(true);
  }, [k, holds]);
  const allDemonstrated = sawHoldNeg && sawHoldHigh && sawFailMid;

  // Key counterexample x: when 0 < k < 1, x = k works. When holds, no counterexample.
  const counterX = holds ? null : k;
  const counterXSq = counterX !== null ? counterX * counterX : null;

  // Plot
  const graph = (() => {
    const pW = 380, pH = 260;
    const pad = { l: 28, r: 16, t: 16, b: 22 };
    // Generous ranges so y = k and x = k stay visible for all slider values (k ∈ [-2, 3]).
    // Also gives room above the parabola for the "y = x^2" label.
    const xMin = -3, xMax = 4, yMin = -2.5, yMax = 5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    // Parabola colouring:
    //   0 ≤ x ≤ 1: ALWAYS RED: this is the structural "danger zone" where x^2 < x,
    //     which is the only stretch of the parabola that can dip below any positive threshold.
    //   Outside [0,1]: depends on whether we're in the test region x ≥ k.
    //     x ≥ k: GREEN (conclusion x^2 ≥ k holds: we verify this below)
    //     x < k: GREY DASHED (outside test region, not being evaluated)
    // Segments are built so consecutive pieces share boundary points, avoiding visual gaps.
    const N = 300;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const x = xMin + (i / N) * (xMax - xMin);
      const y = x * x;
      let kind;
      if (x >= 0 && x <= 1) kind = "red";
      else if (x >= k) kind = "green";
      else kind = "grey";
      pts.push({ x, y, sx: sx(x), sy: sy(y), kind });
    }
    // Group into consecutive runs of the same kind, but include boundary point in both runs so no gap
    const runs = [];
    let current = { kind: pts[0].kind, points: [pts[0]] };
    for (let i = 1; i < pts.length; i++) {
      if (pts[i].kind === current.kind) {
        current.points.push(pts[i]);
      } else {
        current.points.push(pts[i]); // include boundary in current run
        runs.push(current);
        current = { kind: pts[i].kind, points: [pts[i - 1], pts[i]] }; // start new run with previous point too
      }
    }
    runs.push(current);
    const gridLines = [];
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0) continue;
      gridLines.push(<line key={`gx${x}`} x1={sx(x)} y1={sy(yMax)} x2={sx(x)} y2={sy(yMin)} stroke={C.border} strokeWidth={0.4} />);
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue;
      gridLines.push(<line key={`gy${y}`} x1={sx(xMin)} y1={sy(y)} x2={sx(xMax)} y2={sy(y)} stroke={C.border} strokeWidth={0.4} />);
    }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="vgc9"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        {/* Region x >= k shaded blue */}
        <rect x={sx(Math.max(k, xMin))} y={pad.t} width={Math.max(0, sx(xMax) - sx(Math.max(k, xMin)))} height={pH - pad.t - pad.b} fill={C.ps} opacity={0.07} />
        {gridLines}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        {/* Axis tick labels */}
        {[-2, -1, 1, 2, 3].map(x => <FO key={`tx${x}`} x={sx(x) - 8} y={sy(0) + 2} w={16} hh={14} color={C.muted}><Tex>{String(x)}</Tex></FO>)}
        {[1, 2, 3, 4].map(y => <FO key={`ty${y}`} x={sx(0) - 18} y={sy(y) - 7} w={14} hh={14} color={C.muted}><Tex>{String(y)}</Tex></FO>)}
        {/* y = k horizontal threshold */}
        <line x1={sx(xMin)} y1={sy(k)} x2={sx(xMax)} y2={sy(k)} stroke={C.assum} strokeWidth={1.3} strokeDasharray="4,3" />
        <FO x={sx(xMin) + 4} y={sy(k) - 16} w={54} hh={14} color={C.assum}><Tex>{`y = k`}</Tex></FO>
        {/* x = k vertical */}
        <line x1={sx(k)} y1={pad.t} x2={sx(k)} y2={pad.t + pH - pad.t - pad.b} stroke={C.calc} strokeWidth={1.3} strokeDasharray="3,3" />
        <FO x={sx(k) + 4} y={pad.t + 2} w={44} hh={14} color={C.calc}><Tex>{`x = k`}</Tex></FO>
        <g clipPath="url(#vgc9)">
          {/* Parabola rendered as runs: 0 ≤ x ≤ 1 always red (the structural danger zone) */}
          {runs.map((run, i) => {
            const ptsStr = run.points.map(p => `${p.sx},${p.sy}`).join(" ");
            if (run.kind === "red") return <polyline key={i} points={ptsStr} fill="none" stroke={C.fail} strokeWidth={3} />;
            if (run.kind === "green") return <polyline key={i} points={ptsStr} fill="none" stroke={C.ok} strokeWidth={2.5} />;
            return <polyline key={i} points={ptsStr} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="2,3" opacity={0.7} />;
          })}
          {/* Highlight counterexample point at x = k (only fires when 0 < k < 1) */}
          {counterX !== null && (
            <>
              <line x1={sx(counterX)} y1={sy(counterXSq)} x2={sx(counterX)} y2={sy(k)} stroke={C.fail} strokeWidth={1.5} strokeDasharray="2,2" />
              <circle cx={sx(counterX)} cy={sy(counterXSq)} r={5} fill={C.fail} stroke={C.white} strokeWidth={1.5} />
            </>
          )}
        </g>
        {/* Parabola label "y = x^2" placed on the upper-right branch where space is clear */}
        <FO x={sx(2.1)} y={sy(4.4) - 6} w={70} hh={16} color={C.ok}><Tex>{"y = x^2"}</Tex></FO>
        {/* Counterexample label */}
        {counterX !== null && (
          <FO x={sx(counterX) + 8} y={sy(counterXSq) + 6} w={110} hh={32} color={C.fail}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{`x = ${fmt(counterX, 2)}`}</Tex><br/><Tex>{`x^2 = ${fmt(counterXSq, 2)} < k`}</Tex></span></FO>
        )}
        {/* Axis name */}
        <FO x={sx(xMax) - 14} y={sy(0) + 2} w={12} hh={14} color={C.muted}><Tex>{"x"}</Tex></FO>
      </svg>
    );
  })();

  const presets = [
    { val: -1 },
    { val: 0 },
    { val: 0.5 },
    { val: 1 },
    { val: 2 },
  ];

  return (
    <div>
      <QuestionSummary />
      {/* Slider */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"k"}</Tex></span>
          <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`k = ${fmt(k, 2)}`}</Tex></span>
        </div>
        <input type="range" min={-2} max={3} step={0.05} value={k} onChange={e => setK(handleSnap(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map((pr, i) => { const active = Math.abs(k - pr.val) < 0.03; return (<button key={i} onClick={() => setK(pr.val)} style={{ flex: 1, padding: "5px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 500 }}><Tex>{`k = ${pr.val}`}</Tex></button>); })}
        </div>
      </div>
      {/* Plot + status */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}>boundary check</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.calc, marginTop: 2 }}><Tex>{`k^2 = ${fmt(k * k, 2)}`}</Tex></div>
            <div style={{ fontSize: 11, color: k * k >= k ? C.ok : C.fail, marginTop: 2 }}><Tex>{`k^2 ${k * k >= k ? "\\ge" : "<"} k`}</Tex></div>
          </div>
          <div style={{ background: holds ? C.conclBg : C.failBg, border: `1px solid ${(holds ? C.ok : C.fail) + "66"}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: holds ? C.ok : C.fail, fontWeight: 700 }}>statement holds?</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: holds ? C.ok : C.fail }}>{holds ? "YES" : "NO"}</div>
          </div>
        </div>
      </div>
      {/* Status message */}
      {holds ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ok, lineHeight: 1.5 }}>For this <Tex>{`k = ${fmt(k, 2)}`}</Tex> the statement holds.</div>
          <div style={{ fontSize: 12, color: C.ok, marginTop: 2 }}>{k <= 0 ? "Because x² ≥ 0 ≥ k whenever k is non-positive." : "Because x ≥ k ≥ 1 forces x² ≥ x ≥ k."}</div>
        </div>
      ) : (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>
            Counterexample: <span style={{ color: C.calc, fontWeight: 700, padding: "1px 6px", background: C.calc + "12", borderRadius: 5, margin: "0 2px" }}><Tex>{`x = ${fmt(counterX, 2)}`}</Tex></span>
          </div>
          <div style={{ fontSize: 12, color: C.fail, marginTop: 4 }}>
            Here <Tex>{`x \\ge k`}</Tex> holds (since <Tex>{`x = k`}</Tex>), but <Tex>{`x^2 = ${fmt(counterXSq, 2)} < ${fmt(k, 2)} = k`}</Tex>. Statement FAILS for this <Tex>{"k"}</Tex>.
          </div>
        </div>
      )}
      {/* Progress tracker */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawHoldNeg ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawHoldNeg} />
            <span style={{ fontWeight: sawHoldNeg ? 700 : 500 }}>Statement held at some <Tex>{"k \\le 0"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Non-positive zone.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawFailMid ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawFailMid} />
            <span style={{ fontWeight: sawFailMid ? 700 : 500 }}>Statement failed at some <Tex>{"0 < k < 1"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Bad zone.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawHoldHigh ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawHoldHigh} />
            <span style={{ fontWeight: sawHoldHigh ? 700 : 500 }}>Statement held at some <Tex>{"k \\ge 1"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Large zone.)</span></span>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>At the boundary <Tex>{"x = k"}</Tex> the conclusion <Tex>{"x^2 \\ge k"}</Tex> becomes <Tex>{"k^2 \\ge k"}</Tex>, which fails exactly on <Tex>{"0 < k < 1"}</Tex>. Outside that interval the conclusion is safe: either <Tex>{"x^2 \\ge 0 \\ge k"}</Tex> (when <Tex>{"k \\le 0"}</Tex>) or <Tex>{"x^2 \\ge x \\ge k"}</Tex> (when <Tex>{"k \\ge 1"}</Tex>).</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is C: <Tex>{"k \\le 0"}</Tex> or <Tex>{"k \\ge 1"}</Tex>.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Slide <Tex>{"k"}</Tex> across all three regimes to conclude the answer.
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
