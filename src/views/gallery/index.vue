<template>
    <el-container>
        <el-header class="header-style">
            <div></div>
            <div class="el-menu-style">
            <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect" background-color="#F6F6F6" active-text-color="black">
            <el-menu-item class="menu-item-style" index="1">回忆录</el-menu-item>
                <el-menu-item index="2">优秀作品</el-menu-item>
<!--                <el-menu-item index="3">学生风采</el-menu-item>-->
                <el-menu-item index="4">活动剪影</el-menu-item>
                <el-menu-item index="5">关于我们</el-menu-item>
        </el-menu></div>
            <div>
                <router-link to="/login" >
                    <el-link :underline="false">转去登录</el-link>
                </router-link>

            </div>

        </el-header>
        <!--内容-->
        <el-main class="main-style">
            <div class="screen-style">
                <template>
                    <el-carousel :interval="4000" type="card" height="400px">
                        <el-carousel-item v-for="item in 6" :key="item">
                            <h3 class="medium">{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </template>
            </div>

            <!--课程-->
            <el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2>课程</h2>
                </div></el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="17"><div class="content-style">
                    <el-row :gutter="24" >
                        <el-col :span="8" v-for="(o, index) in lesson" :key="o.name" style="margin-bottom: 25px">
                            <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="lessonimage">
                                <div style="padding: 14px;">
                                    <h3 style="text-align: center">{{o.name}}</h3>

                                    <div class="bottom clearfix">
                                        <router-link :to="'/gallery/lesson/'+o.id" >
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

            <!--学生风采-->

            <!--<el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2>学生风采</h2>
                </div></el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="17"><div class="content-style">
                    <el-row>
                        <el-col :span="12">
                            <div style="height: 380px;width: 470px">
                                <el-image :src="src" ></el-image>
                            </div>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <h1>自我介绍</h1>
                            <div class="intro-font-style">姓名：小王</div>
                            <div class="intro-font-style">小班： 1666666</div>
                            <div class="intro-font-style intro-font" style="height: 80px">一个简单的自我介绍咯</div>
                            <el-divider></el-divider>
                            <h4>邮箱</h4>
                            <div class="intro-font-style intro-font">522963890@qq.com</div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="5">
                            <el-pagination
                                    layout="prev, pager, next"
                                    :total="50">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </div></el-col>
            </el-row>-->
            <!--优秀作品-->
            <el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2>优秀作品</h2>
                </div></el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="17"><div class="content-style">
                    <el-row :gutter="24" >
                        <el-col :span="8" v-for="(o, index) in projects" :key="o" style="margin-bottom: 25px">
                            <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                <router-link :to="'/gallery/detail/'+o.url">
                                    <img :src="o.src" class="image">
                                </router-link>

                                <div style="padding: 14px;">
                                    <h3 style="text-align: center">{{o.title}}</h3>
                                    <div class="bottom clearfix">
                                        <span class="intro">{{ o.uname }}</span>
                                    </div>
                                    <div class="bottom clearfix">
                                        <span class="intro">{{ o.info }}</span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
                </el-col>
            </el-row>

            <!--回忆录-->
            <el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2>回忆录</h2>
                </div></el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="17"><div class="content-style">
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/3 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                    <div class="title-style">
                        <h1>士谔学院，一路相伴，感谢有你！</h1>
                    </div>
                </div></el-col>
            </el-row>
            <!--关于我们-->
            <el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2>关于我们</h2>
                </div></el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="17"><div class="content-style">

                </div></el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {search} from '@/api/HomePage'
    import {courseName} from "@/api/course";

    export default {
        name: "index",
        data(){
            return{
                activeIndex:"0",
                projects:[],
                lesson:[],
                total:0,
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            }
        },
        methods:{
          async loadCourse(){
              const res=await courseName();
              if(res.code==200)
              {
                  this.lesson=res.data;
              }else
                  console.log(res)

          },
          async loadProjects(){
              const res=await search('',false,)
              if(res.code==200)
              {
                  let projectList=res.data.res;
                  this.total=res.data.tot
                  this.projects=projectList
                  console.log(this.projects)

              }else
                  console.log(res)
          },
            handleSelect(){

            },
        },
        created() {
            this.loadCourse()
            this.loadProjects()
            /*读取课程信息*/
            /*读取老师推荐的作品*/
        }
    }
</script>

<style scoped>
    .intro-font-style{
        font-family:Microsoft YaHei;
    }
    .intro-font{
        color: #808080;
        margin-top: 15px;

    }
.header-style{
    box-shadow: 0 0 4px #c7c7c7;
    background-color: #F6F6F6;
    display: flex;
    justify-content: space-between;

}
    .el-menu-style{
        background-color: transparent;


        position: relative;
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
        margin-top: 50px;
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

    .image {
        width: 100%;
        display: block;
        height: 200px;
    }
    .lessonimage {
        width: 100%;
        display: block;
        height: 300px;
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