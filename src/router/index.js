import Vue from 'vue'
import Router from 'vue-router'

import UserElement from '../components/userElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'
import Roles from '../components/roles/roles.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'home'}}, //重定向,请求根目录 / 时,重定向到 /home
    { path: '/userElement', component: UserElement }, //element路由
    { path: '/login', name: 'login', component: Login },//登录路由
    //给home添加子路由
    { path: '/home', name: 'home', component: Home,
  children: [
    { path: '/users', name: 'users', component: Users, },//home子路由users
    { path: '/rights', name: 'rights', component: Rights, },//home子路由rights
    { path: '/roles', name: 'roles', component: Roles, }//home子路由roles
  ] },//首页路由
  ]
})
