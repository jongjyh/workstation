import service from '@/utils/request'
export const terms = (data) => {
    return service({
        url: "/terms",
        method: 'get',
        data: data
    })
}
export const courses = (data) => {
    return service({
        url: "/course",
        method: 'get',
        data: data
    })
}
export const creatCourse = (data) => {
    return service({
        url: "/course",
        method: 'post',
        data: data
    })
}
export const getCourse = (data,cid) => {
    return service({
        url: "/course/"+cid,
        method: 'get',
        data: data
    })
}
export const addStudent = (data,cid) => {
    return service({
        url: "/course/"+cid+'/students',
        method: 'post',
        data: data
    })
}
