<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="experienceRecord in allExperienceRecords" :key="experienceRecord.id">
                <v-card>
                    <v-card-title>{{experienceRecord.work}}</v-card-title>
                    <p>Period: {{experienceRecord.period}}</p>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn fab small color="primary">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-btn fab small color="error">
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
    import {getModule} from "vuex-module-decorators";

    const experienceStore = getModule(Experience);

    @Component
    export default class AdminExperience extends Vue {
        get allExperienceRecords(): IWorkExperienceRecord[] {
            return experienceStore.allWorkExperiences;
        }

    }
</script>

<style scoped>

</style>
