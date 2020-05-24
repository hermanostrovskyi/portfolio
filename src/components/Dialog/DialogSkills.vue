<template>
    <v-card>
        <v-card-title>
            <span class="headline">{{formLabel}}</span>
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
                        <v-overflow-btn
                                class="my-2"
                                :items="types"
                                v-model="skillData.type"
                                label="Type*"
                                target="#dropdown-example"
                        ></v-overflow-btn>
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
    import {getModule} from "vuex-module-decorators";
    import {IDialogProps, ISkill} from "@/interfaces/interfaces";
    import AdminDialog from "@/store/modules/adminDialog";

    const adminDialogStore = getModule(AdminDialog);

    @Component
    export default class DialogSkill extends Vue {
        @Prop() dialogProps: IDialogProps;
        skillData: ISkill = null;
        types: string[] = ['Main', 'Tools']


        get buttonLabel(): string {
            return this.dialogProps.mode === 'create' ? 'Save' : 'Update';
        }

        get formLabel(): string {
            return this.dialogProps.mode === 'create' ? 'Add new skill' : 'Update your skill';
        }


        created(): void {
            this.skillData = this.dialogProps.populateWith ?
                this.dialogProps.populateWith as ISkill : {fbID: null, name: '', skillValue: 0, type: ''}
        }

    }
</script>

<style scoped>
</style>
