<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="portfolioItem in portfolioItems" :key="portfolioItem.fbID">
                <v-card>
                    <v-card-title>{{portfolioItem.description}}</v-card-title>
                    <v-divider></v-divider>
                    <v-img height="300" :src="portfolioItem.url"></v-img>
                    <v-container fluid>
                        <p>Description: {{portfolioItem.description}}</p>
                    </v-container>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn fab small color="primary">
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
    import Vue from 'vue';
    import Component from "vue-class-component";
    import {IPortfolioItem} from "@/interfaces/interfaces";
    import Portfolio from "@/store/modules/portfolio";
    import {getModule} from "vuex-module-decorators";

    const portfolioStore = getModule(Portfolio);

    @Component
    export default class AdminPortfolio extends Vue {
        get portfolioItems(): IPortfolioItem[] {
            return portfolioStore.allPortfolioItems
        }

        onPortfolioDelete(portfolioItem: IPortfolioItem) {
            portfolioStore.deletePortfolioItemAction(portfolioItem);
        }

        created() {
            portfolioStore.fetchPortfolio();
        }
    }
</script>

<style scoped>

</style>
