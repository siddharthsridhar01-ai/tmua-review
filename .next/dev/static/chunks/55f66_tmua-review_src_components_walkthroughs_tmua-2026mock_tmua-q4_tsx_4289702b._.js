(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
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
    questionNumber: 4,
    paper: "Paper 1",
    year: "2026 Mock",
    topicTag: "Exponentials / Completing the Square"
};
const fmt = (v, dp = 2)=>{
    const r = Math.round(v * 100) / 100;
    return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(dp)).toString();
};
const opts = [
    {
        letter: "A",
        tex: "-4",
        text: "\u22124",
        ok: false,
        expl: "You might get \u22124 by completing the square incorrectly, perhaps writing (u \u2212 3)\u00B2 \u2212 9 + 10 = (u \u2212 3)\u00B2 + 1 but then confusing the minimum of the quadratic (\u22129) with the minimum of the whole expression."
    },
    {
        letter: "B",
        tex: "-1",
        text: "\u22121",
        ok: false,
        expl: "You might get \u22121 by completing the square as (u \u2212 3)\u00B2 \u2212 1, forgetting to add the constant 10 correctly."
    },
    {
        letter: "C",
        tex: "0",
        text: "0",
        ok: false,
        expl: "You might get 0 by thinking the minimum of u\u00B2 \u2212 6u + 10 is at u = 0. But the vertex is at u = 3, and u = 2^x > 0 so u = 3 is achievable."
    },
    {
        letter: "D",
        tex: "1",
        text: "1",
        ok: true,
        expl: "Substituting u = 2^x gives u\u00B2 \u2212 6u + 10 = (u \u2212 3)\u00B2 + 1. The minimum is 1, achieved when u = 3 (i.e. x = log\u2082 3). Since u = 2^x > 0 and 3 > 0, this minimum is attainable."
    },
    {
        letter: "E",
        tex: "2",
        text: "2",
        ok: false,
        expl: "You might get 2 by evaluating at x = 1 (giving 4 \u2212 12 + 10 = 2) and assuming this is the minimum without completing the square."
    },
    {
        letter: "F",
        tex: "5",
        text: "5",
        ok: false,
        expl: "You might get 5 by evaluating at x = 0 (giving 1 \u2212 6 + 10 = 5) and assuming this is the minimum."
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
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!!window.katex);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tex.useEffect": ()=>{
            if (!ready) loadKaTeX().then({
                "Tex.useEffect": ()=>setReady(true)
            }["Tex.useEffect"]);
        }
    }["Tex.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tex.useEffect": ()=>{
            if (ready && ref.current && window.katex) {
                try {
                    window.katex.render(String(children), ref.current, {
                        displayMode: !!display,
                        throwOnError: false
                    });
                } catch  {}
            }
        }
    }["Tex.useEffect"], [
        ready,
        children,
        display
    ]);
    if (!ready) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            fontFamily: mathFont
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 27,
        columnNumber: 428
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 27,
        columnNumber: 493
    }, this);
}
_s(Tex, "Sxg+uSN3kCl71JV2E3WIrxOky6g=");
_c = Tex;
function QuestionSummary() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "#1e2030",
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "10px 16px",
            marginBottom: 12,
            textAlign: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    margin: "0 0 4px",
                    fontSize: 13,
                    color: C.muted,
                    lineHeight: 1.6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 700,
                            color: C.muted,
                            letterSpacing: 0.5,
                            marginRight: 6
                        },
                        children: "Q4"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    "Find the minimum value of ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "4^x - 6 \\cdot 2^x + 10"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 34,
                        columnNumber: 35
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        "-4"
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
                        "2"
                    ],
                    [
                        "F",
                        "5"
                    ]
                ].map(([l, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            l,
                            ": ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 37,
                                columnNumber: 108
                            }, this)
                        ]
                    }, l, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 37,
                        columnNumber: 89
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c1 = QuestionSummary;
function OptionCard({ o, expanded, animate, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                alignItems: "center",
                gap: 10
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 42,
                    columnNumber: 557
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: 0,
                                fontSize: 14,
                                color: C.text
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: o.tex
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 42,
                                columnNumber: 1022
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 42,
                            columnNumber: 968
                        }, this),
                        expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                o.ok ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: "CORRECT: "
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 42,
                                    columnNumber: 1284
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: "INCORRECT: "
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 42,
                                    columnNumber: 1337
                                }, this),
                                o.expl
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 42,
                            columnNumber: 1058
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 42,
                    columnNumber: 943
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
            lineNumber: 42,
            columnNumber: 493
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 42,
        columnNumber: 66
    }, this);
}
_c2 = OptionCard;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: c.bg,
            border: `1px solid ${c.color}44`,
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 8
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 43,
                    columnNumber: 430
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 43,
                columnNumber: 397
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: c.color,
                    fontSize: 14,
                    lineHeight: 1.6
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 43,
                columnNumber: 635
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 43,
        columnNumber: 271
    }, this);
}
_c3 = InfoBox;
function MathBox({ children, style: s }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 44,
        columnNumber: 52
    }, this);
}
_c4 = MathBox;
// Parabola in u-space: y = (u-3)^2 + 1
function ParabolaGraph({ compact, dotU, dotCol }) {
    const pW = compact ? 220 : 500, pH = compact ? 140 : 240;
    const pad = {
        l: 36,
        r: 16,
        t: 20,
        b: 28
    };
    const gW = pW - pad.l - pad.r, gH = pH - pad.t - pad.b;
    const uMin = -0.5, uMax = 7, yMin = -1, yMax = 14;
    const su = (u)=>pad.l + (u - uMin) / (uMax - uMin) * gW;
    const sy = (y)=>pad.t + (yMax - y) / (yMax - yMin) * gH;
    const qfn = (u)=>(u - 3) * (u - 3) + 1;
    const pts = [];
    for(let i = 0; i <= 300; i++){
        const u = uMin + (uMax - uMin) * (i / 300);
        const y = qfn(u);
        if (y >= yMin && y <= yMax) pts.push(`${su(u).toFixed(1)},${sy(y).toFixed(1)}`);
    }
    const dotY = dotU != null ? qfn(dotU) : null;
    const dotVisible = dotU != null && dotU >= uMin && dotU <= uMax && dotY >= yMin && dotY <= yMax;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${pW} ${pH}`,
        width: pW,
        style: {
            display: "block",
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                    x: "-0.06",
                    y: "-0.15",
                    width: "1.12",
                    height: "1.35",
                    id: "labelBg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                            floodColor: "#0f1117",
                            floodOpacity: "0.85"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                            in: "SourceGraphic",
                            operator: "over"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            [
                0,
                1,
                2,
                3,
                4,
                5,
                6
            ].map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: su(u),
                    y1: pad.t,
                    x2: su(u),
                    y2: pH - pad.b,
                    stroke: C.border,
                    strokeWidth: 0.5
                }, u, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 70,
                    columnNumber: 39
                }, this)),
            [
                0,
                2,
                4,
                6,
                8,
                10,
                12
            ].map((y)=>y >= yMin && y <= yMax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: pad.l,
                    y1: sy(y),
                    x2: pW - pad.r,
                    y2: sy(y),
                    stroke: C.border,
                    strokeWidth: 0.5
                }, y, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 71,
                    columnNumber: 67
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: pad.l,
                y1: sy(0),
                x2: pW - pad.r,
                y2: sy(0),
                stroke: C.muted,
                strokeWidth: 1
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: su(0),
                y1: pad.t,
                x2: su(0),
                y2: pH - pad.b,
                stroke: C.muted,
                strokeWidth: 0.5
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M" + pts.join("L"),
                fill: "none",
                stroke: C.ps,
                strokeWidth: 2.5
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: su(3),
                y1: sy(1) - 4,
                x2: su(3),
                y2: sy(0),
                stroke: C.ok + "44",
                strokeWidth: 1,
                strokeDasharray: "4,3"
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: su(3),
                cy: sy(1),
                r: 4,
                fill: "none",
                stroke: C.ok,
                strokeWidth: 1.5,
                strokeDasharray: "3,2"
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: su(3),
                y: sy(1) + 14,
                textAnchor: "middle",
                fill: C.ok,
                fontSize: 11,
                fontFamily: mathFont,
                children: "(3, 1)"
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 78,
                columnNumber: 19
            }, this),
            dotVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: su(dotU),
                        cy: sy(dotY),
                        r: 6,
                        fill: dotCol || C.ps,
                        stroke: C.white,
                        strokeWidth: 1.5
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: su(dotU),
                        y: sy(dotY) - 12,
                        textAnchor: "middle",
                        fill: C.white,
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: mathFont,
                        filter: "url(#labelBg)",
                        children: [
                            "(",
                            fmt(dotU),
                            ", ",
                            fmt(dotY),
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 82,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true),
            !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: su(3),
                y: sy(1) + 15,
                textAnchor: "middle",
                fill: C.ok,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: mathFont,
                filter: "url(#labelBg)",
                children: "u = 3, min = 1"
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 85,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: pW - pad.r,
                y: sy(0) - 6,
                textAnchor: "end",
                fill: C.muted,
                fontSize: 11,
                fontFamily: mathFont,
                children: "u"
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: su(0) + 6,
                y: pad.t + 10,
                textAnchor: "start",
                fill: C.muted,
                fontSize: 11,
                fontFamily: mathFont,
                filter: "url(#labelBg)",
                children: [
                    "(u",
                    "\u2212",
                    "3)",
                    "\u00B2",
                    " + 1"
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 87,
                columnNumber: 20
            }, this),
            [
                0,
                2,
                4,
                6
            ].map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: su(u),
                    y: pH - pad.b + 14,
                    textAnchor: "middle",
                    fill: C.muted,
                    fontSize: 11,
                    fontFamily: mathFont,
                    children: u
                }, u, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 88,
                    columnNumber: 30
                }, this)),
            [
                2,
                4,
                6,
                8,
                10,
                12
            ].map((y)=>y >= yMin && y <= yMax && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: pad.l - 8,
                    y: sy(y) + 4,
                    textAnchor: "end",
                    fill: C.muted,
                    fontSize: 11,
                    fontFamily: mathFont,
                    children: y
                }, y, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 89,
                    columnNumber: 64
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_c5 = ParabolaGraph;
function ReadStep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 14,
                    padding: "18px 22px",
                    marginBottom: 14
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 12
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                background: C.accent + "22",
                                color: C.accent,
                                fontWeight: 700,
                                fontSize: 13,
                                padding: "3px 10px",
                                borderRadius: 6
                            },
                            children: "QUESTION 4"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 15.5,
                            lineHeight: 1.8,
                            color: C.text,
                            margin: "0 0 6px"
                        },
                        children: "Find the minimum value of"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MathBox, {
                        style: {
                            fontSize: 17,
                            padding: "12px 18px",
                            margin: "8px 0"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "4^x - 6 \\cdot 2^x + 10"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 6,
                    marginBottom: 16
                },
                children: opts.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 700,
                                    color: C.accent,
                                    marginRight: 6
                                },
                                children: o.letter
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 107,
                                columnNumber: 197
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: o.tex
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 107,
                                columnNumber: 281
                            }, this)
                        ]
                    }, o.letter, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 107,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_c6 = ReadStep;
function SetupStep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                type: "strategy",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        margin: 0
                    },
                    children: [
                        "Recognise that ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "4^x = (2^x)^2"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 118,
                            columnNumber: 49
                        }, this),
                        ", so this is a quadratic in disguise. Substitute ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "u = 2^x"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 118,
                            columnNumber: 126
                        }, this),
                        ", complete the square, and find the minimum."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                type: "insight",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 4px"
                        },
                        children: [
                            "Since ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "u = 2^x > 0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 121,
                                columnNumber: 48
                            }, this),
                            " for all real ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 121,
                                columnNumber: 88
                            }, this),
                            ", you need to check that the vertex of the quadratic falls in the region ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "u > 0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 121,
                                columnNumber: 177
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "Here the vertex is at ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "u = 3 > 0"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 122,
                                columnNumber: 56
                            }, this),
                            ", so the minimum IS attainable."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_c7 = SetupStep;
function SolveStepContent({ revealed, setRevealed }) {
    const solveSteps = [
        {
            label: "APPROACH",
            color: C.ps,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Recognise ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "4^x = (2^x)^2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 132,
                        columnNumber: 29
                    }, this),
                    " makes this a quadratic in ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u = 2^x"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 132,
                        columnNumber: 84
                    }, this),
                    ". Complete the square to find the minimum."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 132,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\text{\\color{#e2e2e8}{Let}} \\; u = 2^x \\quad \\Rightarrow \\quad u^2 = 4^x"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 133,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 133,
                columnNumber: 14
            }, this)
        },
        {
            label: "SUBSTITUTE",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Replace ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "4^x"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 137,
                        columnNumber: 27
                    }, this),
                    " with ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u^2"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 137,
                        columnNumber: 51
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "2^x"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 137,
                        columnNumber: 74
                    }, this),
                    " with ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 137,
                        columnNumber: 98
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 137,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "u^2 - 6u + 10"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 138,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 138,
                columnNumber: 14
            }, this)
        },
        {
            label: "COMPLETE THE SQUARE",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Complete the square for ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u^2 - 6u + 10"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 142,
                        columnNumber: 43
                    }, this),
                    ". Half the coefficient of ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 142,
                        columnNumber: 97
                    }, this),
                    " is ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "3"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 142,
                        columnNumber: 117
                    }, this),
                    ", so add and subtract ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "3^2 = 9"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 142,
                        columnNumber: 155
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 142,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "u^2 - 6u + 10"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 145,
                            columnNumber: 16
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= u^2 - 6u + 9 - 9 + 10"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 146,
                            columnNumber: 41
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 4
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "= (u - 3)^2 + 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 147,
                            columnNumber: 41
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            diagram: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 220,
                    background: "#1e2030",
                    border: `1px solid ${C.calc}33`,
                    borderRadius: 8,
                    overflow: "hidden"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ParabolaGraph, {
                    compact: true
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 150,
                    columnNumber: 137
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 150,
                columnNumber: 16
            }, this)
        },
        {
            label: "FIND MINIMUM",
            color: C.calc,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "The square term ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "(u-3)^2 \\ge 0"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 154,
                        columnNumber: 35
                    }, this),
                    ", so the minimum is when ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u = 3"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 154,
                        columnNumber: 89
                    }, this),
                    ". Since ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "u = 2^x > 0"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 154,
                        columnNumber: 117
                    }, this),
                    " and ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "3 > 0"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 154,
                        columnNumber: 148
                    }, this),
                    ", this is achievable at ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "x = \\log_2 3"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 154,
                        columnNumber: 192
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 154,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\color{#fdcb6e}{(3 - 3)^2 + 1 = 0 + 1 = 1 \\quad \\text{\\color{#e2e2e8}{when}} \\; u = 3 \\; (x = \\log_2 3)}"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 155,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 155,
                columnNumber: 14
            }, this)
        },
        {
            label: "CONCLUSION",
            color: C.ok,
            text: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "The minimum value is ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 159,
                        columnNumber: 40
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 159,
                columnNumber: 13
            }, this),
            math: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "\\color{#55efc4}{\\min(4^x - 6 \\cdot 2^x + 10) = 1}"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 160,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 160,
                columnNumber: 14
            }, this),
            conclusion: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "The minimum value is ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                        children: "1"
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 161,
                        columnNumber: 46
                    }, this),
                    ". The answer is D."
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 161,
                columnNumber: 19
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 18
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 10,
                                        alignItems: "flex-start"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                            lineNumber: 171,
                                            columnNumber: 129
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 414
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        margin: "0 0 6px",
                                                        fontSize: 14,
                                                        color: C.muted,
                                                        lineHeight: 1.6
                                                    },
                                                    children: s.text
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 557
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 10,
                                                        flexWrap: "wrap",
                                                        alignItems: "flex-start"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MathBox, {
                                                            style: {
                                                                flex: "1 1 220px",
                                                                alignSelf: "flex-start"
                                                            },
                                                            children: s.math
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 735
                                                        }, this),
                                                        s.diagram && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                flex: "0 0 220px",
                                                                alignSelf: "flex-start"
                                                            },
                                                            children: s.diagram
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 831
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 649
                                                }, this),
                                                i === solveSteps.length - 1 && s.conclusion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 964
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                            lineNumber: 171,
                                            columnNumber: 389
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 171,
                                    columnNumber: 61
                                }, this),
                                i < revealed && i < solveSteps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginLeft: 13,
                                        width: 2,
                                        height: 10,
                                        background: C.border
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 171,
                                    columnNumber: 1210
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 171,
                            columnNumber: 19
                        }, this);
                    }),
                    revealed < solveSteps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 173,
                        columnNumber: 47
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_c8 = SolveStepContent;
function VerifyStepContent() {
    _s1();
    const [xVal, setXVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const snapPoints = [
        0,
        1,
        Math.log2(3),
        2
    ]; // key values to snap to
    const snapRadius = 0.08; // how close before snapping
    const handleSlider = (raw)=>{
        // Check if near a snap point
        for (const sp of snapPoints){
            if (Math.abs(raw - sp) < snapRadius) return sp;
        }
        return raw;
    };
    const uVal = Math.pow(2, xVal);
    const exprVal = Math.pow(4, xVal) - 6 * Math.pow(2, xVal) + 10;
    const target = 1;
    const isExact = Math.abs(xVal - Math.log2(3)) < 0.01;
    const isNear = !isExact && Math.abs(exprVal - target) < target * 0.05;
    const isHit = isExact || isNear;
    const col = isExact ? C.ok : isNear ? C.assum : C.ps;
    const presets = [
        {
            label: "x0",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "x = 0"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 201,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 201,
                columnNumber: 25
            }, this),
            val: 0
        },
        {
            label: "x1",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "x = 1"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 202,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 202,
                columnNumber: 25
            }, this),
            val: 1
        },
        {
            label: "xlog",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "x = \\log_2 3"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 203,
                    columnNumber: 33
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 203,
                columnNumber: 27
            }, this),
            val: Math.log2(3)
        },
        {
            label: "x2",
            jsx: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                    children: "x = 2"
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 204,
                    columnNumber: 31
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 204,
                columnNumber: 25
            }, this),
            val: 2
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoBox, {
                type: "hint",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 4px"
                        },
                        children: [
                            "1. Drag the slider to change ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 211,
                                columnNumber: 71
                            }, this),
                            ", which maps to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "u = 2^x"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 211,
                                columnNumber: 103
                            }, this),
                            " on the parabola"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 4px"
                        },
                        children: [
                            "2. Watch the dot slide along ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "(u - 3)^2 + 1"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 212,
                                columnNumber: 71
                            }, this),
                            " and the expression value update"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0
                        },
                        children: [
                            "3. Find the ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                children: "x"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 213,
                                columnNumber: 46
                            }, this),
                            " value that minimises the expression"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    marginBottom: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 12,
                                    color: C.assum,
                                    fontWeight: 600
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                    children: "x"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 219,
                                    columnNumber: 75
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 16,
                                    color: C.assum,
                                    fontFamily: mathFont,
                                    fontWeight: 700
                                },
                                children: fmt(xVal)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: -0.5,
                        max: 2.5,
                        step: 0.01,
                        value: xVal,
                        onChange: (e)=>setXVal(handleSlider(+e.target.value)),
                        style: {
                            width: "100%",
                            accentColor: C.assum,
                            height: 6
                        }
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 4,
                            marginTop: 6
                        },
                        children: presets.map((pr)=>{
                            const active = isExact && Math.abs(xVal - Math.log2(3)) < 0.02;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setXVal(pr.val),
                                style: {
                                    flex: 1,
                                    padding: "6px 2px",
                                    borderRadius: 7,
                                    transition: "all 0.2s",
                                    border: `1px solid ${active && pr.val === Math.log2(3) ? C.ok : C.border}`,
                                    background: active && pr.val === Math.log2(3) ? C.ok + "15" : C.card,
                                    color: active && pr.val === Math.log2(3) ? C.ok : C.muted,
                                    fontSize: 12,
                                    cursor: "pointer",
                                    fontWeight: active && pr.val === Math.log2(3) ? 700 : 400
                                },
                                children: pr.jsx || pr.label
                            }, pr.label, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 227,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    marginBottom: 8
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ParabolaGraph, {
                    compact: false,
                    dotU: uVal,
                    dotCol: col
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 6,
                    marginBottom: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.card,
                            border: `1px solid ${C.assum}44`,
                            borderRadius: 8,
                            padding: "7px 4px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: C.assum,
                                    fontWeight: 700,
                                    marginBottom: 2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                    children: "u = 2^x"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 247,
                                    columnNumber: 91
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: C.assum,
                                    fontFamily: mathFont
                                },
                                children: fmt(uVal)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.card,
                            border: `1px solid ${col}44`,
                            borderRadius: 8,
                            padding: "7px 4px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: col,
                                    fontWeight: 700,
                                    marginBottom: 2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                    children: "(u-3)^2"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 251,
                                    columnNumber: 87
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: col,
                                    fontFamily: mathFont
                                },
                                children: fmt((uVal - 3) * (uVal - 3))
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 6,
                    marginBottom: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.card,
                            border: `1px solid ${C.assum}44`,
                            borderRadius: 8,
                            padding: "7px 4px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: C.assum,
                                    fontWeight: 700,
                                    marginBottom: 2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                    children: "x"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 259,
                                    columnNumber: 91
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: C.assum,
                                    fontFamily: mathFont
                                },
                                children: fmt(xVal)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: isExact ? C.conclBg : isNear ? C.assumBg : C.card,
                            border: `1px solid ${isExact ? C.ok + "66" : isNear ? C.assum + "66" : col + "44"}`,
                            borderRadius: 8,
                            padding: "7px 4px",
                            textAlign: "center",
                            transition: "all 0.3s"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: col,
                                    fontWeight: 700,
                                    marginBottom: 2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                    children: "4^x - 6{\\cdot}2^x + 10"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 263,
                                    columnNumber: 87
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: col,
                                    fontFamily: mathFont,
                                    transition: "color 0.3s"
                                },
                                children: fmt(exprVal)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.card,
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                            padding: "7px 4px",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: C.muted,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    marginBottom: 2
                                },
                                children: "Min"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: C.white,
                                    fontFamily: mathFont
                                },
                                children: "1"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            isExact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.conclBg,
                    border: `1px solid ${C.ok}55`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    textAlign: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.ok
                    },
                    children: [
                        "At ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x = \\log_2 3"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 276,
                            columnNumber: 16
                        }, this),
                        ", ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "u = 3"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 276,
                            columnNumber: 46
                        }, this),
                        " and ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "(u-3)^2 + 1 = 0 + 1 = 1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 276,
                            columnNumber: 71
                        }, this),
                        ". The minimum value is ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "1"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 276,
                            columnNumber: 132
                        }, this),
                        ". The answer is D."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 275,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 274,
                columnNumber: 9
            }, this) : isNear ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.assumBg,
                    border: `1px solid ${C.assum}55`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    textAlign: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.assum
                    },
                    children: [
                        "Close! Expression ",
                        "\u2248",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: fmt(exprVal)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 282,
                            columnNumber: 42
                        }, this),
                        ". Tap ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x = \\log_2 3"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 282,
                            columnNumber: 73
                        }, this),
                        " to check the exact minimum."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 281,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 280,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    textAlign: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 14,
                        fontWeight: 600,
                        color: C.muted
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: `u = ${fmt(uVal)}`
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 288,
                            columnNumber: 13
                        }, this),
                        ", expression = ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: fmt(exprVal)
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 288,
                            columnNumber: 59
                        }, this),
                        ". Slide ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                            children: "x"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 288,
                            columnNumber: 92
                        }, this),
                        " to find the minimum."
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 287,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 208,
        columnNumber: 5
    }, this);
}
_s1(VerifyStepContent, "aH+hihZLIjFP/NM9p6pxg2WiO3c=");
_c9 = VerifyStepContent;
function App() {
    _s2();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [optAnim, setOptAnim] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(opts.map({
        "App.useState": ()=>false
    }["App.useState"]));
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (step === 4) {
                opts.forEach({
                    "App.useEffect": (_, i)=>{
                        setTimeout({
                            "App.useEffect": ()=>setOptAnim({
                                    "App.useEffect": (p)=>{
                                        const n = [
                                            ...p
                                        ];
                                        n[i] = true;
                                        return n;
                                    }
                                }["App.useEffect"])
                        }["App.useEffect"], i * 100);
                    }
                }["App.useEffect"]);
            } else {
                setOptAnim(opts.map({
                    "App.useEffect": ()=>false
                }["App.useEffect"]));
                setExpanded(null);
            }
        }
    }["App.useEffect"], [
        step
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (step !== 2) setRevealed(0);
        }
    }["App.useEffect"], [
        step
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: C.bg,
            fontFamily: bodyFont,
            letterSpacing: 0.2,
            padding: "20px 14px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 800,
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: 20
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 4
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 306,
                                    columnNumber: 124
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: META.paper
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 306,
                                    columnNumber: 323
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.muted
                                    },
                                    children: "\u00B7"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 306,
                                    columnNumber: 389
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: C.ps
                                    },
                                    children: META.topicTag
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 306,
                                    columnNumber: 453
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 306,
                            columnNumber: 43
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 306,
                            columnNumber: 525
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 306,
                            columnNumber: 698
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 306,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: 3,
                        marginBottom: 20
                    },
                    children: stepsMeta.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted
                                    },
                                    children: s.id + 1
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 307,
                                    columnNumber: 505
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 11,
                                        fontWeight: step === s.id ? 700 : 500,
                                        color: step === s.id ? C.white : step > s.id ? C.accentLight : C.muted,
                                        whiteSpace: "nowrap"
                                    },
                                    children: s.label
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 307,
                                    columnNumber: 642
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 307,
                            columnNumber: 89
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 308,
                            columnNumber: 90
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: 16,
                                fontWeight: 700,
                                color: C.white,
                                margin: 0
                            },
                            children: stepsMeta[step].title
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 308,
                            columnNumber: 298
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 308,
                    columnNumber: 9
                }, this),
                step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReadStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 309,
                    columnNumber: 24
                }, this),
                step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SetupStep, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 310,
                    columnNumber: 24
                }, this),
                step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SolveStepContent, {
                    revealed: revealed,
                    setRevealed: setRevealed
                }, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 311,
                    columnNumber: 24
                }, this),
                step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VerifyStepContent, {}, void 0, false, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 312,
                    columnNumber: 24
                }, this),
                step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionSummary, {}, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 313,
                            columnNumber: 30
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 6,
                                marginBottom: 20
                            },
                            children: opts.map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OptionCard, {
                                    o: o,
                                    expanded: expanded === i,
                                    animate: optAnim[i],
                                    onClick: ()=>setExpanded(expanded === i ? null : i)
                                }, o.letter, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                                    lineNumber: 313,
                                    columnNumber: 154
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 313,
                            columnNumber: 49
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 313,
                    columnNumber: 25
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: 10,
                        marginTop: 20,
                        paddingBottom: 28
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 314,
                            columnNumber: 85
                        }, this),
                        step < 4 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 314,
                            columnNumber: 489
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                            lineNumber: 314,
                            columnNumber: 770
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
            lineNumber: 305,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx",
        lineNumber: 304,
        columnNumber: 5
    }, this);
}
_s2(App, "Q7uSj6wpFv2VqK215hhGj3+X/lw=");
_c10 = App;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "Tex");
__turbopack_context__.k.register(_c1, "QuestionSummary");
__turbopack_context__.k.register(_c2, "OptionCard");
__turbopack_context__.k.register(_c3, "InfoBox");
__turbopack_context__.k.register(_c4, "MathBox");
__turbopack_context__.k.register(_c5, "ParabolaGraph");
__turbopack_context__.k.register(_c6, "ReadStep");
__turbopack_context__.k.register(_c7, "SetupStep");
__turbopack_context__.k.register(_c8, "SolveStepContent");
__turbopack_context__.k.register(_c9, "VerifyStepContent");
__turbopack_context__.k.register(_c10, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=55f66_tmua-review_src_components_walkthroughs_tmua-2026mock_tmua-q4_tsx_4289702b._.js.map