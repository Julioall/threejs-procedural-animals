// Use the existing bovine rig with its required joint map (not the species params).
import { cowRig, cowJoints, HEAD_O } from '../cow/rig.js';
export { HEAD_O };
export function bisonRig() { return cowRig(cowJoints()); }
