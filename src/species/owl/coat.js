// Species-specific European bird plumage on the existing crow coat pipeline.
import { europeanBirdCoat, europeanBirdFeathers } from '../_european/birdPalette.js';
const PALETTES = {
  "rufous": {
    "body": 8939595,
    "breast": 12956046,
    "head": 9597007,
    "throat": 13680293,
    "wing": 7821373,
    "tail": 6966585,
    "bill": 13348199,
    "legs": 10918526
  },
  "grey": {
    "body": 8485488,
    "breast": 12761769,
    "head": 9339767,
    "throat": 13682093,
    "wing": 7827559,
    "tail": 6709592,
    "bill": 12428909,
    "legs": 11313802
  }
};
export const owlPalette = (p) => PALETTES[p.variant] || PALETTES[Object.keys(PALETTES)[0]];
export const owlCoat = (ctx) => europeanBirdCoat(ctx, owlPalette(ctx.params), 'owl');
export const owlFeathers = (params) => europeanBirdFeathers(owlPalette(params));
