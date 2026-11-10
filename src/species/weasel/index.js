// Least weasel (Mustela nivalis), reusing existing fox quadruped rig and coat grooming.
import fox, { EYE_LOOK } from '../fox/index.js';
import { eyeOf } from '../fox/sculpt.js';
import { weaselRig, HEAD_O } from './rig.js';
import { weaselRegions } from './regions.js';
import { sculptWeasel } from './sculpt.js';
import { weaselCoat } from './coat.js';
import { motion } from './motion.js';
export default {
  id:'weasel',name:'Least weasel',latin:'Mustela nivalis',
  group:'paws',plan:'quadruped',covering:'fur',
  variants:[{"id":"summer","name":"summer","latin":"Mustela nivalis"},{"id":"winter","name":"winter","latin":"Mustela nivalis"}],
  variation(R,o){
    const variant=["summer","winter"].includes(o.variant)?o.variant:'summer';
    const p=fox.variation(R,{...o,variant:'red'});
    p.variant=variant;p.size*=0.32;p.slim=0.65;
    p.ear=0.53;p.tailBrush=0.25;p.tail*=0.63;
    p.muzzle*=0.77;p.headW*=0.9;
    p.warps=[
      ...p.warps,
      {type:'length',k:1.25,z0:-0.19,z1:0.24},
      {type:'girth',k:0.85,cy:0.3,z0:-0.25,z1:0.2},
      {type:'legs',k:0.76,top:0.25}
    ];
    return p;
  },
  rig:weaselRig,sculpt:sculptWeasel,regions:weaselRegions,coat:weaselCoat,
  eyeSpecs:params=>[1,-1].map(side=>({side,spec:eyeOf(params),headOrigin:HEAD_O,bone:'head',look:EYE_LOOK})),
  motion,render:fox.render,
};
