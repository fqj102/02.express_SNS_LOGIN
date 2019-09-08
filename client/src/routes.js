import Vue from 'vue';
import VueRouter from 'vue-router'

import mainPage from './views/mainPage'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/home',
    },
    {
      path:'/home',
      component:mainPage,
    }
  ]
})