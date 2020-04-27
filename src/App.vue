<template>
    <v-app>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

// TODO Create a single component for Admin
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {namespace} from "vuex-class";


    @Component
    export default class APP extends Vue {


        created() {
            this.$store.dispatch('Auth/tryAutoLogin');
        }
    }
</script>

