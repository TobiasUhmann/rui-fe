import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/upload'
    },
    {
        path: '/predictions/:node',
        name: 'Predictions',
        component: () => import(/* webpackChunkName: 'predictions' */ '../views/predictions-view/predictions-view.vue')
    },
    {
        path: '/upload',
        name: 'Upload',
        component: () => import(/* webpackChunkName: 'upload' */ '../views/upload-view/upload-view.vue')
    },
    {
        path: '/taxonomy',
        name: 'Taxonomy',
        component: () => import(/* webpackChunkName: 'taxonomy' */ '../views/taxonomy-view/taxonomy-view.vue')
    }
]

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
