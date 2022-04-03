<template>
    <div>
        <div>
            <el-dialog :title="title" :visible.sync="dialogVisible" width="70%"
            :before-close="clearForm">
                <!--表单内容-->
                <div class="myForm">
                    <!--        表单内容-->
                    <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="商品类目" prop="category">
                            <el-button type="primary" @click="innerVisible = true">类目选择</el-button>
                            <span>{{goodsForm.category}}</span>
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
                            <el-button type="primary" @click="imageInnerVisible = true">上传图片</el-button>
                            <img :src="goodsForm.image" style="height: 200px;margin-left: 10px" alt="">
                        </el-form-item>
                        <el-form-item label="商品描述" prop="descs">
                            <WangEditor ref='myEditor' @sendEditor='sendEditor'/>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="clearForm">取 消</el-button>
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                </span>
                <!--商品类目选择的内弹框-->
                <el-dialog
                        width="50%"
                        title="类目选择"
                        :visible.sync="innerVisible"
                        append-to-body>
                    <TreeGoods @getTreeData="getTreeData"></TreeGoods>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="close">取 消</el-button>
                            <el-button type="primary" @click="showTreeData">确 定</el-button>
                        </span>
                </el-dialog>
                <!--上传图片的内弹框-->
                <el-dialog
                        width="50%"
                        title="上传图片"
                        :visible.sync="imageInnerVisible"
                        append-to-body>
                    <UploadImage @sendImg="sendImg"></UploadImage>
                    <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="imageInnerVisible = false">取 消</el-button>
                            <el-button type="primary" @click="imageInnerVisible == false" >确 定</el-button>
                        </span>
                </el-dialog>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import TreeGoods from "./TreeGoods";
    import UploadImage from "./UploadImage";
    import WangEditor from "./WangEditor";
    export default {
        name: "GoodsDialog",
        // props:['dialogVisible','title'],
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:"添加商品"
            },
            rowData:{
                type:Object,
                default:function () {
                    return {}
                }
            }
        },
        components:{TreeGoods,UploadImage,WangEditor},
        data(){
            return {
                innerVisible:false,//类目选择的显示隐藏
                imageInnerVisible:false,//图片的显示隐藏
                treeData:{},//接受tree数据
                goodsForm: {
                    id:'',
                    title: '', //商品名称
                    price: '',//商品价格
                    num: '',//商品数量
                    sellPoint: '',//商品卖点
                    image: '',//商品图片
                    descs: '',//商品描述
                    category: '',//商品类目
                    date1:'', //发布时间
                    date2:'', //发布时间
                },
                rules: {
                    title: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    num: [
                        { required: true, message: '请输入商品数量', trigger: 'blur' },
                        // { min: 10, max: 1000, message: '数量在 10 到 1000 个', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' }
                    ],
                }
            };
        },
        watch:{
            rowData(val){
                this.goodsForm = val
                this.$nextTick(()=>{
                    this.$refs.myEditor.editor.txt.html(val.descs)
                })
            }
        },
        methods:{
            /**
             * 获取编辑器中的内容
             * */
            sendEditor(value){
                this.goodsForm.descs = value
                this.treeData.descs = this.goodsForm.descs
            },
            /**
             * 显示图片
             * */
            sendImg(imgUrl){
                console.log('sendImage被调用了',imgUrl)
                this.imageInnerVisible = false
                this.goodsForm.image = imgUrl
                this.treeData.image = this.goodsForm.image
            },
            /**
             * 显示tree数据
             * */
            showTreeData(){
                this.innerVisible = false
                this.goodsForm.category = this.treeData.category
                console.log(this.goodsForm.category)
            },
            /**
             * 获取treeData数据
             * */
            getTreeData(value){
                // console.log(value)
                this.treeData.category = value
                // console.log(this.treeData)
            },
            /**
             * 关闭添加商品的弹框
             * */
            close(){
                this.innerVisible = false
                this.$emit('changeDialogVisible')
            },
            /**
             * 打开类目选择的弹框
             * */
            // categoryChange(){
            //     this.innerVisible = true
            // },
            onSubmit() {
                console.log('submit!');
            },
            submitForm(){
                this.$refs.ruleForm.validate((valid) => {
                    if(valid){
                        console.log('获取到输入的信息：',this.goodsForm)
                        let {title,price,num,category,image,sellPoint,descs,id} = this.goodsForm
                        if(this.title === '添加商品'){
                            this.$api.addGoods({
                                title,price,num,category,image,sellPoint,descs
                            })
                            .then(res=>{
                                console.log('添加成功',res.data)
                                if(res.data.status === 200){
                                    //成功
                                    // this.$parent.dialogVisible = false;//关闭弹框
                                    this.$message({
                                        message: '恭喜你，添加商品成功',
                                        type: 'success'
                                    });
                                    this.$parent.http(1)
                                    this.clearForm()
                                }
                            })
                        }else if(this.title === '编辑商品'){
                            console.log('正在修改商品')
                            this.$api.updateGoods({
                                title,price,num,category,image,sellPoint,descs,id
                            })
                            .then(res=>{
                                console.log('编辑成功',res.data)
                                if(res.data.status === 200){
                                    //成功
                                    // this.$parent.dialogVisible = false;//关闭弹框
                                    this.$message({
                                        message: '恭喜你，修改商品成功',
                                        type: 'success'
                                    });
                                    this.$parent.http(1)
                                    this.clearForm()
                                }
                            })
                        }

                    }else{
                        this.$message.error('添加商品失败');
                        return false
                    }
                })
            },
            clearForm(){
                this.close()
                // this.$refs.ruleForm.resetFields()
                this.goodsForm = {
                    title: '', //商品名称
                    price: '',//商品价格
                    num: '',//商品数量
                    sellPoint: '',//商品卖点
                    image: '',//商品图片
                    descs: '',//商品描述
                    category: '',//商品类目
                    date1:'', //发布时间
                    date2:'', //发布时间
                }
                this.$refs.myEditor.editor.txt.clear()
            }
        }
    }
</script>

<style lang="less" scoped>
    .myForm{
        padding: 20px;
        background: white;
    }
</style>