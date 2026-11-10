// Dark reddish-brown coat, shaggy forequarters and comparatively short hindquarters.
import { cowCoat } from '../cow/coat.js';
import { MAT, srgb, mix3 } from '../../core/build/coatKit.js';
const mane = srgb(0x3a2419), body = srgb(0x60402d), rump = srgb(0x7d5940);
export function bisonCoat(ctx) {
  const out = cowCoat({ ...ctx, params: { ...ctx.params, variant: 'highland', coat: 'highlandblack' } });
  const { nV, pos, weights, rig } = ctx;
  for (let i = 0; i < nV; i++) {
    const o = i * 4;
    if (out.tint[o + 3] !== MAT.FUR) continue;
    const bone = rig.BONES[weights.dominant[i]]?.name || '';
    const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
    const front = Math.max(0, Math.min(1, (z + 0.16) / 0.70));
    const col = mix3(mix3(rump, body, 0.6), mane, front);
    out.tint[o] = col[0]; out.tint[o + 1] = col[1]; out.tint[o + 2] = col[2];
    out.pattern[i] = 1; out.patternColor[o + 3] = 0;
    if (bone.startsWith('tail') || bone.includes('hoof')) continue;
    const fore = front * Math.max(0.5, Math.min(1, (y - 0.4)));
    out.furLen[i] = Math.max(0.012, fore > 0.4 ? 0.06 : 0.022);
  }
  return out;
}
