import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/upload'
    },
    {
        path: '/upload',
        name: 'Upload',
        component: () => import(/* webpackChunkName: 'upload' */ '../views/upload_view/UploadView.vue')
    },
    {
        path: '/taxonomy',
        name: 'Taxonomy',
        component: () => import(/* webpackChunkName: 'taxonomy' */ '../views/taxonomy_view/taxonomy_view.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
