import {sleep} from './Packages/utilities.js';
import {$$} from './Packages/$$.js';

import {getMapCell} from './Map/main.js';
import {getPlayer} from './player.js';


export function initializeDisplay(map, caption = '', message ='', instruction=''){
 const $container = $$('div').addClass('display')
 const $displayMap = getTable(map,caption).render();
 const $message = $$('pre').addClass('display__message').text(message);
 const $instruction = $$('p').addClass('display__instruction').addClass('blinking').text(instruction);
 //RENDER
 function render(){
   return $container
   .append($displayMap)
   .append($message)
   .append($instruction)
 }
 
 $('#dark-forest').html(render());
}


// display map [[{item,color, backgroundColor} ,...],...]
function getTable(map, caption){
  
  //ELEMENTS
  const $container = $$('table').addClass('display__table');
  const $body = $$('tbody').addClass('display__table-body')
  const $caption = $$('caption').addClass('display__caption').text(caption);
  
  const $rows = R.map(getRow)(map);
  
  //RENDER
  function render(){
    return $container
    .append($caption)
     .append($body.append($rows))
     
  }
  
  //EXPOSE
  return {render}
  
}

function getRow(row){
  const $row = $$('tr')
  const $cells = R.map(getCell)(row)
  
  return $row.append($cells)
  
}

function getCell({icon, style, x,y, type}){
  const point = {'data-x': x, 'data-y': y}
  return $$('td').text(icon).attr(point).attr({'data-type': type}).css(style);
}


function setDisplayCell({icon, style={}, type,x,y}){
  $(`.display__table [data-x="${x}"][data-y="${y}"]`).text(icon).attr({'data-type': type}).css(style)
}

function resetDisplayCell(x,y){
  setDisplayCell(getMapCell(x,y))
}

function getCellFromXY(x,y){
  return $(`.display__table [data-x="${x}"][data-y="${y}"]`)
}


export function displayPlayer(){
  const playerCell = document.querySelector('.display__table [data-type="player"]');
  if(playerCell){
    const cellData = playerCell.dataset;
    resetDisplayCell(cellData.x,cellData.y)
  }
  setDisplayCell(getPlayer());
}

export function displayVirgil(virgil){
  if(!virgil) return;
  const virgilCell = document.querySelector('.display__table [data-type="virgil"]');
  if(virgilCell){
    const cellData = virgilCell.dataset;
    resetDisplayCell(cellData.x,cellData.y)
  }
  setDisplayCell(virgil);
}

export function displayOthers(others){
  const otherCells = document.querySelectorAll('.display__table [data-type="other"]');
  if(otherCells.length){
    [...otherCells].forEach(function(otherCell){
      const cellData = otherCell.dataset;
      resetDisplayCell(cellData.x,cellData.y)
    });

  }
  others.forEach(function(other){
    setDisplayCell(other);
  })
  
}

export function setDisplayMessage(msg){
  $('.display__message').text(msg)
}

export function setGameOverMessage(msg){
  $('.display__message').addClass('game-over-message').text(msg)
}


export function setDisplayInstruction(msg){
  $('.display__instruction').text(msg)
}

export function addDarknessColumn(x){
  $(`.display__table [data-x="${x}"]`).each(function(i,el){
    $(el).addClass('darkness');
  });
}

export async function pulse(duration = 2000, speed = 3){
  const start = Date.now();
  while(Date.now() - start < duration){
    $('.display__table-body').toggleClass('pulse');
    await sleep(1000 / speed);
  }
  $('.display__table-body').removeClass('pulse')
}

export async function darken(duration = 2000, speed = 3){
  const start = Date.now();
  let brightness = 1;
  while(Date.now() - start < duration){
    $('.display__table-body').css('filter',`brightness(${brightness *= .9})`)
    await sleep(1000 / speed);
  }
}

export async function sepiafy(speed = 3){
  let sepia = 0;
  while(sepia < 1){
    $('.display__table-body').css('filter',`sepia(${sepia += 0.1})`)
    await sleep(1000 / speed);
  }
}

export async function brightenPath(path){
  const cells = R.map(R.o(R.apply(getCellFromXY),R.props(['x', 'y'])))(R.reverse(path));
  while(cells.length){
    cells.pop().addClass('brighten');
    await sleep(40)
  }
}


// TODO
// add sprite class and player class to sprites
