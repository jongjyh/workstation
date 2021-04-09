import service from '@/utils/request'
/*返回作品集*/
export const courseInfo = (id) => {
    return service({
        url: "/coursename/detail/"+id,
        method: 'get',
    })
}

export const search = (nid,rec,tid,title,page,size) => {
    return service({
        url: "/show/search",
        method: 'get',
        params:{
            nid:nid,
            rec:rec,
            tid:tid,
            title:title,
            page:page,
            size:size,
        }
    })
}
/*返回作品具体信息*/
export const readme = (showid) => {
    return service({
        url: "/show/readme/"+showid,
        method: 'get',
    })
}