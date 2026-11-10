// Lynx: Eurasian lynx with an Iberian morph, extending the existing felid body plan.
// Distinct silhouette: longer legs, a shortened tail, broad furred cheeks and ear tufts.
import cat, { eyeLook } from '../cat/index.js';
import { eyeOf } from '../cat/sculpt.js';
import { lynxRig, HEAD_O } from './rig.js';
import { sculptLynx } from './sculpt.js';
import { lynxRegions } from './regions.js';
import { lynxCoat } from './coat.js';
import { motion } from './motion.js';

export default {
  id: 'lynx',
  name: 'Eurasian lynx',
  latin: 'Lynx lynx',
  group: 'paws',
  plan: 'quadruped',
  covering: 'fur',
  variants: [
    { id: 'eurasian', name: 'Eurasian lynx', latin: 'Lynx lynx' },
    { id: 'iberian', name: 'Iberian lynx (morph)', latin: 'Lynx pardinus' },
  ],
  variation(R, opts) {
    const morph = opts.variant === 'iberian' ? 'iberian' : 'eurasian';
    // Seeded cat proportions and coat channels, constrained to the lynx morph.
    const p = cat.variation(R, { ...opts, variant: 'mackerel' });
    p.lynxMorph = morph;
    p.size *= morph === 'iberian' ? 1.98 : 2.33;
    p.tail = (p.tail || 1) * 0.35;
    p.longhair = true;
    p.cob = 0;
    p.ear = 1.1;
    p.eye = 'gold';
    p.stripeC = 0.2;
    p.locket = false;
    // The larger wild felid has longer limbs and a proportionately smaller head.
    p.warps = [
      ...p.warps,
      { type: 'legs', k: 1.13, top: 0.14 },
      { type: 'scaleAbout', c: HEAD_O, k: 0.89, r0: 0.055, r1: 0.115 },
    ];
    return p;
  },
  rig: (params) => lynxRig(params),
  sculpt: sculptLynx,
  regions: lynxRegions,
  coat: lynxCoat,
  surfaces: cat.surfaces,
  eyeSpecs: (params) => [1, -1].map((side) => ({
    side, spec: eyeOf(params), headOrigin: HEAD_O, bone: 'head', look: eyeLook(params),
  })),
  motion,
  render: cat.render,
};
