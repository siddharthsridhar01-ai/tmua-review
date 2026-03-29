"use client";

import { C } from "@/lib/tmua";

const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";

/**
 * Question diagram registry.
 * Each diagram matches the visual from its walkthrough ReadStep exactly.
 * Add new entries here when a question needs a visual in the exam/review.
 */

function Q17Diagram({ theme }: { theme?: "dark" | "light" }) {
  const isDark = theme !== "light";
  const bg = isDark ? C.bg : "#ffffff";
  const text = isDark ? C.text : "#333333";
  const muted = isDark ? C.muted : "#666666";

  const pW = 360, pH = 360;
  const cx = pW / 2, cy = pH / 2;
  const maxHalf = 150;
  const scale = maxHalf / 4;
  const sq = (n: number) => { const s = n * scale; return { x: cx - s, y: cy - s, w: 2 * s, h: 2 * s }; };
  const s1 = sq(1), s2 = sq(2), s3 = sq(3), s4 = sq(4);

  return (
    <svg viewBox={`0 0 ${pW} ${pH}`} width={pW} style={{ display: "block", margin: "0 auto", maxWidth: 320 }}>
      {/* Coordinate axes */}
      <line x1={20} y1={cy} x2={pW - 20} y2={cy} stroke={muted + "55"} strokeWidth={0.7} />
      <line x1={cx} y1={20} x2={cx} y2={pH - 20} stroke={muted + "55"} strokeWidth={0.7} />
      <text x={pW - 16} y={cy - 6} textAnchor="end" fill={muted} fontSize={11} fontFamily={mathFont}>x</text>
      <text x={cx + 6} y={24} textAnchor="start" fill={muted} fontSize={11} fontFamily={mathFont}>y</text>
      {/* Shaded band 2: S3 to S4 */}
      <rect x={s4.x} y={s4.y} width={s4.w} height={s4.h} fill={muted + "18"} stroke="none" />
      <rect x={s3.x} y={s3.y} width={s3.w} height={s3.h} fill={bg} stroke="none" />
      {/* Shaded band 1: S1 to S2 */}
      <rect x={s2.x} y={s2.y} width={s2.w} height={s2.h} fill={muted + "18"} stroke="none" />
      <rect x={s1.x} y={s1.y} width={s1.w} height={s1.h} fill={bg} stroke="none" />
      {/* Outlines */}
      <rect x={s1.x} y={s1.y} width={s1.w} height={s1.h} fill="none" stroke={text} strokeWidth={1} />
      <rect x={s2.x} y={s2.y} width={s2.w} height={s2.h} fill="none" stroke={text} strokeWidth={1.2} />
      <rect x={s3.x} y={s3.y} width={s3.w} height={s3.h} fill="none" stroke={text} strokeWidth={1} />
      <rect x={s4.x} y={s4.y} width={s4.w} height={s4.h} fill="none" stroke={text} strokeWidth={1.2} />
      {/* Labels */}
      <text x={s1.x + s1.w + 4} y={s1.y + 12} textAnchor="start" fill={text} fontSize={13} fontFamily={mathFont} fontStyle="italic">S{"\u2081"}</text>
      <text x={s2.x + s2.w + 4} y={s2.y + 12} textAnchor="start" fill={text} fontSize={13} fontFamily={mathFont} fontStyle="italic">S{"\u2082"}</text>
      <text x={s3.x + s3.w + 4} y={s3.y + 12} textAnchor="start" fill={text} fontSize={13} fontFamily={mathFont} fontStyle="italic">S{"\u2083"}</text>
      <text x={s4.x + s4.w + 4} y={s4.y + 12} textAnchor="start" fill={text} fontSize={13} fontFamily={mathFont} fontStyle="italic">S{"\u2084"}</text>
    </svg>
  );
}

const diagramRegistry: Record<string, Record<number, React.FC<{ theme?: "dark" | "light" }>>> = {
  "tmua-2026mock": {
    17: Q17Diagram,
  },
};

export default function QuestionDiagram({ paperId, displayNum, theme }: { paperId: string; displayNum: number; theme?: "dark" | "light" }) {
  const paper = diagramRegistry[paperId];
  if (!paper) return null;
  const Diagram = paper[displayNum];
  if (!Diagram) return null;
  return (
    <div style={{ margin: "12px 0" }}>
      <Diagram theme={theme} />
    </div>
  );
}