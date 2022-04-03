<template>
    <div style="text-align:center;margin: 20px">
        <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :total="total"
                :page-size="pageSize"
                @current-change="changePage"
                :current-page.sync="page"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "MyPagination",
        props:{
            total:{
                type:Number,
                default:100
            },
            pageSize:{
                type:Number,
                default:10
            },
            currentPage:{
                type:Number,
                default:3
            }
        },
        computed:{
            page:{
                get(){
                    return this.currentPage
                },
                set(value){
                    return value
                }
            }
        },
        methods:{
            changePage(page){
                this.$emit('changePage',page)
            }
        }
    }
</script>

<style scoped>

</style>