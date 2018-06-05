
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

    // require.ensure已被import取代
    // return r => require.ensure([], () => 
    //   r(require(path.filePaht))
    // , page.name)
    let filePath = page.filePath;
    return () => import('@/views/noticemgmt/noticeAdd.vue');

  }

  
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
