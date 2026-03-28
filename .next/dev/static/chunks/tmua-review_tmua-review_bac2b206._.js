(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/tmua-review/tmua-review/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$papers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/src/lib/papers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tmua-review/tmua-review/src/lib/tmua.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const font = "'Trebuchet MS', 'Gill Sans', Calibri, sans-serif";
const headingFont = "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif";
function Home() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const paperEntries = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$papers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["papers"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].bg,
            fontFamily: font,
            letterSpacing: 0.2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                    borderBottom: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                    padding: "16px 24px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: 900,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        gap: 12
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
                            fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 14,
                                color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                fontWeight: 600
                            },
                            children: "Interactive Review"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 900,
                    width: "100%",
                    padding: "48px 16px 0",
                    margin: "0 auto"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            marginBottom: 48
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 10,
                                    marginBottom: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: `linear-gradient(135deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent}, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accentLight})`,
                                            borderRadius: 10,
                                            padding: "6px 16px",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                            letterSpacing: 1.5
                                        },
                                        children: "TMUA"
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted
                                        },
                                        children: "Test of Mathematics for University Admission"
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: 36,
                                    fontWeight: 700,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                    margin: "0 0 12px",
                                    fontFamily: headingFont,
                                    fontStyle: "italic",
                                    lineHeight: 1.3
                                },
                                children: "Interactive Walkthrough Review"
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 15,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                    margin: "0 auto",
                                    maxWidth: 520,
                                    lineHeight: 1.7
                                },
                                children: "Step-by-step guided walkthroughs for TMUA mathematics questions. Select a paper below to review your answers."
                            }, void 0, false, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            marginBottom: 48
                        },
                        children: paperEntries.map(([id, paper])=>{
                            const total = paper.questions.length;
                            const topics = [
                                ...new Set(paper.questions.map((q)=>q.topic))
                            ];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].card,
                                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                    borderRadius: 16,
                                    padding: "28px 32px",
                                    textAlign: "left",
                                    fontFamily: font,
                                    position: "relative",
                                    overflow: "hidden"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: 3,
                                            background: `linear-gradient(90deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent}, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accentLight})`,
                                            borderRadius: "16px 16px 0 0"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        style: {
                                                            fontSize: 20,
                                                            fontWeight: 700,
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                                            margin: "0 0 4px",
                                                            fontFamily: headingFont,
                                                            fontStyle: "italic"
                                                        },
                                                        children: paper.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: 13,
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                                            margin: 0
                                                        },
                                                        children: [
                                                            paper.source,
                                                            " · ",
                                                            total,
                                                            " Questions · 75 minutes"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: 8,
                                                    flexShrink: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>router.push(`/practice/${id}/exam`),
                                                        style: {
                                                            background: `linear-gradient(135deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accent}, ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].accentLight})`,
                                                            borderRadius: 10,
                                                            padding: "10px 20px",
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].white,
                                                            border: "none",
                                                            cursor: "pointer",
                                                            fontFamily: font
                                                        },
                                                        children: "Take Exam"
                                                    }, void 0, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>router.push(`/practice/${id}/review`),
                                                        style: {
                                                            background: "transparent",
                                                            borderRadius: 10,
                                                            padding: "10px 20px",
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                                            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                                                            cursor: "pointer",
                                                            fontFamily: font
                                                        },
                                                        children: "Review"
                                                    }, void 0, false, {
                                                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                                lineNumber: 191,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 6
                                        },
                                        children: topics.map((topic)=>{
                                            const count = paper.questions.filter((q)=>q.topic === topic).length;
                                            const color = __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["topicColors"][topic] || __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    padding: "4px 10px",
                                                    borderRadius: 6,
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    color,
                                                    background: `${color}15`,
                                                    border: `1px solid ${color}30`
                                                },
                                                children: [
                                                    topic,
                                                    " (",
                                                    count,
                                                    ")"
                                                ]
                                            }, topic, true, {
                                                fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                        lineNumber: 228,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, id, true, {
                                fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            paddingBottom: 32,
                            borderTop: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].border}`,
                            paddingTop: 24
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 12,
                                color: __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$src$2f$lib$2f$tmua$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].muted,
                                margin: 0
                            },
                            children: "AceAdmissions · Precision Preparation for UK Admissions Tests"
                        }, void 0, false, {
                            fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/tmua-review/tmua-review/src/app/page.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(Home, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$tmua$2d$review$2f$tmua$2d$review$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/tmua-review/tmua-review/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/tmua-review/tmua-review/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/tmua-review/tmua-review/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/tmua-review/tmua-review/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=tmua-review_tmua-review_bac2b206._.js.map