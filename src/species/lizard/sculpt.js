// European green lizard: remove rodent-specific parts and replace with reptile/amphibian SDF geometry.
import { sculptRat, eyeOf } from '../rat/sculpt.js';
import { norm,sub,lerp } from '../../core/math/vec.js';
import { TAIL_SEGS } from '../rat/rig.js';
export { eyeOf };
export function sculptLizard(model,rig,params){
 sculptRat(model,rig,params);
 // Retain the existing limb bones and skinning while removing mammalian pinnae,
 // incisors and whisker pads from the reference rodent sculpt.
 const excluded=new Set(['incisor','ear','earinner','earbase','whisker','scrotum','tailcore']);
 model.prims=model.prims.filter(p=>!excluded.has(p.tag));
 model.ell({tag:'elongatedBody',bone:'spine2',group:'axial',
   c:[0,0.051,-0.037],r:[0.03,0.017,0.05],k:0.015});
 model.ell({tag:'flatHead',bone:'head',group:'axial',
   c:[0,0.061,0.081],r:[0.018,0.012,0.023],k:0.009});
 for(let i=0;i<TAIL_SEGS;i++){
   const a=rig.J['tail'+i],b=rig.J['tail'+(i+1)];
   const t=i/TAIL_SEGS;
   model.cone({tag:'taperTail',bone:'tail'+i,group:'axial',
     a,b,ra:(0.011-0.008*t),rb:(0.010-0.008*t),k:0.004,thin:i>8});
 }
 // Angular eyebrow ridges characteristic of a lacertid lizard.
 for(const sign of [1,-1])model.ell({
   tag:'eyebrow',bone:'head',c:[sign*0.010,0.073,0.093],
   r:[0.005,0.003,0.019],k:0.004
 });
 return model;
}
