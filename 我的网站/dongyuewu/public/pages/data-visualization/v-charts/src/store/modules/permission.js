// import { asyncRouterMap, constantRouterMap } from '@/router'

import { getToken, getHost } from '@/utils/auth';
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
  if (route.meta && route.meta.roles && route.meta.roles.length > 0) {
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
              dispatch("GenerateRoutes", { roles }, {root: true}).then(() => {
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
        // 无token
        location.href = getHost()
      }
    }

  }
}

export default permission
