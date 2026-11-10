// Species-specific European bird plumage on the existing crow coat pipeline.
import { europeanBirdCoat, europeanBirdFeathers } from '../_european/birdPalette.js';
const PALETTES = {
  "adult": {
    "body": 15527141,
    "breast": 16119017,
    "head": 15921385,
    "throat": 15855849,
    "wing": 10397350,
    "tail": 16052712,
    "bill": 14203447,
    "legs": 14002841
  },
  "juvenile": {
    "body": 9799284,
    "breast": 11838612,
    "head": 10588030,
    "throat": 12431779,
    "wing": 8418662,
    "tail": 6642512,
    "bill": 5655614,
    "legs": 11967114
  }
};
export const gullPalette = (p) => PALETTES[p.variant] || PALETTES[Object.keys(PALETTES)[0]];
export const gullCoat = (ctx) => europeanBirdCoat(ctx, gullPalette(ctx.params), 'gull');
export const gullFeathers = (params) => europeanBirdFeathers(gullPalette(params));
