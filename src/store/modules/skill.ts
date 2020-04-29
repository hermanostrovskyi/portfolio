import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {ICreateSkillData, ISkill} from "@/interfaces/interfaces";
import Store from '../index';
import {generateID} from "@/helper/idGenerator";

@Module({
    dynamic: true,
    store: Store,
    name: "skill",
    namespaced: true
})
class Skill extends VuexModule {
    public skills: ISkill[] = [
        {id: generateID(), name: 'Photoshop', skillValue: 75},
        {id: generateID(), name: 'Illustrator', skillValue: 55},
        {id: generateID(), name: 'Mockup', skillValue: 87},
        {id: generateID(), name: 'Mobile', skillValue: 34},
        {id: generateID(), name: 'Photo', skillValue: 70}
    ];

    public updatedSkill: ISkill = null;


    get allSkills(): ISkill[] {
        return this.skills;
    }

    get updateSkillItem(): ISkill {
        return this.updatedSkill;
    }


    @Mutation
    public addSkill(skillData: ICreateSkillData): void {
        const id: string = generateID();
        const skill = {...skillData, id}
        this.skills.push(skill);
    }

    @Mutation
    public deleteSkill(id: string): void {
        const index = this.skills.findIndex((skill: ISkill) => skill.id === id);
        this.skills.splice(index, 1);
    }

    @Mutation
    updateSkill(skill: ISkill): void {
        const skillToUpdate = this.skills.find((skillItem: ISkill) => skillItem.id === skill.id);
        skillToUpdate.skillValue = skill.skillValue;
        skillToUpdate.name = skill.name;
    }

    @Mutation
    public setSkillToUpdate(skill: ISkill): void {
        this.updatedSkill = {...skill};
    }

    @Mutation
    public unsetSkillToUpdate(): void {
        this.updatedSkill = null;
    }


    @Action
    public addNewSkill(skillData: ICreateSkillData): void {
        this.context.commit('addSkill', skillData);
    }

    @Action
    public deleteExistingSkill(id: string): void {
        this.context.commit('deleteSkill', id);
    }

    @Action
    public updateExistingSkill(skill: ISkill): void {
        this.context.commit('updateSkill', skill);
        this.context.dispatch('unsetUpdatedSkill');
    }

    @Action
    public setUpdatedSkill(skill: ISkill): void {
        this.context.commit('setSkillToUpdate', skill);
    }

    @Action
    public unsetUpdatedSkill(): void {
        this.context.commit('unsetSkillToUpdate');
    }

}


export default Skill;
