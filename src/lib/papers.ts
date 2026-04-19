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
        text: "Find the finite area enclosed between y = 0 and y = x\u00B2 \u2212 6|x| + 5.",
        richText: ["Find the finite area enclosed between the line ", {tex:"y = 0"}, " and the curve", "br", {display:"y = x^2 - 6|x| + 5"}],
        options: [{letter:"A",tex:"\\tfrac{32}{3}"},{letter:"B",tex:"16"},{letter:"C",tex:"\\tfrac{56}{3}"},{letter:"D",tex:"\\tfrac{64}{3}"},{letter:"E",tex:"24"},{letter:"F",tex:"32"}] },

      { displayNum: 8, topic: "Sequences & Series", correctAnswer: "B", hasWalkthrough: true,
        text: "Geometric sequence with integer a, r > 1. S\u2082\u2080 \u2212 S\u2081\u2080 = k\u00B7S\u2081\u2080. Find smallest k.",
        richText: ["A geometric sequence has first term ", {tex:"a"}, " and common ratio ", {tex:"r"}, ", where ", {tex:"a"}, " and ", {tex:"r"}, " are positive integers and ", {tex:"r > 1"}, ".", "br", "It is given that", "br", {display:"S_{20} - S_{10} = k \\cdot S_{10}"}, "for some positive integer ", {tex:"k"}, ".", "br", "What is the smallest possible value of ", {tex:"k"}, "?"],
        options: [{letter:"A",tex:"2^5"},{letter:"B",tex:"2^{10}"},{letter:"C",tex:"2^{15}"},{letter:"D",tex:"2^{20}"},{letter:"E",tex:"2^{10}(2^{10} - 1)"}] },

      { displayNum: 9, topic: "Algebra", correctAnswer: "B", hasWalkthrough: true,
        text: "f(x) \u2212 g(x) = 3cos x and f(x)\u00B7g(x) = sin\u00B2x. Find min f(x).",
        richText: ["This question is about pairs of functions ", {tex:"f"}, " and ", {tex:"g"}, " that satisfy", "br", {display:"f(x) - g(x) = 3\\cos x"}, "and", "br", {display:"f(x) \\cdot g(x) = \\sin^2 x"}, "for all real numbers ", {tex:"x"}, ".", "br", "Across all solutions for ", {tex:"f(x)"}, ", what is the minimum value that ", {tex:"f(x)"}, " attains for any ", {tex:"x"}, "?"],
        options: [{letter:"A",tex:"-4"},{letter:"B",tex:"-3"},{letter:"C",tex:"-2"},{letter:"D",tex:"-1"},{letter:"E",tex:"0"},{letter:"F",tex:"1"}] },

      { displayNum: 10, topic: "Algebra", correctAnswer: "E", hasWalkthrough: true,
        text: "Translations of y = x\u00B2. Which graphs could result?",
        richText: ["A sequence of translations is applied to the graph of ", {tex:"y = x^2"}, ".", "br", "Which of the following graphs could be the result of this sequence of translations?", "br", {items:[{label:"I",tex:"y = x^2 - 4x + 6"},{label:"II",tex:"y = x^2 + 6x + 9"},{label:"III",tex:"y = 4x^2 - 4x + 1"}]}],
        options: [{letter:"A",tex:"\\text{none}"},{letter:"B",tex:"\\text{I only}"},{letter:"C",tex:"\\text{II only}"},{letter:"D",tex:"\\text{III only}"},{letter:"E",tex:"\\text{I and II only}"},{letter:"F",tex:"\\text{I and III only}"},{letter:"G",tex:"\\text{II and III only}"},{letter:"H",tex:"\\text{I, II and III}"}] },

      { displayNum: 11, topic: "Sequences & Series", correctAnswer: "E", hasWalkthrough: true,
        text: "Evaluate \u03A3 log\u2081\u2080((n+1)/n) from n=1 to 99.",
        richText: ["Evaluate", "br", {display:"\\sum_{n=1}^{99} \\log_{10}\\!\\left(\\frac{n+1}{n}\\right)"}],
        options: [{letter:"A",tex:"-2"},{letter:"B",tex:"-1"},{letter:"C",tex:"0"},{letter:"D",tex:"1"},{letter:"E",tex:"2"},{letter:"F",tex:"\\log_{10} 99"}] },

      { displayNum: 12, topic: "Algebra", correctAnswer: "D", hasWalkthrough: true,
        text: "Min of x\u2074 \u2212 2kx\u00B2 is \u22124, k > 0. Find min of x\u00B2 \u2212 2kx + 5.",
        richText: ["The minimum value of the function", "br", {display:"x^4 - 2kx^2"}, "is ", {tex:"-4"}, ", where ", {tex:"k > 0"}, ".", "br", "Find the minimum value of the function", "br", {display:"x^2 - 2kx + 5"}],
        options: [{letter:"A",tex:"-3"},{letter:"B",tex:"-1"},{letter:"C",tex:"0"},{letter:"D",tex:"1"},{letter:"E",tex:"3"},{letter:"F",tex:"5"}] },

      { displayNum: 13, topic: "Calculus", correctAnswer: "C", hasWalkthrough: true,
        text: "For every integer n \u2265 0, \u222B from n to n+1 of f(x)dx = 2n+1. Evaluate \u222B from 0 to 5 of f(x)dx.",
        richText: ["The function ", {tex:"f"}, " is such that, for every integer ", {tex:"n \\ge 0"}, ",", "br", {display:"\\int_n^{n+1} f(x)\\,dx = 2n + 1"}, "Evaluate ", {tex:"\\displaystyle\\int_0^5 f(x)\\,dx"}, "."],
        options: [{letter:"A",tex:"15"},{letter:"B",tex:"20"},{letter:"C",tex:"25"},{letter:"D",tex:"30"},{letter:"E",tex:"35"},{letter:"F",tex:"50"}] },

      { displayNum: 14, topic: "Calculus", correctAnswer: "C", hasWalkthrough: true,
        text: "f(x) = x\u00B3 \u2212 3x + k has exactly two distinct real roots. Find sum of possible k.",
        richText: ["The function", "br", {display:"f(x) = x^3 - 3x + k"}, "has exactly two distinct real roots.", "br", "Find the sum of the possible values of ", {tex:"k"}, "."],
        options: [{letter:"A",tex:"-4"},{letter:"B",tex:"-2"},{letter:"C",tex:"0"},{letter:"D",tex:"2"},{letter:"E",tex:"4"},{letter:"F",tex:"\\pm 2"}] },

      { displayNum: 15, topic: "Optimisation", correctAnswer: "C", hasWalkthrough: true,
        text: "Rectangle between two parabolas, symmetric. Max area?",
        richText: ["A rectangle is drawn in the region enclosed by the curves", "br", {display:"y = x^2 - 1 \\qquad \\text{and} \\qquad y = 5 - x^2"}, "such that the sides of the rectangle are parallel to the x- and y-axes and the rectangle is symmetric about the y-axis.", "br", "What is the maximum possible area of the rectangle?"],
        options: [{letter:"A",tex:"4"},{letter:"B",tex:"6"},{letter:"C",tex:"8"},{letter:"D",tex:"10"},{letter:"E",tex:"12"},{letter:"F",tex:"16"}] },

      { displayNum: 16, topic: "Trigonometry", correctAnswer: "A", hasWalkthrough: true,
        text: "8x\u2074\u221210x\u00B2+3=0 roots are \u00B1cos\u03B1, \u00B1cos\u03B2. Find sin equation.",
        richText: ["The solutions to", "br", {display:"8x^4 - 10x^2 + 3 = 0"}, "are ", {tex:"\\pm\\cos\\alpha"}, " and ", {tex:"\\pm\\cos\\beta"}, ".", "br", "Which one of the following equations has solutions ", {tex:"\\pm\\sin\\alpha"}, " and ", {tex:"\\pm\\sin\\beta"}, "?"],
        options: [{letter:"A",tex:"8x^4 - 6x^2 + 1 = 0"},{letter:"B",tex:"8x^4 + 6x^2 - 1 = 0"},{letter:"C",tex:"8x^4 - 10x^2 + 3 = 0"},{letter:"D",tex:"3x^4 - 10x^2 + 8 = 0"},{letter:"E",tex:"3x^4 - 8x^2 + 3 = 0"},{letter:"F",tex:"3x^4 + 8x^2 - 3 = 0"}] },

      { displayNum: 17, topic: "Geometry", correctAnswer: "D", hasWalkthrough: true, hasDiagram: true,
        text: "Square S_n vertices (\u00B1n,\u00B1n). Pairs shaded. Total area?",
        richText: ["A square ", {tex:"S_n"}, " has vertices at ", {tex:"(\\pm n, \\pm n)"}, ".", "br", {tex:"S_1"}, " and ", {tex:"S_2"}, " are drawn and the region between them is shaded. Then ", {tex:"S_3"}, " and ", {tex:"S_4"}, " are drawn and the region between them is shaded. This is shown in the diagram.", "br", {diagram:true}, "br", "This continues until ", {tex:"50"}, " squares have been drawn. What is the total shaded area?"],
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

  "tmua-2026mockB": {
    title: "TMUA 2026 Mock Paper 1 \u2014 Set B",
    source: "AceAdmissions Mock",
    questions: [
      { displayNum: 1, topic: "Algebra", correctAnswer: "D", hasWalkthrough: true,
        text: "Given that (2^p)(3^q) = 12^3 / 6^2, find the value of p + q.",
        richText: ["Given that", "br", {display:"2^p \\cdot 3^q = \\frac{12^3}{6^2}"}, "find the value of ", {tex:"p + q"}, "."],
        options: [{letter:"A",tex:"2"},{letter:"B",tex:"3"},{letter:"C",tex:"4"},{letter:"D",tex:"5"},{letter:"E",tex:"6"},{letter:"F",tex:"7"}] },

      { displayNum: 2, topic: "Algebra", correctAnswer: "A", hasWalkthrough: true,
        text: "The graphs of y = x\u00B2 + mx + 2 and y = x + m do not intersect. Find the range of m.",
        richText: ["The graphs of", "br", {display:"y = x^2 + mx + 2 \\qquad \\text{and} \\qquad y = x + m"}, "where ", {tex:"m"}, " is a constant, do not intersect.", "br", "What is the complete range of values of ", {tex:"m"}, "?"],
        options: [{letter:"A",tex:"-1 < m < 3"},{letter:"B",tex:"m < -1 \\text{ or } m > 3"},{letter:"C",tex:"-3 < m < 1"},{letter:"D",tex:"m < -3 \\text{ or } m > 1"},{letter:"E",tex:"-1 \\le m \\le 3"}] },

      { displayNum: 3, topic: "Algebra", correctAnswer: "A", hasWalkthrough: true,
        text: "Given statements about function f, find value of a.",
        richText: ["Given the following statements about a function ", {tex:"f"}, ":", "br", "Find the value of ", {tex:"a"}, "."],
        options: [{letter:"A",tex:"-2"},{letter:"B",tex:"-1"},{letter:"C",tex:"0"},{letter:"D",tex:"1"},{letter:"E",tex:"2"},{letter:"F",tex:"3"}] },

      { displayNum: 4, topic: "Calculus", correctAnswer: "C", hasWalkthrough: true,
        text: "Evaluate the given integral.",
        richText: ["Evaluate", "br", {display:"\\int_0^1 \\frac{x^3 + 3x}{x^2 + 1}\\,dx"}],
        options: [{letter:"A",tex:"\\frac{1}{2}"},{letter:"B",tex:"1"},{letter:"C",tex:"\\frac{3}{2}"},{letter:"D",tex:"2"},{letter:"E",tex:"\\frac{5}{2}"},{letter:"F",tex:"3"}] },

      { displayNum: 5, topic: "Geometry", correctAnswer: "C", hasWalkthrough: true,
        text: "Equilateral triangle of side 8 with inscribed rectangle. Find largest h.",
        richText: ["An equilateral triangle of side ", {tex:"8"}, " has a rectangle inscribed with one side along the base. The rectangle has height ", {tex:"h"}, ".", "br", "What is the largest value of ", {tex:"h"}, " such that the area of the rectangle is ", {tex:"6\\sqrt{3}"}, "?"],
        options: [{letter:"A",tex:"\\sqrt{3}"},{letter:"B",tex:"2"},{letter:"C",tex:"2\\sqrt{3}"},{letter:"D",tex:"3"},{letter:"E",tex:"3\\sqrt{3}"},{letter:"F",tex:"4"}] },

      { displayNum: 6, topic: "Algebra", correctAnswer: "C", hasWalkthrough: true,
        text: "In the expansion of (1+x)^n(1\u2212x)^n, how many terms have odd coefficient?",
        richText: ["In the expansion of", "br", {display:"(1+x)^n(1-x)^n"}, "how many of the terms have an odd coefficient?"],
        options: [{letter:"A",tex:"1"},{letter:"B",tex:"2"},{letter:"C",tex:"3"},{letter:"D",tex:"4"},{letter:"E",tex:"5"},{letter:"F",tex:"n+1"}] },

      { displayNum: 7, topic: "Algebra", correctAnswer: "B", hasWalkthrough: true,
        text: "Find the largest value of x such that the equation holds.",
        richText: ["Find the largest value of ", {tex:"x"}, " such that", "br", {display:"\\log_2(x+3) + \\log_2(x-1) = 3"}],
        options: [{letter:"A",tex:"1"},{letter:"B",tex:"3"},{letter:"C",tex:"5"},{letter:"D",tex:"7"},{letter:"E",tex:"9"},{letter:"F",tex:"11"}] },

      { displayNum: 8, topic: "Trigonometry", correctAnswer: "B", hasWalkthrough: true,
        text: "Triangle PQR with angle QPR = 30\u00B0, PQ = 3\u221A3, QR = 3. Find area ratio S:T.",
        richText: ["A triangle PQR has angle QPR = ", {tex:"30^\\circ"}, ", ", {tex:"PQ = 3\\sqrt{3}"}, ", and ", {tex:"QR = 3"}, ".", "br", "There are two distinct triangles with these measurements. Let S be the one with larger area and T the one with smaller area.", "br", "Find the ratio area of S : area of T."],
        options: [{letter:"A",tex:"2:1"},{letter:"B",tex:"\\sqrt{3}:1"},{letter:"C",tex:"3:1"},{letter:"D",tex:"2\\sqrt{3}:1"},{letter:"E",tex:"3\\sqrt{3}:1"},{letter:"F",tex:"4:1"}] },

      { displayNum: 9, topic: "Coordinate Geometry", correctAnswer: "D", hasWalkthrough: true,
        text: "Find the area enclosed by the curve |x\u22121| + |y+2| = 3.",
        richText: ["Find the area enclosed by the curve", "br", {display:"|x - 1| + |y + 2| = 3"}],
        options: [{letter:"A",tex:"9"},{letter:"B",tex:"12"},{letter:"C",tex:"15"},{letter:"D",tex:"18"},{letter:"E",tex:"24"},{letter:"F",tex:"36"}] },

      { displayNum: 10, topic: "Calculus", correctAnswer: "A", hasWalkthrough: true,
        text: "Trapezium rule with 2 strips to estimate \u222B\u2080\u2074 \u221A(16\u2212x\u00B2) dx. Find the difference.",
        richText: ["The trapezium rule with ", {tex:"2"}, " strips is used to estimate", "br", {display:"\\int_0^4 \\sqrt{16 - x^2}\\,dx"}, "What is the positive difference between the estimate and the exact value?"],
        options: [{letter:"A",tex:"4(\\pi - 1 - \\sqrt{3})"},{letter:"B",tex:"4\\pi - 4 - 4\\sqrt{3}"},{letter:"C",tex:"4\\pi - 4"},{letter:"D",tex:"2(\\pi - 1 - \\sqrt{3})"},{letter:"E",tex:"4\\pi - 2\\sqrt{3}"}] },

      { displayNum: 11, topic: "Functions", correctAnswer: "A", hasWalkthrough: true,
        text: "f(x) = x\u00B2 \u2212 6x. Curves y = f(kx) and y = f(x\u2212c) same minimum. Find k in terms of c.",
        richText: ["It is given that ", {tex:"f(x) = x^2 - 6x"}, ".", "br", "The curves", "br", {display:"y = f(kx) \\qquad \\text{and} \\qquad y = f(x - c)"}, "have the same minimum point, where ", {tex:"k > 0"}, " and ", {tex:"c > 0"}, ".", "br", "Which is a correct expression for ", {tex:"k"}, " in terms of ", {tex:"c"}, "?"],
        options: [{letter:"A",tex:"k = \\frac{3}{3+c}"},{letter:"B",tex:"k = \\frac{3+c}{3}"},{letter:"C",tex:"k = \\frac{3}{c-3}"},{letter:"D",tex:"k = \\frac{c}{3}"},{letter:"E",tex:"k = \\frac{6}{6+c}"},{letter:"F",tex:"k = \\frac{6+c}{6}"}] },

      { displayNum: 12, topic: "Algebra", correctAnswer: "E", hasWalkthrough: true,
        text: "Family of quadratics y_k = (x\u2212k)\u00B2 + 2k\u00B2 \u2212 4k + 5. Find a + b for lowest point.",
        richText: ["A family of quadratic curves is given by", "br", {display:"y_k = (x - k)^2 + 2k^2 - 4k + 5"}, "where ", {tex:"k"}, " is any real number.", "br", "All these curves are sketched, and the point with the lowest y-coordinate among all the curves is ", {tex:"(a, b)"}, ".", "br", "Find the value of ", {tex:"a + b"}, "."],
        options: [{letter:"A",tex:"-1"},{letter:"B",tex:"0"},{letter:"C",tex:"1"},{letter:"D",tex:"3"},{letter:"E",tex:"4"},{letter:"F",tex:"7"}] },

      { displayNum: 13, topic: "Coordinate Geometry", correctAnswer: "B", hasWalkthrough: true,
        text: "P on (x\u22122)\u00B2+(y+1)\u00B2=9, Q on (x+3)\u00B2+(y\u22123)\u00B2=4. Max PQ?",
        richText: ["Point P lies on the circle ", {tex:"(x-2)^2 + (y+1)^2 = 9"}, ".", "br", "Point Q lies on the circle ", {tex:"(x+3)^2 + (y-3)^2 = 4"}, ".", "br", "What is the maximum possible length of PQ?"],
        options: [{letter:"A",tex:"5"},{letter:"B",tex:"5 + \\sqrt{41}"},{letter:"C",tex:"\\sqrt{41} + 3"},{letter:"D",tex:"5 + 2\\sqrt{41}"},{letter:"E",tex:"10"},{letter:"F",tex:"\\sqrt{41}"}] },

      { displayNum: 14, topic: "Geometry", correctAnswer: "A", hasWalkthrough: true,
        text: "Circle centre O, radius 5. P, Q, R on circumference. \u2220POQ = \u03C0/3. Max area of PRQ?",
        richText: ["A circle has centre O and radius ", {tex:"5"}, ".", "br", "P, Q and R are points on the circumference with", "br", {display:"\\angle POQ = \\frac{\\pi}{3}"}, "What is the greatest possible area of triangle PRQ?"],
        options: [{letter:"A",tex:"\\frac{25(2+\\sqrt{3})}{4}"},{letter:"B",tex:"\\frac{25\\sqrt{3}}{2}"},{letter:"C",tex:"25 + \\frac{25\\sqrt{3}}{4}"},{letter:"D",tex:"\\frac{75}{4}"},{letter:"E",tex:"25"},{letter:"F",tex:"25\\sqrt{3}"}] },

      { displayNum: 15, topic: "Algebra", correctAnswer: "C", hasWalkthrough: true,
        text: "f(x) = a^(cos x), a > 0. Max \u2212 min = 5. Find sum of possible a.",
        richText: ["The difference between the maximum and minimum values of the function", "br", {display:"f(x) = a^{\\cos x}"}, "where ", {tex:"a > 0"}, " and ", {tex:"x"}, " is real, is ", {tex:"5"}, ".", "br", "Find the sum of the possible values of ", {tex:"a"}, "."],
        options: [{letter:"A",tex:"\\sqrt{13}"},{letter:"B",tex:"\\sqrt{21}"},{letter:"C",tex:"\\sqrt{29}"},{letter:"D",tex:"\\sqrt{37}"},{letter:"E",tex:"5"},{letter:"F",tex:"6"}] },

      { displayNum: 16, topic: "Coordinate Geometry", correctAnswer: "C", hasWalkthrough: true,
        text: "Right-angled triangle at (0,1), (8,5), (2,k). Sum of all possible k.",
        richText: ["A right-angled triangle has vertices at ", {tex:"(0, 1)"}, ", ", {tex:"(8, 5)"}, " and ", {tex:"(2, k)"}, ".", "br", "Find the sum of all possible values of ", {tex:"k"}, "."],
        options: [{letter:"A",tex:"16"},{letter:"B",tex:"18"},{letter:"C",tex:"20"},{letter:"D",tex:"22"},{letter:"E",tex:"24"},{letter:"F",tex:"28"}] },

      { displayNum: 17, topic: "Trigonometry", correctAnswer: "D", hasWalkthrough: true,
        text: "Triangle with 30\u00B0, opposite = x\u22121, adjacent = \u2212x\u00B2+6x\u22125. Two non-congruent triangles.",
        richText: ["The following diagram shows a triangle with one angle of ", {tex:"30"}, " degrees. The sides are as shown:", "br", {display:"\\text{angle } 30^\\circ, \\quad \\text{opposite} = x - 1, \\quad \\text{adjacent} = -x^2 + 6x - 5"}, "Find the complete set of values of ", {tex:"x"}, " for which there are two non-congruent triangles with the side lengths and angle as shown."],
        options: [{letter:"A",tex:"1 < x < 3"},{letter:"B",tex:"1 < x < 4"},{letter:"C",tex:"1 < x < 5"},{letter:"D",tex:"3 < x < 4"},{letter:"E",tex:"3 < x < 5"},{letter:"F",tex:"4 < x < 5"}] },

      { displayNum: 18, topic: "Transformations", correctAnswer: "A", hasWalkthrough: true,
        text: "y = (x\u22121)\u00B2 + 2 rotated 90\u00B0 clockwise about (3,2). Find equation of C.",
        richText: ["The curve with equation", "br", {display:"y = (x - 1)^2 + 2"}, "is rotated 90 degrees clockwise about the point ", {tex:"(3, 2)"}, " to give the curve C.", "br", "What is the equation of C?"],
        options: [{letter:"A",tex:"x = (4-y)^2 + 3"},{letter:"B",tex:"x = -(4-y)^2 + 3"},{letter:"C",tex:"y = (x-4)^2 + 3"},{letter:"D",tex:"y = -(x-3)^2 + 4"},{letter:"E",tex:"x = (y-4)^2 + 3"},{letter:"F",tex:"y = -(x-4)^2 - 3"}] },

      { displayNum: 19, topic: "Geometry", correctAnswer: "A", hasWalkthrough: true,
        text: "Circle C1: x\u00B2+y\u00B2=16. C2 radius 3, centre in [\u22122,2]\u00B2. P(C2 intersects C1)?",
        richText: ["Circle C1 is defined as", "br", {display:"x^2 + y^2 = 16"}, "A second circle C2 has radius ", {tex:"3"}, " and centre ", {tex:"(a, b)"}, " where ", {tex:"-2 \\le a \\le 2"}, " and ", {tex:"-2 \\le b \\le 2"}, ".", "br", "If the centre of C2 is equally likely to be located anywhere within the given range, what is the probability that C2 intersects C1?"],
        options: [{letter:"A",tex:"\\frac{16-\\pi}{16}"},{letter:"B",tex:"\\frac{16+\\pi}{16}"},{letter:"C",tex:"\\frac{12-\\pi}{12}"},{letter:"D",tex:"\\frac{4-\\pi}{4}"},{letter:"E",tex:"1-\\frac{\\pi}{16}"},{letter:"F",tex:"\\frac{\\pi}{16}"}] },

      { displayNum: 20, topic: "Functions", correctAnswer: "E", hasWalkthrough: true,
        text: "f continuous, max 2 at x=1, min \u22122 at x=\u22121. Max\u2212min of (f(x))\u00B2+f(x)?",
        richText: ["The graph of ", {tex:"y = f(x)"}, " is a continuous curve. The function ", {tex:"f"}, " attains its maximum value of ", {tex:"2"}, " at ", {tex:"x = 1"}, ", and its minimum value of ", {tex:"-2"}, " at ", {tex:"x = -1"}, ".", "br", "Find the difference between the maximum and minimum values of", "br", {display:"(f(x))^2 + f(x)"}],
        options: [{letter:"A",tex:"\\frac{9}{4}"},{letter:"B",tex:"4"},{letter:"C",tex:"\\frac{17}{4}"},{letter:"D",tex:"6"},{letter:"E",tex:"\\frac{25}{4}"},{letter:"F",tex:"8"}] },
    ],
  },
  "tmua-2026mockP2": {
    title: "TMUA 2026 Mock Paper 2",
    source: "AceAdmissions Mock",
    questions: [
      { displayNum: 1, topic: "Calculus", correctAnswer: "D", hasWalkthrough: true,
        text: "How many stationary points does the curve y = 2x\u2074 \u2212 3x\u00B2 + 1 have?",
        richText: ["Determine the number of stationary points on the curve with equation", "br", {display:"y = 2x^4 - 3x^2 + 1"}],
        options: [{letter:"A",tex:"0"},{letter:"B",tex:"1"},{letter:"C",tex:"2"},{letter:"D",tex:"3"},{letter:"E",tex:"4"},{letter:"F",tex:"5"}] },

      { displayNum: 2, topic: "Calculus", correctAnswer: "E", hasWalkthrough: true,
        text: "Evaluate the difference of two integrals involving (\u221Ax \u00B1 1/\u221Ax)\u00B2 from 1 to 9.",
        richText: ["Evaluate", "br", {display:"\\int_1^9\\!\\left(\\sqrt{x}+\\tfrac{1}{\\sqrt{x}}\\right)^{\\!2}dx \\;-\\; \\int_1^9\\!\\left(\\sqrt{x}-\\tfrac{1}{\\sqrt{x}}\\right)^{\\!2}dx"}],
        options: [{letter:"A",tex:"0"},{letter:"B",tex:"4"},{letter:"C",tex:"14"},{letter:"D",tex:"28"},{letter:"E",tex:"32"},{letter:"F",tex:"56"}] },

      { displayNum: 3, topic: "Logic & Reasoning", correctAnswer: "G", hasWalkthrough: true,
        text: "Which of n = 2, 3, 5 is a counterexample to 'n prime \u21D2 n\u00B2+4 not prime'?",
        richText: ["Consider the following claim about the positive integer ", {tex:"n"}, ":", "br", {display:"n \\text{ prime} \\;\\Rightarrow\\; n^2 + 4 \\text{ not prime}"}, "Which of the following provide(s) a counterexample to this claim?", "br", {items:[{label:"I",tex:"n = 2"},{label:"II",tex:"n = 3"},{label:"III",tex:"n = 5"}]}],
        options: [{letter:"A",tex:"\\text{none}"},{letter:"B",tex:"\\text{I only}"},{letter:"C",tex:"\\text{II only}"},{letter:"D",tex:"\\text{III only}"},{letter:"E",tex:"\\text{I and II}"},{letter:"F",tex:"\\text{I and III}"},{letter:"G",tex:"\\text{II and III}"},{letter:"H",tex:"\\text{I, II and III}"}] },

      { displayNum: 4, topic: "Logic & Reasoning", correctAnswer: "F", hasWalkthrough: true,
        text: "A proof that n\u00B3+n is divisible by 6 for every integer n. On which line does the first error occur?",
        richText: ["The following is a proof that ", {tex:"n^3 + n"}, " is divisible by ", {tex:"6"}, " for every positive integer ", {tex:"n"}, ".", "br", {items:[
          {label:"I",   tex:"n^3 + n = n(n^2 + 1)"},
          {label:"II",  tex:"\\text{One of } n, n^2+1 \\text{ is even, so } n(n^2+1) \\text{ is even}"},
          {label:"III", tex:"\\text{So } n^3+n \\text{ is divisible by } 2"},
          {label:"IV",  tex:"\\text{Among } n-1, n, n+1 \\text{ one is divisible by } 3"},
          {label:"V",   tex:"(n-1)n(n+1) = n^3 - n \\text{ is divisible by } 3"},
          {label:"VI",  tex:"n^3 + n = (n^3 - n) + 2n, \\text{ so } n^3+n \\text{ is divisible by } 3"},
          {label:"VII", tex:"\\therefore n^3+n \\text{ is divisible by } 6"}
        ]}, "br", "Which of the following describes this proof?"],
        options: [{letter:"A",tex:"\\text{It is completely correct.}"},{letter:"B",tex:"\\text{The first error is on line I.}"},{letter:"C",tex:"\\text{The first error is on line III.}"},{letter:"D",tex:"\\text{The first error is on line IV.}"},{letter:"E",tex:"\\text{The first error is on line V.}"},{letter:"F",tex:"\\text{The first error is on line VI.}"},{letter:"G",tex:"\\text{The first error is on line VII.}"},{letter:"H",tex:"\\text{There is an error on every line.}"}] },

      { displayNum: 5, topic: "Logic & Reasoning", correctAnswer: "H", hasWalkthrough: true,
        text: "Which statements are equivalent to 'for all real x, x\u00B2 + 1 > 0'?",
        richText: ["Consider the statement", "br", {display:"\\text{For all real } x, \\; x^2 + 1 > 0."}, "Which of the following statements is/are equivalent to this?", "br", {items:[
          {label:"I",   tex:"\\text{There is no real } x \\text{ with } x^2 + 1 \\le 0"},
          {label:"II",  tex:"\\text{For all real } x, \\; x^2 \\ge 0"},
          {label:"III", tex:"\\text{It is not the case that there exists a real } x \\text{ with } x^2 + 1 \\le 0"}
        ]}],
        options: [{letter:"A",tex:"\\text{none of them}"},{letter:"B",tex:"\\text{I only}"},{letter:"C",tex:"\\text{II only}"},{letter:"D",tex:"\\text{III only}"},{letter:"E",tex:"\\text{I and II only}"},{letter:"F",tex:"\\text{I and III only}"},{letter:"G",tex:"\\text{II and III only}"},{letter:"H",tex:"\\text{I, II and III}"}] },

      { displayNum: 6, topic: "Logic & Reasoning", correctAnswer: "B", hasWalkthrough: true,
        text: "Let x, y be real. P: xy > 0. Q: x > 0 and y > 0. Which describes P and Q?",
        richText: ["Let ", {tex:"x"}, " and ", {tex:"y"}, " be real numbers. Consider the two statements:", "br", {items:[{label:"P",tex:"xy > 0"},{label:"Q",tex:"x > 0 \\text{ and } y > 0"}]}, "Which option best describes the relationship between P and Q?"],
        options: [{letter:"A",tex:"\\text{P is sufficient but not necessary for Q}"},{letter:"B",tex:"\\text{P is necessary but not sufficient for Q}"},{letter:"C",tex:"\\text{P is necessary and sufficient for Q}"},{letter:"D",tex:"\\text{P is neither necessary nor sufficient for Q}"}] },

      { displayNum: 7, topic: "Coordinate Geometry", correctAnswer: "E", hasWalkthrough: true,
        text: "Line ax + by = c has negative gradient and positive y-intercept. Which is a necessary but not sufficient condition on a, b, c?",
        richText: ["The line with equation ", {tex:"ax + by = c"}, " has negative gradient and positive y-intercept.", "br", "Which of the following is a necessary but not sufficient condition on ", {tex:"a, b, c"}, "?"],
        options: [{letter:"A",tex:"a > 0"},{letter:"B",tex:"b > 0"},{letter:"C",tex:"c > 0"},{letter:"D",tex:"a \\text{ and } b \\text{ have the same sign}"},{letter:"E",tex:"a \\text{ and } c \\text{ have the same sign}"},{letter:"F",tex:"b \\text{ and } c \\text{ have the same sign}"}] },

      { displayNum: 8, topic: "Sequences & Series", correctAnswer: "C", hasWalkthrough: true,
        text: "Smallest n for which any selection of n terms from 2, 5, 8, \u2026, 50 must contain two summing to 52.",
        richText: ["A selection, ", {tex:"S"}, ", of ", {tex:"n"}, " terms is taken from the arithmetic sequence", "br", {display:"2, 5, 8, 11, \\ldots, 50"}, "Consider the following statement:", "br", {items:[{label:"(*)",tex:"\\text{There are two distinct terms in } S \\text{ whose sum is } 52"}]}, "What is the smallest value of ", {tex:"n"}, " for which (*) is necessarily true?"],
        options: [{letter:"A",tex:"8"},{letter:"B",tex:"9"},{letter:"C",tex:"10"},{letter:"D",tex:"11"},{letter:"E",tex:"12"},{letter:"F",tex:"13"},{letter:"G",tex:"17"}] },

      { displayNum: 9, topic: "Logic & Reasoning", correctAnswer: "C", hasWalkthrough: true,
        text: "Complete set of values of k for which 'for all real x, x \u2265 k \u21D2 x\u00B2 \u2265 k' is true.",
        richText: ["Consider the following statement about a real number ", {tex:"k"}, ":", "br", {display:"\\text{For all real } x, \\quad x \\ge k \\;\\Rightarrow\\; x^2 \\ge k"}, "What is the complete set of values of ", {tex:"k"}, " for which this statement is true?"],
        options: [{letter:"A",tex:"k \\le 0"},{letter:"B",tex:"k \\ge 1"},{letter:"C",tex:"k \\le 0 \\text{ or } k \\ge 1"},{letter:"D",tex:"0 < k < 1"},{letter:"E",tex:"\\text{all real } k"},{letter:"F",tex:"\\text{no real } k"}] },

      { displayNum: 10, topic: "Logic & Reasoning", correctAnswer: "B", hasWalkthrough: true,
        text: "Which statements I, II, III about positive integers m, n are true?",
        richText: ["Which of the following statements about positive integers ", {tex:"m"}, " and ", {tex:"n"}, " is/are true?", "br", {items:[
          {label:"I",   tex:"\\text{If } m \\text{ and } n \\text{ are both even, then } m + n \\text{ is even}"},
          {label:"II",  tex:"\\text{If } m + n \\text{ is even, then } m \\text{ and } n \\text{ are both even}"},
          {label:"III", tex:"\\text{If } mn \\text{ is odd, then } m \\text{ or } n \\text{ is odd}"}
        ]}],
        options: [{letter:"A",tex:"\\text{none of them}"},{letter:"B",tex:"\\text{I only}"},{letter:"C",tex:"\\text{II only}"},{letter:"D",tex:"\\text{III only}"},{letter:"E",tex:"\\text{I and II only}"},{letter:"F",tex:"\\text{I and III only}"},{letter:"G",tex:"\\text{II and III only}"},{letter:"H",tex:"\\text{I, II and III}"}] },

      { displayNum: 11, topic: "Logic & Reasoning", correctAnswer: "A", hasWalkthrough: true,
        text: "Proof that \u221A2 is irrational. Which line, if any, contains the first error?",
        richText: ["The following is a proof that ", {tex:"\\sqrt{2}"}, " is irrational.", "br", {items:[
          {label:"I",   tex:"\\text{Suppose for contradiction } \\sqrt{2} = \\tfrac{p}{q} \\text{ with integers } p, q"},
          {label:"II",  tex:"\\text{and } p/q \\text{ in lowest terms (no common factor)}"},
          {label:"III", tex:"\\text{Then } p^2 = 2q^2, \\text{ so } p^2 \\text{ is even, so } p \\text{ is even}"},
          {label:"IV",  tex:"\\text{Write } p = 2k, \\text{ so } 4k^2 = 2q^2, \\text{ giving } q^2 = 2k^2"},
          {label:"V",   tex:"\\text{So } q^2 \\text{ is even, hence } q \\text{ is even}"},
          {label:"VI",  tex:"\\text{But } p, q \\text{ both even contradicts lowest terms, so } \\sqrt{2} \\text{ is irrational}"}
        ]}, "br", "Which of the following describes the proof?"],
        options: [{letter:"A",tex:"\\text{It is completely correct.}"},{letter:"B",tex:"\\text{The first error is on line I.}"},{letter:"C",tex:"\\text{The first error is on line II.}"},{letter:"D",tex:"\\text{The first error is on line III.}"},{letter:"E",tex:"\\text{The first error is on line IV.}"},{letter:"F",tex:"\\text{The first error is on line V.}"},{letter:"G",tex:"\\text{The first error is on line VI.}"},{letter:"H",tex:"\\text{There is an error on every line.}"}] },

      { displayNum: 12, topic: "Calculus", correctAnswer: "A", hasWalkthrough: true,
        text: "Order P = \u222B\u2080\u00B9 x dx, Q = \u222B\u2080\u00B9 \u221Ax dx, R = \u222B\u2080\u00B9 \u221B x dx.",
        richText: ["Define", "br", {display:"P = \\int_0^1 x\\,dx, \\quad Q = \\int_0^1 \\sqrt{x}\\,dx, \\quad R = \\int_0^1 \\sqrt[3]{x}\\,dx"}, "Which of the following is correct?"],
        options: [{letter:"A",tex:"P < Q < R"},{letter:"B",tex:"P < R < Q"},{letter:"C",tex:"Q < P < R"},{letter:"D",tex:"Q < R < P"},{letter:"E",tex:"R < P < Q"},{letter:"F",tex:"R < Q < P"}] },

      { displayNum: 13, topic: "Algebra", correctAnswer: "D", hasWalkthrough: true,
        text: "How many values of k make x\u00B2 \u2212 2kx + (k+2) = 0 have exactly one real solution?",
        richText: ["For how many values of ", {tex:"k"}, " does the equation", "br", {display:"x^2 - 2kx + (k + 2) = 0"}, "have exactly one real solution?"],
        options: [{letter:"A",tex:"\\text{no values}"},{letter:"B",tex:"\\text{exactly one}"},{letter:"C",tex:"\\text{exactly two}"},{letter:"D",tex:"\\text{exactly three}"},{letter:"E",tex:"\\text{exactly four}"},{letter:"F",tex:"\\text{infinitely many}"}] },

      { displayNum: 14, topic: "Algebra", correctAnswer: "C", hasWalkthrough: true,
        text: "(p\u00B2 \u2212 3)x = p + \u221A3 has a unique solution in x. Find the complete set of values of p.",
        richText: ["Find the complete set of real values of ", {tex:"p"}, " for which the equation", "br", {display:"(p^2 - 3)x = p + \\sqrt{3}"}, "has a unique solution in ", {tex:"x"}, "."],
        options: [{letter:"A",tex:"p \\ne \\sqrt{3}"},{letter:"B",tex:"p \\ne -\\sqrt{3}"},{letter:"C",tex:"p \\ne \\sqrt{3} \\text{ and } p \\ne -\\sqrt{3}"},{letter:"D",tex:"p = \\sqrt{3}"},{letter:"E",tex:"p = -\\sqrt{3}"},{letter:"F",tex:"\\text{all real } p"}] },

      { displayNum: 15, topic: "Probability", correctAnswer: "D", hasWalkthrough: true,
        text: "Two fair dice. Probability sum is a prime number?",
        richText: ["Two fair six-sided dice are rolled.", "br", "What is the probability that the sum of the numbers shown is a prime number?"],
        options: [{letter:"A",tex:"\\tfrac{1}{3}"},{letter:"B",tex:"\\tfrac{2}{5}"},{letter:"C",tex:"\\tfrac{1}{2}"},{letter:"D",tex:"\\tfrac{5}{12}"},{letter:"E",tex:"\\tfrac{7}{12}"},{letter:"F",tex:"\\tfrac{15}{36}"},{letter:"G",tex:"\\tfrac{1}{4}"}] },

      { displayNum: 16, topic: "Number Theory", correctAnswer: "B", hasWalkthrough: true,
        text: "Which of I, II, III are true for all positive integers a, b?",
        richText: ["Let ", {tex:"a"}, " and ", {tex:"b"}, " be positive integers.", "br", "Which of the following statements is/are true for all ", {tex:"a, b"}, "?", "br", {items:[
          {label:"I",   tex:"\\text{If } 5 \\text{ is a factor of } ab, \\text{ then } 5 \\text{ is a factor of } a \\text{ or } 5 \\text{ is a factor of } b"},
          {label:"II",  tex:"\\operatorname{hcf}(a, b) \\cdot \\operatorname{lcm}(a, b) = ab"},
          {label:"III", tex:"\\text{If } \\operatorname{hcf}(a, b) = 1, \\text{ then } \\operatorname{hcf}(a + b, ab) = 1"}
        ]}],
        options: [{letter:"A",tex:"\\text{none of them}"},{letter:"B",tex:"\\text{I only}"},{letter:"C",tex:"\\text{II only}"},{letter:"D",tex:"\\text{III only}"},{letter:"E",tex:"\\text{I and II only}"},{letter:"F",tex:"\\text{I and III only}"},{letter:"G",tex:"\\text{II and III only}"},{letter:"H",tex:"\\text{I, II and III}"}] },

      { displayNum: 17, topic: "Logic & Reasoning", correctAnswer: "B", hasWalkthrough: true,
        text: "A claimed proof about the cubic x\u00B3 \u2212 3x\u00B2 + c. Which best describes the argument?",
        richText: ["Consider the following argument, which claims to prove:", "br", {display:"\\text{For all real } c \\text{ with } 0 < c < 4, \\; x^3 - 3x^2 + c = 0 \\text{ has three distinct real roots.}"}, {items:[
          {label:"I",   tex:"f(x) = x^3 - 3x^2 + c \\text{ has } f'(x) = 3x^2 - 6x = 3x(x - 2)"},
          {label:"II",  tex:"f \\text{ has critical points at } x = 0 \\text{ and } x = 2"},
          {label:"III", tex:"f(0) = c, \\; f(2) = c - 4"},
          {label:"IV",  tex:"\\text{If } f \\text{ has three distinct real roots, then the critical values have opposite signs}"},
          {label:"V",   tex:"f(0) \\cdot f(2) = c(c - 4) < 0 \\text{ when } 0 < c < 4"},
          {label:"VI",  tex:"\\therefore \\text{ the cubic has three distinct real roots.}"}
        ]}, "br", "Which of the following best describes this argument?"],
        options: [{letter:"A",tex:"\\text{correct}"},{letter:"B",tex:"\\text{converse}"},{letter:"C",tex:"\\text{error in line I}"},{letter:"D",tex:"\\text{error in line II}"},{letter:"E",tex:"\\text{error in line III}"},{letter:"F",tex:"\\text{error in line V}"}] },

      { displayNum: 18, topic: "Algebra", correctAnswer: "D", hasWalkthrough: true,
        text: "Complete set of (b, c) for which x\u2074 + bx\u00B2 + c has no real roots?",
        richText: ["Find the complete set of pairs ", {tex:"(b, c)"}, " of real numbers for which the equation", "br", {display:"x^4 + bx^2 + c = 0"}, "has no real solutions."],
        options: [{letter:"A",tex:"b^2 > 4c"},{letter:"B",tex:"b^2 < 4c"},{letter:"C",tex:"c > 0 \\text{ and } b > 2\\sqrt{c}"},{letter:"D",tex:"c > 0 \\text{ and } b > -2\\sqrt{c}"},{letter:"E",tex:"c > 0 \\text{ and } b < -2\\sqrt{c}"},{letter:"F",tex:"c > 0 \\text{ and } b < 0"}] },

      { displayNum: 19, topic: "Calculus", correctAnswer: "E", hasWalkthrough: true,
        text: "f(x)=x\u00B2+1, g(x) = f(x)\u00B7f'(x). Three statements about root counts. Which are true?",
        richText: ["Let ", {tex:"f(x) = x^2 + 1"}, " and ", {tex:"g(x) = f(x) \\cdot f'(x)"}, ".", "br", "Let ", {tex:"M"}, " be the number of real roots of ", {tex:"f"}, " and ", {tex:"N"}, " be the number of real roots of ", {tex:"g"}, ".", "br", "Which of the following statements is/are true?", "br", {items:[
          {label:"I",   tex:"N \\ge M"},
          {label:"II",  tex:"\\text{Every root of } f \\text{ is a root of } g"},
          {label:"III", tex:"M > N \\text{ is possible for some choice of } f"}
        ]}],
        options: [{letter:"A",tex:"\\text{none of them}"},{letter:"B",tex:"\\text{I only}"},{letter:"C",tex:"\\text{II only}"},{letter:"D",tex:"\\text{III only}"},{letter:"E",tex:"\\text{I and II only}"},{letter:"F",tex:"\\text{I and III only}"},{letter:"G",tex:"\\text{II and III only}"},{letter:"H",tex:"\\text{I, II and III}"}] },

      { displayNum: 20, topic: "Calculus", correctAnswer: "B", hasWalkthrough: true,
        text: "Sequence h_{n+1}(x) = sin(h_n(x)) with h_1(x) = sin x. Max values m_1, m_2, m_3, m_4. Which is true?",
        richText: ["A sequence of functions is defined by", "br", {display:"h_1(x) = \\sin x"}, "and", "br", {display:"h_{n+1}(x) = \\sin(h_n(x)) \\text{ for } n \\ge 1."}, "These functions have maximum values ", {tex:"m_1, m_2, m_3"}, " and ", {tex:"m_4"}, " respectively.", "br", "Which one of the following statements is true?"],
        options: [{letter:"A",tex:"m_1 = m_2 = m_3 = m_4 = 1"},{letter:"B",tex:"m_1 = 1 \\text{ and } 0 < m_4 < m_3 < m_2 < 1"},{letter:"C",tex:"m_1 = m_3 = 1 \\text{ and } m_2 = m_4 < 1"},{letter:"D",tex:"m_1 > m_2 > m_3 > m_4 \\text{ and all equal } 0"},{letter:"E",tex:"m_1 > m_2 = m_3 = m_4"}] },
    ],
  },

};
