// European herring gull: species-specific bill/head over the existing bird SDF sculpt.
import { sculptCrow } from '../crow/sculpt.js';
export { EYE } from '../crow/sculpt.js';
export function sculptGull(model, rig, params) {
  sculptCrow(model, rig, params);
  model.cone({bone:'head',tag:'bill',a:[0,0.295,0.145],b:[0,0.283,0.188],ra:0.007,rb:0.0015,k:0.005});
  return model;
}
