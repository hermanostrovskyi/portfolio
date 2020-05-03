import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from "firebase";
import Auth from "@/store/modules/auth";
import {getModule} from "vuex-module-decorators";
import VueFilterDateFormat from 'vue-filter-date-format';

// import Skill from "@/store/modules/skill";
// import {ISkill} from "@/interfaces/interfaces";
// const skillStore = getModule(Skill);

const authStore = getModule(Auth);
console.log('I am');
authStore.tryAutoLogin();


// const config = {
//     apiKey: process.env.VUE_APP_API_KEY,
//     authDomain: process.env.VUE_APP_FIREBASE_AUTH_URI,
//     databaseURL: process.env.VUE_APP_BASE_URI,
//     projectId: process.env.VUE_APP_PROJECT_ID,
//     storageBucket: process.env.VUE_APP_FIREBASE_STORAGE,
//     messagingSenderId: process.env.VUE_APP_SENDER_ID
// };
//
// firebase.initializeApp(config);

// skillStore.fetchSkills();

Vue.use(VueFilterDateFormat);
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
