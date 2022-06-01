import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import isAuthenticatedGuard from './auth-guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page-not-found',
    component: () => import(/* webpackChunkName: "page-not-found" */ '@/views/PageNotFound.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/modules/auth/views/Register.vue')
  },
  {
    path: '/feed',
    name: 'feed',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import(/* webpackChunkName: "feed" */ '@/views/Feed.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import(/* webpackChunkName: "profile" */ '@/modules/auth/views/Profile.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile-id',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import(/* webpackChunkName: "profile-id" */ '@/modules/auth/views/ProfileId.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
