<template>
    <div class="goods">
<!--        1,搜索区域-->
        <div class="header">
            <el-input v-model="input" placeholder="请输入内容" @change="searchInfo"></el-input>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">
                <router-link to="/add-goods" style="color:#ffffff">页面添加</router-link>
            </el-button>
            <el-button type="primary" @click="goodsDialog">弹框添加</el-button>
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
                <el-table-column prop="id" label="商品ID" width="100px"></el-table-column>
                <el-table-column prop="title" label="商品名称" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="price" label="商品价格" width="100px"></el-table-column>
                <el-table-column prop="num" label="商品数量" width="100px"></el-table-column>
                <el-table-column prop="category" label="规格类目" width="100px"></el-table-column>
                <el-table-column prop="image" label="商品图片" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
                <el-table-column prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
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
<!--        3,分页-->
        <MyPagination :total='total' :pageSize="pageSize" @changePage="changePage" :currentPage="currentPage"/>
<!--        弹框添加商品-->
        <GoodsDialog :title="title" :rowData='rowData' @click="goodsDialog"
                     :dialogVisible="dialogVisible"
                     @changeDialogVisible="changeDialogVisible"
        />
    </div>
</template>

<script>
    import MyPagination from "../../components/MyPagination";
    import GoodsDialog from "./GoodsDialog";
    export default {
        name: "index",
        components:{GoodsDialog, MyPagination},
        data(){
            return{
                title:"",
                rowData:{},
                input:'',
                tableData:[],
                total:10,
                pageSize:1,
                type:1,
                list:[],
                dialogVisible:false,
                currentPage:1
            }
        },
        created() {
            this.http(1)
        },
        methods:{
            /**
             * 弹框添加商品
             * */
            goodsDialog(){
                this.dialogVisible = true
                this.title = '添加商品'
            },
            changeDialogVisible(){
                this.dialogVisible = false
            },
            /**
             *获取列表
             * */
            http(page){
                this.$api.getGoodsList({
                    page,
                })
                .then(res=>{
                    // console.log(res.data)
                    if(res.data.status === 200){
                        this.currentPage = page
                        this.tableData = res.data.data;//数据
                        this.total = res.data.total; //总条数
                        this.pageSize = res.data.pageSize //分页大小
                    }
                })
            },
            /**
             *分页页码
             * */
            changePage(num){
                this.currentPage = num
                // console.log('this.pageSize',this.pageSize)
                if(this.type === 1){
                    this.http(num)
                }else if(this.type === 2){
                    this.tableData = this.list.slice((num-1)*this.pageSize,num*this.pageSize)
                }
            },
            /**
             * 搜索
             * */
            searchInfo(value){
                if(!value){
                    this.http(1);
                    this.currentPage = 1
                    this.type = 1
                    return;
                }
                this.$api.getSearch({
                    search:value
                })
                .then(res=>{
                    // console.log('搜索',res.data)
                    if(res.data.status === 200){
                        this.currentPage = 1
                        this.list = res.data.result
                        //假设需要分页，处理分页
                        this.total = res.data.result.length
                        this.pageSize = 3
                        this.tableData = res.data.result.slice(0,this.pageSize);
                        this.type = 2
                    }else{
                        this.tableData = []
                        this.total = 1
                        this.pageSize = 1
                        this.type = 1
                    }
                })
                // this.input = ''
            },
            /**
             *
             * 编辑操作
             *
             * */
            handleEdit(index, row){
                console.log(index, row);
                this.title = '编辑商品'
                this.dialogVisible = true
                this.rowData = {...row}
                //我没有加ref，所以不能用
                // this.$refs.goodsDialog.goodsForm = row
            },
            /**
             * 删除操作
             * */
            handleDelete(index, row){
                console.log(index, row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.deleteGoods({id:row.id})
                    .then(res=>{
                        if(res.data.status === 200){
                            this.http(1)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'info',
                                message: '删除失败'
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .goods{
        margin:20px;
        .header{
            display: flex;
            button{
                margin-left: 20px;
            }
        }
        .wrapper{
            margin-top:10px;
        }
    }
</style>