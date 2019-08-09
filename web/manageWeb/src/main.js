// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Field,Sidebar,SidebarItem,Image,Toast,List,Row, Col,Pagination,Popup,Uploader } from 'vant';
import './assets/mobile.css'
import 'vant/lib/index.css';
import "./assets/public/public-flex.css"
Vue.use(Field).use(Sidebar).use(SidebarItem).use(Image).use(Toast).use(List).use(Row).use(Col).use(Pagination).use(Popup).use(Uploader);
Vue.use(VueAxios, axios)
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
