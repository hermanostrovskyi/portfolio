<template>
    <header class="main-header">
        <nav class="main-nav">
            <div class="main-nav-logo logo">
                <a href="#" class="logo__link">
                    <img src="@/assets/logo.png" alt="logo">
                </a>
            </div>
            <v-btn icon @click="isMenuActive = true" class="main-nav__toggle">
                <v-icon>mdi-menu</v-icon>
            </v-btn>

            <div class="overlay navigation" :class="{'overlay--active': isMenuActive}">
                <v-btn icon @click="isMenuActive = false" class="closeBtn">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
            <ul class="main-nav__menu-list" :class="{'main-nav__menu-list--active': isMenuActive}">
                <li class="main-nav__menu-item main-nav__menu-item--active">Home</li>
                <li class="main-nav__menu-item">Berufserfahrung</li>
                <li class="main-nav__menu-item">Skills</li>
                <li class="main-nav__menu-item">Projekte</li>
                <li class="main-nav__menu-item">Certificate</li>
            </ul>

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

    .main-header {
        padding: 30px 5.8333%;
        background-color: $black;

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

            &--active {
                width: 100%;
            }

            .closeBtn {
                position: fixed;
                z-index: 4;
                top: 15px;
                right: 45px;
                font-size: 40px !important;
            }
        }

        .main-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 60px;

            &__toggle {
                i.v-icon {
                    width: 40px;
                    height: 40px;
                    font-size: 40px;
                    color: $yellow;
                }
            }

            &__menu-list {
                display: none;
                margin: 0;
                padding: 0;
                width: 100%;


                &--active {
                    display: flex;
                    position: fixed;
                    top: 40px;
                    z-index: 3;
                    left: 0;
                    flex-direction: column;
                    justify-content: space-around;
                    transition: 0.5s;
                }

            }

            &__menu-item {
                font-size: 30px;
                height: 100%;
                text-align: center;
                padding: 20px;
                cursor: pointer;
                list-style: none;
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


    }

    @media (min-width: 768px) {
        .main-header {
            background: none;
            background-image: url("../assets/foto.png");
            background-repeat: no-repeat;
            background-position: 0 0;
            background-size: cover;


            .overlay {
                display: none;
            }


            .main-nav__toggle {
                display: none;
            }

            .main-nav__menu-list {
                display: flex;
                flex-direction: row;
            }

            .main-nav__menu-item {
                font-size: 1.5vw;
            }

            .main-nav-logo {
                width: 90px;
                /*max-width: 90px;*/
            }

            .moto {
                max-width: 50%;
            }
        }


    }


</style>
