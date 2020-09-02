<template>
    <div class='loginbox'>
        <el-card header="请先登录" class='login-card'>
            <el-form @submit.native.prevent="login()">
            <el-form-item>
                <el-input type="text" placeholder="用户名" v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="密码" v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login" type="primary" native-type="submit">登录</el-button>
            </el-form-item>
        </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            model:{

            }
        }
    },
    methods:{
        async login(){
            const res = await this.$http.post('/login',this.model);
            console.log(res);
            localStorage.token = res.data;
            this.$router.push('/')
            this.$message({
                type:"success",
                message:"欢迎"
            })
        },
    }
}
</script>
<style scoped>

.login-card{
    width: 25rem;
    margin: 10rem auto;
}

</style>