// Brown dense guard hair and the dark, almost bare keratinous tail paddle.
import { ratCoat } from '../rat/coat.js';
import { MAT, srgb, mix3 } from '../../core/build/coatKit.js';
export function beaverCoat(ctx) {
  const out = ratCoat(ctx);
  const { params, nV, rig, weights, nrm, pos } = ctx;
  const back = srgb(params.morph === 'dark' ? 0x38281f : 0x725037);
  const under = srgb(params.morph === 'dark' ? 0x4b3a2e : 0x987758);
  const paddle = srgb(0x302723);
  for (let i = 0; i < nV; i++) {
    const o = i * 4, bone = rig.BONES[weights.dominant[i]]?.name || '';
    const mat = out.tint[o + 3];
    if (bone.startsWith('tail')) {
      out.tint[o] = paddle[0]; out.tint[o + 1] = paddle[1]; out.tint[o + 2] = paddle[2];
      out.tint[o + 3] = MAT.SCALES;
      out.furLen[i] = 0;
      out.surf[o] = 0.42;
      out.surf[o + 1] = 0.006; // relief scale size
      out.pattern[i] = 1; out.patternColor[o + 3] = 0;
      continue;
    }
    if (mat !== MAT.FUR) continue;
    const tint = mix3(under, back, Math.max(0, Math.min(1, 0.55 + 0.6 * nrm[i * 3 + 1])));
    out.tint[o] = tint[0]; out.tint[o + 1] = tint[1]; out.tint[o + 2] = tint[2];
    out.furLen[i] = Math.max(0.004, out.furLen[i]) * 1.5;
  }
  return out;
}
