# Bob's Adventure — A Container Journey

An interactive onboarding game for new joiners at an ocean carrier. **Bob**, a shipping container, tells his own journey from an empty depot to the consignee's door — and back — in 11 steps. At each step, the player decides what happens next.

**Play:** open `index.html` in any browser (works offline), or use the deployed site.

## What's inside
- **3 levels** — Newcomer, Intermediate, Expert (incidents and case studies at every step)
- **7 container types** — 20' and 40' dry, 40' high cube, reefer, open top, flat rack, tank (dangerous goods)
- **3 routes** — Shanghai → Le Havre (direct), Ho Chi Minh City → Singapore → Le Havre (transshipment), Guayaquil/Posorja → Antwerp-Bruges (reefer)
- **11 Incoterms 2020** — risk ▲ and cost ● transfer points shown along the journey
- Documents to read and check (scored 1 / 0.5 / 0), "What happens next?" questions, final quiz and summary

## Project structure
```
index.html              the built game (single self-contained file)
src/engine.html         HTML, CSS and JavaScript engine + CONFIG (branding, colours, illustrative tariff)
src/content/global.json menu texts, Bob's intro, containers, routes, Incoterms, glossary, verification list, final quiz
src/content/stepNN.json one file per step, all 3 levels
src/build.py            merges engine + content → dist/container-journey_v0.3.html
```

## Editing
1. Change texts in `src/content/*.json` (no code needed). Mini-syntax: `[[term]]` glossary link, `[TO VERIFY:vNN]` verification flag, `**bold**`, `{pol}` / `{cargo}` / `{incoterm}` … placeholders.
2. Rebrand in the `CONFIG` block of `src/engine.html` (company name, logo text, colours, game title, Bob's name).
3. Rebuild: `python3 src/build.py`, then copy `dist/container-journey_v0.3.html` to `index.html`.

The build checks that every `[TO VERIFY]` id exists in the verification list and every `[[term]]` exists in the glossary.

## Before production use
All companies, vessels, references and figures are fictional or illustrative. Every item flagged **TO VERIFY** (list in the game: ☰ → Verification list) must be validated by a qualified colleague. Set `showVerifyMarkers: false` in `CONFIG` once validated.

Built entirely with Claude (Anthropic) for an AI course project.
