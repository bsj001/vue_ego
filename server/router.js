//
const express = require('express')

const router = express.Router()

//图片需要的模块
const fs = require('fs')
const multer = require('multer')
//导入模块 jsonwebtoken 密钥 安装 npm i jsonwebtoken
const jwt = require('jsonwebtoken')
//config.jwtSecert
const config = require('./secert')
//导入mockjs
const Mock  = require('mockjs')

//测试路由接口
/*router.get('/',(req,res)=>{
    res.send('hello')
})*/
/*router.get('/test',(req,res)=>{
    const sql = "select * from student"
    sqlFun(sql,null,data=>{
        if(data.length > 0){
            res.send({
                status: 200,
                data: data
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})*/
//导入数据库 sqlFun('sql',[],res=>{})
const sqlFun = require('./mysql')

/**
 * 商品列表：获取分布{total:'',arr:[{},{},{}],pagesize:8,}
 * 参数:page 页码
 * */

router.get('/projectList',(req,res)=>{
    const page = req.query.page || 1;
    const sqlLen = 'select * from goods where id';
    sqlFun(sqlLen,null,data => {
        let len = data.length;
        const sql = "select * from goods order by id desc limit 8 offset " + (page-1)*8;
        sqlFun(sql,null,result=>{
            if(result.length > 0){
                res.send({
                    status:200,
                    data:result,
                    pageSize:8,
                    total:len
                })
            }else{
                res.send({
                    status:500,
                    msg:'暂无数据'
                })
            }
        })
    })
})

/**
 * 商品查询
 * search
 * */
router.get('/search',(req,res)=>{
    let search = req.query.search;
    const sql = "select * from goods where concat(`title`,`price`,`category`,`image`,`sellPoint`,`descs`) like '%"+ search +"%'"
    console.log('sql:',sql)
    sqlFun(sql,null,(result)=>{
        if(result.length >0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})

/**
 * 商品删除接口 id
 *
 * */

router.get('/backend/item/deleteItemById',(req,res)=>{
    let id = req.query.id;
    const sql = "delete from goods where id = ?"
    const arr = [id];
    sqlFun(sql,arr,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:'删除成功'
            })
        }else{
            res.send({
                status:500,
                msg:"删除成功"
            })
        }
    })
})

/**
 * 类目选择
 *
 * */
router.get('/backend/itemCategory/selectItemCategoryByParentId',(req,res)=>{
    let id = req.query.id || 1;
    const sql = "select * from category where myId = ?";
    let arr = [id]
    sqlFun(sql,arr,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})

/**
 * 类目数据结构获取
 * */
router.get('/category/data',(req,res)=>{
    let cid = req.query.cid;
    let sql = "select * from params where itemCatId = ?";
    sqlFun(sql,[cid],result=>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})
/**
 * 上传图片
 * 说明：
 * 1，后台安装 multer 模块，同时引入fs模块
 * 2.router.js入口文件导入模块
 *  const fs = require('fs')
 *  const multer = require('multer')
 *3.上传图片 不能跨域，需要配置cors index.js导入文件
 * */
let  storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./server/upload')
    },
    filename:function (req,file,cb) {
        cb(null,Date.now()+'-'+file.originalname)

    }
})
let createFolder = function(folder){
    try{
        fs.accessSync(folder)
    }catch(e){
        fs.mkdirSync(folder)
    }
}
let uploadFolder = './upload/'
createFolder(uploadFolder);
let upload = multer({
    storage:storage
})
router.post('/upload',upload.single('file'),(req,res)=>{
    const file = req.file;
    console.log('文件类型:%s',file.mimeType)
    console.log('原始文件名:%s',file.originalname)
    console.log('文件大小:%s',file.size)
    console.log('文件保存路径:%s',file.path)
    res.json({
        res_code:'0',
        name:file.originalname,
        url:file.path
    })
})

/**
 * 添加商品
 * */
router.get('/backend/item/insertTbItem',(req,res)=>{
    let title = req.query.title || ''
    let category = req.query.category || ''
    let sellPoint = req.query.sellPoint || ''
    let num = req.query.num || ''
    let descs = req.query.descs || ''
    let price = req.query.price || ''
    let image = req.query.image || ''

    const sql = "insert into goods values (null,?,?,?,?,?,?,?)"
    let arr = [title,price,num,category,image,sellPoint,descs]
    sqlFun(sql,arr,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:"添加成功"
            })
        }else{
            res.send({
                status:500,
                msg:'添加失败'
            })
        }
    })
})

/**
 * 批量删除商品
 * */
router.get('batchDelete',(req,res)=>{
    let arr = req.query.idArr;
    let sql = ''
    function fun(arr) {
        sql = `delete from project where id in (`
        for(let i=0;i<arr.length;i++){
            sql+=arr[i]+','
        }
        sql = sql.slice(0,-1)
        sql = sql+')'
    }
    fun(arr)
    sqlFun(sql,null,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'删除成功'
            })
        }else{
            res.send({
                status:500,
                msg:'删除失败'
            })
        }
    })
})

/**
 * 修改商品
 * */

router.get('/backend/item/updateTbItem',(req,res)=>{
    let id = req.query.id;
    let title = req.query.title || ''
    let sellPoint = req.query.sellPoint || ''
    let price = req.query.price || ''
    let category = req.query.category || ''
    let num = req.query.num || ''
    let descs = req.query.desc || ''
    let image = req.query.image || ''

    let sql = "update goods set title=?,price=?,num=?,category=?,image=?,sellPoint=?,descs=? where id=?"
    let arr = [title,price,num,category,image,sellPoint,descs,id]
    sqlFun(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'修改成功'
            })
        }else{
            res.send({
                status:500,
                msg:'修改失败'
            })
        }
    })
})

/**
 * 注册接口
 * */

router.post('/register',(req,res)=>{
    const {
        username,
        password
    } = req.body;
    const sql = "insert into userInfo values(null,?,?)";
    const arr = [username,password]
    sqlFun(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'注册成功'
            })
        }else{
            res.send({
                status:500,
                msg:"用户名密码错误"
            })
        }
    })
})

/**
 * 登录接口
 * */
router.post('/login',(req,res)=>{
    let {
        username,
        password
    } = req.body
    //请求数据库
    let sql = 'select * from userInfo where username = ? and password = ?'
    let arr = [username,password]
    sqlFun(sql,arr,result=>{
        if(result.length > 0){
            let token = jwt.sign({
                username:result[0].username,
                id:result[0].id
            },config.jwtSecert,{
                expiresIn: 20 * 1
            })
            res.send({
                status:200,
                data:token
            })
        }else{
            res.send({
                status:404,
                msg:'信息错误'
            })
        }
    })
})

/**
 * 测试mock.js数据
 * */
router.get('/testMock',(req,res)=>{
    //使用mock生成数据
    let data = Mock.mock({
        info:'我是一个对象',
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }],
        "string|1-10": "★"
    })

    res.send(data)
})

/**
 * 统计数据 --销售信息
 * */
router.get('/statistical',(req,res)=>{
    res.send({
        success:true,
        status:200,
        "list|4":[
            {
                "id|+1":100,
                "title|+1":['总销售总额','访问量','支付总量','收藏量'],
                "current|0-2000":100,
                "total|100-999999":200
            }
        ]
    })
})

/***
 *统计 半年 月销量对比数据
 * 月度销售额
 * */
router.get('/sellTotal',(req,res)=>{
    res.send({
        success:true,
        status:200,
        info:{
            'id|+1':100,
            data:function () {
                let category = [];
                let dottedBase = +new Date();
                for(let i=30;i>0;i--){
                    let date = new Date((dottedBase -= 1000 * 3600 * 24 * 30))
                    category.push([date.getFullYear(),date.getMonth()+1].join())
                }
                return category.slice(0,6)
            },
            "xResult|3":[
                {
                    'xName|+1':['家具','手机','家电',],
                    'data|6':[
                        {'num|100-1000':10}
                    ]
                }
            ]
        }
    })
})

/***
 * 规格参数列表 参数 page
 * */
router.get('/backend/itemParam/selectItemParamsAll',(req,res)=>{
    const page = req.query.page || 1;
    const sqlLen = "select * from params where id";
    sqlFun(sqlLen,null,data =>{
        let len = data.length;
        const sql = "select * from params order by id desc limit 8 offset " + (page - 1) * 8;
        sqlFun(sql,null,result=>{
            if(result.length > 0){
                res.send({
                    status:200,
                    data:result,
                    pageSize:8,
                    total:len
                })
            }else{
                res.send({
                    status:500,
                    msg:'暂无数据'
                })
            }
        })
    })

    /**
     * 规格参数  模糊查询  参数：search
     * */
    router.get('/params/search',(req,res)=>{
        let search = req.query.search;
        const sql = "select * from params where concat(`paramData`) like '%"+ search + "%'";
        sqlFun(sql,[search],result=>{
            if(result.length > 0){
                res.send({
                    status:200,
                    result
                })
            }else{
                res.send({
                    status:500,
                    msg:"暂无数据"
                })
            }
        })
    })
})

/***
 * 规格参数 添加
 * 参数：itemCatId,content,specsName
 * */
router.get('/backend/itemParam/insertItemParam',(req,res)=>{
    let paramData = req.query.paramData;
    let itemCatId = req.query.itemCatId;
    let specsName = req.query.specsName;
    let sql = "insert into params (id,itemCatId,paramData,specsName) values(null,?,?,?)"
    let arr = [itemCatId,paramData,specsName]
    sqlFun(sql,arr,result=>{
        console.log(paramData,itemCatId,specsName)
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"添加成功"
            })
        }else{
            res.send({
                status:500,
                msg:"添加失败"
            })
        }
    })

})


/**
 * 修改规格参数 cid content id specsName
 * */
router.get('/update/category',(req,res)=>{
    let cid = req.query.cid;
    let content = req.query.content;
    let id = req.query.id;
    let specsName = req.query.specsNmae;
    let sql = 'update params set paramsData=?,specsName=?,where myId=?'
    sqlFun(sql,[content,cid,specsName,id],result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:"修改成功"
            })
        }else{
            res.send({
                status:500,
                msg:"修改失败"
            })
        }
    })
})


/***
 * 规格参数删除
 *
 * */
router.get('/params/delete',(req,res)=>{
    let id = req.query.id;
    const sql = "delete from params where id = ?"
    const arr = [id];
    sqlFun(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"删除成功"
            })
        }else{
            res.send({
                status:500,
                msg:"删除失败"
            })
        }
    })
})

/**
 * 内容分类管理 导航
 * */
router.get('/content/selectContentCategoryByParentId',(req,res)=>{
    const id = req.query.id || id;
    const sql = "select * from content where id = ?"
    sqlFun(sql,[id],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
})

module.exports = router