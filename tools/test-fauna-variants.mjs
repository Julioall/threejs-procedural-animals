#!/usr/bin/env node
// Smoke-test selectable species morphs that the default single-seed test does not cover.
import { createAnimal } from '../src/index.js';

const cases = [
  ['blackbird', 'male'],
  ['blackbird', 'female'],
  ['lynx', 'eurasian'],
  ['lynx', 'iberian'],
];

for (const [id, variant] of cases) {
  const animal = await createAnimal(id, { seed: 7, variant, quality: 'low', worker: false });
  try {
    if (animal.params.variant !== variant) {
      throw new Error(`${id} requested ${variant}, got ${animal.params.variant}`);
    }
    if (!(animal.stats.vertices > 0) || !(animal.stats.bones > 0)) {
      throw new Error(`${id} ${variant}: empty rig/mesh`);
    }
    const speed = animal.gears.walk ?? 0.3;
    animal.move({ speed, heading: 0.5 });
    for (let i = 0; i < 60; i++) animal.update(1 / 60);
    if (![animal.position.x, animal.position.y, animal.position.z, animal.heading]
      .every(Number.isFinite)) {
      throw new Error(`${id} ${variant}: invalid motion state`);
    }
    for (const bone of animal.render.skeleton.bones) {
      if (!bone.matrixWorld.elements.every(Number.isFinite)) {
        throw new Error(`${id} ${variant}: invalid matrix in ${bone.name}`);
      }
    }
    console.log(`PASS ${id} ${variant}: ${animal.stats.vertices} vertices, ${animal.stats.bones} bones`);
  } finally {
    animal.dispose();
  }
}
