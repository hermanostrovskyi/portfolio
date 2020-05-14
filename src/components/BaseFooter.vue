<script src="../helper/helperFunctions.ts"></script>
<template>
    <footer class="footer">
        <section class="footer__contacts">
            <div class="footer__contacts-phone-section">
                <p class="footer__contacts-phone-section-caption">Mobil</p>
                <p class="footer__contacts-phone-section-content">+491631319487</p>
            </div>
            <div class="footer__contacts-email-section">
                <p class="footer__contacts-email-section-caption">Email</p>
                <p class="footer__contacts-email-section-content">alnoirs3@gmail.com</p>
            </div>
            <div class="footer__contacts-logo">
                <img class="footer__contacts-logo-image" src="@/assets/logo.png" alt="logo">
            </div>
            <div class="footer__contacts-socials">
                <font-awesome-icon class="footer__contacts-socials-item" :icon="['fab', 'dribbble']"/>
                <font-awesome-icon class="footer__contacts-socials-item" :icon="['fab', 'instagram']"/>
                <font-awesome-icon class="footer__contacts-socials-item" :icon="['fab', 'xing']"/>
            </div>
        </section>
        <section class="footer__copyright">
            <p class="footer__copyright-title">©Herman Ostrovskyi</p>
        </section>
    </footer>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';


    @Component
    export default class BaseFooter extends Vue {

    }
</script>

<style scoped lang="scss">
    .footer {
        font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;

        &__contacts {
            display: grid;
            gap: 20px;
            color: white;
            background-color: black;
            padding: 30px 5.8333%;

            &-phone-section {
                &-caption {
                    font-weight: bold;
                    font-style: italic;
                    font-size: 18px;
                }

                &-content {
                    color: #ffc400;
                    font-size: 18px;
                }
            }

            &-email-section {
                grid-row: 1;
                grid-column: 3;
                justify-self: end;

                &-caption {
                    font-weight: bold;
                    font-size: 18px;
                    font-style: italic;
                    text-align: right;
                }

                &-content {
                    color: #ffc400;
                    font-size: 18px;
                }
            }

            &-socials {
                grid-row: 2;
                grid-column: 2;
                font-size: 36px;
                display: grid;
                gap: 20px;
                justify-items: center;
                grid-template-columns: repeat(3, 1fr);

                &-item {
                    cursor: pointer;

                    &:hover {
                        color: #ffc400;
                    }
                }
            }

            &-logo {
                grid-row: 1;
                grid-column: 2;
                justify-self: center;
            }
        }

        &__copyright {
            background-color: #ffc400;

            &-title {
                padding: 10px 0;
                margin: 0;
                text-align: center;
                font-size: 18px;
            }
        }
    }

    @media (min-width: 1024px) {

        .footer__contacts {
            grid-template-columns: repeat(6, 1fr);
            align-items: center;
        }

        .footer__contacts-email-section {
            grid-column: 2;
            grid-row: 1;
            justify-self: start;

            &-caption {
                text-align: left;
            }
        }

        .footer__contacts-logo {
            grid-column: 3/5;
            grid-row: 1;
        }

        .footer__contacts-socials {
            grid-column: 6;
            grid-row: 1;
        }

    }
</style>
