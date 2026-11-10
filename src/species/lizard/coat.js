// Existing skinning / SDF coat fields with lizard scales.
import { ratCoat } from '../rat/coat.js';
import { MAT,srgb,mix3 } from '../../core/build/coatKit.js';
const green=srgb(0x427a34),brown=srgb(0x867455);
const black=srgb(0x17171a),yellow=srgb(0xe4ad24);
const belly=srgb(11841930);
export function lizardCoat(ctx){
 const out=ratCoat(ctx);
 const variant=ctx.params.variant,seed=(ctx.params.coatSeed||1)%1000;
 for(let i=0;i<ctx.nV;i++){
   const o=i*4;
   const mat=out.tint[o+3];
   if(mat===MAT.KERATIN||mat===MAT.MOUTH||mat===MAT.NOSE)continue;
   const x=ctx.pos[3*i],y=ctx.pos[3*i+1],z=ctx.pos[3*i+2];
   const ny=ctx.nrm[3*i+1];
   let col;
   const base=variant==='brown'?brown:green;
   col=mix3(belly,base,Math.max(0,Math.min(1,0.45+ny*0.62)));
   const stripe=Math.abs(Math.abs(x)-0.023)<0.004&&y>0.06&&z<0.1&&z>-0.105;
   if(stripe)col=mix3(col,belly,0.45);
   out.tint[o]=col[0];out.tint[o+1]=col[1];out.tint[o+2]=col[2];
   out.tint[o+3]=MAT.SCALES;
   out.furLen[i]=0;
   out.pattern[i]=1;out.patternColor[o+3]=0;
   out.surf[o]=0.24;
   out.surf[o+1]=0.0025;
 }
 return out;
}
