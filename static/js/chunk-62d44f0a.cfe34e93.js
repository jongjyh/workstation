(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62d44f0a"],{2132:function(e,t,n){"use strict";n("43f8")},"43f8":function(e,t,n){},a797:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container-wrapper"},[e._m(0),n("v-md-editor",{attrs:{height:"600px"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}}),n("div",{staticClass:"bottom-wrapper"},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-upload",{staticClass:"upload-demo",attrs:{action:"https://jsonplaceholder.typicode.com/posts/","on-preview":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.fileList,"list-type":"picture"}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb,上传成功后右键缩略图复制图片地址即可")])],1)],1),n("el-col",{attrs:{span:4,offset:14}},[n("div",{staticClass:"grid-content bg-purple"},[n("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return e.saveReadMe()}}},[e._v("保存")]),n("el-button",{attrs:{plain:""},on:{click:function(t){return e.goOff()}}},[e._v("取消")])],1)])],1)],1)],1)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"title"},[n("i",{staticClass:"el-icon-edit-outline"}),e._v(" 作品信息编辑")])}],a={name:"editor",data:function(){return{text:'<h1 align="center">项目名称</h1>\n\n<p align="center">\n  <a href="https://npmcharts.com/compare/@kangc/v-md-editor?minimal=true"><img src="https://img.shields.io/npm/dm/@kangc/v-md-editor.svg?sanitize=true" alt="Downloads"></a>\n  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/v/@kangc/v-md-editor.svg?sanitize=true" alt="Version"></a>\n  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/l/@kangc/v-md-editor.svg?sanitize=true" alt="License"></a>\n</p>\n\n## 项目成员\n\n- 姓名：陈某某 学号：203731282\n任务：前端\n- 姓名：陈某某 学号：203731282\n任务：后端\n- 姓名：陈某某 学号：203731282\n任务：测试\n- 姓名：陈某某 学号：203731282\n任务：文档\n\n## 项目类型\n\n- 微信小程序、静态网站、后端系统等\n\n## 项目介绍\n\n```js\nimport Vue from \'vue\';\nimport VueMarkdownEditor from \'@kangc/v-md-editor\';\nimport \'@kangc/v-md-editor/lib/style/base-editor.css\';\nimport vuepressTheme from \'@kangc/v-md-editor/lib/theme/vuepress.js\';\n\nVueMarkdownEditor.use(vuepressTheme);\n\nVue.use(VueMarkdownEditor);\n```\n\n## 项目截图\n\n\n\n![Description](https://pics5.baidu.com/feed/279759ee3d6d55fb60caa536120cb14c20a4dd4c.jpeg?token=bd99741d2655e11e51218b3930a1eed0)\n\n![Description](https://pics3.baidu.com/feed/fcfaaf51f3deb48f6e20862c5031c42f2cf578a8.jpeg?token=84fa4135c8040675b280fb5fb62e5c9c)\n\n## 项目链接\n\n- [ElementUi Scrollbar Component](https://github.com/ElemeFE/element/tree/dev/packages/scrollbar)\n',eid:"",cid:"",uid:"",fileList:[{name:"food.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"},{name:"food2.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}]}},created:function(){this.cid=this.$route.params.cid,this.uid=this.$route.params.uid,this.eid=this.$route.params.eid,this.$route.params.readme&&void 0!==this.$route.params.readme&&(this.text=this.$route.params.readme)},methods:{goOff:function(){this.$router.go(-1)},saveReadMe:function(){window.localStorage.setItem(this.uid+"/"+this.cid+"/"+this.eid+"/readme",this.text),this.$message({message:"本地保存成功",type:"success"})}}},r=a,o=(n("2132"),n("2877")),c=Object(o["a"])(r,i,s,!1,null,"20e180e0",null);t["default"]=c.exports}}]);