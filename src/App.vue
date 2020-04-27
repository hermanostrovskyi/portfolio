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

    @Component
    export default class APP extends Vue {

    }
</script>

