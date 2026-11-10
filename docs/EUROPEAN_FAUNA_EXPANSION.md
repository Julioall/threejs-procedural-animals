# European Fauna Expansion — 20 species

This feature branch expands the library from **24 to 44** procedural species. All species are built with the original SDF sculpt, skeletal skinning, feather/fur/scale coats, and existing quadruped/bird movement plans. No new physics, crowd simulation, ecosystem runtime, pathfinding, or core movement engine was added.

## Catalog

| Species | ID | Base body plan | Status |
| --- | --- | --- | --- |
| European blackbird | `blackbird` | crow bird | Implemented |
| Eurasian lynx | `lynx` | cat quadruped | Implemented |
| Red squirrel | `squirrel` | rat quadruped | Implemented |
| Eurasian beaver | `beaver` | rat quadruped | Implemented |
| European badger | `badger` | bear quadruped | Implemented |
| European bison | `bison` | cow quadruped | Implemented |
| European moose | `moose` | deer quadruped | Implemented |
| Pine marten | `marten` | fox quadruped | Implemented |
| House sparrow | `sparrow` | blackbird bird | Implemented |
| Rock pigeon | `pigeon` | crow bird | Implemented |
| European herring gull | `gull` | crow bird | Implemented |
| Tawny owl | `owl` | crow bird | Implemented |
| Alpine marmot | `marmot` | rat quadruped | Implemented |
| Least weasel | `weasel` | fox quadruped | Implemented |
| Reindeer | `reindeer` | deer quadruped | Implemented |
| Alpine ibex | `ibex` | goat quadruped | Implemented |
| European robin | `robin` | blackbird bird | Implemented |
| Grey heron | `heron` | crow bird | Implemented |
| European green lizard | `lizard` | rat quadruped, scaled coat | Implemented |
| Fire salamander | `salamander` | rat quadruped, wet skin | Implemented |

## Important limitations

These species are **first-pass procedural models**. Their rigs, actions, body topology, face and limb shapes, coat boundaries, motion plausibility, seed stability, and visual similarity to real species must be reviewed together in the next validation stage.

- `beaver`: currently terrestrial gait only; no swimming motor.
- `squirrel`: no novel tree-climbing action.
- `lizard` and `salamander`: derive from the current small quadruped rig, with mammalian facial/ear geometry removed, not a dedicated new reptile/amphibian engine.
- `owl` and `heron`: reuse bird-plan wing movement; species-specific flight dynamics and head/leg proportions require careful visual review.
- `moose` and `reindeer`: re-use cervid antler geometry; the shape and palmate characteristics require checking.
- `ibex`: horn geometry follows the existing caprine horn system.
- The earlier PRs #1 and #2 are included in this combined branch; merge this consolidated PR instead of merging all three independently.

## Validation planned for the next phase

```bash
npm ci
npm test -- blackbird lynx squirrel beaver badger bison moose marten sparrow pigeon gull owl marmot weasel reindeer ibex robin heron lizard salamander --quality low
node tools/metrics.mjs moose --quality low
node tools/render.mjs owl --views turntable,gaits,face,actions,tiers
```

Continue with all 20 species: compare geometry at each quality, evaluate silhouettes/eyes/snout/beaks/wings/tails, test representative seeds and juvenile variants, verify action animations and fix any gaps before release.
