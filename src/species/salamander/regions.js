// Reuses the existing quadruped meshing plan but omits rodent incisors.
import { ratRegions } from '../rat/regions.js';
export function salamanderRegions(rig,params,Q){
 const p=ratRegions(rig,params,Q);
 p.jobs=p.jobs.map(group=>group.filter(job=>!['uteeth','lteeth'].includes(job.name))).filter(group=>group.length);
 for(const group of p.jobs)for(const job of group){
   if(job.name==='body'){job.bmin[2]=-0.42;job.bmax[1]=0.14;}
   if(job.name==='tail'){job.bmin[2]=-0.43;job.bmin[0]=-0.03;job.bmax[0]=0.03;}
 }
 return p;
}
