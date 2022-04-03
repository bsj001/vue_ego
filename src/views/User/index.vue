<template>
    <div>
        <h2>个人中心</h2>
        <el-button type="primary" @click="showDialog">查看合同</el-button>
        <VuePdf ref='myPdf'></VuePdf>
<!--        查看发票-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button
                        style="float: right; padding: 3px 0"
                        type="text"
                        @click="download"
                >下载图片</el-button>
            </div>
            <div class="text item">-->
                <img ref="img" style="width:200px" :src="imgUrl" alt="">
            </div>
        </el-card>

<!--            第二种下载图片方式-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button
                        style="float: right; padding: 3px 0"
                        type="text"
                        @click="down"
                >下载本地图片</el-button>
            </div>
            <div class="text item">-->
                <img ref="img" style="width:200px" :src="imgUrl" alt="">
            </div>
        </el-card>

        <!-- 第三种下载图片方式-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button
                        style="float: right; padding: 3px 0"
                        type="text"
                        @click="downs"
                >下载不同源图片</el-button>
            </div>
            <div class="text item">-->
                <img
                        ref="myImg"
                        style="width:200px"
                        src="../../assets/images/2.jpg"
                        alt=""
                >
            </div>
        </el-card>

<!--        导出表格-->
        <div class="table">
            <div class="header">
                <div class="title">用户信息</div>
                <el-button type="primary" @click="exportData" size="small">导出表格</el-button>
            </div>
            <el-table border :data="tableData" style="width:100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import VuePdf from './VuePdf'
    import img from '../../../public/1.jpg'
    import {export2Excel} from '../../common/js/util'
    export default {
        name: "index",
        components:{VuePdf},
        data(){
          return {
              imgUrl:img,
              columns:[
                  {title:'日期',key:'date'},
                  {title:'姓名',key:'name'},
                  {title:'地址',key:'address'}
              ],
              tableData:[
                  {
                      date:'2016-05-02',
                      name:'王小虎',
                      address:"江苏省苏州市工业园区虎丘镇110号"
                  },
                  {
                      date:'2013-02-12',
                      name:'张三',
                      address:"江苏省苏州市工业园区虎丘镇111号"
                  },
                  {
                      date:'2023-11-23',
                      name:'李风',
                      address:"江苏省苏州市工业园区虎丘镇112号"
                  }
              ]
          }
        },
        methods:{
            showDialog(){
                this.$refs.myPdf.dialogVisible = true
            },
            /***
             * 下载图片：方式一：打开图片网址，右键 另存为
             * */
            download(){
                //1,新窗口打开
                let url = this.$refs.img;
                console.log(url.src)
                window.location.href=url.src
            },
            /***
             * 下载图片：方式二：必须同源才能下载
             * */
            down(){
                let alink = document.createElement("a")
                alink.href = this.imgUrl
                console.log(this.imgUrl)
                alink.download = "pic" //图片名
                alink.click()
            },
            /**
             * 解决图片不同源问题
             * */
            downloadImage(imgsrc,name){
                //下载图片地址和图片名
                let image = new Image();
                //解决跨域Canvas污染问题
                image.setAttribute('crossOrigin','anonymous');
                image.onload = function () {
                    let canvas = document.createElement('canvas')
                    canvas.width = image.width;
                    canvas.height = image.height;
                    let context = canvas.getContext('2d');
                    context.drawImage(image,0,0,image.width,image.height);
                    let url = canvas.toDataURL("image/png");//得到图片的base64编码图片
                    let a = document.createElement("a");//创建一个a元素
                    let event = new MouseEvent("click");//创建一个单击事件
                    a.download = name || "photo";//设置图片名称
                    a.href = url;//将生成的URL设置为a.href属性
                    a.dispatchEvent(event);//触发a的单击事件
                }
                image.src = imgsrc
            },
            /***
             * 下载图片：方式三：非同源才能下载
             * */
            downs(){
                console.log(this.$refs.myImg.src)
                this.downloadImage(this.$refs.myImg.src,"pic");
            },
            /**
             * 导出表格
             * */
            exportData(){
                // export2Excel('表头','需要导出的数据')
                // export2Excel(this.columns,this.tableData)
                export2Excel()
            }

        }
    }
</script>

<style lang="less" scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 300px;
    }
    .table{
        margin:10px;
        .header{
            display:flex;
            margin: 10px auto;
        }
        button{
            margin-left:50px;
        }
    }


</style>