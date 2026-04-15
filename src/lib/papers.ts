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
};
