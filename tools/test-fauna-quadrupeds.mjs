#!/usr/bin/env node
// Verify seeds, selected coat morphs and existing motion-engine compatibility.
import { createAnimal, listSpecies } from '../src/index.js';

const cases = {
  squirrel: ['red', 'dark', 'grey'],
  beaver: ['brown', 'dark'],
  badger: ['european'],
  bison: ['european'],
};

for (const [id, variants] of Object.entries(cases)) {
  if (!listSpecies().includes(id)) throw new Error('Not registered: ' + id);
  for (const variant of variants) {
    const a = await createAnimal(id, { seed: 7, variant, quality: 'low', worker: false });
    try {
      if (a.params.variant !== variant) throw new Error(`${id}: variant was ${a.params.variant}, not ${variant}`);
      if (!a.stats.vertices || !a.stats.bones) throw new Error(`${id} ${variant}: empty rig`);
      const speed = a.gears.walk ?? 0.2;
      a.move({ speed, heading: Math.PI / 4 });
      for (let i = 0; i < 60; i++) a.update(1 / 60);
      if (![a.position.x, a.position.y, a.position.z, a.heading].every(Number.isFinite))
        throw new Error(`${id} ${variant}: invalid motion state`);
      for (const bone of a.render.skeleton.bones)
        if (!bone.matrixWorld.elements.every(Number.isFinite))
          throw new Error(`${id} ${variant}: invalid bone matrix: ${bone.name}`);
      console.log(`PASS ${id} ${variant}: ${a.stats.vertices} vertices, ${a.stats.bones} bones`);
    } finally { a.dispose(); }
  }
}
