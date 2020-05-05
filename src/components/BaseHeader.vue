<template>
    <header class="main-header">
        <nav class="main-nav">

            <div class="main-nav-logo logo">
                <a href="#" class="logo__link">
                    <img src="@/assets/logo.png" alt="logo">
                </a>
            </div>
            <v-app-bar-nav-icon
                    app
                    class="main-nav__toggle"
                    dark
                    @click="isMenuActive = true"
            >
            </v-app-bar-nav-icon>
            <div class="overlay navigation" :class="{'overlay--active': isMenuActive}">
                <v-btn icon @click="isMenuActive = false" class="closeBtn">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <ul class="main-nav__menu-list overlay__content" >
                    <li class="main-nav__menu-item main-nav__menu-item--active">Home</li>
                    <li class="main-nav__menu-item">Berufserfahrung</li>
                    <li class="main-nav__menu-item">Skills</li>
                    <li class="main-nav__menu-item">Projekte</li>
                    <li class="main-nav__menu-item">Certificate</li>
                </ul>
            </div>

        </nav>
        <section class="moto">
            <p class="moto__text-start">Hallo, ich bin</p>
            <p class="moto__name">Stella Notkina</p>
            <p class="moto__description">UI/UX Designerin</p>
            <p class="moto__text-end">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consequatur
                cum doloremque expedita itaque rem!</p>
            <button class="moto__btn">Download CV</button>
        </section>


    </header>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class BaseHeader extends Vue {
        isMenuActive: boolean = false;


    }
</script>

<style scoped lang="scss">
    $yellow: #ffc400;
    $white: #fff;
    $black: #000;

    .overlay {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: $yellow;
        overflow-y: auto;
        max-height: 100vh;
        transition: 0.5s;

        &__content {
            position: relative;
            z-index: 3;
            top: 0;
            width: 100%;
            text-align: center;
            margin-top: 30px;
        }

        &--active {
            width: 100%;
        }

        .closeBtn {
            position: absolute;
            z-index: 4;
            top: 20px;
            right: 45px;
            font-size: 40px !important;
        }
    }

    .main-header {
        padding: 30px 5.8333%;
        background-color: $black;
    }

    .main-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 60px;

        &__toggle {
            /*position: fixed;*/
            /*right: 100%;*/
            /*top: 0;*/
            /*z-index: 1000;*/
            i.v-icon {
                width: 40px;
                height: 40px;
                font-size: 40px;
                color: $yellow;
            }
        }

        &__menu-list {
            display: block;
            margin: 0;
            padding: 0;
            background-color: $yellow;
            width: 100%;


            &--active {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }

        &__menu-item {
            font-size: 30px;
            height: 100%;
            text-align: center;
            padding: 20px;
            cursor: pointer;
            color: $white;
        }

        .logo {
            max-width: 50px;

            img {
                width: 100%;
                display: block;
                height: auto;
            }

            margin-right: 5%;
        }


    }

    .moto {
        color: $white;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        &__text-start {
            font-size: 18px;
            line-height: 18px;
            text-align: justify;
            margin-bottom: 25px;
        }

        &__text-end {
            font-size: 18px;
            line-height: 26px;
            margin-bottom: 20px;
            text-align: right;
        }

        &__name {
            font-size: 48px;
            line-height: 48px;
            color: $yellow;
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
            background-color: $yellow;
            border-radius: 20px;
            padding: 10px 30px;
            outline: none;
            color: $black;
            max-width: 200px;
        }
    }

</style>
