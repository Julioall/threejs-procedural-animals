// Existing skinning / SDF coat fields with amphibian moist skin.
import { ratCoat } from '../rat/coat.js';
import { MAT,srgb,mix3 } from '../../core/build/coatKit.js';
const green=srgb(0x427a34),brown=srgb(0x867455);
const black=srgb(0x17171a),yellow=srgb(0xe4ad24);
const belly=srgb(3880496);
export function salamanderCoat(ctx){
 const out=ratCoat(ctx);
 const variant=ctx.params.variant,seed=(ctx.params.coatSeed||1)%1000;
 for(let i=0;i<ctx.nV;i++){
   const o=i*4;
   const mat=out.tint[o+3];
   if(mat===MAT.KERATIN||mat===MAT.MOUTH||mat===MAT.NOSE)continue;
   const x=ctx.pos[3*i],y=ctx.pos[3*i+1],z=ctx.pos[3*i+2];
   const ny=ctx.nrm[3*i+1];
   let col;
   col=black;
   const spots=Math.sin(x*190+seed*0.4)*Math.sin(z*125+seed*0.23)*Math.cos(y*110);
   const band=variant==='striped'?Math.abs(x)<0.016&&y>0.062:spots>0.3&&ny>-0.25;
   if(band)col=yellow;
   out.tint[o]=col[0];out.tint[o+1]=col[1];out.tint[o+2]=col[2];
   out.tint[o+3]=MAT.WET_SKIN;
   out.furLen[i]=0;
   out.pattern[i]=1;out.patternColor[o+3]=0;
   out.surf[o]=0.72;
   out.surf[o+1]=0;
 }
 return out;
}
