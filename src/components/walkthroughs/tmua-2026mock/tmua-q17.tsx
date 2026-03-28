"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 17, paper: "Paper 1", year: "2026 Mock", topicTag: "Nested Squares / Summation" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const opts = [
  { letter: "A", tex: "2500", text: "2500", ok: false, expl: "You might get 2500 by computing 50\u00B2 = 2500, confusing the total with the area of S\u2085\u2080 divided by 4, or by summing incorrectly." },
  { letter: "B", tex: "3400", text: "3400", ok: false, expl: "You might get 3400 by computing the area of S\u2085\u2080 \u2212 S\u2084\u2089 = 4(2500 \u2212 2401) = 396, then multiplying 396 by some wrong factor." },
  { letter: "C", tex: "4800", text: "4800", ok: false, expl: "You might get 4800 by summing 16k for k = 1 to 25 without subtracting the constant: 16(325) = 5200, but forgetting to subtract 4 per pair." },
  { letter: "D", tex: "5100", text: "5100", ok: true, expl: "Each pair shades area 4(2k)\u00B2 \u2212 4(2k\u22121)\u00B2 = 16k \u2212 4. Sum for k = 1 to 25: 16(325) \u2212 100 = 5200 \u2212 100 = 5100." },
  { letter: "E", tex: "5200", text: "5200", ok: false, expl: "You get 5200 by summing 16k for k = 1 to 25 = 16 \u00D7 325 = 5200. But each annular region also subtracts 4, so the total is 5200 \u2212 25(4) = 5200 \u2212 100 = 5100." },
  { letter: "F", tex: "10200", text: "10200", ok: false, expl: "You might get 10200 by doubling the correct answer, perhaps by counting each shaded ring twice or using 50 pairs instead of 25." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(!!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }

function QuestionSummary() {
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12, textAlign: "center" }}>
      <p style={{ margin: "0 0 4px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q17</span>
        A square <Tex>{"S_n"}</Tex> has vertices at <Tex>{"(\\pm n, \\pm n)"}</Tex>. <Tex>{"S_1"}</Tex> and <Tex>{"S_2"}</Tex> are drawn and the region between them is shaded. Then <Tex>{"S_3"}</Tex> and <Tex>{"S_4"}</Tex> are drawn and the region between them is shaded. This continues until <Tex>{"50"}</Tex> squares have been drawn. What is the total shaded area?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","2500"],["B","3400"],["C","4800"],["D","5100"],["E","5200"],["F","10200"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  // Static TMUA-style diagram for Read step: S1-S4 with two shaded bands
  const readDiagram = (() => {
    const pW = 360, pH = 360;
    const cx = pW / 2, cy = pH / 2;
    const maxHalf = 150;
    const scale = maxHalf / 4; // S4 is outermost
    const sq = (n) => { const s = n * scale; return { x: cx - s, y: cy - s, w: 2 * s, h: 2 * s }; };
    // Shading: band between S1 & S2, band between S3 & S4
    const s1 = sq(1), s2 = sq(2), s3 = sq(3), s4 = sq(4);
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", margin: "0 auto", maxWidth: 320 }}>
        {/* Coordinate axes */}
        <line x1={20} y1={cy} x2={pW - 20} y2={cy} stroke={C.muted + "55"} strokeWidth={0.7} />
        <line x1={cx} y1={20} x2={cx} y2={pH - 20} stroke={C.muted + "55"} strokeWidth={0.7} />
        <text x={pW - 16} y={cy - 6} textAnchor="end" fill={C.muted} fontSize={11} fontFamily={mathFont}>x</text>
        <text x={cx + 6} y={24} textAnchor="start" fill={C.muted} fontSize={11} fontFamily={mathFont}>y</text>
        {/* Shaded band 2: S3 to S4 */}
        <rect x={s4.x} y={s4.y} width={s4.w} height={s4.h} fill={C.muted + "18"} stroke="none" />
        <rect x={s3.x} y={s3.y} width={s3.w} height={s3.h} fill={C.bg} stroke="none" />
        {/* Shaded band 1: S1 to S2 */}
        <rect x={s2.x} y={s2.y} width={s2.w} height={s2.h} fill={C.muted + "18"} stroke="none" />
        <rect x={s1.x} y={s1.y} width={s1.w} height={s1.h} fill={C.bg} stroke="none" />
        {/* Outlines — clean exam style */}
        <rect x={s1.x} y={s1.y} width={s1.w} height={s1.h} fill="none" stroke={C.text} strokeWidth={1} />
        <rect x={s2.x} y={s2.y} width={s2.w} height={s2.h} fill="none" stroke={C.text} strokeWidth={1.2} />
        <rect x={s3.x} y={s3.y} width={s3.w} height={s3.h} fill="none" stroke={C.text} strokeWidth={1} />
        <rect x={s4.x} y={s4.y} width={s4.w} height={s4.h} fill="none" stroke={C.text} strokeWidth={1.2} />
        {/* Labels — TMUA style, placed just outside each square */}
        <text x={s1.x + s1.w + 4} y={s1.y + 12} textAnchor="start" fill={C.text} fontSize={13} fontFamily={mathFont} fontStyle="italic">S{"\u2081"}</text>
        <text x={s2.x + s2.w + 4} y={s2.y + 12} textAnchor="start" fill={C.text} fontSize={13} fontFamily={mathFont} fontStyle="italic">S{"\u2082"}</text>
        <text x={s3.x + s3.w + 4} y={s3.y + 12} textAnchor="start" fill={C.text} fontSize={13} fontFamily={mathFont} fontStyle="italic">S{"\u2083"}</text>
        <text x={s4.x + s4.w + 4} y={s4.y + 12} textAnchor="start" fill={C.text} fontSize={13} fontFamily={mathFont} fontStyle="italic">S{"\u2084"}</text>
      </svg>
    );
  })();

  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 17</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>A square <Tex>{"S_n"}</Tex> has vertices at <Tex>{"(\\pm n, \\pm n)."}</Tex></p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}><Tex>{"S_1"}</Tex> and <Tex>{"S_2"}</Tex> are drawn and the region between them is shaded. Then <Tex>{"S_3"}</Tex> and <Tex>{"S_4"}</Tex> are drawn and the region between them is shaded. This is shown in the diagram.</p>
        <div style={{ margin: "12px 0" }}>{readDiagram}</div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>This continues until <Tex>{"50"}</Tex> squares have been drawn. What is the total shaded area?</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>
        {opts.map(o => (<div key={o.letter} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 14, color: C.text }}><span style={{ fontWeight: 700, color: C.accent, marginRight: 6 }}>{o.letter}</span><Tex>{o.tex}</Tex></div>))}
      </div>
    </div>
  );
}

function SetupStep() {
  return (
    <div>
      <QuestionSummary />
      <InfoBox type="strategy">
        <p style={{ margin: 0 }}>Find the area of each shaded annular ring (between <Tex>{"S_{2k-1}"}</Tex> and <Tex>{"S_{2k}"}</Tex>), express it as a formula in <Tex>{"k"}</Tex>, then sum over <Tex>{"k = 1"}</Tex> to <Tex>{"25"}</Tex> (since <Tex>{"50"}</Tex> squares form <Tex>{"25"}</Tex> pairs).</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}><Tex>{"S_n"}</Tex> has side length <Tex>{"2n"}</Tex> (from <Tex>{"-n"}</Tex> to <Tex>{"n"}</Tex>), so its area is <Tex>{"(2n)^2 = 4n^2"}</Tex>.</p>
        <p style={{ margin: 0 }}>The shaded pairs are: (<Tex>{"S_1, S_2"}</Tex>), (<Tex>{"S_3, S_4"}</Tex>), ..., (<Tex>{"S_{49}, S_{50}"}</Tex>). The <Tex>{"k"}</Tex>-th pair is (<Tex>{"S_{2k-1}, S_{2k}"}</Tex>).</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Find the area of each shaded ring, then sum all <Tex>{"25"}</Tex> rings.</span>,
      math: (<div><Tex>{"\\text{Total} = \\sum_{k=1}^{25} \\bigl[\\text{Area}(S_{2k}) - \\text{Area}(S_{2k-1})\\bigr]"}</Tex></div>), },
    { label: "AREA OF S_n", color: C.calc,
      text: <span><Tex>{"S_n"}</Tex> has vertices at <Tex>{"(\\pm n, \\pm n)"}</Tex>, so its side length is <Tex>{"2n"}</Tex>.</span>,
      math: (<><div><Tex>{"\\text{Area}(S_n) = (2n)^2 = 4n^2"}</Tex></div></>), },
    { label: "AREA OF THE k-TH SHADED RING", color: C.calc,
      text: <span>The <Tex>{"k"}</Tex>-th pair shades between <Tex>{"S_{2k-1}"}</Tex> and <Tex>{"S_{2k}"}</Tex>.</span>,
      math: (<><div><Tex>{"\\text{Area}(S_{2k}) - \\text{Area}(S_{2k-1})"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 4(2k)^2 - 4(2k-1)^2"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 4\\bigl[4k^2 - (4k^2 - 4k + 1)\\bigr]"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 4\\bigl[4k^2 - 4k^2 + 4k - 1\\bigr]"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 4(4k - 1)"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 16k - 4"}</Tex></div></>), },
    { label: "SUM OVER ALL 25 PAIRS", color: C.calc,
      text: <span>Sum <Tex>{"16k - 4"}</Tex> for <Tex>{"k = 1"}</Tex> to <Tex>{"25"}</Tex>.</span>,
      math: (<><div><Tex>{"\\sum_{k=1}^{25}(16k - 4) = 16\\sum_{k=1}^{25}k - 4 \\times 25"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 16 \\times \\frac{25 \\times 26}{2} - 100"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 16 \\times \\frac{650}{2} - 100"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 16 \\times 325 - 100"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 5200 - 100"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= 5100"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>The total shaded area is <Tex>{"5100"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{\\text{Total shaded area} = 5100}"}</Tex></div>),
      conclusion: <span>The total shaded area is <Tex>{"5100"}</Tex>. The answer is D.</span>, },
  ];
  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><MathBox>{s.math}</MathBox>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [numPairs, setNumPairs] = useState(3);
  const snapPoints = [1, 3, 5, 10, 25];
  const snapRadius = 0.8;
  const handleSlider = (raw) => { const r = Math.round(raw); for (const sp of snapPoints) { if (Math.abs(r - sp) < snapRadius) return sp; } return r; };

  const ringArea = (k) => 16 * k - 4;
  let cumSum = 0;
  for (let k = 1; k <= numPairs; k++) cumSum += ringArea(k);
  const target = 5100;
  const isExact = numPairs === 25;
  const isNear = !isExact && numPairs >= 23;
  const isHit = isExact || isNear;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "p3", jsx: <span><Tex>{"3"}</Tex> pairs</span>, val: 3 },
    { label: "p10", jsx: <span><Tex>{"10"}</Tex> pairs</span>, val: 10 },
    { label: "p25", jsx: <span><Tex>{"25"}</Tex> pairs</span>, val: 25 },
  ];

  const diagram = (() => {
    const pW = 520, pH = 320;
    const cx = pW / 2, cy = pH / 2;
    // Always scale to the outermost pair so it fills the space
    const outerN = numPairs * 2;
    const innerN = outerN - 1;
    const maxHalf = Math.min((pH - 60) / 2, (pW - 80) / 2);
    const scale = outerN > 0 ? maxHalf / outerN : 20;
    const sq = (n) => { const s = n * scale; return { x: cx - s, y: cy - s, w: 2 * s, h: 2 * s }; };
    // Show the outermost 3 pairs (6 squares) max, rest noted as "inside"
    const showPairs = Math.min(numPairs, 3);
    const startK = numPairs - showPairs + 1;
    // Shading: draw from outermost inward
    const rects = [];
    for (let k = numPairs; k >= startK; k--) {
      const outer = sq(2 * k);
      const inner = sq(2 * k - 1);
      rects.push(<rect key={`sh-${k}`} x={outer.x} y={outer.y} width={outer.w} height={outer.h} fill={col + "20"} stroke="none" />);
      rects.push(<rect key={`ct-${k}`} x={inner.x} y={inner.y} width={inner.w} height={inner.h} fill={C.bg} stroke="none" />);
    }
    // Outlines for visible squares
    const outlines = [];
    for (let k = numPairs; k >= startK; k--) {
      for (const n of [2 * k, 2 * k - 1]) {
        const s = sq(n);
        const isOuter = n % 2 === 0;
        outlines.push(<rect key={`ol-${n}`} x={s.x} y={s.y} width={s.w} height={s.h} fill="none" stroke={isOuter ? col : C.muted} strokeWidth={isOuter ? 1.5 : 0.8} strokeDasharray={isOuter ? "none" : "3,2"} />);
      }
    }
    const outerSq = sq(outerN);
    const innerSq = sq(innerN);
    // Vertex dot helper
    const vtx = (x, y, c) => <circle cx={x} cy={y} r={3} fill={c} stroke={C.white} strokeWidth={0.8} />;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <defs>
          <filter x="-0.08" y="-0.2" width="1.16" height="1.45" id="lb17"><feFlood floodColor="#0f1117" floodOpacity="0.85" /><feComposite in="SourceGraphic" operator="over" /></filter>
        </defs>
        {/* Axes */}
        <line x1={outerSq.x - 8} y1={cy} x2={outerSq.x + outerSq.w + 8} y2={cy} stroke={C.border} strokeWidth={0.7} />
        <line x1={cx} y1={outerSq.y - 8} x2={cx} y2={outerSq.y + outerSq.h + 8} stroke={C.border} strokeWidth={0.7} />
        <text x={outerSq.x + outerSq.w + 12} y={cy + 4} textAnchor="start" fill={C.muted} fontSize={11} fontFamily={mathFont}>x</text>
        <text x={cx + 6} y={outerSq.y - 10} textAnchor="start" fill={C.muted} fontSize={11} fontFamily={mathFont}>y</text>
        {rects}
        {outlines}
        {/* S labels for outermost pair */}
        <text x={outerSq.x + outerSq.w - 2} y={outerSq.y - 4} textAnchor="end" fill={col} fontSize={12} fontWeight={700} fontFamily={mathFont} filter="url(#lb17)">S{outerN}</text>
        <text x={innerSq.x + innerSq.w - 2} y={innerSq.y - 4} textAnchor="end" fill={C.muted} fontSize={11} fontFamily={mathFont} filter="url(#lb17)">S{innerN}</text>
        {/* Vertex dots and coordinate labels for outer square */}
        {vtx(outerSq.x, outerSq.y, col)}
        {vtx(outerSq.x + outerSq.w, outerSq.y, col)}
        {vtx(outerSq.x + outerSq.w, outerSq.y + outerSq.h, col)}
        {vtx(outerSq.x, outerSq.y + outerSq.h, col)}
        <text x={outerSq.x + outerSq.w + 4} y={outerSq.y - 4} textAnchor="start" fill={col} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb17)">({outerN}, {outerN})</text>
        <text x={outerSq.x - 4} y={outerSq.y + outerSq.h + 14} textAnchor="end" fill={col} fontSize={11} fontWeight={600} fontFamily={mathFont} filter="url(#lb17)">({"\u2212"}{outerN}, {"\u2212"}{outerN})</text>
        {/* Vertex dots for inner square */}
        {vtx(innerSq.x, innerSq.y, C.muted)}
        {vtx(innerSq.x + innerSq.w, innerSq.y, C.muted)}
        {vtx(innerSq.x + innerSq.w, innerSq.y + innerSq.h, C.muted)}
        {vtx(innerSq.x, innerSq.y + innerSq.h, C.muted)}
        <text x={innerSq.x + innerSq.w + 4} y={innerSq.y + innerSq.h + 14} textAnchor="start" fill={C.muted} fontSize={11} fontFamily={mathFont} filter="url(#lb17)">({innerN}, {"\u2212"}{innerN})</text>
        {/* "+N more pairs inside" if applicable */}
        {numPairs > showPairs && (
          <text x={cx} y={cy + 4} textAnchor="middle" fill={C.muted} fontSize={12} fontFamily={mathFont} filter="url(#lb17)">+{numPairs - showPairs} more pair{numPairs - showPairs > 1 ? "s" : ""} inside</text>
        )}
        <text x={cx} y={pH - 4} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={mathFont}>
          {numPairs} pair{numPairs > 1 ? "s" : ""} = {numPairs * 2} squares
        </text>
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>1. Slide to control the number of shaded pairs</p>
        <p style={{ margin: "0 0 4px" }}>2. Each pair <Tex>{"(S_{2k-1}, S_{2k})"}</Tex> contributes area <Tex>{"16k - 4"}</Tex></p>
        <p style={{ margin: 0 }}>3. At <Tex>{"25"}</Tex> pairs (all <Tex>{"50"}</Tex> squares), the total is the answer</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.assum, fontWeight: 600 }}>Pairs</span>
          <span style={{ fontSize: 16, color: C.assum, fontFamily: mathFont, fontWeight: 700 }}>{numPairs}</span>
        </div>
        <input type="range" min={1} max={25} step={1} value={numPairs} onChange={e => setNumPairs(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.assum, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = numPairs === pr.val; const prHit = active && isExact; return (<button key={pr.label} onClick={() => setNumPairs(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${prHit ? C.ok : active ? C.ps : C.border}`, background: prHit ? C.ok + "15" : active ? C.ps + "15" : C.card, color: active ? (prHit ? C.ok : C.ps) : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 8 }}>
        <div style={{ background: "#1e2030", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <div><Tex>{`\\color{#e2e2e8}{\\text{Pair } k = ${numPairs}: \\quad S_{${2*numPairs-1}} \\text{ and } S_{${2*numPairs}}, \\quad \\text{ring area} = 16(${numPairs}) - 4 = ${ringArea(numPairs)}}`}</Tex></div>
          <div style={{ marginTop: 6 }}><Tex>{`\\color{${isExact ? "#55efc4" : isNear ? "#fdcb6e" : "#74b9ff"}}{\\text{Running total} = \\sum_{k=1}^{${numPairs}}(16k-4) = ${cumSum}}`}</Tex></div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.assum}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.assum, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Pairs</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.assum, fontFamily: mathFont }}>{numPairs}</div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Total area</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col, fontFamily: mathFont, transition: "color 0.3s" }}>{cumSum}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}66`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Target</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok, fontFamily: mathFont }}>5100</div>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{diagram}</div>
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>All <Tex>{"25"}</Tex> pairs: total area <Tex>{"= 5200 - 100 = 5100"}</Tex>. The answer is D.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! Total so far is <Tex>{`${cumSum}`}</Tex>. Tap <Tex>{"25"}</Tex> pairs to see the full answer.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Total after <Tex>{`${numPairs}`}</Tex> pairs: <Tex>{`${cumSum}`}</Tex>. Slide to <Tex>{"25"}</Tex> pairs for the full answer.</span>
        </div>
      )}
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
        <div style={{ marginBottom: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><span style={{ background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: C.white, letterSpacing: 1 }}>TMUA</span><span style={{ fontSize: 12, color: C.muted }}>{META.paper}</span><span style={{ fontSize: 12, color: C.muted }}>{"\u00B7"}</span><span style={{ fontSize: 12, color: C.ps }}>{META.topicTag}</span></div><h1 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: titleFont, fontStyle: "italic", letterSpacing: 0.5 }}>Interactive Walkthrough</h1><p style={{ fontSize: 12, color: C.muted, margin: 0 }}>TMUA {META.year} {"\u00B7"} {META.paper} {"\u00B7"} Question {META.questionNumber}</p></div>
        <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>{stepsMeta.map(s => (<button key={s.id} onClick={() => setStep(s.id)} style={{ flex: 1, minWidth: 0, background: step === s.id ? C.accent : step > s.id ? "rgba(108,92,231,0.15)" : "#1e2030", border: `1px solid ${step === s.id ? C.accent : step > s.id ? C.accent + "44" : C.border}`, borderRadius: 9, padding: "8px 3px", cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}><span style={{ fontSize: 13, fontWeight: 700, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted }}>{s.id + 1}</span><span style={{ fontSize: 11, fontWeight: step === s.id ? 700 : 500, color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted, whiteSpace: "nowrap" }}>{s.label}</span></button>))}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><span style={{ background: C.accent, borderRadius: 6, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.white }}>{step + 1}</span><h2 style={{ fontSize: 16, fontWeight: 700, color: C.white, margin: 0 }}>{stepsMeta[step].title}</h2></div>
        {step === 0 && <ReadStep />}
        {step === 1 && <SetupStep />}
        {step === 2 && <SolveStepContent revealed={revealed} setRevealed={setRevealed} />}
        {step === 3 && <VerifyStepContent />}
        {step === 4 && (<div><QuestionSummary /><div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>{opts.map((o, i) => (<OptionCard key={o.letter} o={o} expanded={expanded === i} animate={optAnim[i]} onClick={() => setExpanded(expanded === i ? null : i)} />))}</div></div>)}
        <div style={{ display: "flex", gap: 10, marginTop: 20, paddingBottom: 28 }}><button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: `1px solid ${C.border}`, background: step === 0 ? C.card : "#1e2030", color: step === 0 ? C.muted : C.text, fontSize: 14, fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer", opacity: step === 0 ? 0.4 : 1 }}>{"\u2190"} Previous</button>{step < 4 ? (<button onClick={() => setStep(step + 1)} style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Next {"\u2192"}</button>) : (<button style={{ flex: 1, padding: "12px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.ok},#2ecc71)`, color: C.white, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Complete</button>)}</div>
      </div>
    </div>
  );
}
