import {_} from '../Packages/utilities.js';


var MAP;

const {makeRandomizer} = _;
const {random} = Math;

export function initializeColorMap(map, palette){
 const randPalette = R.o(R.flip(R.prop), R.map(makeRandomizer))(palette)
 const result = R.map(R.map(R.converge(R.call, [randPalette, random])))(map)
 setColorMap(result)
 return result;
}


function setColorMap(data){
 MAP = data;
}

export function getColorMap(){
 return R.clone(MAP);
}
