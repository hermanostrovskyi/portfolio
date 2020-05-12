<template>
        <section id="experienceSection" class="experience"  data-aos-easing="ease-in-out" data-aos="fade-up" data-aos-duration="2500"  data-aos-once="false">
            <h2 class="experience__header">Experience</h2>
            <div class="experience__list">
                <article class="experience__item" v-for="experience in allExperiences" :key="experience.fbID">
                    <h3 class="experience__item-header">{{experience.periodStart}} - {{experience.periodStart}}</h3>
                    <p class="experience__item-position"> {{experience.position}}<br> {{experience.place}}</p>
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
    .experience {
        padding: 30px 5.8333%;
        margin-top: 50px;
        font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;

        &__header {
            color: #ffc400;
            font-size: 48px;
            margin-bottom: 40px;
        }

        &__list {
            font-size: 24px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        &__item {
            &:hover {
                cursor: pointer;

                .experience__item-header {
                    background-color: #ffc400;
                    transition: 300ms ease-out;
                    box-shadow: -1px -1px 7px 0px rgba(0,0,0,0.75);
                }
            }

            &-header {
                background-color: lightgray;
                padding: 10px 30px;
            }

            &-position {
                font-weight: bold;
                margin: 0;
                padding: 10px 30px;
            }

            &-description {
                margin: 0;
                padding: 10px 30px;
            }
        }
    }
</style>
