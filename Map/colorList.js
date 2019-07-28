
import {evolveRange} from '../Packages/utilities.js';

var PALETTE;

const starterPalette ={
    bc: {chocolate: 1000, olive: 200, darkolivegreen:14 , maroon: 5, darkslategray: -25},
    ",": {lawngreen: 120, lightseagreen: 100, seagreen: 5, darkseagreen: -40},
    "/": {goldenrod: 47, darkgoldenrod: -8},
    "|": {sienna: 47, brown: -10},
    "+": {yellow:1000, orange: -100, red: -500, violet: -800 , mediumvioletred:-2000},
    "†": {greenyellow: 120, limegreen: 0, forestgreen: -18, green: -20, darkgreen: -80},
    "≈": {blue: 50, mediumblue: -5, darkblue: -20},
    " ": {white:1}
}

const evolverPalette ={
    bc: {chocolate: R.multiply(0.7), olive: R.multiply(0.85), darkolivegreen:R.multiply(0.94), maroon: R.add(-0.1), darkslategray: R.add(1)},
    ",": {lawngreen: R.multiply(0.9), lightseagreen: R.multiply(0.95), seagreen: R.add(1), darkseagreen: R.add(4)},
    "/": {goldenrod: R.add(-1), darkgoldenrod: R.add(2)},
    "|": {sienna: R.add(-1), brown: R.add(2)},
    "+": {yellow: R.multiply(0.9), orange: R.add(20), red: R.add(50), violet: R.add(40), mediumvioletred:R.add(100)},
    "†": {greenyellow: R.multiply(0.9), limegreen: R.add(2), forestgreen: R.add(3), green: R.add(2), darkgreen: R.add(5)},
    "≈": {blue: R.add(-1), mediumblue: R.add(1), darkblue: R.add(2)},
    " ": {white:1}
}

export function initializePalette(lastLevel){
  PALETTE = R.compose(
    R.map(R.mergeAll),
    R.transpose,
    R.map(R.converge(R.map,[R.o(R.objOf,R.head), R.last])),
    R.toPairs,
    R.mergeWith(evolveRange(R.__, R.__, lastLevel))(evolverPalette)
    )(starterPalette)
  console.log({PALETTE})
  
}

export function getPaletteForLevel(level){
  return R.clone(PALETTE[level])
}
