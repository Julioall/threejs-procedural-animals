// Colour variation on top of the existing bird coat, feather cards, and materials.
// Species authoring helper only: it does not implement new rigging or movement.
import { crowCoat } from '../crow/coat.js';
import { MAT, srgb, mix3 } from '../../core/build/coatKit.js';
import { HEAD_O } from '../crow/rig.js';

const clamp = (v) => Math.max(0, Math.min(1, v));
const rgb = (h) => srgb(h);

export function europeanBirdCoat(ctx, palette, style = 'plain') {
  // Reuse all original feather direction, tarsal scales, eye margins and grooming fields.
  const out = crowCoat({ ...ctx, params: { ...ctx.params, morph: 'american' } });
  const { nV, params, pos, nrm, rig, weights, regionOf, regionNames } = ctx;
  const body = rgb(palette.body), breast = rgb(palette.breast ?? palette.body);
  const head = rgb(palette.head ?? palette.body), wings = rgb(palette.wing ?? palette.body);
  const tail = rgb(palette.tail ?? palette.wing ?? palette.body);
  const throat = rgb(palette.throat ?? palette.breast ?? palette.body);
  const bill = rgb(palette.bill ?? 0x3d332b), legs = rgb(palette.legs ?? 0x6a574a);
  const seed = (params.coatSeed || 1) % 37;
  for (let v = 0; v < nV; v++) {
    const o = v * 4, b = rig.BONES[weights.dominant[v]]?.name || '';
    const r = regionNames[regionOf[v]] || '';
    const x = pos[v * 3], y = pos[v * 3 + 1], z = pos[v * 3 + 2];
    const mat = out.tint[o + 3], nY = nrm[v * 3 + 1];
    if (mat === MAT.FEATHER || mat === MAT.FUR) {
      let c;
      const isHead = b === 'head' || r === 'head';
      const isWing = /^(humerus|ulna|hand)/.test(b);
      const isTail = b === 'tail';
      if (isHead) c = head;
      else if (isWing) c = wings;
      else if (isTail) c = tail;
      else c = mix3(breast, body, clamp(0.35 + nY * 0.7));

      if (style === 'robin' && z > 0.052 && y > 0.15 && y < 0.323 &&
          Math.abs(x) < (isHead ? 0.019 : 0.035)) c = throat;
      if (style === 'sparrow' && isHead && y > HEAD_O[1] + 0.005) c = throat;
      if (style === 'sparrow' && z > 0.048 && y < 0.29 && y > 0.19) c = breast;
      if (style === 'pigeon' && y > 0.215 && y < 0.291) c = mix3(head, throat, 0.78);
      if (style === 'gull' && isWing && nY > 0.1) c = wings;
      if (style === 'gull' && !isWing && !isTail && nY < 0.2) c = breast;
      if (style === 'owl' && isHead && z > HEAD_O[2] + 0.006 && Math.abs(x) < 0.029)
        c = mix3(throat, head, clamp(Math.abs(x) / 0.030));
      if (style === 'heron' && (b.startsWith('neck') || isHead)) c = throat;
      const speckle = 1 + 0.07 * Math.sin(x * 125 + z * 117 + seed * 5 + y * 39);
      if (style === 'owl' || style === 'sparrow')
        c = [c[0] * speckle, c[1] * speckle, c[2] * speckle];
      out.tint[o] = c[0]; out.tint[o + 1] = c[1]; out.tint[o + 2] = c[2];
      out.surf[o + 3] = style === 'pigeon' && y > 0.2 ? 0.5 : 0.04;
    } else if (mat === MAT.KERATIN && (b === 'head' || b === 'jaw' || r === 'jaw')) {
      out.tint[o] = bill[0]; out.tint[o + 1] = bill[1]; out.tint[o + 2] = bill[2];
    } else if (mat === MAT.SCALES) {
      out.tint[o] = legs[0]; out.tint[o + 1] = legs[1]; out.tint[o + 2] = legs[2];
    }
  }
  return out;
}

export function europeanBirdFeathers(palette) {
  const top = rgb(palette.wing ?? palette.body);
  const underside = rgb(palette.breast ?? palette.body);
  const tail = rgb(palette.tail ?? palette.wing ?? palette.body);
  return (kind, i, side, t, c, layer) => {
    const upper = layer > 0;
    const base = kind.startsWith('tail') ? tail : upper ? top : underside;
    const v = 1 + 0.035 * Math.sin(i * 2.73 + side * 0.7 + t * 4);
    return { rgb: [base[0] * v, base[1] * v, base[2] * v], gloss: upper ? 0.42 : 0.18, irid: 0.03 };
  };
}
