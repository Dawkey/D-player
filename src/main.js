import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import "common/stylus/base.styl";

fastclick.attach(document.body);

// Vue.use(VueLazyLoad);
Vue.use(VueLazyLoad,{
  loading: "../static/img/default_page.jpg",
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
