// European moose seasonal pelage on existing deer groom and material fields.
import { deerCoat } from '../deer/coat.js';
import { MAT, srgb, mix3 } from '../../core/build/coatKit.js';
export function mooseCoat(ctx) {
  const out = deerCoat(ctx);
  const dark = srgb(4863787), pale = srgb(6771010), face = srgb(4929326);
  for (let i = 0; i < ctx.nV; i++) {
    const o = i * 4;
    if (out.tint[o + 3] !== MAT.FUR) continue;
    const bone = ctx.rig.BONES[ctx.weights.dominant[i]]?.name || '';
    const y = ctx.pos[i*3+1], nY = ctx.nrm[i*3+1];
    let col = bone === 'head' ? face : mix3(pale,dark,Math.max(0,Math.min(1,0.45+nY*0.75)));
    if (ctx.params.variant === 'winter') col = mix3(col,pale,0.17);
    out.tint[o]=col[0]; out.tint[o+1]=col[1]; out.tint[o+2]=col[2];
    if (bone.startsWith('neck') || bone === 'chest')
      out.furLen[i] = Math.max(out.furLen[i], 0.032);
  }
  return out;
}
