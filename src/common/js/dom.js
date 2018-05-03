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

export function removeClassName(el,className){
  if(hasClassName(el,className)){
    let array = el.className.split(" ");
    let new_array = [];
    array.forEach((value)=>{
      if(value != className){
        new_array.push(value);
      }
    });
    el.className = new_array.join(" ");
  }
}
