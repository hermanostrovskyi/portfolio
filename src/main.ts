import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Auth from "@/store/modules/auth";
import {getModule} from "vuex-module-decorators";
import VueFilterDateFormat from 'vue-filter-date-format';

const authStore = getModule(Auth);
authStore.tryAutoLogin();

Vue.use(VueFilterDateFormat);
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
