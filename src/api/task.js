import service from '@/utils/request'

export const tasks = (data) => {
    return service({
        url: "/exp",
        method: 'get',
        data: data
    })
}
export const courseTasks = (data,cid) => {
    return service({
        url:  "/course/"+cid+"/exps",
        method: 'get',
        data: data
    })
}

export const creatTask = (data) => {
    return service({

        url: "/course/"+data.cid+"/exp",
        method: 'post',
        data: data
    })
}
export const getTask = (data,eid) => {
    return service({
        url: /exp/+eid,
        method: 'get',
        data: data
    })
}
export const editTask = (data,eid) =>{
    return service({
        url: /exp/+eid,
        method: 'post',
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
