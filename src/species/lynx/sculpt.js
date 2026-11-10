// Felid sculpt with the characteristic pointed ear-tip tufts of a lynx.
import { sculptCat, earFrame } from '../cat/sculpt.js';
import { add, mul } from '../../core/math/vec.js';

export function sculptLynx(model, rig, params) {
  sculptCat(model, rig, params);
  for (const side of ['L', 'R']) {
    const ear = earFrame(rig.J, side);
    const root = add(ear.tip, mul(ear.up, -0.004));
    const tip = add(ear.tip, mul(ear.up, 0.018));
    model.cone({
      tag: 'earTuft', bone: 'ear' + side, group: 'ear' + side,
      a: root, b: tip, ra: 0.0033, rb: 0.0005, k: 0.001, thin: true,
    });
  }
  return model;
}
