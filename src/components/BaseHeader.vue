<template>
    <header id="home" class="header">
        <div class="header__wrapper">
            <nav class="header__nav nav">
                <div class="nav__logo">
                    <img class="nav__logo-image" src="@/assets/logo.png" alt="logo">
                </div>
                <BaseBurger class="nav__toggler" @clicked="onBurgerClicked" />


                <ul class="nav__list">
                    <li class="nav__item" @click="scrollToAnchor('#home')">Home</li>
                    <li class="nav__item" @click="scrollToAnchor('#experienceSection')">Berufserfahrung</li>
                    <li class="nav__item" @click="scrollToAnchor('#skillSection')">Skills</li>
                    <li class="nav__item" @click="scrollToAnchor('#portfolioSection')">Projekte</li>
                    <li class="nav__item" @click="scrollToAnchor('#certificateSection')">Certificate</li>
                </ul>
            </nav>


            <div class="header__side-nav side-nav" :class="{'side-nav--active': isMenuActive}">
                <ul class="side-nav__list">
                    <li class="side-nav__item" @click="scrollToAnchor('#home')">Home</li>
                    <li class="side-nav__item" @click="scrollToAnchor('#experienceSection')">Berufserfahrung</li>
                    <li class="side-nav__item" @click="scrollToAnchor('#skillSection')">Skills</li>
                    <li class="side-nav__item" @click="scrollToAnchor('#portfolioSection')">Projekte</li>
                    <li class="side-nav__item" @click="scrollToAnchor('#certificateSection')">Certificate</li>
                </ul>
            </div>
            <div class="header__intro intro">
                <p class="intro__start">Hallo, ich bin</p>
                <p class="intro__name">Stella Notkina</p>
                <p class="intro__description">UI/UX Designerin</p>
                <p class="intro__end">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consequatur
                    cum doloremque expedita itaque rem!</p>
                <button class="intro__btn">Download CV</button>
            </div>

        </div>

    </header>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {GoToOptions} from "vuetify/types/services/goto";
    import BaseBurger from "@/components/BaseBurger.vue";

    @Component({
        components: {
            BaseBurger
        }
    })
    export default class BaseHeader extends Vue {
        isMenuActive: boolean = false;
        toggleBtn: HTMLElement = null;

        scrollOptions: GoToOptions = {
            duration: 500,
            offset: 0,
            easing: 'easeInOutCubic',
        };


        scrollToAnchor(anchor: string): void {
            this.$vuetify.goTo(anchor, this.scrollOptions);
            this.isMenuActive = false;
        }

        onBurgerClicked(isBurgerActive: boolean): void {
            this.isMenuActive = !isBurgerActive;

        }

        created() {
            window.addEventListener('resize', () => {
                if (window.innerWidth > 1024) {
                    this.isMenuActive = false;
                }
            });
        }
    }
</script>

<style scoped lang="scss">

    .header {
        background-color: $black;
        padding: 30px $horizontalPadding;
        color: $white;

        @include desktop {
            background-image: url("../assets/foto.png");
            background-repeat: no-repeat;
            background-position: 100%;
            background-size: auto 100%;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 300px));
            padding-bottom: 200px;
        }

        &__wrapper {
            width: 100%;

            @include desktop {
                max-width: 60%;
            }
            @include largeDesktop {
                max-width: 70%;
            }
        }
    }


    .nav {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;

        @include desktop {
            grid-template-columns: 2fr 8fr;
            margin-bottom: 40px;
        }

        &__list {
            margin: 0;
            padding: 0;
            list-style: none;
            display: none;
            justify-content: space-between;
            font-size: 30px;
            cursor: pointer;

            @include desktop {
                display: flex;
                font-size: 18px;
            }

            @include largeDesktop {
                display: flex;
                font-size: 22px;
            }

        }

        &__item {
            &:hover {
                color: $yellowColor;
            }
        }

        &__toggler {
            justify-self: end;

            @include desktop {
                display: none;
            }
        }
    }


    .side-nav {
        padding-top: 40px;
        width: 0;
        height: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: 1fr;
        justify-content: center;
        overflow-y: auto;
        max-height: 100vh;
        transition: 0.5s;
        background-color: $yellowColor;

        &--active {
            width: 100%;
        }


        &__list {
            margin: 0;
            padding: 0;
            list-style: none;
            font-size: 30px;
            cursor: pointer;
            width: 100%;
        }

        &__item {
            padding: 10px;
            text-align: center;

            &:hover,
            &:active {
                color: $black;
            }
        }
    }


    .intro {
        color: $white;
        background-color: transparent;
        display: flex;
        flex-direction: column;
        align-items: flex-end;


        &__start {
            font-size: 18px;
            line-height: 18px;
            text-align: justify;
            margin-bottom: 25px;
        }

        &__end {
            font-size: 18px;
            line-height: 26px;
            margin-bottom: 20px;
            text-align: right;
            max-width: 500px;
        }

        &__name {
            font-size: 48px;
            line-height: 48px;
            color: $yellowColor;
            margin-bottom: 0;
            text-transform: uppercase;
            text-align: right;
            font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;
        }

        &__description {
            margin-bottom: 25px;
            font-size: 30px;
            line-height: 30px;

            font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;
        }

        &__btn {
            background-color: $yellowColor;
            border-radius: 20px;
            padding: 10px 30px;
            outline: none;
            color: $black;
            max-width: 200px;
        }
    }
</style>
