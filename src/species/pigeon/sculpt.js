// Rock pigeon: species-specific bill/head over the existing bird SDF sculpt.
import { sculptCrow } from '../crow/sculpt.js';
export { EYE } from '../crow/sculpt.js';
export function sculptPigeon(model, rig, params) {
  sculptCrow(model, rig, params);
  model.ell({bone:'head',tag:'cere',c:[0,0.299,0.155],r:[0.008,0.005,0.011],k:0.006});
  return model;
}
