// Reindeer (Rangifer tarandus) using the existing cervid rig and antler sculpt.
import deer, { EYE_LOOK } from '../deer/index.js';
import { reindeerRig, HEAD_O } from './rig.js';
import { reindeerRegions } from './regions.js';
import { sculptReindeer, EYE } from './sculpt.js';
import { reindeerCoat } from './coat.js';
import { motion } from './motion.js';
export default {
  id:'reindeer', name:'Reindeer', latin:'Rangifer tarandus',
  group:'hooves', plan:'quadruped', covering:'fur',
  variants:[{id:'summer',name:'Summer coat',latin:'Rangifer tarandus'},{id:'winter',name:'Winter coat',latin:'Rangifer tarandus'}],
  variation(R,o) {
    const variant = ['summer','winter'].includes(o.variant) ? o.variant : (R()<0.5?'summer':'winter');
    const p = deer.variation(R, { ...o, variant });
    p.variant=variant; p.coat=variant; p.size *= 1.12;
    // Both sexes can grow antlers, unlike the original deer preset.
    if (!p.antlers && p.age !== 'juvenile') p.antlers = {
      burr: [0.024,0.042,-0.022], spike:false, beam:0.34+0.07*R(),base:0.015,
      spread:1.04,rise:1.15,curl:1.05,
      tines:[[0.12,0.07,0.12],[0.4,0.12,0.23],[0.68,0.08,0.3]],
      seed:Math.floor(R()*1e6),points:8,velvet:variant==='summer'
    };
    p.warps = [
      ...p.warps,
      { type:'legs', k:0.98, top:0.5 },
      { type:'girth', k:1.1, cy:0.7, z0:-0.55,z1:0.42 }
    ];
    return p;
  },
  rig:()=>reindeerRig(), sculpt:sculptReindeer, regions:reindeerRegions, coat:reindeerCoat,
  eyeSpecs:()=>[1,-1].map(side=>({side,spec:EYE,headOrigin:HEAD_O,bone:'head',look:EYE_LOOK})),
  motion,render:deer.render,
};
