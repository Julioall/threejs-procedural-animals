// Seeded red / dark / grey-brown coats, pale belly, fully furred high tail.
import { ratCoat } from '../rat/coat.js';
import { MAT, srgb, mix3 } from '../../core/build/coatKit.js';
const PALETTES = {
  red: { upper: 0xa55b31, lower: 0xe0c8a9, tail: 0x9e4825, crown: 0xaf6738 },
  dark: { upper: 0x4e362b, lower: 0xcbbea7, tail: 0x3d2922, crown: 0x5a3c2e },
  grey: { upper: 0x71685b, lower: 0xddd1ba, tail: 0x615a53, crown: 0x7e7464 },
};
export function squirrelCoat(ctx) {
  const out = ratCoat(ctx);
  const { params, rig, pos, nrm, weights, nV } = ctx;
  const P = PALETTES[params.morph] || PALETTES.red;
  const upper = srgb(P.upper), lower = srgb(P.lower), tail = srgb(P.tail), crown = srgb(P.crown);
  for (let i = 0; i < nV; i++) {
    const o = i * 4, bone = rig.BONES[weights.dominant[i]]?.name || '';
    const mat = out.tint[o + 3];
    if (mat !== MAT.FUR && !bone.startsWith('tail')) continue;
    const y = pos[i * 3 + 1], nY = nrm[i * 3 + 1];
    const t = bone.startsWith('tail') ? tail : bone === 'head' ? crown :
      mix3(lower, upper, Math.min(1, Math.max(0, 0.55 + 0.55 * nY)));
    out.tint[o] = t[0]; out.tint[o + 1] = t[1]; out.tint[o + 2] = t[2];
    if (bone.startsWith('tail')) {
      out.tint[o + 3] = MAT.FUR;
      out.furLen[i] = Math.max(out.furLen[i], 0.025 * (params.age === 'juvenile' ? 0.7 : 1));
      out.surf[o + 2] = 0.45;
      out.pattern[i] = 1; out.patternColor[o + 3] = 0;
    } else if (mat === MAT.FUR) out.furLen[i] = Math.max(out.furLen[i], y > 0.065 ? 0.006 : 0.003);
  }
  return out;
}
