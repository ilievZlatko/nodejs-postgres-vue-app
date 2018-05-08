import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recepies: [],
    loading: false,
  },
});

export default store;
