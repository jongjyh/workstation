<template>
    <div class="container-wrapper">

        <div class="title"><i class="el-icon-edit-outline"></i>           作品信息编辑</div>
        <v-md-editor v-model="text" height="600px"></v-md-editor>
        <div class="bottom-wrapper">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,上传成功后右键缩略图复制图片地址即可</div>
                    </el-upload>
                </el-col>
                <el-col :span="4" :offset="14"><div class="grid-content bg-purple"><el-button type="primary" plain>保存</el-button>
                    <el-button type="primary" plain>取消</el-button></div></el-col>
            </el-row>
        </div>

    </div>

</template>

<script>
    export default {
        name: "editor",
        data() {
            return {
                text: '',
            };
        },
    }
</script>

<style scoped>
    .container-wrapper{
        background-color: #FFFFFF;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding:16px;
    }
    .title{
        font-size: 30px;
        margin: 10px 0px 30px;
        text-align:center
    }
    .bottom-wrapper{

        margin-top: 20px;
    }
</style>