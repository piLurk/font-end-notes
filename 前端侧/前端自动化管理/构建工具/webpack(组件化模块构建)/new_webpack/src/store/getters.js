const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  roles: state => state.user.roles,
  userId: state => state.user.userId,
  // 有权限的路由
  permission_routers: state => state.permission.routers,

  errorLogs: state => state.errorLog.logs
}

export default getters