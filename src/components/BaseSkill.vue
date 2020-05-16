<template>
    <section id="skillSection" class="skill"   data-aos-easing="ease-in-out" data-aos="fade-up" data-aos-duration="1500"  data-aos-once="false">
        <h2 class="skill__header">Skills</h2>
        <div class="skill__list-container">
            <div class="skill__main-list">
                <h3 class="skill__main-list-header">Fachgebiete</h3>
                <article class="skill__item" v-for="skill in mainSkills" :key="skill.fbID">
                    <div class="skill__item-header-section">
                        <h3 class="skill__item-header">{{skill.name}}</h3>
                        <strong class="skill__item-value">{{skill.skillValue}} %</strong>
                    </div>
                    <v-progress-linear
                            rounded
                            color="#ffc400"
                            height="6px"
                            class="skill__item-progressbar"
                            :value="skill.skillValue">
                    </v-progress-linear>
                </article>
            </div>
            <div class="skill__tools-list">
                <h3 class="skill__tools-list-header">Design tools</h3>
                <article class="skill__item" v-for="skill in toolsSkills" :key="skill.fbID">
                    <div class="skill__item-header-section">
                        <h3 class="skill__item-header">{{skill.name}}</h3>
                        <strong class="skill__item-value">{{skill.skillValue}} %</strong>
                    </div>
                    <v-progress-linear
                            rounded
                            color="#ffc400"
                            height="6px"
                            class="skill__item-progressbar"
                            :value="skill.skillValue">
                    </v-progress-linear>
                </article>
            </div>
        </div>

    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {ISkill} from "@/interfaces/interfaces";
    import {getModule} from "vuex-module-decorators";
    import Skill from "@/store/modules/skill";

    const skillStore = getModule(Skill);

    @Component
    export default class BaseSkill extends Vue {
        get allSkills(): ISkill[] {
            return skillStore.allSkills;
        }

        get mainSkills(): ISkill[] {
            return this.allSkills.filter((skill: ISkill) => skill.type === 'Main');
        }

        get toolsSkills(): ISkill[] {
            return this.allSkills.filter((skill: ISkill) => skill.type === 'Tools');
        }
    }
</script>

<style scoped lang="scss">
    @import 'src/scss/mixins';

    .skill {
        padding: 30px 5.8333%;
        margin-bottom: 90px;
        font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;

        &__header {
            @include section-header();
        }

        &__list-container {
            display: grid;
            grid-template-columns:  repeat(auto-fit, minmax(250px, 1fr));
            column-gap: 10%;
            align-items: start;
            row-gap: 50px;
        }

        &__main-list {
            display: grid;
            grid-template-columns: 1fr;
            align-items: start;
            gap: 40px;


            &-header {
                font-size: 28px;
                font-family: 'Myriad Pro Bold', 'Roboto', sans-serif;
                text-transform: uppercase;

            }

        }

        &__tools-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;

            &-header {
                font-size: 28px;
                font-family: 'Myriad Pro Bold', 'Roboto', sans-serif;
                text-transform: uppercase;
            }
        }


        &__item {
            font-family: 'Myriad Pro', 'Roboto', sans-serif;
            font-size: 28px;


            &-header-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                justify-items: baseline;
            }

            &-value {
                color: #ffc400;
                justify-self: right;
            }

            &-header {
                font-weight: normal;
            }

            &-progressbar {
                background-color: #e0e0e0;
            }


        }
    }
</style>
