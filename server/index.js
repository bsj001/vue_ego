//搭建express服务
const express = require('express')
const app = express()
const debug = require('debug')('my-application'); //debug模块

// app.all("*",function (req,res,next) {
//     res.send('fdssc')
// })
app.set('port',process.env.PORT || 8989); //设定监听端口
//路由
const router = require('./router')
//post 请求表单数据
app.use(express.urlencoded({extended:true}))
//静态文件托管
app.use(express.static(__dirname+'/upload'))

app.use('/api',router)

// app.listen(8989,()=>{
const server = app.listen(app.get('port'),()=>{
    // console.log(8989)
    // console.log(__filename)
    // console.log(__dirname)
    debug('Express server listening on port ' + server.address().port);
})