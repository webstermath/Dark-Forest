import {sleep} from './Packages/utilities.js';

import {getLenY} from './Packages/matrix.js';

import {initializeMap,getMap,getMapLengthY} from './Map/main.js';
import {initializePlayer, getPlayerLevel, getPlayerX, setPlayerXY, isPlayerAtEnd, levelUpPlayer,
 resetPlayerPath, isPlayerInRiver,getPlayerPath} from './player.js';
import {initializeDarkness, getNewDarknessColumn, isPlayerInDarkness} from './darkness.js'
import {playerMoved, spacePressed} from './input.js';

import {initializePalette} from  './Map/colorList.js'

import {getCantoLength,getStanza,getStanzaLength,getStanzaWordCount, getStanzaTotal} from './Canto/main.js'

import {initializeDisplay, displayPlayer, setDisplayMessage, setGameOverMessage, setDisplayInstruction, addDarknessColumn, darken, sepiafy, brightenPath} from './display.js';

const {floor} = Math;


$(document).ready(() => init());

async function init(level = 1){
 initializePlayer(level);
 initializePalette(getStanzaTotal());
 start()
}

async function start(){
 resetPlayerPath();
 const level = getPlayerLevel();
 const map = initializeMap(level ,getStanzaLength(level-1) + 4,getStanzaWordCount(level-1));
 initializeDarkness(level,  getStanzaTotal())
 setPlayerXY([1,floor(getMapLengthY() / 2)])
 initializeDisplay(map, 'Stanza '+level,'');
 displayPlayer();
 runLoop(R.slice(0,R.__,getStanza(level-1)));
}



async function runLoop(getStanzaSlice){
   await playerMoved()
   setDisplayMessage(getStanzaSlice(getPlayerX()))
   displayPlayer();
   const darkX = getNewDarknessColumn();
   if(darkX !== null) addDarknessColumn(darkX);
   const finish = checkForFinished();
   if(finish) finish();
   else runLoop(getStanzaSlice);
}

function checkForFinished(){
  if(isPlayerAtEnd()) return levelUp;
  
  if(isPlayerInDarkness()) return gameOver.bind(this, 'Darkness has overcome you. The end.');
  //TODO
  // - add ends below:
   if(isPlayerInRiver()) return gameOver.bind(this, 'You have fallen into a deep dark river. The end.');
  // const other = isCollidedWithOther();
  // if(other === 'panther') return gameOver.bind(this, 'A panther, a spotted panther, a leopard even, has overtaken you.  The end.');
  // if(other === 'lion') return gameOver.bind(this, 'A lion has slain you.  The end.');
  // if(other === 'wolf') return gameOver.bind(this, 'A wolf, a she-wolf,  has made a spoil of you.  The end.');

  return false;
}



async function levelUp(){
  await brightenPath(getPlayerPath());
  if(getPlayerLevel() === 46) return gameEnd();
  await instructToPressSpaceBar()
  levelUpPlayer()
  start()
}

async function gameOver(msg){
  setGameOverMessage(msg)
  await darken(4000, 8)
  await instructToPressSpaceBar()
  //await sleep(3 * 1000)
  start()
}

async function gameEnd(){
  setDisplayMessage('End of Canto I')
  sepiafy()
}

async function instructToPressSpaceBar(){
  setDisplayInstruction('Press Spacebar')
  await spacePressed();
  setDisplayInstruction('');
}
  
  
  
/* TODO

- add press space bar meesage at end


- in map nake path object which uses x as keys of sets of ys
- give to virgil to follow path back




*/