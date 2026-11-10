// Coarse warm-grey and brown mountain-rodent coat.
import { ratCoat } from '../rat/coat.js';
import { MAT,srgb,mix3 } from '../../core/build/coatKit.js';
const COATS={alpine:0x85725b,dark:0x594b3e};
export function marmotCoat(ctx){
  const out=ratCoat(ctx);
  const base=srgb(COATS[ctx.params.variant]||COATS.alpine);
  const light=srgb(0xc3ae8f),tail=srgb(0x4b3b2d);
  for(let i=0;i<ctx.nV;i++){
    const o=i*4,bone=ctx.rig.BONES[ctx.weights.dominant[i]]?.name||'';
    const mat=out.tint[o+3];
    if(mat!==MAT.FUR&&!bone.startsWith('tail'))continue;
    const col=bone.startsWith('tail')?tail:mix3(light,base,Math.max(0,Math.min(1,0.6+0.5*ctx.nrm[3*i+1])));
    out.tint[o]=col[0];out.tint[o+1]=col[1];out.tint[o+2]=col[2];
    out.tint[o+3]=MAT.FUR;
    out.furLen[i]=Math.max(out.furLen[i],bone.startsWith('tail')?0.012:0.008);
    out.pattern[i]=1;out.patternColor[o+3]=0;
  }
  return out;
}
