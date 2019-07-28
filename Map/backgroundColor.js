import {_} from '../Packages/utilities.js';


var MAP;

const {makeRandomizer} = _;
const {random} = Math;

export function initializeBackgroundColorMap(map, {bc}={}){
  const chosenColor = makeRandomizer(bc)(random());
  const result = R.map(R.map(R.always(chosenColor)))(map);
  setBackgroundColorMap(result)
  return result
}


function setBackgroundColorMap(data){
 MAP = data;
}

export function getBackgroundColorMap(){
 return R.clone(MAP);
}