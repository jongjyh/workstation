<template>
    <div class="container-wrapper">
        <el-dialog title="编辑实验" :visible.sync="editTaskFormVisible"
                   width="35%"
                   center>
            <el-form :model="form">
                <el-form-item label="实验名称" :label-width="formLabelWidth">
                    <el-input  placeholder="请输入实验名" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="老师名称" :label-width="formLabelWidth">
                    <el-input
                            placeholder="请输入内容"
                            v-model="this.teacher"
                            :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="开设学期" :label-width="formLabelWidth">
                    <el-select v-model="form.term" placeholder="请选择开设学期">
                        <el-option v-for="(item,index) in term" :label="item.label" :value="item" :key='index'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属课程" :label-width="formLabelWidth">
                    <el-select v-model="form.lesson" placeholder="请选择所属课程">
                        <el-option v-for="(item,index) in lesson" :label="item.label" :value="item" :key='index'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="form.startTime"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="form.dueTime"
                            type="datetime"
                            placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="提交截止时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="form.submitTime"
                            type="datetime"
                            placeholder="选择提交截止时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="实验说明" :label-width="formLabelWidth">
                    <el-input type="textarea"
                              :rows="9"
                              placeholder="请输入实验说明"
                              v-model="form.intro" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editTaskFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditTaskForm">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑项目基本信息" :visible.sync="editProjectFormVisible"
                   width="35%"
                   center>
            <el-form :model="projectform">
                <el-form-item label="实验名称" :label-width="formLabelWidth">
                    <el-input  placeholder="请输入实验名" v-model="projectform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" :label-width="formLabelWidth">
                    <el-radio-group v-model="radio">
                        <el-radio :label="3">静态网站</el-radio>
                        <el-radio :label="6">小程序</el-radio>
                        <el-radio :label="9">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="项目简介" :label-width="formLabelWidth">
                    <el-input type="textarea"
                              :rows="9"
                              placeholder="请输入实验说明,10~20字"
                              v-model="projectform.intro" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editProjectFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditTaskForm">保 存</el-button>
            </div>
        </el-dialog>
        <el-row v-if="role == 0">
            <el-col :span="8" >
                <el-row >
                    <div class="grid-content bg-purple-dark student-submit">
                        <span style="margin-right: 20px; font-weight: bolder; font-size: 10px;">已提交:</span>
                    <span style="font-size: 70px">{{this.submitCount}}/{{this.count}}</span>
                    </div>
                </el-row>
            </el-col>
            <el-col :span="16"  ><div class="grid-content bg-purple-dark student-detail" ><el-button plain @click="editProjectFormVisible = true">编辑实验信息</el-button><el-button plain>下载学生作业</el-button></div></el-col>
        </el-row>
        <el-row v-if="role == 1">
            <el-col :span="4" >
                    <div class=" bg-purple-dark student-submit-2">
                        <div class="task-image">
                            <span class="demonstration">缩略图</span>
                            <el-image :src="src" style="width: 100px;height: 70px;border-radius: 10px"></el-image>
                        </div>
                        <div class="task-info-style">

                        </div>
                    </div>
            </el-col>
            <el-col :span="10">
                <div class=" bg-purple-dark student-submit-3">
                    <el-row style="margin-bottom: 15px" >
                        <el-col :span="6" class="time-table-style"><div>项目名称:</div></el-col>
                        <el-col :span="18" class="time-table-time-style"><div>{{this.taskName}}</div></el-col>
                    </el-row >
                    <el-row  style="margin-bottom: 15px" type="flex" justify="center" align="middle">
                        <el-col :span="6" class="time-table-style"><div>项目简介</div></el-col>
                        <el-col :span="18" class="time-table-time-style"><div>{{this.taskIntro}}</div></el-col>
                    </el-row>
                    <el-row style="margin-bottom: 15px" type="flex" justify="center" align="middle">
                        <el-col :span="6" class="time-table-style"><div>项目类型</div></el-col>
                        <el-col :span="18" class="time-table-time-style"><div>{{this.taskType}}</div></el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="10"  ><div class=" bg-purple-dark student-detail" >
                <el-button plain @click="gotoEditShow">编辑展示页面</el-button>
                <el-button plain @click="editProjectFormVisible = true">编辑项目信息</el-button><el-button plain>提交我的作业</el-button></div></el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><div class="grid-content bg-purple-dark time-table">
                <el-row  style="margin-bottom: 5px">
                    <el-col :span="8" class="time-table-style"><div>开始时间:</div></el-col>
                    <el-col :span="12" class="time-table-time-style"><div>{{this.startTime}}</div></el-col>
                </el-row >
                <el-row  style="margin-bottom: 5px">
                    <el-col :span="8" class="time-table-style"><div>结束时间:</div></el-col>
                    <el-col :span="12" class="time-table-time-style"><div>{{this.dueTime}}</div></el-col>
                </el-row>
                <el-row  style="margin-bottom: 5px">
                    <el-col :span="8" class="time-table-style"><div>提交截止时间:</div></el-col>
                    <el-col :span="12" class="time-table-time-style"><div>{{this.submitTime}}</div></el-col>
                </el-row>
                <el-row  style="margin-bottom: 5px">
                    <el-col :span="8" class="time-table-style"><div>互评截止时间:</div></el-col>
                    <el-col :span="12" class="time-table-time-style"><div>{{this.judgeTime}}</div></el-col>
                </el-row>
                <el-row style="margin-bottom: 5px">
                    <el-col :span="8" class="time-table-style"><div>申诉截止时间:</div></el-col>
                    <el-col :span="12" class="time-table-time-style"><div>{{this.hearTime}}</div></el-col>
                </el-row>
            </div></el-col>
            <el-col :span="12" :offset="2"><div class="grid-content bg-purple-light task-info" >
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bolder;">基本信息</span>
                    </div>
                    <div >
                        <el-row  style="margin-bottom: 5px">
                            <el-col :span="8" class="info-table-style"><div>实验名称:</div></el-col>
                            <el-col :span="12" class="time-table-time-style"><div>{{this.taskName}}</div></el-col>
                        </el-row >
                        <el-row  style="margin-bottom: 5px">
                            <el-col :span="8" class="info-table-style"><div>所属课程:</div></el-col>
                            <el-col :span="12" class="time-table-time-style"><div>{{this.taskLesson}}</div></el-col>
                        </el-row>
                        <el-row  style="margin-bottom: 5px">
                            <el-col :span="8" class="info-table-style"><div>指导教师:</div></el-col>
                            <el-col :span="12" class="time-table-time-style"><div>{{this.teacher}}</div></el-col>
                        </el-row>
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-light task-detail">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bolder;">实验说明</span>

                    </div>
                    <div >
                        {{taskDetail}}
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "detail",
        data(){
            return{
                role:'0',// 0是老师，1是学生
                startTime:"2021/1/1 0:00",
                dueTime:"2021/1/7 0:00",
                submitTime:"2021/1/7 0:00",
                judgeTime:"-",
                hearTime:"-",
                taskName:"树协作",
                taskIntro:'一款基于深度学习架构的微信小程序开发平台',
                taskType:'微信小程序',
                taskLesson:'',
                teacher:'',
                taskDetail:'',
                submitCount:0,
                count:100,
                editTaskFormVisible:false,
                editProjectFormVisible:false,
                projectform:{
                  name:'',
                  intro:'',
                  type:'',
                },
                radio: 3,
                form: {
                    name:'',
                    intro:'',
                    term:'',
                    startTime:'',
                    dueTime:'',
                    submitTime:'',
                    studentid:1,
                },
                lesson:[],
                term:[],
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
            }
        },
        props:[],
        methods:{
            submitEditTaskForm(){

            },
            gotoEditShow(){
                this.$router.push('/show/editor/'+this.studentid)
            }
        }
    }
</script>

<style scoped>
    .task-image{
        text-align: center;
    }
    .demonstration{
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .time-table-style{
        margin-bottom: 5px;
        color: #909399
    }
    .time-table-time-style{
        color: #606266;
    }
    .info-table-style{
        color:#303133;
        margin-bottom: 5px;
    }
    .container-wrapper{
        background-color: #ffffff;
        padding: 20px 30px;
        border-radius: 4px
    }
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 5px;
    }
    .bg-purple-dark {
        background: #f4f6f8;

    }
    .student-detail{
        height: 150px;
        display:flex;
        justify-content:center;/*主轴上居中*/
        align-items:center;/*侧轴上居中*/

    }
    .student-submit{
        height: 150px;
        display: flex;
        justify-content: center;
        align-items:center;/*侧轴上居中*/
        border-right: 1px solid #DCDFE6;
        border-radius: 0px;
    }
    .student-submit-2{
        height: 150px;
        display: flex;
        justify-content: center;
        align-items:center;/*侧轴上居中*/
    }
    .student-submit-3{
        height: 150px;
        text-align: center;

    }
    .time-table{
        height: 150px;
        padding: 10px 20px;
    }

    .task-detail{
        height: 200px;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #ffffff;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 50px;
        margin-top: 10px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>