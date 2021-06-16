<template>
    <el-dialog
            title="我的上传"
            :visible="uploadVisible"
            width="30%"
            center
            append-to-body
            :show-close='false'
            :close-on-click-modal="false"
           >
        <div class="center-style"  v-loading="loading">
            <div class="center-style"><span >请上传你的{{acceptType}}文件，并把获得的外链填入上传链接</span></div>
            <el-upload
                    :accept="acceptType"
                    class="upload-demo"
                    drag
                    action=""
                    :show-file-list=false
                    :http-request="uploadFunction"
                    :file-list="fileList"
            >
                <i class="el-icon-upload"></i>
                <div class="center-style">将文件拖到此处，或<em>点击上传</em></div>
                <div class="center-style" slot="tip">只能上传单个压缩包文件，且不超过50Mb</div>
            </el-upload>
        </div>
        <span slot="footer" class="dialog-footer"><el-button type="primary" @click="close()">确 定</el-button></span></el-dialog>
</template>

<script>
    import {upload} from '@/api/submit'
    import {uploadImg} from "@/api/submit";
    export default {
        name: "uploadCard",
        methods:{
            close(){
                this.$emit("update:uploadVisible", false);
            },
            sendMsg(data){
                //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
                this.$emit('func',data)
            },
            async Upload(param){
                this.loading=true;
                let params = new FormData()
                params.append("file", param.file)
                const res=await upload(params);
                if(res.code==200)
                {
                    this.$message.success("上传文件成功")
                    let data=res.data;
                    this.sendMsg(data)
                    this.loading=false;
                    this.close()

                }
                else
                {
                    if(res.data.code==413)
                    {
                        this.$message.error("上传文件过大")
                    }
                    this.loading=false;
                    console.log(res)
                }
            },
            async UploadImg(param){
                this.loading=true;
                let params = new FormData()
                params.append("file", param.file)
                const res=await uploadImg(params,740,400);
                if(res.code==200)
                {
                    this.$message.success("上传图片成功")
                    let data=res.data;
                    this.sendMsg(data)
                    this.loading=false;
                    this.close()
                }
                else
                {
                    if(res.data.code==413)
                    {
                        this.$message.error("上传文件过大")
                        this.loading=false;
                    }
                    console.log(res)
                }
            },
        },
        data(){
            return{
                loading:false,
                fileList:[],
                uploadFunction:function () {

                },
                acceptType:'',
            }
        },
        props:['uploadVisible','type'],
        created() {
            if(this.type==1)
            {
                this.uploadFunction=this.UploadImg
                this.acceptType='.jpg'
            }
            else
            {
                this.uploadFunction=this.Upload
                this.acceptType='.zip'
            }
        }
    }
</script>

<style scoped>

</style>