import {_} from '../Packages/utilities.js';
import {Matrix} from '../Packages/matrix.js';

const {min, max, floor, ceil, random} = Math;

const {between, eq0, sub1, getRandArrVal, expandArraySelections, isOnBorder} = _;
const {getMatrixCell, setMatrixCell, isMatrixCellEq} = Matrix;

var MAP;
var PATH = new Map();

const generateBorderCell = R.always('†');

const getCellChance = (minN, maxN, item) => [between(minN,maxN),R.always(item)];

const generateCell = (level =1) => {
 return R.cond([
   getCellChance(1, max(10, R.subtract(20,level)), ' '),
   getCellChance(11, max(20, R.subtract(40,level)), ','),
   getCellChance(41, max(41, R.subtract(61,ceil(level/2))), '/'),
   getCellChance(61, 71, '|'),
   getCellChance(95, 100, '+'),
   getCellChance(1, 100, '†')
 ])(ceil(100 * random()));
 }

const generatePath = (level =1) => {
 return R.cond([
   getCellChance(1, min(40, R.add(10,level)), ','),
   getCellChance(41, min(61, R.add(51,floor(level/3))), '/'),
   getCellChance(1, 100, ' '),
 ])(ceil(100 * random()));
 }


const generateRow = R.curryN(4, (level=1, lenX = 20, lenY = 20, y) => R.times(R.ifElse(isOnBorder(lenX,lenY,R.__,y),generateBorderCell, R.partial(generateCell,[level])))(lenX));

const generate = (lenX = 20, lenY = 20, level = 1) => R.times(generateRow(level)(lenX)(lenY))(lenY);


export function initializeIconMap(level=1,x=20,y=20){
 var map = generate(x,y,level);
 if(level > 5) map = drawRiver(map);
 map = drawPath(map,level);
 setItemMap(map)
 return map;
}

//REWRITE BELOW

export function getPathYs(x){
  if(!PATH.has(x)) return [];
  return Array.from(PATH.get(x)).sort();
}

function setPath(x,y){
  if(!PATH.has(x)) PATH.set(x, new Set())
  PATH.get(x).add(y)
}

function drawPath(map, level){
 var lenX = map[0].length;
 var lenY = map.length;
 let point = {x:1,y:Math.floor(lenY/2)};
 while(true){
  setMatrixCell(map,point.x,point.y, generatePath(level));
  setPath(point.x,point.y);
  if(point.x >= lenX - 1) break;
  point = getNewPathPoint(map, point, lenY);
  }
 return map;
}


function getNewPathPoint(map, point, lenY){
  var [left,right,up,down] = [{x:-1,y:0}, {x:1,y:0}, {x:0,y:-1}, {x:0,y:1}]
  var choices =[];
  if(point.x > 1) choices.push(left);
  choices.push(right,right);
  if(point.y > 1) choices.push(up);
  if(point.y < lenY - 2) choices.push(down);
  var choice = getRandArrVal(choices);
  point.x += choice.x;
  point.y += choice.y;
  return point
}

function drawRiver(map){
 const lenX = map[0].length;
 const lenY = map.length;
 let point = {x:Math.floor(lenX / 4 + lenX / 2 * random()),y:0};
 while(true){
  setMatrixCell(map,point.x,point.y, '≈');
  if(point.y >= lenY - 1) break;
  point =getNewRiverPoint(point, lenX);
  }
 return map;
}

function getNewRiverPoint(point, lenX){
  var [left,right,down] = [{x:-1,y:0}, {x:1,y:0}, {x:0,y:1}]
  var choices =[]
  if(point.x > 5) choices.push(left);
  if(point.x < lenX - 5) choices.push(right);
  choices.push(down, down);
  var choice = getRandArrVal(choices);
  point.x += choice.x;
  point.y += choice.y;
  return point
}

function setItemMap(data){
 MAP = data;
}

export function getIconMap(){
 return R.clone(MAP);
}
