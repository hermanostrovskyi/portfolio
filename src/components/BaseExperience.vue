<template>
    <section id="experienceSection" class="experience" data-aos-easing="ease-in-out" data-aos="fade-up"
             data-aos-duration="1000"  data-aos-once="true">
        <h2 class="experience__header">Berufserfahrung</h2>
        <p class="experience__phrase">Mehr als 5 Jahre habe ich in verschiedenen Digitalen Agenturen gearbeitet und somit Erfahrungen in UI, in Grafische- Verpackungsdesign und in Fotografie sammeln können.</p>
        <div class="experience__list">
            <article class="experience__item" v-for="experience in allExperiences" :key="experience.fbID">
                <h3 class="experience__item-header">{{experience.periodStart | formatDate }} - {{experience.periodEnd | formatDate}}</h3>
                <p class="experience__item-place">{{experience.firm}}<span class="experience__item-country"> ({{experience.place}})</span></p>
                <p class="experience__item-position"> {{experience.position}}</p>
                <p class="experience__item-description"> {{experience.responsibility}}</p>
            </article>
        </div>
    </section>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {IExperience} from "@/interfaces/interfaces";
    import {getModule} from "vuex-module-decorators";
    import Experience from "@/store/modules/experience";

    const experienceStore = getModule(Experience);

    @Component
    export default class BaseExperience extends Vue {
        get allExperiences(): IExperience[] {
            return experienceStore.allWorkExperiences;
        }
    }
</script>

<style scoped lang="scss">
    @import "../scss/mixins";

    .experience {
        padding: 30px 5.8333%;
        margin-bottom: 50px;
        font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;

        @include desktop {
            margin-top: -130px;
        }

        &__header {
            @include section-header();
            @include desktop {
                font-size: 58px;
            }

            @include largeDesktop {
                font-size: 58px;
            }
        }


        &__phrase {
            font-size: 22px;
            font-family: 'Myriad Pro', 'Roboto', sans-serif;
            margin-bottom: 40px;

        }

        &__list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        &__item {
            &:hover {
                cursor: pointer;

                .experience__item-header {
                    background-color: #ffc400;
                    transition: 300ms ease-out;
                    box-shadow: -1px -1px 7px 0px rgba(0, 0, 0, 0.75);
                }
            }

            &-header {
                background-color: lightgray;
                padding: 15px 30px;
                line-height: 24px;
                font-weight: bold;
                font-size: 28px;
                margin-bottom: 25px;
            }

            &-position {
                font-weight: bold;
                margin: 0;
                padding: 0 30px;
                font-size: 22px;
                line-height: 28px;
            }
            &-place {
                font-weight: bold;
                margin-bottom: 20px;
                padding: 0 30px;
                font-size: 22px;
                line-height: 28px;
            }

            &-country {
                font-weight: normal;
            }


            &-description {
                margin: -5px 0 0 0;
                padding: 10px 30px;
                font-size: 22px;
                line-height: 28px;
            }
        }
    }
</style>
