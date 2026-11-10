// Meles meles, European badger: low body, long muzzle and contrasting face stripes.
import bear, { EYE_LOOK } from '../bear/index.js';
import { eyeOf } from '../bear/sculpt.js';
import { badgerRig, HEAD_O } from './rig.js';
import { badgerRegions } from './regions.js';
import { sculptBadger } from './sculpt.js';
import { badgerCoat } from './coat.js';
import { motion } from './motion.js';
export default {
  id: 'badger', name: 'European badger', latin: 'Meles meles',
  group: 'paws', plan: 'quadruped', covering: 'fur',
  variants: ['european'],
  variation(R, o) {
    const p = bear.variation(R, { ...o, variant: 'black' });
    p.variant = 'european';
    p.coat = 'black';
    p.size *= 0.48;
    p.muzzle = 1.26;
    p.headW = 0.81;
    p.girth = 0.78;
    p.hump = 0; p.shag = 0.45;
    p.ear = 0.55; p.claw = 0.75;
    p.warps = [
      { type: 'legs', k: 0.67, top: 0.5 },
      { type: 'length', k: 1.23, z0: -0.35, z1: 0.33 },
      { type: 'girth', k: 0.8, cy: 0.65, z0: -0.5, z1: 0.35 },
      { type: 'scaleAbout', c: HEAD_O, k: 0.85, r0: 0.12, r1: 0.28 },
    ];
    return p;
  },
  rig: badgerRig, sculpt: sculptBadger, regions: badgerRegions,
  coat: badgerCoat, surfaces: bear.surfaces,
  eyeSpecs: params => [1, -1].map(side => ({
    side, spec: eyeOf(params), headOrigin: HEAD_O, bone: 'head', look: EYE_LOOK,
  })),
  motion, render: { ...bear.render, strandDensity: 1200, clumpDensity: 1.3 },
};
