"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 12, set: "A", paperNumber: "Paper 2", topicTag: "Integration / Inequalities" };
const fmt = (v, dp = 3) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

// Consistent per-integrand colours, reused throughout the walkthrough.
// P uses green (smallest/bottom curve), Q uses purple (middle), R uses amber (largest/top).
const INT_COLORS = { P: C.ok, Q: C.accentLight, R: C.assum };

const opts = [
  { letter: "A", ok: true, tex: "P < Q < R", expl: "For x ∈ (0, 1): x² < x < √x (squaring shrinks, square-rooting grows). Since 2^t is strictly increasing, 2^(x²) < 2^x < 2^(√x) pointwise. Integrating over [0, 1] preserves the ordering, so P < Q < R." },
  { letter: "B", ok: false, tex: "P < R < Q", expl: "This puts R between P and Q, but 2^(√x) is the LARGEST integrand on (0, 1) because √x is the largest of x², x, √x there. So R must be largest, not middle." },
  { letter: "C", ok: false, tex: "Q < P < R", expl: "This puts Q below P, but 2^x > 2^(x²) on (0, 1) because x > x². Integrating: Q > P. So Q cannot be smaller than P." },
  { letter: "D", ok: false, tex: "Q < R < P", expl: "P is the smallest because 2^(x²) is the smallest integrand on (0, 1). This option puts P at the top, which reverses the correct order entirely." },
  { letter: "E", ok: false, tex: "R < P < Q", expl: "R is the LARGEST because √x > x > x² on (0, 1). Putting R smallest is wrong." },
  { letter: "F", ok: false, tex: "R < Q < P", expl: "This is the reverse of the correct answer. 2^t being increasing and x² < x < √x on (0, 1) gives P < Q < R, not the reverse." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }


const ITEMS_Q12 = null;
const OPTIONS_Q12 = [
  ["A", "P < Q < R"],
  ["B", "P < R < Q"],
  ["C", "Q < P < R"],
  ["D", "Q < R < P"],
  ["E", "R < P < Q"],
  ["F", "R < Q < P"]
];
const SECTIONS_Q12 = [
  { type: 'prose', text: (<>Place the following integrals in order of size, starting with the smallest.</>) },
  { type: "mathbox", tex: "P = \\int_0^1 2^{x^2}\\, dx, \\quad Q = \\int_0^1 2^{x}\\, dx, \\quad R = \\int_0^1 2^{\\sqrt{x}}\\, dx" }
];

function QuestionSummary() {
  const sections = SECTIONS_Q12;
  const options = OPTIONS_Q12;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q12</span>
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
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }


function ReadStep() {
  const sections = SECTIONS_Q12;
  const options = OPTIONS_Q12;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 12</span>
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
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 140px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>All three integrands have the form <Tex>{"2^t"}</Tex> with a different exponent built from <Tex>{"x"}</Tex>: <Tex>{"x^2"}</Tex>, <Tex>{"x"}</Tex>, and <Tex>{"\\sqrt{x}"}</Tex>. On the integration range <Tex>{"[0, 1]"}</Tex>, compare these three exponents pointwise.</p><p style={{ margin: 0 }}>Then use the fact that <Tex>{"2^t"}</Tex> is a strictly increasing function of <Tex>{"t"}</Tex> to translate the exponent ordering into an ordering of the integrands, and hence of the integrals.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>For <Tex>{"0 < x < 1"}</Tex>, squaring a number makes it smaller (e.g. <Tex>{"0.5^2 = 0.25"}</Tex>) and taking its square root makes it bigger (e.g. <Tex>{"\\sqrt{0.5} \\approx 0.71"}</Tex>). At the endpoints <Tex>{"x = 0"}</Tex> and <Tex>{"x = 1"}</Tex>, all three agree.</p><p style={{ margin: 0 }}>So throughout <Tex>{"(0, 1)"}</Tex>: <Tex>{"x^2 < x < \\sqrt{x}"}</Tex>. If the integrands are strictly ordered on the whole open interval (and equal only at measure-zero endpoints), the integrals inherit the strict order.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const FO = ({ x, y, w, hh, color, children }) => (<foreignObject x={x} y={y} width={w || 40} height={hh || 16}><div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div></foreignObject>);

  // STEP 1 DIAGRAM: compare the three exponents x², x, √x on [0, 1]. Show all three curves on the same plot.
  const expDiagram = (() => {
    const pW = 300, pH = 210;
    const pad = { l: 32, r: 14, t: 20, b: 24 };
    const xMin = 0, xMax = 1, yMin = 0, yMax = 1;
    const sx = (v) => pad.l + ((v - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (v) => pad.t + ((yMax - v) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const x = xMin + (i / 100) * (xMax - xMin);
      pts.push({ x, xsq: x * x, sqrtX: Math.sqrt(x) });
    }
    const line = (fn) => pts.map(p => `${sx(p.x)},${sy(fn(p))}`).join(" ");
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={4} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Compare exponents on <Tex>{"[0, 1]"}</Tex></span></FO>
        {/* Gridlines at 0.25, 0.5, 0.75 */}
        {[0.25, 0.5, 0.75].map(g => <line key={`gx${g}`} x1={sx(g)} y1={pad.t} x2={sx(g)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.4} />)}
        {[0.25, 0.5, 0.75].map(g => <line key={`gy${g}`} x1={pad.l} y1={sy(g)} x2={pW - pad.r} y2={sy(g)} stroke={C.border} strokeWidth={0.4} />)}
        {/* Axes */}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        {/* Three curves */}
        <polyline points={line(p => p.xsq)} fill="none" stroke={INT_COLORS.P} strokeWidth={2} />
        <polyline points={line(p => p.x)} fill="none" stroke={INT_COLORS.Q} strokeWidth={2} />
        <polyline points={line(p => p.sqrtX)} fill="none" stroke={INT_COLORS.R} strokeWidth={2} />
        {/* Labels positioned along the curves */}
        <FO x={sx(0.85) - 8} y={sy(0.68)} w={30} hh={14} color={INT_COLORS.P}><Tex>{"x^2"}</Tex></FO>
        <FO x={sx(0.6) - 8} y={sy(0.62)} w={30} hh={14} color={INT_COLORS.Q}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0.35) - 14} y={sy(0.66)} w={30} hh={14} color={INT_COLORS.R}><Tex>{"\\sqrt{x}"}</Tex></FO>
        {/* Axis tick labels */}
        <FO x={pad.l - 20} y={sy(0) - 7} w={16} hh={14} color={C.muted}><Tex>{"0"}</Tex></FO>
        <FO x={pad.l - 20} y={sy(1) - 7} w={16} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO x={sx(1) - 8} y={sy(0) + 4} w={16} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO x={sx(0) - 4} y={sy(0) + 4} w={16} hh={14} color={C.muted}><Tex>{"0"}</Tex></FO>
      </svg>
    );
  })();

  // STEP 2 DIAGRAM: three integrands 2^(x²), 2^x, 2^(√x) on [0, 1]. Values from 1 to 2.
  const integrandDiagram = (() => {
    const pW = 300, pH = 210;
    const pad = { l: 32, r: 14, t: 20, b: 24 };
    const xMin = 0, xMax = 1, yMin = 1, yMax = 2;
    const sx = (v) => pad.l + ((v - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (v) => pad.t + ((yMax - v) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const x = xMin + (i / 100) * (xMax - xMin);
      pts.push({ x, P: Math.pow(2, x * x), Q: Math.pow(2, x), R: Math.pow(2, Math.sqrt(x)) });
    }
    const line = (fn) => pts.map(p => `${sx(p.x)},${sy(fn(p))}`).join(" ");
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={4} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Integrands <Tex>{"2^{\\text{exp}}"}</Tex> on <Tex>{"[0, 1]"}</Tex></span></FO>
        {[1.25, 1.5, 1.75].map(g => <line key={`gy${g}`} x1={pad.l} y1={sy(g)} x2={pW - pad.r} y2={sy(g)} stroke={C.border} strokeWidth={0.4} />)}
        {[0.25, 0.5, 0.75].map(g => <line key={`gx${g}`} x1={sx(g)} y1={pad.t} x2={sx(g)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.4} />)}
        <line x1={pad.l} y1={sy(1)} x2={pW - pad.r} y2={sy(1)} stroke={C.muted} strokeWidth={1} />
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={sy(1)} stroke={C.muted} strokeWidth={1} />
        <polyline points={line(p => p.P)} fill="none" stroke={INT_COLORS.P} strokeWidth={2} />
        <polyline points={line(p => p.Q)} fill="none" stroke={INT_COLORS.Q} strokeWidth={2} />
        <polyline points={line(p => p.R)} fill="none" stroke={INT_COLORS.R} strokeWidth={2} />
        <FO x={sx(0.85) - 14} y={sy(Math.pow(2, 0.85 * 0.85)) + 2} w={50} hh={14} color={INT_COLORS.P}><Tex>{"2^{x^2}"}</Tex></FO>
        <FO x={sx(0.55) - 16} y={sy(Math.pow(2, 0.55)) + 2} w={40} hh={14} color={INT_COLORS.Q}><Tex>{"2^{x}"}</Tex></FO>
        <FO x={sx(0.3) - 18} y={sy(Math.pow(2, Math.sqrt(0.3))) - 18} w={40} hh={14} color={INT_COLORS.R}><Tex>{"2^{\\sqrt{x}}"}</Tex></FO>
        <FO x={pad.l - 20} y={sy(1) - 7} w={16} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO x={pad.l - 20} y={sy(2) - 7} w={16} hh={14} color={C.muted}><Tex>{"2"}</Tex></FO>
        <FO x={sx(1) - 8} y={sy(1) + 4} w={16} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO x={sx(0) - 4} y={sy(1) + 4} w={16} hh={14} color={C.muted}><Tex>{"0"}</Tex></FO>
      </svg>
    );
  })();

  // STEP 3 DIAGRAM: summary bar chart showing numerical values of P, Q, R (via Simpson approx).
  const valueBarDiagram = (() => {
    // Approximate via Simpson's 1/3 rule on n = 20 subintervals for decent accuracy.
    const simpson = (f) => {
      const n = 40, a = 0, b = 1, h = (b - a) / n;
      let s = f(a) + f(b);
      for (let i = 1; i < n; i++) s += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
      return (h / 3) * s;
    };
    const Pval = simpson(x => Math.pow(2, x * x));
    const Qval = simpson(x => Math.pow(2, x));
    const Rval = simpson(x => Math.pow(2, Math.sqrt(x)));
    const pW = 300, pH = 180;
    const barMax = Math.max(Pval, Qval, Rval);
    const barMin = Math.min(Pval, Qval, Rval);
    // Normalise so smallest bar is 40% of max width, largest is 95%, to amplify visible difference.
    const maxW = 230;
    const normW = (v) => {
      const t = (v - barMin) / (barMax - barMin); // 0..1
      return maxW * (0.45 + 0.55 * t);
    };
    const entries = [
      { label: "P", val: Pval, color: INT_COLORS.P },
      { label: "Q", val: Qval, color: INT_COLORS.Q },
      { label: "R", val: Rval, color: INT_COLORS.R },
    ];
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Numerical values (Simpson's rule)</span></FO>
        {entries.map((e, i) => {
          const y = 34 + i * 46;
          return (
            <g key={i}>
              <FO x={12} y={y + 10} w={20} hh={18} color={e.color}><span style={{ fontSize: 14, fontWeight: 700 }}>{e.label}</span></FO>
              <rect x={38} y={y + 4} width={normW(e.val)} height={22} rx={4} fill={e.color + "44"} stroke={e.color} strokeWidth={1} />
              <FO x={38 + normW(e.val) + 6} y={y + 8} w={60} hh={18} color={e.color}><span style={{ fontSize: 12, fontWeight: 700 }}>{fmt(e.val, 4)}</span></FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  const solveSteps = [
    { label: "COMPARE THE EXPONENTS", color: C.ps, text: <span>The three integrands have exponents <Tex>{"x^2"}</Tex>, <Tex>{"x"}</Tex>, and <Tex>{"\\sqrt{x}"}</Tex>. On <Tex>{"[0, 1]"}</Tex>, pick any <Tex>{"x"}</Tex> strictly between 0 and 1: squaring shrinks it, square-rooting grows it, so <Tex>{"x^2 < x < \\sqrt{x}"}</Tex>.</span>, math: (<><div><Tex>{"\\text{For } 0 < x < 1:"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"x^2 < x < \\sqrt{x}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{(equal only at } x = 0, 1\\text{)}"}</Tex></div></>), diagram: expDiagram },
    { label: "MONOTONICITY OF 2^t", color: C.calc, text: <span>The function <Tex>{"t \\mapsto 2^t"}</Tex> is strictly increasing. So pointwise on <Tex>{"(0, 1)"}</Tex>, the exponent ordering <Tex>{"x^2 < x < \\sqrt{x}"}</Tex> transfers directly to <Tex>{"2^{x^2} < 2^x < 2^{\\sqrt{x}}"}</Tex>.</span>, math: (<><div><Tex>{"2^t \\text{ is strictly increasing}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow 2^{x^2} < 2^x < 2^{\\sqrt{x}}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{on } (0, 1)"}</Tex></div></>), diagram: integrandDiagram },
    { label: "INTEGRATE OVER [0, 1]", color: C.ok, text: <span>If <Tex>{"f(x) < g(x)"}</Tex> strictly on <Tex>{"(0, 1)"}</Tex> (agreeing only at the endpoints), then <Tex>{"\\int_0^1 f < \\int_0^1 g"}</Tex>. Applying this to each pairwise comparison chains the integrals in the same order as the integrands.</span>, math: (<><div><Tex>{"\\int_0^1 2^{x^2} dx < \\int_0^1 2^x dx"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"< \\int_0^1 2^{\\sqrt{x}} dx"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{P < Q < R}"}</Tex></div></>), diagram: valueBarDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>The ordering smallest to largest is <Tex>{"P < Q < R"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{P < Q < R}"}</Tex></div>), conclusion: <span>The answer is A: <Tex>{"P < Q < R"}</Tex>.</span> },
  ];

  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 300px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Slider for x ∈ (0, 1) showing the three exponents and the three integrand values at that x.
  // Progress requires: seeing the ordering x² < x < √x at multiple interior points, AND seeing
  // the endpoints collapse (x = 0 or x = 1, all three equal).
  const [x, setX] = useState(0.5);
  const [sawInteriorOrder, setSawInteriorOrder] = useState(false);  // at some x strictly in (0,1), saw all three ordered
  const [sawEndpoint, setSawEndpoint] = useState(false);            // x very near 0 or 1, all three collapse

  const snap = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];
  const snapRadius = 0.02;
  const handleSnap = (raw) => { for (const s of snap) { if (Math.abs(raw - s) < snapRadius) return s; } return Math.round(raw * 100) / 100; };

  const xsq = x * x;
  const sqrtX = Math.sqrt(x);
  const P_int = Math.pow(2, xsq);
  const Q_int = Math.pow(2, x);
  const R_int = Math.pow(2, sqrtX);
  const strictlyOrdered = (xsq < x) && (x < sqrtX);
  const atEndpoint = (x < 0.02) || (x > 0.98);

  useEffect(() => {
    if (strictlyOrdered && !atEndpoint) setSawInteriorOrder(true);
    if (atEndpoint) setSawEndpoint(true);
  }, [strictlyOrdered, atEndpoint]);
  const bothDemonstrated = sawInteriorOrder && sawEndpoint;

  // Small graph showing the three integrands on [0, 1] with the vertical x-line.
  const graph = (() => {
    const pW = 360, pH = 240;
    const pad = { l: 32, r: 14, t: 18, b: 24 };
    const xMin = 0, xMax = 1, yMin = 1, yMax = 2;
    const sx = (v) => pad.l + ((v - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (v) => pad.t + ((yMax - v) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      const t = xMin + (i / 120) * (xMax - xMin);
      pts.push({ t, P: Math.pow(2, t * t), Q: Math.pow(2, t), R: Math.pow(2, Math.sqrt(t)) });
    }
    const line = (fn) => pts.map(p => `${sx(p.t)},${sy(fn(p))}`).join(" ");
    const FO = ({ xx, y, w, hh, color, children }) => (<foreignObject x={xx} y={y} width={w || 40} height={hh || 16}><div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div></foreignObject>);
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {[1.25, 1.5, 1.75].map(g => <line key={`gy${g}`} x1={pad.l} y1={sy(g)} x2={pW - pad.r} y2={sy(g)} stroke={C.border} strokeWidth={0.4} />)}
        {[0.25, 0.5, 0.75].map(g => <line key={`gx${g}`} x1={sx(g)} y1={pad.t} x2={sx(g)} y2={pH - pad.b} stroke={C.border} strokeWidth={0.4} />)}
        <line x1={pad.l} y1={sy(1)} x2={pW - pad.r} y2={sy(1)} stroke={C.muted} strokeWidth={1} />
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={sy(1)} stroke={C.muted} strokeWidth={1} />
        <polyline points={line(p => p.P)} fill="none" stroke={INT_COLORS.P} strokeWidth={2} />
        <polyline points={line(p => p.Q)} fill="none" stroke={INT_COLORS.Q} strokeWidth={2} />
        <polyline points={line(p => p.R)} fill="none" stroke={INT_COLORS.R} strokeWidth={2} />
        {/* Vertical line at current x */}
        <line x1={sx(x)} y1={pad.t} x2={sx(x)} y2={sy(1)} stroke={C.calc} strokeWidth={1.3} strokeDasharray="4,3" />
        {/* Three dots at current x */}
        <circle cx={sx(x)} cy={sy(P_int)} r={5} fill={INT_COLORS.P} stroke={C.white} strokeWidth={1.5} />
        <circle cx={sx(x)} cy={sy(Q_int)} r={5} fill={INT_COLORS.Q} stroke={C.white} strokeWidth={1.5} />
        <circle cx={sx(x)} cy={sy(R_int)} r={5} fill={INT_COLORS.R} stroke={C.white} strokeWidth={1.5} />
        {/* Labels */}
        <FO xx={sx(0.85) - 14} y={sy(Math.pow(2, 0.85 * 0.85)) + 2} w={50} hh={14} color={INT_COLORS.P}><Tex>{"2^{x^2}"}</Tex></FO>
        <FO xx={sx(0.55) - 16} y={sy(Math.pow(2, 0.55)) + 2} w={40} hh={14} color={INT_COLORS.Q}><Tex>{"2^{x}"}</Tex></FO>
        <FO xx={sx(0.3) - 18} y={sy(Math.pow(2, Math.sqrt(0.3))) - 18} w={40} hh={14} color={INT_COLORS.R}><Tex>{"2^{\\sqrt{x}}"}</Tex></FO>
        <FO xx={pad.l - 20} y={sy(1) - 7} w={16} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO xx={pad.l - 20} y={sy(2) - 7} w={16} hh={14} color={C.muted}><Tex>{"2"}</Tex></FO>
        <FO xx={sx(1) - 8} y={sy(1) + 4} w={16} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO xx={sx(0) - 4} y={sy(1) + 4} w={16} hh={14} color={C.muted}><Tex>{"0"}</Tex></FO>
        <FO xx={sx(x) - 20} y={pad.t + 2} w={40} hh={14} color={C.calc}><Tex>{`x = ${fmt(x, 2)}`}</Tex></FO>
      </svg>
    );
  })();

  const presets = [
    { val: 0, label: "x=0" },
    { val: 0.25, label: "x=0.25" },
    { val: 0.5, label: "x=0.5" },
    { val: 0.75, label: "x=0.75" },
    { val: 1, label: "x=1" },
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"x"}</Tex></span>
          <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`x = ${fmt(x, 2)}`}</Tex></span>
        </div>
        <input type="range" min={0} max={1} step={0.01} value={x} onChange={e => setX(handleSnap(parseFloat(e.target.value)))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {presets.map((pr, i) => { const active = Math.abs(x - pr.val) < 0.01; return (<button key={i} onClick={() => setX(pr.val)} style={{ flex: 1, padding: "5px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 500 }}><Tex>{`x = ${pr.val}`}</Tex></button>); })}
        </div>
      </div>
      {/* Plot + three value panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${INT_COLORS.R}55`, borderRadius: 8, padding: "5px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: INT_COLORS.R, fontWeight: 700 }}>R integrand (top)</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}><Tex>{`2^{\\sqrt{x}}`}</Tex></div>
            <div style={{ fontSize: 16, fontWeight: 700, color: INT_COLORS.R, marginTop: 2 }}>{fmt(R_int, 3)}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${INT_COLORS.Q}55`, borderRadius: 8, padding: "5px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: INT_COLORS.Q, fontWeight: 700 }}>Q integrand (middle)</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}><Tex>{`2^{x}`}</Tex></div>
            <div style={{ fontSize: 16, fontWeight: 700, color: INT_COLORS.Q, marginTop: 2 }}>{fmt(Q_int, 3)}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${INT_COLORS.P}55`, borderRadius: 8, padding: "5px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: INT_COLORS.P, fontWeight: 700 }}>P integrand (bottom)</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}><Tex>{`2^{x^2}`}</Tex></div>
            <div style={{ fontSize: 16, fontWeight: 700, color: INT_COLORS.P, marginTop: 2 }}>{fmt(P_int, 3)}</div>
          </div>
        </div>
      </div>
      {/* Status message */}
      {atEndpoint ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.assum, lineHeight: 1.5 }}>At <Tex>{`x = ${fmt(x, 2)}`}</Tex>, all three values coincide.</div>
          <div style={{ fontSize: 12, color: C.assum, marginTop: 2 }}>Endpoints don't separate the integrands. The ordering happens strictly inside <Tex>{"(0, 1)"}</Tex>.</div>
        </div>
      ) : strictlyOrdered ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ok, lineHeight: 1.5 }}>Strictly ordered: <Tex>{`${fmt(P_int, 3)} < ${fmt(Q_int, 3)} < ${fmt(R_int, 3)}`}</Tex></div>
          <div style={{ fontSize: 12, color: C.ok, marginTop: 2 }}>P integrand below, Q in the middle, R on top. The same order holds for every <Tex>{"x"}</Tex> strictly inside <Tex>{"(0, 1)"}</Tex>.</div>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>Try an <Tex>{"x"}</Tex> strictly between 0 and 1 to see the integrands separate.</div>
        </div>
      )}
      {/* Progress tracker */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawInteriorOrder ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawInteriorOrder} />
            <span style={{ fontWeight: sawInteriorOrder ? 700 : 500 }}>Observed <Tex>{"2^{x^2} < 2^x < 2^{\\sqrt{x}}"}</Tex> at an interior <Tex>{"x"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Integrands ordered pointwise.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawEndpoint ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawEndpoint} />
            <span style={{ fontWeight: sawEndpoint ? 700 : 500 }}>Visited an endpoint (<Tex>{"x = 0"}</Tex> or <Tex>{"x = 1"}</Tex>) where all three agree. <span style={{ color: C.muted, fontWeight: 500 }}>(Equality only at endpoints.)</span></span>
          </div>
        </div>
        {bothDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>On <Tex>{"(0, 1)"}</Tex>, squaring shrinks and rooting grows, so <Tex>{"x^2 < x < \\sqrt{x}"}</Tex>; the monotone function <Tex>{"2^t"}</Tex> passes this ordering to the integrands, and integrating preserves strict inequality when the integrands differ on an interval.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is A: <Tex>{"P < Q < R"}</Tex>.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Explore both an interior <Tex>{"x"}</Tex> and an endpoint to conclude the answer.
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
