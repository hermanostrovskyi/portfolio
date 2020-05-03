<template>
    <v-card>
        <v-card-title>
            <span class="headline">{{formLabel}}</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                label="Title*"
                                v-model='certificate.title'
                                required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-file-input
                                label="File input"
                                v-model="file"
                                filled
                                prepend-icon="mdi-file-image"
                        ></v-file-input>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn :disabled="isSubmitDisabled" color="blue darken-1" text @click="submit">{{buttonLabel}}</v-btn>
        </v-card-actions>
    </v-card>

</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'
    import {getModule} from "vuex-module-decorators";
    import {ICertificate, IDialogProps} from "@/interfaces/interfaces";
    import AdminDialog from "@/store/modules/adminDialog";
    import firebase from "firebase";

    const adminDialogStore = getModule(AdminDialog);
    const certificatesStorage = firebase.storage().ref('images/certificates');

    @Component
    export default class DialogSkill extends Vue {
        @Prop() dialogProps: IDialogProps;
        file: File = null;
        certificate: ICertificate = null;

        close(): void {
            adminDialogStore.hideAdminDialog();
        }

        submit(): void {
            if(this.certificate.fullFirebasePath && !this.file) {
                this.dialogProps.submit(this.certificate);
                this.close();
                return;
            }

            if (this.certificate.fullFirebasePath && this.file) {
                firebase.storage().ref(this.certificate.fullFirebasePath).delete();
            }

            const fileRef = certificatesStorage.child(this.file.name);
            fileRef.put(this.file)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL().then((url: string) => {
                        this.certificate.url = url;
                        this.certificate.fullFirebasePath = fileRef.fullPath;
                        this.dialogProps.submit(this.certificate);
                        this.close();
                    });
                });

        }

        get isSubmitDisabled(): boolean {
            return !this.file && this.dialogProps.mode === 'create'
        }

        get buttonLabel(): string {
            return this.dialogProps.mode === 'create' ? 'Save' : 'Update';
        }

        get formLabel(): string {
            return this.dialogProps.mode === 'create' ? 'Add new certificate' : 'Update your certificate';
        }


        created(): void {
            this.certificate = this.dialogProps.populateWith ?
                this.dialogProps.populateWith as ICertificate :
                {
                    title: '',
                    url: '',
                    fbID: null,
                    fullFirebasePath: ''
                }
        }
    }
</script>

<style scoped>
</style>