<template>
    <div>
        <el-dialog
                title="添加规格参数"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="cancel">
<!--            显示规格类目-->
            <TreeGoods @getTreeData="getTreeData" :init="init"/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" :disabled="isDisable" @click="addParams">确定并添加</el-button>
              </span>
        </el-dialog>
<!--        内弹框-->
        <el-dialog
                width="60%"
                title="商品规格参数配置"
                :visible.sync="innerVisible"
                :before-close="cancel"
                append-to-body>
            <span>当前选中商品:{{treeData.name}}</span>
            <br>
            <el-button type="primary" style="margin: 10px auto"  @click="addDomain">新增规格列表</el-button>
            <hr>
            <br>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-form-item
                        class="myForm"
                        v-for="(domain, index) in dynamicValidateForm.domains"
                        :label="domain.title + index"
                        :key="domain+index"
                        :prop="domain.title"
                        :rules="{ required: true, message: '名不能为空', trigger: 'blur'}">
                    <div class="item">
                        <el-input v-model="domain.title"></el-input>
                        <el-button @click="addChildDomain(index)">添加子组</el-button>
                        <el-button @click.prevent="removeDomain(index)">删除</el-button>
                    </div>
<!--                    内层的表单项-->
                    <el-form-item v-for="(ele,i) in domain.children" class="myChildForm"
                             :key="ele+i"
                             :prop="ele.title"
                             :rules="{ required:true,message:'名不能为空',trigger:'blur'}">
                        <div class="ChildrenDomain">
                            <el-input v-model="ele.title"></el-input>
                            <el-button @click.prevent="removeChildrenDomain(i)">删除</el-button>
                        </div>
                    </el-form-item>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                    <el-button @click="cancel">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import TreeGoods from "../../Goods/TreeGoods";
    export default {
        name: "ParamsDialog",
        components: {TreeGoods},
        data() {
            return {
                init:[],
                dialogVisible: false,//外弹框
                isDisable: true,//是否能点击确定
                innerVisible:false,//内弹框
                treeData:[],
                //动态表单数据
                dynamicValidateForm: {
                    domains: [
                    //     {
                        //     value: '',
                        //     title:'',
                        //     children:[
                        //         {
                        //             value:'',
                        //             title:'',
                        //             children:[],
                        //         }
                        //     ]
                        // },
                    ],
                }
            };
        },
        methods: {
            /**
             * 添加规格参数
             * */
            addParams(){
                this.innerVisible = true
            },
            /**
             * 添加子组
             * */
            addChildDomain(index){
                console.log(this.dynamicValidateForm.domains)
              this.dynamicValidateForm.domains[index].children.push({
                  value:'',
                  title:'',
                  children:[],
              })
                this.dynamicValidateForm.domains[index].children.title = this.dynamicValidateForm.domains[index].value
            },
            /**
             * 删除子组
             * */
            removeChildrenDomain(index,i){
                this.dynamicValidateForm.domains[index].children.splice(i,1)
            },
            /**
             * 获取tree数据
             * */
            getTreeData(val){
                console.log('tree',val)
                this.treeData = val
                this.isDisable = false
            },
            handleClose() {
                //
            },
            /**
             * 提交按钮
             * */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('提交规格参数',this.dynamicValidateForm.domains)
                        console.log(
                            this.treeData.cid,
                            this.treeData.name,
                            JSON.stringify(this.dynamicValidateForm.domains)
                        )
                        this.$api.insertItemParam({
                            itemCatId:this.treeData.cid,
                            specsName:this.treeData.name,
                            paramData:JSON.stringify(this.dynamicValidateForm.domains)
                        })
                        .then(res=>{
                            if(res.data.status === 200 ){
                                console.log('插入数据成功')
                                //关闭弹框
                                this.innerVisible = false
                                this.dialogVisible = false
                                //清空数据
                                this.$parent.http(1)
                                this.dynamicValidateForm.domains = []
                                this.isDisable = true
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**
             * 取消按钮
             * */
            close(){
                this.dialogVisible = false
                this.isDisable = true
            },
            /**
             * 最后的取消按钮
             * */
            cancel() {
                this.innerVisible = false
                this.dialogVisible = false
                this.dynamicValidateForm.domains = []
                this.isDisable = true
            },
            /**
             * 删除大组
             * */
            removeDomain(index) {
                this.dynamicValidateForm.domains.splice(index,1)
            },
            /**
             * 新增大列表
             * */
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    title:'',
                    children: []
                });
            }

        }
    }
</script>

<style lang="less" scoped>
    .myForm{
        margin-top: 10px;
        .item{
            display: flex;
            button{
                margin-left:10px;
            }
        }
        .myChildForm{
            margin:10px 20px;
            button{
                margin-left:10px;
            }
        }
    }

    .ChildrenDomain{
        display: flex;
        button{
            /*margin: 10px auto;*/
        }
    }
</style>