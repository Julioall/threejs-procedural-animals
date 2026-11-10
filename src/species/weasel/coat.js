// Seasonal / individual pelt and pale under-throat on the pre-existing fox coat.
import { foxCoat } from '../fox/coat.js';
import { MAT,srgb,mix3 } from '../../core/build/coatKit.js';
const COATS = {"summer":8806717,"winter":15130320};
const UNDER = srgb(15525848);
export function weaselCoat(ctx) {
  const out=foxCoat({ ...ctx, params:{ ...ctx.params,variant:'red' } });
  const variant=ctx.params.variant;
  const base=srgb(COATS[variant] || COATS[Object.keys(COATS)[0]]);
  for(let i=0;i<ctx.nV;i++){
    const o=i*4;
    if(out.tint[o+3]!==MAT.FUR)continue;
    const p=[ctx.pos[3*i],ctx.pos[3*i+1],ctx.pos[3*i+2]];
    const bone=ctx.rig.BONES[ctx.weights.dominant[i]]?.name||'';
    const ventral=Math.max(0,Math.min(1,-ctx.nrm[3*i+1]*1.15));
    const light=bone==='head'?0.2:ventral;
    let col=mix3(base,UNDER,light*0.9);
    if(bone.startsWith('tail'))col=mix3(col,base,0.7);
    out.tint[o]=col[0];out.tint[o+1]=col[1];out.tint[o+2]=col[2];
    out.pattern[i]=1;
    out.patternColor[o+3]=0;
    out.furLen[i]=Math.max(0.007,Math.min(0.027,out.furLen[i]));
  }
  return out;
}
