<template>
    <div>
        <BaseHeader></BaseHeader>
        <BaseExperience></BaseExperience>
        <BaseSkill></BaseSkill>
        <BasePortfolio></BasePortfolio>
        <BaseCertificates></BaseCertificates>
        <BaseFooter></BaseFooter>
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
    import BaseCertificates from "@/components/BaseCertificates.vue";
    import BaseFooter from "@/components/BaseFooter.vue";
    import Portfolio from "@/store/modules/portfolio";
    import Certificate from "@/store/modules/certificate";

    const skillStore = getModule(Skill);
    const experienceStore = getModule(Experience);
    const portfolioStore = getModule(Portfolio);
    const certificateStore = getModule(Certificate)


    @Component({
        components: {
            BaseHeader,
            BaseExperience,
            BaseSkill,
            BasePortfolio,
            BaseCertificates,
            BaseFooter
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
            certificateStore.fetchCertificates();
        }
    }
</script>


<style lang="scss">

</style>
