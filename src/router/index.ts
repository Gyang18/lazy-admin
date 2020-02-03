import Vue from 'vue';
import VueRouter from 'vue-router';
import baseRoutes from './module/base';
import blankRoutes from './module/blank';
import { Router } from '@/types/router';

Vue.use(VueRouter);

const routes: Router[] = [
  {
    path: '/',
    redirect: '/base/home',
  },
  ...blankRoutes,
  ...baseRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
