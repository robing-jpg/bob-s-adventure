# Bob's Adventure — handoff for a new project / conversation

Read this file first. It replaces the long history of the first project ("AI" project, Oct–Nov 2026).

## State (20 Nov 2026, v0.5)
- Playable game: `index.html` (single file, offline). Source in `src/` — edit the JSON, not the built file.
- v0.5 changes: see "v0.5 — what changed" below.
- Build: `python3 src/build.py` → `dist/container-journey_v0.3.html` → copy to `index.html`, commit, push. The build fails if a `[TO VERIFY:vNN]` id or a `[[term]]` is missing.
- Hosting: GitHub `robing-jpg/bob-s-adventure` (main). Vercel import pending (static site, `vercel.json` included).

## Product decisions (final)
- 11 steps × 3 levels (Newcomer / Intermediate / Expert). L3 texts fall back to L2 where absent.
- Bob's intro opens the game every time; progress saved in localStorage, resumed from the menu ("Resume").
- Start menu: nickname (required), level, 7 container types (families dry / reefer / oog / tank), 3 routes (SHA→LEH direct, HCM→SIN→LEH transshipment, GYE/Posorja→ANR reefer), Incoterm (**L1: fixed to FOB** via `CONFIG.level1Incoterm`, not chosen; L2/L3: all 11).
- Level change = new journey (restart at step 1).
- Gating: "Next" blocked on each scene until its ★ essentials are opened.
- Documents (L2/L3): full-screen viewer, ①②③ points, check scored 1 / 0.5 / 0 (answer revealed after 2 wrong tries). Spot-the-error on draft B/L (L2/L3) and endorsed B/L (L3).
- Steps 4 and 9 shown as 4 illustrated stations; quay, ship, yard drawn at one shared container scale (`K = 0.35`).
- Incoterm named places (examples, to confirm): FCA = origin terminal; CPT/CIP = destination terminal; D-rules = buyer's premises. Risk/cost steps: EXW 2/2 · FCA, FAS 5/5 · FOB 6/6 · CFR, CIF 6/8 · CPT, CIP 5/8 · DAP, DDP 10/10 · DPU 11/11.

## Rules to keep
- English content; neutral fictional brands; rebrand only via `CONFIG` in `src/engine.html`.
- Never invent figures: mark with `[TO VERIFY:vNN]` (or `"v": "vNN"` in data) and add the item to `verification` in `global.json` (v01–v93 used; v78–v93 = cost / CO₂ data).
- Answer options (steps, documents, quiz, all levels): length spread ≤ 20 % (max/min ≤ 1.2), right answer not systematically the longest; positions are shuffled by the engine. Check with an audit script before committing new questions.
- One copy of the SVG gradients/patterns only (`#svgDefs`, mounted once). Never copy `DEFS` into a scene or a hidden element again.
- Cartons and vehicles are separate objects: loose cargo moves only while the vehicle is parked and is hidden before it leaves.
- When asked for a change, edit files and show only the modified parts.
- End every answer with an approximate token usage line (input / output / models).

## v0.5 — what changed
1. **Texture bug fixed at the root**: the gradients existed twice (in every scene and in a hidden `<svg>` of the start menu); `url(#…)` resolved to the hidden copy → empty cartons, cab, sea, hull. Now one `#svgDefs` for the page; `stop-color` with CSS variables moved to `style`.
2. **Cartons ≠ truck** (steps 2 and 11): loose cartons go from the warehouse stock into the box (or back) only while the truck is parked; the box closes before the truck leaves. Open-top machine hidden once the tarp closes.
3. **Redrawn equipment**: STS crane (portal, A-frame, stays, truss boom, machinery house, trolley with cab, hoist ropes, head block, spreader with twistlocks), RTG spreader, ship (bulwark, hatch covers, lashing bridges, forecastle, foam), small inland truck (tractor + chassis).
4. **Answer options rewritten** (90 sets) to the length rule; mobile/desktop answer buttons share one size (`grid-auto-rows:1fr`).
5. **Transfer moment**: full-screen animation when the box passes the Incoterm point (one moment, or risk then cost for C rules). Skip, Esc, static version with reduced motion. Texts: `ui.xfer` + `incoterms[k].point`.
6. **Level 1**: Incoterm fixed (FOB), explained in the menu and at the transfer moment; first L1 questions simplified. Definition sentence (`ui.incoDef`) in menu, glossary, guide and animation.
7. **Nickname + results**: nickname with GDPR line; at the summary a results record (scores + right/wrong per question) is saved locally, sent to `CONFIG.resultsEndpoint` (Google Apps Script → Sheet, see `docs/RESULTS_SETUP.md`, `docs/apps-script.gs`) and downloadable as CSV. "Points to work on" list on the summary.
8. **Cost & CO₂ pills** in the top bar (click → per-step panel, seller/buyer split from the Incoterm). Data in `global.json → footprint` (costs per route/container, factors, distances), each value with a TO VERIFY id. Indicative, November 2026. There was no separate "cost meter" in v0.4 code; the step-file "Costs" tab still describes charges.

## Open items
1. Expert validation of all TO VERIFY items (v01–v93), especially the cost/CO₂ values (v78–v93) which go stale fast.
2. Vercel deployment (import the repo, default settings).
3. Accessibility audit with a screen reader.
4. Optional: more Incoterm-dependent questions; CPT/CIP door variant; flat rack cargo shown in step 11.
5. Set `CONFIG.resultsEndpoint` once the Google Sheet is deployed; agree the GDPR retention rule.
6. Cross-browser check on Firefox and Safari (v0.5 was tested headless in Chrome only: Firefox/WebKit could not be downloaded in the build environment).

## Testing
Headless Playwright scripts (not in repo) drove 10+ full journeys across all levels, containers and routes with no errors. Re-create a similar smoke test before big changes.
v0.5 (Chrome headless): full 11-step journeys + quiz at 1280×800 (L1 reefer GYE→ANR FOB; L2 reefer CIF; L3 flat rack SHA→LEH DAP) and 640×360 (L2 20' HCM→SIN→LEH CPT). Each scene checked for duplicate ids, broken `url(#…)` and references into hidden elements: none. Transfer moments fired at the right steps (FOB 6; CIF 6+8; CPT 5+8), Esc / reduced motion OK, answer buttons equal height, results record written.
