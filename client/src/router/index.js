import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import RecepieDetails from '@/pages/RecepieDetails';
import Register from '@/pages/Register';
import Login from '@/pages/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/:id',
      name: 'recepie-details',
      component: RecepieDetails,
      props: route => ({ id: +route.params.id }),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!token && requiresAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;
