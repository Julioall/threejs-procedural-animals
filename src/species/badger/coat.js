// European badger: silver-grey mantle, dark underside and white face with two dark eye bands.
import { bearCoat } from '../bear/coat.js';
import { HEAD_O } from '../bear/rig.js';
import { MAT, srgb, mix3 } from '../../core/build/coatKit.js';
const mantle = srgb(0x9a978b), under = srgb(0x262320);
const faceWhite = srgb(0xe0d8c8), faceBlack = srgb(0x211e1c);
export function badgerCoat(ctx) {
  const out = bearCoat(ctx);
  const { nV, pos, nrm, rig, weights } = ctx;
  for (let i = 0; i < nV; i++) {
    const o = i * 4;
    if (out.tint[o + 3] !== MAT.FUR) continue;
    const bone = rig.BONES[weights.dominant[i]]?.name || '';
    const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
    let col;
    if (bone === 'head' || bone === 'jaw' || (z > HEAD_O[2] - 0.025 && y > HEAD_O[1] - 0.11)) {
      const sideBand = Math.abs(Math.abs(x) - 0.055) < 0.034 && z > HEAD_O[2] - 0.03;
      col = sideBand ? faceBlack : faceWhite;
      out.furLen[i] = Math.min(out.furLen[i], 0.014);
    } else {
      col = mix3(under, mantle, Math.max(0, Math.min(1, (nrm[i * 3 + 1] + 0.35) * 1.1)));
      out.furLen[i] = Math.min(out.furLen[i], 0.025);
    }
    out.tint[o] = col[0]; out.tint[o + 1] = col[1]; out.tint[o + 2] = col[2];
  }
  return out;
}
