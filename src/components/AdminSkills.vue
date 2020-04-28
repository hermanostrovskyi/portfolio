<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="skill in skills" :key="skill.id" >
                <v-card>
                    <v-card-title>{{skill.name}}</v-card-title>
                    <v-container>
                        <v-progress-linear  class="progress-bar" rounded height="25px" :value="skill.skillValue">
                            <strong>{{skill.skillValue}} %</strong>
                        </v-progress-linear>
                    </v-container>
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
    import {ISkill} from "@/interfaces/interfaces";

    @Component
    export default class AdminSkills extends Vue {
        skills: ISkill[] = [
            {id: 1, name: 'Photoshop', skillValue: 75},
            {id: 2, name: 'Illustrator', skillValue: 55},
            {id: 3, name: 'Mockup', skillValue: 87},
            {id: 4, name: 'Mobile', skillValue: 34},
            {id: 5, name: 'Photo', skillValue: 70}
        ]
    }
</script>

<style scoped>
    .progress-bar {
        color: white;
    }
</style>
