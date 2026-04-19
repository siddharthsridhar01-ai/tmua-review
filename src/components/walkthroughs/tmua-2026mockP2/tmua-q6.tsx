"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 6, paper: "Paper 2", year: "2026 Mock", topicTag: "Logic / Necessary & Sufficient" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\text{P is necessary and sufficient for Q}", expl: "You might pick this if you checked only the first-quadrant case (both positive) and didn't try both negative. Take x = -1, y = -1: then xy = 1 > 0 (P true) but neither x nor y is positive (Q false). So P does not imply Q, ruling out sufficiency. P is necessary but not both." },
  { letter: "B", ok: true, tex: "\\text{P is necessary but not sufficient for Q}", expl: "Necessary (Q implies P): if x > 0 and y > 0, then xy > 0 automatically (positive × positive = positive). So Q can't hold unless P holds. Not sufficient (P does not imply Q): x = -1, y = -1 gives xy = 1 > 0 (P holds) but Q fails. So P is necessary but not sufficient for Q." },
  { letter: "C", ok: false, tex: "\\text{P is sufficient but not necessary for Q}", expl: "This has the direction reversed. Sufficiency would require P to imply Q, but x = -1, y = -1 gives xy > 0 with Q false: a clear counterexample. The direction that does hold is Q implies P (both positive forces product positive), which is exactly necessity." },
  { letter: "D", ok: false, tex: "\\text{P is not necessary and not sufficient for Q}", expl: "Necessity does hold: whenever x > 0 and y > 0, their product is automatically positive, so Q forces P. You only lose sufficiency (because two negatives also give xy > 0). So P is necessary but not sufficient: option B." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }


const ITEMS_Q6 = null;
const OPTIONS_Q6 = [
  ["A", "\\text{P is sufficient but not necessary for Q}"],
  ["B", "\\text{P is necessary but not sufficient for Q}"],
  ["C", "\\text{P is necessary and sufficient for Q}"],
  ["D", "\\text{P is neither necessary nor sufficient for Q}"]
];
const SECTIONS_Q6 = [
  { type: 'prose', text: (<>Let <Tex>{"x"}</Tex> and <Tex>{"y"}</Tex> be real numbers. Consider the two statements:</>) },
  { type: "items", items: [
    { label: 'P', content: (<Tex>{"xy > 0"}</Tex>) },
    { label: 'Q', content: (<Tex>{"x > 0 \\text{ and } y > 0"}</Tex>) }
  ] },
  { type: 'prose-tight', text: (<>Which option best describes the relationship between P and Q?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q6;
  const options = OPTIONS_Q6;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q6</span>
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
  const sections = SECTIONS_Q6;
  const options = OPTIONS_Q6;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 6</span>
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

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>Split the question into two separate arrows:</p><p style={{ margin: "0 0 4px" }}>• Sufficiency asks: does <Tex>{"P \\Rightarrow Q"}</Tex>? If xy {">"} 0, must both be positive?</p><p style={{ margin: 0 }}>• Necessity asks: does <Tex>{"Q \\Rightarrow P"}</Tex>? If both positive, must xy {">"} 0?</p></InfoBox><InfoBox type="insight"><p style={{ margin: 0 }}>Think about the sign chart. <Tex>{"xy > 0"}</Tex> when x and y share a sign: quadrant 1 (both positive) OR quadrant 3 (both negative). Q picks out only quadrant 1. So P is a strictly larger condition than Q.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram: xy plane with the four quadrants coloured to show where P and Q hold
  const quadDiagram = (() => {
    const pW = 270, pH = 210;
    const cx = pW / 2, cy = pH / 2;
    const qW = 108, qH = 80;
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 50} height={hh || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.3 }}>{children}</div>
      </foreignObject>
    );
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {/* top-right: x>0, y>0 - P AND Q both true */}
        <rect x={cx + 4} y={14} width={qW} height={qH} rx={6} fill={C.ok + "30"} stroke={C.ok} strokeWidth={1.5} />
        <FO x={cx + 8} y={20} w={qW - 8} hh={14} color={C.ok}><span style={{ fontSize: 11, fontWeight: 700 }}>x{">"}0, y{">"}0</span></FO>
        <FO x={cx + 8} y={36} w={qW - 8} hh={14} color={C.ok}><span style={{ fontSize: 11 }}>P ✅ &nbsp; Q ✅</span></FO>
        <FO x={cx + 8} y={54} w={qW - 8} hh={24} color={C.ok}><span style={{ fontSize: 11 }}>xy {">"} 0 and both positive</span></FO>
        {/* top-left: x<0, y>0 - P false (product negative) */}
        <rect x={cx - qW - 4} y={14} width={qW} height={qH} rx={6} fill={C.border + "99"} stroke={C.muted} strokeWidth={1.2} />
        <FO x={cx - qW} y={20} w={qW - 8} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>x{"<"}0, y{">"}0</span></FO>
        <FO x={cx - qW} y={36} w={qW - 8} hh={14} color={C.muted}><span style={{ fontSize: 11 }}>P ❌ &nbsp; Q ❌</span></FO>
        <FO x={cx - qW} y={54} w={qW - 8} hh={24} color={C.muted}><span style={{ fontSize: 11 }}>xy {"<"} 0</span></FO>
        {/* bottom-left: x<0, y<0 - P true but Q false: the key counterexample */}
        <rect x={cx - qW - 4} y={cy + 6} width={qW} height={qH} rx={6} fill={C.fail + "28"} stroke={C.fail} strokeWidth={1.5} />
        <FO x={cx - qW} y={cy + 12} w={qW - 8} hh={14} color={C.fail}><span style={{ fontSize: 11, fontWeight: 700 }}>x{"<"}0, y{"<"}0</span></FO>
        <FO x={cx - qW} y={cy + 28} w={qW - 8} hh={14} color={C.fail}><span style={{ fontSize: 11 }}>P ✅ &nbsp; Q ❌</span></FO>
        <FO x={cx - qW} y={cy + 46} w={qW - 8} hh={24} color={C.fail}><span style={{ fontSize: 11 }}>xy {">"} 0 but neither positive</span></FO>
        {/* bottom-right: x>0, y<0 */}
        <rect x={cx + 4} y={cy + 6} width={qW} height={qH} rx={6} fill={C.border + "99"} stroke={C.muted} strokeWidth={1.2} />
        <FO x={cx + 8} y={cy + 12} w={qW - 8} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>x{">"}0, y{"<"}0</span></FO>
        <FO x={cx + 8} y={cy + 28} w={qW - 8} hh={14} color={C.muted}><span style={{ fontSize: 11 }}>P ❌ &nbsp; Q ❌</span></FO>
        <FO x={cx + 8} y={cy + 46} w={qW - 8} hh={24} color={C.muted}><span style={{ fontSize: 11 }}>xy {"<"} 0</span></FO>
        {/* Axes lines on top */}
        <line x1={cx} y1={8} x2={cx} y2={pH - 8} stroke={C.white} strokeWidth={0.8} />
        <line x1={8} y1={cy} x2={pW - 8} y2={cy} stroke={C.white} strokeWidth={0.8} />
      </svg>
    );
  })();

  const solveSteps = [
    { label: "APPROACH", color: C.ps, text: <span>Test sufficiency (<Tex>{"P \\Rightarrow Q"}</Tex>) and necessity (<Tex>{"Q \\Rightarrow P"}</Tex>) separately. An arrow holds if there's no counterexample; it fails the moment we find one case where the premise holds but the conclusion fails.</span>, math: (<div><Tex>{"\\text{Suff: } P \\Rightarrow Q? \\quad\\quad \\text{Nec: } Q \\Rightarrow P?"}</Tex></div>) },
    { label: "TEST SUFFICIENCY: P ⇒ Q?", color: C.fail, text: <span>Try <Tex>{"x = -1, y = -1"}</Tex>. Then <Tex>{"xy = 1 > 0"}</Tex> so P holds, but neither is positive so Q fails. We have a green P leading to a red Q: counterexample found.</span>, math: (<><div><Tex>{"x = -1,\\; y = -1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"xy = 1 > 0 \\;\\checkmark\\; (\\text{P holds})"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{but } x > 0 \\text{ fails } (\\text{Q fails})"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#ff7675}{P \\Rightarrow Q \\text{ is FALSE}}"}</Tex></div></>), diagram: quadDiagram },
    { label: "TEST NECESSITY: Q ⇒ P?", color: C.ok, text: <span>Suppose Q holds: <Tex>{"x > 0"}</Tex> and <Tex>{"y > 0"}</Tex>. The product of two positive numbers is positive, so <Tex>{"xy > 0"}</Tex> automatically. No counterexample possible: every time Q holds, P holds too.</span>, math: (<><div><Tex>{"x > 0,\\; y > 0 \\;\\Rightarrow\\; xy > 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#55efc4}{Q \\Rightarrow P \\text{ is TRUE}}"}</Tex></div></>) },
    { label: "INTERPRET", color: C.ok, text: <span>The sufficiency arrow (<Tex>{"P \\Rightarrow Q"}</Tex>) fails; the necessity arrow (<Tex>{"Q \\Rightarrow P"}</Tex>) holds. So P is necessary but not sufficient for Q.</span>, math: (<><div><Tex>{"P \\not\\Rightarrow Q \\;\\; \\text{(not sufficient)}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"Q \\Rightarrow P \\;\\; \\text{(necessary)}"}</Tex></div></>), conclusion: <span>The answer is B: P is necessary but not sufficient for Q.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

// ArrowRow: premise/arrow/conclusion cell, coloured by test outcome.
// verdict: 'support' (green premise+conclusion) | 'counterexample' (green premise, red conclusion) | 'vacuous' (premise fails, greyed out)
function ArrowRow({ label, premiseTex, conclusionTex, premiseHolds, conclusionHolds, verdict }) {
  let pCol, cCol, arrowCol, bgCol, borderCol, note;
  if (verdict === "vacuous") {
    pCol = C.muted; cCol = C.muted; arrowCol = C.muted;
    bgCol = C.card; borderCol = C.border + "99";
    note = "premise fails, not a test";
  } else if (verdict === "counterexample") {
    pCol = C.ok; cCol = C.fail; arrowCol = C.fail;
    bgCol = C.failBg; borderCol = C.fail + "66";
    note = "counterexample found!";
  } else {
    pCol = C.ok; cCol = C.ok; arrowCol = C.ok;
    bgCol = C.conclBg; borderCol = C.ok + "66";
    note = "consistent with arrow";
  }
  const opacity = verdict === "vacuous" ? 0.55 : 1;
  return (
    <div style={{ background: bgCol, border: `1px solid ${borderCol}`, borderLeft: `4px solid ${arrowCol}`, borderRadius: 8, padding: "6px 10px", opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", minWidth: 140, lineHeight: 1.3 }}>{label}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "1 1 auto", flexWrap: "wrap" }}>
          <span style={{ padding: "3px 10px", borderRadius: 7, border: `1.5px solid ${pCol}`, background: pCol + "18", color: pCol, fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Tex>{premiseTex}</Tex>
            <span style={{ fontSize: 11 }}>{premiseHolds ? "✓" : "✗"}</span>
          </span>
          <span style={{ fontSize: 20, color: arrowCol, fontWeight: 700 }}>→</span>
          <span style={{ padding: "3px 10px", borderRadius: 7, border: `1.5px solid ${cCol}`, background: cCol + "18", color: cCol, fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Tex>{conclusionTex}</Tex>
            {verdict !== "vacuous" && <span style={{ fontSize: 11 }}>{conclusionHolds ? "✓" : "✗"}</span>}
          </span>
          <span style={{ fontSize: 11, color: arrowCol, fontWeight: 600, letterSpacing: 0.3, marginLeft: 4 }}>{note}</span>
        </div>
      </div>
    </div>
  );
}

function VerifyStepContent() {
  // Two sliders: x and y. Show the (x,y) point on a plane, compute P and Q truth values,
  // and show two arrow rows: P -> Q (sufficiency test) and Q -> P (necessity test).
  const [xVal, setXVal] = useState(-1);
  const [yVal, setYVal] = useState(-1);
  // Progress flags for the two-part argument
  const [sawNecHold, setSawNecHold] = useState(false);   // Q holds and P holds (consistent with necessity)
  const [sawSuffFail, setSawSuffFail] = useState(false); // P holds but Q fails (breaks sufficiency)
  const snap = [-3, -2, -1, -0.5, 0, 0.5, 1, 2, 3];
  const snapRadius = 0.12;
  const handleSnap = (raw) => { for (const s of snap) { if (Math.abs(raw - s) < snapRadius) return s; } return Math.round(raw * 10) / 10; };

  const prod = xVal * yVal;
  const pHolds = prod > 0;
  const qHolds = xVal > 0 && yVal > 0;

  useEffect(() => {
    if (qHolds && pHolds) setSawNecHold(true);
    if (pHolds && !qHolds) setSawSuffFail(true);
  }, [pHolds, qHolds]);
  const bothDemonstrated = sawNecHold && sawSuffFail;

  // P -> Q (sufficiency): premise P, conclusion Q
  const suffVerdict = !pHolds ? "vacuous" : (qHolds ? "support" : "counterexample");
  // Q -> P (necessity): premise Q, conclusion P
  const necVerdict = !qHolds ? "vacuous" : (pHolds ? "support" : "counterexample");

  // Preset cases, one per quadrant
  const presets = [
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
  ];

  // Plane diagram showing (x, y) and the four quadrants shaded by P
  const plane = (() => {
    const pW = 320, pH = 200;
    const pad = { l: 22, r: 10, t: 10, b: 18 };
    const xMin = -3.5, xMax = 3.5, yMin = -3.5, yMax = 3.5;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const gridLines = [];
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0) continue;
      gridLines.push(<line key={`gx${x}`} x1={sx(x)} y1={sy(yMax)} x2={sx(x)} y2={sy(yMin)} stroke={C.border} strokeWidth={0.5} />);
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue;
      gridLines.push(<line key={`gy${y}`} x1={sx(xMin)} y1={sy(y)} x2={sx(xMax)} y2={sy(y)} stroke={C.border} strokeWidth={0.5} />);
    }
    // Quadrant shading: Q1 green (P and Q both hold), Q3 red (P holds but Q fails, the counterexample zone), Q2/Q4 plain
    const q1 = { x1: sx(0), y1: sy(yMax), x2: sx(xMax), y2: sy(0) };
    const q3 = { x1: sx(xMin), y1: sy(0), x2: sx(0), y2: sy(yMin) };
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {/* Shaded quadrants */}
        <rect x={q1.x1} y={q1.y1} width={q1.x2 - q1.x1} height={q1.y2 - q1.y1} fill={C.ok} opacity={0.12} />
        <rect x={q3.x1} y={q3.y1} width={q3.x2 - q3.x1} height={q3.y2 - q3.y1} fill={C.fail} opacity={0.15} />
        {gridLines}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        {/* Quadrant labels (KaTeX) */}
        <FO x={sx(1.2) - 22} y={sy(2.8) - 4} w={64} hh={18} color={C.ok}><Tex>{"\\mathrm{P}\\,\\checkmark\\; \\mathrm{Q}\\,\\checkmark"}</Tex></FO>
        <FO x={sx(-2.8) - 4} y={sy(-1.2) + 2} w={64} hh={18} color={C.fail}><Tex>{"\\mathrm{P}\\,\\checkmark\\; \\mathrm{Q}\\,\\times"}</Tex></FO>
        <FO x={sx(-2.4) - 4} y={sy(2.8) - 4} w={36} hh={18} color={C.muted}><Tex>{"\\mathrm{P}\\,\\times"}</Tex></FO>
        <FO x={sx(1.6) - 4} y={sy(-1.2) + 2} w={36} hh={18} color={C.muted}><Tex>{"\\mathrm{P}\\,\\times"}</Tex></FO>
        {/* Axis labels */}
        <FO x={sx(xMax) - 14} y={sy(0) + 2} w={14} hh={14} color={C.muted}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0) + 4} y={sy(yMax) - 2} w={14} hh={14} color={C.muted}><Tex>{"y"}</Tex></FO>
        {/* The current point */}
        <circle cx={sx(xVal)} cy={sy(yVal)} r={6} fill={pHolds ? (qHolds ? C.ok : C.fail) : C.muted} stroke={C.white} strokeWidth={2} />
        <FO x={sx(xVal) + 8} y={sy(yVal) - 14} w={80} hh={14} color={pHolds ? (qHolds ? C.ok : C.fail) : C.muted}><Tex>{`(${fmt(xVal, 1)},\\, ${fmt(yVal, 1)})`}</Tex></FO>
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      {/* Sliders side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
            <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
            <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`x = ${fmt(xVal, 1)}`}</Tex></span>
          </div>
          <input type="range" min={-3} max={3} step={0.1} value={xVal} onChange={e => setXVal(handleSnap(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
            <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"y"}</Tex></span>
            <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`y = ${fmt(yVal, 1)}`}</Tex></span>
          </div>
          <input type="range" min={-3} max={3} step={0.1} value={yVal} onChange={e => setYVal(handleSnap(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        </div>
      </div>
      {/* Preset points */}
      <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
        {presets.map((pr, i) => {
          const active = Math.abs(xVal - pr.x) < 0.05 && Math.abs(yVal - pr.y) < 0.05;
          return (
            <button key={i} onClick={() => { setXVal(pr.x); setYVal(pr.y); }} style={{ flex: 1, padding: "6px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 500, lineHeight: 1.2 }}>
              <Tex>{`x{=}${pr.x},\\; y{=}${pr.y}`}</Tex>
            </button>
          );
        })}
      </div>
      {/* Plane + status panels side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{plane}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}><Tex>{"xy"}</Tex></div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{fmt(prod, 2)}</Tex></div>
          </div>
          <div style={{ background: pHolds ? C.conclBg : C.card, border: `1px solid ${(pHolds ? C.ok : C.fail) + "44"}`, borderRadius: 8, padding: "4px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: pHolds ? C.ok : C.fail, fontWeight: 700 }}>P: <Tex>{"xy > 0"}</Tex></div>
            <div style={{ fontSize: 20, fontWeight: 700, color: pHolds ? C.ok : C.fail }}>{pHolds ? "TRUE" : "FALSE"}</div>
          </div>
          <div style={{ background: qHolds ? C.conclBg : C.card, border: `1px solid ${(qHolds ? C.ok : C.fail) + "44"}`, borderRadius: 8, padding: "4px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: qHolds ? C.ok : C.fail, fontWeight: 700 }}>Q: both <Tex>{"> 0"}</Tex></div>
            <div style={{ fontSize: 20, fontWeight: 700, color: qHolds ? C.ok : C.fail }}>{qHolds ? "TRUE" : "FALSE"}</div>
          </div>
        </div>
      </div>
      {/* Arrow rows: sufficiency and necessity */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 5 }}>
        <ArrowRow
          label={<><div>Is P</div><div style={{ color: C.text }}>sufficient for Q?</div></>}
          premiseTex={"xy > 0"}
          conclusionTex={"x, y > 0"}
          premiseHolds={pHolds}
          conclusionHolds={qHolds}
          verdict={suffVerdict}
        />
        <ArrowRow
          label={<><div>Is P</div><div style={{ color: C.text }}>necessary for Q?</div></>}
          premiseTex={"x, y > 0"}
          conclusionTex={"xy > 0"}
          premiseHolds={qHolds}
          conclusionHolds={pHolds}
          verdict={necVerdict}
        />
      </div>
      {/* Status message */}
      {suffVerdict === "counterexample" ? (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.fail, lineHeight: 1.5 }}>P is NOT sufficient here: <Tex>{"xy > 0"}</Tex> holds but neither <Tex>{"x"}</Tex> nor <Tex>{"y"}</Tex> is positive.</div>
          <div style={{ fontSize: 12, color: C.fail, marginTop: 2 }}>Sufficiency broken for this case.</div>
        </div>
      ) : necVerdict === "support" ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ok, lineHeight: 1.5 }}>Both P and Q hold here.</div>
          <div style={{ fontSize: 12, color: C.ok, marginTop: 2 }}>Necessity confirmed for this case. Now find one where P holds but Q fails.</div>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>Neither arrow row is being tested right now.</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Try <span style={{ color: C.calc, fontWeight: 700, padding: "1px 6px", background: C.calc + "12", borderRadius: 5 }}><Tex>{"x = 1,\\; y = 1"}</Tex></span> (both hold) then <span style={{ color: C.calc, fontWeight: 700, padding: "1px 6px", background: C.calc + "12", borderRadius: 5 }}><Tex>{"x = -1,\\; y = -1"}</Tex></span> (sufficiency fails).</div>
        </div>
      )}
      {/* Progress tracker */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawNecHold ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawNecHold} />
            <span style={{ fontWeight: sawNecHold ? 700 : 500 }}>Found a state where Q holds AND P holds. <span style={{ color: C.muted, fontWeight: 500 }}>(Consistent with necessity.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawSuffFail ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawSuffFail} />
            <span style={{ fontWeight: sawSuffFail ? 700 : 500 }}>Found a state where P holds BUT Q fails. <span style={{ color: C.muted, fontWeight: 500 }}>(Breaks sufficiency.)</span></span>
          </div>
        </div>
        {bothDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>A positive product means <Tex>{"x"}</Tex> and <Tex>{"y"}</Tex> share a sign: both positive OR both negative. So <Tex>{"xy > 0"}</Tex> is forced by Q (necessary) but it permits the "both negative" case too (not sufficient).</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is B: P is necessary but not sufficient for Q.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Complete both to conclude the answer.
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
