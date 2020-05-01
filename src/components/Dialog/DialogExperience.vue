<template>
    <v-card>
        <v-card-title>
            <span class="headline">Experience Info</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
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
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn
                    color="blue darken-1"
                    text
                    @click="submitMethod() ">{{buttonLabel}}
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {getModule} from "vuex-module-decorators";
    import Experience from "@/store/modules/experience";
    import AdminDialog from "@/store/modules/adminDialog";
    import {IWorkExperienceRecord} from "@/interfaces/interfaces";
    import {formatDate, generateID} from "@/helper/helperFunctions";

    const experienceStore = getModule(Experience);
    const adminDialogStore = getModule(AdminDialog);


    @Component
    export default class DialogExperienceCreate extends Vue {
        @Prop() dialogProps: any;
        startPeriodMenu: boolean = false;
        endPeriodMenu: boolean = false;

        experienceRecord: IWorkExperienceRecord = {
            id: null,
            place: '',
            position: '',
            responsibility: '',
            periodStart: null,
            periodEnd: null
        }

        close() {
            adminDialogStore.hideAdminDialog();
            adminDialogStore.setDialogComponentAction(null);
            adminDialogStore.setDialogPropertiesAction(null);
        }

        onExperienceSave(): void {
            const experienceToSave = {
                ...this.experienceRecord,
                periodStart: new Date(this.experienceRecord.periodStart),
                periodEnd: new Date(this.experienceRecord.periodEnd),
                id: generateID()
            };

            experienceStore.addNewExperienceRecord(experienceToSave);
            this.close();
        }


        onExperienceUpdate(): void {
            const experienceToUpdate = {
                ...this.experienceRecord,
                periodStart: new Date(this.experienceRecord.periodStart),
                periodEnd: new Date(this.experienceRecord.periodEnd)
            };

            console.log(experienceToUpdate);
            experienceStore.updateExistingExperienceRecord(experienceToUpdate);
            this.close();
        }



        get buttonLabel(): string {
            return this.dialogProps.mode === 'create' ? 'Save' : 'Update';
        }

        get submitMethod(): any {
            return this.dialogProps.mode === 'create' ? this.onExperienceSave : this.onExperienceUpdate;
        }

        created() {
            if (this.dialogProps.populateWith) {
                const originStartDate = this.dialogProps.populateWith.periodStart;
                const originEndDate = this.dialogProps.populateWith.periodEnd;

                this.experienceRecord = {...this.dialogProps.populateWith, periodStart: formatDate(originStartDate), periodEnd: formatDate(originEndDate)};
            }
        }


    }
</script>

<style scoped>
</style>
