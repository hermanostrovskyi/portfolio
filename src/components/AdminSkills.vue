<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="skill in allSkills" :key="skill.id">
                <v-card>
                    <v-card-title>{{skill.name}}</v-card-title>
                    <v-container>
                        <v-progress-linear class="progress-bar" rounded height="25px" :value="skill.skillValue">
                            <strong>{{skill.skillValue}} %</strong>
                        </v-progress-linear>
                    </v-container>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn fab small color="primary">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-btn fab small color="error" @click="deleteSkill(skill.id)">
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
    import Skill from "@/store/modules/skill";
    import {getModule} from "vuex-module-decorators";

    const skillStore = getModule(Skill);

    @Component
    export default class AdminSkills extends Vue {
        get allSkills(): ISkill[] {
            return skillStore.allSkills;
        }

        deleteSkill(id: number): void {
            skillStore.deleteExistingSkill(id);
        }
    }
</script>

<style scoped>
    .progress-bar {
        color: white;
    }
</style>
