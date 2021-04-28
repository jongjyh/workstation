<template>
    <div class="container" v-loading="loading">
        <div class="course-title">
            <h1>课程名：{{name}}</h1>
            <span style="color: #515a6e">学期：{{this.term}}</span>
        </div>
        <template>
            <el-tabs v-model="activeName" type="card" >
                <el-tab-pane label="学生管理" name="first" ><div class="filter-wrapper">
                    <el-card  shadow="never">
                        <div slot="header" class="clearfix">
                            <i class="el-icon-user-solid" style="padding-right: 5px"></i>
                            <span class="title-span">学生管理</span>
                            <el-button type="primary" style="float: right;  margin-left: 20px" @click="addStudentFormVisible = true" size="mini" icon="el-icon-plus">导入学生</el-button>
                            <el-button type="danger" style="float: right; " @click="ClearStudent" size="mini" icon="el-icon-minus">清空学生</el-button>
                        </div>
                        <div>
                            <el-table
                                    :data="students.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"
                                    max-height="400"
                                    >
                                <el-table-column
                                        width="150"
                                        label="序号"
                                        type="index">
                                </el-table-column>
                                <el-table-column
                                        width="200"
                                        label="姓名"
                                        prop="name">
                                </el-table-column>
                                <el-table-column

                                        label="学号"
                                        prop="id">
                                </el-table-column>

                                <el-table-column
                                        width="300"
                                        align="right">
                                    <template slot="header" slot-scope="scope">
                                        <div class="button-style">
                                                    <el-input
                                                            v-model="search"
                                                            size="mini"
                                                            placeholder="根据学号搜索"/>
                                        </div>
                                    </template>

                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>

                            </el-table>

                            <el-dialog :title="'为课程 '+ this.name +' 批量导入学生'" :visible.sync="addStudentFormVisible"
                                       width="40%"
                                       center
                            >
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
                    </el-card>
                </div>
                </el-tab-pane>
                <el-tab-pane label="实验管理" name="second"><div class="filter-wrapper">
                    <taskfilter :courseId=this.cid></taskfilter>
                </div></el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>

<script>
    import {getCourse,addStudent,studentList, delStudent} from '@/api/course'
    import taskfilter from "@/views/task/filter";
    import {clearStudent} from "../../api/course";
    export default {
        name: "courseInfo",
        components: {taskfilter},
        data(){
            return{

                activeName:'first',
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
                students: [],
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
                this.loading=false
            },
            async ClearStudent(){
                const res=await clearStudent(this.cid)
                if(res.code==200){
                    this.$message({
                            message:'清空成功',
                        type: 'success'
                    });
                    this.getCourseInfo()

                }
                else console.log(res)
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
                    this.getCourseInfo()
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
    .button-style{
        display: flex;

    }
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
    .el-card__body{
        padding-top: 0px;
    }
    .filter-wrapper{
        padding: 20px;
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
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>