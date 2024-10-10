<template>
    <el-container>
        <el-header>
            <top-bar-comp/>
        </el-header>
        <el-scrollbar>
            <transition>
                <router-view></router-view>
            </transition>
        </el-scrollbar>
        <el-footer>
            <foot-bar-comp/>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import TopBarComp from "@/components/BarComp/TopBarComp.vue";
import FootBarComp from "@/components/BarComp/FootBarComp.vue";
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}

.el-container {
    width: 100%;
    height: 100%;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.el-container {
    width: 100%;
    height: 100vh;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'Comic Sans MS', 幼圆, serif;

    .el-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-bottom: 1px solid #dcdcdc;
        padding-left: 30px;
        padding-right: 30px;
    }

    .el-footer {
        height: fit-content;
        border-top: 1px solid #dcdcdc;
    }
}

/**消除横向滚动条**/
:deep(.el-scrollbar__bar.is-horizontal) {
    height: 0 !important;
}
</style>
