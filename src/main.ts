import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from "firebase";
import Auth from "@/store/modules/auth";
import {getModule} from "vuex-module-decorators";
import VueFilterDateFormat from 'vue-filter-date-format';

const authStore = getModule(Auth);
authStore.tryAutoLogin();


let config = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_URI,
    databaseURL: process.env.VUE_APP_AUTH_URI,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE,
    messagingSenderId: process.env.VUE_APP_SENDER_ID
};

firebase.initializeApp(config);

Vue.use(VueFilterDateFormat);
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
