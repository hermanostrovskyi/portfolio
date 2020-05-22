<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="certificate in allCertificates" :key="certificate.fbID">
                <v-card>
                    <v-card-title>{{certificate.title}}</v-card-title>
                    <v-card-subtitle>Date: {{certificate.date }}</v-card-subtitle>
                    <v-img :src="certificate.url"></v-img>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn fab small color="primary" @click="onCertificateUpdate(certificate)">
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
    import AdminDialog from "@/store/modules/adminDialog";

    const certificateStore = getModule(Certificate);
    const adminDialogStore = getModule(AdminDialog);

    @Component
    export default class AdminCertificates extends Vue {
        get allCertificates(): ICertificate[] {
            return certificateStore.allCertificates;
        }

        onCertificateDelete(certificate: ICertificate): void {
            adminDialogStore.setDialogOptions({
                componentName: 'DialogDeleteConfirmation',
                properties: {
                    mode: 'deleteConfirmation',
                    submit: certificateStore.deleteCertificateAction,
                    data: certificate
                }
            });
        }

        onCertificateUpdate(certificate: ICertificate): void {
            adminDialogStore.setDialogOptions({
                componentName: 'DialogCertificates',
                properties: {
                    mode: 'update',
                    populateWith: {...certificate},
                    submit: certificateStore.updateCertificateAction
                }
            });
        }

        created() {
            certificateStore.fetchCertificates();
        }


    }
</script>

<style>

</style>
