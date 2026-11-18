# Bob's Adventure — handoff for a new project / conversation

Read this file first. It replaces the long history of the first project ("AI" project, Oct–Nov 2026).

## State (18 Nov 2026, v0.4.1)
- Playable game: `index.html` (single file, offline). Source in `src/` — edit the JSON, not the built file.
- Build: `python3 src/build.py` → `dist/container-journey_v0.3.html` → copy to `index.html`, commit, push. The build fails if a `[TO VERIFY:vNN]` id or a `[[term]]` is missing.
- Hosting: GitHub `robing-jpg/bob-s-adventure` (main). Vercel import pending (static site, `vercel.json` included).

## Product decisions (final)
- 11 steps × 3 levels (Newcomer / Intermediate / Expert). L3 texts fall back to L2 where absent.
- Bob's intro opens the game every time; progress saved in localStorage, resumed from the menu ("Resume").
- Start menu: level, 7 container types (families dry / reefer / oog / tank), 3 routes (SHA→LEH direct, HCM→SIN→LEH transshipment, GYE/Posorja→ANR reefer), Incoterm (L1: 5 common + "show all"; L2/L3: all 11).
- Level change = new journey (restart at step 1).
- Gating: "Next" blocked on each scene until its ★ essentials are opened.
- Documents (L2/L3): full-screen viewer, ①②③ points, check scored 1 / 0.5 / 0 (answer revealed after 2 wrong tries). Spot-the-error on draft B/L (L2/L3) and endorsed B/L (L3).
- Steps 4 and 9 shown as 4 illustrated stations; quay, ship, yard drawn at one shared container scale (`K = 0.35`).
- Incoterm named places (examples, to confirm): FCA = origin terminal; CPT/CIP = destination terminal; D-rules = buyer's premises. Risk/cost steps: EXW 2/2 · FCA, FAS 5/5 · FOB 6/6 · CFR, CIF 6/8 · CPT, CIP 5/8 · DAP, DDP 10/10 · DPU 11/11.

## Rules to keep
- English content; neutral fictional brands; rebrand only via `CONFIG` in `src/engine.html`.
- Never invent figures: mark with `[TO VERIFY:vNN]` and add the item to `verification` in `global.json` (v01–v77 used).
- When asked for a change, edit files and show only the modified parts.
- End every answer with an approximate token usage line (input / output / models).

## Open items
1. Expert validation of all TO VERIFY items (v01–v77).
2. Vercel deployment (import the repo, default settings).
3. Accessibility audit with a screen reader.
4. Optional: more Incoterm-dependent questions; CPT/CIP door variant; flat rack cargo shown in step 11.

## Testing
Headless Playwright scripts (not in repo) drove 10+ full journeys across all levels, containers and routes with no errors. Re-create a similar smoke test before big changes.
