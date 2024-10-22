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
    {
        path: '/match/summary',
        name: 'MatchSummary',
        component: () => import('@/views/MatchViews/MatchSummaryView.vue'),
        meta: {
            requireLoginAuth: true
        }
    },
    {
        path: '/post',
        redirect: () => '/post/create',
        children: [
            {
                path: 'create',
                name: 'PostCreate',
                component: () => import('@/views/PostViews/PostCreateView.vue'),
                meta: {
                    requireLoginAuth: true
                }
            },
            {
                path: ':postId(\\d+)',
                name: 'PostDetails',
                component: () => import('@/views/PostViews/PostDetailsView.vue'),
                meta: {
                    requireLoginAuth: true
                }
            },
            {
                path: 'edit/:postId(\\d+)',
                name: 'PostEdit',
                component: () => import('@/views/PostViews/PostEditView.vue'),
                meta: {
                    requireLoginAuth: true
                }
            }
        ]
    },
    {
        path: '/recruit',
        name: 'RecruitmentLobby',
        component: () => import('@/views/PostViews/RecruitmentLobbyView.vue'),
        meta: {
            requireLoginAuth: true
        }
    },
    {
        path: '/experience',
        name: 'ExperienceShare',
        component: () => import('@/views/PostViews/ExperienceShareView.vue'),
        meta: {
            requireLoginAuth: true
        }
    },
    {
        path: '/admin',
        name: 'Administer',
        component: () => import('@/views/BackHomeView.vue'),
        redirect: () => '/admin/profile',
        children: [
            {
                path: 'profile',
                name: 'AdminProfile',
                component: () => import('@/views/AdminViews/AdminProfileView.vue'),
                meta: {
                    requireLoginAuth: true,
                    requireAdminAuth: true
                }
            },
            {
                path: 'match/manage',
                name: 'MatchManage',
                component: () => import('@/views/AdminViews/MatchManageView.vue'),
                meta: {
                    requireLoginAuth: true,
                    requireAdminAuth: true
                }
            },
            {
                path: 'post/manage',
                name: 'PostManage',
                component: () => import('@/views/AdminViews/PostManageView.vue'),
                meta: {
                    requireLoginAuth: true,
                    requireAdminAuth: true
                }
            },
            {
                path: 'user/manage',
                name: 'UserManage',
                component: () => import('@/views/AdminViews/UserManageView.vue'),
                meta: {
                    requireLoginAuth: true,
                    requireAdminAuth: true
                }
            }
        ]
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