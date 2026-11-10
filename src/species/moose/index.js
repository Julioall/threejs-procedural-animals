// European moose (Alces alces) using the existing cervid rig and antler sculpt.
import deer, { EYE_LOOK } from '../deer/index.js';
import { mooseRig, HEAD_O } from './rig.js';
import { mooseRegions } from './regions.js';
import { sculptMoose, EYE } from './sculpt.js';
import { mooseCoat } from './coat.js';
import { motion } from './motion.js';
export default {
  id:'moose', name:'European moose', latin:'Alces alces',
  group:'hooves', plan:'quadruped', covering:'fur',
  variants:[{id:'summer',name:'Summer coat',latin:'Alces alces'},{id:'winter',name:'Winter coat',latin:'Alces alces'}],
  variation(R,o) {
    const variant = ['summer','winter'].includes(o.variant) ? o.variant : (R()<0.5?'summer':'winter');
    const p = deer.variation(R, { ...o, variant });
    p.variant=variant; p.coat=variant; p.size *= 1.72;
    // Larger body and long muzzle distinguish moose from the lighter deer.
    p.warps = [
      ...p.warps,
      { type:'legs', k:1.17, top:0.5 },
      { type:'girth', k:1.32, cy:0.7, z0:-0.55,z1:0.42 }
    ];
    return p;
  },
  rig:()=>mooseRig(), sculpt:sculptMoose, regions:mooseRegions, coat:mooseCoat,
  eyeSpecs:()=>[1,-1].map(side=>({side,spec:EYE,headOrigin:HEAD_O,bone:'head',look:EYE_LOOK})),
  motion,render:deer.render,
};
