import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

    const Router = createRouter({
        history: createHistory(process.env.VUE_ROUTER_BASE),
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
        ],
        scrollBehavior: () => ({ left: 0, top: 0 })
    })

    return Router
})
