<template>
    <el-container style="height: 100%; border: 1px solid #eee">
            <el-menu :default-active="$route.path" :collapse="isCollapse"  router="true" class="el-menu-vertical-demo" >
                <div class="aside-title"  >
                    <div class="aside-title-icon">
                        <el-image :src="logoimg" style="width: 100px"/>
                    </div>
                    <h1 v-if="!isSlide">优秀作品管理系统</h1>
                </div>
                <el-menu-item index="/" >
                    <i class="el-icon-trophy"></i>
                    <span slot="title">作品展示</span>
                </el-menu-item>
                <el-menu-item index="/courses/course" v-if="this.role==='teacher'||this.role==='admin'">
                    <i class="el-icon-menu"></i>
                    <span slot="title">课程管理</span>
                </el-menu-item>
                <el-menu-item index="/task/filter" v-if="this.role==='student'">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">作业管理</span>
                </el-menu-item>
            </el-menu>

        <el-container>
            <el-header style="">
                <div style="float: left">
                    <i class="el-icon-s-fold"   @click="Close" v-show="isCollapse===false"></i>
                    <i class="el-icon-s-unfold" @click="Open"  v-show="isCollapse===true"></i>
                </div>
                <div style="text-align: right; font-size: 12px">
                <el-dropdown @command="handleCommand">
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user" command="personInfoOpen">个人信息</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-close" command="logOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{this.name}}</span>
                </div>
            </el-header>
            <el-dialog title="个人信息" :visible.sync="personInfoVisible" width="30%" :show-close='false' :before-close="handleClose">
                <div class="person-icon">
                    <el-avatar icon="el-icon-user-solid" :size="200"></el-avatar>
                </div>
                <el-form ref="form" :model="form" :rules="rules"  status-icon>
                    <el-form-item label="姓名"  prop="name">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学号"  prop="id">
                        <el-input v-model="form.id" autocomplete="off" :disabled="true" ></el-input>

                    </el-form-item>
                    <el-form-item label="邮箱" prop="mail">
                        <el-input v-model="form.mail" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-link type="primary" @click="innerVisible = true">修改密码</el-link>
                    </el-form-item>
                </el-form>
                <el-dialog
                        width="30%"
                        title="修改密码"
                        :visible.sync="innerVisible"
                        append-to-body>
                    <el-form :model="innerForm" status-icon :rules="rules" ref="innerForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="当前密码" prop="past">
                            <el-input type="password" v-model="innerForm.past" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="innerForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="innerForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('innerForm')">提交</el-button>
                            <el-button @click="resetForm('innerForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="personInfoVisible = false" v-if="this.name">取 消</el-button>
                    <el-button type="primary" @click="updatepersonInfo('form')">修 改</el-button>
                </div>
            </el-dialog>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<style>
    .el-menu--collapse  .aside-title h2{
        display: none;
    }
    .el-menu--collapse  .el-submenu__title span{
        display: none;
    }
    /*隐藏 > */
    .el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
        display: none;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 400px;

    }
    a{
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
    }
    .el-header {
        background-color: #99CCCC;
        color: #333;
        line-height: 60px;
    }
    .person-icon{
        display: flex;
        justify-content: center;

        margin-bottom: 20px;
        border: none;
    }
    .aside-title-icon{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        border: none;
    }
    .el-main{
        background-color: #f5f7f9;
    }
    .icon-title{
        text-align: center;
    }
    .aside-wrapper{
        background-color: white
    }
    .el-aside {
        color: #333;
    }
    .right-user-icon{
        overflow: visible;
    }
    .aside-title{
        padding: 20px;
    }
</style>
<script>
    import sideMenus from '@/components/sideMenus'
    import store from '@/store'
    import Cookies from 'js-cookie'
    import {mail,pw,name} from '@/api/user'
    export default {
        name: "layout",
        components: {sideMenus},
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.innerForm.checkPass !== '') {
                        this.$refs.innerForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.innerForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                isSlide:false,
                isCollapse:false,
                logoimg:require('@/assets/layout-logo.png'),
                innerVisible:false,
                name:'',
                role:'',
                personInfoVisible:false,
                innerForm:{
                    past:'',
                    pass: '',
                    checkPass: '',
                },
                form: {
                    name: '',
                    mail:'123',
                    id:''
                },
                rules: {
                    past: [
                        { required:true,message:'请输入当前密码', trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        {required:true}
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                        {required:true}
                    ],
                    name: [
                        { required: true, message: '请输入真实姓名', trigger: 'blur' },
                        { min: 1, message: '长度不小于 1 个字符', trigger: 'blur' }
                    ],
                    id:[
                        { required: true, message: '学号不能为空', trigger: 'blur' },
                    ],
                    mail:[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 6, message: '密码长度不小于6个字符', trigger: 'blur' }
                    ]
                },

            }
        },
        methods:{
            Open(){
              this.isCollapse=false
              this.isSlide=false;
            },
            async Close(){
              this.isSlide=true;
              await this.pause()
                this.isCollapse=true
            },
            pause(){
              return new Promise(function(resolve,reject){
                  setTimeout(resolve,1);
              })
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res= await pw({
                            old:this.innerForm.past,
                            new:this.innerForm.pass
                        })
                        if(res.code == 200)
                        {
                            this.$message({
                                message:'修改密码成功！',
                                type: 'success'
                            });
                            this.resetForm(formName)
                            this.innerVisible=false;
                        }
                        else {
                            console.log(res)
                            return false;
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleClose(done) {
                this.$alert('请先修改个人信息！')
                    .then(_ => {

                    })
                    .catch(_ => {

                    });

            },
            handleCommand(command) {
                if(command=='personInfoOpen')
                    this.personInfoVisible=true
                if(command=='logOut')
                    this.logOut()
            },
            logOut(){
                store.commit('user/setToken', null)
                Cookies.set('Token','')
                /*
                删除token后重定向
                 */
                this.$router.push({path:'/login'});
            },
            loadPersonInfo(){
                let user=store.getters['user/userInfo']
                this.name=user.nickName;
                this.form.name=user.nickName
                this.role=user.role
                this.id=user.uuid
                this.form.mail=user.email
                this.form.id=user.uuid
                if(!this.name)
                {
                    this.personInfoVisible=true
                    this.$alert('欢迎来到作品展示系统，由于您是第一次登录，请先完善个人信息。')
                }
            },
             updatepersonInfo(formName){
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res= await mail({email:this.form.mail})
                        if(res.code != 200)
                        {
                            console.log(res)
                            return false;
                        }
                        const res2= await name({name:this.form.name})
                        if(res2.code != 200)
                        {
                            console.log(res2)
                            return false;
                        }
                        this.$message({
                            message:'修改成功,请重新登录',
                            type: 'success'
                        });

                        this.personInfoVisible=false
                    } else {
                        return false;
                    }
                });
            }
        },
        computed:{
            getRoute(){
                return store.getters['route/permitRoutes'];
            }
        },
        created(){
            this.loadPersonInfo();
        },
        mounted() {

        }
    }
</script>
