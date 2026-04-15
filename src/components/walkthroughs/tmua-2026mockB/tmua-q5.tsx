"use client";

import { useState, useEffect, useRef } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 5, paper: "Paper 1", year: "2026 Mock Set B", topicTag: "Geometry / Quadratic Constraint" };
const fmt = (v, dp = 2) => { const r = Math.round(v * 100) / 100; return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString(); };

const S3 = Math.sqrt(3);
const opts = [
  { letter: "A", tex: "\\sqrt{3}", text: "\u221A3", ok: false, expl: "You might get \u221A3 by correctly solving the quadratic but picking the smaller root. The question asks for the largest h, which is 3\u221A3." },
  { letter: "B", tex: "2\\sqrt{3}", text: "2\u221A3", ok: false, expl: "You might get 2\u221A3 by miscalculating the discriminant, e.g. forgetting to square the 4\u221A3 term correctly." },
  { letter: "C", ok: true, tex: "3\\sqrt{3}", text: "3\u221A3", expl: "From the area equation: h(8 \u2212 2h/\u221A3) = 6\u221A3 gives h\u00B2 \u2212 4\u221A3 h + 9 = 0. The roots are h = (4\u221A3 \u00B1 2\u221A3)/2 = 3\u221A3 or \u221A3. The largest is 3\u221A3." },
  { letter: "D", tex: "4\\sqrt{3}", text: "4\u221A3", ok: false, expl: "You might confuse the triangle height with the rectangle height. If h = 4\u221A3, the rectangle has zero width and area 0, not 6\u221A3." },
  { letter: "E", tex: "3", text: "3", ok: false, expl: "You might get 3 by a simplification error when solving the quadratic, e.g. dividing by \u221A3 at the wrong stage." },
  { letter: "F", tex: "6", text: "6", ok: false, expl: "You might get 6 by confusing the area target 6\u221A3 with the height, or by forgetting the \u221A3 factor entirely." },
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
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q5</span>
        An equilateral triangle of side 8 has a rectangle inscribed with one side along the base. The rectangle has height <Tex>{"h"}</Tex>. What is the largest value of <Tex>{"h"}</Tex> such that the area of the rectangle is <Tex>{"6\\sqrt{3}"}</Tex>?
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.text, flexWrap: "wrap", marginTop: 4 }}>
        {[["A","\\sqrt{3}"],["B","2\\sqrt{3}"],["C","3\\sqrt{3}"],["D","4\\sqrt{3}"],["E","3"],["F","6"]].map(([l,v]) => <span key={l}>{l}: <Tex>{v}</Tex></span>)}
      </div>
    </div>
  );
}
function OptionCard({ o, expanded, animate, onClick }) { return (<div onClick={onClick} style={{ background: expanded ? (o.ok ? C.conclBg : C.failBg) : C.card, border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`, borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", transition: "all 0.3s", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)" }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 7, background: expanded ? (o.ok ? C.ok + "22" : C.fail + "22") : C.accent + "22", border: `1.5px solid ${expanded ? (o.ok ? C.ok : C.fail) : C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: expanded ? (o.ok ? C.ok : C.fail) : C.accent, flexShrink: 0 }}>{o.letter}</div><div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: 14, color: C.text }}><Tex>{o.tex}</Tex></p>{expanded && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, background: o.ok ? C.conclBg : C.failBg, color: o.ok ? C.ok : C.fail, borderLeft: `3px solid ${o.ok ? C.ok : C.fail}` }}>{o.ok ? <span style={{ fontWeight: 700 }}>CORRECT: </span> : <span style={{ fontWeight: 700 }}>INCORRECT: </span>}{o.expl}</div>)}</div></div></div>); }
function InfoBox({ type, children }) { const config = { strategy: { color: C.ps, bg: C.psBg, label: "STRATEGY" }, insight: { color: C.assum, bg: C.assumBg, label: "KEY INSIGHT" }, hint: { color: C.assum, bg: C.assumBg, label: "HINT" } }; const c = config[type]; return (<div style={{ background: c.bg, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}><div style={{ marginBottom: 8 }}><span style={{ background: c.color + "22", border: `1px solid ${c.color}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: c.color, fontWeight: 700, whiteSpace: "nowrap" }}>{c.label}</span></div><div style={{ color: c.color, fontSize: 14, lineHeight: 1.6 }}>{children}</div></div>); }
function MathBox({ children, style: s }) { return (<div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", fontSize: 15, color: C.white, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...s }}>{children}</div>); }

function ReadStep() {
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 5</span>
        </div>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 6px" }}>An equilateral triangle of side 8 has a rectangle inscribed with one side along the base. The rectangle has height <Tex>{"h"}</Tex>.</p>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: C.text, margin: "0 0 10px" }}>What is the largest value of <Tex>{"h"}</Tex> such that the area of the rectangle is <Tex>{"6\\sqrt{3}"}</Tex>?</p>
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
        <p style={{ margin: 0 }}>Write the rectangle's width as a function of <Tex>{"h"}</Tex> using the triangle's geometry. Set the area equal to <Tex>{"6\\sqrt{3}"}</Tex> and solve the resulting quadratic for <Tex>{"h"}</Tex>.</p>
      </InfoBox>
      <InfoBox type="insight">
        <p style={{ margin: "0 0 4px" }}>The equilateral triangle has height <Tex>{"4\\sqrt{3}"}</Tex>. At height <Tex>{"h"}</Tex>, the width narrows linearly: <Tex>{"w = 8\\left(1 - \\tfrac{h}{4\\sqrt{3}}\\right) = 8 - \\tfrac{2h}{\\sqrt{3}}"}</Tex>.</p>
        <p style={{ margin: 0 }}>So the area is <Tex>{"h \\times \\left(8 - \\tfrac{2h}{\\sqrt{3}}\\right) = 6\\sqrt{3}"}</Tex>, giving a quadratic in <Tex>{"h"}</Tex>.</p>
      </InfoBox>
    </div>
  );
}

function SolveStepContent({ revealed, setRevealed }) {
  const solveSteps = [
    { label: "APPROACH", color: C.ps,
      text: <span>Find the width of the rectangle at height <Tex>{"h"}</Tex>, form the area equation, and solve the quadratic.</span>,
      math: (<div><Tex>{"\\text{Area} = h \\times w(h) = 6\\sqrt{3}"}</Tex></div>), },
    { label: "WIDTH AT HEIGHT h", color: C.calc,
      text: <span>The triangle has base 8 and height <Tex>{"4\\sqrt{3}"}</Tex>. By similar triangles, the width at height <Tex>{"h"}</Tex> is:</span>,
      math: (<><div><Tex>{"w = 8\\left(1 - \\frac{h}{4\\sqrt{3}}\\right) = 8 - \\frac{2h}{\\sqrt{3}}"}</Tex></div></>), },
    { label: "FORM THE AREA EQUATION", color: C.calc,
      text: <span>Set <Tex>{"h \\times w = 6\\sqrt{3}"}</Tex> and multiply through by <Tex>{"\\sqrt{3}"}</Tex>.</span>,
      math: (<><div><Tex>{"h\\left(8 - \\frac{2h}{\\sqrt{3}}\\right) = 6\\sqrt{3}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"8h - \\frac{2h^2}{\\sqrt{3}} = 6\\sqrt{3}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Multiply by } \\sqrt{3}: \\quad 8\\sqrt{3}\\,h - 2h^2 = 18"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"2h^2 - 8\\sqrt{3}\\,h + 18 = 0"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"h^2 - 4\\sqrt{3}\\,h + 9 = 0"}</Tex></div></>), },
    { label: "SOLVE THE QUADRATIC", color: C.calc,
      text: <span>Apply the quadratic formula.</span>,
      math: (<><div><Tex>{"h = \\frac{4\\sqrt{3} \\pm \\sqrt{48 - 36}}{2} = \\frac{4\\sqrt{3} \\pm \\sqrt{12}}{2}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"= \\frac{4\\sqrt{3} \\pm 2\\sqrt{3}}{2}"}</Tex></div><div style={{ marginTop: 6 }}><Tex>{"h = 3\\sqrt{3} \\quad \\text{or} \\quad h = \\sqrt{3}"}</Tex></div></>), },
    { label: "CONCLUSION", color: C.ok,
      text: <span>Both roots are valid (both lie between 0 and <Tex>{"4\\sqrt{3}"}</Tex>). The largest is <Tex>{"3\\sqrt{3}"}</Tex>.</span>,
      math: (<div><Tex>{"\\color{#55efc4}{h_{\\max} = 3\\sqrt{3}}"}</Tex></div>),
      conclusion: <span>The answer is C: <Tex>{"h = 3\\sqrt{3}"}</Tex>.</span>, },
  ];
  return (
    <div>
      <QuestionSummary />
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>
        {solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 270px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}
        {revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"\u2192"}</button>)}
      </div>
    </div>
  );
}

function VerifyStepContent() {
  const [hVal, setHVal] = useState(2);
  const triH = 4 * S3;
  const snapPoints = [S3, 2 * S3, 3 * S3, triH];
  const snapRadius = 0.15;
  const handleSlider = (raw) => { for (const sp of snapPoints) { if (Math.abs(raw - sp) < snapRadius) return sp; } return raw; };

  // Exact value display when snapped
  const exactMap = [
    { val: S3, tex: "\\sqrt{3}" },
    { val: 2 * S3, tex: "2\\sqrt{3}" },
    { val: 3 * S3, tex: "3\\sqrt{3}" },
    { val: triH, tex: "4\\sqrt{3}" },
  ];
  const snappedExact = exactMap.find(e => Math.abs(hVal - e.val) < 0.05);
  const hDisplay = snappedExact
    ? <span><Tex>{snappedExact.tex}</Tex> <span style={{ color: C.muted }}>{"\u2248"} <Tex>{fmt(hVal)}</Tex></span></span>
    : <Tex>{fmt(hVal)}</Tex>;

  const width = 8 - 2 * hVal / S3;
  const area = hVal * Math.max(0, width);
  const target = 6 * S3;
  const isExact = Math.abs(hVal - 3 * S3) < 0.05 || Math.abs(hVal - S3) < 0.05;
  const isNear = !isExact && Math.abs(area - target) < 0.5;
  const col = isExact ? C.ok : isNear ? C.assum : C.ps;

  const presets = [
    { label: "s3", jsx: <span><Tex>{"\\sqrt{3}"}</Tex></span>, val: S3 },
    { label: "2s3", jsx: <span><Tex>{"2\\sqrt{3}"}</Tex></span>, val: 2 * S3 },
    { label: "3s3", jsx: <span><Tex>{"3\\sqrt{3}"}</Tex></span>, val: 3 * S3 },
  ];

  const FO = ({ x, y, w, h, color, align, bg, children }) => (
    <foreignObject x={x} y={y} width={w || 40} height={h || 20}>
      <div style={{ fontSize: 11, color: color || C.muted, textAlign: align || "center", lineHeight: 1, background: bg ? "rgba(15,17,23,0.85)" : "none", borderRadius: bg ? 3 : 0, padding: bg ? "1px 3px" : 0, width: bg ? "fit-content" : "auto", margin: align === "right" ? "0 0 0 auto" : align === "left" ? "0 auto 0 0" : "0 auto" }}>{children}</div>
    </foreignObject>
  );

  const graph = (() => {
    const pW = 420, pH = 370;
    const sc = 30;
    const cx = pW / 2, by = pH - 66;
    const ty = by - triH * sc;
    const lx = cx - 4 * sc, rx = cx + 4 * sc;
    const rectW = Math.max(0, width) * sc;
    const rx1 = cx - rectW / 2, rx2 = cx + rectW / 2;
    const ry = by - hVal * sc;
    const cap = 4; // end-cap half-length for dimension lines
    // Dimension line helper: line with perpendicular end-caps
    const dimLine = (x1, y1, x2, y2, color, horiz) => {
      const els = [<line key="m" x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1} />];
      if (horiz) { els.push(<line key="c1" x1={x1} y1={y1 - cap} x2={x1} y2={y1 + cap} stroke={color} strokeWidth={1} />); els.push(<line key="c2" x1={x2} y1={y2 - cap} x2={x2} y2={y2 + cap} stroke={color} strokeWidth={1} />); }
      else { els.push(<line key="c1" x1={x1 - cap} y1={y1} x2={x1 + cap} y2={y1} stroke={color} strokeWidth={1} />); els.push(<line key="c2" x1={x2 - cap} y1={y2} x2={x2 + cap} y2={y2} stroke={color} strokeWidth={1} />); }
      return els;
    };
    // Side midpoints for "8" labels
    const lmx = (lx + cx) / 2, lmy = (by + ty) / 2;
    const rmx = (rx + cx) / 2, rmy = (by + ty) / 2;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        {/* Triangle */}
        <polygon points={`${lx},${by} ${rx},${by} ${cx},${ty}`} fill="none" stroke={C.ps} strokeWidth={2} />
        {/* Rectangle */}
        {width > 0 && <rect x={rx1} y={ry} width={rx2 - rx1} height={by - ry} fill={col + "22"} stroke={col} strokeWidth={2} rx={2} />}
        {/* Side labels: "8" on left and right sides */}
        <FO x={lmx - 22} y={lmy - 9} w={20} h={18} color={C.ps} bg><Tex>{"8"}</Tex></FO>
        <FO x={rmx + 2} y={rmy - 9} w={20} h={18} color={C.ps} bg><Tex>{"8"}</Tex></FO>
        {/* h dimension line: right side, vertical with end-caps */}
        {width > 0 && <g>{dimLine(rx + 16, by, rx + 16, ry, col, false)}</g>}
        {width > 0 && <FO x={rx + 22} y={(by + ry) / 2 - 9} w={30} h={18} color={col} bg><Tex>{"h"}</Tex></FO>}
        {/* Width dimension line: just below base */}
        {width > 0 && <g>{dimLine(rx1, by + 14, rx2, by + 14, col, true)}</g>}
        {width > 0 && <FO x={(rx1 + rx2) / 2 - 20} y={by + 20} w={40} h={18} color={col} bg><Tex>{fmt(width)}</Tex></FO>}
        {/* Base "8" dimension line: further below */}
        <g>{dimLine(lx, by + 38, rx, by + 38, C.ps, true)}</g>
        <FO x={cx - 10} y={by + 40} w={20} h={18} color={C.ps}><Tex>{"8"}</Tex></FO>
        {/* Area label inside rectangle */}
        {width > 0 && <FO x={(rx1 + rx2) / 2 - 30} y={(ry + by) / 2 - 9} w={60} h={18} color={col} bg><Tex>{fmt(area)}</Tex></FO>}
      </svg>
    );
  })();

  return (
    <div>
      <QuestionSummary />
      <InfoBox type="hint">
        <p style={{ margin: "0 0 4px" }}>As <Tex>{"h"}</Tex> increases, the rectangle gets taller but narrower. Two values of <Tex>{"h"}</Tex> give area <Tex>{"6\\sqrt{3}"}</Tex>: a short wide rectangle and a tall thin one.</p>
        <p style={{ margin: 0 }}>Find both, and pick the larger <Tex>{"h"}</Tex>.</p>
      </InfoBox>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.calc, fontWeight: 600 }}><Tex>{"h"}</Tex></span>
          <span style={{ fontSize: 16, color: C.calc, fontWeight: 700 }}>{hDisplay}</span>
        </div>
        <input type="range" min={0.1} max={triH - 0.1} step={0.01} value={hVal} onChange={e => setHVal(handleSlider(+e.target.value))} style={{ width: "100%", accentColor: C.calc, height: 6 }} />
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {presets.map(pr => { const active = Math.abs(hVal - pr.val) < 0.1; return (<button key={pr.label} onClick={() => setHVal(pr.val)} style={{ flex: 1, padding: "6px 2px", borderRadius: 7, transition: "all 0.2s", border: `1px solid ${active ? col : C.border}`, background: active ? col + "15" : C.card, color: active ? col : C.muted, fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400 }}>{pr.jsx}</button>); })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700, marginBottom: 2 }}><Tex>{"h"}</Tex></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}>{snappedExact ? <Tex>{snappedExact.tex}</Tex> : <Tex>{fmt(hVal)}</Tex>}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.ps}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ps, fontWeight: 700, marginBottom: 2 }}>WIDTH</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ps }}><Tex>{fmt(Math.max(0, width))}</Tex></div>
        </div>
        <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center", transition: "all 0.3s" }}>
          <div style={{ fontSize: 11, color: col, fontWeight: 700, marginBottom: 2 }}>AREA</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: col }}>{isExact ? <span><Tex>{"6\\sqrt{3}"}</Tex> <span style={{ fontSize: 12, color: C.muted }}>{"\u2248"} <Tex>{fmt(area)}</Tex></span></span> : <Tex>{fmt(area)}</Tex>}</div>
        </div>
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}44`, borderRadius: 8, padding: "7px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.ok, fontWeight: 700, marginBottom: 2 }}>TARGET</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ok }}><Tex>{"6\\sqrt{3}"}</Tex></div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{"\u2248"} <Tex>{fmt(target)}</Tex></div>
        </div>
      </div>
      {/* Constraint row: area with tick/cross */}
      <div style={{ background: isExact ? C.conclBg : isNear ? C.assumBg : C.card, border: `1px solid ${col}44`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, transition: "all 0.3s" }}>
        <span style={{ fontSize: 13, color: col, fontWeight: 600 }}>Area</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: col }}>{isExact ? <span><Tex>{"6\\sqrt{3}"}</Tex> <span style={{ color: C.muted, fontSize: 14 }}>{"\u2248"} <Tex>{fmt(area)}</Tex></span></span> : <Tex>{fmt(area)}</Tex>}</span>
          <span style={{ fontSize: 16, marginLeft: 4 }}>{isExact ? "\u2705" : "\u274C"}</span>
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>{graph}</div>
      {isExact ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ok }}>Area = <Tex>{"6\\sqrt{3}"}</Tex> at <Tex>{`h = ${Math.abs(hVal - 3 * S3) < 0.1 ? "3\\sqrt{3}" : "\\sqrt{3}"}`}</Tex>. The largest such <Tex>{"h"}</Tex> is <Tex>{"3\\sqrt{3}"}</Tex>. The answer is C.</span>
        </div>
      ) : isNear ? (
        <div style={{ background: C.assumBg, border: `1px solid ${C.assum}55`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.assum }}>Close! Area = <Tex>{fmt(area)}</Tex>. Try <Tex>{"h = \\sqrt{3}"}</Tex> or <Tex>{"h = 3\\sqrt{3}"}</Tex>.</span>
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>Area = <Tex>{fmt(area)}</Tex>, not <Tex>{"6\\sqrt{3}"}</Tex>. Adjust <Tex>{"h"}</Tex> to match.</span>
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
