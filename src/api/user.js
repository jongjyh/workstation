import service from '@/utils/request'
export const loginByAuth = (auth) => {
    return service({
        url: "/user/verify",
        method: 'post',
        data:auth
    })
}
export const login = (data) => {
    return service({
        url: "/user/login",
        method: 'post',
        data: data
    })
}
export const name = (data) => {
    return service({
        url: "/user/name",
        method: 'post',
        data: data
    })
}
export const mail = (data) => {
    return service({
        url: "/user/email",
        method: 'post',
        data: data
    })
}
export const pw = (data) => {
    return service({
        url: "/user/password",
        method: 'post',
        data: data
    })
}
export const getInfo = (data) => {
    return service({
        url: "/user/info",
        method: 'get',
        data: data
    })
}