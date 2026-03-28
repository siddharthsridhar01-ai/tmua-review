module.exports = [
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    questionNumber: 13,
    paper: "Paper 1",
    year: "2026 Mock",
    topicTag: "Piecewise Integration / Summation"
};
const fmt = (v, dp = 2)=>{
    const r = Math.round(v * 100) / 100;
    return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString();
};
const opts = [
    {
        letter: "A",
        tex: "15",
        text: "15",
        ok: false,
        expl: "You might get 15 by summing 1 + 3 + 5 + 7 = 16 (four terms, missing the fifth) or by an off-by-one error using n = 1 to 5 instead of n = 0 to 4."
    },
    {
        letter: "B",
        tex: "20",
        text: "20",
        ok: false,
        expl: "You might get 20 by computing 2n instead of 2n + 1 for each interval: 0 + 2 + 4 + 6 + 8 = 20. But the formula gives 2n + 1, not 2n."
    },
    {
        letter: "C",
        tex: "25",
        text: "25",
        ok: true,
        expl: "Split \u222B\u2080\u2075 into five unit intervals. Each gives 2n + 1 for n = 0, 1, 2, 3, 4: that is 1 + 3 + 5 + 7 + 9 = 25."
    },
    {
        letter: "D",
        tex: "30",
        text: "30",
        ok: false,
        expl: "You might get 30 by using n = 0 to 5 (six terms) instead of n = 0 to 4. The integral to 5 uses n = 0, 1, 2, 3, 4 only (five intervals, not six)."
    },
    {
        letter: "E",
        tex: "35",
        text: "35",
        ok: false,
        expl: "You might get 35 by using n = 1 to 5 and computing 2n + 1: 3 + 5 + 7 + 9 + 11 = 35. But n starts at 0 (\u222B\u2080\u00B9), not at 1."
    },
    {
        letter: "F",
        tex: "50",
        text: "50",
        ok: false,
        expl: "You might get 50 by doubling the correct answer, perhaps by mistakenly summing both 2n + 1 and the integral again."
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
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
        lineNumber: 26,
        columnNumber: 428
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                        children: "Q13"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    "The function ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "f"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 33,
                        columnNumber: 22
                    }, this),
                    " is such that, for every integer ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "n \\ge 0"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 33,
                        columnNumber: 71
                    }, this),
                    ", ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\displaystyle\\int_n^{n+1} f(x)\\,dx = 2n + 1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 33,
                        columnNumber: 96
                    }, this),
                    ". Evaluate ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\displaystyle\\int_0^5 f(x)\\,dx."
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 33,
                        columnNumber: 168
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                        "15"
                    ],
                    [
                        "B",
                        "20"
                    ],
                    [
                        "C",
                        "25"
                    ],
                    [
                        "D",
                        "30"
                    ],
                    [
                        "E",
                        "35"
                    ],
                    [
                        "F",
                        "50"
                    ]
                ].map(([l, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            l,
                            ": ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 36,
                                columnNumber: 112
                            }, this)
                        ]
                    }, l, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 36,
                        columnNumber: 93
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 41,
                                columnNumber: 1022
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 41,
                                    columnNumber: 1284
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: "INCORRECT: "
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 41,
                                    columnNumber: 1337
                                }, this),
                                o.expl
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 41,
                            columnNumber: 1058
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 41,
                    columnNumber: 943
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
            lineNumber: 41,
            columnNumber: 493
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 42,
                    columnNumber: 430
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 42,
                columnNumber: 635
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                            children: "QUESTION 13"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                        children: [
                            "The function ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "f"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 52,
                                columnNumber: 103
                            }, this),
                            " is such that, for every integer ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "n \\ge 0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 52,
                                columnNumber: 152
                            }, this),
                            ","
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                            children: "\\int_n^{n+1} f(x)\\,dx = 2n + 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 53,
                            columnNumber: 82
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 15.5,
                            lineHeight: 1.8,
                            color: C.text,
                            margin: "6px 0 10px"
                        },
                        children: [
                            "Evaluate the integral from ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 54,
                                columnNumber: 120
                            }, this),
                            " to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "5"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 54,
                                columnNumber: 140
                            }, this),
                            " of ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "f(x)\\,dx"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 54,
                                columnNumber: 160
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
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
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 57,
                                columnNumber: 197
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: o.tex
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 57,
                                columnNumber: 281
                            }, this)
                        ]
                    }, o.letter, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 57,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
function SetupStep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                type: "strategy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        margin: 0
                    },
                    children: [
                        "Split ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\int_0^5 f(x)\\,dx"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 68,
                            columnNumber: 40
                        }, this),
                        " into five consecutive unit-width integrals. Each piece is given by the formula ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "2n + 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 68,
                            columnNumber: 154
                        }, this),
                        ", so just evaluate and add them up."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 67,
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
                            "The integral from ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 71,
                                columnNumber: 60
                            }, this),
                            " to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "5"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 71,
                                columnNumber: 80
                            }, this),
                            " covers ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "5"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 71,
                                columnNumber: 104
                            }, this),
                            " unit intervals: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "[0,1], [1,2], [2,3], [3,4], [4,5]"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 71,
                                columnNumber: 137
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "These correspond to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "n = 0, 1, 2, 3, 4"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 72,
                                columnNumber: 54
                            }, this),
                            " (not ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "n = 1"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 72,
                                columnNumber: 92
                            }, this),
                            " to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "5"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 72,
                                columnNumber: 116
                            }, this),
                            "). The values ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "2n+1"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 72,
                                columnNumber: 146
                            }, this),
                            " are the first ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "5"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 72,
                                columnNumber: 180
                            }, this),
                            " odd numbers: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "1, 3, 5, 7, 9"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 72,
                                columnNumber: 210
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
function SolveStepContent({ revealed, setRevealed }) {
    const solveSteps = [
        {
            label: "APPROACH",
            color: C.ps,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Split the integral at each integer to use the given formula on each piece."
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\int_0^5 f(x)\\,dx = \\int_0^1 f(x)\\,dx + \\int_1^2 f(x)\\,dx + \\int_2^3 f(x)\\,dx + \\int_3^4 f(x)\\,dx + \\int_4^5 f(x)\\,dx"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 82,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 82,
                columnNumber: 14
            }, this)
        },
        {
            label: "EVALUATE EACH PIECE",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Substitute ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "n = 0, 1, 2, 3, 4"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 84,
                        columnNumber: 30
                    }, this),
                    " into ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "2n + 1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 84,
                        columnNumber: 68
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "n = 0: \\quad \\int_0^1 f(x)\\,dx = 2(0) + 1 = 0 + 1 = 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 85,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 85,
                        columnNumber: 16
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "n = 1: \\quad \\int_1^2 f(x)\\,dx = 2(1) + 1 = 2 + 1 = 3"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 85,
                            columnNumber: 128
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 85,
                        columnNumber: 98
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "n = 2: \\quad \\int_2^3 f(x)\\,dx = 2(2) + 1 = 4 + 1 = 5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 85,
                            columnNumber: 235
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 85,
                        columnNumber: 205
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "n = 3: \\quad \\int_3^4 f(x)\\,dx = 2(3) + 1 = 6 + 1 = 7"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 85,
                            columnNumber: 342
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 85,
                        columnNumber: 312
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "n = 4: \\quad \\int_4^5 f(x)\\,dx = 2(4) + 1 = 8 + 1 = 9"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 85,
                            columnNumber: 449
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 85,
                        columnNumber: 419
                    }, this)
                ]
            }, void 0, true)
        },
        {
            label: "SUM THE PIECES",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Add all five values."
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 87,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "1 + 3 + 5 + 7 + 9"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 88,
                        columnNumber: 16
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= (1 + 9) + (3 + 7) + 5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 88,
                            columnNumber: 89
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 88,
                        columnNumber: 59
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= 10 + 10 + 5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 88,
                            columnNumber: 163
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 88,
                        columnNumber: 133
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= 25"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 88,
                            columnNumber: 227
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 88,
                        columnNumber: 197
                    }, this)
                ]
            }, void 0, true)
        },
        {
            label: "CONCLUSION",
            color: C.ok,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "The integral evaluates to ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "25"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 90,
                        columnNumber: 45
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 90,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\color{#55efc4}{\\int_0^5 f(x)\\,dx = 1 + 3 + 5 + 7 + 9 = 25}"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 91,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 91,
                columnNumber: 14
            }, this),
            conclusion: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "\\int_0^5 f(x)\\,dx = 25"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 92,
                        columnNumber: 25
                    }, this),
                    ". The answer is C."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 92,
                columnNumber: 19
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 96,
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
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                            lineNumber: 98,
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                                    lineNumber: 98,
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 614
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MathBox, {
                                                    children: s.math
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                                    lineNumber: 98,
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 782
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                            lineNumber: 98,
                                            columnNumber: 446
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 98,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 98,
                                    columnNumber: 1028
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 98,
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
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 99,
                        columnNumber: 47
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function VerifyStepContent() {
    const [numIntervals, setNumIntervals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const vals = [
        1,
        3,
        5,
        7,
        9
    ];
    const cumSum = vals.reduce((acc, v, i)=>{
        acc.push((acc[i - 1] || 0) + v);
        return acc;
    }, []);
    const currentSum = cumSum[numIntervals - 1];
    const target = 25;
    const isExact = numIntervals === 5;
    const isNear = !isExact && numIntervals === 4;
    const isHit = isExact || isNear;
    const col = isExact ? C.ok : isNear ? C.assum : C.ps;
    const presets = [
        {
            label: "n1",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "N = 1"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 117,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 117,
                columnNumber: 25
            }, this),
            val: 1
        },
        {
            label: "n3",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "N = 3"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 118,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 118,
                columnNumber: 25
            }, this),
            val: 3
        },
        {
            label: "n5",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "N = 5"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 119,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 119,
                columnNumber: 25
            }, this),
            val: 5
        }
    ];
    const barGraph = (()=>{
        const pW = 500, pH = 220;
        const pad = {
            l: 40,
            r: 16,
            t: 20,
            b: 32
        };
        const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
        const barW = gW / 5 - 6;
        const yMax = 10;
        const sx = (i)=>pad.l + gW / 5 * i + 3;
        const sy = (y)=>pad.t + gH - y / yMax * gH;
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
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 132,
                                columnNumber: 78
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                in: "SourceGraphic",
                                operator: "over"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 132,
                                columnNumber: 130
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 132,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: pad.l,
                    y1: sy(0),
                    x2: pW - pad.r,
                    y2: sy(0),
                    stroke: C.muted,
                    strokeWidth: 1
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                [
                    2,
                    4,
                    6,
                    8
                ].map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: pad.l,
                        y1: sy(y),
                        x2: pW - pad.r,
                        y2: sy(y),
                        stroke: C.border,
                        strokeWidth: 0.5
                    }, y, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 134,
                        columnNumber: 32
                    }, this)),
                vals.map((v, i)=>{
                    const active = i < numIntervals;
                    const barCol = active ? isExact ? C.ok : C.ps : C.border;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: sx(i),
                                y: sy(v),
                                width: barW,
                                height: sy(0) - sy(v),
                                rx: 4,
                                fill: active ? barCol + "44" : "#1e2030",
                                stroke: barCol,
                                strokeWidth: 1.5
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this),
                            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: sx(i) + barW / 2,
                                y: sy(v) - 6,
                                textAnchor: "middle",
                                fill: barCol,
                                fontSize: 13,
                                fontWeight: 700,
                                fontFamily: mathFont,
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 140,
                                columnNumber: 24
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: sx(i) + barW / 2,
                                y: pH - pad.b + 14,
                                textAnchor: "middle",
                                fill: C.muted,
                                fontSize: 11,
                                fontFamily: mathFont,
                                children: [
                                    "[",
                                    i,
                                    ",",
                                    i + 1,
                                    "]"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 138,
                        columnNumber: 19
                    }, this);
                }),
                [
                    2,
                    4,
                    6,
                    8
                ].map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: pad.l - 8,
                        y: sy(y) + 4,
                        textAnchor: "end",
                        fill: C.muted,
                        fontSize: 11,
                        fontFamily: mathFont,
                        children: y
                    }, y, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 144,
                        columnNumber: 32
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: pW / 2,
                    y: pad.t - 4,
                    textAnchor: "middle",
                    fill: C.muted,
                    fontSize: 11,
                    fontFamily: mathFont,
                    filter: "url(#lb)",
                    children: "Each bar = 2n + 1"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this);
    })();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 152,
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
                                children: "N"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 154,
                                columnNumber: 51
                            }, this),
                            " to control how many unit intervals are included"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 4px"
                        },
                        children: [
                            "2. Each bar shows the integral ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "\\int_n^{n+1} f(x)\\,dx = 2n + 1"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 155,
                                columnNumber: 73
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "3. At ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "N = 5"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 156,
                                columnNumber: 40
                            }, this),
                            ", all five bars add to the total"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 153,
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
                                children: "Intervals included"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 16,
                                    color: C.assum,
                                    fontFamily: mathFont,
                                    fontWeight: 700
                                },
                                children: numIntervals
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: 1,
                        max: 5,
                        step: 1,
                        value: numIntervals,
                        onChange: (e)=>setNumIntervals(+e.target.value),
                        style: {
                            width: "100%",
                            accentColor: C.assum,
                            height: 6
                        }
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 4,
                            marginTop: 6
                        },
                        children: presets.map((pr)=>{
                            const active = numIntervals === pr.val;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setNumIntervals(pr.val),
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
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 165,
                                columnNumber: 80
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 158,
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
                                children: `\\color{#e2e2e8}{\\int_0^{${numIntervals}} f(x)\\,dx = ${vals.slice(0, numIntervals).join(" + ")}}`
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 170,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 6
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: `\\color{${col}}{= ${currentSum}}`
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 171,
                                columnNumber: 41
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 168,
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
                                    textTransform: "uppercase",
                                    marginBottom: 2
                                },
                                children: "Intervals"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: C.assum,
                                    fontFamily: mathFont
                                },
                                children: numIntervals
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 175,
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
                                    textTransform: "uppercase",
                                    marginBottom: 2
                                },
                                children: "Running sum"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 180,
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
                                children: currentSum
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.conclBg,
                            border: `1px solid ${C.ok}66`,
                            borderRadius: 8,
                            padding: "7px 4px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: C.ok,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    marginBottom: 2
                                },
                                children: "Target"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: C.ok,
                                    fontFamily: mathFont
                                },
                                children: "25"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 174,
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
                children: barGraph
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 188,
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
                        "All ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 192,
                            columnNumber: 78
                        }, this),
                        " intervals: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "1 + 3 + 5 + 7 + 9 = 25"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 192,
                            columnNumber: 106
                        }, this),
                        ". The answer is C."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 192,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 191,
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
                        "Close! Sum so far is ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `${currentSum}`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 196,
                            columnNumber: 98
                        }, this),
                        ". Tap ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "N = 5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 196,
                            columnNumber: 132
                        }, this),
                        " to include all intervals."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 196,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 195,
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `\\int_0^{${numIntervals}} f(x)\\,dx = ${currentSum}`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 201,
                            columnNumber: 75
                        }, this),
                        ". Slide to ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "N = 5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 201,
                            columnNumber: 152
                        }, this),
                        " for the full integral."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 201,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                lineNumber: 200,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
        lineNumber: 151,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 218,
                                    columnNumber: 124
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: META.paper
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 218,
                                    columnNumber: 323
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: "\u00B7"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 218,
                                    columnNumber: 389
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.ps
                                    },
                                    children: META.topicTag
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 218,
                                    columnNumber: 453
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 218,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 218,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 218,
                            columnNumber: 698
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 218,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 219,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 219,
                                    columnNumber: 642
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 219,
                            columnNumber: 89
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 219,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 220,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 220,
                            columnNumber: 298
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this),
                step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReadStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 221,
                    columnNumber: 24
                }, this),
                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SetupStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 222,
                    columnNumber: 24
                }, this),
                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SolveStepContent, {
                    revealed: revealed,
                    setRevealed: setRevealed
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 223,
                    columnNumber: 24
                }, this),
                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VerifyStepContent, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 224,
                    columnNumber: 24
                }, this),
                step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 225,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                                    lineNumber: 225,
                                    columnNumber: 154
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 225,
                            columnNumber: 49
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 225,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 226,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 226,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                            lineNumber: 226,
                            columnNumber: 770
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
            lineNumber: 217,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
}
}),
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=55f66_tmua-review_src_components_walkthroughs_tmua-2026mock_tmua-q13_tsx_f9ad2e52._.js.map