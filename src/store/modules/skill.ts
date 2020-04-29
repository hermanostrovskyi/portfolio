import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {ISkill} from "@/interfaces/interfaces";
import Store from '../index';

@Module({
    dynamic: true,
    store: Store,
    name: "Skill",
    namespaced: true
})
class Skill extends VuexModule {
    public skills: ISkill[] = [
        {id: 1, name: 'Photoshop', skillValue: 75},
        {id: 2, name: 'Illustrator', skillValue: 55},
        {id: 3, name: 'Mockup', skillValue: 87},
        {id: 4, name: 'Mobile', skillValue: 34},
        {id: 5, name: 'Photo', skillValue: 70}
    ];


    get allSkills(): ISkill[] {
        return this.skills;
    }


    @Mutation
    public addSkill(skill: ISkill): void {
        this.skills.push(skill);
    }

    @Mutation
    public deleteSkill(id: number): void {
        const index = this.skills.findIndex((skill: ISkill) => skill.id === id);
        this.skills.splice(index, 1);
    }

    @Mutation
    updateSkill(skill: ISkill): void {
        const index = this.skills.findIndex((skillItem: ISkill) => skillItem.id === skill.id);
        this.skills[index] = skill;
    }

    @Action
    public addNewSkill(skill: ISkill): void {
        this.context.commit('addSkill', skill);
    }

    @Action
    public deleteExistingSkill(id: number): void {
        this.context.commit('deleteSkill', id);
    }

    @Action
    public updateExistingSkill(skill: ISkill): void {
        this.context.commit('updateSkill', skill);
    }

}


export default Skill;
