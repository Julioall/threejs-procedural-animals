// Rodent meshing plan, with an expanded torso bounds for a robust marmot.
import { ratRegions } from '../rat/regions.js';
export function marmotRegions(rig,params,Q){const p=ratRegions(rig,params,Q);for(const jobs of p.jobs)for(const job of jobs)if(job.name==='body')job.bmax[1]=0.18;return p;}
