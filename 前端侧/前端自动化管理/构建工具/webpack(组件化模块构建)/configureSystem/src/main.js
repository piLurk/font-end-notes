
import Vue from 'vue'
// 路由配置
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import routes from './router.config'
const router = new VueRouter({
  mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {
    from.name ? next({ name:from.name }) : next('/')
  } else {
    next()
  }
})

import 'element-ui/lib/theme-default/index.css'
// //引入elementUI组件
import ElementUI from 'element-ui'
Vue.use(ElementUI)



//全局变量
import utils from './utils'
Vue.use(utils);

//全局指令
import directives from './directive/derectives';
directives(Vue);

import MyPagination from 'components/public/mypagination'
Vue.use(MyPagination);


// vuex配置
import store from './store/'


import App from './App.vue';
new Vue({
  el: '#app',
  router,
  store,

  render: h => h(App)
})
