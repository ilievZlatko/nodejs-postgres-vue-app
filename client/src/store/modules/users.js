/* eslint-disable */
import axios from 'axios';
import AuthenticationService from '@/services/AuthenticationService';

export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
    authError: null,
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },

    setUser(state, user) {
      state.user = user;
      localStorage.setItem('userId', user.id);
    },

    handleError(state, authError) {
      state.authError = authError;
    },
  },

  actions: {
    async login({commit, rootState}, loadData) {
      try {
        const response = await AuthenticationService.login({
          email: loadData.email,
          password: loadData.password
        });

        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
      } catch(err) {
        console.log(err);
        commit('handleError', err.response.data.error);
      }
    },

    async register({commit, rootState}, loadData) {
      try {
        const response = await AuthenticationService.register({
          email: loadData.email,
          password: loadData.password
        });
        commit('setUser', response.user);
        commit('setToken', response.token);
      } catch (err) {
        commit('handleError', err.response.data.error);

      }
    },

    logout({ commit }) {
      commit('setUser', null);
      commit('setToken', null);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
};
