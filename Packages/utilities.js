
const {ceil, floor,  max, min, random} = Math;


const eq0 = R.equals(0);
const sub1 = R.add(-1);
//n -> n -> n -> n
const between = (low,high) => R.both(R.lte(low),R.gte(high))

function getRandArrVal(arr){
 var i = floor(random()*arr.length);
 return arr[i];
}

function expandArraySelections(arr){
  return arr.reduce(function(acc,val,i){
   acc.push(R.isNull(val) ? acc[i-1] : val)
   return acc;
  },[])
}

export function getRandN(max){
 return ceil(random()*max);
}


export function getRandXY(lenX,lenY){
 return [getRandInt(lenX) - 1,getRandInt(lenY) - 1]
}

export function getRandMove(){
  var moves = [[1,0],[-1, 0],[0, 1],[0, -1]];
  return getRandArrVal(moves)
}

// obj -> n -> val
// cond object -> random number (0 < n < 1) -> condition val
const makeRandomizer = R.compose(
    R.converge(R.o, [R.o(R.cond, R.map(R.adjust(0, R.gte))), R.compose(R.multiply, R.head, R.last)]),
    R.apply(R.useWith(R.zip, [R.o(R.tail, R.scan(R.add, 0)), R.map(R.always)])),
    R.transpose,
    R.map(R.reverse),
    R.toPairs
   );

// object -> object -> n -> array
// evolve object -> starter object -> array length -> array of evolved objects
export const evolveRange  = R.curryN(3,R.compose(
  R.map(R.map(R.o(R.partial(Math.max, [0]), Math.floor))),
  R.useWith(R.scan, [R.evolve,R.identity,R.range(1)])
))

const isOnBorder = R.curry((lenX,lenY,x,y) => eq0(x) || eq0(y) || R.equals(sub1(lenX),x) || R.equals(sub1(lenY),y))

export const _ = {
 eq0, sub1,
 between,
 getRandArrVal, getRandN, getRandXY, getRandMove,
 expandArraySelections,
 makeRandomizer, evolveRange,
 isOnBorder
};

export function sleep(ms){
  return new Promise( res => setTimeout(() => res(), ms));
}

