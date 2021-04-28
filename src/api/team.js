import service from '@/utils/request'
export const teamInfo = (data,eid) => {
    return service({
        url: "/exp/"+eid+"/team",
        method: 'get',
        data: data
    })
}
export const delMember = (eid,gid,uid) => {
    return service({
        url: "/exp/"+eid+"/team",
        method: 'delete',
        data: {
            gid:gid,
            account:uid
        }
    })
}
export const join = (data,eid,gid) => {
    return service({
        url: "/exp/"+eid+"/team",
        method: 'post',
        data: {
            gid:gid
        }
    })
}
export const leave = (data,eid,gid) => {
    return service({
        url: "/exp/"+eid+"/team",
        method: 'delete',
        data: {
            gid:gid,
            account:''
        }
    })
}