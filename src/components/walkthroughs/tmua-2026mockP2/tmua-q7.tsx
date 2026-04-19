"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 7, paper: "Paper 2", year: "2026 Mock", topicTag: "Logic / Necessary & Sufficient" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\tfrac{c}{b} > 0 \\text{ and } \\tfrac{a}{b} < 0", expl: "This would force the y-intercept c/b to be positive (good) but gradient = -a/b would be POSITIVE (since a/b is negative means -a/b is positive). So this gives the wrong gradient sign. Not even necessary for our target, let alone a correct answer." },
  { letter: "B", ok: false, tex: "\\tfrac{c}{b} < 0 \\text{ and } \\tfrac{a}{b} > 0", expl: "The second part a/b > 0 does give negative gradient (since gradient = -a/b). But c/b < 0 means the y-intercept is NEGATIVE, not positive. So this is wrong. This is actually necessary and sufficient for the OPPOSITE combination: negative gradient and negative y-intercept." },
  { letter: "C", ok: false, tex: "a > b > c", expl: "This ordering of a, b, c has no direct relationship to the signs of a/b and c/b. Try a = 3, b = 1, c = -1 (which satisfies a > b > c): gradient = -3 (negative ✓), y-intercept = -1 (negative ✗). So it doesn't even guarantee the conditions." },
  { letter: "D", ok: false, tex: "a < b < c", expl: "Like option C, a purely ordinal condition doesn't pin down the signs of a/b and c/b. For instance a = -1, b = 1, c = 3: gradient = 1 (positive ✗). So it fails even necessity." },
  { letter: "E", ok: true, tex: "a \\text{ and } c \\text{ have the same sign}", expl: "Rearrange the line to y = (-a/b)x + (c/b). Negative gradient means -a/b < 0, so a/b > 0, so a and b share a sign. Positive y-intercept means c/b > 0, so c and b share a sign. Therefore a and c share a sign (transitivity through b). So this is NECESSARY. But it's not sufficient: a = 1, b = -1, c = 1 satisfies 'a, c same sign' but gives gradient +1 and y-intercept -1, breaking both conditions." },
  { letter: "F", ok: false, tex: "a \\text{ and } c \\text{ have opposite signs}", expl: "This is the negation of the correct answer. As worked out: a shares b's sign (for negative gradient) and c shares b's sign (for positive y-intercept), so a and c must share a sign, NOT have opposite signs. This condition is actually incompatible with our target." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }


const ITEMS_Q7 = null;
const OPTIONS_Q7 = [
  ["A", "a > 0"],
  ["B", "b > 0"],
  ["C", "c > 0"],
  ["D", "a \\text{ and } b \\text{ have the same sign}"],
  ["E", "a \\text{ and } c \\text{ have the same sign}"],
  ["F", "b \\text{ and } c \\text{ have the same sign}"]
];
const SECTIONS_Q7 = [
  { type: 'prose', text: (<>The line with equation <Tex>{"ax + by = c"}</Tex> has negative gradient and positive y-intercept.</>) },
  { type: 'prose-tight', text: (<>Which of the following is a necessary but not sufficient condition on <Tex>{"a, b, c"}</Tex>?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q7;
  const options = OPTIONS_Q7;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q7</span>
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
  const sections = SECTIONS_Q7;
  const options = OPTIONS_Q7;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 7</span>
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

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>Rearrange <Tex>{"ax + by = c"}</Tex> into <Tex>{"y = mx + k"}</Tex> form to read off the gradient and y-intercept in terms of <Tex>{"a, b, c"}</Tex>.</p><p style={{ margin: 0 }}>Then translate "negative gradient" and "positive y-intercept" into sign conditions on those expressions, and combine them to find what sign relationship <Tex>{"a"}</Tex>, <Tex>{"b"}</Tex>, <Tex>{"c"}</Tex> must share.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Write the two conditions we want as <b>T</b>: negative gradient AND positive y-intercept.</p><p style={{ margin: "0 0 4px" }}>A condition X is <b>necessary</b> for T if T forces X to hold (whenever T is true, X is true).</p><p style={{ margin: "0 0 4px" }}>A condition X is <b>sufficient</b> for T if X forces T to hold (whenever X is true, T is true).</p><p style={{ margin: 0 }}>We want an X that is forced by T but doesn't force T back: necessary but not sufficient.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Sign grid: for each (sign of a, sign of b, sign of c), show gradient and y-intercept sign
  const signDiagram = (() => {
    const pW = 280, pH = 220;
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 50} height={hh || 18}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.3 }}>{children}</div>
      </foreignObject>
    );
    // Each row: (a, b, c) signs and resulting gradient/y-int signs
    // gradient = -a/b, y-int = c/b
    const rows = [
      { a: "+", b: "+", c: "+", target: true },   // grad = -, yint = +  ✓
      { a: "-", b: "-", c: "-", target: true },   // grad = -, yint = +  ✓ (same-sign a,c)
      { a: "+", b: "+", c: "-", target: false },  // grad = -, yint = -
      { a: "-", b: "+", c: "+", target: false },  // grad = +, yint = +
      { a: "+", b: "-", c: "+", target: false },  // grad = +, yint = -  (a, c same sign but NOT target!)
      { a: "-", b: "+", c: "-", target: false },  // grad = +, yint = -
    ];
    const rowH = 28;
    const y0 = 30;
    const colX = [14, 38, 62, 100, 160, 220];
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={4} w={pW - 20} hh={14} color={C.muted}><span style={{ fontWeight: 700, fontSize: 11 }}>All sign combinations</span></FO>
        {/* Header row */}
        <FO x={colX[0]} y={16} w={22} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"a"}</Tex></span></FO>
        <FO x={colX[1]} y={16} w={22} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"b"}</Tex></span></FO>
        <FO x={colX[2]} y={16} w={22} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"c"}</Tex></span></FO>
        <FO x={colX[3]} y={16} w={54} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>gradient</span></FO>
        <FO x={colX[4]} y={16} w={54} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>y-int</span></FO>
        <FO x={colX[5]} y={16} w={50} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>target?</span></FO>
        <line x1={8} y1={y0 - 2} x2={pW - 8} y2={y0 - 2} stroke={C.border} strokeWidth={0.7} />
        {rows.map((r, i) => {
          const y = y0 + i * rowH;
          // gradient sign: -a/b sign
          const gradSign = ((r.a === "+") === (r.b === "+")) ? "-" : "+";
          const yintSign = ((r.c === "+") === (r.b === "+")) ? "+" : "-";
          const isTarget = gradSign === "-" && yintSign === "+";
          const col = isTarget ? C.ok : C.muted;
          const bg = isTarget ? "rgba(85,239,196,0.08)" : "transparent";
          return (
            <g key={i}>
              {isTarget && <rect x={8} y={y - 2} width={pW - 16} height={rowH - 6} rx={4} fill={bg} stroke={C.ok} strokeWidth={0.5} />}
              <FO x={colX[0]} y={y + 2} w={22} hh={16} color={r.a === "+" ? C.ok : C.fail}><span style={{ fontSize: 12, fontWeight: 700 }}>{r.a}</span></FO>
              <FO x={colX[1]} y={y + 2} w={22} hh={16} color={r.b === "+" ? C.ok : C.fail}><span style={{ fontSize: 12, fontWeight: 700 }}>{r.b}</span></FO>
              <FO x={colX[2]} y={y + 2} w={22} hh={16} color={r.c === "+" ? C.ok : C.fail}><span style={{ fontSize: 12, fontWeight: 700 }}>{r.c}</span></FO>
              <FO x={colX[3]} y={y + 2} w={54} hh={16} color={gradSign === "-" ? C.ok : C.fail}><span style={{ fontSize: 12, fontWeight: 600 }}>{gradSign}</span></FO>
              <FO x={colX[4]} y={y + 2} w={54} hh={16} color={yintSign === "+" ? C.ok : C.fail}><span style={{ fontSize: 12, fontWeight: 600 }}>{yintSign}</span></FO>
              <FO x={colX[5]} y={y + 2} w={50} hh={16} color={col}><span style={{ fontSize: 12 }}>{isTarget ? "✅" : "✗"}</span></FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  const solveSteps = [
    { label: "REARRANGE INTO y = mx + k", color: C.ps, text: <span>Isolate <Tex>{"y"}</Tex> in <Tex>{"ax + by = c"}</Tex>.</span>, math: (<><div><Tex>{"by = -ax + c"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"y = -\\tfrac{a}{b}\\,x + \\tfrac{c}{b}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{gradient} = -\\tfrac{a}{b}, \\quad \\text{y-intercept} = \\tfrac{c}{b}"}</Tex></div></>) },
    { label: "TRANSLATE THE TARGET CONDITIONS", color: C.calc, text: <span>Negative gradient means <Tex>{"-\\tfrac{a}{b} < 0"}</Tex>, so <Tex>{"\\tfrac{a}{b} > 0"}</Tex>: <Tex>{"a"}</Tex> and <Tex>{"b"}</Tex> share a sign. Positive y-intercept means <Tex>{"\\tfrac{c}{b} > 0"}</Tex>: <Tex>{"c"}</Tex> and <Tex>{"b"}</Tex> share a sign.</span>, math: (<><div><Tex>{"-\\tfrac{a}{b} < 0 \\;\\Rightarrow\\; a,b \\text{ same sign}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\tfrac{c}{b} > 0 \\;\\Rightarrow\\; c,b \\text{ same sign}"}</Tex></div></>) },
    { label: "COMBINE: WHAT MUST a AND c SHARE?", color: C.ok, text: <span>Both <Tex>{"a"}</Tex> and <Tex>{"c"}</Tex> match the sign of <Tex>{"b"}</Tex>, so they must match each other. This gives a <b>necessary</b> condition.</span>, math: (<><div><Tex>{"a \\sim b \\text{ and } c \\sim b"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow\\; a \\sim c \\text{ (same sign)}"}</Tex></div></>), diagram: signDiagram },
    { label: "CHECK: IS IT SUFFICIENT?", color: C.fail, text: <span>Does "<Tex>{"a, c"}</Tex> same sign" alone guarantee both target conditions? Try <Tex>{"a = 1"}</Tex>, <Tex>{"b = -1"}</Tex>, <Tex>{"c = 1"}</Tex>: <Tex>{"a, c"}</Tex> are both positive (same sign ✓) but gradient <Tex>{"= -1/(-1) = +1"}</Tex> (positive ✗) and y-intercept <Tex>{"= 1/(-1) = -1"}</Tex> (negative ✗). So the condition is not sufficient.</span>, math: (<><div><Tex>{"a=1,\\; b=-1,\\; c=1"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"a,c \\text{ same sign} \\;\\checkmark"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{gradient} = +1,\\; \\text{y-int} = -1 \\;\\text{✗}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\color{#ff7675}{\\text{Not sufficient}}"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>"<Tex>{"a"}</Tex> and <Tex>{"c"}</Tex> same sign" is forced by the target (necessary) but doesn't force the target back (not sufficient). That matches option E exactly.</span>, math: (<div><Tex>{"\\color{#55efc4}{\\text{Necessary but not sufficient: E}}"}</Tex></div>), conclusion: <span>The answer is E: a and c have the same sign.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 280px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

// ArrowRow: premise/arrow/conclusion cell, coloured by test outcome.
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
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", minWidth: 160, lineHeight: 1.3 }}>{label}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "1 1 auto", flexWrap: "wrap" }}>
          <span style={{ padding: "3px 10px", borderRadius: 7, border: `1.5px solid ${pCol}`, background: pCol + "18", color: pCol, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Tex>{premiseTex}</Tex>
            <span style={{ fontSize: 11 }}>{premiseHolds ? "✓" : "✗"}</span>
          </span>
          <span style={{ fontSize: 20, color: arrowCol, fontWeight: 700 }}>→</span>
          <span style={{ padding: "3px 10px", borderRadius: 7, border: `1.5px solid ${cCol}`, background: cCol + "18", color: cCol, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
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
  // Three sliders for a, b, c. Non-zero. Compute gradient = -a/b, y-int = c/b.
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [c, setC] = useState(1);
  // Progress flags: has the student DEMONSTRATED each half of the argument?
  const [sawNecHold, setSawNecHold] = useState(false);   // reached a state where target holds and a,c same sign (necessity confirmed)
  const [sawSuffFail, setSawSuffFail] = useState(false); // reached a state where a,c same sign but target fails (sufficiency broken)

  const snap = [-3, -2, -1, -0.5, 0.5, 1, 2, 3];
  const snapRadius = 0.15;
  const handleSnap = (raw) => { for (const s of snap) { if (Math.abs(raw - s) < snapRadius) return s; } const r = Math.round(raw * 10) / 10; return (Math.abs(r) < 0.1) ? (r < 0 ? -0.1 : 0.1) : r; };

  const grad = -a / b;
  const yint = c / b;
  const gradNeg = grad < 0;
  const yintPos = yint > 0;
  const targetHolds = gradNeg && yintPos;
  const sameSignAC = (a > 0) === (c > 0);

  // Update progress flags as student explores
  useEffect(() => {
    if (targetHolds && sameSignAC) setSawNecHold(true);
    if (sameSignAC && !targetHolds) setSawSuffFail(true);
  }, [targetHolds, sameSignAC]);
  const bothDemonstrated = sawNecHold && sawSuffFail;

  // Necessity test: target ⇒ sameSign(a,c). Counterexample would be target holds but a,c opposite.
  const necVerdict = !targetHolds ? "vacuous" : (sameSignAC ? "support" : "counterexample");
  // Sufficiency test: sameSign(a,c) ⇒ target. Counterexample would be a,c same sign but target fails.
  const suffVerdict = !sameSignAC ? "vacuous" : (targetHolds ? "support" : "counterexample");

  // Presets: chosen to demonstrate each case clearly.
  // - a=1,b=1,c=1: target ✓, a,c same sign ✓ (both rows green)
  // - a=1,b=-1,c=1: target ✗, a,c same sign ✓ (sufficiency red counterexample)
  // - a=1,b=1,c=-1: target ✗ (neg yint), sameSign ✗ (both vacuous for different reasons)
  // - a=-1,b=-1,c=-1: target ✓, a,c same sign ✓
  const presets = [
    { a: 1, b: 1, c: 1 },
    { a: 1, b: -1, c: 1 },
    { a: 1, b: 1, c: -1 },
    { a: -1, b: -1, c: -1 },
  ];

  // Line plot
  const graph = (() => {
    const pW = 320, pH = 200;
    const pad = { l: 26, r: 10, t: 12, b: 20 };
    const xMin = -4, xMax = 4, yMin = -4, yMax = 4;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
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
    const lineCol = targetHolds ? C.ok : C.fail;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="vgc7"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        {gridLines}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        <g clipPath="url(#vgc7)">
          {/* The line y = grad*x + yint */}
          <line x1={sx(xMin)} y1={sy(grad * xMin + yint)} x2={sx(xMax)} y2={sy(grad * xMax + yint)} stroke={lineCol} strokeWidth={2.5} />
          {/* y-intercept marker */}
          <circle cx={sx(0)} cy={sy(yint)} r={4.5} fill={yintPos ? C.ok : C.fail} stroke={C.white} strokeWidth={1.5} />
        </g>
        <FO x={sx(0) + 6} y={sy(yint) - 8} w={64} hh={14} color={yintPos ? C.ok : C.fail}><Tex>{`y_0 = ${fmt(yint, 1)}`}</Tex></FO>
        <FO x={sx(xMax) - 12} y={sy(0) + 2} w={12} hh={14} color={C.muted}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0) + 4} y={sy(yMax) - 2} w={12} hh={14} color={C.muted}><Tex>{"y"}</Tex></FO>
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      {/* Three sliders, inlined so React doesn't remount on every keystroke */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
            <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"a"}</Tex></span>
            <span style={{ fontSize: 13, color: C.calc, fontWeight: 700 }}><Tex>{`a = ${fmt(a, 1)}`}</Tex></span>
          </div>
          <input type="range" min={-3} max={3} step={0.1} value={a} onChange={e => setA(handleSnap(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
            <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"b"}</Tex></span>
            <span style={{ fontSize: 13, color: C.calc, fontWeight: 700 }}><Tex>{`b = ${fmt(b, 1)}`}</Tex></span>
          </div>
          <input type="range" min={-3} max={3} step={0.1} value={b} onChange={e => setB(handleSnap(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
            <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"c"}</Tex></span>
            <span style={{ fontSize: 13, color: C.calc, fontWeight: 700 }}><Tex>{`c = ${fmt(c, 1)}`}</Tex></span>
          </div>
          <input type="range" min={-3} max={3} step={0.1} value={c} onChange={e => setC(handleSnap(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        </div>
      </div>
      {/* Presets in 2x2 grid for better readability */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 5 }}>
        {presets.map((pr, i) => {
          const active = Math.abs(a - pr.a) < 0.05 && Math.abs(b - pr.b) < 0.05 && Math.abs(c - pr.c) < 0.05;
          return (<button key={i} onClick={() => { setA(pr.a); setB(pr.b); setC(pr.c); }} style={{ padding: "7px 8px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 13, cursor: "pointer", fontWeight: active ? 700 : 500, lineHeight: 1.3 }}><Tex>{`a = ${pr.a}, \\;\\; b = ${pr.b}, \\;\\; c = ${pr.c}`}</Tex></button>);
        })}
      </div>
      {/* Plot + status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: gradNeg ? C.conclBg : C.card, border: `1px solid ${(gradNeg ? C.ok : C.fail) + "44"}`, borderRadius: 8, padding: "4px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: gradNeg ? C.ok : C.fail, fontWeight: 700 }}>gradient</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: gradNeg ? C.ok : C.fail }}><Tex>{`-\\tfrac{a}{b} = ${fmt(grad, 1)}`}</Tex></div>
            <div style={{ fontSize: 11, color: gradNeg ? C.ok : C.fail }}>{gradNeg ? "negative ✓" : "not negative ✗"}</div>
          </div>
          <div style={{ background: yintPos ? C.conclBg : C.card, border: `1px solid ${(yintPos ? C.ok : C.fail) + "44"}`, borderRadius: 8, padding: "4px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: yintPos ? C.ok : C.fail, fontWeight: 700 }}>y-intercept</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: yintPos ? C.ok : C.fail }}><Tex>{`\\tfrac{c}{b} = ${fmt(yint, 1)}`}</Tex></div>
            <div style={{ fontSize: 11, color: yintPos ? C.ok : C.fail }}>{yintPos ? "positive ✓" : "not positive ✗"}</div>
          </div>
        </div>
      </div>
      {/* Arrow rows: testing whether Option E ("a, c have the same sign") is necessary and sufficient for the target. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 5 }}>
        <ArrowRow
          label={<><div>Is Option E</div><div style={{ color: C.text }}>necessary?</div></>}
          premiseTex={"\\text{grad}<0 \\text{ and } y_0>0"}
          conclusionTex={"a, c \\text{ same sign}"}
          premiseHolds={targetHolds}
          conclusionHolds={sameSignAC}
          verdict={necVerdict}
        />
        <ArrowRow
          label={<><div>Is Option E</div><div style={{ color: C.text }}>sufficient?</div></>}
          premiseTex={"a, c \\text{ same sign}"}
          conclusionTex={"\\text{grad}<0 \\text{ and } y_0>0"}
          premiseHolds={sameSignAC}
          conclusionHolds={targetHolds}
          verdict={suffVerdict}
        />
      </div>
      {/* Status message: reflects current state */}
      {suffVerdict === "counterexample" ? (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.fail, lineHeight: 1.5 }}>Option E is NOT sufficient here.</div>
          <div style={{ fontSize: 12, color: C.fail, marginTop: 2 }}><Tex>{"a"}</Tex> and <Tex>{"c"}</Tex> share a sign, but gradient or y-intercept breaks the target.</div>
        </div>
      ) : necVerdict === "support" ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ok, lineHeight: 1.5 }}>Both target conditions hold and <Tex>{"a, c"}</Tex> share a sign.</div>
          <div style={{ fontSize: 12, color: C.ok, marginTop: 2 }}>Necessity confirmed for this case. Now find one where <Tex>{"a, c"}</Tex> share a sign but the target fails.</div>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>Neither arrow row is testing anything right now: premises aren't matching up for this choice.</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Try <span style={{ color: C.calc, fontWeight: 700, padding: "1px 6px", background: C.calc + "12", borderRadius: 5 }}><Tex>{"a = 1,\\; b = 1,\\; c = 1"}</Tex></span> (both conditions hold) then <span style={{ color: C.calc, fontWeight: 700, padding: "1px 6px", background: C.calc + "12", borderRadius: 5 }}><Tex>{"a = 1,\\; b = -1,\\; c = 1"}</Tex></span> (sufficiency fails).</div>
        </div>
      )}
      {/* Progress tracker */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawNecHold ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawNecHold} />
            <span style={{ fontWeight: sawNecHold ? 700 : 500 }}>Found a state where the target holds AND <Tex>{"a, c"}</Tex> share a sign. <span style={{ color: C.muted, fontWeight: 500 }}>(Consistent with necessity.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawSuffFail ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawSuffFail} />
            <span style={{ fontWeight: sawSuffFail ? 700 : 500 }}>Found a state where <Tex>{"a, c"}</Tex> share a sign BUT the target fails. <span style={{ color: C.muted, fontWeight: 500 }}>(Breaks sufficiency.)</span></span>
          </div>
        </div>
        {bothDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>The target forces both <Tex>{"a"}</Tex> and <Tex>{"c"}</Tex> to match <Tex>{"b"}</Tex> in sign, so they must match each other (necessary). But the shared sign of <Tex>{"a, c"}</Tex> says nothing about <Tex>{"b"}</Tex>, so it can't pin down the target (not sufficient).</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is E: <Tex>{"a"}</Tex> and <Tex>{"c"}</Tex> have the same sign.</div>
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
