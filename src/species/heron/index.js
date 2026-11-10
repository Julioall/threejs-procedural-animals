// Grey heron (Ardea cinerea); uses an existing procedural bird plan.
import crow, { EYE_LOOK } from '../crow/index.js';
import { heronRig, HEAD_O } from './rig.js';
import { heronRegions } from './regions.js';
import { sculptHeron, EYE } from './sculpt.js';
import { heronCoat, heronFeathers } from './coat.js';
import { motion, WING, FEATHERS } from './motion.js';
import { featherCards } from '../../core/build/featherCards.js';
export default {
  id: 'heron', name: 'Grey heron', latin: 'Ardea cinerea',
  group: 'birds', plan: 'bird', covering: 'feathers',
  variants: [{ id: 'grey', name: 'grey', latin: 'Ardea cinerea' }],
  variation(R, o) {
    const variant = ["grey"].includes(o.variant) ? o.variant : 'grey';
    const p = crow.variation(R, { ...o, variant: 'american' });
    p.variant = variant;
    p.coatSeed = Math.floor(R() * 1e6);
    p.size *= 1.85;
    p.warps = [
      ...p.warps,
      { type: 'legs', k: 1.7, top: 0.11 },
      { type: 'scaleAbout', c: HEAD_O, k: 1, r0: 0.028, r1: 0.065 },
    ];
    return p;
  },
  rig: () => heronRig(),
  sculpt: sculptHeron,
  regions: heronRegions,
  coat: heronCoat,
  surfaces: ctx => featherCards({ ...ctx, wing: WING, feathers: FEATHERS, tail: { bindFan: 0.2 }, colour: heronFeathers(ctx.params) }),
  eyeSpecs: params => [1, -1].map(side => ({ side, spec: EYE, headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK })),
  motion,
  render: crow.render,
};
