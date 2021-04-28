<template>
    <div>
    <el-dialog title="编辑作品" :visible.sync="dialogFormVisible" :show-close='false' :close-on-click-modal="false" >
        <el-form :model="form">
            <el-form-item label="作品名称" >
                <el-input  placeholder="请输入作品名" v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作品类型" >
                <el-radio-group v-model="form.type">
                    <el-radio :label="1">静态网站</el-radio>
                    <el-radio :label="2">应用程序</el-radio>
                    <el-radio :label="3">其他</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="缩略图" >
                <el-input  placeholder="点击上传作品按钮来获取链接" v-model="form.thumb" autocomplete="off" :disabled="true"></el-input>
                <el-link type="primary" v-if="form.type!==3" @click="uploadIMGVisible=true">上传图片</el-link>
                <upload-card :uploadVisible.sync="uploadIMGVisible" :type="1" @func="getImgURL"></upload-card>
            </el-form-item>

            <el-form-item label="外链" >
                <el-input  placeholder="点击上传作品按钮来获取链接" v-model="form.src_url" autocomplete="off" v-if="form.type!==3" :disabled="true"></el-input>
                <el-input  placeholder="请输入作品链接（请填写URL链接）" v-model="form.src_url" autocomplete="off" v-else></el-input>
                <el-link type="primary" v-if="form.type!==3" @click="uploadSRCVisible=true">上传作品</el-link>
                <upload-card :uploadVisible.sync="uploadSRCVisible" :type="2" @func="getfileURL"></upload-card>
            </el-form-item>
            <el-form-item label="源代码文件" >
                <el-input  placeholder="点击上传源代码按钮来获取链接" v-model="form.dist_url" autocomplete="off"  :disabled="true"></el-input>
                <el-link type="primary"  @click="uploadDISTVisible=true">上传源代码</el-link>
                <upload-card :uploadVisible.sync="uploadDISTVisible" :type="2" @func="getcodeURL"></upload-card>
            </el-form-item>
            <el-form-item label="作品简介" prop="info">
                <el-input type="textarea"
                          :rows="2"
                          placeholder="简单地介绍下你的作品吧，10~20字"
                          maxlength="20"
                          show-word-limit
                          v-model="form.info" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="展示文档（markdown）" prop="info">
                <el-input type="textarea"
                          :rows="7"
                          placeholder="markdown格式的展示文档"
                          show-word-limit
                          v-model="form.readme" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="close">取 消</el-button>
            <el-button type="primary" @click="Commit">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
    import {commit} from "@/api/submit";
    import UploadCard from "./uploadCard";
    export default {
        components: {UploadCard},
        name: "editProjectCard",
        props:['dialogFormVisible','eid'],
        created() {

        },
        data(){
            return{
                uid:0,
                form:{
                    name:'',
                    info:'',
                    type:0,
                    dist_url:'',
                    src_url:'',
                    readme:'',
                    thumb:'',
                },
                uploadSRCVisible:false,
                uploadIMGVisible:false,
                uploadDISTVisible:false,
            }
        },
        methods:{
            close(){
                this.$emit("update:dialogFormVisible", false);
            },
            getData(data,uid){
                this.form=data
                this.uid=uid
            },
            async Commit(){
                this.form.account=this.uid
                const res= await commit(this.form,this.eid)
                if(res.code==200){
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.close()
                }
                else
                    console.log(res)

            },
            getImgURL(data){
                this.form.thumb=data
                console.log(data)
            },
            getfileURL(data){
                this.form.src_url=data
                console.log(data)
            },
            getcodeURL(data){
                this.form.dist_url=data
            },
        }
    }
</script>

<style scoped>

</style>