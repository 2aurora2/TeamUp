<template>
  <div class="footer">
    <div class="footer-left">
        20212821028
    </div>
    <div style="cursor: pointer">✨<span style="color: dodgerblue">{{ p }}</span>✨</div>
    <div class="footer-right">
      <router-link to="/">首页</router-link>
      <el-divider direction="vertical" style="display: inline!important;"/>
      <router-link to="/about">关于我们</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref, watch} from "vue";
import CONST from "@/const";

const router = useRouter()
let p = ref('')

watch(() => router.currentRoute.value.name, (newName, _) => {
  p.value = CONST.ROUTE_DESC[<string>newName];
})
</script>

<style scoped lang="scss">
.footer {
  font-family: 等线, serif;
  font-size: 14px;
  padding: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .footer-left {
    &:hover {
      cursor: pointer;
    }
  }

  .footer-right {
    a {
      text-decoration: none;
      color: #000000;
    }
  }
}
</style>