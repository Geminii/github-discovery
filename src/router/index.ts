import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    component: Home,
    name: 'home',
    path: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
