// Species-specific European bird plumage on the existing crow coat pipeline.
import { europeanBirdCoat, europeanBirdFeathers } from '../_european/birdPalette.js';
const PALETTES = {
  "adult": {
    "body": 7759435,
    "breast": 11906198,
    "head": 7827802,
    "throat": 13391917,
    "wing": 6576706,
    "tail": 5261626,
    "bill": 3353900,
    "legs": 6837837
  },
  "juvenile": {
    "body": 8284754,
    "breast": 11706754,
    "head": 8024149,
    "throat": 9992793,
    "wing": 6641476,
    "tail": 4866355,
    "bill": 3945520,
    "legs": 6641225
  }
};
export const robinPalette = (p) => PALETTES[p.variant] || PALETTES[Object.keys(PALETTES)[0]];
export const robinCoat = (ctx) => europeanBirdCoat(ctx, robinPalette(ctx.params), 'robin');
export const robinFeathers = (params) => europeanBirdFeathers(robinPalette(params));
