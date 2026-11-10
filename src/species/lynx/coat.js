// A lynx's spotted sandy coat, short dark tail tip and dark ear tufts.
// Reuses the established cat groom, eye/lip markings and fur/material channels.
import { catCoat, PS } from '../cat/coat.js';
import { MAT, srgb, mix3 } from '../../core/build/coatKit.js';

const dark = srgb(0x392820);
const earTip = srgb(0x201b19);
const tailTip = srgb(0x211b18);
const base = srgb(0xb69a73);
const iberianBase = srgb(0xc09a65);

function hash(a, b, c) {
  const x = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453;
  return x - Math.floor(x);
}

function spotDistance(y, z, side, seed, density) {
  const cell = density;
  const yi = Math.floor(y / cell), zi = Math.floor(z / cell);
  let d = 1;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
    const cy = yi + j, cz = zi + i;
    const jitterY = (hash(cy, cz, seed + side * 17) - 0.5) * 0.5;
    const jitterZ = (hash(cy, cz, seed + side * 29) - 0.5) * 0.5;
    const r = cell * (0.13 + 0.1 * hash(cy, cz, seed + 91));
    const dy = y - (cy + 0.5 + jitterY) * cell;
    const dz = z - (cz + 0.5 + jitterZ) * cell;
    d = Math.min(d, Math.hypot(dy, dz) - r);
  }
  return d;
}

export function lynxCoat(ctx) {
  const out = catCoat(ctx);
  const { pos, weights, rig, nV, params, regionNames, regionOf } = ctx;
  const seed = (params.coatSeed || 1) % 997;
  const iberian = params.lynxMorph === 'iberian';
  const ground = iberian ? iberianBase : base;
  for (let v = 0; v < nV; v++) {
    const at = 4 * v;
    if (out.tint[at + 3] !== MAT.FUR) continue;
    const bone = rig.BONES[weights.dominant[v]]?.name || '';
    const region = regionNames[regionOf[v]];
    const x = pos[3 * v], y = pos[3 * v + 1], z = pos[3 * v + 2];
    const existing = [out.tint[at], out.tint[at + 1], out.tint[at + 2]];
    const fur = mix3(existing, ground, 0.47);
    out.tint[at] = fur[0]; out.tint[at + 1] = fur[1]; out.tint[at + 2] = fur[2];

    if (/^ear/.test(bone)) {
      const s = bone.endsWith('L') ? 'L' : 'R';
      const tip = rig.J['earTip' + s];
      if (y >= tip[1] - 0.006) {
        out.tint[at] = earTip[0]; out.tint[at + 1] = earTip[1]; out.tint[at + 2] = earTip[2];
        out.furLen[v] = Math.max(out.furLen[v], 0.012);
        out.pattern[v] = 1;
      }
      continue;
    }

    if (/^tail/.test(bone)) {
      const segment = Number(bone.slice(4));
      if (segment >= 6) {
        out.tint[at] = tailTip[0]; out.tint[at + 1] = tailTip[1]; out.tint[at + 2] = tailTip[2];
        out.pattern[v] = 1;
      }
      continue;
    }

    // Retain the original cat's small facial markings, changing only the torso/leg
    // tabby bars into independently-seeded spots.
    if (region === 'head' || region === 'jaw' || bone === 'head') continue;
    const side = x < 0 ? -1 : 1;
    const dist = spotDistance(y, z, side, seed, iberian ? 0.018 : 0.026);
    out.pattern[v] = dist * PS;
    out.patternColor[at] = dark[0]; out.patternColor[at + 1] = dark[1];
    out.patternColor[at + 2] = dark[2]; out.patternColor[at + 3] = 0.9;
  }
  return out;
}
