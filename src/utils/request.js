import axios from 'axios'; // 引入axios
import { Message } from 'element-ui';
import store from '@/store'
import context from '@/main.js'
import Cookies from 'js-cookie'
const service = axios.create({
    baseURL: '/api',
    timeout: 99999
})
let acitveAxios = 0
let timer
const showLoading = () => {
    acitveAxios++
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        if (acitveAxios > 0) {
            context.$bus.emit("showLoading")
        }
    }, 400);
}

const closeLoading = () => {
    acitveAxios--
    if (acitveAxios <= 0) {
        clearTimeout(timer)
        context.$bus.emit("closeLoading")
    }
}
//http request 拦截器
service.interceptors.request.use(
    config => {
        if (!config.donNotShowLoading) {
            showLoading()
        }
        if(config.url=='/file')
        {
            return config;
        }
        const token = Cookies.get('Token')
       // const user = store.getters['user/userInfo']
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json',
            'Authorization': token,

         //   'x-user-id': user.ID
        }
        return config;
    },
    error => {
        closeLoading()
        Message({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error;
    }
);


//http response 拦截器
service.interceptors.response.use(
    response => {
        closeLoading()
        //if (response.headers["new-token"]) {
        //    store.commit('user/setToken', response.headers["new-token"])
        //}
        if (response.data.code == 200) {
            return response.data
        }else if(response.status==200&&response.data.type=='application/zip'){
            return response
        }
        else {
            Message({
                showClose: true,
                message: response.data.msg ,
                type: 'error',
            })
            //if (response.data.data && response.data.data.reload) {
            //    store.commit('user/LoginOut')
            //}
            return response
        }
    },
    error => {
        closeLoading()
        Message({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error
    }
)

export default service