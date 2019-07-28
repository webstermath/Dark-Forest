import {getCantoText} from './text.js';

var STANZAS = R.splitEvery(3,getCantoText())
console.log({STANZAS})

export function getCantoLine(n){
  return getCantoText()[Math.min(n, getLength()-1)];
}

export function getCantoLength(){
 return getCantoText().length;
}

export function getStanza(n){
  return STANZAS[n].join('\n');
}

export function getStanzaLength(n){
  return STANZAS[n].join('').length
  
}

export function getStanzaWordCount(n){
  return STANZAS[n].join(' ').split(' ').length
}

export function getStanzaTotal(){
  return STANZAS.length
}
