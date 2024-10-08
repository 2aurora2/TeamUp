<template>
    <div class="el-container">
        <div class="login-register-btn flex items-center" v-if="!userStore.haveLogin">
            <el-button @click="router.push('/login')">登录</el-button>
            <el-button type="primary" class="ml-2" @click="router.push('/register')">注册</el-button>
        </div>
        <div class="avatar flex items-center" v-else>
            <el-dropdown>
                <img :src="userStore.user.avatar" alt="avatar" style="border: 2px solid #cccccc">
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="router.push('/user/'+userStore.user.id)">
                            <span>个人信息</span>
                            <span></span>
                        </el-dropdown-item>
                        <el-dropdown-item
                                v-if="userStore.roleList.includes(1) || userStore.roleList.includes(2)"
                                @click="router.push('#');SuccessNotice('欢迎来到后台管理系统！')"
                        >
                            <span>后台管理</span>
                            <span></span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="logoutHandle">
                            <span>退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/useUserStore.ts";
import router from "@/router";
import {ErrorNotice, SuccessNotice} from "@/utils/Notification.ts";
import api from "@/api";

const userStore = useUserStore();
const logoutHandle = async () => {
    try {
        const {data: res} = await api.userApi.logout();
        if (res.code === 200) {
            userStore.$reset();
            localStorage.clear();
            SuccessNotice('退出登录成功！', 1000);
            await router.push('/');
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    }
}
</script>

<style scoped lang="scss">
.avatar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    img {
        width: 40px;
        height: auto;
        border-radius: 50%;
    }
}
</style>