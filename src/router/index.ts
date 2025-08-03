import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'characters',
      component: () => import('../domains/characters/presentation/pages/CharacterList.vue'),
    },
    {
      path: '/characters/:id',
      name: 'character-detail',
      component: () => import('../domains/characters/presentation/pages/CharacterDetail.vue'),
    },
  ],
})

export default router
