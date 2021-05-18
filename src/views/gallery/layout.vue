<template>
    <el-container>
    <el-header class="header-style">
        <div class="middle-style">
            <el-image :src="logo" style="height: 40px;width: 150px"></el-image>
        </div>
        <div class="el-menu-style">
            <el-menu :default-active="activeIndex" :router="true" mode="horizontal"  background-color="#F6F6F6" active-text-color="black">
                <el-menu-item class="menu-item-style" index="/" :key="1">主页</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">课程</template>
                    <el-menu-item  v-for="(item) in lesson " :index="'/gallery/lesson/'+item.id">{{item.name}}</el-menu-item>
                </el-submenu>

            </el-menu>
        </div>
        <div>
            <router-link to="/login" >
                <el-link :underline="false">转去登录</el-link>
            </router-link>
        </div>
    </el-header>
    <!--内容-->
    <el-main class="main-style">
        <router-view ></router-view>
        <el-footer style="text-align: center;background-color: #F6F6F6; height: 100px;padding: 0px"><div style="font-size: 13px;padding: 10px;color: #909399">Copyright©2002-2021 School of Software,BUAA. All Right Reserved.</div></el-footer>
    </el-main>

    </el-container>
</template>

<script>
    import {courseName} from "@/api/course";
    export default {
        name: "layout",
        methods:{
            async loadCourse() {
                const res = await courseName();
                if (res.code == 200) {
                    this.lesson = res.data;
                } else
                    console.log(res)
            },
        },
        created(){
            this.loadCourse()
        },
        data(){
            return{
                logo:require('@/assets/show_logo.png'),
                activeIndex:"1",
                lesson:[
                ],
            }
        }
    }
</script>

<style scoped>
    .el-main {
        position: absolute;
        left:0;
        right: 0;
        top: 60px;
        bottom: 0;
        overflow-y: scroll;
        padding-bottom: 0px;
        padding-left: 0px;
        padding-right: 0px;
    }
    .header-style{
        box-shadow: 0 0 4px #c7c7c7;
        background-color: #F6F6F6;
        display: flex;
        justify-content: space-between;
    }
    .main-style{
        background-color: white;
    }
    .middle-style{
        display: flex;
        align-items: center;
    }
    .el-menu-style{
        background-color: transparent;
        position: relative;
    }
    .menu-item-style{
        margin-left: 20px;
        margin-right: 20px;
    }

    .header-style{
        box-shadow: 0 0 4px #c7c7c7;
        background-color: #F6F6F6;
        display: flex;
        justify-content: space-between;
    }
    .el-menu-style{
        background-color: #F6F6F6;

    }
    .main-style{
        background-color: white;
    }

    .menu-item-style{
        margin-left: 10px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

</style>