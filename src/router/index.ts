import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import("@/views/QuestionnairesListingView.vue"),
    },
    {
      path: '/question/:id',
      name: 'statement-listing',
      component: () => import("@/views/StatementListingView.vue"),
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import("@/views/TrainingModeView.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import("@/views/NotFoundView.vue"),
    }
  ],
})

export default router
