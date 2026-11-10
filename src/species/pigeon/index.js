// Rock pigeon (Columba livia); uses an existing procedural bird plan.
import crow, { EYE_LOOK } from '../crow/index.js';
import { pigeonRig, HEAD_O } from './rig.js';
import { pigeonRegions } from './regions.js';
import { sculptPigeon, EYE } from './sculpt.js';
import { pigeonCoat, pigeonFeathers } from './coat.js';
import { motion, WING, FEATHERS } from './motion.js';
import { featherCards } from '../../core/build/featherCards.js';
export default {
  id: 'pigeon', name: 'Rock pigeon', latin: 'Columba livia',
  group: 'birds', plan: 'bird', covering: 'feathers',
  variants: [{ id: 'blue', name: 'blue', latin: 'Columba livia' }, { id: 'dark', name: 'dark', latin: 'Columba livia' }],
  variation(R, o) {
    const variant = ["blue","dark"].includes(o.variant) ? o.variant : 'blue';
    const p = crow.variation(R, { ...o, variant: 'american' });
    p.variant = variant;
    p.coatSeed = Math.floor(R() * 1e6);
    p.size *= 0.84;
    p.warps = [
      ...p.warps,
      { type: 'legs', k: 1, top: 0.12 },
      { type: 'scaleAbout', c: HEAD_O, k: 1, r0: 0.028, r1: 0.065 },
    ];
    return p;
  },
  rig: () => pigeonRig(),
  sculpt: sculptPigeon,
  regions: pigeonRegions,
  coat: pigeonCoat,
  surfaces: ctx => featherCards({ ...ctx, wing: WING, feathers: FEATHERS, tail: { bindFan: 0.2 }, colour: pigeonFeathers(ctx.params) }),
  eyeSpecs: params => [1, -1].map(side => ({ side, spec: EYE, headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK })),
  motion,
  render: crow.render,
};
