// Alpine ibex: strong wild-caprine torso and long curved horns.
import { sculptGoat, EYE } from '../goat/sculpt.js';
export { EYE };
export function sculptIbex(model,rig,params) {
  sculptGoat(model,rig,params);
  model.ell({ tag:'ibexShoulder',bone:'chest',c:[0,0.54,0.23],r:[0.12,0.12,0.19],k:0.05 });
  return model;
}
