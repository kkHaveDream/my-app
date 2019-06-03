//自己封装的 axios 插件
//导入 axios
import axios from 'axios'
//创建插件对象
var myaxios = {}
//添加 install 方法
myaxios.install = function (Vue) {
    //请求 login 不需要 Authorization 所以需要判断   使用拦截器
    axios.interceptors.request.use(function (config) {
        if (config.url !== 'login') {
            //统一设置token
            config.headers.common['Authorization'] = localStorage.getItem('token')
        }
        return config;
    });
    //统一设置请求API
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    //给 Vue 实例对象添加方法
    Vue.prototype.$http = axios
}
//将对象暴露出去
export default myaxios