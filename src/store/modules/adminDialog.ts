import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';
import Store from '../index';
import Skill from "@/store/modules/skill";
import {getModule} from "vuex-module-decorators";

const skillStore = getModule(Skill);

@Module({
    dynamic: true,
    store: Store,
    name: "adminDialog",
    namespaced: true
})
class AdminDialog extends VuexModule {
    public isDialogVisible: boolean = false;

    get dialogVisibility(): boolean {
        return this.isDialogVisible;
    }

    @Mutation
    public changeDialogVisibility(dialogVisible: boolean): void {
        this.isDialogVisible = dialogVisible;
    }

    @Action
    public showAdminDialog(): void {
        this.context.commit('changeDialogVisibility', true);
    }

    @Action
    public hideAdminDialog(): void {
        this.context.commit('changeDialogVisibility', false);
    }

}


export default AdminDialog;
