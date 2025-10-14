import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/HelloWorld.vue'),
    props: { msg: 'Vite + Vue' },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


