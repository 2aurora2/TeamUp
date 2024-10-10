<template>
    <div class="recent-match-card">
        <p>{{ props.title }}</p>
        <div class="tags">
            <el-tag v-for="(item,index) in props.tagList" :key="index" type="primary">{{ item }}</el-tag>
        </div>
        <p>举办月份：{{ props.month }} 月</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String,
    month: Number,
    tagList: Array
})
</script>

<style scoped lang="scss">
.recent-match-card {
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
    padding: 8px;
    border: 1px dashed #cccccc;
    border-radius: 8px;
    transition: transform 1s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.05);
    }

    p {
        margin-top: 8px;
        margin-bottom: 8px;

        &:nth-child(1) {
            font-size: 25px;
        }

        &:nth-child(2) {
            font-size: 18px;
        }
    }

    .tags {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
}
</style>