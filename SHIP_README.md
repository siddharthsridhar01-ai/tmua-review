# Full Update Ship (final) — everything aligned to walkthroughs as source of truth

Cumulative bundle. Applies cleanly whether or not you've shipped previous bundles — it's a full `src/` replacement.

## What it does

### 1. Paper renaming
- `tmua-2026mock` → `tmua-2026mockA-p1`
- `tmua-2026mockP2` → `tmua-2026mockA-p2`
- `tmua-2026mockB` → `tmua-2026mockB-p1`
- Home page order: Set A Paper 1 → Set A Paper 2 → Set B Paper 1

### 2. Paper 1 option-card retrofit (40 walkthroughs)
CSS grid → centred flex-wrap with two-row stacked letter/text cards, matching Paper 2.

### 3. Verify-step option-strip deletion (9 Set B files)
Removed decorative strips from Q7, Q8, Q9, Q15–Q20. These weren't interactive — clutter from an earlier sweep.

### 4. Paper 1 QuestionSummary refresher retrofit (40 walkthroughs)
Now uses the `SECTIONS_QN` / `OPTIONS_QN` pattern. Display equations render on their own centred line in the refresher.

### 5. Naming — walkthrough header (60 walkthroughs)
```
[TMUA]  AceAdmissions Mock · Set X · <Topic>
Interactive Walkthrough
Paper N · Question M
```
META structure changed from `{paper, year, topicTag}` → `{set, paperNumber, topicTag}`.

### 6. Naming — exam/review question subtitles
Both pages now show `Set X Paper N · Question M` instead of `AceAdmissions Mock · Question M`.

### 7. papers.ts content alignment (18 entries regenerated)
For 18 questions, papers.ts was showing different question content from the walkthrough. Walkthroughs were the source of truth — papers.ts has been regenerated from the walkthrough `SECTIONS_QN` + `opts` arrays. The exam page now shows exactly what the walkthrough's Read step shows.

**Questions updated:**
- **Set A Paper 2:** Q4, Q5, Q6, Q7, Q8, Q11, Q13, Q14, Q15, Q17
- **Set B Paper 1:** Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8

### 8. Zero remaining content drift
All 60 walkthroughs ↔ papers.ts aligned.

Only "drift" remaining: Set B Paper 1 Q11, Q14, Q18, Q19, Q20 use `\frac` in papers.ts vs `\dfrac` in walkthrough. Visually identical to students — intentionally left alone.

## Files shipped (70 total)

```
src/
├── app/practice/[paperId]/
│   ├── exam/page.tsx    (modified)
│   └── review/page.tsx  (modified)
├── components/
│   ├── QuestionDiagrams.tsx    (paper key renamed)
│   └── walkthroughs/
│       ├── WalkthroughLoader.tsx  (renamed keys, reordered)
│       ├── tmua-2026mockA-p1/  (20 walkthroughs)
│       ├── tmua-2026mockA-p2/  (20 walkthroughs)
│       └── tmua-2026mockB-p1/  (20 walkthroughs)
└── lib/
    ├── papers.ts   (renames + 18 entries regenerated)
    └── tmua.ts     (unchanged)
```

## Build status

`npm run build` passes clean. All 60 walkthroughs + 2 page.tsx files + papers.ts parse OK.

## PowerShell to ship

```powershell
Set-Location $HOME\tmua-review
git checkout main
git pull

# Delete old paper folders (being renamed)
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue src\components\walkthroughs\tmua-2026mock
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue src\components\walkthroughs\tmua-2026mockB
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue src\components\walkthroughs\tmua-2026mockP2

# Unzip
Expand-Archive -Path $HOME\Downloads\tmua_full_update_ship.zip -DestinationPath $HOME\tmua-review -Force

# Verify + push
npm run build
git add -A
git commit -m "Rename papers, retrofit Paper 1 option cards + QuestionSummary, remove Verify option strips, update naming, align papers.ts to walkthroughs"
git push
```
