import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/upload'
    },
    {
        path: '/upload',
        name: 'Upload',
        component: () => import(/* webpackChunkName: 'upload' */ '../views/Upload.vue')
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
