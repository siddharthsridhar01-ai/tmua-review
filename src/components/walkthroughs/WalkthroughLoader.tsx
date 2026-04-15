"use client";

import dynamic from "next/dynamic";
import { C } from "@/lib/tmua";

function LoadingState() {
  return (
    <div style={{
      background: C.card,
      border: "1px solid " + C.border,
      borderRadius: 16,
      padding: "60px 28px",
      textAlign: "center" as const,
    }}>
      <div style={{
        width: 32, height: 32,
        border: "3px solid " + C.border,
        borderTopColor: C.accent,
        borderRadius: "50%",
        margin: "0 auto 16px",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Loading walkthrough...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const L = () => <LoadingState />;

const walkthroughMap: Record<string, Record<number, any>> = {
  "tmua-2026mock": {
    1: dynamic(() => import("./tmua-2026mock/tmua-q1"), { loading: L }),
    2: dynamic(() => import("./tmua-2026mock/tmua-q2"), { loading: L }),
    3: dynamic(() => import("./tmua-2026mock/tmua-q3"), { loading: L }),
    4: dynamic(() => import("./tmua-2026mock/tmua-q4"), { loading: L }),
    5: dynamic(() => import("./tmua-2026mock/tmua-q5"), { loading: L }),
    6: dynamic(() => import("./tmua-2026mock/tmua-q6"), { loading: L }),
    7: dynamic(() => import("./tmua-2026mock/tmua-q7"), { loading: L }),
    8: dynamic(() => import("./tmua-2026mock/tmua-q8"), { loading: L }),
    9: dynamic(() => import("./tmua-2026mock/tmua-q9"), { loading: L }),
    10: dynamic(() => import("./tmua-2026mock/tmua-q10"), { loading: L }),
    11: dynamic(() => import("./tmua-2026mock/tmua-q11"), { loading: L }),
    12: dynamic(() => import("./tmua-2026mock/tmua-q12"), { loading: L }),
    13: dynamic(() => import("./tmua-2026mock/tmua-q13"), { loading: L }),
    14: dynamic(() => import("./tmua-2026mock/tmua-q14"), { loading: L }),
    15: dynamic(() => import("./tmua-2026mock/tmua-q15"), { loading: L }),
    16: dynamic(() => import("./tmua-2026mock/tmua-q16"), { loading: L }),
    17: dynamic(() => import("./tmua-2026mock/tmua-q17"), { loading: L }),
    18: dynamic(() => import("./tmua-2026mock/tmua-q18"), { loading: L }),
    19: dynamic(() => import("./tmua-2026mock/tmua-q19"), { loading: L }),
    20: dynamic(() => import("./tmua-2026mock/tmua-q20"), { loading: L }),
  },
  "tmua-2026mockB": {
    1: dynamic(() => import("./tmua-2026mockB/tmua-q1"), { loading: L }),
    2: dynamic(() => import("./tmua-2026mockB/tmua-q2"), { loading: L }),
    3: dynamic(() => import("./tmua-2026mockB/tmua-q3"), { loading: L }),
    4: dynamic(() => import("./tmua-2026mockB/tmua-q4"), { loading: L }),
    5: dynamic(() => import("./tmua-2026mockB/tmua-q5"), { loading: L }),
    6: dynamic(() => import("./tmua-2026mockB/tmua-q6"), { loading: L }),
    7: dynamic(() => import("./tmua-2026mockB/tmua-q7"), { loading: L }),
    8: dynamic(() => import("./tmua-2026mockB/tmua-q8"), { loading: L }),
    9: dynamic(() => import("./tmua-2026mockB/tmua-q9"), { loading: L }),
    10: dynamic(() => import("./tmua-2026mockB/tmua-q10"), { loading: L }),
    11: dynamic(() => import("./tmua-2026mockB/tmua-q11"), { loading: L }),
    12: dynamic(() => import("./tmua-2026mockB/tmua-q12"), { loading: L }),
    13: dynamic(() => import("./tmua-2026mockB/tmua-q13"), { loading: L }),
    14: dynamic(() => import("./tmua-2026mockB/tmua-q14"), { loading: L }),
    15: dynamic(() => import("./tmua-2026mockB/tmua-q15"), { loading: L }),
    16: dynamic(() => import("./tmua-2026mockB/tmua-q16"), { loading: L }),
    17: dynamic(() => import("./tmua-2026mockB/tmua-q17"), { loading: L }),
    18: dynamic(() => import("./tmua-2026mockB/tmua-q18"), { loading: L }),
    19: dynamic(() => import("./tmua-2026mockB/tmua-q19"), { loading: L }),
    20: dynamic(() => import("./tmua-2026mockB/tmua-q20"), { loading: L }),
  },
};

export default function WalkthroughLoader({ paperId, displayNum }: { paperId: string; displayNum: number }) {
  const paper = walkthroughMap[paperId];

  if (!paper) {
    return (
      <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 16, padding: "40px 28px", textAlign: "center" as const }}>
        <p style={{ fontSize: 14, color: C.fail, margin: 0 }}>Paper not found.</p>
      </div>
    );
  }

  const Component = paper[displayNum];

  if (!Component) {
    return (
      <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 16, padding: "40px 28px", textAlign: "center" as const }}>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Walkthrough not yet available for this question.</p>
      </div>
    );
  }

  return <Component />;
}
