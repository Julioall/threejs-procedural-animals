// Elongated low-slung Least weasel sculpt on the existing quadruped body.
import { sculptFox, eyeOf } from '../fox/sculpt.js';
export { eyeOf };
export function sculptWeasel(model, rig, params) {
  sculptFox(model, rig, params);
  model.ell({
    bone:'spine2', tag:'mustelidTrunk', c:[0,0.305,-0.047],
    r:[0.041,0.053,0.127], k:0.033
  });
  model.ell({
    bone:'neck1',tag:'mustelidNeck',c:[0,0.32,0.249],
    r:[0.045,0.047,0.079],k:0.025
  });
  return model;
}
