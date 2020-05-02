<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="skill in allSkills" :key="skill.fbID">
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

                        <v-btn fab small color="error" @click="deleteSkill(skill.fbID)">
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
            skillStore.deleteSkillAction(fbId);
        }

        pickUpdatedSkill(updatedSkill: ISkill): void {
            adminDialogStore.showAdminDialog();
            adminDialogStore.setDialogComponentAction('DialogSkills');
            adminDialogStore.setDialogPropertiesAction({
                    mode: 'update',
                    populateWith: {...updatedSkill},
                    submit: skillStore.updateSkillAction
                }
            )
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
</style>
