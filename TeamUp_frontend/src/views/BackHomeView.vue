<script setup lang="ts">
import SideBarComp from "@/components/BarComp/SideBarComp.vue";
import {useUserStore} from "@/store/useUserStore.ts";
const userStore = useUserStore();
</script>

<template>
    <el-container>
        <side-bar-comp style="width: 15%" :role-list="userStore.roleList"></side-bar-comp>
        <transition>
            <router-view></router-view>
        </transition>
    </el-container>
</template>

<style scoped lang="scss">
.el-container {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: row;
    font-family: 'Comic Sans MS', 幼圆, serif;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>