<template>
    <div id="userLayout" class="user-layout-wrapper">
        <div class="container">
            <div class="top">
                <div class="desc">
                    <!--<img class="logo_login" src="@/assets/logo_login.png" alt="" />-->
                </div>
                <div class="header">
                    <a href="/">
                        <!-- <img src="~@/assets/logo.png" class="logo" alt="logo" /> -->
                        <span class="title">优秀作品展示系统</span>
                    </a>
                </div>
            </div>
            <div class="main">
                <el-form
                        :model="loginForm"
                        :rules="rules"
                        ref="loginForm"
                        @keyup.enter.native="submitForm"
                >
                    <el-form-item prop="acount">
                        <el-input placeholder="请输入用户名" v-model="loginForm.account">
                            <i class="el-input__icon el-icon-user" slot="suffix"></i
                            ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                :type="lock === 'lock' ? 'password' : 'text'"
                                placeholder="请输入密码"
                                v-model="loginForm.password"
                        >
                            <i
                                    :class="'el-input__icon el-icon-' + lock"
                                    @click="changeLock"
                                    slot="suffix"
                            ></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item style="position: relative">
                        <el-input
                                v-model="loginForm.captcha"
                                name="logVerify"
                                placeholder="请输入验证码"
                                style="width: 60%"
                        />
                        <div class="vPic">
                            <img
                                    v-if="picPath"
                                    :src="picPath"
                                    width="100%"
                                    height="100%"
                                    alt="请输入验证码"
                                    @click="loginVefify()"
                            />
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm" style="width: 100%"
                        >登 录</el-button
                        >
                    </el-form-item>
                    <el-link :underline="false" icon="el-icon-cloudy" style="width: 100%" :href="toCloud" >通过云平台登录</el-link>
                </el-form>

            </div>
            <div class="footer">

                <div class="copyright">Copyright &copy; {{ curYear }} BUAA</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import {captcha} from '@/api/user'
    export default {
        name: "Login",
        data() {
            const checkUsername = (rule, value, callback) => {
                if (value.length < 5 || value.length > 12) {
                    return callback(new Error("请输入正确的用户名"));
                } else {
                    callback();
                }
            };
            const checkPassword = (rule, value, callback) => {
                if (value.length < 6 || value.length > 12) {
                    return callback(new Error("请输入正确的密码"));
                } else {
                    callback();
                }
            };
            return {
                toCloud:'',
                curYear: 0,
                lock: "lock",
                loginForm: {
                    account: "",
                    password: "",
                    captcha: "",
                    captchaId: "",
                    picPath:""
                },
                rules: {
                    account: [{ validator: checkUsername, trigger: "blur" }],
                    password: [{ validator: checkPassword, trigger: "blur" }],
                },
                logVerify: "",
                picPath: "",
            };
        },
        created() {
            this.toCloud='https://scs.buaa.edu.cn/?service=http://'+window.location.host+'/login'
            if(this.$route.query.authorization){
                this.logByCloudSoft(this.$route.query.authorization)
            }
            this.curYear = new Date().getFullYear();
            this.loginVefify()
        },
        methods: {
            ...mapActions("user", ["LoginIn"]),
            async login() {
                this.loginForm.picPath=this.picPath
                return await this.LoginIn(this.loginForm);
            },
            async submitForm() {
                this.$refs.loginForm.validate(async (v) => {
                    if (v) {

                        const flag = await this.login();
                        if (!flag) {
                             this.loginVefify();
                        }
                    } else {
                        this.$message({
                            type: "error",
                            message: "请正确填写登录信息",
                            showClose: true,
                        });
                          this.loginVefify();
                        return false;
                    }
                });
            },
            ...mapActions("user", ["LoginByCloud"]),
            async logByCloudSoft(auth){
                let data= {
                    authorization:auth,
                    url:'http://'+window.location.host
                }
                console.log(data)
                return await this.LoginByCloud(data);
            },
            changeLock() {
                this.lock === "lock" ? (this.lock = "unlock") : (this.lock = "lock");
            },
            loginVefify() {
                captcha({}).then((ele) => {
                    this.picPath = ele.data.picPath;
                    this.loginForm.captchaId = ele.data.captchaId;
                });
            },
        },

    };
</script>

<style scoped lang="scss">
    @import "@/style/login.scss";
</style>
