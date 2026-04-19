"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 18, paper: "Paper 2", year: "2026 Mock", topicTag: "Polynomials / Substitution" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "b^2 > 4c", expl: "This covers too many cases. For example b = 3, c = 2 gives b² = 9 > 8 = 4c, but the substitution u = x² gives u² + 3u + 2 = 0, roots u = -1 and u = -2, both negative, so there are no real x. That agrees. BUT also b = -3, c = 2 gives same b² > 4c, while u² - 3u + 2 = 0 has roots u = 1 and u = 2, both non-negative, giving real x = ±1, ±√2. So A allows cases that DO have real roots." },
  { letter: "B", ok: false, tex: "b^2 < 4c", expl: "This is sufficient but NOT necessary. If b² < 4c then the u-quadratic has no real roots at all, so no real x. But there are also no-real-root cases with b² ≥ 4c: for example b = 3, c = 2 has b² = 9 > 8 = 4c, and still no real x (both u-roots negative). So the condition is wider than just b² < 4c." },
  { letter: "C", ok: false, tex: "c > 0 \\text{ and } b > 2\\sqrt{c}", expl: "Wrong sign. b > 2√c forces b positive and large, which gives NEGATIVE u-roots (sum -b < 0, product c > 0): so indeed no real x. But this misses the symmetric cases and also the b² < 4c cases. Need the LOWER bound b > -2√c, not the upper bound b > 2√c." },
  { letter: "D", ok: true, tex: "c > 0 \\text{ and } b > -2\\sqrt{c}", expl: "Correct. Let u = x². The original has no real roots iff u² + bu + c = 0 has no non-negative solutions. This happens in exactly two regimes, both requiring c > 0: (i) b² < 4c: the u-quadratic has no real roots at all, so b lies in (-2√c, 2√c); (ii) b² ≥ 4c but both u-roots are negative, which needs sum -b < 0 (so b > 0) and product c > 0. Combined, the condition is c > 0 and b > -2√c. The b² ≥ 4c case gives b ≥ 2√c > 0 > -2√c, so it's contained." },
  { letter: "E", ok: false, tex: "c > 0 \\text{ and } b < -2\\sqrt{c}", expl: "With c > 0 and b < -2√c (so b < 0 and large in magnitude), the u-quadratic has sum -b > 0 and product c > 0, both roots POSITIVE. So u = α gives x = ±√α, real roots! This is the opposite of what you want." },
  { letter: "F", ok: false, tex: "c > 0 \\text{ and } b < 0", expl: "Too permissive. With c > 0 and b < 0 (say b = -3, c = 2) you get u² - 3u + 2 = 0, roots u = 1, u = 2, both positive, giving four real values x = ±1, ±√2. So c > 0 and b < 0 ALLOWS real roots, contradicting the claim of 'no real roots'." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const ITEMS_Q18 = null;
const OPTIONS_Q18 = [
  ["A", "b^2 > 4c"],
  ["B", "b^2 < 4c"],
  ["C", "c > 0 \\text{ and } b > 2\\sqrt{c}"],
  ["D", "c > 0 \\text{ and } b > -2\\sqrt{c}"],
  ["E", "c > 0 \\text{ and } b < -2\\sqrt{c}"],
  ["F", "c > 0 \\text{ and } b < 0"]
];
const SECTIONS_Q18 = [
  { type: 'prose', text: (<>The equation</>) },
  { type: "mathbox", tex: "x^4 + b x^2 + c = 0" },
  { type: 'prose-tight', text: (<>has no real roots if and only if which of the following conditions is satisfied?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q18;
  const options = OPTIONS_Q18;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q18</span>
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
  const sections = SECTIONS_Q18;
  const options = OPTIONS_Q18;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 18</span>
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
        {options.map(([l, v]) => (<div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 280px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>The equation only involves <Tex>{"x^2"}</Tex> and <Tex>{"x^4"}</Tex>. Let <Tex>{"u = x^2"}</Tex>: the quartic becomes a quadratic in <Tex>{"u"}</Tex>:</p><p style={{ margin: "0 0 4px", textAlign: "center" }}><Tex>{"u^2 + b u + c = 0"}</Tex></p><p style={{ margin: 0 }}>Real <Tex>{"x"}</Tex> means <Tex>{"u \\ge 0"}</Tex>. So the quartic has no real <Tex>{"x"}</Tex> if and only if the quadratic in <Tex>{"u"}</Tex> has no <b>non-negative</b> solutions.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>"No non-negative root of the quadratic" splits into two regimes:</p><p style={{ margin: "0 0 4px" }}><b>Case A</b> <span style={{ color: C.muted }}>(no real u at all):</span> <Tex>{"b^2 - 4c < 0"}</Tex>, i.e. <Tex>{"b^2 < 4c"}</Tex>. Forces <Tex>{"c > 0"}</Tex>.</p><p style={{ margin: "0 0 4px" }}><b>Case B</b> <span style={{ color: C.muted }}>(both real u-roots negative):</span> needs sum of roots <Tex>{"-b < 0"}</Tex> (so <Tex>{"b > 0"}</Tex>) AND product <Tex>{"c > 0"}</Tex> AND discriminant <Tex>{"b^2 \\ge 4c"}</Tex>.</p><p style={{ margin: 0 }}>Combine: in BOTH cases <Tex>{"c > 0"}</Tex>. The <Tex>{"b"}</Tex> condition merges to <Tex>{"b > -2\\sqrt{c}"}</Tex>.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram: (b, c) plane showing the no-real-roots region
  const regionDiagram = (() => {
    const pW = 300, pH = 230;
    const pad = { l: 30, r: 14, t: 22, b: 24 };
    const bMin = -4, bMax = 4, cMin = -1, cMax = 4;
    const sx = (b) => pad.l + ((b - bMin) / (bMax - bMin)) * (pW - pad.l - pad.r);
    const sy = (cc) => pad.t + ((cMax - cc) / (cMax - cMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    // Shade the region: c > 0 AND b > -2√c
    // Build it as a polygon: the boundary b = -2√c for c > 0 sweeps from (0,0) upward-leftward
    // We want the region { (b, c) : c > 0, b > -2√c }
    // Upper: c = cMax, b between -2√cMax and bMax
    // Lower bound on c: c = 0, b between 0 and bMax
    // Left boundary: b = -2√c for c from 0 to cMax
    const polyPts = [];
    polyPts.push([0, 0]);
    // Along b = -2√c from c=0 to c=cMax
    for (let i = 0; i <= 20; i++) {
      const cVal = (cMax * i) / 20;
      const bVal = -2 * Math.sqrt(cVal);
      polyPts.push([bVal, cVal]);
    }
    polyPts.push([bMax, cMax]);
    polyPts.push([bMax, 0]);
    const polyD = polyPts.map(([b, cc]) => `${sx(b)},${sy(cc)}`).join(' ');
    // Boundary curve b = -2√c
    const curvePts = [];
    for (let i = 0; i <= 30; i++) {
      const cVal = (cMax * i) / 30;
      const bVal = -2 * Math.sqrt(cVal);
      curvePts.push(`${sx(bVal)},${sy(cVal)}`);
    }
    const curveD = 'M ' + curvePts.join(' L ');
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={4} y={2} w={pW - 8} hh={16} color={C.ok}><span style={{ fontWeight: 700, fontSize: 11 }}>Region where quartic has no real roots</span></FO>
        {/* Axes */}
        <line x1={sx(bMin)} y1={sy(0)} x2={sx(bMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(cMin)} x2={sx(0)} y2={sy(cMax)} stroke={C.muted} strokeWidth={1} />
        {/* Shaded region */}
        <polygon points={polyD} fill={C.ok} opacity={0.2} stroke={C.ok} strokeWidth={1.2} />
        {/* Boundary curve b = -2√c highlighted */}
        <path d={curveD} fill="none" stroke={C.ok} strokeWidth={2} />
        {/* Tick labels */}
        {[-3, -2, -1, 1, 2, 3].map(v => <FO key={`tx${v}`} x={sx(v) - 8} y={sy(0) + 2} w={16} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        {[1, 2, 3].map(v => <FO key={`ty${v}`} x={sx(0) - 22} y={sy(v) - 7} w={18} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        {/* Axis labels */}
        <FO x={sx(bMax) - 14} y={sy(0) + 2} w={12} hh={14} color={C.muted}><Tex>{"b"}</Tex></FO>
        <FO x={sx(0) + 4} y={sy(cMax) - 2} w={12} hh={14} color={C.muted}><Tex>{"c"}</Tex></FO>
        {/* Curve label */}
        <FO x={sx(-2.8)} y={sy(2.2) - 8} w={92} hh={16} color={C.ok}><span style={{ fontSize: 11 }}><Tex>{"b = -2\\sqrt{c}"}</Tex></span></FO>
        {/* Region label */}
        <FO x={sx(1.6) - 30} y={sy(2.2) - 6} w={80} hh={18} color={C.ok}><span style={{ fontSize: 11, fontWeight: 700 }}>no real roots</span></FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "SUBSTITUTE u = x²", color: C.ps, text: <span>The equation is even in <Tex>{"x"}</Tex> (only <Tex>{"x^2"}</Tex> and <Tex>{"x^4"}</Tex> appear). Write <Tex>{"u = x^2"}</Tex> to get a quadratic in <Tex>{"u"}</Tex>. Real <Tex>{"x"}</Tex> requires <Tex>{"u \\ge 0"}</Tex>; any negative solution of the quadratic gives NO real <Tex>{"x"}</Tex>.</span>, math: (<><div><Tex>{"x^4 + b x^2 + c = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{let } u = x^2 \\ge 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"u^2 + b u + c = 0"}</Tex></div><div style={{ marginTop: 4, color: C.muted }}><Tex>{"\\text{no real } x \\;\\Leftrightarrow\\; \\text{no non-negative } u"}</Tex></div></>) },
    { label: "CASE A: NO REAL u AT ALL", color: C.ok, text: <span>If the discriminant is negative, the quadratic in <Tex>{"u"}</Tex> has no real solutions: so certainly none that are non-negative. Discriminant <Tex>{"b^2 - 4c < 0"}</Tex> gives <Tex>{"b^2 < 4c"}</Tex>. This forces <Tex>{"c > 0"}</Tex> (since <Tex>{"b^2 \\ge 0"}</Tex>), and rearranges to <Tex>{"-2\\sqrt{c} < b < 2\\sqrt{c}"}</Tex>.</span>, math: (<><div><Tex>{"b^2 - 4c < 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow c > 0 \\text{ and } -2\\sqrt{c} < b < 2\\sqrt{c}"}</Tex></div></>) },
    { label: "CASE B: TWO NEGATIVE u-ROOTS", color: C.ok, text: <span>If the quadratic has real roots but both are negative, still no non-negative <Tex>{"u"}</Tex>. By Vieta: sum of roots <Tex>{"= -b"}</Tex>, product <Tex>{"= c"}</Tex>. Both negative needs sum <Tex>{"< 0"}</Tex> (so <Tex>{"b > 0"}</Tex>) AND product <Tex>{"> 0"}</Tex> (so <Tex>{"c > 0"}</Tex>) AND the roots are real (discriminant <Tex>{"\\ge 0"}</Tex>, i.e. <Tex>{"b^2 \\ge 4c"}</Tex>, which with <Tex>{"b > 0"}</Tex> means <Tex>{"b \\ge 2\\sqrt{c}"}</Tex>).</span>, math: (<><div><Tex>{"\\text{sum} = -b < 0 \\;\\Rightarrow\\; b > 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{product} = c > 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"b^2 \\ge 4c \\;\\Rightarrow\\; b \\ge 2\\sqrt{c}"}</Tex></div></>) },
    { label: "MERGE THE TWO CASES", color: C.ok, text: <span>Both cases require <Tex>{"c > 0"}</Tex>. For <Tex>{"b"}</Tex>, Case A covers <Tex>{"-2\\sqrt{c} < b < 2\\sqrt{c}"}</Tex> and Case B covers <Tex>{"b \\ge 2\\sqrt{c}"}</Tex>. Together that's <Tex>{"b > -2\\sqrt{c}"}</Tex>.</span>, math: (<><div><Tex>{"\\text{Case A:}\\; -2\\sqrt{c} < b < 2\\sqrt{c}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Case B:}\\; b \\ge 2\\sqrt{c}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{together:}\\; b > -2\\sqrt{c}"}</Tex></div><div style={{ marginTop: 4, color: C.ok }}><Tex>{"\\color{#55efc4}{\\text{and } c > 0}"}</Tex></div></>), diagram: regionDiagram },
    { label: "CONCLUSION", color: C.ok, text: <span>The quartic has no real roots precisely when <Tex>{"c > 0"}</Tex> and <Tex>{"b > -2\\sqrt{c}"}</Tex>. This matches option D.</span>, math: (<div><Tex>{"\\color{#55efc4}{c > 0 \\text{ and } b > -2\\sqrt{c}}"}</Tex></div>), conclusion: <span>The answer is D: <Tex>{"c > 0"}</Tex> and <Tex>{"b > -2\\sqrt{c}"}</Tex>.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 300px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [b, setB] = useState(1);
  const [cc, setCc] = useState(2);
  const [sawNoReal, setSawNoReal] = useState(false);
  const [sawReal, setSawReal] = useState(false);
  const [sawBoundary, setSawBoundary] = useState(false);

  // Compute roots of the quartic
  // Substitute u = x squared. Solve the resulting quadratic in u.
  const disc = b * b - 4 * cc;
  // Use distinct u-roots only (if disc is ~0, it's a repeated root, count once)
  let uRoots = [];
  if (disc > 1e-9) {
    uRoots = [(-b - Math.sqrt(disc)) / 2, (-b + Math.sqrt(disc)) / 2];
  } else if (disc >= -1e-9) {
    uRoots = [-b / 2]; // repeated root
  }
  // Real x come from non-negative u. Each positive u gives two x-values (±√u); u = 0 gives one.
  const xRoots = [];
  for (const u of uRoots) {
    if (u > 1e-9) { xRoots.push(-Math.sqrt(u), Math.sqrt(u)); }
    else if (Math.abs(u) < 1e-9) { xRoots.push(0); }
  }
  const hasReal = xRoots.length > 0;
  // Condition D check
  const condD = cc > 0 && b > -2 * Math.sqrt(Math.max(cc, 0));

  useEffect(() => {
    if (!hasReal && condD) setSawNoReal(true);
    if (hasReal && !condD) setSawReal(true);
    // Boundary: near b = -2√c with c > 0
    if (cc > 0 && Math.abs(b + 2 * Math.sqrt(cc)) < 0.15) setSawBoundary(true);
  }, [b, cc]);
  const allDemonstrated = sawNoReal && sawReal && sawBoundary;

  // Graph: y = the quartic in x
  const graph = (() => {
    const pW = 380, pH = 260;
    const pad = { l: 30, r: 16, t: 28, b: 24 };
    const xMin = -3, xMax = 3, yMin = -8, yMax = 10;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const f = (x) => x * x * x * x + b * x * x + cc;
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      const x = xMin + (xMax - xMin) * (i / 120);
      const y = f(x);
      if (y >= yMin && y <= yMax) pts.push(`${sx(x)},${sy(y)}`);
      else if (pts.length) pts.push('M');
    }
    const pathD = pts.length ? `M ${pts.join(' L ').replace(/L M L/g, 'M').replace(/L M /g, 'M ')}` : '';
    const gridLines = [];
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) { if (x === 0) continue; gridLines.push(<line key={`gx${x}`} x1={sx(x)} y1={sy(yMax)} x2={sx(x)} y2={sy(yMin)} stroke={C.border} strokeWidth={0.4} />); }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 2) { if (y === 0) continue; gridLines.push(<line key={`gy${y}`} x1={sx(xMin)} y1={sy(y)} x2={sx(xMax)} y2={sy(y)} stroke={C.border} strokeWidth={0.4} />); }
    const sign = (v) => v >= 0 ? "+" : "-";
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs><clipPath id="vgc18"><rect x={pad.l} y={pad.t} width={pW - pad.l - pad.r} height={pH - pad.t - pad.b} /></clipPath></defs>
        <FO x={pad.l} y={2} w={pW - pad.l - pad.r} hh={16} color={C.ps}><span style={{ fontWeight: 700, fontSize: 12 }}><Tex>{`y = x^4 ${sign(b)} ${fmt(Math.abs(b), 2)} x^2 ${sign(cc)} ${fmt(Math.abs(cc), 2)}`}</Tex></span></FO>
        {gridLines}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        {[-2, -1, 1, 2].map(v => <FO key={`tx${v}`} x={sx(v) - 8} y={sy(0) + 2} w={16} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        {[-6, -4, -2, 2, 4, 6, 8].map(v => <FO key={`ty${v}`} x={sx(0) - 20} y={sy(v) - 7} w={16} hh={14} color={C.muted}><Tex>{String(v)}</Tex></FO>)}
        <g clipPath="url(#vgc18)">
          <path d={pathD} fill="none" stroke={C.ps} strokeWidth={2} />
          {xRoots.map((r, i) => <circle key={i} cx={sx(r)} cy={sy(0)} r={5} fill={C.fail} stroke={C.white} strokeWidth={1.5} />)}
        </g>
        <FO x={sx(xMax) - 14} y={sy(0) + 2} w={12} hh={14} color={C.muted}><Tex>{"x"}</Tex></FO>
        <FO x={sx(0) + 4} y={pad.t} w={12} hh={14} color={C.muted}><Tex>{"y"}</Tex></FO>
      </svg>
    );
  })();

  // Presets to exercise each regime
  const presets = [
    { b: 1, cc: 2, label: "b=1, c=2" },   // no real roots (Case A: b²=1, 4c=8, so b²<4c)
    { b: 3, cc: 2, label: "b=3, c=2" },   // no real roots (Case B: both u-roots negative)
    { b: -3, cc: 2, label: "b=-3, c=2" }, // real roots (u=1, u=2)
    { b: 1, cc: -1, label: "b=1, c=-1" }, // c<0, must have real x since product of u-roots is c<0 so one u is positive
    { b: -2 * Math.sqrt(2), cc: 2, label: "b=-2√2, c=2" }, // boundary b = -2√c
  ];

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.psBg, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "6px 12px", marginBottom: 5, textAlign: "center" }}>
        <span style={{ fontSize: 13, color: C.ps, fontWeight: 700 }}>Plotting <Tex>{"y = x^4 + b x^2 + c"}</Tex></span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
            <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"b"}</Tex></span>
            <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`b = ${fmt(b, 2)}`}</Tex></span>
          </div>
          <input type="range" min={-5} max={5} step={0.1} value={b} onChange={e => setB(parseFloat(e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
            <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"c"}</Tex></span>
            <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`c = ${fmt(cc, 2)}`}</Tex></span>
          </div>
          <input type="range" min={-3} max={5} step={0.1} value={cc} onChange={e => setCc(parseFloat(e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
        {presets.map((pr, i) => { const active = Math.abs(b - pr.b) < 0.05 && Math.abs(cc - pr.cc) < 0.05; return (<button key={i} onClick={() => { setB(pr.b); setCc(pr.cc); }} style={{ flex: 1, padding: "5px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 11, cursor: "pointer", fontWeight: active ? 700 : 500 }}><Tex>{pr.label}</Tex></button>); })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}>real roots</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: hasReal ? C.fail : C.ok, marginTop: 2 }}>{xRoots.length}</div>
          </div>
          <div style={{ background: condD ? C.conclBg : C.failBg, border: `1px solid ${(condD ? C.ok : C.fail) + "55"}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: condD ? C.ok : C.fail, fontWeight: 700 }}>condition D</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: condD ? C.ok : C.fail }}>{condD ? "✓" : "✗"}</div>
            <div style={{ fontSize: 11, color: condD ? C.ok : C.fail, marginTop: 2 }}><Tex>{cc > 0 ? `-2\\sqrt{c} \\approx ${fmt(-2 * Math.sqrt(cc), 2)}` : "c \\le 0"}</Tex></div>
          </div>
        </div>
      </div>
      <div style={{ background: C.assumBg, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "10px 14px", marginBottom: 5 }}>
        <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, textAlign: "center" }}>Chain of reasoning</div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", columnGap: 12, rowGap: 6, fontSize: 13, color: C.text, justifyContent: "center", alignItems: "center" }}>
          <div style={{ textAlign: "right", color: C.muted, fontWeight: 700 }}>quartic</div>
          <div style={{ textAlign: "left" }}><Tex>{`x^4 ${b >= 0 ? "+" : "-"} ${fmt(Math.abs(b), 2)} x^2 ${cc >= 0 ? "+" : "-"} ${fmt(Math.abs(cc), 2)} = 0`}</Tex></div>
          <div style={{ textAlign: "left", color: C.muted }}></div>
          <div style={{ textAlign: "right", color: C.muted, fontWeight: 700 }}>let <Tex>{"u = x^2"}</Tex></div>
          <div style={{ textAlign: "left" }}><Tex>{`u^2 ${b >= 0 ? "+" : "-"} ${fmt(Math.abs(b), 2)} u ${cc >= 0 ? "+" : "-"} ${fmt(Math.abs(cc), 2)} = 0`}</Tex></div>
          <div style={{ textAlign: "left", color: C.muted }}></div>
          <div style={{ textAlign: "right", color: C.muted, fontWeight: 700 }}>discriminant</div>
          <div style={{ textAlign: "left" }}><Tex>{`b^2 - 4c = ${fmt(b * b, 2)} - ${fmt(4 * cc, 2)}`}</Tex></div>
          <div style={{ textAlign: "left", color: b * b - 4 * cc < 0 ? C.ok : C.calc, fontWeight: 700 }}><Tex>{`= ${fmt(b * b - 4 * cc, 2)}`}</Tex></div>
          <div style={{ textAlign: "right", color: C.muted, fontWeight: 700 }}><Tex>{"c > 0"}</Tex>?</div>
          <div style={{ textAlign: "left" }}><Tex>{`c = ${fmt(cc, 2)}`}</Tex></div>
          <div style={{ textAlign: "left", color: cc > 0 ? C.ok : C.fail, fontWeight: 700 }}>{cc > 0 ? "✓" : "✗"}</div>
          <div style={{ textAlign: "right", color: C.muted, fontWeight: 700 }}><Tex>{"b > -2\\sqrt{c}"}</Tex>?</div>
          <div style={{ textAlign: "left" }}>{cc > 0 ? <Tex>{`b = ${fmt(b, 2)},\\; -2\\sqrt{c} \\approx ${fmt(-2 * Math.sqrt(cc), 2)}`}</Tex> : <span style={{ color: C.muted }}>(needs c &gt; 0)</span>}</div>
          <div style={{ textAlign: "left", color: cc > 0 && b > -2 * Math.sqrt(cc) ? C.ok : C.fail, fontWeight: 700 }}>{cc > 0 ? (b > -2 * Math.sqrt(cc) ? "✓" : "✗") : "–"}</div>
        </div>
      </div>
      <div style={{ background: (hasReal === !condD) ? C.conclBg : C.failBg, border: `1px solid ${((hasReal === !condD) ? C.ok : C.fail) + "55"}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: (hasReal === !condD) ? C.ok : C.fail, lineHeight: 1.5 }}>
          {condD && !hasReal && <>Condition D holds AND the quartic has no real roots. <span style={{ color: C.ok }}>✓</span></>}
          {!condD && hasReal && <>Condition D fails AND the quartic has real roots (at <Tex>{xRoots.map(r => fmt(r, 2)).join(', ')}</Tex>). <span style={{ color: C.ok }}>✓</span></>}
          {condD && hasReal && <>Condition D holds BUT the quartic has real roots: <Tex>{xRoots.map(r => fmt(r, 2)).join(', ')}</Tex>. Mismatch.</>}
          {!condD && !hasReal && <>Condition D fails BUT the quartic has no real roots. Mismatch.</>}
        </div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
          {(hasReal === !condD) ? 'The equivalence condition D ⇔ no real roots holds for this (b, c).' : 'If you see this, something is off: D is designed to be exactly equivalent to "no real roots".'}
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawNoReal ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawNoReal} />
            <span style={{ fontWeight: sawNoReal ? 700 : 500 }}>Saw condition D satisfied AND no real roots on the graph.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawReal ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawReal} />
            <span style={{ fontWeight: sawReal ? 700 : 500 }}>Saw condition D FAILS AND the graph DOES cross the axis.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawBoundary ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawBoundary} />
            <span style={{ fontWeight: sawBoundary ? 700 : 500 }}>Explored near the boundary <Tex>{"b = -2\\sqrt{c}"}</Tex>.</span>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>Condition D tracks exactly with "no real roots" across all the presets. The boundary where the graph just-touches the axis is <Tex>{"b = -2\\sqrt{c}"}</Tex> (a double root in the <Tex>{"u"}</Tex>-quadratic that lands on <Tex>{"u = 0"}</Tex>).</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is D: <Tex>{"c > 0"}</Tex> and <Tex>{"b > -2\\sqrt{c}"}</Tex>.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Cycle through the presets to exercise each regime.
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
