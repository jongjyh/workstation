<template>
    <div class="container" v-loading="loading">
        <div class="content-style">
            <div class="introduce">
                <el-row :gutter="30">
                    <el-col :span="14" >
                    <div class="middle-style">
                        <el-image style="height: 400px;" :src="src"/>
                    </div>
                </el-col>
                    <el-col :span="10">
                        <el-collapse v-model="activeNames" >
                            <el-collapse-item title="成员 Member" name="1">
                                <el-tag
                                        :key="index"
                                        effect="light"
                                        v-for="(tag,index) in basic.groups"
                                >{{tag.name}}</el-tag>
                            </el-collapse-item>
                            <el-collapse-item title="项目名称 Name" name="2">
                                <div>{{basic.name}}</div>
                            </el-collapse-item>
                            <el-collapse-item title="项目简介 Info" name="3">
                                <div>{{basic.info}}</div>
                            </el-collapse-item>
                            <el-collapse-item title="展示链接 ShowURL" name="4">
                                <el-link :href="basic.showURL" target="_blank"  type="info">进入链接</el-link>
                            </el-collapse-item>
                        </el-collapse>
                    </el-col>

                </el-row>

            </div>
            <div class="md-style">
                <v-md-editor :value="markdown" mode="preview"></v-md-editor>
            </div>
        </div>
    </div>
</template>

<script>
    import {readme,tecPreview} from '@/api/HomePage'
    import global from '@/Base.vue'
    export default {
        name: "detail",
        data(){
            return{
                loading:true,
                tags:{
                    items:[],
                    name:"",
                    showNav:true,
                },
                url:"",
                markdown:"",
                src:'',
                basic:{},
                activeNames:["1","2","3","4"],

            }
        },
        props:{
          thumb:String,
        },
        created() {
            let mode=this.$route.params.mode

            //mode=0 学生预览模式 mode=1 载入模式 mode=3教师预览模式
            if(mode==1)
            {
                this.url=this.$route.params.url
                this.loadMarkDown(readme)
            }
            else if(mode==0){
                let data = decodeURIComponent(this.$route.params.data);
                data=JSON.parse(data)
                this.loadData(data)
            }
            //预览模式
            else if(mode==3){
                this.url=this.$route.params.url
                this.loadMarkDown(tecPreview)
            }
            this.$emit('postChildInfo',this.tags)

        },
        methods:{
            goBack(){
                window.history.back();
            },
            loadData(data){
                this.basic=data
                this.basic.showURL=global.BACKEND_URL+"/"+this.basic.url
                this.src=global.BACKEND_URL+'/img/'+this.basic.thumb
                this.tags.name=this.basic.name
                this.markdown=data.readme
                console.log(data)
                this.loading=false
            },
            async loadMarkDown(api){
                console.log(api)
                const res=await api(this.url);
                if(res.code==200){
                    this.loadData(res.data)
                }
                else
                    console.log(res)

            }
        }
    }
</script>

<style scoped>
.container{
    background-image: url('../../assets/show-background.png');
    padding: 20px 150px;
    min-height: 100%;
}
.introduce{
    padding: 20px;
}
    .content-style{

        min-height: 80%;
        background-color: white;
    }
</style>