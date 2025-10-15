import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LandingPage from './LandingPage.vue';
import BuilderPage from './BuilderPage.vue';
import FormPage from './FormPage.vue';
import NotFoundPage from './NotFoundPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
  },
  {
    path: '/builder/:id?',
    name: 'builder',
    component: BuilderPage,
    // props: { msg: 'Vite + Vue' },
  },
  {
    path: '/form/:id',
    name: 'form',
    component: FormPage,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


