import service from '@/utils/request'
//获取所有作业提交列表-TEACHER
export const submitCount = (data,eid) => {
    return service({
        url: "/exp/"+eid+"/stat",
        method: 'get',
        data: data
    })
}
//下载某个学生的提交-STUDEN只能下自己，TEACHER可以下任何
export const dwOne = (data,eid,stuid) => {
    return service({
        url: "/exp/"+eid+"/dl/"+stuid,
        method: 'get',
        data: data,
        responseType:'blob',
    })
}
//下载所有-TEACHER
export const dwAll = (data,eid) => {
    return service({
        url: "/exp/"+eid+'/dlall',
        method: 'get',
        data: data,
        responseType:'blob',
    })
}
//设置是否推荐，每次取反-TEACHER
export const setRecommend = (data,eid,stuid) => {
    return service({
        url: "/exp/"+eid+'/rec/'+stuid,
        method: 'get',
        data: data
    })
}