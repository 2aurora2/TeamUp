<template>
    <div class="match-card">
        <p class="title">赛事名称</p>
        <p>{{ props.title }}</p>
        <p class="title">赛事官网</p>
        <p>
            <el-link :href="props.link" type="primary">官网直达 >></el-link>
        </p>
        <p class="title">标签</p>
        <div class="tags">
            <el-tag v-for="(item,index) in props.tagList" :key="index" style="margin-right: 8px">
                {{ item }}
            </el-tag>
        </div>
        <p class="title">举办月份</p>
        <p>{{ props.month }}月</p>
        <el-button type="primary" @click="showDialogVisible = true" class="btn">查看赛事介绍</el-button>
    </div>
    <el-dialog
            v-model="showDialogVisible"
            title="赛事简要介绍"
            width="500"
            center
    >
        <span style="line-height: 30px">{{ props.description }}</span>
    </el-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
    title: String,
    month: Number,
    tagList: Array,
    link: String,
    description: String
})

const showDialogVisible = ref(false);
</script>

<style scoped lang="scss">
.match-card {
    width: 100%;
    height: 350px;
    padding: 8px;
    border: 2px dashed #dcdcdc;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: transform 1s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.05);
    }

    .title {
        font-size: 25px;
        margin-top: 8px;
        margin-bottom: 8px;
    }

    .btn {
        margin-top: 8px;
    }
}
</style>