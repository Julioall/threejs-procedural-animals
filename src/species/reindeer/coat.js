// Reindeer seasonal pelage on existing deer groom and material fields.
import { deerCoat } from '../deer/coat.js';
import { MAT, srgb, mix3 } from '../../core/build/coatKit.js';
export function reindeerCoat(ctx) {
  const out = deerCoat(ctx);
  const dark = srgb(7758413), pale = srgb(11838351), face = srgb(9074015);
  for (let i = 0; i < ctx.nV; i++) {
    const o = i * 4;
    if (out.tint[o + 3] !== MAT.FUR) continue;
    const bone = ctx.rig.BONES[ctx.weights.dominant[i]]?.name || '';
    const y = ctx.pos[i*3+1], nY = ctx.nrm[i*3+1];
    let col = bone === 'head' ? face : mix3(pale,dark,Math.max(0,Math.min(1,0.45+nY*0.75)));
    if (ctx.params.variant === 'winter') col = mix3(col,pale,0.17);
    out.tint[o]=col[0]; out.tint[o+1]=col[1]; out.tint[o+2]=col[2];
    if (bone.startsWith('neck') || bone === 'chest')
      out.furLen[i] = Math.max(out.furLen[i], 0.035);
  }
  return out;
}
