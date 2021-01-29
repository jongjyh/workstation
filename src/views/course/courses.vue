<template>
    <div  >
        <div class="title">
            <h2>我的课程</h2>
        </div>
        <div class="container-wrapper">
            <!--顶部div-->
            <el-row class="select-term-wrapper" type="flex" justify="space-between">
                <el-col span=7>
                    <span style=" color: rgba(107,114,128,1)" >请选择学期：</span>
                    <el-select v-model="chooseterm" placeholder="请选择">
                        <el-option
                                v-for="item in term"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col span=4 >
                    <el-button type="primary"  @click="addCourseFormVisible = true"><i class="el-icon-plus" style="margin-right: 10px"></i>创建新课程</el-button>

                </el-col>
            </el-row>
            <!--课程卡片div-->
            <div class="courses-wrapper" style="margin-top: 15px">
                <el-row>
                <el-col :span=5 v-for="(item, index) in course" :key="item.id" :offset="(index)%4 > 0 ? 1 : 0">
                    <el-card :body-style="{ padding: '10px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 10px 5px;">
                            <span >{{item.name}}</span>
                            <div class="bottom clearfix">
                                <time class="time">教师：{{item.teacher}}</time>
                                <router-link :to="{ name: 'courseInfo',params:{ id:  item.id  }}">
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
            <el-form :model="form">
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="老师名称" :label-width="formLabelWidth">
                    <el-input
                            placeholder="请输入内容"
                            v-model="this.teacher"
                            :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="开设学期" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择开设学期">
                        <el-option v-for="(item,index) in term" :label="item.label" value="item.index" :key='index'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程简介" :label-width="formLabelWidth">
                    <el-input type="textarea"
                              :rows="9"
                              placeholder="请输入课程简介"
                              v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCourseFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCourseFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "courses",
        data(){
            return{
                chooseterm:'',
                teacher:'路新喜',
                term:[
                    {
                        key:1,
                        label: "2020春季学期"
                    },
                    {
                        key:2,
                        label: "2020秋季学期"
                    },
                ],
                currentDate: new Date(),
                course:[
                    {
                        name:"走进软件",
                        teacher:"路新喜",
                        id:"1111",
                    },
                    {
                        name:"C语言程序设计",
                        teacher:"路新喜",
                        id:"1112",
                    },
                    {
                        name:"数学分析",
                        teacher:"路新喜",
                        id:"1113",
                    },
                    {
                        name:"C++语言程序设计",
                        teacher:"路新喜",
                        id:"1114",
                    },
                ],
                addCourseFormVisible:false,
                form: {
                    data: ''
                },
                formLabelWidth:100,
            }
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