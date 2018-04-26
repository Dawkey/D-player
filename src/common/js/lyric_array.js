class lyric {
  constructor(time,text) {
    this.time = time;
    this.text = text;
  }
};

export default function lyric_to_array(str){
  let reg = /\[\d{2}:\d{2}\.\d{2}\][^\[\]\n]+/g;
  let reg_array = str.match(reg);
  if(reg_array == null){
    return [];
  }
  let lyric_array = reg_array.map((value)=>{
    let split_array = value.split("]");
    let time_str = split_array[0];
    let array = time_str.split(/[\[:\.]/);

    let time = parseInt(array[1])*60000 + parseInt(array[2])*1000 + parseInt(array[3])*10;
    let text = split_array[1];
    if(text.indexOf("//") != -1){
      text = "";
    }
    return new lyric(time,text);
  });
  return lyric_array;
}
