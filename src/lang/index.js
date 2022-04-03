import Vue from 'vue'
import ElementLocale from 'element-ui/lib/locale'
import {Pagination} from 'element-ui'

import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)
Vue.use(Pagination)
import chinese from "./chinese";
import english from "./english";

// 准备翻译的语言环境信息
const messages = {
    en: {//英文
        /*home: {
            hello: 'hello world'
        },*/
        /*menu: {
            home: 'home',
            goods:'goods',
            params:'params',
            advice:'advice',
            order:'order'
        },*/
        ...english,
        ...enLocale
    },
    zh: {//中文
        /*menu:{
            home:"首页",
            goods:"商品管理",
            params:'规格参数',
            advice:'广告管理',
            order:'订单管理'
        },*/
        ...chinese,
        ...zhLocale
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})


ElementLocale.i18n((key, value) => i18n.t(key, value))

// 现在应用程序已经准备好了！

export default i18n