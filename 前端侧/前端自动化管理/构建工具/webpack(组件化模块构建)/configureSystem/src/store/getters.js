const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  permissions: state => state.user.permissions,
  // permission_routers: state => state.permission.routers,
  // addRouters: state => state.permission.addRouters
}
export default getters
