<template>
    <div>
        <el-dialog
                title="合同内容"
                :visible.sync="dialogVisible"
                width="70%"
                :before-close="close"
        >
            <el-button type="primary" @click="print">打印合同</el-button>
<!--            展示单面pdf-->
            <pdf ref="printPDF" src="./mysqlTest.pdf" :page="1"></pdf>
<!--            展示全部pdf-->
            <!--<pdf
                    v-for="i in numPages"
                    :key="i"
                    :src="src"
                    :page="i"
                    style="display: inline-block; width: 25%"
            ></pdf>-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import pdf from 'vue-pdf'
    let loadingTask = pdf.createLoadingTask('./mysqlTest.pdf');
    export default {
        name: "VuePdf",
        components:{pdf},
        data() {
            return {
                dialogVisible: false,
                src: loadingTask,
                numPages: undefined,
            };
        },
        methods: {
            /**
             * 打印合同
             * */
            print(){
                this.$refs.printPDF.print();
            },
            /**
             * 关闭弹框
             * */
            close(){
                this.dialogVisible = false
            }
        },
        mounted() {

            this.src.promise.then(pdf => {
                this.numPages = pdf.numPages;
            });
        }
    }
</script>

<style scoped>

</style>