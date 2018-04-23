export function time_minute(time){
  let minute = parseInt(time/60);
  let second = parseInt(time%60);
  let str_minute = minute < 10 ? ("0"+minute) : minute;
  let str_second = second < 10 ? ("0"+second) : second;
  return str_minute + ":" + str_second;
}

export function shuffle(array){
  let _array = array.slice();
  for(let i = 0;i < _array.length;i++){
    let j = random(0,i);
    let item = _array[i];
    _array[i] = _array[j];
    _array[j] = item;
  }
  return _array;
}

function random(i,j){
  return i + Math.floor((Math.random() * (j - i + 1)));
}
