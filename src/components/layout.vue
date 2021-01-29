<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside  class="aside-wrapper" width="250px" >
            <div class="aside-title" >
                <div class="aside-title-icon">
                    <el-avatar :size="90" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" ></el-avatar>
                </div>

                <h1 class="icon-title">优秀作品展示系统</h1>
            </div>
            <el-menu :default-active="$route.path">
                <side-menus :routes="getRoute"></side-menus>
            </el-menu>


        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown @command="handleCommand">
                    <i class="el-icon-setting" style="margin-right: 15px "></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user" command="personInfoOpen">个人信息</el-dropdown-item>

                        <el-dropdown-item icon="el-icon-close" >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{this.name}}</span>
            </el-header>
            <el-dialog title="个人信息" :visible.sync="personInfoVisible" width="30%">
                <div class="person-icon">
                    <el-avatar icon="el-icon-user-solid" :size="200"></el-avatar>

                </div>
                <div style="display: flex;
        justify-content: center;">
                    <el-button type="text">修改头像</el-button>
                </div>
                <el-form :model="form">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input v-model="form.mail" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth" >
                        <el-input v-model="form.password" autocomplete="off" show-password></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="personInfoVisible = false">取 消</el-button>
                    <el-button type="primary" @click="personInfoVisible = false">修 改</el-button>
                </div>
            </el-dialog>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<style>
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
        background-color: rgb(238, 241, 246)
    }
    .el-aside {
        color: #333;
    }
    .right-user-icon{
        overflow: visible;
    }
</style>
<script>
    import sideMenus from '@/components/sideMenus'
    import store from '@/store'
    export default {
        name: "layout",
        components: {sideMenus},
        data(){
            return{
                name:'王小虎',
                role:'',
                personInfoVisible:false,
                form: {
                    name: '王小虎',
                    mail:'522963890@qq.com',
                    password:'123456',
                },
                formLabelWidth: '50px'
            }
        },
        methods:{
            handleCommand(command) {
                if(command=='personInfoOpen')
                    this.personInfoVisible=true
            },
            logOut(){
                /*
                删除token后重定向
                 */
                console.log('log out')
            }
        },
        computed:{
            getRoute(){
                return store.getters['route/permitRoutes'];
            }
        },
        mounted() {

        }
    }
</script>
