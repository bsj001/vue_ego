<template>
    <div class="login-box">
        <h3 class="title">登录界面</h3>
        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import jwt from 'jwt-decode'
    import {mapMutations} from 'vuex'
    export default {
        name:'index',
        data() {
            let validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    if (this.loginForm.username !== '') {
                        this.$refs.ruleForm.validateField('checkUsername');
                    }
                    callback();
                }
            };
            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.loginForm.password !== '') {
                        this.$refs.ruleForm.validateField('checkPassword');
                    }
                    callback();
                }
            };
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            ...mapMutations('loginModule',{setUser:'SETUSER'}),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let {username,password} = this.loginForm;
                        this.$api.login({
                            username,
                            password
                        })
                        .then(result=>{
                            console.log(result)
                            if(result.data.status === 200){
                                console.log(jwt(result.data.data))
                                //登录成功后：1,存储登录信息 2,跳转网页 3,顶部区域显示用户信息 4，持久化
                                let obj = {
                                    user:jwt(result.data.data).username,
                                    token:result.data.data
                                }
                                this.setUser(obj)
                                //存储本地
                                localStorage.setItem('user',JSON.stringify(obj))
                                //跳转
                                this.$router.push('/')
                            }
                        })
                    } else {
                        this.$message({
                            message: '登录错误!!',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
    .title{
        margin: 20px auto;
        text-align: center;
        color:red;
    }
    .login-box{
        width: 400px;
        height: 300px;
        margin:100px auto;
        border: 1px solid #eee;
        background: #fff;
    }
    .demo-ruleForm{
        margin-right:20px;
        button{
            margin-top:30px;
            margin-left:50px;
        }
    }

</style>