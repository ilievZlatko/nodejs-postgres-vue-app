import axios from 'axios';

export default {
  namespaced: true,

  state: {
    recepies: [],
    loadingRecepies: false,
  },

  mutations: {
    updateRecepies(state, recepies) {
      state.recepies = recepies;
    },

    toggleLoadingRecepies(state, isLoading) {
      state.loadingRecepies = isLoading;
    },
  },

  actions: {
    loadRecepies({
      commit,
      rootState,
    }) {
      commit('toggleLoadingRecepies', true);

      const options = {
        url: rootState.urls.getRecepies,
        type: 'GET',
      };

      return axios(options)
        .then((response) => {
          commit('updateRecepies', response.data.result);
          commit('toggleLoadingRecepies', false);
        })
        .catch((err) => {
          commit('toggleLoadingRecepies', false);
          throw new Error(err);
        });
    },
  },
};
