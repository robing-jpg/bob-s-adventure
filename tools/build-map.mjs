// Build-time only (retour 5): generates src/content/world.json for the step-7 map.
//   cd tools && npm install && node build-map.mjs
// Coastlines: Natural Earth 1:50m land (public domain), via the world-atlas package. Projection: Natural Earth (d3 geoNaturalEarth1).
// The SVG path is projected, clipped to the region of our three routes, simplified and written ONCE into the content,
// so the game stays a single offline file. The script also checks that no sea lane crosses land and prints the
// distance shares used by footprint.routes[].sea[].split (CO₂ per map beat).
import { readFileSync, writeFileSync } from 'node:fs';
import { geoNaturalEarth1, geoPath, geoGraticule, geoContains, geoInterpolate, geoDistance } from 'd3-geo';
import { feature } from 'topojson-client';
import { presimplify, simplify, quantile } from 'topojson-simplify';

const ROOT = new URL('../src/content/', import.meta.url);
const G = JSON.parse(readFileSync(new URL('global.json', ROOT), 'utf8'));
const topo = JSON.parse(readFileSync(new URL('./node_modules/world-atlas/land-50m.json', import.meta.url), 'utf8'));

const SCALE = 420, TX = 760, TY = 380;            // projected user units (the engine zooms per route)
const proj = geoNaturalEarth1().scale(SCALE).translate([TX, TY]).precision(0.2);
// region of the three routes (+ wide margin, so no clipped edge shows on screen): lon −125 … 180, lat −60 … 77
const [x0, y0] = proj([-125, 77]), [x1, y1] = proj([180, -60]);
proj.clipExtent([[Math.min(x0, x1), Math.min(y0, y1)], [Math.max(x0, x1), Math.max(y0, y1)]]);

const fullLand = feature(topo, topo.objects.land);
const pre = presimplify(topo);
const land = feature(simplify(pre, quantile(pre, 0.3)), topo.objects.land);
const round = d => d.replace(/-?\d+\.\d+/g, n => String(Math.round(+n * 2) / 2));
const path = geoPath(proj);
const landD = round(path(land));
const grat = path(geoGraticule().step([15, 15]).extentMajor([[-125, -60], [180, 77]]).precision(5)()).replace(/-?\d+\.\d+/g, n => String(Math.round(+n)));

// ---------- sea lanes: resolve, check against land, measure ----------
const P = G.mapPlaces;
const ll = w => (typeof w === 'string' ? [P[w].lon, P[w].lat] : [w[1], w[0]]);
let problems = 0;
function check(name, list, inland) {      // inland = indices of canal / river segments (drawn as waterways)
  const pts = list.map(ll);
  const nseg = pts.length - 1;
  for (let i = 0; i < nseg; i++) {
    if ((inland || []).includes(i)) continue;
    const f = geoInterpolate(pts[i], pts[i + 1]), n = Math.max(8, Math.ceil(geoDistance(pts[i], pts[i + 1]) * 6371 / 10));
    for (let k = 1; k < n; k++) {
      const q = f(k / n);
      if (geoContains(fullLand, q)) { problems++; console.log(`  LAND ${name} segment ${i} (${list[i]} → ${list[i + 1]}) at lat ${q[1].toFixed(2)} lon ${q[0].toFixed(2)}`); break; }
    }
  }
  return pts;
}
const km = (a, b) => geoDistance(a, b) * 6371;
const out = { source: 'Natural Earth 1:50m land (public domain), via world-atlas; projection Natural Earth (geoNaturalEarth1)', scale: SCALE, translate: [TX, TY], land: landD, graticule: grat };
for (const r of G.routes) {
  const g = r.map.geo; if (!g) continue;
  const pts = check(r.id + ' main', g.path, g.inland);
  if (g.feeder) { const f = check(r.id + ' feeder', g.feeder, g.feederInland); let L = 0; for (let i = 1; i < f.length; i++) L += km(f[i - 1], f[i]); console.log(`${r.id} feeder ${Math.round(L)} km`); }
  if (g.alt) check(r.id + ' alt', g.alt, []);
  // distance shares between the beat anchors (for footprint sea[].split)
  const idx = a => (typeof a === 'string' ? g.path.indexOf(a) : g.path.findIndex(w => Array.isArray(w) && w[0] === a[0] && w[1] === a[1]));
  const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + km(pts[i - 1], pts[i]));
  const T = cum[cum.length - 1], marks = Object.entries(g.at).map(([b, a]) => [b, cum[idx(a)]]);
  console.log(`${r.id} main ${Math.round(T)} km · ` + marks.map(([b, c], i) => `${b} ${(c / T).toFixed(3)}${i ? ' (+' + ((c - marks[i - 1][1]) / T).toFixed(3) + ')' : ''}`).join(' · '));
}
writeFileSync(new URL('world.json', ROOT), JSON.stringify(out));
console.log(`world.json: land ${(landD.length / 1024).toFixed(0)} KB, graticule ${(grat.length / 1024).toFixed(0)} KB · lane problems: ${problems}`);
