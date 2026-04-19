export const C = {
  bg: "#0f1117",
  card: "#1a1d27",
  border: "#2a2d3a",
  accent: "#6c5ce7",
  accentLight: "#a29bfe",
  concl: "#55efc4",
  conclBg: "rgba(85,239,196,0.10)",
  prem: "#74b9ff",
  premBg: "rgba(116,185,255,0.10)",
  assum: "#fdcb6e",
  assumBg: "rgba(253,203,110,0.12)",
  ok: "#55efc4",
  fail: "#ff7675",
  failBg: "rgba(255,118,117,0.10)",
  flaw: "#fd79a8",
  flawBg: "rgba(253,121,168,0.10)",
  ctx: "#c09875",
  ctxBg: "rgba(192,152,117,0.10)",
  vocab: "#ffeaa7",
  text: "#e2e2e8",
  muted: "#8b8d9a",
  white: "#fff",
  ps: "#74b9ff",
  psBg: "rgba(116,185,255,0.10)",
  calc: "#fdcb6e",
};

export const topicColors: Record<string, string> = {
  "Algebra": "#74b9ff",
  "Calculus": "#a29bfe",
  "Trigonometry": "#fdcb6e",
  "Sequences & Series": "#55efc4",
  "Geometry": "#fd79a8",
  "Probability": "#e17055",
  "Optimisation": "#00b894",
  "Logarithms": "#ffeaa7",
  "Differential Equations": "#c09875",
  "Number Theory": "#636e72",
  "Logic & Reasoning": "#e84393",
};

export interface Question {
  displayNum: number;
  topic: string;
  text: string;
  /** Rich text segments: string = text, {tex} = inline math, {display} = display math box, "br" = line break, {items} = labelled list, {diagram} = inline diagram placeholder */
  richText?: (string | { tex: string } | { display: string } | { items: { label: string; tex: string }[] } | { diagram: true } | "br")[];
  correctAnswer: string;
  options: { letter: string; tex: string }[];
  hasWalkthrough: boolean;
  /** If true, a diagram component exists in QuestionDiagrams for this question */
  hasDiagram?: boolean;
}

export function getResult(q: Question, answers: Record<number, string>): "correct" | "incorrect" | "unanswered" {
  const sa = answers[q.displayNum];
  if (!sa) return "unanswered";
  return sa === q.correctAnswer ? "correct" : "incorrect";
}
