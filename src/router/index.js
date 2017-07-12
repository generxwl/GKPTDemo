import Vue from 'vue'
import Router from 'vue-router'
//大页面模块
import Index from '@/views/one'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
