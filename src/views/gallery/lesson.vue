<template>
    <el-container>
        <el-header class="header-style">
            <div></div>
            <el-menu :default-active="activeIndex" class="el-menu-style" mode="horizontal" @select="handleSelect" background-color="#F6F6F6" active-text-color="black">
                <el-menu-item class="menu-item-style" index="1">作品集</el-menu-item>
                <el-menu-item class="menu-item-style" index="2">关于本课程</el-menu-item>
            </el-menu>
            <div>
                <router-link to="/login" >
                    <el-link :underline="false">转去登录</el-link>
                </router-link>

            </div>
        </el-header>
        <!--内容-->
        <el-main class="main-style">
            <div class="screen-style">
                <el-image
                        style="width: 1200px; height: 600px"
                        :src="lessonImageSrc"
                        :fit="fit"></el-image>
            </div>

            <!--作品集-->
            <el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2>作品集</h2>
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
                        <el-col :span="6" v-for="(o, index) in lesson" :key="index" style="margin-bottom: 25px">
                            <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                <router-link :to="'/gallery/detail/'+o.url">
                                    <img :src="o.src" class="lessonimage">
                                </router-link>

                                <div style="padding: 10px;">
                                    <div style="text-align: center;font-weight: bolder;margin-top: 10px;margin-bottom: 5px" >{{o.title}}</div>
                                    <span style="color: #999999; font-size: 13px">作者：</span>
                                    <span style=" font-size: 13px ">陈小云{{o.uname}}</span>
                                    <div>
                                    <span style="color: #999999; font-size: 13px; ">学号：</span>
                                    <span style=" font-size: 13px;">{{16721063}}</span></div>
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
                    <h2>关于本课程</h2>
                </div></el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="17"><div class="content-style">
                    <el-row>
                        <el-col :span="12">
                            <div >
                                <el-image
                                        style="width: 470px; height: 380px"
                                        :src="lessonImageSrc"
                                        :fit="fit"></el-image>
                            </div>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <div class="middle-style"></div>
                            <h1>课程介绍</h1>
                            <div class="intro-font-style intro-font" >{{courseInfo}}</div><el-divider></el-divider>
                        </el-col>
                    </el-row>
                </div></el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {search} from "../../api/HomePage";
    import {terms} from "../../api/course";

    export default {
        name: "lesson",
        data(){
            return{
                courseInfo:'\t走进软件是信息类各专业的入门性导论类核心通识课程，在培养学生对信息科学和软件工程' +
                    '知识、能力和素质方面起到先导作用，激发学生对软件工程专业的兴趣，为其它专业课的学习奠' +
                    '定基础。',
                lessonImageSrc:require('@/assets/course_bg.png'),
                lesson:[],
                activeIndex:"0",
                cname:"",
                term:[],
                tot:0,
                page:0,
                pageSize:16,
            }
        },
        created() {
            this.cname=this.$route.params.cname
            this.loadTerm()
            this.loadProject(0,1,this.pageSize)
        },
        methods:{
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
                const res=await search(this.cname,"",tid,"",page,size);
                if(res.code==200){

                    this.lesson=res.data.res
                    this.tot=res.data.tot
                    console.log(this.lesson)

                }
                else
                    console.log(res)
            },
            handleSelectYear(key, keyPath){
                this.loadProject(key,1,this.pageSize)
                //返回第一页
                this.page=1
            },
            handleSelect(){

            }
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

    .year{
        text-align: center;
        list-style-type: none;
        padding: 0; /* remove default padding and all margins! */
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .year li{
        color: #555;
        float: left;
        width: 120px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
    }

    .intro-font-style{
        font-family:Microsoft YaHei;
    }
    .intro-font{
        color: #808080;
        margin-top: 15px;
        height: 100%;
    }
    .header-style{
        box-shadow: 0 0 4px #c7c7c7;
        background-color: #F6F6F6;
        display: flex;
        justify-content: space-between;
    }
    .el-menu-style{
        background-color: #F6F6F6;

    }
    .main-style{
        background-color: white;
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
    .menu-item-style{
        margin-left: 20px;
        margin-right: 20px;
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
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .intro {
        font-size: 13px;
        color: #999;
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


    .lessonimage {
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