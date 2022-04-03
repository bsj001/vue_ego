/**
 * 请求的方法
 * */
import axios from 'axios'
import base from './base'
//node>js
const qs = require('querystring')



const api = {
    /**
     * 商品列表
     * {page:xxx}
     * */
    getGoodsList(params){
        return axios.get(base.goodsList,{params})
    },
    /**
     * 搜索商品数据
     * search
     * {search:xxx}
     * */
    getSearch(params){
        return axios.get(base.search,{params})
    },
    /**
     * 类目选择
     * {id:cid}
     * */
    getSelectCategory(params){
        return axios.get(base.selectCategory,{params})
    },
    /**
     * 添加商品
     * params:{}
     * */
    addGoods(params){
        return axios.get(base.addGoods,{params})
    },
    /**
     * 删除商品
     * id:''
     * */
    deleteGoods(params){
        return axios.get(base.deleteGoods,{params})
    },
    /**
     * 修改商品
     * */
    updateGoods(params){
        return axios.get(base.updateGoods,{params})
    },
    /**
     * 登录
     * params:{username:'',password:''}
     * */
    login(params){
        return axios.post(base.login,qs.stringify(params))
    },
    /**
     * 规格参数获取列表
     * */
    getParams(params){
        return axios.get(base.params,{params})
    },
    /**
     * 插入规格参数
     * */
    insertItemParam(params){
        return axios.get(base.insertItemParam,{params})
    },
}

export default api