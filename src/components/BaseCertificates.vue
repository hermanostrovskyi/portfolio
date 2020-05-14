<template>
    <section id="certificateSection" class="certificate">
        <h2 class="certificate__header">Zertifikate</h2>
        <div class="certificate__list">
            <div class="certificate__list-item" v-for="certificate in allCertificates"
                 :key="certificate.fbID">
                <div
                        class="certificate__list-item-container"
                >
                    <img class="certificate__list-item-image"
                         :src="certificate.url"
                         :alt="certificate.title">
                    <div class="certificate__list-item-overlay">
                        <v-btn @click="showImage(certificate)" color="#ffc400" fab>+</v-btn>
                    </div>
                </div>

                <div class="certificate__list-item-info">
                    <p class="certificate__list-item-info-date">05/2017</p>
                    <p class="certificate__list-item-info-title">{{certificate.title}}</p>
                </div>
            </div>
        </div>
        <v-dialog v-if="dialogCertificate"
                  @click:outside="onDialogClose"
                  v-model="dialog"
                  max-width="800"
        >
            <v-card>
                <v-card-title class="headline">{{dialogCertificate.title}}</v-card-title>
                <v-img
                        class="white--text align-end"
                        :src="dialogCertificate.url"
                >
                </v-img>

                <v-card-actions>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="onDialogClose">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {getModule} from "vuex-module-decorators";
    import Certificate from "../store/modules/certificate";
    import {ICertificate} from "@/interfaces/interfaces";

    const certificateStore = getModule(Certificate);

    @Component
    export default class BaseCertificates extends Vue {

        dialog: boolean = false;
        dialogCertificate: ICertificate = null;

        get allCertificates(): ICertificate[] {
            return certificateStore.allCertificates;
        }

        onDialogClose(): void {
            this.dialog = false;
            this.dialogCertificate = null;
        }

        showImage(certificate: ICertificate) {
            this.dialog = true;
            this.dialogCertificate = certificate;
        }

    }
</script>

<style scoped lang="scss">
    .certificate {
        padding: 30px 5.8333%;
        margin-top: 50px;
        font-family: 'Myriad Pro Condensed', 'Myriad Pro', 'Roboto', sans-serif;

        &__header {
            color: #ffc400;
            font-size: 48px;
            margin-bottom: 40px;
        }

        &__list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            grid-gap: 40px;

            &-item {
                &-container {
                    cursor: pointer;
                    position: relative;
                    height: 400px;
                    z-index: 1;
                    box-shadow: 0 3px 10px -2px rgba(0, 0, 0, .6), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12) !important;

                    &:hover .certificate__list-item-overlay {
                        display: grid;
                        justify-items: center;
                        align-items: center;
                        animation: slide-in-blurred-left 0.4s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
                    }
                }

                &-image {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                }

                &-overlay {
                    color: white;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.6);
                    display: none;
                    z-index: 2;
                    padding: 20px;
                }

                &-info {
                    margin-top: 20px;

                    &-date {
                        font-style: italic;
                        font-size: 18px;
                        margin-bottom: 20px;
                        font-weight: bold;
                    }

                    &-title {
                        font-size: 18px;
                        margin: 0;
                    }
                }
            }


        }


        @keyframes slide-in-blurred-left {
            0% {
                -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
                transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
                -webkit-transform-origin: 100% 50%;
                transform-origin: 100% 50%;
                -webkit-filter: blur(40px);
                filter: blur(40px);
                opacity: 0;
            }
            100% {
                -webkit-transform: translateX(0) scaleY(1) scaleX(1);
                transform: translateX(0) scaleY(1) scaleX(1);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                -webkit-filter: blur(0);
                filter: blur(0);
                opacity: 1;
            }
        }


    }

</style>
