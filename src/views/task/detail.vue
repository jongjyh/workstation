<template>
    <div class="container-wrapper">
        <el-dialog title="编辑实验" :visible.sync="editTaskFormVisible"
                   width="35%"
                   center>
            <el-form :model="basicForm" :rules="rules" ref="basicForm">
                <el-form-item label="实验名称" :label-width="formLabelWidth"  prop="taskName">
                    <el-input  placeholder="请输入实验名" v-model="basicForm.taskName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="老师名称" :label-width="formLabelWidth">
                    <el-input
                            placeholder="请输入内容"
                            v-model="basicForm.teacher"
                            :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否允许组队" :label-width="formLabelWidth"  >
                    <el-radio-group v-model="basicForm.team">
                        <el-radio :label=true>是</el-radio>
                        <el-radio :label=false>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="开始时间" :label-width="formLabelWidth"  prop="startTime">
                    <el-date-picker
                            v-model="basicForm.startTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" :label-width="formLabelWidth"  prop="dueTime">
                    <el-date-picker
                            v-model="basicForm.dueTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="实验说明" :label-width="formLabelWidth" prop="taskDetail">
                    <el-input type="textarea"
                              :rows="9"
                              placeholder="请输入实验说明"
                              v-model="basicForm.taskDetail" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editTaskFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditTaskForm('basicForm')">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑项目基本信息" :visible.sync="editprojectFormVisible"
                   width="35%"
                   center>
            <el-form :model="projectForm">
                <el-form-item label="项目名称" >
                    <el-input  placeholder="请输入项目名" v-model="projectForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" >
                    <el-radio-group v-model="projectForm.type">
                        <el-radio :label="1">静态网站</el-radio>
                        <el-radio :label="2">应用程序</el-radio>
                        <el-radio :label="3">其他</el-radio>

                    </el-radio-group>

                </el-form-item>
                <el-form-item label="外链" >
                    <el-input  placeholder="上传链接" v-model="projectForm.url" autocomplete="off" v-if="projectForm.type!==3" disabled="true"></el-input>
                    <el-input  placeholder="请输入项目链接（请填写URL链接）" v-model="projectForm.url" autocomplete="off" v-else></el-input>
                    <el-link type="primary" v-if="projectForm.type!==3" @click="uploadVisible=true">上传项目</el-link>
                    <upload-card :uploadVisible.sync="uploadVisible" :type="2" @func="getfileURL"></upload-card>
                </el-form-item>
                <el-form-item label="项目简介">
                    <el-input type="textarea"
                              :rows="9"
                              placeholder="简单地介绍下你的项目吧，10~20字"
                              v-model="projectForm.info" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <span style="color: #909399">提示：在你提交作业之前你的项目信息都将保存在本地，数据将在你登出之后清空，请注意保存。</span>
            <div slot="footer" class="dialog-footer">

                <el-button @click="editprojectFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveProjectInfoForm(projectForm)">保 存</el-button>
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
            <el-col :span="16"  ><div class="grid-content bg-purple-dark student-detail" >
                <el-button plain @click="editTaskFormVisible = true" icon="el-icon-edit">编辑实验信息</el-button>
                <el-button plain @click="downloadAllstudent()" icon="el-icon-download">下载所有学生作业</el-button></div></el-col>
        </el-row>
        <el-row v-if="role == 1">
            <el-col :span="4" >
                    <div class=" bg-purple-dark student-submit-2">
                        <div class="task-image">
                            <span class="demonstration">缩略图</span>
                            <el-image :src="src" style="width: 100px;height: 70px;border-radius: 10px"></el-image>
                        </div>
                        <div class="middle-style">

                            <el-tooltip class="item" effect="dark" content="请上传大约长宽比为740*400的缩略图，缩略图将出现在作品展示页" placement="bottom">
                                <el-button type="text" @click="uploadImgVisible=true" icon="el-icon-upload2">上传图片</el-button>
                            </el-tooltip>
                            <upload-card :uploadVisible.sync="uploadImgVisible" :type="1" @func="getImgURL"></upload-card>
                        </div>
                    </div>
            </el-col>
            <el-col :span="10">
                <div class=" bg-purple-dark student-submit-3">
                    <el-row style="margin-bottom: 15px" >
                        <el-col :span="6" class="time-table-style"><div>项目名称:</div></el-col>
                        <el-col :span="18" class="time-table-time-style"><div>{{this.projectForm.name}}</div></el-col>
                    </el-row >
                    <el-row  style="margin-bottom: 15px" type="flex" justify="center" align="middle">
                        <el-col :span="6" class="time-table-style"><div>项目简介</div></el-col>
                        <el-col :span="18" class="time-table-time-style"><div>{{this.projectForm.info}}</div></el-col>
                    </el-row>
                    <el-row style="margin-bottom: 15px" type="flex" justify="center" align="middle">
                        <el-col :span="6" class="time-table-style"><div>项目类型</div></el-col>
                        <el-col :span="18" class="time-table-time-style"><div>{{this.typeIndex[this.projectForm.type]}}</div></el-col>
                    </el-row>

                </div>
            </el-col>
            <el-col :span="10"  ><div class=" bg-purple-dark student-detail" >
                <el-button plain @click="gotoEditShow" icon="el-icon-edit">编辑展示页面</el-button>
                <el-button plain @click="editprojectFormVisible = true" icon="el-icon-edit-outline">编辑项目信息</el-button>
                <el-tooltip  content="您只能提交一次！当您是一名队员或者已经超时，该按钮不可用" placement="bottom" effect="light">
                    <div style="margin-left: 10px">
                        <el-button plain @click="commitProject" :disabled="!this.leader||this.commitInfo.status||commitTimeLimited()" icon="el-icon-check">提交我的作业</el-button>
                    </div>
                </el-tooltip>

            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="10"><div class="grid-content bg-purple-dark time-table">
                <el-row  style="margin-top: 15px">
                    <el-col :span="8" class="time-table-style"><div>开始时间:</div></el-col>
                    <el-col :span="12" class="time-table-time-style"><div>{{this.basicForm.startTime}}</div></el-col>
                </el-row >
                <el-row  style="margin-top: 15px">
                    <el-col :span="8" class="time-table-style"><div>结束时间:</div></el-col>
                    <el-col :span="12" class="time-table-time-style"><div>{{this.basicForm.dueTime}}</div></el-col>
                </el-row>
                <el-row  style="margin-top: 15px">
                    <el-col :span="8" class="time-table-style"><div>最后提交时间:</div></el-col>
                    <el-col :span="12" class="time-table-time-style"><div>{{this.commitInfo.time}}</div></el-col>
                </el-row>
            </div></el-col>
            <el-col :span="12" :offset="2"><div class="grid-content bg-purple-light task-info" >
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <i class="el-icon-info"></i>
                        <span style="font-weight: bolder; margin-left: 10px" >基本信息</span>
                    </div>
                    <div >
                        <el-row  style="margin-bottom: 5px">
                            <el-col :span="8" class="info-table-style"><div>实验名称:</div></el-col>
                            <el-col :span="12" class="time-table-time-style"><div>{{this.basicForm.taskName}}</div></el-col>
                        </el-row >
                        <el-row  style="margin-bottom: 5px">
                            <el-col :span="8" class="info-table-style"><div>所属课程:</div></el-col>
                            <el-col :span="12" class="time-table-time-style"><div>{{this.basicForm.taskLesson}}</div></el-col>
                        </el-row>
                        <el-row  style="margin-bottom: 5px">
                            <el-col :span="8" class="info-table-style"><div>指导教师:</div></el-col>
                            <el-col :span="12" class="time-table-time-style"><div>{{this.basicForm.teacher}}</div></el-col>
                        </el-row>
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
        <!--学生管理-->
        <el-row v-if="role=='0'">
            <el-col :span="24"><div class="grid-content bg-purple-light task-detail">
                <el-card class="box-card" shadow="never" >
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bolder;">学生管理</span>
                    </div>
                    <div>
                        <template>
                            <el-table
                                    :data="students.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.uid.includes(search))"
                                    max-height="400"
                                    style="width: 100%">
                                <el-table-column
                                        label="学号"
                                        type="index"
                                        width="130">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.uid }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="姓名"
                                        width="140">
                                    <template slot-scope="scope">
                                        <el-popover trigger="hover" placement="top">
                                            <p>姓名: {{ scope.row.name }}</p>
                                            <div slot="reference" class="name-wrapper">
                                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="提交时间"
                                        width="200">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            <i class="el-icon-time"></i>
                                            <span style="margin-left: 10px" >{{ scope.row.time }}</span>
                                            <span style="margin-left: 10px" v-if="scope.row.status==false">-</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="状态"
                                        width="130">
                                    <template slot-scope="scope">
                                            <div slot="reference" class="name-wrapper">
                                                <el-tag size="medium" type="success" v-if="scope.row.status==true">已提交</el-tag>
                                                <el-tag size="medium" type="danger" v-else-if="scope.row.status==false">未提交</el-tag>
                                            </div>
                                    </template>
                                </el-table-column>
                                <el-table-column v-if="basicForm.team"
                                        label="队长"
                                        width="130">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag size="medium" type="danger" v-if="scope.row.groups.length===1">无队伍</el-tag>
                                            <el-tag size="medium" type="success" v-else-if="scope.row.groups.length!==1">队伍中</el-tag>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                icon="el-icon-download"
                                                size="mini"
                                                @click="dwone(scope.$index, scope.row)" :disabled="!scope.row.status" >下载</el-button>
                                        <el-button
                                                icon="el-icon-trophy"
                                                size="mini"
                                                type="success"
                                                @click="Recommend(scope.$index, scope.row)" v-if="scope.row.rec==false" :disabled="!scope.row.status">推荐</el-button>
                                        <el-button
                                                icon="el-icon-close"
                                                size="mini"
                                                type="danger"
                                                @click="Recommend(scope.$index, scope.row)" v-if="scope.row.rec==true" :disabled="!scope.row.status">取消推荐</el-button>

                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="right">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="search"
                                                size="mini"
                                                placeholder="请输入学号"/>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <div class="pageination-style" >
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[2, 10, 300, 400]"
                                :page-size="pagesize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="count">
                        </el-pagination>
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
        <!--实验说明-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-light task-detail">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <i class="el-icon-s-order"></i>
                        <span style="font-weight: bolder; margin-left: 10px">实验说明</span>

                    </div>
                    <div >
                        {{basicForm.taskDetail}}
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
<!--队伍-->
        <el-row>
            <el-col :span="5">
                <team-card  :eid="id"
                            :uid="uid"
                            :group="commitInfo.groups"
                            v-if="projectForm.team"
                            @change="handleTeamStatusChange"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getTask,editTask} from '@/api/task'
    import {submitCount,dwOne,dwAll,setRecommend} from '@/api/download'
    import {upload,commit,getCommit} from '@/api/submit'
    import TeamCard from "./components/teamCard";
    import {uploadImg} from "../../api/submit";
    import global from '@/Base.vue'
    import UploadCard from "./components/uploadCard";
    export default {
        name: "detail",
        components: {UploadCard, TeamCard},
        data(){
            var checkDate  = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择开始日期'));
                }
                else {
                    if (this.basicForm.dueTime !== '') {
                        this.$refs.basicForm.validateField('dueTime');
                    }
                    callback();
                }
            }
            var checkDate2  = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择结束日期'));
                }else if(!this.basicForm.startTime) {
                    callback(new Error('请先选择开始日期'));
                }
                else if (this.compareDate(this.basicForm.startTime,this.basicForm.dueTime)) {
                    callback(new Error('结束日期必须晚于开始日期'));
                }
                else if (this.compareDate2(this.basicForm.dueTime)) {
                    callback(new Error('结束日期必须晚于当前时间'));
                }else {
                    callback();
                }
            }
            return{
                role:'1',// 0是老师，1是学生
                id:0,
                cid:0,
                uid:0,
                tagIndex:['danger','success','info','warning'],
                typeIndex:['无','静态网站','应用程序','其他'],
                basicForm:{
                    startTime:"",
                    dueTime:"",
                    taskName:"",
                    taskLesson:'',
                    teacher:'',
                    taskDetail:'',
                    team:false,
                },
                rules:{
                    taskName:[
                        { required: true, message: '请输入实验名称', trigger: 'blur' },
                    ],
                    taskDetail:[
                        { required: true, message: '请输入实验简介', trigger: 'blur' },
                    ],
                    startTime:[
                        { required: true,trigger: 'blur' },
                        { validator:checkDate, trigger: 'blur' },
                    ],
                    dueTime:[
                        { required: true,trigger: 'blur' },
                        { validator:checkDate2, trigger: 'blur' },

                    ],
                },
                leader:true,
                submitCount:0,
                count:0,
                students:[],
                search: '',
                currentPage:1,
                pagesize:10,
                editTaskFormVisible:false,
                editprojectFormVisible:false,
                uploadImgVisible:false,
                projectForm:{
                  name:'',
                  info:'',
                  type:0,
                    url:'',
                    readme:'',
                    thumb:'',
                },
                uploadVisible:false,
                fileList:[],
                imgfileList:[],
                commitInfo:{
                  status:false,
                  rec:false,
                  uid:"",
                  groups:[],
                  time:"",
                    name: "",
                    info: "",
                    type: 0,
                    url: "",
                    readme: "",
                },
                radio: 1,//类型
                lesson:[],//所属课程
                formLabelWidth:"100",
                src: ''
            }
        },
        props:[],
        created(){
            this.uid=this.$store.getters['user/id']
            let role =  this.$store.getters['user/role']
            if(role === 'teacher')
                this.role= 0
            else
                this.role = 1
            this.id=this.$route.params.id
            this.load(this.id)
        },
        methods:{
            handleTeamStatusChange(status){
              this.leader=status;
              console.log(this.leader)
            },
            getfileURL(data){
                this.projectForm.url=data
            },
            getImgURL(data){
                this.projectForm.thumb=data
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/thumb',this.projectForm.thumb)
                this.src=global.BACKEND_URL+'/img/'+this.projectForm.thumb
            },

            async Recommend(index, item){
                const res= await setRecommend({},this.id,item.uid)
                if(res.code == 200)
                {
                    if(this.students[index].rec==false) {
                        this.$message({
                            message: '推荐成功',
                            type: 'success'
                        });
                        this.students[index].rec=true
                    }
                    else{
                        this.$message({
                            message: '取消推荐成功',
                            type: 'success'
                        });
                        this.students[index].rec=false
                    }
                }
                else
                    console.log(res)
            },
            handleSizeChange(val) {
                this.pagesize=val
                console.log(`每页 ${this.pagesize} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage=val
                console.log(`当前页: ${val}`);
            },
            async dwone(index,item){
                const res = await dwOne({},this.id,item.uid)
                if(res.status==200){
                    let url = window.URL.createObjectURL(new Blob([res.data]));
                    // 生成一个a标签
                    let link = document.createElement("a");
                    link.style.display = "none";
                    link.href = url;
                    // 生成时间戳
                    let timestamp=new Date().getTime();
                    link.download = timestamp + ".zip";
                    document.body.appendChild(link);
                    link.click();
                }
                else
                    console.log(res)
            },
            async downloadAllstudent(){
              const res = await dwAll({},this.id)
                if(res.status==200){
                    let url = window.URL.createObjectURL(new Blob([res.data]));
                    // 生成一个a标签
                    let link = document.createElement("a");
                    link.style.display = "none";
                    link.href = url;
                    // 生成时间戳
                    let timestamp=new Date().getTime();
                    link.download = timestamp + ".zip";
                    document.body.appendChild(link);
                    link.click();
                }
                else
                    console.log(res)
            },
            async load(id){
                const res= await getTask({},id)

                if(res.code== 200){
                    let data=res.data;
                    console.log(res.data)
                    this.cid=data.cid
                    this.basicForm.startTime=data.begin
                    this.basicForm.taskName=data.name
                    this.basicForm.teacher=data.teacher_name;
                    this.basicForm.taskDetail=data.info
                    this.basicForm.taskLesson=data.cname
                    this.basicForm.dueTime=data.end
                    this.basicForm.team=data.team
                    this.resources=data.resources;
                }
                else
                    console.log(res)
                //老师初始化数据
                if(this.role==0) {
                    const res2 = await submitCount({}, id)
                    if (res2.code == 200) {
                        let data=[];
                        data = res2.data
                        console.log(res2.data)
                        this.count = data.length
                        this.students=res2.data
                        this.students.forEach(item =>{
                            item.name=item.groups.find( x => x.account===item.uid).name
                            if(item.status==true)
                                ++this.submitCount;
                        })
                    } else
                        console.log(res2)
                }
                //学生初始化项目
                else{
                    const res=await getCommit({},this.id);
                    if(res.code==200)
                    {
                        this.commitInfo=res.data
                        if(this.commitInfo.status==false)
                        {
                            console.log(this.commitInfo)
                            this.loadProjectInfoFormFromLocal()
                        }
                        else{
                            this.projectForm={...this.commitInfo}
                            this.src=global.BACKEND_URL+'/img/'+this.projectForm.thumb
                            console.log(this.projectForm)
                        }
                    }else
                        console.log(res)

                }
            },
            async submitEditTaskForm(formName){
                let data={
                    begin:this.basicForm.startTime,
                    end:this.basicForm.dueTime,
                    info:this.basicForm.taskDetail,
                    name:this.basicForm.taskName,
                    team:this.basicForm.team,
                }
                this.$refs[formName].validate(async (valid) => {
                    if(valid){
                        const res= await editTask(data,this.id)
                        if(res.code == 200)
                        {
                            this.$message({
                                message:'修改实验成功',
                                type: 'success'
                            });
                        }
                        else
                            console.log(res)
                        this.editTaskFormVisible= false
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })

            },
            saveProjectInfoForm(form){
                console.log(form)
                let localStorage=window.localStorage
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/name',form.name)
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/info',form.info)
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/type',form.type)
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/thumb',form.thumb)

             //   localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/readme',form.readme)
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/url',form.url)
                this.editprojectFormVisible=false
                this.$message({
                    message:'保存成功',
                    type: 'success'
                });
            },
            loadProjectInfoFormFromLocal(){
                let localStorage=window.localStorage
                this.projectForm.name=localStorage.getItem(this.uid+'/'+this.cid+'/'+this.id+'/name')
                this.projectForm.info=localStorage.getItem(this.uid+'/'+this.cid+'/'+this.id+'/info')
                this.projectForm.type=Number(localStorage.getItem(this.uid+'/'+this.cid+'/'+this.id+'/type'))
                this.projectForm.readme=localStorage.getItem(this.uid+'/'+this.cid+'/'+this.id+'/readme')
                this.projectForm.url=localStorage.getItem(this.uid+'/'+this.cid+'/'+this.id+'/url')
                this.projectForm.thumb=localStorage.getItem(this.uid+'/'+this.cid+'/'+this.id+'/thumb')
                this.src=global.BACKEND_URL+'/img/'+this.projectForm.thumb
            },
            gotoEditShow(){
                if(this.commitInfo.status===false && this.projectForm.readme==null)
                this.$router.push(
                {name: 'editor', params: {cid: this.cid,eid: this.id, uid: this.uid}})
                else{
                    console.log(this.projectForm.readme)
                    this.$router.push(
                        {name: 'editor', params: {cid: this.cid,eid: this.id, uid: this.uid,readme:this.projectForm.readme}})
                }
            },
            commitTimeLimited(){
                let startTime= new Date();
                let endTime=new Date(Date.parse(this.basicForm.dueTime));
//进行比较
                return startTime>endTime
            },
            async commitProject(){
                const res=await commit(this.projectForm,this.id)
                if(res.code==200)
                {
                    this.$message({
                        message:'提交作业成功',
                        type: 'success'
                    });
                    this.commitInfo.time=new Date()
                    this.commitInfo.status=true
                }else
                    console.log(res)
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
        }
    }
</script>

<style scoped>
    .center-style{
        text-align: center;
    }
    .pageination-style{
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }
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
    }
    .middle-style{
        margin: 0 auto;
        text-align: center;
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