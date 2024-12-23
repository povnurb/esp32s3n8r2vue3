//process.env.BASE_URL
import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/ErrorPage.vue')
        },
        MainRoutes,
    ]
});
