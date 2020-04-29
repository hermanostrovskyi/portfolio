<template>
    <v-card>
        <v-card-title>
            <span class="headline">Skill Info</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                v-if="updatedSkill"
                                label="Title*"
                                v-model='updatedSkill.name'
                                required></v-text-field>
                        <v-text-field
                                v-else
                                label="Title*"
                                v-model='skillData.name'
                                required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                                v-if="updatedSkill"
                                label="Value*"
                                v-model='updatedSkill.skillValue'
                                required></v-text-field>
                        <v-text-field
                                v-else
                                label="Value*"
                                v-model='skillData.skillValue'
                                required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn
                    color="blue darken-1"
                    text
                    @click="updatedSkill ?  onSkillUpdate() : onSkillSave() ">{{updatedSkill ? 'Update' : 'Save'}}
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import Skill from "@/store/modules/skill";
    import {getModule} from "vuex-module-decorators";
    import {ICreateSkillData, ISkill} from "@/interfaces/interfaces";
    import AdminDialog from "@/store/modules/adminDialog";

    const skillStore = getModule(Skill);
    const adminDialogStore = getModule(AdminDialog);

    @Component
    export default class DialogSkill extends Vue {
        skillData: ICreateSkillData = {
            name: '',
            skillValue: 0
        }

        close() {
            adminDialogStore.hideAdminDialog();
        }

        onSkillSave(): void {
            skillStore.addNewSkill(this.skillData);
            this.resetValues();
            this.close();
        }

        onSkillUpdate(): void {
            skillStore.updateExistingSkill(this.updatedSkill);
            this.close();
        }

        resetValues() {
            this.skillData.name = '';
            this.skillData.skillValue = 0;
        }

        get updatedSkill(): ISkill {
            return skillStore.updatedSkill;
        }

    }
</script>

<style scoped>
</style>
