// European blackbird shares the original bird gait/action engine and feather skeleton.
// The smaller body and stronger flapping cadence distinguish the flight style.
import { motion as crowMotion, WING as crowWing, FEATHERS } from '../crow/motion.js';
export { FEATHERS };
export const WING = {
  ...crowWing,
  flap: { ...crowWing.flap, freq: 5.7, amp: 105 },
  power: { ...crowWing.power, freq: 6.5, amp: 120 },
  glideShare: 0.08,
};
export const motion = {
  ...crowMotion,
  gears: { walk: 0.32, hop: 0.8, fly: 8 },
  maxSpeed: 12,
  wing: WING,
  flight: { ...crowMotion.flight, minSpeed: 4, cruise: 8, maxSpeed: 12, glideRatio: 6 },
};
