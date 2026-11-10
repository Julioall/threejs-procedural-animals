// Pine marten (Martes martes), reusing existing fox quadruped rig and coat grooming.
import fox, { EYE_LOOK } from '../fox/index.js';
import { eyeOf } from '../fox/sculpt.js';
import { martenRig, HEAD_O } from './rig.js';
import { martenRegions } from './regions.js';
import { sculptMarten } from './sculpt.js';
import { martenCoat } from './coat.js';
import { motion } from './motion.js';
export default {
  id:'marten',name:'Pine marten',latin:'Martes martes',
  group:'paws',plan:'quadruped',covering:'fur',
  variants:[{"id":"chestnut","name":"chestnut","latin":"Martes martes"},{"id":"dark","name":"dark","latin":"Martes martes"}],
  variation(R,o){
    const variant=["chestnut","dark"].includes(o.variant)?o.variant:'chestnut';
    const p=fox.variation(R,{...o,variant:'red'});
    p.variant=variant;p.size*=0.68;p.slim=0.74;
    p.ear=0.7;p.tailBrush=0.76;p.tail*=0.91;
    p.muzzle*=0.77;p.headW*=0.9;
    p.warps=[
      ...p.warps,
      {type:'length',k:1.14,z0:-0.19,z1:0.24},
      {type:'girth',k:0.85,cy:0.3,z0:-0.25,z1:0.2},
      {type:'legs',k:0.76,top:0.25}
    ];
    return p;
  },
  rig:martenRig,sculpt:sculptMarten,regions:martenRegions,coat:martenCoat,
  eyeSpecs:params=>[1,-1].map(side=>({side,spec:eyeOf(params),headOrigin:HEAD_O,bone:'head',look:EYE_LOOK})),
  motion,render:fox.render,
};
