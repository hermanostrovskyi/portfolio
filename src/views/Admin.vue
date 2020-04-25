<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="@/assets/avatar.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>@Stella</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-briefcase</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Work Experience</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-grid</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Portfolio</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-dumbbell</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Skills</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-certificate</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Certificates</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app dark color="primary">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Admin Panel</v-toolbar-title>
        </v-app-bar>

        <!--      <div class="d-flex align-center">-->
        <!--        <v-img-->
        <!--          alt="Vuetify Logo"-->
        <!--          class="shrink mr-2"-->
        <!--          contain-->
        <!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
        <!--          transition="scale-transition"-->
        <!--          width="40"-->
        <!--        />-->

        <!--        <v-img-->
        <!--          alt="Vuetify Name"-->
        <!--          class="shrink mt-1 hidden-sm-and-down"-->
        <!--          contain-->
        <!--          min-width="100"-->
        <!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"-->
        <!--          width="100"-->
        <!--        />-->
        <!--      </div>-->

        <!--      <v-spacer></v-spacer>-->

        <!--      <v-btn-->
        <!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
        <!--        target="_blank"-->
        <!--        text-->
        <!--      >-->
        <!--        <span class="mr-2">Latest Release</span>-->
        <!--        <v-icon>mdi-open-in-new</v-icon>-->
        <!--      </v-btn>-->
        <!--    </v-app-bar>-->

        <!--    <v-content>-->
        <!--      <HelloWorld/>-->
        <!--    </v-content>-->
    </v-app>
</template>

// TODO Create a single component for Admin
<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";
    import {IAdminMenuItem} from "@/interfaces/interfaces";

    @Component
    export default class Admin extends Vue {
        drawer: boolean = false;
        menuItems: IAdminMenuItem[] = [
            {title: 'Home', icon: 'dashboard'},
            {title: 'Work Experience', icon: 'mdi-briefcase'},
        ];
    }
</script>

