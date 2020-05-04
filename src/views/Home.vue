<template>
    <div>
        <BaseHeader></BaseHeader>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {getModule} from "vuex-module-decorators";
    import Skill from "@/store/modules/skill";
    import {IExperience, ISkill} from "@/interfaces/interfaces";
    import Experience from "@/store/modules/experience";
    import BaseHeader from "@/components/BaseHeader.vue";

    const skillStore = getModule(Skill);
    const experienceStore = getModule(Experience);

    @Component({
        components: {
            BaseHeader
        }
    })
    export default class Home extends Vue {
        get skills(): ISkill[] {
            return skillStore.allSkills
        }

        get experience(): IExperience[] {
            return experienceStore.allWorkExperiences;
        }

        beforeCreate() {
            experienceStore.fetchExperienceAction();
            skillStore.fetchSkills();
        }
    }
</script>


<style lang="scss">

</style>
