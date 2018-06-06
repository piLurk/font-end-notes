
import navConfig from './route.config.json';


const registerRoute = (navConfig) => {
  let route = [];
  let navs = navConfig;

  navs.forEach(nav => {
    if(nav.children) {
      nav.children.forEach( page => {
        route.push({
          name: page.name,
          component: () => import(`@/views/${page.filePath}`),
          path: page.path,
          meta: page.meta
        })
      })
    }
  });

  return route
}

let defaultPath = '/noticeAdd';



let route = registerRoute(navConfig);
route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}])
export default route
