<template>
    <header class="header">
        <div class="header__wrapper">
            <nav class="header__navigation">
                <div class="header__navigation-logo logo">
                    <img class="logo__image" src="@/assets/logo.png" alt="logo">
                </div>

                <v-btn icon x-large
                       class="header__navigation-toggle"
                       :class="{'header__navigation-toggle--active': isMenuActive}"
                       @click="onButtonToggle($event)">
                    <v-icon v-if="isMenuActive">mdi-close</v-icon>
                    <v-icon v-else>mdi-menu</v-icon>
                </v-btn>

                <div class="header__navigation-overlay" :class="{'header__navigation-overlay--active': isMenuActive}">
                    <ul class="header__navigation-list" :class="{'header__navigation-list--active': isMenuActive}">
                        <li class="header__navigation-list-item header__navigation-list-item--active">Home</li>
                        <li class="header__navigation-list-item">Berufserfahrung</li>
                        <li class="header__navigation-list-item">Skills</li>
                        <li class="header__navigation-list-item">Projekte</li>
                        <li class="header__navigation-list-item">Certificate</li>
                    </ul>
                </div>
            </nav>
            <div class="header__info">
                <p class="header__info-start">Hallo, ich bin</p>
                <p class="header__info-name">Stella Notkina</p>
                <p class="header__info-description">UI/UX Designerin</p>
                <p class="header__info-end">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
                    consequatur
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

        onButtonToggle($event: Event): void {
            this.isMenuActive = !this.isMenuActive;
            const icon: HTMLElement = $event.target as HTMLElement;
            const parentBtn: HTMLElement = icon.closest('.header__navigation-toggle') as HTMLElement;
            parentBtn.classList.add('header__navigation-toggle--animate');
            setTimeout(() => {
                parentBtn.classList.remove('header__navigation-toggle--animate');
            }, 600);
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


        &__navigation {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;

            @include desktop {
                grid-template-columns: 2fr 8fr;
                margin-bottom: 40px;
            }

            &-overlay {
                padding-top: 40px;
                width: 0;
                height: 100%;
                position: fixed;
                z-index: 1;
                top: 0;
                left: 0;
                overflow-y: auto;
                max-height: 100vh;
                transition: 0.5s;
                background-color: $yellowColor;

                @include desktop {
                    font-size: 18px;
                    width: 100%;
                    position: static;
                    background-color: transparent;
                    display: grid;
                }

                &--active {
                    width: 100%;
                }
            }

            &-toggle {
                justify-self: end;

                @include desktop {
                    display: none;
                }

                &--animate {
                    @include animation('rotate-center 0.5s ease-in-out both');
                }

                &--active {
                    position: fixed;
                    top: 75px;
                    right: 25px;
                    z-index: 66;

                    i.v-icon {
                        color: black !important;
                    }
                }


                i.v-icon {
                    width: 40px;
                    height: 40px;
                    font-size: 40px;
                    color: $yellowColor;
                }
            }

            &-list {
                margin: 0;
                padding: 0;
                list-style: none;
                display: none;
                flex-direction: column;
                justify-content: space-between;
                font-size: 30px;
                cursor: pointer;
                top: 0;
                left: 0;
                z-index: 3;

                @include desktop {
                    display: flex;
                    position: static;
                    flex-direction: row;
                    font-size: 18px;
                }

                @include largeDesktop {
                    display: flex;
                    position: static;
                    flex-direction: row;
                    font-size: 22px;
                }

                &--active {
                    display: block;
                    position: relative;
                    top: 0;
                    left: 0;

                    @include desktop {
                        display: flex;
                        position: static;
                        flex-direction: row;
                        font-size: 18px;
                    }

                    @include largeDesktop {
                        display: flex;
                        position: static;
                        flex-direction: row;
                        font-size: 22px;
                    }
                }

                &-item {
                    text-align: center;
                    cursor: pointer;
                    padding: 20px;

                    @include desktop {
                        padding: 0;
                    }

                    @include largeDesktop {
                        padding: 0;
                    }

                    &:hover {
                        color: $black;
                    }
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
                color: $yellowColor;
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
                background-color: $yellowColor;
                border-radius: 20px;
                padding: 10px 30px;
                outline: none;
                color: $black;
                max-width: 200px;
            }
        }

        &__shape {
            display: none;
            position: absolute;
            bottom: 0;

            width: 100%;
            height: 200px;

            @include desktop {
                display: block;
            }
        }
    }

    .logo {
        justify-self: start;
    }

    @include keyframes(rotate-center) {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }


</style>
