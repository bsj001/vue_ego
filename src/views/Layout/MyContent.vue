<template>
    <div>
        <div class="header">
            <i v-if="!isCollapse" @click="changeMenu" class="iconfont icon-right-indent"></i>
            <i v-else @click="changeMenu" class="iconfont icon-bx-right-indent"></i>
            <div class="header-right">
                <el-dropdown @command="clickLang">
                    <el-button type="primary">
                        多语言<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="zh">中文</el-dropdown-item>
                        <el-dropdown-item command="en">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="user">
                    欢迎 ,{{userInfo.user}}
                    <i class="iconfont icon-tuichu" @click="exit"></i>
                </div>
            </div>
        </div>

        <!--    内容区域---路由出口-->
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "MyContent",
        props:['isCollapse'],
        computed:{
            ...mapState('loginModule',['userInfo'])
        },
        methods:{
            ...mapMutations('loginModule',{clear:'CLEAR'}),
            changeMenu(){
                this.$emit('changeCollapse')
            },
            clickLang(command){
                console.log('多语言被点击了',command)
                this.$i18n.locale = command
            },
            /**
             * 退出登录
             * */
            exit(){
                //清空vuex数据
                this.clear()
                //清除本地存储
                localStorage.removeItem('user')
                //返回登录
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="less" scoped>
    .header{
        height: 50px;
        background-color: #409EFF;
        color: white;
        .iconfont{
            margin:10px auto;
        }
    }
    .header-right{
        line-height: 50px;
        float: right;
        padding-right: 20px;
        display: flex;
        text-align: center;
    }

</style>