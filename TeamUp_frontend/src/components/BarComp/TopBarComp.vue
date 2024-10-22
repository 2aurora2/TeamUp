<template>
  <el-page-header>
    <template #content>
      <div class="flex items-center" @click="router.replace('/')">
        <el-avatar
            class="mr-3"
            :size="25"
            :src="LOGO"
        />
        <span class="text-large font-600 mr-3" style="margin-left: 8px"> TeamUp &nbsp</span>
        <span
            class="text-sm mr-2"
            style="color: var(--el-text-color-regular); font-size: large"
        >
            开启您的竞赛探索之旅
          </span>
      </div>
    </template>
    <template #extra>
      <top-bar-right-comp></top-bar-right-comp>
    </template>
  </el-page-header>
</template>


<script setup lang="ts">
import LOGO from '@/assets/image/logo.png'
import TopBarRightComp from "@/components/BarComp/BarItemComp/TopBarRightComp.vue";
import router from "@/router";
</script>

<style>
.el-page-header__back {
  display: none !important;
}

.el-divider {
  display: none !important;
}

.el-page-header__content {
  .items-center {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    .el-avatar {
      background-color: transparent;
      width: 45px;
      height: auto;
      border-radius: 50%;
    }
  }
}
</style>