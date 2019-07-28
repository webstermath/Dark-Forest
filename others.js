import {import {getMapCellIcon, getMapLengthX, getMapLengthY} from '/Map/main.js';

const {ceil, floor, min, random} = Math;

const OTHERS = [];

const PROPS ={
  P:{
    m:"†|/"
  },
  L:{
    m:"†|/,"
  },
  L:{
    m:"†|/, "
    
  }
  
}

// move others



export function initializeOthers(level){
  Others.length = 0;
   Others.push(...R.map(generateOther)(getOtherIconList(level)))
}

function generateOther(icon){
  const other = PROPS[icon];
  return Object.assign({icon}, getOtherXY(other.m));
}

function getOtherIconList(level){
  return R.compose(
    R.flatten,
    R.map(R.apply(R.curry(listOther)(level))),
    )[['P',11,5], ['L',15,7],['W',17,9]];
}


function listOther(level, icon, startLevel, repeat){
  return Array(min(0, ceil((level - startLevel + 1)/3))).fill(icon);
}



function getOtherXY(m){
  var result;
  const xMin = floor(getMapLengthX()/4);
  const xRange = floor(getMapLengthX() * 3 / 4) - 2;
  const yMin = 1;
  const yRange = getMapLengthY() - 2;
  while(!result){
    let x = xMin + floor(xRange * random());
    let y = yMin + floor(yRange * random());
    if(!m.includes(getMapCellIcon(x,y))) continue;
    if(R.none(R.eqProps(['x','y'])({x,y}))OTHERS) continue;
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