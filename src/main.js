// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//引入element
import ElementUi from 'element-ui'
//引入element样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import router from './router'
//引入 axios
import myaxios from './assets/js/myaxios'

//调用方法
Vue.use(ElementUi) 
Vue.use(myaxios) 


//引入全局样式
import './assets/css/index.css'


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
