import { login } from '@/api/user'
import { getInfo} from '@/api/user'
import router from '@/router/index'
import store from "../index";
import Cookies from 'js-cookie'
const roleMap = new Map([[1, 'student'], [2, 'teacher'], [3, 'admin']]);
export const user = {
    namespaced: true,
    state: {
        userInfo: {
            uuid: "",
            nickName: "",
            headerImg: "",
            authority: "",//权限
            role:"",
            email:'',
        },
        token: "",
    },
    mutations: {
        setUserInfo(state, userInfo) {
            // 这里的 `state` 对象是模块的局部状态
            state.userInfo = userInfo
        },
        setToken(state, token) {
            // 这里的 `state` 对象是模块的局部状态
            state.token = token
        },
        setRole(state, role) {
            // 这里的 `state` 对象是模块的局部状态
            state.role = role
        },
        LoginOut(state) {
            state.userInfo = {}
            state.token = ""
            router.push({name: 'login', replace: true})
            sessionStorage.clear()
            window.location.reload()
        },
        ResetUserInfo(state, userInfo = {}) {
            state.userInfo = {
                ...state.userInfo,
                ...userInfo
            }
        }
    },
    actions: {
        async LoginIn({commit, dispatch, getters,rootGetters}, loginInfo) {
            const res = await login(loginInfo)
            if (res.code == 200) {
                let user= {
                    email:res.data.email,
                    role:roleMap.get(res.data.role),
                    nickName: res.data.name,
                    uuid:res.data.id
                }
                commit('setUserInfo', user)
                commit('setToken', res.data.token)
                Cookies.set('Token', res.data.token)
                console.log(getters['userInfo'])
                let role = user.role
                dispatch('route/generateRoutes', { role },{ root: true }).then(() => { // 生成可访问的路由表
                    console.log(getters['userInfo'])
                    router.addRoutes(rootGetters['route/addRoutes']) // 动态添加可访问路由表
                    console.log(rootGetters['route/addRoutes'])
                    router.push({path: '/'})
                    return true
                })
            }
            //commit('setUserInfo', loginInfo.username)
            //commit('setToken', "e2183hyf7ue22")
            //if(loginInfo.username==='student')
            //    commit('setRole','student');
            //else if (loginInfo.username==='teacher')
            //    commit('setRole','teacher');
            //else if (loginInfo.username==='admin')
            //    commit('setRole','admin');
            //第一次登录时生成路由
            //let role = getters.role
            //dispatch('route/generateRoutes', { role },{ root: true }).then(() => { // 生成可访问的路由表
            //    router.addRoutes(rootGetters['route/addRoutes']) // 动态添加可访问路由表
            //    router.push({path: '/'})
            //})
        },
       // async LoginOut({commit}) {
       //        const res = await jsonInBlacklist()
       //        if (res.code == 0) {
       //            commit("LoginOut")
       //        }
       // }
        async GetInfo({commit}){
            const res = await getInfo()
            if (res.code == 200) {
                let user= {
                    email:res.data.email,
                    role:roleMap.get(res.data.role),
                    nickName: res.data.name,
                    uuid:res.data.id
                }
                commit('setUserInfo', user)
                commit('setToken', res.data.token)
                return user
            }
            else
                console.log(res)
            /*
            token存在，用户信息不存在时向后台拉取个人信息，待补充
             */
        }
    },
    getters: {
        userInfo(state) {
            return state.userInfo
        },
        id(state) {
            return state.userInfo.uuid
        },
        token(state) {
            return state.token
        },
        role(state){
            return state.userInfo.role;
        }

    }
}
