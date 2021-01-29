<template>
    <div class="container">
        <div class="course-title">
            <h1>课程名：{{name}}</h1>
            <span style="">学期：{{this.term}}</span>
        </div>

        <el-row :gutter="70">
            <el-col :span="8"><div class="grid-content bg-white">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="title-span">课程简介</span>
                        <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
                    </div>
                    <div  class="text item">
                        {{this.introduction}}
                    </div>
                </el-card>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-white">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="title-span">课程通知</span>
                        <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
                    </div>
                    <div  class="text item">
                        {{this.notice}}
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
        <div class="student-wrapper">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <i class="el-icon-user-solid" style="padding-right: 5px"></i>
                    <span class="title-span">学生管理</span>
                    <el-button type="primary" style="float: right;  padding: 3px 0" @click="addStudentFormVisible = true">导入学生</el-button>

                    <el-dialog :title="'为课程 '+ this.name +' 批量导入学生'" :visible.sync="addStudentFormVisible"
                    width="40%"
                    center>
                        <el-form :model="form">
                            <el-form-item >
                                <el-input type="textarea"
                                          :rows="9"
                                          placeholder="请输入学生学号，并以换行符分隔"
                                          v-model="form.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addStudentFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addStudentFormVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>

                </div>
                <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        max-height="400"
                        style="width: 100%; ">
                    <el-table-column
                            label="序号"
                            prop="index">
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
                            label="班级"
                            prop="class">
                    </el-table-column>
                    <el-table-column
                            label="院系"
                            prop="department">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>

        </div>
    </div>
</template>

<script>
    export default {
        name: "courseInfo",
        data(){
            return{
                students:[],
                name:"走进软件",
                introduction:"本课程对每个专题的讲座内容进行系统整理，形成了由讲座概要、专题内容、拓展阅读文献、教学课件和教学视频等组成的教学内容",
                teacher:"",
                term:"2020秋季学期",
                id:"",
                notice:"",
                loading: true,
                tableData: [{
                    name: '王小虎',
                    id:'16721073',
                    class:'172115',
                    department:'软件学院',
                }, {
                    name: '陈小虎',
                    id:'17731032',
                    class:'172115',
                    department:'软件学院',
                }, {
                    name: '王珂',
                    id:'17731032',
                    class:'172115',
                    department:'软件学院',
                }, {
                    name: '陈潇',
                    id:'1672103',
                    class:'172115',
                    department:'软件学院',
                },],
                search: '',
                addStudentFormVisible:false,
                form: {
                    data: ''
                },
                formLabelWidth: '150px'
            }
        },
        props:{
            courseId:String,
        },
        methods:{
            getCourseInfo(){

            },
        },
        mounted() {
            this.id=this.courseId
            this.getCourseInfo()


        }
    }
</script>

<style>
    .course-title{
        margin-bottom: 15px;
    }
    .title-span{
        font-weight: bolder
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
        padding: 10px;
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