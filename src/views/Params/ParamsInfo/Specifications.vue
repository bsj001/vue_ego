<template>
    <div class="params">
        <!--  面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/params' }">规格参数</el-breadcrumb-item>
            <el-breadcrumb-item>规格与包装</el-breadcrumb-item>
        </el-breadcrumb>
        <!--        1,搜索区域-->
        <div class="header">
            <el-input v-model="input" placeholder="请输入内容" @change="searchInfo"></el-input>
            <el-button type="primary">查询</el-button>
            <el-button type="primary" @click="showParams">添加</el-button>
        </div>
        <!--        2,表格区域展示视图数据-->
        <div class="wrapper">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column prop="itemCatId" label="规格参数ID" width="100px"></el-table-column>
                <el-table-column prop="id" label="类目ID" width="100px"></el-table-column>
                <el-table-column prop="specsName" label="规格名称" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--        分页-->
        <MyPagination :total="total" :page-size="pageSize"/>
        <!--        弹框-->
        <ParamsDialog ref="paramsDialog"/>
    </div>
</template>
<script>
    import MyPagination from "../../../components/MyPagination";
    import ParamsDialog from "./ParamsDialog";
    export default {
        name: "Specifications",
        components: {ParamsDialog, MyPagination},
        data() {
            return {
                input:'',
                tableData:[],
                total:10,
                pageSize:1,
            };
        },
        created() {
            this.http(1)
        },
        methods: {
            searchInfo(){},
            /**
             * 点击显示弹框--添加规则参数
             * */
            showParams(){
                this.$refs.paramsDialog.dialogVisible = true
            },
            /***
             *
             * */
            http(page){
                this.$api.getParams({page})
                    .then(res=>{
                        console.log(res.data)
                        if(res.data.status === 200){
                            this.tableData = res.data.data;
                            //获取分页
                            this.total = res.data.total
                            this.pageSize = res.data.pageSize
                        }
                    })
            },
            handleDelete(){

            },
            handleEdit(){
                //
            },
        }
    }
</script>

<style lang="less" scoped>
    .params{
        margin:20px;
        .header{
            display: flex;
            margin-top:20px;
            button{
                margin-left: 20px;
            }
        }
        .wrapper{
            margin-top:10px;
        }
    }
</style>