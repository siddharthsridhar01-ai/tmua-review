import { Question } from "./tmua";

export const papers: Record<string, { title: string; source: string; questions: Question[] }> = {
  "tmua-2026mock": {
    title: "TMUA 2026 Mock Paper 1",
    source: "AceAdmissions Mock",
    questions: [
      { displayNum: 1, topic: "Trigonometry", correctAnswer: "B", hasWalkthrough: true,
        text: "How many real solutions to sin\u2074x \u2212 3sin\u00B2x + 2 = 0 in [0, 2\u03C0]?",
        richText: ["How many real solutions are there to the equation", "br", {display:"\\sin^4 x - 3\\sin^2 x + 2 = 0"}, "in the interval ", {tex:"0 \\le x \\le 2\\pi"}, "?"],
        options: [{letter:"A",tex:"1"},{letter:"B",tex:"2"},{letter:"C",tex:"3"},{letter:"D",tex:"4"},{letter:"E",tex:"5"},{letter:"F",tex:"6"},{letter:"G",tex:"7"},{letter:"H",tex:"8"}] },

      { displayNum: 2, topic: "Calculus", correctAnswer: "E", hasWalkthrough: true,
        text: "Curve y = 2x\u00B3\u22129x\u00B2+12x\u22123 has turning points. Find integral between them.",
        richText: ["The curve", "br", {display:"y = 2x^3 - 9x^2 + 12x - 3"}, "has turning points at ", {tex:"x = \\alpha"}, " and ", {tex:"x = \\beta"}, ", where ", {tex:"\\beta > \\alpha"}, ".", "br", "Find ", {tex:"\\displaystyle\\int_\\alpha^\\beta (2x^3 - 9x^2 + 12x - 3)\\,dx"}, "."],
        options: [{letter:"A",tex:"-\\tfrac{3}{2}"},{letter:"B",tex:"-\\tfrac{1}{2}"},{letter:"C",tex:"0"},{letter:"D",tex:"\\tfrac{1}{2}"},{letter:"E",tex:"\\tfrac{3}{2}"},{letter:"F",tex:"3"}] },

      { displayNum: 3, topic: "Sequences & Series", correctAnswer: "D", hasWalkthrough: true,
        text: "AP and GP with first term 3. Second terms sum to 5, third to 13/3. Find S\u221E.",
        richText: ["An arithmetic progression and a convergent geometric progression each have first term ", {tex:"3"}, ".", "br", "The sum of their second terms is ", {tex:"5"}, ". The sum of their third terms is ", {tex:"\\tfrac{13}{3}"}, ".", "br", "What is the sum to infinity of the geometric progression?"],
        options: [{letter:"A",tex:"4"},{letter:"B",tex:"6"},{letter:"C",tex:"8"},{letter:"D",tex:"9"},{letter:"E",tex:"12"},{letter:"F",tex:"18"}] },

      { displayNum: 4, topic: "Algebra", correctAnswer: "D", hasWalkthrough: true,
        text: "Find the minimum value of 4\u02E3 \u2212 6\u00B72\u02E3 + 10.",
        richText: ["Find the minimum value of", "br", {display:"4^x - 6 \\cdot 2^x + 10"}],
        options: [{letter:"A",tex:"-4"},{letter:"B",tex:"-1"},{letter:"C",tex:"0"},{letter:"D",tex:"1"},{letter:"E",tex:"2"},{letter:"F",tex:"5"}] },

      { displayNum: 5, topic: "Sequences & Series", correctAnswer: "D", hasWalkthrough: true,
        text: "Recurrence x_{n+1} = (x_n+p)/(x_n+q). Given x\u2081=2, x\u2082=4, x\u2083=3, find x\u2085.",
        richText: ["The terms ", {tex:"x_n"}, " of a sequence follow the rule", "br", {display:"x_{n+1} = \\dfrac{x_n + p}{x_n + q}"}, "where ", {tex:"p"}, " and ", {tex:"q"}, " are real numbers.", "br", "Given that ", {tex:"x_1 = 2"}, ", ", {tex:"x_2 = 4"}, ", and ", {tex:"x_3 = 3"}, ", find the value of ", {tex:"x_5"}, "."],
        options: [{letter:"A",tex:"-5"},{letter:"B",tex:"-\\tfrac{5}{3}"},{letter:"C",tex:"\\tfrac{11}{5}"},{letter:"D",tex:"\\tfrac{29}{9}"},{letter:"E",tex:"\\tfrac{17}{3}"},{letter:"F",tex:"13"}] },

      { displayNum: 6, topic: "Trigonometry", correctAnswer: "D", hasWalkthrough: true,
        text: "f(x) = (sin x + 2)/(5 + 4sin x \u2212 cos\u00B2x). Find max \u2212 min.",
        richText: ["The function ", {tex:"f"}, " is given by", "br", {display:"f(x) = \\dfrac{\\sin x + 2}{5 + 4\\sin x - \\cos^2 x}"}, "Find the positive difference between the maximum and the minimum values of ", {tex:"f(x)"}, "."],
        options: [{letter:"A",tex:"0"},{letter:"B",tex:"\\tfrac{1}{3}"},{letter:"C",tex:"\\tfrac{1}{2}"},{letter:"D",tex:"\\tfrac{2}{3}"},{letter:"E",tex:"1"},{letter:"F",tex:"2"}] },

      { displayNum: 7, topic: "Calculus", correctAnswer: "D", hasWalkthrough: true,
        text: "Find total area between y = 0 and y = x\u00B2 \u2212 6|x| + 5.",
        richText: ["Find the total area of the region enclosed by ", {tex:"y = 0"}, " and", "br", {display:"y = x^2 - 6|x| + 5"}],
        options: [{letter:"A",tex:"\\tfrac{32}{3}"},{letter:"B",tex:"16"},{letter:"C",tex:"\\tfrac{56}{3}"},{letter:"D",tex:"\\tfrac{64}{3}"},{letter:"E",tex:"24"},{letter:"F",tex:"32"}] },

      { displayNum: 8, topic: "Sequences & Series", correctAnswer: "B", hasWalkthrough: true,
        text: "Sum of first n terms of GP is 5\u207F \u2212 1. Find S\u2082\u2080/S\u2081\u2080.",
        richText: ["The sum of the first ", {tex:"n"}, " terms of a geometric series is ", {tex:"5^n - 1"}, ".", "br", "Find ", {tex:"\\dfrac{S_{20}}{S_{10}}"}, "."],
        options: [{letter:"A",tex:"2^5"},{letter:"B",tex:"2^{10}"},{letter:"C",tex:"2^{15}"},{letter:"D",tex:"2^{20}"},{letter:"E",tex:"2^{10}(2^{10} - 1)"}] },

      { displayNum: 9, topic: "Algebra", correctAnswer: "B", hasWalkthrough: true,
        text: "f\u00B2(x) \u2212 3cos(x)f(x) \u2212 4 = 0. Find min f(x).",
        richText: ["The function ", {tex:"f"}, " satisfies", "br", {display:"f^2(x) - 3\\cos(x)\\,f(x) - 4 = 0"}, "for all real ", {tex:"x"}, ". Find the minimum value of ", {tex:"f(x)"}, "."],
        options: [{letter:"A",tex:"-4"},{letter:"B",tex:"-3"},{letter:"C",tex:"-2"},{letter:"D",tex:"-1"},{letter:"E",tex:"0"},{letter:"F",tex:"1"}] },

      { displayNum: 10, topic: "Algebra", correctAnswer: "E", hasWalkthrough: true,
        text: "Translations of y = x\u00B2. Which graphs could result?",
        richText: ["A sequence of translations is applied to the graph of ", {tex:"y = x^2"}, ".", "br", "Which of the following graphs could be the result of this sequence of translations?"],
        options: [{letter:"A",tex:"\\text{none}"},{letter:"B",tex:"\\text{I only}"},{letter:"C",tex:"\\text{II only}"},{letter:"D",tex:"\\text{III only}"},{letter:"E",tex:"\\text{I and II only}"},{letter:"F",tex:"\\text{I and III only}"},{letter:"G",tex:"\\text{II and III only}"},{letter:"H",tex:"\\text{I, II and III}"}] },

      { displayNum: 11, topic: "Sequences & Series", correctAnswer: "E", hasWalkthrough: true,
        text: "Find the telescoping log sum.",
        richText: ["Find", "br", {display:"\\sum_{k=1}^{99} \\bigl(\\log_{10}(k+1) - \\log_{10}(k)\\bigr)"}],
        options: [{letter:"A",tex:"-2"},{letter:"B",tex:"-1"},{letter:"C",tex:"0"},{letter:"D",tex:"1"},{letter:"E",tex:"2"},{letter:"F",tex:"\\log_{10} 99"}] },

      { displayNum: 12, topic: "Algebra", correctAnswer: "D", hasWalkthrough: true,
        text: "Min of x\u2074 \u2212 4kx\u00B2 + 5k\u00B2 \u2212 1 as k varies.",
        richText: ["Find the minimum value of", "br", {display:"x^4 - 4kx^2 + 5k^2 - 1"}, "as ", {tex:"k"}, " varies over all real numbers."],
        options: [{letter:"A",tex:"-3"},{letter:"B",tex:"-1"},{letter:"C",tex:"0"},{letter:"D",tex:"1"},{letter:"E",tex:"3"},{letter:"F",tex:"5"}] },

      { displayNum: 13, topic: "Calculus", correctAnswer: "C", hasWalkthrough: true,
        text: "[0, N] divided into N sub-intervals. Find N for total area = 25.",
        richText: ["The interval ", {tex:"[0, N]"}, " is divided into ", {tex:"N"}, " equal sub-intervals. A rectangle of height ", {tex:"f(x_i)"}, " is drawn on each.", "br", "Find ", {tex:"N"}, " such that the sum of the rectangle areas equals ", {tex:"25"}, "."],
        options: [{letter:"A",tex:"15"},{letter:"B",tex:"20"},{letter:"C",tex:"25"},{letter:"D",tex:"30"},{letter:"E",tex:"35"},{letter:"F",tex:"50"}] },

      { displayNum: 14, topic: "Calculus", correctAnswer: "C", hasWalkthrough: true,
        text: "y = x\u00B3 \u2212 3x + k has exactly two roots. How many integer k?",
        richText: ["The cubic ", {tex:"y = x^3 - 3x + k"}, " has exactly two distinct real roots.", "br", "Find the number of possible integer values of ", {tex:"k"}, "."],
        options: [{letter:"A",tex:"-4"},{letter:"B",tex:"-2"},{letter:"C",tex:"0"},{letter:"D",tex:"2"},{letter:"E",tex:"4"},{letter:"F",tex:"\\pm 2"}] },

      { displayNum: 15, topic: "Optimisation", correctAnswer: "C", hasWalkthrough: true,
        text: "Rectangle between two parabolas, symmetric. Max area?",
        richText: ["A rectangle is drawn in the region enclosed by the curves", "br", {display:"y = x^2 - 1 \\qquad \\text{and} \\qquad y = 5 - x^2"}, "such that the sides of the rectangle are parallel to the x- and y-axes and the rectangle is symmetric about the y-axis.", "br", "What is the maximum possible area of the rectangle?"],
        options: [{letter:"A",tex:"4"},{letter:"B",tex:"6"},{letter:"C",tex:"8"},{letter:"D",tex:"10"},{letter:"E",tex:"12"},{letter:"F",tex:"16"}] },

      { displayNum: 16, topic: "Trigonometry", correctAnswer: "A", hasWalkthrough: true,
        text: "8x\u2074\u221210x\u00B2+3=0 roots are \u00B1cos\u03B1, \u00B1cos\u03B2. Find sin equation.",
        richText: ["The solutions to", "br", {display:"8x^4 - 10x^2 + 3 = 0"}, "are ", {tex:"\\pm\\cos\\alpha"}, " and ", {tex:"\\pm\\cos\\beta"}, ".", "br", "Which one of the following equations has solutions ", {tex:"\\pm\\sin\\alpha"}, " and ", {tex:"\\pm\\sin\\beta"}, "?"],
        options: [{letter:"A",tex:"8x^4 - 6x^2 + 1 = 0"},{letter:"B",tex:"8x^4 + 6x^2 - 1 = 0"},{letter:"C",tex:"8x^4 - 10x^2 + 3 = 0"},{letter:"D",tex:"3x^4 - 10x^2 + 8 = 0"},{letter:"E",tex:"3x^4 - 8x^2 + 3 = 0"},{letter:"F",tex:"3x^4 + 8x^2 - 3 = 0"}] },

      { displayNum: 17, topic: "Geometry", correctAnswer: "D", hasWalkthrough: true,
        text: "Square S_n vertices (\u00B1n,\u00B1n). Pairs shaded. Total area?",
        richText: ["A square ", {tex:"S_n"}, " has vertices at ", {tex:"(\\pm n, \\pm n)"}, ".", "br", {tex:"S_1"}, " and ", {tex:"S_2"}, " are drawn and the region between them is shaded. Then ", {tex:"S_3"}, " and ", {tex:"S_4"}, " are drawn and the region between them is shaded.", "br", "This continues until ", {tex:"50"}, " squares have been drawn. What is the total shaded area?"],
        options: [{letter:"A",tex:"2500"},{letter:"B",tex:"3400"},{letter:"C",tex:"4800"},{letter:"D",tex:"5100"},{letter:"E",tex:"5200"},{letter:"F",tex:"10200"}] },

      { displayNum: 18, topic: "Probability", correctAnswer: "B", hasWalkthrough: true,
        text: "Geometric series S with random k. P(S finite and >8)?",
        richText: ["You are given that", "br", {display:"S = 5 + 5\\!\\left(\\frac{3k}{10}\\right) + 5\\!\\left(\\frac{3k}{10}\\right)^{\\!2} + \\cdots"}, "The integer ", {tex:"k"}, " is chosen uniformly at random from ", {tex:"-3 \\le k \\le 3"}, ".", "br", "What is the probability that ", {tex:"S"}, " is a finite number greater than ", {tex:"8"}, "?"],
        options: [{letter:"A",tex:"\\tfrac{1}{7}"},{letter:"B",tex:"\\tfrac{2}{7}"},{letter:"C",tex:"\\tfrac{3}{7}"},{letter:"D",tex:"\\tfrac{4}{7}"},{letter:"E",tex:"\\tfrac{5}{7}"},{letter:"F",tex:"\\tfrac{6}{7}"}] },

      { displayNum: 19, topic: "Differential Equations", correctAnswer: "C", hasWalkthrough: true,
        text: "dy/dx = |3\u2212x| \u2212 |x\u22121|. Find f(0)+f(2)+f(4).",
        richText: ["The solution to the differential equation", "br", {display:"\\frac{dy}{dx} = |3 - x| - |x - 1| \\quad \\text{for all } x"}, "is ", {tex:"y = f(x) + c"}, ", where ", {tex:"c"}, " is a constant.", "br", "Find the value of ", {tex:"f(0) + f(2) + f(4)"}, "."],
        options: [{letter:"A",tex:"1"},{letter:"B",tex:"2"},{letter:"C",tex:"3"},{letter:"D",tex:"4"},{letter:"E",tex:"5"},{letter:"F",tex:"6"}] },

      { displayNum: 20, topic: "Logarithms", correctAnswer: "C", hasWalkthrough: true,
        text: "Find area enclosed by log curve.",
        richText: ["Find the area enclosed by the curve", "br", {display:"\\log_{10}(x^2 + y^2) = 1 + \\log_{10}(2y - 2x)"}],
        options: [{letter:"A",tex:"50\\pi"},{letter:"B",tex:"100\\pi"},{letter:"C",tex:"200\\pi"},{letter:"D",tex:"400\\pi"},{letter:"E",tex:"10\\sqrt{2}\\,\\pi"},{letter:"F",tex:"20\\sqrt{2}\\,\\pi"}] },
    ],
  },
};
