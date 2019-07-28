import {getPlayerX} from '/player.js';

var DARKNESS;

const {min, abs, floor} = Math;


export function initializeDarkness(level, lastLevel){
   DARKNESS = min(-6, -lastLevel + level);
}

export function getNewDarknessColumn(){
  DARKNESS++;
  const divided = DARKNESS / 2;
  const column = abs(floor(divided))
  return column === divided ? column : null;
  
  
}

export function isPlayerInDarkness(){
  return floor(DARKNESS/2) >= getPlayerX();
}