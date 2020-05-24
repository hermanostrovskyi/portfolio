<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
                <v-flex  xs12 sm6 md6 lg4 v-for="skill in allSkills" :key="skill.fbID">
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

                                <v-btn fab small color="primary" @click="pickUpdatedSkill(skill)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>

                                <v-btn fab small color="error" @click="deleteSkill(skill.fbID)" >
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
    import {ISkill} from "@/interfaces/interfaces";
    import Skill from "@/store/modules/skill";
    import AdminDialog from "@/store/modules/adminDialog";
    import {getModule} from "vuex-module-decorators";

    const skillStore = getModule(Skill);
    const adminDialogStore = getModule(AdminDialog);

    @Component
    export default class AdminSkills extends Vue {

        get allSkills(): ISkill[] {
            return skillStore.allSkills;
        }

        deleteSkill(fbId: string): void {
            adminDialogStore.setDialogOptions({
                componentName: 'DialogDeleteConfirmation',
                properties: {
                    mode: 'deleteConfirmation',
                    submit: skillStore.deleteSkillAction,
                    data: fbId
                }
            });
        }

        pickUpdatedSkill(updatedSkill: ISkill): void {
            adminDialogStore.setDialogOptions({
                componentName: 'DialogSkills',
                properties: {
                    mode: 'update',
                    populateWith: {...updatedSkill},
                    submit: skillStore.updateSkillAction
                }
            });
        }

        created() {
            skillStore.fetchSkills();
        }
    }
</script>

<style scoped>
    .progress-bar {
        color: white;
    }

    .slide-enter {
        opacity: 0;
    }

    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
        transition: opacity .5s;
    }

    .slide-leave {

    }

    .slide-move {
        transition: transform 1s;
    }

    .slide-leave-active {
        animation: slide-out 1s ease-out forwards;
        transition: opacity 1s;
        opacity: 0;
        position: absolute;
    }

    @keyframes slide-in {
        from {
            transform: translateY(20px);
        }

        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(20px);
        }
    }
</style>
