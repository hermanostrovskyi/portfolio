import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Auth from "@/store/modules/auth";
import {getModule} from "vuex-module-decorators";
import VueFilterDateFormat from 'vue-filter-date-format';
import AOS from 'aos';
import 'aos/dist/aos.css';

// import Skill from "@/store/modules/skill";
// import {ISkill} from "@/interfaces/interfaces";
// const skillStore = getModule(Skill);

const authStore = getModule(Auth);
authStore.tryAutoLogin();




// skillStore.fetchSkills();

Vue.use(VueFilterDateFormat);
new Vue({
    created() {
        AOS.init();
    },
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
