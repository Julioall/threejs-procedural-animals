// Eurasian red squirrel: flexed high bushy tail and rounded rodent head.
// Reuses the rat SDF anatomy; adds a continuous plume skinned to each tail bone.
import { sculptRat, EYE, eyeOf } from '../rat/sculpt.js';
import { norm, sub, lerp } from '../../core/math/vec.js';
import { TAIL_SEGS } from './rig.js';
export { EYE, eyeOf };

export function sculptSquirrel(model, rig, params) {
  sculptRat(model, rig, params);
  for (let i = 0; i < TAIL_SEGS; i++) {
    const a = rig.J['tail' + i], b = rig.J['tail' + (i + 1)];
    const d = sub(b, a), L = Math.hypot(...d);
    const t = i / TAIL_SEGS;
    const envelope = Math.max(0.15, Math.sin(Math.PI * (0.06 + 0.90 * t)));
    model.ell({
      tag: 'squirrelPlume', bone: 'tail' + i, group: 'axial',
      c: lerp(a, b, 0.5), axis: norm(d), up: [1, 0, 0],
      r: [0.018 * envelope, 0.017 * envelope, L * 0.88],
      k: 0.006, thin: true,
    });
  }
  return model;
}
