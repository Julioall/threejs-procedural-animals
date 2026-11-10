// Alpine marmot: barrel-shaped marmot body, small pinnae and blunt face.
import { sculptRat, eyeOf } from '../rat/sculpt.js';
export { eyeOf };
export function sculptMarmot(model,rig,params){
  sculptRat(model,rig,params);
  model.ell({
    tag:'marmotBarrel',bone:'spine2',group:'axial',
    c:[0,0.066,-0.036],r:[0.041,0.038,0.064],k:0.02
  });
  model.ell({
    tag:'marmotCheeks',bone:'head',group:'axial',
    c:[0,0.059,0.081],r:[0.019,0.016,0.021],k:0.009
  });
  return model;
}
