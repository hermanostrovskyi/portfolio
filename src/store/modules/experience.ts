import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {IWorkExperienceRecord} from "@/interfaces/interfaces";
import Store from '../index';

@Module({
    dynamic: true,
    store: Store,
    name: "Experience",
    namespaced: true
})
class Experience extends VuexModule {
    public workExperiences: IWorkExperienceRecord[] = [
        {id: 1, work: 'Work1', period: '2014-2015'},
        {id: 2, work: 'Illustrator', period: '2015-2016'},
        {id: 3, work: 'Mockup', period: '2016-2017'},
        {id: 4, work: 'Mobile', period: '2017-2018'},
        {id: 5, work: 'Photo', period: '2018-2019'}
    ];


    get allWorkExperiences(): IWorkExperienceRecord[] {
        return this.workExperiences;
    }


    @Mutation
    public addExperience(experienceRecord: IWorkExperienceRecord): void {
        this.workExperiences.push(experienceRecord);
    }

    @Mutation
    public deleteExperience(id: number): void {
        const index = this.workExperiences.findIndex((experienceRecord: IWorkExperienceRecord) => experienceRecord.id === id);
        this.workExperiences.splice(index, 1);
    }

    @Mutation
    updateExperience(experienceRecord: IWorkExperienceRecord): void {
        const index = this.workExperiences.findIndex((experienceItem: IWorkExperienceRecord) => experienceItem.id === experienceRecord.id);
        this.workExperiences[index] = experienceRecord;
    }

    @Action
    public addNewExperienceRecord(experienceRecord: IWorkExperienceRecord): void {
        this.context.commit('addExperience', experienceRecord);
    }

    @Action
    public deleteExistingExperienceRecord(id: number): void {
        this.context.commit('deleteExperience', id);
    }

    @Action
    public updateExistingExperienceRecord(experienceRecord: IWorkExperienceRecord): void {
        this.context.commit('updateExperience', experienceRecord);
    }

}


export default Experience;
