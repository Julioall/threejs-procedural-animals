// Species-specific anatomy over the mature cervid SDF body.
import { sculptDeer, EYE } from '../deer/sculpt.js';
import { hl } from '../deer/rig.js';
export { EYE };
export function sculptMoose(model,rig,params){
  sculptDeer(model,rig,params);
  model.ell({tag:'mooseShoulder',bone:'chest',c:[0,0.86,0.23],r:[0.18,0.13,0.25],k:0.08});
  model.ell({tag:'mooseMuzzle',bone:'head',c:hl([0,-0.028,0.144]),r:[0.037,0.04,0.065],k:0.02});
  return model;
}
