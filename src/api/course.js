import service from '@/utils/request'
export const terms = (data) => {
    return service({
        url: "/terms/all",
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
export const courseName = () => {
    return service({
        url: "/coursename",
        method: 'get',
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
export const delStudent = (data,cid,sid) => {
    return service({
        url: "/course/"+cid+'/student/'+sid,
        method: 'delete',
        data: data
    })
}
export const studentList = (data,cid) => {
    return service({
        url: "/course/"+cid+'/students',
        method: 'get',
        data: data
    })
}
