import service from '@/utils/request'
export const login = (data) => {
    return service({
        url: "/user/login",
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