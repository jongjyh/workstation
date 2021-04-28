<template>
    <div class="container-wrapper" v-loading="loading">
        <el-dialog title="编辑作业" :visible.sync="editTaskFormVisible"
                   width="35%"
                   center>
            <el-form :model="basicForm" :rules="rules" ref="basicForm">
                <el-form-item label="作业名称" :label-width="formLabelWidth"  prop="taskName">
                    <el-input  placeholder="请输入作业名" v-model="basicForm.taskName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否允许组队" :label-width="formLabelWidth"  >
                    <el-radio-group v-model="basicForm.team">
                        <el-radio :label=true>是</el-radio>
                        <el-radio :label=false>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="作业说明" :label-width="formLabelWidth" prop="taskDetail">
                    <el-input type="textarea"
                              :rows="9"
                              placeholder="请输入作业说明"
                              v-model="basicForm.taskDetail" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editTaskFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditTaskForm('basicForm')">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑作品基本信息" :visible.sync="editprojectFormVisible"
                   width="35%"
                   center>
            <el-form :model="projectForm" :rules="rules2">
                <el-form-item label="作品名称" >
                    <el-input  placeholder="请输入作品名" v-model="projectForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作品类型" >
                    <el-radio-group v-model="projectForm.type">
                        <el-radio :label="1">静态网站</el-radio>
                        <el-radio :label="2">应用程序</el-radio>
                        <el-radio :label="3">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="外链" >
                    <el-input  placeholder="点击上传作品按钮来获取链接" v-model="projectForm.src_url" autocomplete="off" v-if="projectForm.type!==3" :disabled="true"></el-input>
                    <el-input  placeholder="请输入作品链接（请填写URL链接）" v-model="projectForm.src_url" autocomplete="off" v-else></el-input>
                    <el-link type="primary" v-if="projectForm.type!==3" @click="uploadSRCVisible=true">上传作品</el-link>
                    <upload-card :uploadVisible.sync="uploadSRCVisible" :type="2" @func="getfileURL"></upload-card>
                </el-form-item>
                <el-form-item label="源代码文件" >
                    <el-input  placeholder="点击上传源代码按钮来获取链接" v-model="projectForm.dist_url" autocomplete="off"  :disabled="true"></el-input>
                    <el-link type="primary"  @click="uploadDISTVisible=true">上传源代码</el-link>
                    <upload-card :uploadVisible.sync="uploadDISTVisible" :type="2" @func="getcodeURL"></upload-card>
                </el-form-item>
                <el-form-item label="作品简介" prop="info">
                    <el-input type="textarea"
                              :rows="9"
                              placeholder="简单地介绍下你的作品吧，10~20字"
                              maxlength="20"
                              show-word-limit
                              v-model="projectForm.info" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <span style="color: #909399">提示：在你提交作业之前你的作品信息都将保存在本地，数据将在你登出之后清空，请注意保存。</span>
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
                <el-button plain @click="editTaskFormVisible = true" icon="el-icon-edit">编辑作业信息</el-button>
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
                                <el-button type="text" @click="uploadImgVisible=true" icon="el-icon-upload2">修改图片</el-button>
                            </el-tooltip>
                            <upload-card :uploadVisible.sync="uploadImgVisible" :type="1" @func="getImgURL"></upload-card>
                        </div>
                    </div>
            </el-col>
            <el-col :span="10">
                <div class=" bg-purple-dark student-submit-3">
                    <el-row style="margin-bottom: 15px" >
                        <el-col :span="6" class="time-table-style"><div>作品名称:</div></el-col>
                        <el-col :span="18" class="time-table-time-style"><div>{{this.projectForm.name}}</div></el-col>
                    </el-row >
                    <el-row  style="margin-bottom: 15px" type="flex" justify="center" align="middle">
                        <el-col :span="6" class="time-table-style"><div>作品简介</div></el-col>
                        <el-col :span="18" class="time-table-time-style"><div>{{this.projectForm.info}}</div></el-col>
                    </el-row>
                    <el-row style="margin-bottom: 15px" type="flex" justify="center" align="middle">
                        <el-col :span="6" class="time-table-style"><div>作品类型</div></el-col>
                        <el-col :span="18" class="time-table-time-style"><div>{{this.typeIndex[this.projectForm.type]}}</div></el-col>
                    </el-row>

                </div>
            </el-col>
            <el-col :span="10"  ><div class=" bg-purple-dark student-detail" >
                <el-button plain @click="gotoEditShow" icon="el-icon-edit">编辑展示页面</el-button>
                <el-button plain @click="editprojectFormVisible = true" icon="el-icon-edit-outline">编辑作品信息</el-button>
                <el-button plain @click="Preview" icon="el-icon-view" >预览</el-button>
            </div></el-col>
        </el-row>
        <el-row type="flex" align="middle">
            <el-col :span="10" v-if="role== 1">
                <div class="grid-content bg-purple-dark time-table">
                <el-row  style="margin-top: 15px" type="flex" align="middle" justify="center">
                    <el-col :span="8" class="time-table-style"><div>最后提交时间:</div></el-col>
                    <el-col :span="12" class="time-table-time-style"><div>{{this.commitInfo.time}}</div></el-col>
                </el-row>
                <el-row type="flex" align="middle" justify="center">
                    <el-tooltip  content="仅上传源码队长可以提交作业" placement="bottom" effect="light">
                        <div>
                            <el-button plain @click="commitProject" :disabled="!this.leader||this.projectForm.src_url===''||this.projectForm.src_url==='null'||this.projectForm.dist_url===''" icon="el-icon-check">提交我的作业</el-button>
                        </div>
                    </el-tooltip>
                </el-row>
            </div>
            </el-col>
            <el-col :span="10" v-if="role== 0">
                <div class="grid-content bg-purple-dark time-table">
                    <el-row  style="margin-top: 15px" type="flex" align="middle" justify="center">
                        <el-col :span="8" class="time-table-style"><div>个人/团体:</div></el-col>
                        <el-col :span="12" class="time-table-time-style"><div>{{this.basicForm.team==true?'团队作品':'个人作品'}}</div></el-col>
                    </el-row>
                    <el-row  style="margin-top: 15px" type="flex" align="middle" justify="center">
                        <el-col :span="8" class="time-table-style"><div>学生人数:</div></el-col>
                        <el-col :span="12" class="time-table-time-style"><div>{{this.count}}</div></el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="12" :offset="2"><div class="grid-content bg-purple-light task-info" >
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <i class="el-icon-info"></i>
                        <span style="font-weight: bolder; margin-left: 10px" >基本信息</span>
                    </div>
                    <div >
                        <el-row  style="margin-bottom: 5px">
                            <el-col :span="8" class="info-table-style"><div>作业名称:</div></el-col>
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
                                        width="90">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.uid }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="姓名"
                                        width="120">
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
                                        label="最新提交的版本信息"
                                        width="190">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            <i class="el-icon-time"></i>
                                            <span style="margin-left: 10px" >{{ scope.row.time }}</span>
                                            <span style="margin-left: 10px" v-if="scope.row.status==false">-</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="上次推荐时间"
                                        width="190">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            <i class="el-icon-time"></i>
                                            <span style="margin-left: 10px" >{{ scope.row.rec_time }}</span>
                                            <span style="margin-left: 10px" v-if="scope.row.rec_time===''">-</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="状态"
                                        width="70">
                                    <template slot-scope="scope">
                                            <div slot="reference" class="name-wrapper">
                                                <el-tag size="medium" type="success" v-if="scope.row.status==true">已提交</el-tag>
                                                <el-tag size="medium" type="danger" v-else-if="scope.row.status==false">未提交</el-tag>
                                            </div>
                                    </template>
                                </el-table-column>
                                <el-table-column v-if="basicForm.team"
                                        label="队长"
                                        width="110">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag size="medium" type="danger" v-if="!scope.row.groups||scope.row.groups.length===1">无队伍</el-tag>
                                            <el-tag size="medium" type="success" v-else-if="scope.row.groups.length!==1">{{scope.row.uid===scope.row.gid?'自己':scope.row.gid}}</el-tag>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="500">
                                    <template slot-scope="scope">
                                        <el-button
                                                icon="el-icon-download"
                                                size="mini"
                                                type="primary"
                                                plain
                                                @click="dwone(scope.$index, scope.row)" :disabled="!scope.row.status||scope.row.uid!==scope.row.gid" >作品</el-button>
                                        <el-button
                                                icon="el-icon-download"
                                                size="mini"
                                                type="primary"
                                                plain
                                                @click="dwone(scope.$index, scope.row)" :disabled="!scope.row.status||scope.row.uid!==scope.row.gid" >源代码</el-button>
                                        <el-button
                                                icon="el-icon-trophy"
                                                size="mini"
                                                type="success"
                                                @click="Recommend(scope.$index, scope.row,true)"  :disabled="!scope.row.status||scope.row.uid!==scope.row.gid">推荐当前版本</el-button>
                                        <el-button
                                                icon="el-icon-close"
                                                size="mini"
                                                type="danger"
                                                @click="Recommend(scope.$index, scope.row,false)"  :disabled="!scope.row.status||scope.row.uid!==scope.row.gid||scope.row.rec_time===''">取消推荐</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="400">
                                    <template slot-scope="scope">
                                        <el-button
                                                icon="el-icon-view"
                                                size="mini"
                                                type="info"
                                                @click="View(scope.$index, scope.row.showid,3)"  :disabled="scope.row.uid!==scope.row.gid">预览最新提交</el-button>
                                        <el-button
                                                icon="el-icon-view"
                                                size="mini"
                                                type="info"
                                                @click="View(scope.$index, scope.row.showid,1)"  :disabled="scope.row.uid!==scope.row.gid">预览推荐版本</el-button>
                                        <el-button
                                            icon="el-icon-edit"
                                            size="mini"
                                            type="primary"
                                            @click="edit(scope.$index, scope.row.uid)"  :disabled="scope.row.uid!==scope.row.gid">编辑</el-button>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        align="right"
                                        width="200">
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
                    <edit-project-card :dialogFormVisible.sync="editProjectVisible"  :eid="this.id"  ref="editProjectDOM"/>
                    <div class="pageination-style" >
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[5, 10, 100]"
                                :page-size="pagesize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="count">
                        </el-pagination>
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
        <!--作业说明-->
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-light task-detail">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <i class="el-icon-s-order"></i>
                        <span style="font-weight: bolder; margin-left: 10px">作业说明</span>

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
                            v-if="role===1 && basicForm.team"
                            @change="handleTeamStatusChange"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getTask,editTask} from '@/api/task'
    import {submitCount,dwOne,dwAll,setRecommend} from '@/api/download'
    import {upload,commit,getCommit, tecGetCommit} from '@/api/submit'
    import TeamCard from "./components/teamCard";
    import {uploadImg} from "../../api/submit";
    import global from '@/Base.vue'
    import UploadCard from "./components/uploadCard";
    import EditProjectCard from "./components/editProjectCard";
    export default {
        name: "detail",
        components: {EditProjectCard, UploadCard, TeamCard},
        data(){
            return{
                role:'1',// 0是老师，1是学生
                id:0,
                cid:0,
                uid:0,
                loading:true,
                tagIndex:['danger','success','info','warning'],
                typeIndex:['无','静态网站','应用程序','其他'],
                basicForm:{
                    taskName:"",
                    taskLesson:'',
                    teacher:'',
                    taskDetail:'',
                    team:false,
                },
                rules:{
                    taskName:[
                        { required: true, message: '请输入作业名称', trigger: 'blur' },
                    ],
                    taskDetail:[
                        { required: true, message: '请输入作业简介', trigger: 'blur' },
                    ],
                },
                rules2:{
                    info:[{required:true ,message: '请输入作品简介，不超过15字', trigger: 'blur' }]
                },
                leader:true,
                submitCount:0,
                count:0,
                students:[],
                search: '',
                currentPage:1,
                pagesize:10,
                editProjectVisible:false,
                editTaskFormVisible:false,
                editprojectFormVisible:false,
                uploadImgVisible:false,
                projectForm:{
                  name:'',
                  info:'',
                  type:0,
                    dist_url:'',
                    src_url:'',
                    readme:'',
                    thumb:'',
                },
                uploadSRCVisible:false,
                uploadDISTVisible:false,
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
                    src_url: "",
                    dist_url: "",
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
            console.log(role)
            if(role === 'teacher'||role==='admin')
                this.role= 0
            else
                this.role = 1
            this.id=this.$route.params.id
            this.load(this.id)
        },
        methods:{
            handleTeamStatusChange(status){
              this.leader=status;
            },
            getfileURL(data){
                this.projectForm.src_url=data
            },
            getcodeURL(data){
              this.projectForm.dist_url=data
            },
            getImgURL(data){
                this.projectForm.thumb=data
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/thumb',this.projectForm.thumb)
                this.src=global.BACKEND_URL+'/img/'+this.projectForm.thumb
            },
            async edit(index,id){
              const res=await tecGetCommit(this.id,id);
              if(res.code==200){
                  this.$refs.editProjectDOM.getData(res.data,id);
                  this.editProjectVisible=true

              }
              else
                  console.log(res)
            },
            async Recommend(index, item,rec){
                let data={
                    account:item.uid,
                    rec:rec,
                }
                const res= await setRecommend(data,this.id)
                if(res.code == 200)
                {
                    if(rec===true) {
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        });
                    }
                    else{
                        this.$message({
                            message: '取消推荐成功',
                            type: 'success'
                        });
                    }
                }
                else
                    console.log(res)
                this.load(this.id)
            },
            //教师预览模式
            View(index,showid,mode){
                this.$router.push({name: 'projectDetail', params: {url: showid,mode:mode}})
            },
            Preview(){
                let data={...this.projectForm}
                data.groups=this.commitInfo.groups
                data.gid=this.commitInfo.gid
                data.rec=this.commitInfo.gid
                let strItem = JSON.stringify(data);
                this.$router.push({name: 'projectDetail', params: {data: encodeURIComponent(strItem),mode:0}})
            },
            handleSizeChange(val) {
                this.pagesize=val
            },
            handleCurrentChange(val) {
                this.currentPage=val
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
                    this.cid=data.cid
                    this.basicForm.taskName=data.name
                    this.basicForm.teacher=data.teacher_name;
                    this.basicForm.taskDetail=data.info
                    this.basicForm.taskLesson=data.cname
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
                        this.count = data.length
                        this.students=res2.data
                        console.log(this.students)
                        this.submitCount=0
                        this.students.forEach(item =>{
                           item.name=item.groups.find( x => x.account===item.uid).name
                            if(item.status==true)
                                ++this.submitCount;
                        })
                    } else
                        console.log(res2)
                    this.loading=false
                }
                //学生初始化作品
                else{
                    const res=await getCommit({},this.id);
                    if(res.code==200)
                    {
                        this.commitInfo=res.data
                        this.loadProjectInfoFormFromLocal()
                        console.log(this.commitInfo)
                        //不在载入服务器的信息，以本地为准
/*                        else{
                            this.projectForm={...this.commitInfo}
                            this.src=global.BACKEND_URL+'/img/'+this.projectForm.thumb
                            console.log(this.projectForm)
                        }*/
                    }else
                        console.log(res)
                    this.loading=false
                }
            },
            async submitEditTaskForm(formName){
                let data={
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
                                message:'修改作业成功',
                                type: 'success'
                            });
                        }
                        else
                            console.log(res)
                        this.editTaskFormVisible= false
                        this.load()
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })

            },
            saveProjectInfoForm(form){
                let localStorage=window.localStorage
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/name',form.name)
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/info',form.info)
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/type',form.type)
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/thumb',form.thumb)

             //   localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/readme',form.readme)
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/src_url',form.src_url)
                localStorage.setItem(this.uid+'/'+this.cid+'/'+this.id+'/dist_url',form.dist_url)
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
                this.projectForm.src_url=localStorage.getItem(this.uid+'/'+this.cid+'/'+this.id+'/src_url')
                this.projectForm.dist_url=localStorage.getItem(this.uid+'/'+this.cid+'/'+this.id+'/dist_url')
                this.projectForm.thumb=localStorage.getItem(this.uid+'/'+this.cid+'/'+this.id+'/thumb')
                this.src=global.BACKEND_URL+'/img/'+this.projectForm.thumb
            },
            gotoEditShow(){
                if(this.commitInfo.status===false && this.projectForm.readme==null)
                this.$router.push(
                {name: 'editor', params: {cid: this.cid,eid: this.id, uid: this.uid}})
                else{
                    this.$router.push(
                        {name: 'editor', params: {cid: this.cid,eid: this.id, uid: this.uid,readme:this.projectForm.readme}})
                }
            },
            async commitProject(){
                this.loading=true
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
        padding: 10px 20px;
    }

    .task-detail{

    }
    .bg-purple-light {
        background: #ffffff;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 50px;
        margin-top: 10px;
    }
</style>