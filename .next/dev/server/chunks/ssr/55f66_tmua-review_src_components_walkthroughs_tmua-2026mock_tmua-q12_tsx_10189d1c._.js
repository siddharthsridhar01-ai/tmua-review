module.exports = [
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    questionNumber: 12,
    paper: "Paper 1",
    year: "2026 Mock",
    topicTag: "Quartic Minimum / Completing the Square"
};
const fmt = (v, dp = 2)=>{
    const r = Math.round(v * 100) / 100;
    return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString();
};
const opts = [
    {
        letter: "A",
        tex: "-3",
        text: "\u22123",
        ok: false,
        expl: "You might get \u22123 if you use k = 1 instead of k = 2. With k = 2, the quadratic x\u00B2 \u2212 4x + 5 = (x\u22122)\u00B2 + 1 has minimum 1, not \u22123."
    },
    {
        letter: "B",
        tex: "-1",
        text: "\u22121",
        ok: false,
        expl: "You might get \u22121 if you find k = 2 correctly but then compute the minimum of x\u00B2 \u2212 2kx + 5 as 5 \u2212 k\u00B2 = 5 \u2212 4 = 1 but make a sign error."
    },
    {
        letter: "C",
        tex: "0",
        text: "0",
        ok: false,
        expl: "You might get 0 if you confuse the minimum of x\u00B2 \u2212 4x + 5 with the root of x\u00B2 \u2212 4x + 5 = 0. But the discriminant is 16 \u2212 20 = \u22124 < 0, so there are no real roots."
    },
    {
        letter: "D",
        tex: "1",
        text: "1",
        ok: true,
        expl: "From the quartic: min of x\u2074 \u2212 2kx\u00B2 is \u2212k\u00B2 = \u22124, so k = 2. Then x\u00B2 \u2212 2(2)x + 5 = x\u00B2 \u2212 4x + 5 = (x\u22122)\u00B2 + 1. The minimum is 1."
    },
    {
        letter: "E",
        tex: "3",
        text: "3",
        ok: false,
        expl: "You might get 3 if you use k = 1 (from \u2212k = \u22124, wrong) and compute min of x\u00B2 \u2212 2x + 5 = (x\u22121)\u00B2 + 4 = 4, or a similar arithmetic slip."
    },
    {
        letter: "F",
        tex: "5",
        text: "5",
        ok: false,
        expl: "You get 5 by evaluating x\u00B2 \u2212 2kx + 5 at x = 0 rather than at the vertex. The minimum of a quadratic is at x = k, not at x = 0."
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
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
        lineNumber: 26,
        columnNumber: 428
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                        children: "Q12"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    "The minimum value of the function ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x^4 - 2kx^2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 33,
                        columnNumber: 43
                    }, this),
                    " is ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "-4"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 33,
                        columnNumber: 73
                    }, this),
                    ", where ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "k > 0"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 33,
                        columnNumber: 98
                    }, this),
                    ". Find the minimum value of the function ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x^2 - 2kx + 5."
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 33,
                        columnNumber: 159
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                        "-3"
                    ],
                    [
                        "B",
                        "-1"
                    ],
                    [
                        "C",
                        "0"
                    ],
                    [
                        "D",
                        "1"
                    ],
                    [
                        "E",
                        "3"
                    ],
                    [
                        "F",
                        "5"
                    ]
                ].map(([l, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            l,
                            ": ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 36,
                                columnNumber: 108
                            }, this)
                        ]
                    }, l, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 36,
                        columnNumber: 89
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 41,
                                columnNumber: 1022
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 41,
                                    columnNumber: 1284
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: "INCORRECT: "
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 41,
                                    columnNumber: 1337
                                }, this),
                                o.expl
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 41,
                            columnNumber: 1058
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 41,
                    columnNumber: 943
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
            lineNumber: 41,
            columnNumber: 493
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 42,
                    columnNumber: 430
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 42,
                columnNumber: 635
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                            children: "QUESTION 12"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                        children: "The minimum value of the function"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                            children: "x^4 - 2kx^2"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 53,
                            columnNumber: 82
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                            "is ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "-4"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 54,
                                columnNumber: 95
                            }, this),
                            ", where ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "k > 0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 54,
                                columnNumber: 120
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 15.5,
                            lineHeight: 1.8,
                            color: C.text,
                            margin: "6px 0 6px"
                        },
                        children: "Find the minimum value of the function"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MathBox, {
                        style: {
                            fontSize: 17,
                            padding: "12px 18px",
                            margin: "8px 0"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x^2 - 2kx + 5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 56,
                            columnNumber: 82
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
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
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 59,
                                columnNumber: 197
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: o.tex
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 59,
                                columnNumber: 281
                            }, this)
                        ]
                    }, o.letter, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 59,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
function SetupStep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                type: "strategy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        margin: 0
                    },
                    children: [
                        "Two stages: first use the quartic constraint to find ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "k"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 70,
                            columnNumber: 87
                        }, this),
                        ", then complete the square on the quadratic ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x^2 - 2kx + 5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 70,
                            columnNumber: 147
                        }, this),
                        " to find its minimum."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 69,
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
                            "The quartic ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x^4 - 2kx^2"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 73,
                                columnNumber: 54
                            }, this),
                            " is a quadratic in disguise: let ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "u = x^2"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 73,
                                columnNumber: 113
                            }, this),
                            " to get ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "u^2 - 2ku"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 73,
                                columnNumber: 143
                            }, this),
                            ". Completing the square gives ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "(u - k)^2 - k^2"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 73,
                                columnNumber: 197
                            }, this),
                            ", so its minimum is ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "-k^2"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 73,
                                columnNumber: 247
                            }, this),
                            " (achieved when ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "u = k"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 73,
                                columnNumber: 282
                            }, this),
                            ", i.e. ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x^2 = k"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 73,
                                columnNumber: 309
                            }, this),
                            ")."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "Since ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "k > 0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 74,
                                columnNumber: 40
                            }, this),
                            ", the value ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "u = k"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 74,
                                columnNumber: 72
                            }, this),
                            " is achievable (we need ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x^2 \\ge 0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 74,
                                columnNumber: 116
                            }, this),
                            ")."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
function SolveStepContent({ revealed, setRevealed }) {
    const compactGraph = (fn, { xMin, xMax, yMin, yMax, color, dots, labels, title })=>{
        const pW = 270, pH = 185;
        const pad = {
            l: 32,
            r: 12,
            t: 22,
            b: 24
        };
        const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
        const sx = (x)=>pad.l + (x - xMin) / (xMax - xMin) * gW;
        const sy = (y)=>pad.t + (yMax - y) / (yMax - yMin) * gH;
        const segs = [];
        let cur = [];
        for(let i = 0; i <= 300; i++){
            const x = xMin + (xMax - xMin) * (i / 300);
            const y = fn(x);
            if (y >= yMin && y <= yMax) {
                cur.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
            } else {
                if (cur.length > 1) segs.push("M" + cur.join("L"));
                cur = [];
            }
        }
        if (cur.length > 1) segs.push("M" + cur.join("L"));
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: `0 0 ${pW} ${pH}`,
            width: pW,
            style: {
                display: "block",
                width: "100%"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        x: "-0.06",
                        y: "-0.15",
                        width: "1.12",
                        height: "1.35",
                        id: "lbc",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                floodColor: "#0f1117",
                                floodOpacity: "0.85"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 92,
                                columnNumber: 79
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                in: "SourceGraphic",
                                operator: "over"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 92,
                                columnNumber: 131
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 92,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: pad.l,
                    y1: sy(0),
                    x2: pW - pad.r,
                    y2: sy(0),
                    stroke: C.muted,
                    strokeWidth: 0.7
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: sx(0),
                    y1: pad.t,
                    x2: sx(0),
                    y2: pH - pad.b,
                    stroke: C.muted,
                    strokeWidth: 0.7
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: segs.join(""),
                    fill: "none",
                    stroke: color,
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this),
                (dots || []).map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: sx(d[0]),
                        cy: sy(d[1]),
                        r: 3.5,
                        fill: d[2] || color,
                        stroke: C.white,
                        strokeWidth: 1
                    }, i, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 96,
                        columnNumber: 37
                    }, this)),
                (labels || []).map((lb, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: sx(lb[0]),
                        y: sy(lb[1]) + (lb[4] || -10),
                        textAnchor: lb[3] || "middle",
                        fill: lb[2] || C.white,
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: mathFont,
                        filter: "url(#lbc)",
                        children: lb[5]
                    }, i, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 97,
                        columnNumber: 40
                    }, this)),
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: pW / 2,
                    y: pad.t - 6,
                    textAnchor: "middle",
                    fill: C.muted,
                    fontSize: 11,
                    fontFamily: mathFont,
                    filter: "url(#lbc)",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 98,
                    columnNumber: 19
                }, this),
                [
                    Math.round(xMin),
                    Math.round(xMax)
                ].map((x)=>x !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: sx(x),
                        y: pH - pad.b + 14,
                        textAnchor: "middle",
                        fill: C.muted,
                        fontSize: 11,
                        fontFamily: mathFont,
                        children: x
                    }, x, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 99,
                        columnNumber: 67
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, this);
    };
    const quarticDiagram = compactGraph((x)=>x * x * x * x - 4 * x * x, {
        xMin: -3,
        xMax: 3,
        yMin: -5,
        yMax: 8,
        color: C.assum,
        dots: [
            [
                Math.sqrt(2),
                -4,
                C.ok
            ],
            [
                -Math.sqrt(2),
                -4,
                C.ok
            ],
            [
                0,
                0,
                C.muted
            ]
        ],
        labels: [
            [
                Math.sqrt(2),
                -4,
                C.ok,
                "start",
                14,
                `(\u221A2, \u22124)`
            ],
            [
                -Math.sqrt(2),
                -4,
                C.ok,
                "end",
                14,
                `(\u2212\u221A2, \u22124)`
            ]
        ],
        title: `x\u2074 \u2212 2(2)x\u00B2`
    });
    const quadDiagram = compactGraph((x)=>x * x - 4 * x + 5, {
        xMin: -1,
        xMax: 5,
        yMin: -1,
        yMax: 8,
        color: C.ps,
        dots: [
            [
                2,
                1,
                C.ok
            ]
        ],
        labels: [
            [
                2,
                1,
                C.ok,
                "middle",
                -10,
                "(2, 1)"
            ]
        ],
        title: `x\u00B2 \u2212 4x + 5 = (x\u22122)\u00B2 + 1`
    });
    const solveSteps = [
        {
            label: "APPROACH",
            color: C.ps,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Treat the quartic as a quadratic in ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x^2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 127,
                        columnNumber: 55
                    }, this),
                    " to find ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "k"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 127,
                        columnNumber: 82
                    }, this),
                    ", then complete the square on the second function."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 127,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "x^4 - 2kx^2 = (x^2)^2 - 2k(x^2) \\;\\longrightarrow\\; \\text{quadratic in } u = x^2"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 128,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 128,
                columnNumber: 14
            }, this)
        },
        {
            label: "COMPLETE THE SQUARE ON THE QUARTIC",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Substitute ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u = x^2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 130,
                        columnNumber: 30
                    }, this),
                    " so the quartic becomes ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u^2 - 2ku"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 130,
                        columnNumber: 76
                    }, this),
                    ". Complete the square in ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 130,
                        columnNumber: 125
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 130,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "u^2 - 2ku"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 131,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 131,
                        columnNumber: 16
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= u^2 - 2ku + k^2 - k^2"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 131,
                            columnNumber: 81
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 131,
                        columnNumber: 51
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= (u - k)^2 - k^2"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 131,
                            columnNumber: 155
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 131,
                        columnNumber: 125
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\text{Since } (u-k)^2 \\ge 0 \\text{, the minimum value is } 0 - k^2 = -k^2"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 131,
                            columnNumber: 223
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 131,
                        columnNumber: 193
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\text{achieved when } u - k = 0, \\text{ i.e. } u = k, \\text{ i.e. } x^2 = k"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 131,
                            columnNumber: 350
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 131,
                        columnNumber: 320
                    }, this)
                ]
            }, void 0, true)
        },
        {
            label: "SOLVE FOR k",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Set the minimum equal to ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "-4"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 133,
                        columnNumber: 44
                    }, this),
                    " and solve."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 133,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "-k^2 = -4"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 134,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 134,
                        columnNumber: 16
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "k^2 = 4"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 134,
                            columnNumber: 81
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 134,
                        columnNumber: 51
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "k = \\sqrt{4} = 2 \\quad (\\text{since } k > 0)"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 134,
                            columnNumber: 139
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 134,
                        columnNumber: 109
                    }, this)
                ]
            }, void 0, true),
            diagram: quarticDiagram
        },
        {
            label: "COMPLETE THE SQUARE ON THE QUADRATIC",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Substitute ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "k = 2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 137,
                        columnNumber: 30
                    }, this),
                    " into ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x^2 - 2kx + 5"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 137,
                        columnNumber: 56
                    }, this),
                    " and complete the square."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 137,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x^2 - 2(2)x + 5 = x^2 - 4x + 5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 138,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 138,
                        columnNumber: 16
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= x^2 - 4x + 4 + 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 138,
                            columnNumber: 102
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 138,
                        columnNumber: 72
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= (x - 2)^2 + 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 138,
                            columnNumber: 171
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 138,
                        columnNumber: 141
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\text{Since } (x-2)^2 \\ge 0 \\text{, the minimum value is } 0 + 1 = 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 138,
                            columnNumber: 237
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 138,
                        columnNumber: 207
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\color{#fdcb6e}{\\text{achieved when } x = 2}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 138,
                            columnNumber: 359
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 138,
                        columnNumber: 329
                    }, this)
                ]
            }, void 0, true),
            diagram: quadDiagram
        },
        {
            label: "CONCLUSION",
            color: C.ok,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "The minimum value of ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x^2 - 2kx + 5"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 141,
                        columnNumber: 40
                    }, this),
                    " is ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 141,
                        columnNumber: 72
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 141,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\color{#55efc4}{k = 2,\\quad \\min(x^2 - 4x + 5) = (2-2)^2 + 1 = 0 + 1 = 1}"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 142,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 142,
                columnNumber: 14
            }, this),
            conclusion: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "With ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "k = 2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 143,
                        columnNumber: 30
                    }, this),
                    ", the minimum of ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x^2 - 4x + 5 = (x-2)^2 + 1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 143,
                        columnNumber: 67
                    }, this),
                    " is ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 143,
                        columnNumber: 112
                    }, this),
                    ". The answer is D."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 143,
                columnNumber: 19
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 147,
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
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                            lineNumber: 149,
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                                    lineNumber: 149,
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 614
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 10,
                                                        flexWrap: "wrap",
                                                        alignItems: "flex-start"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MathBox, {
                                                            style: {
                                                                flex: "1 1 220px",
                                                                alignSelf: "flex-start"
                                                            },
                                                            children: s.math
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                                            lineNumber: 149,
                                                            columnNumber: 792
                                                        }, this),
                                                        s.diagram && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                flex: "0 0 270px",
                                                                alignSelf: "flex-start",
                                                                background: "#1e2030",
                                                                border: `1px solid ${C.border}`,
                                                                borderRadius: 10,
                                                                overflow: "hidden"
                                                            },
                                                            children: s.diagram
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                                            lineNumber: 149,
                                                            columnNumber: 888
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                                    lineNumber: 149,
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 1115
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                            lineNumber: 149,
                                            columnNumber: 446
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 149,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 149,
                                    columnNumber: 1361
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 149,
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
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 150,
                        columnNumber: 47
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
function VerifyStepContent() {
    const [kVal, setKVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const snapPoints = [
        0.5,
        1,
        1.5,
        2,
        2.5,
        3
    ];
    const snapRadius = 0.08;
    const handleSlider = (raw)=>{
        for (const sp of snapPoints){
            if (Math.abs(raw - sp) < snapRadius) return sp;
        }
        return raw;
    };
    const quarticMin = -(kVal * kVal);
    const quadMin = 5 - kVal * kVal;
    const isExact = Math.abs(kVal - 2) < 0.001;
    const isNear = !isExact && Math.abs(quarticMin - -4) < 4 * 0.05;
    const isHit = isExact || isNear;
    const col = isExact ? C.ok : isNear ? C.assum : C.ps;
    const presets = [
        {
            label: "k1",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "k = 1"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 170,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 170,
                columnNumber: 25
            }, this),
            val: 1
        },
        {
            label: "k15",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "k = 1.5"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 171,
                    columnNumber: 32
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 171,
                columnNumber: 26
            }, this),
            val: 1.5
        },
        {
            label: "k2",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "k = 2"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 172,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 172,
                columnNumber: 25
            }, this),
            val: 2
        },
        {
            label: "k3",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "k = 3"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 173,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 173,
                columnNumber: 25
            }, this),
            val: 3
        }
    ];
    const graph = (()=>{
        const pW = 500, pH = 240;
        const pad = {
            l: 40,
            r: 16,
            t: 20,
            b: 28
        };
        const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
        const xMin = -3.5, xMax = 5.5, yMin = -6, yMax = 10;
        const sx = (x)=>pad.l + (x - xMin) / (xMax - xMin) * gW;
        const sy = (y)=>pad.t + (yMax - y) / (yMax - yMin) * gH;
        const curvePath = (fn)=>{
            const segs = [];
            let current = [];
            for(let i = 0; i <= 300; i++){
                const x = xMin + (xMax - xMin) * (i / 300);
                const y = fn(x);
                if (y >= yMin && y <= yMax) {
                    current.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
                } else {
                    if (current.length > 1) segs.push("M" + current.join("L"));
                    current = [];
                }
            }
            if (current.length > 1) segs.push("M" + current.join("L"));
            return segs.join("");
        };
        const quartic = (x)=>x * x * x * x - 2 * kVal * x * x;
        const quadratic = (x)=>x * x - 2 * kVal * x + 5;
        const sqrtK = Math.sqrt(kVal);
        const qMinX = kVal;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: `0 0 ${pW} ${pH}`,
            width: pW,
            style: {
                display: "block",
                width: "100%"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        x: "-0.06",
                        y: "-0.15",
                        width: "1.12",
                        height: "1.35",
                        id: "lb",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                floodColor: "#0f1117",
                                floodOpacity: "0.85"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 190,
                                columnNumber: 78
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                in: "SourceGraphic",
                                operator: "over"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 190,
                                columnNumber: 130
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 190,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, this),
                [
                    -4,
                    0,
                    4,
                    8
                ].map((y)=>y >= yMin && y <= yMax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: pad.l,
                        y1: sy(y),
                        x2: pW - pad.r,
                        y2: sy(y),
                        stroke: C.border,
                        strokeWidth: 0.5
                    }, y, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 191,
                        columnNumber: 59
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: pad.l,
                    y1: sy(0),
                    x2: pW - pad.r,
                    y2: sy(0),
                    stroke: C.muted,
                    strokeWidth: 1
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: sx(0),
                    y1: pad.t,
                    x2: sx(0),
                    y2: pH - pad.b,
                    stroke: C.muted,
                    strokeWidth: 1
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: pad.l,
                    y1: sy(-4),
                    x2: pW - pad.r,
                    y2: sy(-4),
                    stroke: C.assum,
                    strokeWidth: 1,
                    strokeDasharray: "6,3"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: curvePath(quartic),
                    fill: "none",
                    stroke: C.assum,
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: curvePath(quadratic),
                    fill: "none",
                    stroke: col,
                    strokeWidth: 2.5
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this),
                sqrtK >= 0 && sqrtK <= 3.5 && quarticMin >= yMin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: sx(sqrtK),
                            cy: sy(quarticMin),
                            r: 4,
                            fill: C.assum,
                            stroke: C.white,
                            strokeWidth: 1
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: sx(-sqrtK),
                            cy: sy(quarticMin),
                            r: 4,
                            fill: C.assum,
                            stroke: C.white,
                            strokeWidth: 1
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true),
                qMinX >= xMin && qMinX <= xMax && quadMin >= yMin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: sx(qMinX),
                            cy: sy(quadMin),
                            r: 6,
                            fill: col,
                            stroke: C.white,
                            strokeWidth: 1.5
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: sx(qMinX),
                            y: sy(quadMin) - 12,
                            textAnchor: "middle",
                            fill: C.white,
                            fontSize: 11,
                            fontWeight: 600,
                            fontFamily: mathFont,
                            filter: "url(#lb)",
                            children: [
                                "(",
                                fmt(qMinX),
                                ", ",
                                fmt(quadMin),
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: pW - pad.r - 4,
                    y: sy(-4) - 6,
                    textAnchor: "end",
                    fill: C.assum,
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: mathFont,
                    filter: "url(#lb)",
                    children: [
                        "target min = ",
                        "\u22124"
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: sx(-2.5),
                    y: sy(quartic(-2.5)) - 8,
                    textAnchor: "middle",
                    fill: C.assum,
                    fontSize: 11,
                    fontFamily: mathFont,
                    filter: "url(#lb)",
                    children: [
                        "x",
                        "\u2074",
                        " ",
                        "\u2212",
                        " 2kx",
                        "\u00B2"
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: sx(4),
                    y: sy(quadratic(4)) - 8,
                    textAnchor: "middle",
                    fill: col,
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: mathFont,
                    filter: "url(#lb)",
                    children: [
                        "x",
                        "\u00B2",
                        " ",
                        "\u2212",
                        " 2kx + 5"
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this),
                [
                    -3,
                    -2,
                    -1,
                    1,
                    2,
                    3,
                    4,
                    5
                ].map((x)=>x >= xMin && x <= xMax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: sx(x),
                        y: pH - pad.b + 14,
                        textAnchor: "middle",
                        fill: C.muted,
                        fontSize: 11,
                        fontFamily: mathFont,
                        children: x
                    }, x, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 208,
                        columnNumber: 73
                    }, this)),
                [
                    -4,
                    4,
                    8
                ].map((y)=>y >= yMin && y <= yMax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: pad.l - 8,
                        y: sy(y) + 4,
                        textAnchor: "end",
                        fill: C.muted,
                        fontSize: 11,
                        fontFamily: mathFont,
                        children: y
                    }, y, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 209,
                        columnNumber: 56
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
            lineNumber: 189,
            columnNumber: 7
        }, this);
    })();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 216,
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
                                children: "k"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 218,
                                columnNumber: 51
                            }, this),
                            " until the quartic minimum (yellow) hits ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "-4"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 218,
                                columnNumber: 108
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 4px"
                        },
                        children: [
                            "2. The blue curve shows ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x^2 - 2kx + 5"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 219,
                                columnNumber: 66
                            }, this),
                            " with its vertex marked"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "3. At the correct ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "k"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 220,
                                columnNumber: 52
                            }, this),
                            ", read off the quadratic's minimum value"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 217,
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
                                    children: "k"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 224,
                                    columnNumber: 75
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 16,
                                    color: C.assum,
                                    fontFamily: mathFont,
                                    fontWeight: 700
                                },
                                children: fmt(kVal)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: 0.5,
                        max: 3,
                        step: 0.01,
                        value: kVal,
                        onChange: (e)=>setKVal(handleSlider(+e.target.value)),
                        style: {
                            width: "100%",
                            accentColor: C.assum,
                            height: 6
                        }
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 4,
                            marginTop: 6
                        },
                        children: presets.map((pr)=>{
                            const active = Math.abs(kVal - pr.val) < 0.02;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setKVal(pr.val),
                                style: {
                                    flex: 1,
                                    padding: "6px 2px",
                                    borderRadius: 7,
                                    transition: "all 0.2s",
                                    border: `1px solid ${active && isHit ? C.ok : active ? C.ps : C.border}`,
                                    background: active && isHit ? C.ok + "15" : active ? C.ps + "15" : C.card,
                                    color: active ? isHit ? C.ok : C.ps : C.muted,
                                    fontSize: 12,
                                    cursor: "pointer",
                                    fontWeight: active ? 700 : 400
                                },
                                children: pr.jsx
                            }, pr.label, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 229,
                                columnNumber: 87
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: "14px 18px",
                    marginBottom: 8
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "#1e2030",
                        borderRadius: 10,
                        padding: "10px 14px",
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: `\\color{#fdcb6e}{\\min(x^4 - 2kx^2) = -k^2 = -${fmt(kVal)}^2 = ${fmt(quarticMin)}}`
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 234,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 6
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: `\\color{${col}}{\\min(x^2 - 2kx + 5) = 5 - k^2 = 5 - ${fmt(kVal * kVal)} = ${fmt(quadMin)}}`
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 235,
                                columnNumber: 41
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 233,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 6,
                    marginBottom: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.card,
                            border: `1px solid ${C.assum}44`,
                            borderRadius: 8,
                            padding: "7px 4px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: C.assum,
                                    fontWeight: 700,
                                    marginBottom: 2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                    children: "k"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 240,
                                    columnNumber: 91
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: C.assum,
                                    fontFamily: mathFont
                                },
                                children: fmt(kVal)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.card,
                            border: `1px solid ${C.assum}44`,
                            borderRadius: 8,
                            padding: "7px 4px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: C.assum,
                                    fontWeight: 700,
                                    marginBottom: 2
                                },
                                children: "QUARTIC MIN"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: C.assum,
                                    fontFamily: mathFont
                                },
                                children: fmt(quarticMin)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: isExact ? C.conclBg : isNear ? C.assumBg : C.card,
                            border: `1px solid ${col}44`,
                            borderRadius: 8,
                            padding: "7px 4px",
                            textAlign: "center",
                            transition: "all 0.3s"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: col,
                                    fontWeight: 700,
                                    marginBottom: 2
                                },
                                children: "QUAD MIN"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: col,
                                    fontFamily: mathFont,
                                    transition: "color 0.3s"
                                },
                                children: fmt(quadMin)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    marginBottom: 8
                },
                children: graph
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            isHit ? isExact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            children: "k = 2"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 256,
                            columnNumber: 77
                        }, this),
                        ": quartic min ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= -4"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 256,
                            columnNumber: 111
                        }, this),
                        " ",
                        "\u2713",
                        ", quadratic ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= (x-2)^2 + 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 256,
                            columnNumber: 153
                        }, this),
                        ", min ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 256,
                            columnNumber: 187
                        }, this),
                        ". The answer is D."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 256,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 255,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        color: C.assum
                    },
                    children: [
                        "Close! Quartic min ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `\\approx ${fmt(quarticMin)}`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 260,
                            columnNumber: 96
                        }, this),
                        ". Tap ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "k = 2"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 260,
                            columnNumber: 144
                        }, this),
                        " to see the exact answer."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 260,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 259,
                columnNumber: 11
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
                        "Quartic min ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `= ${fmt(quarticMin)}`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 265,
                            columnNumber: 87
                        }, this),
                        " (need ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "-4"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 265,
                            columnNumber: 129
                        }, this),
                        "). Slide ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "k"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 265,
                            columnNumber: 155
                        }, this),
                        " to ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "2"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 265,
                            columnNumber: 175
                        }, this),
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 265,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
        lineNumber: 215,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 282,
                                    columnNumber: 124
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: META.paper
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 282,
                                    columnNumber: 323
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: "\u00B7"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 282,
                                    columnNumber: 389
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.ps
                                    },
                                    children: META.topicTag
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 282,
                                    columnNumber: 453
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 282,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 282,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 282,
                            columnNumber: 698
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 282,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 283,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 283,
                                    columnNumber: 642
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 283,
                            columnNumber: 89
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 283,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 284,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 284,
                            columnNumber: 298
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this),
                step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReadStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 285,
                    columnNumber: 24
                }, this),
                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SetupStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 286,
                    columnNumber: 24
                }, this),
                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SolveStepContent, {
                    revealed: revealed,
                    setRevealed: setRevealed
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 287,
                    columnNumber: 24
                }, this),
                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VerifyStepContent, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 288,
                    columnNumber: 24
                }, this),
                step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 289,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                                    lineNumber: 289,
                                    columnNumber: 154
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 289,
                            columnNumber: 49
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 289,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 290,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 290,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                            lineNumber: 290,
                            columnNumber: 770
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
                    lineNumber: 290,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
            lineNumber: 281,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx",
        lineNumber: 280,
        columnNumber: 5
    }, this);
}
}),
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=55f66_tmua-review_src_components_walkthroughs_tmua-2026mock_tmua-q12_tsx_10189d1c._.js.map