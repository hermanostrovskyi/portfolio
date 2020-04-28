import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/store/modules/auth';
import Certificate from '@/store/modules/certificate';

Vue.use(Vuex);

const store =  new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
  }
});

export default store;
