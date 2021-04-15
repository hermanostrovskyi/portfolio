<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="portfolioItem in portfolioItems" :key="portfolioItem.fbID">
                <v-card>
                    <v-card-title>{{portfolioItem.title}} - {{portfolioItem.prior}}</v-card-title>
                    <v-divider></v-divider>
                    <v-img height="300" :src="portfolioItem.url"></v-img>
                    <v-container fluid>
                        <p>Description: {{portfolioItem.description}}</p>
                    </v-container>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn fab small color="#d3d3d3" @click="onPortfolioEdit(portfolioItem)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-btn fab small color="error" @click="onPortfolioDelete(portfolioItem)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {IPortfolioItem} from "@/interfaces/interfaces";
    import Portfolio from "@/store/modules/portfolio";
    import {getModule} from "vuex-module-decorators";
    import AdminDialog from "@/store/modules/adminDialog";
    import Auth from "@/store/modules/auth";

    const portfolioStore = getModule(Portfolio);
    const adminDialogStore = getModule(AdminDialog);
    const authStore = getModule(Auth)

    @Component
    export default class AdminPortfolio extends Vue {
        get portfolioItems(): IPortfolioItem[] {
            return portfolioStore.allPortfolioItems
        }

        onPortfolioDelete(portfolioItem: IPortfolioItem) {
            adminDialogStore.setDialogOptions({
                componentName: 'DialogDeleteConfirmation',
                properties: {
                    mode: 'deleteConfirmation',
                    submit: authStore.isDemoUser ?
                        portfolioStore.deletePortfolioItemDemoAction :
                        portfolioStore.deletePortfolioItemAction,
                    data: portfolioItem
                }
            });
        }

        onPortfolioEdit(portfolioItem: IPortfolioItem) {
            adminDialogStore.setDialogOptions({
                componentName: 'DialogPortfolio',
                properties: {
                    mode: 'update',
                    populateWith: {...portfolioItem},
                    submit: authStore.isDemoUser ?
                        portfolioStore.updatePortfolioItemDemoAction :
                        portfolioStore.updatePortfolioItemAction
                }
            });
        }

        created() {
            if(!portfolioStore.allPortfolioItems.length) {
                portfolioStore.fetchPortfolio();
            }
        }
    }
</script>

<style scoped>

</style>
