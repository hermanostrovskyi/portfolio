<template>
    <section id="experienceSection" class="experience" data-aos-easing="ease-in-out" data-aos="fade-up"
             data-aos-duration="2500" data-aos-once="false">
        <h2 class="experience__header">Berufserfahrung</h2>
        <p class="experience__phrase">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda at
            autem consequuntur cumque
            ducimus eaque eius exercitationem fugit hic molestiae numquam odit.</p>
        <div class="experience__list">
            <article class="experience__item" v-for="experience in allExperiences" :key="experience.fbID">
                <h3 class="experience__item-header">{{experience.periodStart}} - {{experience.periodStart}}</h3>
                <p class="experience__item-position"> {{experience.position}}</p>
                <p class="experience__item-place">{{experience.place}}</p>
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
    @import "src/scss/mixins";

    .experience {
        padding: 30px 5.8333%;
        margin-bottom: 90px;
        font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;

        &__header {
            @include section-header();
        }


        &__phrase {
            font-size: 28px;
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
                margin-bottom: 15px;
            }

            &-position {
                font-weight: bold;
                margin: 0 0 6px 0;
                padding: 0 30px;
                font-size: 28px;
                line-height: 28px;
            }
            &-place {
                font-weight: bold;
                margin: 0;
                padding: 0 30px;
                font-size: 28px;
                line-height: 28px;
            }


            &-description {
                margin: 0;
                padding: 10px 30px;
                font-size: 24px;
                line-height: 28px;
            }
        }
    }
</style>
