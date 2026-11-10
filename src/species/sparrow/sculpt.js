// House sparrow: species-specific bill/head over the existing bird SDF sculpt.
import { sculptBlackbird } from '../blackbird/sculpt.js';
export { EYE } from '../blackbird/sculpt.js';
export function sculptSparrow(model, rig, params) {
  sculptBlackbird(model, rig, params);
  model.cone({bone:'head',tag:'bill',a:[0,0.297,0.145],b:[0,0.294,0.182],ra:0.0085,rb:0.0007,k:0.004});
  return model;
}
