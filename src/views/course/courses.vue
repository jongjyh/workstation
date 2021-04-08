<template>
    <div  >
        <div class="title">
            <h2>我的课程</h2>
        </div>
        <div class="container-wrapper">
            <!--顶部div-->
            <el-row class="select-term-wrapper" type="flex" justify="space-between">
                <el-col :span=7>
                    <span style=" color: rgba(107,114,128,1)" >请选择学期：</span>
                    <el-select v-model="chooseterm" placeholder="请选择" @change="changeTerm">
                        <el-option
                                v-for="item in term"
                                :key="item.tid"
                                :label="item.label"
                                :value="item.tid"
                                >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span=4 >
                    <el-button type="primary"  @click="addCourseFormVisible = true"><i class="el-icon-plus" style="margin-right: 10px"></i>创建新课程</el-button>

                </el-col>
            </el-row>
            <!--课程卡片div-->
            <div class="courses-wrapper" style="margin-top: 15px">
                <el-row>
                <el-col :span=5 v-for="(item, index) in showCourses" :key="item.id" :offset="(index)%4 > 0 ? 1 : 0">
                    <el-card :body-style="{ padding: '10px' }" shadow="hover">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 10px 5px;">
                            <span >{{item.name}}</span>
                            <span style="float: right font-size: 14px; color: #999; display: block;">{{item.tname}}</span>
                            <div class="bottom clearfix">
                                <span class="time">教师：{{item.teacher}}</span>
                                <router-link :to=" '/courses/courseInfo/'+item.cid" :key="item.cid">
                                    <el-button type="text" class="button">查看详情</el-button>
                                </router-link>
                            </div>

                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        </div>
        <el-dialog title="创建课程" :visible.sync="addCourseFormVisible"
                   width="35%"
                   center>
            <el-form :model="form" label-width="80px" label-position="left" :rules="rules" :ref="form">
                <el-form-item label="课程名称" prop="name">
                    <el-select v-model="form.name" placeholder="请选择课程名"  >
                        <el-option v-for="(item,index) in lessonName" :label="item" :value="item" :key='index'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="老师名称" >
                    <el-input
                            placeholder="请输入内容"
                            v-model="this.teacher"
                            :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="开设学期"  prop="term">
                    <el-select v-model="form.term" placeholder="请选择开设学期">
                        <el-option v-for="(item,index) in term" :label="item.label" :value="item" :key='index'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程简介"  prop="intro">
                    <el-input type="textarea"
                              :rows="9"
                              placeholder="请输入课程简介"
                              v-model="form.intro" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCourseFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCreatCourseForm(form)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {terms,courses,creatCourse,courseName} from '@/api/course'
    import store from '@/store'
    export default {
        name: "courses",
        data(){
            return{
                chooseterm:'',
                term:[],
                lesson:[],
                lessonName:[],
                showCourses:[],
                addCourseFormVisible:false,
                form: {
                    name:'',
                    intro:'',
                    tid:0,
                },
                teacher:'',
                rules: {
                    name: [
                        { required: true, message: '请选择课程', trigger: 'blur' },
                    ],
                    term:[
                        { required: true, message: '请选择开设学期', trigger: 'blur' },
                    ],
                    intro:[
                        { required: true, message: '请输入课程简介', trigger: 'blur' },
                    ],
                },

            }
        },
        methods:{
            async submitCreatCourseForm(formName){
                console.log(this.form)
                let data={
                    name:this.form.name,
                    info:this.form.intro,
                    tid:this.form.term.tid
                }

                this.$refs[formName].validate(async (valid) => {
                    if(valid)
                    {
                        const res= await creatCourse(data)
                        if(res.code == 200)
                        {
                            this.$message({
                                message:'创建课程成功',
                                type: 'success'
                            });
                        }
                        else
                            console.log(res)
                        Object.keys(this.form).forEach(key => this.form[key] = '');
                        this.addCourseFormVisible = false
                    }
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            changeTerm(term){
                this.showCourses=[];
                this.lesson.forEach((course)=>{
                    if(course.tid === term)
                        this.showCourses.push(course)

                })
            },
            async loadTerm(){
                const res= await terms()
                if(res.code== 200){
                    this.term=res.data

                    this.term.forEach((term)=>{
                        term['label']=term.tname
                    })
                }
                else
                    console.log(res)
            },
            async loadCourses(){
                const res= await courses()
                if(res.code== 200){
                    this.lesson=res.data
                    this.showCourses=this.lesson
                }
                else
                    console.log(res)
                const res2= await courseName({})
                if(res2.code== 200){
                    this.lessonName=res2.data
                }
                else
                    console.log(res)
            },
        },
        created(){
            this.teacher=store.getters['user/userInfo'].nickName
            this.loadTerm()
            this.loadCourses()
        },
        mounted() {


        }
    }
</script>

<style scoped>
    .container-wrapper{
        background-color: #FFFFFF;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding:16px;
    }
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
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