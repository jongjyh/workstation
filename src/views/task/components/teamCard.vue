<template>
    <div class="container">
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                <i class="el-icon-s-custom"></i>
                <span style="font-weight: bolder; margin-left: 10px">我的小队</span>

            </div>
            <div class="item-style">
            <span>队长：</span>
            <el-tag
                    effect="plain">
                {{gid}}
            </el-tag></div>
            <div class="item-style">
            <span>队伍中：</span>
            <el-tag
                    type="success"
                effect="dark"
                    v-if="inTeam==true"
            >
            是
            </el-tag>
                <el-tag
                        type="danger"
                        effect="dark" v-if="inTeam==false">
                    否
                </el-tag>
            </div>
            <div class="item-style">
                <span>身份：</span>
                <el-tag
                        effect="light"
                        v-if="leader==true"
                >
                    队长
                </el-tag>
                <el-tag
                        effect="light"
                        v-if="leader==false"
                >
                    队员
                </el-tag>
            </div>
            <div class="item-style">
                <span>成员列表：</span>
                <el-tag
                        :key="tag"
                        effect="light"
                        v-for="tag in group"
                >
                    {{tag.name}}
                </el-tag>
            </div>
            <div class="button-region" >
                <el-button type="primary" v-if="inTeam==false" @click="inviteURL">生成邀请链接</el-button>
                <template>
                    <el-popconfirm
                            confirm-button-text='好的'
                            cancel-button-text='不用了'
                            icon="el-icon-info"
                            icon-color="red"
                            title="确定离开队伍吗？"
                            @confirm="leaveTeam"
                    >
                        <el-button  slot="reference" type="danger" v-if="inTeam==true" >离开队伍</el-button>
                    </el-popconfirm>
                </template>
                <el-dialog
                        title="提示"
                        :visible.sync="urlVisible"
                        width="30%"
                        >
                    <span>邀请链接：{{url}}</span>
                    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="urlVisible = false">确 定</el-button>
  </span>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
    import { teamInfo,leave} from '@/api/team'
    export default {
        name: "teamCard",
        methods:{
            encode(eid,gid){
                return window.btoa(eid+'/'+gid)
            },
            inviteURL(){
                /*生成URL并弹出*/

                const baseUrl=this.GLOBAL.BASE_URL
                this.url=baseUrl+'/join/'+this.encode(this.eid,this.gid)
                this.urlVisible=true

            },
            async leaveTeam(){
                console.log(111)
                console.log(111)
                const res=await leave({},this.eid,this.gid)
                if(res.code==200){
                    this.$message({
                        message: '离队成功，请刷新',
                        type: 'success'
                    });
                    this.inTeam=false
                    this.$emit('change',this.inTeam)
                }
                else
                {
                    console.log(res)
                }

            },
            async loadMyTeamInfo(){
                /*载入我的个人信息*/
                const res=await teamInfo({},this.eid)
                if(res.code==200){
                    let data=res.data
                    this.gid=data.gid;
                    this.inTeam=data.inTeam
                    this.$emit('change',this.inTeam)
                    if(this.uid ===this.gid)
                        this.leader=true
                    else
                        this.leader=false

                }
                else
                {
                    console.log(res)
                }
            },
        },
        created() {
            this.loadMyTeamInfo()
        },
        props:{
          eid:String,
            uid:String,
            group:[],
        },
        data(){
            return{
                gid:'',
                inTeam:true,
                url:'',
                leader:true,
                urlVisible:false,

            }
        }

    }
</script>

<style scoped>
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
        background-color: black;
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .button-region{
        display: flex;
        justify-content: center;
    }
    .item-style{
        margin-bottom: 15px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
</style>