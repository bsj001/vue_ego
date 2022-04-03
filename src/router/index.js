import Vue from 'vue'
import VueRouter from "vue-router";
import Layout from '../views/Layout/index'
import Login from '../views/Login/index'
import Home from '../views/Home/index'

//异步导入
const Goods = () =>import('../views/Goods/index')
const Params = ()=>import('../views/Params/index')
const Specifications = ()=>import('../views/Params/ParamsInfo/Specifications')
const Order = ()=>import('../views/Order/index')
const Advert = ()=>import('../views/Advert/index')
const User = ()=>import('../views/User/index')

const OrderList = ()=>import('../views/Order/OrderList/index')
const OrderBack = ()=>import('../views/Order/OrderBack/index')

//子级路由
const AddGoods = ()=>import('../views/Goods/AddGoods')

Vue.use(VueRouter)

const routes = [
    {
        path:'',
        component:Layout,
        //元信息
        meta:{
            isLogin:true
        },
        children:[
            {
                path:'/',
                name:'Home',
                component:Home
            },
            {
                path:'/goods',
                name:'Goods',
                component: Goods
            },
            {
                path:'/add-goods',
                name:'AddGoods',
                component: AddGoods
            },
            {
                path:'/params',
                name:'Params',
                component:Params,
                redirect: '/params/specifications',
                children: [
                    {
                        path:'specifications',
                        name:'Specifications',
                        component:Specifications
                    }
                ]
            },
            {
                path:'/order',
                name:'Order',
                component: Order,
                redirect:'/order/order-list',
                children:[
                    {
                        path:'order-list',
                        name:'OrderList',
                        component:OrderList
                    },
                    {
                        path:'order-back',
                        name:'OrderBack',
                        component:OrderBack
                    }
                ]
            },
            {
                path:'/advert',
                name:'Advert',
                component:Advert
            },
            {
                path:'/user',
                name:'User',
                component:User
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component: Login,

    }
]


const router = new VueRouter({
    routes
})



export default router