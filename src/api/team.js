import service from '@/utils/request'
export const teamInfo = (data,eid) => {
    return service({
        url: "/exp/"+eid+"/team",
        method: 'get',
        data: data
    })
}
export const join = (data,eid,gid) => {
    return service({
        url: "/exp/"+eid+"/team/"+gid,
        method: 'get',
        data: data
    })
}
export const leave = (data,eid,gid) => {
    return service({
        url: "/exp/"+eid+"/team/"+gid,
        method: 'delete',
        data: data
    })
}