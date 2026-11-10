// Alpine ibex (Capra ibex), a European mountain ungulate.
import goat from '../goat/index.js';
import { ibexRig, HEAD_O } from './rig.js';
import { sculptIbex, EYE } from './sculpt.js';
import { ibexRegions } from './regions.js';
import { ibexCoat } from './coat.js';
import { motion } from './motion.js';
import { srgb } from '../../core/build/coatKit.js';
const EYE_LOOK = { pupil:'bar',lids:'mammal',
  iris:{inner:srgb(0x291b10),mid:srgb(0x63452a),hi:srgb(0x92744a),outer:srgb(0x1d120b)},
  sclera:{visible:false,color:[0.05,0.04,0.03]},lidColor:srgb(0x392a20),pupilSize:[0.15,0.44] };
export default {
  id:'ibex', name:'Alpine ibex', latin:'Capra ibex',
  group:'hooves',plan:'quadruped',covering:'fur',
  variants:[{id:'alpine',name:'Alpine ibex',latin:'Capra ibex'}],
  variation(R,o){
    const p=goat.variation(R,{...o,variant:'alpine'});
    p.variant='alpine';p.size*=1.1;
    p.horns=p.age==='juvenile'?{len:0.035,base:0.008,curve:0.25,spread:0.08,upright:0.3}:
      {len:p.sex==='male'?0.57:0.24,base:p.sex==='male'?0.031:0.015,curve:1.8,spread:0.17,upright:0.16};
    p.wattles=false;p.udder=0;p.beard=p.sex==='male'?0.08:0.015;p.ear='erect';
    p.roman=0;p.heavy=p.sex==='male'?0.8:0.2;p.shaggy=0;
    p.warps=[...p.warps,{type:'legs',k:0.96,top:0.46},{type:'girth',k:1.1,cy:0.56,z0:-0.4,z1:0.38}];
    return p;
  },
  rig:ibexRig,sculpt:sculptIbex,regions:ibexRegions,coat:ibexCoat,
  eyeSpecs:()=>[1,-1].map(side=>({side,spec:EYE,headOrigin:HEAD_O,bone:'head',look:EYE_LOOK})),
  motion,render:goat.render,
};
