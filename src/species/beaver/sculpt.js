// Eurasian beaver: stocky trunk, blunt muzzle and a broad flattened tail paddle.
import { sculptRat, EYE, eyeOf } from '../rat/sculpt.js';
import { norm, sub, lerp } from '../../core/math/vec.js';
import { TAIL_SEGS } from './rig.js';
export { EYE, eyeOf };

export function sculptBeaver(model, rig, params) {
  sculptRat(model, rig, params);
  model.ell({
    tag: 'beaverBarrel', bone: 'spine2', group: 'axial',
    c: [0, 0.056, -0.035], r: [0.042, 0.029, 0.058], k: 0.018,
  });
  model.ell({
    tag: 'beaverCheeks', bone: 'head', group: 'axial',
    c: [0, 0.056, 0.091], r: [0.015, 0.012, 0.017], k: 0.008,
  });
  // The final segments form the paddle; the tail root remains narrower and flexible.
  for (let i = 3; i < TAIL_SEGS; i++) {
    const a = rig.J['tail' + i], b = rig.J['tail' + (i + 1)];
    const d = sub(b, a), L = Math.hypot(...d), t = (i - 3) / (TAIL_SEGS - 3);
    const outline = Math.pow(Math.sin(Math.PI * (0.08 + 0.87 * t)), 0.65);
    model.ell({
      tag: 'beaverPaddle', bone: 'tail' + i, group: 'axial',
      c: lerp(a, b, 0.5), axis: norm(d), up: [0, 1, 0],
      r: [0.027 * Math.max(0.18, outline), 0.0045, L * 0.87],
      k: 0.004, thin: true,
    });
  }
  return model;
}
