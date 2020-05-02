import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {ISkill} from "@/interfaces/interfaces";
import Store from '../index';
import {getFirebaseDB, retrieveData} from "@/helper/helperFunctions";


const dbSkill = getFirebaseDB().ref('data/skill');

@Module({
    dynamic: true,
    store: Store,
    name: "Skill",
    namespaced: true
})
class Skill extends VuexModule {
    public skills: ISkill[] = [];


    get allSkills(): ISkill[] {
        return this.skills;
    }

    @Mutation
    public setSkills(skills: ISkill[]): void {
        this.skills = [...skills];
    }

    @Mutation
    public addSkill(skill: ISkill): void {
        this.skills.push(skill);
    }

    @Mutation
    public deleteSkill(fbID: string): void {
        const index = this.skills.findIndex((skill: ISkill) => skill.fbID === fbID);
        this.skills.splice(index, 1);
    }

    @Mutation
    updateSkill(skill: ISkill): void {
        const skillToUpdate = this.skills.find((skillItem: ISkill) => skillItem.fbID === skill.fbID);
        skillToUpdate.skillValue = skill.skillValue;
        skillToUpdate.name = skill.name;
    }


    @Action
    public fetchSkills() {
        dbSkill.once('value')
            .then(snapshot => {
                const skills: ISkill[] = retrieveData(snapshot.val()) as ISkill[];
                this.context.commit('setSkills', skills);
            })
    }

    @Action
    public addSkillAction(skill: ISkill): void {
        dbSkill
            .push(skill)
            .then(res => this.context.commit('addSkill', {...skill, fbID: res.key}));
    }

    @Action
    public updateSkillAction(skill: ISkill): void {
        dbSkill
            .child(skill.fbID)
            .set(skill)
            .then(() => this.context.commit('updateSkill', skill));
    }

    @Action
    public deleteSkillAction(fbID: string): void {
        dbSkill
            .child(fbID)
            .set(null)
            .then(() => this.context.commit('deleteSkill', fbID));
    }
}


export default Skill;
