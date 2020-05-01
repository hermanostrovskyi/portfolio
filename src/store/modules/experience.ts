import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {IWorkExperienceRecord} from "@/interfaces/interfaces";
import Store from '../index';
import {generateID} from "@/helper/helperFunctions";

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
        this.workExperiences.push(experienceRecord);
    }

    @Mutation
    public deleteExperience(id: string): void {
        const index = this.workExperiences.findIndex((experienceRecord: IWorkExperienceRecord) => experienceRecord.id === id);
        this.workExperiences.splice(index, 1);
    }

    @Mutation
    updateExperience(experienceRecord: IWorkExperienceRecord): void {
        this.workExperiences = this.workExperiences.map((workExperience: IWorkExperienceRecord) => {
            if(workExperience.id === experienceRecord.id) {
                return {...experienceRecord};
            }
            return workExperience;
        })
    }

    @Action
    public addNewExperienceRecord(experienceRecord: IWorkExperienceRecord): void {
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
