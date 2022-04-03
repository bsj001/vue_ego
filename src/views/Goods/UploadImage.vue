<template>
    <el-upload
            class="upload-demo"
            ref="upload"
            :action="url"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="successUpload"
            :file-list="fileList"
            :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
</template>
<script>
    import base from '../../api/base'
    export default {
        name:'UploadImage',
        data() {
            return {
                url:base.upload,
                fileList:[]
            };
        },
        methods: {
            /**
             * 点击上传按钮  手动上传文件
             * */
            submitUpload() {
                this.$refs.upload.submit();
                // console.log('url',this.url)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            /**
             * 上传成功的函数
             * */
            successUpload(response,file,fileList){
                console.log('上传成功',response,file,fileList)
                this.$message({
                    message: '恭喜你，这是一条成功消息',
                    type: 'success'
                });
                let imgUrl = base.host + '/' + response.url.slice(14);
                // console.log('imgUrl',imgUrl)
                this.$emit('sendImg',imgUrl)
            }
        }
    }
</script>