// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Field,Image,Toast,Row, Col,Tabbar, TabbarItem,Swipe,SwipeItem,Overlay  } from 'vant';
import 'vant/lib/index.css'
import "./assets/public/public-flex.css"
import './assets/index.css'
Vue.use(VueAxios, axios)
Vue.use(Field).use(Image).use(Toast).use(Row).use(Col).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem ).use(Overlay)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  mounted() {
    //得到手机屏幕的宽度
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//得到html的Dom元素
let htmlDom = document.getElementsByTagName('html')[0];
//设置根元素字体大小
htmlDom.style.fontSize= htmlWidth/20 + 'px';
  },
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
