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
                                label="Title*"
                                v-model='skillData.name'
                                required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                                label="Value*"
                                v-model='skillData.skillValue'
                                required>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn color="blue darken-1" text @click="submit">{{buttonLabel}}</v-btn>
        </v-card-actions>
    </v-card>

</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'
    import Skill from "@/store/modules/skill";
    import {getModule} from "vuex-module-decorators";
    import {ISkill} from "@/interfaces/interfaces";
    import AdminDialog from "@/store/modules/adminDialog";

    const skillStore = getModule(Skill);
    const adminDialogStore = getModule(AdminDialog);

    @Component
    export default class DialogSkill extends Vue {
        @Prop() dialogProps: any;

        skillData: ISkill = {
            fbID: null,
            name: '',
            skillValue: 0
        }

        close() {
            adminDialogStore.hideAdminDialog();
            adminDialogStore.setDialogComponentAction(null);
            adminDialogStore.setDialogPropertiesAction(null);
        }

        submit() {
            this.dialogProps.submit(this.skillData);
            this.close();

            // this.dialogProps.mode === 'create' ? skillStore.addSkillAction(this.skillData) : skillStore.updateSkillAction(this.skillData);
        }
        //
        // onSkillSave(): void {
        //     skillStore.addSkillAction(this.skillData);
        //     this.close();
        // }
        //
        // onSkillUpdate(): void {
        //     skillStore.updateSkillAction(this.skillData);
        //     this.close();
        // }

        get buttonLabel(): string {
            return this.dialogProps.mode === 'create' ? 'Save' : 'Update';
        }

        // get submitMethod(): any {
        //     return this.dialogProps.mode === 'create' ? this.onSkillSave : this.onSkillUpdate;
        // }


        created() {
            if (this.dialogProps.populateWith) {
                this.skillData = this.dialogProps.populateWith;
            }
        }

    }
</script>

<style scoped>
</style>
