// Grey heron: species-specific bill/head over the existing bird SDF sculpt.
import { sculptCrow } from '../crow/sculpt.js';
export { EYE } from '../crow/sculpt.js';
export function sculptHeron(model, rig, params) {
  sculptCrow(model, rig, params);
  model.cone({bone:'head',tag:'bill',a:[0,0.297,0.142],b:[0,0.292,0.191],ra:0.0055,rb:0.001,k:0.003});
  model.ell({bone:'neck2',tag:'longNeck',c:[0,0.26,0.074],r:[0.014,0.050,0.013],k:0.011});
  return model;
}
