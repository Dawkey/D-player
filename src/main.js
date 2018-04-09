import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import fastclick from 'fastclick'

import "common/stylus/base.styl"

fastclick.attach(document.body)


new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
