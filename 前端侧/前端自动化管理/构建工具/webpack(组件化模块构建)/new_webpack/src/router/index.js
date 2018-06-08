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
          component: () => import(`@/views/${page.filePath}`),
          path: page.path,
          meta: page.meta
        })
      })
    }
    routes.push(
      {
        path: nav.path,
        component: Layout,
        redirect: nav.redirect,
        children
      }
    )

    
  });

  return routes
}



export let routes = registerRoute(navConfig);

routes = routes.concat(constantRouterMap)

console.log(routes, 'afafaa')
let router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router
