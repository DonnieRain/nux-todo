import { createRouter, createWebHistory } from 'vue-router'
import { authID } from '@/services/storage.js'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/auth/LoginView.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !authID()) {
        next({ name: 'login' });
    } else if (to.name === 'login' &&  authID()) {
        next({ name: 'home' });
    } else {
        next()
    }
});

export default router
