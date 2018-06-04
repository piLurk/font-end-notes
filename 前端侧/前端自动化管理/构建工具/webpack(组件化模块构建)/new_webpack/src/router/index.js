
import navConfig from './route.config.json';






const registerRoute = (navConfig) => {
  let route = [];
  let navs = navConfig;

  navs.forEach(nav => {
    if(nav.children) {
      nav.children.forEach( page => {
        route.push({
          name: page.name,
          component: getComponent(page),
          path: page.path,
          meta: page.meta
        })
      })
    }
  });
  function getComponent(page) {
    return r => require.ensure([], () => {
      r(require(page.filePath))
    }, page.name)
  }
}

let defaultPath = '/noticeAdd';

route = route.concat[{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]

let route = registerRoute(navConfig);

export default route
