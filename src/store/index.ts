import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/store/modules/auth';
import Certificate from '@/store/modules/certificate';
import {getFirebaseDB} from "@/helper/helperFunctions";
import Skill from "@/store/modules/skill";

Vue.use(Vuex);

const store =  new Vuex.Store({
  state: {
  },

  getters: {

  },
  mutations: {
  },
  actions: {
    saveData() {
      const db = getFirebaseDB();
      const data = {
        skill: store.getters['Skill/allSkills'],
        experience: store.getters['Experience/allWorkExperiences']
      }
      db.ref('data').set(data);

      // console.log(data);
    }
  },
  modules: {
    // Auth,
    // Certificate
  }
});

export default store;
