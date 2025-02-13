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
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
      path: '/create-question',
      name: '',
      component: () => import("@/views/CreateQuestionView.vue"),
    },
    {
      path: '/create-form',
      name: '',
      component: () => import("../components/ui/QuestionFormComponent.vue"),
    }
  ],
})

export default router
