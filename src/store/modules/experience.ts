import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {ICreateExperienceRecord, IWorkExperienceRecord} from "@/interfaces/interfaces";
import Store from '../index';
import {generateID} from "@/helper/idGenerator";

@Module({
    dynamic: true,
    store: Store,
    name: "Experience",
    namespaced: true
})
class Experience extends VuexModule {
    public workExperiences: IWorkExperienceRecord[] = [
        {
            id: generateID(),
            place: 'Firm First',
            periodStart: new Date('2014-01-01'),
            periodEnd: new Date('2015-01-01'),
            position: 'designer assistant',
            responsibility: 'Make coffee'
        },
        {
            id: generateID(), place: 'UPS', periodStart: new Date('2015-01-01'),
            periodEnd: new Date('2016-01-01'),
            position: 'designer assistant',
            responsibility: 'Make coffee'
        },
        {
            id: generateID(), place: 'Apple', periodStart: new Date('2016-01-01'),
            periodEnd: new Date('2017-01-01'),
            position: 'designer assistant',
            responsibility: 'Make coffee'
        },
        {
            id: generateID(), place: 'UIDesignSolutions GmbH', periodStart: new Date('2017-01-01'),
            periodEnd: new Date('2018-01-01'),
            position: 'designer assistant',
            responsibility: 'Make coffee'
        },

        {
            id: generateID(), place: 'Germany KG', periodStart: new Date('2019-01-01'),
            periodEnd: new Date('2020-01-01'),
            position: 'designer assistant',
            responsibility: 'Make coffee'
        }
    ];


    get allWorkExperiences(): IWorkExperienceRecord[] {
        return this.workExperiences;
    }


    @Mutation
    public addExperience(experienceRecord: IWorkExperienceRecord): void {
        const id: string = generateID();
        const experience = {...experienceRecord, id}
        this.workExperiences.push(experience);
    }

    @Mutation
    public deleteExperience(id: string): void {
        const index = this.workExperiences.findIndex((experienceRecord: IWorkExperienceRecord) => experienceRecord.id === id);
        this.workExperiences.splice(index, 1);
    }

    @Mutation
    updateExperience(experienceRecord: IWorkExperienceRecord): void {
        const index = this.workExperiences.findIndex((experienceItem: IWorkExperienceRecord) => experienceItem.id === experienceRecord.id);
        this.workExperiences[index] = experienceRecord;
    }

    @Action
    public addNewExperienceRecord(experienceRecord: ICreateExperienceRecord): void {
        this.context.commit('addExperience', experienceRecord);
    }

    @Action
    public deleteExistingExperienceRecord(id: string): void {
        this.context.commit('deleteExperience', id);
    }

    @Action
    public updateExistingExperienceRecord(experienceRecord: IWorkExperienceRecord): void {
        this.context.commit('updateExperience', experienceRecord);
    }

}


export default Experience;
