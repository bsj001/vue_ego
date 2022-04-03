/**
 * 接口路径配置
 * 一般文件目录：base.js index.js
 * 但是公司不一定
 *      config
 *          login index.js config.js
 *      index.js
 *      xxx.js
 * */

const base = {
    host:'http://localhost:8989',//host地址
    goodsList:'/api/api/projectList',//商品列表
    search:'/api/api/search',//搜索商品列表
    selectCategory:'/api/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    upload:'/api/api/upload',//上传图片 post 请求
    addGoods:'/api/api/backend/item/insertTbItem',//添加商品
    deleteGoods:'/api/api/backend/item/deleteItemById',//删除商品
    updateGoods:'/api/api/backend/item/updateTbItem',//修改商品
    login:'/api/api/login',//登录接口
    params:"/api/api/backend/itemParam/selectItemParamsAll",//规格参数获取
    insertItemParam:'/api/api//backend/itemParam/insertItemParam',//插入规格参数
}


export default base;