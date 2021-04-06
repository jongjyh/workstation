<template>
    <div class="container">
        <div class="content-style">
            <div class="md-style">
                <v-md-editor :value="markdown" mode="preview"></v-md-editor>
            </div>
        </div>
    </div>
</template>

<script>
    import {readme} from '@/api/HomePage'
    export default {
        name: "detail",
        data(){
            return{
                url:"",
                markdown:"<h1 align=\"center\">项目名称</h1>\n" +
                    "\n" +
                    "<p align=\"center\">\n" +
                    "  <a href=\"https://npmcharts.com/compare/@kangc/v-md-editor?minimal=true\"><img src=\"https://img.shields.io/npm/dm/@kangc/v-md-editor.svg?sanitize=true\" alt=\"Downloads\"></a>\n" +
                    "  <a href=\"https://www.npmjs.com/package/@kangc/v-md-editor\"><img src=\"https://img.shields.io/npm/v/@kangc/v-md-editor.svg?sanitize=true\" alt=\"Version\"></a>\n" +
                    "  <a href=\"https://www.npmjs.com/package/@kangc/v-md-editor\"><img src=\"https://img.shields.io/npm/l/@kangc/v-md-editor.svg?sanitize=true\" alt=\"License\"></a>\n" +
                    "</p>\n" +
                    "\n" +
                    "## 项目成员\n" +
                    "\n" +
                    "- 姓名：陈某某 学号：203731282\n" +
                    "任务：前端\n" +
                    "- 姓名：陈某某 学号：203731282\n" +
                    "任务：后端\n" +
                    "- 姓名：陈某某 学号：203731282\n" +
                    "任务：测试\n" +
                    "- 姓名：陈某某 学号：203731282\n" +
                    "任务：文档\n" +
                    "\n" +
                    "## 项目类型\n" +
                    "\n" +
                    "- 微信小程序、静态网站、后端系统等\n" +
                    "\n" +
                    "## 项目介绍\n" +
                    "\n" +
                    "```js\n" +
                    "import Vue from 'vue';\n" +
                    "import VueMarkdownEditor from '@kangc/v-md-editor';\n" +
                    "import '@kangc/v-md-editor/lib/style/base-editor.css';\n" +
                    "import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';\n" +
                    "\n" +
                    "VueMarkdownEditor.use(vuepressTheme);\n" +
                    "\n" +
                    "Vue.use(VueMarkdownEditor);\n" +
                    "```\n" +
                    "\n" +
                    "## 项目截图\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "![Description](https://pics5.baidu.com/feed/279759ee3d6d55fb60caa536120cb14c20a4dd4c.jpeg?token=bd99741d2655e11e51218b3930a1eed0)\n" +
                    "\n" +
                    "![Description](https://pics3.baidu.com/feed/fcfaaf51f3deb48f6e20862c5031c42f2cf578a8.jpeg?token=84fa4135c8040675b280fb5fb62e5c9c)\n" +
                    "\n" +
                    "## 项目链接\n" +
                    "\n" +
                    "- [ElementUi Scrollbar Component](https://github.com/ElemeFE/element/tree/dev/packages/scrollbar)\n",
            }
        },
        props:[

        ],
        created() {
            this.url=this.$route.params.url
            this.loadMarkDown()
        },
        methods:{
            async loadMarkDown(){
                const res=await readme(this.url);
                if(res.code==200){
                    this.markdown=res.data.readme
                    console.log(res.data)
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
    .content-style{
        min-height: 80%;
        background-color: white;
    }
</style>