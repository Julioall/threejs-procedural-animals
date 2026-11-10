// European robin (Erithacus rubecula); uses an existing procedural bird plan.
import blackbird, { EYE_LOOK } from '../blackbird/index.js';
import { robinRig, HEAD_O } from './rig.js';
import { robinRegions } from './regions.js';
import { sculptRobin, EYE } from './sculpt.js';
import { robinCoat, robinFeathers } from './coat.js';
import { motion, WING, FEATHERS } from './motion.js';
import { featherCards } from '../../core/build/featherCards.js';
export default {
  id: 'robin', name: 'European robin', latin: 'Erithacus rubecula',
  group: 'birds', plan: 'bird', covering: 'feathers',
  variants: [{ id: 'adult', name: 'adult', latin: 'Erithacus rubecula' }, { id: 'juvenile', name: 'juvenile', latin: 'Erithacus rubecula' }],
  variation(R, o) {
    const variant = ["adult","juvenile"].includes(o.variant) ? o.variant : 'adult';
    const p = blackbird.variation(R, { ...o, variant: 'male' });
    p.variant = variant;
    p.coatSeed = Math.floor(R() * 1e6);
    p.size *= 0.58;
    p.warps = [
      ...p.warps,
      { type: 'legs', k: 1, top: 0.12 },
      { type: 'scaleAbout', c: HEAD_O, k: 1, r0: 0.028, r1: 0.065 },
    ];
    return p;
  },
  rig: () => robinRig(),
  sculpt: sculptRobin,
  regions: robinRegions,
  coat: robinCoat,
  surfaces: ctx => featherCards({ ...ctx, wing: WING, feathers: FEATHERS, tail: { bindFan: 0.2 }, colour: robinFeathers(ctx.params) }),
  eyeSpecs: params => [1, -1].map(side => ({ side, spec: EYE, headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK })),
  motion,
  render: blackbird.render,
};
