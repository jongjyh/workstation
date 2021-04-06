<template>
    <div class="container">
        <div class="course-title">
            <h1>课程名：{{name}}</h1>
            <span style="color: #515a6e">学期：{{this.term}}</span>
        </div>

        <el-row :gutter="70">
            <el-col :span="8"><div class="grid-content bg-white">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <i class="el-icon-chat-round" style="padding-right: 5px"></i>
                        <span class="title-span">课程简介</span>
                        <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
                    </div>
                    <div  class="text item">
                        {{this.introduction}}
                    </div>
                </el-card>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-white">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <i class="el-icon-reading" style="padding-right: 5px"></i>
                        <span class="title-span">课程通知</span>
                        <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
                    </div>
                    <div  class="text item">
                        {{this.notice}}
                    </div>
                </el-card>
            </div></el-col>
            <el-col :span="7"><div class="grid-content bg-white">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <i class="el-icon-user-solid" style="padding-right: 5px"></i>
                        <span class="title-span">学生管理</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="studentsManageVisible = true">管理</el-button>
                    </div>
                    <div  style="text-align: center; height: 100%;font-size: 60px" >
                        {{this.studentCount}}<span style="font-size: 10px; ">人</span>
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
        <el-dialog
                title="学生管理"
                :visible.sync="studentsManageVisible"
                width="60%"
                >
            <div class="student-wrapper">
                    <div slot="header" class="clearfix">
                        <el-button type="primary" style="float: right;" @click="addStudentFormVisible = true">导入学生</el-button>
                        <el-dialog :title="'为课程 '+ this.name +' 批量导入学生'" :visible.sync="addStudentFormVisible"
                                   width="40%"
                                   center
                                   append-to-body>
                            <el-form :model="form">
                                <el-form-item >
                                    <el-input type="textarea"
                                              :rows="9"
                                              placeholder="请输入学生学号，并以换行符分隔"
                                              v-model="form.data" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="addStudentFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="submitAddStudentForm">确 定</el-button>
                            </div>
                        </el-dialog>
                    </div>
                    <el-table
                            :data="students.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"
                            height="400"
                            style="width: 100%; ">
                        <el-table-column
                                label="序号"
                                type="index">
                        </el-table-column>
                        <el-table-column
                                label="姓名"
                                prop="name">
                        </el-table-column>
                        <el-table-column
                                label="学号"
                                prop="id">
                        </el-table-column>
                        <el-table-column
                                align="right">
                            <template slot="header" slot-scope="scope">
                                <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="根据学号搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
            </div>
        </el-dialog>

        <div class="filter-wrapper">
            <taskfilter :courseId=this.cid></taskfilter>
        </div>
    </div>
</template>

<script>
    import {getCourse,addStudent,studentList, delStudent} from '@/api/course'
    import taskfilter from "@/views/task/filter";
    import {getCommit} from '@/api/submit'
    export default {
        name: "courseInfo",
        components: {taskfilter},
        data(){
            return{
                studentsManageVisible:false,
                studentCount:0,
                name:"",
                introduction:"",
                teacher:"",
                term:"",
                cid:Number,
                courses:[],
                notice:"",
                loading: true,
                students: [{
                    name: '王小虎',
                    id:'16721073',
                    class:'172115',
                    department:'软件学院',
                }],
                search: '',
                addStudentFormVisible:false,
                form: {
                    data: ''
                },
                formLabelWidth: '150px',
                begin:'',
                end:'',
            }
        },
        props:{
            courseId:String,
        },
        methods:{
            async handleDelete(index,student){
                const res= await delStudent({},this.cid,student.id)
                if(res.code== 200){
                    this.$message({
                        message:'删除学生成功',
                        type: 'success'
                    });
                    this.students.splice(index,1)
                    this.studentCount=this.students.length
                }
                else
                    console.log(res)
            },
            async getCourseInfo(){
                const res= await getCourse({},this.cid)
                if(res.code== 200){
                    this.introduction=res.data.info
                    this.name=res.data.name
                    this.term=res.data.tname
                    this.cid=res.data.cid
                    this.begin=res.data.tbegin;
                    this.end=res.data.tend;
                }
                else
                    console.log(res)
                const res2 = await studentList({}, this.cid)
                //获取总人数
                if (res2.code == 200) {
                    this.studentCount = res2.data.length
                    this.students=res2.data
                } else
                    console.log(res2)
            },
            async submitAddStudentForm(){
                let studentsID={
                    accounts:this.form.data.split('\n')
                };

                const res= await addStudent(studentsID,this.cid)
                if(res.code== 200){
                    this.$message({
                        message:'添加学生成功',
                        type: 'success'
                    });
                }
                else
                    console.log(res)
                this.addStudentFormVisible = false;
                this.form.data=''
            }
        },
        mounted() {
        },
        created() {
            this.cid=this.$route.params.id
            this.getCourseInfo()
        }
    }
</script>

<style>
    .course-title{
        margin-bottom: 15px;
    }
    .title-span{
        font-weight: bolder;
        color: #515a6e;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .container{
        background-color: #FFFFFF;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        border-radius: 4px;
        padding: 16px;

    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
             margin-bottom: 0;
         }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-white {
        background: #FFFFFF;;

    }
    .grid-content {
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .box-card {
        min-height: 200px;
    }
</style>