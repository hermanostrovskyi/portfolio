import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Auth from "@/store/modules/auth";
import {getModule} from "vuex-module-decorators";
import VueFilterDateFormat from 'vue-filter-date-format';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faDribbble, faXing, faInstagram} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import AOS from 'aos';
import 'aos/dist/aos.css';


library.add(faDribbble, faXing, faInstagram);
Vue.component('font-awesome-icon', FontAwesomeIcon)

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
