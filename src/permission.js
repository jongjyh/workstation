import router from "./router";
import store from "./store";
import Cookies from 'js-cookie'
const whiteList = ['/login', '/auth-redirect']

function getToken() {
    return Cookies.get('Token')
}
 router.beforeEach(async (to, from, next) => {
     console.log(to.path)
    if (getToken()) { // 判断是否有token
        if (store.getters['user/role'].length === 0) { // 判断当前用户是否已拉取完user_info信息
            const user=await store.dispatch('user/GetInfo')// 拉取info
            let role = user.role
            store.dispatch('route/generateRoutes', {role} ).then(() => { // 生成可访问的路由表
                router.addRoutes(store.getters['route/addRoutes']) // 动态添加可访问路由表
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
        } else {
            if(to.path ==='/login')
            {
                next('/');
            }
            next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        }
    }
    else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            next('/login'); // 否则全部重定向到登录页
        }
    }
});