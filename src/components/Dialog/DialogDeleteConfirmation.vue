<template>
    <v-card>
        <v-card-title class="headline">Are you sure ?</v-card-title>

        <v-card-text>
           This action will completely remove the item
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="disagree" >Disagree</v-btn>
            <v-btn color="green darken-1" text @click="agree">Agree</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import {getModule} from "vuex-module-decorators";
    import AdminDialog from "@/store/modules/adminDialog";
    import {IDialogProps} from "@/interfaces/interfaces";
    const adminDialogStore = getModule(AdminDialog);

    @Component
    export default class DialogExperienceCreate extends Vue {
        @Prop() dialogProps: IDialogProps;

        disagree() {
            adminDialogStore.hideAdminDialog();
        }

        agree() {
           this.dialogProps.submit(this.dialogProps.data);
            adminDialogStore.hideAdminDialog();
        }
    }
</script>
