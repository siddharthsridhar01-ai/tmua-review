module.exports = [
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    questionNumber: 5,
    paper: "Paper 1",
    year: "2026 Mock",
    topicTag: "Recurrence Relations"
};
const fmt = (v, dp = 2)=>{
    const r = Math.round(v * 100) / 100;
    return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString();
};
const opts = [
    {
        letter: "A",
        tex: "-5",
        text: "\u22125",
        ok: false,
        expl: "You might get \u22125 by making a sign error when solving for p and q, perhaps getting p = \u221214 and q = \u22122."
    },
    {
        letter: "B",
        tex: "-\\tfrac{5}{3}",
        text: "\u22125/3",
        ok: false,
        expl: "You might get \u22125/3 by swapping p and q (using p = 2, q = 14), which gives a different recurrence."
    },
    {
        letter: "C",
        tex: "\\tfrac{11}{5}",
        text: "11/5",
        ok: false,
        expl: "You might get 11/5 by computing x₄ = (3 + p)/(3 + q) with the wrong values of p or q."
    },
    {
        letter: "D",
        tex: "\\tfrac{29}{9}",
        text: "29/9",
        ok: true,
        expl: "From x₁ = 2 \u2192 x₂ = 4 and x₂ = 4 \u2192 x₃ = 3, we get p = 14, q = 2. Then x₄ = 17/5, and x₅ = (17/5 + 14)/(17/5 + 2) = (87/5)/(27/5) = 29/9."
    },
    {
        letter: "E",
        tex: "\\tfrac{17}{3}",
        text: "17/3",
        ok: false,
        expl: "You might get 17/3 by computing x₄ = 17/5 and then mistakenly using (17/5 + 14)/(17/5) = 87/17 or a similar error."
    },
    {
        letter: "F",
        tex: "13",
        text: "13",
        ok: false,
        expl: "You might get 13 by computing (3 + 14)/(3 + 2) = 17/5 and then rounding or misreading 87/27 as a larger value."
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
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 27,
        columnNumber: 428
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 27,
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
                        children: "Q5"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    "The terms ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_n"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 34,
                        columnNumber: 19
                    }, this),
                    " of a sequence follow the rule ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_{n+1} = \\dfrac{x_n + p}{x_n + q}"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 34,
                        columnNumber: 68
                    }, this),
                    " where ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "p"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 34,
                        columnNumber: 125
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "q"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 34,
                        columnNumber: 146
                    }, this),
                    " are real numbers. Given that ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_1 = 2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 34,
                        columnNumber: 192
                    }, this),
                    ", ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_2 = 4"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 34,
                        columnNumber: 216
                    }, this),
                    ", and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_3 = 3"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 34,
                        columnNumber: 244
                    }, this),
                    ", find the value of ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_5"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 34,
                        columnNumber: 286
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 32,
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
                        "-5"
                    ],
                    [
                        "B",
                        "-\\tfrac{5}{3}"
                    ],
                    [
                        "C",
                        "\\tfrac{11}{5}"
                    ],
                    [
                        "D",
                        "\\tfrac{29}{9}"
                    ],
                    [
                        "E",
                        "\\tfrac{17}{3}"
                    ],
                    [
                        "F",
                        "13"
                    ]
                ].map(([l, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            l,
                            ": ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 37,
                                columnNumber: 160
                            }, this)
                        ]
                    }, l, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 37,
                        columnNumber: 141
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 31,
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
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 42,
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
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 42,
                                columnNumber: 1022
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 42,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 42,
                                    columnNumber: 1284
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: "INCORRECT: "
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 42,
                                    columnNumber: 1337
                                }, this),
                                o.expl
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 42,
                            columnNumber: 1058
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 42,
                    columnNumber: 943
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
            lineNumber: 42,
            columnNumber: 493
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 42,
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
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 43,
                    columnNumber: 430
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 43,
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
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 43,
                columnNumber: 635
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 43,
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
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 44,
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
                            children: "QUESTION 5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 50,
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
                            "The terms ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x_n"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 53,
                                columnNumber: 100
                            }, this),
                            " of a sequence follow the rule"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MathBox, {
                        style: {
                            fontSize: 17,
                            padding: "12px 18px",
                            margin: "8px 0"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x_{n+1} = \\frac{x_n + p}{x_n + q}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
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
                        children: [
                            "where ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "p"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 57,
                                columnNumber: 98
                            }, this),
                            " and ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "q"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 57,
                                columnNumber: 119
                            }, this),
                            " are real numbers."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 57,
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
                            "Given that ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x_1 = 2"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 58,
                                columnNumber: 102
                            }, this),
                            ", ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x_2 = 4"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 58,
                                columnNumber: 126
                            }, this),
                            ", and ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x_3 = 3"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 58,
                                columnNumber: 154
                            }, this),
                            ", find the value of ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x_5"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 58,
                                columnNumber: 196
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 49,
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
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 61,
                                columnNumber: 197
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: o.tex
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 61,
                                columnNumber: 281
                            }, this)
                        ]
                    }, o.letter, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 61,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
function SetupStep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                type: "strategy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        margin: 0
                    },
                    children: [
                        "Use the known terms ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x_1, x_2, x_3"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 72,
                            columnNumber: 54
                        }, this),
                        " to form two simultaneous equations in ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "p"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 72,
                            columnNumber: 121
                        }, this),
                        " and ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "q"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 72,
                            columnNumber: 142
                        }, this),
                        ". Solve for ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "p"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 72,
                            columnNumber: 170
                        }, this),
                        " and ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "q"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 72,
                            columnNumber: 191
                        }, this),
                        ", then iterate the recurrence to find ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x_4"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 72,
                            columnNumber: 245
                        }, this),
                        " and ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x_5"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 72,
                            columnNumber: 268
                        }, this),
                        "."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 71,
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
                            "Each pair of consecutive terms gives one equation. With ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x_1 \\to x_2"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 75,
                                columnNumber: 98
                            }, this),
                            " and ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x_2 \\to x_3"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 75,
                                columnNumber: 130
                            }, this),
                            ", you get two equations in two unknowns."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: "Keep fractions exact throughout. Do not use decimals. The answer is a clean fraction."
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 69,
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
                    "Use two consecutive pairs to find ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "p"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 86,
                        columnNumber: 53
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "q"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 86,
                        columnNumber: 74
                    }, this),
                    ", then iterate the recurrence twice more to reach ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_5"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 86,
                        columnNumber: 140
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "x_{n+1} = \\frac{x_n + p}{x_n + q} \\quad \\Rightarrow \\quad x_{n+1}(x_n + q) = x_n + p"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 87,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 87,
                columnNumber: 14
            }, this)
        },
        {
            label: "FORM EQUATIONS",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "From ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_1 = 2 \\to x_2 = 4"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 91,
                        columnNumber: 24
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_2 = 4 \\to x_3 = 3"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 91,
                        columnNumber: 64
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 91,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "4 = \\frac{2 + p}{2 + q} \\;\\Rightarrow\\; 2 + p = 8 + 4q \\;\\Rightarrow\\; p = 6 + 4q \\quad \\text{\\color{#e2e2e8}{(i)}}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 94,
                            columnNumber: 16
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "3 = \\frac{4 + p}{4 + q} \\;\\Rightarrow\\; 4 + p = 12 + 3q \\;\\Rightarrow\\; p = 8 + 3q \\quad \\text{\\color{#e2e2e8}{(ii)}}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 95,
                            columnNumber: 41
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        },
        {
            label: "SOLVE FOR p AND q",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Equate (i) and (ii)."
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 101,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "6 + 4q = 8 + 3q"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 104,
                            columnNumber: 16
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "\\color{#fdcb6e}{q = 2, \\quad p = 6 + 8 = 14}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 105,
                            columnNumber: 41
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        },
        {
            label: "COMPUTE x\u2084 AND x\u2085",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Iterate the recurrence with ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "p = 14"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 111,
                        columnNumber: 47
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "q = 2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 111,
                        columnNumber: 73
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x_4 = \\frac{x_3 + 14}{x_3 + 2} = \\frac{3 + 14}{3 + 2} = \\frac{17}{5}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 114,
                            columnNumber: 16
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x_5 = \\frac{x_4 + 14}{x_4 + 2} = \\frac{\\frac{17}{5} + 14}{\\frac{17}{5} + 2} = \\frac{\\frac{17 + 70}{5}}{\\frac{17 + 10}{5}} = \\frac{\\frac{87}{5}}{\\frac{27}{5}} = \\frac{87}{27} = \\color{#fdcb6e}{\\frac{29}{9}}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 115,
                            columnNumber: 41
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        },
        {
            label: "CONCLUSION",
            color: C.ok,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_5 = \\tfrac{29}{9}"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 121,
                        columnNumber: 19
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 121,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\color{#55efc4}{x_5 = \\frac{29}{9}}"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 122,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 122,
                columnNumber: 14
            }, this),
            conclusion: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_5 = \\tfrac{29}{9}"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 123,
                        columnNumber: 25
                    }, this),
                    ". The answer is D."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 123,
                columnNumber: 19
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 129,
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
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                            lineNumber: 133,
                                            columnNumber: 129
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 414
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 557
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MathBox, {
                                                    children: s.math
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 649
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 725
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                            lineNumber: 133,
                                            columnNumber: 389
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 133,
                                    columnNumber: 61
                                }, this),
                                i < revealed && i < solveSteps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginLeft: 13,
                                        width: 2,
                                        height: 10,
                                        background: C.border
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 133,
                                    columnNumber: 971
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 133,
                            columnNumber: 19
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
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 135,
                        columnNumber: 47
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
function VerifyStepContent() {
    const [showN, setShowN] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(3); // how many terms to reveal (x1..xN)
    const p = 14, q = 2;
    // Compute all terms as exact fractions (num/den)
    const terms = [
        {
            n: 1,
            num: 2,
            den: 1
        }
    ];
    for(let i = 1; i < 5; i++){
        const prev = terms[i - 1];
        const newNum = prev.num + p * prev.den; // x_n + p as fraction
        const newDen = prev.num + q * prev.den; // x_n + q as fraction
        // Simplify with GCD
        const gcd = (a, b)=>{
            a = Math.abs(a);
            b = Math.abs(b);
            while(b){
                [a, b] = [
                    b,
                    a % b
                ];
            }
            return a;
        };
        const g = gcd(newNum, newDen);
        terms.push({
            n: i + 1,
            num: newNum / g,
            den: newDen / g
        });
    }
    const frac = (t)=>t.den === 1 ? String(t.num) : `\\tfrac{${t.num}}{${t.den}}`;
    const decimal = (t)=>fmt(t.num / t.den);
    const isTarget = showN >= 5;
    const presets = [
        {
            label: "n3",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 162,
                        columnNumber: 31
                    }, this),
                    " to ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_3"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 162,
                        columnNumber: 53
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 162,
                columnNumber: 25
            }, this),
            val: 3
        },
        {
            label: "n4",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 163,
                        columnNumber: 31
                    }, this),
                    " to ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_4"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 163,
                        columnNumber: 53
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 163,
                columnNumber: 25
            }, this),
            val: 4
        },
        {
            label: "n5",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 164,
                        columnNumber: 31
                    }, this),
                    " to ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x_5"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 164,
                        columnNumber: 53
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 164,
                columnNumber: 25
            }, this),
            val: 5
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 169,
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
                            "1. We found ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "p = 14"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 171,
                                columnNumber: 54
                            }, this),
                            " and ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "q = 2"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 171,
                                columnNumber: 80
                            }, this),
                            ", so the recurrence is ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x_{n+1} = \\tfrac{x_n + 14}{x_n + 2}"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 171,
                                columnNumber: 123
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 4px"
                        },
                        children: "2. Tap to reveal each new term computed from the previous one"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "3. Check that ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x_5 = \\tfrac{29}{9}"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 173,
                                columnNumber: 48
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 6,
                    marginBottom: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.conclBg,
                            border: `1px solid ${C.ok}44`,
                            borderRadius: 8,
                            padding: "8px 10px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: C.ok,
                                    fontWeight: 700,
                                    marginBottom: 2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                    children: "p"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 179,
                                    columnNumber: 88
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: C.ok,
                                    fontFamily: mathFont
                                },
                                children: "14"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.conclBg,
                            border: `1px solid ${C.ok}44`,
                            borderRadius: 8,
                            padding: "8px 10px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: C.ok,
                                    fontWeight: 700,
                                    marginBottom: 2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                    children: "q"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 183,
                                    columnNumber: 88
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: C.ok,
                                    fontFamily: mathFont
                                },
                                children: "2"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 4,
                    marginBottom: 8
                },
                children: presets.map((pr)=>{
                    const active = showN === pr.val;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowN(pr.val),
                        style: {
                            flex: 1,
                            padding: "8px 4px",
                            borderRadius: 7,
                            border: `1px solid ${active ? pr.val === 5 ? C.ok : C.ps : C.border}`,
                            background: active ? (pr.val === 5 ? C.ok : C.ps) + "15" : C.card,
                            color: active ? pr.val === 5 ? C.ok : C.ps : C.muted,
                            fontSize: 12,
                            cursor: "pointer",
                            fontWeight: active ? 700 : 400
                        },
                        children: pr.jsx
                    }, pr.label, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                        lineNumber: 192,
                        columnNumber: 19
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 189,
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
                        display: "flex",
                        flexDirection: "column",
                        gap: 6
                    },
                    children: terms.slice(0, showN).map((t, i)=>{
                        const given = i < 3; // x1, x2, x3 are given
                        const isAnswer = t.n === 5;
                        const col = isAnswer ? C.ok : given ? C.muted : C.assum;
                        const bgCol = isAnswer ? C.conclBg : given ? "#1e2030" : C.assumBg;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                background: bgCol,
                                border: `1px solid ${col}44`,
                                borderRadius: 10,
                                padding: "10px 14px",
                                transition: "all 0.3s"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 36,
                                        textAlign: "center"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                        children: `\\color{${col}}{x_${t.n}}`
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                        lineNumber: 218,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 217,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 20,
                                        fontWeight: 700,
                                        fontFamily: mathFont,
                                        flex: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                            children: `\\color{${col}}{${frac(t)}}`
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                            lineNumber: 221,
                                            columnNumber: 19
                                        }, this),
                                        t.den !== 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 13,
                                                color: C.muted,
                                                marginLeft: 8
                                            },
                                            children: [
                                                "= ",
                                                decimal(t)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                            lineNumber: 222,
                                            columnNumber: 35
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 220,
                                    columnNumber: 17
                                }, this),
                                i > 0 && !given && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        textAlign: "right"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                        children: `\\color{${C.muted}}{\\tfrac{${frac(terms[i - 1])} + 14}{${frac(terms[i - 1])} + 2}}`
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                        lineNumber: 226,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 225,
                                    columnNumber: 19
                                }, this),
                                given && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: "given"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 229,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, t.n, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 211,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            isTarget ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x_5 = \\tfrac{29}{9}"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this),
                        ". The answer is D."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 239,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 238,
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
                        "Showing ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `x_1`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 246,
                            columnNumber: 21
                        }, this),
                        " to ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `x_${showN}`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 246,
                            columnNumber: 43
                        }, this),
                        ". Tap to reveal more terms."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 245,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 168,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 264,
                                    columnNumber: 124
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: META.paper
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 264,
                                    columnNumber: 323
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: "\u00B7"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 264,
                                    columnNumber: 389
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.ps
                                    },
                                    children: META.topicTag
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 264,
                                    columnNumber: 453
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 264,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 264,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 264,
                            columnNumber: 698
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 264,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 265,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 265,
                                    columnNumber: 642
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 265,
                            columnNumber: 89
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 265,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 266,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 266,
                            columnNumber: 298
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 266,
                    columnNumber: 9
                }, this),
                step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReadStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 267,
                    columnNumber: 24
                }, this),
                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SetupStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 268,
                    columnNumber: 24
                }, this),
                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SolveStepContent, {
                    revealed: revealed,
                    setRevealed: setRevealed
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 269,
                    columnNumber: 24
                }, this),
                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VerifyStepContent, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 270,
                    columnNumber: 24
                }, this),
                step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 271,
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                                    lineNumber: 271,
                                    columnNumber: 154
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 271,
                            columnNumber: 49
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 271,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 272,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 272,
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                            lineNumber: 272,
                            columnNumber: 770
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
                    lineNumber: 272,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
            lineNumber: 263,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx",
        lineNumber: 262,
        columnNumber: 5
    }, this);
}
}),
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=55f66_tmua-review_src_components_walkthroughs_tmua-2026mock_tmua-q5_tsx_6013a2f7._.js.map