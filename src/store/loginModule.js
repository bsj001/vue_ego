export default {
    namespaced:true,
    state:{
        userInfo:{
            user:'',
            token:''
        }
    },
    mutations:{
        SETUSER(state,payload){
            state.userInfo = payload
        },
        CLEAR(state){
            state.userInfo = {
                user:'',
                token:''
            }
        }
    },
    actions:{},
    getters:{},
}