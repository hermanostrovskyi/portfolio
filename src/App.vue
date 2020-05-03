<template>
    <v-app>
        <router-link to="/admin">Go to Foo</router-link>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>


<script lang="ts">
    import firebase from "firebase";

    const config = {
        apiKey: process.env.VUE_APP_API_KEY,
        authDomain: process.env.VUE_APP_FIREBASE_AUTH_URI,
        databaseURL: process.env.VUE_APP_BASE_URI,
        projectId: process.env.VUE_APP_PROJECT_ID,
        storageBucket: process.env.VUE_APP_FIREBASE_STORAGE,
        messagingSenderId: process.env.VUE_APP_SENDER_ID
    };

    firebase.initializeApp(config);
    import {Component, Vue} from 'vue-property-decorator'

    @Component
    export default class APP extends Vue {

    }
</script>


