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

<style lang="scss">
    @font-face {
        font-family: 'Myriad Pro';
        src: local('Myriad Pro'),
        url('../src/assets/fonts/miryad/MyriadProRegular.woff');
        font-weight: 100;
        font-style: normal;
    }

    @font-face {
        font-family: 'Myriad Pro Condensed';
        src: local('Myriad Pro Condensed'),
        url('../src/assets/fonts/miryad/MyriadProCond.woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Myriad Pro Bold';
        src: local('Myriad Pro Bold'),
        url('../src/assets/fonts/miryad/MyriadProBold.woff');
        font-weight: 900;
        font-style: normal;
    }
</style>

