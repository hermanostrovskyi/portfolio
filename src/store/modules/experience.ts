import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {IExperience} from "@/interfaces/interfaces";
import Store from '../index';
import {getFirebaseDB, retrieveData} from "@/helper/helperFunctions";

const db = getFirebaseDB();

@Module({
    dynamic: true,
    store: Store,
    name: "Experience",
    namespaced: true
})
class Experience extends VuexModule {
    public workExperience: IExperience[] = [];
    // public workExperiences: IWorkExperienceRecord[] = [
    //     {
    //         id: generateID(),
    //         place: 'Firm First',
    //         periodStart: new Date('2014-01-01'),
    //         periodEnd: new Date('2015-01-01'),
    //         position: 'designer assistant',
    //         responsibility: 'Make coffee'
    //     },
    //     {
    //         id: generateID(), place: 'UPS', periodStart: new Date('2015-01-01'),
    //         periodEnd: new Date('2016-01-01'),
    //         position: 'designer assistant',
    //         responsibility: 'Make coffee'
    //     },
    //     {
    //         id: generateID(), place: 'Apple', periodStart: new Date('2016-01-01'),
    //         periodEnd: new Date('2017-01-01'),
    //         position: 'designer assistant',
    //         responsibility: 'Make coffee'
    //     },
    //     {
    //         id: generateID(), place: 'UIDesignSolutions GmbH', periodStart: new Date('2017-01-01'),
    //         periodEnd: new Date('2018-01-01'),
    //         position: 'designer assistant',
    //         responsibility: 'Make coffee'
    //     },
    //
    //     {
    //         id: generateID(), place: 'Germany KG', periodStart: new Date('2019-01-01'),
    //         periodEnd: new Date('2020-01-01'),
    //         position: 'designer assistant',
    //         responsibility: 'Make coffee'
    //     }
    // ];


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
        })
    }

    @Action
    public fetchExperienceAction() {
        db.ref('data/experience')
            .once('value')
            .then(snapshot => {
                const experience: IExperience[] = retrieveData(snapshot.val()) as IExperience[];
                this.context.commit('setWorkExperience', experience);
            })
    }

    @Action
    public addExperienceAction(experience: IExperience) {
        db.ref('data/experience')
            .push(experience)
            .then(res => this.context.commit('addExperience', {...experience, fbID: res.key}));
    }

    @Action
    public deleteExperienceAction(fbID: string): void {
        db.ref(`data/experience`)
            .child(fbID)
            .set(null)
            .then(() => this.context.commit('deleteExperience', fbID));
    }

    @Action
    public updateExperienceAction(experience: IExperience): void {
        db.ref('data/experience')
            .child(experience.fbID)
            .set(experience)
            .then(() => this.context.commit('updateExperience', experience));
    }

}


export default Experience;
