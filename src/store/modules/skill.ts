import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {ISkill} from "@/interfaces/interfaces";
import Store from '../index';
import {generateID} from "@/helper/helperFunctions";

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

    get allSkills(): ISkill[] {
        return this.skills;
    }

    @Mutation
    public addSkill(skill: ISkill): void {
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


    @Action
    public addNewSkill(skill: ISkill): void {
        this.context.commit('addSkill', skill);
    }

    @Action
    public deleteExistingSkill(id: string): void {
        this.context.commit('deleteSkill', id);
    }

    @Action
    public updateExistingSkill(skill: ISkill): void {
        this.context.commit('updateSkill', skill);
    }

}


export default Skill;
