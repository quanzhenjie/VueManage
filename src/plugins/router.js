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
      path: '/Login',
      name: 'Login',
      title: "登录页面",
      component: () => import(/* webpackChunkName: "about" */ './../views/Login.vue')
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
    },
      /**********************DemoPages**************************/
    {
      path: '/FormBasic',
      name: 'FormBasic',
      title: "表单基础用法",
      component: () => import(/* webpackChunkName: "about" */ '../views/DemoPages/FormBasic.vue')
    },
    {
      path: '/FormAdvanced',
      name: 'FormAdvanced',
      title: "表单高级用法",
      component: () => import(/* webpackChunkName: "about" */ '../views/DemoPages/FormAdvanced.vue')
    },
  ]
})
