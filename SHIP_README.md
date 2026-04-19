# AceAdmissions Rename + Paper 1 Retrofit — Ship Bundle v2

This bundle does two things:

1. **Renames** all three papers to match the AceAdmissions naming convention.
2. **Retrofits** Paper 1 Set A and Paper 1 Set B walkthroughs so their ReadStep option cards match the frozen spec used in Paper 2.

## Changes applied

### Renaming

| Old paper ID | New paper ID | New title |
|---|---|---|
| `tmua-2026mock` | `tmua-2026mockA-p1` | AceAdmissions TMUA Mock Set A Paper 1 |
| `tmua-2026mockP2` | `tmua-2026mockA-p2` | AceAdmissions TMUA Mock Set A Paper 2 |
| `tmua-2026mockB` | `tmua-2026mockB-p1` | AceAdmissions TMUA Mock Set B Paper 1 |

Home-page order: **Set A Paper 1 → Set A Paper 2 → Set B Paper 1.**

Walkthrough folder names, loader import paths, `QuestionDiagrams` registry key, paper-entry order in `papers.ts`, and per-walkthrough `META.paper` / `META.year` all updated consistently.

### Option-card retrofit (Paper 1 Set A + Set B, 40 walkthroughs)

The ReadStep option cards changed from the old CSS grid pattern (with inline letter + text) to the frozen pattern used in Paper 2:

**Before** — per-card: letter and text inline on one line; grid columns forced uniform layout that sometimes wrapped the text to a second line inconsistently.

**After** — per-card: letter on its own row (11px, accent colour), text on its own row below (14px, body); all cards in a question have identical width (100/140/200/280px depending on longest option); centred flex-wrap layout.

Widths picked case-by-case:
- **100px** (pure numbers / short fractions): most Calculus, Algebra, Probability questions
- **140px** (short maths / short labels): e.g. Set A Q8, Q10, Q11, Q17; Set B Q10, Q11, Q13, Q14, Q17, Q19
- **200px** (moderate prose / longer maths): e.g. Set A Q16; Set B Q2, Q18

The walkthrough Read step question body (prose + MathBox + items) was already in the right structure, so nothing changed in the question text area. Exam-page rendering also unchanged — it already matches the walkthrough's content structure because both read from the same prose/display/items data shape.

### Files touched

```
Modified (3):
  src/components/QuestionDiagrams.tsx         — registry key renamed
  src/components/walkthroughs/WalkthroughLoader.tsx — all 3 paper keys + import paths + order
  src/lib/papers.ts                           — keys + titles + order
  src/lib/tmua.ts                             — (no change, shipped for reference)

Renamed + modified (60 walkthroughs):
  tmua-2026mock/*        → tmua-2026mockA-p1/*  (option card + META update)
  tmua-2026mockP2/*      → tmua-2026mockA-p2/*  (META update only)
  tmua-2026mockB/*       → tmua-2026mockB-p1/*  (option card + META update)
```

## Build status

`next build` passes cleanly. All 60 walkthroughs + 4 infrastructure files parse.

## To ship from PowerShell

**Important:** this bundle RENAMES folders. The zip ships the three **new** folders. Before unzipping, you should delete the three **old** folders from your local clone, otherwise you'll end up with duplicates.

```powershell
# Go to repo
Set-Location $HOME\tmua-review

# Sync with remote
git checkout main
git pull

# Delete the old folder names (they're being renamed)
Remove-Item -Recurse -Force src\components\walkthroughs\tmua-2026mock
Remove-Item -Recurse -Force src\components\walkthroughs\tmua-2026mockB
Remove-Item -Recurse -Force src\components\walkthroughs\tmua-2026mockP2

# Unzip the new bundle (merges into src/)
Expand-Archive -Path $HOME\Downloads\tmua_rename_retrofit_ship.zip -DestinationPath $HOME\tmua-review -Force

# Verify build
npm run build

# If the build passes, commit and push
git add -A
git commit -m "Rename papers to AceAdmissions Set A/B + retrofit Paper 1 option cards

Paper rename:
- tmua-2026mock       -> tmua-2026mockA-p1 (Set A Paper 1)
- tmua-2026mockP2     -> tmua-2026mockA-p2 (Set A Paper 2)
- tmua-2026mockB      -> tmua-2026mockB-p1 (Set B Paper 1)

Home page order: Set A P1, Set A P2, Set B P1.

Paper 1 option card retrofit (40 walkthroughs):
- Replaced CSS grid + inline letter/text with centred flex-wrap
  + fixed-width cards + two-row stacked letter/text layout.
- Widths: 100/140/200 per question based on longest option.

Verified: next build passes; all 60 walkthroughs parse clean."
git push
```
