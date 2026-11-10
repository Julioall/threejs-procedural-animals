// Species-specific European bird plumage on the existing crow coat pipeline.
import { europeanBirdCoat, europeanBirdFeathers } from '../_european/birdPalette.js';
const PALETTES = {
  "male": {
    "body": 9332288,
    "breast": 12034699,
    "head": 7692370,
    "throat": 7225394,
    "wing": 7427387,
    "tail": 6309937,
    "bill": 4471345,
    "legs": 9269349
  },
  "female": {
    "body": 8941914,
    "breast": 12758929,
    "head": 9665637,
    "throat": 12957342,
    "wing": 7693134,
    "tail": 6640446,
    "bill": 8089695,
    "legs": 10190962
  }
};
export const sparrowPalette = (p) => PALETTES[p.variant] || PALETTES[Object.keys(PALETTES)[0]];
export const sparrowCoat = (ctx) => europeanBirdCoat(ctx, sparrowPalette(ctx.params), 'sparrow');
export const sparrowFeathers = (params) => europeanBirdFeathers(sparrowPalette(params));
