import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';
import Store from '../index';
import {IDialogOptions, IDialogProps} from "@/interfaces/interfaces";

@Module({
    dynamic: true,
    store: Store,
    name: "adminDialog",
    namespaced: true
})
class AdminDialog extends VuexModule {
    public isDialogVisible: boolean = false;
    public dialogComponent: string = null;
    public dialogProperties: IDialogProps = null;

    get dialogVisibility(): boolean {
        return this.isDialogVisible;
    }

    get contentComponent(): string {
        return this.dialogComponent;
    }

    get dialogProps(): IDialogProps {
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
    public setDialogProperties(props: IDialogProps): void {
        this.dialogProperties = props;
    }

    @Action
    public showAdminDialog(): void {
        this.context.commit('changeDialogVisibility', true);
    }

    @Action
    public hideAdminDialog(): void {
        this.context.commit('changeDialogVisibility', false);
        this.context.commit('setDialogComponent', null);
        this.context.commit('setDialogProperties', null);
    }

    @Action
    public setDialogOptions(dialogOptions: IDialogOptions): void {
        this.context.dispatch('showAdminDialog');
        this.context.commit('setDialogComponent', dialogOptions.componentName);
        this.context.commit('setDialogProperties', dialogOptions.properties);
    }

}


export default AdminDialog;
