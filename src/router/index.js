import Vue from 'vue'
import Router from 'vue-router'

import UserElement from '../components/userElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'home'}}, //重定向,请求根目录 / 时,重定向到 /home
    { path: '/userElement', component: UserElement }, //element路由
    { path: '/login', name: 'login', component: Login },//登录路由
    { path: '/home', name: 'home', component: Home },//首页路由
  ]
})
