import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/QuestionnairesListingView.vue"),
    },
    {
      path: '/:id/exam',
      name: 'exam-mode',
      component: () => import("@/views/ExamModeView.vue"),
    },
    {
      path: '/:id/training',
      name: 'training-mode',
      component: () => import("@/views/TrainingModeView.vue"),
    },
    {
      path: '/:id',
      name: 'mode-select',
      component: () => import("@/views/ModeSelectView.vue"),
    },
    {
      path: '/question/:id',
      name: 'statement-listing',
      component: () => import("@/views/StatementListingView.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import("@/views/NotFoundView.vue"),
    }
  ],
})

export default router
