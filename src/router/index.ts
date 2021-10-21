import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/upload'
    },
    {
        path: '/predictions/:node',
        name: 'Predictions',
        component: () => import(/* webpackChunkName: 'predictions' */ '../pages/predictions-page/predictions-page.vue')
    },
    {
        path: '/upload',
        name: 'Upload',
        component: () => import(/* webpackChunkName: 'upload' */ '../pages/upload-page/upload-page.vue')
    },
    {
        path: '/taxonomy',
        name: 'Taxonomy',
        component: () => import(/* webpackChunkName: 'taxonomy' */ '../pages/taxonomy-page/taxonomy-page.vue')
    }
]

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
