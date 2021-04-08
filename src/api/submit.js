import service from '@/utils/request'
export const upload = (data) => {
    return service.post('/file',data,{headers: { 'content-type': "multipart/form-data" }})
}
export const uploadImg = (data,width,height) => {
    return service.post('/img',data,{headers: { 'content-type': "multipart/form-data" },params:{width:width,height:height}})
}
export const commit = (data,eid) => {
    return service({
        url: "/exp/"+eid+'/submit',
        method: 'post',
        data: data
    })
}

export const getCommit = (data,eid) => {
    return service({
        url: "/exp/"+eid+'/submit',
        method: 'get',
        data: data
    })
}