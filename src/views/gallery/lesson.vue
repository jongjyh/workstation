<template>
            <div>
            <div class="screen-style">
                <el-image
                        style="width: 1200px; height: 600px"
                        :src="ImageSrc"
                        ></el-image>
            </div>

            <!--作品集-->
            <el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2 id="projectTag">作品集</h2>
                </div></el-col>
            </el-row>
            <!--目录-->
            <div class="category">
            <el-row type="flex" justify="center">
                <el-col :span="14">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelectYear">
                        <el-menu-item index="0">全部年度</el-menu-item>
                        <el-menu-item v-for="item in term" :index="item.tid+''" :key="item.tid+''">{{item.tname}}</el-menu-item>

                    </el-menu>
                </el-col>
            </el-row>
            </div>
            <!--卡片-->
            <el-row type="flex" justify="center">
                <el-col :span="20"><div class="content-style">
                    <el-row :gutter="24" >
                        <el-col :span="6" v-for="(o, index) in project" :key="index" style="margin-bottom: 25px">
                            <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                <router-link :to="'/gallery/detail/'+o.url">
                                    <img :src="o.src" class="projectimage">
                                </router-link>

                                <div style="padding: 10px;">
                                    <div style="text-align: center;font-weight: bolder;margin-top: 10px;margin-bottom: 5px" >{{o.title}}</div>
                                    <span style="color: #999999; font-size: 13px">作者：</span>
                                    <span style=" font-size: 13px ">{{o.uname}}</span>
                                    <div class="bottom clearfix">
                                        <router-link :to="'/gallery/detail/'+o.url" >
                                            <el-button type="text" class="button">进入主页</el-button>
                                        </router-link>

                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
                </el-col>
            </el-row>
            <div class="middle-style">
                <el-pagination
                        background
                        layout="total,prev, pager, next"
                        :total="tot"
                        :current-page="page"
                        :page-size="pageSize"
                        @current-change="currentChange"
                >
                </el-pagination>
            </div>
            <!--关于本课程-->

            <el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2 id="aboutTag">关于本课程</h2>
                </div></el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="17"><div class="content-style">
                    <el-row>
                        <el-col :span="12">
                            <div >
                                <el-image
                                        style="width: 500px; height: 300px"
                                        :src="ImageSrc"
                                        ></el-image>
                            </div>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <div class="middle-style"></div>
                            <h1>{{cname}}</h1>
                            <h3>课程介绍</h3>

                            <div class="intro-font-style intro-font" >{{courseInfo}}</div><el-divider></el-divider>
                        </el-col>
                    </el-row>
                </div></el-col>
            </el-row></div>
</template>

<script>
    import {search,courseInfo} from "../../api/HomePage";
    import { terms} from "../../api/course";
    import global from '@/Base.vue'
    export default {
        name: "project",
        data(){
            return{
                tags:{
                    items:[
                    {
                        label:'优秀作品',
                        index:'projectTag'
                    },
                    {
                        label:'关于本课程',
                        index:'aboutTag'
                    },
                    ],
                    name:"",
                    showNav:true,
                },
                courseInfo:'',
                ImageSrc:'',
                project:[],
                activeIndex:"0",
                cname:"",
                term:[],
                tot:0,
                page:0,
                pageSize:16,
            }
        },
        created() {
            this.cid=this.$route.params.id
            this.loadCourse()
            this.loadTerm()
            this.loadProject(0,1,this.pageSize)
            this.$emit('postChildInfo',this.tags)
        },
        methods:{
            async loadCourse(){
                const res=await courseInfo(this.cid);
                if(res.code==200)
                {
                    this.cname=res.data.name
                    this.tags.name=res.data.name
                    this.courseInfo=res.data.info
                    this.ImageSrc=global.BACKEND_URL+'/img/'+res.data.thumb
                    console.log(this.ImageSrc)
                }
                else
                    console.log(res)

            },
            currentChange(current){
                this.loadProject(this.activeIndex,current,this.pageSize)
            },
            async loadTerm(){
                const res= await terms()
                if(res.code== 200){
                    this.term=res.data
                }
                else
                    console.log(res)
            },
            async loadProject(tid,page,size){
                const res=await search(this.cid,"",tid,"",page,size);
                if(res.code==200){
                    this.project=res.data.res
                    this.tot=res.data.tot
                    console.log(this.project)
                    if(this.project)
                        this.project.forEach(o =>{
                            o.src=global.BACKEND_URL+'/img/'+o.thumb
                        })
                }
                else
                    console.log(res)
            },
            handleSelectYear(key, keyPath){
                this.loadProject(key,1,this.pageSize)
                //返回第一页
                this.page=1
            },

        },

    }
</script>

<style scoped>
    .el-menu-demo{
        display: flex;
        justify-content: center;
        border-bottom: none;
    }
    .middle-style{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
    }
    .category{
        margin-bottom: 40px;
        text-align: center;
    }

    .intro-font-style{
        font-family:Microsoft YaHei;
    }
    .intro-font{
        color: #808080;
        margin-top: 15px;
        height: 100%;
    }
    .title-style{
        text-align: center;
        border-bottom:1px solid #DCDFE6;
        height: 80px;
        margin-bottom: 70px;
    }
    .content-style{
        margin-bottom: 80px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .screen-style{
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
        text-align: center;
        margin-bottom: 10px;
    }

    .button {
        padding: 0;
        float: right;
    }


    .projectimage {
        width: 100%;
        display: block;
        height: 200px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

</style>