import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import api from './api/index'
//导入登录路由守卫
import './router/permission'
//导入本地持久化
import './utils/localStorage'
Vue.prototype.$api = api;
//导入语言
import i18n from './lang/index'
//导入echarts
import * as echarts from 'echarts'
//使用echarts
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
