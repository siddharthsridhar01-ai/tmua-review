"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 15, paper: "Set A Paper 2", year: "2026 Mock", topicTag: "Number / Geometric Series" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "\\tfrac{1}{3}", expl: "1/3 in base 2 is 0.010101... (the pattern is shifted by one place). The recurring binary 0.10101... starts with a 1 in the half position, which already gives 0.5, so the answer must be larger than 1/3." },
  { letter: "B", ok: false, tex: "\\tfrac{2}{5}", expl: "0.4 has no clean base-2 representation involving a simple repeating 10. The true value is 2/3 ≈ 0.667, not 0.4. A quick sanity check: 0.1_2 alone is already 0.5, and this number is larger than 0.1_2, so it has to exceed 0.5." },
  { letter: "C", ok: false, tex: "\\tfrac{1}{2}", expl: "1/2 in base 2 is just 0.1_2 (terminating). Our number has further non-zero digits (the 1 in position 3, in position 5, etc.), so it must be strictly greater than 1/2." },
  { letter: "D", ok: true, tex: "\\tfrac{2}{3}", expl: "Let x = 0.101010..._2. Shifting two places left multiplies by 4: 4x = 10.101010..._2 = 2 + x. So 3x = 2, giving x = 2/3. Equivalently, the series 1/2 + 1/8 + 1/32 + ... is geometric with first term 1/2 and ratio 1/4, summing to (1/2)/(1 - 1/4) = 2/3." },
  { letter: "E", ok: false, tex: "\\tfrac{3}{4}", expl: "0.75 in base 2 is 0.11_2 (terminating). Our number starts 0.101..._2, so its second digit is 0, not 1, meaning it's less than 0.11_2 = 3/4." },
  { letter: "F", ok: false, tex: "\\tfrac{4}{5}", expl: "0.8 is larger than our number. Our number lies between 0.5 and 0.75: its binary expansion starts 0.10..._2 which gives at least 0.5, and a bound from above: 0.11_2 = 0.75 would require the second binary digit to be 1, but it's 0." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }


const ITEMS_Q15 = null;
const OPTIONS_Q15 = [
  ["A", "\\tfrac{1}{3}"],
  ["B", "\\tfrac{2}{5}"],
  ["C", "\\tfrac{1}{2}"],
  ["D", "\\tfrac{2}{3}"],
  ["E", "\\tfrac{3}{4}"],
  ["F", "\\tfrac{4}{5}"]
];
const SECTIONS_Q15 = [
  { type: 'prose', text: (<>The base-2 number <Tex>{"0.101010\\ldots"}</Tex> has the digits <Tex>{"10"}</Tex> repeating indefinitely:</>) },
  { type: "mathbox", tex: "0.101010\\ldots_{\\,2}" },
  { type: 'prose-tight', text: (<>What is the value of this recurring base-2 number (as a fraction)?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q15;
  const options = OPTIONS_Q15;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q15</span>
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
  const sections = SECTIONS_Q15;
  const options = OPTIONS_Q15;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4) : maxLen <= 20 ? 3 : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 15</span>
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
        {options.map(([l, v]) => (<div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text, flex: "0 0 140px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, marginBottom: 3, letterSpacing: 0.5 }}>{l}</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.4 }}><Tex>{v}</Tex></div>
          </div>))}
      </div>
    </div>
  );
}

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>Each digit after the binary point contributes a power of <Tex>{"\\tfrac{1}{2}"}</Tex>. The 1s sit at positions 1, 3, 5, 7, : : so the value is</p><p style={{ margin: "0 0 4px", textAlign: "center" }}><Tex>{"\\tfrac{1}{2} + \\tfrac{1}{8} + \\tfrac{1}{32} + \\tfrac{1}{128} + \\cdots"}</Tex></p><p style={{ margin: 0 }}>This is a geometric series with first term <Tex>{"\\tfrac{1}{2}"}</Tex> and common ratio <Tex>{"\\tfrac{1}{4}"}</Tex> (because each 1-digit is four times smaller than the previous one). Sum with <Tex>{"S = a/(1-r)"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Alternative: the "shift and subtract" trick that works for any recurring expansion. Let <Tex>{"x = 0.101010\\ldots_2"}</Tex>. The recurring block has length 2, so multiply by <Tex>{"2^2 = 4"}</Tex> to shift the binary point two places to the right:</p><p style={{ margin: "0 0 4px", textAlign: "center" }}><Tex>{"4x = 10.101010\\ldots_2 = 2 + x"}</Tex></p><p style={{ margin: 0 }}>Subtracting, <Tex>{"3x = 2"}</Tex>, so <Tex>{"x = \\tfrac{2}{3}"}</Tex>. This is the binary analogue of the base-10 trick for <Tex>{"0.\\overline{3} = \\tfrac{1}{3}"}</Tex>.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Diagram: number line showing the partial sums converging up to 2/3
  const partialsDiagram = (() => {
    const pW = 280, pH = 180;
    const pad = { l: 24, r: 12, t: 40, b: 24 };
    const xMin = 0, xMax = 1;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    // Partial sums
    const partials = [0.5, 0.625, 0.65625, 0.6640625];
    const labels = ["S_1=\\tfrac{1}{2}", "S_2=\\tfrac{5}{8}", "S_3=\\tfrac{21}{32}", "S_4"];
    const target = 2 / 3;
    const y0 = 90;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={4} w={pW - 20} hh={14} color={C.muted}><span style={{ fontWeight: 700, fontSize: 11 }}>Partial sums converging up to <Tex>{"\\tfrac{2}{3}"}</Tex></span></FO>
        {/* Number line */}
        <line x1={sx(xMin)} y1={y0} x2={sx(xMax)} y2={y0} stroke={C.muted} strokeWidth={1} />
        {/* Tick marks at 0, 1/2, 2/3, 1 */}
        {[0, 0.5, target, 1].map((v, i) => (
          <line key={i} x1={sx(v)} y1={y0 - 4} x2={sx(v)} y2={y0 + 4} stroke={C.muted} strokeWidth={1} />
        ))}
        <FO x={sx(0) - 6} y={y0 + 6} w={14} hh={14} color={C.muted}><Tex>{"0"}</Tex></FO>
        <FO x={sx(1) - 6} y={y0 + 6} w={14} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO x={sx(0.5) - 10} y={y0 + 6} w={20} hh={14} color={C.muted}><Tex>{"\\tfrac{1}{2}"}</Tex></FO>
        {/* Target marker at 2/3 */}
        <line x1={sx(target)} y1={y0 - 20} x2={sx(target)} y2={y0 + 20} stroke={C.ok} strokeWidth={2} strokeDasharray="3,2" />
        <FO x={sx(target) - 16} y={y0 + 22} w={32} hh={14} color={C.ok}><Tex>{"\\tfrac{2}{3}"}</Tex></FO>
        {/* Partial sum markers */}
        {partials.map((v, i) => (
          <g key={i}>
            <circle cx={sx(v)} cy={y0} r={4} fill={C.calc} stroke={C.white} strokeWidth={1} />
            <FO x={sx(v) - 14} y={y0 - 22 - (i % 2) * 14} w={28} hh={14} color={C.calc}><span style={{ fontSize: 11 }}><Tex>{`S_${i + 1}`}</Tex></span></FO>
          </g>
        ))}
      </svg>
    );
  })();

  const solveSteps = [
    { label: "WRITE OUT THE INFINITE SUM", color: C.ps, text: <span>Each digit after the binary point contributes a power of <Tex>{"\\tfrac{1}{2}"}</Tex>. The 1s sit at positions 1, 3, 5, 7, : : (odd positions only), so the number equals the infinite sum of these powers.</span>, math: (<><div><Tex>{"0.101010\\ldots_2 = \\tfrac{1}{2} + \\tfrac{1}{8} + \\tfrac{1}{32} + \\cdots"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\sum_{k=0}^{\\infty} \\tfrac{1}{2} \\cdot \\left(\\tfrac{1}{4}\\right)^k"}</Tex></div></>) },
    { label: "SUM THE GEOMETRIC SERIES", color: C.ok, text: <span>This is a geometric series with first term <Tex>{"a = \\tfrac{1}{2}"}</Tex> and common ratio <Tex>{"r = \\tfrac{1}{4}"}</Tex>. Since <Tex>{"|r| < 1"}</Tex>, it converges to <Tex>{"a/(1-r)"}</Tex>.</span>, math: (<><div><Tex>{"S = \\dfrac{a}{1 - r} = \\dfrac{1/2}{1 - 1/4}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\dfrac{1/2}{3/4} = \\tfrac{1}{2} \\cdot \\tfrac{4}{3} = \\tfrac{2}{3}"}</Tex></div></>), diagram: partialsDiagram },
    { label: "CHECK: SHIFT-AND-SUBTRACT", color: C.ps, text: <span>A quick sanity check uses the "multiply to shift" trick. Let <Tex>{"x = 0.101010\\ldots_2"}</Tex>. Multiplying by <Tex>{"2^2 = 4"}</Tex> shifts the binary point two places right, landing on the same recurring pattern. Subtracting <Tex>{"x"}</Tex> leaves a clean integer equation.</span>, math: (<><div><Tex>{"x = 0.101010\\ldots_2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"4x = 10.101010\\ldots_2 = 2 + x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"3x = 2 \\;\\Rightarrow\\; x = \\tfrac{2}{3}"}</Tex></div></>) },
    { label: "CONCLUSION", color: C.ok, text: <span>Both methods give the same value: <Tex>{"\\tfrac{2}{3}"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{0.101010\\ldots_2 = \\tfrac{2}{3}}"}</Tex></div>), conclusion: <span>The answer is D: <Tex>{"\\tfrac{2}{3}"}</Tex>.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 280px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  const [nTerms, setNTerms] = useState(1);
  const [sawBelow, setSawBelow] = useState(false);       // saw a small partial sum (below 2/3 by noticeable amount)
  const [sawNearTarget, setSawNearTarget] = useState(false);  // saw partial sum very close to 2/3
  const [agreed, setAgreed] = useState(false);          // clicked "agree 2/3"

  // Partial sum of first n terms: S_n = sum_{k=0..n-1} (1/2)(1/4)^k = (1/2) * (1 - (1/4)^n) / (1 - 1/4) = (2/3)(1 - (1/4)^n)
  const S = (n) => (2 / 3) * (1 - Math.pow(0.25, n));
  const current = S(nTerms);
  const gap = 2 / 3 - current;

  useEffect(() => {
    if (current < 0.6) setSawBelow(true);
    if (gap < 0.005 && nTerms >= 4) setSawNearTarget(true);
  }, [nTerms]);
  const allDemonstrated = sawBelow && sawNearTarget && agreed;

  // Number line showing current partial sum approaching 2/3
  const graph = (() => {
    const pW = 380, pH = 220;
    const pad = { l: 28, r: 28, t: 30, b: 60 };
    const xMin = 0.45, xMax = 0.72;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const target = 2 / 3;
    const y0 = 100;
    // Partial sums up to nTerms
    const allPartials = [];
    for (let i = 1; i <= Math.max(nTerms, 1); i++) allPartials.push({ n: i, v: S(i) });
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={6} w={pW - 20} hh={16} color={C.muted}><span style={{ fontWeight: 700, fontSize: 12 }}>Partial sum <Tex>{`S_{${nTerms}}`}</Tex> on the number line</span></FO>
        {/* Number line */}
        <line x1={sx(xMin)} y1={y0} x2={sx(xMax)} y2={y0} stroke={C.muted} strokeWidth={1.2} />
        {/* Major ticks at 0.5 and 2/3 */}
        <line x1={sx(0.5)} y1={y0 - 6} x2={sx(0.5)} y2={y0 + 6} stroke={C.muted} strokeWidth={1.2} />
        <FO x={sx(0.5) - 12} y={y0 + 10} w={24} hh={14} color={C.muted}><Tex>{"\\tfrac{1}{2}"}</Tex></FO>
        <line x1={sx(target)} y1={y0 - 20} x2={sx(target)} y2={y0 + 20} stroke={C.ok} strokeWidth={2} strokeDasharray="3,2" />
        <FO x={sx(target) - 16} y={y0 + 24} w={32} hh={14} color={C.ok}><Tex>{"\\tfrac{2}{3}"}</Tex></FO>
        {/* Historical partials as small dots */}
        {allPartials.slice(0, -1).map((p, i) => (
          <circle key={i} cx={sx(p.v)} cy={y0} r={3} fill={C.calc} opacity={0.35} />
        ))}
        {/* Current partial as big marker */}
        <circle cx={sx(current)} cy={y0} r={6} fill={C.calc} stroke={C.white} strokeWidth={1.5} />
        <FO x={sx(current) - 30} y={y0 - 24} w={60} hh={14} color={C.calc}><span style={{ fontWeight: 700, fontSize: 11 }}><Tex>{`S_{${nTerms}}`}</Tex></span></FO>
        {/* Gap indicator */}
        {gap > 0.001 && (
          <>
            <line x1={sx(current)} y1={y0 + 40} x2={sx(target)} y2={y0 + 40} stroke={C.fail} strokeWidth={1.2} />
            <line x1={sx(current)} y1={y0 + 36} x2={sx(current)} y2={y0 + 44} stroke={C.fail} strokeWidth={1.2} />
            <line x1={sx(target)} y1={y0 + 36} x2={sx(target)} y2={y0 + 44} stroke={C.fail} strokeWidth={1.2} />
            <FO x={(sx(current) + sx(target)) / 2 - 30} y={y0 + 44} w={60} hh={14} color={C.fail}><span style={{ fontSize: 11 }}>gap <Tex>{`= ${fmt(gap, 2)}`}</Tex></span></FO>
          </>
        )}
      </svg>
    );
  })();

  // Fractional representation of S_n. S_n = (2 * (4^n - 1)) / (3 * 4^n). Simplify display.
  const fracLabel = (n) => {
    const num = 2 * (Math.pow(4, n) - 1);
    const den = 3 * Math.pow(4, n);
    // Avoid GCD clutter: the numerator 2(4^n - 1) and denominator 3 · 4^n share no common factor of 2
    // (since 4^n - 1 is odd) and no factor of 3 (since 4^n mod 3 = 1 so 4^n - 1 is divisible by 3 but the 2 in the numerator
    // is coprime to 3). Simplify: 4^n - 1 = 3 * k_n where k_n = (4^n - 1)/3; so S_n = 2 * k_n / 4^n.
    const kN = (Math.pow(4, n) - 1) / 3;
    const finalNum = 2 * kN;
    const finalDen = Math.pow(4, n);
    // Reduce by 2 if possible
    const g = (a, b) => b === 0 ? a : g(b, a % b);
    const d = g(finalNum, finalDen);
    return `\\dfrac{${finalNum / d}}{${finalDen / d}}`;
  };

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}>Number of terms</span>
          <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`n = ${nTerms}`}</Tex></span>
        </div>
        <input type="range" min={1} max={10} step={1} value={nTerms} onChange={e => setNTerms(parseInt(e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {[1, 2, 3, 5, 10].map((n, i) => { const active = nTerms === n; return (<button key={i} onClick={() => setNTerms(n)} style={{ flex: 1, padding: "5px 4px", borderRadius: 6, border: `1px solid ${active ? C.calc : C.border}`, background: active ? C.calc + "15" : C.card, color: active ? C.calc : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 500 }}><Tex>{`n = ${n}`}</Tex></button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{graph}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}>partial sum</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.calc, marginTop: 2 }}><Tex>{`S_{${nTerms}} = ${fracLabel(nTerms)}`}</Tex></div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}><Tex>{`\\approx ${fmt(current, 2)}`}</Tex></div>
          </div>
          <div style={{ background: gap < 0.005 ? C.conclBg : C.card, border: `1px solid ${(gap < 0.005 ? C.ok : C.border)}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: gap < 0.005 ? C.ok : C.muted, fontWeight: 700 }}>gap to <Tex>{"\\tfrac{2}{3}"}</Tex></div>
            <div style={{ fontSize: 20, fontWeight: 700, color: gap < 0.005 ? C.ok : C.calc }}><Tex>{fmt(gap, 2)}</Tex></div>
          </div>
        </div>
      </div>
      <div style={{ background: C.assumBg, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>Every partial sum <Tex>{`S_n = \\tfrac{2}{3}(1 - (1/4)^n)`}</Tex> is strictly less than <Tex>{"\\tfrac{2}{3}"}</Tex>. The gap <Tex>{"(1/4)^n \\cdot \\tfrac{2}{3}"}</Tex> shrinks by a factor of 4 each term.</div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawBelow ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawBelow} />
            <span style={{ fontWeight: sawBelow ? 700 : 500 }}>Saw a small <Tex>{"n"}</Tex> where <Tex>{"S_n < 0.6"}</Tex>. <span style={{ color: C.muted, fontWeight: 500 }}>(Far below target.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawNearTarget ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawNearTarget} />
            <span style={{ fontWeight: sawNearTarget ? 700 : 500 }}>Saw a large <Tex>{"n"}</Tex> where <Tex>{"S_n"}</Tex> hits within 0.01 of <Tex>{"\\tfrac{2}{3}"}</Tex>.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: agreed ? C.accentLight : C.muted }}>
            <ProgressCheck done={agreed} />
            <button onClick={() => setAgreed(true)} disabled={agreed} style={{ flex: 1, padding: "4px 8px", borderRadius: 6, border: `1px solid ${agreed ? C.accentLight : C.border}`, background: agreed ? C.accentLight + "15" : C.card, color: agreed ? C.accentLight : C.text, fontSize: 12, cursor: agreed ? "default" : "pointer", fontWeight: agreed ? 700 : 500, textAlign: "left" }}>
              {agreed ? "Agreed: the limit is " : "Click to confirm the limit is "}<Tex>{"\\tfrac{2}{3}"}</Tex>.
            </button>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>Each partial sum <Tex>{"S_n"}</Tex> is less than <Tex>{"\\tfrac{2}{3}"}</Tex> by exactly <Tex>{"\\tfrac{2}{3}(1/4)^n"}</Tex>, and that gap shrinks to zero as <Tex>{"n"}</Tex> grows. The infinite sum is therefore exactly <Tex>{"\\tfrac{2}{3}"}</Tex>, matching the shift-and-subtract result <Tex>{"4x - x = 2"}</Tex>.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is D: <Tex>{"\\tfrac{2}{3}"}</Tex>.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Try small <Tex>{"n"}</Tex>, then larger <Tex>{"n"}</Tex>, then confirm the limit.
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
