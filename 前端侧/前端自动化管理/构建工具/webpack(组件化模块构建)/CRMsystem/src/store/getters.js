const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  position: state => state.user.position,
  permission: state => state.user.permission,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  vaildUserNum: state => state.user.vaildUserNum,
  msgId: state => state.user.msgId,
  vaildVcodeNum: state => state.user.vaildVcodeNum
}
export default getters
