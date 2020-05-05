<template>
    <div>
        <section id="experience">
            <h2>Experience</h2>
            <ul >
                <li v-for="experience in allExperiences" :key="experience.fbID">
                    <p>From: {{experience.periodStart}} - {{experience.periodStart}}</p>
                    <p>Place: {{experience.place}}</p>
                    <p>Position: {{experience.position}}; Responsibility: {{experience.responsibility}}</p>
                </li>
            </ul>
        </section>
    </div>


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
</style>
