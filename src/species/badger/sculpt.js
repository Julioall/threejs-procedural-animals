// European badger, built from the bear's plantigrade SDF anatomy.
import { sculptBear, eyeOf } from '../bear/sculpt.js';
export { eyeOf };
export function sculptBadger(model, rig, params) {
  sculptBear(model, rig, params);
  // Shape a longer, tapered muzzle rather than relying on colour alone.
  model.ell({
    tag: 'badgerSnout', bone: 'head', group: 'axial',
    c: [0, 0.744, 0.878], r: [0.048, 0.042, 0.105], k: 0.027,
  });
  return model;
}
