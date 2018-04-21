export function time_minute(time){
  let minute = parseInt(time/60);
  let second = parseInt(time%60);
  let str_minute = minute < 10 ? ("0"+minute) : minute;
  let str_second = second < 10 ? ("0"+second) : second;
  return str_minute + ":" + str_second;
}
