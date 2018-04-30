export default class class_songlist{
  constructor(data) {
    this.id = data.dissid;
    this.name = data.dissname;
    this.url = data.imgurl;
    this.hot = hot_change(data.listennum);
    this.creator = data.creator.name;
  }
};

function hot_change(hot){
  if(hot < 10000){
    return;
  }
  let change_num = Math.ceil(hot / 1000);
  let change_str = change_num / 10 + "万";
  return change_str;
}
