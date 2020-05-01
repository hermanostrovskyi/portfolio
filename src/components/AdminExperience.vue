<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="experienceRecord in allExperienceRecords" :key="experienceRecord.id">
                <v-card>
                    <v-card-title>{{experienceRecord.place}}</v-card-title>
                    <v-card-subtitle>Period: {{experienceRecord.periodStart | dateFormat('MM.YY')}} -
                        {{experienceRecord.periodEnd | dateFormat('MM.YY') }}
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-container fluid>
                        <p><span class="card-prop">Position: </span> {{experienceRecord.position}}</p>
                        <p><span class="card-prop">Responsibility: </span> {{experienceRecord.responsibility}}</p>
                    </v-container>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn fab small color="primary" @click="onExperienceUpdate(experienceRecord)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-btn fab small color="error" @click="deleteExperienceItem(experienceRecord.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";
    import {IWorkExperienceRecord} from "@/interfaces/interfaces";
    import Experience from "@/store/modules/experience";
    import AdminDialog from "@/store/modules/adminDialog";
    import {getModule} from "vuex-module-decorators";

    const experienceStore = getModule(Experience);
    const adminDialogStore = getModule(AdminDialog);

    @Component
    export default class AdminExperience extends Vue {

        get allExperienceRecords(): IWorkExperienceRecord[] {
            return experienceStore.allWorkExperiences;
        }

        deleteExperienceItem(id: string): void {
            experienceStore.deleteExistingExperienceRecord(id);
        }

        onExperienceUpdate(experienceRecord: IWorkExperienceRecord): void {
            adminDialogStore.showAdminDialog();
            adminDialogStore.setDialogComponentAction('DialogExperience');
            adminDialogStore.setDialogPropertiesAction({mode: 'update', populateWith: {...experienceRecord}})
        }

    }
</script>

<style scoped>
    .card-prop {
        font-weight: bold;
    }
</style>
