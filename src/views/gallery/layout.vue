<template>
    <el-container>
    <el-header class="header-style">
        <div class="middle-style">
            <el-page-header @back="goBack" :content="tags.name" v-if="tags.showNav"></el-page-header>
        </div>
        <div class="el-menu-style">
            <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect" background-color="#F6F6F6" active-text-color="black">
                <el-menu-item class="menu-item-style" v-for="tag in tags.items" :index="tag.index" :key="tag.index">{{tag.label}}</el-menu-item>
            </el-menu></div>
        <div>
            <router-link to="/login" >
                <el-link :underline="false">转去登录</el-link>
            </router-link>
        </div>
    </el-header>
    <!--内容-->
    <el-main class="main-style">
        <router-view @postChildInfo="getNavItem"></router-view>
    </el-main>
        <el-footer style="text-align: center;background-color: #F6F6F6; height: 100px"><div style="font-size: 13px;padding: 10px;color: #909399">Copyright©2002-2020 School of Software,BUAA. All Right Reserved. 京ICP备05004617号-5</div></el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "layout",
        methods:{
            getNavItem(Items){
                this.tags=Items
            },
            goBack(){
                window.history.back();
            },
            handleSelect(tag){
                document.querySelector("#"+tag).scrollIntoView(true);
            },
        },
        data(){
            return{
                tags:[
                ],
            }
        }
    }
</script>

<style scoped>
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