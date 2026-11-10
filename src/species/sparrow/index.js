// House sparrow (Passer domesticus); uses an existing procedural bird plan.
import blackbird, { EYE_LOOK } from '../blackbird/index.js';
import { sparrowRig, HEAD_O } from './rig.js';
import { sparrowRegions } from './regions.js';
import { sculptSparrow, EYE } from './sculpt.js';
import { sparrowCoat, sparrowFeathers } from './coat.js';
import { motion, WING, FEATHERS } from './motion.js';
import { featherCards } from '../../core/build/featherCards.js';
export default {
  id: 'sparrow', name: 'House sparrow', latin: 'Passer domesticus',
  group: 'birds', plan: 'bird', covering: 'feathers',
  variants: [{ id: 'male', name: 'male', latin: 'Passer domesticus' }, { id: 'female', name: 'female', latin: 'Passer domesticus' }],
  variation(R, o) {
    const variant = ["male","female"].includes(o.variant) ? o.variant : 'male';
    const p = blackbird.variation(R, { ...o, variant: 'male' });
    p.variant = variant;
    p.coatSeed = Math.floor(R() * 1e6);
    p.size *= 0.61;
    p.warps = [
      ...p.warps,
      { type: 'legs', k: 1, top: 0.12 },
      { type: 'scaleAbout', c: HEAD_O, k: 1, r0: 0.028, r1: 0.065 },
    ];
    return p;
  },
  rig: () => sparrowRig(),
  sculpt: sculptSparrow,
  regions: sparrowRegions,
  coat: sparrowCoat,
  surfaces: ctx => featherCards({ ...ctx, wing: WING, feathers: FEATHERS, tail: { bindFan: 0.2 }, colour: sparrowFeathers(ctx.params) }),
  eyeSpecs: params => [1, -1].map(side => ({ side, spec: EYE, headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK })),
  motion,
  render: blackbird.render,
};
