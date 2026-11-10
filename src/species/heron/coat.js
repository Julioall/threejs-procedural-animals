// Species-specific European bird plumage on the existing crow coat pipeline.
import { europeanBirdCoat, europeanBirdFeathers } from '../_european/birdPalette.js';
const PALETTES = {
  "grey": {
    "body": 8950426,
    "breast": 11383468,
    "head": 14736848,
    "throat": 13948105,
    "wing": 7831432,
    "tail": 6579818,
    "bill": 12559467,
    "legs": 7038043
  }
};
export const heronPalette = (p) => PALETTES[p.variant] || PALETTES[Object.keys(PALETTES)[0]];
export const heronCoat = (ctx) => europeanBirdCoat(ctx, heronPalette(ctx.params), 'heron');
export const heronFeathers = (params) => europeanBirdFeathers(heronPalette(params));
