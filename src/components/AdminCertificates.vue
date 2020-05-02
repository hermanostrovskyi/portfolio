<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="certificate in allCertificates" :key="certificate.fbID">
                <v-card>
                    <v-card-title>{{certificate.title}}</v-card-title>
                    <v-img :src="certificate.url"></v-img>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn fab small color="primary">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>


                        <v-btn fab small color="error" @click="onCertificateDelete(certificate)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>


                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {getModule} from "vuex-module-decorators";
    import Certificate from "@/store/modules/certificate";
    import {ICertificate} from "@/interfaces/interfaces";

    const certificateStore = getModule(Certificate);


    @Component
    export default class AdminCertificates extends Vue {
        get allCertificates(): ICertificate[] {
            return certificateStore.allCertificates;
        }

        onCertificateDelete(certificate: ICertificate): void {
            certificateStore.deleteCertificateAction(certificate);
        }

        created() {
            certificateStore.fetchCertificates();
        }


    }
</script>

<style>

</style>
