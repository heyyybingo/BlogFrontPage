import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect: "/Home"
    },
    {
        path: "/Home",
        component: () => import("./Views/articleList.vue")
    },
    {
        path: "/Detail",
        component: () => import("./Views/artDetail.vue")
    },
    {
        path: "/loginReg",
        component: () => import("./Views/loginReg.vue")
    },
    {
        path: "/msBoard",
        component: () => import("./Views/msBoard.vue")
    },
    {
        path: "/userInfo",
        component: () => import("./Views/userInfo.vue")
    }
]
const router = new VueRouter({
    routes
})


export default router