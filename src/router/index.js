import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/IndexPage.vue')
        },
        {
            path: '/setup',
            name: 'setup',
            component: () => import('../views/PlayerSetup.vue')
        },
        {
            path: '/fish',
            name: 'fish',
            component: () => import('../views/FishGame.vue')
        },
        {
            path: '/hajari',
            name: 'hajari',
            component: () => import('../views/HajariGame.vue')
        }
    ]
})

export default router
