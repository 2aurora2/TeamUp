<template>
    <el-dialog
            v-model="showDialogVisible"
            title="比赛介绍"
            width="500"
    >
        <h2>赛事名称</h2>
        <p>{{ props.matchItem.title }}</p>
        <h2>赛事官网</h2>
        <p>
            <el-link :href="props.matchItem.link" type="primary">官网直达 >></el-link>
        </p>
        <h2>标签</h2>
        <div class="tags">
            <el-tag v-for="(item,index) in props.matchItem.tagList" :key="index" style="margin-right: 8px">{{ item }}</el-tag>
        </div>
        <h2>简要介绍</h2>
        <p>{{ props.matchItem.description }}</p>
    </el-dialog>
</template>

<script setup lang="ts">
import {MatchItem} from "@/interface/match.ts";

const showDialogVisible = defineModel('showDialogVisible');
const props = defineProps<{
    matchItem: MatchItem;
}>();
</script>

<style scoped lang="scss">
p {
    margin-top: 8px;
    margin-bottom: 8px;
    line-height: 28px;
}

.tags {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
}
</style>