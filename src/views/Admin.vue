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
            <v-toolbar flat>
                <v-toolbar-title>{{currentItem}}</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn color="success" @click="onAddClick()">
                    <v-icon left>mdi-plus-circle-outline</v-icon>
                    New
                </v-btn>

                <v-btn color="primary" class="save-btn">
                    <v-icon left>mdi-content-save</v-icon>
                    Save all
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>

            <keep-alive>
                <component :is="componentName"></component>
            </keep-alive>
        </v-card>
        <v-dialog v-model="dialogVisible" persistent max-width="600px">
            <component :is="dialogComponentName" :dialogProps="dialogProps"></component>
        </v-dialog>
    </v-container>


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {IAdminMenuItem} from "@/interfaces/interfaces";
    import AdminSkills from '@/components/AdminSkills.vue';
    import DialogSkills from '@/components/Dialog/DialogSkills.vue';
    import DialogExperience from '@/components/Dialog/DialogExperience.vue';
    import AdminCertificates from '@/components/AdminCertificates.vue';
    import AdminPortfolio from '@/components/AdminPortfolio.vue';
    import AdminExperience from '@/components/AdminExperience.vue';
    import {getModule} from "vuex-module-decorators";
    import Auth from "@/store/modules/auth";
    import AdminDialog from "@/store/modules/adminDialog";

    const authStore = getModule(Auth);
    const adminDialogStore = getModule(AdminDialog);

    @Component({
        components: {
            AdminSkills,
            AdminCertificates,
            AdminPortfolio,
            AdminExperience,
            DialogSkills,
            DialogExperience
        }
    })
    export default class Admin extends Vue {
        drawer: boolean = true;
        currentItem: string = 'Skills';

        menuItems: IAdminMenuItem[] = [
            {title: 'Experience', icon: 'mdi-briefcase'},
            {title: 'Portfolio', icon: 'mdi-grid'},
            {title: 'Skills', icon: 'mdi-dumbbell'},
            {title: 'Certificates', icon: 'mdi-certificate'},
        ];

        public logout(): void {
            authStore.logout();
        }

        onAddClick() {
            adminDialogStore.showAdminDialog();
            adminDialogStore.setDialogComponentAction('Dialog' + this.currentItem);
            adminDialogStore.setDialogPropertiesAction({mode: 'create'})
        }

        get dialogVisible(): boolean {
            return adminDialogStore.dialogVisibility;
        }

        get componentName(): string {
            return `Admin${this.currentItem}`;
        }

        get dialogComponentName(): string {
            return adminDialogStore.contentComponent;
        }

        get dialogProps(): string {
            return adminDialogStore.dialogProps;
        }


    }
</script>

<style scoped>
    .save-btn {
        margin-left: 12px;
    }
</style>

