"use client";

import { useState, useEffect, useRef, Fragment } from "react";

const C = { bg: "#0f1117", card: "#1a1d27", border: "#2a2d3a", accent: "#6c5ce7", accentLight: "#a29bfe", conclBg: "rgba(85,239,196,0.10)", ok: "#55efc4", fail: "#ff7675", failBg: "rgba(255,118,117,0.10)", assum: "#fdcb6e", assumBg: "rgba(253,203,110,0.12)", text: "#e2e2e8", muted: "#8b8d9a", white: "#fff", ps: "#74b9ff", psBg: "rgba(116,185,255,0.10)", calc: "#fdcb6e" };
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [{ id: 0, label: "Read", title: "Read the Question" },{ id: 1, label: "Setup", title: "Identify the Approach" },{ id: 2, label: "Solve", title: "Solve Step by Step" },{ id: 3, label: "Verify (Optional)", title: "Verify Interactively (Optional)" },{ id: 4, label: "Answer", title: "Select the Answer" }];
const META = { questionNumber: 8, paper: "Set A Paper 2", year: "2026 Mock", topicTag: "Sequences / Pigeonhole" };

// The arithmetic sequence 2, 5, 8, ..., 50 (17 terms (common difference 3)
const SEQ = Array.from({ length: 17 }, (_, i) => 2 + 3 * i);
// Pairs summing to 52. Each pair is {a, 52-a} where a < 52-a.
// Sequence terms a < 26 that pair with 52-a: a = 2,5,8,11,14,17,20,23. So 8 pairs.
// 26 is in the sequence but pairs only with itself (not distinct), so it's a singleton.
const PAIRS = [[2,50],[5,47],[8,44],[11,41],[14,38],[17,35],[20,32],[23,29]];
const SINGLETON = 26;

const opts = [
  { letter: "A", ok: false, tex: "8", expl: "With 8 terms you could pick one from each of the 8 pairs and still avoid any pair summing to 52. For example pick {2, 5, 8, 11, 14, 17, 20, 23}: no two of these sum to 52 because they're all 'small halves' of pairs. So 8 is not enough to force (*)." },
  { letter: "B", ok: false, tex: "9", expl: "You can still avoid pairing with 9 terms: pick one term from each of the 8 pairs plus the singleton 26. For example {2, 5, 8, 11, 14, 17, 20, 23, 26}: 9 terms, no pair summing to 52. So 9 isn't enough either." },
  { letter: "C", ok: true, tex: "10", expl: "There are 9 'slots' that avoid pairing: one from each of the 8 pairs {2,50}, {5,47}, ..., {23,29} (pick either element), plus the singleton 26. So the maximum size of a pair-free selection is 9. With 10 terms, by pigeonhole you must pick both elements of some pair, forcing two distinct terms summing to 52." },
  { letter: "D", ok: false, tex: "11", expl: "11 works (once n ≥ 10, (*) is forced), but the question asks for the SMALLEST such n. With only 10 you already can't avoid a pair, so 10 is smaller and also works, making 10 the answer, not 11." },
  { letter: "E", ok: false, tex: "12", expl: "Same issue as D: (*) becomes forced as soon as n = 10, so 12 isn't the smallest." },
  { letter: "F", ok: false, tex: "13", expl: "(*) is forced from n = 10 onwards, so 13 is far from the smallest." },
];

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() { if (window.katex) return Promise.resolve(); if (katexLoadPromise) return katexLoadPromise; katexLoadPromise = new Promise((resolve) => { if (!document.getElementById("katex-css")) { const link = document.createElement("link"); link.id = "katex-css"; link.rel = "stylesheet"; link.href = KATEX_CSS; document.head.appendChild(link); if (!document.getElementById("katex-fix")) { const fix = document.createElement("style"); fix.id = "katex-fix"; fix.textContent = ".katex { font-size: 1.05em; }"; document.head.appendChild(fix); } } const script = document.createElement("script"); script.src = KATEX_JS; script.onload = resolve; document.head.appendChild(script); }); return katexLoadPromise; }
function Tex({ children, display }) { const ref = useRef(null); const [ready, setReady] = useState(typeof window !== "undefined" && !!window.katex); useEffect(() => { if (!ready) loadKaTeX().then(() => setReady(true)); }, []); useEffect(() => { if (ready && ref.current && window.katex) { try { window.katex.render(String(children), ref.current, { displayMode: !!display, throwOnError: false }); } catch {} } }, [ready, children, display]); if (!ready) return <span style={{ fontFamily: mathFont }}>{children}</span>; return <span ref={ref} />; }


const ITEMS_Q8 = [
  { label: '(*)', content: (<>There are two distinct terms in <Tex>{"S"}</Tex> whose sum is <Tex>{"52"}</Tex>.</>) }
];
const OPTIONS_Q8 = [
  ["A", '8'],
  ["B", '9'],
  ["C", '10'],
  ["D", '11'],
  ["E", '12'],
  ["F", '13'],
  ["G", '17']
];
const SECTIONS_Q8 = [
  { type: 'prose', text: (<>A selection, <Tex>{"S"}</Tex>, of <Tex>{"n"}</Tex> terms is taken from the arithmetic sequence</>) },
  { type: "mathbox", tex: "2, \\; 5, \\; 8, \\; 11, \\; \\ldots, \\; 50" },
  { type: 'prose', text: (<>Consider the following statement:</>) },
  { type: "items", items: [
    { label: '(*)', content: (<>There are two distinct terms in <Tex>{"S"}</Tex> whose sum is <Tex>{"52"}</Tex>.</>) }
  ] },
  { type: 'prose-tight', text: (<>What is the smallest value of <Tex>{"n"}</Tex> for which (*) is necessarily true?</>) }
];

function QuestionSummary() {
  const sections = SECTIONS_Q8;
  const options = OPTIONS_Q8;
  const hasItems = sections.some(s => s.type === "items");
  return (
    <div style={{ background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: C.muted, letterSpacing: 0.5, marginRight: 6 }}>Q8</span>
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
  const sections = SECTIONS_Q8;
  const options = OPTIONS_Q8;
  const maxLen = Math.max(...options.map(([, v]) => typeof v === "string" ? v.length : 8));
  const cols = maxLen <= 8 ? (options.length <= 4 ? options.length : options.length <= 6 ? 3 : 4)
             : maxLen <= 20 ? 3
             : 2;
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 13, padding: "3px 10px", borderRadius: 6 }}>QUESTION 8</span>
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

function SetupStep() { return (<div><QuestionSummary /><InfoBox type="strategy"><p style={{ margin: "0 0 4px" }}>List the full sequence: <Tex>{"2, 5, 8, \\ldots, 50"}</Tex> (common difference 3, so 17 terms in total).</p><p style={{ margin: "0 0 4px" }}>Find all pairs of distinct terms that sum to <Tex>{"52"}</Tex>. Check whether there's a term that pairs only with itself (it can be picked freely without making (*) true).</p><p style={{ margin: 0 }}>To find the smallest <Tex>{"n"}</Tex> that forces (*), find the LARGEST selection that avoids it, then add 1.</p></InfoBox><InfoBox type="insight"><p style={{ margin: "0 0 4px" }}>This is pigeonhole: the "pigeonholes" are the pairs. From each pair you can pick at most one term without triggering (*).</p><p style={{ margin: 0 }}>If there are <Tex>{"P"}</Tex> pairs and <Tex>{"s"}</Tex> singleton terms (terms that pair only with themselves), the max size of a pair-free selection is <Tex>{"P + s"}</Tex>. The smallest <Tex>{"n"}</Tex> forcing (*) is then <Tex>{"P + s + 1"}</Tex>.</p></InfoBox></div>); }

function SolveStepContent({ revealed, setRevealed }) {
  const FO = ({ x, y, w, hh, color, children }) => (
    <foreignObject x={x} y={y} width={w || 40} height={hh || 16}>
      <div style={{ fontSize: 11, color: color || C.text, textAlign: "center", lineHeight: 1.2 }}>{children}</div>
    </foreignObject>
  );

  // STEP 1 DIAGRAM: the 17 terms laid out as a grid, showing the arithmetic progression visually.
  const sequenceDiagram = (() => {
    const pW = 300, pH = 130;
    const cols = 9;
    const cellW = 28, cellH = 22, gap = 4;
    const startX = (pW - (cols * cellW + (cols - 1) * gap)) / 2;
    const startY = 34;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>All 17 terms, step 3 apart</span></FO>
        {SEQ.map((t, i) => {
          const r = Math.floor(i / cols), c = i % cols;
          const x = startX + c * (cellW + gap);
          const y = startY + r * (cellH + gap);
          return (
            <g key={t}>
              <rect x={x} y={y} width={cellW} height={cellH} rx={4} fill={C.ps + "15"} stroke={C.ps + "66"} strokeWidth={0.8} />
              <FO x={x} y={y + 4} w={cellW} hh={cellH} color={C.ps}><span style={{ fontSize: 11, fontWeight: 600 }}>{t}</span></FO>
            </g>
          );
        })}
      </svg>
    );
  })();

  // STEP 2 DIAGRAM: simple list of pairs and singleton, no "pick ≤ 1" annotations (that's step 3 content).
  const pairListDiagram = (() => {
    const pW = 300, pH = 230;
    const rowH = 22, y0 = 20;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={4} w={pW - 20} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Pairs summing to 52</span></FO>
        {PAIRS.map(([a, b], i) => {
          const y = y0 + i * rowH;
          return (
            <g key={i}>
              <rect x={10} y={y} width={pW - 20} height={rowH - 4} rx={4} fill={C.ps + "10"} stroke={C.ps + "44"} strokeWidth={0.6} />
              <FO x={20} y={y + 3} w={50} hh={16} color={C.ok}><Tex>{String(a)}</Tex></FO>
              <FO x={74} y={y + 3} w={14} hh={16} color={C.muted}><span style={{ fontSize: 11 }}>+</span></FO>
              <FO x={92} y={y + 3} w={50} hh={16} color={C.ok}><Tex>{String(b)}</Tex></FO>
              <FO x={146} y={y + 3} w={14} hh={16} color={C.muted}><span style={{ fontSize: 11 }}>=</span></FO>
              <FO x={164} y={y + 3} w={40} hh={16} color={C.assum}><Tex>{"52"}</Tex></FO>
            </g>
          );
        })}
        {/* Singleton */}
        <g>
          <rect x={10} y={y0 + 8 * rowH} width={pW - 20} height={rowH - 4} rx={4} fill={C.assum + "10"} stroke={C.assum + "66"} strokeWidth={0.7} />
          <FO x={20} y={y0 + 8 * rowH + 3} w={50} hh={16} color={C.assum}><Tex>{"26"}</Tex></FO>
          <FO x={74} y={y0 + 8 * rowH + 3} w={pW - 90} hh={16} color={C.muted}><span style={{ fontSize: 11 }}>singleton (pairs only with itself)</span></FO>
        </g>
      </svg>
    );
  })();

  // STEP 3 DIAGRAM: same pair list but now one element per pair is highlighted green as "picked",
  // and "pick ≤ 1" annotations added: this visualises the max pair-free selection strategy.
  const pairFreeDiagram = (() => {
    const pW = 300, pH = 250;
    const rowH = 22, y0 = 20;
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={4} w={pW - 20} hh={14} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>Pick ≤ 1 from each row: 9 total</span></FO>
        {PAIRS.map(([a, b], i) => {
          const y = y0 + i * rowH;
          return (
            <g key={i}>
              <rect x={10} y={y} width={pW - 20} height={rowH - 4} rx={4} fill={C.ps + "10"} stroke={C.ps + "44"} strokeWidth={0.6} />
              {/* Highlight "a" as the pick (green filled circle behind the number) */}
              <circle cx={28} cy={y + 11} r={10} fill={C.ok + "33"} stroke={C.ok} strokeWidth={1.2} />
              <FO x={20} y={y + 3} w={16} hh={16} color={C.ok}><span style={{ fontSize: 11, fontWeight: 700 }}>{a}</span></FO>
              <FO x={50} y={y + 3} w={40} hh={16} color={C.muted}><span style={{ fontSize: 11 }}>or {b}</span></FO>
              <FO x={pW - 90} y={y + 3} w={80} hh={16} color={C.ok}><span style={{ fontSize: 11, fontWeight: 600 }}>pick ≤ 1 ✓</span></FO>
            </g>
          );
        })}
        {/* Singleton 26: always pickable */}
        <g>
          <rect x={10} y={y0 + 8 * rowH} width={pW - 20} height={rowH - 4} rx={4} fill={C.assum + "10"} stroke={C.assum + "66"} strokeWidth={0.7} />
          <circle cx={28} cy={y0 + 8 * rowH + 11} r={10} fill={C.ok + "33"} stroke={C.ok} strokeWidth={1.2} />
          <FO x={20} y={y0 + 8 * rowH + 3} w={16} hh={16} color={C.ok}><span style={{ fontSize: 11, fontWeight: 700 }}>26</span></FO>
          <FO x={50} y={y0 + 8 * rowH + 3} w={80} hh={16} color={C.muted}><span style={{ fontSize: 11 }}>singleton</span></FO>
          <FO x={pW - 90} y={y0 + 8 * rowH + 3} w={80} hh={16} color={C.ok}><span style={{ fontSize: 11, fontWeight: 600 }}>always pick ✓</span></FO>
        </g>
        <FO x={10} y={y0 + 9 * rowH + 10} w={pW - 20} hh={18} color={C.ok}><span style={{ fontSize: 12, fontWeight: 700 }}>Total pair-free: 8 + 1 = 9</span></FO>
      </svg>
    );
  })();

  // STEP 4 DIAGRAM: pigeonhole visualisation: 9 slots (8 pair-slots + 1 singleton slot),
  // trying to place 10 balls. One slot must get 2 balls, triggering (*).
  const pigeonholeDiagram = (() => {
    const pW = 300, pH = 180;
    const slotCount = 9;
    const slotW = 24, slotH = 28, gap = 5;
    const rowW = slotCount * slotW + (slotCount - 1) * gap;
    const startX = (pW - rowW) / 2;
    const slotY = 66;
    const ballRadius = 6;
    // 10 balls: slots 0-8 each get 1 ball, slot 0 gets an extra
    return (
      <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", width: "100%" }}>
        <FO x={10} y={8} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11, fontWeight: 700 }}>10 balls into 9 slots</span></FO>
        <FO x={10} y={28} w={pW - 20} hh={16} color={C.muted}><span style={{ fontSize: 11 }}>slots: 8 pairs + 1 singleton</span></FO>
        {/* Slots */}
        {Array.from({ length: slotCount }).map((_, i) => {
          const x = startX + i * (slotW + gap);
          const isOverfull = i === 0;
          return (
            <g key={i}>
              <rect x={x} y={slotY} width={slotW} height={slotH} rx={3} fill={isOverfull ? C.fail + "18" : C.ps + "12"} stroke={isOverfull ? C.fail : C.ps + "66"} strokeWidth={isOverfull ? 1.5 : 0.8} />
              {/* One ball (centered) */}
              <circle cx={x + slotW / 2} cy={slotY + slotH / 2 - (isOverfull ? 5 : 0)} r={ballRadius} fill={C.ok} stroke={C.white} strokeWidth={0.5} />
              {/* For overfull slot, an extra ball below */}
              {isOverfull && <circle cx={x + slotW / 2} cy={slotY + slotH / 2 + 5} r={ballRadius} fill={C.fail} stroke={C.white} strokeWidth={0.5} />}
              <FO x={x - 2} y={slotY + slotH + 2} w={slotW + 4} hh={14} color={i < 8 ? C.ps : C.assum}><span style={{ fontSize: 11 }}>{i < 8 ? `P${i + 1}` : "26"}</span></FO>
            </g>
          );
        })}
        <FO x={10} y={slotY + slotH + 24} w={pW - 20} hh={16} color={C.fail}><span style={{ fontSize: 11, fontWeight: 700 }}>Overfull slot forces a pair → (*) is true</span></FO>
      </svg>
    );
  })();

  const solveSteps = [
    { label: "LIST THE SEQUENCE", color: C.ps, text: <span>The sequence is arithmetic with first term <Tex>{"2"}</Tex> and common difference <Tex>{"3"}</Tex>. The general term is <Tex>{"2 + 3k"}</Tex>, and <Tex>{"2 + 3k = 50"}</Tex> gives <Tex>{"k = 16"}</Tex>, so there are <Tex>{"17"}</Tex> terms in total.</span>, math: (<><div><Tex>{"a_k = 2 + 3k, \\quad k = 0, 1, \\ldots, 16"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Total terms: } 17"}</Tex></div></>), diagram: sequenceDiagram },
    { label: "FIND PAIRS SUMMING TO 52", color: C.ok, text: <span>For each term <Tex>{"a"}</Tex>, check if <Tex>{"52 - a"}</Tex> is also in the sequence and distinct from <Tex>{"a"}</Tex>. The pairs are <Tex>{"\\{2, 50\\}"}</Tex>, <Tex>{"\\{5, 47\\}"}</Tex>, <Tex>{"\\{8, 44\\}"}</Tex>, <Tex>{"\\{11, 41\\}"}</Tex>, <Tex>{"\\{14, 38\\}"}</Tex>, <Tex>{"\\{17, 35\\}"}</Tex>, <Tex>{"\\{20, 32\\}"}</Tex>, <Tex>{"\\{23, 29\\}"}</Tex>: 8 pairs in total. The term <Tex>{"26"}</Tex> only pairs with itself (<Tex>{"26+26=52"}</Tex>), so it's a singleton that can never contribute to (*) on its own.</span>, math: (<><div><Tex>{"8 \\text{ pairs} + 1 \\text{ singleton (26)}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Covers all } 8 \\cdot 2 + 1 = 17 \\text{ terms}"}</Tex></div></>), diagram: pairListDiagram },
    { label: "MAX PAIR-FREE SELECTION", color: C.calc, text: <span>A "pair-free" selection avoids picking both elements of any pair. From each of the 8 pairs pick at most 1 element, and freely include the singleton 26.</span>, math: (<><div><Tex>{"\\text{max pair-free size} = 8 + 1 = 9"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"\\text{Example: } \\{2, 5, 8, 11, 14, 17, 20, 23, 26\\}"}</Tex></div></>), diagram: pairFreeDiagram },
    { label: "APPLY PIGEONHOLE", color: C.ok, text: <span>With <Tex>{"n = 9"}</Tex> you can still avoid (*). With <Tex>{"n = 10"}</Tex>, you've picked 10 terms from only 9 "slots" (8 pairs + 1 singleton), so pigeonhole forces at least one pair to be picked fully. That pair sums to 52, making (*) true.</span>, math: (<><div><Tex>{"n = 9 \\Rightarrow \\text{can still avoid}"}</Tex></div><div style={{ marginTop: 4 }}><Tex>{"n = 10 \\Rightarrow (*) \\text{ is forced}"}</Tex></div></>), diagram: pigeonholeDiagram },
    // Step 5 (CONCLUSION): opt out: any diagram here would duplicate step 4's pigeonhole message.
    { label: "CONCLUSION", color: C.ok, text: <span>Smallest <Tex>{"n"}</Tex> for which (*) is necessarily true is <Tex>{"\\mathbf{10}"}</Tex>.</span>, math: (<div><Tex>{"\\color{#55efc4}{n = 10}"}</Tex></div>), conclusion: <span>The answer is C: 10.</span> },
  ];
  return (<div><QuestionSummary /><div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 14 }}>{solveSteps.map((s, i) => { if (i > revealed) return null; return (<div key={i} style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color }}>{i + 1}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div><p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{s.text}</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}><MathBox style={{ flex: "1 1 220px", alignSelf: "flex-start" }}>{s.math}</MathBox>{s.diagram && <div style={{ flex: "0 0 300px", alignSelf: "flex-start", background: "#1e2030", border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>{s.diagram}</div>}</div>{i === solveSteps.length - 1 && s.conclusion && (<div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: C.conclBg, border: `1px solid ${C.ok}44`, fontSize: 14, color: C.ok, fontWeight: 600 }}>{s.conclusion}</div>)}</div></div>{i < revealed && i < solveSteps.length - 1 && <div style={{ marginLeft: 13, width: 2, height: 10, background: C.border }} />}</div>); })}{revealed < solveSteps.length - 1 && (<button onClick={() => setRevealed(p => p + 1)} style={{ marginTop: 2, padding: "10px 20px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.accent},${C.accentLight})`, color: C.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginLeft: 38 }}>Reveal next step {"→"}</button>)}</div></div>);
}

function VerifyStepContent() {
  // Student clicks terms from the sequence to build a selection S. Live check: is there a pair in S summing to 52?
  const [selected, setSelected] = useState(new Set());
  // Progress flags: has the student DEMONSTRATED each half of the argument?
  const [sawPairFree9, setSawPairFree9] = useState(false);   // reached n=9 with (*) still false
  const [sawForcedPair, setSawForcedPair] = useState(false); // reached n>=10 where (*) necessarily holds

  const toggle = (t) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t); else next.add(t);
      return next;
    });
  };
  const clear = () => setSelected(new Set());

  const selectedArr = [...selected];
  const n = selectedArr.length;

  // Find pairs within selected
  const pairsInS = [];
  for (let i = 0; i < selectedArr.length; i++) {
    for (let j = i + 1; j < selectedArr.length; j++) {
      if (selectedArr[i] + selectedArr[j] === 52) pairsInS.push([selectedArr[i], selectedArr[j]]);
    }
  }
  const starHolds = pairsInS.length > 0;

  // Update progress flags whenever the selection changes
  useEffect(() => {
    if (n === 9 && !starHolds) setSawPairFree9(true);
    if (n >= 10 && starHolds) setSawForcedPair(true);
  }, [n, starHolds]);

  const bothDemonstrated = sawPairFree9 && sawForcedPair;

  // Preset selections
  const presets = [
    { name: "n = 9 pair-free example", set: [2, 5, 8, 11, 14, 17, 20, 23, 26] },
    { name: "n = 10 first 10 terms", set: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29] },
    { name: "clear", set: [] },
  ];
  const applyPreset = (pr) => setSelected(new Set(pr.set));

  // Term buttons: 17 of them
  const termColor = (t) => {
    if (!selected.has(t)) return { bg: C.card, border: C.border, text: C.muted };
    // Is this term part of a pair in S?
    const partner = 52 - t;
    if (partner !== t && selected.has(partner)) return { bg: C.fail + "22", border: C.fail, text: C.fail };
    return { bg: C.calc + "15", border: C.calc, text: C.calc };
  };

  return (
    <div>
      <QuestionSummary />
      {/* Explicit guidance */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", marginBottom: 5 }}>
        <p style={{ margin: 0, fontSize: 13, color: C.text, lineHeight: 1.5 }}>Click terms to add them to <Tex>{"S"}</Tex>. Watch the status: once any two selected terms sum to <Tex>{"52"}</Tex>, (*) is true for that selection. The goal: find the largest <Tex>{"n"}</Tex> for which you can still make (*) FALSE. Then the smallest <Tex>{"n"}</Tex> forcing (*) is that plus 1.</p>
      </div>
      {/* Preset buttons */}
      <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
        {presets.map((pr, i) => (
          <button key={i} onClick={() => (pr.name === "clear" ? clear() : applyPreset(pr))} style={{ flex: 1, padding: "6px 8px", borderRadius: 6, border: `1px solid ${C.border}`, background: C.card, color: C.muted, fontSize: 12, cursor: "pointer", fontWeight: 500 }}>
            {pr.name}
          </button>
        ))}
      </div>
      {/* Term grid */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", marginBottom: 5 }}>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, fontWeight: 700 }}>Click to toggle selection</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 4 }}>
          {SEQ.map(t => {
            const { bg, border, text } = termColor(t);
            return (
              <button key={t} onClick={() => toggle(t)} style={{ padding: "8px 4px", borderRadius: 6, border: `1.5px solid ${border}`, background: bg, color: text, fontSize: 13, fontWeight: selected.has(t) ? 700 : 500, cursor: "pointer" }}>
                <Tex>{String(t)}</Tex>
              </button>
            );
          })}
        </div>
      </div>
      {/* Status panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 5 }}>
        <div style={{ background: C.card, border: `1px solid ${C.calc}44`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.calc, fontWeight: 700 }}>size</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.calc }}><Tex>{`n = ${n}`}</Tex></div>
        </div>
        <div style={{ background: starHolds ? C.failBg : C.conclBg, border: `1px solid ${(starHolds ? C.fail : C.ok) + "44"}`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: starHolds ? C.fail : C.ok, fontWeight: 700 }}>(*) holds?</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: starHolds ? C.fail : C.ok }}>{starHolds ? "YES" : "NO"}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${(starHolds ? C.fail : C.ok) + "44"}`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: starHolds ? C.fail : C.ok, fontWeight: 700 }}>pairs in S</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: starHolds ? C.fail : C.ok }}>{pairsInS.length}</div>
        </div>
      </div>
      {/* If pairs found, show them */}
      {pairsInS.length > 0 && (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 8, padding: "6px 10px", marginBottom: 5 }}>
          <span style={{ fontSize: 12, color: C.fail, fontWeight: 600 }}>Pair(s) summing to 52: </span>
          {pairsInS.map(([a, b], i) => (<span key={i} style={{ fontSize: 12, color: C.fail, fontWeight: 700, marginLeft: 6 }}><Tex>{`${a} + ${b}`}</Tex></span>))}
        </div>
      )}
      {/* Status message: reflects current selection */}
      {n < 10 && !starHolds ? (
        <div style={{ background: C.conclBg, border: `1px solid ${C.ok}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ok, lineHeight: 1.5 }}>This selection has <Tex>{`n = ${n}`}</Tex> terms and (*) is FALSE.</div>
          <div style={{ fontSize: 12, color: C.ok, marginTop: 2 }}>So <Tex>{`n = ${n}`}</Tex> is not yet forcing (*). {n < 9 ? "Keep adding terms." : "Try adding one more term to see what happens."}</div>
        </div>
      ) : n >= 10 && !starHolds ? (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.fail, lineHeight: 1.5 }}>Impossible! With <Tex>{`n = ${n} \\ge 10`}</Tex> you should have at least one pair.</div>
          <div style={{ fontSize: 12, color: C.fail, marginTop: 2 }}>(If you see this, there's a bug.)</div>
        </div>
      ) : (
        <div style={{ background: C.failBg, border: `1px solid ${C.fail}55`, borderRadius: 8, padding: "8px 12px", textAlign: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.fail, lineHeight: 1.5 }}>(*) is TRUE for this selection (<Tex>{`n = ${n}`}</Tex>).</div>
          <div style={{ fontSize: 12, color: C.fail, marginTop: 2 }}>{n < 10 ? "Can you remove a term to make (*) false? Try for n = 9 without any pair summing to 52." : "At n = 10 or more, you can't avoid a pair: pigeonhole at work."}</div>
        </div>
      )}
      {/* Progress tracker: demonstrates both halves of the argument */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Argument progress</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawPairFree9 ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawPairFree9} />
            <span style={{ fontWeight: sawPairFree9 ? 700 : 500 }}>Reached <Tex>{"n = 9"}</Tex> with (*) still false. <span style={{ color: C.muted, fontWeight: 500 }}>(Shows 9 is not yet forcing.)</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sawForcedPair ? C.accentLight : C.muted }}>
            <ProgressCheck done={sawForcedPair} />
            <span style={{ fontWeight: sawForcedPair ? 700 : 500 }}>Reached <Tex>{"n \\ge 10"}</Tex> where (*) becomes true. <span style={{ color: C.muted, fontWeight: 500 }}>(Shows 10 forces it.)</span></span>
          </div>
        </div>
        {bothDemonstrated ? (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.ok}44` }}>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, textAlign: "center" }}>Only 9 "slots" exist that avoid forcing a pair: the 8 pairs (one element each) and the singleton 26. Pick a 10th term and pigeonhole forces you to fill some pair completely, triggering (*).</div>
            <div style={{ marginTop: 6, fontSize: 13, color: C.ok, fontWeight: 700, textAlign: "center" }}>Therefore the correct answer is C: the smallest <Tex>{"n"}</Tex> forcing (*) is 10.</div>
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
