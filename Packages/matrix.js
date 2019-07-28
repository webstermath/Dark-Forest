
//[Boolean, ...] -> Boolean
const anyTrue = R.any(R.equals(true))

//number -> Boolean
const lt0 = R.flip(R.lt)(0);

//number -> Boolean
const eq0 = R.equals(0);

//pair -> number
const getX = R.nth(0);

//pair -> number
const getY = R.nth(1);

// matrix -> number
export const getLenX = R.o(R.length,R.head);

// matrix -> number
export const getLenY = R.length;

//matrix -> pair -> Boolean
const isOutsideLeft = R.curryN(2, (matrix, xy) => R.o(lt0,getX)(xy))

// matrix -> pair -> Boolean
const isOutsideTop = R.curryN(2, (matrix, xy) => R.o(lt0,getY)(xy));

// matrix -> pair -> Boolean
const isOutsideRight = R.useWith(R.flip(R.gte),[getLenX,getX])

// matrix -> pair -> Boolean
const isOutsideBottom = R.useWith(R.flip(R.gte),[getLenY,getY])

// matrix -> pair -> Boolean
export const isOutside = R.curryN(2, R.converge(R.unapply(anyTrue), [isOutsideLeft, isOutsideTop, isOutsideRight, isOutsideBottom]))

// matrix -> pair -> Boolean
export const isInside = R.complement(isOutside)

//matrix => pair -> Boolean
const isOnLeftBorderLine = R.curryN(2, (matrix, xy) => R.compose(eq0,getX)(xy));

//matric -> pair -> Boolean
const isOnTopBorderLine = R.curryN(2, (matrix, xy) => R.compose(eq0,getY)(xy));

// matrix -> pair -> Boolean
const isOnRightBorderLine = R.useWith(R.equals,[R.o(R.add(-1),getLenX),getX]);

// matrix -> pair -> Boolean
const isOnBottomBorderLine = R.useWith(R.equals,[R.o(R.add(-1),getLenY),getY]);

// matrix -> pair -> Boolean
const isOnBorderLine = R.curryN(2, R.converge(R.unapply(anyTrue), [isOnLeftBorderLine, isOnTopBorderLine, isOnRightBorderLine, isOnBottomBorderLine]));

// matrix -> pair -> Boolean
export const isOnBorder = R.curryN(2, R.converge(R.and,[isOnBorderLine, isInside]));

export function getMatrixCell(matrix ,x ,y){
 return matrix[y][x];
}

export function setMatrixCell(matrix, x, y, val){
 matrix[y][x] = val;
 return matrix;
}

export function isMatrixCellEq(matrix, x, y, val){
 return matrix[y][x] === val;
}

export function getMatrixDims(matrix){
 return [matrix[0].length, matrix.length]
}

export function addVectors(a,b){
 return [+a[0] + +b[0], +a[1] + +b[1]];
}

export const Matrix = {
 isInside,
 isOutside, isOutsideLeft, isOutsideRight, isOutsideTop, isOutsideBottom,
 isOnBorderLine, isOnLeftBorderLine, isOnRightBorderLine, isOnTopBorderLine, isOnBottomBorderLine,
 isOnBorder,
 getMatrixCell, setMatrixCell, isMatrixCellEq, getMatrixDims,
 addVectors
}