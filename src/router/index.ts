import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import("@/views/QuestionListingView.vue"),
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import("@/views/TrainingModeView.vue"),
    },
    {
      path: '/dev2',
      name: 'dev2',
      component: () => import("@/views/ExamModeView.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import("@/views/NotFoundView.vue"),
    }
  ],
})

export default router
