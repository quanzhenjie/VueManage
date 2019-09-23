import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      title: "首页",
      component: () => import(/* webpackChunkName: "Home" */ './../views/Home.vue')
    },
    {
      path: '/logs',
      name: 'Logs',
      title: "日志",
      component: () => import(/* webpackChunkName: "about" */ './../views/Logs.vue')
    },
    {
      path: '/message',
      name: 'Message',
      title: "消息",
      component: () => import(/* webpackChunkName: "about" */ './../views/Message.vue')
    }
  ]
})
