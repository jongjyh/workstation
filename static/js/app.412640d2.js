(function(e){function t(t){for(var r,o,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)o=s[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);m&&m(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function s(e){return c.p+"static/js/"+({about:"about"}[e]||e)+"."+{about:"31c2ac7e","chunk-150cc8b4":"8e5861fd","chunk-770bfd9e":"c0283915","chunk-9b70dd78":"86c970bb","chunk-2d21a3d2":"500684b5","chunk-2d21a975":"cbc4d900","chunk-62d44f0a":"cfe34e93","chunk-6a51dc68":"c59e62ba","chunk-cc0f8f24":"a106ce41"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={about:1,"chunk-150cc8b4":1,"chunk-9b70dd78":1,"chunk-62d44f0a":1,"chunk-cc0f8f24":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="static/css/"+({about:"about"}[e]||e)+"."+{about:"fceb8e30","chunk-150cc8b4":"e0c8f96d","chunk-770bfd9e":"31d6cfe0","chunk-9b70dd78":"dae6d45f","chunk-2d21a3d2":"31d6cfe0","chunk-2d21a975":"31d6cfe0","chunk-62d44f0a":"7673e8e1","chunk-6a51dc68":"31d6cfe0","chunk-cc0f8f24":"0facf0f5"}[e]+".css",a=c.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===r||l===a)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],m.parentNode.removeChild(m),n(i)},m.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(m);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var m=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var m=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"02f7":function(e,t,n){"use strict";n("f168")},"16a5":function(e,t,n){},3785:function(e,t,n){"use strict";n("a57e")},"3cd6":function(e,t,n){},4360:function(e,t,n){"use strict";var r=n("2b0e"),o=n("2f62"),a=(n("b0c0"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("96cf"),n("1da1")),i=n("5530"),s=n("c24f"),c=n("a18c"),u=n("a78e"),l=n.n(u),d=new Map([[1,"student"],[2,"teacher"],[3,"admin"]]),m={namespaced:!0,state:{userInfo:{uuid:"",nickName:"",headerImg:"",authority:"",role:"",email:""},token:""},mutations:{setUserInfo:function(e,t){e.userInfo=t},setToken:function(e,t){e.token=t},setRole:function(e,t){e.role=t},LoginOut:function(e){e.userInfo={},e.token="",c["c"].push({name:"login",replace:!0}),sessionStorage.clear(),window.location.reload()},ResetUserInfo:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.userInfo=Object(i["a"])(Object(i["a"])({},e.userInfo),t)}},actions:{LoginIn:function(e,t){return Object(a["a"])(regeneratorRuntime.mark((function n(){var r,o,a,i,u,m,f;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,o=e.dispatch,a=e.getters,i=e.rootGetters,n.next=3,Object(s["b"])(t);case 3:u=n.sent,200==u.code&&(m={email:u.data.email,role:d.get(u.data.role),nickName:u.data.name,uuid:u.data.id},r("setUserInfo",m),r("setToken",u.data.token),l.a.set("Token",u.data.token),console.log(a["userInfo"]),f=m.role,o("route/generateRoutes",{role:f},{root:!0}).then((function(){return console.log(a["userInfo"]),c["c"].addRoutes(i["route/addRoutes"]),console.log(i["route/addRoutes"]),c["c"].push({path:"/index"}),!0})));case 5:case"end":return n.stop()}}),n)})))()},GetInfo:function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,Object(s["a"])();case 3:if(r=t.sent,200!=r.code){t.next=11;break}return o={email:r.data.email,role:d.get(r.data.role),nickName:r.data.name,uuid:r.data.id},n("setUserInfo",o),n("setToken",r.data.token),t.abrupt("return",o);case 11:console.log(r);case 12:case"end":return t.stop()}}),t)})))()}},getters:{userInfo:function(e){return e.userInfo},id:function(e){return e.userInfo.uuid},token:function(e){return e.token},role:function(e){return e.userInfo.role}}};n("99af"),n("4160"),n("caad"),n("2532"),n("159b");function f(e,t){return!t.meta||!t.meta.role||!0===t.meta.role.includes(e.role)}function p(e,t){var n=[];return e.forEach((function(e){var r=Object(i["a"])({},e);f(t,r)&&(r.children&&(r.children=p(r.children,t)),n.push(r))})),n}var h={namespaced:!0,state:{routes:[],addRoutes:[]},mutations:{setRoutes:function(e,t){e.addRoutes=t,e.routes=c["b"].concat(t)}},actions:{generateRoutes:function(e,t){var n=e.commit;return new Promise((function(e){var r=p(c["a"],t);n("setRoutes",r),e(r)}))}},getters:{addRoutes:function(e){return e.addRoutes},permitRoutes:function(e){return e.routes}}};r["default"].use(o["a"]);t["a"]=new o["a"].Store({modules:{user:m,route:h}})},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r,o,a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],c=(n("5c0b"),n("2877")),u={},l=Object(c["a"])(u,i,s,!1,null,null,null),d=l.exports,m=n("a18c"),f=n("4360"),p=(n("3cd6"),n("5c96")),h=n.n(p),b=n("ee2d"),g=n.n(b),v=(n("fefe"),n("603a")),k=n.n(v),w=(n("fbc4"),"http://localhost:8080/#"),y={BASE_URL:w},x=y,_=Object(c["a"])(x,r,o,!1,null,"51086790",null),O=_.exports,j=(n("99af"),function(e){var t=new e({methods:{emit:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];this.$emit.apply(this,[e].concat(n))},on:function(e,t){this.$on(e,t)},off:function(e,t){this.$off(e,t)}}});e.prototype.$bus=t}),C=j,F=(n("c975"),n("5530")),R=(n("96cf"),n("1da1")),I=n("a78e"),$=n.n(I),E=["/login","/auth-redirect","/"];function P(){return $.a.get("Token")}m["c"].beforeEach(function(){var e=Object(R["a"])(regeneratorRuntime.mark((function e(t,n,r){var o,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(-1!==t.path.indexOf("/gallery")&&r(),!P()){e.next=14;break}if(0!==f["a"].getters["user/role"].length){e.next=10;break}return e.next=5,f["a"].dispatch("user/GetInfo");case 5:o=e.sent,a=o.role,f["a"].dispatch("route/generateRoutes",{role:a}).then((function(){m["c"].addRoutes(f["a"].getters["route/addRoutes"]),r(Object(F["a"])(Object(F["a"])({},t),{},{replace:!0}))})),e.next=12;break;case 10:"/login"===t.path&&r("/index"),r();case 12:e.next=15;break;case 14:-1!==E.indexOf(t.path)?r():r("/login");case 15:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()),g.a.use(k.a),a["default"].use(g.a),a["default"].config.productionTip=!1,a["default"].use(h.a),a["default"].prototype.GLOBAL=O,a["default"].use(C);t["default"]=new a["default"]({router:m["c"],store:f["a"],render:function(e){return e(d)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"7a66":function(e,t,n){},"8f2c":function(e,t,n){"use strict";n("7a66")},"9c0c":function(e,t,n){},a18c:function(e,t,n){"use strict";n.d(t,"b",(function(){return A})),n.d(t,"a",(function(){return M}));n("d3b7");var r=n("2b0e"),o=n("8c4f"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"user-layout-wrapper",attrs:{id:"userLayout"}},[n("div",{staticClass:"container"},[e._m(0),n("div",{staticClass:"main"},[n("el-form",{ref:"loginForm",attrs:{model:e.loginForm,rules:e.rules},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitForm(t)}}},[n("el-form-item",{attrs:{prop:"acount"}},[n("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.loginForm.account,callback:function(t){e.$set(e.loginForm,"account",t)},expression:"loginForm.account"}},[n("i",{staticClass:"el-input__icon el-icon-user",attrs:{slot:"suffix"},slot:"suffix"})])],1),n("el-form-item",{attrs:{prop:"password"}},[n("el-input",{attrs:{type:"lock"===e.lock?"password":"text",placeholder:"请输入密码"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}},[n("i",{class:"el-input__icon el-icon-"+e.lock,attrs:{slot:"suffix"},on:{click:e.changeLock},slot:"suffix"})])],1),n("el-form-item",{staticStyle:{position:"relative"}},[n("el-input",{staticStyle:{width:"60%"},attrs:{name:"logVerify",placeholder:"请输入验证码"},model:{value:e.loginForm.captcha,callback:function(t){e.$set(e.loginForm,"captcha",t)},expression:"loginForm.captcha"}}),n("div",{staticClass:"vPic"},[e.picPath?n("img",{attrs:{src:e.picPath,width:"100%",height:"100%",alt:"请输入验证码"},on:{click:function(t){return e.loginVefify()}}}):e._e()])],1),n("el-form-item",[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("登 录")])],1),n("el-link",{staticStyle:{width:"100%"},attrs:{underline:!1,icon:"el-icon-cloudy",href:"https://www.baidu.com",target:"_blank"}},[e._v("通过云平台登录")])],1)],1),n("div",{staticClass:"footer"},[n("div",{staticClass:"copyright"},[e._v("Copyright © "+e._s(e.curYear)+" BUAA")])])])])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"top"},[n("div",{staticClass:"desc"}),n("div",{staticClass:"header"},[n("a",{attrs:{href:"/"}},[n("span",{staticClass:"title"},[e._v("优秀作品展示系统")])])])])}],s=(n("96cf"),n("1da1")),c=n("5530"),u=n("2f62"),l=(n("bc3a"),{name:"Login",data:function(){var e=function(e,t,n){if(t.length<5||t.length>12)return n(new Error("请输入正确的用户名"));n()},t=function(e,t,n){if(t.length<6||t.length>12)return n(new Error("请输入正确的密码"));n()};return{curYear:0,lock:"lock",loginForm:{account:"admin",password:"123456",captcha:"",captchaId:""},rules:{account:[{validator:e,trigger:"blur"}],password:[{validator:t,trigger:"blur"}]},logVerify:"",picPath:""}},created:function(){this.curYear=(new Date).getFullYear()},methods:Object(c["a"])(Object(c["a"])({},Object(u["b"])("user",["LoginIn"])),{},{login:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.LoginIn(e.loginForm);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))()},submitForm:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.loginForm.validate(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(n){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n){t.next=7;break}return t.next=3,e.login();case 3:r=t.sent,r||e.loginVefify(),t.next=10;break;case 7:return e.$message({type:"error",message:"请正确填写登录信息",showClose:!0}),e.loginVefify(),t.abrupt("return",!1);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},changeLock:function(){"lock"===this.lock?this.lock="unlock":this.lock="lock"},loginVefify:function(){}})}),d=l,m=(n("02f7"),n("2877")),f=Object(m["a"])(d,a,i,!1,null,"98965f60",null),p=f.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticStyle:{height:"100%",border:"1px solid #eee"}},[n("el-aside",{staticClass:"aside-wrapper",attrs:{width:"250px"}},[n("div",{staticClass:"aside-title"},[n("div",{staticClass:"aside-title-icon"},[n("el-avatar",{attrs:{size:90,src:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"}})],1),n("h1",{staticClass:"icon-title"},[e._v("优秀作品展示系统")])]),n("el-menu",{attrs:{"default-active":e.$route.path}},[n("side-menus",{attrs:{routes:e.getRoute}})],1)],1),n("el-container",[n("el-header",{staticStyle:{"text-align":"right","font-size":"12px"}},[n("el-dropdown",{on:{command:e.handleCommand}},[n("i",{staticClass:"el-icon-setting",staticStyle:{"margin-right":"15px"}}),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{icon:"el-icon-user",command:"personInfoOpen"}},[e._v("个人信息")]),n("el-dropdown-item",{attrs:{icon:"el-icon-close",command:"logOut"}},[e._v("退出")])],1)],1),n("span",[e._v(e._s(this.name))])],1),n("el-dialog",{attrs:{title:"个人信息",visible:e.personInfoVisible,width:"30%","show-close":!1,"before-close":e.handleClose},on:{"update:visible":function(t){e.personInfoVisible=t}}},[n("div",{staticClass:"person-icon"},[n("el-avatar",{attrs:{icon:"el-icon-user-solid",size:200}})],1),n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"status-icon":""}},[n("el-form-item",{attrs:{label:"姓名",prop:"name"}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"学号",prop:"id"}},[n("el-input",{attrs:{autocomplete:"off",disabled:!0},model:{value:e.form.id,callback:function(t){e.$set(e.form,"id",t)},expression:"form.id"}})],1),n("el-form-item",{attrs:{label:"邮箱",prop:"mail"}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.mail,callback:function(t){e.$set(e.form,"mail",t)},expression:"form.mail"}})],1),n("el-form-item",[n("el-link",{attrs:{type:"primary"},on:{click:function(t){e.innerVisible=!0}}},[e._v("修改密码")])],1)],1),n("el-dialog",{attrs:{width:"30%",title:"修改密码",visible:e.innerVisible,"append-to-body":""},on:{"update:visible":function(t){e.innerVisible=t}}},[n("el-form",{ref:"innerForm",staticClass:"demo-ruleForm",attrs:{model:e.innerForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"当前密码",prop:"past"}},[n("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.innerForm.past,callback:function(t){e.$set(e.innerForm,"past",t)},expression:"innerForm.past"}})],1),n("el-form-item",{attrs:{label:"密码",prop:"pass"}},[n("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.innerForm.pass,callback:function(t){e.$set(e.innerForm,"pass",t)},expression:"innerForm.pass"}})],1),n("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[n("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.innerForm.checkPass,callback:function(t){e.$set(e.innerForm,"checkPass",t)},expression:"innerForm.checkPass"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("innerForm")}}},[e._v("提交")]),n("el-button",{on:{click:function(t){return e.resetForm("innerForm")}}},[e._v("重置")])],1)],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[this.name?n("el-button",{on:{click:function(t){e.personInfoVisible=!1}}},[e._v("取 消")]):e._e(),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.updatepersonInfo("form")}}},[e._v("修 改")])],1)],1),n("el-main",[n("router-view")],1)],1)],1)},b=[],g=(n("b0c0"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{},[e._l(e.menus,(function(t,r){return t.hidden?e._e():[t.children&&1===t.children.length?[n("router-link",{key:r,attrs:{to:t.path+"/"+t.children[0].path}},[n("el-menu-item",{attrs:{index:t.path+"/"+t.children[0].path}},[n("template",{slot:"title"},[t.children[0].meta.icon?n("i",{class:t.children[0].meta.icon}):e._e(),e._v(" "+e._s(t.children[0].meta.title)+" ")])],2)],1)]:t.children?[n("el-submenu",{attrs:{index:t.path}},[n("template",{slot:"title"},[n("i",{class:t.meta.icon}),e._v(" "+e._s(t.meta.title)+" ")]),e._l(t.children,(function(r,o){return r.hidden?e._e():[r.children&&r.children.length>0?[n("side-menus",{key:o,staticClass:"nest-menu",attrs:{routes:[r]}})]:[n("router-link",{key:o,attrs:{to:t.path+"/"+r.path}},[n("el-menu-item",{attrs:{index:t.path+"/"+r.path}},[r.meta.icon?n("i",{class:r.meta.icon}):e._e(),e._v(" "+e._s(r.meta.title))])],1)]]}))],2)]:[n("router-link",{key:r,attrs:{to:t.path}},[n("el-menu-item",{attrs:{index:t.path}},[n("template",{slot:"title"},[t.meta.icon?n("i",{class:t.meta.icon}):e._e(),e._v(" "+e._s(t.meta.title)+" ")])],2)],1)]]}))],2)}),v=[],k={name:"sideMenus",methods:{handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)}},props:{routes:{type:Array,default:function(){return[]}}},data:function(){return{menus:[]}},mounted:function(){this.menus=this.routes,console.log(this.menus)}},w=k,y=(n("cb0c"),Object(m["a"])(w,g,v,!1,null,"103d7aaa",null)),x=y.exports,_=n("4360"),O=n("a78e"),j=n.n(O),C=n("c24f"),F={name:"layout",components:{sideMenus:x},data:function(){var e=this,t=function(t,n,r){""===n?r(new Error("请输入密码")):(""!==e.innerForm.checkPass&&e.$refs.innerForm.validateField("checkPass"),r())},n=function(t,n,r){""===n?r(new Error("请再次输入密码")):n!==e.innerForm.pass?r(new Error("两次输入密码不一致!")):r()};return{innerVisible:!1,name:"",role:"",personInfoVisible:!1,innerForm:{past:"",pass:"",checkPass:""},form:{name:"",mail:"123",id:""},rules:{past:[{required:!0,message:"请输入当前密码",trigger:"blur"}],pass:[{validator:t,trigger:"blur"},{required:!0}],checkPass:[{validator:n,trigger:"blur"},{required:!0}],name:[{required:!0,message:"请输入真实姓名",trigger:"blur"},{min:3,message:"长度不小于 3 个字符",trigger:"blur"}],id:[{required:!0,message:"学号不能为空",trigger:"blur"}],mail:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],password:[{required:!0,message:"密码不能为空",trigger:"blur"},{min:6,message:"密码长度不小于6个字符",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(){var n=Object(s["a"])(regeneratorRuntime.mark((function n(r){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!r){n.next=14;break}return n.next=3,Object(C["e"])({old:t.innerForm.past,new:t.innerForm.pass});case 3:if(o=n.sent,200!=o.code){n.next=10;break}t.$message({message:"修改密码成功！",type:"success"}),t.resetForm(e),t.innerVisible=!1,n.next=12;break;case 10:return console.log(o),n.abrupt("return",!1);case 12:n.next=16;break;case 14:return console.log("error submit!!"),n.abrupt("return",!1);case 16:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())},resetForm:function(e){this.$refs[e].resetFields()},handleClose:function(e){this.$alert("请先修改个人信息！").then((function(e){})).catch((function(e){}))},handleCommand:function(e){"personInfoOpen"==e&&(this.personInfoVisible=!0),"logOut"==e&&this.logOut()},logOut:function(){_["a"].commit("user/setToken",null),j.a.set("Token",""),this.$router.push({path:"/login"})},loadPersonInfo:function(){var e=_["a"].getters["user/userInfo"];this.name=e.nickName,this.form.name=e.nickName,this.role=e.role,this.id=e.uuid,this.form.mail=e.email,this.form.id=e.uuid,this.name||(this.personInfoVisible=!0,this.$alert("欢迎来到作品展示系统，由于您是第一次登录，请先完善个人信息。"))},updatepersonInfo:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(n){var r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=17;break}return e.next=3,Object(C["c"])({email:t.form.mail});case 3:if(r=e.sent,200==r.code){e.next=7;break}return console.log(r),e.abrupt("return",!1);case 7:return e.next=9,Object(C["d"])({name:t.form.name});case 9:if(o=e.sent,200==o.code){e.next=13;break}return console.log(o),e.abrupt("return",!1);case 13:t.$message({message:"修改成功,请重新登录",type:"success"}),t.personInfoVisible=!1,e.next=18;break;case 17:return e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},computed:{getRoute:function(){return _["a"].getters["route/permitRoutes"]}},created:function(){this.loadPersonInfo()},mounted:function(){}},R=F,I=(n("8f2c"),Object(m["a"])(R,h,b,!1,null,null,null)),$=I.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._m(0),n("div",{staticClass:"container-wrapper"},[n("el-row",{staticClass:"select-term-wrapper",attrs:{type:"flex",justify:"space-between"}},[n("el-col",{attrs:{span:7}},[n("span",{staticStyle:{color:"rgba(107,114,128,1)"}},[e._v("请选择学期：")]),n("el-select",{attrs:{placeholder:"请选择"},model:{value:e.chooseterm,callback:function(t){e.chooseterm=t},expression:"chooseterm"}},e._l(e.term,(function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value},on:{change:function(t){return e.changeTerm(t)}}})})),1)],1),n("el-col",{attrs:{span:4}},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addCourseFormVisible=!0}}},[n("i",{staticClass:"el-icon-plus",staticStyle:{"margin-right":"10px"}}),e._v("创建新课程")])],1)],1),n("div",{staticClass:"courses-wrapper",staticStyle:{"margin-top":"15px"}},[n("el-row",e._l(e.showCourses,(function(t,r){return n("el-col",{key:t.id,attrs:{span:5,offset:r%4>0?1:0}},[n("el-card",{attrs:{"body-style":{padding:"10px"}}},[n("img",{staticClass:"image",attrs:{src:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"}}),n("div",{staticStyle:{padding:"10px 5px"}},[n("span",[e._v(e._s(t.name))]),n("span",{staticStyle:{float:"right font-size: 14px",color:"#999",display:"block"}},[e._v(e._s(t.tname))]),n("div",{staticClass:"bottom clearfix"},[n("span",{staticClass:"time"},[e._v("教师："+e._s(t.teacher))]),n("router-link",{key:t.cid,attrs:{to:"/courses/courseInfo/"+t.cid}},[n("el-button",{staticClass:"button",attrs:{type:"text"}},[e._v("查看详情")])],1)],1)])])],1)})),1)],1)],1),n("el-dialog",{attrs:{title:"创建课程",visible:e.addCourseFormVisible,width:"35%",center:""},on:{"update:visible":function(t){e.addCourseFormVisible=t}}},[n("el-form",{ref:e.form,attrs:{model:e.form,"label-width":"80px","label-position":"left",rules:e.rules}},[n("el-form-item",{attrs:{label:"课程名称",prop:"name"}},[n("el-select",{attrs:{placeholder:"请选择课程名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}},e._l(e.lessonName,(function(e,t){return n("el-option",{key:t,attrs:{label:e,value:e}})})),1)],1),n("el-form-item",{attrs:{label:"老师名称"}},[n("el-input",{attrs:{placeholder:"请输入内容",disabled:!0},model:{value:this.teacher,callback:function(t){e.$set(this,"teacher",t)},expression:"this.teacher"}})],1),n("el-form-item",{attrs:{label:"开设学期",prop:"term"}},[n("el-select",{attrs:{placeholder:"请选择开设学期"},model:{value:e.form.term,callback:function(t){e.$set(e.form,"term",t)},expression:"form.term"}},e._l(e.term,(function(e,t){return n("el-option",{key:t,attrs:{label:e.label,value:e}})})),1)],1),n("el-form-item",{attrs:{label:"课程简介",prop:"intro"}},[n("el-input",{attrs:{type:"textarea",rows:9,placeholder:"请输入课程简介",autocomplete:"off"},model:{value:e.form.intro,callback:function(t){e.$set(e.form,"intro",t)},expression:"form.intro"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.addCourseFormVisible=!1}}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitCreatCourseForm(e.form)}}},[e._v("确 定")])],1)],1)],1)},P=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"title"},[n("h2",[e._v("我的课程")])])}],S=(n("4160"),n("b64b"),n("159b"),n("cabd")),T={name:"courses",data:function(){return{chooseterm:"",term:[],lesson:[],showCourses:[],addCourseFormVisible:!1,form:{name:"",intro:"",tid:0},teacher:"",rules:{name:[{required:!0,message:"请选择课程",trigger:"blur"}],term:[{required:!0,message:"请选择开设学期",trigger:"blur"}],intro:[{required:!0,message:"请输入课程简介",trigger:"blur"}]}}},methods:{submitCreatCourseForm:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:console.log(t.form),r={name:t.form.name,info:t.form.intro,tid:t.form.term.tid},t.$refs[e].validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(n){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=9;break}return e.next=3,Object(S["d"])(r);case 3:o=e.sent,200==o.code?t.$message({message:"创建课程成功",type:"success"}):console.log(o),Object.keys(t.form).forEach((function(e){return t.form[e]=""})),t.addCourseFormVisible=!1,e.next=11;break;case 9:return console.log("error submit!!"),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:case"end":return n.stop()}}),n)})))()},changeTerm:function(e){var t=this;this.showCourses=[],this.lesson.forEach((function(n){n.term==e&&t.showCourses.push(n)}))},loadTerm:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(S["h"])();case 2:n=t.sent,200==n.code?(e.term=n.data,e.term.forEach((function(e){e["label"]=e.tname}))):console.log(n);case 4:case"end":return t.stop()}}),t)})))()},loadCourses:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(S["c"])();case 2:return n=t.sent,200==n.code?(e.lesson=n.data,console.log(e.lesson),e.showCourses=e.lesson):console.log(n),t.next=6,Object(S["b"])({});case 6:r=t.sent,200==r.code?e.lessonName=r.data:console.log(n);case 8:case"end":return t.stop()}}),t)})))()}},created:function(){this.teacher=_["a"].getters["user/userInfo"].nickName,this.loadTerm(),this.loadCourses()},mounted:function(){}},V=T,L=(n("3785"),Object(m["a"])(V,E,P,!1,null,"54d4297a",null)),N=L.exports;n("0fae");r["default"].use(o["a"]);var A=[{path:"/index",name:"主页",component:$,children:[{path:"",component:function(){return n.e("chunk-2d21a3d2").then(n.bind(null,"bb51"))},meta:{title:"首页",roles:["user","admin"],icon:"el-icon-s-home"}}]},{path:"/",name:"作品展示",component:function(){return n.e("about").then(n.bind(null,"5bfe"))},meta:{title:"作品展示",roles:["user","admin"],icon:"el-icon-info"}},{path:"/gallery/lesson/:cname",name:"作品展示",hidden:!0,component:function(){return n.e("about").then(n.bind(null,"023e"))},meta:{title:"作品展示",roles:["user","admin"],icon:"el-icon-info"}},{path:"/gallery/detail/:url",name:"作品展示",hidden:!0,component:function(){return n.e("about").then(n.bind(null,"3be8"))},meta:{title:"作品展示",roles:["user","admin"],icon:"el-icon-info"}},{path:"/login",name:"Login",component:p,hidden:!0},{path:"/join/:code",name:"join",component:function(){return n.e("chunk-6a51dc68").then(n.bind(null,"66cb"))},hidden:!0},{path:"",name:"About",component:$,children:[{path:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))},meta:{title:"关于我们",roles:["user","admin"],icon:"el-icon-info"}}]},{path:"/404",name:"error404",component:function(){return n.e("chunk-2d21a975").then(n.bind(null,"bbba"))},hidden:!0}],q=new o["a"]({routes:A,mode:"history"}),M=(t["c"]=q,[{path:"/courses",component:$,name:"课程管理",meta:{title:"课程管理",role:["teacher"],icon:"el-icon-s-custom"},children:[{path:"course",component:N,name:"选择课程",meta:{title:"选择课程",role:["teacher"],icon:"el-icon-success"}},{path:"courseInfo/:id",component:function(){return Promise.all([n.e("chunk-150cc8b4"),n.e("chunk-9b70dd78")]).then(n.bind(null,"dfc6"))},name:"courseInfo",hidden:!0}]},{path:"/show",component:$,name:"作品管理",hidden:!0,meta:{title:"作品管理",role:["admin","student","teacher"],icon:"el-icon-s-custom"},children:[{path:"editor",component:function(){return n.e("chunk-62d44f0a").then(n.bind(null,"a797"))},name:"editor",hidden:!0}]},{path:"/task",component:$,name:"实验管理",meta:{title:"实验管理",role:["teacher","student"],icon:"el-icon-s-custom"},children:[{path:"filter",component:function(){return Promise.all([n.e("chunk-150cc8b4"),n.e("chunk-770bfd9e")]).then(n.bind(null,"c430b"))},name:"filter",meta:{title:"选择实验",role:["student","teacher"],icon:"el-icon-monitor"}},{path:"detail/:id",component:function(){return n.e("chunk-cc0f8f24").then(n.bind(null,"5cbe"))},name:"detail",hidden:!0}]},{path:"",name:"Teacher",component:$,meta:{role:["admin"]},children:[{path:"teacher",component:function(){return n.e("about").then(n.bind(null,"f820"))},meta:{title:"教师管理",role:["admin"],icon:"el-icon-user"}}]},{path:"",name:"Term",component:$,meta:{role:["admin"]},children:[{path:"term",component:function(){return n.e("about").then(n.bind(null,"f820"))},meta:{title:"学期管理",role:["admin"],icon:"el-icon-s-tools"}}]},{path:"*",redirect:"/404",hidden:!0}])},a57e:function(e,t,n){},b775:function(e,t,n){"use strict";var r,o=n("bc3a"),a=n.n(o),i=n("5c96"),s=(n("4360"),n("56d7")),c=n("a78e"),u=n.n(c),l=a.a.create({baseURL:"/api",timeout:99999}),d=0,m=function(){d++,r&&clearTimeout(r),r=setTimeout((function(){d>0&&s["default"].$bus.emit("showLoading")}),400)},f=function(){d--,d<=0&&(clearTimeout(r),s["default"].$bus.emit("closeLoading"))};l.interceptors.request.use((function(e){if(e.donNotShowLoading||m(),"/file"==e.url)return e;var t=u.a.get("Token");return e.data=JSON.stringify(e.data),e.headers={"Content-Type":"application/json",Authorization:t},e}),(function(e){return f(),Object(i["Message"])({showClose:!0,message:e,type:"error"}),e})),l.interceptors.response.use((function(e){return f(),200==e.data.code?e.data:(200==e.status&&"application/zip"==e.data.type||Object(i["Message"])({showClose:!0,message:e.data.msg,type:"error"}),e)}),(function(e){return f(),Object(i["Message"])({showClose:!0,message:e,type:"error"}),e})),t["a"]=l},c24f:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return c}));var r=n("b775"),o=function(e){return Object(r["a"])({url:"/user/login",method:"post",data:e})},a=function(e){return Object(r["a"])({url:"/user/name",method:"post",data:e})},i=function(e){return Object(r["a"])({url:"/user/email",method:"post",data:e})},s=function(e){return Object(r["a"])({url:"/user/password",method:"post",data:e})},c=function(e){return Object(r["a"])({url:"/user/info",method:"get",data:e})}},cabd:function(e,t,n){"use strict";n.d(t,"h",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return i})),n.d(t,"d",(function(){return s})),n.d(t,"f",(function(){return c})),n.d(t,"a",(function(){return u})),n.d(t,"e",(function(){return l})),n.d(t,"g",(function(){return d}));var r=n("b775"),o=function(e){return Object(r["a"])({url:"/terms/all",method:"get",data:e})},a=function(e){return Object(r["a"])({url:"/course",method:"get",data:e})},i=function(){return Object(r["a"])({url:"/coursename",method:"get"})},s=function(e){return Object(r["a"])({url:"/course",method:"post",data:e})},c=function(e,t){return Object(r["a"])({url:"/course/"+t,method:"get",data:e})},u=function(e,t){return Object(r["a"])({url:"/course/"+t+"/students",method:"post",data:e})},l=function(e,t,n){return Object(r["a"])({url:"/course/"+t+"/student/"+n,method:"delete",data:e})},d=function(e,t){return Object(r["a"])({url:"/course/"+t+"/students",method:"get",data:e})}},cb0c:function(e,t,n){"use strict";n("16a5")},f168:function(e,t,n){}});