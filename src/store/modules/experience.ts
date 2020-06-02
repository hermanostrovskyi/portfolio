import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {IExperience} from "@/interfaces/interfaces";
import Store from '../index';
import {generateID, getFirebaseDB, retrieveData} from "@/helper/helperFunctions";

const dbExperience = getFirebaseDB().ref('data/experience');

@Module({
    dynamic: true,
    store: Store,
    name: "Experience",
    namespaced: true
})
class Experience extends VuexModule {
    public workExperience: IExperience[] = [];

    get allWorkExperiences(): IExperience[] {
        return this.workExperience;
    }

    @Mutation
    public setWorkExperience(workExperience: IExperience[]): void {
        this.workExperience = [...workExperience];
    }

    @Mutation
    public addExperience(newExperience: IExperience): void {
        this.workExperience.push(newExperience);
    }

    @Mutation
    public deleteExperience(fbID: string): void {
        const index = this.workExperience.findIndex((experienceRecord: IExperience) => experienceRecord.fbID === fbID);
        this.workExperience.splice(index, 1);
    }

    @Mutation
    updateExperience(updatedExperience: IExperience): void {
        this.workExperience = this.workExperience.map((experience: IExperience) => {
            if (experience.fbID === updatedExperience.fbID) {
                return {...updatedExperience};
            }
            return experience;
        });
    }

    @Action
    public fetchExperienceAction() {
        dbExperience
            .once('value')
            .then(snapshot => {
                const experience: IExperience[] = retrieveData(snapshot.val()) as IExperience[];
                if (experience) {
                    this.context.commit('setWorkExperience', experience);
                }
            })
    }

    @Action
    public addExperienceAction(experience: IExperience) {
        dbExperience
            .push(experience)
            .then(res => this.context.commit('addExperience', {...experience, fbID: res.key}));
    }

    @Action
    public deleteExperienceAction(fbID: string): void {
        dbExperience
            .child(fbID)
            .set(null)
            .then(() => this.context.commit('deleteExperience', fbID));
    }

    @Action
    public updateExperienceAction(experience: IExperience): void {
        dbExperience
            .child(experience.fbID)
            .set(experience)
            .then(() => this.context.commit('updateExperience', experience));
    }

    @Action
    public updateExperienceDemoAction(experience: IExperience): void {
        this.context.commit('updateExperience', experience);
    }

    @Action
    public deleteExperienceDemoAction(fbID: string): void {
        this.context.commit('deleteExperience', fbID);
    }

    @Action
    public addExperienceDemoAction(experience: IExperience) {
        const id = generateID();
        this.context.commit('addExperience', {...experience, fbID: id});
    }


}


export default Experience;
