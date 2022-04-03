<template>
    <el-tree
            :props="props"
            :load="loadNode"
            lazy
            accordion
            @node-click="nodeClick">
    </el-tree>
</template>

<script>
    export default {
        name: "TreeGoods",
        data() {
            return {
                props: {
                    label: 'name',
                    children: 'zones',
                    isLeaf: 'leaf'
                },
            };
        },
        methods: {
            /**
             * 点击tree获取数据
             * */
            nodeClick(data){
                // console.log(data.name)
                this.$emit('getTreeData',data)
            },
            loadNode(node, resolve) {
                console.log('node',node)
                if (node.level === 0) {
                    this.$api.getSelectCategory()
                    .then(res=>{
                        console.log(res.data)
                        return resolve(res.data.result);
                    })
                }
                if (node.level >= 1){
                    console.log('level===1')
                    this.$api.getSelectCategory({
                        id:node.data.cid
                    })
                    .then(res => {
                        if(res.data.status === 200){
                            console.log(res.data)
                            return resolve(res.data.result);
                        }else{
                            return resolve([])
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>