import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import RepositoryDetail from '@/views/RepositoryDetail.vue';
import PageNotFound from '@/views/404.vue';

const routes = [
  {
    component: Home,
    name: 'home',
    path: '/',
  },
  {
    component: RepositoryDetail,
    name: 'repository',
    path: '/repository/:repositoryId',
  },
  { 
    component: PageNotFound,
    name: 'notFound',
    path: "/:pathMatch(.*)*",
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
