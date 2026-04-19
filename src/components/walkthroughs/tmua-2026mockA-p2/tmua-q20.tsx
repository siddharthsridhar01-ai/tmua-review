"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 20, set: "A", paperNumber: "Paper 2", topicTag: "Trigonometry / Iteration" };
const fmt = (v, dp = 2) => { const r = Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp); return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", ok: false, tex: "m_1 = m_2 = m_3 = m_4 = 1", expl: "m₁ = 1 is correct (sin x peaks at 1 when x = π/2). But m₂ is NOT 1. To get h₂(x) = sin(sin x) = 1 we would need sin(sin x) = 1, i.e. sin x = π/2 ≈ 1.57. That's impossible because sin x is capped at 1. So m₂ ≤ sin(1) ≈ 0.84, strictly less than 1." },
  { letter: "B", ok: true, tex: "m_1 = 1 \\text{ and } 0 < m_4 < m_3 < m_2 < 1", expl: "m₁ = sin(π/2) = 1. After that, every later function sends x to sin of a number in [-1, 1], and sin is strictly increasing on that interval, so the max of h_{k+1} equals sin(max of h_k). That gives the recursion m_{k+1} = sin(m_k). Numerically: m₂ = sin(1) ≈ 0.84, m₃ = sin(0.84) ≈ 0.75, m₄ = sin(0.75) ≈ 0.68. All in (0, 1) and strictly decreasing, since sin(x) < x for x ∈ (0, π/2)." },
  { letter: "C", ok: false, tex: "m_1 = m_3 = 1 \\text{ and } m_2 = m_4 < 1", expl: "This would require the maximum values to alternate, but the sequence is strictly decreasing. m₃ is the max of sin(h₂(x)) where h₂ has max m₂ ≈ 0.84 and min sin(-1) ≈ -0.84. So m₃ = sin(m₂) ≈ 0.75: nowhere near 1. There's no oscillation; each iteration shrinks the max." },
  { letter: "D", ok: false, tex: "m_1 > m_2 > m_3 > m_4 \\text{ and all equal } 0", expl: "The strict decrease is correct, but no m_k is 0: they approach 0 in the limit as we keep iterating, but after just 4 steps m₄ ≈ 0.68, still comfortably positive. The values are 1, 0.84, 0.75, 0.68." },
  { letter: "E", ok: false, tex: "m_1 > m_2 = m_3 = m_4", expl: "Only the first inequality is right. The sequence keeps decreasing: m_{k+1} = sin(m_k) < m_k because sin(x) < x for every x ∈ (0, π/2). So m₃ < m₂ strictly, and m₄ < m₃ strictly. The values don't plateau after the first drop." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

const ITEMS_Q20 = null;
const OPTIONS_Q20 = [
  ["A", "m_1 = m_2 = m_3 = m_4 = 1"],
  ["B", "m_1 = 1 \\text{ and } 0 < m_4 < m_3 < m_2 < 1"],
  ["C", "m_1 = m_3 = 1 \\text{ and } m_2 = m_4 < 1"],
  ["D", "m_1 > m_2 > m_3 > m_4 \\text{ and all equal } 0"],
  ["E", "m_1 > m_2 = m_3 = m_4"],
];
const SECTIONS_Q20 = [
  { type: 'prose', text: (<>A sequence of functions is defined by</>) },
  { type: "mathbox", tex: "h_1(x) = \\sin x" },
  { type: 'prose', text: (<>and</>) },
  { type: "mathbox", tex: "h_{n+1}(x) = \\sin(h_n(x)) \\text{ for } n \\ge 1." },
  { type: 'prose', text: (<>These functions have maximum values <Tex>{"m_1, m_2, m_3"}</Tex> and <Tex>{"m_4"}</Tex> respectively.</>) },
  { type: 'prose-tight', text: (<>Which one of the following statements is true?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q20;
  const options = OPTIONS_Q20;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q20</span>
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
  const sections = SECTIONS_Q20;
  const options = OPTIONS_Q20;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 20</span>
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

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>Each function is built by applying sine to the one before. The maxima are linked by a simple recursion, as long as the input range of each "outer" sine is narrow enough.</p><p style={{ margin: 0 }}>After step 1, every function has values in <Tex>{"[-1, 1]"}</Tex>, because that's the range of sine. And on <Tex>{"[-1, 1]"}</Tex>, sine is strictly increasing (since <Tex>{"1 < \\pi/2"}</Tex>). So the maximum of <Tex>{"\\sin(h_n(x))"}</Tex> is achieved exactly where <Tex>{"h_n"}</Tex> is maximised, giving <Tex>{"m_{n+1} = \\sin(m_n)"}</Tex>.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>Two facts about sine to chain together:</p><p style={{ margin: "0 0 4px" }}><b>Fact 1:</b> <Tex>{"\\sin x"}</Tex> is strictly increasing on <Tex>{"[-1, 1]"}</Tex> (because <Tex>{"[-1, 1] \\subset (-\\pi/2, \\pi/2)"}</Tex>, where sine is increasing).</p><p style={{ margin: 0 }}><b>Fact 2:</b> For <Tex>{"0 < x < \\pi/2"}</Tex>, <Tex>{"\\sin x < x"}</Tex>. So iterating <Tex>{"m \\mapsto \\sin m"}</Tex> starting from a positive value produces a strictly DECREASING sequence that stays positive.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  // Cobweb-style iteration diagram: y = x and y = sin x, stepping from m_1 = 1 down through m_2, m_3, m_4
  const cobweb = (() => {
    const pW = 300, pH = 260;
    const pad = { l: 26, r: 14, t: 16, b: 22 };
    const xMin = 0, xMax = 1.1, yMin = 0, yMax = 1.1;
    const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * (pW - pad.l - pad.r);
    const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * (pH - pad.t - pad.b);
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    // y = x line
    const lineY = [[xMin, xMin], [xMax, xMax]];
    // y = sin x curve
    const sinPts = [];
    for (let i = 0; i <= 60; i++) {
      const x = xMin + (xMax - xMin) * (i / 60);
      sinPts.push(`${sx(x)},${sy(Math.sin(x))}`);
    }
    const sinD = 'M ' + sinPts.join(' L ');
    // Iteration steps: m1 = 1, m2 = sin(1), m3 = sin(m2), m4 = sin(m3)
    const ms = [1];
    for (let k = 1; k < 4; k++) ms.push(Math.sin(ms[k - 1]));
    // Cobweb lines: from (m_k, 0) vertically up to (m_k, sin(m_k)) = (m_k, m_{k+1}), then horizontally to (m_{k+1}, m_{k+1}), then vertically down to (m_{k+1}, 0)
    const segments = [];
    for (let k = 0; k < 3; k++) {
      const a = ms[k], b = ms[k + 1];
      // Up from (a, 0) to (a, b)
      segments.push({ x1: sx(a), y1: sy(0), x2: sx(a), y2: sy(b) });
      // Across from (a, b) to (b, b)
      segments.push({ x1: sx(a), y1: sy(b), x2: sx(b), y2: sy(b) });
      // Down from (b, b) to (b, 0)
      segments.push({ x1: sx(b), y1: sy(b), x2: sx(b), y2: sy(0) });
    }
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={4} y={0} w={pW - 8} hh={14} color={C.ok}><span style={{ fontWeight: 700, fontSize: 11 }}>Iterating <Tex>{"m \\mapsto \\sin m"}</Tex> from <Tex>{"m_1 = 1"}</Tex></span></FO>
        {/* Axes */}
        <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        {/* Tick labels */}
        <FO x={sx(1) - 6} y={sy(0) + 2} w={12} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        <FO x={sx(0) - 14} y={sy(1) - 7} w={12} hh={14} color={C.muted}><Tex>{"1"}</Tex></FO>
        {/* y = x */}
        <line x1={sx(lineY[0][0])} y1={sy(lineY[0][1])} x2={sx(lineY[1][0])} y2={sy(lineY[1][1])} stroke={C.muted} strokeWidth={1.2} strokeDasharray="3,2" />
        {/* y = sin x */}
        <path d={sinD} fill="none" stroke={C.ps} strokeWidth={2} />
        {/* Cobweb segments */}
        {segments.map((s, i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={C.calc} strokeWidth={1.2} strokeDasharray="4,2" />)}
        {/* m_k dots on the x-axis */}
        {ms.map((m, i) => (
          <g key={`m${i}`}>
            <circle cx={sx(m)} cy={sy(0)} r={4} fill={C.ok} stroke={C.white} strokeWidth={1.2} />
            <FO x={sx(m) - 16} y={sy(0) + 14} w={32} hh={14} color={C.ok}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{`m_${i + 1}`}</Tex></span></FO>
          </g>
        ))}
        {/* m_4 */}
        <g>
          <circle cx={sx(Math.sin(ms[2]))} cy={sy(0)} r={4} fill={C.ok} stroke={C.white} strokeWidth={1.2} />
          <FO x={sx(Math.sin(ms[2])) - 16} y={sy(0) + 14} w={32} hh={14} color={C.ok}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{"m_4"}</Tex></span></FO>
        </g>
        {/* Curve labels */}
        <FO x={sx(0.65)} y={sy(0.9) - 8} w={70} hh={14} color={C.ps}><span style={{ fontSize: 11 }}><Tex>{"y = \\sin x"}</Tex></span></FO>
        <FO x={sx(0.9)} y={sy(0.75)} w={50} hh={14} color={C.muted}><span style={{ fontSize: 11 }}><Tex>{"y = x"}</Tex></span></FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "FIND m₁", color: C.ps, text: <span><Tex>{"h_1(x) = \\sin x"}</Tex> has maximum value <Tex>{"1"}</Tex>, achieved whenever <Tex>{"x = \\pi/2 + 2k\\pi"}</Tex>. So <Tex>{"m_1 = 1"}</Tex>.</span>, math: (<><div><Tex>{"h_1(x) = \\sin x"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"m_1 = \\max \\sin x = 1"}</Tex></div></>) },
    { label: "SET UP THE RECURSION", color: C.ok, text: <span>For <Tex>{"n \\ge 1"}</Tex>, <Tex>{"h_n(x)"}</Tex> takes values in <Tex>{"[-1, 1]"}</Tex> (it's a sine once <Tex>{"n \\ge 2"}</Tex>, and for <Tex>{"n = 1"}</Tex> the same holds). Since sine is strictly increasing on <Tex>{"[-1, 1]"}</Tex> (as <Tex>{"1 < \\pi/2"}</Tex>), the maximum of <Tex>{"\\sin(h_n(x))"}</Tex> is reached exactly where <Tex>{"h_n"}</Tex> reaches its own maximum, giving <Tex>{"m_{n+1} = \\sin(m_n)"}</Tex>.</span>, math: (<><div><Tex>{"h_n(x) \\in [-1, 1] \\subset (-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2})"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\sin \\text{ strictly increasing on } [-1, 1]"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\Rightarrow m_{n+1} = \\sin(m_n)"}</Tex></div></>) },
    { label: "COMPUTE m₂, m₃, m₄", color: C.ok, text: <span>Apply the recursion starting at <Tex>{"m_1 = 1"}</Tex>. The values strictly decrease because <Tex>{"\\sin x < x"}</Tex> for all <Tex>{"x \\in (0, \\pi/2)"}</Tex>, and they stay positive because <Tex>{"\\sin x > 0"}</Tex> on that interval.</span>, math: (<><div><Tex>{`m_2 = \\sin(1) \\approx ${fmt(Math.sin(1), 2)}`}</Tex></div><div style={{ marginTop: 4 }}><Tex>{`m_3 = \\sin(m_2) \\approx ${fmt(Math.sin(Math.sin(1)), 2)}`}</Tex></div><div style={{ marginTop: 4 }}><Tex>{`m_4 = \\sin(m_3) \\approx ${fmt(Math.sin(Math.sin(Math.sin(1))), 2)}`}</Tex></div></>), diagram: cobweb },
    { label: "CONCLUSION", color: C.ok, text: <span>So <Tex>{"m_1 = 1"}</Tex>, and the remaining three values are strictly decreasing, all in <Tex>{"(0, 1)"}</Tex>. That matches option B.</span>, math: (<div><Tex>{"\\color{#55efc4}{m_1 = 1 \\text{ and } 0 < m_4 < m_3 < m_2 < 1}"}</Tex></div>), conclusion: <span>The answer is B: <Tex>{"m_1 = 1"}</Tex> and <Tex>{"0 < m_4 < m_3 < m_2 < 1"}</Tex>.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 300px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Slider for n from 1 to 10, show the current m_n value and the sequence
  const [n, setN] = useState(4);
  // Compute the iterated sequence
  const seq = [1];
  for (let k = 1; k < 10; k++) seq.push(Math.sin(seq[k - 1]));

  const [sawAllFour, setSawAllFour] = useState(false);
  const [sawDecreasing, setSawDecreasing] = useState(false);
  const [sawLimit, setSawLimit] = useState(false);
  useEffect(() => {
    if (n >= 4) setSawAllFour(true);
    if (n >= 3) setSawDecreasing(true);
    if (n >= 8) setSawLimit(true);
  }, [n]);
  const allDemonstrated = sawAllFour && sawDecreasing && sawLimit;

  // Plot: y = sin^n(x) for current n. But actually, we want to show how m_n varies with n.
  // Two panels: (1) bar chart of m_1, ..., m_n. (2) plot of h_n(x) over one period showing max value.
  const barChart = (() => {
    const pW = 380, pH = 210;
    const pad = { l: 32, r: 12, t: 28, b: 28 };
    const FO = ({ x, y, w, hh, color, children }) => (
      <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
        <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
      </foreignObject>
    );
    const barW = (pW - pad.l - pad.r) / n;
    const barGap = Math.min(8, barW * 0.15);
    const yMax = 1.05;
    const sy = (v) => pad.t + ((yMax - v) / yMax) * (pH - pad.t - pad.b);
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={4} y={4} w={pW - 8} hh={16} color={C.ok}><span style={{ fontWeight: 700, fontSize: 12 }}>Maxima <Tex>{"m_1, m_2, \\ldots, m_n"}</Tex></span></FO>
        {/* Axes */}
        <line x1={pad.l} y1={sy(0)} x2={pW - pad.r} y2={sy(0)} stroke={C.muted} strokeWidth={1} />
        <line x1={pad.l} y1={sy(0)} x2={pad.l} y2={sy(yMax)} stroke={C.muted} strokeWidth={1} />
        {/* y-axis ticks */}
        {[0.25, 0.5, 0.75, 1].map(v => (
          <g key={`ty${v}`}>
            <line x1={pad.l} y1={sy(v)} x2={pad.l + 4} y2={sy(v)} stroke={C.muted} strokeWidth={1} />
            <FO x={4} y={sy(v) - 7} w={24} hh={14} color={C.muted}><Tex>{fmt(v, 2)}</Tex></FO>
          </g>
        ))}
        {/* Bars */}
        {seq.slice(0, n).map((v, i) => {
          const x = pad.l + i * barW + barGap / 2;
          const w = barW - barGap;
          const col = i === 0 ? C.ok : C.calc;
          return (
            <g key={i}>
              <rect x={x} y={sy(v)} width={w} height={sy(0) - sy(v)} fill={col + "40"} stroke={col} strokeWidth={1.3} rx={3} />
              <FO x={x - 4} y={sy(v) - 14} w={w + 8} hh={14} color={col}><span style={{ fontSize: 11, fontWeight: 700 }}><Tex>{fmt(v, 2)}</Tex></span></FO>
              <FO x={x - 4} y={sy(0) + 4} w={w + 8} hh={14} color={C.muted}><span style={{ fontSize: 11 }}><Tex>{`m_{${i + 1}}`}</Tex></span></FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.psBg, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "6px 12px", marginBottom: 5, textAlign: "center" }}>
        <span style={{ fontSize: 13, color: C.ps, fontWeight: 700 }}>Recursion: <Tex>{"m_1 = 1"}</Tex> and <Tex>{"m_{n+1} = \\sin(m_n)"}</Tex></span>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", marginBottom: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}>Show maxima up to</span>
          <span style={{ fontSize: 14, color: C.calc, fontWeight: 700 }}><Tex>{`n = ${n}`}</Tex></span>
        </div>
        <input type="range" min={1} max={10} step={1} value={n} onChange={e => setN(parseInt(e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 4 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>{barChart}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}>current <Tex>{`m_{${n}}`}</Tex></div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{fmt(seq[n - 1], 2)}</Tex></div>
          </div>
          <div style={{ background: n >= 2 && seq[n - 1] < seq[n - 2] ? C.conclBg : C.card, border: `1px solid ${(n >= 2 && seq[n - 1] < seq[n - 2] ? C.ok : C.border) + "55"}`, borderRadius: 8, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: n >= 2 && seq[n - 1] < seq[n - 2] ? C.ok : C.muted, fontWeight: 700 }}>decreasing?</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: n >= 2 && seq[n - 1] < seq[n - 2] ? C.ok : C.muted }}>{n >= 2 ? (seq[n - 1] < seq[n - 2] ? "YES" : "NO") : "–"}</div>
          </div>
        </div>
      </div>
      <div style={{ background: C.assumBg, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "10px 14px", marginBottom: 5 }}>
        <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, textAlign: "center" }}>Chain of calculations</div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", columnGap: 12, rowGap: 6, fontSize: 14, color: C.text, justifyContent: "center", alignItems: "center" }}>
          {seq.slice(0, n).map((v, i) => (
            <Fragment key={i}>
              <div style={{ textAlign: "right", color: C.assum, fontWeight: 700 }}><Tex>{`m_{${i + 1}}`}</Tex></div>
              <div style={{ textAlign: "left" }}>
                {i === 0 ? (
                  <Tex>{"= \\max \\sin x = 1"}</Tex>
                ) : (
                  <Tex>{`= \\sin(m_{${i}}) = \\sin(${fmt(seq[i - 1], 2)})`}</Tex>
                )}
              </div>
              <div style={{ textAlign: "left", color: C.ok, fontWeight: 700 }}>
                {i === 0 ? <Tex>{"= 1"}</Tex> : <Tex>{`\\approx ${fmt(v, 2)}`}</Tex>}
              </div>
            </Fragment>
          ))}
        </div>
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.assum}33`, fontSize: 12, color: C.muted, textAlign: "center", lineHeight: 1.5 }}>
          Each step applies <Tex>{"\\sin"}</Tex> to the previous value. Since <Tex>{"0 < \\sin x < x"}</Tex> for <Tex>{"x \\in (0, \\pi/2)"}</Tex>, the sequence strictly decreases yet stays positive.
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawAllFour ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawAllFour} />
            <span style={{ fontWeight: sawAllFour ? 700 : 500 }}>Viewed all four maxima <Tex>{"m_1, m_2, m_3, m_4"}</Tex>.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawDecreasing ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawDecreasing} />
            <span style={{ fontWeight: sawDecreasing ? 700 : 500 }}>Confirmed the sequence is strictly decreasing.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawLimit ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawLimit} />
            <span style={{ fontWeight: sawLimit ? 700 : 500 }}>Extended past <Tex>{"n = 8"}</Tex> to confirm the values stay positive.</span>
          </div>
        </div>
        {allDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>The recursion <Tex>{"m_{n+1} = \\sin(m_n)"}</Tex> drives the sequence down from <Tex>{"1"}</Tex> toward <Tex>{"0"}</Tex>, never reaching it. The first four values <Tex>{`1, ${fmt(seq[1], 2)}, ${fmt(seq[2], 2)}, ${fmt(seq[3], 2)}`}</Tex> fit the pattern <Tex>{"m_1 = 1"}</Tex> and <Tex>{"0 < m_4 < m_3 < m_2 < 1"}</Tex>.</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is B.</div>
          </div>
        ) : (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted, textAlign: "center" }}>
            Slide up to <Tex>{"n = 10"}</Tex> to see the whole trajectory.
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
