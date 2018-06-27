import Vue from 'vue'
import navConfig from './route.config.json';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
/* Layout 基础布局父组件 */
import Layout from '@/views/layout/Layout'

let defaultPath = '/noticemgmt';
//静态路由
export const constantRouterMap = [ 
  {
    path: '',
    redirect: defaultPath
  },{
    path: '/',
    redirect: defaultPath
  }
]
const registerRoute = (navConfig) => {
  let routes = [];
  let navs = navConfig;

  navs.forEach((nav, index) => {

    let children =[];
    if(nav.children) {
      nav.children.forEach( page => {
        children.push({
          name: page.name,
          title: nav.title,
          component: () => import(`@/views/${page.filePath}`),
          path: page.path,
          meta: page.meta,
          isSideBar: page.isSideBar
        })
      })
    }
    routes.push(
      {
        name: nav.name,
        title: nav.title,
        component: Layout,
        path: nav.path,
        meta: nav.meta,
        redirect: nav.redirect,
        isSideBar: nav.isSideBar,
        children
      }
    )

    
  });

  return routes
}

export let routes = registerRoute(navConfig);


let router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export default router
