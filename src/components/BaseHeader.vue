<template>
    <header class="main-header">
        <div class="header-wrapper">
            <nav class="main-nav">
                <div class="logo">
                    <a href="#" class="logo__link">
                        <img src="@/assets/logo.png" alt="logo">
                    </a>
                </div>
                <ul class="main-nav__menu-list">
                    <li class="main-nav__menu-item main-nav__menu-item--active">Home</li>
                    <li class="main-nav__menu-item">Berufserfahrung</li>
                    <li class="main-nav__menu-item">Skills</li>
                    <li class="main-nav__menu-item">Projekte</li>
                    <li class="main-nav__menu-item">Certificate</li>
                </ul>
            </nav>
            <section class="moto">
                <p class="moto__text">Hallo, ich bin <span class="moto__name">Stella Notkina</span><span
                        class="moto__description">UI/UX Designerin</span>Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit. Doloribus officia optio reprehenderit rerum tenetur. Consequatur
                    cum
                    debitis dicta dignissimos doloribus fugiat</p>
                <button class="moto__btn">Download CV</button>
            </section>

        </div>


    </header>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class BaseHeader extends Vue {

    }
</script>

<style scoped lang="scss">

    .main-header {
        min-height: 1000px;
        background-image: url("../assets/foto.png");
        background-repeat: no-repeat;
        background-size: contain;
        padding: 30px 5.8333%;
        align-content: center;

        .header-wrapper {
            width: 60%;
            display: flex;
            flex-direction: column;
        }

        .moto {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            align-self: flex-end;
            color: white;
            max-width: 55%;
            text-wrap: normal;
            text-align: justify;

            &__text {
                display: flex;
                flex-direction: column;
                text-align: right;
                font-size: 18px;
            }

            &__name {
                font-size: 48px;
                line-height: 48px;
                color: #ffc400;
                text-transform: uppercase;
            }

            &__description {
                font-size: 30px;
                line-height: 30px;
            }

            &__btn {
                background-color: #ffc400;
                border-radius: 20px;
                padding: 10px 30px;
                outline: none;
                color: black;
                /*max-width: 200px;*/
            }
        }


        .main-nav {
            display: flex;


            .logo {
                width: 15%;
                min-width: 60px;
                /*height: auto;*/
                /*min-height: 135px;*/

                img {
                    width: 100%;
                    height: auto;
                }

                margin-right: 5%;
            }

            &__menu-list {
                display: inline-flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: row;
                padding: 0;
                margin: 0;
                width: 100%;
            }

            &__menu-item {
                font-size: 1.2vw;
                list-style: none;
                color: white;

                &--active {
                    color: #ffc400;
                }
            }
        }

    }
</style>
