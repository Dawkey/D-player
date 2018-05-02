export default class class_singer {
  constructor(data) {
    this.name = data.topTitle;
    this.id = data.id;
    this.url = data.picUrl;
    this.hot = hot_change(data.listenCount);
    this.songs = data.songList;
  }
}

function hot_change(hot){
  if(hot < 10000){
    return;
  }
  let change_num = Math.ceil(hot / 1000);
  let change_str = change_num / 10 + "万";
  return change_str;
}
