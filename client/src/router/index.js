import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import RecepieDetails from '@/pages/RecepieDetails';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:id',
      name: 'recepie-details',
      component: RecepieDetails,
      props: route => ({ id: +route.params.id }),
    },
  ],
});
