<template>
    <el-container>
        <img :src="userStore.user.avatar" alt="avatar">
        <el-tag type="primary" size="large">管理员</el-tag>
        <p>{{ welcome }}</p>
    </el-container>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/useUserStore.ts";
import {computed} from "vue";

const userStore = useUserStore();

const welcome = computed(() => {
    const now = new Date();
    const hour = now.getHours();
    const userName = userStore.user.username;

    let greeting;
    if (hour < 6) {
        greeting = `深夜了，${userName}，希望你有一个宁静美好的夜晚。`;
    } else if (hour < 12) {
        greeting = `早上好，${userName}，新的一天开始了，愿你拥有美好的心情。`;
    } else if (hour < 18) {
        greeting = `下午好，${userName}，希望你的下午时光充满阳光。`;
    } else if (hour < 21) {
        greeting = `傍晚好，${userName}，一天的忙碌即将结束，愿你享受轻松的时光。`;
    } else {
        greeting = `晚上好，${userName}，愿你的夜生活丰富多彩，享受属于自己的时光。`;
    }

    return greeting;
})
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    height: 100% !important;
    display: flex;
    flex-direction: column !important;
    justify-content: center;
    align-items: center;

    img {
        width: 10%;
        height: auto;
        border-radius: 50%;
    }

    .el-tag {
        margin-top: 8px;
        cursor: pointer;
    }

    p {
        font-family: 'Comic Sans MS', 幼圆, serif;
        font-size: 20px;
    }
}
</style>