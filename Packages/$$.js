
const camelToKebab= (str) => str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());



export function $$(tag = 'div', attrs={}){

if(tag[0]==='_') return $('<input/>').attr('type',tag.slice(1)).attr(attrs);
return $(`<${tag}/>`,attrs);
}

$$.data = o => {
  return Object.keys(o).reduce((acc,key) => {
    acc['data-'+camelToKebab(key)]=o[key];
    return acc;
  },{})
 }
 
$$.dataAttr = name =>{
  return `[data-${camelToKebab(name)}]`
  }
