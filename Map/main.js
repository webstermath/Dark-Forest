
import {getMatrixCell, isOutside} from '../Packages/matrix.js';
import {getPaletteForLevel} from './colorList.js';
import {initializeColorMap, getColorMap} from './color.js';
import {initializeBackgroundColorMap, getBackgroundColorMap} from './backgroundColor.js';
import {initializeIconMap, getIconMap} from './icon.js';

var MAP;


// ******* INitialize ******
export function initializeMap(level=1,x=20,y=20){
 const iconMap = initializeIconMap(level, x, y);
 const palette = getPaletteForLevel(level-1);
 const backgroundColorMap = initializeBackgroundColorMap(iconMap, palette);
 const colorMap = initializeColorMap(iconMap, palette);
 
 const map = iconMap.map(function(row, j){
   return row.map(function(icon, i){
     const type = 'open';
     const style = {color:colorMap[j][i], 'background-color': backgroundColorMap[j][i]}
     return {icon, style, x:i, y:j, type}
   });
 });
 
 setMap(map)
 return getMap();
}

// ******* Set ******
function setMap(data){
 MAP = data;
}

// ******* Get ******
export function getMap(){
 return R.clone(MAP);
}


export function getMapLengthY(){
  return MAP.length;
}

export function getMapLengthX(){
  return MAP[0].length;
}

export function getMapCellIcon(x,y){
  return getMatrixCell(MAP,x,y).icon
}

export function getMapCell(x,y){
  return R.clone(getMatrixCell(MAP,x,y))
}

export function isOutsideMap(x,y){
  return isOutside(MAP,[x,y])
  
}