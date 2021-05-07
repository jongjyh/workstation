<template>
            <div>
            <div class="screen-style">
                <template>
                    <el-carousel :interval="4000" type="card" height="400px">
                        <el-carousel-item v-for="(item,index) in carousel" :key="index"><router-link :to="'/gallery/detail/1/'+item.url"  target="_blank">
                            <el-image
                                    :src="item.src"
                                    fit="fill"
                                    style="height: 400px; width: 740px"
                            ></el-image></router-link>
                        </el-carousel-item>
                    </el-carousel>
                </template>
            </div>

            <!--课程-->
            <el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2 id="lessonTag">课程</h2>
                </div></el-col>
            </el-row>
            <el-row :gutter="24" type="flex" justify="center" v-loading="loading" >
                <el-col :span="20">
                <div class="content-style">
                    <el-row :gutter="24">
                <el-col :span="8" v-for="(o, index) in lesson" :key="index" style="margin-bottom: 25px;">
                            <el-card :body-style="{ padding: '0px'}" shadow="hover" style="width:400px">
                                <el-image :src="o.src" style="width:400px;height: 216px" fit="fill" />
                                <div style="padding: 14px;">
                                    <h3 style="text-align: center">{{o.name}}</h3>
                                    <div class="bottom clearfix">
                                        <router-link :to="'/gallery/lesson/'+o.id" >
                                            <el-button type="text" class="button">进入主页</el-button>
                                        </router-link>
                                    </div>
                                </div>
                            </el-card>
                </el-col></el-row>
                </div>
                </el-col>
            </el-row>
            <el-row  >
                <el-col :span="24"><div class="title-style">
                    <h2 id="projectTag">优秀作品</h2>
                </div></el-col>
            </el-row>
            <el-row type="flex" justify="center" v-loading="loading">
                <el-col :span="17">
                    <div class="content-style">
                    <el-row :gutter="24" >
                        <el-col :span="8" v-for="(o, index) in projects" :key="index" style="margin-bottom: 25px">
                            <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                <router-link :to="'/gallery/detail/1/'+o.url"  target="_blank">
                                    <el-image :src="o.src" style="height: 200px"/>
                                </router-link>

                                <div style="padding: 14px;">
                                    <h3 style="text-align: center">{{o.title}}</h3>

                                    <div class="bottom clearfix">
                                        <span class="intro">{{ o.info }}</span>
                                    </div>
                                    <div class="bottom clearfix left">
                                        <i class="el-icon-user-solid"></i>
                                    <span class="intro">  {{ o.uname }}</span>
                                     </div>
                                    <div class="bottom clearfix right">
                                        <span class="intro">指导教师: {{ o.teacher }}</span>
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
                    <h2 id="memoryTag">回忆录</h2>
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
                    <h2 id="aboutTag">关于我们</h2>
                </div></el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="17"><div class="content-style">

                </div></el-col>
            </el-row>
            </div>

</template>

<script>
    import {search} from '@/api/HomePage'
    import {courseName} from "@/api/course";
    import global from '@/Base.vue'
    export default {
        name: "index",
        data(){
            return{
                loading:true,
                tags:{
                    items:[
                    {
                        label:'课程集',
                        index:'lessonTag'
                    },
                    {
                        label:'优秀作品',
                        index:'projectTag'
                    },
                    {
                        label:'回忆录',
                        index:'memoryTag'
                    },
                    {
                        label:'关于我们',
                        index:'aboutTag'
                    },],
                    showNav:false,
                    name:'',
                },
                activeIndex:"0",
                projects:[],
                lesson:[],
                total:0,
                carousel:[],
                src: '',
            }
        },
        methods:{
          async loadCourse(){
              const res=await courseName();
              if(res.code==200)
              {
                  this.lesson=res.data;
                  if(this.lesson)
                  this.lesson.forEach(o =>{
                      if(o.thumb==='')
                      {
                          o.src=require('@/assets/course_bg.png')
                      }else
                      o.src=global.BACKEND_URL+'/img/'+o.thumb
                  })

              }else
                  console.log(res)

          },
          async loadProjects(){
              //搜索推荐的作品
              const res=await search("",true)
              if(res.code==200)
              {
                  let projectList=res.data.res;
                  this.total=res.data.tot;
                  this.projects=projectList;
                  console.log(this.projects)
                  if(this.projects) {
                      this.projects.forEach(o => {
                          if(o.thumb==='null')
                          {

                              o.src=require('@/assets/project_stand.jpeg')
                          }else
                              o.src=global.BACKEND_URL+'/img/'+o.thumb
                      })
                  }
                  this.carousel=this.projects.slice(0,5)

              }else
                  console.log(res)
              this.loading=false
          },
            handleSelect(tag){
                document.querySelector("#"+tag).scrollIntoView(true);
            },
        },
        created() {
            this.loadCourse()
            this.loadProjects()
            /*读取课程信息*/
            /*读取老师推荐的作品*/
            this.$emit('postChildInfo',this.tags)
        }
    }
</script>

<style scoped>
    .left{
        float: left;
    }
    .right{
        float:right;
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
        margin-top: 50px;
        margin-bottom: 100px;
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

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

</style>