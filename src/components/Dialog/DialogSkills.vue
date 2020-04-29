<template>
    <v-card>
        <v-card-title>
            <span class="headline">Skill Info</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Title*" v-model='skill.name' required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Value*" v-model='skill.skillValue' required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="onSkillSave()">Save</v-btn>
        </v-card-actions>
    </v-card>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {eventBus} from '@/main';
    import Skill from "@/store/modules/skill";
    import {getModule} from "vuex-module-decorators";

    const skillStore = getModule(Skill);

    @Component
    export default class DialogSkill extends Vue {
        skill = {
            name: '',
            skillValue: 0
        }

        closeDialog(): void {
            eventBus.$emit('adminDialogClose');
        }

        onSkillSave(): void {
            skillStore.addNewSkill(this.skill);
            this.closeDialog();
            this.resetValues();
        }

        resetValues() {
            this.skill.name = '';
            this.skill.skillValue = 0;
        }


    }
</script>

<style scoped>
</style>
