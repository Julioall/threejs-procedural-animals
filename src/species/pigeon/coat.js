// Species-specific European bird plumage on the existing crow coat pipeline.
import { europeanBirdCoat, europeanBirdFeathers } from '../_european/birdPalette.js';
const PALETTES = {
  "blue": {
    "body": 9344668,
    "breast": 9146767,
    "head": 6647929,
    "throat": 4351071,
    "wing": 7897997,
    "tail": 5069152,
    "bill": 5327685,
    "legs": 11828084
  },
  "dark": {
    "body": 4804177,
    "breast": 5987937,
    "head": 4277836,
    "throat": 4217429,
    "wing": 3751234,
    "tail": 2698288,
    "bill": 5328456,
    "legs": 11302769
  }
};
export const pigeonPalette = (p) => PALETTES[p.variant] || PALETTES[Object.keys(PALETTES)[0]];
export const pigeonCoat = (ctx) => europeanBirdCoat(ctx, pigeonPalette(ctx.params), 'pigeon');
export const pigeonFeathers = (params) => europeanBirdFeathers(pigeonPalette(params));
