// Fire salamander (Salamandra salamandra). Uses the original four-limbed, jointed-tail quadruped.
import rat,{ EYE_LOOK } from '../rat/index.js';
import { eyeOf } from '../rat/sculpt.js';
import { salamanderRig, HEAD_O } from './rig.js';
import { salamanderRegions } from './regions.js';
import { sculptSalamander } from './sculpt.js';
import { salamanderCoat } from './coat.js';
import { motion } from './motion.js';
export default {
  id:'salamander',name:'Fire salamander',latin:'Salamandra salamandra',
  group:'paws',plan:'quadruped',covering:'skin',
  variants:[{"id":"spotted","name":"spotted","latin":"Salamandra salamandra"},{"id":"striped","name":"striped","latin":"Salamandra salamandra"}],
  variation(R,o){
    const v=["spotted","striped"].includes(o.variant)?o.variant:'spotted';
    const p=rat.variation(R,{...o,variant:'agouti'});
    p.variant=v;p.size*=1.01;p.tail*=0.82;
    p.ear=0.25;p.earWidth=0.3;p.headWidth*=1.08;
    p.muzzle*=0.80;
    p.warps=[
      ...p.warps,
      {type:'legs',k:0.74,top:0.03},
      {type:'length',k:1.18,z0:-0.07,z1:0.03},
      {type:'girth',k:0.84,cy:0.053,z0:-0.095,z1:0.05,fade:0.015}
    ];
    return p;
  },
  rig:salamanderRig,sculpt:sculptSalamander,regions:salamanderRegions,coat:salamanderCoat,
  eyeSpecs:params=>[1,-1].map(side=>({side,spec:eyeOf(params),headOrigin:HEAD_O,bone:'head',look:EYE_LOOK})),
  motion,
  render:{strandDensity:0,clumpDensity:1,shellScale:0,fins:false},
};
