import {sleep} from './Packages/utilities.js';

import {getLenY} from './Packages/matrix.js';

import {initializeMap,getMap,getMapLengthY} from './Map/main.js';
import {initializePlayer, getPlayerLevel, getPlayerX, setPlayerXY, isPlayerAtEnd, levelUpPlayer,
 resetPlayerPath,isPlayerInDarkness, isPlayerInRiver,isPlayerOtherConflict,getPlayerPath} from './player.js';
import {initializeOthers, getVisibleOthers, moveOthers} from "./others.js";
import {initializeDarkness, getNewDarknessColumn} from './darkness.js'
import {playerMoved, spacePressed} from './input.js';

import {initializePalette} from  './Map/colorList.js'

import {getCantoLength,getStanza,getStanzaLength,getStanzaWordCount, getStanzaTotal} from './Canto/main.js'

import {initializeDisplay, displayPlayer,displayOthers,
setDisplayMessage, setGameOverMessage, setDisplayInstruction, addDarknessColumn, darken, sepiafy, brightenPath} from './display.js';

const {floor} = Math;


$(document).ready(() => init());

async function init(level = 40){
 initializePlayer(level);
 initializePalette(getStanzaTotal());
 start()
}

async function start(){
 resetPlayerPath();
 const level = getPlayerLevel();
 const map = initializeMap(level ,getStanzaLength(level-1) + 4,getStanzaWordCount(level-1));
 initializeOthers(level);
 initializeDarkness(level,  getStanzaTotal())
 setPlayerXY([1,floor(getMapLengthY() / 2)])
 initializeDisplay(map, 'Stanza '+level,'');
 displayPlayer();
 displayOthers(getVisibleOthers());
 runLoop(R.slice(0,R.__,getStanza(level-1)));
}



async function runLoop(getStanzaSlice){
   await playerMoved();
   moveOthers();
   setDisplayMessage(getStanzaSlice(getPlayerX()))
   displayPlayer();
   displayOthers(getVisibleOthers());
   const darkX = getNewDarknessColumn();
   if(darkX !== null) addDarknessColumn(darkX);
   const finish = checkForFinished();
   if(finish) finish()
   else runLoop(getStanzaSlice);
}

function checkForFinished(){
  if(isPlayerAtEnd()) return levelUp;
  
  if(isPlayerInDarkness()) return gameOver.bind(this, 'Darkness has overcome you. The end.');
  //TODO
  // - add ends below:
   if(isPlayerInRiver()) return gameOver.bind(this, 'You have fallen into a deep dark river. The end.');
  const {icon:otherIcon} = isPlayerOtherConflict() || {};
  if(otherIcon === 'P') return gameOver.bind(this, 'A panther, a spotted panther, a leopard even, hath overtaken thee.  The end.');
  if(otherIcon === 'L') return gameOver.bind(this, 'A lion hath slain thee.  The end.');
  if(otherIcon === 'W') return gameOver.bind(this, 'A wolf, a she-wolf,  hath made a spoil of thee.  The end.');

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
  await darken(4000, 8);
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