import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import {createRouteGuards} from "./createRouteGuard.ts";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/AuthViews/LoginView.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/AuthViews/RegisterView.vue')
    },
    {
        path: '/user/:userId(\\d+)',
        name: 'PersonCenter',
        component: () => import('@/views/AuthViews/PersonCenterView.vue'),
        meta: {
            requireLoginAuth: true
        }
    },
    {
        path: '/about',
        name: 'AboutUs',
        component: () => import('@/views/AboutUsView.vue')
    },
    // 无匹配页面则跳转到404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView.vue')
    }
]

const router = createRouter(
    {
        history: createWebHashHistory(),
        // @ts-ignore
        routes: routes,
        // 在导航栏中，为当前活动路由的菜单项添加类名
        linkActiveClass: 'router-active'
    }
)

createRouteGuards(router);

export default router