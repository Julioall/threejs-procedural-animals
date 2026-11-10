// Tawny owl (Strix aluco); uses an existing procedural bird plan.
import crow, { EYE_LOOK } from '../crow/index.js';
import { owlRig, HEAD_O } from './rig.js';
import { owlRegions } from './regions.js';
import { sculptOwl, EYE } from './sculpt.js';
import { owlCoat, owlFeathers } from './coat.js';
import { motion, WING, FEATHERS } from './motion.js';
import { featherCards } from '../../core/build/featherCards.js';
export default {
  id: 'owl', name: 'Tawny owl', latin: 'Strix aluco',
  group: 'birds', plan: 'bird', covering: 'feathers',
  variants: [{ id: 'rufous', name: 'rufous', latin: 'Strix aluco' }, { id: 'grey', name: 'grey', latin: 'Strix aluco' }],
  variation(R, o) {
    const variant = ["rufous","grey"].includes(o.variant) ? o.variant : 'rufous';
    const p = crow.variation(R, { ...o, variant: 'american' });
    p.variant = variant;
    p.coatSeed = Math.floor(R() * 1e6);
    p.size *= 0.98;
    p.warps = [
      ...p.warps,
      { type: 'legs', k: 1, top: 0.12 },
      { type: 'scaleAbout', c: HEAD_O, k: 1.18, r0: 0.028, r1: 0.065 },
    ];
    return p;
  },
  rig: () => owlRig(),
  sculpt: sculptOwl,
  regions: owlRegions,
  coat: owlCoat,
  surfaces: ctx => featherCards({ ...ctx, wing: WING, feathers: FEATHERS, tail: { bindFan: 0.2 }, colour: owlFeathers(ctx.params) }),
  eyeSpecs: params => [1, -1].map(side => ({ side, spec: EYE, headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK })),
  motion,
  render: crow.render,
};
