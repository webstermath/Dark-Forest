import {getPlayerX, getPlayerLevel} from './player.js';
import {getMapLengthX} from './Map/main.js';
import {getPathYs} from './Map/icon.js';
import {getRandN, getRandArrVal} from './Packages/utilities.js'
import {deleteOtherAtXY} from './others.js'

var VIRGIL={
  type:"virgil",
  icon: 'V',
  style:{
    color: 'aqua'
  }
};


export function resetVirgil(){
  VIRGIL.x = 0;
  VIRGIL.y = 0;
}

export function moveVirgil(){
  const virgilRange = 10;
  if(getPlayerLevel() < 21) return;
  deleteOtherAtXY(...getVirgilXY());
  const mapLastIndexX = getMapLengthX() -1;
  if(getPlayerX() < getVirgilX() - 1) return;
  if(getVirgilX() >=  mapLastIndexX - virgilRange) return setVirgilXY(mapLastIndexX,getPathYs(mapLastIndexX)[0]);
  const x = getPlayerX() + getRandN(virgilRange) + 1;
  const y = getRandArrVal(getPathYs(x));
  deleteOtherAtXY(x,y);
  return setVirgilXY(x,y);

}

function getVirgil(){
   return R.clone(VIRGIL);
}

function getVirgilXY(){
   return [VIRGIL.x, VIRGIL.y]
}


function getVirgilX(){
   return VIRGIL.x;
}

function setVirgilXY(x,y){
  VIRGIL.x = x;
  VIRGIL.y = y;
  return getVirgil();
}
