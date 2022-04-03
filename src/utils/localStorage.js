import store from "../store";

/**
 * 本地持久化
 * */

let user = localStorage.getItem('user')
if(user){
    user = JSON.parse(user)
    store.commit('loginModule/SETUSER',user)
}
