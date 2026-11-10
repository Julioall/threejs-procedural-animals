// Tawny owl: species-specific bill/head over the existing bird SDF sculpt.
import { sculptCrow } from '../crow/sculpt.js';
export { EYE } from '../crow/sculpt.js';
export function sculptOwl(model, rig, params) {
  sculptCrow(model, rig, params);
  model.ell({bone:'head',tag:'facialDisc',c:[0,0.299,0.131],r:[0.031,0.028,0.010],k:0.006});
  model.cone({bone:'head',tag:'bill',a:[0,0.293,0.150],b:[0,0.280,0.171],ra:0.0045,rb:0.0008,k:0.003});
  return model;
}
