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
                <el-col :span="4" :offset="14"><div class="grid-content bg-purple">
                    <el-button type="primary" plain @click="saveReadMe()">保存</el-button>
                    <el-button  plain @click="goOff()">取消</el-button></div></el-col>
            </el-row>
        </div>

    </div>

</template>

<script>
    export default {
        name: "editor",
        data() {
            return {
                text: '<h1 align="center">项目名称</h1>\n' +
                    '\n' +
                    '<p align="center">\n' +
                    '  <a href="https://npmcharts.com/compare/@kangc/v-md-editor?minimal=true"><img src="https://img.shields.io/npm/dm/@kangc/v-md-editor.svg?sanitize=true" alt="Downloads"></a>\n' +
                    '  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/v/@kangc/v-md-editor.svg?sanitize=true" alt="Version"></a>\n' +
                    '  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/l/@kangc/v-md-editor.svg?sanitize=true" alt="License"></a>\n' +
                    '</p>\n' +
                    '\n' +
                    '## 项目成员\n' +
                    '\n' +
                    '- 姓名：陈某某 学号：203731282\n' +
                    '任务：前端\n' +
                    '- 姓名：陈某某 学号：203731282\n' +
                    '任务：后端\n' +
                    '- 姓名：陈某某 学号：203731282\n' +
                    '任务：测试\n' +
                    '- 姓名：陈某某 学号：203731282\n' +
                    '任务：文档\n' +
                    '\n' +
                    '## 项目类型\n' +
                    '\n' +
                    '- 微信小程序、静态网站、后端系统等\n' +
                    '\n' +
                    '## 项目介绍\n' +
                    '\n' +
                    '```js\n' +
                    'import Vue from \'vue\';\n' +
                    'import VueMarkdownEditor from \'@kangc/v-md-editor\';\n' +
                    'import \'@kangc/v-md-editor/lib/style/base-editor.css\';\n' +
                    'import vuepressTheme from \'@kangc/v-md-editor/lib/theme/vuepress.js\';\n' +
                    '\n' +
                    'VueMarkdownEditor.use(vuepressTheme);\n' +
                    '\n' +
                    'Vue.use(VueMarkdownEditor);\n' +
                    '```\n' +
                    '\n' +
                    '## 项目截图\n' +
                    '\n' +
                    '\n' +
                    '\n' +
                    '![Description](https://pics5.baidu.com/feed/279759ee3d6d55fb60caa536120cb14c20a4dd4c.jpeg?token=bd99741d2655e11e51218b3930a1eed0)\n' +
                    '\n' +
                    '![Description](https://pics3.baidu.com/feed/fcfaaf51f3deb48f6e20862c5031c42f2cf578a8.jpeg?token=84fa4135c8040675b280fb5fb62e5c9c)\n' +
                    '\n' +
                    '## 项目链接\n' +
                    '\n' +
                    '- [ElementUi Scrollbar Component](https://github.com/ElemeFE/element/tree/dev/packages/scrollbar)\n',
                eid:'',
                cid:'',
                uid:'',
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            };

        },
        created(){
            this.cid=this.$route.params.cid;
            this.uid=this.$route.params.uid;
            this.eid=this.$route.params.eid;
            if(this.$route.params.readme && this.$route.params.readme!==undefined)
            {
                this.text=this.$route.params.readme
            }
        },
        methods:{
            goOff(){
                this.$router.go(-1)
            },
            saveReadMe(){
                window.localStorage.setItem(this.uid+'/'+this.cid+'/'+this.eid+'/readme',this.text);
                this.$message({
                    message:'本地保存成功',
                    type: 'success'
                });
            }
        }
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