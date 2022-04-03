<template>
    <div>
        <div class="addGoods">
            <!--        面包屑-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="myForm">
            <!--        表单内容-->
            <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品类目" prop="category">
                    <el-button type="primary">类目选择</el-button>
                </el-form-item>
                <el-form-item label="商品名称" prop="title">
                    <el-input v-model="goodsForm.title"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                    <el-input v-model="goodsForm.price"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="num">
                    <el-input v-model="goodsForm.num"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="goodsForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker placeholder="选择时间" v-model="goodsForm.date2" style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品卖点" prop="sellPoint">
                    <el-input v-model="goodsForm.sellPoint"></el-input>
                </el-form-item>
                <el-form-item label="商品图片" prop="image">
                    <el-button type="primary">上传图片</el-button>
                </el-form-item>
                <el-form-item label="商品描述" prop="descs">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        name: "AddGoods",
        data() {
            return {
                goodsForm: {
                    title: '', //商品名称
                    price: '',//商品价格
                    num: '',//商品数量
                    sellPoint: '',//商品卖点
                    image: '',//商品图片
                    descs: '',//商品描述
                    category: '',//商品类目
                    date1:'', //发布时间
                    date2:'' //发布时间
                },
                rules: {
                    title: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    num: [
                        { required: true, message: '请输入商品数量', trigger: 'blur' },
                        { min: 10, max: 1000, message: '数量在 10 到 1000 个', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style lang="less" scoped>
    .addGoods{
        margin: 20px;
    }
    .title{
        padding:20px;
        background: white;
        border: white 3px solid;
    }
    .myForm{
        padding: 20px;
        background: white;
    }

</style>