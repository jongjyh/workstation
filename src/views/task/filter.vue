<template>
        <div class="inner_wrapper" v-loading="loading">
            <div class="inner_title">未完成作业</div>
            <el-dialog title="创建作业" :visible.sync="addTaskFormVisible"
                       width="35%"
                       center>
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="作业名称" :label-width="formLabelWidth" prop="name">
                        <el-input  placeholder="请输入作业名" v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="老师名称" :label-width="formLabelWidth">
                    <el-input
                            placeholder="请输入内容"
                            v-model="this.teacher"
                            :disabled="true" >
                    </el-input>
                </el-form-item>

                    <el-form-item label="所属课程" :label-width="formLabelWidth"  prop="cid">
                        <el-select v-model="form.cid" placeholder="请选择所属课程">
                            <el-option v-for="item in lesson" :label="item.name+'-'+item.tname" :value="item.cid" :key="item.cid"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否允许组队" :label-width="formLabelWidth"  >
                        <el-radio-group v-model="form.team">
                            <el-radio :label=true>是</el-radio>
                            <el-radio :label=false>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="作业说明" :label-width="formLabelWidth" prop="intro">
                        <el-input type="textarea"
                                  :rows="9"
                                  placeholder="请输入作业说明"
                                  v-model="form.intro" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addTaskFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitCreatTaskForm('form')">确 定</el-button>
                </div>
            </el-dialog>
            <el-row :gutter="20">
                <el-col :span="1" ><el-button type="primary" plain v-if="this.role == 'teacher'" @click="addTaskFormVisible = true" icon="el-icon-plus">创建作业</el-button>
                </el-col>
                <el-col :span="5" :offset="15">
                    <el-input
                        placeholder="请输入作业名称"
                        prefix-icon="el-icon-search"
                        v-model="searchContent"
                        @change="searchTask">
                </el-input>
                </el-col>
                <el-col :span="1" ><el-button icon="el-icon-search" circle></el-button>
                </el-col>
                <el-col :span="1" ><el-button type="primary" icon="el-icon-refresh" @click="loadTask" circle></el-button>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col >
                    <el-table
                        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !searchContent || data.name.toLowerCase().includes(searchContent.toLowerCase()))"
                        style="width: 100%"
                        border
                        :row-class-name="tableRowClassName">
                        <el-table-column
                                type="index"
                                label="#"
                                sortable
                                >
                        </el-table-column>
                    <el-table-column
                            prop="name"
                            label="作业名"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="lesson"
                            label="所属课程"
                            width="250"
                            sortable>
                    </el-table-column>
                        <el-table-column
                                prop="term_name"
                                label="所属学期"
                                width="180"
                                sortable>
                        </el-table-column>
                    <el-table-column
                            prop="teacher_name"
                            label="教师"
                            sortable>
                    </el-table-column>
                        <el-table-column
                                prop="operation"
                                label="提交状态"
                                sortable>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="120">
                            <template slot-scope="scope">
                                <el-button
                                        @click.native.prevent="open(scope.$index, tableData)"
                                        type="text"
                                        size="small"

                                        >
                                    查看
                                </el-button>
                            </template>
                        </el-table-column>
                </el-table></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" :offset="6">  <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 50, 100]"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div></el-col>
            </el-row>
        </div>
</template>

<script>
    import {tasks,creatTask,courseTasks} from '@/api/task'
    import {courses,getCourse} from '@/api/course'
    export default {
        name: "filter",
        created(){
            this.role = this.$store.getters['user/role']
            this.teacher = this.$store.getters['user/userInfo'].nickName
            this.loadTask()

        },
        props:{
            courseId:Number,
        },
        methods: {
            searchTask(){

            },
            open(index, tableData){
                this.$router.push('/task/detail/'+tableData[index].id)
            },
            tableRowClassName({row, rowIndex}) {

                if (row.operation === '已提交') {

                    return 'commit-row';
                } else if (row.operation === '未提交') {
                    return 'uncommit-row';
                }
                return '';
            },
            handleSizeChange(val) {
                this.pagesize=val
                console.log(`每页 ${this.pagesize} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage=val
                console.log(`当前页: ${val}`);
            },
            async submitCreatTaskForm(formName){
                let data={
                    name:this.form.name,
                    info:this.form.intro,
                    team:this.form.team,
                    tid:this.form.term.tid,
                    cid:this.form.cid,
                }
                this.$refs[formName].validate(async (valid) => {
                    if(valid){
                        const res= await creatTask(data)
                        if(res.code == 200)
                        {
                            this.$message({
                                message:'创建作业成功',
                                type: 'success'
                            });
                        }
                        else
                            console.log(res)
                        Object.keys(this.form).forEach(key => this.form[key] = '');
                        this.addTaskFormVisible = false
                        this.loadTask()
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })

            },
            async loadTask(){
                //总作业列表
                if(typeof(this.courseId)==="undefined") {
                    const res = await tasks()
                    this.tableData=[]
                    if (res.code == 200) {
                        let tasks = res.data;
                        if(tasks && tasks.length!==0) {
                            tasks.forEach(task => {
                                task.lesson
                                    = task.cname;
                                if(this.role=='student')
                                    task.operation =  (task.submit==true? '已提交':"未提交");
                                else
                                    task.operation = '-';
                                delete task.begin;
                                delete task.end;
                                delete task.cname;
                                this.tableData.push(task)
                            })
                        }
                    } else
                        console.log(res)
                    const res2=await courses({})
                    if(res2.code == 200){

                        this.lesson=res2.data;
                    }
                    else {
                            console.log(res2)
                        }
                }

                //某个课程页下的作业列表
                else
                {
                    const res = await courseTasks({},this.courseId)
                    if (res.code == 200) {
                        let tasks = res.data;
                        if(tasks && tasks.length!==0)
                        tasks.forEach(task => {
                            task.lesson = task.cname;
                            task.operation = '-';
                            delete task.begin;
                            delete task.end;
                            delete task.cname;
                            this.tableData.push(task)
                        })
                    } else
                        console.log(res)
                    const res2=await getCourse({},this.courseId)
                    if(res2.code == 200){
                        this.lesson.push(res2.data);
                    }
                    else {
                        console.log(res2)
                    }
                }
                this.total=this.tableData.length
                this.loading=false
            },
            compareDate(start,due)
            {
                start= start.replace("-","/");//替换字符，变成标准格式
                start= new Date(Date.parse(start));
                due= due.replace("-","/");//替换字符，变成标准格式
                due= new Date(Date.parse(due));
                if(start < due) {
                    return false
                }
                return true
            },
            compareDate2(due){
                let now= new Date();
                due= due.replace("-","/");//替换字符，变成标准格式
                due= new Date(Date.parse(due));
                if(now < due) {
                    return false
                }
                return true
            }
        },
        data() {
            return {
                loading:true,
                role:'teacher',
                teacher:'',
                addTaskFormVisible:false,
                tableData: [],
                formLabelWidth:"100",
                total:400,
                pagesize:10,
                currentPage:1,
                form: {
                    name:'',
                    intro:'',
                    term:{},
                    submitTime:'',
                    cid:'',
                    team:false
                },
                searchContent:'',
                lesson:[],
                term:[],
                rules: {
                    cid: [
                        { required: true, message: '请选择课程', trigger: 'blur' },
                    ],
                    name:[
                        { required: true, message: '请输入作业名称', trigger: 'blur' },
                    ],
                    intro:[
                        { required: true, message: '请输入作业简介', trigger: 'blur' },
                    ],
                },
            }
        }
    }
</script>

<style>
    .el-table .commit-row {
        background: #f0f9eb;
    }

    .el-table .uncommit-row {
    }
</style>
<style  scoped>

    .inner_title{
        color: #515a6e;
        font-weight:700;
        font-size: 25px;
        margin-bottom: 30px;
        margin-top:10px;
    }
    .inner_wrapper{
        background-color: #FFFFFF;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding:16px;
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
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>