/**
 * devServer.proxy
 * 解决跨域
 * */

module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:8989',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}