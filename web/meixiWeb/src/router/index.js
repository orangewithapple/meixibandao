import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/user'
import Index from '@/components/index'
import BusinessDetail from '@/components/businessDetail'
import Business from '@/components/businessLogo'
Vue.use(Router)

export default new Router({
  base:"/meixiweb/",
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
    },
    {
      path: '/Business',
      name: 'Business',
      component: Business
    },
    {
      path: '/BusinessDetail',
      name: 'BusinessDetail',
      component: BusinessDetail
    },
  ]
})
