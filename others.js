import {getMapCellIcon, getMapLengthX, getMapLengthY, isOutsideMap} from './Map/main.js';
import {getRandMove, getRandN} from './Packages/utilities.js';
import {addVectors} from './Packages/matrix.js';
const {ceil, floor, min, max, random} = Math;

const log = R.tap(console.log)

const OTHERS = [];

const PROPS ={
  P:{
    m:"†|/",
    style: {
     color: 'black'
    }
  },
  L:{
    m:"†|/,",
    style: {
     color: 'gold'
    }
  },
  W:{
    m:"†|/, ",
    style: {
     color: 'gray'
    }
  }
  
}




// move others
export function moveOthers(){
 OTHERS.forEach(function(other, i){
   if(getRandN(10) === 1) return;
   const newXY = getMove(other);
   if(isNoOtherConflict(...newXY, getOtherM(other), i)) setOtherXY(other, ...newXY);
 });
 return getVisibleOthers();
}

export function deleteOtherAtXY(x,y){
  const ind = R.findIndex(R.whereEq({x,y}))(OTHERS);
  if(ind === -1) return false;
  OTHERS.splice(ind, 1);
  return true;
}

function getMove(other){
return  addVectors(getRandMove(),getOtherXY(other))
}

function isOtherConflict(x,y,m, ind){
  return R.cond([
    [isOtherOutsideMap, R.T],
    [isOtherCellNotAllowed, R.T],
    [isSpriteOtherConflict, R.T]
  ])({x,y, m, ind})
}

const isNoOtherConflict = R.complement(isOtherConflict);


function getOtherM({icon}={}){
  return PROPS[icon].m
  
}

function getOtherMapIcon({x,y}={}){
  return getMapCellIcon(x,y);
}

function setOtherXY(other, x, y){
   other.x = x;
   other.y = y;
}

function getOtherXY(other){
  return [other.x, other.y];
  
}
//object -> boolean
//{x,y,[ind]} -> boolean
const getOthersWithoutInd = R.ifElse(R.has('ind'), R.o(R.remove(R.__,1,OTHERS),R.prop('ind')), R.always(OTHERS));

//object -> boolean
//{x,y} -> boolean
const isOtherOutsideMap = R.o(R.apply(isOutsideMap),getOtherXY)

//object -> boolean
//{x,y} -> boolean
const isOtherCellAllowed =  R.converge(R.includes,[getOtherMapIcon,R.prop('m')]);

//object -> boolean
//{x,y} -> boolean
const isOtherCellNotAllowed =  R.complement(isOtherCellAllowed);

//object -> boolean
//{x,y} -> booleand
const isSpriteOtherConflict =  R.converge(R.any,[R.o(R.whereEq,R.pick(['x','y'])),getOthersWithoutInd]);

export function getOtherAtXY(x,y){
  return R.find(R.whereEq({x,y}))(OTHERS);
}


function getVisibleOthers(){
  return R.filter(
    R.o(R.complement(R.equals)(R.identity('†')),R.o(R.apply(getMapCellIcon),R.props(['x','y'])))
  )(OTHERS);
}

export function initializeOthers(level){
  OTHERS.length = 0;
  OTHERS.push(...R.map(generateOther)(getOtherIconList(level)))
  return getVisibleOthers()
}

function generateOther(icon){
  const {m,style} = PROPS[icon];
  return Object.assign({icon}, generateOtherXY(m),{style},{type: 'other'});
}

function getOtherIconList(level){
  return R.compose(
    R.flatten,
    R.map(R.apply(R.curry(listOther)(level))),
    )([['P',11,5], ['L',15,7],['W',17,9]]);
}


function listOther(level, icon, startLevel, repeat){
  return Array(max(0, ceil((level - startLevel + 1)/3))).fill(icon);
}



function generateOtherXY(m){
  var result;
  const xMin = floor(getMapLengthX()/5);
  const xRange = floor(getMapLengthX() * 4 / 5) - 2;
  const yMin = 1;
  const yRange = getMapLengthY() - 2;
  let i=0;
  while(!result){
    
    let x = xMin + floor(xRange * random());
    let y = yMin + floor(yRange * random());
    if(R.includes(getMapCellIcon(x,y), m)) continue;
    if(R.any(R.eqProps(['x','y'])({x,y}))(OTHERS)) continue;
    result = {x,y}
  }
  
  return result;
}




/*TODO

- all others
- invisible in tree

- panther
-- only move in tree dead tree and tall grass

-lion

-- cannot not move on plain

- wolf
--can move everywhere except flower

*/