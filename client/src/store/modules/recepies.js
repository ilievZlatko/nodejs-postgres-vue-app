/* eslint-disable */
import axios from 'axios';

export default {
  namespaced: true,

  state: {
    recepies: [],
    recepie: {},
    loadingRecepies: false,
    loadingRecepie: false,
  },

  mutations: {
    updateRecepies(state, recepies) {
      state.recepies = recepies;
    },

    updateRecepie(state, recepie) {
      state.recepie = recepie;
    },

    toggleLoadingRecepies(state, isLoading) {
      state.loadingRecepies = isLoading;
    },

    toggleLoadingOneRecepie(state, isLoading) {
      state.loadingRecepie = isLoading;
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
        method: 'GET',
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

    loadOneRecepie({
      commit,
      rootState,
    }, loadData) {
      commit('toggleLoadingOneRecepie', true);

      const data = _.assign({}, loadData);

      const options = {
        url: rootState.urls.getSingleRecipe(loadData.id),
        method: 'GET',
        data,
      };

      return axios(options)
        .then((response) => {
          commit('updateRecepie', _.head(response.data.result));
          commit('toggleLoadingOneRecepie', false);
        })
        .catch((err) => {
          commit('toggleLoadingOneRecepie', false);
          throw new Error(err);
        });
    },

    updateRecepieById({ rootState, commit }, loadData) {
      const data = _.assign({}, loadData);

      const options = {
        url: rootState.urls.getSingleRecipe(loadData.id),
        method: 'PUT',
        data,
      };

      return axios(options)
        .then((response) => {
          commit('updateRecepie', _.head(response.data.result));
        })
        .catch((err) => {
          throw new Error(err);
        });
    },

    createNewRecepie({ rootState }, loadData) {
      const data = _.assign({}, loadData);

      const options = {
        url: rootState.urls.getRecepies,
        method: 'POST',
        data,
      };

      return axios(options);
    },
  },
};
