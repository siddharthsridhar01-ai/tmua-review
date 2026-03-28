# TMUA Interactive Review

Interactive walkthrough review platform for TMUA (Test of Mathematics for University Admission) practice papers. Built with Next.js 16.

## Features

- **20 interactive walkthroughs** for TMUA 2026 Mock Paper 1
- **Exam mode** with timer, flagging, and Pearson VUE-style interface
- **Review mode** with score breakdown by topic, walkthrough access per question
- **KaTeX math rendering** throughout all walkthroughs
- **Interactive verify sections** with sliders, graphs, and click-to-check

## Quick Start

### Prerequisites
- **Node.js 18+** (check with `node --version`)
- **npm** (comes with Node.js)

### Setup & Run

```bash
# 1. Navigate to the project directory
cd tmua-review

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
tmua-review/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page - paper selection
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Global styles
│   │   └── practice/
│   │       └── [paperId]/
│   │           ├── exam/page.tsx       # Exam mode (timed, with VUE theme)
│   │           └── review/page.tsx     # Review mode (scores + walkthroughs)
│   ├── components/
│   │   └── walkthroughs/
│   │       ├── WalkthroughLoader.tsx   # Dynamic loader for walkthrough components
│   │       └── tmua-2026mock/          # 20 walkthrough components (Q1-Q20)
│   │           ├── tmua-q1.tsx
│   │           ├── tmua-q2.tsx
│   │           └── ... (tmua-q3 through tmua-q20)
│   └── lib/
│       ├── tmua.ts                     # Colour constants, types, helpers
│       └── papers.ts                   # Paper data (questions, answers, topics)
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## How It Works

1. **Home page** - Select a paper (currently: TMUA 2026 Mock Paper 1)
2. **Take Exam** - Timed 75-minute exam with 20 MCQ questions
3. **Review** - After exam (or in demo mode), see scores by topic and review each question with interactive walkthroughs

Each walkthrough has 5 steps:
- **Read** - Full question text with options
- **Setup** - Strategy and key insights
- **Solve** - Step-by-step worked solution with diagrams
- **Verify (Optional)** - Interactive graphs, sliders, or click-to-check
- **Answer** - Option-by-option evaluation with explanations

## Adding More Papers

1. Add question data to `src/lib/papers.ts`
2. Create walkthrough components in `src/components/walkthroughs/<paper-id>/`
3. Register them in `src/components/walkthroughs/WalkthroughLoader.tsx`

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **KaTeX** (loaded via CDN in walkthrough components)
- **Inline SVG** for all graphs and diagrams

## Part of AceAdmissions

This platform is part of the AceAdmissions suite for UK admissions test preparation. The same design system and component architecture is shared with the TARA (Critical Thinking) review platform.
"# tmua-review" 
