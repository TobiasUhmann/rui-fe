import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: 'dashboard' */ '../views/Dashboard.vue')
    },
    {
        path: '/explore',
        name: 'Explore',
        component: () => import(/* webpackChunkName: 'explore' */ '../views/Explore.vue')
    },
    {
        path: '/taxonomy',
        name: 'Taxonomy',
        component: () => import(/* webpackChunkName: 'taxonomy' */ '../views/Taxonomy.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
