import {Router} from "vue-router";
import {useUserStore} from "@/store/useUserStore.ts";
import CONST from "@/const"
import {WarnNotice} from "@/utils/Notification.ts";

export const createRouteGuards = (router: Router) => {
    // @ts-ignore
    router.beforeEach(async (to, from, next) => {
        // 获取登录状态以及角色列表
        const userStore = useUserStore();
        const loginState = userStore.haveLogin;
        const roleList = userStore.roleList;
        // 登录校验
        // 1. 公共路由直接放行
        if (!to.meta.requireLoginAuth && !to.meta.requireAdminAuth) next();
        // 2. 登录、注册等路由若当前为登录状态则不可放行，重定向到首页
        else if (CONST.ENTRY_ROUTES.includes(to.path) && loginState) next('/');
        // 3. 登录、注册等路由若当前为未登录状态则放行
        else if (CONST.ENTRY_ROUTES.includes(to.path) && !loginState) next();
        // 4. 其他非公共路由若当前为登录状态则具体判断对应权限
        else if (loginState) {
            // 5. 判断是否需要管理员权限
            if (to.meta.requireAdminAuth) {
                // 5.1 需要管理员权限且有管理员权限则放行
                if (roleList.includes(1) || roleList.includes(2)) next();
                // 5.2 没有管理员权限则重定向到首页
                else {
                    WarnNotice('无权限访问，请联系超级管理员！');
                    next('/')
                }
            } else next();
        }
        // 6. 没登录否则重定向到登录
        else {
            WarnNotice('请先完成登录！')
            next('/login');
        }
    })
}