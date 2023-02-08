import { createRouter, createWebHistory } from 'vue-router'
import {auth} from '../firebase.js'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/Login.vue")
    },
    {
        path: '/my-profile',
        name: 'Profile',
        component: () => import("../views/Profile.vue")
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import("../views/Signup.vue")
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            requiresAuth: true
        }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login' && auth.currentUser) {
      next('/')
      return;
    }
  
    if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
      next('/login')
      return;
    }
  
    next();
  })

export default router