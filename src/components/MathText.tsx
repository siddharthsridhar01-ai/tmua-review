"use client";

import { useEffect, useRef, useState } from "react";

const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";

let katexLoadPromise: Promise<void> | null = null;

function loadKaTeX(): Promise<void> {
  if ((window as any).katex) return Promise.resolve();
  if (katexLoadPromise) return katexLoadPromise;
  katexLoadPromise = new Promise((resolve) => {
    if (!document.getElementById("katex-css")) {
      const link = document.createElement("link");
      link.id = "katex-css";
      link.rel = "stylesheet";
      link.href = KATEX_CSS;
      document.head.appendChild(link);
      const fix = document.createElement("style");
      fix.id = "katex-fix";
      fix.textContent = ".katex { font-size: 1.05em; }";
      document.head.appendChild(fix);
    }
    const script = document.createElement("script");
    script.src = KATEX_JS;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
  return katexLoadPromise;
}

export function Tex({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(!!(window as any).katex);

  useEffect(() => {
    if (!ready) loadKaTeX().then(() => setReady(true));
  }, [ready]);

  useEffect(() => {
    if (ready && ref.current && (window as any).katex) {
      try {
        (window as any).katex.render(String(children), ref.current, {
          displayMode: false,
          throwOnError: false,
        });
      } catch {}
    }
  }, [ready, children]);

  if (!ready) return <span>{children}</span>;
  return <span ref={ref} />;
}
