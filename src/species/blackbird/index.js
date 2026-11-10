// European blackbird (Turdus merula), using the existing bird body plan.
// Male: matte black with yellow-orange bill. Female: warm brown with dark bill.
import { blackbirdRig, HEAD_O } from './rig.js';
import { sculptBlackbird, EYE } from './sculpt.js';
import { blackbirdRegions } from './regions.js';
import { blackbirdCoat, blackbirdFeatherColour } from './coat.js';
import { motion, WING, FEATHERS } from './motion.js';
import { featherCards } from '../../core/build/featherCards.js';
import { srgb } from '../../core/build/coatKit.js';

export default {
  id: 'blackbird',
  name: 'European blackbird',
  latin: 'Turdus merula',
  group: 'birds',
  plan: 'bird',
  covering: 'feathers',
  variants: ['male', 'female'],
  variation(R, opts) {
    const sex = opts.sex || (opts.variant === 'male' || opts.variant === 'female'
      ? opts.variant : R() < 0.5 ? 'male' : 'female');
    const age = opts.age || 'adult';
    const g = () => (R() + R() + R() - 1.5) / 1.5;
    // Adult length ~24-29 cm; crow reference length ~44 cm.
    // Keep variation within realistic species proportions; juvenile slightly shorter.
    const size = (sex === 'male' ? 0.62 : 0.59) * (1 + 0.05 * g()) *
      (age === 'juvenile' ? 0.93 : 1);
    return {
      sex, age, size, variant: sex, morph: 'american',
      wear: Math.max(0, 0.12 + 0.2 * g()),
      gloss: 0.65 + 0.12 * g(),
      tailK: 1 + 0.06 * g(),
      warps: [
        { type: 'length', k: 0.94 + 0.04 * g(), z0: -0.09, z1: 0.11 },
        { type: 'scaleAbout', c: HEAD_O, k: 0.96 + 0.03 * g(), r0: 0.04, r1: 0.075 },
      ],
    };
  },
  rig: () => blackbirdRig(),
  sculpt: (model, rig) => sculptBlackbird(model, rig),
  regions: blackbirdRegions,
  coat: blackbirdCoat,
  surfaces: (ctx) => featherCards({
    ...ctx, wing: WING, feathers: FEATHERS, tail: { bindFan: 0.2 },
    colour: blackbirdFeatherColour(ctx.params),
  }),
  eyeSpecs: () => [1, -1].map((side) => ({
    side, spec: EYE, headOrigin: HEAD_O, bone: 'head',
    look: {
      pupil: 'round', lids: 'bird', pupilSize: [0.36, 0.52],
      iris: { inner: srgb(0x211710), mid: srgb(0x473226), hi: srgb(0x765640), outer: srgb(0x1c1410) },
      sclera: { visible: false, color: [0.02, 0.02, 0.02] },
      lidColor: srgb(0x26211c),
    },
  })),
  motion,
  render: { markColor: srgb(0x171513), strandDensity: 850, clumpDensity: 1.3, shellScale: 1, finWidth: 0.3, featherEdge: 0.4 },
};
