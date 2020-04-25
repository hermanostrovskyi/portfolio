<template>
    <v-app>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

// TODO Create a single component for Admin
<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";

    @Component
    export default class APP extends Vue {
    }
</script>

