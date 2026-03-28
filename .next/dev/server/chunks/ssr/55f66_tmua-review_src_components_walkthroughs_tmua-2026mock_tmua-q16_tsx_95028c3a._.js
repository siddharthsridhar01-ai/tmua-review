module.exports = [
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const C = {
    bg: "#0f1117",
    card: "#1a1d27",
    border: "#2a2d3a",
    accent: "#6c5ce7",
    accentLight: "#a29bfe",
    conclBg: "rgba(85,239,196,0.10)",
    ok: "#55efc4",
    fail: "#ff7675",
    failBg: "rgba(255,118,117,0.10)",
    assum: "#fdcb6e",
    assumBg: "rgba(253,203,110,0.12)",
    text: "#e2e2e8",
    muted: "#8b8d9a",
    white: "#fff",
    ps: "#74b9ff",
    psBg: "rgba(116,185,255,0.10)",
    calc: "#fdcb6e"
};
const mathFont = "'Cambria Math','Latin Modern Math','STIX Two Math',Georgia,serif";
const bodyFont = "'Trebuchet MS','Gill Sans',Calibri,sans-serif";
const titleFont = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const stepsMeta = [
    {
        id: 0,
        label: "Read",
        title: "Read the Question"
    },
    {
        id: 1,
        label: "Setup",
        title: "Identify the Approach"
    },
    {
        id: 2,
        label: "Solve",
        title: "Solve Step by Step"
    },
    {
        id: 3,
        label: "Verify (Optional)",
        title: "Verify Interactively (Optional)"
    },
    {
        id: 4,
        label: "Answer",
        title: "Select the Answer"
    }
];
const META = {
    questionNumber: 16,
    paper: "Paper 1",
    year: "2026 Mock",
    topicTag: "Quartic with Trig Substitution"
};
const fmt = (v, dp = 2)=>{
    const r = Math.round(v * 100) / 100;
    return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString();
};
const opts = [
    {
        letter: "A",
        tex: "8x^4 - 6x^2 + 1 = 0",
        text: "8x\u2074 \u2212 6x\u00B2 + 1 = 0",
        ok: true,
        expl: "Substitute cos\u00B2\u03B8 = 1 \u2212 sin\u00B2\u03B8 into 8cos\u2074\u03B8 \u2212 10cos\u00B2\u03B8 + 3 = 0. With s = sin\u00B2\u03B8, this gives 8s\u00B2 \u2212 6s + 1 = 0, i.e. 8x\u2074 \u2212 6x\u00B2 + 1 = 0 where x = sin\u03B8."
    },
    {
        letter: "B",
        tex: "8x^4 + 6x^2 - 1 = 0",
        text: "8x\u2074 + 6x\u00B2 \u2212 1 = 0",
        ok: false,
        expl: "You might get this by a sign error when expanding (1\u2212s)\u00B2. The correct expansion of 8(1\u22122s+s\u00B2) is 8\u221216s+8s\u00B2, not 8+16s+8s\u00B2."
    },
    {
        letter: "C",
        tex: "8x^4 - 10x^2 + 3 = 0",
        text: "8x\u2074 \u2212 10x\u00B2 + 3 = 0",
        ok: false,
        expl: "This is the original equation. It works if sin\u00B2 and cos\u00B2 values happen to coincide (which they do in this case as sets), but the substitution gives a different polynomial: 8x\u2074 \u2212 6x\u00B2 + 1 = 0."
    },
    {
        letter: "D",
        tex: "3x^4 - 10x^2 + 8 = 0",
        text: "3x\u2074 \u2212 10x\u00B2 + 8 = 0",
        ok: false,
        expl: "You might get this by simply reversing the coefficients of the original equation. But that gives a different quartic with different roots."
    },
    {
        letter: "E",
        tex: "3x^4 - 8x^2 + 3 = 0",
        text: "3x\u2074 \u2212 8x\u00B2 + 3 = 0",
        ok: false,
        expl: "This doesn't arise from the correct substitution. The correct expansion of 8(1\u2212s)\u00B2 \u2212 10(1\u2212s) + 3 gives 8s\u00B2 \u2212 6s + 1, not 3s\u00B2 \u2212 8s + 3."
    },
    {
        letter: "F",
        tex: "3x^4 + 8x^2 - 3 = 0",
        text: "3x\u2074 + 8x\u00B2 \u2212 3 = 0",
        ok: false,
        expl: "This has a positive x\u00B2 coefficient which would mean the quadratic in u = x\u00B2 has a negative root, giving no real solutions for x. The correct answer has all roots real."
    }
];
const KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
const KATEX_JS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
let katexLoadPromise = null;
function loadKaTeX() {
    if (window.katex) return Promise.resolve();
    if (katexLoadPromise) return katexLoadPromise;
    katexLoadPromise = new Promise((resolve)=>{
        if (!document.getElementById("katex-css")) {
            const link = document.createElement("link");
            link.id = "katex-css";
            link.rel = "stylesheet";
            link.href = KATEX_CSS;
            document.head.appendChild(link);
            if (!document.getElementById("katex-fix")) {
                const fix = document.createElement("style");
                fix.id = "katex-fix";
                fix.textContent = ".katex { font-size: 1.05em; }";
                document.head.appendChild(fix);
            }
        }
        const script = document.createElement("script");
        script.src = KATEX_JS;
        script.onload = resolve;
        document.head.appendChild(script);
    });
    return katexLoadPromise;
}
function Tex({ children, display }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!!window.katex);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ready) loadKaTeX().then(()=>setReady(true));
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (ready && ref.current && window.katex) {
            try {
                window.katex.render(String(children), ref.current, {
                    displayMode: !!display,
                    throwOnError: false
                });
            } catch  {}
        }
    }, [
        ready,
        children,
        display
    ]);
    if (!ready) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            fontFamily: mathFont
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 26,
        columnNumber: 428
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 26,
        columnNumber: 493
    }, this);
}
function QuestionSummary() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "#1e2030",
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "10px 16px",
            marginBottom: 12,
            textAlign: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    margin: "0 0 4px",
                    fontSize: 13,
                    color: C.muted,
                    lineHeight: 1.6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 700,
                            color: C.muted,
                            letterSpacing: 0.5,
                            marginRight: 6
                        },
                        children: "Q16"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    "The solutions to ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "8x^4 - 10x^2 + 3 = 0"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 33,
                        columnNumber: 26
                    }, this),
                    " are ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\pm\\cos\\alpha"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 33,
                        columnNumber: 66
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\pm\\cos\\beta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 33,
                        columnNumber: 102
                    }, this),
                    ". Which one of the following equations has solutions ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\pm\\sin\\alpha"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 33,
                        columnNumber: 185
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\pm\\sin\\beta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 33,
                        columnNumber: 221
                    }, this),
                    "?"
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.text,
                    flexWrap: "wrap",
                    marginTop: 4
                },
                children: [
                    [
                        "A",
                        "8x^4-6x^2+1=0"
                    ],
                    [
                        "B",
                        "8x^4+6x^2-1=0"
                    ],
                    [
                        "C",
                        "8x^4-10x^2+3=0"
                    ],
                    [
                        "D",
                        "3x^4-10x^2+8=0"
                    ],
                    [
                        "E",
                        "3x^4-8x^2+3=0"
                    ],
                    [
                        "F",
                        "3x^4+8x^2-3=0"
                    ]
                ].map(([l, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            l,
                            ": ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 36,
                                columnNumber: 180
                            }, this)
                        ]
                    }, l, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 36,
                        columnNumber: 161
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
function OptionCard({ o, expanded, animate, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        style: {
            background: expanded ? o.ok ? C.conclBg : C.failBg : C.card,
            border: `1px solid ${expanded ? (o.ok ? C.ok : C.fail) + "55" : C.border}`,
            borderLeft: expanded ? `4px solid ${o.ok ? C.ok : C.fail}` : `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "10px 14px",
            cursor: "pointer",
            transition: "all 0.3s",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(12px)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                alignItems: "center",
                gap: 10
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: expanded ? o.ok ? C.ok + "22" : C.fail + "22" : C.accent + "22",
                        border: `1.5px solid ${expanded ? o.ok ? C.ok : C.fail : C.accent}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        color: expanded ? o.ok ? C.ok : C.fail : C.accent,
                        flexShrink: 0
                    },
                    children: o.letter
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 41,
                    columnNumber: 557
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: 0,
                                fontSize: 14,
                                color: C.text
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: o.tex
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 41,
                                columnNumber: 1022
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 41,
                            columnNumber: 968
                        }, this),
                        expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 8,
                                padding: "8px 12px",
                                borderRadius: 8,
                                fontSize: 13,
                                lineHeight: 1.6,
                                background: o.ok ? C.conclBg : C.failBg,
                                color: o.ok ? C.ok : C.fail,
                                borderLeft: `3px solid ${o.ok ? C.ok : C.fail}`
                            },
                            children: [
                                o.ok ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: "CORRECT: "
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 41,
                                    columnNumber: 1284
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: "INCORRECT: "
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 41,
                                    columnNumber: 1337
                                }, this),
                                o.expl
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 41,
                            columnNumber: 1058
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 41,
                    columnNumber: 943
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
            lineNumber: 41,
            columnNumber: 493
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 41,
        columnNumber: 66
    }, this);
}
function InfoBox({ type, children }) {
    const config = {
        strategy: {
            color: C.ps,
            bg: C.psBg,
            label: "STRATEGY"
        },
        insight: {
            color: C.assum,
            bg: C.assumBg,
            label: "KEY INSIGHT"
        },
        hint: {
            color: C.assum,
            bg: C.assumBg,
            label: "HINT"
        }
    };
    const c = config[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: c.bg,
            border: `1px solid ${c.color}44`,
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 8
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        background: c.color + "22",
                        border: `1px solid ${c.color}`,
                        borderRadius: 6,
                        padding: "3px 9px",
                        fontSize: 12,
                        color: c.color,
                        fontWeight: 700,
                        whiteSpace: "nowrap"
                    },
                    children: c.label
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 42,
                    columnNumber: 430
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 42,
                columnNumber: 397
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: c.color,
                    fontSize: 14,
                    lineHeight: 1.6
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 42,
                columnNumber: 635
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 42,
        columnNumber: 271
    }, this);
}
function MathBox({ children, style: s }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "#1e2030",
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 15,
            color: C.white,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            ...s
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 43,
        columnNumber: 52
    }, this);
}
function ReadStep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: "18px 22px",
                    marginBottom: 14
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 12
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                background: C.accent + "22",
                                color: C.accent,
                                fontWeight: 700,
                                fontSize: 13,
                                padding: "3px 10px",
                                borderRadius: 6
                            },
                            children: "QUESTION 16"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 15.5,
                            lineHeight: 1.8,
                            color: C.text,
                            margin: "0 0 6px"
                        },
                        children: "The solutions to"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MathBox, {
                        style: {
                            fontSize: 17,
                            padding: "12px 18px",
                            margin: "8px 0"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "8x^4 - 10x^2 + 3 = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 53,
                            columnNumber: 82
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 15.5,
                            lineHeight: 1.8,
                            color: C.text,
                            margin: "6px 0 6px"
                        },
                        children: [
                            "are ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\pm\\cos\\alpha"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 54,
                                columnNumber: 96
                            }, this),
                            " and ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\pm\\cos\\beta."
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 54,
                                columnNumber: 132
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 15.5,
                            lineHeight: 1.8,
                            color: C.text,
                            margin: "0 0 10px"
                        },
                        children: [
                            "Which one of the following equations has solutions ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\pm\\sin\\alpha"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 55,
                                columnNumber: 142
                            }, this),
                            " and ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\pm\\sin\\beta"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 55,
                                columnNumber: 178
                            }, this),
                            "?"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 6,
                    marginBottom: 16
                },
                children: opts.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.card,
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                            padding: "8px 12px",
                            textAlign: "center",
                            fontSize: 14,
                            color: C.text
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 700,
                                    color: C.accent,
                                    marginRight: 6
                                },
                                children: o.letter
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 58,
                                columnNumber: 197
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: o.tex
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 58,
                                columnNumber: 281
                            }, this)
                        ]
                    }, o.letter, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 58,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
function SetupStep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                type: "strategy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        margin: 0
                    },
                    children: [
                        "The roots are ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x = \\cos\\theta"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 69,
                            columnNumber: 48
                        }, this),
                        ", so ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\cos^2\\theta"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 69,
                            columnNumber: 84
                        }, this),
                        " satisfies the quadratic ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "8u^2 - 10u + 3 = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 69,
                            columnNumber: 138
                        }, this),
                        ". To find the equation for ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\sin\\theta"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 69,
                            columnNumber: 198
                        }, this),
                        ", replace ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\cos^2\\theta"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 69,
                            columnNumber: 235
                        }, this),
                        " with ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "1 - \\sin^2\\theta"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 69,
                            columnNumber: 270
                        }, this),
                        " and simplify."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                type: "insight",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 4px"
                        },
                        children: [
                            "The key identity is ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\sin^2\\theta + \\cos^2\\theta = 1"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 72,
                                columnNumber: 62
                            }, this),
                            ", so ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\cos^2\\theta = 1 - \\sin^2\\theta"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 72,
                                columnNumber: 117
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "Since ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x = \\cos\\theta"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 73,
                                columnNumber: 40
                            }, this),
                            " satisfies ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "8x^4 - 10x^2 + 3 = 0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 73,
                                columnNumber: 82
                            }, this),
                            ", substitute ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x^2 = 1 - s"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 73,
                                columnNumber: 130
                            }, this),
                            " (where ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "s = \\sin^2\\theta"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 73,
                                columnNumber: 164
                            }, this),
                            ") and re-derive the polynomial in ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "s"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 73,
                                columnNumber: 231
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function SolveStepContent({ revealed, setRevealed }) {
    const solveSteps = [
        {
            label: "APPROACH",
            color: C.ps,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "The original equation holds when ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x = \\cos\\theta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 82,
                        columnNumber: 52
                    }, this),
                    ". Replace ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\cos^2\\theta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 82,
                        columnNumber: 93
                    }, this),
                    " by ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "1 - \\sin^2\\theta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 82,
                        columnNumber: 126
                    }, this),
                    " to find the equation that ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\sin\\theta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 82,
                        columnNumber: 186
                    }, this),
                    " satisfies."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 82,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\cos^2\\theta = 1 - \\sin^2\\theta \\quad \\Longrightarrow \\quad \\text{let } s = \\sin^2\\theta,\\; c = 1 - s"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 83,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 83,
                columnNumber: 14
            }, this)
        },
        {
            label: "WRITE THE ORIGINAL IN TERMS OF cos\u00B2\u03B8",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Since ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x = \\cos\\theta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 85,
                        columnNumber: 25
                    }, this),
                    ", we have ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x^2 = \\cos^2\\theta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 85,
                        columnNumber: 66
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x^4 = \\cos^4\\theta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 85,
                        columnNumber: 106
                    }, this),
                    ". The equation becomes:"
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "8\\cos^4\\theta - 10\\cos^2\\theta + 3 = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 86,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 86,
                        columnNumber: 16
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\text{Let } c = \\cos^2\\theta: \\quad 8c^2 - 10c + 3 = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 86,
                            columnNumber: 114
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 86,
                        columnNumber: 84
                    }, this)
                ]
            }, void 0, true)
        },
        {
            label: "SUBSTITUTE c = 1 \u2212 s",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Replace ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "c"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 88,
                        columnNumber: 27
                    }, this),
                    " with ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "1 - s"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 88,
                        columnNumber: 49
                    }, this),
                    " where ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "s = \\sin^2\\theta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 88,
                        columnNumber: 76
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "8(1-s)^2 - 10(1-s) + 3 = 0"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 89,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 89,
                    columnNumber: 16
                }, this)
            }, void 0, false)
        },
        {
            label: "EXPAND AND SIMPLIFY",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Expand ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "(1-s)^2 = 1 - 2s + s^2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 91,
                        columnNumber: 26
                    }, this),
                    " and collect terms."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 91,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "8(1 - 2s + s^2) - 10(1 - s) + 3 = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 92,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 92,
                        columnNumber: 16
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "8 - 16s + 8s^2 - 10 + 10s + 3 = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 92,
                            columnNumber: 107
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 92,
                        columnNumber: 77
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "8s^2 + (-16 + 10)s + (8 - 10 + 3) = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 92,
                            columnNumber: 191
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 92,
                        columnNumber: 161
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "8s^2 - 6s + 1 = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 92,
                            columnNumber: 279
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 92,
                        columnNumber: 249
                    }, this)
                ]
            }, void 0, true)
        },
        {
            label: "CONVERT BACK TO x",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Since ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "s = \\sin^2\\theta = x^2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 94,
                        columnNumber: 25
                    }, this),
                    " (where ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x = \\sin\\theta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 94,
                        columnNumber: 72
                    }, this),
                    "), replace ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "s"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 94,
                        columnNumber: 114
                    }, this),
                    " with ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x^2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 94,
                        columnNumber: 136
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "8(x^2)^2 - 6(x^2) + 1 = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 95,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 95,
                        columnNumber: 16
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\color{#fdcb6e}{8x^4 - 6x^2 + 1 = 0}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 95,
                            columnNumber: 97
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 95,
                        columnNumber: 67
                    }, this)
                ]
            }, void 0, true)
        },
        {
            label: "CONCLUSION",
            color: C.ok,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "The equation with solutions ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\pm\\sin\\alpha"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 97,
                        columnNumber: 47
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\pm\\sin\\beta"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 97,
                        columnNumber: 83
                    }, this),
                    " is ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "8x^4 - 6x^2 + 1 = 0"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 97,
                        columnNumber: 117
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 97,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\color{#55efc4}{8x^4 - 6x^2 + 1 = 0}"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 98,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 98,
                columnNumber: 14
            }, this),
            conclusion: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "The answer is A: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "8x^4 - 6x^2 + 1 = 0."
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 99,
                        columnNumber: 42
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 99,
                columnNumber: 19
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: "18px 20px",
                    marginBottom: 14
                },
                children: [
                    solveSteps.map((s, i)=>{
                        if (i > revealed) return null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 18
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 10,
                                        alignItems: "flex-start"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 28,
                                                height: 28,
                                                borderRadius: "50%",
                                                flexShrink: 0,
                                                background: s.color + "22",
                                                border: `2px solid ${s.color}`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: s.color
                                            },
                                            children: i + 1
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                            lineNumber: 105,
                                            columnNumber: 186
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: s.color,
                                                        marginBottom: 4,
                                                        textTransform: "uppercase",
                                                        letterSpacing: 0.5
                                                    },
                                                    children: s.label
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 471
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        margin: "0 0 6px",
                                                        fontSize: 14,
                                                        color: C.muted,
                                                        lineHeight: 1.6
                                                    },
                                                    children: s.text
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 614
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MathBox, {
                                                    children: s.math
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 706
                                                }, this),
                                                i === solveSteps.length - 1 && s.conclusion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: 8,
                                                        padding: "8px 12px",
                                                        borderRadius: 8,
                                                        background: C.conclBg,
                                                        border: `1px solid ${C.ok}44`,
                                                        fontSize: 14,
                                                        color: C.ok,
                                                        fontWeight: 600
                                                    },
                                                    children: s.conclusion
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 782
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                            lineNumber: 105,
                                            columnNumber: 446
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 105,
                                    columnNumber: 118
                                }, this),
                                i < revealed && i < solveSteps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginLeft: 13,
                                        width: 2,
                                        height: 10,
                                        background: C.border
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 105,
                                    columnNumber: 1028
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 105,
                            columnNumber: 76
                        }, this);
                    }),
                    revealed < solveSteps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setRevealed((p)=>p + 1),
                        style: {
                            marginTop: 2,
                            padding: "10px 20px",
                            borderRadius: 10,
                            border: "none",
                            background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
                            color: C.white,
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            marginLeft: 38
                        },
                        children: [
                            "Reveal next step ",
                            "\u2192"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 106,
                        columnNumber: 47
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
function VerifyStepContent() {
    const [theta, setTheta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0.5);
    const snapPoints = [
        Math.PI / 6,
        Math.PI / 4,
        Math.PI / 3
    ];
    const snapRadius = 0.06;
    const handleSlider = (raw)=>{
        for (const sp of snapPoints){
            if (Math.abs(raw - sp) < snapRadius) return sp;
        }
        return raw;
    };
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const origLHS = 8 * Math.pow(cosT, 4) - 10 * cosT * cosT + 3;
    const newLHS = 8 * Math.pow(sinT, 4) - 6 * sinT * sinT + 1;
    const isOrigZero = Math.abs(origLHS) < 0.1;
    const isNewZero = Math.abs(newLHS) < 0.1;
    const isBothZero = isOrigZero && isNewZero;
    const isExact = Math.abs(theta - Math.PI / 6) < 0.005 || Math.abs(theta - Math.PI / 3) < 0.005;
    const isNear = !isExact && isBothZero;
    const isHit = isExact || isNear;
    const col = isExact ? C.ok : isNear ? C.assum : C.ps;
    // Exact value lookup for known presets
    const atPi6 = Math.abs(theta - Math.PI / 6) < 0.01;
    const atPi4 = Math.abs(theta - Math.PI / 4) < 0.01;
    const atPi3 = Math.abs(theta - Math.PI / 3) < 0.01;
    const exactCos = atPi6 ? "\\tfrac{\\sqrt{3}}{2}" : atPi4 ? "\\tfrac{\\sqrt{2}}{2}" : atPi3 ? "\\tfrac{1}{2}" : null;
    const exactSin = atPi6 ? "\\tfrac{1}{2}" : atPi4 ? "\\tfrac{\\sqrt{2}}{2}" : atPi3 ? "\\tfrac{\\sqrt{3}}{2}" : null;
    const exactTheta = atPi6 ? "\\tfrac{\\pi}{6}" : atPi4 ? "\\tfrac{\\pi}{4}" : atPi3 ? "\\tfrac{\\pi}{3}" : null;
    const presets = [
        {
            label: "pi6",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\theta = \\tfrac{\\pi}{6}"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 140,
                    columnNumber: 32
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 140,
                columnNumber: 26
            }, this),
            val: Math.PI / 6
        },
        {
            label: "pi4",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\theta = \\tfrac{\\pi}{4}"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 141,
                    columnNumber: 32
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 141,
                columnNumber: 26
            }, this),
            val: Math.PI / 4
        },
        {
            label: "pi3",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\theta = \\tfrac{\\pi}{3}"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 142,
                    columnNumber: 32
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 142,
                columnNumber: 26
            }, this),
            val: Math.PI / 3
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                type: "hint",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 4px"
                        },
                        children: [
                            "1. Slide ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\theta"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 149,
                                columnNumber: 51
                            }, this),
                            " to find angles where ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\cos\\theta"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 149,
                                columnNumber: 95
                            }, this),
                            " is a root of the original equation"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 4px"
                        },
                        children: [
                            "2. At those angles, check that ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\sin\\theta"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 150,
                                columnNumber: 73
                            }, this),
                            " satisfies option A: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "8x^4 - 6x^2 + 1 = 0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 150,
                                columnNumber: 121
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "3. Both equations should hit zero at the same ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\theta"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 151,
                                columnNumber: 80
                            }, this),
                            " values"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    marginBottom: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 12,
                                    color: C.assum,
                                    fontWeight: 600
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                    children: "\\theta"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 155,
                                    columnNumber: 75
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 16,
                                    color: C.assum,
                                    fontWeight: 700
                                },
                                children: exactTheta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                            children: exactTheta
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                            lineNumber: 156,
                                            columnNumber: 95
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: mathFont,
                                                fontSize: 16,
                                                color: C.muted,
                                                marginLeft: 6
                                            },
                                            children: [
                                                "\u2248",
                                                " ",
                                                fmt(theta / Math.PI),
                                                "\u03C0"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                            lineNumber: 156,
                                            columnNumber: 118
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 156,
                                    columnNumber: 89
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: mathFont
                                    },
                                    children: [
                                        fmt(theta / Math.PI),
                                        "\u03C0"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 156,
                                    columnNumber: 262
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: 0.1,
                        max: 1.5,
                        step: 0.01,
                        value: theta,
                        onChange: (e)=>setTheta(handleSlider(+e.target.value)),
                        style: {
                            width: "100%",
                            accentColor: C.assum,
                            height: 6
                        }
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 4,
                            marginTop: 6
                        },
                        children: presets.map((pr)=>{
                            const active = Math.abs(theta - pr.val) < 0.02;
                            const prHit = active && isExact;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTheta(pr.val),
                                style: {
                                    flex: 1,
                                    padding: "6px 2px",
                                    borderRadius: 7,
                                    transition: "all 0.2s",
                                    border: `1px solid ${prHit ? C.ok : active ? C.ps : C.border}`,
                                    background: prHit ? C.ok + "15" : active ? C.ps + "15" : C.card,
                                    color: active ? prHit ? C.ok : C.ps : C.muted,
                                    fontSize: 12,
                                    cursor: "pointer",
                                    fontWeight: active ? 700 : 400
                                },
                                children: pr.jsx
                            }, pr.label, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 160,
                                columnNumber: 121
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginBottom: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: isOrigZero ? C.conclBg : C.card,
                            border: `1px solid ${isOrigZero ? C.ok : C.border}`,
                            borderRadius: 10,
                            padding: "10px 14px",
                            transition: "all 0.3s"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: isOrigZero ? C.ok : C.assum,
                                    marginBottom: 6,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5
                                },
                                children: "Cos equation (given)"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                            children: `x = \\cos\\theta = ${exactCos ? exactCos + " \\approx " + fmt(cosT) : fmt(cosT)}`
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                            lineNumber: 167,
                                            columnNumber: 18
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 4
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                            children: `\\color{${isOrigZero ? "#55efc4" : "#74b9ff"}}{8(${fmt(cosT)})^4 - 10(${fmt(cosT)})^2 + 3 = ${fmt(origLHS)}}`
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                            lineNumber: 168,
                                            columnNumber: 43
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: isNewZero ? C.conclBg : C.card,
                            border: `1px solid ${isNewZero ? C.ok : C.border}`,
                            borderRadius: 10,
                            padding: "10px 14px",
                            transition: "all 0.3s"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: isNewZero ? C.ok : C.ps,
                                    marginBottom: 6,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5
                                },
                                children: "Sin equation (testing option A)"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                            children: `x = \\sin\\theta = ${exactSin ? exactSin + " \\approx " + fmt(sinT) : fmt(sinT)}`
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                            lineNumber: 174,
                                            columnNumber: 18
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 4
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                            children: `\\color{${isNewZero ? "#55efc4" : "#74b9ff"}}{8(${fmt(sinT)})^4 - 6(${fmt(sinT)})^2 + 1 = ${fmt(newLHS)}}`
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                            lineNumber: 175,
                                            columnNumber: 43
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            isExact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.conclBg,
                    border: `1px solid ${C.ok}55`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    textAlign: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.ok
                    },
                    children: [
                        "At ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `\\theta = ${exactTheta}`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 181,
                            columnNumber: 75
                        }, this),
                        ": ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `\\cos\\theta = ${exactCos}`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 181,
                            columnNumber: 115
                        }, this),
                        " solves the original, ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `\\sin\\theta = ${exactSin}`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 181,
                            columnNumber: 178
                        }, this),
                        " solves ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "8x^4 - 6x^2 + 1 = 0"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 181,
                            columnNumber: 227
                        }, this),
                        ". The answer is A."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, this) : isNear ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.assumBg,
                    border: `1px solid ${C.assum}55`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    textAlign: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.assum
                    },
                    children: [
                        "Close! Both near zero. Tap ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\theta = \\tfrac{\\pi}{6}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 185,
                            columnNumber: 102
                        }, this),
                        " or ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\theta = \\tfrac{\\pi}{3}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 185,
                            columnNumber: 147
                        }, this),
                        " for exact values."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 185,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 184,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    textAlign: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 14,
                        fontWeight: 600,
                        color: C.muted
                    },
                    children: [
                        "Slide ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\theta"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 189,
                            columnNumber: 81
                        }, this),
                        " until the cos equation hits zero, then check the sin equation."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
function App() {
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [optAnim, setOptAnim] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(opts.map(()=>false));
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step === 4) {
            opts.forEach((_, i)=>{
                setTimeout(()=>setOptAnim((p)=>{
                        const n = [
                            ...p
                        ];
                        n[i] = true;
                        return n;
                    }), i * 100);
            });
        } else {
            setOptAnim(opts.map(()=>false));
            setExpanded(null);
        }
    }, [
        step
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step !== 2) setRevealed(0);
    }, [
        step
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: C.bg,
            fontFamily: bodyFont,
            letterSpacing: 0.2,
            padding: "20px 14px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 800,
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: 20
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 4
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
                                        borderRadius: 8,
                                        padding: "4px 10px",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: C.white,
                                        letterSpacing: 1
                                    },
                                    children: "TMUA"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 206,
                                    columnNumber: 124
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: META.paper
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 206,
                                    columnNumber: 323
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: "\u00B7"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 206,
                                    columnNumber: 389
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.ps
                                    },
                                    children: META.topicTag
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 206,
                                    columnNumber: 453
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 206,
                            columnNumber: 43
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: 22,
                                fontWeight: 700,
                                color: C.white,
                                margin: "0 0 3px",
                                fontFamily: titleFont,
                                fontStyle: "italic",
                                letterSpacing: 0.5
                            },
                            children: "Interactive Walkthrough"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 206,
                            columnNumber: 525
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 12,
                                color: C.muted,
                                margin: 0
                            },
                            children: [
                                "TMUA ",
                                META.year,
                                " ",
                                "\u00B7",
                                " ",
                                META.paper,
                                " ",
                                "\u00B7",
                                " Question ",
                                META.questionNumber
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 206,
                            columnNumber: 698
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: 3,
                        marginBottom: 20
                    },
                    children: stepsMeta.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setStep(s.id),
                            style: {
                                flex: 1,
                                minWidth: 0,
                                background: step === s.id ? C.accent : step > s.id ? "rgba(108,92,231,0.15)" : "#1e2030",
                                border: `1px solid ${step === s.id ? C.accent : step > s.id ? C.accent + "44" : C.border}`,
                                borderRadius: 9,
                                padding: "8px 3px",
                                cursor: "pointer",
                                transition: "all 0.3s",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 3
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted
                                    },
                                    children: s.id + 1
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 207,
                                    columnNumber: 505
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 11,
                                        fontWeight: step === s.id ? 700 : 500,
                                        color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted,
                                        whiteSpace: "nowrap"
                                    },
                                    children: s.label
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 207,
                                    columnNumber: 642
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 207,
                            columnNumber: 89
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                background: C.accent,
                                borderRadius: 6,
                                width: 26,
                                height: 26,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 12,
                                fontWeight: 700,
                                color: C.white
                            },
                            children: step + 1
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 208,
                            columnNumber: 90
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: 16,
                                fontWeight: 700,
                                color: C.white,
                                margin: 0
                            },
                            children: stepsMeta[step].title
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 208,
                            columnNumber: 298
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this),
                step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReadStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 209,
                    columnNumber: 24
                }, this),
                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SetupStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 210,
                    columnNumber: 24
                }, this),
                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SolveStepContent, {
                    revealed: revealed,
                    setRevealed: setRevealed
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 211,
                    columnNumber: 24
                }, this),
                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VerifyStepContent, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 212,
                    columnNumber: 24
                }, this),
                step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 213,
                            columnNumber: 30
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 6,
                                marginBottom: 20
                            },
                            children: opts.map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OptionCard, {
                                    o: o,
                                    expanded: expanded === i,
                                    animate: optAnim[i],
                                    onClick: ()=>setExpanded(expanded === i ? null : i)
                                }, o.letter, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                                    lineNumber: 213,
                                    columnNumber: 154
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 213,
                            columnNumber: 49
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 213,
                    columnNumber: 25
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: 10,
                        marginTop: 20,
                        paddingBottom: 28
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setStep(Math.max(0, step - 1)),
                            disabled: step === 0,
                            style: {
                                flex: 1,
                                padding: "12px 18px",
                                borderRadius: 10,
                                border: `1px solid ${C.border}`,
                                background: step === 0 ? C.card : "#1e2030",
                                color: step === 0 ? C.muted : C.text,
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: step === 0 ? "not-allowed" : "pointer",
                                opacity: step === 0 ? 0.4 : 1
                            },
                            children: [
                                "\u2190",
                                " Previous"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 214,
                            columnNumber: 85
                        }, this),
                        step < 4 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setStep(step + 1),
                            style: {
                                flex: 1,
                                padding: "12px 18px",
                                borderRadius: 10,
                                border: "none",
                                background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
                                color: C.white,
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: "pointer"
                            },
                            children: [
                                "Next ",
                                "\u2192"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 214,
                            columnNumber: 489
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: {
                                flex: 1,
                                padding: "12px 18px",
                                borderRadius: 10,
                                border: "none",
                                background: `linear-gradient(135deg,${C.ok},#2ecc71)`,
                                color: C.white,
                                fontSize: 14,
                                fontWeight: 700,
                                cursor: "pointer"
                            },
                            children: "Complete"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                            lineNumber: 214,
                            columnNumber: 770
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
            lineNumber: 205,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx",
        lineNumber: 204,
        columnNumber: 5
    }, this);
}
}),
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=55f66_tmua-review_src_components_walkthroughs_tmua-2026mock_tmua-q16_tsx_95028c3a._.js.map