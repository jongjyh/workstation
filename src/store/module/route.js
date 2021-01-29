import { asyncRoutes, constantRoutes } from '@/router'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(user, route) {

    if (route.meta && route.meta.role) {
        return route.meta.role.indexOf(user.role)!==-1
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, role) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(role, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, role)
            }
            res.push(tmp)
        }
    })

    return res
}
export const route = {
    namespaced: true,
    state: {
        //基本路由
        routes: [],
        //可达路由
        addRoutes: []
    },
    mutations: {
        setRoutes: (state, routes) => {
            //可达路由
            state.addRoutes = routes
            //基本路由
            state.routes = constantRoutes.concat(routes)
        },

    },
    actions: {
        generateRoutes({ commit }, role) {
            return new Promise(resolve => {
                let accessedRoutes = filterAsyncRoutes(asyncRoutes, role)
                commit('setRoutes', accessedRoutes)
                resolve(accessedRoutes)
            })
        }
    },
    getters: {
        addRoutes(state){
            return state.addRoutes;
        },
        permitRoutes(state){
            return state.routes;
        }
    }
}
