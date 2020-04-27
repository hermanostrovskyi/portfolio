import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '../views/Home.vue';
import store from "@/store/index";
import Admin from "@/views/Admin.vue";


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {path: '/', component: Home},
    {path: '/login', component: () => import('../views/Login.vue')},
    {
        path: '/admin',
        component: Admin,
        beforeEnter(to, from, next) {
            if (store.getters['Auth/isAuthenticated']) {
                console.log('yep')
                next();
            } else {
                console.log('nope')
                next('/login')
            }
        },
    },
    {path: '*', redirect: '/'},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
