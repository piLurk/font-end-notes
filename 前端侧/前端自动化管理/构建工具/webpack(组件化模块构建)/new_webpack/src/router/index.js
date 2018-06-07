import Vue from 'vue'
import navConfig from './route.config.json';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
/* Layout 基础布局父组件 */
import Layout from '@/views/layout/Layout'

const registerRoute = (navConfig) => {
  let route = [];
  let navs = navConfig;

  navs.forEach((nav, index) => {

    let children =[];
    if(nav.children) {
      nav.children.forEach( page => {
        children.push({
          name: page.name,
          component: Layout,
          path: page.path,
          meta: page.meta
        })
      })
    }
    route.push(
      {
        path: nav.path,
        component: Layout,
        redirect: nav.redirect,
        children: children
      }
    )

    
  });

  return route
}

let defaultPath = '/noticemgmt';

let route = registerRoute(navConfig);
route = route.concat([{
  path: '',
  redirect: defaultPath
}])

let router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  route
});
export default router
