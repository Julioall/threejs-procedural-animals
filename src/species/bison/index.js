// Bison bonasus (European bison), on the existing bovine quadruped plan.
import cow, { EYE_LOOK } from '../cow/index.js';
import { EYE } from '../cow/sculpt.js';
import { bisonRig, HEAD_O } from './rig.js';
import { bisonRegions } from './regions.js';
import { sculptBison } from './sculpt.js';
import { bisonCoat } from './coat.js';
import { motion } from './motion.js';
export default {
  id: 'bison', name: 'European bison', latin: 'Bison bonasus',
  group: 'hooves', plan: 'quadruped', covering: 'fur',
  variants: ['european'],
  variation(R, o) {
    const p = cow.variation(R, { ...o, variant: 'highland' });
    p.variant = 'european';
    p.coat = 'highlandblack';
    p.size *= 1.16;
    p.earTags = false; p.noseRing = false; p.udder = 0; p.dairy = 0;
    p.bull = o.sex === 'female' ? 0.58 : 0.95;
    p.shaggy = true;
    p.horns = p.age === 'juvenile' ? null : { style: 'wide', len: 0.33, r: 0.045, a0: 14, a1: 90, curlPow: 1.5 };
    p.warps = [
      { type: 'legs', k: 0.97, top: 0.72 },
      { type: 'length', k: 1.06, z0: -0.7, z1: 0.62 },
      { type: 'girth', k: 1.11, cy: 1.05, z0: -0.85, z1: 0.75 },
    ];
    return p;
  },
  rig: bisonRig, sculpt: sculptBison, regions: bisonRegions,
  coat: bisonCoat,
  eyeSpecs: () => [1, -1].map(side => ({ side, spec: EYE, headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK })),
  motion, render: { ...cow.render, strandDensity: 700, clumpDensity: 0.85 },
};
