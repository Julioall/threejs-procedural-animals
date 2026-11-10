// European robin: species-specific bill/head over the existing bird SDF sculpt.
import { sculptBlackbird } from '../blackbird/sculpt.js';
export { EYE } from '../blackbird/sculpt.js';
export function sculptRobin(model, rig, params) {
  sculptBlackbird(model, rig, params);
  model.cone({bone:'head',tag:'bill',a:[0,0.295,0.154],b:[0,0.295,0.187],ra:0.0034,rb:0.0005,k:0.003});
  return model;
}
