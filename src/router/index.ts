import Vue from 'vue';
import VueRouter, {Route, RouteConfig} from 'vue-router';
import Home from '../views/Home.vue';
import Auth from "@/store/modules/auth";
import {getModule} from "vuex-module-decorators";

const authStore = getModule(Auth);

Vue.use(VueRouter)

const isAuthenticated = (to: Route, from: Route, next: any) => {
    authStore.isAuthenticated ? next() : next('/login');
}

const routes: Array<RouteConfig> = [
    {path: '/', component: Home},
    {path: '/login', component: () => import('../views/Login.vue')},
    {path: '/admin', component: () => import('../views/Admin.vue'), beforeEnter: isAuthenticated},
    {path: '*', redirect: '/'},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
