# Bob's Adventure — handoff for a new project / conversation

Read this file first. It replaces the long history of the first project ("AI" project, Oct–Nov 2026).

## State (24 Nov 2026, v1.0 final pass: one graphic charter — final delivery 26 Nov)
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

## Final pass — one graphic charter (brief: project doc `claude/09_prompt-v1.1-charte-graphique-finale.md`)
Reference look = **step 5 (terminal)**: flat shapes, clear fills, thin outlines, the CSS sky behind every scene, discreet flat shadows. No photo textures, grime, haze, reflections or multi-layer swell. Keep from the realism pass only: proportions, correct machine structure, simple shadows.

| Block | Content | Status |
|---|---|---|
| 0 | **Style kit** (`STYLE KIT` in `engine.html`, values in `CONFIG.style`) + step 6 | **done, pushed 24 Nov — waiting for the team's OK (2 screenshots)** |
| 1 | Steps 8 (done with 6, same `quay()`), 3, 10 | to do after OK |
| 2 | Steps 11, 1, 2 | to do |
| 3 | Steps 7 (map), 4, 9 (stations) | to do |
| 4 | Intro, menu, summary; v1.0 in CONFIG / README / HANDOFF; credits; 4 test journeys | to do |

### Block 0 — what changed
- `CONFIG.style`: `faceMin` (Bob's minimum face height, 19 scene units ≈ 25 px at 1280×800), one `line` width, `ink`, `shadow` opacity, **bright container palette** (`containers`, no orange so Bob stands out; replaces the dull `QPAL` and the old `PALETTE`), crane / water / hull / building / leaf colours.
- Style kit functions: `shade`, `kShadow`, `kCtr` (flat container), `kWater` (one water), `kTree`, `kBush`, `kBuilding`, `kSpreader` + `kRopes` (twistlocks in the corner castings, ropes clipped at the trolley sheaves), `kTrolley`, `kTractor`, `kSTS`, `kShip`. `ctr()` and `ctrQ()` now call `kCtr`.
- Box: flat wall (box colour + soft bottom shade, light ribs); grime / dirt patterns removed. **Face rule** in `boxSVG`: the face sits in a free zone on the right (never under the number, plate, reefer unit, tank frame or flat-rack cargo) and is scaled so that `o.scale × face scale × 72 ≥ faceMin`; if the zone is too small the markings are dropped on that box. Pass `scale` (the box's render scale) from every scene.
- Stacking rule: a pair of 20' never stands on a 40' (`stackRow(…, pairs)`, `kShip({pairs})`); a 20' Bob lands on 20' boxes (steps 5, 6, 8).
- **Steps 6 and 8** (`quay()`) redrawn with the kit at 10 px/m: STS (gauge 30.5 m, lift 39 m, outreach 68 m, clear space between the legs), ship (freeboard 8 m, 5–7 tiers, deckhouse), terminal tractor. Cycle: spreader waits at lifting height → comes down onto the box → lift → trolley and box travel together → lower → unlock → spreader goes back up. CSS sky (no own sky), no reflection, no haze. Hotspot coordinates unchanged.
- Test hook: `__cj.openJourney()` (console only).
- Tested: 11 steps × 7 container / route / level sets, 0 console errors; step 6 / 8 frame checks (40HC, 20DV, 40RF, 40FR) at 1280×800 and 1920×1080.

## v1.0 — progress (brief: project doc `claude/07_prompt-v1.0-design-and-fixes.md`)
| Block | Content | Status |
|---|---|---|
| A | Retours 1–4: CO₂ step by step, Bob's eyes, essentials nudge, rail/barge to inland terminals | **done** (24 Nov) |
| B | Retour 5: real world map (Natural Earth) at step 7 | **done** (24 Nov) |
| C | Retour 6: realism. Pilot = step 6 + intro sea, 2 screenshots, **wait for OK**; then 7, 1, 2, 3+10, 5, 8, 11, 4+9, menu + intro (one push per group) | **pilot pushed 24 Nov — waiting for the team's OK** before the other scenes |
| — | Final: v1.0 in CONFIG / README / HANDOFF; 4 test journeys (L1 reefer GYE→ANR · L2 20' HCM→SIN→LEH CIF rail · L3 flat rack SHA→LEH DAP · L2 tank SHA→LEH FCA), 0 console errors | to do |

### Block A — what changed (24 Nov)
1. **CO₂ by step** — `global.json → footprint.lines` lists every emission source (step, beat, calc type); the engine only does the arithmetic. New sources: empty truck depot → shipper (step 1), stuffing (2, GLEC hub 1.3 kg/t; 2.5 kg/t for reefer cargo), first mile by truck for barge/rail (3), maritime terminal 10.7 kg/container at origin (6), hub (7, transshipment) and destination (8), sea legs split over the map beats (`sea[].split`), last mile by truck (10), unstuffing (11), reefer plug-in per step (`routes[].plug`, days). Steps 4 and 9: "+0 kg — paperwork only" (`footprint.zero`), except reefer plug-in at 9. Step 5: GLEC gives one terminal value per container, not splittable → counted at step 6, explained in the panel (`zero["5"]`).
   The counter moves when the beat is played (`S.mGi[step]` = highest beat played), with a "+X kg CO₂e" chip; kg below 1,000 kg, then tonnes with 1 decimal. Panel: per step "+X this step / Y so far", one-line calculation per row. New TO VERIFY ids **v94–v99**.
2. **Bob's eyes** — `faceSVG(cx, cy, k, lid)`: one group per eye (sclera, iris, pupil, glints) clipped by `#eyeClip` (objectBoundingBox, in `#svgDefs`), lid in the box colour drops over the whole eye (`lidblink`). Symmetric brows per mood (`BROWS`), discreet cheeks. Same face in intro, scenes, narration avatar, summary (new). **Bob = exact v0.5 design, at the team's request (24 Nov)**: intro (rounded box, ribs, waving arm, feet, big white eyes, dark pupils, pink cheeks, open grin), narration avatar and scene faces all use the v0.5 look. Only fix kept: `eyeG()` — each eye clipped by `#eyeClip` with a lid in the box colour over the whole eye (no more black eye when blinking); puzzled = two symmetric brows. The realistic Bob and the redesigned face were rejected; do not bring them back.
3. **Essentials nudge** — after 5 s the closed ★ items of the scene shake (0.6 s) and the counter pulses, then every 6 s (max 5); paused while a sheet/doc/question/transfer is open; reduced motion = halo + "!" badge. The locked "Next" uses `aria-disabled` (still clickable): click = immediate nudge + "Open the ★ items first (n/t)" (`ui.gateNudge`).
4. **Rail / barge** — `inland()` rewritten: train and barge run terminal to terminal (inland rail / river terminal with a gantry), the box is one object moved by nested `chain()` moves, last mile by truck (step 10), first mile by truck to a river/rail terminal (step 3). Narrations updated (steps 3 and 10, `travel` ms 5000 / `deliver` ms 2800).

**New JSON keys (for the mobile port — no key or id removed or renamed):** `ui.gateNudge`, `ui.riverTerminal`, `ui.railTerminal`, `ui.inlandRail`, `ui.inlandRiver`, `ui.firstMile`, `ui.lastMile`; `footprint.lines`, `footprint.calc`, `footprint.ui`, `footprint.zero`, `footprint.labels.{empty,stuff,first,termO,hub,termD,plug,last,unstuff}`, `footprint.factors.{terminal,stuffing,stuffingCold}` and `short` on every factor; `footprint.routes[*].{depotKm,firstKm,preKmBy,onKmBy,lastKm,plug}` and `sea[].split`; verification v94–v99. Changed values: step03 `travel.ms`, step10 `deliver.ms`, narrations of step03/step10 `travel`.

**Tests (Block A):** script over 3 routes × 4 families (20DV, 40RF, 40FR, 20TK): CO₂ rises at steps 1, 2, 3, 6, 7, 8, 10, 11, and at 5 and 9 for reefers only; flat at 4 (and 5, 9 for non-reefers, by design); final total = panel total = sum of step subtotals; 0 console errors. Nudge checked with and without reduced motion.

### Block B — what changed (24 Nov)
- Step 7 map redrawn from **Natural Earth 1:50m** coastlines (public domain). `tools/build-map.mjs` (npm: world-atlas, topojson, d3-geo — build time only) projects them (Natural Earth projection, scale 420), clips to lon −125…180 / lat −60…77, simplifies to ≈ 144 KB and writes `src/content/world.json`; `build.py` injects it as `content.world`. The engine projects the lat/lon waypoints with the same formula (`neProject`) and fits the frame to each route.
- `global.json`: `mapPlaces` (14 ports / passages with lat/lon and label side), `mapSeas` (sea names), `routes[].map.geo` (`path`, `feeder`, `alt` = Cape alternative, `at` = beat anchors, `inland` / `feederInland` = canal or river segments, `ports`, `altLabelAt`). The old schematic `map.path/at/ports/alt` and `mapLand` are kept (unused on desktop) for the mobile version. New TO VERIFY **v100** (coordinates are teaching approximations).
- Lanes checked against the 1:50m land at build time: 0 crossings (Suez, Panama, Saigon River and Scheldt drawn as waterways). Lane lengths: SHA→LEH 19,170 km, Cat Lai→SIN 1,220 km, SIN→LEH 15,179 km, Posorja→ANR 10,433 km — consistent with v88. CO₂ `sea[].split` shares now come from these lengths.
- Ocean: depth gradient + coastal shelf shading, discreet 15° graticule, sea names with collision check. Top-down ship follows the lane with its heading (`data-heading` in `paint()`), bow wave and wake while moving.

### Block C — team review of 24 Nov (afternoon), done
Quay scenes (6, 8) and the intro sea were approved ("la rue revue et le bateau sont très bien"). Fixed in the same pass:
1. **Steps 3 and 10 redrawn** (`inland()`), scale `S2` = 5.1 px/m: skeletal 40' chassis + cab-over tractor, electric loco (21 m) with pantograph under a catenary, 60' flat wagons, 55 m inland barge with wheelhouse, gantry at the inland terminal, STS crane seen from the land side, fields, hills in aerial perspective, real sky (`realSky`), river with ripples.
2. **Step 10:** the train now starts at the quay, under the ship-to-shore crane and the ship, runs to the inland rail terminal, then the gantry puts the box on a truck for the last mile. Same logic for the barge.
3. **Step 3: rail removed** (team decision): none of the three origin terminals has an on-dock rail link (Yangshan = road bridge, Cat Lai and Posorja = no rail). `routes[].modes` = truck / barge only; `choices.mode.unavailable` and **v39** rewritten to explain it. The tracks are gone from the scene.
4. **Step 2 cartons:** `cartonSize()` / `cartonSlots()` now derive the carton size from the box, so the stack never sticks out (it did after the ISO resize); same cartons in the warehouse stock.
5. **Open box:** the cutaway shows a lit plywood interior (`#gInside`, floor, ceiling, side posts) instead of a black hole; the number, the plate and **the face** moved inside the wall group, so they disappear with the doors. Step 11 keeps a face on the interior (`faceOpenAttr`, plywood-coloured lid) — **Bob is no longer on a black background**.
6. **Step 11 depot redrawn:** real empty stacks 4 high (`ctr` at `DTH` = 40), reach stacker, M&R / wash bay building, concrete apron with markings, real sky.
7. **Box markings relaid out** (team feedback, 24 Nov): with the ISO heights the old fixed plate (44 px at `h − 54`) and the centred number no longer fitted, and on a **20'** they ran into Bob's face. Now everything is derived from `w` / `h`: owner number top-left, consolidated marking plate bottom-left (`pw` ≤ 46 % of the width, font fitted to the plate), and a reserved **face zone** on the right (`fx` is pushed clear of the plate). Flat rack: the cargo is lashed on the left half and the face sits on the clear stretch of deck, above the beam (it used to sit across the cargo and the deck); the number moved onto the deck edge. Tank: the number moved to the bottom-left. Checked on the 7 types.
Tested: 5 full journeys (40HC SHA rail · 40RF GYE barge · 20DV HCM barge · 40FR L3 · 20TK) with 0 console errors, plus the CO₂ script (3 routes × 4 families).

### Block C — pilot (24 Nov, approved)
- **Realism kit** in `engine.html` (before `quay()`): `QM` = 6.94 px/m quay scale, `realSky()` (gradient, sun top-left, cumulus with lit tops / shaded bases, horizon haze), `harbourWater()` + `harbourRipples()` (calm water, depth gradient, slow ripple highlights — no "~"), `ctrQ()` (container at quay scale), `tractorQ()`, `stsQ()` (STS crane: gauge 30.5 m, outreach 68 m, backreach 22 m, girder ≈ 50 m), `shipQ()` (freeboard 16 m, 9 tiers, lashing bridges and rods, twistlocks, funnel casing, draught marks), `cloudSVG()`. New gradients/patterns/mask in `#svgDefs` (gSkyR, gSunGlow, gCloud, gCloudShade, gHaze, gHarbour, gHarbourNear, gOpenSea, gWaveShade, corrS, gTopLit, gCraneR, gGirder, gHullR, gQuay, gReflFade, mRefl).
- Steps 6 and 8 (`quay()`): rebuilt at real scale, same beats and moves; ship reflection in the water, mooring lines, fenders, bollards, lane markings, lighting mast, far shore in aerial perspective; scene content raised 38 px so the quay stays above the narration bubble. `svgOpen(s, 'data-sky="own"')` hides the CSS sun/clouds (`.scene.own-sky`).
- Intro: `introBg()` = open sea with 5 swell layers (trochoid crests, lit/shaded slopes, foam), sun glitter, laden ship with bow wave and wake, port in the haze. `bobSVG()`: v0.5 design kept (see Block A §2), on the new sea background.
- **Global proportion change:** `boxDims` now 470 × 100 (8'6") / 112 (9'6"), 20' = 234 wide; step-5 tier `TH` = 40. Other scenes still render correctly (checked 1, 2, 5, 11) but keep their v0.5 style until their group is done.
- Perf (headless, software rendering): intro ≈ 51 fps, step 6 during a lift ≈ 44 fps at 1920×1080.
- **Next after OK:** 7 (open sea: swell, bow wave, wake on the map ship) → 1 → 2 → 3+10 (inland: realistic trucks, wagons, barge at the same scale) → 5 → 8 → 11 → 4+9 → menu + intro UI (design system via CONFIG), then "Illustrations generated with AI" in the credits, v1.0 in CONFIG / README / HANDOFF, the 4 final test journeys.

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
