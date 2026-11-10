// Tawny ibex back and paler underparts with dark lower legs.
import { goatCoat } from '../goat/coat.js';
import { MAT, srgb, mix3 } from '../../core/build/coatKit.js';
export function ibexCoat(ctx) {
  const out=goatCoat(ctx);
  const back=srgb(0x85664a),pale=srgb(0xc6b196),dark=srgb(0x3e3026);
  for(let i=0;i<ctx.nV;i++){
    const o=i*4;
    if(out.tint[o+3]!==MAT.FUR)continue;
    const y=ctx.pos[i*3+1], ny=ctx.nrm[i*3+1];
    const col=y<0.23?dark:mix3(pale,back,Math.max(0,Math.min(1,0.5+0.6*ny)));
    out.tint[o]=col[0];out.tint[o+1]=col[1];out.tint[o+2]=col[2];
  }
  return out;
}
