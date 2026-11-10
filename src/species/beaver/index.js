// Castor fiber (Eurasian beaver). Its paddle-shaped tail is SDF-sculpted; land locomotion only.
import rat, { EYE_LOOK } from '../rat/index.js';
import { eyeOf } from '../rat/sculpt.js';
import { beaverRig, HEAD_O } from './rig.js';
import { beaverRegions } from './regions.js';
import { sculptBeaver } from './sculpt.js';
import { beaverCoat } from './coat.js';
import { motion } from './motion.js';

export default {
  id: 'beaver', name: 'Eurasian beaver', latin: 'Castor fiber',
  group: 'paws', plan: 'quadruped', covering: 'fur',
  variants: ['brown', 'dark'],
  variation(R, o) {
    const morph = o.variant === 'dark' ? 'dark' : 'brown';
    const p = rat.variation(R, { ...o, variant: 'agouti' });
    p.variant = morph; p.morph = morph;
    p.size *= 3.4;
    p.tail = (p.tail || 1) * 0.83;
    p.headWidth *= 1.18;
    p.muzzle *= 0.9;
    p.ear = 0.5; p.earWidth = 0.65;
    p.warps = [
      ...p.warps,
      { type: 'girth', k: 1.35, cy: 0.052, z0: -0.1, z1: 0.025, fade: 0.02 },
      { type: 'length', k: 1.13, z0: -0.08, z1: 0.018 },
    ];
    return p;
  },
  rig: beaverRig, sculpt: sculptBeaver, regions: beaverRegions,
  coat: beaverCoat, surfaces: rat.surfaces,
  eyeSpecs: params => [1, -1].map(side => ({
    side, spec: eyeOf(params), headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK,
  })),
  motion,
  render: { strandDensity: 1800, clumpDensity: 1, shellScale: 1, fins: false },
};
