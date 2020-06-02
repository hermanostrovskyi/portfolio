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
                                label="Firm*"
                                v-model='experienceRecord.firm'
                                required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                                label="Place*"
                                v-model='experienceRecord.place'
                                required></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-menu
                                ref="fromPeriodMenu"
                                v-model="startPeriodMenu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        v-model="experienceRecord.periodStart"
                                        label="Start"
                                        prepend-icon="mdi-calendar"
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker type="month" v-model="experienceRecord.periodStart" no-title
                                           @input="startPeriodMenu = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="6">
                        <v-menu
                                ref="toPeriodMenu"
                                v-model="endPeriodMenu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        v-model="experienceRecord.periodEnd"
                                        label="End"
                                        prepend-icon="mdi-calendar"
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker type="month" v-model="experienceRecord.periodEnd" no-title
                                           @input="endPeriodMenu = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                                label="Position*"
                                v-model='experienceRecord.position'
                                required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                                label="Responsibility*"
                                v-model='experienceRecord.responsibility'
                                required>
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#000" text @click="close">Close</v-btn>
            <v-btn
                    color="#ffc400"
                    text
                    @click="submit() ">{{buttonLabel}}
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {getModule} from "vuex-module-decorators";
    import AdminDialog from "@/store/modules/adminDialog";
    import {IDialogProps, IExperience} from "@/interfaces/interfaces";
    const adminDialogStore = getModule(AdminDialog);


    @Component
    export default class DialogExperienceCreate extends Vue {
        @Prop() dialogProps: IDialogProps;
        startPeriodMenu: boolean = false;
        endPeriodMenu: boolean = false;
        experienceRecord: IExperience = null;

        close() {
            adminDialogStore.hideAdminDialog();
        }

        submit() {
            this.dialogProps.submit(this.experienceRecord);
            this.close();
        }


        get buttonLabel(): string {
            return this.dialogProps.mode === 'create' ? 'Save' : 'Update';
        }

        get formLabel(): string {
            return this.dialogProps.mode === 'create' ? 'Add new work experience' : 'Update your work experience';
        }


        created() {
            this.experienceRecord = this.dialogProps.populateWith  ?
                this.dialogProps.populateWith as IExperience :
                {
                    fbID: null,
                    firm: '',
                    place: '',
                    position: '',
                    responsibility: '',
                    periodStart: null,
                    periodEnd: null
                }
        }


    }
</script>

<style scoped>
</style>
