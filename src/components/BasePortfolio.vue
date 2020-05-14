<template>
    <section id="portfolioSection" class="portfolio">
        <h2 class="portfolio__header">Portfolio</h2>
        <div class="portfolio__list">
            <div
                    class="portfolio__list-item-container"
                    v-for="(item, index) in allPortfolioItems"
                    :key="item.fbID"
                    :class="`portfolio__list-item-container--${index}`">
                <img class="portfolio__list-item-image"
                     :src="item.url"
                     alt="">
                <div class="portfolio__list-item-info">
                    <div class="portfolio__list-item-info-container">
                        <h3 class="portfolio__list-item-info-title">{{item.title}}</h3>
                        <p class="portfolio__list-item-info-description">{{item.description}}</p>
                    </div>


                    <button @click="showImage(item)" class="portfolio__btn portfolio__list-item-info-btn">Project
                        ansehen
                    </button>
                </div>
            </div>
        </div>
        <button class="portfolio__btn">Alle anzeigen</button>

        <v-dialog v-if="dialogPortfolioItem"
                @click:outside="dialog = false"
                v-model="dialog"
                max-width="800"
        >
            <v-card>
                <v-card-title class="headline">{{dialogPortfolioItem.title}}</v-card-title>
                <v-img
                        class="white--text align-end"
                        :src="dialogPortfolioItem.url"
                >
                </v-img>

                <v-card-actions>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {getModule} from "vuex-module-decorators";
    import Portfolio from "../store/modules/portfolio";
    import {IPortfolioItem} from "@/interfaces/interfaces";

    const portfolioStore = getModule(Portfolio);

    @Component
    export default class BasePortfolio extends Vue {

        dialog: boolean = false;
        dialogPortfolioItem: IPortfolioItem = null;

        get allPortfolioItems(): IPortfolioItem[] {
            return portfolioStore.allPortfolioItems;
        }

        showImage(portfolioItem: IPortfolioItem) {
            this.dialog = true;
            this.dialogPortfolioItem = portfolioItem;
        }

    }
</script>

<style scoped lang="scss">
    .portfolio {
        padding: 30px 5.8333%;
        margin-top: 50px;
        font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;

        &__header {
            color: #ffc400;
            font-size: 48px;
            margin-bottom: 40px;
        }

        &__list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            grid-gap: 40px;
            margin-bottom: 50px;

            &-item-container {
                cursor: pointer;
                position: relative;
                height: 400px;
                z-index: 1;
                box-shadow: 0 3px 10px -2px rgba(0, 0, 0, .6), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12) !important;

                &:hover .portfolio__list-item-info {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    justify-items: stretch;
                    align-items: end;
                    animation: slit-in-horizontal 0.3s ease-out forwards;
                }
            }

            &-item-image {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                object-fit: cover;
                height: 100%;
                width: 100%;
            }

            &-item-info {
                color: white;
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                display: none;
                z-index: 2;
                padding: 20px;

                &-container {

                }

                &-title {
                    margin: 0;
                    font-size: 30px;
                    color: #ffc400;
                    text-transform: uppercase;
                }

                &-description {
                    margin: 0;
                    color: #ffc400;
                    font-size: 18px;
                }

            }
        }

        &__btn {
            background-color: #ffc400;
            border-radius: 20px;
            padding: 10px 30px;
            outline: none;
            color: black;
            margin: 0 auto;
            display: block;
        }

    }

    @media (min-width: 1200px) {
        .portfolio__list-item-container--2 {
            grid-column: 3;
            grid-row: 1/3;
            height: 100%;
        }
        .portfolio__list-item-container--4 {
            grid-column: 1/3;
            grid-row: 2;
        }
    }

    @keyframes slit-in-horizontal {
        0% {
            -webkit-transform: translateZ(-800px) rotateX(90deg);
            transform: translateZ(-800px) rotateX(90deg);
            opacity: 0;
        }
        54% {
            -webkit-transform: translateZ(-160px) rotateX(87deg);
            transform: translateZ(-160px) rotateX(87deg);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateZ(0) rotateX(0);
            transform: translateZ(0) rotateX(0);
        }
    }






</style>
