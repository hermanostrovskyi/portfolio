<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="experienceRecord in allExperienceRecords" :key="experienceRecord.fbID">
                <v-card>
                    <v-card-title>{{experienceRecord.firm}}</v-card-title>
                    <v-card-subtitle>Period: {{experienceRecord.periodStart }} - {{experienceRecord.periodEnd  }}</v-card-subtitle>
                    <v-divider></v-divider>
                    <v-container fluid>
                        <p><span class="card-prop">Place: </span> {{experienceRecord.place}}</p>
                        <p><span class="card-prop">Position: </span> {{experienceRecord.position}}</p>
                        <p><span class="card-prop">Responsibility: </span> {{experienceRecord.responsibility}}</p>
                    </v-container>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn fab small color="primary" @click="onExperienceUpdate(experienceRecord)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn fab small color="error" @click="deleteExperienceItem(experienceRecord.fbID)">
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
    import {IExperience} from "@/interfaces/interfaces";
    import Experience from "@/store/modules/experience";
    import AdminDialog from "@/store/modules/adminDialog";
    import {getModule} from "vuex-module-decorators";

    const experienceStore = getModule(Experience);
    const adminDialogStore = getModule(AdminDialog);

    @Component
    export default class AdminExperience extends Vue {

        get allExperienceRecords(): IExperience[] {
            return experienceStore.allWorkExperiences;
        }

        deleteExperienceItem(fbID: string): void {
            adminDialogStore.setDialogOptions({
                componentName: 'DialogDeleteConfirmation',
                properties: {
                    mode: 'deleteConfirmation',
                    submit: experienceStore.deleteExperienceAction,
                    data: fbID
                }
            });
        }

        onExperienceUpdate(experienceRecord: IExperience): void {
            adminDialogStore.setDialogOptions({
                componentName: 'DialogExperience',
                properties: {
                    mode: 'update',
                    populateWith: {...experienceRecord},
                    submit: experienceStore.updateExperienceAction
                }
            });
        }

        created() {
            experienceStore.fetchExperienceAction();
        }

    }
</script>

<style scoped>
    .card-prop {
        font-weight: bold;
    }
</style>
