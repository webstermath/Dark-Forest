
import {getMapCellIcon, getMapLengthX} from '/Map/main.js';

var PLAYER;



export function initializePlayer(level = 1, x = 0, y = 0, path = []){
  const style = {color: 'white'};
  const type = 'player';
  const player =  {icon: 'D', level, x, y, style, type, path}
  setPlayer(player);
}

function setPlayer(player){
  PLAYER = player;
}

function updatePlayer(update){
 Object.assign(PLAYER, update);
}


export function getPlayer(){
  return R.clone(PLAYER);
}

export function getPlayerProp(key){
  return R.clone(PLAYER[key])
}

export function setPlayerXY(XY){
 updatePlayer({x: XY[0], y: XY[1]})
}



export function getPlayerX(){
  return getPlayerProp('x')
  
}

export function getPlayerY(){
  return getPlayerProp('y')
  
}

export function getPlayerXY(){
 return [getPlayerProp('x'), getPlayerProp('y')];
}

export function getPlayerPath(){
  return R.clone(getPlayerProp('path'))
  
}


export function resetPlayerPath(){
  return updatePlayer({'path': []})
}
function addMoveToPlayerPath(move){
   PLAYER.path.push(move);
}


export function incPlayerLevel(inc = 1){
 return updatePlayer({'level': getPlayerLevel() + inc})
}

export function levelUpPlayer(){
 return incPlayerLevel()
}

export function getPlayerLevel(){
 return getPlayerProp('level')
}

export function getPlayerIcon(){
 return getPlayerProp('icon')
}

export function getPlayerStyle(){
 return getPlayerProp('style')
}

export function getPlayerType(){
 return getPlayerProp('type')
}

export function isPlayerAtEnd(){
 return  getPlayerX() >= getMapLengthX() - 1;
  
}

export function isPlayerInRiver(){
  return getMapCellIcon(...getPlayerXY()) === '≈';
  
}

// redo

function movePlayer(x,y){
 const [playerX, playerY] = getPlayerXY();
 const moveX = playerX + x;
 const moveY = playerY + y;
 const movePos = getMapCellIcon(moveX, moveY);
 if(!' /,+≈'.includes(movePos)) return;
 addMoveToPlayerPath({x:moveX, y:moveY})
 setPlayerXY([moveX,moveY]);
}

export function movePlayerRight(){
 movePlayer(1,0)
}

export function movePlayerLeft(){
 movePlayer(-1,0)
}

export function movePlayerDown(){
 movePlayer(0,1)
}

export function movePlayerUp(){
 movePlayer(0,-1)
}