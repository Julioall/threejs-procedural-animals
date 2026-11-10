#!/usr/bin/env node
// Catalog integrity only. No geometry, FPS, render or motion validation.
import { listSpecies, loadSpecies } from '../src/index.js';
const expected=["blackbird","lynx","squirrel","beaver","badger","bison","moose","marten","sparrow","pigeon","gull","owl","marmot","weasel","reindeer","ibex","robin","heron","lizard","salamander"];
const known = listSpecies();
if (known.length !== 44) throw new Error(`Expected 44 species, got ${known.length}`);
for (const id of expected) {
  if (!known.includes(id)) throw new Error(`Missing registry entry: ${id}`);
  const spec = await loadSpecies(id);
  if (spec.id !== id) throw new Error(`Wrong id for ${id}: ${spec.id}`);
  for (const member of ['variation','rig','sculpt','regions','coat']) {
    if (typeof spec[member] !== 'function') throw new Error(`${id} missing ${member}`);
  }
  if (!spec.motion || spec.plan !== (['blackbird','sparrow','pigeon','gull','owl','robin','heron'].includes(id) ? 'bird' : 'quadruped'))
    throw new Error(`Unexpected motion/plan for ${id}`);
  console.log(`PASS module ${id}`);
}
console.log(`PASS all 20 new species imports; total catalog 44`);
