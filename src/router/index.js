import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/ogone',
      name: 'ogone',
      component: () => import('../views/OGone.vue')
    },
    {
      path: '/ogtwo',
      name: 'ogtwo',
      component: () => import('../views/OGTwo.vue')
    },
    {
      path: '/ogthree',
      name: 'ogthree',
      component: () => import('../views/OGThree.vue')
    },
    {
      path: '/ogfour',
      name: 'ogfour',
      component: () => import('../views/OGFour.vue')
    },
    {
      path: '/vp',
      name: 'vp',
      component: () => import('../views/VP.vue')
    }
  ]
})

export default router
