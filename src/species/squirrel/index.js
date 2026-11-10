// Sciurus vulgaris (Eurasian red squirrel): curved plume, short muzzle and tufted coat.
import rat, { EYE_LOOK } from '../rat/index.js';
import { eyeOf } from '../rat/sculpt.js';
import { HEAD_O, squirrelRig } from './rig.js';
import { squirrelRegions } from './regions.js';
import { sculptSquirrel } from './sculpt.js';
import { squirrelCoat } from './coat.js';
import { motion } from './motion.js';

export default {
  id: 'squirrel', name: 'Red squirrel', latin: 'Sciurus vulgaris',
  group: 'paws', plan: 'quadruped', covering: 'fur',
  variants: ['red', 'dark', 'grey'],
  variation(R, o) {
    const morph = ['red', 'dark', 'grey'].includes(o.variant) ? o.variant : R() < 0.75 ? 'red' : R() < 0.65 ? 'dark' : 'grey';
    const p = rat.variation(R, { ...o, variant: 'agouti' });
    p.variant = morph; p.morph = morph;
    p.size *= 1.13;
    p.tail = (p.tail || 1) * 1.15;
    p.headWidth *= 0.94;
    p.muzzle *= 0.84;
    p.ear = 0.82;
    p.earWidth = 0.77;
    p.warps = [
      ...p.warps,
      { type: 'legs', k: 1.07, top: 0.03 },
      { type: 'scaleAbout', c: HEAD_O, k: 0.92, r0: 0.012, r1: 0.027 },
    ];
    return p;
  },
  rig: squirrelRig,
  sculpt: sculptSquirrel,
  regions: squirrelRegions,
  coat: squirrelCoat,
  surfaces: rat.surfaces,
  eyeSpecs: params => [1, -1].map(side => ({
    side, spec: eyeOf(params), headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK,
  })),
  motion,
  render: { strandDensity: 2000, clumpDensity: 1.3, shellScale: 1, fins: false, raiseLen: [0.005, 0.015] },
};
