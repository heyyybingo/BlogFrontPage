import Vue from "vue"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js' //引入路由
import app from "./App.vue"
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./lib/iconfont/icon1/iconfont.css"
import "./lib/iconfont/icon2/iconfont.css"


import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'; //封装成一个指令
import store from "./store/index"
Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})


Vue.use(ElementUI);

// axios
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = '/blog/api';

Vue.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 拦截器
Vue.axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('token')) {
            console.log("TAKE TOKEN", sessionStorage.getItem('token'))
            config.headers.Authorization = "Bearer " + sessionStorage.getItem('token');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    });

Vue.axios.interceptors.response.use(response => {

        return response
    },
    error => {

        if (error && error.response) {
            switch (error.response.status) {
                case 401:
                    console.log(error.response)
                    Vue.prototype.$notify({
                        title: '提示',
                        message: '登录验证过期',
                        offset: 100
                    });
                    store.dispatch("logout");
                    router.push('/loginReg');
                    break;
                case 500:
                    Vue.prototype.$notify({
                        title: '提示',
                        message: '服务端出错',
                        offset: 100
                    });

                    break;

            }
            console.log("拦截器", error)
            throw error;
        } else {
            Vue.prototype.$notify({
                title: '提示',
                message: '网络故障！',
                offset: 100
            });
        }
    }
)

const vm = new Vue({
    el: "#app",
    router,
    store,
    render: c => c(app)
})