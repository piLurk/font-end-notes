import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth' // 验权

// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (getToken()) {
//     next()
//   } else {
//     store.dispatch('FedLogOut').then(() => {
//       Message.error('验证失败,请重新登录')
//     })
//   }
// })

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (!store.getters.userId) {
      store.dispatch('GetUserId').then(res => {
        if (res.code === 0) {
          var userId = res.data
          store.dispatch('VaildUser', { 'userId': userId }).then(res1 => {
            if (!res1) {
              Message({
                message: '请进行短信校验',
                type: 'warning',
                duration: 5 * 1000
              })
              next({ path: '/smsVerification' })
              // store.dispatch('SendVcode', { 'userId': userId }).then(res2 => {
              //   console.log(res2)
              //   if (res2 === 0) {
              //     next({ path: '/smsVerification' })
              //   }
              // })
            } else {
              store.dispatch('GetInfo').then(res => {
                const roles = store.getters.roles
                return store.dispatch('GenerateRoutes', { roles })
              }).then(() => {
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,replace: true so the navigation will not leave a history record
              })
            }
          })
        } else {
          location.href = process.env.BASE_API
        }
      }).catch(() => {
        // setInterval(() => {
        removeToken()
        location.href = process.env.BASE_API
        // }, 500)
      })
      // .then(res => {
      //   return store.dispatch('GetInfo')
      // }).then(res => {
      //   const roles = store.getters.roles
      //   return store.dispatch('GenerateRoutes', { roles })
      // }).then(() => {
      //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,replace: true so the navigation will not leave a history record
      // })
    } else {
      // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      if (hasPermission(store.getters.roles, to.meta.role)) {
        next()
      } else {
        // next({ path: '/dashboard', query: { noGoBack: true }})
        next({ path: '/404', query: { noGoBack: true }})
        // next('/dashboard')
        NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      }
      // 可删 ↑
    }
  } else {
    next()
    // if (whiteList.indexOf(to.path) !== -1) {
    //   next()
    // } else {
    //   next('/login')
    //   NProgress.done()
    // }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
