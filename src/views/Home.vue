<template>
    <div>
        <BaseHeader/>
        <BaseExperience/>
        <BaseSkill/>
        <BasePortfolio/>
        <BaseCertificates/>
        <BaseFooter/>
        <v-fab-transition v-if="isScrolled">
            <v-btn fab color="#ffc400" large bottom class="to-top-button" @click="scrollToTop">
                <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
        </v-fab-transition>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {getModule} from "vuex-module-decorators";
    import Skill from "@/store/modules/skill";
    import Experience from "@/store/modules/experience";
    import BaseHeader from "@/components/BaseHeader.vue";
    import BaseExperience from "@/components/BaseExperience.vue";
    import BaseSkill from "@/components/BaseSkill.vue";
    import BasePortfolio from "@/components/BasePortfolio.vue";
    import BaseCertificates from "@/components/BaseCertificates.vue";
    import BaseFooter from "@/components/BaseFooter.vue";
    import Portfolio from "@/store/modules/portfolio";
    import Certificate from "@/store/modules/certificate";
    import {GoToOptions} from "vuetify/types/services/goto";

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
        isScrolled: boolean = false;
        scrollOptions: GoToOptions = {
            duration: 500,
            offset: 0,
            easing: 'easeInOutCubic',
        };


        scrollToTop(): void {
            this.$vuetify.goTo('#home', this.scrollOptions);
        }


        beforeCreate() {
           if(!experienceStore.allWorkExperiences.length) {
               experienceStore.fetchExperienceAction();
           }
            if(!skillStore.allSkills.length) {
                skillStore.fetchSkills();
            }
            if(!portfolioStore.allPortfolioItems.length) {
                portfolioStore.fetchPortfolio();
            }
            if(!certificateStore.allCertificates.length) {
                certificateStore.fetchCertificates();
            }

        }

        created(): void {
            window.addEventListener('scroll', () => {
                this.isScrolled = window.pageYOffset > 300;
            });
        }
    }
</script>


<style lang="scss">
    .to-top-button {
        position: fixed;
        right: 30px;
        bottom: 30px;
        z-index: 100;
        display: none;

        @include desktop {
            display: block;
        }

        @include largeDesktop {
            display: block;
        }
    }
</style>
