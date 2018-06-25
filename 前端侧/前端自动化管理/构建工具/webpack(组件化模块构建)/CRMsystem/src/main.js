import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限

// 自定义mini翻页组件
import MyPagination from './views/public/mypagination'
Vue.use(MyPagination)

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

// // 全局变量
// import utils from './utils'
// Vue.use(utils)
//全局过滤器
import filters from './filter'
Vue.use(filters)
Vue.prototype.host = process.env.BASE_API
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
