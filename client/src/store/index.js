import Vue from 'vue';
import Vuex from 'vuex';
import urls from './urls';
import recepies from './modules/recepies';
import users from './modules/users';

Vue.use(Vuex);

const debug = false && process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  state: {
    urls,
  },
  modules: {
    recepies,
    users,
  },
  strict: debug,
});

export default store;
