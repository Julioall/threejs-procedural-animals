// Marmota marmota: robust Alpine marmot on the existing rodent quadruped plan.
import rat,{EYE_LOOK} from '../rat/index.js';
import { eyeOf } from '../rat/sculpt.js';
import { marmotRig, HEAD_O } from './rig.js';
import { marmotRegions } from './regions.js';
import { sculptMarmot } from './sculpt.js';
import { marmotCoat } from './coat.js';
import { motion } from './motion.js';
export default {
  id:'marmot',name:'Alpine marmot',latin:'Marmota marmota',
  group:'paws',plan:'quadruped',covering:'fur',
  variants:[{id:'alpine',name:'Alpine brown',latin:'Marmota marmota'},{id:'dark',name:'Dark brown',latin:'Marmota marmota'}],
  variation(R,o){
    const variant=o.variant==='dark'?'dark':'alpine';
    const p=rat.variation(R,{...o,variant:'agouti'});
    p.variant=variant;p.size*=2.15;p.ear=0.44;p.earWidth=0.62;
    p.headWidth*=1.25;p.muzzle*=0.8;p.tail*=0.68;p.tailThick*=1.35;
    p.warps=[
      ...p.warps,
      {type:'girth',k:1.28,cy:0.054,z0:-0.09,z1:0.04,fade:0.018},
      {type:'legs',k:0.88,top:0.03}
    ];
    return p;
  },
  rig:marmotRig,sculpt:sculptMarmot,regions:marmotRegions,coat:marmotCoat,
  surfaces:rat.surfaces,
  eyeSpecs:params=>[1,-1].map(side=>({side,spec:eyeOf(params),headOrigin:HEAD_O,bone:'head',look:EYE_LOOK})),
  motion,render:rat.render,
};
