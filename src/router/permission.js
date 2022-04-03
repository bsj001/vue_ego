import store from "../store";
import router from "./index";

/**
 * 路由拦截
 * */
router.beforeEach((to,from,next)=>{
    // console.log(to,from)
    //1，判断用户是否需要登录
    if(to.matched.some(ele=>ele.meta.isLogin)){
        //判断用户是否已经登录
        let token = store.state.loginModule.userInfo.token
        if(token){
            next()
        }else{
            next('/login')
        }
    }else{//用户不需要登录，直接放行
        next()
    }
})