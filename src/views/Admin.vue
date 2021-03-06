<template>
    <v-container fluid>
        <v-navigation-drawer v-model="drawer" app>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img v-if='!isDemoUser' src='@/assets/avatar.jpg'></v-img>
                    <v-img v-else src='@/assets/dummyAvatar.png'></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{userName}}</v-list-item-title>
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
                        @click="onMenuClick(menuItem.title)"
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
        <v-app-bar app dark color="#000">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Admin Panel</v-toolbar-title>
        </v-app-bar>

        <v-card>
            <v-toolbar flat>
                <v-toolbar-title>{{currentItem}}</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn color="#ffc400" @click="onAddClick()">
                    <v-icon left>mdi-plus-circle-outline</v-icon>
                    Add new
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
    import {getModule} from "vuex-module-decorators";
    import {IAdminMenuItem, IDialogProps} from "@/interfaces/interfaces";

    import AdminSkills from '@/components/Admin/AdminSkills.vue';
    import DialogSkills from '@/components/Dialog/DialogSkills.vue';
    import DialogExperience from '@/components/Dialog/DialogExperience.vue';
    import DialogCertificates from '@/components/Dialog/DialogCertificates.vue';
    import DialogPortfolio from "@/components/Dialog/DialogPortfolio.vue";
    import DialogDeleteConfirmation from "@/components/Dialog/DialogDeleteConfirmation.vue";
    import AdminCertificates from '@/components/Admin/AdminCertificates.vue';
    import AdminPortfolio from '@/components/Admin/AdminPortfolio.vue';
    import AdminExperience from '@/components/Admin/AdminExperience.vue';

    import Auth from "@/store/modules/auth";
    import AdminDialog from "@/store/modules/adminDialog";
    import Skill from "@/store/modules/skill";
    import Experience from "@/store/modules/experience";
    import Certificate from "@/store/modules/certificate";
    import Portfolio from "@/store/modules/portfolio";

    const authStore = getModule(Auth);
    const adminDialogStore = getModule(AdminDialog);
    const skillStore = getModule(Skill);
    const experienceStore = getModule(Experience);
    const certificateStore = getModule(Certificate);
    const portfolioStore = getModule(Portfolio);

    @Component({
        components: {
            AdminSkills,
            AdminCertificates,
            AdminPortfolio,
            AdminExperience,
            DialogSkills,
            DialogExperience,
            DialogCertificates,
            DialogPortfolio,
            DialogDeleteConfirmation
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

        onMenuClick(title: string): void {
            this.currentItem = title;
        }

        onAddClick() {
            adminDialogStore.setDialogOptions({
                componentName: 'Dialog' + this.currentItem,
                properties: {
                    mode: 'create',
                    submit: this.addAction,
                }
            });
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

        get dialogProps(): IDialogProps {
            return adminDialogStore.dialogProps;
        }

        get isDemoUser(): boolean {
            return authStore.isDemoUser
        }

        get userName(): string {
            return this.isDemoUser ? '@Demouser' : '@Stella';
        }


        get addAction() {
            switch (this.currentItem) {
                case 'Skills':
                    return this.isDemoUser ?
                        skillStore.addSkillDemoAction :
                        skillStore.addSkillAction;
                case 'Experience':
                    return this.isDemoUser ?
                        experienceStore.addExperienceDemoAction :
                        experienceStore.addExperienceAction;
                case 'Certificates':
                    return this.isDemoUser ?
                        certificateStore.addCertificateDemoAction :
                        certificateStore.addCertificateAction;
                case 'Portfolio':
                    return this.isDemoUser ?
                        portfolioStore.addPortfolioItemDemoAction :
                        portfolioStore.addPortfolioItemAction;
                default:
                    return this.isDemoUser ?
                        skillStore.addSkillDemoAction :
                        skillStore.addSkillAction;
            }
        }
    }
</script>

<style scoped>
</style>

