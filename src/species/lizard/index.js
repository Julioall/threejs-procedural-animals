// European green lizard (Lacerta viridis). Uses the original four-limbed, jointed-tail quadruped.
import rat,{ EYE_LOOK } from '../rat/index.js';
import { eyeOf } from '../rat/sculpt.js';
import { lizardRig, HEAD_O } from './rig.js';
import { lizardRegions } from './regions.js';
import { sculptLizard } from './sculpt.js';
import { lizardCoat } from './coat.js';
import { motion } from './motion.js';
export default {
  id:'lizard',name:'European green lizard',latin:'Lacerta viridis',
  group:'paws',plan:'quadruped',covering:'scales',
  variants:[{"id":"green","name":"green","latin":"Lacerta viridis"},{"id":"brown","name":"brown","latin":"Lacerta viridis"}],
  variation(R,o){
    const v=["green","brown"].includes(o.variant)?o.variant:'green';
    const p=rat.variation(R,{...o,variant:'agouti'});
    p.variant=v;p.size*=1.23;p.tail*=1.11;
    p.ear=0.25;p.earWidth=0.3;p.headWidth*=1.08;
    p.muzzle*=1.08;
    p.warps=[
      ...p.warps,
      {type:'legs',k:0.68,top:0.03},
      {type:'length',k:1.18,z0:-0.07,z1:0.03},
      {type:'girth',k:0.78,cy:0.053,z0:-0.095,z1:0.05,fade:0.015}
    ];
    return p;
  },
  rig:lizardRig,sculpt:sculptLizard,regions:lizardRegions,coat:lizardCoat,
  eyeSpecs:params=>[1,-1].map(side=>({side,spec:eyeOf(params),headOrigin:HEAD_O,bone:'head',look:EYE_LOOK})),
  motion,
  render:{strandDensity:0,clumpDensity:1,shellScale:0,fins:false},
};
