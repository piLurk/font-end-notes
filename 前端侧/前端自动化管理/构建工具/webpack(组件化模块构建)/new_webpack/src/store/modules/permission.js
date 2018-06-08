// import { asyncRouterMap, constantRouterMap } from '@/router'

const constantRouterMap =[];
// import { routes } from '@/router'

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

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters;
        
        accessedRouters = filterAsyncRouter(routes, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    addRoutes({ commit, state }) {
      router.addRoutes(state.addRouters)
    },
    routeInit({ commit, dispatch , state, getter }) {

      let token = state.token;
      if (token) {
        // determine if there has token
        /* has token*/
        if (getters.roles.length === 0) {
          // 判断当前用户是否已拉取完user_info信息
          dispatch("GetUserInfo")
            .then(res => {
              // 拉取user_info
              const roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']
              dispatch("GenerateRoutes", { roles }).then(() => {
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
