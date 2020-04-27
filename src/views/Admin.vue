<template>
    <v-container fluid>
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
                <v-list-item link to="/">
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                        v-for="menuItem in menuItems"
                        :key="menuItem.title"
                        @click="currentItem = menuItem.title"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>{{ menuItem.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item @click="logout">
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

        <v-card>
            <v-toolbar>
                <v-toolbar-title>Edit toolbar</v-toolbar-title>
            </v-toolbar>
            <keep-alive>
                <component :is="componentName"></component>
            </keep-alive>
        </v-card>



    </v-container>

</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";
    import {IAdminMenuItem} from "@/interfaces/interfaces";
    import AdminSkills from '@/components/AdminSkills.vue';
    import AdminCertificates from '@/components/AdminCertificates.vue';
    import AdminPortfolio from '@/components/AdminPortfolio.vue';
    import AdminWorkExperience from '@/components/AdminWorkExperience.vue';
    import {namespace} from "vuex-class";
    const auth = namespace('Auth');


    @Component({
        components: {
            AdminSkills,
            AdminCertificates,
            AdminPortfolio,
            AdminWorkExperience
        }
    })
    export default class Admin extends Vue {
        drawer: boolean = true;
        currentItem: string = 'Skills';
        menuItems: IAdminMenuItem[] = [
            {title: 'Work Experience', icon: 'mdi-briefcase'},
            {title: 'Portfolio', icon: 'mdi-grid'},
            {title: 'Skills', icon: 'mdi-dumbbell'},
            {title: 'Certificates', icon: 'mdi-certificate'},
        ];

        @auth.Action
        public logout!: () => void;

        get componentName(): string {
            const itemName = this.currentItem.replace(/\s/g, '');
            return `Admin${itemName}`;
        }
    }
</script>

