// import { asyncRouterMap, constantRouterMap } from '@/router'

import { getToken } from '@/utils/auth';
import { Message } from 'element-ui';
import { routes, constantRouterMap } from '@/router'

import router from '@/router'


const whiteList = ["/login", "/authredirect"]; // no redirect whitelist

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPathPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  // filter对原数组进行操作，同时对同一个数组进行操作是，要注意
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPathPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
        
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function filterSideBarRouter(routers) {
  const sideBarRouters = routers.filter(route => {
    if(route.isSideBar === true) {
      route.children = filterSideBarRouter(route.children || [])
      return true
    } else {
      return false
    }
  })
  return sideBarRouters
}

/**
 * routers 侧边栏
 * addRouters 所有动态路由（需要权限的路由）
 */
const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      // 避免addRouters routers生成过程相互影响,应该深度复制
      state.routers = filterSideBarRouter(JSON.parse(JSON.stringify(constantRouterMap.concat(routers))));
      console.log('state.routers', state.routers)  
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      console.log(data,'动态路由开始生成')
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters;
        accessedRouters = filterAsyncRouter(routes, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    addRoutes({ commit, state }) {
      console.log('路由开始添加')
      router.addRoutes(state.addRouters)

    },
    routeInit({ commit, dispatch, getters }) {

      
      let token = getToken();
      if (token) {
        // determine if there has token
        /* has token*/
        if (getters.roles.length === 0) {
          // 判断当前用户是否已拉取完user_info信息
          dispatch("GetUserInfo", null, {root: true})
            .then(res => {
              // 拉取user_info
              let roles = res.roles; // note: roles must be a array! such as: ['editor','develop']
              console.log('roles', roles)
              dispatch("GenerateRoutes", { roles }, {root: true}).then(() => {
                console.log('动态路由生成完毕')
                // 根据roles权限生成可访问的路由表
                dispatch("addRoutes");
              });
            })
            .catch(err => {
              dispatch("FedLogOut").then(() => {
                Message.error(err || "Verification failed, please login again");
              });
            });
        } else {
          // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
          // if (hasPermission(store.getters.roles, to.meta.roles)) {
  
          // } else {
          // }
          // 可删 ↑
        }
      } else {
        /* has no token*/
        // if (whiteList.indexOf(to.path) !== -1) {
        //   // 在免登录白名单，直接进入
        //   next();
        // } else {
        //   // location.href = BROWSER_CONFIG.BASE_API;
        //   // next('/login') // 否则全部重定向到登录页
        //   // NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        // }
      }
    }

  }
}

export default permission
