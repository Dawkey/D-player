export function hasClassName(el,className){
  let reg = new RegExp("(^|\\s)" + className + "($|\\s)");//这里要注意括号的位置.
  return reg.test(el.className);
}

export function addClassName(el,className){
  if(hasClassName(el,className)){
    return;
  }else{
    let array = el.className.split(" ");
    array.push(className);
    el.className = array.join(" ");
  }
}
