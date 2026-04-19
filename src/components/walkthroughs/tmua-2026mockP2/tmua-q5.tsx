"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 5, paper: "Paper 2", year: "2026 Mock", topicTag: "Logic / Converse & Contrapositive" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\text{none of them}", expl: "You might pick this if you mistakenly think both P and its converse fail, but writing the line as y = mx + (3 - 2m) makes the y-intercept 3 - 2m, so positive m directly forces intercept < 3 and vice versa. At minimum P and its contrapositive hold." },
  { letter: "B", ok: false, tex: "\\text{I only}", expl: "You correctly identified P as true, but the contrapositive always matches P's truth value, so III must also be true. And for this particular line, the converse is also true because the intercept-gradient link goes both ways." },
  { letter: "C", ok: false, tex: "\\text{II only}", expl: "The converse is true, but P is also true: if m > 0, then 3 - 2m < 3. You can't have the converse true while P itself fails in this setup." },
  { letter: "D", ok: false, tex: "\\text{III only}", expl: "The contrapositive is true (it always matches P), but that means P itself is also true. And the converse holds here too because 3 - 2m < 3 forces m > 0." },
  { letter: "E", ok: false, tex: "\\text{I and II only}", expl: "P and its converse are indeed both true, but the contrapositive always has the same truth value as the original statement (this is a general fact about implications). Since P is true, the contrapositive is automatically true: you can't include I and II without III." },
  { letter: "F", ok: false, tex: "\\text{I and III only}", expl: "P and its contrapositive always share the same truth value, so yes to both. But here the converse also holds: a y-intercept below 3 means 3 - 2m < 3, which rearranges to m > 0. All three must be included." },
  { letter: "G", ok: false, tex: "\\text{II and III only}", expl: "If the contrapositive is true, then P itself must be true too (P and its contrapositive always share the same truth value). So you cannot leave out I: all three must be included." },
  { letter: "H", ok: true, tex: "\\text{I, II and III}", expl: "The line through (2, 3) with gradient m is y = mx + (3 - 2m), so the y-intercept equals 3 - 2m. P: m > 0 gives 3 - 2m < 3 ✓. Converse: 3 - 2m < 3 gives -2m < 0 so m > 0 ✓. Contrapositive always has the same truth value as P, so it's also ✓. All three are true." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }


const ITEMS_Q5 = [
  { label: 'I', content: (<>If <Tex>{"m > 0"}</Tex> then the y-intercept is less than 3.</>) },
  { label: 'II', content: (<>If the y-intercept is less than 3 then <Tex>{"m > 0"}</Tex>.</>) },
  { label: 'III', content: (<>If the y-intercept is at least 3 then <Tex>{"m \\le 0"}</Tex>.</>) }
];
const OPTIONS_Q5 = [
  ["A", "\\text{none of them}"],
  ["B", "\\text{I only}"],
  ["C", "\\text{II only}"],
  ["D", "\\text{III only}"],
  ["E", "\\text{I and II only}"],
  ["F", "\\text{I and III only}"],
  ["G", "\\text{II and III only}"],
  ["H", "\\text{I, II and III}"]
];
const SECTIONS_Q5 = [
  { type: 'prose', text: (<>The line with equation <Tex>{"y = mx + (3 - 2m)"}</Tex> passes through the point <Tex>{"(2, 3)"}</Tex>. Consider the following statements about this line:</>) },
  { type: "items", items: [
    { label: 'I', content: (<>If <Tex>{"m > 0"}</Tex> then the y-intercept is less than 3.</>) },
    { label: 'II', content: (<>If the y-intercept is less than 3 then <Tex>{"m > 0"}</Tex>.</>) },
    { label: 'III', content: (<>If the y-intercept is at least 3 then <Tex>{"m \\le 0"}</Tex>.</>) }
  ] },
  { type: 'prose-tight', text: (<>Which of the statements are true?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q5;
  const options = OPTIONS_Q5;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q5</span>
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
  const sections = SECTIONS_Q5;
  const options = OPTIONS_Q5;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 5</span>
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

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: 0 }}>Start by writing L as <Tex>{"y - 3 = m(x - 2)"}</Tex> (line through a point with gradient <Tex>{"m"}</Tex>), then rearrange to <Tex>{"y = mx + c"}</Tex> form to read off the y-intercept <Tex>{"c"}</Tex>. Once <Tex>{"c"}</Tex> is in terms of <Tex>{"m"}</Tex>, the three statements are just inequalities to check.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Three facts to keep straight:</p><p style={{ margin: "0 0 4px" }}>• <Tex>{"P \\Rightarrow Q"}</Tex> is the original statement.</p><p style={{ margin: "0 0 4px" }}>• Its <b>converse</b> swaps the arrow: <Tex>{"Q \\Rightarrow P"}</Tex>. The converse may or may not be true.</p><p style={{ margin: 0 }}>• Its <b>contrapositive</b> negates both sides and swaps: <Tex>{"\\text{not }Q \\Rightarrow \\text{not }P"}</Tex>. The contrapositive always has the same truth value as the original.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Shared axis helpers for all three line-family diagrams (P, converse, contrapositive).
  // Each diagram shows lines through (2,3) with a family of gradients and marks their y-intercepts.
  // The caption tells the viewer what pattern to look for.
  const makeLinesDiagram = (opts) => {
    // opts: { gradients: number[], lineCol: string, caption: string, thresholdCol: string }
    const pW = 260, pH = 190;
    const pad = { l: 26, r: 10, t: 12, b: 22 };
    const xMin = -1, xMax = 5, yMin = -1, yMax = 6;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 50} height={hh || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const clipId = `ldClip_${opts.caption.replace(/[^a-zA-Z0-9]/g, "")}`;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id={clipId}><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={0.7} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={0.7} />
        {/* y = 3 threshold line */}
        <line x1={sx(xMin)} y1={sy(3)} x2={sx(xMax)} y2={sy(3)} stroke={opts.thresholdCol} strokeWidth={0.7} strokeDasharray="3,3" />
        <FO x={sx(xMax) - 38} y={sy(3) - 14} w={36} hh={14} color={opts.thresholdCol}><Tex>{"y = 3"}</Tex></FO>
        <g clipPath={`url(#${clipId})`}>
          {opts.gradients.map((mv, i) => {
            const c = 3 - 2 * mv;
            return <line key={`pl${i}`} x1={sx(xMin)} y1={sy(mv * xMin + c)} x2={sx(xMax)} y2={sy(mv * xMax + c)} stroke={opts.lineCol} strokeWidth={1.5} opacity={0.8} />;
          })}
        </g>
        {/* Anchor (2,3) */}
        <circle cx={sx(2)} cy={sy(3)} r={4} fill={C.accent} stroke={C.white} strokeWidth={1.5} />
        <FO x={sx(2) + 6} y={sy(3) - 14} w={46} hh={14} color={C.accentLight}><Tex>{"(2, 3)"}</Tex></FO>
        {/* y-intercept dots */}
        {opts.gradients.map((mv, i) => {
          const c = 3 - 2 * mv;
          return <circle key={`yc${i}`} cx={sx(0)} cy={sy(c)} r={3} fill={opts.lineCol} stroke={C.white} strokeWidth={1} />;
        })}
        {/* Axis ticks */}
        <FO x={4} y={sy(0) + 4} w={20} hh={14} color={C.muted}><Tex>{"0"}</Tex></FO>
        <FO x={sx(2) - 6} y={sy(0) + 4} w={16} hh={14} color={C.muted}><Tex>{"2"}</Tex></FO>
        <FO x={sx(0) - 18} y={sy(3) - 7} w={16} hh={14} color={C.muted}><Tex>{"3"}</Tex></FO>
        {/* Caption (KaTeX) */}
        <FO x={6} y={pH - 16} w={pW - 12} hh={14} color={opts.lineCol}><Tex>{opts.caption}</Tex></FO>
      </svg>
    );
  };

  const pDiagram = makeLinesDiagram({
    gradients: [0.4, 1, 2, 3],
    lineCol: C.ok,
    thresholdCol: C.assum,
    caption: "m > 0 \\;\\Rightarrow\\; \\text{intercept} < 3",
  });

  const contrapositiveDiagram = makeLinesDiagram({
    // For contrapositive "intercept >= 3 ⇒ m <= 0": lines with intercepts at or above 3.
    // c = 3 - 2m, c >= 3 means m <= 0. So show non-positive gradients.
    gradients: [0, -0.5, -1, -1.5],
    lineCol: C.fail,
    thresholdCol: C.assum,
    caption: "\\text{intercept} \\ge 3 \\;\\Rightarrow\\; m \\le 0",
  });

  // Summary diagram: three arrow rows, all green, for the conclusion step
  const summaryDiagram = (() => {
    const pW = 260, pH = 170;
    const rowH = 46;
    const rows = [
      { label: "I", premise: "m > 0", concl: "y_0 < 3" },
      { label: "II", premise: "y_0 < 3", concl: "m > 0" },
      { label: "III", premise: "y_0 \\ge 3", concl: "m \\le 0" },
    ];
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 50} height={hh || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {rows.map((r, i) => {
          const y = 10 + i * rowH;
          return (
            <g key={i}>
              <rect x={8} y={y} width={pW - 16} height={rowH - 6} rx={6} fill={C.ok} opacity={0.12} stroke={C.ok} strokeWidth={1} />
              <FO x={14} y={y + 4} w={26} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>{r.label}</span></FO>
              <FO x={44} y={y + 6} w={70} hh={18} color={C.ok}><Tex>{r.premise}</Tex></FO>
              <FO x={116} y={y + 6} w={14} hh={18} color={C.ok}><span style={{ fontSize: 14, fontWeight: 700 }}>→</span></FO>
              <FO x={132} y={y + 6} w={70} hh={18} color={C.ok}><Tex>{r.concl}</Tex></FO>
              <FO x={pW - 40} y={y + 6} w={30} hh={18} color={C.ok}><span style={{ fontSize: 14 }}>✅</span></FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  const solveSteps = [
    { label: "PARAMETRISE L", color: C.ps, text: <span>Since L passes through <Tex>{"(2, 3)"}</Tex> with gradient <Tex>{"m"}</Tex>, use the point-gradient form and rearrange into <Tex>{"y = mx + c"}</Tex> to read off the y-intercept.</span>, math: (<><div><Tex>{"y - 3 = m(x - 2)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"y = mx + (3 - 2m)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{y-intercept} = 3 - 2m"}</Tex></div></>) },
    { label: "CHECK P (STATEMENT I)", color: C.ok, text: <span>P asserts: if <Tex>{"m > 0"}</Tex> then intercept <Tex>{"< 3"}</Tex>. Subtract <Tex>{"2m"}</Tex> from 3 when <Tex>{"m > 0"}</Tex>: you get something strictly less than 3.</span>, math: (<><div><Tex>{"m > 0 \\;\\Rightarrow\\; 2m > 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow\\; 3 - 2m < 3 \\;\\checkmark"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#55efc4}{\\text{P is TRUE}}"}</Tex></div></>), diagram: pDiagram },
    { label: "CHECK CONVERSE (STATEMENT II)", color: C.ok, text: <span>The converse swaps premise and conclusion: if intercept <Tex>{"< 3"}</Tex>, then <Tex>{"m > 0"}</Tex>. Start with <Tex>{"3 - 2m < 3"}</Tex> and rearrange for <Tex>{"m"}</Tex>.</span>, math: (<><div><Tex>{"3 - 2m < 3 \\;\\Rightarrow\\; -2m < 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow\\; m > 0 \\;\\checkmark"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#55efc4}{\\text{Converse is TRUE}}"}</Tex></div></>) },
    { label: "CHECK CONTRAPOSITIVE (STATEMENT III)", color: C.ok, text: <span>The contrapositive of <Tex>{"P \\Rightarrow Q"}</Tex> is "<Tex>{"\\text{not }Q \\Rightarrow \\text{not }P"}</Tex>": here, if intercept <Tex>{"\\ge 3"}</Tex> then <Tex>{"m \\le 0"}</Tex>. The contrapositive always has the same truth value as the original, and we can verify it directly: <Tex>{"3 - 2m \\ge 3 \\Rightarrow -2m \\ge 0 \\Rightarrow m \\le 0"}</Tex>.</span>, math: (<><div><Tex>{"3 - 2m \\ge 3 \\;\\Rightarrow\\; -2m \\ge 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow\\; m \\le 0 \\;\\checkmark"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#55efc4}{\\text{Contrapositive is TRUE}}"}</Tex></div></>), diagram: contrapositiveDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>All three statements hold.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{I, II and III all true}}"}</Tex></div>), diagram: summaryDiagram, conclusion: <span>The answer is H: I, II and III.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 260px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

// ========= ARROW CELL HELPER: P -> Q coloured by truth states =========
// state: { premise: 'green'|'grey', conclusion: 'green'|'red'|null }
// - grey premise: whole cell greyed (premise fails, not testing)
// - green premise + green conclusion: cell green (supporting)
// - green premise + red conclusion: cell red (counterexample)
function ArrowRow({ label, premiseTex, conclusionTex, premiseHolds, conclusionHolds, verdict }) {
  // verdict: 'support' | 'counterexample' | 'vacuous'
  let pCol, cCol, arrowCol, bgCol, borderCol, note;
  if (verdict === "vacuous") {
    pCol = C.muted; cCol = C.muted; arrowCol = C.muted;
    bgCol = C.card; borderCol = C.border + "99";
    note = "premise fails, not a test";
  } else if (verdict === "counterexample") {
    pCol = C.ok; cCol = C.fail; arrowCol = C.fail;
    bgCol = C.failBg; borderCol = C.fail + "66";
    note = "counterexample!";
  } else {
    pCol = C.ok; cCol = C.ok; arrowCol = C.ok;
    bgCol = C.conclBg; borderCol = C.ok + "66";
    note = "consistent with claim";
  }
  const opacity = verdict === "vacuous" ? 0.55 : 1;
  return (
    <div style={{ background: bgCol, border: `1px solid ${borderCol}`, borderLeft: `4px solid ${arrowCol}`, borderRadius: 8, padding: "6px 10px", opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", minWidth: 78 }}>{label}</div>
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
  // Slider over gradient m; observe P, converse, contrapositive for each line.
  const [m, setM] = useState(2);
  // Progress flags: each statement's premise met AND no counterexample found (i.e. "support")
  const [sawPSupport, setSawPSupport] = useState(false);   // I: m > 0 with intercept < 3
  const [sawCvSupport, setSawCvSupport] = useState(false); // II: intercept < 3 with m > 0
  const [sawCpSupport, setSawCpSupport] = useState(false); // III: intercept ≥ 3 with m ≤ 0
  const snap = [-2, -1, -0.5, 0, 0.5, 1, 2, 3];
  const snapRadius = 0.1;
  const handleSlider = (raw) => { for (const s of snap) { if (Math.abs(raw - s) < snapRadius) return s; } return Math.round(raw * 10) / 10; };

  const intercept = 3 - 2 * m;
  const gradPos = m > 0;
  const gradNonPos = m <= 0;
  const interceptLt3 = intercept < 3;
  const interceptGe3 = intercept >= 3;

  // P: m > 0 -> intercept < 3
  const pVerdict = !gradPos ? "vacuous" : (interceptLt3 ? "support" : "counterexample");
  // Converse: intercept < 3 -> m > 0
  const cvVerdict = !interceptLt3 ? "vacuous" : (gradPos ? "support" : "counterexample");
  // Contrapositive: intercept >= 3 -> m <= 0
  const cpVerdict = !interceptGe3 ? "vacuous" : (gradNonPos ? "support" : "counterexample");

  useEffect(() => {
    if (pVerdict === "support") setSawPSupport(true);
    if (cvVerdict === "support") setSawCvSupport(true);
    if (cpVerdict === "support") setSawCpSupport(true);
  }, [pVerdict, cvVerdict, cpVerdict]);
  const allDemonstrated = sawPSupport && sawCvSupport && sawCpSupport;

  // Build graph: show the line, mark (2,3), mark y-intercept, dashed y=3 line.
  const graph = (() => {
    const pW = 360, pH = 210;
    const pad = { l: 28, r: 12, t: 12, b: 20 };
    // y-range must accommodate intercept = 3 - 2m for m in [-2, 3], so intercept in [-3, 7].
    const xMin = -1, xMax = 5, yMin = -3.5, yMax = 7.5;
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
    const lineCol = gradPos ? C.ok : C.fail;
    const ix = intercept;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="vgc5"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        {gridLines}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        {/* y = 3 threshold */}
        <line x1={sx(xMin)} y1={sy(3)} x2={sx(xMax)} y2={sy(3)} stroke={C.assum} strokeWidth={1} strokeDasharray="4,3" />
        <FO x={sx(xMax) - 44} y={sy(3) - 16} w={40} hh={14} color={C.assum}><Tex>{"y = 3"}</Tex></FO>
        <g clipPath="url(#vgc5)">
          {/* The line */}
          <line x1={sx(xMin)} y1={sy(m * xMin + ix)} x2={sx(xMax)} y2={sy(m * xMax + ix)} stroke={lineCol} strokeWidth={2.5} />
          {/* Anchor (2, 3) */}
          <circle cx={sx(2)} cy={sy(3)} r={5} fill={C.accent} stroke={C.white} strokeWidth={1.5} />
          {/* y-intercept marker */}
          <circle cx={sx(0)} cy={sy(ix)} r={4.5} fill={interceptLt3 ? C.ok : C.fail} stroke={C.white} strokeWidth={1.5} />
        </g>
        {/* Anchor label */}
        <FO x={sx(2) + 6} y={sy(3) - 18} w={46} hh={14} color={C.accentLight}><Tex>{"(2,3)"}</Tex></FO>
        {/* y-intercept label: to the right of the marker, stays inside viewport */}
        <FO x={sx(0) + 8} y={sy(ix) - 8} w={56} hh={16} color={interceptLt3 ? C.ok : C.fail}><Tex>{`y_0 = ${fmt(ix, 1)}`}</Tex></FO>
        {/* Axis ticks */}
        {[2, 4].map(x => <FO key={`tx${x}`} x={sx(x) - 8} y={sy(0) + 4} w={16} hh={14} color={C.muted}><Tex>{String(x)}</Tex></FO>)}
        {[3, -1].map(y => <FO key={`ty${y}`} x={sx(0) - 22} y={sy(y) - 7} w={18} hh={14} color={C.muted}><Tex>{String(y)}</Tex></FO>)}
      </svg>
    );
  })();

  const presets = [
    { val: -1 },
    { val: 0 },
    { val: 0.5 },
    { val: 2 },
  ];

  return (
    <div>
      <QuestionSummary />
      {/* Top row: slider card (full width, compact) */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}>Gradient <Tex>{"m"}</Tex></span>
          <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`m = ${fmt(m, 1)}`}</Tex></span>
        </div>
        <input type="range" min={-2} max={3} step={0.1} value={m} onChange={e => setM(handleSlider(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map((pr, i) => { const active = Math.abs(m - pr.val) < 0.05; return (<button key={i} onClick={() => setM(pr.val)} style={{ flex: 1, padding: "6px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 500, lineHeight: 1.2 }}><Tex>{`m = ${pr.val}`}</Tex></button>); })}
        </div>
      </div>
      {/* Graph + status panels side-by-side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 150px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: gradPos ? C.conclBg : C.card, border: `1px solid ${(gradPos ? C.ok : C.fail) + "44"}`, borderRadius: 8, padding: "4px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: gradPos ? C.ok : C.fail, fontWeight: 700 }}>gradient</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: gradPos ? C.ok : C.fail }}><Tex>{`m = ${fmt(m, 1)}`}</Tex></div>
            <div style={{ fontSize: 11, color: gradPos ? C.ok : C.fail }}>{gradPos ? "positive ✓" : "not positive ✗"}</div>
          </div>
          <div style={{ background: interceptLt3 ? C.conclBg : C.card, border: `1px solid ${(interceptLt3 ? C.ok : C.fail) + "44"}`, borderRadius: 8, padding: "4px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: interceptLt3 ? C.ok : C.fail, fontWeight: 700 }}>y-intercept</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: interceptLt3 ? C.ok : C.fail }}><Tex>{`3{-}2m = ${fmt(intercept, 1)}`}</Tex></div>
            <div style={{ fontSize: 11, color: interceptLt3 ? C.ok : C.fail }}>{interceptLt3 ? "< 3 ✓" : "≥ 3 ✗"}</div>
          </div>
        </div>
      </div>
      {/* Arrow rows for the three statements */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 5 }}>
        <ArrowRow
          label="I (P)"
          premiseTex={"m > 0"}
          conclusionTex={"y_0 < 3"}
          premiseHolds={gradPos}
          conclusionHolds={interceptLt3}
          verdict={pVerdict}
        />
        <ArrowRow
          label="II (converse)"
          premiseTex={"y_0 < 3"}
          conclusionTex={"m > 0"}
          premiseHolds={interceptLt3}
          conclusionHolds={gradPos}
          verdict={cvVerdict}
        />
        <ArrowRow
          label="III (contrapositive)"
          premiseTex={"y_0 \\ge 3"}
          conclusionTex={"m \\le 0"}
          premiseHolds={interceptGe3}
          conclusionHolds={gradNonPos}
          verdict={cpVerdict}
        />
      </div>
      {/* Progress tracker */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawPSupport ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawPSupport} />
            <span style={{ fontWeight: sawPSupport ? 700 : 500 }}>Row I went green: <Tex>{"m > 0"}</Tex> gave <Tex>{"y_0 < 3"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(P holds.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawCvSupport ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawCvSupport} />
            <span style={{ fontWeight: sawCvSupport ? 700 : 500 }}>Row II went green: <Tex>{"y_0 < 3"}</Tex> gave <Tex>{"m > 0"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Converse holds.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawCpSupport ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawCpSupport} />
            <span style={{ fontWeight: sawCpSupport ? 700 : 500 }}>Row III went green: <Tex>{"y_0 \\ge 3"}</Tex> gave <Tex>{"m \\le 0"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Contrapositive holds.)</span></span>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>The y-intercept <Tex>{"3 - 2m"}</Tex> is less than 3 exactly when <Tex>{"m > 0"}</Tex>, so <Tex>{"m > 0 \\Leftrightarrow y_0 < 3"}</Tex>. An equivalence makes the original, converse, and contrapositive all true simultaneously.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is H: I, II and III.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Try <Tex>{"m = 2"}</Tex> (rows I and II green) then <Tex>{"m = -1"}</Tex> (row III green) to cover all three.
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
