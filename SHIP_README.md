# Full Update Ship — rename + QuestionSummary retrofit + Verify cleanup + naming

This bundle is cumulative: it includes everything from the previous "rename + option-card retrofit" bundle PLUS this turn's fixes. Safe to apply even if you didn't ship the previous bundle.

## What it does

### 1. Paper renaming (cumulative from previous session)
- `tmua-2026mock` → `tmua-2026mockA-p1` (Set A Paper 1)
- `tmua-2026mockP2` → `tmua-2026mockA-p2` (Set A Paper 2)
- `tmua-2026mockB` → `tmua-2026mockB-p1` (Set B Paper 1)
- Home-page order: Set A Paper 1 → Set A Paper 2 → Set B Paper 1
- Titles in `papers.ts` updated to "AceAdmissions TMUA Mock Set X Paper N" form

### 2. Paper 1 option-card retrofit (cumulative from previous session)
All 40 Paper 1 walkthroughs switched from CSS grid option cards to centred flex-wrap + two-row stacked letter/text layout matching Paper 2. Card widths picked per-question (100/140/200 px).

### 3. Verify-step option-strip deletion (new this turn)
Removed the decorative option strip at the bottom of 9 VerifyStep sections (Set B Q7, Q8, Q9, Q15-Q20). Those strips were a mistake from a prior sweep — they weren't interactive, just static clutter.

### 4. QuestionSummary refresher retrofit (new this turn)
All 40 Paper 1 walkthroughs now use the Paper 2 frozen `SECTIONS_QN` / `OPTIONS_QN` pattern for their QuestionSummary refresher. Previously, display-equation mathboxes got crammed inline; now they render on their own centred line like in Paper 2.

### 5. Naming in walkthrough header (new this turn)
Walkthrough header now reads:

```
[TMUA]  AceAdmissions Mock · Set X · <Topic>
Interactive Walkthrough
Paper N · Question M
```

Previously was:

```
[TMUA]  Set X Paper N · <Topic>
Interactive Walkthrough
TMUA 2026 Mock · Set X Paper N · Question M
```

META structure changed from `{paper, year, topicTag}` → `{set, paperNumber, topicTag}`.

### 6. Question-card subtitles (new this turn)
Review page and exam page now show **`Set X Paper N · Question M`** as the per-question subtitle, instead of the generic "AceAdmissions Mock · Question M".

## Files shipped (70 total)

```
src/
├── app/
│   └── practice/[paperId]/
│       ├── exam/page.tsx        (modified — subtitle format)
│       └── review/page.tsx      (modified — subtitle format)
├── components/
│   ├── QuestionDiagrams.tsx     (modified — paper key renamed)
│   └── walkthroughs/
│       ├── WalkthroughLoader.tsx (modified — renamed keys, reordered)
│       ├── tmua-2026mockA-p1/    (20 walkthroughs, heavy retrofit)
│       ├── tmua-2026mockA-p2/    (20 walkthroughs, minor META/header update)
│       └── tmua-2026mockB-p1/    (20 walkthroughs, heavy retrofit)
└── lib/
    ├── papers.ts                (modified — keys, titles, order)
    └── tmua.ts                  (unchanged from repo, shipped for completeness)
```

## Build status

`npm run build` passes cleanly. All 60 walkthroughs + 4 infra files + 2 app pages parse OK.

## To ship from PowerShell

Your local clone at `C:\Users\busin\tmua-review` should currently match the GitHub remote (one earlier Paper 2 push + the original state). This bundle supersedes everything in `src/`.

```powershell
# Go to repo and sync
Set-Location $HOME\tmua-review
git checkout main
git pull

# Delete the three OLD paper folders (being renamed)
# Safe if they don't exist — PowerShell -ErrorAction SilentlyContinue won't error.
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue src\components\walkthroughs\tmua-2026mock
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue src\components\walkthroughs\tmua-2026mockB
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue src\components\walkthroughs\tmua-2026mockP2

# Unzip this bundle (merges into src/, overwrites pages and libs)
Expand-Archive -Path $HOME\Downloads\tmua_full_update_ship.zip -DestinationPath $HOME\tmua-review -Force

# Verify build
npm run build

# Commit and push
git add -A
git commit -m "Rename papers, retrofit Paper 1 option cards + QuestionSummary, remove Verify option strips, update naming

PAPER RENAMING:
- tmua-2026mock       -> tmua-2026mockA-p1 (Set A Paper 1)
- tmua-2026mockP2     -> tmua-2026mockA-p2 (Set A Paper 2)
- tmua-2026mockB      -> tmua-2026mockB-p1 (Set B Paper 1)
Home-page order: Set A P1, Set A P2, Set B P1.

PAPER 1 OPTION CARD RETROFIT (40 walkthroughs):
Replaced CSS grid + inline letter/text with centred flex-wrap + two-row
stacked letter/text layout matching Paper 2 frozen spec.
Widths: 100/140/200 per-question based on longest option.

PAPER 1 QUESTION-SUMMARY REFRESHER RETROFIT (40 walkthroughs):
Now uses SECTIONS_QN / OPTIONS_QN frozen pattern from Paper 2.
Display-math mathboxes render on their own centred line in the refresher
instead of getting crammed inline.

VERIFY-STEP OPTION-STRIP DELETION (9 Set B files):
Removed decorative option strips from Q7, Q8, Q9, Q15-Q20 VerifyStep sections.
Those strips weren't interactive — static clutter from a prior sweep.

NAMING:
Walkthrough header: '[TMUA] AceAdmissions Mock . Set X . <Topic>' +
  'Interactive Walkthrough' + 'Paper N . Question M'.
META: {paper, year, ...} -> {set, paperNumber, ...}.
Review/exam page per-question subtitles: 'Set X Paper N . Question M'.

Verified: next build passes; all 60 walkthroughs + app pages parse clean."
git push
```

## If anything goes wrong

- **npm run build fails**: paste the error back. The sandbox built cleanly, so failure would likely be an environment issue (Node version, etc.).
- **Git asks for credentials**: use a GitHub personal access token as the password.
- **`Expand-Archive` errors about existing files**: the `-Force` flag should handle it, but if it still complains, try `tar -xf $HOME\Downloads\tmua_full_update_ship.zip -C $HOME\tmua-review` instead.
