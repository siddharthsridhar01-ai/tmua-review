(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/tmua-review/tmua-review/src/lib/tmua.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "C",
    ()=>C,
    "getResult",
    ()=>getResult,
    "topicColors",
    ()=>topicColors
]);
const C = {
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
    calc: "#fdcb6e"
};
const topicColors = {
    "Algebra": "#74b9ff",
    "Calculus": "#a29bfe",
    "Trigonometry": "#fdcb6e",
    "Sequences & Series": "#55efc4",
    "Geometry": "#fd79a8",
    "Probability": "#e17055",
    "Optimisation": "#00b894",
    "Logarithms": "#ffeaa7",
    "Differential Equations": "#c09875",
    "Number Theory": "#636e72"
};
function getResult(q, answers) {
    const sa = answers[q.displayNum];
    if (!sa) return "unanswered";
    return sa === q.correctAnswer ? "correct" : "incorrect";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/tmua-review/tmua-review/src/lib/papers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "papers",
    ()=>papers
]);
const papers = {
    "tmua-2026mock": {
        title: "TMUA 2026 Mock Paper 1",
        source: "AceAdmissions Mock",
        questions: [
            {
                displayNum: 1,
                topic: "Trigonometry",
                correctAnswer: "B",
                hasWalkthrough: true,
                text: "How many real solutions to sin\u2074x \u2212 3sin\u00B2x + 2 = 0 in [0, 2\u03C0]?",
                richText: [
                    "How many real solutions are there to the equation",
                    "br",
                    {
                        display: "\\sin^4 x - 3\\sin^2 x + 2 = 0"
                    },
                    "in the interval ",
                    {
                        tex: "0 \\le x \\le 2\\pi"
                    },
                    "?"
                ],
                options: [
                    {
                        letter: "A",
                        tex: "1"
                    },
                    {
                        letter: "B",
                        tex: "2"
                    },
                    {
                        letter: "C",
                        tex: "3"
                    },
                    {
                        letter: "D",
                        tex: "4"
                    },
                    {
                        letter: "E",
                        tex: "5"
                    },
                    {
                        letter: "F",
                        tex: "6"
                    },
                    {
                        letter: "G",
                        tex: "7"
                    },
                    {
                        letter: "H",
                        tex: "8"
                    }
                ]
            },
            {
                displayNum: 2,
                topic: "Calculus",
                correctAnswer: "E",
                hasWalkthrough: true,
                text: "Curve y = 2x\u00B3\u22129x\u00B2+12x\u22123 has turning points. Find integral between them.",
                richText: [
                    "The curve",
                    "br",
                    {
                        display: "y = 2x^3 - 9x^2 + 12x - 3"
                    },
                    "has turning points at ",
                    {
                        tex: "x = \\alpha"
                    },
                    " and ",
                    {
                        tex: "x = \\beta"
                    },
                    ", where ",
                    {
                        tex: "\\beta > \\alpha"
                    },
                    ".",
                    "br",
                    "Find ",
                    {
                        tex: "\\displaystyle\\int_\\alpha^\\beta (2x^3 - 9x^2 + 12x - 3)\\,dx"
                    },
                    "."
                ],
                options: [
                    {
                        letter: "A",
                        tex: "-\\tfrac{3}{2}"
                    },
                    {
                        letter: "B",
                        tex: "-\\tfrac{1}{2}"
                    },
                    {
                        letter: "C",
                        tex: "0"
                    },
                    {
                        letter: "D",
                        tex: "\\tfrac{1}{2}"
                    },
                    {
                        letter: "E",
                        tex: "\\tfrac{3}{2}"
                    },
                    {
                        letter: "F",
                        tex: "3"
                    }
                ]
            },
            {
                displayNum: 3,
                topic: "Sequences & Series",
                correctAnswer: "D",
                hasWalkthrough: true,
                text: "AP and GP with first term 3. Second terms sum to 5, third to 13/3. Find S\u221E.",
                richText: [
                    "An arithmetic progression and a convergent geometric progression each have first term ",
                    {
                        tex: "3"
                    },
                    ".",
                    "br",
                    "The sum of their second terms is ",
                    {
                        tex: "5"
                    },
                    ". The sum of their third terms is ",
                    {
                        tex: "\\tfrac{13}{3}"
                    },
                    ".",
                    "br",
                    "What is the sum to infinity of the geometric progression?"
                ],
                options: [
                    {
                        letter: "A",
                        tex: "4"
                    },
                    {
                        letter: "B",
                        tex: "6"
                    },
                    {
                        letter: "C",
                        tex: "8"
                    },
                    {
                        letter: "D",
                        tex: "9"
                    },
                    {
                        letter: "E",
                        tex: "12"
                    },
                    {
                        letter: "F",
                        tex: "18"
                    }
                ]
            },
            {
                displayNum: 4,
                topic: "Algebra",
                correctAnswer: "D",
                hasWalkthrough: true,
                text: "Find the minimum value of 4\u02E3 \u2212 6\u00B72\u02E3 + 10.",
                richText: [
                    "Find the minimum value of",
                    "br",
                    {
                        display: "4^x - 6 \\cdot 2^x + 10"
                    }
                ],
                options: [
                    {
                        letter: "A",
                        tex: "-4"
                    },
                    {
                        letter: "B",
                        tex: "-1"
                    },
                    {
                        letter: "C",
                        tex: "0"
                    },
                    {
                        letter: "D",
                        tex: "1"
                    },
                    {
                        letter: "E",
                        tex: "2"
                    },
                    {
                        letter: "F",
                        tex: "5"
                    }
                ]
            },
            {
                displayNum: 5,
                topic: "Sequences & Series",
                correctAnswer: "D",
                hasWalkthrough: true,
                text: "Recurrence x_{n+1} = (x_n+p)/(x_n+q). Given x\u2081=2, x\u2082=4, x\u2083=3, find x\u2085.",
                richText: [
                    "The terms ",
                    {
                        tex: "x_n"
                    },
                    " of a sequence follow the rule",
                    "br",
                    {
                        display: "x_{n+1} = \\dfrac{x_n + p}{x_n + q}"
                    },
                    "where ",
                    {
                        tex: "p"
                    },
                    " and ",
                    {
                        tex: "q"
                    },
                    " are real numbers.",
                    "br",
                    "Given that ",
                    {
                        tex: "x_1 = 2"
                    },
                    ", ",
                    {
                        tex: "x_2 = 4"
                    },
                    ", and ",
                    {
                        tex: "x_3 = 3"
                    },
                    ", find the value of ",
                    {
                        tex: "x_5"
                    },
                    "."
                ],
                options: [
                    {
                        letter: "A",
                        tex: "-5"
                    },
                    {
                        letter: "B",
                        tex: "-\\tfrac{5}{3}"
                    },
                    {
                        letter: "C",
                        tex: "\\tfrac{11}{5}"
                    },
                    {
                        letter: "D",
                        tex: "\\tfrac{29}{9}"
                    },
                    {
                        letter: "E",
                        tex: "\\tfrac{17}{3}"
                    },
                    {
                        letter: "F",
                        tex: "13"
                    }
                ]
            },
            {
                displayNum: 6,
                topic: "Trigonometry",
                correctAnswer: "D",
                hasWalkthrough: true,
                text: "f(x) = (sin x + 2)/(5 + 4sin x \u2212 cos\u00B2x). Find max \u2212 min.",
                richText: [
                    "The function ",
                    {
                        tex: "f"
                    },
                    " is given by",
                    "br",
                    {
                        display: "f(x) = \\dfrac{\\sin x + 2}{5 + 4\\sin x - \\cos^2 x}"
                    },
                    "Find the positive difference between the maximum and the minimum values of ",
                    {
                        tex: "f(x)"
                    },
                    "."
                ],
                options: [
                    {
                        letter: "A",
                        tex: "0"
                    },
                    {
                        letter: "B",
                        tex: "\\tfrac{1}{3}"
                    },
                    {
                        letter: "C",
                        tex: "\\tfrac{1}{2}"
                    },
                    {
                        letter: "D",
                        tex: "\\tfrac{2}{3}"
                    },
                    {
                        letter: "E",
                        tex: "1"
                    },
                    {
                        letter: "F",
                        tex: "2"
                    }
                ]
            },
            {
                displayNum: 7,
                topic: "Calculus",
                correctAnswer: "D",
                hasWalkthrough: true,
                text: "Find total area between y = 0 and y = x\u00B2 \u2212 6|x| + 5.",
                richText: [
                    "Find the total area of the region enclosed by ",
                    {
                        tex: "y = 0"
                    },
                    " and",
                    "br",
                    {
                        display: "y = x^2 - 6|x| + 5"
                    }
                ],
                options: [
                    {
                        letter: "A",
                        tex: "\\tfrac{32}{3}"
                    },
                    {
                        letter: "B",
                        tex: "16"
                    },
                    {
                        letter: "C",
                        tex: "\\tfrac{56}{3}"
                    },
                    {
                        letter: "D",
                        tex: "\\tfrac{64}{3}"
                    },
                    {
                        letter: "E",
                        tex: "24"
                    },
                    {
                        letter: "F",
                        tex: "32"
                    }
                ]
            },
            {
                displayNum: 8,
                topic: "Sequences & Series",
                correctAnswer: "B",
                hasWalkthrough: true,
                text: "Sum of first n terms of GP is 5\u207F \u2212 1. Find S\u2082\u2080/S\u2081\u2080.",
                richText: [
                    "The sum of the first ",
                    {
                        tex: "n"
                    },
                    " terms of a geometric series is ",
                    {
                        tex: "5^n - 1"
                    },
                    ".",
                    "br",
                    "Find ",
                    {
                        tex: "\\dfrac{S_{20}}{S_{10}}"
                    },
                    "."
                ],
                options: [
                    {
                        letter: "A",
                        tex: "2^5"
                    },
                    {
                        letter: "B",
                        tex: "2^{10}"
                    },
                    {
                        letter: "C",
                        tex: "2^{15}"
                    },
                    {
                        letter: "D",
                        tex: "2^{20}"
                    },
                    {
                        letter: "E",
                        tex: "2^{10}(2^{10} - 1)"
                    }
                ]
            },
            {
                displayNum: 9,
                topic: "Algebra",
                correctAnswer: "B",
                hasWalkthrough: true,
                text: "f\u00B2(x) \u2212 3cos(x)f(x) \u2212 4 = 0. Find min f(x).",
                richText: [
                    "The function ",
                    {
                        tex: "f"
                    },
                    " satisfies",
                    "br",
                    {
                        display: "f^2(x) - 3\\cos(x)\\,f(x) - 4 = 0"
                    },
                    "for all real ",
                    {
                        tex: "x"
                    },
                    ". Find the minimum value of ",
                    {
                        tex: "f(x)"
                    },
                    "."
                ],
                options: [
                    {
                        letter: "A",
                        tex: "-4"
                    },
                    {
                        letter: "B",
                        tex: "-3"
                    },
                    {
                        letter: "C",
                        tex: "-2"
                    },
                    {
                        letter: "D",
                        tex: "-1"
                    },
                    {
                        letter: "E",
                        tex: "0"
                    },
                    {
                        letter: "F",
                        tex: "1"
                    }
                ]
            },
            {
                displayNum: 10,
                topic: "Algebra",
                correctAnswer: "E",
                hasWalkthrough: true,
                text: "Translations of y = x\u00B2. Which graphs could result?",
                richText: [
                    "A sequence of translations is applied to the graph of ",
                    {
                        tex: "y = x^2"
                    },
                    ".",
                    "br",
                    "Which of the following graphs could be the result of this sequence of translations?"
                ],
                options: [
                    {
                        letter: "A",
                        tex: "\\text{none}"
                    },
                    {
                        letter: "B",
                        tex: "\\text{I only}"
                    },
                    {
                        letter: "C",
                        tex: "\\text{II only}"
                    },
                    {
                        letter: "D",
                        tex: "\\text{III only}"
                    },
                    {
                        letter: "E",
                        tex: "\\text{I and II only}"
                    },
                    {
                        letter: "F",
                        tex: "\\text{I and III only}"
                    },
                    {
                        letter: "G",
                        tex: "\\text{II and III only}"
                    },
                    {
                        letter: "H",
                        tex: "\\text{I, II and III}"
                    }
                ]
            },
            {
                displayNum: 11,
                topic: "Sequences & Series",
                correctAnswer: "E",
                hasWalkthrough: true,
                text: "Find the telescoping log sum.",
                richText: [
                    "Find",
                    "br",
                    {
                        display: "\\sum_{k=1}^{99} \\bigl(\\log_{10}(k+1) - \\log_{10}(k)\\bigr)"
                    }
                ],
                options: [
                    {
                        letter: "A",
                        tex: "-2"
                    },
                    {
                        letter: "B",
                        tex: "-1"
                    },
                    {
                        letter: "C",
                        tex: "0"
                    },
                    {
                        letter: "D",
                        tex: "1"
                    },
                    {
                        letter: "E",
                        tex: "2"
                    },
                    {
                        letter: "F",
                        tex: "\\log_{10} 99"
                    }
                ]
            },
            {
                displayNum: 12,
                topic: "Algebra",
                correctAnswer: "D",
                hasWalkthrough: true,
                text: "Min of x\u2074 \u2212 4kx\u00B2 + 5k\u00B2 \u2212 1 as k varies.",
                richText: [
                    "Find the minimum value of",
                    "br",
                    {
                        display: "x^4 - 4kx^2 + 5k^2 - 1"
                    },
                    "as ",
                    {
                        tex: "k"
                    },
                    " varies over all real numbers."
                ],
                options: [
                    {
                        letter: "A",
                        tex: "-3"
                    },
                    {
                        letter: "B",
                        tex: "-1"
                    },
                    {
                        letter: "C",
                        tex: "0"
                    },
                    {
                        letter: "D",
                        tex: "1"
                    },
                    {
                        letter: "E",
                        tex: "3"
                    },
                    {
                        letter: "F",
                        tex: "5"
                    }
                ]
            },
            {
                displayNum: 13,
                topic: "Calculus",
                correctAnswer: "C",
                hasWalkthrough: true,
                text: "[0, N] divided into N sub-intervals. Find N for total area = 25.",
                richText: [
                    "The interval ",
                    {
                        tex: "[0, N]"
                    },
                    " is divided into ",
                    {
                        tex: "N"
                    },
                    " equal sub-intervals. A rectangle of height ",
                    {
                        tex: "f(x_i)"
                    },
                    " is drawn on each.",
                    "br",
                    "Find ",
                    {
                        tex: "N"
                    },
                    " such that the sum of the rectangle areas equals ",
                    {
                        tex: "25"
                    },
                    "."
                ],
                options: [
                    {
                        letter: "A",
                        tex: "15"
                    },
                    {
                        letter: "B",
                        tex: "20"
                    },
                    {
                        letter: "C",
                        tex: "25"
                    },
                    {
                        letter: "D",
                        tex: "30"
                    },
                    {
                        letter: "E",
                        tex: "35"
                    },
                    {
                        letter: "F",
                        tex: "50"
                    }
                ]
            },
            {
                displayNum: 14,
                topic: "Calculus",
                correctAnswer: "C",
                hasWalkthrough: true,
                text: "y = x\u00B3 \u2212 3x + k has exactly two roots. How many integer k?",
                richText: [
                    "The cubic ",
                    {
                        tex: "y = x^3 - 3x + k"
                    },
                    " has exactly two distinct real roots.",
                    "br",
                    "Find the number of possible integer values of ",
                    {
                        tex: "k"
                    },
                    "."
                ],
                options: [
                    {
                        letter: "A",
                        tex: "-4"
                    },
                    {
                        letter: "B",
                        tex: "-2"
                    },
                    {
                        letter: "C",
                        tex: "0"
                    },
                    {
                        letter: "D",
                        tex: "2"
                    },
                    {
                        letter: "E",
                        tex: "4"
                    },
                    {
                        letter: "F",
                        tex: "\\pm 2"
                    }
                ]
            },
            {
                displayNum: 15,
                topic: "Optimisation",
                correctAnswer: "C",
                hasWalkthrough: true,
                text: "Rectangle between two parabolas, symmetric. Max area?",
                richText: [
                    "A rectangle is drawn in the region enclosed by the curves",
                    "br",
                    {
                        display: "y = x^2 - 1 \\qquad \\text{and} \\qquad y = 5 - x^2"
                    },
                    "such that the sides of the rectangle are parallel to the x- and y-axes and the rectangle is symmetric about the y-axis.",
                    "br",
                    "What is the maximum possible area of the rectangle?"
                ],
                options: [
                    {
                        letter: "A",
                        tex: "4"
                    },
                    {
                        letter: "B",
                        tex: "6"
                    },
                    {
                        letter: "C",
                        tex: "8"
                    },
                    {
                        letter: "D",
                        tex: "10"
                    },
                    {
                        letter: "E",
                        tex: "12"
                    },
                    {
                        letter: "F",
                        tex: "16"
                    }
                ]
            },
            {
                displayNum: 16,
                topic: "Trigonometry",
                correctAnswer: "A",
                hasWalkthrough: true,
                text: "8x\u2074\u221210x\u00B2+3=0 roots are \u00B1cos\u03B1, \u00B1cos\u03B2. Find sin equation.",
                richText: [
                    "The solutions to",
                    "br",
                    {
                        display: "8x^4 - 10x^2 + 3 = 0"
                    },
                    "are ",
                    {
                        tex: "\\pm\\cos\\alpha"
                    },
                    " and ",
                    {
                        tex: "\\pm\\cos\\beta"
                    },
                    ".",
                    "br",
                    "Which one of the following equations has solutions ",
                    {
                        tex: "\\pm\\sin\\alpha"
                    },
                    " and ",
                    {
                        tex: "\\pm\\sin\\beta"
                    },
                    "?"
                ],
                options: [
                    {
                        letter: "A",
                        tex: "8x^4 - 6x^2 + 1 = 0"
                    },
                    {
                        letter: "B",
                        tex: "8x^4 + 6x^2 - 1 = 0"
                    },
                    {
                        letter: "C",
                        tex: "8x^4 - 10x^2 + 3 = 0"
                    },
                    {
                        letter: "D",
                        tex: "3x^4 - 10x^2 + 8 = 0"
                    },
                    {
                        letter: "E",
                        tex: "3x^4 - 8x^2 + 3 = 0"
                    },
                    {
                        letter: "F",
                        tex: "3x^4 + 8x^2 - 3 = 0"
                    }
                ]
            },
            {
                displayNum: 17,
                topic: "Geometry",
                correctAnswer: "D",
                hasWalkthrough: true,
                text: "Square S_n vertices (\u00B1n,\u00B1n). Pairs shaded. Total area?",
                richText: [
                    "A square ",
                    {
                        tex: "S_n"
                    },
                    " has vertices at ",
                    {
                        tex: "(\\pm n, \\pm n)"
                    },
                    ".",
                    "br",
                    {
                        tex: "S_1"
                    },
                    " and ",
                    {
                        tex: "S_2"
                    },
                    " are drawn and the region between them is shaded. Then ",
                    {
                        tex: "S_3"
                    },
                    " and ",
                    {
                        tex: "S_4"
                    },
                    " are drawn and the region between them is shaded.",
                    "br",
                    "This continues until ",
                    {
                        tex: "50"
                    },
                    " squares have been drawn. What is the total shaded area?"
                ],
                options: [
                    {
                        letter: "A",
                        tex: "2500"
                    },
                    {
                        letter: "B",
                        tex: "3400"
                    },
                    {
                        letter: "C",
                        tex: "4800"
                    },
                    {
                        letter: "D",
                        tex: "5100"
                    },
                    {
                        letter: "E",
                        tex: "5200"
                    },
                    {
                        letter: "F",
                        tex: "10200"
                    }
                ]
            },
            {
                displayNum: 18,
                topic: "Probability",
                correctAnswer: "B",
                hasWalkthrough: true,
                text: "Geometric series S with random k. P(S finite and >8)?",
                richText: [
                    "You are given that",
                    "br",
                    {
                        display: "S = 5 + 5\\!\\left(\\frac{3k}{10}\\right) + 5\\!\\left(\\frac{3k}{10}\\right)^{\\!2} + \\cdots"
                    },
                    "The integer ",
                    {
                        tex: "k"
                    },
                    " is chosen uniformly at random from ",
                    {
                        tex: "-3 \\le k \\le 3"
                    },
                    ".",
                    "br",
                    "What is the probability that ",
                    {
                        tex: "S"
                    },
                    " is a finite number greater than ",
                    {
                        tex: "8"
                    },
                    "?"
                ],
                options: [
                    {
                        letter: "A",
                        tex: "\\tfrac{1}{7}"
                    },
                    {
                        letter: "B",
                        tex: "\\tfrac{2}{7}"
                    },
                    {
                        letter: "C",
                        tex: "\\tfrac{3}{7}"
                    },
                    {
                        letter: "D",
                        tex: "\\tfrac{4}{7}"
                    },
                    {
                        letter: "E",
                        tex: "\\tfrac{5}{7}"
                    },
                    {
                        letter: "F",
                        tex: "\\tfrac{6}{7}"
                    }
                ]
            },
            {
                displayNum: 19,
                topic: "Differential Equations",
                correctAnswer: "C",
                hasWalkthrough: true,
                text: "dy/dx = |3\u2212x| \u2212 |x\u22121|. Find f(0)+f(2)+f(4).",
                richText: [
                    "The solution to the differential equation",
                    "br",
                    {
                        display: "\\frac{dy}{dx} = |3 - x| - |x - 1| \\quad \\text{for all } x"
                    },
                    "is ",
                    {
                        tex: "y = f(x) + c"
                    },
                    ", where ",
                    {
                        tex: "c"
                    },
                    " is a constant.",
                    "br",
                    "Find the value of ",
                    {
                        tex: "f(0) + f(2) + f(4)"
                    },
                    "."
                ],
                options: [
                    {
                        letter: "A",
                        tex: "1"
                    },
                    {
                        letter: "B",
                        tex: "2"
                    },
                    {
                        letter: "C",
                        tex: "3"
                    },
                    {
                        letter: "D",
                        tex: "4"
                    },
                    {
                        letter: "E",
                        tex: "5"
                    },
                    {
                        letter: "F",
                        tex: "6"
                    }
                ]
            },
            {
                displayNum: 20,
                topic: "Logarithms",
                correctAnswer: "C",
                hasWalkthrough: true,
                text: "Find area enclosed by log curve.",
                richText: [
                    "Find the area enclosed by the curve",
                    "br",
                    {
                        display: "\\log_{10}(x^2 + y^2) = 1 + \\log_{10}(2y - 2x)"
                    }
                ],
                options: [
                    {
                        letter: "A",
                        tex: "50\\pi"
                    },
                    {
                        letter: "B",
                        tex: "100\\pi"
                    },
                    {
                        letter: "C",
                        tex: "200\\pi"
                    },
                    {
                        letter: "D",
                        tex: "400\\pi"
                    },
                    {
                        letter: "E",
                        tex: "10\\sqrt{2}\\,\\pi"
                    },
                    {
                        letter: "F",
                        tex: "20\\sqrt{2}\\,\\pi"
                    }
                ]
            }
        ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WalkthroughLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/src/lib/tmua.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
"use client";
;
;
;
function LoadingState() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
            border: "1px solid " + __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border,
            borderRadius: 16,
            padding: "60px 28px",
            textAlign: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 32,
                    height: 32,
                    border: "3px solid " + __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border,
                    borderTopColor: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent,
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    animation: "spin 0.8s linear infinite"
                }
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: 14,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                    margin: 0
                },
                children: "Loading walkthrough..."
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `@keyframes spin { to { transform: rotate(360deg); } }`
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = LoadingState;
const L = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingState, {}, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
        lineNumber: 29,
        columnNumber: 17
    }, ("TURBOPACK compile-time value", void 0));
_c1 = L;
const walkthroughMap = {
    "tmua-2026mock": {
        1: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q1.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q1.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        2: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q2.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q2.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        3: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q3.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q3.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        4: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q4.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        5: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q5.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        6: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q6.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q6.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        7: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q7.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q7.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        8: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q8.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q8.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        9: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q9.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q9.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        10: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q10.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q10.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        11: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q11.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q11.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        12: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q12.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        13: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q13.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        14: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q14.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q14.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        15: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q15.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q15.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        16: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q16.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        17: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q17.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q17.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        18: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q18.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q18.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        19: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q19.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q19.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        }),
        20: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q20.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/tmua-review/tmua-review/src/components/walkthroughs/tmua-2026mock/tmua-q20.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            loading: L
        })
    }
};
function WalkthroughLoader({ paperId, displayNum }) {
    const paper = walkthroughMap[paperId];
    if (!paper) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                border: "1px solid " + __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border,
                borderRadius: 16,
                padding: "40px 28px",
                textAlign: "center"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: 14,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail,
                    margin: 0
                },
                children: "Paper not found."
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this);
    }
    const Component = paper[displayNum];
    if (!Component) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                border: "1px solid " + __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border,
                borderRadius: 16,
                padding: "40px 28px",
                textAlign: "center"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: 14,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                    margin: 0
                },
                children: "Walkthrough not yet available for this question."
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {}, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx",
        lineNumber: 77,
        columnNumber: 10
    }, this);
}
_c2 = WalkthroughLoader;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "LoadingState");
__turbopack_context__.k.register(_c1, "L");
__turbopack_context__.k.register(_c2, "WalkthroughLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReviewPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/src/lib/tmua.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$papers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/src/lib/papers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$components$2f$walkthroughs$2f$WalkthroughLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/src/components/walkthroughs/WalkthroughLoader.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
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
            const fix = document.createElement("style");
            fix.id = "katex-fix";
            fix.textContent = ".katex { font-size: 1.05em; }";
            document.head.appendChild(fix);
        }
        const script = document.createElement("script");
        script.src = KATEX_JS;
        script.onload = ()=>resolve();
        document.head.appendChild(script);
    });
    return katexLoadPromise;
}
function Tex({ children }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tex.useEffect": ()=>{
            loadKaTeX().then({
                "Tex.useEffect": ()=>setReady(true)
            }["Tex.useEffect"]);
        }
    }["Tex.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tex.useEffect": ()=>{
            if (ready && ref.current && window.katex) {
                try {
                    window.katex.render(String(children), ref.current, {
                        displayMode: false,
                        throwOnError: false
                    });
                } catch  {}
            }
        }
    }["Tex.useEffect"], [
        ready,
        children
    ]);
    if (!ready) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        children: children
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
        lineNumber: 26,
        columnNumber: 22
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref
    }, void 0, false, {
        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, this);
}
_s(Tex, "OzaYED992pxj5XFmWcMZALcuLGY=");
_c = Tex;
const mockAnswers = {
    1: "B",
    2: "D",
    3: "D",
    4: "D",
    5: "C",
    6: "D",
    7: "D",
    8: "B",
    9: "A",
    10: "E",
    11: "E",
    12: "C",
    13: "C",
    14: "C",
    15: "C",
    16: "B",
    17: "D",
    18: "B",
    19: "C",
    20: "A"
};
function parseAnswersFromURL(param) {
    if (!param) return null;
    try {
        const parsed = JSON.parse(decodeURIComponent(param));
        if (typeof parsed === "object" && parsed !== null) {
            const result = {};
            for (const [k, v] of Object.entries(parsed)){
                result[Number(k)] = String(v);
            }
            return result;
        }
    } catch  {}
    return null;
}
function ReviewPage({ params }) {
    _s1();
    const { paperId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const paper = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$papers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["papers"][paperId];
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("summary");
    const [activeQ, setActiveQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAll, setShowAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [walkthroughOpen, setWalkthroughOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const urlAnswers = parseAnswersFromURL(searchParams.get("answers"));
    const answers = urlAnswers || mockAnswers;
    const isFromExam = !!urlAnswers;
    if (!paper) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: "100vh",
                background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail,
                    fontSize: 16,
                    fontFamily: "'Trebuchet MS', 'Gill Sans', Calibri, sans-serif"
                },
                children: "Paper not found."
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this);
    }
    const { questions, title, source } = paper;
    const total = questions.length;
    const correct = questions.filter((q)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResult"])(q, answers) === "correct").length;
    const incorrect = total - correct;
    const pct = Math.round(correct / total * 100);
    const filteredQs = showAll ? questions : questions.filter((q)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResult"])(q, answers) === "incorrect");
    const currentQ = activeQ !== null ? questions.find((q)=>q.displayNum === activeQ) || null : null;
    const font = "'Trebuchet MS', 'Gill Sans', Calibri, sans-serif";
    const headingFont = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReviewPage.useEffect": ()=>{
            const handleKey = {
                "ReviewPage.useEffect.handleKey": (e)=>{
                    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
                    if (view !== "review" || walkthroughOpen) return;
                    const idx = filteredQs.findIndex({
                        "ReviewPage.useEffect.handleKey.idx": (q)=>q.displayNum === activeQ
                    }["ReviewPage.useEffect.handleKey.idx"]);
                    if (e.key === "ArrowLeft" && idx > 0) {
                        e.preventDefault();
                        setActiveQ(filteredQs[idx - 1].displayNum);
                    } else if (e.key === "ArrowRight" && idx < filteredQs.length - 1) {
                        e.preventDefault();
                        setActiveQ(filteredQs[idx + 1].displayNum);
                    }
                }
            }["ReviewPage.useEffect.handleKey"];
            window.addEventListener("keydown", handleKey);
            return ({
                "ReviewPage.useEffect": ()=>window.removeEventListener("keydown", handleKey)
            })["ReviewPage.useEffect"];
        }
    }["ReviewPage.useEffect"], [
        view,
        activeQ,
        walkthroughOpen,
        filteredQs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReviewPage.useEffect": ()=>{
            const handleComplete = {
                "ReviewPage.useEffect.handleComplete": ()=>setWalkthroughOpen(null)
            }["ReviewPage.useEffect.handleComplete"];
            window.addEventListener("walkthrough-complete", handleComplete);
            return ({
                "ReviewPage.useEffect": ()=>window.removeEventListener("walkthrough-complete", handleComplete)
            })["ReviewPage.useEffect"];
        }
    }["ReviewPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].bg,
            fontFamily: font,
            letterSpacing: 0.2
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                    borderBottom: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                    padding: "16px 24px",
                    position: "sticky",
                    top: 0,
                    zIndex: 50
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: 900,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/",
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                textDecoration: "none",
                                cursor: "pointer"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        background: `linear-gradient(135deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent}, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accentLight})`,
                                        borderRadius: 8,
                                        padding: "5px 12px",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                        letterSpacing: 1
                                    },
                                    children: "TMUA"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 14,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                        fontWeight: 600
                                    },
                                    children: "Mathematics"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted
                                    },
                                    children: "Paper 1"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 4
                            },
                            children: [
                                "summary",
                                "review"
                            ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setView(v);
                                        setActiveQ(null);
                                        setWalkthroughOpen(null);
                                    },
                                    style: {
                                        padding: "8px 18px",
                                        borderRadius: 8,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        background: view === v ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent : "transparent",
                                        border: `1px solid ${view === v ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                        color: view === v ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                        cursor: "pointer",
                                        fontFamily: font,
                                        position: "relative"
                                    },
                                    children: [
                                        v === "summary" ? "Summary" : "Review",
                                        v === "review" && incorrect > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                position: "absolute",
                                                top: -6,
                                                right: -6,
                                                background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail,
                                                borderRadius: 10,
                                                padding: "2px 6px",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                                minWidth: 16,
                                                textAlign: "center"
                                            },
                                            children: incorrect
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, v, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 900,
                    margin: "0 auto",
                    padding: "24px 16px"
                },
                children: [
                    view === "summary" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 28,
                                    fontWeight: 700,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                    margin: "0 0 6px",
                                    fontFamily: headingFont,
                                    fontStyle: "italic"
                                },
                                children: "Your Results"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                    margin: "0 0 16px"
                                },
                                children: [
                                    title,
                                    " · ",
                                    total,
                                    " Questions"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            !isFromExam && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "rgba(253,203,110,0.10)",
                                    border: "1px solid rgba(253,203,110,0.3)",
                                    borderRadius: 10,
                                    padding: "10px 16px",
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: "#fdcb6e"
                                    },
                                    children: "Demo mode — showing sample answers. Take the exam to see your real results."
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                    lineNumber: 149,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                    borderRadius: 16,
                                    padding: "28px 32px",
                                    marginBottom: 24
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 32
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "relative",
                                                width: 100,
                                                height: 100,
                                                flexShrink: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "100",
                                                    height: "100",
                                                    viewBox: "0 0 100 100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "50",
                                                            cy: "50",
                                                            r: "42",
                                                            fill: "none",
                                                            stroke: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border,
                                                            strokeWidth: "6"
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "50",
                                                            cy: "50",
                                                            r: "42",
                                                            fill: "none",
                                                            stroke: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok,
                                                            strokeWidth: "6",
                                                            strokeDasharray: `${2 * Math.PI * 42 * pct / 100} ${2 * Math.PI * 42}`,
                                                            strokeLinecap: "round",
                                                            transform: "rotate(-90 50 50)",
                                                            style: {
                                                                transition: "stroke-dasharray 0.8s ease"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 158,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: "absolute",
                                                        inset: 0,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 24,
                                                            fontWeight: 700,
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white
                                                        },
                                                        children: [
                                                            pct,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 155,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 24,
                                                        marginBottom: 16
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 28,
                                                                        fontWeight: 700,
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok
                                                                    },
                                                                    children: correct
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 169,
                                                                    columnNumber: 26
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                                                        marginLeft: 6
                                                                    },
                                                                    children: "correct"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 169,
                                                                    columnNumber: 103
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 169,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 28,
                                                                        fontWeight: 700,
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail
                                                                    },
                                                                    children: incorrect
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 26
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                                                        marginLeft: 6
                                                                    },
                                                                    children: "incorrect"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 107
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 28,
                                                                        fontWeight: 700,
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted
                                                                    },
                                                                    children: total
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 171,
                                                                    columnNumber: 26
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 13,
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                                                        marginLeft: 6
                                                                    },
                                                                    children: "total"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 171,
                                                                    columnNumber: 104
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: 8,
                                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border,
                                                        borderRadius: 4,
                                                        overflow: "hidden"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            height: "100%",
                                                            width: `${pct}%`,
                                                            background: `linear-gradient(90deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok}, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].concl})`,
                                                            borderRadius: 4,
                                                            transition: "width 0.8s ease"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 167,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                    borderRadius: 16,
                                    padding: "24px 28px",
                                    marginBottom: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                            letterSpacing: 1,
                                            textTransform: "uppercase",
                                            display: "block",
                                            marginBottom: 16
                                        },
                                        children: "Performance by Topic"
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 10
                                        },
                                        children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["topicColors"]).map(([type, color])=>{
                                            const qs = questions.filter((q)=>q.topic === type);
                                            if (qs.length === 0) return null;
                                            const c = qs.filter((q)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResult"])(q, answers) === "correct").length;
                                            const t = qs.length;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 13,
                                                            color,
                                                            fontWeight: 600,
                                                            width: 170,
                                                            flexShrink: 0
                                                        },
                                                        children: type
                                                    }, void 0, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1,
                                                            height: 6,
                                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border,
                                                            borderRadius: 3,
                                                            overflow: "hidden"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                height: "100%",
                                                                width: `${c / t * 100}%`,
                                                                background: color,
                                                                borderRadius: 3,
                                                                transition: "width 0.6s ease"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                                            width: 40,
                                                            textAlign: "right"
                                                        },
                                                        children: [
                                                            c,
                                                            "/",
                                                            t
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, type, true, {
                                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                    borderRadius: 16,
                                    padding: "24px 28px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                            letterSpacing: 1,
                                            textTransform: "uppercase",
                                            display: "block",
                                            marginBottom: 16
                                        },
                                        children: "All Questions"
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 6
                                        },
                                        children: questions.map((q)=>{
                                            const isCorrect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResult"])(q, answers) === "correct";
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setView("review");
                                                    setActiveQ(q.displayNum);
                                                },
                                                style: {
                                                    width: 38,
                                                    height: 38,
                                                    borderRadius: 10,
                                                    background: isCorrect ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].conclBg : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].failBg,
                                                    border: `1.5px solid ${isCorrect ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail}`,
                                                    color: isCorrect ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail,
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontFamily: font
                                                },
                                                children: q.displayNum
                                            }, q.displayNum, false, {
                                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                lineNumber: 207,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    view === "review" && !walkthroughOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                            margin: 0
                                        },
                                        children: activeQ ? `Question ${activeQ} of ${total}` : `${filteredQs.length} of ${total}`
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 12,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted
                                                },
                                                children: "Show all questions"
                                            }, void 0, false, {
                                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowAll(!showAll),
                                                style: {
                                                    width: 40,
                                                    height: 22,
                                                    borderRadius: 11,
                                                    border: "none",
                                                    cursor: "pointer",
                                                    background: showAll ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border,
                                                    position: "relative",
                                                    transition: "background 0.3s"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: 8,
                                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                                        position: "absolute",
                                                        top: 3,
                                                        left: showAll ? 21 : 3,
                                                        transition: "left 0.3s"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                lineNumber: 229,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 4,
                                    marginBottom: 24
                                },
                                children: questions.map((q)=>{
                                    const isCorrect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResult"])(q, answers) === "correct";
                                    const isActive = activeQ === q.displayNum;
                                    if (!showAll && isCorrect) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveQ(q.displayNum),
                                        style: {
                                            width: 34,
                                            height: 34,
                                            borderRadius: 10,
                                            background: isActive ? isCorrect ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail : "transparent",
                                            border: `1.5px solid ${isCorrect ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail}`,
                                            color: isActive ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white : isCorrect ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail,
                                            fontSize: 12,
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontFamily: font
                                        },
                                        children: q.displayNum
                                    }, q.displayNum, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this),
                            currentQ && (()=>{
                                const isCorrect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResult"])(currentQ, answers) === "correct";
                                const sa = answers[currentQ.displayNum];
                                const tc = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["topicColors"][currentQ.topic] || __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                                        border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                        borderRadius: 16,
                                        padding: "24px 28px",
                                        marginBottom: 18
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginBottom: 6
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 10
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 16,
                                                                fontWeight: 700,
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white
                                                            },
                                                            children: [
                                                                "Question ",
                                                                currentQ.displayNum
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                padding: "3px 10px",
                                                                borderRadius: 6,
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                background: isCorrect ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].conclBg : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].failBg,
                                                                border: `1px solid ${isCorrect ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail}`,
                                                                color: isCorrect ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail
                                                            },
                                                            children: isCorrect ? "Correct" : "Incorrect"
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 12,
                                                        color: tc,
                                                        fontWeight: 600
                                                    },
                                                    children: currentQ.topic
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 263,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 12,
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                                margin: "0 0 16px"
                                            },
                                            children: [
                                                source,
                                                " · Question ",
                                                currentQ.displayNum
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 276,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].bg,
                                                border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                                borderRadius: 12,
                                                padding: "18px 22px",
                                                margin: "0 0 18px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 15.5,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].text,
                                                    lineHeight: 1.8
                                                },
                                                children: currentQ.richText ? currentQ.richText.map((seg, i)=>{
                                                    if (seg === "br") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, i, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 50
                                                    }, this);
                                                    if (typeof seg === "string") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: seg
                                                    }, i, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 61
                                                    }, this);
                                                    if ("display" in seg) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: "#1e2030",
                                                            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                                            borderRadius: 10,
                                                            padding: "12px 14px",
                                                            margin: "8px 0",
                                                            textAlign: "center",
                                                            fontSize: 17
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                                            children: seg.display
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 288,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, i, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 27
                                                    }, this);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                                        children: seg.tex
                                                    }, i, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 32
                                                    }, this);
                                                }) : currentQ.text
                                            }, void 0, false, {
                                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 278,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 6,
                                                marginBottom: 20
                                            },
                                            children: currentQ.options.map((opt)=>{
                                                const isStudentAnswer = sa === opt.letter;
                                                const isCorrectAnswer = currentQ.correctAnswer === opt.letter;
                                                const showAsWrong = isStudentAnswer && !isCorrect;
                                                let borderColor = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border;
                                                let bg = "transparent";
                                                let textColor = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted;
                                                if (isCorrectAnswer) {
                                                    borderColor = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok;
                                                    bg = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].conclBg;
                                                    textColor = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok;
                                                } else if (showAsWrong) {
                                                    borderColor = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail;
                                                    bg = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].failBg;
                                                    textColor = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail;
                                                }
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 12,
                                                        padding: "10px 14px",
                                                        borderRadius: 10,
                                                        background: bg,
                                                        border: `1.5px solid ${borderColor}`
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                width: 26,
                                                                height: 26,
                                                                borderRadius: 7,
                                                                background: isCorrectAnswer ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok + "22" : showAsWrong ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail + "22" : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border,
                                                                border: `1.5px solid ${isCorrectAnswer ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok : showAsWrong ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: 12,
                                                                fontWeight: 700,
                                                                color: isCorrectAnswer ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok : showAsWrong ? __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail : __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                                                flexShrink: 0
                                                            },
                                                            children: opt.letter
                                                        }, void 0, false, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 14,
                                                                color: textColor,
                                                                fontWeight: isCorrectAnswer || showAsWrong ? 600 : 400
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tex, {
                                                                    children: opt.tex
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 321,
                                                                    columnNumber: 29
                                                                }, this),
                                                                isStudentAnswer && isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok,
                                                                        marginLeft: 8
                                                                    },
                                                                    children: "Your answer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 322,
                                                                    columnNumber: 62
                                                                }, this),
                                                                isStudentAnswer && !isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].fail,
                                                                        marginLeft: 8
                                                                    },
                                                                    children: "Your answer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 323,
                                                                    columnNumber: 63
                                                                }, this),
                                                                isCorrectAnswer && !isStudentAnswer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].ok,
                                                                        marginLeft: 8
                                                                    },
                                                                    children: "Correct answer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 69
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, opt.letter, true, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 296,
                                            columnNumber: 19
                                        }, this),
                                        currentQ.hasWalkthrough && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setWalkthroughOpen(currentQ.displayNum),
                                            style: {
                                                width: "100%",
                                                padding: "14px 20px",
                                                borderRadius: 12,
                                                border: "none",
                                                background: `linear-gradient(135deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent}, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accentLight})`,
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                                fontSize: 14,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 8,
                                                fontFamily: font
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: "rgba(255,255,255,0.2)",
                                                        borderRadius: 6,
                                                        padding: "3px 8px",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        letterSpacing: 1
                                                    },
                                                    children: "TMUA"
                                                }, void 0, false, {
                                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 23
                                                }, this),
                                                "Interactive Walkthrough"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 332,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 17
                                }, this);
                            })(),
                            currentQ && (()=>{
                                const idx = filteredQs.findIndex((q)=>q.displayNum === activeQ);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>idx > 0 && setActiveQ(filteredQs[idx - 1].displayNum),
                                            disabled: idx <= 0,
                                            style: {
                                                flex: 1,
                                                padding: "13px 20px",
                                                borderRadius: 10,
                                                border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                                background: "#1e2030",
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].text,
                                                fontSize: 14,
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                opacity: idx <= 0 ? 0.4 : 1,
                                                fontFamily: font
                                            },
                                            children: "← Previous"
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 351,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>idx < filteredQs.length - 1 && setActiveQ(filteredQs[idx + 1].displayNum),
                                            disabled: idx >= filteredQs.length - 1,
                                            style: {
                                                flex: 1,
                                                padding: "13px 20px",
                                                borderRadius: 10,
                                                border: "none",
                                                background: `linear-gradient(135deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent}, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accentLight})`,
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                                fontSize: 14,
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                opacity: idx >= filteredQs.length - 1 ? 0.4 : 1,
                                                fontFamily: font
                                            },
                                            children: "Next →"
                                        }, void 0, false, {
                                            fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                            lineNumber: 357,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                    lineNumber: 350,
                                    columnNumber: 17
                                }, this);
                            })(),
                            !currentQ && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                    borderRadius: 16,
                                    padding: "40px 28px",
                                    textAlign: "center"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 15,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                        margin: 0
                                    },
                                    children: "Select a question above to review it"
                                }, void 0, false, {
                                    fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                    lineNumber: 369,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 368,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true),
                    walkthroughOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setWalkthroughOpen(null),
                                style: {
                                    padding: "8px 16px",
                                    borderRadius: 8,
                                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].text,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    fontFamily: font
                                },
                                children: "← Back to Review"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 377,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$components$2f$walkthroughs$2f$WalkthroughLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                paperId: paperId,
                                displayNum: walkthroughOpen
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                                lineNumber: 383,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                        lineNumber: 376,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/app/practice/[paperId]/review/page.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_s1(ReviewPage, "t8BL6Zj6lhnRyj28e7k1ufv8EW4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c1 = ReviewPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "Tex");
__turbopack_context__.k.register(_c1, "ReviewPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=tmua-review_tmua-review_src_0a363b92._.js.map