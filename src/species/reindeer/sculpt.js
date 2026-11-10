// Species-specific anatomy over the mature cervid SDF body.
import { sculptDeer, EYE } from '../deer/sculpt.js';
import { hl } from '../deer/rig.js';
export { EYE };
export function sculptReindeer(model,rig,params){
  sculptDeer(model,rig,params);
  model.ell({tag:'reindeerRuff',bone:'neck1',c:[0,0.70,0.38],r:[0.14,0.15,0.17],k:0.06});
  return model;
}
