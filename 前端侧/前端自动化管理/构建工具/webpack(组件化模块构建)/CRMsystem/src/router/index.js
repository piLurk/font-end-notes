import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/clue',
    component: Layout,
    meta: { permission: 'crm:renter', title: '线索' },
    children: [
      {
        path: 'index',
        name: 'clue',
        component: _import('clue/index'),
        meta: { title: '线索', icon: 'clue-icon' },
        id: 'clue'
      }
    ]
  },
  {
    path: '/clue',
    component: Layout,
    meta: { permission: 'crm:renter' },
    hidden: true,
    children: [
      {
        path: 'detail/:userId',
        name: 'clueTenantsDetail',
        component: _import('clue/detail'),
        meta: { title: '租客线索详情', icon: 'evaluation-icon' },
        id: 'clueTenantsDetail'
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    meta: { permission: 'crm:proprietor', title: '商机' },
    children: [
      {
        path: 'index',
        name: 'business',
        component: _import('business/index'),
        meta: { title: '商机', icon: 'business-icon' },
        id: 'business'
      }
    ]
  },
  {
    path: '/ownermanage',
    component: Layout,
    meta: { permission: 'crm:proprietorManager' },
    children: [
      {
        path: 'index',
        name: 'ownermanage',
        component: _import('ownermanage/index'),
        meta: { title: '业主管理', icon: 'ownermanage-icon' },
        id: 'ownermanage'
      }
    ]
  },
  {
    path: '/settarget',
    component: Layout,
    meta: { permission: 'crm:objective' },
    children: [
      {
        path: 'index',
        name: 'settarget',
        component: _import('settarget/index'),
        meta: { title: '设置目标', icon: 'settarget-icon' },
        id: 'settarget'
      }
    ]
  },
  {
    path: '/setsms',
    component: Layout,
    meta: { permission: 'crm:blessingMsg' },
    children: [
      {
        path: 'index',
        name: 'setsms',
        component: _import('setsms/index'),
        meta: { title: '短信设置', icon: 'setsms-icon' },
        id: 'setsms'
      }
    ]
  },
  {
    path: '/evaluation',
    component: Layout,
    meta: { permission: 'crm_evaluate' },
    children: [
      {
        path: 'index',
        name: 'evaluation',
        component: _import('evaluation/index'),
        meta: { title: '评价管理', icon: 'evaluation-icon' },
        id: 'evaluation'
      }
    ]
  },
  {
    path: '/managetenants',
    component: Layout,
    meta: { permission: 'crm_rentmanage' },
    children: [
      {
        path: 'index',
        name: 'managetenants',
        component: _import('managetenants/index'),
        meta: { title: '租客管理', icon: 'managetenants-icon' },
        id: 'managetenants'
      }
    ]
  },
  {
    path: '/managetenants',
    component: Layout,
    meta: { permission: 'crm_rentmanage' },
    hidden: true,
    children: [
      {
        path: 'detail',
        name: 'manageTenantsDetail',
        component: _import('managetenants/detail'),
        meta: { title: '租客详情', icon: 'managetenants-icon' },
        id: 'manageTenantsDetail'
      }
    ]
  },
  {
    path: '/404',
    component: _import('404'),
    hidden: true
    // children: [
    //   {
    //     meta: { title: '404页面' },
    //     id: '404'
    //   }
    // ]
  },
  {
    path: '/smsVerification',
    component: _import('smsVerification'),
    hidden: true
    // children: [
    //   {
    //     meta: { title: '短信验证' },
    //     id: 'smsVerification'
    //   }
    // ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/workbench',
  //   // name: 'Dashboard',
  //   meta: { permission: 'crm', role: ['1', '18'] },
  //   // hidden: true,
  //   children: [{
  //     path: 'workbench',
  //     name: 'workbench',
  //     component: _import('workbench/index'),
  //     meta: { title: 'ceo工作台', icon: 'workbench-icon' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench/index',
    name: 'workbench',
    meta: { permission: 'crm:workplat', role: ['1', '18', '30', '31'] },
    hidden: true,
    children: [{
      path: 'workbench',
      component: _import('workbench/index')
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench/index2',
    name: 'workbench',
    meta: { permission: 'crm:workplat', role: ['2', '3', '18'] },
    hidden: true,
    children: [{
      path: 'workbench',
      component: _import('workbench/index2')
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench/index3',
    name: 'workbench',
    meta: { permission: 'crm:workplat', role: ['4', '18'] },
    hidden: true,
    children: [{
      path: 'workbench',
      component: _import('workbench/index3')
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench/index4',
    name: 'workbench',
    meta: { permission: 'crm:workplat', role: ['5', '18'] },
    hidden: true,
    children: [{
      path: 'workbench',
      component: _import('workbench/index4')
    }]
  },
  {
    path: '/workbench',
    component: Layout,
    meta: { permission: 'crm:workplat', role: ['1', '18', '30', '31'] },
    children: [
      {
        path: 'index',
        name: 'workbench',
        component: _import('workbench/index'),
        meta: { title: 'ceo工作台', icon: 'workbench-icon', role: ['1', '18', '30', '31'] },
        id: 'workbench'
      }
    ]

  },
  {
    path: '/workbench',
    component: Layout,
    meta: { permission: 'crm:workplat', role: ['2', '3', '18'] },
    children: [
      {
        path: 'index2',
        name: 'workbench2',
        component: _import('workbench/index2'),
        meta: { title: '区经工作台', icon: 'workbench-icon', role: ['2', '3', '18'] },
        id: 'workbench2'
      }
    ]
  },
  {
    path: '/workbench',
    component: Layout,
    meta: { permission: 'crm:workplat', role: ['4', '18'] },
    children: [
      {
        path: 'index3',
        name: 'workbench3',
        component: _import('workbench/index3'),
        meta: { title: '综合管家工作台', icon: 'workbench-icon', role: ['4', '18'] },
        id: 'workbench3'
      }
    ]
  },
  {
    path: '/workbench',
    component: Layout,
    meta: { permission: 'crm:workplat', role: ['5', '18'] },
    children: [
      {
        path: 'index4',
        name: 'workbench4',
        component: _import('workbench/index4'),
        meta: { title: '直销管家工作台', icon: 'workbench-icon', role: ['5', '18'] },
        id: 'workbench4'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      meta: { title: '仪表盘' },
      id: 'dashboard'
    }]
  }
]
