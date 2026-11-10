// European herring gull (Larus argentatus); uses an existing procedural bird plan.
import crow, { EYE_LOOK } from '../crow/index.js';
import { gullRig, HEAD_O } from './rig.js';
import { gullRegions } from './regions.js';
import { sculptGull, EYE } from './sculpt.js';
import { gullCoat, gullFeathers } from './coat.js';
import { motion, WING, FEATHERS } from './motion.js';
import { featherCards } from '../../core/build/featherCards.js';
export default {
  id: 'gull', name: 'European herring gull', latin: 'Larus argentatus',
  group: 'birds', plan: 'bird', covering: 'feathers',
  variants: [{ id: 'adult', name: 'adult', latin: 'Larus argentatus' }, { id: 'juvenile', name: 'juvenile', latin: 'Larus argentatus' }],
  variation(R, o) {
    const variant = ["adult","juvenile"].includes(o.variant) ? o.variant : 'adult';
    const p = crow.variation(R, { ...o, variant: 'american' });
    p.variant = variant;
    p.coatSeed = Math.floor(R() * 1e6);
    p.size *= 1.34;
    p.warps = [
      ...p.warps,
      { type: 'legs', k: 1, top: 0.12 },
      { type: 'scaleAbout', c: HEAD_O, k: 1, r0: 0.028, r1: 0.065 },
    ];
    return p;
  },
  rig: () => gullRig(),
  sculpt: sculptGull,
  regions: gullRegions,
  coat: gullCoat,
  surfaces: ctx => featherCards({ ...ctx, wing: WING, feathers: FEATHERS, tail: { bindFan: 0.2 }, colour: gullFeathers(ctx.params) }),
  eyeSpecs: params => [1, -1].map(side => ({ side, spec: EYE, headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK })),
  motion,
  render: crow.render,
};
