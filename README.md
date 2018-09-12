## vue.js搭建的音乐播放器(移动端)

*预览地址:*  
[https://music.dawkey.top](https://music.dawkey.top)

*详细介绍:*  
[https://dawkey.top/article/10](https://dawkey.top/article/10)

### 注:
* 使用了`swiper`做相关轮播图,故pc端通过浏览器打开时,进入手机模式后需刷新一遍,以完成`swiper`的重新配置;
* 目前移动端个人只做了个人手机上的chrome浏览器兼容,iphone上稍微测试了一下,表现很糟糕,其他浏览器应该也或多或少有兼容性问题;
* 本播放器更多是参照[@ustbhuangyi](https://github.com/ustbhuangyi)老师的音乐播放器进行的编写,作为初学`vue`的一个练手吧(当然有许多地方是很不同的)

### 1. 音乐源:
QQ音乐,主要通过`jsonp`跨域请求,必要时通过`axios`伪造`referer`获取数据.

### 2. 主要用到的库:
* `swiper`:轮播图;
* `gsap`:js动画;
* `jsonp`:对jsonp的封装;
* `axios`:ajax请求和对头文件的伪造;

### 3. 功能:
**歌曲的播放,暂停,切换**,具体查看[预览地址](https://music.dawkey.top).

### 4. 其他:
* 滚动使用的是浏览器本身的滚动;
* 音频文件接口获取(audio地址):先根据歌曲`id`取得`vkey`数据,根据`id`和`vkey`拼凑出audio地址.
