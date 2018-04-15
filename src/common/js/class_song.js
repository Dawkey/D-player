export default class class_song {
  constructor(data) {
    this.name = data.songname;
    this.singer = data.singer.map((value)=>{
      return value.name;
    }).join("/");
    this.album = data.albumname;
    this.time = data.interval;
    this.time_minute = time_minute(data.interval);
    this.id = data.songmid;
  }
};

function time_minute(time){
  let minute = parseInt(time/60);
  let second = time%60;
  let str_minute = minute < 10 ? ("0"+minute) : minute;
  let str_second = second < 10 ? ("0"+second) : second;
  return str_minute + ":" + str_second;
}
