import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/user'
import Index from '@/components/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: User
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    }
  ]
})
