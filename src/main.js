// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import vueCookie from 'vue-cookies'
Vue.prototype.$axios = axios;
//公用组件导入
import Header from './components/Header'
import Paneldata from './components/Paneldata'
import PaneldataCgw from './components/Paneldata-cgw'
import PaneldataOnlineList from './components/Paneldata-OnlineList'
import PaneldataGrid from './components/Paneldata-grid'
import Progress from './components/progress'
import MapHandle from './map/controls/MapHandle'
//引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
Vue.use(vueCookie)
//inconfont字体css
import './assets/font/iconfont.css'
//公共组件全局注册
Vue.component('v-header', Header);
Vue.component('v-paneldata', Paneldata);
Vue.component('v-paneldatcgw', PaneldataCgw);
Vue.component('v-paneldatycy', PaneldataOnlineList);
Vue.component('v-Paneldagrid', PaneldataGrid);
Vue.component('v-progress', Progress);
Vue.component('map-handle', MapHandle);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
