# vue_ego

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


###项目搭建
1.vue create vue_ego
2.vue-router vuex
3.axios

###项目初始化
1.删除无用的组件 home.vue about.vue ...
2.css初始化
3.incofont图标导入
4.vue add Element


###后台服务
node.js服务
express  安装:npm i express -S
jwt(生成token) jsonwebtoken 解析： jwt-decode
mysql
mockjs --模拟数据
    安装：npm i mockjs -S
    引入：
        node.js ：const Mock = require('mockjs')  在express的server服务中使用时
        前端js: import Mock from 'mockjs'
    语法：
        Mock.mock()
        
        
        



npm i 不加-S  会在package.json 中使用 dependencies
npm i 加-S  会在package.json 中使用 devDependencies
    dependencies：你用了什麼套件
    devDependencies：你只有在開發或測試的時候需要的套件 
###路由配置
1.页面布局配置  同级登录界面
2.


###后台管理系统 
    前端开发内容：
        PC端(比如：京东) 移动端（手机预览的网页）  小程序  后台管理界面
    后台开发：
        服务器：后台语言： java php python 大数据 人工智能
    架构师：----技术总监
    前端端分离：
        用户---> 前端-视图-数据--->后台--提供接口--->数据库
        
###技术点
    Vue + Vue-router + Vuex + Element-ui + Axios +Echarts + 其它三言方库
    
###富文本编辑
    1，百度编辑器
    2，wangEditor
    
    wangEditor使用步骤
        1，官网网址:https://www.wangeditor.com/doc
        2,基本使用
            1，安装 npm i wangeditor --save
            2,引入模块
                import E from 'wangeditor'
            3,使用wangeditor
                const editor = new E('#div1')
                editor.create()
                
                
###国际化
    vue i18n:https://kazupon.github.io/vue-i18n/zh/
    安装：npm install vue-i18n
    main.js导入或单独文件导入
    import Vue from 'vue'
    import VueI18n from 'vue-i18n'
    Vue.use(VueI18n)
    
    
### 登录-拦截

    beforEnter()全局守卫
    
    
### echarts
    1,安装 npm i echarts -S
    2,使用方式
        1,导入echarts在组件内使用
        2,导入全局 挂载原型上 全局使用
        3,开发在vue插件




### express + nodemon 实现修改后自动刷新
        添加nodemon模块
        根目录添加文件 nodemon.json
            {
                "restartable": "rs",
                "ignore": [
                    ".git",
                    ".svn",
                    "node_modules/**/node_modules"
                ],
                "verbose": true,
                "execMap": {
                    "js": "node --harmony"
                },
                "watch": [
             
                ],
                "env": {
                    "NODE_ENV": "development"
                },
                "ext": "js json njk css js "
            }
            
        index.js内容
            const express = require("express"),
              app = express(),
              debug = require('debug')('my-application'); // debug模块
             
            app.all("*", function (req, res, next){
                res.send('fdssc')
            })
             
            app.set('port', process.env.PORT || 9000); // 设定监听端口
            const server = app.listen(app.get('port'), function () {//启动监听
              debug('Express server listening on port ' + server.address().port);
            });
            
        package.json添加
            "scripts": {
                "dev":"nodemon entrance.js"
            }
        
        执行启动 cnpm run dev
        
        
###vue-PDF
    github:https://github.com/FranckFreiburger/vue-pdf
    
    vue-pdf网址：https://github.com/FranckFreiburger/vue-pdf/pull/130/commits/253f6186ff0676abf9277786087dda8d95dd8ea7
    
    使用步骤：
        1,npm i vue-pdf -S
        2,import pdf from 'vue-pdf'
        3,components:{
            pdf
        }
        4,<pdf src='./static/relativity.pdf'></pdf>
        
    问题：
        pdf打印的时候，看到视图 乱码的中文
        修改：按照https://github.com/FranckFreiburger/vue-pdf/pull/130/commits/253f6186ff0676abf9277786087dda8d95dd8ea7
            修改nodo_module 下 vue-pdf 下src 下pdfjsWrapper.js文件
            
            
### VUE项目实现表格导出EXCEL表格
    1,安装 -- 使用npm安装 
        npm i file-saver xlsx -S
        npm i script-loader -D
    2,在/src目录下新建一个excel（名字也可自取）文件夹，存入Blob.js和Export2Excel.js文件
    3,在common文件夹里新建js文件夹再新建util.js
        export function export2Excel(columns,list){
            require.ensure([],() => {
                const { export_json_to_excel } = require('../../excel/Export2Excel');
                let tHeader = []
                let filterVal = []
                console.log(columns)
                if (!columns){
                    return;
                }
                columns.forEach(item=>{
                    tHeader.push(item.title)
                    filterVal.push(item.key)
                })
                const data = list.map(v=>filterVal.map(j=>v[j]))
                export_json_to_excel(tHeader,data,'数据列表');
            })
        }