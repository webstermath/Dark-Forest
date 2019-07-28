import {movePlayerRight, movePlayerLeft, movePlayerUp, movePlayerDown} from '/player.js';


function getInputObj({key, keyCode, ctrlKey, shiftKey, altKey, code} = {}){
   return {key, keyCode, ctrlKey, shiftKey, altKey, code};
}

async function inputEvent(){
  const evtP = new Promise(resolve => $(document).one('keyup', resolve));
  return getInputObj(await evtP);
}


export async function playerMoved(){
 let move;
 while(!move){
  const evt = await inputEvent();
  if(evt.key.startsWith('Arrow')) move = evt.key.slice(5).toLowerCase();
 }
  if(move === 'left') movePlayerLeft();
  if(move === 'right') movePlayerRight();
  if(move === 'up') movePlayerUp();
  if(move === 'down') movePlayerDown();
}


export async function spacePressed(){
 while(true){
  let evt = await inputEvent();
  if(evt.key === ' ') break;
 }
 return true;
}


