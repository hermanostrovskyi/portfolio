<template>
    <header class="header">
        <div class="header__overlay" :class="{'header__overlay--active': isMenuActive}"></div>
        <div class="header__container">
            <nav class="header__navigation">
                <div class="header__navigation-logo logo">
                    <img class="logo__image" src="@/assets/logo.png" alt="logo">
                </div>
                <v-btn
                        class="header__navigation-toggle" :class="{'header__navigation-toggle--active': isMenuActive}"
                        icon
                        @click="isMenuActive = !isMenuActive">
                    <v-icon v-if="isMenuActive">mdi-close</v-icon>
                    <v-icon v-else>mdi-menu</v-icon>
                </v-btn>
                <ul class="header__navigation-list" :class="{'header__navigation-list--active': isMenuActive}">
                    <li class="header__navigation-list-item header__navigation-list-item--active">Home</li>
                    <li class="header__navigation-list-item">Berufserfahrung</li>
                    <li class="header__navigation-list-item">Skills</li>
                    <li class="header__navigation-list-item">Projekte</li>
                    <li class="header__navigation-list-item">Certificate</li>
                </ul>
            </nav>
            <div class="header__info">
                <p class="header__info-start">Hallo, ich bin</p>
                <p class="header__info-name">Stella Notkina</p>
                <p class="header__info-description">UI/UX Designerin</p>
                <p class="header__info-end">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consequatur
                    cum doloremque expedita itaque rem!</p>
                <button class="header__info-btn">Download CV</button>
            </div>
        </div>
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

    .header {
        padding: 30px 5.8333%;
        background-color: $black;
        display: grid;
        color: white;
        margin-bottom: 90px;

        &__overlay {
            width: 0;
            height: 100%;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: rgba(255, 196, 0, 1);
            overflow-y: auto;
            max-height: 100vh;
            transition: 0.7s;

            &--active {
                width: 100%;
            }
        }

        &__navigation {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;

            &-toggle {
                justify-self: end;

                &--active {
                    position: fixed;
                    animation: roll-in-blurred-left 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
                    top: 20px;
                    right: 20px;
                    z-index: 66;

                    i.v-icon {
                        color: black !important;
                    }
                }


                i.v-icon {
                    width: 40px;
                    height: 40px;
                    font-size: 40px;
                    color: $yellow;
                }
            }

            &-list {
                margin: 0;
                padding: 0;
                width: 100%;
                list-style: none;
                display: none;
                flex-direction: column;
                justify-content: space-between;
                font-size: 30px;
                cursor: pointer;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 3;

                &-item {
                    text-align: center;
                    padding: 20px;
                    cursor: pointer;

                    &:hover {
                        color: darken(white, 10%);
                    }
                }

                &--active {
                    display: flex;
                }
            }


        }

        &__info {
            color: $white;
            display: flex;
            flex-direction: column;
            align-items: flex-end;


            &-start {
                font-size: 18px;
                line-height: 18px;
                text-align: justify;
                margin-bottom: 25px;
            }

            &-end {
                font-size: 18px;
                line-height: 26px;
                margin-bottom: 20px;
                text-align: right;
                max-width: 500px;
            }

            &-name {
                font-size: 48px;
                line-height: 48px;
                color: $yellow;
                margin-bottom: 0;
                text-transform: uppercase;
                text-align: right;
                font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;
            }

            &-description {
                margin-bottom: 25px;
                font-size: 30px;
                line-height: 30px;

                font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;
            }

            &-btn {
                background-color: $yellow;
                border-radius: 20px;
                padding: 10px 30px;
                outline: none;
                color: $black;
                max-width: 200px;
            }
        }
    }


    @media (min-width: 1200px) {
        .header {
            background-image: url("../assets/foto.png");
            background-repeat: no-repeat;
            background-position: 0 0;
            background-size: cover;

            &__container {
                max-width: 60%;
            }

            &__overlay {
                display: none;
            }

            &__navigation {

                &-toggle {
                    display: none;
                }

                &-list {
                    display: inline-flex;
                    justify-content: space-around;
                    position: relative;
                    flex-direction: row;


                    &-item {
                        font-size: 1.7vw;
                        padding: 0;
                        margin-left: 30px;
                    }
                }
            }

        }
    }

    @keyframes roll-in-blurred-left {
        0% {
            -webkit-transform: translateX(-1000px) rotate(-720deg);
            transform: translateX(-1000px) rotate(-720deg);
            -webkit-filter: blur(50px);
            filter: blur(50px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
    }


</style>
