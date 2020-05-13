<template>
    <div>
        <BaseHeader></BaseHeader>
        <BaseExperience></BaseExperience>
        <BaseSkill></BaseSkill>
        <BasePortfolio></BasePortfolio>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {getModule} from "vuex-module-decorators";
    import Skill from "@/store/modules/skill";
    import {IExperience, ISkill} from "@/interfaces/interfaces";
    import Experience from "@/store/modules/experience";
    import BaseHeader from "@/components/BaseHeader.vue";
    import BaseExperience from "@/components/BaseExperience.vue";
    import BaseSkill from "@/components/BaseSkill.vue";
    import BasePortfolio from "@/components/BasePortfolio.vue";
    import Portfolio from "@/store/modules/portfolio";

    const skillStore = getModule(Skill);
    const experienceStore = getModule(Experience);
    const portfolioStore = getModule(Portfolio);


    @Component({
        components: {
            BaseHeader,
            BaseExperience,
            BaseSkill,
            BasePortfolio
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
            portfolioStore.fetchPortfolio();
        }
    }
</script>


<style lang="scss">

</style>
