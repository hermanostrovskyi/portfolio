<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formLabel }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
                label="Title*"
                v-model='portfolioItem.title'
                required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
                label="Description*"
                v-model='portfolioItem.description'
                required>
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field
                label="Priority*"
                v-model='portfolioItem.prior'
                required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-file-input
                label="File input"
                v-model="file"
                filled
                prepend-icon="mdi-file-image"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="#000" text @click="close">Close</v-btn>
      <v-btn :disabled="isSubmitDisabled" color="#ffc400" text @click="submit">{{ buttonLabel }}</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {getModule} from "vuex-module-decorators";
import {IDialogProps, IPortfolioItem} from "@/interfaces/interfaces";
import AdminDialog from "@/store/modules/adminDialog";
import firebase from "firebase";

const adminDialogStore = getModule(AdminDialog);
const portfolioStorage = firebase.storage().ref('images/portfolio');

@Component
export default class DialogSkill extends Vue {
  @Prop() dialogProps: IDialogProps;
  file: File = null;
  portfolioItem: IPortfolioItem = null;

  close(): void {
    adminDialogStore.hideAdminDialog();
  }

  submit(): void {
    this.portfolioItem.prior = +this.portfolioItem.prior;
    if (this.portfolioItem.fullFirebasePath && !this.file) {
      this.dialogProps.submit(this.portfolioItem);
      this.close();
      return;
    }

    if (this.portfolioItem.fullFirebasePath && this.file) {
      firebase.storage().ref(this.portfolioItem.fullFirebasePath).delete();
    }

    const fileRef = portfolioStorage.child(this.file.name);
    fileRef.put(this.file)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then((url: string) => {
            this.portfolioItem.url = url;
            this.portfolioItem.fullFirebasePath = fileRef.fullPath;
            this.dialogProps.submit(this.portfolioItem);
            this.close();
          });
        });

  }

  get isSubmitDisabled(): boolean {
    return !this.file && this.dialogProps.mode === 'create'
  }

  get buttonLabel(): string {
    return this.dialogProps.mode === 'create' ? 'Save' : 'Update';
  }

  get formLabel(): string {
    return this.dialogProps.mode === 'create' ? 'Add new item to portfolio' : 'Update your portfolio';
  }


  created(): void {
    this.portfolioItem = this.dialogProps.populateWith ?
        this.dialogProps.populateWith as IPortfolioItem :
        {
          title: '',
          prior: null,
          description: '',
          url: '',
          fbID: null,
          fullFirebasePath: ''
        }
  }
}
</script>

<style scoped>
</style>
