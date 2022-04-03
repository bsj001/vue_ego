<template>
    <div>
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                :collapse="isCollapse"
        >
            <el-menu-item>
                <span slot="title">易购后台管理系统</span>
            </el-menu-item>
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ $t("menu.home") }}</span>
            </el-menu-item>
            <el-menu-item index="/goods">
                <i class="el-icon-document"></i>
                <span slot="title">{{ $t("menu.goods") }}</span>
            </el-menu-item>
            <el-submenu index="/params+">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">{{ $t("menu.params") }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/params/specifications">
                        <i class="el-icon-setting"></i>
                        <span slot="title">规格与包装</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/advert">
                <i class="el-icon-setting"></i>
                <span slot="title">{{ $t("menu.advice") }}</span>
            </el-menu-item>
            <el-submenu index="/order">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ $t("menu.order") }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/order/order-list">
                        <i class="el-icon-setting"></i>
                        <span slot="title">订单列表</span>
                    </el-menu-item>
                    <el-menu-item index="/order/order-back">
                        <i class="el-icon-setting"></i>
                        <span slot="title">订单退货</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/user">
                <i class="el-icon-s-custom"></i>
                <span slot="title">个人中心</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "MyMenu",
        props:['isCollapse'],
        data(){
            return{
                // isCollapse:false
            }
        }
    }
</script>

<style scoped>
    h4{
        margin:10px 0;
        text-align: center;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>