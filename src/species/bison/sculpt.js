// European bison adds shoulder hump and beard to the pre-existing bovine SDF body.
import { sculptCow, EYE } from '../cow/sculpt.js';
export { EYE };
export function sculptBison(model, rig, params) {
  sculptCow(model, rig, params);
  model.ell({
    tag: 'bisonHump', bone: 'chest', group: 'axial',
    c: [0, 1.43, 0.30], r: [0.31, 0.23, 0.33], k: 0.14,
  });
  model.ell({
    tag: 'bisonMane', bone: 'neck1', group: 'axial',
    c: [0, 1.28, 0.71], r: [0.24, 0.25, 0.30], k: 0.12,
  });
  model.cone({
    tag: 'bisonBeard', bone: 'neck1', group: 'axial',
    a: [0, 1.12, 0.92], b: [0, 0.89, 0.92],
    ra: 0.12, rb: 0.018, k: 0.06,
  });
  return model;
}
