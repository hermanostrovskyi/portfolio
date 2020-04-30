import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';
import Store from '../index';

@Module({
    dynamic: true,
    store: Store,
    name: "adminDialog",
    namespaced: true
})
class AdminDialog extends VuexModule {
    public isDialogVisible: boolean = false;
    public dialogComponent: string = null;
    public dialogProperties: any = null;

    get dialogVisibility(): boolean {
        return this.isDialogVisible;
    }

    get contentComponent(): string {
        return this.dialogComponent;
    }

    get dialogProps(): string {
        return this.dialogProperties;
    }


    @Mutation
    public changeDialogVisibility(dialogVisible: boolean): void {
        this.isDialogVisible = dialogVisible;
    }

    @Mutation
    public setDialogComponent(name: string): void {
        this.dialogComponent = name;
    }

    @Mutation
    public setDialogProperties(props: any): void {
        this.dialogProperties = props;
    }

    @Action
    public showAdminDialog(): void {
        this.context.commit('changeDialogVisibility', true);
    }

    @Action
    public hideAdminDialog(): void {
        this.context.commit('changeDialogVisibility', false);
    }

    @Action
    public setDialogComponentAction(name: string): void {
        this.context.commit('setDialogComponent', name);
    }

    @Action
    public setDialogPropertiesAction(props: any): void {
        this.context.commit('setDialogProperties', props);
    }

}


export default AdminDialog;
