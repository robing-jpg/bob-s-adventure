# Bob's Adventure — handoff for a new project / conversation

Read this file first. It replaces the long history of the first project ("AI" project, Oct–Nov 2026).

## State (24 Nov 2026, v1.0 in progress — final delivery 26 Nov)
- Playable game: `index.html` (single file, offline). Source in `src/` — edit the JSON, not the built file.
- v1.0 work plan and progress: see "v1.0 — progress" below (read it first when resuming). v0.5 changes: further down.
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

## v1.0 — progress (brief: project doc `claude/07_prompt-v1.0-design-and-fixes.md`)
| Block | Content | Status |
|---|---|---|
| A | Retours 1–4: CO₂ step by step, Bob's eyes, essentials nudge, rail/barge to inland terminals | **done** (24 Nov) |
| B | Retour 5: real world map (Natural Earth) at step 7 | to do |
| C | Retour 6: realism. Pilot = step 6 + intro sea, 2 screenshots, **wait for OK**; then 7, 1, 2, 3+10, 5, 8, 11, 4+9, menu + intro (one push per group) | to do |
| — | Final: v1.0 in CONFIG / README / HANDOFF; 4 test journeys (L1 reefer GYE→ANR · L2 20' HCM→SIN→LEH CIF rail · L3 flat rack SHA→LEH DAP · L2 tank SHA→LEH FCA), 0 console errors | to do |

### Block A — what changed (24 Nov)
1. **CO₂ by step** — `global.json → footprint.lines` lists every emission source (step, beat, calc type); the engine only does the arithmetic. New sources: empty truck depot → shipper (step 1), stuffing (2, GLEC hub 1.3 kg/t; 2.5 kg/t for reefer cargo), first mile by truck for barge/rail (3), maritime terminal 10.7 kg/container at origin (6), hub (7, transshipment) and destination (8), sea legs split over the map beats (`sea[].split`), last mile by truck (10), unstuffing (11), reefer plug-in per step (`routes[].plug`, days). Steps 4 and 9: "+0 kg — paperwork only" (`footprint.zero`), except reefer plug-in at 9. Step 5: GLEC gives one terminal value per container, not splittable → counted at step 6, explained in the panel (`zero["5"]`).
   The counter moves when the beat is played (`S.mGi[step]` = highest beat played), with a "+X kg CO₂e" chip; kg below 1,000 kg, then tonnes with 1 decimal. Panel: per step "+X this step / Y so far", one-line calculation per row. New TO VERIFY ids **v94–v99**.
2. **Bob's eyes** — `faceSVG(cx, cy, k, lid)`: one group per eye (sclera, iris, pupil, glints) clipped by `#eyeClip` (objectBoundingBox, in `#svgDefs`), lid in the box colour drops over the whole eye (`lidblink`). Symmetric brows per mood (`BROWS`), discreet cheeks. Same face in intro, scenes, narration avatar, summary (new). Intro Bob = realistic 20' (22G1) in 3/4 view: corrugation, roof, door end with locking bars, CSC plate, castings, wear, shadows; cartoon arms/feet removed.
3. **Essentials nudge** — after 5 s the closed ★ items of the scene shake (0.6 s) and the counter pulses, then every 6 s (max 5); paused while a sheet/doc/question/transfer is open; reduced motion = halo + "!" badge. The locked "Next" uses `aria-disabled` (still clickable): click = immediate nudge + "Open the ★ items first (n/t)" (`ui.gateNudge`).
4. **Rail / barge** — `inland()` rewritten: train and barge run terminal to terminal (inland rail / river terminal with a gantry), the box is one object moved by nested `chain()` moves, last mile by truck (step 10), first mile by truck to a river/rail terminal (step 3). Narrations updated (steps 3 and 10, `travel` ms 5000 / `deliver` ms 2800).

**New JSON keys (for the mobile port — no key or id removed or renamed):** `ui.gateNudge`, `ui.riverTerminal`, `ui.railTerminal`, `ui.inlandRail`, `ui.inlandRiver`, `ui.firstMile`, `ui.lastMile`; `footprint.lines`, `footprint.calc`, `footprint.ui`, `footprint.zero`, `footprint.labels.{empty,stuff,first,termO,hub,termD,plug,last,unstuff}`, `footprint.factors.{terminal,stuffing,stuffingCold}` and `short` on every factor; `footprint.routes[*].{depotKm,firstKm,preKmBy,onKmBy,lastKm,plug}` and `sea[].split`; verification v94–v99. Changed values: step03 `travel.ms`, step10 `deliver.ms`, narrations of step03/step10 `travel`.

**Tests (Block A):** script over 3 routes × 4 families (20DV, 40RF, 40FR, 20TK): CO₂ rises at steps 1, 2, 3, 6, 7, 8, 10, 11, and at 5 and 9 for reefers only; flat at 4 (and 5, 9 for non-reefers, by design); final total = panel total = sum of step subtotals; 0 console errors. Nudge checked with and without reduced motion.

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
5. `CONFIG.resultsEndpoint` set (Google Sheet web app, 20 Nov 2026); agree the GDPR retention rule.
6. Cross-browser check on Firefox and Safari (v0.5 was tested headless in Chrome only: Firefox/WebKit could not be downloaded in the build environment).

## Testing
Headless Playwright scripts (not in repo) drove 10+ full journeys across all levels, containers and routes with no errors. Re-create a similar smoke test before big changes.
v0.5 (Chrome headless): full 11-step journeys + quiz at 1280×800 (L1 reefer GYE→ANR FOB; L2 reefer CIF; L3 flat rack SHA→LEH DAP) and 640×360 (L2 20' HCM→SIN→LEH CPT). Each scene checked for duplicate ids, broken `url(#…)` and references into hidden elements: none. Transfer moments fired at the right steps (FOB 6; CIF 6+8; CPT 5+8), Esc / reduced motion OK, answer buttons equal height, results record written.
