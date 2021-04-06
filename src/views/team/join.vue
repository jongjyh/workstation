<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>确定加入小队暗号为 {{gid}} 的队伍吗？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="joinTeam" :disabled="wrongURL">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import { teamInfo,join} from '@/api/team'
    export default {
        name: "join",
        methods:{
            async joinTeam(){

                const res=await join({},this.eid,this.gid)
                if(res.code==200){
                    this.$message({
                        message: '加入成功',
                        type: 'success'
                    });
                }
                else
                {
                    console.log(res)
                }
                this.dialogVisible = false
            },
            decode(code){
                /*解码*/
                let strs=window.atob(code).split('/')

                 if(strs.length!==2){
                    this.$message.error("链接错误");
                    this.wrongURL=true;
                    return ;
                }else {
                     this.eid=strs[0];
                     this.gid=strs[1];
                 }
            }
        },
        created() {
            console.log(this.$route.params.code)
            let code=this.$route.params.code;
            this.decode(code)
            //获取参数，并检查uid和teaminfo然后请求加入
        },
        data(){
            return{
                gid:'',
                eid:'',
                dialogVisible:true,
                wrongURL:false,
            }
        }
    }
</script>

<style scoped>

</style>